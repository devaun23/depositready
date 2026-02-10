"use client";

import { ReactNode } from "react";

type InsightVariant = "info" | "warning" | "violation" | "success";

interface InsightCardProps {
  visible: boolean;
  variant: InsightVariant;
  children: ReactNode;
}

const variantStyles: Record<InsightVariant, string> = {
  info: "bg-blue-50 border-blue-200 text-blue-900",
  warning: "bg-amber-50 border-amber-200 text-amber-900",
  violation: "bg-red-50 border-red-200 text-red-900",
  success: "bg-green-50 border-green-200 text-green-900",
};

export function InsightCard({ visible, variant, children }: InsightCardProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`overflow-hidden transition-all duration-500 ease-out ${
        visible
          ? "max-h-40 opacity-100 mt-3"
          : "max-h-0 opacity-0 mt-0"
      }`}
    >
      <div
        className={`rounded-lg border px-4 py-3 text-sm ${variantStyles[variant]}`}
      >
        {children}
      </div>
    </div>
  );
}
