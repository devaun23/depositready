-- Create leads table for email capture from eligibility modal
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  state_code TEXT,
  deposit_amount NUMERIC,
  landlord_in_violation BOOLEAN DEFAULT FALSE,
  potential_recovery NUMERIC,
  source TEXT DEFAULT 'eligibility_modal',
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Prevent duplicate emails (allow re-capture with updated data)
  CONSTRAINT leads_email_unique UNIQUE (email)
);

-- Create index for querying by state and date
CREATE INDEX IF NOT EXISTS leads_state_code_idx ON leads(state_code);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Service role can do everything (for API access)
CREATE POLICY "Service role has full access to leads"
  ON leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Add comment for documentation
COMMENT ON TABLE leads IS 'Email leads captured from eligibility modal before wizard';
COMMENT ON COLUMN leads.email IS 'User email address';
COMMENT ON COLUMN leads.state_code IS 'State code (FL, CA, TX, etc.)';
COMMENT ON COLUMN leads.deposit_amount IS 'Security deposit amount in dollars';
COMMENT ON COLUMN leads.landlord_in_violation IS 'Whether landlord violated deadline';
COMMENT ON COLUMN leads.potential_recovery IS 'Calculated potential recovery amount';
COMMENT ON COLUMN leads.source IS 'Where the lead was captured from';
