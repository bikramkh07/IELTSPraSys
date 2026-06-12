import { NextResponse, type NextRequest } from 'next/server';
import { getAllowedOrigins } from '@/lib/server-config';

type RateLimitOptions = {
  keyPrefix: string;
  windowMs: number;
  max: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const stores = new Map<string, Map<string, RateLimitEntry>>();

function getRequestIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0]?.trim() || 'unknown';
  return req.headers.get('x-real-ip') ?? 'unknown';
}

export function createRateLimiter({ keyPrefix, windowMs, max }: RateLimitOptions) {
  const store = stores.get(keyPrefix) ?? new Map<string, RateLimitEntry>();
  stores.set(keyPrefix, store);

  return (req: Request): NextResponse | null => {
    const now = Date.now();
    const key = `${keyPrefix}:${getRequestIp(req)}`;
    const current = store.get(key);

    if (!current || current.resetAt <= now) {
      store.set(key, { count: 1, resetAt: now + windowMs });
      return null;
    }

    current.count += 1;
    if (current.count <= max) return null;

    const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
    return NextResponse.json(
      { error: 'Too many requests. Please try again shortly.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
          'X-RateLimit-Limit': String(max),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil(current.resetAt / 1000)),
        },
      },
    );
  };
}

export function enforceSameOrigin(req: NextRequest): NextResponse | null {
  const origin = req.headers.get('origin');
  if (!origin) return null;

  if (getAllowedOrigins().has(origin)) return null;

  return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 });
}

export async function readJsonBody(req: Request): Promise<
  { ok: true; data: unknown } | { ok: false; response: NextResponse }
> {
  try {
    return { ok: true, data: await req.json() };
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Malformed JSON body' }, { status: 400 }),
    };
  }
}

export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  label = 'Operation',
): Promise<T> {
  let timeout: ReturnType<typeof setTimeout>;

  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timeout = setTimeout(() => reject(new Error(`${label} timed out`)), timeoutMs);
      }),
    ]);
  } finally {
    clearTimeout(timeout!);
  }
}
