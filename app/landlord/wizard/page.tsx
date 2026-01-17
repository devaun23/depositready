"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useCallback } from "react";
import {
  LandlordWizardProvider,
  LandlordWizardShell,
  useLandlordWizard,
  Step1DemandInfo,
  Step2Response,
  Step3Addresses,
  Step4Review,
} from "@/components/landlord/wizard";
import type { StateCode } from "@/lib/state-rules/types";

function WizardContent() {
  const { currentStep, data } = useLandlordWizard();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Call landlord checkout API
      const response = await fetch("/api/landlord/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          landlordName: data.landlord?.name,
          landlordEmail: data.landlord?.email,
          propertyAddress: `${data.property?.address}, ${data.property?.city}, ${data.property?.state} ${data.property?.zip}`,
          depositAmount: data.depositAmount,
          formData: data,
        }),
      });

      const result = await response.json();

      if (result.url) {
        // Redirect to Stripe checkout
        window.location.href = result.url;
      } else {
        console.error("No checkout URL returned");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setIsSubmitting(false);
    }
  }, [data, isSubmitting, router]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1DemandInfo />;
      case 2:
        return <Step2Response />;
      case 3:
        return <Step3Addresses />;
      case 4:
        return <Step4Review />;
      default:
        return <Step1DemandInfo />;
    }
  };

  return (
    <LandlordWizardShell onComplete={handleComplete}>
      {renderStep()}
    </LandlordWizardShell>
  );
}

function LandlordWizardPageContent() {
  const searchParams = useSearchParams();
  const stateParam = searchParams.get("state") as StateCode | null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* State indicator */}
      <div className="bg-blue-600 text-white text-center py-2 text-sm">
        Creating Landlord Response Kit
        {stateParam && (
          <>
            {" "}
            for <strong>{stateParam}</strong>
          </>
        )}
      </div>

      <LandlordWizardProvider initialStateCode={stateParam || undefined}>
        <WizardContent />
      </LandlordWizardProvider>
    </div>
  );
}

export default function LandlordWizardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      }
    >
      <LandlordWizardPageContent />
    </Suspense>
  );
}
