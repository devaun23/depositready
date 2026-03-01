"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type { StateCode, CaseStrength, CaseStrengthFactor } from "@/lib/state-rules/types";

// ── Types shared across chat components ──────────────────────────────

export interface PurchaseOffer {
  product: "demand_letter" | "legal_packet" | "case_review";
  headline: string;
  description: string;
  price: number; // cents
  features: string[];
  stateName: string | null;
  statute: string | null;
  recoveryAmount: number | null;
}

// ── Case data (extracted from conversation) ─────────────────────────

export interface CaseData {
  // Core
  stateCode: StateCode | null;
  stateName: string | null;
  depositAmount: number | null;
  moveOutDate: string | null;

  // Case strength (scored assessment)
  caseStrength: CaseStrength | null;
  caseScore: number | null;
  caseFactors: CaseStrengthFactor[];

  // Deadline analysis
  violationDetected: boolean | null;
  violationType: string | null;
  deadlineDate: string | null;
  daysLate: number | null;
  statute: string | null;

  // State law details
  returnDeadlineDays: number | null;
  claimDeadlineDays: number | null;
  certifiedMailRequired: boolean | null;
  damagesMultiplier: number | null;
  damagesDescription: string | null;

  // Recovery details
  recoveryAmount: number | null;
  amountOwed: number | null;
  multiplierDamagesEligible: boolean | null;
  multiplierDamagesAmount: number | null;
  smallClaimsEligible: boolean | null;

  // Court info
  courtName: string | null;
  filingFee: { min: number; max: number } | null;
  maxSmallClaims: number | null;
}

const EMPTY_CASE_DATA: CaseData = {
  stateCode: null,
  stateName: null,
  depositAmount: null,
  moveOutDate: null,
  caseStrength: null,
  caseScore: null,
  caseFactors: [],
  violationDetected: null,
  violationType: null,
  deadlineDate: null,
  daysLate: null,
  statute: null,
  returnDeadlineDays: null,
  claimDeadlineDays: null,
  certifiedMailRequired: null,
  damagesMultiplier: null,
  damagesDescription: null,
  recoveryAmount: null,
  amountOwed: null,
  multiplierDamagesEligible: null,
  multiplierDamagesAmount: null,
  smallClaimsEligible: null,
  courtName: null,
  filingFee: null,
  maxSmallClaims: null,
};

// ── Context shape ───────────────────────────────────────────────────

interface ChatContextType {
  // Case data (populated by tool calls)
  caseData: CaseData;
  updateCaseData: (updates: Partial<CaseData>) => void;

  // Session
  sessionToken: string;

  // Summary card visibility (mobile)
  showSummary: boolean;
  setShowSummary: (v: boolean) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

// ── Provider ────────────────────────────────────────────────────────

function getOrCreateSessionToken(): string {
  if (typeof window === "undefined") return "";
  const key = "dr_chat_session";
  let token = localStorage.getItem(key);
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem(key, token);
  }
  return token;
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [caseData, setCaseData] = useState<CaseData>(EMPTY_CASE_DATA);
  const [showSummary, setShowSummary] = useState(false);

  const sessionTokenRef = useRef<string>("");
  if (!sessionTokenRef.current && typeof window !== "undefined") {
    sessionTokenRef.current = getOrCreateSessionToken();
  }

  const updateCaseData = useCallback((updates: Partial<CaseData>) => {
    setCaseData((prev) => ({ ...prev, ...updates }));
  }, []);

  const value = useMemo(
    () => ({
      caseData,
      updateCaseData,
      sessionToken: sessionTokenRef.current,
      showSummary,
      setShowSummary,
    }),
    [caseData, updateCaseData, showSummary]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

// ── Hook ────────────────────────────────────────────────────────────

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
