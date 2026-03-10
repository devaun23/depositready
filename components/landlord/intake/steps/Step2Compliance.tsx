"use client";

import { useMemo } from "react";
import { useLandlordIntake } from "../LandlordIntakeContext";
import { getApplicableQuestions } from "@/lib/landlord/questions";
import { getStateRulesByCode } from "@/lib/state-rules";
import type { ComplianceAnswer } from "@/lib/landlord/types";

export function Step2Compliance() {
  const { data, updateData } = useLandlordIntake();

  const questions = useMemo(() => {
    if (!data.stateCode) return [];
    try {
      const rules = getStateRulesByCode(data.stateCode);
      return getApplicableQuestions({
        certifiedMailRequired: rules.certifiedMailRequired,
        itemizedDeductionsRequired: rules.itemizedDeductionsRequired,
      });
    } catch {
      return [];
    }
  }, [data.stateCode]);

  const getAnswer = (questionId: string): boolean | null => {
    const found = data.complianceAnswers.find((a) => a.questionId === questionId);
    return found ? found.answer : null;
  };

  const setAnswer = (questionId: string, answer: boolean) => {
    const existing = data.complianceAnswers.filter((a) => a.questionId !== questionId);
    const updated: ComplianceAnswer[] = [...existing, { questionId, answer }];
    updateData("complianceAnswers", updated);
  };

  const answeredCount = data.complianceAnswers.length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Compliance Check</h2>
        <p className="text-sm text-gray-600 mt-1">
          Answer honestly -- this helps us identify your risk areas.
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {answeredCount} of {questions.length} answered (minimum 3 required)
        </p>
      </div>

      {questions.length === 0 && (
        <p className="text-sm text-gray-500 italic">
          Please select a state in the previous step to see compliance questions.
        </p>
      )}

      <div className="space-y-4">
        {questions.map((q) => {
          const current = getAnswer(q.id);
          return (
            <div
              key={q.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <p className="text-sm font-medium text-gray-900 mb-2">{q.text}</p>
              <p className="text-xs text-gray-500 mb-3">{q.helpText}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAnswer(q.id, true)}
                  className={`min-h-[44px] px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                    current === true
                      ? "bg-green-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setAnswer(q.id, false)}
                  className={`min-h-[44px] px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                    current === false
                      ? "bg-red-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-700"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
