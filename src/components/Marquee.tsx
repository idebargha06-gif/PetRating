const marqueeVerdicts = [
  'Mochi the Shiba - Certified Menace',
  'Biscuit the Cat - Betrayal Level: Extreme',
  'Sir Fluffington - 94% Chaos Energy',
  'Beans the Hamster - Nap Proficiency: Criminally Elite',
  'Pickles the Iguana - Regret Index: 3%',
];

export default function Marquee() {
  return (
    <div className="mb-4 overflow-hidden rounded-full border border-stone-200/80 bg-white/65 px-4 py-2 shadow-[0_10px_30px_rgba(85,45,12,0.08)] backdrop-blur marquee-shell">
      <div className="marquee-track">
        {[...marqueeVerdicts, ...marqueeVerdicts].map((item, index) => (
          <span key={`${item}-${index}`} className="marquee-item">{item}</span>
        ))}
      </div>
    </div>
  );
}
