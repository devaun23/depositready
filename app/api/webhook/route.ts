import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyWebhookSignature } from "@/lib/stripe-fetch";

export const runtime = "nodejs";
export const maxDuration = 30;

interface CheckoutSession {
  id: string;
  payment_status: string;
  customer_email: string | null;
  amount_total: number;
  payment_intent?: string | { id: string };
  metadata?: Record<string, string>;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 503 }
    );
  }

  let event: { type: string; data: { object: CheckoutSession } };

  try {
    event = verifyWebhookSignature(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const orderId = session.metadata?.order_id;

      console.log("Payment successful:", {
        sessionId: session.id,
        orderId,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total,
        paymentStatus: session.payment_status,
      });

      if (orderId) {
        // Update order to paid status
        const paymentIntent =
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id || null;

        const { error: updateError } = await supabaseAdmin
          .from("orders")
          .update({
            payment_status: "paid",
            paid_at: new Date().toISOString(),
            stripe_payment_intent: paymentIntent,
            email: session.customer_email || undefined,
          })
          .eq("id", orderId);

        if (updateError) {
          console.error("Failed to update order:", updateError);
        } else {
          console.log("Order marked as paid:", orderId);
        }
      } else {
        console.warn("No order_id in session metadata");
      }

      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object;
      const orderId = session.metadata?.order_id;

      console.log("Checkout session expired:", session.id);

      // Optionally clean up pending orders
      if (orderId) {
        await supabaseAdmin.from("orders").delete().eq("id", orderId);
        console.log("Deleted expired pending order:", orderId);
      }

      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
