const socialProofItems = [
  { name: 'Pebble', emoji: 'DOG', verdict: 'Chaotic Neutral' },
  { name: 'Miso', emoji: 'CAT', verdict: 'Velvet Menace' },
  { name: 'Toast', emoji: 'BUN', verdict: 'Zoomies Icon' },
  { name: 'Nugget', emoji: 'BIRD', verdict: 'Witness Tamperer' },
  { name: 'Gizmo', emoji: 'LIZ', verdict: 'Cold-Blooded Diva' },
  { name: 'Muffin', emoji: 'HAM', verdict: 'Tiny Tyrant' },
];

export default function SocialProof() {
  return (
    <section className="mt-8 overflow-hidden rounded-[32px] border border-black/10 bg-white/72 p-4 shadow-[0_20px_50px_rgba(66,31,0,0.12)] backdrop-blur">
      <div className="flex gap-4 social-track">
        {[...socialProofItems, ...socialProofItems].map((item, index) => (
          <div key={`${item.name}-${index}`} className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-[0_8px_24px_rgba(66,31,0,0.1)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-rose-200 text-xs font-black text-stone-800">{item.emoji}</div>
            <div><p className="text-sm font-black text-stone-900">{item.name}</p><p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Just Judged: {item.verdict}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}
