import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if referral code already exists for this email
    const { data: existing } = await supabaseAdmin
      .from("referrals")
      .select("referral_code")
      .eq("referrer_email", normalizedEmail)
      .single();

    if (existing) {
      return NextResponse.json({ code: existing.referral_code });
    }

    // Create new referral code
    const { data, error } = await supabaseAdmin
      .from("referrals")
      .insert({ referrer_email: normalizedEmail })
      .select("referral_code")
      .single();

    if (error) {
      console.error("Failed to create referral:", error);
      return NextResponse.json(
        { error: "Failed to create referral code" },
        { status: 500 }
      );
    }

    return NextResponse.json({ code: data.referral_code });
  } catch (error) {
    console.error("Referral API error:", error);
    return NextResponse.json(
      { error: "Failed to process referral" },
      { status: 500 }
    );
  }
}
