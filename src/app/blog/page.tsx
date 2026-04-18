"use client";

import { useEffect, useState } from "react";

export default function Blog() {
  const [isCuteMode, setIsCuteMode] = useState(false);

  useEffect(() => {
    if (isCuteMode) {
      document.body.classList.add("cute-mode");
    } else {
      document.body.classList.remove("cute-mode");
    }
  }, [isCuteMode]);

  const blogPosts = [
    {
      title: isCuteMode ? "10 Ways to Show Your Pet You Love Them" : "10 WAYS YOUR PET SECRETLY HATES YOU",
      excerpt: isCuteMode
        ? "Simple gestures that make your furry friend feel special and loved every day! 💕"
        : "The signs are obvious if you're paying attention. Spoiler: they judge everything you do.",
      date: "April 18, 2024",
      emoji: "🐾",
      readTime: "5 min read"
    },
    {
      title: isCuteMode ? "The Science Behind Pet Cuddles" : "WHY YOUR CAT IS ACTUALLY EVIL (SCIENCE PROVES IT)",
      excerpt: isCuteMode
        ? "Discover the amazing benefits of snuggling with your pets and how it boosts happiness! 🌸"
        : "Scientists have finally confirmed what we all knew. Cats are plotting against us.",
      date: "April 15, 2024",
      emoji: "🔬",
      readTime: "8 min read"
    },
    {
      title: isCuteMode ? "Healthy Treats Your Pet Will Love" : "TREATS THAT WILL MAKE YOUR PET FAT AND LAZY",
      excerpt: isCuteMode
        ? "Nutritious and delicious recipes for homemade pet treats that are safe and yummy! 💖"
        : "Feed these at your own risk. Your pet will never move again. You've been warned.",
      date: "April 12, 2024",
      emoji: "🍖",
      readTime: "6 min read"
    },
    {
      title: isCuteMode ? "Creating the Perfect Pet Space at Home" : "YOUR PET DOESN'T CARE ABOUT YOUR HOME DECOR",
      excerpt: isCuteMode
        ? "Tips for designing a cozy and comfortable space where your pet feels safe and happy! ✨"
        : "Stop spending money on fancy pet furniture. They sleep on the floor anyway. Basic.",
      date: "April 10, 2024",
      emoji: "🏠",
      readTime: "7 min read"
    },
    {
      title: isCuteMode ? "Understanding Your Pet's Body Language" : "YOUR PET IS JUDGING YOU RIGHT NOW",
      excerpt: isCuteMode
        ? "Learn to read the subtle signs your pet uses to communicate their feelings! 💕"
        : "Every tail wag, every look - it's all judgment. Here's how to know when they're done with you.",
      date: "April 8, 2024",
      emoji: "👀",
      readTime: "10 min read"
    },
    {
      title: isCuteMode ? "Pet Adoption: A Journey of Love" : "ADOPTING A PET: A MISTAKE YOU'LL REGRET",
      excerpt: isCuteMode
        ? "Heartwarming stories of pet adoption and the beautiful bonds that form! 🌈"
        : "Think carefully before adopting. It's basically signing up for endless chaos and destruction.",
      date: "April 5, 2024",
      emoji: "🏡",
      readTime: "12 min read"
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
            <span className="text-9xl">{isCuteMode ? "📝" : "📰"}</span>
          </div>
          <h1 className={`text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter mb-6 transform -rotate-2 hover:rotate-2 transition-transform ${
            isCuteMode ? "text-purple-700" : "text-purple-800"
          }`}>
            Blog
          </h1>
          <p className={`mt-6 max-w-2xl mx-auto text-2xl leading-relaxed font-bold transform rotate-1 ${
            isCuteMode ? "text-purple-600" : "text-purple-900"
          }`}>
            {isCuteMode ? "Pet stories, tips, and love 💕" : "THE TEA ON PETS (read at your own risk) 💅"}
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className={`py-20 px-4 sm:px-8 lg:px-16 ${
        isCuteMode
          ? "bg-gradient-to-r from-pink-200 to-purple-200"
          : "bg-gradient-to-r from-cyan-400 to-pink-400"
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className={`p-8 transform transition-all ${
                  isCuteMode
                    ? "bg-white rounded-3xl shadow-lg hover:shadow-xl hover:scale-105"
                    : "bg-white shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000] hover:scale-105"
                }`}
                style={{ transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)` }}
              >
                <div className="text-6xl mb-4">{post.emoji}</div>
                <div className={`text-sm mb-3 ${isCuteMode ? "text-purple-500 font-semibold" : "text-pink-600 font-black uppercase"}`}>
                  {post.date} • {post.readTime}
                </div>
                <h3 className={`text-2xl font-black mb-3 ${
                  isCuteMode ? "text-purple-700" : "text-purple-800"
                }`}>
                  {post.title}
                </h3>
                <p className={`leading-relaxed mb-4 ${
                  isCuteMode ? "text-gray-600 font-medium" : "text-gray-700 font-bold"
                }`}>
                  {post.excerpt}
                </p>
                <button className={`px-6 py-2 font-semibold uppercase tracking-wider transition-all ${
                  isCuteMode
                    ? "bg-purple-400 text-white rounded-full hover:bg-purple-500"
                    : "bg-purple-600 text-white font-black hover:bg-purple-800"
                }`}>
                  {isCuteMode ? "Read More 💕" : "READ MORE (if you dare) 🔥"}
                </button>
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
