import type { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { UserProfile } from '@/types/user';

interface MainLayoutProps {
  children: ReactNode;
  userProfile: UserProfile | null;
}

export default function MainLayout({ children, userProfile }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen px-4 py-6 text-stone-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob blob-one" />
        <div className="blob blob-two" />
        <div className="blob blob-three" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <Header userProfile={userProfile} />
        {children}
        <Footer />
      </div>

      <style jsx>{`
        .blob { position: absolute; border-radius: 9999px; filter: blur(38px); opacity: 0.45; animation: drift 18s ease-in-out infinite alternate; }
        .blob-one { top: 8%; left: 4%; height: 280px; width: 280px; background: rgba(255, 171, 145, 0.8); }
        .blob-two { top: 18%; right: 12%; height: 240px; width: 240px; background: rgba(221, 191, 255, 0.7); animation-duration: 22s; }
        .blob-three { bottom: 18%; left: 34%; height: 220px; width: 220px; background: rgba(255, 225, 111, 0.65); animation-duration: 25s; }
        @keyframes drift { from { transform: translate3d(0, 0, 0) scale(1); } to { transform: translate3d(30px, -18px, 0) scale(1.08); } }
      `}</style>
    </div>
  );
}
