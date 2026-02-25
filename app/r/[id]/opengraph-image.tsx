import { ImageResponse } from "next/og";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "edge";
export const alt = "DepositReady - Security Deposit Recovery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();

  const { data: result } = await supabase
    .from("shared_results")
    .select("state_name, potential_recovery, days_past_deadline, landlord_in_violation, damages_multiplier, deposit_amount")
    .eq("id", id)
    .single();

  if (!result) {
    // Fallback generic image
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f4f8",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ fontSize: 48, fontWeight: 700, color: "#1e3a5f" }}>
            DepositReady
          </div>
          <div style={{ fontSize: 24, color: "#6b7280", marginTop: 16 }}>
            Check if your landlord owes you money
          </div>
        </div>
      ),
      { ...size }
    );
  }

  const recovery = Math.round(result.potential_recovery).toLocaleString();
  const deposit = Math.round(result.deposit_amount).toLocaleString();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top violation banner */}
        {result.landlord_in_violation && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#dc2626",
              color: "#ffffff",
              padding: "20px 40px",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase" as const,
            }}
          >
            LANDLORD VIOLATED {result.state_name.toUpperCase()} LAW
          </div>
        )}

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <div style={{ fontSize: 24, color: "#6b7280", marginBottom: 12 }}>
            {result.landlord_in_violation
              ? "Could recover up to"
              : "Security deposit analysis"}
          </div>
          <div
            style={{
              fontSize: 120,
              fontWeight: 800,
              color: result.landlord_in_violation ? "#059669" : "#92400e",
              lineHeight: 1,
            }}
          >
            ${recovery}
          </div>
          {result.landlord_in_violation && result.damages_multiplier > 1 && (
            <div style={{ fontSize: 22, color: "#059669", marginTop: 12 }}>
              ${deposit} deposit × {result.damages_multiplier}x statutory damages
            </div>
          )}
          {result.days_past_deadline && result.days_past_deadline > 0 && (
            <div style={{ fontSize: 22, color: "#dc2626", marginTop: 8 }}>
              {result.days_past_deadline} days past the legal deadline
            </div>
          )}
        </div>

        {/* Bottom CTA bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1e3a5f",
            color: "#ffffff",
            padding: "24px 40px",
            fontSize: 24,
            fontWeight: 600,
            gap: 16,
          }}
        >
          <span>Check yours free</span>
          <span style={{ opacity: 0.7 }}>→</span>
          <span style={{ opacity: 0.8 }}>depositready.co</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
