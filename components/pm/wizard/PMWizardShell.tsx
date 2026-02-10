"use client";

import Link from "next/link";
import { useMemo, useCallback, useState } from "react";
import { Logo } from "@/components/ui";
import { usePMWizard, PM_WIZARD_STEPS } from "./PMWizardContext";

interface PMWizardShellProps {
  children: React.ReactNode;
  onComplete?: () => void;
}

const URGENCY_COLORS = {
  safe: "bg-green-50 border-green-200 text-green-800",
  soon: "bg-yellow-50 border-yellow-200 text-yellow-800",
  urgent: "bg-red-50 border-red-200 text-red-800",
  overdue: "bg-red-100 border-red-300 text-red-900",
} as const;

export function PMWizardShell({ children, onComplete }: PMWizardShellProps) {
  const {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    canProceed,
    getMissingFields,
    deadlineAnalysis,
  } = usePMWizard();
  const [showMissing, setShowMissing] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const progress = useMemo(
    () => (currentStep / totalSteps) * 100,
    [currentStep, totalSteps]
  );

  const currentStepInfo = PM_WIZARD_STEPS[currentStep - 1];
  const isLastStep = currentStep === totalSteps;

  const handleNext = useCallback(() => {
    if (!canProceed) {
      setShowMissing(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setShowMissing(false);
    if (isLastStep && onComplete) {
      onComplete();
    } else {
      nextStep();
    }
  }, [canProceed, isLastStep, onComplete, nextStep]);

  const missingFields = getMissingFields();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/pm"
            className="flex items-center gap-2 font-serif text-xl font-semibold text-black"
          >
            <Logo size="md" />
            <span>DepositReady</span>
            <span className="text-xs font-sans font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              PM
            </span>
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

      {/* Step Indicators */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-2 md:py-3">
          <div className="flex gap-1 sm:gap-0 sm:justify-between overflow-x-auto scrollbar-hide">
            {PM_WIZARD_STEPS.map((step) => (
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

      {/* Urgency Banner */}
      {deadlineAnalysis && (
        <div className={`border-b ${URGENCY_COLORS[deadlineAnalysis.urgency]}`}>
          <div className="max-w-3xl mx-auto px-4 py-2">
            <p className="text-sm">
              <span className="font-semibold">{deadlineAnalysis.urgencyLabel}:</span>{" "}
              {deadlineAnalysis.urgencyDescription}
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 pb-24 sm:pb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
          <h1 className="font-serif text-2xl font-semibold text-black mb-2">
            {currentStepInfo.title}
          </h1>

          <div className="mt-6">{children}</div>

          {/* Navigation */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            {showMissing && missingFields.length > 0 && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">
                  <span className="font-medium">Please complete: </span>
                  {missingFields.join(", ")}
                </p>
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 min-h-[44px] rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:text-black hover:bg-gray-100"
                }`}
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className={`px-6 py-3 min-h-[44px] rounded-lg font-medium transition-all ${
                  canProceed
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-600"
                } ${isShaking ? "animate-shake" : ""}`}
              >
                {isLastStep ? "Generate Packet — $29" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
