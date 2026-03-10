"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import type { FilingKitData } from "@/types/filing-kit";
import { EMPTY_FILING_KIT_DATA } from "@/types/filing-kit";
import type { StateCode } from "@/lib/state-rules/types";

export const FILING_KIT_STEPS = [
  { id: 1, label: "Case Info" },
  { id: 2, label: "Addresses" },
  { id: 3, label: "Demand History" },
  { id: 4, label: "Your Info" },
  { id: 5, label: "Review & Pay" },
] as const;

interface FilingKitContextType {
  data: FilingKitData;
  currentStep: number;
  totalSteps: number;
  updateData: <K extends keyof FilingKitData>(key: K, value: FilingKitData[K]) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  canProceed: boolean;
}

const FilingKitContext = createContext<FilingKitContextType | null>(null);

interface FilingKitProviderProps {
  children: ReactNode;
  initialStateCode?: StateCode;
  initialDepositAmount?: number;
}

export function FilingKitProvider({
  children,
  initialStateCode,
  initialDepositAmount,
}: FilingKitProviderProps) {
  const [data, setData] = useState<FilingKitData>(() => ({
    ...EMPTY_FILING_KIT_DATA,
    stateCode: initialStateCode || null,
    depositAmount: initialDepositAmount || null,
  }));
  const [currentStep, setCurrentStep] = useState(0);

  const updateData = useCallback(
    <K extends keyof FilingKitData>(key: K, value: FilingKitData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, FILING_KIT_STEPS.length - 1));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(0, Math.min(step, FILING_KIT_STEPS.length - 1)));
  }, []);

  const canProceed = useMemo(() => {
    switch (currentStep) {
      case 0: // Case Info
        return !!data.stateCode && !!data.depositAmount && data.depositAmount > 0 && !!data.depositReturnStatus;
      case 1: // Addresses
        return !!data.landlordName.trim() && !!data.propertyAddress.trim() && !!data.propertyCity.trim() && !!data.propertyZip.trim();
      case 2: // Demand History
        return true; // Optional fields
      case 3: // Tenant Info
        return !!data.tenantName.trim() && !!data.tenantAddress.trim();
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
      totalSteps: FILING_KIT_STEPS.length,
      updateData,
      nextStep,
      prevStep,
      goToStep,
      canProceed,
    }),
    [data, currentStep, updateData, nextStep, prevStep, goToStep, canProceed]
  );

  return (
    <FilingKitContext.Provider value={contextValue}>
      {children}
    </FilingKitContext.Provider>
  );
}

export function useFilingKit() {
  const context = useContext(FilingKitContext);
  if (!context) {
    throw new Error("useFilingKit must be used within FilingKitProvider");
  }
  return context;
}
