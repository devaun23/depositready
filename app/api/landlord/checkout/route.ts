import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin, generateDownloadToken } from "@/lib/supabase";
import { stripeFetch } from "@/lib/stripe-fetch";

export const runtime = "nodejs";
export const maxDuration = 30;

const PRICE_CENTS = 7900; // $79.00 for landlord response kit

// Simple email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { landlordName, landlordEmail, propertyAddress, depositAmount, formData } =
      body;

    // Validate required fields
    if (!landlordName || !propertyAddress) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate landlord name length
    if (typeof landlordName !== "string" || landlordName.length > 200) {
      return NextResponse.json(
        { error: "Invalid landlord name" },
        { status: 400 }
      );
    }

    // Validate property address length
    if (typeof propertyAddress !== "string" || propertyAddress.length > 500) {
      return NextResponse.json(
        { error: "Invalid property address" },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (landlordEmail && !EMAIL_REGEX.test(landlordEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate deposit amount if provided
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

    // Generate a download token for this order
    const downloadToken = generateDownloadToken();

    // Create pending order in Supabase
    const { data: order, error: dbError } = await supabaseAdmin
      .from("orders")
      .insert({
        email: landlordEmail || "",
        tenant_name: formData?.tenant?.name || "", // Store tenant name for reference
        property_address: propertyAddress,
        deposit_amount: depositAmount || 0,
        form_data: formData || {},
        download_token: downloadToken,
        payment_status: "pending",
        product_type: "landlord", // Distinguish from tenant orders
      })
      .select()
      .single();

    if (dbError) {
      console.error("Failed to create pending order:", dbError);
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
              name: "Landlord Response Kit",
              description: `Response kit for ${propertyAddress}`,
            },
            unit_amount: PRICE_CENTS,
          },
          quantity: 1,
        },
      ],
      metadata: {
        order_id: order.id,
        landlord_name: landlordName,
        property_address: propertyAddress,
        deposit_amount: depositAmount?.toString() || "0",
        product_type: "landlord",
      },
      success_url: `${baseUrl}/landlord/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/landlord/wizard?canceled=true`,
      ...(landlordEmail && { customer_email: landlordEmail }),
      allow_promotion_codes: true,
    });

    // Update order with stripe session ID
    await supabaseAdmin
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Landlord checkout session error:", error);

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
