"use client";

import Link from "next/link";
import { useWizard, WIZARD_STEPS } from "./WizardContext";

interface WizardShellProps {
  children: React.ReactNode;
  onComplete?: () => void;
}

export function WizardShell({ children, onComplete }: WizardShellProps) {
  const { currentStep, totalSteps, nextStep, prevStep, canProceed } =
    useWizard();

  const progress = (currentStep / totalSteps) * 100;
  const currentStepInfo = WIZARD_STEPS[currentStep - 1];
  const isLastStep = currentStep === totalSteps;

  const handleNext = () => {
    if (isLastStep && onComplete) {
      onComplete();
    } else {
      nextStep();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            DepositReady
          </Link>
          <div className="text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="h-1 bg-gray-100">
            <div
              className="h-1 bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Indicators (Desktop) */}
      <div className="hidden md:block bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex justify-between">
            {WIZARD_STEPS.map((step) => (
              <div
                key={step.id}
                className={`text-xs font-medium ${
                  step.id === currentStep
                    ? "text-blue-600"
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

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {currentStepInfo.title}
          </h1>

          <div className="mt-6">{children}</div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                canProceed
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLastStep ? "Review Packet" : "Continue"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
