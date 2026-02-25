"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type { StateCode, CaseStrength } from "@/lib/state-rules/types";

// ── Message types ───────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  /** Tool results embedded in the message (e.g., deadline analysis) */
  toolResults?: ToolResult[];
  /** In-chat purchase card to render */
  purchaseOffer?: PurchaseOffer;
  createdAt: number;
}

export interface ToolResult {
  tool: string;
  result: Record<string, unknown>;
}

export interface PurchaseOffer {
  product: "demand_letter" | "legal_packet" | "case_review";
  headline: string;
  description: string;
  price: number; // cents
}

// ── Case data (extracted from conversation) ─────────────────────────

export interface CaseData {
  stateCode: StateCode | null;
  stateName: string | null;
  depositAmount: number | null;
  moveOutDate: string | null;
  caseStrength: CaseStrength | null;
  violationDetected: boolean | null;
  violationType: string | null;
  recoveryAmount: number | null;
  deadlineDate: string | null;
  daysLate: number | null;
  statute: string | null;
  damagesMultiplier: number | null;
}

const EMPTY_CASE_DATA: CaseData = {
  stateCode: null,
  stateName: null,
  depositAmount: null,
  moveOutDate: null,
  caseStrength: null,
  violationDetected: null,
  violationType: null,
  recoveryAmount: null,
  deadlineDate: null,
  daysLate: null,
  statute: null,
  damagesMultiplier: null,
};

// ── Context shape ───────────────────────────────────────────────────

interface ChatContextType {
  // Messages
  messages: ChatMessage[];
  addUserMessage: (content: string) => void;
  addAssistantMessage: (id: string, msg: Omit<ChatMessage, "id" | "role" | "createdAt">) => void;
  updateAssistantStream: (id: string, content: string) => void;
  finalizeAssistantMessage: (id: string, content: string, toolResults?: ToolResult[], purchaseOffer?: PurchaseOffer) => void;

  // Streaming state
  isStreaming: boolean;
  setIsStreaming: (v: boolean) => void;
  streamingMessageId: string | null;
  setStreamingMessageId: (id: string | null) => void;

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
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const [caseData, setCaseData] = useState<CaseData>(EMPTY_CASE_DATA);
  const [showSummary, setShowSummary] = useState(false);

  const sessionTokenRef = useRef<string>("");
  if (!sessionTokenRef.current && typeof window !== "undefined") {
    sessionTokenRef.current = getOrCreateSessionToken();
  }

  const addUserMessage = useCallback((content: string) => {
    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: Date.now(),
    };
    setMessages((prev) => [...prev, msg]);
  }, []);

  const addAssistantMessage = useCallback(
    (id: string, partial: Omit<ChatMessage, "id" | "role" | "createdAt">) => {
      const msg: ChatMessage = {
        ...partial,
        id,
        role: "assistant",
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, msg]);
    },
    []
  );

  const updateAssistantStream = useCallback((id: string, content: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, content } : m))
    );
  }, []);

  const finalizeAssistantMessage = useCallback(
    (id: string, content: string, toolResults?: ToolResult[], purchaseOffer?: PurchaseOffer) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, content, toolResults, purchaseOffer } : m
        )
      );
    },
    []
  );

  const updateCaseData = useCallback((updates: Partial<CaseData>) => {
    setCaseData((prev) => ({ ...prev, ...updates }));
  }, []);

  const value = useMemo(
    () => ({
      messages,
      addUserMessage,
      addAssistantMessage,
      updateAssistantStream,
      finalizeAssistantMessage,
      isStreaming,
      setIsStreaming,
      streamingMessageId,
      setStreamingMessageId,
      caseData,
      updateCaseData,
      sessionToken: sessionTokenRef.current,
      showSummary,
      setShowSummary,
    }),
    [
      messages,
      addUserMessage,
      addAssistantMessage,
      updateAssistantStream,
      finalizeAssistantMessage,
      isStreaming,
      streamingMessageId,
      caseData,
      updateCaseData,
      showSummary,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

// ── Hook ────────────────────────────────────────────────────────────

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
