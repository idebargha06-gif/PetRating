"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isCuteMode, setIsCuteMode] = useState(false);

  useEffect(() => {
    if (isCuteMode) {
      document.body.classList.add("cute-mode");
    } else {
      document.body.classList.remove("cute-mode");
    }
  }, [isCuteMode]);

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

      {/* Hero Section */}
      <section className="relative flex flex-1 items-center justify-center px-4 py-20 sm:px-8 lg:px-16">
        <div className="max-w-6xl text-center relative z-10">
          <div className="mb-6 animate-spin-slow">
            <span className="text-9xl">🐾</span>
          </div>
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-purple-800 mb-6 transform -rotate-2 hover:rotate-2 transition-transform">
            PAWNDORA
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-2xl text-purple-900 leading-relaxed font-bold transform rotate-1">
            Rate your pets. Judge them ruthlessly. No feelings, just facts. 💅
          </p>
          <div className="mt-12 flex flex-col gap-4 font-black uppercase tracking-widest sm:flex-row justify-center flex-wrap">
            <a
              className="px-8 py-4 bg-neon-pink text-white transform -rotate-2 hover:rotate-2 hover:scale-110 transition-all shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000]"
              href="#ratings"
              style={{ backgroundColor: '#ff00ff' }}
            >
              RATE THAT PET! 🔥
            </a>
            <a
              className="px-8 py-4 bg-neon-yellow text-black transform rotate-3 hover:-rotate-3 hover:scale-110 transition-all shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000]"
              href="#featured"
              style={{ backgroundColor: '#ffff00' }}
            >
              EXPLORE THE CHAOS ✨
            </a>
          </div>
        </div>
        {/* Floating decorations */}
        <div className="absolute top-10 left-10 text-6xl animate-bounce">⭐</div>
        <div className="absolute top-20 right-20 text-5xl animate-pulse">💖</div>
        <div className="absolute bottom-20 left-20 text-7xl animate-spin">🌀</div>
        <div className="absolute bottom-10 right-10 text-6xl animate-bounce delay-300">🎉</div>
      </section>

      {/* Features Section */}
      <section id="ratings" className={`py-20 px-4 sm:px-8 lg:px-16 ${
        isCuteMode
          ? "bg-gradient-to-r from-pink-200 to-purple-200"
          : "bg-gradient-to-r from-cyan-400 to-pink-400"
      }`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl sm:text-7xl font-black text-center mb-6 transform -rotate-1 ${
            isCuteMode ? "text-purple-700" : "text-white drop-shadow-[4px_4px_0_#000]"
          }`}>
            {isCuteMode ? "Why We're Adorable 💕" : "WHY WE'RE THE BEST 👑"}
          </h2>
          <p className={`text-center text-xl mb-12 max-w-2xl mx-auto font-bold transform rotate-1 ${
            isCuteMode ? "text-purple-600" : "text-white"
          }`}>
            {isCuteMode ? "We love pets as much as you do! Let's celebrate their cuteness together." : "Because other sites are BORING and we are NOT. Deal with it."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🔥",
                title: "SASSY RATINGS",
                description: "We tell it like it is. No sugar-coating. Your pet either slays or they don't."
              },
              {
                icon: "💅",
                title: "PET DRAMA",
                description: "Get the tea on who's the real queen of the neighborhood. Spoiler: it's probably your cat."
              },
              {
                icon: "😈",
                title: "CHAOTIC ENERGY",
                description: "We embrace the madness. Pets are weird and we love it. Judge freely."
              },
              {
                icon: "🎭",
                title: "DRAG QUEEN APPROVED",
                description: "Our judging panel includes actual fabulous queens. They know drama when they see it."
              },
              {
                icon: "💀",
                title: "NO MERCY",
                description: "Zero tolerance for boring pets. If your pet is basic, we will call it out."
              },
              {
                icon: "✨",
                title: "PURE CHAOS",
                description: "Everything here is intentionally unhinged. Welcome to the party."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-8 transform hover:scale-105 transition-all ${
                  isCuteMode
                    ? "bg-white rounded-3xl shadow-lg hover:shadow-xl"
                    : "bg-white shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000]"
                }`}
                style={{ transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)` }}
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className={`text-2xl font-black mb-3 uppercase tracking-wide ${
                  isCuteMode ? "text-purple-700" : "text-purple-800"
                }`}>
                  {feature.title}
                </h3>
                <p className={`leading-relaxed ${
                  isCuteMode ? "text-gray-600 font-medium" : "text-gray-700 font-bold"
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top-Rated Pets Showcase */}
      <section id="featured" className={`py-20 px-4 sm:px-8 lg:px-16 ${
        isCuteMode
          ? "bg-gradient-to-b from-pink-100 to-purple-100"
          : "bg-gradient-to-b from-yellow-200 to-orange-300"
      }`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl sm:text-7xl font-black text-center mb-6 transform rotate-2 ${
            isCuteMode ? "text-purple-700" : "text-orange-800 drop-shadow-[4px_4px_0_#000]"
          }`}>
            {isCuteMode ? "Adorable Pets 💎" : "THE ICONS 💎"}
          </h2>
          <p className={`text-center text-xl mb-12 max-w-2xl mx-auto font-bold transform -rotate-1 ${
            isCuteMode ? "text-purple-600" : "text-orange-900"
          }`}>
            {isCuteMode ? "Meet some of the most precious pets in our community!" : "These pets have reached ICONIC status. Bow down."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Queen Sparkles",
                type: "Chihuahua Diva",
                rating: "10/10",
                emoji: "🐕",
                vibe: "Main Character Energy"
              },
              {
                name: "King Fluffington",
                type: "Persian Drama King",
                rating: "9.9/10",
                emoji: "🐱",
                vibe: "Absolute Legend"
              },
              {
                name: "Duchess Chaos",
                type: "Golden Retriever Menace",
                rating: "9.8/10",
                emoji: "🐕",
                vibe: "Too Powerful"
              },
              {
                name: "Lord Zoomies",
                type: "Tabby Speed Demon",
                rating: "9.7/10",
                emoji: "🐱",
                vibe: "Unstoppable Force"
              },
              {
                name: "Baron Derp",
                type: "French Bulldog Clown",
                rating: "9.6/10",
                emoji: "🐕",
                vibe: "Pure Comedy"
              },
              {
                name: "Lady Sassy",
                type: "Siamese Queen",
                rating: "9.5/10",
                emoji: "🐱",
                vibe: "Rules Everything"
              }
            ].map((pet, index) => (
              <div
                key={index}
                className={`bg-white overflow-hidden transform hover:scale-105 transition-all ${
                  isCuteMode
                    ? "rounded-3xl shadow-lg hover:shadow-xl"
                    : "shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000]"
                }`}
                style={{ transform: `rotate(${index % 2 === 0 ? 2 : -2}deg)` }}
              >
                <div className={`h-56 flex items-center justify-center ${
                  isCuteMode
                    ? "bg-gradient-to-br from-pink-200 to-purple-200"
                    : "bg-gradient-to-br from-pink-300 to-purple-400"
                }`}>
                  <span className="text-9xl">{pet.emoji}</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`text-2xl font-black ${
                      isCuteMode ? "text-purple-700" : "text-purple-800"
                    }`}>
                      {pet.name}
                    </h3>
                    <div className={`px-3 py-1 font-black text-sm transform -rotate-2 ${
                      isCuteMode ? "bg-pink-300 text-purple-700 rounded-full" : "bg-yellow-400"
                    }`}>
                      {pet.rating}
                    </div>
                  </div>
                  <p className={`mb-1 ${isCuteMode ? "text-gray-600 font-medium" : "text-gray-600 font-bold"}`}>
                    {pet.type}
                  </p>
                  <p className={`text-sm mb-4 ${
                    isCuteMode ? "text-purple-500 font-semibold" : "text-pink-600 font-black uppercase"
                  }`}>
                    {pet.vibe}
                  </p>
                  <button className={`w-full py-3 font-semibold uppercase tracking-wider transition-colors ${
                    isCuteMode
                      ? "bg-purple-400 text-white rounded-full hover:bg-purple-500 shadow-lg"
                      : "bg-purple-600 text-white font-black hover:bg-purple-800 shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000]"
                  }`}>
                    {isCuteMode ? "View Profile 💕" : "STALK THEIR PROFILE 🔍"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 px-4 sm:px-8 lg:px-16 ${
        isCuteMode
          ? "bg-gradient-to-r from-purple-200 to-pink-200"
          : "bg-gradient-to-r from-green-400 to-cyan-400"
      }`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl sm:text-7xl font-black text-center mb-6 transform -rotate-2 ${
            isCuteMode ? "text-purple-700" : "text-white drop-shadow-[4px_4px_0_#000]"
          }`}>
            {isCuteMode ? "Happy Pet Lovers 💕" : "THE TEA ☕"}
          </h2>
          <p className={`text-center text-xl mb-12 max-w-2xl mx-auto font-bold transform rotate-1 ${
            isCuteMode ? "text-purple-600" : "text-white"
          }`}>
            {isCuteMode ? "See what our wonderful community has to say!" : "What the people are saying (and some of it's actually nice)"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Karen (The Karen)",
                title: "Professional Reviewer",
                text: "I demanded to speak to the manager about my cat's rating and they told me to sit down. I RESPECT that energy.",
                rating: 5
              },
              {
                name: "Chad Thunder",
                title: "Dog Dad",
                text: "Finally a site that understands my golden retriever is a MENACE and I love him for it. 10/10 would rate again.",
                rating: 5
              },
              {
                name: "Slay Queen",
                title: "Cat Mom",
                text: "My cat got rated 'Absolute Icon' and I haven't stopped crying. This is my personality now.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`p-8 transform hover:scale-105 transition-all ${
                  isCuteMode
                    ? "bg-white rounded-3xl shadow-lg hover:shadow-xl"
                    : "bg-white shadow-[6px_6px_0_0_#000]"
                }`}
                style={{ transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)` }}
              >
                <div className="flex mb-4 text-3xl">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>💖</span>
                  ))}
                </div>
                <p className={`leading-relaxed mb-6 italic ${
                  isCuteMode ? "text-gray-700 font-medium" : "text-gray-800 font-bold"
                }`}>
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                    isCuteMode
                      ? "bg-gradient-to-br from-pink-300 to-purple-300"
                      : "bg-gradient-to-br from-pink-400 to-purple-500"
                  }`}>
                    {isCuteMode ? "�" : "�"}
                  </div>
                  <div>
                    <p className={`font-black ${isCuteMode ? "text-purple-700" : "text-purple-800"}`}>
                      {testimonial.name}
                    </p>
                    <p className={`text-xs uppercase tracking-widest font-semibold ${
                      isCuteMode ? "text-purple-500" : "text-pink-600 font-bold"
                    }`}>
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-4 sm:px-8 lg:px-16 ${
        isCuteMode
          ? "bg-gradient-to-r from-pink-300 to-purple-300"
          : "bg-gradient-to-r from-red-500 to-orange-500"
      }`}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8 animate-bounce">
            <span className="text-8xl">{isCuteMode ? "🌸" : "🎪"}</span>
          </div>
          <h2 className={`text-5xl sm:text-7xl font-black text-white mb-8 transform -rotate-1 ${
            isCuteMode ? "" : "drop-shadow-[4px_4px_0_#000]"
          }`}>
            {isCuteMode ? "Join Our Family 🎉" : "JOIN THE MADNESS 🎉"}
          </h2>
          <p className={`text-2xl mb-12 max-w-2xl mx-auto font-bold transform rotate-1 ${
            isCuteMode ? "text-purple-700" : "text-white"
          }`}>
            {isCuteMode ? "Come share the love for your adorable pets. Let's make the world a happier place together!" : "Stop being boring. Rate some pets. Start some drama. LIVE YOUR BEST LIFE."}
          </p>
          <button className={`px-12 py-6 font-semibold text-xl uppercase tracking-widest transform hover:scale-110 transition-all ${
            isCuteMode
              ? "bg-white text-purple-600 rounded-full shadow-lg"
              : "bg-white text-red-600 font-black shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000]"
          }`}>
            {isCuteMode ? "Get Started Now! 💕" : "GET IN HERE NOW!!! 💥"}
          </button>
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
                <li><a href="#" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>
                  {isCuteMode ? "Rate Pets" : "Rate That Pet"}
                </a></li>
                <li><a href="#" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>
                  {isCuteMode ? "Top Rated" : "Top Icons"}
                </a></li>
                <li><a href="#" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>
                  {isCuteMode ? "Community" : "The Drama"}
                </a></li>
                <li><a href="#" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>
                  {isCuteMode ? "About Us" : "Rules (lol jk)"}
                </a></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-black mb-6 uppercase tracking-widest transform -rotate-1 ${
                isCuteMode ? "text-purple-600" : "text-cyan-400"
              }`}>
                Resources
              </h4>
              <ul className={`space-y-3 ${isCuteMode ? "font-medium" : "font-bold"}`}>
                <li><a href="#" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>
                  {isCuteMode ? "Pet Tips" : "Our Chaos"}
                </a></li>
                <li><a href="#" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>
                  {isCuteMode ? "Care Guide" : "The Queens"}
                </a></li>
                <li><a href="#" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>
                  Contact
                </a></li>
                <li><a href="#" className={`hover:underline ${isCuteMode ? "hover:text-purple-500" : "hover:text-pink-400"}`}>
                  FAQ
                </a></li>
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
