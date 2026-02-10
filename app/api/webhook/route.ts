import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyWebhookSignature } from "@/lib/stripe-fetch";
import { sendOrderConfirmationEmail, sendB2BWelcomeEmail, isEmailConfigured } from "@/lib/email";

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

      console.log("Payment successful:", {
        sessionId: session.id,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total,
        paymentStatus: session.payment_status,
        productType: session.metadata?.product_type,
      });

      // --- B2B credit pack handling ---
      if (session.metadata?.product_type === "b2b_credits") {
        const creditId = session.metadata.b2b_credit_id;
        if (!creditId) {
          console.warn("B2B payment but no b2b_credit_id in metadata");
          break;
        }

        const { error: b2bError } = await supabaseAdmin
          .from("b2b_credits")
          .update({
            payment_status: "paid",
            paid_at: new Date().toISOString(),
          })
          .eq("id", creditId);

        if (b2bError) {
          console.error("Failed to update b2b_credits:", b2bError);
          return NextResponse.json(
            { error: "Database update failed" },
            { status: 500 }
          );
        }

        console.log("B2B credit pack marked as paid:", creditId);

        // Send welcome email with dashboard link
        if (isEmailConfigured() && session.customer_email) {
          const { data: creditData } = await supabaseAdmin
            .from("b2b_credits")
            .select("access_token, package_size, company_name")
            .eq("id", creditId)
            .single();

          if (creditData?.access_token) {
            sendB2BWelcomeEmail({
              email: session.customer_email!,
              accessToken: creditData.access_token,
              packageSize: creditData.package_size,
              companyName: creditData.company_name,
              amountPaid: session.amount_total,
            }).catch((emailErr: unknown) => {
              console.error("B2B welcome email failed:", emailErr);
            });
          }
        }

        break;
      }

      // --- B2C order handling ---
      const orderId = session.metadata?.order_id;

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
          // Return error status so Stripe will retry the webhook
          return NextResponse.json(
            { error: "Database update failed" },
            { status: 500 }
          );
        } else {
          console.log("Order marked as paid:", orderId);

          // Skip email for diagnosis orders — email sent after PostPaymentForm
          if (session.metadata?.product_type === 'diagnosis') {
            console.log("Diagnosis order — skipping email until post-payment form:", orderId);
          } else if (isEmailConfigured() && session.customer_email) {
            // Look up the order to get download token
            const { data: orderData } = await supabaseAdmin
              .from("orders")
              .select("download_token, tenant_name, form_data")
              .eq("id", orderId)
              .single();

            if (orderData?.download_token) {
              const productType = (session.metadata?.product_type || "full") as "basic" | "full" | "landlord";
              const formData = orderData.form_data as { stateCode?: string } | null;

              // Fire and forget email
              sendOrderConfirmationEmail({
                email: session.customer_email,
                orderId,
                downloadToken: orderData.download_token,
                productType,
                amountPaid: session.amount_total,
                tenantName: orderData.tenant_name,
                stateName: formData?.stateCode,
              }).catch((err) => {
                console.error("Order confirmation email failed:", err);
              });
            }
          }
        }
      } else {
        console.warn("No order_id in session metadata");
      }

      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object;

      console.log("Checkout session expired:", session.id);

      // Clean up pending B2B credits
      if (session.metadata?.product_type === "b2b_credits") {
        const creditId = session.metadata.b2b_credit_id;
        if (creditId) {
          await supabaseAdmin.from("b2b_credits").delete().eq("id", creditId);
          console.log("Deleted expired B2B credit:", creditId);
        }
        break;
      }

      // Clean up pending B2C orders
      const orderId = session.metadata?.order_id;
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
