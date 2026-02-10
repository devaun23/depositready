"use client";

import { useEffect } from "react";
import {
  QuizProvider,
  useQuiz,
  QuizShell,
  QuizResult,
  StateStep,
  MoveOutStep,
  StatusStep,
  AmountStep,
} from "@/components/quiz";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function QuizContent() {
  const { currentStep, showResult } = useQuiz();

  // Track quiz start
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "diagnosis_started", {
        event_category: "engagement",
        event_label: "deadline_quiz",
      });
    }
  }, []);

  // Show result screen
  if (showResult) {
    return <QuizResult />;
  }

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StateStep />;
      case 2:
        return <MoveOutStep />;
      case 3:
        return <StatusStep />;
      case 4:
        return <AmountStep />;
      default:
        return <StateStep />;
    }
  };

  return <QuizShell>{renderStep()}</QuizShell>;
}

export default function QuizPage() {
  return (
    <QuizProvider>
      <QuizContent />
    </QuizProvider>
  );
}
