-- Add diagnosis-specific columns to orders table
-- Supports the /diagnose flow where payment happens before property details are collected

ALTER TABLE orders ADD COLUMN IF NOT EXISTS notice_status TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS case_strength TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS recovery_estimate NUMERIC;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS state_code TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS move_out_date DATE;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS notice_sent_date DATE;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS amount_withheld NUMERIC;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS post_payment_completed BOOLEAN DEFAULT FALSE;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS pdf_emailed_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_orders_state_code ON orders(state_code);
CREATE INDEX IF NOT EXISTS idx_orders_notice_status ON orders(notice_status);
