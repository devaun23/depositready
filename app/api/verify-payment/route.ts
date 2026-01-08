import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { stripeFetch } from "@/lib/stripe-fetch";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripeFetch.checkout.sessions.retrieve(sessionId);

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

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to verify payment", paid: false },
      { status: 500 }
    );
  }
}
