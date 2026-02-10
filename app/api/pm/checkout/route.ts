import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, generateDownloadToken } from "@/lib/supabase";
import { stripeFetch } from "@/lib/stripe-fetch";

export const runtime = "nodejs";
export const maxDuration = 30;

const PRICE_CENTS = 2900; // $29.00 per deposit disposition packet

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyName, managerName, managerEmail, propertyAddress, depositAmount, formData } = body;

    if (!companyName || !managerName || !propertyAddress) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (typeof companyName !== "string" || companyName.length > 200) {
      return NextResponse.json(
        { error: "Invalid company name" },
        { status: 400 }
      );
    }

    if (typeof propertyAddress !== "string" || propertyAddress.length > 500) {
      return NextResponse.json(
        { error: "Invalid property address" },
        { status: 400 }
      );
    }

    if (managerEmail && !EMAIL_REGEX.test(managerEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (depositAmount !== undefined && depositAmount !== null) {
      const amount = Number(depositAmount);
      if (isNaN(amount) || amount < 0 || amount > 100000) {
        return NextResponse.json(
          { error: "Invalid deposit amount" },
          { status: 400 }
        );
      }
    }

    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000").trim();
    const downloadToken = generateDownloadToken();

    const { data: order, error: dbError } = await supabaseAdmin
      .from("orders")
      .insert({
        email: managerEmail || "",
        tenant_name: formData?.tenant?.name || "",
        property_address: propertyAddress,
        deposit_amount: depositAmount || 0,
        form_data: formData || {},
        download_token: downloadToken,
        payment_status: "pending",
        product_type: "pm",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Failed to create PM order:", dbError);
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
              name: "Deposit Disposition Packet",
              description: `FL §83.49 compliant disposition packet for ${propertyAddress}`,
            },
            unit_amount: PRICE_CENTS,
          },
          quantity: 1,
        },
      ],
      metadata: {
        order_id: order.id,
        company_name: companyName,
        manager_name: managerName,
        property_address: propertyAddress,
        deposit_amount: depositAmount?.toString() || "0",
        product_type: "pm",
      },
      success_url: `${baseUrl}/pm/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pm/wizard?canceled=true`,
      ...(managerEmail && { customer_email: managerEmail }),
      allow_promotion_codes: true,
    });

    await supabaseAdmin
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("PM checkout session error:", error);

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
