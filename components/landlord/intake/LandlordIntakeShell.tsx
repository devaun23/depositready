"use client";

import Link from "next/link";
import { Logo, StepIndicator } from "@/components/ui";
import { useLandlordIntake } from "./LandlordIntakeContext";
import { Step1StateDeposit } from "./steps/Step1StateDeposit";
import { Step2Compliance } from "./steps/Step2Compliance";
import { Step3PropertyInfo } from "./steps/Step3PropertyInfo";
import { Step3ThreatDetails } from "./steps/Step3ThreatDetails";
import { Step4LandlordInfo } from "./steps/Step4LandlordInfo";
import { Step5TenantInfo } from "./steps/Step5TenantInfo";
import { Step5ReviewPay } from "./steps/Step5ReviewPay";
import { Step6ReviewPay } from "./steps/Step6ReviewPay";

const COMPLIANCE_COMPONENTS = [
  Step1StateDeposit,
  Step2Compliance,
  Step3PropertyInfo,
  Step4LandlordInfo,
  Step5ReviewPay,
];

const DEFENSE_COMPONENTS = [
  Step1StateDeposit,
  Step2Compliance,
  Step3ThreatDetails,
  Step4LandlordInfo,
  Step5TenantInfo,
  Step6ReviewPay,
];

export function LandlordIntakeShell() {
  const { data, step, steps, nextStep, prevStep, canProceed } = useLandlordIntake();

  const isDefense = data.mode === "defense";
  const stepComponents = isDefense ? DEFENSE_COMPONENTS : COMPLIANCE_COMPONENTS;
  const StepComponent = stepComponents[step];
  const isLastStep = step === steps.length - 1;
  const kitLabel = isDefense ? "Defense Kit" : "Compliance Kit";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/landlord"
            className="flex items-center gap-2 font-serif text-xl font-semibold text-black"
          >
            <Logo size="md" />
            <span className="hidden sm:inline">DepositReady</span>
          </Link>
          <span className="text-xs text-[var(--accent-amber)]">{kitLabel}</span>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <StepIndicator
          steps={steps.map((s) => ({ label: s.label }))}
          currentStep={step}
        />
      </div>

      {/* Step Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <StepComponent />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          {step > 0 ? (
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
              className="bg-[var(--accent-amber)] text-white font-medium px-6 py-2.5 rounded-lg shadow-md hover:bg-[var(--accent-amber-hover)] hover:shadow-lg transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
            >
              Continue
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
