"use client";

import Link from "next/link";
import type { CaseStrength } from "@/lib/state-rules";
import type { AuditResult } from "@/lib/landlord/types";

interface ProductRecommendationProps {
  role: "tenant" | "landlord";
  hasViolation: boolean;
  caseStrength: CaseStrength;
  potentialRecovery: number;
  auditResult: AuditResult | null;
}

interface ProductCTA {
  label: string;
  description: string;
  href: string;
  primary: boolean;
  price?: string;
}

export function ProductRecommendation({
  role,
  hasViolation,
  caseStrength,
  potentialRecovery,
  auditResult,
}: ProductRecommendationProps) {
  const products = getRecommendedProducts(role, hasViolation, caseStrength, potentialRecovery, auditResult);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">Recommended next steps</h3>
      {products.map((p, i) => (
        <Link
          key={i}
          href={p.href}
          className={`block p-4 rounded-xl border-2 transition-all duration-200 hover:-translate-y-0.5 ${
            p.primary
              ? "border-accent bg-accent-light hover:shadow-md"
              : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-card-hover"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-semibold text-sm ${p.primary ? "text-accent" : "text-gray-900"}`}>
                {p.label}
              </p>
              <p className="text-xs text-gray-600 mt-0.5">{p.description}</p>
            </div>
            {p.price && (
              <span className="text-sm font-medium text-gray-500">{p.price}</span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

function getRecommendedProducts(
  role: "tenant" | "landlord",
  hasViolation: boolean,
  caseStrength: CaseStrength,
  potentialRecovery: number,
  auditResult: AuditResult | null
): ProductCTA[] {
  if (role === "tenant") {
    if (hasViolation && caseStrength === "STRONG") {
      return [
        {
          label: "Small Claims Filing Kit",
          description: "Court-ready filing documents with state-specific instructions",
          href: "/filing-kit",
          primary: true,
          price: "From $79",
        },
        {
          label: "Recovery Kit",
          description: "Professional demand letter with legal analysis",
          href: "/wizard",
          primary: false,
          price: "From $29",
        },
      ];
    }
    if (hasViolation && caseStrength === "MODERATE") {
      return [
        {
          label: "Recovery Letter",
          description: "Formal demand letter citing your state's statute",
          href: "/wizard",
          primary: true,
          price: "From $29",
        },
        {
          label: "Small Claims Filing Kit",
          description: "If your landlord doesn't respond",
          href: "/filing-kit",
          primary: false,
          price: "From $79",
        },
      ];
    }
    // No violation or weak case
    return [
      {
        label: "Chat with Insight",
        description: "Free AI analysis of your specific situation",
        href: "/chat",
        primary: true,
        price: "Free",
      },
      {
        label: "Personalized Case Review",
        description: "Expert assessment with step-by-step action plan",
        href: "/case-review",
        primary: false,
        price: "$149",
      },
    ];
  }

  // Landlord
  const hasComplianceGaps = auditResult && auditResult.overallStatus !== "compliant";

  if (hasComplianceGaps) {
    return [
      {
        label: "Compliance Kit",
        description: "Fix compliance gaps before they become costly disputes",
        href: "/landlord/compliance",
        primary: true,
        price: "From $99",
      },
      {
        label: "Chat with Insight",
        description: "Ask questions about your obligations",
        href: "/chat",
        primary: false,
        price: "Free",
      },
    ];
  }

  return [
    {
      label: "Chat with Insight",
      description: "Discuss your deposit obligations with AI",
      href: "/chat",
      primary: true,
      price: "Free",
    },
  ];
}
