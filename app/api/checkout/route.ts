import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin, generateDownloadToken } from "@/lib/supabase";

// Force Node.js runtime for better Stripe compatibility
export const runtime = "nodejs";
export const maxDuration = 30;

const PRICE_CENTS = 3900; // $39.00

function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();
    const body = await request.json();
    const { tenantName, tenantEmail, propertyAddress, depositAmount, formData } =
      body;

    if (!tenantName || !propertyAddress) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Generate a download token for this order
    const downloadToken = generateDownloadToken();

    // Create pending order in Supabase with form_data
    const { data: order, error: dbError } = await supabaseAdmin
      .from("orders")
      .insert({
        email: tenantEmail || "",
        tenant_name: tenantName,
        property_address: propertyAddress,
        deposit_amount: depositAmount || 0,
        form_data: formData || {},
        download_token: downloadToken,
        payment_status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Failed to create pending order:", dbError);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    // Create Stripe checkout session with order_id in metadata
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Security Deposit Dispute Packet",
              description: `Dispute packet for ${propertyAddress}`,
            },
            unit_amount: PRICE_CENTS,
          },
          quantity: 1,
        },
      ],
      metadata: {
        order_id: order.id,
        tenant_name: tenantName,
        property_address: propertyAddress,
        deposit_amount: depositAmount?.toString() || "0",
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/preview?canceled=true`,
      ...(tenantEmail && { customer_email: tenantEmail }),
      allow_promotion_codes: true,
    });

    // Update order with stripe session ID
    await supabaseAdmin
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Checkout session error:", error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

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
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
