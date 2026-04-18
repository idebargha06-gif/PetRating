"use client";

import { useEffect, useState } from "react";

export default function About() {
  const [isCuteMode, setIsCuteMode] = useState(false);

  useEffect(() => {
    if (isCuteMode) {
      document.body.classList.add("cute-mode");
    } else {
      document.body.classList.remove("cute-mode");
    }
  }, [isCuteMode]);

  const team = [
    {
      name: "Queen Sparkles",
      role: isCuteMode ? "Founder & Chief Cuteness Officer" : "Founder & Chief Drama Officer",
      emoji: "👑",
      vibe: isCuteMode ? "Loves all pets unconditionally" : "Will judge your pet ruthlessly"
    },
    {
      name: "Chad Thunder",
      role: isCuteMode ? "Head of Pet Happiness" : "Head of Pet Roasting",
      emoji: "⚡",
      vibe: isCuteMode ? "Spreads joy everywhere" : "Zero tolerance for basic pets"
    },
    {
      name: "Slay Queen",
      role: isCuteMode ? "Community Love Manager" : "Community Chaos Manager",
      emoji: "💅",
      vibe: isCuteMode ? "Brings people together" : "Starts all the drama"
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
            <span className="text-9xl">{isCuteMode ? "💕" : "🎭"}</span>
          </div>
          <h1 className={`text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter mb-6 transform -rotate-2 hover:rotate-2 transition-transform ${
            isCuteMode ? "text-purple-700" : "text-purple-800"
          }`}>
            About Us
          </h1>
          <p className={`mt-6 max-w-2xl mx-auto text-2xl leading-relaxed font-bold transform rotate-1 ${
            isCuteMode ? "text-purple-600" : "text-purple-900"
          }`}>
            {isCuteMode ? "The team behind the pet love 💕" : "THE QUEENS OF PET DRAMA 👑"}
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className={`py-20 px-4 sm:px-8 lg:px-16 ${
        isCuteMode
          ? "bg-gradient-to-r from-pink-200 to-purple-200"
          : "bg-gradient-to-r from-cyan-400 to-pink-400"
      }`}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-5xl sm:text-7xl font-black text-center mb-12 transform -rotate-1 ${
            isCuteMode ? "text-purple-700" : "text-white drop-shadow-[4px_4px_0_#000]"
          }`}>
            {isCuteMode ? "Our Story 🌸" : "OUR STORY (it's legendary) 💅"}
          </h2>
          <div className={`p-8 transform transition-all ${
            isCuteMode
              ? "bg-white rounded-3xl shadow-lg"
              : "bg-white shadow-[6px_6px_0_0_#000]"
          }`} style={{ transform: "rotate(1deg)" }}>
            <p className={`text-xl leading-relaxed ${
              isCuteMode ? "text-gray-600 font-medium" : "text-gray-700 font-bold"
            }`}>
              {isCuteMode
                ? "Pawndora was born from a simple dream: to create a place where every pet could be celebrated for their unique charm and cuteness. We believe that pets bring so much joy to our lives, and they deserve to be recognized and loved. Our community is built on kindness, positivity, and the shared love for all furry (and not so furry) friends. Together, we're making the world a happier place, one pet at a time! 💕"
                : "Pawndora was born from frustration. Other pet sites were BORING. Basic. Lame. We said NO MORE. We created the most chaotic, sassy, drama-filled pet rating platform the world has ever seen. We don't do boring. We don't do basic. We do ICONIC. Your pet either slays or they don't. Welcome to the revolution. 🔥"
              }
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-20 px-4 sm:px-8 lg:px-16 ${
        isCuteMode
          ? "bg-gradient-to-b from-pink-100 to-purple-100"
          : "bg-gradient-to-b from-yellow-200 to-orange-300"
      }`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl sm:text-7xl font-black text-center mb-12 transform rotate-2 ${
            isCuteMode ? "text-purple-700" : "text-orange-800 drop-shadow-[4px_4px_0_#000]"
          }`}>
            {isCuteMode ? "Our Lovely Team 💕" : "THE ROYAL COURT 👑"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className={`p-8 transform transition-all ${
                  isCuteMode
                    ? "bg-white rounded-3xl shadow-lg hover:shadow-xl hover:scale-105"
                    : "bg-white shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000] hover:scale-105"
                }`}
                style={{ transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)` }}
              >
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className={`text-2xl font-black mb-2 ${
                  isCuteMode ? "text-purple-700" : "text-purple-800"
                }`}>
                  {member.name}
                </h3>
                <p className={`text-sm mb-3 ${isCuteMode ? "text-purple-500 font-semibold" : "text-pink-600 font-black uppercase"}`}>
                  {member.role}
                </p>
                <p className={`leading-relaxed ${
                  isCuteMode ? "text-gray-600 font-medium" : "text-gray-700 font-bold"
                }`}>
                  {member.vibe}
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
                <li><a href="#" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>Pet Tips</a></li>
                <li><a href="#" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>Care Guide</a></li>
                <li><a href="#" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>Blog</a></li>
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
