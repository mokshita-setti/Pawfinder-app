-- ============================================================
-- PawFinder — Row Level Security (RLS)
-- Run this in Supabase → SQL Editor
-- ============================================================

-- 1. Enable RLS on all tables
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PETS table policies
-- ============================================================

-- Anyone can read any pet (needed for QR scan public page)
CREATE POLICY "pets_public_read"
  ON pets FOR SELECT
  USING (true);

-- Only the owner can insert their own pet
CREATE POLICY "pets_owner_insert"
  ON pets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Only the owner can update their own pet
CREATE POLICY "pets_owner_update"
  ON pets FOR UPDATE
  USING (auth.uid() = user_id);

-- Only the owner can delete their own pet
CREATE POLICY "pets_owner_delete"
  ON pets FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- REPORTS table policies
-- ============================================================

-- Anyone can insert a report (finder submits without login)
CREATE POLICY "reports_public_insert"
  ON reports FOR INSERT
  WITH CHECK (true);

-- Only the pet owner can read reports about their pets
CREATE POLICY "reports_owner_read"
  ON reports FOR SELECT
  USING (
    pet_id IN (
      SELECT pet_id FROM pets WHERE user_id = auth.uid()
    )
  );

-- Only the pet owner can delete reports about their pets
CREATE POLICY "reports_owner_delete"
  ON reports FOR DELETE
  USING (
    pet_id IN (
      SELECT pet_id FROM pets WHERE user_id = auth.uid()
    )
  );
