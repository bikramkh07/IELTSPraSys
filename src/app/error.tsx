'use client';

import { useEffect } from 'react';
import AppShell from '@/components/AppShell';

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Route error:', { message: error.message, digest: error.digest });
  }, [error]);

  return (
    <AppShell>
      <section className="content-section center-state" role="alert">
        <div className="section-label">Something went wrong</div>
        <h1 className="section-h2">We could not load this page.</h1>
        <p className="section-sub">
          Please try again. If the problem continues, the error has been logged for review.
        </p>
        <button type="button" className="btn-primary" onClick={reset}>
          Try again
        </button>
      </section>
    </AppShell>
  );
}
