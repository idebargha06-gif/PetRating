'use client';

export const dynamic = 'force-dynamic';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Oops!</h1>
        <p>{error.message || 'Something went wrong'}</p>
        <button onClick={reset}>Try Again</button>
      </div>
    </main>
  );
}
