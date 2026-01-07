import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { FullPacket } from "@/components/pdf/FullPacket";
import { WizardData } from "@/types/dispute";
import React from "react";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data } = body as { data: WizardData; token?: string };

    // Validate required fields
    if (!data || !data.tenant?.name || !data.landlord?.name) {
      return NextResponse.json(
        { error: "Missing required wizard data" },
        { status: 400 }
      );
    }

    // Generate the PDF
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfDocument = React.createElement(FullPacket, {
      data,
      generatedDate: new Date(),
    }) as any;

    const pdfBuffer = await renderToBuffer(pdfDocument);

    // Create filename
    const sanitizedName = data.tenant.name.replace(/[^a-zA-Z0-9]/g, "_");
    const filename = `DepositReady_${sanitizedName}_${new Date().toISOString().split("T")[0]}.pdf`;

    // Return the PDF - convert Buffer to Uint8Array for NextResponse
    const uint8Array = new Uint8Array(pdfBuffer);
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

// Also support GET with token for download links
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Download token required" },
      { status: 400 }
    );
  }

  // TODO: Look up token in Supabase, verify payment, get wizard data
  // For now, return error since we don't have Supabase connected yet
  return NextResponse.json(
    { error: "Token-based downloads not yet implemented. Complete Supabase integration first." },
    { status: 501 }
  );
}
