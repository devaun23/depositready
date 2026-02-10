import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { PMDispositionPacket } from "@/components/pdf/PMDispositionPacket";
import type { PMFormData } from "@/types/pm";
import { supabaseAdmin } from "@/lib/supabase";
import { FLORIDA } from "@/lib/state-rules";
import React from "react";

export const runtime = "nodejs";
export const maxDuration = 30;

async function generatePMPDF(data: PMFormData) {
  const stateRules = FLORIDA; // FL-only for MVP

  const pdfDocument = React.createElement(PMDispositionPacket, {
    data,
    stateRules,
    generatedDate: new Date(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;

  const pdfBuffer = await renderToBuffer(pdfDocument);

  const sanitizedCompany = data.company.companyName.replace(/[^a-zA-Z0-9]/g, "_");
  const sanitizedAddress = data.property.address.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 30);
  const filename = `DepositDisposition_${sanitizedCompany}_${sanitizedAddress}_${new Date().toISOString().split("T")[0]}.pdf`;

  const uint8Array = new Uint8Array(pdfBuffer);
  return { uint8Array, filename };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = body as PMFormData;

    if (!data?.company?.managerName || !data?.tenant?.name || !data?.property?.address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { uint8Array, filename } = await generatePMPDF(data);

    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": uint8Array.length.toString(),
      },
    });
  } catch (error) {
    console.error("PM PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

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
      .eq("product_type", "pm")
      .single();

    if (lookupError || !order) {
      console.error("PM token lookup failed:", lookupError);
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

    const formData = order.form_data as unknown as PMFormData;

    if (!formData?.company?.managerName || !formData?.tenant?.name) {
      return NextResponse.json(
        { error: "Order data is incomplete" },
        { status: 400 }
      );
    }

    const { uint8Array, filename } = await generatePMPDF(formData);

    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": uint8Array.length.toString(),
      },
    });
  } catch (error) {
    console.error("Token-based PM PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
