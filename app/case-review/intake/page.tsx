"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CaseReviewProvider } from "@/components/case-review/CaseReviewIntakeContext";
import { CaseReviewIntakeShell } from "@/components/case-review/CaseReviewIntakeShell";
import type { StateCode } from "@/lib/state-rules/types";

function IntakeContent() {
  const searchParams = useSearchParams();

  const stateCode = searchParams.get("state") as StateCode | null;
  const moveOutDate = searchParams.get("moveOutDate") || undefined;
  const depositRaw = searchParams.get("deposit");
  const depositAmount = depositRaw ? parseFloat(depositRaw) : undefined;

  return (
    <CaseReviewProvider
      initialStateCode={stateCode || undefined}
      initialMoveOutDate={moveOutDate}
      initialDepositAmount={
        depositAmount && !isNaN(depositAmount) ? depositAmount : undefined
      }
    >
      <CaseReviewIntakeShell />
    </CaseReviewProvider>
  );
}

export default function CaseReviewIntakePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      }
    >
      <IntakeContent />
    </Suspense>
  );
}
