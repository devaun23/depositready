import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, stateCode, depositAmount, landlordInViolation, potentialRecovery, source } = body;

    // Validate email
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Insert lead into Supabase
    const { error: dbError } = await supabaseAdmin
      .from("leads")
      .insert({
        email: email.toLowerCase().trim(),
        state_code: stateCode || null,
        deposit_amount: depositAmount || null,
        landlord_in_violation: landlordInViolation || false,
        potential_recovery: potentialRecovery || null,
        source: source || "eligibility_modal",
      });

    if (dbError) {
      // If it's a duplicate, that's fine - just log and continue
      if (dbError.code === "23505") {
        console.log("Lead already exists:", email);
        return NextResponse.json({ success: true, duplicate: true });
      }
      console.error("Failed to create lead:", dbError);
      return NextResponse.json(
        { error: "Failed to save lead" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { error: "Failed to capture lead" },
      { status: 500 }
    );
  }
}
