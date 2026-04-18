import { useEffect, useState } from 'react';

const tournamentPets = [
  { name: 'Judge Cheddar', emoji: 'CAT', bg: 'from-orange-200 via-amber-100 to-white' },
  { name: 'Bark Wahlberg', emoji: 'DOG', bg: 'from-yellow-200 via-rose-100 to-white' },
];

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

export default function Tournament() {
  const [tournamentCountdown, setTournamentCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTournamentCountdown(getTimeToNextTournament());
    const timer = window.setInterval(() => {
      setTournamentCountdown(getTimeToNextTournament());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
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
  );
}
