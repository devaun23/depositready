-- Calculator sessions for H4 Settlement Calculator analytics
CREATE TABLE calculator_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL CHECK (role IN ('tenant', 'landlord')),
  state_code TEXT NOT NULL,
  deposit_amount NUMERIC NOT NULL,
  move_out_date DATE,
  deposit_returned TEXT CHECK (deposit_returned IN ('nothing', 'partial', 'full')),
  landlord_compliance JSONB,
  violation_detected BOOLEAN,
  potential_recovery NUMERIC,
  case_strength TEXT,
  recommended_product TEXT,
  email TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- RLS: public insert, service_role select
ALTER TABLE calculator_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert calculator sessions"
  ON calculator_sessions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can read calculator sessions"
  ON calculator_sessions FOR SELECT
  TO service_role
  USING (true);
