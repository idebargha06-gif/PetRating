'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-pink-800">
      <h1 className="text-4xl font-bold text-white mb-4">Oops!</h1>
      <p className="text-xl text-gray-200 mb-8">Something went wrong</p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-white text-purple-900 font-bold rounded-lg hover:bg-gray-100 transition"
      >
        Try Again
      </button>
    </div>
  );
}
