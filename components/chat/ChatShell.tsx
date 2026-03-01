"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useChat as useChatSDK } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useChat } from "./ChatContext";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { CaseSummaryCard } from "./CaseSummaryCard";
import { ChatTestimonials } from "./ChatTestimonials";

const RETURNING_GREETING =
  "Welcome back! I still have your case details from our last conversation. Feel free to pick up where we left off, or ask me anything about your deposit situation.";

const SUGGESTION_CHIPS = [
  "My landlord kept my deposit",
  "Unfair deductions on my deposit",
  "How much can I recover?",
];

const TOOL_LABELS: Record<string, string> = {
  analyze_deadline: "Checking deadlines",
  calculate_damages: "Calculating recovery",
  assess_case_strength: "Assessing case strength",
  recommend_product: "Finding best option",
};

export function ChatShell({ initialMessage }: { initialMessage?: string }) {
  const {
    caseData,
    updateCaseData,
    sessionToken,
    showSummary,
    setShowSummary,
  } = useChat();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [isReturningUser, setIsReturningUser] = useState(false);

  // ── AI SDK useChat ──────────────────────────────────────────────
  const {
    messages,
    setMessages,
    sendMessage,
    status,
    stop,
  } = useChatSDK({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { sessionToken },
    }),
    onData: (dataPart) => {
      // Handle transient custom data parts for case data updates
      if (dataPart.type === "data-tool-result") {
        const { tool, result } = dataPart.data as {
          tool: string;
          result: Record<string, unknown>;
        };
        applyToolResult(tool, result, updateCaseData, setShowSummary);
      }
    },
  });

  // ── Restore session on mount ──────────────────────────────────
  useEffect(() => {
    if (!sessionToken) {
      setSessionLoading(false);
      return;
    }

    fetch(`/api/chat/session?token=${encodeURIComponent(sessionToken)}`)
      .then((res) => res.json())
      .then((data) => {
        // Restore messages
        if (data.messages?.length > 0) {
          const restored = data.messages.map((m: { role: string; content: string }, i: number) => ({
            id: `restored-${i}`,
            role: m.role,
            parts: [{ type: "text", text: m.content }],
          }));
          setMessages(restored);
          setIsReturningUser(true);
        }

        // Restore case data
        if (data.caseData) {
          updateCaseData(data.caseData);
          setShowSummary(true);
        }
      })
      .catch(() => {
        // Session load failed — not critical, just start fresh
      })
      .finally(() => setSessionLoading(false));
  }, [sessionToken]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Auto-send initialMessage after session loads ─────────────
  const initialSentRef = useRef(false);
  useEffect(() => {
    if (sessionLoading || !initialMessage || initialSentRef.current) return;
    initialSentRef.current = true;
    const timer = setTimeout(() => {
      sendMessage({ text: initialMessage });
    }, 300);
    return () => clearTimeout(timer);
  }, [sessionLoading, initialMessage, sendMessage]);

  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll on new messages
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  // ── Send handler for ChatInput ─────────────────────────────────
  const handleSend = useCallback(
    (content: string) => {
      if (isLoading) return;
      sendMessage({ text: content });
    },
    [isLoading, sendMessage]
  );

  // ── Detect active tool from streaming message parts ─────
  const activeToolName = (() => {
    if (!isLoading || messages.length === 0) return null;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role !== "assistant" || !lastMsg.parts) return null;
    for (const part of lastMsg.parts) {
      if (part.type.startsWith("tool-") && (part as { state?: string }).state !== "output-available") {
        return part.type.slice(5); // strip "tool-" prefix
      }
    }
    return null;
  })();

  const hasCaseData =
    caseData.stateCode || caseData.depositAmount || caseData.violationDetected !== null;

  const hasMessages = messages.length > 0;
  const showEmptyState = !sessionLoading && !hasMessages && !isReturningUser;

  return (
    <div className="flex h-full flex-col lg:flex-row">
      {/* ── Main chat area ─────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
          <Link
            href="/"
            className="text-sm font-medium text-gray-500 hover:text-brand transition-colors"
          >
            &larr; DepositReady
          </Link>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <h1 className="font-serif text-lg font-semibold text-brand">
              Deposit Recovery Chat
            </h1>
          </div>
          {/* Mobile summary toggle */}
          {hasCaseData && (
            <button
              onClick={() => setShowSummary(!showSummary)}
              className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent lg:hidden"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Case
            </button>
          )}
          {/* Desktop spacer when no case data */}
          {!hasCaseData && <div className="w-16" />}
        </header>

        {/* Collapsed legal disclaimer — shield icon + tooltip */}
        <div className="flex items-center justify-center gap-1.5 border-b border-gray-100 bg-gray-50/80 px-4 py-1.5 text-center text-[11px] text-gray-400">
          <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>
            General information, not legal advice.{" "}
            <a href="https://www.findlegalhelp.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-500">
              Find an attorney
            </a>
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-stone-50 px-4 py-6">
          <div className="mx-auto max-w-3xl">
            {/* Loading skeleton while restoring session */}
            {sessionLoading && (
              <div className="mb-4 flex justify-start animate-messageEnter">
                <div className="max-w-[60%] rounded-2xl rounded-bl-md border border-gray-100 bg-white px-4 py-3 shadow-sm space-y-2">
                  <div className="shimmer-line w-3/4" />
                  <div className="shimmer-line w-1/2" />
                </div>
              </div>
            )}

            {/* ── Empty state with suggestion chips ─────────── */}
            {showEmptyState && (
              <div className="flex flex-col items-center justify-center py-12 animate-fadeIn">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 mb-5">
                  <svg className="h-7 w-7 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="font-serif text-xl font-semibold text-brand mb-2">
                  What happened with your deposit?
                </h2>
                <p className="text-sm text-gray-400 mb-8">
                  Free analysis. No sign-up.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {SUGGESTION_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleSend(chip)}
                      className="rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 shadow-sm transition-all hover:border-accent hover:bg-accent/5 hover:text-accent active:scale-[0.97] min-h-[44px]"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Returning user greeting */}
            {!sessionLoading && !showEmptyState && !hasMessages && (
              <div className="mb-4 flex justify-start animate-fadeIn">
                <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-gray-100/80 bg-white px-4 py-3 text-[15px] leading-relaxed text-gray-900 shadow-sm">
                  <div className="whitespace-pre-wrap">
                    {formatGreeting(RETURNING_GREETING)}
                  </div>
                </div>
              </div>
            )}

            {/* Conversation */}
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isStreaming={isLoading && msg === messages[messages.length - 1] && msg.role === "assistant"}
              />
            ))}

            {/* ── Shimmer thinking indicator ──────────────────── */}
            {isLoading && (messages.length === 0 || messages[messages.length - 1]?.role === "user") && (
              <div className="flex justify-start mb-4 animate-messageEnter">
                <div className="rounded-2xl rounded-bl-md border border-gray-100 bg-white px-4 py-3 shadow-sm min-w-[200px]">
                  {/* Status label */}
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    <span className="text-xs text-gray-400">
                      {activeToolName ? (TOOL_LABELS[activeToolName] || "Processing") : "Analyzing"}...
                    </span>
                  </div>
                  {/* Shimmer bars */}
                  <div className="space-y-2">
                    <div className="shimmer-line" style={{ width: "85%" }} />
                    <div className="shimmer-line" style={{ width: "70%", animationDelay: "0.15s" }} />
                    <div className="shimmer-line" style={{ width: "78%", animationDelay: "0.3s" }} />
                  </div>
                </div>
              </div>
            )}

            {/* ── Tool execution indicator (mid-stream) ───────── */}
            {isLoading && activeToolName && messages[messages.length - 1]?.role === "assistant" && (
              <div className="flex items-center gap-2 mb-3 ml-1 animate-fadeIn">
                <svg className="h-3.5 w-3.5 text-accent animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="text-xs text-gray-400">
                  {TOOL_LABELS[activeToolName] || "Processing"}...
                </span>
              </div>
            )}

            <div ref={scrollRef} />
          </div>
        </div>

        {/* Input */}
        <ChatInput onSend={handleSend} disabled={isLoading || sessionLoading} />
      </div>

      {/* ── Desktop sidebar (case summary + testimonials) ──── */}
      {hasCaseData && (
        <aside className="hidden w-80 shrink-0 border-l border-gray-200 bg-gray-50/50 lg:block overflow-y-auto">
          <CaseSummaryCard />
          <div className="border-t border-gray-200">
            <ChatTestimonials />
          </div>
        </aside>
      )}

      {/* ── Mobile bottom sheet (case summary) ──────────────── */}
      {showSummary && hasCaseData && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowSummary(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[70vh] overflow-y-auto rounded-t-2xl bg-white pb-[env(safe-area-inset-bottom)] animate-slideUp">
            <div className="sticky top-0 flex justify-center bg-white pt-3 pb-2">
              <div className="h-1 w-10 rounded-full bg-gray-300" />
            </div>
            <CaseSummaryCard />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────────

/** Apply tool results to case data */
function applyToolResult(
  tool: string,
  result: Record<string, unknown>,
  updateCaseData: (updates: Record<string, unknown>) => void,
  setShowSummary: (v: boolean) => void
) {
  if (tool === "analyze_deadline") {
    updateCaseData({
      stateCode: result.stateCode as string,
      stateName: result.stateName as string,
      violationDetected: result.landlordInViolation as boolean,
      violationType: result.violationType as string,
      deadlineDate: result.claimDeadline as string,
      daysLate: result.daysLate as number,
      statute: result.statute as string,
      returnDeadlineDays: result.returnDeadlineDays as number,
      claimDeadlineDays: result.claimDeadlineDays as number,
      certifiedMailRequired: result.certifiedMailRequired as boolean,
      maxSmallClaims: result.maxSmallClaims as number,
      filingFee: result.filingFee as { min: number; max: number },
      courtName: result.courtName as string,
      damagesMultiplier: result.damagesMultiplier as number,
      damagesDescription: result.damagesDescription as string,
    });
    setShowSummary(true);
  }

  if (tool === "calculate_damages") {
    updateCaseData({
      depositAmount: result.depositAmount as number,
      recoveryAmount: result.maxRecoverable as number,
      damagesMultiplier: result.damagesMultiplier as number,
      amountOwed: result.amountOwed as number,
      multiplierDamagesEligible: result.multiplierDamagesEligible as boolean,
      multiplierDamagesAmount: result.multiplierDamagesAmount as number,
      smallClaimsEligible: result.smallClaimsEligible as boolean,
    });
  }

  if (tool === "assess_case_strength") {
    updateCaseData({
      caseStrength: result.caseStrength as string,
      caseScore: result.caseScore as number,
      caseFactors: result.caseFactors as Array<{ name: string; impact: string; detail: string }>,
    });
  }
}

/** Format greeting with basic italic support */
function formatGreeting(text: string): React.ReactNode {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
      return (
        <em key={i} className="text-gray-500">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}
