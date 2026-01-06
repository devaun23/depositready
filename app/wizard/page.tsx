"use client";

import { useRouter } from "next/navigation";
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

export default function WizardPage() {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  );
}
