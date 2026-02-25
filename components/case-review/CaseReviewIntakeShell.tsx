"use client";

import Link from "next/link";
import { Logo, StepIndicator } from "@/components/ui";
import { useCaseReview, INTAKE_STEPS } from "./CaseReviewIntakeContext";
import { Step1CaseBasics } from "./steps/Step1CaseBasics";
import { Step2Situation } from "./steps/Step2Situation";
import { Step3Communications } from "./steps/Step3Communications";
import { Step4Goals } from "./steps/Step4Goals";
import { Step5ReviewPay } from "./steps/Step5ReviewPay";

const STEP_COMPONENTS = [
  Step1CaseBasics,
  Step2Situation,
  Step3Communications,
  Step4Goals,
  Step5ReviewPay,
];

export function CaseReviewIntakeShell() {
  const { currentStep, nextStep, prevStep, canProceed } = useCaseReview();

  const StepComponent = STEP_COMPONENTS[currentStep];
  const isLastStep = currentStep === INTAKE_STEPS.length - 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/case-review"
            className="flex items-center gap-2 font-serif text-xl font-semibold text-black"
          >
            <Logo size="md" />
            <span className="hidden sm:inline">DepositReady</span>
          </Link>
          <span className="text-xs text-gray-500">Case Review</span>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <StepIndicator
          steps={INTAKE_STEPS.map((s) => ({ label: s.label }))}
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
              className="bg-black text-white font-medium px-6 py-2.5 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
