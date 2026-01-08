"use client";

interface Step {
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function StepIndicator({
  steps,
  currentStep,
  className = "",
}: StepIndicatorProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Dots */}
      <div className="flex items-center gap-2 mb-3">
        {steps.map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentStep
                  ? "bg-black"
                  : index < currentStep
                  ? "bg-black"
                  : "bg-gray-300"
              }`}
            />
            {index < steps.length - 1 && (
              <div
                className={`w-8 h-0.5 mx-1 ${
                  index < currentStep ? "bg-black" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Labels */}
      <div className="flex items-center justify-center gap-6 text-sm">
        {steps.map((step, index) => (
          <span
            key={index}
            className={`${
              index === currentStep
                ? "text-black font-medium"
                : index < currentStep
                ? "text-gray-600"
                : "text-gray-400"
            }`}
          >
            {step.label}
          </span>
        ))}
      </div>
    </div>
  );
}
