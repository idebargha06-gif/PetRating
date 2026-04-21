"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "../ThemeMode";

export default function Footer() {
  const { theme } = useTheme();
  const isCuteMode = theme === "cute";

  return (
    <footer className={`w-full py-12 mt-12 ${isCuteMode ? "bg-purple-100 text-purple-700" : "bg-black text-white"}`}>
      <div className="max-w-7xl mx-auto">
        <div className={`mx-auto w-full max-w-5xl px-4 flex flex-col md:flex-row items-center justify-between gap-8`}>
          <div className="flex items-start gap-3 transform -rotate-2">
            <span className={`text-4xl ${isCuteMode ? "text-pink-500" : "text-yellow-300"}`}>🐾</span>
            <div>
              <div className="font-black text-xl transform rotate-1">{isCuteMode ? "PAWNDORA 💕" : "PAWNDORA 💅"}</div>
              <div className={`text-sm font-semibold ${isCuteMode ? "text-purple-500" : "text-white/70"}`}>
                {isCuteMode ? "Rate. Roast. Repeat. 💕" : "Rate. Roast. Repeat. 💅"}
              </div>
            </div>
          </div>

          <nav className="flex gap-6 items-center transform rotate-1">
            <Link href="/" className={`text-sm font-black uppercase tracking-widest ${isCuteMode ? "hover:text-pink-600" : "hover:text-pink-400"}`}>
              {isCuteMode ? "Home 💕" : "Home 💅"}
            </Link>
            <Link href="/blog" className={`text-sm font-black uppercase tracking-widest ${isCuteMode ? "hover:text-pink-600" : "hover:text-pink-400"}`}>
              {isCuteMode ? "Blog 💕" : "Blog 💅"}
            </Link>
            <Link href="/pet-tips" className={`text-sm font-black uppercase tracking-widest ${isCuteMode ? "hover:text-pink-600" : "hover:text-pink-400"}`}>
              {isCuteMode ? "Pet Tips 💕" : "Pet Tips 💅"}
            </Link>
            <Link href="/care-guide" className={`text-sm font-black uppercase tracking-widest ${isCuteMode ? "hover:text-pink-600" : "hover:text-pink-400"}`}>
              {isCuteMode ? "Care Guide 💕" : "Care Guide 💅"}
            </Link>
          </nav>

          <div className="text-sm text-center md:text-right transform -rotate-1">
            <div className={`font-black uppercase tracking-widest ${isCuteMode ? "text-purple-600" : "text-white/80"}`}>
              © {new Date().getFullYear()} Pawndora
            </div>
            <div className={`text-xs font-semibold ${isCuteMode ? "text-purple-500" : "text-white/60"}`}>
              {isCuteMode ? "Made with love for all pets 💕" : "Made with chaos. Deal with it. 💅"}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
