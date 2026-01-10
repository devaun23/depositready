"use client";

import Link from "next/link";
import { useMemo, useCallback } from "react";
import { Logo, Button } from "@/components/ui";
import { useWizard, WIZARD_STEPS } from "./WizardContext";

interface WizardShellProps {
  children: React.ReactNode;
  onComplete?: () => void;
}

export function WizardShell({ children, onComplete }: WizardShellProps) {
  const { currentStep, totalSteps, nextStep, prevStep, canProceed } =
    useWizard();

  // Memoize calculations to prevent recalculation on every render
  const progress = useMemo(
    () => (currentStep / totalSteps) * 100,
    [currentStep, totalSteps]
  );

  const currentStepInfo = WIZARD_STEPS[currentStep - 1];
  const isLastStep = currentStep === totalSteps;

  // Memoize handler to prevent recreation on every render
  const handleNext = useCallback(() => {
    if (isLastStep && onComplete) {
      onComplete();
    } else {
      nextStep();
    }
  }, [isLastStep, onComplete, nextStep]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-serif text-xl font-semibold text-black">
            <Logo size="md" />
            <span>DepositReady</span>
          </Link>
          <div className="text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto">
          <div className="h-1 bg-gray-100">
            <div
              className="h-1 bg-black transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Indicators (Mobile + Desktop) */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-2 md:py-3">
          <div className="flex gap-1 sm:gap-0 sm:justify-between overflow-x-auto scrollbar-hide">
            {WIZARD_STEPS.map((step) => (
              <div
                key={step.id}
                className={`text-xs sm:text-sm font-medium whitespace-nowrap px-1.5 py-0.5 sm:px-0 sm:py-0 rounded ${
                  step.id === currentStep
                    ? "text-white bg-black sm:bg-transparent sm:text-black"
                    : step.id < currentStep
                    ? "text-gray-500"
                    : "text-gray-300"
                }`}
              >
                {step.shortTitle}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content - add bottom padding on mobile for sticky button */}
      <main className="max-w-3xl mx-auto px-4 py-8 pb-24 sm:pb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
          <h1 className="font-serif text-2xl font-semibold text-black mb-2">
            {currentStepInfo.title}
          </h1>

          <div className="mt-6">{children}</div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 min-h-[44px] rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:text-black hover:bg-gray-100"
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`px-6 py-3 min-h-[44px] rounded-lg font-medium transition-colors ${
                canProceed
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLastStep ? "Review Packet" : "Continue"}
            </button>
          </div>
        </div>
      </main>

      {/* Sticky Mobile Check Deadline Button - with safe area for notched devices */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-white border-t border-gray-200 sm:hidden z-40">
        <Link href="/#deadline-checker">
          <Button className="w-full min-h-[44px]" size="lg">
            Check My Deadline
          </Button>
        </Link>
      </div>
    </div>
  );
}
