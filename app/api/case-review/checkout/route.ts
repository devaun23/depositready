import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { stripeFetch } from "@/lib/stripe-fetch";
import crypto from "crypto";

export const runtime = "nodejs";

interface CheckoutBody {
  stateCode: string | null;
  depositAmount: number | null;
  moveOutDate: string;
  landlordName: string;
  propertyAddress: string;
  situationSummary: string;
  landlordResponse: string;
  communicationsHistory: string;
  deductionsDescribed: string;
  primaryConcern: string;
  desiredOutcome: string;
  name: string;
  email: string;
  phone: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutBody = await request.json();

    // Validate required fields
    if (!body.stateCode || !body.depositAmount || !body.situationSummary?.trim() || !body.name?.trim() || !body.email?.trim()) {
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

    // Generate a unique download token
    const downloadToken = crypto.randomUUID();

    // Create case review row in database
    const { data: caseReview, error: dbError } = await supabaseAdmin
      .from("case_reviews")
      .insert({
        email: body.email.trim().toLowerCase(),
        name: body.name.trim(),
        phone: body.phone?.trim() || null,
        state_code: body.stateCode,
        deposit_amount: body.depositAmount,
        move_out_date: body.moveOutDate || null,
        landlord_name: body.landlordName?.trim() || null,
        property_address: body.propertyAddress?.trim() || null,
        situation_summary: body.situationSummary.trim(),
        landlord_response: body.landlordResponse?.trim() || null,
        communications_history: body.communicationsHistory?.trim() || null,
        deductions_described: body.deductionsDescribed?.trim() || null,
        primary_concern: body.primaryConcern?.trim() || null,
        desired_outcome: body.desiredOutcome?.trim() || null,
        download_token: downloadToken,
        review_status: "pending",
        payment_status: "pending",
        source: "case_review",
      })
      .select("id")
      .single();

    if (dbError || !caseReview) {
      console.error("Failed to create case review:", dbError);
      return NextResponse.json(
        { error: "Failed to create case review" },
        { status: 500 }
      );
    }

    // Create Stripe checkout session
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://depositready.co";

    const session = await stripeFetch.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: body.email.trim().toLowerCase(),
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Personalized Case Review",
              description:
                "Expert analysis of your security deposit situation with personalized action plan",
            },
            unit_amount: 14900, // $149.00
          },
          quantity: 1,
        },
      ],
      metadata: {
        product_type: "case_review",
        case_review_id: caseReview.id,
      },
      success_url: `${baseUrl}/case-review/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/case-review/intake`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Case review checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
