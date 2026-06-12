export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ??
  'https://your-domain.com';

export const SITE_NAME = 'IELTSPracSYS';

export const STATIC_ROUTES = [
  '/',
  '/features',
  '/practice',
  '/mock-test',
  '/mock-exam',
  '/progress',
  '/reviews',
] as const;
