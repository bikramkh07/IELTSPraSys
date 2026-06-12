import test from 'node:test';
import assert from 'node:assert/strict';

const baseUrl = process.env.E2E_BASE_URL;

test('public pages respond successfully', { skip: !baseUrl && 'Set E2E_BASE_URL to run smoke checks.' }, async () => {
  for (const path of ['/', '/features', '/practice', '/mock-test', '/progress', '/reviews']) {
    const response = await fetch(new URL(path, baseUrl));
    assert.equal(response.ok, true, `${path} returned ${response.status}`);
  }
});

test('writing API validates short essays', { skip: !baseUrl && 'Set E2E_BASE_URL to run smoke checks.' }, async () => {
  const response = await fetch(new URL('/api/writing', baseUrl), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ essay: 'Too short.', prompt: 'Discuss both views.' }),
  });
  const body = await response.json();

  if (response.status === 401) {
    assert.match(body.error, /Sign in required/);
    return;
  }

  assert.equal(response.status, 400);
  assert.match(body.error, /at least 50 words/);
});
