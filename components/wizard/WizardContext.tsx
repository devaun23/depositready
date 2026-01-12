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
  // Validation state
  touched: Record<string, boolean>;
  errors: Record<string, string>;
  markTouched: (field: string) => void;
  getMissingFields: () => string[];
  clearErrors: () => void;
}

const WizardContext = createContext<WizardContextType | null>(null);

export const WIZARD_STEPS = [
  { id: 1, title: "Your Deposit", shortTitle: "Deposit" },
  { id: 2, title: "Addresses", shortTitle: "Addresses" },
  { id: 3, title: "Review & Submit", shortTitle: "Review" },
] as const;

// Field labels for validation messages
const FIELD_LABELS: Record<string, string> = {
  stateCode: "State",
  situation: "Your situation",
  moveOutDate: "Move-out date",
  depositAmount: "Deposit amount",
  wasItemized: "Itemization question",
  issueType: "Issue type",
  amountReceived: "Amount received",
  "landlord.name": "Landlord name",
  "landlord.address": "Landlord address",
  "landlord.city": "Landlord city",
  "landlord.zip": "Landlord ZIP code",
  "property.address": "Property address",
  "property.city": "Property city",
  "property.zip": "Property ZIP code",
  "tenant.name": "Your name",
  "tenant.email": "Your email",
};

interface WizardProviderProps {
  children: ReactNode;
  initialStateCode?: StateCode;
  initialMoveOutDate?: string;
  initialDepositAmount?: number;
  initialStep?: number;
}

export function WizardProvider({
  children,
  initialStateCode,
  initialMoveOutDate,
  initialDepositAmount,
  initialStep = 1,
}: WizardProviderProps) {
  const [data, setData] = useState<WizardData>(() => ({
    ...EMPTY_WIZARD_DATA,
    stateCode: initialStateCode || null,
    moveOutDate: initialMoveOutDate || null,
    depositAmount: initialDepositAmount || null,
    // Pre-fill property state to match stateCode
    property: {
      ...EMPTY_WIZARD_DATA.property,
      state: initialStateCode || '',
    },
  }));
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [canProceed, setCanProceed] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const markTouched = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  // Get missing required fields for current step
  const getMissingFields = useCallback((): string[] => {
    const missing: string[] = [];

    switch (currentStep) {
      case 1: // Your Deposit
        if (!data.depositAmount || data.depositAmount <= 0) missing.push(FIELD_LABELS.depositAmount);
        if (data.wasItemized === null) missing.push(FIELD_LABELS.wasItemized);
        if (!data.issueType) missing.push(FIELD_LABELS.issueType);
        if (data.issueType === "partial_refund" && (data.amountReceived === null || data.amountReceived < 0)) {
          missing.push(FIELD_LABELS.amountReceived);
        }
        break;
      case 2: // Addresses
        if (!data.landlord.name) missing.push(FIELD_LABELS["landlord.name"]);
        if (!data.landlord.address) missing.push(FIELD_LABELS["landlord.address"]);
        if (!data.landlord.city) missing.push(FIELD_LABELS["landlord.city"]);
        if (!data.landlord.zip) missing.push(FIELD_LABELS["landlord.zip"]);
        if (!data.property.address) missing.push(FIELD_LABELS["property.address"]);
        if (!data.property.city) missing.push(FIELD_LABELS["property.city"]);
        if (!data.property.zip) missing.push(FIELD_LABELS["property.zip"]);
        break;
      case 3: // Review & Submit
        if (!data.tenant.name) missing.push(FIELD_LABELS["tenant.name"]);
        if (!data.tenant.email) missing.push(FIELD_LABELS["tenant.email"]);
        break;
    }

    return missing;
  }, [currentStep, data]);

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
      touched,
      errors,
      markTouched,
      getMissingFields,
      clearErrors,
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
      touched,
      errors,
      markTouched,
      getMissingFields,
      clearErrors,
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
