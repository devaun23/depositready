import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { supabaseAdmin, generateDownloadToken } from "@/lib/supabase";
import { FreeLetter } from "@/components/pdf/FreeLetter";
import {
  getStateRulesByCode,
  analyzeDeadlines,
  formatLegalDate,
  isValidStateCode,
} from "@/lib/state-rules";
import type { StateCode } from "@/lib/state-rules";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * GET — Load dashboard data for a given access token
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Missing access token" },
      { status: 400 }
    );
  }

  // Look up credit pack
  const { data: creditPack, error: creditError } = await supabaseAdmin
    .from("b2b_credits")
    .select("id, email, company_name, package_size, credits_remaining, payment_status, created_at")
    .eq("access_token", token)
    .single();

  if (creditError || !creditPack) {
    return NextResponse.json(
      { error: "Invalid or expired access token" },
      { status: 404 }
    );
  }

  // Load usage history
  const { data: usage } = await supabaseAdmin
    .from("b2b_usage")
    .select("id, created_at, tenant_name, state_code, deposit_amount, download_token")
    .eq("credit_pack_id", creditPack.id)
    .order("created_at", { ascending: false });

  return NextResponse.json({
    creditPack,
    usage: usage || [],
  });
}

/**
 * POST — Generate a letter, decrement credits, return usage record
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accessToken, tenantName, stateCode, depositAmount, moveOutDate, landlordName } = body;

    // Validate access token
    if (!accessToken) {
      return NextResponse.json(
        { error: "Missing access token" },
        { status: 400 }
      );
    }

    // Look up credit pack
    const { data: creditPack, error: creditError } = await supabaseAdmin
      .from("b2b_credits")
      .select("id, credits_remaining, payment_status")
      .eq("access_token", accessToken)
      .single();

    if (creditError || !creditPack) {
      return NextResponse.json(
        { error: "Invalid access token" },
        { status: 404 }
      );
    }

    if (creditPack.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed. Please complete checkout first." },
        { status: 403 }
      );
    }

    if (creditPack.credits_remaining <= 0) {
      return NextResponse.json(
        { error: "No credits remaining. Purchase more at /business." },
        { status: 403 }
      );
    }

    // Validate form fields
    if (!tenantName || !stateCode || !depositAmount || !moveOutDate) {
      return NextResponse.json(
        { error: "Missing required fields: tenantName, stateCode, depositAmount, moveOutDate" },
        { status: 400 }
      );
    }

    if (!isValidStateCode(stateCode)) {
      return NextResponse.json(
        { error: "Invalid state code" },
        { status: 400 }
      );
    }

    // Get state rules and analyze deadlines
    const rules = getStateRulesByCode(stateCode as StateCode);
    const moveOut = new Date(moveOutDate);
    const analysis = analyzeDeadlines(moveOut, rules);

    // Generate PDF
    const pdfDocument = React.createElement(FreeLetter, {
      landlordName: landlordName || undefined,
      stateCode: stateCode as StateCode,
      stateName: rules.name,
      statuteTitle: rules.statuteTitle,
      depositAmount: Number(depositAmount),
      moveOutDate,
      returnDeadline: formatLegalDate(analysis.returnDeadline),
      deadlinePassed: analysis.returnDeadlinePassed,
      damagesMultiplier: rules.damagesMultiplier,
      damagesDescription: rules.damagesDescription,
      generatedDate: new Date(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;

    const pdfBuffer = await renderToBuffer(pdfDocument);

    // Generate download token
    const downloadToken = generateDownloadToken();

    // Create usage record
    const { data: usageRecord, error: usageError } = await supabaseAdmin
      .from("b2b_usage")
      .insert({
        credit_pack_id: creditPack.id,
        tenant_name: tenantName,
        state_code: stateCode,
        deposit_amount: Number(depositAmount),
        download_token: downloadToken,
      })
      .select()
      .single();

    if (usageError) {
      console.error("Failed to create usage record:", usageError);
      return NextResponse.json(
        { error: "Failed to save letter record" },
        { status: 500 }
      );
    }

    // Decrement credits
    const { error: decrementError } = await supabaseAdmin
      .from("b2b_credits")
      .update({ credits_remaining: creditPack.credits_remaining - 1 })
      .eq("id", creditPack.id);

    if (decrementError) {
      console.error("Failed to decrement credits:", decrementError);
      // Don't fail — the letter was generated successfully
    }

    // Store PDF buffer for download (base64 in response for now)
    // In production, you'd store this in Supabase Storage or S3
    const pdfBase64 = Buffer.from(pdfBuffer).toString("base64");

    return NextResponse.json({
      success: true,
      usage: usageRecord,
      pdf: pdfBase64,
      filename: `DepositReady_${stateCode}_${tenantName.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`,
    });
  } catch (error) {
    console.error("B2B letter generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate letter" },
      { status: 500 }
    );
  }
}
