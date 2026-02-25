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

export interface CaseReviewData {
  // Step 1: Case Basics
  stateCode: StateCode | null;
  depositAmount: number | null;
  moveOutDate: string;
  landlordName: string;
  propertyAddress: string;

  // Step 2: Situation
  situationSummary: string;

  // Step 3: Communications
  landlordResponse: string;
  communicationsHistory: string;
  deductionsDescribed: string;

  // Step 4: Goals
  primaryConcern: string;
  desiredOutcome: string;

  // Step 5: Review & Pay
  name: string;
  email: string;
  phone: string;
}

export const EMPTY_CASE_REVIEW_DATA: CaseReviewData = {
  stateCode: null,
  depositAmount: null,
  moveOutDate: "",
  landlordName: "",
  propertyAddress: "",
  situationSummary: "",
  landlordResponse: "",
  communicationsHistory: "",
  deductionsDescribed: "",
  primaryConcern: "",
  desiredOutcome: "",
  name: "",
  email: "",
  phone: "",
};

export const INTAKE_STEPS = [
  { id: 1, label: "Basics" },
  { id: 2, label: "Situation" },
  { id: 3, label: "Details" },
  { id: 4, label: "Goals" },
  { id: 5, label: "Review" },
] as const;

interface CaseReviewContextType {
  data: CaseReviewData;
  currentStep: number;
  totalSteps: number;
  updateData: <K extends keyof CaseReviewData>(key: K, value: CaseReviewData[K]) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  canProceed: boolean;
}

const CaseReviewContext = createContext<CaseReviewContextType | null>(null);

interface CaseReviewProviderProps {
  children: ReactNode;
  initialStateCode?: StateCode;
  initialMoveOutDate?: string;
  initialDepositAmount?: number;
}

export function CaseReviewProvider({
  children,
  initialStateCode,
  initialMoveOutDate,
  initialDepositAmount,
}: CaseReviewProviderProps) {
  const [data, setData] = useState<CaseReviewData>(() => ({
    ...EMPTY_CASE_REVIEW_DATA,
    stateCode: initialStateCode || null,
    moveOutDate: initialMoveOutDate || "",
    depositAmount: initialDepositAmount || null,
  }));
  const [currentStep, setCurrentStep] = useState(0);

  const updateData = useCallback(
    <K extends keyof CaseReviewData>(key: K, value: CaseReviewData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, INTAKE_STEPS.length - 1));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(0, Math.min(step, INTAKE_STEPS.length - 1)));
  }, []);

  const canProceed = useMemo(() => {
    switch (currentStep) {
      case 0: // Basics
        return !!data.stateCode && !!data.depositAmount && data.depositAmount > 0;
      case 1: // Situation
        return data.situationSummary.trim().length >= 20;
      case 2: // Communications
        return true; // Optional fields
      case 3: // Goals
        return !!data.primaryConcern.trim();
      case 4: // Review & Pay
        return !!data.name.trim() && !!data.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
      default:
        return false;
    }
  }, [currentStep, data]);

  const contextValue = useMemo(
    () => ({
      data,
      currentStep,
      totalSteps: INTAKE_STEPS.length,
      updateData,
      nextStep,
      prevStep,
      goToStep,
      canProceed,
    }),
    [data, currentStep, updateData, nextStep, prevStep, goToStep, canProceed]
  );

  return (
    <CaseReviewContext.Provider value={contextValue}>
      {children}
    </CaseReviewContext.Provider>
  );
}

export function useCaseReview() {
  const context = useContext(CaseReviewContext);
  if (!context) {
    throw new Error("useCaseReview must be used within CaseReviewProvider");
  }
  return context;
}
