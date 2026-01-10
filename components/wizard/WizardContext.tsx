"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { WizardData, EMPTY_WIZARD_DATA, Deduction } from "@/types/dispute";
import type { StateCode } from "@/lib/state-rules/types";

interface WizardContextType {
  data: WizardData;
  currentStep: number;
  totalSteps: number;
  updateData: <K extends keyof WizardData>(
    key: K,
    value: WizardData[K]
  ) => void;
  updateNestedData: <K extends keyof WizardData>(
    key: K,
    nestedKey: string,
    value: unknown
  ) => void;
  updateNestedBatch: <K extends keyof WizardData>(
    key: K,
    updates: Record<string, unknown>
  ) => void;
  addDeduction: (deduction: Deduction) => void;
  updateDeduction: (id: string, updates: Partial<Deduction>) => void;
  removeDeduction: (id: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  canProceed: boolean;
  setCanProceed: (value: boolean) => void;
}

const WizardContext = createContext<WizardContextType | null>(null);

export const WIZARD_STEPS = [
  { id: 1, title: "Getting Started", shortTitle: "Start" },
  { id: 2, title: "Your Deposit", shortTitle: "Deposit" },
  { id: 3, title: "Addresses", shortTitle: "Addresses" },
  { id: 4, title: "Deductions", shortTitle: "Deductions" },
  { id: 5, title: "Evidence & Contact", shortTitle: "Evidence" },
  { id: 6, title: "Your Information", shortTitle: "You" },
  { id: 7, title: "Review", shortTitle: "Review" },
] as const;

interface WizardProviderProps {
  children: ReactNode;
  initialStateCode?: StateCode;
  initialMoveOutDate?: string;
  initialStep?: number;
}

export function WizardProvider({
  children,
  initialStateCode,
  initialMoveOutDate,
  initialStep = 1,
}: WizardProviderProps) {
  const [data, setData] = useState<WizardData>(() => ({
    ...EMPTY_WIZARD_DATA,
    stateCode: initialStateCode || null,
    moveOutDate: initialMoveOutDate || null,
    // Pre-fill property state to match stateCode
    property: {
      ...EMPTY_WIZARD_DATA.property,
      state: initialStateCode || '',
    },
  }));
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [canProceed, setCanProceed] = useState(false);

  const updateData = useCallback(
    <K extends keyof WizardData>(key: K, value: WizardData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const updateNestedData = useCallback(
    <K extends keyof WizardData>(key: K, nestedKey: string, value: unknown) => {
      setData((prev) => ({
        ...prev,
        [key]: {
          ...(prev[key] as Record<string, unknown>),
          [nestedKey]: value,
        },
      }));
    },
    []
  );

  const updateNestedBatch = useCallback(
    <K extends keyof WizardData>(key: K, updates: Record<string, unknown>) => {
      setData((prev) => ({
        ...prev,
        [key]: {
          ...(prev[key] as Record<string, unknown>),
          ...updates,
        },
      }));
    },
    []
  );

  const addDeduction = useCallback((deduction: Deduction) => {
    setData((prev) => ({
      ...prev,
      deductions: [...prev.deductions, deduction],
    }));
  }, []);

  const updateDeduction = useCallback(
    (id: string, updates: Partial<Deduction>) => {
      setData((prev) => ({
        ...prev,
        deductions: prev.deductions.map((d) =>
          d.id === id ? { ...d, ...updates } : d
        ),
      }));
    },
    []
  );

  const removeDeduction = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      deductions: prev.deductions.filter((d) => d.id !== id),
    }));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, WIZARD_STEPS.length));
    setCanProceed(false);
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= WIZARD_STEPS.length) {
      setCurrentStep(step);
    }
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      data,
      currentStep,
      totalSteps: WIZARD_STEPS.length,
      updateData,
      updateNestedData,
      updateNestedBatch,
      addDeduction,
      updateDeduction,
      removeDeduction,
      nextStep,
      prevStep,
      goToStep,
      canProceed,
      setCanProceed,
    }),
    [
      data,
      currentStep,
      updateData,
      updateNestedData,
      updateNestedBatch,
      addDeduction,
      updateDeduction,
      removeDeduction,
      nextStep,
      prevStep,
      goToStep,
      canProceed,
      setCanProceed,
    ]
  );

  return (
    <WizardContext.Provider value={contextValue}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
}
