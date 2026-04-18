import Link from 'next/link';

const hallOfShamePreview = [
  { name: 'Mochi', category: 'Dog', verdict: 'Certified Menace', chaos: 94 },
  { name: 'Biscuit', category: 'Cat', verdict: 'Velvet Saboteur', chaos: 88 },
  { name: 'Pickles', category: 'Exotic', verdict: 'Too Calm. Suspicious.', chaos: 72 },
];

export default function HallOfShamePreview() {
  return (
    <section className="mt-8 rounded-[32px] border border-black/10 bg-white/74 p-6 shadow-[0_20px_50px_rgba(66,31,0,0.12)] backdrop-blur">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-stone-500">Hall of Shame Preview</p>
          <h2 className="mt-2 text-3xl font-black text-stone-950">Repeat offenders</h2>
        </div>
        <Link href="/hall-of-shame" className="rounded-full border border-stone-900 bg-white px-5 py-3 text-sm font-black text-stone-950 button-pill">Open Leaderboard</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {hallOfShamePreview.map((pet) => (
          <div key={pet.name} className="rounded-[26px] border border-black/10 bg-stone-50 p-5 shadow-[0_16px_40px_rgba(66,31,0,0.08)]">
            <div className="flex items-center justify-between">
              <p className="text-lg font-black text-stone-950">{pet.name}</p>
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-red-700">{pet.category}</span>
            </div>
            <p className="mt-3 text-sm font-semibold text-stone-600">{pet.verdict}</p>
            <p className="mt-4 text-3xl font-black text-stone-950">{pet.chaos}%</p>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Chaos Energy</p>
          </div>
        ))}
      </div>
    </section>
  );
}
