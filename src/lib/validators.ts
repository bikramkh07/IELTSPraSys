export const WRITING_LIMITS = {
  maxEssayChars: 12_000,
  maxPromptChars: 2_000,
  minEssayWords: 50,
} as const;

export const SCORE_MODULES = ['writing', 'speaking', 'reading', 'listening'] as const;

export type ScoreModule = (typeof SCORE_MODULES)[number];

type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; status: number };

type WritingPayload = {
  essay: string;
  prompt: string;
  wordCount: number;
};

type ScorePayload = {
  module: ScoreModule;
  overall: number;
  ta: number | null;
  cc: number | null;
  lr: number | null;
  gra: number | null;
  fluency: number | null;
  vocabulary: number | null;
  grammar: number | null;
  pronunciation: number | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

export function countWords(value: string): number {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

export function isHalfBandScore(value: number): boolean {
  return Number.isFinite(value) && value >= 0 && value <= 9 && value * 2 === Math.round(value * 2);
}

export function coerceBandScore(value: unknown, fallback: number): number {
  const score = Number(value);
  return isHalfBandScore(score) ? score : fallback;
}

function optionalBand(value: unknown): number | null {
  if (value == null || value === '') return null;
  const score = Number(value);
  return isHalfBandScore(score) ? score : null;
}

export function validateWritingPayload(raw: unknown): ValidationResult<WritingPayload> {
  if (!isRecord(raw)) {
    return { ok: false, error: 'Invalid request body', status: 400 };
  }

  if (typeof raw.essay !== 'string' || typeof raw.prompt !== 'string') {
    return { ok: false, error: 'Essay and prompt are required', status: 400 };
  }

  const essay = raw.essay.trim();
  const prompt = raw.prompt.trim();

  if (!essay || !prompt) {
    return { ok: false, error: 'Essay and prompt are required', status: 400 };
  }

  if (essay.length > WRITING_LIMITS.maxEssayChars || prompt.length > WRITING_LIMITS.maxPromptChars) {
    return { ok: false, error: 'Essay or prompt too long', status: 413 };
  }

  const wordCount = countWords(essay);
  if (wordCount < WRITING_LIMITS.minEssayWords) {
    return {
      ok: false,
      error: `Essay must be at least ${WRITING_LIMITS.minEssayWords} words`,
      status: 400,
    };
  }

  return { ok: true, data: { essay, prompt, wordCount } };
}

export function validateScorePayload(raw: unknown): ValidationResult<ScorePayload> {
  if (!isRecord(raw)) {
    return { ok: false, error: 'Invalid request body', status: 400 };
  }

  const moduleName = typeof raw.module === 'string' ? raw.module.trim().toLowerCase() : '';
  if (!SCORE_MODULES.includes(moduleName as ScoreModule)) {
    return { ok: false, error: 'Invalid score module', status: 400 };
  }

  const overall = Number(raw.overall);
  if (!isHalfBandScore(overall)) {
    return { ok: false, error: 'Overall score must be a valid IELTS band score', status: 400 };
  }

  return {
    ok: true,
    data: {
      module: moduleName as ScoreModule,
      overall,
      ta: optionalBand(raw.ta),
      cc: optionalBand(raw.cc),
      lr: optionalBand(raw.lr),
      gra: optionalBand(raw.gra),
      fluency: optionalBand(raw.fluency),
      vocabulary: optionalBand(raw.vocabulary),
      grammar: optionalBand(raw.grammar),
      pronunciation: optionalBand(raw.pronunciation),
    },
  };
}

export function parsePaginationLimit(value: string | null, fallback = 50, max = 100): number {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) return fallback;
  return Math.min(parsed, max);
}
