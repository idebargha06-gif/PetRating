import { supabase } from './supabase';
import type { UserProfile } from '@/types/user';

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle(); // Use maybeSingle to handle 0 rows gracefully

    if (error) {
      console.error('Error fetching user profile:', error.message, error.details, error.hint, error.code);
      return null;
    }

    return data;
  } catch (e) {
    console.error('Unexpected error fetching user profile:', e);
    return null;
  }
}

export async function createUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert({
        user_id: userId,
        xp: 0,
        level: 1,
        coins: 0,
        badges: [],
        current_streak: 0,
        longest_streak: 0,
        last_rating_date: null,
        daily_ratings_count: 0,
        daily_ratings_date: null,
        extra_ratings_available: 0,
        total_ratings: 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user profile:', error.message, error.details, error.hint, error.code);
      return null;
    }

    return data;
  } catch (e) {
    console.error('Unexpected error creating user profile:', e);
    return null;
  }
}

export async function ensureUserProfile(userId: string): Promise<UserProfile | null> {
  let profile = await getUserProfile(userId);
  
  if (!profile) {
    profile = await createUserProfile(userId);
  }
  
  return profile;
}

export async function addXP(userId: string, xpToAdd: number): Promise<UserProfile | null> {
  const profile = await getUserProfile(userId);
  if (!profile) return null;

  const newXP = profile.xp + xpToAdd;
  const newLevel = calculateLevel(newXP);

  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      xp: newXP,
      level: newLevel,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error adding XP:', error);
    return null;
  }

  return data;
}

export async function addCoins(userId: string, coinsToAdd: number): Promise<UserProfile | null> {
  const profile = await getUserProfile(userId);
  if (!profile) return null;

  const newCoins = Math.max(profile.coins + coinsToAdd, 0);

  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      coins: newCoins,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error adding coins:', error);
    return null;
  }

  return data;
}

export async function updateUserLevel(userId: string, newLevel: number): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      level: newLevel,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating level:', error);
    return null;
  }

  return data;
}

export async function addBadge(userId: string, badge: string): Promise<UserProfile | null> {
  const profile = await getUserProfile(userId);
  if (!profile) return null;

  if (profile.badges.includes(badge)) {
    return profile; // Badge already exists
  }

  const newBadges = [...profile.badges, badge];

  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      badges: newBadges,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error adding badge:', error);
    return null;
  }

  return data;
}

export async function updateStreak(userId: string): Promise<UserProfile | null> {
  const profile = await getUserProfile(userId);
  if (!profile) return null;

  const today = new Date().toISOString().split('T')[0];
  const lastRatingDate = profile.last_rating_date ? new Date(profile.last_rating_date).toISOString().split('T')[0] : null;

  let newStreak = 0;
  let newLongestStreak = profile.longest_streak;
  let newDailyCount = 0;
  let newDailyDate = today;
  let coinsToAdd = 0;

  if (lastRatingDate === today) {
    // Already rated today, streak stays the same, increment daily count
    newStreak = profile.current_streak;
    newDailyCount = (profile.daily_ratings_count || 0) + 1;
    newDailyDate = profile.daily_ratings_date || today;
  } else {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    if (lastRatingDate === yesterday) {
      // Rated yesterday, increment streak
      newStreak = profile.current_streak + 1;
      // Daily streak bonus coins
      if (newStreak % 7 === 0) {
        coinsToAdd += 50; // Bonus every 7 days
      }
    } else {
      // Streak broken or first rating
      newStreak = 1;
    }
    // New day, reset daily count and extra ratings
    newDailyCount = 1;
    newDailyDate = today;
  }

  if (newStreak > newLongestStreak) {
    newLongestStreak = newStreak;
  }

  const newTotalRatings = profile.total_ratings + 1;

  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      current_streak: newStreak,
      longest_streak: newLongestStreak,
      last_rating_date: today,
      daily_ratings_count: newDailyCount,
      daily_ratings_date: newDailyDate,
      extra_ratings_available: lastRatingDate === today && (profile.extra_ratings_available || 0) > 0 ? (profile.extra_ratings_available || 0) - 1 : 0,
      total_ratings: newTotalRatings,
      coins: profile.coins + coinsToAdd,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating streak:', error);
    return null;
  }

  return data;
}

export function canRateToday(profile: UserProfile | null): boolean {
  if (!profile) return false;
  
  const today = new Date().toISOString().split('T')[0];
  const dailyDate = profile.daily_ratings_date ? new Date(profile.daily_ratings_date).toISOString().split('T')[0] : null;
  
  // If it's a new day, allow rating
  if (dailyDate !== today) {
    return true;
  }
  
  // If same day, check if under daily limit (3 free + extra ratings)
  const dailyLimit = 3 + (profile.extra_ratings_available || 0);
  return (profile.daily_ratings_count || 0) < dailyLimit;
}

