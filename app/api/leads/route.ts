import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendWelcomeEmail, isEmailConfigured } from "@/lib/email";
import { getStateRulesByCode } from "@/lib/state-rules";
import type { StateCode } from "@/lib/state-rules";

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

    const normalizedEmail = email.toLowerCase().trim();
    const validSource = source || "eligibility_modal";

    // Insert lead into Supabase
    const { error: dbError } = await supabaseAdmin
      .from("leads")
      .insert({
        email: normalizedEmail,
        state_code: stateCode || null,
        deposit_amount: depositAmount || null,
        landlord_in_violation: landlordInViolation || false,
        potential_recovery: potentialRecovery || null,
        source: validSource,
      });

    if (dbError) {
      // If it's a duplicate, that's fine - just log and continue
      if (dbError.code === "23505") {
        console.log("Lead already exists:", normalizedEmail);
        return NextResponse.json({ success: true, duplicate: true });
      }
      console.error("Failed to create lead:", dbError);
      return NextResponse.json(
        { error: "Failed to save lead" },
        { status: 500 }
      );
    }

    // Send welcome email (non-blocking)
    if (isEmailConfigured()) {
      // Get state name if stateCode is provided
      let stateName: string | undefined;
      if (stateCode) {
        try {
          const rules = getStateRulesByCode(stateCode as StateCode);
          stateName = rules.name;
        } catch {
          // State not found, continue without state name
        }
      }

      // Fire and forget - don't block the response
      sendWelcomeEmail({
        email: normalizedEmail,
        stateCode,
        stateName,
        depositAmount,
        potentialRecovery,
        source: validSource as "quiz" | "free_letter" | "eligibility_modal",
      }).catch((err) => {
        console.error("Background email send failed:", err);
      });
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
