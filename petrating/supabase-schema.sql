-- Pets table for storing user pets
CREATE TABLE IF NOT EXISTS pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  name VARCHAR(255) NOT NULL,
  breed VARCHAR(255),
  type VARCHAR(50),
  photo_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_pets_user_id ON pets(user_id);

-- Enable Row Level Security
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

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
