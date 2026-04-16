import { supabase } from './supabase';

export type Pet = {
  id: string;
  user_id: string;
  name: string;
  breed: string | null;
  type: string | null;
  photo_url: string | null;
  chaos_energy: number | null;
  betrayal_capacity: string | null;
  fluff_factor: string | null;
  zoomies_level: string | null;
  regret_index: string | null;
  nap_proficiency: string | null;
  verdict: string | null;
  is_saved: boolean;
  created_at: string;
  updated_at: string;
};

export async function savePetToPortfolio(
  userId: string,
  petData: {
    name: string;
    breed?: string;
    type?: string;
    photo_url: string;
    chaos_energy: number;
    betrayal_capacity: string;
    fluff_factor: string;
    zoomies_level: string;
    regret_index: string;
    nap_proficiency: string;
    verdict: string;
  }
): Promise<Pet | null> {
  try {
    const { data, error } = await supabase
      .from('pets')
      .insert({
        user_id: userId,
        name: petData.name,
        breed: petData.breed || null,
        type: petData.type || null,
        photo_url: petData.photo_url,
        chaos_energy: petData.chaos_energy,
        betrayal_capacity: petData.betrayal_capacity,
        fluff_factor: petData.fluff_factor,
        zoomies_level: petData.zoomies_level,
        regret_index: petData.regret_index,
        nap_proficiency: petData.nap_proficiency,
        verdict: petData.verdict,
        is_saved: true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving pet to portfolio:', error.message, error.details, error.hint, error.code);
      return null;
    }

    return data;
  } catch (e) {
    console.error('Unexpected error saving pet to portfolio:', e);
    return null;
  }
}

export async function getUserPortfolio(userId: string): Promise<Pet[]> {
  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('user_id', userId)
    .eq('is_saved', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user portfolio:', error);
    return [];
  }

  return data || [];
}

export async function removePetFromPortfolio(petId: string): Promise<boolean> {
  const { error } = await supabase
    .from('pets')
    .update({ is_saved: false })
    .eq('id', petId);

  if (error) {
    console.error('Error removing pet from portfolio:', error);
    return false;
  }

  return true;
}

export async function getPortfolioRarityScore(pets: Pet[]): Promise<number> {
  // Calculate rarity score based on verdicts and stats
  let score = 0;
  
  for (const pet of pets) {
    // Base score for each pet
    score += 10;
    
    // Bonus for high chaos energy
    if (pet.chaos_energy && pet.chaos_energy >= 90) score += 20;
    else if (pet.chaos_energy && pet.chaos_energy >= 70) score += 10;
    
    // Bonus for extreme betrayal
    if (pet.betrayal_capacity === 'EXTREME') score += 15;
    else if (pet.betrayal_capacity === 'HIGH') score += 10;
    
    // Bonus for illegal fluff
    if (pet.fluff_factor === 'ILLEGAL') score += 15;
    
    // Bonus for uninsurable zoomies
    if (pet.zoomies_level === 'Uninsurable') score += 15;
    
    // Bonus for interdimensional nap
    if (pet.nap_proficiency === 'Interdimensional') score += 15;
    else if (pet.nap_proficiency === 'Hall of Famer') score += 10;
  }
  
  return score;
}
