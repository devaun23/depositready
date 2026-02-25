import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendCaseReviewDeliveryEmail, isEmailConfigured } from "@/lib/email";

export const runtime = "nodejs";

function verifyToken(request: NextRequest): boolean {
  const token = request.nextUrl.searchParams.get("token");
  return !!token && token === process.env.ADMIN_SECRET;
}

// GET — list case reviews with optional status filter
export async function GET(request: NextRequest) {
  if (!verifyToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = request.nextUrl.searchParams.get("status");
  const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
  const perPage = 20;

  let query = supabaseAdmin
    .from("case_reviews")
    .select("id, created_at, name, email, state_code, deposit_amount, primary_concern, review_status, payment_status, flagged_for_review", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * perPage, page * perPage - 1);

  if (status) {
    query = query.eq("review_status", status);
  }

  // Only show paid cases
  query = query.eq("payment_status", "paid");

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }

  return NextResponse.json({
    reviews: data || [],
    total: count || 0,
    totalPages: Math.ceil((count || 0) / perPage),
    page,
  });
}

// POST — actions: generate, update_notes, approve_deliver
export async function POST(request: NextRequest) {
  if (!verifyToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { action, caseReviewId } = body;

  if (!caseReviewId || !action) {
    return NextResponse.json({ error: "Missing action or caseReviewId" }, { status: 400 });
  }

  switch (action) {
    case "get_detail": {
      const { data, error } = await supabaseAdmin
        .from("case_reviews")
        .select("*")
        .eq("id", caseReviewId)
        .single();

      if (error || !data) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      return NextResponse.json({ review: data });
    }

    case "generate": {
      // Trigger AI generation by calling the generate endpoint
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://depositready.co";
      const token = process.env.ADMIN_SECRET;

      const res = await fetch(`${baseUrl}/api/case-review/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ caseReviewId }),
      });

      const result = await res.json();
      if (!res.ok) {
        return NextResponse.json({ error: result.error || "Generation failed" }, { status: res.status });
      }

      return NextResponse.json({ success: true, message: "Memo generated" });
    }

    case "update_notes": {
      const { founderNotes } = body;

      const { error } = await supabaseAdmin
        .from("case_reviews")
        .update({ founder_notes: founderNotes || null })
        .eq("id", caseReviewId);

      if (error) {
        return NextResponse.json({ error: "Failed to update notes" }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    case "approve_deliver": {
      // Mark as reviewed
      const { error: updateError } = await supabaseAdmin
        .from("case_reviews")
        .update({
          review_status: "reviewed",
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", caseReviewId);

      if (updateError) {
        return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
      }

      // Get case data for email
      const { data: caseReview } = await supabaseAdmin
        .from("case_reviews")
        .select("email, name, download_token, state_code")
        .eq("id", caseReviewId)
        .single();

      if (caseReview && isEmailConfigured()) {
        await sendCaseReviewDeliveryEmail({
          email: caseReview.email,
          name: caseReview.name,
          downloadToken: caseReview.download_token,
          stateCode: caseReview.state_code,
        });
      }

      return NextResponse.json({ success: true, message: "Approved and email sent" });
    }

    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
}