export function getDailyRatingsRemaining(profile: UserProfile | null): number {
  if (!profile) return 3;
  
  const today = new Date().toISOString().split('T')[0];
  const dailyDate = profile.daily_ratings_date ? new Date(profile.daily_ratings_date).toISOString().split('T')[0] : null;
  
  // If it's a new day, all 3 ratings available
  if (dailyDate !== today) {
    return 3;
  }
  
  // Calculate remaining (3 free + extra - used)
  const dailyLimit = 3 + (profile.extra_ratings_available || 0);
  return Math.max(0, dailyLimit - (profile.daily_ratings_count || 0));
}

function calculateLevel(xp: number): number {
  // XP requirements for each level
  const xpRequirements = [
    0,      // Level 1
    100,    // Level 2
    250,    // Level 3
    450,    // Level 4
    700,    // Level 5
    1000,   // Level 6
    1350,   // Level 7
    1750,   // Level 8
    2200,   // Level 9
    2700,   // Level 10
    3250,   // Level 11
    3850,   // Level 12
    4500,   // Level 13
    5200,   // Level 14
    5950,   // Level 15
    6750,   // Level 16
    7600,   // Level 17
    8500,   // Level 18
    9450,   // Level 19
    10450,  // Level 20
    11500,  // Level 21
    12600,  // Level 22
    13750,  // Level 23
    14950,  // Level 24
    16200,  // Level 25
    17500,  // Level 26
    18850,  // Level 27
    20250,  // Level 28
    21700,  // Level 29
    23200,  // Level 30
    24750,  // Level 31
    26350,  // Level 32
    28000,  // Level 33
    29700,  // Level 34
    31450,  // Level 35
    33250,  // Level 36
    35100,  // Level 37
    37000,  // Level 38
    38950,  // Level 39
    40950,  // Level 40
    43000,  // Level 41
    45100,  // Level 42
    47250,  // Level 43
    49450,  // Level 44
    51700,  // Level 45
    54000,  // Level 46
    56350,  // Level 47
    58750,  // Level 48
    61200,  // Level 49
    63700,  // Level 50
  ];

  let level = 1;
  for (let i = 1; i < xpRequirements.length; i++) {
    if (xp >= xpRequirements[i]) {
      level = i + 1;
    } else {
      break;
    }
  }

  return level;
}

export function getXPToNextLevel(currentXP: number): number {
  const currentLevel = calculateLevel(currentXP);
  const xpRequirements = [
    0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700,
    3250, 3850, 4500, 5200, 5950, 6750, 7600, 8500, 9450, 10450,
    11500, 12600, 13750, 14950, 16200, 17500, 18850, 20250, 21700, 23200,
    24750, 26350, 28000, 29700, 31450, 33250, 35100, 37000, 38950, 40950,
    43000, 45100, 47250, 49450, 51700, 54000, 56350, 58750, 61200, 63700,
  ];

  if (currentLevel >= 50) return 0; // Max level

  const nextLevelXP = xpRequirements[currentLevel] || 0;
  return nextLevelXP - currentXP;
}

export async function spendCoins(userId: string, coinsToSpend: number): Promise<{ success: boolean; profile: UserProfile | null; message: string }> {
  const profile = await getUserProfile(userId);
  if (!profile) {
    return { success: false, profile: null, message: 'Profile not found' };
  }

  if (profile.coins < coinsToSpend) {
    return { success: false, profile, message: `Insufficient coins. Need ${coinsToSpend}, have ${profile.coins}` };
  }

  const updatedProfile = await addCoins(userId, -coinsToSpend);
  if (updatedProfile) {
    return { success: true, profile: updatedProfile, message: 'Purchase successful!' };
  }

  return { success: false, profile, message: 'Failed to process transaction' };
}

