"use client";

import { useState } from "react";
import type { PurchaseOffer } from "./ChatContext";
import { useChat } from "./ChatContext";

const PRODUCT_DETAILS: Record<string, { icon: string; color: string }> = {
  demand_letter: { icon: "📄", color: "border-accent" },
  legal_packet: { icon: "📋", color: "border-brand" },
  case_review: { icon: "🔍", color: "border-amber-400" },
};

interface PurchaseCardProps {
  offer: PurchaseOffer;
}

export function PurchaseCard({ offer }: PurchaseCardProps) {
  const [loading, setLoading] = useState(false);
  const { sessionToken } = useChat();
  const details = PRODUCT_DETAILS[offer.product] || PRODUCT_DETAILS.demand_letter;

  const handlePurchase = async () => {
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
    <div
      className={`rounded-xl border-2 ${details.color} bg-white p-4 shadow-sm animate-fadeIn`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{details.icon}</span>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm">
            {offer.headline}
          </h3>
          <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
            {offer.description}
          </p>
        </div>
      </div>
      <button
        onClick={handlePurchase}
        disabled={loading}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent/90 hover:shadow-md disabled:opacity-50 min-h-[44px]"
      >
        {loading ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <>
            Get for ${(offer.price / 100).toFixed(0)}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
}
