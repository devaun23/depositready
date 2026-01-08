import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { FullPacket } from "@/components/pdf/FullPacket";
import { WizardData } from "@/types/dispute";
import { supabaseAdmin } from "@/lib/supabase";
import { getStateRulesByCode, FLORIDA } from "@/lib/state-rules";
import React from "react";

async function generatePDF(data: WizardData, tenantName: string) {
  // Get state rules (default to Florida if not specified)
  const stateRules = data.stateCode
    ? getStateRulesByCode(data.stateCode)
    : FLORIDA;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfDocument = React.createElement(FullPacket, {
    data,
    stateRules,
    generatedDate: new Date(),
  }) as any;

  const pdfBuffer = await renderToBuffer(pdfDocument);

  // Create filename
  const sanitizedName = tenantName.replace(/[^a-zA-Z0-9]/g, "_");
  const filename = `DepositReady_${sanitizedName}_${new Date().toISOString().split("T")[0]}.pdf`;

  // Return the PDF - convert Buffer to Uint8Array for NextResponse
  const uint8Array = new Uint8Array(pdfBuffer);

  return { uint8Array, filename };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data } = body as { data: WizardData };

    // Validate required fields
    if (!data || !data.tenant?.name || !data.landlord?.name) {
      return NextResponse.json(
        { error: "Missing required wizard data" },
        { status: 400 }
      );
    }

    const { uint8Array, filename } = await generatePDF(data, data.tenant.name);

    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": uint8Array.length.toString(),
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}

// Support GET with token for download links
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
    // Look up order by download token
    const { data: order, error: lookupError } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("download_token", token)
      .single();

    if (lookupError || !order) {
      console.error("Token lookup failed:", lookupError);
      return NextResponse.json(
        { error: "Invalid or expired download token" },
        { status: 404 }
      );
    }

    // Verify payment status
    if (order.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed for this order" },
        { status: 403 }
      );
    }

    // Cast form_data to WizardData
    const formData = order.form_data as unknown as WizardData;

    // Validate form data has required fields
    if (!formData?.tenant?.name || !formData?.landlord?.name) {
      return NextResponse.json(
        { error: "Order data is incomplete" },
        { status: 400 }
      );
    }

    // Generate and return the PDF
    const { uint8Array, filename } = await generatePDF(
      formData,
      formData.tenant.name
    );

    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": uint8Array.length.toString(),
      },
    });
  } catch (error) {
    console.error("Token-based PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
