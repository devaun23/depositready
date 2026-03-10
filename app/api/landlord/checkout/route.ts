import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { stripeFetch } from "@/lib/stripe-fetch";
import crypto from "crypto";

export const runtime = "nodejs";

type Mode = "compliance" | "defense";
type Tier = "standard" | "complete";

interface CheckoutBody {
  mode: Mode;
  tier: Tier;
  stateCode: string | null;
  depositAmount: number | null;
  moveOutDate: string;
  landlordName: string;
  landlordEmail: string;
  landlordPhone: string;
  name: string;
  email: string;
  phone: string;
  // All other intake fields come along as form_data
  [key: string]: unknown;
}

const PRICING: Record<Mode, Record<Tier, number>> = {
  compliance: { standard: 9900, complete: 17900 },
  defense: { standard: 12900, complete: 19900 },
};

const PRODUCT_NAMES: Record<Mode, Record<Tier, string>> = {
  compliance: {
    standard: "Landlord Compliance Kit — Standard",
    complete: "Landlord Compliance Kit — Complete",
  },
  defense: {
    standard: "Landlord Defense Kit — Standard",
    complete: "Landlord Defense Kit — Complete",
  },
};

const PRODUCT_DESCRIPTIONS: Record<Mode, string> = {
  compliance:
    "State-specific compliance audit with actionable recommendations to avoid deposit disputes",
  defense:
    "Complete defense strategy against security deposit claims with liability analysis",
};

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutBody = await request.json();

    const { mode, tier } = body;

    // Validate mode and tier
    if (!mode || !["compliance", "defense"].includes(mode)) {
      return NextResponse.json(
        { error: "Invalid mode — must be 'compliance' or 'defense'" },
        { status: 400 }
      );
    }

    if (!tier || !["standard", "complete"].includes(tier)) {
      return NextResponse.json(
        { error: "Invalid tier — must be 'standard' or 'complete'" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (
      !body.stateCode ||
      !body.depositAmount ||
      !body.landlordName?.trim() ||
      !body.name?.trim() ||
      !body.email?.trim()
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const productType = `landlord_${mode}_${tier}` as const;
    const unitAmount = PRICING[mode][tier];
    const productName = PRODUCT_NAMES[mode][tier];

    // Generate a unique download token
    const downloadToken = crypto.randomUUID();

    // Insert order into database
    const { data: order, error: dbError } = await supabaseAdmin
      .from("orders")
      .insert({
        email: body.email.trim().toLowerCase(),
        tenant_name: body.landlordName.trim(),
        deposit_amount: body.depositAmount,
        product_type: productType,
        form_data: body,
        download_token: downloadToken,
        payment_status: "pending",
      })
      .select("id")
      .single();

    if (dbError || !order) {
      console.error("Failed to create landlord order:", dbError);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    // Create Stripe checkout session
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://depositready.co";

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
              description: PRODUCT_DESCRIPTIONS[mode],
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
      success_url: `${baseUrl}/landlord/${mode}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/landlord/${mode}/intake`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Landlord checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
