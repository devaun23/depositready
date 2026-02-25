import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

function isAuthorized(request: NextRequest): boolean {
  const token = request.nextUrl.searchParams.get("token");
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret || !token) return false;
  return token === adminSecret;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);
  const limit = 50;
  const offset = (page - 1) * limit;

  const filterPage = request.nextUrl.searchParams.get("filter_page") || null;
  const filterSentiment = request.nextUrl.searchParams.get("filter_sentiment") || null;
  const filterTrigger = request.nextUrl.searchParams.get("filter_trigger") || null;

  try {
    let query = supabaseAdmin
      .from("feedback")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (filterPage) {
      query = query.ilike("page_path", `%${filterPage}%`);
    }
    if (filterSentiment) {
      query = query.eq("sentiment", filterSentiment);
    }
    if (filterTrigger) {
      query = query.eq("trigger_type", filterTrigger);
    }

    const { data, count, error } = await query;

    if (error) {
      console.error("Failed to fetch feedback:", error);
      return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 });
    }

    return NextResponse.json({
      feedback: data || [],
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error("Admin feedback error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
