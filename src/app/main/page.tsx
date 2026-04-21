"use client";

import React from "react";
import Link from "next/link";
import Main from "../../components/Main/Main";
import PetRater from "../../components/PetRater";
import { ThemeToggle, useTheme } from "../../components/ThemeMode";

export default function MainPage() {
  const { theme } = useTheme();
  const isCuteMode = theme === "cute";

  return (
    <Main showFooter={false}>
      <div className="flex flex-col items-center justify-center py-12 px-6 gap-8 pointer-events-auto">
        <ThemeToggle />

        {/* Hero Section */}
        <div className="text-center max-w-4xl">
          <div className="mb-6 animate-bounce">
            <span className="text-9xl">{isCuteMode ? "🐾" : "🎭"}</span>
          </div>
          <h1 className={`text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter mb-6 transform -rotate-2 hover:rotate-2 transition-transform ${
            isCuteMode ? "text-purple-700" : "text-purple-800"
          }`}>
            {isCuteMode ? "Rate Your Pet 💕" : "RATE YOUR PET (we're judging) 🔥"}
          </h1>
          <p className={`mt-6 max-w-2xl mx-auto text-2xl leading-relaxed font-bold transform rotate-1 ${
            isCuteMode ? "text-purple-600" : "text-purple-900"
          }`}>
            {isCuteMode 
              ? "Upload a photo and get an instant rating with our AI judge! So fun! ✨" 
              : "Upload a photo. We judge ruthlessly. No feelings, just facts. Deal with it. 💅"
            }
          </p>
        </div>

        {/* Floating decorations */}
        <div className="absolute top-10 left-10 text-6xl animate-bounce">⭐</div>
        <div className="absolute top-20 right-20 text-5xl animate-pulse">💖</div>
        <div className="absolute bottom-20 left-20 text-7xl animate-spin">🌀</div>
        <div className="absolute bottom-10 right-10 text-6xl animate-bounce delay-300">🎉</div>

        <PetRater />
      </div>

      {/* Landing Page Footer */}
      <footer className={`py-12 px-4 sm:px-8 lg:px-16 ${isCuteMode ? "bg-purple-100 text-purple-700" : "bg-black text-white"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-4xl font-black mb-6 transform -rotate-2">🐾 PAWNDORA</h3>
              <p className="text-sm leading-relaxed font-semibold">{isCuteMode ? "We celebrate pets with love and kindness. 💕" : "We rate pets so you don't have to. You're welcome. 💅"}</p>
            </div>
            <div>
              <h4 className={`font-black mb-6 uppercase tracking-widest transform rotate-2 ${isCuteMode ? "text-purple-600" : "text-yellow-400"}`}>{isCuteMode ? "Explore" : "The Goods"}</h4>
              <ul className={`space-y-3 ${isCuteMode ? "font-medium" : "font-bold"}`}>
                <li><a href="/" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>{isCuteMode ? "Home" : "Rate That Pet"}</a></li>
                <li><a href="/about" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>{isCuteMode ? "About Us" : "Our Chaos"}</a></li>
                <li><a href="/faq" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>FAQ</a></li>
                <li><a href="/contact" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-black mb-6 uppercase tracking-widest transform -rotate-1 ${isCuteMode ? "text-purple-600" : "text-cyan-400"}`}>Resources</h4>
              <ul className={`space-y-3 ${isCuteMode ? "font-medium" : "font-bold"}`}>
                <li><a href="/pet-tips" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>{isCuteMode ? "Pet Tips" : "Our Chaos"}</a></li>
                <li><a href="/care-guide" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>{isCuteMode ? "Care Guide" : "The Queens"}</a></li>
                <li><a href="/blog" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>{isCuteMode ? "Blog" : "Press (we're famous)"}</a></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-black mb-6 uppercase tracking-widest transform rotate-1 ${isCuteMode ? "text-purple-600" : "text-green-400"}`}>Connect</h4>
              <div className="flex gap-4 text-4xl">
                <a href="#" className="hover:scale-125 transition-transform">🐦</a>
                <a href="#" className="hover:scale-125 transition-transform">📸</a>
                <a href="#" className="hover:scale-125 transition-transform">📘</a>
                <a href="#" className="hover:scale-125 transition-transform">▶️</a>
              </div>
            </div>
          </div>
          <div className={`border-t pt-8 text-center text-sm uppercase tracking-widest ${isCuteMode ? "border-purple-300 font-medium" : "border-white/20 font-bold"}`}>
            <p>{isCuteMode ? "© 2026 Pawndora. Made with love for all pets. 💕✨" : "© 2026 Pawndora. We do what we want. Deal with it. 💅✨"}</p>
          </div>
        </div>
      </footer>
    </Main>
  );
}
