"use client";

import Link from "next/link";
import { useMemo, useCallback, useState } from "react";
import { Logo, Button } from "@/components/ui";
import { useQuiz, QUIZ_STEPS } from "./QuizContext";

interface QuizShellProps {
  children: React.ReactNode;
}

export function QuizShell({ children }: QuizShellProps) {
  const { currentStep, totalSteps, nextStep, prevStep, canProceed, showResult } = useQuiz();
  const [isShaking, setIsShaking] = useState(false);

  const progress = useMemo(
    () => (currentStep / totalSteps) * 100,
    [currentStep, totalSteps]
  );

  const currentStepInfo = QUIZ_STEPS[currentStep - 1];

  const handleNext = useCallback(() => {
    if (!canProceed) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    nextStep();
  }, [canProceed, nextStep]);

  // Don't show shell for result screen
  if (showResult) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-serif text-xl font-semibold text-black">
            <Logo size="md" />
            <span className="hidden sm:inline">DepositReady</span>
          </Link>
          <div className="text-sm text-gray-500">
            Question {currentStep} of {totalSteps}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto">
          <div className="h-1 bg-gray-100">
            <div
              className="h-1 bg-black transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Dots */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex justify-center gap-2">
            {QUIZ_STEPS.map((step) => (
              <div
                key={step.id}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  step.id === currentStep
                    ? "bg-black scale-125"
                    : step.id < currentStep
                    ? "bg-gray-400"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 flex flex-col">
        <div className="max-w-2xl mx-auto px-4 py-8 w-full flex-1 flex flex-col">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 flex-1 flex flex-col">
            {/* Question */}
            <h1 className="font-serif text-2xl md:text-3xl font-semibold text-black text-center mb-8">
              {currentStepInfo.question}
            </h1>

            {/* Step Content */}
            <div className="flex-1 flex flex-col justify-center">
              {children}
            </div>

            {/* Navigation */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-4 py-3 min-h-[44px] rounded-lg font-medium transition-colors ${
                    currentStep === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:text-black hover:bg-gray-100"
                  }`}
                >
                  Back
                </button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className={`min-w-[140px] ${isShaking ? "animate-shake" : ""}`}
                  size="lg"
                >
                  {currentStep === totalSteps ? "See Results" : "Continue"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
