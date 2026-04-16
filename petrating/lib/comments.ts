import { supabase } from './supabase';

export type Comment = {
  id: string;
  pet_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type Reaction = {
  id: string;
  pet_id: string;
  user_id: string;
  emoji: string;
  created_at: string;
};

export async function addComment(petId: string, userId: string, content: string): Promise<Comment | null> {
  const { data, error } = await supabase
    .from('comments')
    .insert({
      pet_id: petId,
      user_id: userId,
      content,
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding comment:', error);
    return null;
  }

  return data;
}

export async function getCommentsByPetId(petId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('pet_id', petId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }

  return data || [];
}

export async function deleteComment(commentId: string): Promise<boolean> {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);

  if (error) {
    console.error('Error deleting comment:', error);
    return false;
  }

  return true;
}

export async function addReaction(petId: string, userId: string, emoji: string): Promise<Reaction | null> {
  const { data, error } = await supabase
    .from('reactions')
    .insert({
      pet_id: petId,
      user_id: userId,
      emoji,
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding reaction:', error);
    return null;
  }

  return data;
}

export async function removeReaction(petId: string, userId: string, emoji: string): Promise<boolean> {
  const { error } = await supabase
    .from('reactions')
    .delete()
    .eq('pet_id', petId)
    .eq('user_id', userId)
    .eq('emoji', emoji);

  if (error) {
    console.error('Error removing reaction:', error);
    return false;
  }

  return true;
}

export async function getReactionsByPetId(petId: string): Promise<Reaction[]> {
  const { data, error } = await supabase
    .from('reactions')
    .select('*')
    .eq('pet_id', petId);

  if (error) {
    console.error('Error fetching reactions:', error);
    return [];
  }

  return data || [];
}

export async function getUserReaction(petId: string, userId: string): Promise<Reaction | null> {
  const { data, error } = await supabase
    .from('reactions')
    .select('*')
    .eq('pet_id', petId)
    .eq('user_id', userId)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export function getReactionCounts(reactions: Reaction[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const reaction of reactions) {
    counts[reaction.emoji] = (counts[reaction.emoji] || 0) + 1;
  }
  return counts;
}
