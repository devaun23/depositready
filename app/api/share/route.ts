import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      stateCode,
      stateName,
      depositAmount,
      potentialRecovery,
      daysPastDeadline,
      landlordInViolation,
      caseStrength,
      damagesMultiplier,
      utmSource,
    } = body;

    // Validate required fields
    if (!stateCode || !stateName || !depositAmount || !potentialRecovery) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("shared_results")
      .insert({
        state_code: stateCode,
        state_name: stateName,
        deposit_amount: depositAmount,
        potential_recovery: potentialRecovery,
        days_past_deadline: daysPastDeadline ?? null,
        landlord_in_violation: landlordInViolation ?? false,
        case_strength: caseStrength ?? null,
        damages_multiplier: damagesMultiplier ?? 1,
        utm_source: utmSource ?? null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Failed to save shared result:", error);
      return NextResponse.json(
        { error: "Failed to save result" },
        { status: 500 }
      );
    }

    return NextResponse.json({ id: data.id });
  } catch (error) {
    console.error("Share API error:", error);
    return NextResponse.json(
      { error: "Failed to create shareable result" },
      { status: 500 }
    );
  }
}
