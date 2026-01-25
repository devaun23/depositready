import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

interface CheckResult {
  name: string;
  passed: boolean;
  details: string;
}

async function checkStripeConnection(): Promise<{ success: boolean; accountId?: string; error?: string }> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return { success: false, error: "STRIPE_SECRET_KEY is not set" };

  try {
    const response = await fetch("https://api.stripe.com/v1/balance", {
      headers: { Authorization: `Bearer ${key}` },
    });
    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.error?.message || "API error" };
    }
    return { success: true, accountId: "Connected (balance check passed)" };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function GET() {
  const checks: CheckResult[] = [];

  // Check 1: STRIPE_SECRET_KEY is set and valid
  const stripeCheck = await checkStripeConnection();
  checks.push({
    name: "Stripe API Key",
    passed: stripeCheck.success,
    details: stripeCheck.success
      ? stripeCheck.accountId!
      : `Stripe API error: ${stripeCheck.error}`,
  });

  // Check 2: STRIPE_WEBHOOK_SECRET is set
  checks.push({
    name: "Stripe Webhook Secret",
    passed: !!process.env.STRIPE_WEBHOOK_SECRET,
    details: process.env.STRIPE_WEBHOOK_SECRET
      ? "STRIPE_WEBHOOK_SECRET is configured"
      : "STRIPE_WEBHOOK_SECRET is not set",
  });

  // Check 3: NEXT_PUBLIC_BASE_URL points to production
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const isProduction = baseUrl.includes("depositready.co");
  checks.push({
    name: "Production Base URL",
    passed: isProduction,
    details: isProduction
      ? `Base URL is set to production: ${baseUrl}`
      : `Base URL is not production: ${baseUrl || "(not set)"}`,
  });

  // Check 4: Supabase connection works
  try {
    const { error } = await supabaseAdmin.from("orders").select("id").limit(1);
    if (error) throw error;
    checks.push({
      name: "Supabase Connection",
      passed: true,
      details: "Successfully connected to Supabase",
    });
  } catch (error) {
    checks.push({
      name: "Supabase Connection",
      passed: false,
      details: `Supabase error: ${error instanceof Error ? error.message : "Unknown error"}`,
    });
  }

  // Check 5: Can insert/delete test order
  let testOrderId: string | null = null;
  try {
    const { data: order, error: insertError } = await supabaseAdmin
      .from("orders")
      .insert({
        email: "test@checkout-flow-test.local",
        tenant_name: "TEST_CHECKOUT_FLOW",
        property_address: "123 Test Street",
        deposit_amount: 0,
        form_data: { test: true },
        download_token: "test-token-" + Date.now(),
        payment_status: "pending",
      })
      .select()
      .single();

    if (insertError) throw insertError;
    testOrderId = order.id;

    // Clean up immediately
    const { error: deleteError } = await supabaseAdmin
      .from("orders")
      .delete()
      .eq("id", testOrderId);

    if (deleteError) throw deleteError;

    checks.push({
      name: "Order Insert/Delete",
      passed: true,
      details: "Successfully created and deleted test order",
    });
  } catch (error) {
    // Try to clean up if insert succeeded but delete failed
    if (testOrderId) {
      await supabaseAdmin.from("orders").delete().eq("id", testOrderId);
    }
    checks.push({
      name: "Order Insert/Delete",
      passed: false,
      details: `Order test error: ${error instanceof Error ? error.message : "Unknown error"}`,
    });
  }

  // Check 6: orders table has product_type column (check via free_letters or infer from schema)
  try {
    const { error } = await supabaseAdmin.from("free_letters").select("id").limit(1);
    checks.push({
      name: "Free Letters Table",
      passed: !error,
      details: error
        ? `free_letters table error: ${error.message}`
        : "free_letters table exists and is accessible",
    });
  } catch (error) {
    checks.push({
      name: "Free Letters Table",
      passed: false,
      details: `free_letters check error: ${error instanceof Error ? error.message : "Unknown error"}`,
    });
  }

  // Check 7: Email configuration
  const emailConfigured = !!(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
  checks.push({
    name: "Email Configuration",
    passed: emailConfigured,
    details: emailConfigured
      ? "Resend email is configured"
      : "Email not configured (RESEND_API_KEY or RESEND_FROM_EMAIL missing)",
  });

  // Summary
  const allPassed = checks.every((c) => c.passed);
  const passedCount = checks.filter((c) => c.passed).length;

  return NextResponse.json({
    success: allPassed,
    summary: `${passedCount}/${checks.length} checks passed`,
    checks,
    timestamp: new Date().toISOString(),
  });
}
