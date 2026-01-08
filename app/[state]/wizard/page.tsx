"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  WizardProvider,
  WizardShell,
  useWizard,
  Step1Situation,
  Step2Timeline,
  Step3DepositDetails,
  Step4LandlordInfo,
  Step5PropertyInfo,
  Step6WhatHappened,
  Step7Deductions,
  Step8Evidence,
  Step9PriorContact,
  Step10YourInfo,
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
        return <Step1Situation />;
      case 2:
        return <Step2Timeline />;
      case 3:
        return <Step3DepositDetails />;
      case 4:
        return <Step4LandlordInfo />;
      case 5:
        return <Step5PropertyInfo />;
      case 6:
        return <Step6WhatHappened />;
      case 7:
        return <Step7Deductions />;
      case 8:
        return <Step8Evidence />;
      case 9:
        return <Step9PriorContact />;
      case 10:
        return <Step10YourInfo />;
      default:
        return <Step1Situation />;
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
