import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      page_path,
      trigger_type,
      session_id,
      sentiment,
      rating,
      helpful,
      confusion_area,
      what_looking_for,
      improvement_suggestion,
      email,
      user_agent,
      screen_width,
      page_context,
    } = body;

    if (!page_path || !trigger_type) {
      return NextResponse.json(
        { error: "page_path and trigger_type are required" },
        { status: 400 }
      );
    }

    const validTriggers = ["floating_button", "inline_pulse", "exit_survey"];
    if (!validTriggers.includes(trigger_type)) {
      return NextResponse.json(
        { error: "Invalid trigger_type" },
        { status: 400 }
      );
    }

    if (rating !== undefined && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const { error: dbError } = await supabaseAdmin
      .from("feedback")
      .insert({
        page_path,
        trigger_type,
        session_id: session_id || null,
        sentiment: sentiment || null,
        rating: rating || null,
        helpful: helpful ?? null,
        confusion_area: confusion_area || null,
        what_looking_for: what_looking_for || null,
        improvement_suggestion: improvement_suggestion || null,
        email: email || null,
        user_agent: user_agent || null,
        screen_width: screen_width || null,
        page_context: page_context || null,
      });

    if (dbError) {
      console.error("Failed to save feedback:", dbError);
      return NextResponse.json(
        { error: "Failed to save feedback" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 }
    );
  }
}
