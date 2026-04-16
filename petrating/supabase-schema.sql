-- Add is_saved column to existing pets table
ALTER TABLE pets ADD COLUMN IF NOT EXISTS is_saved BOOLEAN DEFAULT false;

-- Add verdict columns if they don't exist
ALTER TABLE pets ADD COLUMN IF NOT EXISTS chaos_energy INTEGER;
ALTER TABLE pets ADD COLUMN IF NOT EXISTS betrayal_capacity VARCHAR(20);
ALTER TABLE pets ADD COLUMN IF NOT EXISTS fluff_factor VARCHAR(20);
ALTER TABLE pets ADD COLUMN IF NOT EXISTS zoomies_level VARCHAR(20);
ALTER TABLE pets ADD COLUMN IF NOT EXISTS regret_index VARCHAR(20);
ALTER TABLE pets ADD COLUMN IF NOT EXISTS nap_proficiency VARCHAR(20);
ALTER TABLE pets ADD COLUMN IF NOT EXISTS verdict VARCHAR(255);

-- Increase photo_url column size for base64 images
ALTER TABLE pets ALTER COLUMN photo_url TYPE TEXT;

-- Add extra_ratings_available field to user_profiles
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS extra_ratings_available INTEGER DEFAULT 0;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_pets_user_id ON pets(user_id);
CREATE INDEX IF NOT EXISTS idx_pets_is_saved ON pets(is_saved);
CREATE INDEX IF NOT EXISTS idx_pets_chaos_energy ON pets(chaos_energy);

-- Enable Row Level Security
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

-- Disable RLS for pets temporarily for testing
ALTER TABLE pets DISABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own pets" ON pets;
DROP POLICY IF EXISTS "Users can insert their own pets" ON pets;
DROP POLICY IF EXISTS "Users can update their own pets" ON pets;

-- Allow users to see only their own pets
CREATE POLICY "Users can view their own pets"
  ON pets FOR SELECT
  USING (auth.uid()::text = user_id);

-- Allow users to insert their own pets
CREATE POLICY "Users can insert their own pets"
  ON pets FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Allow users to update their own pets
CREATE POLICY "Users can update their own pets"
  ON pets FOR UPDATE
  USING (auth.uid()::text = user_id);

-- User profiles table for gamification
CREATE TABLE IF NOT EXISTS user_profiles (
  user_id TEXT PRIMARY KEY,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  coins INTEGER DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_rating_date DATE,
  daily_ratings_count INTEGER DEFAULT 0,
  daily_ratings_date DATE,
  total_ratings INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_level ON user_profiles(level);
CREATE INDEX IF NOT EXISTS idx_user_profiles_coins ON user_profiles(coins);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Disable RLS for user_profiles temporarily for testing
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;

-- Allow users to see only their own profile
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid()::text = user_id);

-- Allow authenticated users to insert their own profile
CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid()::text = user_id);

-- Comments table for pet verdicts
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_comments_pet_id ON comments(pet_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- Enable Row Level Security
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Disable RLS for comments temporarily for testing
ALTER TABLE comments DISABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view comments" ON comments;
DROP POLICY IF EXISTS "Users can insert their own comments" ON comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON comments;
DROP POLICY IF EXISTS "Users can delete their own comments" ON comments;

-- Allow anyone to view comments
CREATE POLICY "Anyone can view comments" ON comments
  FOR SELECT
  USING (true);

-- Allow authenticated users to insert comments
CREATE POLICY "Users can insert their own comments" ON comments
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Allow users to update their own comments
CREATE POLICY "Users can update their own comments" ON comments
  FOR UPDATE
  USING (auth.uid()::text = user_id);

-- Allow users to delete their own comments
CREATE POLICY "Users can delete their own comments" ON comments
  FOR DELETE
  USING (auth.uid()::text = user_id);

-- Reactions table for pet verdicts
CREATE TABLE IF NOT EXISTS reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  emoji TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(pet_id, user_id, emoji)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_reactions_pet_id ON reactions(pet_id);
CREATE INDEX IF NOT EXISTS idx_reactions_user_id ON reactions(user_id);

-- Enable Row Level Security
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;

-- Disable RLS for reactions temporarily for testing
ALTER TABLE reactions DISABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view reactions" ON reactions;
DROP POLICY IF EXISTS "Users can insert their own reactions" ON reactions;
DROP POLICY IF EXISTS "Users can delete their own reactions" ON reactions;

-- Allow anyone to view reactions
CREATE POLICY "Anyone can view reactions" ON reactions
  FOR SELECT
  USING (true);

-- Allow authenticated users to insert reactions
CREATE POLICY "Users can insert their own reactions" ON reactions
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Allow users to delete their own reactions
CREATE POLICY "Users can delete their own reactions" ON reactions
  FOR DELETE
  USING (auth.uid()::text = user_id);
