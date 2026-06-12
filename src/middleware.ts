import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { hasClerkAuth } from '@/lib/server-config';

const isProtectedApi = createRouteMatcher([
  '/api/writing(.*)',
  '/api/speaking(.*)',
  '/api/scores(.*)',
]);

export default hasClerkAuth
  ? clerkMiddleware(async (auth, req) => {
      if (isProtectedApi(req)) {
        const { userId } = await auth();
        if (!userId) {
          return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
        }
      }
    })
  : () => NextResponse.next();

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
