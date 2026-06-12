import { performance } from 'node:perf_hooks';

const target = process.env.LOAD_TEST_URL ?? process.env.E2E_BASE_URL;
const requests = Number(process.env.LOAD_TEST_REQUESTS ?? 50);
const concurrency = Number(process.env.LOAD_TEST_CONCURRENCY ?? 5);

if (!target) {
  console.error('Set LOAD_TEST_URL or E2E_BASE_URL before running load:test.');
  process.exit(1);
}

const results = [];
let nextIndex = 0;

async function worker() {
  while (nextIndex < requests) {
    nextIndex += 1;
    const started = performance.now();
    try {
      const response = await fetch(target);
      await response.arrayBuffer();
      results.push({
        ok: response.ok,
        status: response.status,
        ms: performance.now() - started,
      });
    } catch {
      results.push({
        ok: false,
        status: 0,
        ms: performance.now() - started,
      });
    }
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));

const latencies = results.map((r) => r.ms).sort((a, b) => a - b);
const percentile = (p) => latencies[Math.min(latencies.length - 1, Math.floor((p / 100) * latencies.length))];
const failures = results.filter((r) => !r.ok).length;

console.log(
  JSON.stringify(
    {
      target,
      requests,
      concurrency,
      failures,
      failureRate: failures / requests,
      p50Ms: Math.round(percentile(50)),
      p95Ms: Math.round(percentile(95)),
      p99Ms: Math.round(percentile(99)),
    },
    null,
    2,
  ),
);

if (failures > 0) process.exit(1);
