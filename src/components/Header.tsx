'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import type { UserProfile } from '@/types/user';
import { getJudgeTitle } from '@/types/user';

interface HeaderProps {
  userProfile: UserProfile | null;
}

export default function Header({ userProfile }: HeaderProps) {
  const { data: session, status } = useSession();
  const avatarInitial = (session?.user?.name?.[0] ?? 'N').toUpperCase();

  const handleAuthAction = async () => {
    if (status === 'loading') return;
    if (status === 'authenticated') {
      await signOut({ callbackUrl: '/' });
      return;
    }
    await signIn('google', { callbackUrl: '/' });
  };

  return (
    <nav className="mb-6 flex flex-col gap-4 rounded-full border border-black/10 bg-white/70 px-5 py-4 shadow-[0_12px_40px_rgba(66,31,0,0.08)] backdrop-blur md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight">Pawndora</span>
          <span className="gavel inline-flex text-xl transition-transform group-hover:scale-110">🐾</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/feed" className="text-sm font-bold text-stone-900 hover:text-red-700 transition-colors">Feed</Link>
          <Link href="/portfolio" className="text-sm font-bold text-stone-900 hover:text-red-700 transition-colors">Portfolio</Link>
          <Link href="/hall-of-shame" className="text-sm font-bold text-stone-900 hover:text-red-700 transition-colors">Hall of Shame</Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-amber-300 text-sm font-black text-white shadow-[0_8px_20px_rgba(244,114,182,0.35)]">{avatarInitial}</div>
        {status === 'authenticated' && userProfile ? (
          <>
            <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-100 to-rose-100 px-4 py-2">
              <div className="text-center">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-stone-600">Level {userProfile.level}</p>
                <p className="text-sm font-black text-stone-950">{getJudgeTitle(userProfile.level)}</p>
              </div>
            </div>
            <div className="rounded-full bg-stone-950 px-3 py-2 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-200">XP</p>
              <p className="text-sm font-black text-amber-50">{userProfile.xp}</p>
            </div>
            <div className="rounded-full bg-gradient-to-br from-amber-400 to-amber-500 px-3 py-2 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-900">Coins</p>
              <p className="text-sm font-black text-amber-950">{userProfile.coins}</p>
            </div>
            <div className="rounded-full bg-gradient-to-br from-rose-400 to-red-500 px-3 py-2 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white">Streak</p>
              <p className="text-sm font-black text-white">{userProfile.current_streak}🔥</p>
            </div>
            <div className="rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 px-3 py-2 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white">Extra</p>
              <p className="text-sm font-black text-white">+{userProfile.extra_ratings_available || 0}</p>
            </div>
            {userProfile.badges.length > 0 && (
              <div className="flex items-center gap-1 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 px-3 py-2">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-purple-900">Badges:</p>
                <div className="flex gap-1">
                  {userProfile.badges.slice(0, 3).map((badge) => (
                    <span key={badge} className="text-lg" title={badge}>
                      {badge === 'Certified Judge' ? '⚖️' : 
                       badge === 'Chaos Hunter' ? '🌪️' :
                       badge === 'Betrayal Detective' ? '🕵️' :
                       badge === 'Nap Expert' ? '😴' :
                       badge === 'Fluff Lord' ? '☁️' :
                       badge === 'Zoomies Master' ? '⚡' :
                       badge === 'Regret-Free' ? '😌' :
                       badge === 'Streak Master' ? '🔥' :
                       badge === 'Streak Legend' ? '👑' :
                       badge === 'Veteran Judge' ? '🎖️' : '🏅'}
                    </span>
                  ))}
                  {userProfile.badges.length > 3 && <span className="text-xs font-black text-purple-900">+{userProfile.badges.length - 3}</span>}
                </div>
              </div>
            )}
          </>
        ) : (
          <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-950">
            {status === 'authenticated' ? `Signed in as ${session.user?.name ?? 'Mystery Beast'}` : 'No human identified yet'}
          </span>
        )}
        <button type="button" onClick={handleAuthAction} className="rounded-full border border-stone-900 bg-stone-950 px-5 py-2.5 text-sm font-black text-amber-50 button-pill">
          {status === 'authenticated' ? 'Logout' : 'Sign In'}
        </button>
      </div>
    </nav>
  );
}
