"use client";

import React, { useRef, useState } from "react";
import { useTheme } from "./ThemeMode";
import judgeImage from "../backend/imageJudge";

export default function PetRater() {
  const { theme } = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [verdict, setVerdict] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<{ adorability: number; sass: number; chaos: number } | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);

  function handleFile(f?: FileList | null) {
    const next = f && f[0] ? f[0] : undefined;
    if (!next) return;
    setFile(next);
    setPreview(URL.createObjectURL(next));
  }

  function clearFile() {
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setRating(null);
    setComment("");
    setVerdict(null);
    setMetrics(null);
    setLoading(false);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files);
  }

  function deterministicScoreFromFile(f: File) {
    // Simple deterministic hash from filename + size
    const s = `${f.name}-${f.size}`;
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    const adorability = (h % 60) + 20; // 20-79
    const sass = ((h >> 8) % 60) + 10; // 10-69
    const chaos = ((h >> 16) % 60) + 5; // 5-64
    const score = Math.min(5, Math.max(1, Math.floor(((adorability * 0.6 + (100 - sass) * 0.2 + (100 - chaos) * 0.2) / 100) * 5)));
    return { score, adorability, sass, chaos };
  }

  async function analyzeFile(f: File) {
    try {
      // prefer heuristic judge that compares to placeholders
      const res = await judgeImage(f);
      return { score: res.score, text: res.verdict, metrics: { adorability: res.metrics.similarityToCat, sass: res.metrics.similarityToDog, chaos: res.metrics.confidence } };
    } catch (err) {
      // fallback to deterministic local scoring
      const { score, adorability, sass, chaos } = deterministicScoreFromFile(f);
      const texts = [
        `Disaster — needs haircuts and therapy.`,
        `Not bad. A few filters and some attitude.`,
        `Solid floof. Could trend.`,
        `Executes maximum cuddle. Viral-ready.`,
        `Absolute royalty. Bow-down level.`,
      ];
      await new Promise((r) => setTimeout(r, 300));
      return { score, text: texts[score - 1], metrics: { adorability, sass, chaos } };
    }
  }

  const cute = theme === "cute";

  return (
    <section className={`w-full py-12 ${cute ? "bg-gradient-to-r from-pink-200 to-purple-200" : "bg-gradient-to-r from-cyan-400 to-pink-400"}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Hero / Pitch */}
          <div className={`p-8 transform transition-all ${cute ? "bg-white rounded-3xl shadow-lg hover:shadow-xl" : "bg-white shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000]"}`} style={{ transform: "rotate(-2deg)" }}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`text-5xl transform -rotate-12 animate-bounce ${cute ? "drop-shadow-md" : "text-yellow-300"}`}>🐶</div>
              <div>
                <h2 className={`font-extrabold text-2xl transform rotate-1 ${cute ? "text-purple-700" : "text-purple-800"}`}>
                  {cute ? "Rate That Pet 💕" : "RATE THAT PET (we're watching) 🔥"}
                </h2>
                <p className={`text-sm font-semibold ${cute ? "text-purple-500" : "text-purple-900"}`}>
                  {cute ? "Share the glory, roast the fluff — instant pet scores." : "Upload your pet. We judge. No feelings. 💅"}
                </p>
              </div>
            </div>

            <p className={`mb-6 leading-relaxed ${cute ? "text-purple-600 font-medium" : "text-gray-700 font-bold"}`}>
              {cute 
                ? "Upload a photo and click Judge — the system analyzes the image and returns an automated verdict with trait scores. So fun! ✨"
                : "Upload a photo and click Judge — the system ruthlessly analyzes the image and returns a verdict. No feelings, just facts. Deal with it."
              }
            </p>

            <div className="flex gap-3 flex-wrap">
              <button 
                className={`px-6 py-3 font-black uppercase tracking-widest transform hover:scale-110 transition-all ${cute ? "bg-pink-400 text-white rounded-full shadow-lg hover:bg-pink-500" : "bg-pink-500 text-white shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000]"}`}
                onClick={() => fileInput.current?.click()}
              >
                {cute ? "Upload Image 💕" : "UPLOAD IMAGE (if you dare) 🔥"}
              </button>
              <button
                className={`px-6 py-3 font-black uppercase tracking-widest transform hover:scale-110 transition-all ${cute ? "bg-purple-400 text-white rounded-full shadow-lg hover:bg-purple-500" : "bg-black text-white shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000]"}`}
                onClick={async () => {
                  if (!file) {
                    fileInput.current?.click();
                    return;
                  }
                  setLoading(true);
                  setVerdict(null);
                  const res = await analyzeFile(file);
                  setRating(res.score);
                  setMetrics(res.metrics);
                  setVerdict(res.text);
                  setLoading(false);
                }}
              >
                {loading ? (cute ? "Judging... ✨" : "JUDGING...") : (cute ? "Judge Now 💕" : "JUDGE NOW 🔍")}
              </button>
            </div>

            <div className={`mt-6 text-xs font-semibold ${cute ? "text-purple-400" : "text-gray-600"}`}>
              {cute ? "Tip: Use clear, close-up photos for best results! 💕" : "Tip: Use clear photos. If your pet is ugly, we'll tell you. 💅"}
            </div>
          </div>

          {/* Upload / Preview Area */}
          <div>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`relative p-8 min-h-[300px] flex flex-col transform transition-all ${cute ? `bg-white rounded-3xl shadow-lg hover:shadow-xl border-4 border-pink-200` : `bg-white shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000] border-4 border-black`} ${dragging ? "scale-105" : ""}`}
              style={{ transform: "rotate(1deg)" }}
            >
              <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files)} />

              {!preview && (
                <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
                  <div className={`text-6xl animate-bounce ${cute ? "text-pink-500" : "text-purple-900"}`}>📤</div>
                  <div className={`font-extrabold text-2xl transform -rotate-1 ${cute ? "text-purple-700" : "text-purple-900"}`}>
                    {cute ? "Drop an image here 💕" : "DROP IMAGE HERE (we're waiting) 🔥"}
                  </div>
                  <div className={`text-lg font-semibold ${cute ? "text-purple-500" : "text-purple-900"}`}>
                    {cute ? "or click" : "or click"} <button onClick={() => fileInput.current?.click()} className={`underline font-black ${cute ? "text-pink-600" : "text-purple-900"}`}>{cute ? "to browse 💕" : "TO BROWSE (if you have files) 💅"}</button>
                  </div>
                </div>
              )}

              {preview && (
                <div className="flex-1 flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/2 flex items-center justify-center">
                    <img src={preview} alt="Uploaded pet" className={`max-h-64 object-contain shadow transform transition-all ${cute ? "rounded-3xl" : "rounded-none shadow-[6px_6px_0_0_#000]"}`} />
                  </div>

                  <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <div>
                      <label className={`text-sm font-black uppercase tracking-widest ${cute ? "text-purple-600" : "text-purple-900"}`}>
                        {cute ? "Judge this pet (system) 💕" : "JUDGE THIS PET (we're ruthless) 🔥"}
                      </label>
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          disabled={loading}
                          onClick={async () => {
                            if (!file) return;
                            setLoading(true);
                            setVerdict(null);
                            const res = await analyzeFile(file);
                            setRating(res.score);
                            setMetrics(res.metrics);
                            setVerdict(res.text);
                            setLoading(false);
                          }}
                          className={`px-6 py-3 font-black uppercase tracking-widest transform hover:scale-110 transition-all ${cute ? "bg-purple-400 text-white rounded-full shadow-lg" : "bg-black text-white shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000]"}`}
                        >
                          {loading ? (cute ? "Judging... ✨" : "JUDGING...") : (cute ? "Judge 💕" : "JUDGE 🔍")}
                        </button>

                        <button className={`px-6 py-3 font-black uppercase tracking-widest transform hover:scale-105 transition-all ${cute ? "bg-gray-200 text-purple-700 rounded-full" : "bg-white text-black shadow-[4px_4px_0_0_#000]"}`} onClick={clearFile}>
                          {cute ? "Remove 💕" : "REMOVE (we're done) 💅"}
                        </button>
                      </div>
                    </div>

                    {verdict && (
                      <div className={`mt-4 p-6 border-4 transform transition-all ${cute ? "bg-white rounded-3xl border-pink-200 shadow-lg" : "bg-white shadow-[6px_6px_0_0_#000] border-black"}`} style={{ transform: "rotate(-1deg)" }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`text-5xl font-extrabold transform -rotate-6 ${cute ? "text-pink-600" : "text-yellow-300"}`}>{rating}★</div>
                            <div>
                              <div className={`font-black text-xl transform rotate-1 ${cute ? "text-purple-700" : "text-purple-900"}`}>{verdict}</div>
                              <div className={`text-xs font-semibold ${cute ? "text-purple-400" : "text-gray-600"}`}>
                                {cute ? "Automated verdict powered by local demo model 💕" : "Automated verdict. We're never wrong. 💅"}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-black uppercase tracking-widest ${cute ? "text-purple-600" : "text-purple-900"}`}>
                              {cute ? "Share 💕" : "SHARE (if you dare) 💅"}
                            </div>
                            <div className={`text-xs font-semibold ${cute ? "text-purple-400" : "text-gray-600"}`}>Copy link or post</div>
                          </div>
                        </div>

                        {metrics && (
                          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                            <div className={`p-3 rounded-lg transform transition-all ${cute ? "bg-pink-50 border-2 border-pink-200" : "bg-white shadow-[4px_4px_0_0_#000]"}`} style={{ transform: "rotate(-2deg)" }}>
                              <div className={`text-xs font-black uppercase tracking-widest ${cute ? "text-purple-600" : "text-purple-900"}`}>Adorability</div>
                              <div className={`text-2xl font-extrabold ${cute ? "text-pink-600" : "text-purple-900"}`}>{metrics.adorability}%</div>
                            </div>
                            <div className={`p-3 rounded-lg transform transition-all ${cute ? "bg-purple-50 border-2 border-purple-200" : "bg-white shadow-[4px_4px_0_0_#000]"}`} style={{ transform: "rotate(1deg)" }}>
                              <div className={`text-xs font-black uppercase tracking-widest ${cute ? "text-purple-600" : "text-purple-900"}`}>Sass</div>
                              <div className={`text-2xl font-extrabold ${cute ? "text-purple-600" : "text-purple-900"}`}>{metrics.sass}%</div>
                            </div>
                            <div className={`p-3 rounded-lg transform transition-all ${cute ? "bg-pink-50 border-2 border-pink-200" : "bg-white shadow-[4px_4px_0_0_#000]"}`} style={{ transform: "rotate(-1deg)" }}>
                              <div className={`text-xs font-black uppercase tracking-widest ${cute ? "text-purple-600" : "text-purple-900"}`}>Chaos</div>
                              <div className={`text-2xl font-extrabold ${cute ? "text-pink-600" : "text-purple-900"}`}>{metrics.chaos}%</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className={`mt-4 text-center text-xs font-semibold ${cute ? "text-purple-400" : "text-gray-600"}`}>
              {cute ? "We never store files in this demo — this is a local preview component 💕" : "We never store files. Not that we care about your privacy. 💅"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
