import { SITE_URL } from '@/lib/site-config';

/** Server-only deployment switches. Do not import this file from client components. */
export const hasClerkAuth =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !!process.env.CLERK_SECRET_KEY;

export const hasDatabase = !!process.env.DATABASE_URL;

export function getAllowedOrigins(): Set<string> {
  const origins = new Set<string>([SITE_URL]);



  if (process.env.NODE_ENV !== 'production') {
    origins.add('http://localhost:3000');
    origins.add('http://127.0.0.1:3000');
  }

  return origins;
}

export function getDatabaseUrlScheme(): string | null {
  const value = process.env.DATABASE_URL;
  return value?.match(/^"?([^:"]+):/)?.[1] ?? null;
}
