-- B2B credit packs for bulk letter generation
CREATE TABLE b2b_credits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email TEXT NOT NULL,
  company_name TEXT,
  customer_type TEXT,  -- 'property_mgmt', 'attorney', 'advocacy', 'other'
  stripe_session_id TEXT,
  package_size INT NOT NULL,        -- 5, 10, 25
  price_paid INT NOT NULL,          -- cents
  credits_remaining INT NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  access_token TEXT UNIQUE NOT NULL  -- for dashboard access (acts as auth)
);

-- Usage tracking for each letter generated from a credit pack
CREATE TABLE b2b_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  credit_pack_id UUID REFERENCES b2b_credits(id),
  tenant_name TEXT,
  state_code TEXT,
  deposit_amount NUMERIC,
  download_token TEXT UNIQUE NOT NULL
);

-- Index for quick dashboard lookups by access token
CREATE INDEX idx_b2b_credits_access_token ON b2b_credits(access_token);

-- Index for usage lookups by credit pack
CREATE INDEX idx_b2b_usage_credit_pack_id ON b2b_usage(credit_pack_id);
