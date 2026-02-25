import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { buildCaseReviewPrompt, type MemoSections } from "@/lib/case-review/prompt";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    // Verify admin token
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");
    if (!token || token !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { caseReviewId } = await request.json();
    if (!caseReviewId) {
      return NextResponse.json(
        { error: "Missing caseReviewId" },
        { status: 400 }
      );
    }

    // Fetch case review data
    const { data: caseReview, error: fetchError } = await supabaseAdmin
      .from("case_reviews")
      .select("*")
      .eq("id", caseReviewId)
      .single();

    if (fetchError || !caseReview) {
      return NextResponse.json(
        { error: "Case review not found" },
        { status: 404 }
      );
    }

    if (caseReview.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Case review not paid" },
        { status: 400 }
      );
    }

    // Build prompt
    const { system, user } = buildCaseReviewPrompt({
      name: caseReview.name,
      email: caseReview.email,
      stateCode: caseReview.state_code,
      depositAmount: caseReview.deposit_amount,
      moveOutDate: caseReview.move_out_date,
      landlordName: caseReview.landlord_name,
      propertyAddress: caseReview.property_address,
      situationSummary: caseReview.situation_summary,
      landlordResponse: caseReview.landlord_response,
      communicationsHistory: caseReview.communications_history,
      deductionsDescribed: caseReview.deductions_described,
      primaryConcern: caseReview.primary_concern,
      desiredOutcome: caseReview.desired_outcome,
    });

    // Call Anthropic API
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY not configured" },
        { status: 503 }
      );
    }

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4096,
        system,
        messages: [{ role: "user", content: user }],
      }),
    });

    if (!anthropicRes.ok) {
      const errBody = await anthropicRes.text();
      console.error("Anthropic API error:", anthropicRes.status, errBody);
      return NextResponse.json(
        { error: "AI generation failed" },
        { status: 502 }
      );
    }

    const anthropicData = await anthropicRes.json();
    const rawText =
      anthropicData.content?.[0]?.type === "text"
        ? anthropicData.content[0].text
        : "";

    // Parse JSON from response (handle potential markdown code fences)
    let memoSections: MemoSections;
    try {
      const jsonStr = rawText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      memoSections = JSON.parse(jsonStr);
    } catch {
      console.error("Failed to parse AI response as JSON:", rawText.slice(0, 200));
      // Store raw response anyway for manual review
      await supabaseAdmin
        .from("case_reviews")
        .update({
          ai_response_raw: rawText,
          review_status: "generated",
          flagged_for_review: true,
        })
        .eq("id", caseReviewId);

      return NextResponse.json(
        { error: "AI response parsing failed — flagged for manual review" },
        { status: 422 }
      );
    }

    // Save to database
    const { error: updateError } = await supabaseAdmin
      .from("case_reviews")
      .update({
        ai_response_raw: rawText,
        memo_sections: memoSections,
        review_status: "generated",
      })
      .eq("id", caseReviewId);

    if (updateError) {
      console.error("Failed to save AI response:", updateError);
      return NextResponse.json(
        { error: "Failed to save generated memo" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      caseReviewId,
      sections: Object.keys(memoSections),
    });
  } catch (err) {
    console.error("Case review generation error:", err);
    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}
