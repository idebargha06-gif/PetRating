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
    <section className={`w-full py-12 ${cute ? "bg-gradient-to-r from-pink-50 to-purple-50" : "bg-slate-900 text-white"}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Hero / Pitch */}
          <div className={`rounded-2xl p-8 ${cute ? "bg-white/80 shadow-lg" : "bg-slate-800/60 shadow-inner"}`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`text-5xl transform -rotate-12 ${cute ? "drop-shadow-md" : "text-yellow-300"}`}>🐶</div>
              <div>
                <h2 className={`font-extrabold text-2xl ${cute ? "text-purple-700" : "text-white"}`}>Rate That Pet</h2>
                <p className={`text-sm ${cute ? "text-purple-500" : "text-white/80"}`}>Share the glory, roast the fluff — instant pet scores.</p>
              </div>
            </div>

            <p className={`mb-6 ${cute ? "text-purple-600" : "text-white/80"}`}>
              Upload a photo and click <strong>Judge</strong> — the system analyzes the image and returns an automated verdict with trait scores.
            </p>

            <div className="flex gap-3 flex-wrap">
              <button className={`px-4 py-2 rounded-md font-semibold ${cute ? "bg-pink-200 text-pink-800 hover:bg-pink-300" : "bg-pink-500 text-black hover:bg-pink-400"}`} onClick={() => fileInput.current?.click()}>
                Upload Image
              </button>
              <button
                className={`px-4 py-2 rounded-md font-semibold ${cute ? "bg-purple-200 text-purple-800" : "bg-black text-white"}`}
                onClick={async () => {
                  if (!file) {
                    // prompt upload
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
                {loading ? "Judging..." : "Judge Now"}
              </button>
            </div>

            <div className="mt-6 text-xs text-slate-500">
              Tip: Use clear, close-up photos for best results.
            </div>
          </div>

          {/* Upload / Preview Area */}
          <div>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`relative rounded-2xl border-2 p-6 min-h-[260px] flex flex-col ${cute ? `border-dashed border-pink-300 bg-white/80` : `border-slate-700 bg-slate-800/60`} ${dragging ? "ring-4 ring-offset-2 ring-indigo-300" : ""}`}
            >
              <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files)} />

              {!preview && (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
                  <div className={`text-4xl ${cute ? "text-pink-500" : "text-white/80"}`}>📤</div>
                  <div className={`font-semibold ${cute ? "text-purple-700" : "text-white"}`}>Drop an image here</div>
                  <div className={`text-sm ${cute ? "text-purple-500" : "text-white/70"}`}>or click <button onClick={() => fileInput.current?.click()} className={`underline ${cute ? "text-pink-600" : "text-white"}`}>to browse</button></div>
                </div>
              )}

              {preview && (
                <div className="flex-1 flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2 flex items-center justify-center">
                    <img src={preview} alt="Uploaded pet" className="max-h-64 object-contain rounded-lg shadow" />
                  </div>

                  <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <div>
                      <label className="text-sm font-semibold">Judge this pet (system)</label>
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
                          className={`px-4 py-2 rounded-md font-semibold ${cute ? "bg-purple-500 text-white" : "bg-black text-white border-2 border-black"}`}
                        >
                          {loading ? "Judging..." : "Judge"}
                        </button>

                        <button className={`px-4 py-2 rounded-md ${cute ? "bg-white/60" : "bg-white/10"}`} onClick={clearFile}>Remove</button>
                      </div>
                    </div>

                    {verdict && (
                      <div className="mt-4 p-3 rounded-md border-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`text-4xl font-extrabold ${cute ? "text-pink-600" : "text-yellow-300"}`}>{rating}★</div>
                            <div>
                              <div className="font-bold">{verdict}</div>
                              <div className="text-xs text-slate-500">Automated verdict powered by local demo model</div>
                            </div>
                          </div>
                          <div className="text-sm text-right">
                            <div className="font-semibold">Share</div>
                            <div className="text-xs text-slate-500">Copy link or post</div>
                          </div>
                        </div>

                        {metrics && (
                          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                            <div className="p-2 rounded bg-white/5">
                              <div className="text-xs">Adorability</div>
                              <div className="font-bold">{metrics.adorability}%</div>
                            </div>
                            <div className="p-2 rounded bg-white/5">
                              <div className="text-xs">Sass</div>
                              <div className="font-bold">{metrics.sass}%</div>
                            </div>
                            <div className="p-2 rounded bg-white/5">
                              <div className="text-xs">Chaos</div>
                              <div className="font-bold">{metrics.chaos}%</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 text-xs text-center text-slate-400">We never store files in this demo — this is a local preview component.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
