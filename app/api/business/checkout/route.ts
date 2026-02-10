import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, generateDownloadToken } from "@/lib/supabase";
import { stripeFetch } from "@/lib/stripe-fetch";

export const runtime = "nodejs";
export const maxDuration = 30;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Pricing map: package_size → price in cents
const PRICING: Record<number, { cents: number; name: string }> = {
  5: { cents: 9900, name: "Starter Pack — 5 Letters" },
  10: { cents: 17900, name: "Professional Pack — 10 Letters" },
  25: { cents: 39900, name: "Enterprise Pack — 25 Letters" },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, companyName, customerType, packageSize } = body;

    // Validate email
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Validate package size
    const tier = PRICING[packageSize];
    if (!tier) {
      return NextResponse.json(
        { error: "Invalid package size. Choose 5, 10, or 25." },
        { status: 400 }
      );
    }

    // Validate optional fields
    if (companyName && (typeof companyName !== "string" || companyName.length > 200)) {
      return NextResponse.json(
        { error: "Invalid company name" },
        { status: 400 }
      );
    }

    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000").trim();

    // Generate access token for dashboard
    const accessToken = generateDownloadToken();

    // Create pending b2b_credits row
    const { data: credit, error: dbError } = await supabaseAdmin
      .from("b2b_credits")
      .insert({
        email: email.toLowerCase().trim(),
        company_name: companyName || null,
        customer_type: customerType || null,
        package_size: packageSize,
        price_paid: tier.cents,
        credits_remaining: packageSize,
        payment_status: "pending",
        access_token: accessToken,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Failed to create b2b_credits row:", dbError);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    // Create Stripe checkout session
    const session = await stripeFetch.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: tier.name,
              description: `${packageSize} state-specific demand letters for bulk generation`,
            },
            unit_amount: tier.cents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        b2b_credit_id: credit.id,
        product_type: "b2b_credits",
        package_size: packageSize.toString(),
        company_name: companyName || "",
      },
      success_url: `${baseUrl}/business/dashboard?token=${accessToken}`,
      cancel_url: `${baseUrl}/business?canceled=true`,
      customer_email: email,
      allow_promotion_codes: true,
    });

    // Update row with Stripe session ID
    await supabaseAdmin
      .from("b2b_credits")
      .update({ stripe_session_id: session.id })
      .eq("id", credit.id);

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("B2B checkout session error:", error);

    if (
      error instanceof Error &&
      error.message.includes("STRIPE_SECRET_KEY")
    ) {
      return NextResponse.json(
        { error: "Payment system not configured" },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
