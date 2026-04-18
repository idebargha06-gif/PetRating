import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import type { UserProfile } from '@/types/user';
import { ensureUserProfile, getUserProfile } from '@/lib/userProfile';

export function useUserProfile() {
  const { data: session, status } = useSession();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      ensureUserProfile(session.user.email).then(setUserProfile);
    }
  }, [status, session]);

  const refreshProfile = async () => {
    if (session?.user?.email) {
      const freshProfile = await getUserProfile(session.user.email);
      if (freshProfile) {
        setUserProfile(freshProfile);
      }
    }
  };

  return { userProfile, status, session, refreshProfile, setUserProfile };
}