export async function buyExtraRating(userId: string): Promise<{ success: boolean; profile: UserProfile | null; message: string }> {
  const result = await spendCoins(userId, 50);
  if (!result.success) {
    return result;
  }
  
  // Increment extra_ratings_available count
  const profile = await getUserProfile(userId);
  if (!profile) {
    return { success: false, profile: null, message: 'Profile not found' };
  }
  
  const today = new Date().toISOString().split('T')[0];
  const newExtraCount = (profile.extra_ratings_available || 0) + 1;
  const updatedProfile = await supabase
    .from('user_profiles')
    .update({
      extra_ratings_available: newExtraCount,
      daily_ratings_date: today,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .select()
    .single();
  
  if (updatedProfile.error) {
    console.error('Error updating extra ratings count:', updatedProfile.error);
    return { success: false, profile: result.profile, message: 'Failed to update rating count' };
  }
  
  return { success: true, profile: updatedProfile.data || result.profile, message: 'Extra rating purchased! +1 rating available' };
}

export async function checkAndAwardAchievements(
  userId: string,
  chaosEnergy?: number,
  betrayalCapacity?: string,
  fluffFactor?: string,
  zoomiesLevel?: string,
  regretIndex?: string,
  napProficiency?: string,
): Promise<UserProfile | null> {
  const profile = await getUserProfile(userId);
  if (!profile) return null;

  const newBadges: string[] = [];
  let coinsToAdd = 0;
  
  // Certified Judge: 10 total ratings
  if (profile.total_ratings >= 10 && !profile.badges.includes('Certified Judge')) {
    newBadges.push('Certified Judge');
    coinsToAdd += 100;
  }
  
  // Veteran Judge: 100 total ratings
  if (profile.total_ratings >= 100 && !profile.badges.includes('Veteran Judge')) {
    newBadges.push('Veteran Judge');
    coinsToAdd += 500;
  }
  
  // Chaos Hunter: 90%+ chaos energy
  if (chaosEnergy && chaosEnergy >= 90 && !profile.badges.includes('Chaos Hunter')) {
    newBadges.push('Chaos Hunter');
    coinsToAdd += 150;
  }
  
  // Betrayal Detective: High betrayal capacity
  if (betrayalCapacity === 'HIGH' || betrayalCapacity === 'EXTREME') {
    if (!profile.badges.includes('Betrayal Detective')) {
      newBadges.push('Betrayal Detective');
      coinsToAdd += 100;
    }
  }
  
  // Nap Expert: Hall of Famer or Interdimensional nap proficiency
  if (napProficiency === 'Hall of Famer' || napProficiency === 'Interdimensional') {
    if (!profile.badges.includes('Nap Expert')) {
      newBadges.push('Nap Expert');
      coinsToAdd += 150;
    }
  }
  
  // Fluff Lord: Illegal fluff factor
  if (fluffFactor === 'ILLEGAL' && !profile.badges.includes('Fluff Lord')) {
    newBadges.push('Fluff Lord');
    coinsToAdd += 200;
  }
  
  // Zoomies Master: Uninsurable zoomies
  if (zoomiesLevel === 'Uninsurable' && !profile.badges.includes('Zoomies Master')) {
    newBadges.push('Zoomies Master');
    coinsToAdd += 200;
  }
  
  // Regret-Free: None whatsoever regret index
  if (regretIndex === 'None whatsoever' && !profile.badges.includes('Regret-Free')) {
    newBadges.push('Regret-Free');
    coinsToAdd += 100;
  }
  
  // Streak Master: 7-day streak
  if (profile.current_streak >= 7 && !profile.badges.includes('Streak Master')) {
    newBadges.push('Streak Master');
    coinsToAdd += 150;
  }
  
  // Streak Legend: 30-day streak
  if (profile.current_streak >= 30 && !profile.badges.includes('Streak Legend')) {
    newBadges.push('Streak Legend');
    coinsToAdd += 500;
  }
  
  // Award new badges
  let updatedProfile: UserProfile | null = profile;
  for (const badge of newBadges) {
    const result = await addBadge(userId, badge);
    if (!result) break;
    updatedProfile = result;
  }
  
  // Add coins for achievements
  if (coinsToAdd > 0 && updatedProfile) {
    updatedProfile = await addCoins(userId, coinsToAdd);
  }
  
  return updatedProfile;
}

export async function getLeaderboardByTotalRatings(limit: number = 10): Promise<UserProfile[]> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('total_ratings', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching leaderboard by total ratings:', error);
    return [];
  }

  return data || [];
}

export async function getLeaderboardByLevel(limit: number = 10): Promise<UserProfile[]> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('level', { ascending: false })
    .order('xp', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching leaderboard by level:', error);
    return [];
  }

  return data || [];
}

export async function getLeaderboardByCoins(limit: number = 10): Promise<UserProfile[]> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('coins', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching leaderboard by coins:', error);
    return [];
  }

  return data || [];
}

export async function getLeaderboardByStreak(limit: number = 10): Promise<UserProfile[]> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('longest_streak', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching leaderboard by streak:', error);
    return [];
  }

  return data || [];
}
