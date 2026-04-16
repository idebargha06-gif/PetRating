export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>404</h1>
        <p>Page not found</p>
      </div>
    </main>
  );
}
