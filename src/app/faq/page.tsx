"use client";

import { useEffect, useState } from "react";

export default function FAQ() {
  const [isCuteMode, setIsCuteMode] = useState(false);

  useEffect(() => {
    if (isCuteMode) {
      document.body.classList.add("cute-mode");
    } else {
      document.body.classList.remove("cute-mode");
    }
  }, [isCuteMode]);

  const faqs = [
    {
      question: "What is Pawndora?",
      answer: isCuteMode
        ? "Pawndora is a delightful platform where you can rate and celebrate your adorable pets! We believe every pet deserves love and appreciation. 💕"
        : "Pawndora is the ONLY place that matters for rating pets. We judge ruthlessly. No feelings, just facts. Deal with it. 💅"
    },
    {
      question: "How are pets rated?",
      answer: isCuteMode
        ? "Our community rates pets based on their cuteness, personality, and how much joy they bring! It's all about love and kindness. 🌸"
        : "We use our proprietary SASSY algorithm. It's complicated, you wouldn't understand. Just know it's brutally honest. 🔥"
    },
    {
      question: "Can I rate any pet?",
      answer: isCuteMode
        ? "Absolutely! Dogs, cats, bunnies, birds, hamsters - all pets are welcome and precious to us! 🐾"
        : "Sure, if you want your feelings hurt. We rate everything. Even your pet rock. No mercy. 💀"
    },
    {
      question: "Is my pet's rating final?",
      answer: isCuteMode
        ? "Ratings can change as our community shares more love! We believe in second chances and celebrating growth. ✨"
        : "ABSOLUTELY FINAL. Our word is law. Don't even think about arguing. You'll lose. 😈"
    },
    {
      question: "How do I upload my pet?",
      answer: isCuteMode
        ? "Just click the 'Rate That Pet' button and share your precious friend with our community! We can't wait to see them! 💖"
        : "You figure it out. The button is right there. If you can't find it, maybe you shouldn't be here. 💅"
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
            <span className="text-9xl">{isCuteMode ? "🌸" : "🎪"}</span>
          </div>
          <h1 className={`text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter mb-6 transform -rotate-2 hover:rotate-2 transition-transform ${
            isCuteMode ? "text-purple-700" : "text-purple-800"
          }`}>
            FAQ
          </h1>
          <p className={`mt-6 max-w-2xl mx-auto text-2xl leading-relaxed font-bold transform rotate-1 ${
            isCuteMode ? "text-purple-600" : "text-purple-900"
          }`}>
            {isCuteMode ? "Frequently Asked Questions with love 💕" : "FREQUENTLY ASKED QUESTIONS (don't annoy us) 💅"}
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className={`py-20 px-4 sm:px-8 lg:px-16 ${
        isCuteMode
          ? "bg-gradient-to-r from-pink-200 to-purple-200"
          : "bg-gradient-to-r from-cyan-400 to-pink-400"
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`p-8 transform transition-all ${
                  isCuteMode
                    ? "bg-white rounded-3xl shadow-lg hover:shadow-xl hover:scale-105"
                    : "bg-white shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000] hover:scale-105"
                }`}
                style={{ transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)` }}
              >
                <h3 className={`text-2xl font-black mb-4 uppercase tracking-wide ${
                  isCuteMode ? "text-purple-700" : "text-purple-800"
                }`}>
                  {faq.question}
                </h3>
                <p className={`leading-relaxed ${
                  isCuteMode ? "text-gray-600 font-medium" : "text-gray-700 font-bold"
                }`}>
                  {faq.answer}
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
