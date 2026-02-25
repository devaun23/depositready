-- Shareable quiz/diagnosis results for viral distribution
CREATE TABLE shared_results (
  id TEXT PRIMARY KEY DEFAULT encode(gen_random_bytes(6), 'hex'),
  state_code TEXT NOT NULL,
  state_name TEXT NOT NULL,
  deposit_amount NUMERIC NOT NULL,
  potential_recovery NUMERIC NOT NULL,
  days_past_deadline INTEGER,
  landlord_in_violation BOOLEAN DEFAULT FALSE,
  case_strength TEXT,
  damages_multiplier NUMERIC DEFAULT 1,
  view_count INTEGER DEFAULT 0,
  creator_code TEXT,
  utm_source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by creator (for payout tracking)
CREATE INDEX idx_shared_results_creator ON shared_results(creator_code) WHERE creator_code IS NOT NULL;
