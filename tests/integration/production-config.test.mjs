import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import nextConfig from '../../next.config.ts';
import { STATIC_ROUTES } from '../../src/lib/site-config.ts';

test('security headers are configured for all routes', async () => {
  const headerRules = await nextConfig.headers();
  const allHeaders = new Map(headerRules.flatMap((rule) => rule.headers.map((h) => [h.key, h.value])));

  assert.equal(headerRules[0].source, '/:path*');
  assert.ok(allHeaders.has('Content-Security-Policy'));
  assert.ok(allHeaders.has('Strict-Transport-Security'));
  assert.equal(allHeaders.get('X-Frame-Options'), 'DENY');
  assert.equal(nextConfig.poweredByHeader, false);
});

test('sitemap route inventory includes all public pages', () => {
  assert.deepEqual([...STATIC_ROUTES], [
    '/',
    '/features',
    '/practice',
    '/mock-test',
    '/mock-exam',
    '/progress',
    '/reviews',
  ]);
});

test('Prisma schema keeps production indexes for user history queries', async () => {
  const schema = await readFile(new URL('../../prisma/schema.prisma', import.meta.url), 'utf8');

  assert.match(schema, /provider\s+=\s+"postgresql"/);
  assert.match(schema, /@@index\(\[userId, createdAt\]\)/);
});
