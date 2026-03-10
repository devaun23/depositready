import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { error } = await supabaseAdmin.from("calculator_sessions").insert({
      role: body.role,
      state_code: body.stateCode,
      deposit_amount: body.depositAmount,
      move_out_date: body.moveOutDate || null,
      deposit_returned: body.depositReturned || null,
      landlord_compliance: body.landlordCompliance || null,
      violation_detected: body.violationDetected ?? null,
      potential_recovery: body.potentialRecovery ?? null,
      case_strength: body.caseStrength || null,
      recommended_product: body.recommendedProduct || null,
      email: body.email?.trim().toLowerCase() || null,
      utm_source: body.utmSource || null,
      utm_medium: body.utmMedium || null,
    });

    if (error) {
      console.error("Failed to save calculator session:", error);
      return NextResponse.json({ saved: false }, { status: 500 });
    }

    return NextResponse.json({ saved: true });
  } catch (err) {
    console.error("Calculator session error:", err);
    return NextResponse.json({ saved: false }, { status: 500 });
  }
}
