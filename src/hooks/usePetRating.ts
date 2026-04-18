import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import type { UserProfile } from '@/types/user';
import { addXP, addCoins, updateStreak, canRateToday, getDailyRatingsRemaining, checkAndAwardAchievements, buyExtraRating, getUserProfile } from '@/lib/userProfile';
import { savePetToPortfolio } from '@/lib/pets';

export type ResultCard = {
  chaosEnergy: number;
  betrayalCapacity: string;
  fluffFactor: string;
  zoomiesLevel: string;
  regretIndex: string;
  napProficiency: string;
  verdict: string;
};

export type RevealState = {
  chaosEnergy: boolean;
  betrayalCapacity: boolean;
  fluffFactor: boolean;
  zoomiesLevel: boolean;
  regretIndex: boolean;
  napProficiency: boolean;
  verdict: boolean;
};

const betrayalLevels = ['LOW', 'MEDIUM', 'HIGH', 'EXTREME'] as const;
const fluffLevels = ['LOW', 'DENSE', 'ILLEGAL'] as const;
const zoomiesLevels = ['Dormant', 'Hallway Rocket', 'Couch Catapult', 'Uninsurable'] as const;
const regretLevels = ['0%', '17%', '52%', '81%', 'None whatsoever'] as const;
const napLevels = ['Amateur', 'Seasonal Pro', 'Hall of Famer', 'Interdimensional'] as const;
const verdicts = [
  'Certified Menace',
  'Fluffy but dangerous',
  'Too innocent... suspicious',
  'Tiny mob boss in a sweater vest',
  'Legally adorable. Morally unclear',
];

const analysisStages = [
  'Analyzing suspicious behavior...',
  'Calculating fluff density...',
  'Consulting the jury...',
  'Verdict sealed.',
];

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

export function usePetRating(userProfile: UserProfile | null, setUserProfile: (profile: UserProfile | null) => void) {
  const { data: session, status } = useSession();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadFeedback, setUploadFeedback] = useState('');
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [analysisMessage, setAnalysisMessage] = useState('');
  const [results, setResults] = useState<ResultCard | null>(null);
  const [revealed, setRevealed] = useState<RevealState>(defaultRevealState);
  const [chaosDisplay, setChaosDisplay] = useState(0);
  const [shareFeedback, setShareFeedback] = useState('');
  const [downloadFeedback, setDownloadFeedback] = useState('');
  const [confettiVisible, setConfettiVisible] = useState(false);
  const [purchaseFeedback, setPurchaseFeedback] = useState('');
  const [saveFeedback, setSaveFeedback] = useState('');

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(nextFile);
    setPreviewUrl(nextFile ? URL.createObjectURL(nextFile) : null);
    setUploadFeedback(nextFile ? `${nextFile.name} loaded. The prosecution is interested.` : '');
    resetVerdictState();
  };

  const handleBuyExtraRating = async () => {
    if (status !== 'authenticated' || !session?.user?.email) return;
    
    const result = await buyExtraRating(session.user.email);
    setPurchaseFeedback(result.message);
    if (result.success) {
      const freshProfile = await getUserProfile(session.user.email);
      if (freshProfile) {
        setUserProfile(freshProfile);
      }
      setUploadFeedback('');
    }
  };

  const handleSaveToPortfolio = async () => {
    if (status !== 'authenticated' || !session?.user?.email || !results || !selectedFile) return;
    
    const userEmail = session.user.email;
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64String = e.target?.result as string;
      
      const savedPet = await savePetToPortfolio(userEmail, {
        name: selectedFile.name,
        photo_url: base64String,
        chaos_energy: results.chaosEnergy,
        betrayal_capacity: results.betrayalCapacity,
        fluff_factor: results.fluffFactor,
        zoomies_level: results.zoomiesLevel,
        regret_index: results.regretIndex,
        nap_proficiency: results.napProficiency,
        verdict: results.verdict,
      });

      if (savedPet) {
        setSaveFeedback('Pet saved to your portfolio! 🎉');
      } else {
        setSaveFeedback('Failed to save pet to portfolio.');
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadFeedback('Pick a pet photo first, menace.');
      return;
    }

    if (status === 'authenticated' && !canRateToday(userProfile)) {
      const remaining = getDailyRatingsRemaining(userProfile);
      const userCoins = userProfile?.coins || 0;
      setUploadFeedback(`Daily rating limit reached. ${userCoins >= 50 ? `Buy extra rating for 50 coins or ` : ''}Come back tomorrow for ${remaining} free ratings!`);
      return;
    }

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

    if (status === 'authenticated' && session?.user?.email) {
      let xpMultiplier = 1;
      const currentStreak = userProfile?.current_streak || 0;
      if (currentStreak >= 30) {
        xpMultiplier = 3;
      } else if (currentStreak >= 7) {
        xpMultiplier = 2;
      }

      await addXP(session.user.email, 10 * xpMultiplier);
      await addCoins(session.user.email, 10);
      const updatedProfile = await updateStreak(session.user.email);
      if (updatedProfile) {
        setUserProfile(updatedProfile);
        
        const profileWithAchievements = await checkAndAwardAchievements(
          session.user.email,
          nextResults.chaosEnergy,
          nextResults.betrayalCapacity,
          nextResults.fluffFactor,
          nextResults.zoomiesLevel,
          nextResults.regretIndex,
          nextResults.napProficiency
        );
        if (profileWithAchievements) {
          setUserProfile(profileWithAchievements);
        }
      }
    }
  };

  const handleShare = async () => {
    if (!results || !selectedFile) {
      return;
    }
    const shareText = [
      `${selectedFile.name} has been judged by Pawndora.`,
      `Chaos Energy: ${results.chaosEnergy}%`,
      `Betrayal Capacity: ${results.betrayalCapacity}`,
      `Fluff Factor: ${results.fluffFactor}`,
      `Zoomies Level: ${results.zoomiesLevel}`,
      `Regret Index: ${results.regretIndex}`,
      `Nap Proficiency: ${results.napProficiency}`,
      `Verdict: ${results.verdict}`,
    ].join('\n');

    let shared = false;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pawndora Verdict',
          text: shareText,
        });
        shared = true;
      } catch {
        setShareFeedback('Share cancelled or failed.');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      shared = true;
    }

    if (shared) {
      setShareFeedback('Verdict shared successfully! +5 coins earned!');
      if (status === 'authenticated' && session?.user?.email) {
        await addCoins(session.user.email, 5);
        const updatedProfile = await getUserProfile(session.user.email);
        if (updatedProfile) {
          setUserProfile(updatedProfile);
        }
      }
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
    context.fillText('Pawndora Verdict Card', 90, 860);
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
    link.download = 'pawndora-verdict-card.png';
    link.click();
    setDownloadFeedback('Card downloaded. Evidence secured.');
  };

  const openFilePicker = () => fileInputRef.current?.click();

  return {
    fileInputRef,
    selectedFile,
    previewUrl,
    uploadFeedback,
    overlayOpen,
    analysisMessage,
    results,
    revealed,
    chaosDisplay,
    shareFeedback,
    downloadFeedback,
    confettiVisible,
    purchaseFeedback,
    saveFeedback,
    handleFileChange,
    handleBuyExtraRating,
    handleSaveToPortfolio,
    handleUpload,
    handleShare,
    handleDownload,
    openFilePicker,
    resetVerdictState,
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
