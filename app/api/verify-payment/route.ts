import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const maxDuration = 30;

function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({
        paid: false,
        status: session.payment_status,
      });
    }

    // Look up order to get download token
    let downloadToken: string | null = null;
    const orderId = session.metadata?.order_id;

    if (orderId) {
      const { data: order } = await supabaseAdmin
        .from("orders")
        .select("download_token")
        .eq("id", orderId)
        .single();

      if (order) {
        downloadToken = order.download_token;
      }
    }

    return NextResponse.json({
      paid: true,
      amountTotal: session.amount_total,
      customerEmail: session.customer_email,
      metadata: session.metadata,
      downloadToken,
      paidAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Session retrieval error:", error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message, paid: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to verify payment", paid: false },
      { status: 500 }
    );
  }
}
