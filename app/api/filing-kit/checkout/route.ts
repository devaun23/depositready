import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { stripeFetch } from "@/lib/stripe-fetch";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.stateCode || !body.depositAmount || !body.tenantName?.trim() || !body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const tier = body.tier === "complete" ? "complete" : "standard";
    const unitAmount = tier === "complete" ? 12900 : 7900;
    const productType = `filing_kit_${tier}`;
    const productName = tier === "complete" ? "Small Claims Filing Kit — Complete" : "Small Claims Filing Kit — Standard";

    const downloadToken = crypto.randomUUID();

    // Create order in database
    const { data: order, error: dbError } = await supabaseAdmin
      .from("orders")
      .insert({
        email: body.email.trim().toLowerCase(),
        tenant_name: body.tenantName.trim(),
        deposit_amount: body.depositAmount,
        product_type: productType,
        form_data: body,
        download_token: downloadToken,
        payment_status: "pending",
      })
      .select("id")
      .single();

    if (dbError || !order) {
      console.error("Failed to create filing kit order:", dbError);
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }

    // Create Stripe session
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://depositready.co";

    const session = await stripeFetch.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: body.email.trim().toLowerCase(),
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName,
              description: `State-specific court filing documents for ${body.stateCode}`,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        product_type: productType,
        order_id: order.id,
      },
      success_url: `${baseUrl}/filing-kit/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/filing-kit/intake`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Filing kit checkout error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
