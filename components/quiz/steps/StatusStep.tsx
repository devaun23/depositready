"use client";

import { useQuiz } from "../QuizContext";

type DepositStatus = "yes" | "no" | "not_sure";

const options: { value: DepositStatus; label: string; description: string }[] = [
  {
    value: "no",
    label: "No",
    description: "I haven't received my deposit back or any written breakdown",
  },
  {
    value: "yes",
    label: "Yes",
    description: "I received my deposit back or a written list of deductions",
  },
  {
    value: "not_sure",
    label: "Not sure",
    description: "I'm not certain if what I received counts as itemization",
  },
];

export function StatusStep() {
  const { data, updateData } = useQuiz();

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => updateData("depositStatus", option.value)}
          className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
            data.depositStatus === option.value
              ? "border-black bg-gray-50"
              : "border-gray-200 hover:border-gray-400"
          }`}
        >
          <span className="font-medium text-gray-900 block">{option.label}</span>
          <span className="text-gray-500 text-sm">{option.description}</span>
        </button>
      ))}
    </div>
  );
}
