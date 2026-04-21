"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "../ThemeMode";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const isCuteMode = theme === "cute";

  return (
    <header className={`w-full relative ${isCuteMode ? "bg-transparent" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className={`mx-auto w-full max-w-3xl flex items-center justify-between py-1 px-3 transform transition-all ${isCuteMode ? "bg-white/80 border-2 border-pink-200 rounded-xl shadow-[6px_6px_0_0_rgba(0,0,0,0.06)]" : "bg-white border-2 border-black shadow-[6px_6px_0_0_#000]"}`} style={{ transform: "rotate(-1deg)" }}>
          <Link href="/" className="flex items-center gap-2 -ml-2">
            <span className={`text-4xl transform animate-bounce ${isCuteMode ? "-rotate-12" : "-rotate-6"}`}>🐾</span>
            <div className="leading-tight">
              <span className={`block font-extrabold text-2xl transform rotate-1 ${isCuteMode ? "text-purple-700" : "text-black"}`}>PAWNDORA</span>
              <span className={`text-sm font-bold tracking-widest ${isCuteMode ? "text-pink-500" : "text-black/70"}`}>
                {isCuteMode ? "Rate. Roast. Repeat. 💕" : "Rate. Roast. Repeat. 💅"}
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex gap-2 items-center transform rotate-1">
            <Link href="/blog" className={`px-2 py-1 text-sm font-black uppercase tracking-widest transition-all hover:scale-110 ${isCuteMode ? "bg-pink-100 text-purple-700 rounded-full border-2 border-pink-200" : "bg-white/0 border-2 border-black hover:shadow-[4px_4px_0_0_#000]"}`}>
              {isCuteMode ? "Blog 💕" : "Blog 💅"}
            </Link>
            <Link href="/pet-tips" className={`px-2 py-1 text-sm font-black uppercase tracking-widest transition-all hover:scale-110 ${isCuteMode ? "bg-pink-100 text-purple-700 rounded-full border-2 border-pink-200" : "bg-white/0 border-2 border-black hover:shadow-[4px_4px_0_0_#000]"}`}>
              {isCuteMode ? "Pet Tips 💕" : "Pet Tips 💅"}
            </Link>
            <Link href="/care-guide" className={`px-2 py-1 text-sm font-black uppercase tracking-widest transition-all hover:scale-110 ${isCuteMode ? "bg-pink-100 text-purple-700 rounded-full border-2 border-pink-200" : "bg-white/0 border-2 border-black hover:shadow-[4px_4px_0_0_#000]"}`}>
              {isCuteMode ? "Care Guide 💕" : "Care Guide 💅"}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-md border-2 border-black transform hover:scale-110 transition-all"
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-current">
                {open ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <>
                    <path d="M3 12h18" />
                    <path d="M3 6h18" />
                    <path d="M3 18h18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className={`md:hidden mt-3 mx-4 p-6 transform transition-all ${isCuteMode ? "bg-white/95 border-4 border-pink-200 rounded-3xl shadow-lg" : "bg-white/95 border-4 border-black shadow-[8px_8px_0_0_#000]"}`} style={{ transform: "rotate(1deg)" }}>
          <nav className="flex flex-col gap-4">
            <Link href="/blog" onClick={() => setOpen(false)} className="font-black uppercase tracking-widest text-lg">
              {isCuteMode ? "Blog 💕" : "Blog 💅"}
            </Link>
            <Link href="/pet-tips" onClick={() => setOpen(false)} className="font-black uppercase tracking-widest text-lg">
              {isCuteMode ? "Pet Tips 💕" : "Pet Tips 💅"}
            </Link>
            <Link href="/care-guide" onClick={() => setOpen(false)} className="font-black uppercase tracking-widest text-lg">
              {isCuteMode ? "Care Guide 💕" : "Care Guide 💅"}
            </Link>
            <div className="pt-4 border-t mt-4">
              <button
                onClick={() => { toggle(); setOpen(false); }}
                className={`w-full text-left px-4 py-3 font-black uppercase tracking-widest ${isCuteMode ? "bg-pink-500 text-white rounded-full shadow-lg" : "bg-black text-white shadow-[8px_8px_0_0_#000]"}`}
              >
                {isCuteMode ? "✨ Cute Mode 💕" : "💅 Sassy Mode 💅"}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
