'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const leaderboardPets = [
  { name: 'Mochi', category: 'Dogs', verdict: 'Certified Menace', chaos: 94, badge: 'Sock thief', emoji: 'DOG' },
  { name: 'Biscuit', category: 'Cats', verdict: 'Betrayal: Extreme', chaos: 88, badge: 'Curtain criminal', emoji: 'CAT' },
  { name: 'Pickles', category: 'Exotics', verdict: 'Too calm. Suspicious.', chaos: 72, badge: 'Cold-blooded diva', emoji: 'LIZ' },
  { name: 'Sir Beans', category: 'Other', verdict: 'Nap goblin', chaos: 66, badge: 'Unlicensed loaf', emoji: 'HAM' },
  { name: 'Pepper', category: 'Dogs', verdict: 'Hallway Tornado', chaos: 91, badge: 'Mailman enemy', emoji: 'DOG' },
  { name: 'Olive', category: 'Cats', verdict: 'Velvet saboteur', chaos: 83, badge: 'Keyboard sitter', emoji: 'CAT' },
];

const filters = ['All', 'Dogs', 'Cats', 'Exotics', 'Other'] as const;
type Filter = (typeof filters)[number];

export default function HallOfShamePage() {
  const [filter, setFilter] = useState<Filter>('All');
  const [sortDescending, setSortDescending] = useState(true);

  const visiblePets = useMemo(() => {
    const filtered = filter === 'All' ? leaderboardPets : leaderboardPets.filter((pet) => pet.category === filter);
    return [...filtered].sort((a, b) => (sortDescending ? b.chaos - a.chaos : a.chaos - b.chaos));
  }, [filter, sortDescending]);

  return (
    <main className="min-h-screen px-4 py-8 text-stone-900">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[36px] border border-black/10 bg-white/78 p-6 shadow-[0_24px_80px_rgba(66,31,0,0.14)] backdrop-blur">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-stone-500">Hall of Shame</p>
              <h1 className="mt-2 text-4xl font-black md:text-6xl">Repeat offenders and vibe felons</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">Filter by category, sort by chaos energy, and admire the most legally concerning pets on record.</p>
            </div>
            <Link href="/" className="rounded-full border border-stone-900 bg-stone-950 px-6 py-3 text-sm font-black text-amber-50 transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(66,31,0,0.16)]">Back to Court</Link>
          </div>

          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-3">
              {filters.map((option) => (
                <button key={option} type="button" onClick={() => setFilter(option)} className={`rounded-full px-4 py-2 text-sm font-black transition ${filter === option ? 'bg-red-600 text-white shadow-[0_14px_28px_rgba(220,38,38,0.2)]' : 'bg-stone-100 text-stone-700 hover:-translate-y-0.5'}`}>
                  {option}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setSortDescending((value) => !value)} className="rounded-full border border-stone-900 bg-white px-5 py-2 text-sm font-black text-stone-900 transition hover:-translate-y-0.5">Sort by Chaos Energy: {sortDescending ? 'Highest First' : 'Lowest First'}</button>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visiblePets.map((pet) => (
              <article key={`${pet.name}-${pet.category}`} className="rounded-[30px] border border-black/10 bg-[#fff9ef] p-5 shadow-[0_20px_50px_rgba(66,31,0,0.1)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-rose-200 text-xs font-black text-stone-800">{pet.emoji}</div>
                    <div><p className="text-xl font-black text-stone-950">{pet.name}</p><p className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">{pet.category}</p></div>
                  </div>
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-red-700">{pet.chaos}%</span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-4 py-4"><p className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">Verdict</p><p className="mt-2 text-lg font-black text-stone-900">{pet.verdict}</p></div>
                  <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-4 py-4"><p className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">Notes</p><p className="mt-2 text-lg font-black text-stone-900">{pet.badge}</p></div>
                </div>
                <div className="mt-5 rounded-[24px] border-[3px] border-red-700 px-4 py-3 text-center text-lg font-black uppercase tracking-[0.16em] text-red-700">Hall of Shame</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
