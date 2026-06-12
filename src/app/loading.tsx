export default function Loading() {
  return (
    <main className="page-loading" aria-busy="true" aria-live="polite">
      <div className="loading-mark" />
      <span>Loading IELTSPracSYS...</span>
    </main>
  );
}
