"use client";

import { useEffect, useState, useRef } from "react";
import { trackConversion } from "@/lib/pixels";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export interface PaymentDetails {
  customerEmail: string | null;
  amountPaid: number;
  downloadToken: string | null;
  orderId: string | null;
  productType: string | null;
}

type TrackingStatus = "loading" | "verified" | "error";

interface ConversionTrackingResult {
  status: TrackingStatus;
  paymentDetails: PaymentDetails | null;
  error: string | null;
}

function waitForGtag(timeout = 5000): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      if (typeof window !== "undefined" && window.gtag) {
        resolve();
      } else if (Date.now() - start > timeout) {
        reject(new Error("gtag not available"));
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  });
}

export function useConversionTracking(
  sessionId: string | null
): ConversionTrackingResult {
  const [status, setStatus] = useState<TrackingStatus>("loading");
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const hasFired = useRef(false);

  useEffect(() => {
    if (!sessionId || hasFired.current) {
      if (!sessionId) {
        setStatus("error");
        setError("Missing session ID");
      }
      return;
    }
    hasFired.current = true;

    async function verifyAndTrack() {
      try {
        const response = await fetch(
          `/api/verify-payment?session_id=${sessionId}`
        );

        if (!response.ok) {
          throw new Error("Payment verification failed");
        }

        const result = await response.json();

        if (!result.paid) {
          setStatus("error");
          setError("Payment not confirmed");
          return;
        }

        const details: PaymentDetails = {
          customerEmail: result.customerEmail,
          amountPaid: result.amountTotal / 100,
          downloadToken: result.downloadToken,
          orderId: result.metadata?.order_id || null,
          productType: result.metadata?.product_type || null,
        };
        setPaymentDetails(details);
        setStatus("verified");

        // Fire all conversion events
        try {
          await waitForGtag();

          window.gtag?.("event", "conversion", {
            send_to: "AW-17859927660/jtPRCJKB9N4bEOy8o8RC",
            value: details.amountPaid,
            currency: "USD",
            transaction_id: sessionId,
          });

          window.gtag?.("event", "payment_completed", {
            event_category: "conversion",
            transaction_id: sessionId,
            value: details.amountPaid,
            currency: "USD",
            product_type: details.productType,
          });

          trackConversion("Purchase", {
            value: details.amountPaid,
            currency: "USD",
            content_type: details.productType,
          });
        } catch (err) {
          console.error("[Conversion] Failed to fire conversion:", err);
        }
      } catch (err) {
        console.error("Payment verification error:", err);
        setStatus("error");
        setError(
          err instanceof Error ? err.message : "Payment verification failed"
        );
      }
    }

    verifyAndTrack();
  }, [sessionId]);

  return { status, paymentDetails, error };
}
