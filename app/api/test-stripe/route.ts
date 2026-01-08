import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const apiKey = process.env.STRIPE_SECRET_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "No API key", hasKey: false });
  }

  try {
    // Test with raw fetch first
    const response = await fetch("https://api.stripe.com/v1/account", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const data = await response.json();

    return NextResponse.json({
      success: true,
      hasKey: true,
      keyPrefix: apiKey.substring(0, 10) + "...",
      accountId: data.id,
      chargesEnabled: data.charges_enabled,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      hasKey: true,
      keyPrefix: apiKey.substring(0, 10) + "...",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
