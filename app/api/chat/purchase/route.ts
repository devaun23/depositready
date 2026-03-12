import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, generateDownloadToken } from "@/lib/supabase";
import { stripeFetch } from "@/lib/stripe-fetch";

export const runtime = "nodejs";
export const maxDuration = 30;

interface PurchaseBody {
  product: "recovery_packet";
  sessionToken?: string;
  email?: string;
}

const PRODUCTS = {
  recovery_packet: {
    name: "Recovery Packet",
    description: "Demand letter citing your violations + penalty calculations + evidence checklist + escalation timeline",
    price: 3900,
    productType: "full" as const,
  },
};

export async function POST(request: NextRequest) {
  try {
    const body: PurchaseBody = await request.json();
    const { product, sessionToken, email } = body;

    if (!product || !PRODUCTS[product]) {
      return NextResponse.json(
        { error: "Invalid product" },
        { status: 400 }
      );
    }

    const productInfo = PRODUCTS[product];
    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000").trim();

    // Try to load chat session data for context
    let sessionData: Record<string, unknown> | null = null;
    if (sessionToken) {
      const { data } = await supabaseAdmin
        .from("chat_sessions")
        .select("*")
        .eq("session_token", sessionToken)
        .single();
      sessionData = data;
    }

    // Create order for demand letter or legal packet
    const downloadToken = generateDownloadToken();

    const { data: order, error: dbError } = await supabaseAdmin
      .from("orders")
      .insert({
        email: email || (sessionData?.email as string) || "",
        tenant_name: "",
        property_address: "",
        deposit_amount: (sessionData?.deposit_amount as number) || 0,
        form_data: {
          source: "chat",
          state_code: (sessionData?.state_code as string) || null,
          move_out_date: (sessionData?.move_out_date as string) || null,
        },
        download_token: downloadToken,
        payment_status: "pending",
        product_type: productInfo.productType,
        state_code: (sessionData?.state_code as string) || null,
        move_out_date: (sessionData?.move_out_date as string) || null,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Failed to create order from chat:", dbError);
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
              name: productInfo.name,
              description: productInfo.description,
            },
            unit_amount: productInfo.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        order_id: order.id,
        product_type: productInfo.productType,
        source: "chat",
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&source=chat`,
      cancel_url: `${baseUrl}/chat`,
      ...(email && { customer_email: email }),
      allow_promotion_codes: true,
    });

    // Update order with Stripe session ID
    await supabaseAdmin
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    // Record purchase in chat session
    if (sessionToken) {
      await supabaseAdmin
        .from("chat_sessions")
        .update({
          purchases: supabaseAdmin
            ? [
                {
                  product,
                  stripe_session_id: session.id,
                  amount: productInfo.price,
                  created_at: new Date().toISOString(),
                },
              ]
            : [],
          updated_at: new Date().toISOString(),
        })
        .eq("session_token", sessionToken);
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Chat purchase error:", error);

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
