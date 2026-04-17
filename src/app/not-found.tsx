export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-pink-800">
      <h1 className="text-4xl font-bold text-white mb-4">404</h1>
      <p className="text-xl text-gray-200 mb-8">Page not found</p>
      <a
        href="/"
        className="px-6 py-3 bg-white text-purple-900 font-bold rounded-lg hover:bg-gray-100 transition"
      >
        Go Home
      </a>
    </div>
  );
}
