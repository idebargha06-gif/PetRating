"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "../ThemeMode";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header className={`w-full sticky top-0 z-50 ${theme === "cute" ? "bg-transparent" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className={`mx-auto w-full max-w-5xl flex items-center justify-between py-3 px-4 ${theme === "cute" ? "bg-white/80 border-4 border-pink-200 rounded-lg shadow-[8px_8px_0_0_rgba(0,0,0,0.06)]" : "bg-white border-4 border-black rounded-none shadow-[8px_8px_0_0_#000]"}`}>
          <Link href="/" className="flex items-center gap-3 -ml-2">
            <span className={`text-3xl transform ${theme === "cute" ? "-rotate-12" : "-rotate-6"}`}>🐾</span>
            <div className="leading-tight">
              <span className={`block font-extrabold text-lg ${theme === "cute" ? "text-purple-700" : "text-black"}`}>PAWNDORA</span>
              <span className={`text-xs tracking-widest ${theme === "cute" ? "text-pink-500" : "text-black/70"}`}>Rate. Roast. Repeat.</span>
            </div>
          </Link>

          <nav className="hidden md:flex gap-4 items-center">
            <Link href="/about" className={`px-3 py-1 ${theme === "cute" ? "bg-pink-50 border-2 border-pink-200 rounded-md" : "bg-white/0 border-2 border-black rounded-none"}`}>About</Link>
            <Link href="/blog" className={`px-3 py-1 ${theme === "cute" ? "bg-pink-50 border-2 border-pink-200 rounded-md" : "bg-white/0 border-2 border-black rounded-none"}`}>Blog</Link>
            <Link href="/pet-tips" className={`px-3 py-1 ${theme === "cute" ? "bg-pink-50 border-2 border-pink-200 rounded-md" : "bg-white/0 border-2 border-black rounded-none"}`}>Pet Tips</Link>
            <Link href="/contact" className={`px-3 py-1 ${theme === "cute" ? "bg-pink-50 border-2 border-pink-200 rounded-md" : "bg-white/0 border-2 border-black rounded-none"}`}>Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className={`hidden md:inline-flex items-center gap-2 px-3 py-1 font-black text-sm transition-all focus:outline-none ${theme === "cute" ? "bg-pink-500 text-white border-2 border-pink-600 rounded-md" : "bg-black text-white border-2 border-black rounded-sm"}`}
              aria-pressed={theme === "cute"}
              aria-label="Toggle theme"
            >
              {theme === "cute" ? "✨ Cute" : "💅 Sassy"}
            </button>

            <button
              className={`flex items-center gap-2 px-3 py-1 text-sm transition-all focus:outline-none ${theme === "cute" ? "bg-white border-2 border-pink-100 rounded-md" : "bg-white text-black border-2 border-black rounded-sm shadow-[6px_6px_0_0_#000]"}`}
              aria-label="Profile"
            >
              <span className={`w-8 h-8 rounded flex items-center justify-center ${theme === "cute" ? "bg-pink-100" : "bg-yellow-200"}`}>👑</span>
              <span className="hidden sm:inline font-bold">Profile</span>
            </button>

            <button
              className="md:hidden p-2 rounded-md border-2 border-black"
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
        <div className={`md:hidden mt-3 mx-4 p-4 ${theme === "cute" ? "bg-white/95 border-2 border-pink-100 rounded-md" : "bg-white/95 border-2 border-black rounded-sm"} shadow-lg`}>
          <nav className="flex flex-col gap-3">
            <Link href="/about" onClick={() => setOpen(false)} className="font-semibold">About</Link>
            <Link href="/blog" onClick={() => setOpen(false)} className="font-semibold">Blog</Link>
            <Link href="/pet-tips" onClick={() => setOpen(false)} className="font-semibold">Pet Tips</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="font-semibold">Contact</Link>
            <div className="pt-2 border-t mt-2">
              <button
                onClick={() => { toggle(); setOpen(false); }}
                className={`w-full text-left px-3 py-2 font-black ${theme === "cute" ? "bg-pink-500 text-white rounded-md" : "bg-black text-white rounded-sm"}`}
              >
                {theme === "cute" ? "✨ Cute Mode" : "💅 Sassy Mode"}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
