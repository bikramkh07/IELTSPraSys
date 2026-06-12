import Link from 'next/link';
import AppShell from '@/components/AppShell';

export default function NotFound() {
  return (
    <AppShell>
      <section className="content-section center-state">
        <div className="section-label">404</div>
        <h1 className="section-h2">Page not found</h1>
        <p className="section-sub">
          The page you are looking for is not available or has moved.
        </p>
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
      </section>
    </AppShell>
  );
}
