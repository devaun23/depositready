/**
 * Minimal Stripe API client using fetch
 * Used as a workaround for Stripe SDK connection issues in Vercel serverless
 */

import * as nodeCrypto from "crypto";

const STRIPE_API_BASE = "https://api.stripe.com/v1";

interface StripeCheckoutSessionParams {
  payment_method_types: string[];
  mode: string;
  line_items: Array<{
    price_data: {
      currency: string;
      product_data: {
        name: string;
        description?: string;
      };
      unit_amount: number;
    };
    quantity: number;
  }>;
  metadata?: Record<string, string>;
  success_url: string;
  cancel_url: string;
  customer_email?: string;
  allow_promotion_codes?: boolean;
}

interface StripeCheckoutSession {
  id: string;
  url: string;
  payment_status: string;
  amount_total: number;
  customer_email: string | null;
  metadata: Record<string, string>;
  payment_intent?: string | { id: string };
}

function getApiKey(): string {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
  return key;
}

// Convert nested object to x-www-form-urlencoded format (Stripe API format)
function toFormUrlEncoded(obj: Record<string, unknown>, prefix = ""): string {
  const pairs: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}[${key}]` : key;

    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
          pairs.push(toFormUrlEncoded(item as Record<string, unknown>, `${fullKey}[${index}]`));
        } else {
          pairs.push(`${encodeURIComponent(`${fullKey}[${index}]`)}=${encodeURIComponent(String(item))}`);
        }
      });
    } else if (typeof value === "object") {
      pairs.push(toFormUrlEncoded(value as Record<string, unknown>, fullKey));
    } else {
      pairs.push(`${encodeURIComponent(fullKey)}=${encodeURIComponent(String(value))}`);
    }
  }

  return pairs.filter(Boolean).join("&");
}

async function stripeRequest<T>(
  method: "GET" | "POST",
  endpoint: string,
  body?: Record<string, unknown>
): Promise<T> {
  const url = `${STRIPE_API_BASE}${endpoint}`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${getApiKey()}`,
  };

  const options: RequestInit = { method, headers };

  if (body && method === "POST") {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    options.body = toFormUrlEncoded(body);
  }

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || `Stripe API error: ${response.status}`);
  }

  return data as T;
}

export const stripeFetch = {
  checkout: {
    sessions: {
      async create(params: StripeCheckoutSessionParams): Promise<StripeCheckoutSession> {
        return stripeRequest<StripeCheckoutSession>("POST", "/checkout/sessions", params as unknown as Record<string, unknown>);
      },
      async retrieve(sessionId: string): Promise<StripeCheckoutSession> {
        return stripeRequest<StripeCheckoutSession>("GET", `/checkout/sessions/${sessionId}`);
      },
    },
  },
};

export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): { type: string; data: { object: StripeCheckoutSession } } {
  // Stripe webhook signature verification
  // Format: t=timestamp,v1=signature,v1=signature2...
  const parts = signature.split(",");
  const timestamp = parts.find((p) => p.startsWith("t="))?.slice(2);
  const signatures = parts.filter((p) => p.startsWith("v1=")).map((p) => p.slice(3));

  if (!timestamp || signatures.length === 0) {
    throw new Error("Invalid signature format");
  }

  // Check timestamp (within 5 minutes)
  const timestampNum = parseInt(timestamp, 10);
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestampNum) > 300) {
    throw new Error("Timestamp outside tolerance zone");
  }

  // Compute expected signature
  const signedPayload = `${timestamp}.${payload}`;

  // Use node crypto for sync HMAC-SHA256 verification
  const expectedSig = nodeCrypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");

  const isValid = signatures.some((sig) => {
    try {
      return nodeCrypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig));
    } catch {
      return false;
    }
  });

  if (!isValid) {
    throw new Error("Webhook signature verification failed");
  }

  return JSON.parse(payload);
}
