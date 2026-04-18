"use client";

import { useEffect, useState } from "react";

export default function PetTips() {
  const [isCuteMode, setIsCuteMode] = useState(false);

  useEffect(() => {
    if (isCuteMode) {
      document.body.classList.add("cute-mode");
    } else {
      document.body.classList.remove("cute-mode");
    }
  }, [isCuteMode]);

  const tips = [
    {
      icon: "🍖",
      title: "Nutrition Matters",
      tip: isCuteMode
        ? "Feed your pet a balanced diet with high-quality food appropriate for their age and size! 💕"
        : "Stop feeding your pet garbage. Read the labels. If you can't pronounce it, don't feed it. Basic.",
      category: "Food"
    },
    {
      icon: "🏃",
      title: "Exercise is Key",
      tip: isCuteMode
        ? "Regular exercise keeps your pet healthy, happy, and full of energy! Play together every day! 🌸"
        : "Your pet needs to move. A fat pet is a sad pet. Unless they're a cat, then they're just judging you.",
      category: "Health"
    },
    {
      icon: "💤",
      title: "Rest & Relaxation",
      tip: isCuteMode
        ? "Ensure your pet has a cozy, quiet place to sleep and rest their adorable little head! ✨"
        : "Pets sleep like 20 hours a day. Stop bothering them. Let them judge you in peace.",
      category: "Wellness"
    },
    {
      icon: "🧼",
      title: "Grooming Routine",
      tip: isCuteMode
        ? "Regular grooming keeps your pet looking beautiful and feeling their best! Brush gently! 💖"
        : "Groom your pet or they'll look like a mess. And people will judge you for having a messy pet.",
      category: "Care"
    },
    {
      icon: "🏥",
      title: "Regular Vet Visits",
      tip: isCuteMode
        ? "Schedule regular check-ups to keep your furry friend healthy and catch any issues early! 🌈"
        : "Take your pet to the vet. Even if they hate it. Especially if they hate it. They'll thank you later (they won't).",
      category: "Health"
    },
    {
      icon: "🎾",
      title: "Mental Stimulation",
      tip: isCuteMode
        ? "Puzzles, toys, and games keep your pet's mind sharp and prevent boredom! Have fun together! 💕"
        : "Your pet gets bored. Then they destroy your stuff. Keep them entertained or lose your belongings.",
      category: "Enrichment"
    },
    {
      icon: "💧",
      title: "Fresh Water",
      tip: isCuteMode
        ? "Always provide clean, fresh water for your precious pet to stay hydrated! 🌸"
        : "Water your pet. They die without it. This shouldn't need to be said, but here we are.",
      category: "Basic"
    },
    {
      icon: "❤️",
      title: "Love & Attention",
      tip: isCuteMode
        ? "Show your pet love every day with cuddles, playtime, and quality time together! 💕"
        : "Pay attention to your pet or they'll find other ways to get it (usually by destroying your stuff).",
      category: "Bonding"
    },
    {
      icon: "🏠",
      title: "Safe Environment",
      tip: isCuteMode
        ? "Create a safe, pet-friendly space where your furry friend can explore without worry! ✨"
        : "Pet-proof your home or they'll eat everything. Including your homework. Especially your homework.",
      category: "Safety"
    }
  ];

  return (
    <div className={`flex flex-col min-h-screen font-sans overflow-x-hidden ${
      isCuteMode
        ? "bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200"
        : "bg-gradient-to-br from-pink-300 via-purple-300 to-yellow-200"
    }`}>
      {/* Mode Toggle Button */}
      <button
        onClick={() => setIsCuteMode(!isCuteMode)}
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-black text-white font-black text-sm uppercase tracking-widest rounded-full hover:scale-110 transition-all shadow-lg"
        style={{
          backgroundColor: isCuteMode ? "#ff69b4" : "#000",
        }}
      >
        {isCuteMode ? "✨ Cute Mode" : "💅 Sassy Mode"}
      </button>

      {/* Header */}
      <section className="relative flex flex-1 items-center justify-center px-4 py-20 sm:px-8 lg:px-16">
        <div className="max-w-6xl text-center relative z-10">
          <div className="mb-6 animate-bounce">
            <span className="text-9xl">{isCuteMode ? "💡" : "💡"}</span>
          </div>
          <h1 className={`text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter mb-6 transform -rotate-2 hover:rotate-2 transition-transform ${
            isCuteMode ? "text-purple-700" : "text-purple-800"
          }`}>
            Pet Tips
          </h1>
          <p className={`mt-6 max-w-2xl mx-auto text-2xl leading-relaxed font-bold transform rotate-1 ${
            isCuteMode ? "text-purple-600" : "text-purple-900"
          }`}>
            {isCuteMode ? "Helpful tips for happy pets! 💕" : "ADVICE YOU PROBABLY WON'T FOLLOW 💅"}
          </p>
        </div>
      </section>

      {/* Tips Grid */}
      <section className={`py-20 px-4 sm:px-8 lg:px-16 ${
        isCuteMode
          ? "bg-gradient-to-r from-pink-200 to-purple-200"
          : "bg-gradient-to-r from-cyan-400 to-pink-400"
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tips.map((tip, index) => (
              <div
                key={index}
                className={`p-8 transform transition-all ${
                  isCuteMode
                    ? "bg-white rounded-3xl shadow-lg hover:shadow-xl hover:scale-105"
                    : "bg-white shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000] hover:scale-105"
                }`}
                style={{ transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)` }}
              >
                <div className="text-6xl mb-4">{tip.icon}</div>
                <div className={`text-sm mb-3 ${isCuteMode ? "text-purple-500 font-semibold" : "text-pink-600 font-black uppercase"}`}>
                  {tip.category}
                </div>
                <h3 className={`text-2xl font-black mb-3 ${
                  isCuteMode ? "text-purple-700" : "text-purple-800"
                }`}>
                  {tip.title}
                </h3>
                <p className={`leading-relaxed ${
                  isCuteMode ? "text-gray-600 font-medium" : "text-gray-700 font-bold"
                }`}>
                  {tip.tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 sm:px-8 lg:px-16 ${
        isCuteMode ? "bg-purple-100 text-purple-700" : "bg-black text-white"
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-4xl font-black mb-6 transform -rotate-2">🐾 PAWNDORA</h3>
              <p className="text-sm leading-relaxed font-semibold">
                {isCuteMode ? "We celebrate pets with love and kindness. 💕" : "We rate pets so you don't have to. You're welcome. 💅"}
              </p>
            </div>
            <div>
              <h4 className={`font-black mb-6 uppercase tracking-widest transform rotate-2 ${
                isCuteMode ? "text-purple-600" : "text-yellow-400"
              }`}>
                {isCuteMode ? "Explore" : "The Goods"}
              </h4>
              <ul className={`space-y-3 ${isCuteMode ? "font-medium" : "font-bold"}`}>
                <li><a href="/" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>Home</a></li>
                <li><a href="/faq" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>FAQ</a></li>
                <li><a href="/about" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>About Us</a></li>
                <li><a href="/contact" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-black mb-6 uppercase tracking-widest transform -rotate-1 ${
                isCuteMode ? "text-purple-600" : "text-cyan-400"
              }`}>
                Resources
              </h4>
              <ul className={`space-y-3 ${isCuteMode ? "font-medium" : "font-bold"}`}>
                <li><a href="/pet-tips" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>Pet Tips</a></li>
                <li><a href="/care-guide" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>Care Guide</a></li>
                <li><a href="/blog" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-black mb-6 uppercase tracking-widest transform rotate-1 ${
                isCuteMode ? "text-purple-600" : "text-green-400"
              }`}>
                Connect
              </h4>
              <div className="flex gap-4 text-4xl">
                <a href="#" className="hover:scale-125 transition-transform">🐦</a>
                <a href="#" className="hover:scale-125 transition-transform">📸</a>
                <a href="#" className="hover:scale-125 transition-transform">📘</a>
                <a href="#" className="hover:scale-125 transition-transform">▶️</a>
              </div>
            </div>
          </div>
          <div className={`border-t pt-8 text-center text-sm uppercase tracking-widest ${
            isCuteMode ? "border-purple-300 font-medium" : "border-white/20 font-bold"
          }`}>
            <p>{isCuteMode ? "© 2024 Pawndora. Made with love for all pets. 💕✨" : "© 2024 Pawndora. We do what we want. Deal with it. 💅✨"}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
