import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendOrderConfirmationEmail, isEmailConfigured } from "@/lib/email";
import type { StateCode } from "@/lib/state-rules/types";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * Completes a diagnosis order by adding tenant/property/landlord details,
 * updating form_data to WizardData shape so the existing PDF generation works,
 * and sending the confirmation email.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, downloadToken, tenantName, propertyAddress, landlordName, email } = body;

    if (!orderId || !downloadToken || !tenantName || !propertyAddress || !landlordName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Look up order and verify token
    const { data: order, error: lookupError } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .eq("download_token", downloadToken)
      .single();

    if (lookupError || !order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    if (order.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 403 }
      );
    }

    // Get diagnosis data from existing form_data
    const diagnosisData = order.form_data as Record<string, unknown> || {};
    const stateCode = (diagnosisData.stateCode || order.state_code || "FL") as StateCode;

    // Build WizardData-compatible form_data so existing /api/generate?token= works
    const wizardFormData = {
      stateCode,
      situation: "moved_out" as const,
      moveOutDate: (diagnosisData.moveOutDate as string) || order.move_out_date || null,
      depositPaidDate: null,
      depositAmount: order.deposit_amount || 0,
      wasItemized: diagnosisData.noticeStatus === "NOTICE_TIMELY" || diagnosisData.noticeStatus === "NOTICE_LATE",
      landlord: {
        name: landlordName,
        address: propertyAddress,
        city: "",
        state: "",
        zip: "",
        email: "",
        phone: "",
      },
      property: {
        address: propertyAddress,
        city: "",
        state: "",
        zip: "",
        unit: "",
        leaseStartDate: null,
        leaseEndDate: null,
      },
      issueType: "no_refund" as const,
      amountReceived: null,
      deductions: [],
      evidence: {
        hasPhotos: false,
        hasVideos: false,
        hasReceipts: false,
        hasLeaseAgreement: false,
        hasMoveInChecklist: false,
        hasMoveOutChecklist: false,
        hasCorrespondence: false,
        otherEvidence: "",
      },
      priorCommunication: {
        hasContacted: null,
        contactMethod: null,
        contactDate: null,
        response: "",
      },
      tenant: {
        name: tenantName,
        currentAddress: "",
        city: "",
        state: "",
        zip: "",
        email: email || order.email || "",
        phone: "",
      },
      // Preserve diagnosis-specific data
      _diagnosis: diagnosisData,
    };

    // Update order with personal details and WizardData-compatible form_data
    const { error: updateError } = await supabaseAdmin
      .from("orders")
      .update({
        tenant_name: tenantName,
        property_address: propertyAddress,
        form_data: wizardFormData,
        email: email || order.email,
        post_payment_completed: true,
      })
      .eq("id", orderId);

    if (updateError) {
      console.error("Failed to update order:", updateError);
      return NextResponse.json(
        { error: "Failed to update order" },
        { status: 500 }
      );
    }

    // Send confirmation email (non-blocking)
    const customerEmail = email || order.email;
    if (isEmailConfigured() && customerEmail) {
      sendOrderConfirmationEmail({
        email: customerEmail,
        orderId: order.id,
        downloadToken: order.download_token,
        productType: "full",
        amountPaid: 7900,
        tenantName,
        stateName: stateCode,
      }).then(() => {
        // Update pdf_emailed_at
        supabaseAdmin
          .from("orders")
          .update({ pdf_emailed_at: new Date().toISOString() })
          .eq("id", orderId)
          .then(() => {});
      }).catch((err) => {
        console.error("Failed to send confirmation email:", err);
      });
    }

    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000").trim();
    const downloadUrl = `${baseUrl}/download?token=${order.download_token}`;

    return NextResponse.json({
      success: true,
      downloadUrl,
      downloadToken: order.download_token,
    });
  } catch (error) {
    console.error("Complete order error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to complete order" },
      { status: 500 }
    );
  }
}
