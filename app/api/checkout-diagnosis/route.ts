import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, generateDownloadToken } from "@/lib/supabase";
import { stripeFetch } from "@/lib/stripe-fetch";

export const runtime = "nodejs";
export const maxDuration = 30;

const PRICE_CENTS = 7900; // $79.00 for diagnosis dispute packet

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      stateCode,
      moveOutDate,
      noticeStatus,
      caseStrength,
      recoveryEstimate,
      totalDeposit,
      amountWithheld,
      noticeSentDate,
      email,
    } = body;

    // Validate required fields
    if (!stateCode || !moveOutDate || !noticeStatus || !caseStrength) {
      return NextResponse.json(
        { error: "Missing required diagnosis fields" },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (email && !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000").trim();
    const downloadToken = generateDownloadToken();

    // Create pending order in Supabase
    const { data: order, error: dbError } = await supabaseAdmin
      .from("orders")
      .insert({
        email: email || "",
        tenant_name: "", // collected post-payment
        property_address: "", // collected post-payment
        deposit_amount: totalDeposit || amountWithheld || 0,
        form_data: {
          stateCode,
          moveOutDate,
          noticeStatus,
          caseStrength,
          recoveryEstimate,
          noticeSentDate,
        },
        download_token: downloadToken,
        payment_status: "pending",
        product_type: "diagnosis",
        // New diagnosis columns
        state_code: stateCode,
        move_out_date: moveOutDate,
        notice_status: noticeStatus,
        case_strength: caseStrength,
        recovery_estimate: recoveryEstimate || 0,
        amount_withheld: amountWithheld || totalDeposit || 0,
        notice_sent_date: noticeSentDate || null,
        post_payment_completed: false,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Failed to create diagnosis order:", dbError);
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
              name: "Court-Ready Case File",
              description: "10-page legal case file: demand letter, violation analysis, damages calculation, evidence index, small claims filing guide",
            },
            unit_amount: PRICE_CENTS,
          },
          quantity: 1,
        },
      ],
      metadata: {
        order_id: order.id,
        product_type: "diagnosis",
        state_code: stateCode,
        notice_status: noticeStatus,
        case_strength: caseStrength,
        recovery_estimate: String(recoveryEstimate || 0),
        move_out_date: moveOutDate,
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/next-steps`,
      ...(email && { customer_email: email }),
      allow_promotion_codes: true,
    });

    // Update order with Stripe session ID
    await supabaseAdmin
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Diagnosis checkout error:", error);

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
