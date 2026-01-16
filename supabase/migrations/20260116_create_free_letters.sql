-- Migration: Create free_letters table for MVP freemium funnel tracking
-- Date: 2026-01-16

CREATE TABLE IF NOT EXISTS free_letters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- User info
  email TEXT NOT NULL,

  -- Form data
  state_code TEXT NOT NULL,
  deposit_amount DECIMAL(10,2),
  move_out_date DATE,
  landlord_name TEXT,

  -- Calculated fields
  deadline DATE,
  deadline_passed BOOLEAN,

  -- Funnel tracking
  letter_generated_at TIMESTAMPTZ,
  upsell_clicked_at TIMESTAMPTZ,
  converted_order_id UUID REFERENCES orders(id),

  -- UTM tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_free_letters_email ON free_letters(email);
CREATE INDEX IF NOT EXISTS idx_free_letters_state ON free_letters(state_code);
CREATE INDEX IF NOT EXISTS idx_free_letters_created ON free_letters(created_at DESC);

-- Enable RLS
ALTER TABLE free_letters ENABLE ROW LEVEL SECURITY;

-- Policy: Allow inserts from authenticated and anon users (public form)
CREATE POLICY "Allow public inserts" ON free_letters
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow reads only for service role (admin dashboard)
CREATE POLICY "Allow service role reads" ON free_letters
  FOR SELECT
  USING (auth.role() = 'service_role');
