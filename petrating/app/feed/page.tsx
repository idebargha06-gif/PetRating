'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getCommentsByPetId, addComment, getReactionsByPetId, addReaction, removeReaction, getReactionCounts, type Comment, type Reaction } from '@/lib/comments';
import { supabase } from '@/lib/supabase';
import { Providers } from '@/app/providers';

type Pet = {
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
  created_at: string;
};

function FeedPageContent() {
  const { data: session, status } = useSession();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [reactions, setReactions] = useState<Record<string, Reaction[]>>({});
  const [newComment, setNewComment] = useState<Record<string, string>>({});
  const [reactionCounts, setReactionCounts] = useState<Record<string, Record<string, number>>>({});

  async function loadFeed() {
    setLoading(true);
    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .not('verdict', 'is', null)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error loading feed:', error.message, error.details);
    }

    if (data) {
      console.log('Loaded pets:', data.length);
      setPets(data);
      
      // Load comments and reactions for each pet
      const commentsData: Record<string, Comment[]> = {};
      const reactionsData: Record<string, Reaction[]> = {};
      const countsData: Record<string, Record<string, number>> = {};
      
      for (const pet of data) {
        const [petComments, petReactions] = await Promise.all([
          getCommentsByPetId(pet.id),
          getReactionsByPetId(pet.id),
        ]);
        commentsData[pet.id] = petComments;
        reactionsData[pet.id] = petReactions;
        countsData[pet.id] = getReactionCounts(petReactions);
      }
      
      setComments(commentsData);
      setReactions(reactionsData);
      setReactionCounts(countsData);
    }
    setLoading(false);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadFeed();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const handleAddComment = async (petId: string) => {
    if (!newComment[petId] || !session?.user?.email) return;
    
    const comment = await addComment(petId, session.user.email, newComment[petId]);
    if (comment) {
      setComments(prev => ({
        ...prev,
        [petId]: [comment, ...(prev[petId] || [])]
      }));
      setNewComment(prev => ({ ...prev, [petId]: '' }));
    }
  };

  const handleReaction = async (petId: string, emoji: string) => {
    if (!session?.user?.email) return;
    
    const userEmail = session.user.email;
    const existingReaction = reactions[petId]?.find(
      r => r.user_id === userEmail && r.emoji === emoji
    );
    
    if (existingReaction) {
      const success = await removeReaction(petId, userEmail, emoji);
      if (success) {
        setReactions(prev => ({
          ...prev,
          [petId]: prev[petId]?.filter(r => r.id !== existingReaction.id) || []
        }));
        setReactionCounts(prev => ({
          ...prev,
          [petId]: {
            ...prev[petId],
            [emoji]: (prev[petId]?.[emoji] || 1) - 1
          }
        }));
      }
    } else {
      const reaction = await addReaction(petId, userEmail, emoji);
      if (reaction) {
        setReactions(prev => ({
          ...prev,
          [petId]: [...(prev[petId] || []), reaction]
        }));
        setReactionCounts(prev => ({
          ...prev,
          [petId]: {
            ...prev[petId],
            [emoji]: (prev[petId]?.[emoji] || 0) + 1
          }
        }));
      }
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-600">Loading feed...</p>
      </div>
    );
  }

  return (
    <Providers>
      <div className="min-h-screen bg-stone-50 flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-stone-200 p-6 hidden lg:block">
        <Link href="/" className="block mb-8">
          <h1 className="text-2xl font-black text-stone-900">PetRating</h1>
        </Link>
        
        <nav className="space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-100 transition-colors">
            <span>🏠</span>
            <span className="font-bold text-stone-900">Home</span>
          </Link>
          <Link href="/feed" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-stone-100">
            <span>📰</span>
            <span className="font-bold text-stone-900">Feed</span>
          </Link>
          <Link href="/portfolio" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-100 transition-colors">
            <span>📁</span>
            <span className="font-bold text-stone-900">Portfolio</span>
          </Link>
          <Link href="/hall-of-shame" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-100 transition-colors">
            <span>🏆</span>
            <span className="font-bold text-stone-900">Hall of Shame</span>
          </Link>
        </nav>

        {status === 'authenticated' && session.user && (
          <div className="mt-8 pt-6 border-t border-stone-200">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-amber-300 flex items-center justify-center text-white font-bold">
                {session.user.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <p className="font-bold text-stone-900 text-sm">{session.user.name || 'User'}</p>
                <p className="text-xs text-stone-600">{session.user.email}</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Feed */}
      <main className="flex-1 max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          {pets.map((pet) => (
            <article key={pet.id} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-amber-300 flex items-center justify-center text-white font-bold">
                  {pet.user_id[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="font-bold text-stone-900">Pet Judge</p>
                  <p className="text-xs text-stone-500">{new Date(pet.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Pet Image */}
              {pet.photo_url ? (
                <div className="relative aspect-square bg-stone-100">
                  <img
                    src={pet.photo_url}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative aspect-square bg-stone-100 flex items-center justify-center">
                  <span className="text-6xl">🐾</span>
                </div>
              )}

              {/* Actions */}
              <div className="p-4">
                <div className="flex gap-4 mb-3">
                  <button
                    onClick={() => handleReaction(pet.id, '❤️')}
                    className={`text-2xl hover:scale-110 transition-transform ${reactions[pet.id]?.find(r => r.user_id === session?.user?.email && r.emoji === '❤️') ? 'opacity-100' : 'opacity-50'}`}
                  >
                    ❤️
                  </button>
                  <button
                    onClick={() => handleReaction(pet.id, '😂')}
                    className={`text-2xl hover:scale-110 transition-transform ${reactions[pet.id]?.find(r => r.user_id === session?.user?.email && r.emoji === '😂') ? 'opacity-100' : 'opacity-50'}`}
                  >
                    😂
                  </button>
                  <button
                    onClick={() => handleReaction(pet.id, '😮')}
                    className={`text-2xl hover:scale-110 transition-transform ${reactions[pet.id]?.find(r => r.user_id === session?.user?.email && r.emoji === '😮') ? 'opacity-100' : 'opacity-50'}`}
                  >
                    😮
                  </button>
                  <button
                    onClick={() => handleReaction(pet.id, '🔥')}
                    className={`text-2xl hover:scale-110 transition-transform ${reactions[pet.id]?.find(r => r.user_id === session?.user?.email && r.emoji === '🔥') ? 'opacity-100' : 'opacity-50'}`}
                  >
                    🔥
                  </button>
                </div>

                {/* Reaction Counts */}
                {reactionCounts[pet.id] && Object.keys(reactionCounts[pet.id]).length > 0 && (
                  <p className="text-sm text-stone-600 mb-2">
                    {Object.entries(reactionCounts[pet.id]).map(([emoji, count]) => `${emoji} ${count}`).join(' • ')}
                  </p>
                )}

                {/* Pet Info */}
                <div className="mb-3">
                  <p className="font-bold text-stone-900 mb-1">{pet.name}</p>
                  <p className="text-sm text-stone-700">
                    <span className="font-bold">Chaos Energy:</span> {pet.chaos_energy}% • 
                    <span className="font-bold"> Verdict:</span> {pet.verdict}
                  </p>
                </div>

                {/* Comments */}
                {comments[pet.id] && comments[pet.id].length > 0 && (
                  <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                    {comments[pet.id].slice(0, 3).map((comment) => (
                      <div key={comment.id} className="text-sm">
                        <span className="font-bold text-stone-900">{comment.user_id[0]?.toUpperCase() || 'U'} </span>
                        <span className="text-stone-700">{comment.content}</span>
                      </div>
                    ))}
                    {comments[pet.id].length > 3 && (
                      <button className="text-sm text-stone-500">View all {comments[pet.id].length} comments</button>
                    )}
                  </div>
                )}

                {/* Add Comment */}
                {status === 'authenticated' && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment[pet.id] || ''}
                      onChange={(e) => setNewComment(prev => ({ ...prev, [pet.id]: e.target.value }))}
                      className="flex-1 px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-none focus:border-stone-500"
                    />
                    <button
                      onClick={() => handleAddComment(pet.id)}
                      disabled={!newComment[pet.id]}
                      className="px-4 py-2 text-sm font-bold text-blue-600 disabled:text-stone-400"
                    >
                      Post
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Right Sidebar (hidden on mobile) */}
      <aside className="w-80 p-6 hidden xl:block">
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-4">
          <h3 className="font-bold text-stone-900 mb-4">Recent Activity</h3>
          <p className="text-sm text-stone-600">More features coming soon...</p>
        </div>
      </aside>
      </div>
    </Providers>
  );
}

export default function FeedPage() {
  return (
    <Providers>
      <FeedPageContent />
    </Providers>
  );
}
