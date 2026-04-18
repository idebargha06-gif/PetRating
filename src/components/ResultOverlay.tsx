'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import type { ResultCard, RevealState } from '@/hooks/usePetRating';

interface ResultOverlayProps {
  overlayOpen: boolean;
  analysisMessage: string;
  results: ResultCard | null;
  revealed: RevealState;
  chaosDisplay: number;
  previewUrl: string | null;
  confettiVisible: boolean;
  shareFeedback: string;
  saveFeedback: string;
  downloadFeedback: string;
  onClose: () => void;
  onShare: () => void;
  onSave: () => void;
  onDownload: () => void;
  onResetAndUpload: () => void;
  onFilePickerClick: () => void;
}

export default function ResultOverlay({
  overlayOpen,
  analysisMessage,
  results,
  revealed,
  chaosDisplay,
  previewUrl,
  confettiVisible,
  shareFeedback,
  saveFeedback,
  downloadFeedback,
  onClose,
  onShare,
  onSave,
  onDownload,
  onResetAndUpload,
  onFilePickerClick,
}: ResultOverlayProps) {
  const confettiItems = useMemo(() => Array.from({ length: 18 }, (_, index) => ({ id: index, badge: ['*', '!', '+'][index % 3], left: 8 + index * 5, delay: index * 0.04, duration: 0.9 + (index % 4) * 0.15 })), []);

  if (!overlayOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,79,79,0.2),transparent_30%),linear-gradient(180deg,rgba(15,7,7,0.92)_0%,rgba(33,10,10,0.95)_100%)] px-4 py-6" onClick={onClose}>
      <div className="relative w-full max-w-5xl overflow-hidden rounded-[38px] border border-red-900/20 bg-[#f7efdf] p-6 text-stone-900 shadow-[0_30px_120px_rgba(0,0,0,0.45)] md:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="paper-texture" />
        <div className="classified-stamp">CLASSIFIED</div>
        <div className="relative z-10 max-h-[85vh] overflow-y-auto pr-2">
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_1fr] xl:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-5">
              <div className="inline-flex rounded-full bg-stone-950 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-amber-50">Sound Off</div>
              <div className="rounded-[28px] border border-stone-200 bg-white/85 p-5 shadow-[0_18px_40px_rgba(66,31,0,0.08)]">
                <p className="text-4xl">SKETCH</p>
                <p className="mt-3 text-sm font-black uppercase tracking-[0.24em] text-stone-500">Courtroom Sketch</p>
                <h2 className="mt-3 text-3xl font-black md:text-4xl">Tiny court is now reviewing the evidence</h2>
                <div className="mt-5 flex items-center gap-3"><div className="gavel-bang text-4xl">🔨</div><div><p className="text-sm font-semibold text-stone-500">Gavel Sequence</p><p className="text-lg font-black text-stone-950">3 ceremonial bonks</p></div></div>
                <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{analysisMessage}</p>
              </div>
              <div className="overflow-hidden rounded-[28px] bg-stone-950 shadow-[0_20px_50px_rgba(49,20,20,0.28)]">
                {previewUrl ? <Image src={previewUrl} alt="Pet evidence" width={520} height={520} unoptimized className="h-72 w-full object-cover" /> : <div className="flex h-72 items-center justify-center text-amber-50/80">Evidence missing. Suspicious.</div>}
              </div>
            </div>
            <div className="relative rounded-[30px] border border-stone-200 bg-white/88 p-5 shadow-[0_18px_40px_rgba(66,31,0,0.08)]">
              {confettiVisible ? <div className="pointer-events-none absolute inset-0 overflow-hidden">{confettiItems.map((item) => <span key={item.id} className="confetti" style={{ left: `${item.left}%`, animationDelay: `${item.delay}s`, animationDuration: `${item.duration}s` }}>{item.badge}</span>)}</div> : null}
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                {[
                  ['Chaos Energy', revealed.chaosEnergy ? `${chaosDisplay}%` : '--', 'text-amber-600'],
                  ['Betrayal Capacity', revealed.betrayalCapacity ? results?.betrayalCapacity : '--', 'text-red-700'],
                  ['Fluff Factor', revealed.fluffFactor ? results?.fluffFactor : '--', ''],
                  ['Zoomies Level', revealed.zoomiesLevel ? results?.zoomiesLevel : '--', ''],
                  ['Regret Index', revealed.regretIndex ? results?.regretIndex : '--', ''],
                  ['Nap Proficiency', revealed.napProficiency ? results?.napProficiency : '--', ''],
                ].map(([label, value, extra], index) => (
                  <div key={String(label)} className={`stat-card ${(Object.values(revealed)[index] ? 'revealed ' : '')}${index === 1 && revealed.betrayalCapacity ? 'flicker-card' : ''}`}>
                    <p className="stat-label">{label}</p>
                    <p className={`stat-value ${extra}`}>{value}</p>
                  </div>
                ))}
              </div>
              {revealed.verdict && results ? (
                <div className="verdict-shell mt-5 rounded-[30px] border border-red-300 bg-[#fff9ef] p-5 shadow-[0_18px_40px_rgba(66,31,0,0.08)]">
                  <div className="spin-stamp">CERTIFIED MENACE</div>
                  <p className="text-sm font-black uppercase tracking-[0.24em] text-stone-500">Final Verdict</p>
                  <div className="verdict-rubber mt-4 inline-block rounded-md border-[3px] border-red-700 px-5 py-3 text-2xl font-black uppercase text-red-700">{results.verdict}</div>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <button type="button" onClick={onShare} className="rounded-full bg-red-600 px-6 py-3 text-sm font-black text-white shadow-[0_16px_34px_rgba(220,38,38,0.26)] button-pill">Share Card</button>
                    <button type="button" onClick={onSave} className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-black text-white shadow-[0_16px_34px_rgba(168,85,247,0.26)] button-pill">Save to Portfolio 📁</button>
                    <button type="button" onClick={() => { onClose(); onFilePickerClick(); }} className="rounded-full bg-amber-300 px-6 py-3 text-sm font-black text-stone-950 button-pill">Expose This Criminal 📸</button>
                    <button type="button" onClick={onClose} className="rounded-full border border-stone-900 bg-transparent px-6 py-3 text-sm font-black text-stone-900 button-pill">Judge Another</button>
                    <button type="button" onClick={onDownload} className="rounded-full border border-stone-900 bg-white px-6 py-3 text-sm font-black text-stone-900 button-pill">Download Card</button>
                  </div>
                  {shareFeedback ? <p className="mt-3 text-sm font-semibold text-red-700">{shareFeedback}</p> : null}
                  {saveFeedback ? <p className="mt-3 text-sm font-semibold text-purple-700">{saveFeedback}</p> : null}
                  {downloadFeedback ? <p className="mt-2 text-sm font-semibold text-stone-700">{downloadFeedback}</p> : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
