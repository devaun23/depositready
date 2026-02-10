import { NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail, type WelcomeEmailData } from "@/lib/email";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body: WelcomeEmailData = await request.json();

    // Validate email
    if (!body.email || !EMAIL_REGEX.test(body.email)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Validate source
    if (!body.source || !["quiz", "free_letter", "eligibility_modal"].includes(body.source)) {
      return NextResponse.json(
        { error: "Valid source is required" },
        { status: 400 }
      );
    }

    // Send welcome email (non-blocking for the response)
    const result = await sendWelcomeEmail({
      email: body.email.toLowerCase().trim(),
      stateCode: body.stateCode,
      stateName: body.stateName,
      depositAmount: body.depositAmount,
      potentialRecovery: body.potentialRecovery,
      source: body.source,
    });

    if (!result.success) {
      // Log but don't fail the request - email is best effort
      console.warn("Welcome email not sent:", result.error);
    }

    return NextResponse.json({ success: true, emailSent: result.success });
  } catch (error) {
    console.error("Welcome email API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
