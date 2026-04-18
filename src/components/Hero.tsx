import type { ReactNode } from 'react';

interface HeroProps {
  onRoastClick: () => void;
  onFilePickerClick: () => void;
  results: { verdict: string } | null;
  rightContent?: ReactNode;
}

export default function Hero({ onRoastClick, onFilePickerClick, results, rightContent }: HeroProps) {
  return (
    <section className="grid gap-6 md:min-h-[72vh] md:grid-cols-[1.05fr_0.95fr] md:items-center">
      <div className="order-2 flex h-full items-center md:order-1">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-red-300 bg-red-100 px-4 py-2 text-sm font-bold text-red-700 shadow-[0_8px_24px_rgba(220,38,38,0.12)]">Live Pet Audits. Zero mercy. 💀</div>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-5xl font-black leading-none tracking-tight md:text-7xl">We Judged Your Pet. It&apos;s Not Looking Good 💀</h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-700 md:text-xl">Submit one suspicious little face and receive a dramatic courtroom stat card packed with fluff-based slander, betrayal science, and courtroom-certified chaos.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={onRoastClick} className="rounded-full bg-stone-950 px-8 py-4 text-lg font-black text-amber-50 shadow-[0_14px_34px_rgba(36,23,20,0.28)] button-pill">Roast My Pet 🔥</button>
            <button type="button" onClick={onFilePickerClick} className="rounded-full border-2 border-stone-950 bg-white/85 px-8 py-4 text-lg font-bold text-stone-900 button-pill">Choose Evidence 📸</button>
          </div>
          {results ? <div className="rounded-[30px] border border-black/10 bg-white/78 p-5 shadow-[0_20px_50px_rgba(66,31,0,0.12)] backdrop-blur"><p className="text-sm font-bold uppercase tracking-[0.2em] text-stone-500">Latest Verdict</p><p className="mt-3 text-3xl font-black text-stone-950">{results.verdict}</p><p className="mt-2 text-sm text-stone-600">The full card is ready to reopen, reshare, or weaponize in the family group chat.</p></div> : null}
        </div>
      </div>
      {rightContent && <div className="order-1 md:order-2">{rightContent}</div>}
    </section>
  );
}
