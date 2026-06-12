import { NextResponse, type NextRequest } from 'next/server';
import { gemini, hasGeminiKey } from '@/lib/gemini';
import { requireAuth } from '@/lib/api-auth';
import { parseWritingFeedback, type WritingFeedback } from '@/lib/api-response';
import {
  createRateLimiter,
  enforceSameOrigin,
  readJsonBody,
  withTimeout,
} from '@/lib/api-security';
import { logger } from '@/lib/logger';
import { validateWritingPayload } from '@/lib/validators';

const AI_TIMEOUT_MS = 25_000;
const limitWritingRequests = createRateLimiter({
  keyPrefix: 'writing',
  windowMs: 10 * 60 * 1000,
  max: 10,
});

const MOCK_RESPONSE: WritingFeedback = {
  ta: 6.5,
  cc: 7.0,
  lr: 6.5,
  gra: 7.0,
  overall: 6.5,
  feedback:
    'Your argument is logically structured and your position is clearly maintained throughout the essay. To improve toward Band 7, focus on varying sentence structures more.',
  improvements: ['Use more discourse markers', 'Vary sentence length', 'Stronger conclusion'],
  mock: true,
};

export async function POST(req: NextRequest) {
  const originError = enforceSameOrigin(req);
  if (originError) return originError;

  const rateLimited = limitWritingRequests(req);
  if (rateLimited) return rateLimited;

  const authResult = await requireAuth();
  if ('error' in authResult) return authResult.error;

  try {
    const json = await readJsonBody(req);
    if (!json.ok) return json.response;

    const validation = validateWritingPayload(json.data);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }

    if (!hasGeminiKey) {
      return NextResponse.json(MOCK_RESPONSE);
    }

    const model = gemini.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const { essay, prompt, wordCount } = validation.data;

    const result = await withTimeout(
      model.generateContent({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are an expert IELTS Examiner. Score this essay on Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy.

Each score should be a float like 6.0 or 6.5.

Return ONLY valid JSON with this exact structure (no markdown, no code fences):
{"ta": number, "cc": number, "lr": number, "gra": number, "overall": number, "feedback": "string", "improvements": ["string", "string", "string"]}

IELTS Writing Prompt: ${prompt}

Student Essay: ${essay}`,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: 'application/json',
        },
      }),
      AI_TIMEOUT_MS,
      'Writing feedback',
    );

    const text = result.response.text();
    logger.info('Writing feedback generated', {
      userId: authResult.userId,
      wordCount,
      mock: false,
    });
    return NextResponse.json(parseWritingFeedback(JSON.parse(text)));
  } catch (error) {
    logger.error('Writing API error', error, { userId: authResult.userId });
    return NextResponse.json(
      { error: 'Unable to generate writing feedback right now' },
      { status: 502 },
    );
  }
}
