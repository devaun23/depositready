import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { LandlordResponseKit } from "@/components/pdf/LandlordResponseKit";
import type { LandlordFormData } from "@/types/landlord";
import { supabaseAdmin } from "@/lib/supabase";
import { getStateRulesByCode, FLORIDA } from "@/lib/state-rules";
import React from "react";

export const runtime = "nodejs";
export const maxDuration = 30;

async function generateLandlordPDF(data: LandlordFormData, landlordName: string) {
  // Get state rules (default to Florida if not specified)
  const stateRules = data.stateCode
    ? getStateRulesByCode(data.stateCode)
    : FLORIDA;

  const pdfDocument = React.createElement(LandlordResponseKit, {
    data,
    stateRules,
    generatedDate: new Date(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;

  const pdfBuffer = await renderToBuffer(pdfDocument);

  // Create filename
  const sanitizedName = landlordName.replace(/[^a-zA-Z0-9]/g, "_");
  const filename = `LandlordResponseKit_${sanitizedName}_${new Date().toISOString().split("T")[0]}.pdf`;

  // Return the PDF - convert Buffer to Uint8Array for NextResponse
  const uint8Array = new Uint8Array(pdfBuffer);

  return { uint8Array, filename };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = body as LandlordFormData;

    // Validate required fields
    if (!data || !data.landlord?.name || !data.tenant?.name || !data.stateCode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { uint8Array, filename } = await generateLandlordPDF(data, data.landlord.name);

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
      .eq("product_type", "landlord")
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

    // Cast form_data to LandlordFormData
    const formData = order.form_data as unknown as LandlordFormData;

    // Validate form data has required fields
    if (!formData?.landlord?.name || !formData?.tenant?.name) {
      return NextResponse.json(
        { error: "Order data is incomplete" },
        { status: 400 }
      );
    }

    // Generate and return the PDF
    const { uint8Array, filename } = await generateLandlordPDF(
      formData,
      formData.landlord.name
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
    console.error("Token-based landlord PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
