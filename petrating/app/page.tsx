'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

const marqueeVerdicts = [
  'Mochi the Shiba - Certified Menace',
  'Biscuit the Cat - Betrayal Level: Extreme',
  'Sir Fluffington - 94% Chaos Energy',
  'Beans the Hamster - Nap Proficiency: Criminally Elite',
  'Pickles the Iguana - Regret Index: 3%',
];

const socialProofItems = [
  { name: 'Pebble', emoji: 'DOG', verdict: 'Chaotic Neutral' },
  { name: 'Miso', emoji: 'CAT', verdict: 'Velvet Menace' },
  { name: 'Toast', emoji: 'BUN', verdict: 'Zoomies Icon' },
  { name: 'Nugget', emoji: 'BIRD', verdict: 'Witness Tamperer' },
  { name: 'Gizmo', emoji: 'LIZ', verdict: 'Cold-Blooded Diva' },
  { name: 'Muffin', emoji: 'HAM', verdict: 'Tiny Tyrant' },
];

const tournamentPets = [
  { name: 'Judge Cheddar', emoji: 'CAT', bg: 'from-orange-200 via-amber-100 to-white' },
  { name: 'Bark Wahlberg', emoji: 'DOG', bg: 'from-yellow-200 via-rose-100 to-white' },
];

const hallOfShamePreview = [
  { name: 'Mochi', category: 'Dog', verdict: 'Certified Menace', chaos: 94 },
  { name: 'Biscuit', category: 'Cat', verdict: 'Velvet Saboteur', chaos: 88 },
  { name: 'Pickles', category: 'Exotic', verdict: 'Too Calm. Suspicious.', chaos: 72 },
];

const analysisStages = [
  'Analyzing suspicious behavior...',
  'Calculating fluff density...',
  'Consulting the jury...',
  'Verdict sealed.',
];

const verdicts = [
  'Certified Menace',
  'Fluffy but dangerous',
  'Too innocent... suspicious',
  'Tiny mob boss in a sweater vest',
  'Legally adorable. Morally unclear',
];

const betrayalLevels = ['LOW', 'MEDIUM', 'HIGH', 'EXTREME'] as const;
const fluffLevels = ['LOW', 'DENSE', 'ILLEGAL'] as const;
const zoomiesLevels = ['Dormant', 'Hallway Rocket', 'Couch Catapult', 'Uninsurable'] as const;
const regretLevels = ['0%', '17%', '52%', '81%', 'None whatsoever'] as const;
const napLevels = ['Amateur', 'Seasonal Pro', 'Hall of Famer', 'Interdimensional'] as const;

type ResultCard = {
  chaosEnergy: number;
  betrayalCapacity: (typeof betrayalLevels)[number];
  fluffFactor: (typeof fluffLevels)[number];
  zoomiesLevel: (typeof zoomiesLevels)[number];
  regretIndex: (typeof regretLevels)[number];
  napProficiency: (typeof napLevels)[number];
  verdict: string;
};

type RevealState = {
  chaosEnergy: boolean;
  betrayalCapacity: boolean;
  fluffFactor: boolean;
  zoomiesLevel: boolean;
  regretIndex: boolean;
  napProficiency: boolean;
  verdict: boolean;
};

const defaultRevealState: RevealState = {
  chaosEnergy: false,
  betrayalCapacity: false,
  fluffFactor: false,
  zoomiesLevel: false,
  regretIndex: false,
  napProficiency: false,
  verdict: false,
};

