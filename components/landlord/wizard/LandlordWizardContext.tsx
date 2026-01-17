"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import type { LandlordFormData, LandlordDeduction } from "@/types/landlord";
import type { StateCode } from "@/lib/state-rules/types";

interface LandlordWizardContextType {
  data: Partial<LandlordFormData>;
  currentStep: number;
  totalSteps: number;
  updateData: (updates: Partial<LandlordFormData>) => void;
  updateNestedData: <K extends keyof LandlordFormData>(
    key: K,
    nestedKey: string,
    value: unknown
  ) => void;
  addDeduction: (deduction: Omit<LandlordDeduction, "id">) => void;
  removeDeduction: (id: string) => void;
  updateDeduction: (id: string, updates: Partial<LandlordDeduction>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  canProceed: boolean;
  setCanProceed: (value: boolean) => void;
  getMissingFields: () => string[];
}

const LandlordWizardContext = createContext<LandlordWizardContextType | null>(
  null
);

export const LANDLORD_WIZARD_STEPS = [
  { id: 1, title: "Demand Letter Info", shortTitle: "Demand" },
  { id: 2, title: "Your Response", shortTitle: "Response" },
  { id: 3, title: "Addresses", shortTitle: "Addresses" },
  { id: 4, title: "Review & Payment", shortTitle: "Review" },
] as const;

const FIELD_LABELS: Record<string, string> = {
  stateCode: "State",
  demandLetterDate: "Demand letter date",
  depositAmount: "Deposit amount",
  "landlord.name": "Your name",
  "landlord.address": "Your address",
  "landlord.city": "Your city",
  "landlord.zip": "Your ZIP code",
  "tenant.name": "Tenant name",
  "property.address": "Property address",
  "property.city": "Property city",
  "property.zip": "Property ZIP code",
};

const INITIAL_DATA: Partial<LandlordFormData> = {
  stateCode: undefined,
  demandLetterDate: "",
  depositAmount: 0,
  amountReturned: 0,
  depositReturned: false,
  itemizedListSent: false,
  deductions: [],
  landlord: { name: "", address: "", city: "", state: "", zip: "" },
  tenant: { name: "" },
  property: { address: "", city: "", state: "", zip: "" },
};

interface LandlordWizardProviderProps {
  children: ReactNode;
  initialStateCode?: StateCode;
}

export function LandlordWizardProvider({
  children,
  initialStateCode,
}: LandlordWizardProviderProps) {
  const [data, setData] = useState<Partial<LandlordFormData>>(() => ({
    ...INITIAL_DATA,
    stateCode: initialStateCode,
    property: {
      ...INITIAL_DATA.property!,
      state: initialStateCode || "",
    },
    landlord: {
      ...INITIAL_DATA.landlord!,
      state: initialStateCode || "",
    },
  }));
  const [currentStep, setCurrentStep] = useState(1);
  const [canProceed, setCanProceed] = useState(false);

  const updateData = useCallback((updates: Partial<LandlordFormData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateNestedData = useCallback(
    <K extends keyof LandlordFormData>(
      key: K,
      nestedKey: string,
      value: unknown
    ) => {
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

  const addDeduction = useCallback(
    (deduction: Omit<LandlordDeduction, "id">) => {
      const newDeduction: LandlordDeduction = {
        ...deduction,
        id: crypto.randomUUID(),
      };
      setData((prev) => ({
        ...prev,
        deductions: [...(prev.deductions || []), newDeduction],
      }));
    },
    []
  );

  const removeDeduction = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      deductions: (prev.deductions || []).filter((d) => d.id !== id),
    }));
  }, []);

  const updateDeduction = useCallback(
    (id: string, updates: Partial<LandlordDeduction>) => {
      setData((prev) => ({
        ...prev,
        deductions: (prev.deductions || []).map((d) =>
          d.id === id ? { ...d, ...updates } : d
        ),
      }));
    },
    []
  );

  const nextStep = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, LANDLORD_WIZARD_STEPS.length));
    setCanProceed(false);
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= LANDLORD_WIZARD_STEPS.length) {
      setCurrentStep(step);
    }
  }, []);

  const getMissingFields = useCallback((): string[] => {
    const missing: string[] = [];

    switch (currentStep) {
      case 1: // Demand Letter Info
        if (!data.stateCode) missing.push(FIELD_LABELS.stateCode);
        if (!data.demandLetterDate) missing.push(FIELD_LABELS.demandLetterDate);
        if (!data.depositAmount || data.depositAmount <= 0)
          missing.push(FIELD_LABELS.depositAmount);
        break;
      case 2: // Your Response
        // No required fields - deductions are optional
        break;
      case 3: // Addresses
        if (!data.landlord?.name) missing.push(FIELD_LABELS["landlord.name"]);
        if (!data.landlord?.address)
          missing.push(FIELD_LABELS["landlord.address"]);
        if (!data.landlord?.city) missing.push(FIELD_LABELS["landlord.city"]);
        if (!data.landlord?.zip) missing.push(FIELD_LABELS["landlord.zip"]);
        if (!data.tenant?.name) missing.push(FIELD_LABELS["tenant.name"]);
        if (!data.property?.address)
          missing.push(FIELD_LABELS["property.address"]);
        if (!data.property?.city) missing.push(FIELD_LABELS["property.city"]);
        if (!data.property?.zip) missing.push(FIELD_LABELS["property.zip"]);
        break;
      case 4: // Review
        // All fields already validated in previous steps
        break;
    }

    return missing;
  }, [currentStep, data]);

  const contextValue = useMemo(
    () => ({
      data,
      currentStep,
      totalSteps: LANDLORD_WIZARD_STEPS.length,
      updateData,
      updateNestedData,
      addDeduction,
      removeDeduction,
      updateDeduction,
      nextStep,
      prevStep,
      goToStep,
      canProceed,
      setCanProceed,
      getMissingFields,
    }),
    [
      data,
      currentStep,
      updateData,
      updateNestedData,
      addDeduction,
      removeDeduction,
      updateDeduction,
      nextStep,
      prevStep,
      goToStep,
      canProceed,
      setCanProceed,
      getMissingFields,
    ]
  );

  return (
    <LandlordWizardContext.Provider value={contextValue}>
      {children}
    </LandlordWizardContext.Provider>
  );
}

export function useLandlordWizard() {
  const context = useContext(LandlordWizardContext);
  if (!context) {
    throw new Error(
      "useLandlordWizard must be used within LandlordWizardProvider"
    );
  }
  return context;
}
