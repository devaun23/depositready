import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

/**
 * GET /api/chat/session?token=X
 * Loads a previous chat session for returning users.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Missing session token" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("chat_sessions")
    .select("messages, state_code, deposit_amount, move_out_date, case_strength, violation_detected, recovery_amount")
    .eq("session_token", token)
    .single();

  if (error || !data) {
    // No session found — not an error, just a new user
    return NextResponse.json({ messages: [], caseData: null });
  }

  // Rebuild case data from stored fields
  const caseData = (data.state_code || data.deposit_amount || data.violation_detected !== null)
    ? {
        stateCode: data.state_code,
        depositAmount: data.deposit_amount,
        moveOutDate: data.move_out_date,
        caseStrength: data.case_strength,
        violationDetected: data.violation_detected,
        recoveryAmount: data.recovery_amount,
      }
    : null;

  return NextResponse.json({
    messages: data.messages || [],
    caseData,
  });
}
