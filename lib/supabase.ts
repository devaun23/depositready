import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (_supabaseAdmin) return _supabaseAdmin;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      `Missing Supabase environment variables. URL: ${supabaseUrl ? "set" : "missing"}, Key: ${supabaseServiceKey ? "set" : "missing"}`
    );
  }

  _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  return _supabaseAdmin;
}

// For backward compatibility
export const supabaseAdmin = {
  from: (table: string) => getSupabaseAdmin().from(table),
};

// Types for the orders table
export interface Order {
  id: string;
  stripe_session_id: string;
  stripe_payment_intent: string | null;
  email: string;
  tenant_name: string;
  property_address: string;
  deposit_amount: number;
  form_data: Record<string, unknown>;
  download_token: string;
  payment_status: "pending" | "paid" | "refunded";
  paid_at: string | null;
  created_at: string;
}

// Helper to generate a secure download token
export function generateDownloadToken(): string {
  return crypto.randomUUID();
}
