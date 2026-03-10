"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import type { LandlordIntakeData } from "@/lib/landlord/types";
import { EMPTY_LANDLORD_INTAKE } from "@/lib/landlord/types";

const COMPLIANCE_STEPS = [
  { id: 1, label: "State & Deposit" },
  { id: 2, label: "Compliance Check" },
  { id: 3, label: "Property Info" },
  { id: 4, label: "Your Info" },
  { id: 5, label: "Review & Pay" },
] as const;

const DEFENSE_STEPS = [
  { id: 1, label: "State & Deposit" },
  { id: 2, label: "Compliance Check" },
  { id: 3, label: "Threat Details" },
  { id: 4, label: "Your Info" },
  { id: 5, label: "Tenant Info" },
  { id: 6, label: "Review & Pay" },
] as const;

interface LandlordIntakeContextType {
  data: LandlordIntakeData;
  updateData: <K extends keyof LandlordIntakeData>(key: K, value: LandlordIntakeData[K]) => void;
  step: number;
  setStep: (step: number) => void;
  steps: readonly { id: number; label: string }[];
  canProceed: boolean;
  nextStep: () => void;
  prevStep: () => void;
}

const LandlordIntakeContext = createContext<LandlordIntakeContextType | null>(null);

interface LandlordIntakeProviderProps {
  children: ReactNode;
  initialMode: "compliance" | "defense";
}

export function LandlordIntakeProvider({
  children,
  initialMode,
}: LandlordIntakeProviderProps) {
  const [data, setData] = useState<LandlordIntakeData>(() => ({
    ...EMPTY_LANDLORD_INTAKE,
    mode: initialMode,
  }));
  const [step, setStepRaw] = useState(0);

  const steps = initialMode === "defense" ? DEFENSE_STEPS : COMPLIANCE_STEPS;

  const updateData = useCallback(
    <K extends keyof LandlordIntakeData>(key: K, value: LandlordIntakeData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const setStep = useCallback(
    (s: number) => {
      setStepRaw(Math.max(0, Math.min(s, steps.length - 1)));
    },
    [steps.length]
  );

  const nextStep = useCallback(() => {
    setStepRaw((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const prevStep = useCallback(() => {
    setStepRaw((prev) => Math.max(prev - 1, 0));
  }, []);

  const canProceed = useMemo(() => {
    const isDefense = initialMode === "defense";
    const lastStep = steps.length - 1;

    switch (step) {
      case 0: // State & Deposit
        return !!data.stateCode && !!data.depositAmount && data.depositAmount > 0;

      case 1: // Compliance Check
        return data.complianceAnswers.length >= 3;

      case 2: // Property Info (compliance) or Threat Details (defense)
        if (isDefense) {
          return (
            !!data.threatType &&
            !!data.threatDate.trim() &&
            !!data.threatDescription.trim()
          );
        }
        return (
          !!data.propertyAddress.trim() &&
          !!data.propertyCity.trim() &&
          !!data.propertyZip.trim()
        );

      case 3: // Landlord Info
        return !!data.landlordName.trim() && !!data.landlordEmail.trim();

      case 4: // Tenant Info (defense) or Review & Pay (compliance)
        if (isDefense) {
          return !!data.tenantName.trim();
        }
        // compliance last step
        return (
          !!data.tier &&
          !!data.name.trim() &&
          !!data.email.trim() &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
        );

      case 5: // Review & Pay (defense only)
        if (step === lastStep) {
          return (
            !!data.tier &&
            !!data.name.trim() &&
            !!data.email.trim() &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
          );
        }
        return false;

      default:
        return false;
    }
  }, [step, data, initialMode, steps.length]);

  const contextValue = useMemo(
    () => ({
      data,
      updateData,
      step,
      setStep,
      steps,
      canProceed,
      nextStep,
      prevStep,
    }),
    [data, updateData, step, setStep, steps, canProceed, nextStep, prevStep]
  );

  return (
    <LandlordIntakeContext.Provider value={contextValue}>
      {children}
    </LandlordIntakeContext.Provider>
  );
}

export function useLandlordIntake() {
  const context = useContext(LandlordIntakeContext);
  if (!context) {
    throw new Error("useLandlordIntake must be used within LandlordIntakeProvider");
  }
  return context;
}
