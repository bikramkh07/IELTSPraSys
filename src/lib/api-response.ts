import { coerceBandScore } from './validators';

export interface WritingFeedback {
  ta: number;
  cc: number;
  lr: number;
  gra: number;
  overall: number;
  feedback: string;
  improvements: string[];
  mock?: boolean;
}

export interface SpeakingFeedback {
  transcript: string;
  fluency: number;
  vocabulary: number;
  grammar: number;
  pronunciation: number;
  overall: number;
  feedback: string;
  mock?: boolean;
}

const DEFAULT_IMPROVEMENTS = [
  'Use more discourse markers',
  'Vary sentence length',
  'Stronger conclusion',
];

export function parseWritingFeedback(raw: unknown, mock = false): WritingFeedback {
  const data = raw as Record<string, unknown>;
  const improvements = Array.isArray(data.improvements)
    ? data.improvements.filter((x): x is string => typeof x === 'string')
    : DEFAULT_IMPROVEMENTS;

  return {
    ta: coerceBandScore(data.ta, 6.5),
    cc: coerceBandScore(data.cc, 7.0),
    lr: coerceBandScore(data.lr, 6.5),
    gra: coerceBandScore(data.gra, 7.0),
    overall: coerceBandScore(data.overall, 6.5),
    feedback: typeof data.feedback === 'string' ? data.feedback : 'Feedback unavailable.',
    improvements: improvements.length ? improvements : DEFAULT_IMPROVEMENTS,
    mock,
  };
}

export function parseSpeakingFeedback(raw: unknown, mock = false): SpeakingFeedback {
  const data = raw as Record<string, unknown>;
  return {
    transcript:
      typeof data.transcript === 'string'
        ? data.transcript
        : 'Transcription unavailable.',
    fluency: coerceBandScore(data.fluency, 6.5),
    vocabulary: coerceBandScore(data.vocabulary, 7.0),
    grammar: coerceBandScore(data.grammar, 6.5),
    pronunciation: coerceBandScore(data.pronunciation, 6.0),
    overall: coerceBandScore(data.overall, 6.5),
    feedback: typeof data.feedback === 'string' ? data.feedback : 'Feedback unavailable.',
    mock,
  };
}
