"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "../ThemeMode";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`w-full py-8 mt-12 ${theme === "cute" ? "bg-gradient-to-r from-pink-50 to-purple-50 text-purple-800" : "bg-black text-white"}`}>
      <div className="max-w-7xl mx-auto">
        <div className={`mx-auto w-full max-w-5xl px-4 flex flex-col md:flex-row items-center justify-between gap-4`}>
          <div className="flex items-start gap-3">
            <span className={`text-3xl ${theme === "cute" ? "text-pink-500" : "text-yellow-300"}`}>🐾</span>
            <div>
              <div className="font-black text-lg">PAWNDORA</div>
              <div className={`text-xs ${theme === "cute" ? "text-purple-500" : "text-white/70"}`}>Rate. Roast. Repeat.</div>
            </div>
          </div>

          <nav className="flex gap-4 items-center">
            <Link href="/" className={`text-sm ${theme === "cute" ? "hover:text-pink-600" : "hover:text-pink-300"}`}>Home</Link>
            <Link href="/about" className={`text-sm ${theme === "cute" ? "hover:text-pink-600" : "hover:text-pink-300"}`}>About</Link>
            <Link href="/contact" className={`text-sm ${theme === "cute" ? "hover:text-pink-600" : "hover:text-pink-300"}`}>Contact</Link>
            <Link href="/faq" className={`text-sm ${theme === "cute" ? "hover:text-pink-600" : "hover:text-pink-300"}`}>FAQ</Link>
          </nav>

          <div className="text-sm text-center md:text-right">
            <div className={`${theme === "cute" ? "text-purple-600" : "text-white/80"}`}>© {new Date().getFullYear()} Pawndora</div>
            <div className={`text-xs ${theme === "cute" ? "text-purple-500" : "text-white/60"}`}>Made with chaos & love</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
