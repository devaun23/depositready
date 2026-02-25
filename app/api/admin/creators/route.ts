import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

function isAuthorized(request: NextRequest): boolean {
  const token = request.nextUrl.searchParams.get("token");
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret || !token) return false;
  return token === adminSecret;
}

interface LeadRow {
  creator_code: string;
  utm_source: string | null;
  created_at: string;
}

interface OrderRow {
  creator_code: string;
  deposit_amount: number | null;
  amount_withheld: number | null;
  created_at: string;
}

interface CreatorStats {
  creator_code: string;
  leads: number;
  sales: number;
  revenue: number;
  conversion_rate: number;
  platforms: Record<string, number>;
  first_seen: string;
  last_seen: string;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch leads with a creator_code
    const { data: leads, error: leadsError } = await supabaseAdmin
      .from("leads")
      .select("creator_code, utm_source, created_at")
      .not("creator_code", "is", null);

    if (leadsError) {
      console.error("Failed to fetch leads:", leadsError);
      return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
    }

    // Fetch orders with a creator_code
    const { data: orders, error: ordersError } = await supabaseAdmin
      .from("orders")
      .select("creator_code, deposit_amount, amount_withheld, created_at")
      .not("creator_code", "is", null)
      .eq("payment_status", "paid");

    if (ordersError) {
      console.error("Failed to fetch orders:", ordersError);
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }

    // Aggregate by creator_code
    const creatorMap = new Map<string, CreatorStats>();

    for (const lead of (leads || []) as LeadRow[]) {
      const code = lead.creator_code;
      if (!creatorMap.has(code)) {
        creatorMap.set(code, {
          creator_code: code,
          leads: 0,
          sales: 0,
          revenue: 0,
          conversion_rate: 0,
          platforms: {},
          first_seen: lead.created_at,
          last_seen: lead.created_at,
        });
      }

      const stats = creatorMap.get(code)!;
      stats.leads++;

      const platform = lead.utm_source || "unknown";
      stats.platforms[platform] = (stats.platforms[platform] || 0) + 1;

      if (lead.created_at < stats.first_seen) stats.first_seen = lead.created_at;
      if (lead.created_at > stats.last_seen) stats.last_seen = lead.created_at;
    }

    for (const order of (orders || []) as OrderRow[]) {
      const code = order.creator_code;
      if (!creatorMap.has(code)) {
        creatorMap.set(code, {
          creator_code: code,
          leads: 0,
          sales: 0,
          revenue: 0,
          conversion_rate: 0,
          platforms: {},
          first_seen: order.created_at,
          last_seen: order.created_at,
        });
      }

      const stats = creatorMap.get(code)!;
      stats.sales++;
      stats.revenue += order.amount_withheld || order.deposit_amount || 0;

      if (order.created_at < stats.first_seen) stats.first_seen = order.created_at;
      if (order.created_at > stats.last_seen) stats.last_seen = order.created_at;
    }

    // Calculate conversion rates
    const creators = Array.from(creatorMap.values()).map((c) => ({
      ...c,
      conversion_rate: c.leads > 0 ? Math.round((c.sales / c.leads) * 1000) / 10 : 0,
      first_seen: c.first_seen.split("T")[0],
      last_seen: c.last_seen.split("T")[0],
    }));

    // Sort by leads descending
    creators.sort((a, b) => b.leads - a.leads);

    return NextResponse.json({ creators });
  } catch (error) {
    console.error("Admin creators error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
