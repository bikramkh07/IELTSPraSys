/** Public Clerk config. Safe to import from client components. */
export const clerkPublishableKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '';

export const hasClerk = !!clerkPublishableKey;
