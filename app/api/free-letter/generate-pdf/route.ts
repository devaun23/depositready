import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { FreeLetter } from "@/components/pdf/FreeLetter";
import type { StateCode } from "@/lib/state-rules";
import React from "react";

export const runtime = "nodejs";
export const maxDuration = 30;

interface FreeLetterPDFRequest {
  landlordName?: string;
  stateCode: StateCode;
  stateName: string;
  statuteTitle: string;
  depositAmount: number;
  moveOutDate: string;
  returnDeadline: string;
  deadlinePassed: boolean;
  damagesMultiplier: number;
  damagesDescription: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: FreeLetterPDFRequest = await request.json();

    // Validate required fields
    if (!body.stateCode || !body.stateName || !body.depositAmount || !body.moveOutDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate the PDF
    const pdfDocument = React.createElement(FreeLetter, {
      landlordName: body.landlordName,
      stateCode: body.stateCode,
      stateName: body.stateName,
      statuteTitle: body.statuteTitle,
      depositAmount: body.depositAmount,
      moveOutDate: body.moveOutDate,
      returnDeadline: body.returnDeadline,
      deadlinePassed: body.deadlinePassed,
      damagesMultiplier: body.damagesMultiplier,
      damagesDescription: body.damagesDescription,
      generatedDate: new Date(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;

    const pdfBuffer = await renderToBuffer(pdfDocument);
    const uint8Array = new Uint8Array(pdfBuffer);

    // Create filename
    const stateSuffix = body.stateCode.toUpperCase();
    const dateSuffix = new Date().toISOString().split("T")[0];
    const filename = `DepositReady_FreeLetter_${stateSuffix}_${dateSuffix}.pdf`;

    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": uint8Array.length.toString(),
      },
    });
  } catch (error) {
    console.error("Free letter PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
