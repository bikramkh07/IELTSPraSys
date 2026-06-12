import { NextResponse, type NextRequest } from 'next/server';
import { createRateLimiter, readJsonBody } from '@/lib/api-security';
import { logger } from '@/lib/logger';

const limitMonitoringRequests = createRateLimiter({
  keyPrefix: 'monitoring:web-vitals',
  windowMs: 60 * 1000,
  max: 120,
});

const WEB_VITAL_NAMES = new Set(['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB']);

export async function POST(req: NextRequest) {
  const rateLimited = limitMonitoringRequests(req);
  if (rateLimited) return rateLimited;

  const json = await readJsonBody(req);
  if (!json.ok) return json.response;

  const metric = json.data;
  if (!metric || typeof metric !== 'object' || Array.isArray(metric)) {
    return NextResponse.json({ error: 'Invalid metric payload' }, { status: 400 });
  }

  const data = metric as Record<string, unknown>;
  if (typeof data.name !== 'string' || !WEB_VITAL_NAMES.has(data.name)) {
    return NextResponse.json({ error: 'Unsupported metric name' }, { status: 400 });
  }

  if (typeof data.value !== 'number' || !Number.isFinite(data.value)) {
    return NextResponse.json({ error: 'Invalid metric value' }, { status: 400 });
  }

  logger.info('Web vital metric', {
    name: data.name,
    value: data.value,
    rating: typeof data.rating === 'string' ? data.rating : undefined,
    navigationType:
      typeof data.navigationType === 'string' ? data.navigationType : undefined,
  });

  return new NextResponse(null, { status: 204 });
}