function pickRandomValue<T>(items: readonly T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function generatePetStats(): ResultCard {
  return {
    chaosEnergy: Math.floor(Math.random() * 101),
    betrayalCapacity: pickRandomValue(betrayalLevels),
    fluffFactor: pickRandomValue(fluffLevels),
    zoomiesLevel: pickRandomValue(zoomiesLevels),
    regretIndex: pickRandomValue(regretLevels),
    napProficiency: pickRandomValue(napLevels),
    verdict: pickRandomValue(verdicts),
  };
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function getTimeToNextTournament() {
  const now = new Date();
  const next = new Date(now);
  next.setDate(now.getDate() + ((7 - now.getDay()) % 7 || 7));
  next.setHours(20, 0, 0, 0);
  const diff = Math.max(0, next.getTime() - now.getTime());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

async function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export default function HomePage() {
  const { data: session, status } = useSession();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadFeedback, setUploadFeedback] = useState('');
  const [authFeedback, setAuthFeedback] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [analysisMessage, setAnalysisMessage] = useState('');
  const [results, setResults] = useState<ResultCard | null>(null);
  const [revealed, setRevealed] = useState<RevealState>(defaultRevealState);
  const [chaosDisplay, setChaosDisplay] = useState(0);
  const [shareFeedback, setShareFeedback] = useState('');
  const [downloadFeedback, setDownloadFeedback] = useState('');
  const [confettiVisible, setConfettiVisible] = useState(false);
  const [tournamentCountdown, setTournamentCountdown] = useState(getTimeToNextTournament());

  const avatarInitial = (session?.user?.name?.[0] ?? 'N').toUpperCase();
  const confettiItems = useMemo(() => Array.from({ length: 18 }, (_, index) => ({ id: index, badge: ['*', '!', '+'][index % 3], left: 8 + index * 5, delay: index * 0.04, duration: 0.9 + (index % 4) * 0.15 })), []);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!overlayOpen) {
      return;
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [overlayOpen]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTournamentCountdown(getTimeToNextTournament());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!revealed.chaosEnergy || !results) {
      return;
    }
    const durationMs = 1400;
    const intervalMs = 35;
    const increment = Math.max(1, Math.ceil(results.chaosEnergy / (durationMs / intervalMs)));
    let currentValue = 0;
    const timer = window.setInterval(() => {
      currentValue = Math.min(currentValue + increment, results.chaosEnergy);
      setChaosDisplay(currentValue);
      if (currentValue >= results.chaosEnergy) {
        window.clearInterval(timer);
      }
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [revealed.chaosEnergy, results]);

  const resetVerdictState = () => {
    setOverlayOpen(false);
    setAnalysisMessage('');
    setResults(null);
    setRevealed(defaultRevealState);
    setChaosDisplay(0);
    setShareFeedback('');
    setDownloadFeedback('');
    setConfettiVisible(false);
  };

  const showCourtToast = () => {
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 2600);
  };

  const handleRoastClick = async () => {
    setAuthFeedback('');
    if (status === 'loading') {
      setAuthFeedback('Checking the pet court records. Try again in a second.');
      return;
    }
    if (status !== 'authenticated') {
      await signIn('google', { callbackUrl: '/' });
      return;
    }
    fileInputRef.current?.click();
  };

  const handleAuthAction = async () => {
    setAuthFeedback('');
    if (status === 'loading') {
      setAuthFeedback('Session is still waking up. Try again in a second.');
      return;
    }
    if (status === 'authenticated') {
      await signOut({ callbackUrl: '/' });
      return;
    }
    await signIn('google', { callbackUrl: '/' });
  };

  const openFilePicker = () => fileInputRef.current?.click();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(nextFile);
    setPreviewUrl(nextFile ? URL.createObjectURL(nextFile) : null);
    setUploadFeedback(nextFile ? `${nextFile.name} loaded. The prosecution is interested.` : '');
    resetVerdictState();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadFeedback('Pick a pet photo first, menace.');
      return;
    }
    console.log('Pet upload file:', selectedFile);
    showCourtToast();
    await wait(650);
    setOverlayOpen(true);
    setResults(null);
    setRevealed(defaultRevealState);
    setChaosDisplay(0);
    setShareFeedback('');
    setDownloadFeedback('');

    for (const stage of analysisStages) {
      setAnalysisMessage(stage);
      await wait(1700);
    }

    const nextResults = generatePetStats();
    setResults(nextResults);
    await wait(500);
    setRevealed((current) => ({ ...current, chaosEnergy: true }));
    await wait(420);
    setRevealed((current) => ({ ...current, betrayalCapacity: true }));
    await wait(420);
    setRevealed((current) => ({ ...current, fluffFactor: true }));
    await wait(420);
    setRevealed((current) => ({ ...current, zoomiesLevel: true }));
    await wait(420);
    setRevealed((current) => ({ ...current, regretIndex: true }));
    await wait(420);
    setRevealed((current) => ({ ...current, napProficiency: true }));
    await wait(480);
    setRevealed((current) => ({ ...current, verdict: true }));
    setConfettiVisible(true);
    window.setTimeout(() => setConfettiVisible(false), 1200);
    setAnalysisMessage('Judgment complete. No appeals accepted.');
    setUploadFeedback('Defendant convicted in the court of vibes.');
  };

  const handleShare = async () => {
    if (!results || !selectedFile) {
      return;
    }
    const shareText = [
      `${selectedFile.name} has been judged by PetRating.`,
      `Chaos Energy: ${results.chaosEnergy}%`,
      `Betrayal Capacity: ${results.betrayalCapacity}`,
      `Fluff Factor: ${results.fluffFactor}`,
      `Zoomies Level: ${results.zoomiesLevel}`,
      `Regret Index: ${results.regretIndex}`,
      `Nap Proficiency: ${results.napProficiency}`,
      `Final Verdict: ${results.verdict}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(shareText);
      setShareFeedback('Share card copied. The group chat is doomed.');
    } catch {
      window.alert('Ready to share!');
      setShareFeedback('Ready to share!');
    }
  };

  const handleDownload = async () => {
    if (!results || !selectedFile) {
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1600;
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }
    context.fillStyle = '#f8efe1';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#f0dbc0';
    for (let i = 0; i < 120; i += 1) {
      context.globalAlpha = 0.08;
      context.fillRect((i * 73) % canvas.width, (i * 41) % canvas.height, 120, 2);
    }
    context.globalAlpha = 1;
    if (previewUrl) {
      const image = await loadImage(previewUrl);
      context.drawImage(image, 90, 130, 1020, 560);
    }
    context.strokeStyle = '#7f1d1d';
    context.lineWidth = 8;
    context.strokeRect(60, 60, 1080, 1480);
    context.save();
    context.globalAlpha = 0.16;
    context.translate(640, 840);
    context.rotate(-0.25);
    context.strokeStyle = '#b91c1c';
    context.lineWidth = 12;
    context.strokeRect(-260, -70, 520, 140);
    context.font = 'bold 64px Arial';
    context.fillStyle = '#b91c1c';
    context.textAlign = 'center';
    context.fillText('CLASSIFIED', 0, 20);
    context.restore();
    context.fillStyle = '#201514';
    context.font = '900 68px Arial';
    context.fillText('PetRating Verdict Card', 90, 860);
    context.font = 'bold 42px Arial';
    context.fillText(selectedFile.name, 90, 920);
    const lines = [
      `Chaos Energy: ${results.chaosEnergy}%`,
      `Betrayal Capacity: ${results.betrayalCapacity}`,
      `Fluff Factor: ${results.fluffFactor}`,
      `Zoomies Level: ${results.zoomiesLevel}`,
      `Regret Index: ${results.regretIndex}`,
      `Nap Proficiency: ${results.napProficiency}`,
    ];
    context.font = 'bold 34px Arial';
    lines.forEach((line, index) => {
      const x = index % 2 === 0 ? 90 : 620;
      const y = 1010 + Math.floor(index / 2) * 120;
      context.fillStyle = '#3f2a28';
      context.fillText(line, x, y);
    });
    context.save();
    context.translate(860, 1370);
    context.rotate(-0.14);
    context.strokeStyle = '#991b1b';
    context.lineWidth = 8;
    context.strokeRect(-250, -60, 500, 120);
    context.fillStyle = '#991b1b';
    context.font = '900 46px Arial';
    context.textAlign = 'center';
    context.fillText(results.verdict.replace(/ [^\s]+$/, ''), 0, 15);
    context.restore();
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'petrating-verdict-card.png';
    link.click();
    setDownloadFeedback('Card downloaded. Evidence secured.');
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 text-stone-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob blob-one" />
        <div className="blob blob-two" />
        <div className="blob blob-three" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="marquee-shell mb-4 overflow-hidden rounded-full border border-stone-200/80 bg-white/65 px-4 py-2 shadow-[0_10px_30px_rgba(85,45,12,0.08)] backdrop-blur">
          <div className="marquee-track">
            {[...marqueeVerdicts, ...marqueeVerdicts].map((item, index) => (
              <span key={`${item}-${index}`} className="marquee-item">{item}</span>
            ))}
          </div>
        </div>

        <nav className="mb-6 flex flex-col gap-4 rounded-full border border-black/10 bg-white/70 px-5 py-4 shadow-[0_12px_40px_rgba(66,31,0,0.08)] backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="group flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight">PetRating</span>
              <span className="gavel inline-flex text-xl transition-transform group-hover:scale-110">🔨</span>
            </Link>
            <Link href="/hall-of-shame" className="text-sm font-semibold text-stone-700 transition hover:text-stone-950">Hall of Shame</Link>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-amber-300 text-sm font-black text-white shadow-[0_8px_20px_rgba(244,114,182,0.35)]">{avatarInitial}</div>
            <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-950">
              {status === 'authenticated' ? `Signed in as ${session.user?.name ?? 'Mystery Beast'}` : 'No human identified yet'}
            </span>
            <button type="button" onClick={handleAuthAction} className="button-pill rounded-full border border-stone-900 bg-stone-950 px-5 py-2.5 text-sm font-black text-amber-50">
              {status === 'authenticated' ? 'Logout' : 'Sign In'}
            </button>
          </div>
        </nav>

        {authFeedback ? <p className="mb-4 rounded-2xl border border-amber-300 bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-950">{authFeedback}</p> : null}

        <section className="grid gap-6 md:min-h-[72vh] md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div className="order-2 flex h-full items-center md:order-1">
            <div className="space-y-6">
              <div className="inline-flex rounded-full border border-red-300 bg-red-100 px-4 py-2 text-sm font-bold text-red-700 shadow-[0_8px_24px_rgba(220,38,38,0.12)]">Live Pet Audits. Zero mercy. 💀</div>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-5xl font-black leading-none tracking-tight md:text-7xl">We Judged Your Pet. It&apos;s Not Looking Good 💀</h1>
                <p className="max-w-2xl text-lg leading-8 text-stone-700 md:text-xl">Submit one suspicious little face and receive a dramatic courtroom stat card packed with fluff-based slander, betrayal science, and courtroom-certified chaos.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={handleRoastClick} className="button-pill rounded-full bg-stone-950 px-8 py-4 text-lg font-black text-amber-50 shadow-[0_14px_34px_rgba(36,23,20,0.28)]">Roast My Pet 🔥</button>
                <button type="button" onClick={openFilePicker} className="button-pill rounded-full border-2 border-stone-950 bg-white/85 px-8 py-4 text-lg font-bold text-stone-900">Choose Evidence 📸</button>
              </div>
              {results ? <div className="rounded-[30px] border border-black/10 bg-white/78 p-5 shadow-[0_20px_50px_rgba(66,31,0,0.12)] backdrop-blur"><p className="text-sm font-bold uppercase tracking-[0.2em] text-stone-500">Latest Verdict</p><p className="mt-3 text-3xl font-black text-stone-950">{results.verdict}</p><p className="mt-2 text-sm text-stone-600">The full card is ready to reopen, reshare, or weaponize in the family group chat.</p></div> : null}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="rounded-[38px] border border-black/10 bg-white/82 p-6 shadow-[0_24px_80px_rgba(66,31,0,0.16)] backdrop-blur">
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              <div className="flex flex-col gap-5">
                <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-stone-500">Upload Tribunal</p><h2 className="mt-2 text-3xl font-black text-stone-950">Submit your furry defendant</h2></div>
                <div className="flex min-h-64 items-center justify-center overflow-hidden rounded-[28px] bg-stone-950 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
                  {previewUrl ? <Image src={previewUrl} alt="Selected pet preview" width={500} height={500} unoptimized className="h-full w-full object-cover" /> : <div className="space-y-3 px-6 text-center text-amber-50"><p className="text-6xl">📸</p><p className="text-xl font-black">No pet evidence loaded</p><p className="text-sm text-amber-50/75">Choose a photo to begin the trial. The court loves drama.</p></div>}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button type="button" onClick={openFilePicker} className="button-pill rounded-full bg-stone-950 px-5 py-3 text-base font-black text-amber-50">⇄ {selectedFile ? 'Swap Suspect' : 'Choose Pet Image'}</button>
                  <button type="button" onClick={handleUpload} className="button-pill rounded-full bg-amber-300 px-5 py-3 text-base font-black text-stone-950">Upload Pet</button>
                </div>
                <p className="rounded-2xl bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-950">{uploadFeedback || 'Pick a photo and launch the trial. No scrolling required.'}</p>
                {!results ? <div className="breathing-preview rounded-[28px] border-2 border-dashed border-stone-300 bg-stone-50 p-5 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)]"><p className="text-xs font-black uppercase tracking-[0.28em] text-stone-500">Awaiting Judgment</p><div className="mt-4 grid gap-3 sm:grid-cols-3">{['Chaos Energy','Betrayal Capacity','Fluff Factor'].map((label, index) => <div key={label} className="rounded-2xl bg-white/90 px-4 py-5 shadow-[0_10px_24px_rgba(66,31,0,0.08)]"><p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">{label}</p><p className="mt-2 text-lg font-black text-stone-800">{['???','CLASSIFIED','PENDING'][index]}</p></div>)}</div></div> : null}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 overflow-hidden rounded-[32px] border border-black/10 bg-white/72 p-4 shadow-[0_20px_50px_rgba(66,31,0,0.12)] backdrop-blur">
          <div className="social-track">
            {[...socialProofItems, ...socialProofItems].map((item, index) => (
              <div key={`${item.name}-${index}`} className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-[0_8px_24px_rgba(66,31,0,0.1)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-rose-200 text-xs font-black text-stone-800">{item.emoji}</div>
                <div><p className="text-sm font-black text-stone-900">{item.name}</p><p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Just Judged: {item.verdict}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[34px] border border-black/10 bg-gradient-to-br from-stone-950 via-stone-900 to-red-950 p-6 text-white shadow-[0_26px_90px_rgba(49,20,20,0.28)]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl"><p className="text-sm font-black uppercase tracking-[0.24em] text-red-200/80">Pet Tournament</p><h2 className="mt-3 text-3xl font-black md:text-4xl">Vote for who wins in a fight</h2><p className="mt-3 text-sm leading-7 text-red-50/78">Weekly bracket chaos returns in {tournamentCountdown.days}d {tournamentCountdown.hours}h {tournamentCountdown.minutes}m {tournamentCountdown.seconds}s.</p></div>
            <div className="grid flex-1 gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
              {tournamentPets.map((pet, index) => (
                <div key={pet.name} className={`rounded-[28px] bg-gradient-to-br ${pet.bg} p-5 text-center text-stone-950 shadow-[0_20px_50px_rgba(0,0,0,0.2)]`}>
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white/75 text-xs font-black shadow-[0_12px_24px_rgba(66,31,0,0.12)]">{pet.emoji}</div>
                  <p className="mt-4 text-lg font-black">{pet.name}</p>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-600">{index === 0 ? 'Trash Talk Champion' : 'Furniture Menace'}</p>
                </div>
              ))}
              <div className="text-center text-3xl font-black text-amber-200">VS</div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[32px] border border-black/10 bg-white/74 p-6 shadow-[0_20px_50px_rgba(66,31,0,0.12)] backdrop-blur">
          <div className="mb-4 flex items-center justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[0.24em] text-stone-500">Hall of Shame Preview</p><h2 className="mt-2 text-3xl font-black text-stone-950">Repeat offenders</h2></div><Link href="/hall-of-shame" className="button-pill rounded-full border border-stone-900 bg-white px-5 py-3 text-sm font-black text-stone-950">Open Leaderboard</Link></div>
          <div className="grid gap-4 md:grid-cols-3">
            {hallOfShamePreview.map((pet) => (
              <div key={pet.name} className="rounded-[26px] border border-black/10 bg-stone-50 p-5 shadow-[0_16px_40px_rgba(66,31,0,0.08)]"><div className="flex items-center justify-between"><p className="text-lg font-black text-stone-950">{pet.name}</p><span className="rounded-full bg-red-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-red-700">{pet.category}</span></div><p className="mt-3 text-sm font-semibold text-stone-600">{pet.verdict}</p><p className="mt-4 text-3xl font-black text-stone-950">{pet.chaos}%</p><p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Chaos Energy</p></div>
            ))}
          </div>
        </section>

        <footer className="mt-10 flex flex-col gap-3 border-t border-stone-200/70 py-6 text-sm text-stone-600 md:flex-row md:items-center md:justify-between">
          <p>No pets were emotionally harmed. Probably.</p>
          <div className="flex flex-wrap items-center gap-4"><a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:text-stone-950">Instagram</a><a href="https://www.tiktok.com" target="_blank" rel="noreferrer" className="hover:text-stone-950">TikTok</a><a href="https://twitter.com/intent/tweet?text=My%20pet%20was%20judged%20by%20PetRating" target="_blank" rel="noreferrer" className="hover:text-stone-950">X</a></div>
        </footer>
      </div>

      {toastVisible ? <div className="fixed bottom-6 right-6 z-50 rounded-[22px] border border-white/10 bg-stone-950 px-5 py-4 text-sm text-amber-50 shadow-[0_24px_60px_rgba(0,0,0,0.35)]"><p className="font-serif text-lg font-bold">Defendant received.</p><p className="font-serif text-amber-100/80">Court convening shortly.</p></div> : null}

      {overlayOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,79,79,0.2),transparent_30%),linear-gradient(180deg,rgba(15,7,7,0.92)_0%,rgba(33,10,10,0.95)_100%)] px-4 py-6">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[38px] border border-red-900/20 bg-[#f7efdf] p-6 text-stone-900 shadow-[0_30px_120px_rgba(0,0,0,0.45)] md:p-8">
            <div className="paper-texture" />
            <div className="classified-stamp">CLASSIFIED</div>
            <div className="relative z-10 max-h-[85vh] overflow-y-auto pr-2">
              <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_1fr] xl:grid-cols-[0.8fr_1.2fr]">
                <div className="space-y-5">
                  <div className="inline-flex rounded-full bg-stone-950 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-amber-50">Sound Off</div>
                  <div className="rounded-[28px] border border-stone-200 bg-white/85 p-5 shadow-[0_18px_40px_rgba(66,31,0,0.08)]">
                    <p className="text-4xl">SKETCH</p>
                    <p className="mt-3 text-sm font-black uppercase tracking-[0.24em] text-stone-500">Courtroom Sketch</p>
                    <h2 className="mt-3 text-3xl font-black md:text-4xl">Tiny court is now reviewing the evidence</h2>
                    <div className="mt-5 flex items-center gap-3"><div className="gavel-bang text-4xl">🔨</div><div><p className="text-sm font-semibold text-stone-500">Gavel Sequence</p><p className="text-lg font-black text-stone-950">3 ceremonial bonks</p></div></div>
                    <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{analysisMessage}</p>
                  </div>
                  <div className="overflow-hidden rounded-[28px] bg-stone-950 shadow-[0_20px_50px_rgba(49,20,20,0.28)]">{previewUrl ? <Image src={previewUrl} alt="Pet evidence" width={520} height={520} unoptimized className="h-72 w-full object-cover" /> : <div className="flex h-72 items-center justify-center text-amber-50/80">Evidence missing. Suspicious.</div>}</div>
                </div>
                <div className="relative rounded-[30px] border border-stone-200 bg-white/88 p-5 shadow-[0_18px_40px_rgba(66,31,0,0.08)]">
                  {confettiVisible ? <div className="pointer-events-none absolute inset-0 overflow-hidden">{confettiItems.map((item) => <span key={item.id} className="confetti" style={{ left: `${item.left}%`, animationDelay: `${item.delay}s`, animationDuration: `${item.duration}s` }}>{item.badge}</span>)}</div> : null}
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    {[
                      ['Chaos Energy', revealed.chaosEnergy ? `${chaosDisplay}%` : '--', 'text-amber-600'],
                      ['Betrayal Capacity', revealed.betrayalCapacity ? results?.betrayalCapacity : '--', 'text-red-700'],
                      ['Fluff Factor', revealed.fluffFactor ? results?.fluffFactor : '--', ''],
                      ['Zoomies Level', revealed.zoomiesLevel ? results?.zoomiesLevel : '--', 'text-3xl'],
                      ['Regret Index', revealed.regretIndex ? results?.regretIndex : '--', ''],
                      ['Nap Proficiency', revealed.napProficiency ? results?.napProficiency : '--', 'text-3xl'],
                    ].map(([label, value, extra], index) => <div key={String(label)} className={`stat-card ${(Object.values(revealed)[index] ? 'revealed ' : '')}${index === 1 && revealed.betrayalCapacity ? 'flicker-card' : ''}`}><p className="stat-label">{label}</p><p className={`stat-value ${extra}`}>{value}</p></div>)}
                  </div>
                  {revealed.verdict && results ? (
                    <div className="verdict-shell mt-5 rounded-[30px] border border-red-300 bg-[#fff9ef] p-5 shadow-[0_18px_40px_rgba(66,31,0,0.08)]">
                      <div className="spin-stamp">CERTIFIED MENACE</div>
                      <p className="text-sm font-black uppercase tracking-[0.24em] text-stone-500">Final Verdict</p>
                      <div className="verdict-rubber mt-4 inline-block rounded-md border-[3px] border-red-700 px-5 py-3 text-2xl font-black uppercase text-red-700">{results.verdict}</div>
                      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <button type="button" onClick={handleShare} className="button-pill rounded-full bg-red-600 px-6 py-3 text-sm font-black text-white shadow-[0_16px_34px_rgba(220,38,38,0.26)]">Share Card</button>
                        <button type="button" onClick={() => { resetVerdictState(); openFilePicker(); }} className="button-pill rounded-full bg-amber-300 px-6 py-3 text-sm font-black text-stone-950">Expose This Criminal 📸</button>
                        <button type="button" onClick={resetVerdictState} className="button-pill rounded-full border border-stone-900 bg-transparent px-6 py-3 text-sm font-black text-stone-900">Judge Another</button>
                        <button type="button" onClick={handleDownload} className="button-pill rounded-full border border-stone-900 bg-white px-6 py-3 text-sm font-black text-stone-900">Download Card</button>
                      </div>
                      {shareFeedback ? <p className="mt-3 text-sm font-semibold text-red-700">{shareFeedback}</p> : null}
                      {downloadFeedback ? <p className="mt-2 text-sm font-semibold text-stone-700">{downloadFeedback}</p> : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <style jsx>{`
        .blob { position: absolute; border-radius: 9999px; filter: blur(38px); opacity: 0.45; animation: drift 18s ease-in-out infinite alternate; }
        .blob-one { top: 8%; left: 4%; height: 280px; width: 280px; background: rgba(255, 171, 145, 0.8); }
        .blob-two { top: 18%; right: 12%; height: 240px; width: 240px; background: rgba(221, 191, 255, 0.7); animation-duration: 22s; }
        .blob-three { bottom: 18%; left: 34%; height: 220px; width: 220px; background: rgba(255, 225, 111, 0.65); animation-duration: 25s; }
        .button-pill { transition: transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease; }
        .button-pill:hover { transform: scale(1.02) translateY(-2px); box-shadow: 0 16px 30px rgba(66, 31, 0, 0.16); }
        .marquee-shell { white-space: nowrap; }
        .marquee-track { display: inline-flex; min-width: max-content; animation: marquee 24s linear infinite; }
        .marquee-item { margin-right: 2rem; font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #7c2d12; }
        .gavel { transform-origin: bottom center; }
        .group:hover .gavel { animation: gavel-hover 0.65s ease; }
        .breathing-preview { animation: breathe 4.8s ease-in-out infinite; }
        .social-track { display: inline-flex; min-width: max-content; gap: 1rem; animation: marquee 20s linear infinite; }
        .paper-texture { position: absolute; inset: 0; background-image: linear-gradient(rgba(120, 90, 54, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 90, 54, 0.04) 1px, transparent 1px); background-size: 24px 24px; opacity: 0.55; pointer-events: none; }
        .classified-stamp { position: absolute; right: 5rem; top: 5rem; border: 6px solid rgba(185, 28, 28, 0.22); color: rgba(185, 28, 28, 0.22); font-size: 3rem; font-weight: 900; letter-spacing: 0.28em; padding: 1rem 1.25rem; transform: rotate(-18deg); }
        .gavel-bang { animation: bang 2.1s ease-in-out infinite; transform-origin: 70% 80%; }
        .stat-card { border: 1px dashed rgba(41, 26, 24, 0.18); border-radius: 1.5rem; padding: 1.1rem 1.15rem; background: rgba(255, 252, 248, 0.86); opacity: 0.25; transform: translateY(16px); }
        .stat-card.revealed { opacity: 1; transform: translateY(0); animation: reveal-up 0.45s ease forwards; box-shadow: 0 14px 28px rgba(66, 31, 0, 0.1); }
        .flicker-card.revealed { animation: reveal-up 0.45s ease forwards, flicker 0.55s ease; }
        .stat-label { font-size: 0.74rem; font-weight: 900; letter-spacing: 0.22em; text-transform: uppercase; color: #8b5e3c; }
        .stat-value { margin-top: 0.85rem; font-size: 2.35rem; line-height: 1.08; font-weight: 900; color: #221b1a; }
        .verdict-shell { transform: scale(0.8); animation: verdict-in 0.55s ease forwards; }
        .spin-stamp { position: absolute; right: 1.2rem; top: -1rem; padding: 0.7rem 1rem; border: 4px solid #991b1b; color: #991b1b; font-size: 0.9rem; font-weight: 900; letter-spacing: 0.22em; transform: rotate(-14deg); animation: stamp-in 0.85s cubic-bezier(0.2, 1.4, 0.4, 1) forwards; background: rgba(255, 249, 239, 0.9); }
        .verdict-rubber { transform: rotate(-4deg); box-shadow: inset 0 0 0 1px rgba(153, 27, 27, 0.08); }
        .confetti { position: absolute; top: 42%; font-size: 1.3rem; animation-name: confetti; animation-timing-function: ease-out; animation-fill-mode: forwards; }
        @keyframes drift { from { transform: translate3d(0, 0, 0) scale(1); } to { transform: translate3d(30px, -18px, 0) scale(1.08); } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes gavel-hover { 0%,100% { transform: translateY(0) rotate(0deg); } 40% { transform: translateY(-4px) rotate(-18deg); } 70% { transform: translateY(2px) rotate(12deg); } }
        @keyframes breathe { 0%,100% { transform: scale(1); box-shadow: 0 14px 28px rgba(66, 31, 0, 0.08); } 50% { transform: scale(1.02); box-shadow: 0 22px 44px rgba(66, 31, 0, 0.14); } }
        @keyframes bang { 0%,100% { transform: rotate(0deg) translateY(0); } 18% { transform: rotate(-30deg) translateY(-8px); } 26% { transform: rotate(10deg) translateY(7px); } 48% { transform: rotate(-30deg) translateY(-8px); } 56% { transform: rotate(10deg) translateY(7px); } 78% { transform: rotate(-30deg) translateY(-8px); } 86% { transform: rotate(10deg) translateY(7px); } }
        @keyframes reveal-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes flicker { 0% { opacity: 0.2; } 40% { opacity: 1; } 65% { opacity: 0.35; } 100% { opacity: 1; } }
        @keyframes verdict-in { 0% { transform: scale(0.8); border-color: rgba(248, 113, 113, 0.35); box-shadow: 0 0 0 rgba(248, 113, 113, 0.45); } 45% { box-shadow: 0 0 0 10px rgba(248, 113, 113, 0.14); } 100% { transform: scale(1); } }
        @keyframes stamp-in { 0% { opacity: 0; transform: translateY(-26px) rotate(-220deg) scale(0.4); } 70% { opacity: 1; transform: translateY(8px) rotate(-10deg) scale(1.08); } 100% { opacity: 1; transform: translateY(0) rotate(-14deg) scale(1); } }
        @keyframes confetti { from { opacity: 1; transform: translateY(0) rotate(0deg); } to { opacity: 0; transform: translateY(-130px) rotate(180deg); } }
        @media (max-width: 767px) { .classified-stamp { right: 1rem; top: 2rem; font-size: 1.6rem; padding: 0.7rem 0.9rem; } }
      `}</style>
    </main>
  );
}
