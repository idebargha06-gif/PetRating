'use client';

import Image from 'next/image';
import type { RefObject } from 'react';
import { canRateToday } from '@/lib/userProfile';

interface UploadSectionProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  selectedFile: File | null;
  previewUrl: string | null;
  uploadFeedback: string;
  onFilePickerClick: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  onBuyExtraRating?: () => void;
  purchaseFeedback: string;
  results: any;
  userProfile: any;
  status: string;
}

export default function UploadSection({
  fileInputRef,
  selectedFile,
  previewUrl,
  uploadFeedback,
  onFilePickerClick,
  onFileChange,
  onUpload,
  onBuyExtraRating,
  purchaseFeedback,
  results,
  userProfile,
  status,
}: UploadSectionProps) {
  return (
    <div className="order-1 md:order-2">
      <div className="rounded-[38px] border border-black/10 bg-white/82 p-6 shadow-[0_24px_80px_rgba(66,31,0,0.16)] backdrop-blur">
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
        <div className="flex flex-col gap-5">
          <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-stone-500">Upload Tribunal</p><h2 className="mt-2 text-3xl font-black text-stone-950">Submit your furry defendant</h2></div>
          <div className="flex min-h-64 items-center justify-center overflow-hidden rounded-[28px] bg-stone-950 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
            {previewUrl ? <Image src={previewUrl} alt="Selected pet preview" width={500} height={500} unoptimized className="h-full w-full object-cover" /> : <div className="space-y-3 px-6 text-center text-amber-50"><p className="text-6xl">📸</p><p className="text-xl font-black">No pet evidence loaded</p><p className="text-sm text-amber-50/75">Choose a photo to begin the trial. The court loves drama.</p></div>}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={onFilePickerClick} className="rounded-full bg-stone-950 px-5 py-3 text-base font-black text-amber-50 button-pill">⇄ {selectedFile ? 'Swap Suspect' : 'Choose Pet Image'}</button>
            <button type="button" onClick={onUpload} className="rounded-full bg-amber-300 px-5 py-3 text-base font-black text-stone-950 button-pill">Upload Pet</button>
          </div>
          <p className="rounded-2xl bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-950">{uploadFeedback || 'Pick a photo and launch the trial. No scrolling required.'}</p>
          {status === 'authenticated' && userProfile && !canRateToday(userProfile) && (userProfile?.coins || 0) >= 50 && onBuyExtraRating && (
            <button type="button" onClick={onBuyExtraRating} className="rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-3 text-base font-black text-amber-950 button-pill">
              Buy Extra Rating (50 coins)
            </button>
          )}
          {purchaseFeedback && <p className="rounded-2xl bg-purple-100 px-4 py-3 text-sm font-semibold text-purple-950">{purchaseFeedback}</p>}
          {!results ? <div className="rounded-[28px] border-2 border-dashed border-stone-300 bg-stone-50 p-5 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)] breathing-preview"><p className="text-xs font-black uppercase tracking-[0.28em] text-stone-500">Awaiting Judgment</p><div className="mt-4 grid gap-3 sm:grid-cols-3">{['Chaos Energy','Betrayal Capacity','Fluff Factor'].map((label, index) => <div key={label} className="rounded-2xl bg-white/90 px-4 py-5 shadow-[0_10px_24px_rgba(66,31,0,0.08)]"><p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">{label}</p><p className="mt-2 text-lg font-black text-stone-800">{['???','CLASSIFIED','PENDING'][index]}</p></div>)}</div></div> : null}
        </div>
      </div>
    </div>
  );
}
