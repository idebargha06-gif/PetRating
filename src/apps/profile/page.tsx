'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import { Providers } from '@/app/providers';

function ProfilePageContent() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50">
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <Link href="/" className="text-3xl font-bold">
          🐾 Pawndora
        </Link>
        <div className="flex gap-4 items-center">
            <Link
            href="/rate-pet"
            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all"
          >
            🐾 Rate Pet
          </Link>
          <button
            onClick={async () => {
              await signOut({ redirect: true });
            }}
            className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <p className="text-lg text-gray-900">{session?.user?.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <p className="text-lg text-gray-900">{session?.user?.name || 'Not set'}</p>
            </div>

            {session?.user?.image && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Avatar
                </label>
                <img
                  src={session.user.image}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full"
                />
              </div>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link
              href="/rate-pet"
              className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              🐕 Start Rating Your Pet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Providers>
      <ProfilePageContent />
    </Providers>
  );
}
