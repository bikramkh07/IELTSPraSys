import test from 'node:test';
import assert from 'node:assert/strict';

import {
  coerceBandScore,
  countWords,
  isHalfBandScore,
  parsePaginationLimit,
  validateScorePayload,
  validateWritingPayload,
} from '../../src/lib/validators.ts';

test('validateWritingPayload accepts a complete IELTS essay payload', () => {
  const essay = Array.from({ length: 55 }, (_, index) => `word${index}`).join(' ');
  const result = validateWritingPayload({
    essay,
    prompt: 'Discuss both views and give your opinion.',
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.wordCount, 55);
});

test('validateWritingPayload rejects short essays', () => {
  const result = validateWritingPayload({
    essay: 'Too short.',
    prompt: 'Discuss both views.',
  });

  assert.equal(result.ok, false);
  assert.equal(result.status, 400);
});

test('score helpers enforce IELTS half-band values', () => {
  assert.equal(isHalfBandScore(6.5), true);
  assert.equal(isHalfBandScore(6.25), false);
  assert.equal(isHalfBandScore(10), false);
  assert.equal(coerceBandScore('7.5', 6), 7.5);
  assert.equal(coerceBandScore('7.25', 6), 6);
});

test('validateScorePayload accepts whitelisted modules and scores', () => {
  const result = validateScorePayload({
    module: 'Writing',
    overall: 7,
    ta: 7,
    cc: 6.5,
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.module, 'writing');
  assert.equal(result.data.overall, 7);
  assert.equal(result.data.lr, null);
});

test('validateScorePayload rejects unknown modules and invalid scores', () => {
  assert.equal(validateScorePayload({ module: 'admin', overall: 7 }).ok, false);
  assert.equal(validateScorePayload({ module: 'writing', overall: 7.25 }).ok, false);
});

test('pagination limits are bounded', () => {
  assert.equal(parsePaginationLimit('10'), 10);
  assert.equal(parsePaginationLimit('1000'), 100);
  assert.equal(parsePaginationLimit('nope'), 50);
});

test('word counter trims repeated whitespace', () => {
  assert.equal(countWords('  one   two\nthree  '), 3);
});
