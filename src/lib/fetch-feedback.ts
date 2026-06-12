import {
  parseSpeakingFeedback,
  parseWritingFeedback,
  type SpeakingFeedback,
  type WritingFeedback,
} from '@/lib/api-response';
import type { ScoreModule } from '@/lib/validators';

async function readJson(res: Response): Promise<Record<string, unknown>> {
  try {
    const data = await res.json();
    return data && typeof data === 'object' ? (data as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

function throwIfError(res: Response, data: Record<string, unknown>) {
  if (res.ok) return;
  const message = typeof data.error === 'string' ? data.error : 'Request failed';
  throw new Error(message);
}

export async function fetchWritingFeedback(
  essay: string,
  prompt: string,
): Promise<WritingFeedback> {
  const res = await fetch('/api/writing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ essay, prompt }),
  });

  const data = await readJson(res);
  throwIfError(res, data);
  return parseWritingFeedback(data, Boolean(data.mock));
}

export async function fetchSpeakingFeedback(audio: Blob, filename: string): Promise<SpeakingFeedback> {
  const form = new FormData();
  form.append('audio', audio, filename);

  const res = await fetch('/api/speaking', { method: 'POST', body: form });
  const data = await readJson(res);
  throwIfError(res, data);
  return parseSpeakingFeedback(data, Boolean(data.mock));
}

export async function saveScore(
  module: ScoreModule,
  feedback: Partial<WritingFeedback & SpeakingFeedback>,
): Promise<boolean> {
  try {
    const res = await fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        module,
        overall: feedback.overall,
        ta: feedback.ta,
        cc: feedback.cc,
        lr: feedback.lr,
        gra: feedback.gra,
        fluency: feedback.fluency,
        vocabulary: feedback.vocabulary,
        grammar: feedback.grammar,
        pronunciation: feedback.pronunciation,
      }),
    });

    return res.ok;
  } catch {
    return false;
  }
}
