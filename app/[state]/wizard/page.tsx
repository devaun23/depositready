"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { getStateRules, isValidStateSlug, getStateCodeFromSlug } from "@/lib/state-rules";
import type { StateCode } from "@/lib/state-rules/types";

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

export default function StateWizardPage() {
  const params = useParams();
  const router = useRouter();
  const [stateCode, setStateCode] = useState<StateCode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stateSlug = params.state as string;

    if (!isValidStateSlug(stateSlug)) {
      router.push("/");
      return;
    }

    const code = getStateCodeFromSlug(stateSlug);
    if (code) {
      setStateCode(code);

      // Track wizard start for retargeting
      if (typeof window !== "undefined" && "gtag" in window) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).gtag("event", "wizard_start", {
          event_category: "engagement",
          state: code,
        });
      }
    }
    setIsLoading(false);
  }, [params.state, router]);

  if (isLoading || !stateCode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const rules = getStateRules(params.state as string);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* State indicator */}
      <div className="bg-blue-600 text-white text-center py-2 text-sm">
        Creating dispute packet for <strong>{rules?.name}</strong> under{" "}
        {rules?.statuteTitle}
      </div>

      <WizardProvider initialStateCode={stateCode}>
        <WizardContent />
      </WizardProvider>
    </div>
  );
}
