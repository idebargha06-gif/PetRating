'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getUserPortfolio, removePetFromPortfolio, getPortfolioRarityScore, type Pet } from '@/lib/pets';
import { Providers } from '@/app/providers';

function PortfolioPageContent() {
  const { data: session, status } = useSession();
  const [pets, setPets] = useState<Pet[]>([]);
  const [rarityScore, setRarityScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error] = useState('');

  async function loadPortfolio(userId: string) {
    setLoading(true);
    const portfolio = await getUserPortfolio(userId);
    setPets(portfolio);
    const score = await getPortfolioRarityScore(portfolio);
    setRarityScore(score);
    setLoading(false);
  }

  useEffect(() => {
    const userEmail = session?.user?.email;

    if (status === 'authenticated' && userEmail) {
      const timer = window.setTimeout(() => {
        void loadPortfolio(userEmail);
      }, 0);

      return () => {
        window.clearTimeout(timer);
      };
    }
  }, [status, session]);

  const handleRemove = async (petId: string) => {
    if (confirm('Remove this pet from your portfolio?')) {
      const success = await removePetFromPortfolio(petId);
      if (success && session?.user?.email) {
        loadPortfolio(session.user.email);
      }
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-[#f7efdf] flex items-center justify-center">
        <p className="text-stone-600">Loading portfolio...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-[#f7efdf] flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-black text-stone-900 mb-4">Portfolio</h1>
        <p className="text-stone-600 mb-6">Please sign in to view your portfolio</p>
        <Link href="/" className="px-6 py-3 bg-red-600 text-white font-bold rounded-full">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <Providers>
      <div className="min-h-screen bg-[#f7efdf]">
        <nav className="sticky top-0 z-50 bg-[#f7efdf]/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black text-stone-900">
            Pawndora
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-stone-600">Portfolio Rarity: {rarityScore}</span>
            <span className="text-sm font-bold text-stone-600">{pets.length} Pets</span>
          </div>
        </div>
      </nav>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-black text-stone-900 mb-2">Your Portfolio</h1>
          <p className="text-stone-600 mb-8">Your collection of judged pets</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {pets.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-stone-600 mb-4">No pets in your portfolio yet</p>
            <Link href="/" className="px-6 py-3 bg-red-600 text-white font-bold rounded-full">
              Rate Some Pets
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div key={pet.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-stone-200">
                {pet.photo_url && (
                  <div className="relative h-48 bg-stone-100">
                    <Image
                      src={pet.photo_url}
                      alt={pet.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-xl font-bold text-stone-900 mb-1">{pet.name}</h3>
                  <p className="text-sm text-stone-600 mb-3">{pet.breed || 'Unknown breed'} • {pet.type || 'Unknown type'}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600">Chaos Energy:</span>
                      <span className="font-bold text-stone-900">{pet.chaos_energy}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600">Betrayal:</span>
                      <span className="font-bold text-stone-900">{pet.betrayal_capacity || '--'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600">Verdict:</span>
                      <span className="font-bold text-red-700">{pet.verdict || '--'}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemove(pet.id)}
                    className="w-full px-4 py-2 bg-stone-100 text-stone-700 font-bold rounded-lg hover:bg-stone-200 transition-colors"
                  >
                    Remove from Portfolio
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </Providers>
  );
}

export default function PortfolioPage() {
  return (
    <Providers>
      <PortfolioPageContent />
    </Providers>
  );
}
