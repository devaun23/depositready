import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import {
  analyzeDeadlines,
  getStateRulesByCode,
  formatLegalDate,
  isValidStateCode,
} from "@/lib/state-rules";
import type { StateCode } from "@/lib/state-rules";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FreeLetterRequest {
  email: string;
  stateCode: string;
  depositAmount: number;
  moveOutDate: string;
  landlordName?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: FreeLetterRequest = await request.json();
    const {
      email,
      stateCode,
      depositAmount,
      moveOutDate,
      landlordName,
      utmSource,
      utmMedium,
      utmCampaign,
    } = body;

    // Validate email
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Validate state code
    if (!stateCode || !isValidStateCode(stateCode)) {
      return NextResponse.json(
        { error: "Valid state code is required" },
        { status: 400 }
      );
    }

    // Validate deposit amount
    if (!depositAmount || depositAmount <= 0) {
      return NextResponse.json(
        { error: "Deposit amount must be greater than 0" },
        { status: 400 }
      );
    }

    // Validate move-out date
    if (!moveOutDate) {
      return NextResponse.json(
        { error: "Move-out date is required" },
        { status: 400 }
      );
    }

    // Get state rules and calculate deadlines
    const rules = getStateRulesByCode(stateCode as StateCode);
    const moveOut = new Date(moveOutDate);
    const analysis = analyzeDeadlines(moveOut, rules);

    // Calculate potential recovery with damages multiplier
    const potentialRecovery = depositAmount * rules.damagesMultiplier;

    // Insert into database
    const { error: dbError } = await supabaseAdmin
      .from("free_letters")
      .insert({
        email: email.toLowerCase().trim(),
        state_code: stateCode,
        deposit_amount: depositAmount,
        move_out_date: moveOutDate,
        landlord_name: landlordName || null,
        deadline: analysis.returnDeadline.toISOString().split("T")[0],
        deadline_passed: analysis.returnDeadlinePassed,
        letter_generated_at: new Date().toISOString(),
        utm_source: utmSource || null,
        utm_medium: utmMedium || null,
        utm_campaign: utmCampaign || null,
      });

    if (dbError) {
      console.error("Failed to save free letter:", dbError);
      // Don't fail the request if DB insert fails - still return the letter data
    }

    // Return data for client-side letter generation
    return NextResponse.json({
      success: true,
      stateName: rules.name,
      stateCode: rules.code,
      statuteTitle: rules.statuteTitle,
      statuteUrl: rules.statuteUrl,
      returnDeadline: formatLegalDate(analysis.returnDeadline),
      claimDeadline: formatLegalDate(analysis.claimDeadline),
      deadlinePassed: analysis.returnDeadlinePassed,
      daysLate: analysis.returnDeadlinePassed
        ? Math.abs(analysis.daysUntilReturnDeadline)
        : undefined,
      daysRemaining: !analysis.returnDeadlinePassed
        ? analysis.daysUntilReturnDeadline
        : undefined,
      damagesMultiplier: rules.damagesMultiplier,
      damagesDescription: rules.damagesDescription,
      potentialRecovery,
      landlordInViolation: analysis.landlordInViolation,
    });
  } catch (error) {
    console.error("Free letter generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate letter" },
      { status: 500 }
    );
  }
}
