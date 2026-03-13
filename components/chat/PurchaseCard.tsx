"use client";

import { useState, useEffect, useRef } from "react";
import type { PurchaseOffer } from "./ChatContext";
import { useChat } from "./ChatContext";
import { DocumentPreview } from "./DocumentPreview";

const PRODUCT_LABELS: Record<string, string> = {
  demand_letter: "Demand Letter",
  legal_packet: "Legal Packet",
  case_review: "Case Review",
};

interface PurchaseCardProps {
  offer: PurchaseOffer;
}

export function PurchaseCard({ offer }: PurchaseCardProps) {
  const [loading, setLoading] = useState(false);
  const { sessionToken } = useChat();
  const checkoutUrlRef = useRef<string | null>(null);
  const [prefetched, setPrefetched] = useState(false);

  const stateAbbr = offer.stateName
    ? offer.stateName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : null;
  const productLabel = PRODUCT_LABELS[offer.product] || "Document";
  const priceFormatted = `$${(offer.price / 100).toFixed(0)}`;
  const ctaText = stateAbbr
    ? `Get Your ${stateAbbr} ${productLabel} — ${priceFormatted}`
    : `Get Your ${productLabel} — ${priceFormatted}`;

  // Prefetch checkout URL on mount
  useEffect(() => {
    const prefetch = async () => {
      try {
        const res = await fetch("/api/chat/purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product: offer.product,
            sessionToken,
          }),
        });
        const data = await res.json();
        if (data.url) checkoutUrlRef.current = data.url;
      } catch {
        // Fallback to on-click fetch
      } finally {
        setPrefetched(true);
      }
    };
    prefetch();
  }, [offer.product, sessionToken]);

  const handlePurchase = async () => {
    if (checkoutUrlRef.current) {
      window.location.href = checkoutUrlRef.current;
      return;
    }
    // Fallback: fetch on click if prefetch failed
    setLoading(true);
    try {
      const res = await fetch("/api/chat/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: offer.product,
          sessionToken,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-md overflow-hidden animate-fadeIn">
      {/* ── Zone 1: Personalized header ──────────────────────── */}
      <div className="bg-brand/5 border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">📄</span>
          <div>
            <h3 className="font-semibold text-sm text-gray-900">
              Your {offer.stateName || ""} {productLabel}
            </h3>
            {offer.recoveryAmount && (
              <p className="text-xs text-accent font-medium animate-value-pulse">
                Recover up to ${offer.recoveryAmount.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Zone 2: Document preview ─────────────────────────── */}
      <div className="px-4 pt-3 pb-2">
        <DocumentPreview
          product={offer.product}
          stateName={offer.stateName}
          statute={offer.statute}
        />
      </div>

      {/* ── Zone 3: Feature checklist ────────────────────────── */}
      {offer.features.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-100">
          <ul className="space-y-1.5">
            {offer.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                <svg
                  className="h-3.5 w-3.5 mt-0.5 shrink-0 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Zone 4: CTA button ───────────────────────────────── */}
      <div className="px-4 pt-2 pb-3">
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent/90 hover:shadow-md disabled:opacity-50 min-h-[44px]"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Preparing your secure checkout...
            </span>
          ) : (
            <>
              {ctaText}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </div>

      {/* ── Zone 5: Trust footer ─────────────────────────────── */}
      <div className="border-t border-gray-100 bg-gray-50/50 px-4 py-2.5">
        <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure checkout
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Instant download
          </span>
          <span className="flex items-center gap-1">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            7-day money-back
          </span>
        </div>
        <p className="mt-1.5 text-center text-[10px] leading-relaxed text-gray-400">
          Documents are based on general state law and do not constitute legal advice.
        </p>
      </div>
    </div>
  );
}
