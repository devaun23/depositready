"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { WizardData, EMPTY_WIZARD_DATA, Deduction } from "@/types/dispute";

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
  { id: 1, title: "Situation", shortTitle: "Situation" },
  { id: 2, title: "Timeline", shortTitle: "Timeline" },
  { id: 3, title: "Deposit Details", shortTitle: "Deposit" },
  { id: 4, title: "Landlord Info", shortTitle: "Landlord" },
  { id: 5, title: "Property Info", shortTitle: "Property" },
  { id: 6, title: "What Happened", shortTitle: "Issue" },
  { id: 7, title: "Deductions", shortTitle: "Deductions" },
  { id: 8, title: "Evidence", shortTitle: "Evidence" },
  { id: 9, title: "Prior Contact", shortTitle: "Contact" },
  { id: 10, title: "Your Info", shortTitle: "You" },
] as const;

export function WizardProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<WizardData>(EMPTY_WIZARD_DATA);
  const [currentStep, setCurrentStep] = useState(1);
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

  return (
    <WizardContext.Provider
      value={{
        data,
        currentStep,
        totalSteps: WIZARD_STEPS.length,
        updateData,
        updateNestedData,
        addDeduction,
        updateDeduction,
        removeDeduction,
        nextStep,
        prevStep,
        goToStep,
        canProceed,
        setCanProceed,
      }}
    >
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
