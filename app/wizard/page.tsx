"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import {
  WizardProvider,
  WizardShell,
  useWizard,
  Step1GettingStarted,
  Step2YourDeposit,
  Step3Addresses,
  Step4Deductions,
  Step5EvidenceContact,
  Step6YourInfo,
  Step7Review,
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
        return <Step1GettingStarted />;
      case 2:
        return <Step2YourDeposit />;
      case 3:
        return <Step3Addresses />;
      case 4:
        return <Step4Deductions />;
      case 5:
        return <Step5EvidenceContact />;
      case 6:
        return <Step6YourInfo />;
      case 7:
        return <Step7Review />;
      default:
        return <Step1GettingStarted />;
    }
  };

  return <WizardShell onComplete={handleComplete}>{renderStep()}</WizardShell>;
}

function WizardPageContent() {
  const searchParams = useSearchParams();
  const [initialData, setInitialData] = useState<{
    stateCode: StateCode | null;
    moveOutDate: string | null;
    skipStep1: boolean;
  } | null>(null);

  useEffect(() => {
    // Check query params first, then localStorage
    const stateParam = searchParams.get("state");
    const moveoutParam = searchParams.get("moveout");
    const skipStep1 = searchParams.get("skipStep1") === "true";

    let stateCode: StateCode | null = null;
    let moveOutDate: string | null = null;

    // Try query params first
    if (stateParam && isValidStateCode(stateParam)) {
      stateCode = stateParam as StateCode;
    }
    if (moveoutParam) {
      moveOutDate = moveoutParam;
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
        }
      } catch {
        // Ignore parse errors
      }
    }

    setInitialData({ stateCode, moveOutDate, skipStep1 });

    // Track wizard start
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "wizard_start", {
        event_category: "engagement",
        state: stateCode || "unknown",
        from_eligibility: skipStep1,
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
        initialStep={initialData.skipStep1 ? 2 : 1}
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
