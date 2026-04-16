'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-gradient-to-br from-purple-900 to-pink-800">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold text-white mb-4">Critical Error</h1>
          <p className="text-xl text-gray-200 mb-8">An unexpected error occurred</p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-white text-purple-900 font-bold rounded-lg hover:bg-gray-100 transition"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
