"use client";

import { useEffect, useState } from "react";

export default function CareGuide() {
  const [isCuteMode, setIsCuteMode] = useState(false);

  useEffect(() => {
    if (isCuteMode) {
      document.body.classList.add("cute-mode");
    } else {
      document.body.classList.remove("cute-mode");
    }
  }, [isCuteMode]);

  const guides = [
    {
      pet: "🐕 Dogs",
      steps: isCuteMode ? [
        "Provide high-quality food appropriate for their age and size",
        "Ensure daily exercise with walks and playtime",
        "Regular grooming including brushing and nail trimming",
        "Schedule annual vet check-ups and vaccinations",
        "Create a safe, comfortable sleeping space"
      ] : [
        "Feed them or they'll eat your shoes instead",
        "Walk them or they'll destroy your house",
        "Brush them or they'll shed everywhere",
        "Vet visits are non-negotiable (they'll hate you for it)",
        "Give them a bed or they'll take yours"
      ]
    },
    {
      pet: "🐱 Cats",
      steps: isCuteMode ? [
        "Provide balanced nutrition with quality cat food",
        "Keep litter box clean and accessible",
        "Offer scratching posts and climbing spaces",
        "Regular vet visits and vaccinations",
        "Show love through gentle petting and play"
      ] : [
        "Feed them or they'll scream until you do",
        "Clean the litter box or they'll find somewhere else",
        "Give them scratching posts or they'll scratch your furniture",
        "Vet visits are torture (for both of you)",
        "Pet them only when they allow it (they're in charge)"
      ]
    },
    {
      pet: "🐰 Rabbits",
      steps: isCuteMode ? [
        "Provide hay-based diet with fresh vegetables",
        "Spacious enclosure with room to hop",
        "Regular grooming and nail trimming",
        "Social interaction and companionship",
        "Safe, bunny-proofed play area"
      ] : [
        "Feed them constantly (they're eating machines)",
        "Give them space or they'll escape",
        "Brush them or they'll become a fluff ball",
        "They need friends or they'll get depressed",
        "Bunny-proof everything (they chew everything)"
      ]
    },
    {
      pet: "🐦 Birds",
      steps: isCuteMode ? [
        "Provide species-appropriate bird food",
        "Large cage with room to fly",
        "Regular social interaction and training",
        "Fresh water daily and clean cage",
        "Mental stimulation with toys and puzzles"
      ] : [
        "Feed them seeds or they'll bite you",
        "Big cage or they'll escape",
        "Talk to them or they'll scream",
        "Clean their cage or it'll smell",
        "Give them toys or they'll pluck their feathers"
      ]
    },
    {
      pet: "🐹 Hamsters",
      steps: isCuteMode ? [
        "Provide hamster-specific food mix",
        "Properly sized cage with exercise wheel",
        "Fresh bedding and regular cage cleaning",
        "Quiet environment during day (they're nocturnal)",
        "Gentle handling and socialization"
      ] : [
        "Feed them tiny amounts constantly",
        "Wheel is mandatory or they'll go crazy",
        "Clean cage or it'll stink up your room",
        "Don't wake them up (they'll bite)",
        "Handle gently or they'll bite harder"
      ]
    },
    {
      pet: "🐟 Fish",
      steps: isCuteMode ? [
        "Proper tank size for the fish species",
        "Regular water changes and filtration",
        "Appropriate food for your fish type",
        "Maintain proper water temperature",
        "Decorate with plants and hiding spots"
      ] : [
        "Get a big tank (small tanks are cruel)",
        "Change water or they'll die",
        "Feed them the right food (not just flakes)",
        "Keep temperature stable or they'll get sick",
        "Give them hiding spots or they'll stress out"
      ]
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
            <span className="text-9xl">{isCuteMode ? "📖" : "📚"}</span>
          </div>
          <h1 className={`text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter mb-6 transform -rotate-2 hover:rotate-2 transition-transform ${
            isCuteMode ? "text-purple-700" : "text-purple-800"
          }`}>
            Care Guide
          </h1>
          <p className={`mt-6 max-w-2xl mx-auto text-2xl leading-relaxed font-bold transform rotate-1 ${
            isCuteMode ? "text-purple-600" : "text-purple-900"
          }`}>
            {isCuteMode ? "Essential care tips for every pet! 💕" : "HOW TO NOT KILL YOUR PET (you're welcome) 💅"}
          </p>
        </div>
      </section>

      {/* Care Guides */}
      <section className={`py-20 px-4 sm:px-8 lg:px-16 ${
        isCuteMode
          ? "bg-gradient-to-r from-pink-200 to-purple-200"
          : "bg-gradient-to-r from-cyan-400 to-pink-400"
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <div
                key={index}
                className={`p-8 transform transition-all ${
                  isCuteMode
                    ? "bg-white rounded-3xl shadow-lg hover:shadow-xl hover:scale-105"
                    : "bg-white shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000] hover:scale-105"
                }`}
                style={{ transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)` }}
              >
                <div className="text-6xl mb-4">{guide.pet}</div>
                <h3 className={`text-2xl font-black mb-6 ${
                  isCuteMode ? "text-purple-700" : "text-purple-800"
                }`}>
                  {guide.pet.split(' ')[1]} Care
                </h3>
                <ul className="space-y-3">
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className={`flex items-start gap-2 ${
                      isCuteMode ? "text-gray-600 font-medium" : "text-gray-700 font-bold"
                    }`}>
                      <span className="text-lg">{isCuteMode ? "💕" : "💀"}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
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
