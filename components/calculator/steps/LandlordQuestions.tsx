"use client";

import type { ComplianceQuestion, ComplianceAnswer } from "@/lib/landlord/types";

interface LandlordQuestionsProps {
  questions: ComplianceQuestion[];
  answers: ComplianceAnswer[];
  onToggle: (questionId: string, answer: boolean) => void;
}

export function LandlordQuestions({ questions, answers, onToggle }: LandlordQuestionsProps) {
  const answerMap = new Map(answers.map((a) => [a.questionId, a.answer]));

  return (
    <section>
      <p className="block text-sm font-medium text-gray-700 mb-3">
        Compliance checklist — answer honestly for an accurate assessment
      </p>
      <div className="space-y-3">
        {questions.map((q) => {
          const current = answerMap.get(q.id);
          return (
            <div
              key={q.id}
              className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200"
            >
              <button
                onClick={() => onToggle(q.id, current !== true)}
                className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                  current === true
                    ? "bg-green-500 border-green-500 text-white"
                    : current === false
                    ? "bg-red-50 border-red-300 text-red-500"
                    : "bg-white border-gray-300"
                }`}
                aria-label={`${q.text} - ${current === true ? "Yes" : current === false ? "No" : "Not answered"}`}
              >
                {current === true && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {current === false && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{q.text}</p>
                <p className="text-xs text-gray-500 mt-0.5">{q.helpText}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
