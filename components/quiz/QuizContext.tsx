"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import type { StateCode } from "@/lib/state-rules/types";

export interface QuizData {
  stateCode: StateCode | null;
  moveOutDate: string | null;
  depositStatus: "yes" | "no" | "not_sure" | null;
  depositAmount: number | null;
  email: string | null;
}

const EMPTY_QUIZ_DATA: QuizData = {
  stateCode: null,
  moveOutDate: null,
  depositStatus: null,
  depositAmount: null,
  email: null,
};

export const QUIZ_STEPS = [
  { id: 1, title: "State", question: "Which state do you live in?" },
  { id: 2, title: "Move-out", question: "When did you move out?" },
  { id: 3, title: "Status", question: "Has your landlord returned your deposit or sent an itemization?" },
  { id: 4, title: "Amount", question: "How much was your security deposit?" },
] as const;

interface QuizContextType {
  data: QuizData;
  currentStep: number;
  totalSteps: number;
  showResult: boolean;
  emailCaptured: boolean;
  updateData: <K extends keyof QuizData>(key: K, value: QuizData[K]) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  showResults: () => void;
  captureEmail: (email: string) => void;
  canProceed: boolean;
}

const QuizContext = createContext<QuizContextType | null>(null);

interface QuizProviderProps {
  children: ReactNode;
}

export function QuizProvider({ children }: QuizProviderProps) {
  const [data, setData] = useState<QuizData>(EMPTY_QUIZ_DATA);
  const [currentStep, setCurrentStep] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);

  const updateData = useCallback(
    <K extends keyof QuizData>(key: K, value: QuizData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const nextStep = useCallback(() => {
    if (currentStep < QUIZ_STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (showResult) {
      setShowResult(false);
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    }
  }, [showResult]);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= QUIZ_STEPS.length) {
      setShowResult(false);
      setCurrentStep(step);
    }
  }, []);

  const showResults = useCallback(() => {
    setShowResult(true);
  }, []);

  const captureEmail = useCallback((email: string) => {
    setData((prev) => ({ ...prev, email }));
    setEmailCaptured(true);
  }, []);

  // Determine if current step can proceed
  const canProceed = useMemo(() => {
    switch (currentStep) {
      case 1:
        return data.stateCode !== null;
      case 2:
        return data.moveOutDate !== null;
      case 3:
        return data.depositStatus !== null;
      case 4:
        return data.depositAmount !== null && data.depositAmount > 0;
      default:
        return false;
    }
  }, [currentStep, data]);

  const contextValue = useMemo(
    () => ({
      data,
      currentStep,
      totalSteps: QUIZ_STEPS.length,
      showResult,
      emailCaptured,
      updateData,
      nextStep,
      prevStep,
      goToStep,
      showResults,
      captureEmail,
      canProceed,
    }),
    [
      data,
      currentStep,
      showResult,
      emailCaptured,
      updateData,
      nextStep,
      prevStep,
      goToStep,
      showResults,
      captureEmail,
      canProceed,
    ]
  );

  return (
    <QuizContext.Provider value={contextValue}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
