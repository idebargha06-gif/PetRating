'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PetUploadForm } from '@/components/pet/PetUploadForm';
import { useSession } from 'next-auth/react';

export default function RatePetPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [router, status]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-semibold"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Rate Your Pet</h1>
          <div className="w-16" />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <PetUploadForm
            onSuccess={(petId) => {
              router.push(`/pet/${petId}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
