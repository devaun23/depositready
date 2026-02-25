import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { supabaseAdmin } from "@/lib/supabase";
import {
  CaseReviewMemo,
  type CaseReviewMemoProps,
} from "@/components/pdf/CaseReviewMemo";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");
    if (!token) {
      return NextResponse.json(
        { error: "Missing download token" },
        { status: 400 }
      );
    }

    // Look up case review by download token
    const { data: caseReview, error: fetchError } = await supabaseAdmin
      .from("case_reviews")
      .select("*")
      .eq("download_token", token)
      .single();

    if (fetchError || !caseReview) {
      return NextResponse.json(
        { error: "Invalid or expired download link" },
        { status: 404 }
      );
    }

    if (caseReview.review_status !== "reviewed" && caseReview.review_status !== "delivered") {
      return NextResponse.json(
        { error: "Your case review is still being prepared" },
        { status: 403 }
      );
    }

    if (!caseReview.memo_sections) {
      return NextResponse.json(
        { error: "Memo not yet generated" },
        { status: 403 }
      );
    }

    // Build PDF props
    const memoProps: CaseReviewMemoProps = {
      name: caseReview.name,
      stateCode: caseReview.state_code,
      depositAmount: caseReview.deposit_amount,
      moveOutDate: caseReview.move_out_date,
      landlordName: caseReview.landlord_name,
      propertyAddress: caseReview.property_address,
      generatedDate: new Date(),
      founderNotes: caseReview.founder_notes,
      sections: caseReview.memo_sections,
    };

    // Render PDF
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfDocument = React.createElement(CaseReviewMemo, memoProps) as any;
    const pdfBuffer = await renderToBuffer(pdfDocument);
    const uint8Array = new Uint8Array(pdfBuffer);

    const dateSuffix = new Date().toISOString().split("T")[0];
    const filename = `DepositReady_CaseReview_${caseReview.state_code}_${dateSuffix}.pdf`;

    // Mark as delivered if not already
    if (caseReview.review_status !== "delivered") {
      await supabaseAdmin
        .from("case_reviews")
        .update({
          review_status: "delivered",
          delivered_at: new Date().toISOString(),
        })
        .eq("id", caseReview.id);
    }

    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": uint8Array.length.toString(),
      },
    });
  } catch (err) {
    console.error("Case review download error:", err);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
