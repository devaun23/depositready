import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { FilingKitPacket } from "@/components/pdf/filing-kit/FilingKitPacket";
import { FilingKitData } from "@/types/filing-kit";
import { supabaseAdmin } from "@/lib/supabase";
import { getStateRulesByCode, FLORIDA } from "@/lib/state-rules";
import { getCourtInfo } from "@/lib/state-rules/court-info";
import React from "react";

export const runtime = "nodejs";
export const maxDuration = 30;

async function generateFilingKitPDF(data: FilingKitData, tier: "standard" | "complete") {
  const stateRules = data.stateCode
    ? getStateRulesByCode(data.stateCode)
    : FLORIDA;

  const courtInfo = data.stateCode
    ? getCourtInfo(data.stateCode)
    : getCourtInfo("FL");

  const pdfDocument = React.createElement(FilingKitPacket, {
    data,
    stateRules,
    courtInfo,
    tier,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;

  const pdfBuffer = await renderToBuffer(pdfDocument);

  const sanitizedName = (data.tenantName || "Tenant").replace(/[^a-zA-Z0-9]/g, "_");
  const filename = `DepositReady_FilingKit_${sanitizedName}_${new Date().toISOString().split("T")[0]}.pdf`;

  const uint8Array = new Uint8Array(pdfBuffer);
  return { uint8Array, filename };
}

// POST: Preview generation (pre-payment, optional)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, tier } = body as { data: FilingKitData; tier: "standard" | "complete" };

    if (!data || !data.tenantName || !data.stateCode) {
      return NextResponse.json(
        { error: "Missing required filing kit data" },
        { status: 400 }
      );
    }

    const { uint8Array, filename } = await generateFilingKitPDF(data, tier || "standard");

    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": uint8Array.length.toString(),
      },
    });
  } catch (error) {
    console.error("Filing kit PDF generation error:", error);
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

    const formData = order.form_data as unknown as FilingKitData;
    const tier = (order.product_type as string)?.includes("complete") ? "complete" : "standard";

    if (!formData?.tenantName || !formData?.stateCode) {
      return NextResponse.json(
        { error: "Order data is incomplete" },
        { status: 400 }
      );
    }

    const { uint8Array, filename } = await generateFilingKitPDF(formData, tier);

    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": uint8Array.length.toString(),
      },
    });
  } catch (error) {
    console.error("Token-based filing kit PDF error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
