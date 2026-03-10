"use client";

import Link from "next/link";
import { Logo, StepIndicator } from "@/components/ui";
import { useFilingKit, FILING_KIT_STEPS } from "./FilingKitIntakeContext";
import { Step1CaseInfo } from "./steps/Step1CaseInfo";
import { Step2Addresses } from "./steps/Step2Addresses";
import { Step3DemandHistory } from "./steps/Step3DemandHistory";
import { Step4TenantInfo } from "./steps/Step4TenantInfo";
import { Step5ReviewPay } from "./steps/Step5ReviewPay";

const STEP_COMPONENTS = [
  Step1CaseInfo,
  Step2Addresses,
  Step3DemandHistory,
  Step4TenantInfo,
  Step5ReviewPay,
];

export function FilingKitIntakeShell() {
  const { currentStep, nextStep, prevStep, canProceed } = useFilingKit();

  const StepComponent = STEP_COMPONENTS[currentStep];
  const isLastStep = currentStep === FILING_KIT_STEPS.length - 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/filing-kit"
            className="flex items-center gap-2 font-serif text-xl font-semibold text-black"
          >
            <Logo size="md" />
            <span className="hidden sm:inline">DepositReady</span>
          </Link>
          <span className="text-xs text-[var(--accent-orange)]">Filing Kit</span>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <StepIndicator
          steps={FILING_KIT_STEPS.map((s) => ({ label: s.label }))}
          currentStep={currentStep}
        />
      </div>

      {/* Step Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <StepComponent />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          {currentStep > 0 ? (
            <button
              onClick={prevStep}
              className="text-sm text-gray-600 hover:text-black transition"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {!isLastStep && (
            <button
              onClick={nextStep}
              disabled={!canProceed}
              className="bg-[var(--accent-orange)] text-white font-medium px-6 py-2.5 rounded-lg shadow-md hover:bg-[var(--accent-orange-hover)] hover:shadow-lg transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
            >
              Continue
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
