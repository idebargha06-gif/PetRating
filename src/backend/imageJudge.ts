// Lightweight heuristic image judge implemented for client-side usage.
// Compares an uploaded image to two placeholder images (cat/dog) and
// returns a simple similarity-based score and trait metrics.

export async function judgeImage(file: File): Promise<{ score: number; verdict: string; metrics: { similarityToCat: number; similarityToDog: number; confidence: number } }> {
  // Load uploaded image and placeholders into canvases, compute downsampled RGB histograms,
  // then compute cosine similarity. All runs in the browser.

  function loadImage(src: string | Blob): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      if (src instanceof Blob) {
        img.src = URL.createObjectURL(src as Blob);
      } else {
        img.src = src as string;
      }
    });
  }

  function getHistogram(img: HTMLImageElement, bins = 8) {
    const w = 128;
    const h = 128;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, w, h);
    const data = ctx.getImageData(0, 0, w, h).data;
    const hist = new Float32Array(bins * 3).fill(0);
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const ri = Math.floor((r / 256) * bins);
      const gi = Math.floor((g / 256) * bins);
      const bi = Math.floor((b / 256) * bins);
      hist[ri] += 1;
      hist[bins + gi] += 1;
      hist[bins * 2 + bi] += 1;
    }
    // normalize
    let sum = 0;
    for (let i = 0; i < hist.length; i++) sum += hist[i];
    for (let i = 0; i < hist.length; i++) hist[i] /= sum || 1;
    return Array.from(hist);
  }

  function cosine(a: number[], b: number[]) {
    let num = 0;
    let da = 0;
    let db = 0;
    for (let i = 0; i < a.length; i++) {
      num += a[i] * b[i];
      da += a[i] * a[i];
      db += b[i] * b[i];
    }
    return num / (Math.sqrt(da) * Math.sqrt(db) + 1e-9);
  }

  // load uploaded image
  const uploadedImg = await loadImage(file);

  // load placeholders from public folder
  const catImg = await loadImage("/placeholders/cat.svg");
  const dogImg = await loadImage("/placeholders/dog.svg");

  const ha = getHistogram(uploadedImg);
  const hc = getHistogram(catImg);
  const hd = getHistogram(dogImg);

  const sc = cosine(ha, hc); // similarity to cat
  const sd = cosine(ha, hd); // similarity to dog

  // compute a simple 'content' metric: fraction of non-white pixels in a downsampled canvas
  function contentFraction(img: HTMLImageElement) {
    const w = 64;
    const h = 64;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, w, h);
    const data = ctx.getImageData(0, 0, w, h).data;
    let nonWhite = 0;
    const total = w * h;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // consider a pixel 'content' if not nearly white
      if (r + g + b < 740) nonWhite++;
    }
    return nonWhite / total;
  }

  const content = contentFraction(uploadedImg);

  // combine similarity and content to avoid uniformly low scores when comparing photos to simple SVGs
  const combined = Math.max(sc, sd);
  const combinedMetric = 0.5 * combined + 0.5 * content; // balanced mix
  const confidence = Math.round((combined * 0.7 + content * 0.3) * 100);
  const score = Math.min(5, Math.max(1, Math.round(combinedMetric * 4) + 1));

  const verdicts = [
    "Needs grooming and counseling",
    "Could be better — try a filter",
    "Average floof — shareable",
    "Cute and chaotic — crowd pleaser",
    "Unquestionable royalty",
  ];

  const verdict = verdicts[score - 1];

  return {
    score,
    verdict,
    metrics: {
      similarityToCat: Math.round(sc * 100),
      similarityToDog: Math.round(sd * 100),
      confidence,
    },
  };
}

export default judgeImage;
