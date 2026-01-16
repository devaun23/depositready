import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Update upsell_clicked_at for the most recent entry with this email
    const { error: dbError } = await supabaseAdmin
      .from("free_letters")
      .update({ upsell_clicked_at: new Date().toISOString() })
      .eq("email", email.toLowerCase().trim())
      .is("upsell_clicked_at", null)
      .order("created_at", { ascending: false })
      .limit(1);

    if (dbError) {
      console.error("Failed to update upsell click:", dbError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Upsell tracking error:", error);
    return NextResponse.json({ success: true }); // Don't fail silently
  }
}
