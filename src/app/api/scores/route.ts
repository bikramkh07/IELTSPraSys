import { NextResponse, type NextRequest } from 'next/server';
import { requireAuth, ensureDbUser } from '@/lib/api-auth';
import { hasClerkAuth, hasDatabase } from '@/lib/server-config';
import { createRateLimiter, enforceSameOrigin, readJsonBody } from '@/lib/api-security';
import { logger } from '@/lib/logger';
import { parsePaginationLimit, validateScorePayload } from '@/lib/validators';

const limitScoresReads = createRateLimiter({
  keyPrefix: 'scores:get',
  windowMs: 60 * 1000,
  max: 120,
});

const limitScoresWrites = createRateLimiter({
  keyPrefix: 'scores:post',
  windowMs: 60 * 1000,
  max: 30,
});

export async function GET(req: NextRequest) {
  const rateLimited = limitScoresReads(req);
  if (rateLimited) return rateLimited;

  const authResult = await requireAuth();
  if ('error' in authResult) return authResult.error;

  if (!hasClerkAuth || authResult.userId === 'anonymous' || !hasDatabase) {
    return NextResponse.json({ scores: [] });
  }

  try {
    const { prisma } = await import('@/lib/prisma');
    const limit = parsePaginationLimit(req.nextUrl.searchParams.get('limit'));
    const user = await prisma.user.findUnique({
      where: { clerkId: authResult.userId },
      include: {
        scores: { orderBy: { createdAt: 'desc' }, take: limit },
      },
    });

    return NextResponse.json({ scores: user?.scores ?? [] });
  } catch (error) {
    logger.error('Scores GET error', error, { userId: authResult.userId });
    return NextResponse.json({ scores: [], error: 'Database unavailable' });
  }
}

export async function POST(req: NextRequest) {
  const originError = enforceSameOrigin(req);
  if (originError) return originError;

  const rateLimited = limitScoresWrites(req);
  if (rateLimited) return rateLimited;

  const authResult = await requireAuth();
  if ('error' in authResult) return authResult.error;

  if (!hasClerkAuth || authResult.userId === 'anonymous' || !hasDatabase) {
    return NextResponse.json(
      { error: 'Sign in and configure a database to save scores' },
      { status: 503 },
    );
  }

  try {
    const json = await readJsonBody(req);
    if (!json.ok) return json.response;

    const validation = validateScorePayload(json.data);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }

    const user = await ensureDbUser(authResult.userId);
    const { prisma } = await import('@/lib/prisma');
    const payload = validation.data;

    const score = await prisma.score.create({
      data: {
        userId: user.id,
        module: payload.module,
        overall: payload.overall,
        ta: payload.ta,
        cc: payload.cc,
        lr: payload.lr,
        gra: payload.gra,
        fluency: payload.fluency,
        vocabulary: payload.vocabulary,
        grammar: payload.grammar,
        pronunciation: payload.pronunciation,
      },
    });

    return NextResponse.json({ success: true, score });
  } catch (error) {
    logger.error('Scores POST error', error, { userId: authResult.userId });
    return NextResponse.json({ error: 'Failed to save score' }, { status: 500 });
  }
}
