"use client";

import { Suspense, useState, useCallback } from "react";
import {
  PMWizardProvider,
  PMWizardShell,
  usePMWizard,
  Step1PropertyLease,
  Step2Deductions,
  Step3TenantInfo,
  Step4CompanyInfo,
  Step5ReviewPay,
} from "@/components/pm/wizard";

function WizardContent() {
  const { currentStep, data } = usePMWizard();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const propertyAddress = `${data.property?.address}${data.property?.unit ? `, Unit ${data.property.unit}` : ""}, ${data.property?.city}, ${data.property?.state} ${data.property?.zip}`;

      const response = await fetch("/api/pm/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: data.company?.companyName,
          managerName: data.company?.managerName,
          managerEmail: data.company?.email,
          propertyAddress,
          depositAmount: data.depositAmount,
          formData: data,
        }),
      });

      const result = await response.json();

      if (result.url) {
        window.location.href = result.url;
      } else {
        console.error("No checkout URL returned:", result.error);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("PM checkout error:", error);
      setIsSubmitting(false);
    }
  }, [data, isSubmitting]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1PropertyLease />;
      case 2:
        return <Step2Deductions />;
      case 3:
        return <Step3TenantInfo />;
      case 4:
        return <Step4CompanyInfo />;
      case 5:
        return <Step5ReviewPay />;
      default:
        return <Step1PropertyLease />;
    }
  };

  return (
    <PMWizardShell onComplete={handleComplete}>
      {renderStep()}
    </PMWizardShell>
  );
}

export default function PMWizardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      }
    >
      <div className="min-h-screen bg-gray-50">
        <div className="bg-black text-white text-center py-2 text-sm">
          Creating Deposit Disposition Packet — Florida §83.49
        </div>
        <PMWizardProvider>
          <WizardContent />
        </PMWizardProvider>
      </div>
    </Suspense>
  );
}
