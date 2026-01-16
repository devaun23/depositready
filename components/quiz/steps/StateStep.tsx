"use client";

import { useQuiz } from "../QuizContext";
import { getAllStates } from "@/lib/state-rules";
import type { StateCode } from "@/lib/state-rules";

export function StateStep() {
  const { data, updateData } = useQuiz();

  const states = getAllStates();

  return (
    <div className="space-y-3">
      {states.map((state) => (
        <button
          key={state.code}
          onClick={() => updateData("stateCode", state.code as StateCode)}
          className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
            data.stateCode === state.code
              ? "border-black bg-gray-50"
              : "border-gray-200 hover:border-gray-400"
          }`}
        >
          <span className="font-medium text-gray-900">{state.name}</span>
          <span className="text-gray-500 ml-2 text-sm">
            ({state.returnDeadline}-day deadline)
          </span>
        </button>
      ))}

      <p className="text-center text-sm text-gray-500 mt-4">
        Don&apos;t see your state? We&apos;re adding more soon.
      </p>
    </div>
  );
}
