import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, generateDownloadToken } from "@/lib/supabase";
import { stripeFetch } from "@/lib/stripe-fetch";

export const runtime = "nodejs";
export const maxDuration = 30;

const PRICE_CENTS = 3900; // $39.00

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      state,
      stateName,
      depositAmount,
      daysSinceMoveOut,
      violations,
      penaltyAmount,
      totalClaim,
      statute,
      strength,
    } = body;

    if (!state || !depositAmount || !violations?.length) {
      return NextResponse.json(
        { error: "Missing required case data" },
        { status: 400 }
      );
    }

    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000").trim();
    const downloadToken = generateDownloadToken();

    const { data: order, error: dbError } = await supabaseAdmin
      .from("orders")
      .insert({
        email: "",
        tenant_name: "",
        property_address: "",
        deposit_amount: depositAmount || 0,
        form_data: {
          source: "check-my-case",
          state_code: state,
          state_name: stateName,
          days_since_move_out: daysSinceMoveOut,
          violations,
          penalty_amount: penaltyAmount,
          total_claim: totalClaim,
          statute,
          strength,
        },
        download_token: downloadToken,
        payment_status: "pending",
        product_type: "full",
        state_code: state,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Failed to create order from check-my-case:", dbError);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    const session = await stripeFetch.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Recovery Packet",
              description: `Demand letter + penalty calculations for ${stateName} deposit case`,
            },
            unit_amount: PRICE_CENTS,
          },
          quantity: 1,
        },
      ],
      metadata: {
        order_id: order.id,
        product_type: "full",
        source: "check-my-case",
        state_code: state,
        total_claim: totalClaim?.toString() || "0",
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&source=check-my-case`,
      cancel_url: `${baseUrl}/check-my-case`,
      allow_promotion_codes: true,
    });

    // Non-blocking — webhook resolves via metadata
    supabaseAdmin
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Check-my-case checkout error:", error);

    if (error instanceof Error && error.message.includes("STRIPE_SECRET_KEY")) {
      return NextResponse.json(
        { error: "Payment system not configured" },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create checkout" },
      { status: 500 }
    );
  }
}
