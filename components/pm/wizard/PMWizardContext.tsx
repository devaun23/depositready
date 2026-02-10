"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import type { PMFormData, PMDeduction } from "@/types/pm";
import { calculatePMDeadlines } from "@/lib/pm";
import type { PMDeadlineAnalysis } from "@/lib/pm";
import { FLORIDA } from "@/lib/state-rules";

interface PMWizardContextType {
  data: Partial<PMFormData>;
  currentStep: number;
  totalSteps: number;
  updateData: (updates: Partial<PMFormData>) => void;
  updateNestedData: <K extends keyof PMFormData>(
    key: K,
    nestedKey: string,
    value: unknown
  ) => void;
  addDeduction: (deduction: Omit<PMDeduction, "id">) => void;
  removeDeduction: (id: string) => void;
  updateDeduction: (id: string, updates: Partial<PMDeduction>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  canProceed: boolean;
  setCanProceed: (value: boolean) => void;
  getMissingFields: () => string[];
  deadlineAnalysis: PMDeadlineAnalysis | null;
}

const PMWizardContext = createContext<PMWizardContextType | null>(null);

export const PM_WIZARD_STEPS = [
  { id: 1, title: "Property & Lease", shortTitle: "Property" },
  { id: 2, title: "Deductions", shortTitle: "Deductions" },
  { id: 3, title: "Tenant Info", shortTitle: "Tenant" },
  { id: 4, title: "Company Info", shortTitle: "Company" },
  { id: 5, title: "Review & Pay", shortTitle: "Review" },
] as const;

const FIELD_LABELS: Record<string, string> = {
  "property.address": "Property address",
  "property.city": "Property city",
  "property.zip": "Property ZIP code",
  moveOutDate: "Move-out date",
  depositAmount: "Deposit amount",
  "tenant.name": "Tenant name",
  "tenant.forwardingAddress": "Tenant forwarding address",
  "tenant.city": "Tenant city",
  "tenant.zip": "Tenant ZIP code",
  "company.companyName": "Company name",
  "company.managerName": "Manager name",
  "company.address": "Company address",
  "company.email": "Company email",
};

const INITIAL_DATA: Partial<PMFormData> = {
  stateCode: "FL",
  property: { address: "", city: "", state: "FL", zip: "" },
  leaseStartDate: "",
  leaseEndDate: "",
  moveOutDate: "",
  depositAmount: 0,
  deductions: [],
  tenant: { name: "", forwardingAddress: "", city: "", state: "", zip: "" },
  company: {
    companyName: "",
    managerName: "",
    address: "",
    city: "",
    state: "FL",
    zip: "",
    phone: "",
    email: "",
  },
};

interface PMWizardProviderProps {
  children: ReactNode;
}

export function PMWizardProvider({ children }: PMWizardProviderProps) {
  const [data, setData] = useState<Partial<PMFormData>>({ ...INITIAL_DATA });
  const [currentStep, setCurrentStep] = useState(1);
  const [canProceed, setCanProceed] = useState(false);

  const updateData = useCallback((updates: Partial<PMFormData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateNestedData = useCallback(
    <K extends keyof PMFormData>(key: K, nestedKey: string, value: unknown) => {
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
    (deduction: Omit<PMDeduction, "id">) => {
      const newDeduction: PMDeduction = {
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
    (id: string, updates: Partial<PMDeduction>) => {
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
    setCurrentStep((s) => Math.min(s + 1, PM_WIZARD_STEPS.length));
    setCanProceed(false);
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= PM_WIZARD_STEPS.length) {
      setCurrentStep(step);
    }
  }, []);

  const deadlineAnalysis = useMemo(() => {
    if (!data.moveOutDate) return null;
    try {
      return calculatePMDeadlines(new Date(data.moveOutDate), FLORIDA);
    } catch {
      return null;
    }
  }, [data.moveOutDate]);

  const getMissingFields = useCallback((): string[] => {
    const missing: string[] = [];

    switch (currentStep) {
      case 1:
        if (!data.property?.address) missing.push(FIELD_LABELS["property.address"]);
        if (!data.property?.city) missing.push(FIELD_LABELS["property.city"]);
        if (!data.property?.zip) missing.push(FIELD_LABELS["property.zip"]);
        if (!data.moveOutDate) missing.push(FIELD_LABELS.moveOutDate);
        if (!data.depositAmount || data.depositAmount <= 0)
          missing.push(FIELD_LABELS.depositAmount);
        break;
      case 2:
        // Deductions are optional — PM might want to document a full return
        break;
      case 3:
        if (!data.tenant?.name) missing.push(FIELD_LABELS["tenant.name"]);
        if (!data.tenant?.forwardingAddress)
          missing.push(FIELD_LABELS["tenant.forwardingAddress"]);
        if (!data.tenant?.city) missing.push(FIELD_LABELS["tenant.city"]);
        if (!data.tenant?.zip) missing.push(FIELD_LABELS["tenant.zip"]);
        break;
      case 4:
        if (!data.company?.companyName)
          missing.push(FIELD_LABELS["company.companyName"]);
        if (!data.company?.managerName)
          missing.push(FIELD_LABELS["company.managerName"]);
        if (!data.company?.address) missing.push(FIELD_LABELS["company.address"]);
        if (!data.company?.email) missing.push(FIELD_LABELS["company.email"]);
        break;
      case 5:
        break;
    }

    return missing;
  }, [currentStep, data]);

  const contextValue = useMemo(
    () => ({
      data,
      currentStep,
      totalSteps: PM_WIZARD_STEPS.length,
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
      deadlineAnalysis,
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
      deadlineAnalysis,
    ]
  );

  return (
    <PMWizardContext.Provider value={contextValue}>
      {children}
    </PMWizardContext.Provider>
  );
}

export function usePMWizard() {
  const context = useContext(PMWizardContext);
  if (!context) {
    throw new Error("usePMWizard must be used within PMWizardProvider");
  }
  return context;
}
