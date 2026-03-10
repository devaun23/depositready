import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { supabaseAdmin } from "@/lib/supabase";
import { getStateRulesByCode, FLORIDA } from "@/lib/state-rules";
import { getCourtInfo } from "@/lib/state-rules/court-info";
import { runComplianceAudit } from "@/lib/landlord/compliance-audit";
import { calculateLiabilityExposure } from "@/lib/landlord/liability-calculator";
import { LandlordCompliancePacket } from "@/components/pdf/landlord/LandlordCompliancePacket";
import { LandlordDefensePacket } from "@/components/pdf/landlord/LandlordDefensePacket";
import type { LandlordIntakeData } from "@/lib/landlord/types";
import React from "react";

export const runtime = "nodejs";
export const maxDuration = 30;

async function generateLandlordPDF(data: LandlordIntakeData) {
  const stateRules = data.stateCode
    ? getStateRulesByCode(data.stateCode)
    : FLORIDA;

  const courtInfo = data.stateCode
    ? getCourtInfo(data.stateCode)
    : getCourtInfo("FL");

  const auditResult = runComplianceAudit(
    data.stateCode!,
    data.complianceAnswers
  );

  const liability = calculateLiabilityExposure(
    data.stateCode!,
    data.depositAmount!,
    auditResult.violations
  );

  const tier = data.tier || "standard";
  const mode = data.mode || "compliance";

  let pdfDocument;
  if (mode === "compliance") {
    pdfDocument = React.createElement(LandlordCompliancePacket, {
      data,
      auditResult,
      stateRules,
      courtInfo,
      tier,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;
  } else {
    pdfDocument = React.createElement(LandlordDefensePacket, {
      data,
      auditResult,
      liability,
      stateRules,
      courtInfo,
      tier,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;
  }

  const pdfBuffer = await renderToBuffer(pdfDocument);

  const sanitizedName = (data.landlordName || "Landlord").replace(
    /[^a-zA-Z0-9]/g,
    "_"
  );
  const label = mode === "compliance" ? "ComplianceKit" : "DefenseKit";
  const filename = `DepositReady_${label}_${sanitizedName}_${new Date().toISOString().split("T")[0]}.pdf`;

  const uint8Array = new Uint8Array(pdfBuffer);
  return { uint8Array, filename };
}

// POST: Preview generation (pre-payment)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data } = body as { data: LandlordIntakeData };

    if (!data || !data.landlordName || !data.stateCode) {
      return NextResponse.json(
        { error: "Missing required landlord intake data" },
        { status: 400 }
      );
    }

    const { uint8Array, filename } = await generateLandlordPDF(data);

    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": uint8Array.length.toString(),
      },
    });
  } catch (error) {
    console.error("Landlord PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}

// GET: Token-based download (post-payment)
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Download token required" },
      { status: 400 }
    );
  }

  try {
    const { data: order, error: lookupError } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("download_token", token)
      .single();

    if (lookupError || !order) {
      return NextResponse.json(
        { error: "Invalid or expired download token" },
        { status: 404 }
      );
    }

    if (order.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed for this order" },
        { status: 403 }
      );
    }

    const formData = order.form_data as unknown as LandlordIntakeData;

    if (!formData?.landlordName || !formData?.stateCode) {
      return NextResponse.json(
        { error: "Order data is incomplete" },
        { status: 400 }
      );
    }

    // Infer tier from product_type if not in form_data
    if (!formData.tier) {
      formData.tier = (order.product_type as string)?.includes("complete")
        ? "complete"
        : "standard";
    }

    // Infer mode from product_type if not in form_data
    if (!formData.mode) {
      formData.mode = (order.product_type as string)?.includes("defense")
        ? "defense"
        : "compliance";
    }

    const { uint8Array, filename } = await generateLandlordPDF(formData);

    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": uint8Array.length.toString(),
      },
    });
  } catch (error) {
    console.error("Token-based landlord PDF error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
