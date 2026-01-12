"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import {
  WizardProvider,
  WizardShell,
  useWizard,
  Step2YourDeposit,
  Step3Addresses,
  Step5ReviewSubmit,
} from "@/components/wizard";
import { isValidStateCode } from "@/lib/state-rules";
import type { StateCode } from "@/lib/state-rules/types";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function WizardContent() {
  const { currentStep, data } = useWizard();
  const router = useRouter();

  const handleComplete = () => {
    // Save data to localStorage for preview page
    localStorage.setItem("disputeData", JSON.stringify(data));
    router.push("/preview");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step2YourDeposit />;
      case 2:
        return <Step3Addresses />;
      case 3:
        return <Step5ReviewSubmit />;
      default:
        return <Step2YourDeposit />;
    }
  };

  return <WizardShell onComplete={handleComplete}>{renderStep()}</WizardShell>;
}

function WizardPageContent() {
  const searchParams = useSearchParams();
  const [initialData, setInitialData] = useState<{
    stateCode: StateCode | null;
    moveOutDate: string | null;
    depositAmount: number | null;
  } | null>(null);

  useEffect(() => {
    // Check query params first, then localStorage
    const stateParam = searchParams.get("state");
    const moveoutParam = searchParams.get("moveout");
    const depositParam = searchParams.get("deposit");

    let stateCode: StateCode | null = null;
    let moveOutDate: string | null = null;
    let depositAmount: number | null = null;

    // Try query params first
    if (stateParam && isValidStateCode(stateParam)) {
      stateCode = stateParam as StateCode;
    }
    if (moveoutParam) {
      moveOutDate = moveoutParam;
    }
    if (depositParam) {
      depositAmount = parseFloat(depositParam) || null;
    }

    // Fall back to localStorage eligibility data
    if (!stateCode || !moveOutDate) {
      try {
        const eligibilityData = localStorage.getItem("eligibilityData");
        if (eligibilityData) {
          const parsed = JSON.parse(eligibilityData);
          if (!stateCode && parsed.stateCode && isValidStateCode(parsed.stateCode)) {
            stateCode = parsed.stateCode as StateCode;
          }
          if (!moveOutDate && parsed.moveOutDate) {
            moveOutDate = parsed.moveOutDate;
          }
          if (!depositAmount && parsed.depositAmount) {
            depositAmount = parseFloat(parsed.depositAmount) || null;
          }
        }
      } catch {
        // Ignore parse errors
      }
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- initializing from URL params and localStorage (external systems)
    setInitialData({ stateCode, moveOutDate, depositAmount });

    // Track wizard start
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "wizard_start", {
        event_category: "engagement",
        state: stateCode || "unknown",
      });
    }
  }, [searchParams]);

  if (initialData === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <WizardProvider
        initialStateCode={initialData.stateCode || undefined}
        initialMoveOutDate={initialData.moveOutDate || undefined}
        initialDepositAmount={initialData.depositAmount || undefined}
        initialStep={1}
      >
        <WizardContent />
      </WizardProvider>
    </div>
  );
}

export default function WizardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      }
    >
      <WizardPageContent />
    </Suspense>
  );
}
