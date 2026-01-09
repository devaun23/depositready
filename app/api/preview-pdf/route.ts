import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { PreviewPacket } from "@/components/pdf/PreviewPacket";
import React from "react";

// Cache the preview PDF in memory (it's static content)
let cachedPdfBuffer: Uint8Array | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

async function getPreviewPDF(): Promise<Uint8Array> {
  const now = Date.now();

  // Return cached version if valid
  if (cachedPdfBuffer && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedPdfBuffer;
  }

  // Generate new preview PDF
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfDocument = React.createElement(PreviewPacket) as any;
  const pdfBuffer = await renderToBuffer(pdfDocument);

  // Cache the result
  cachedPdfBuffer = new Uint8Array(pdfBuffer);
  cacheTimestamp = now;

  return cachedPdfBuffer;
}

export async function GET() {
  try {
    const uint8Array = await getPreviewPDF();

    return new NextResponse(Buffer.from(uint8Array), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=\"DepositReady_Preview.pdf\"",
        "Content-Length": uint8Array.length.toString(),
        // Cache headers for CDN/browser
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Preview PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate preview PDF" },
      { status: 500 }
    );
  }
}

// Also support POST for consistency, but return same static preview
export async function POST() {
  return GET();
}
