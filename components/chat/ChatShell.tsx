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

const GREETING =
  "Hi! I'm your deposit recovery assistant. Tell me what happened with your security deposit, and I'll help you understand your rights and options.\n\nFor example: *\"I moved out of my apartment 2 months ago and never got my deposit back.\"*";

const RETURNING_GREETING =
  "Welcome back! I still have your case details from our last conversation. Feel free to pick up where we left off, or ask me anything about your deposit situation.";

export function ChatShell() {
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

  const hasCaseData =
    caseData.stateCode || caseData.depositAmount || caseData.violationDetected !== null;

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
          <h1 className="font-serif text-lg font-semibold text-brand">
            Deposit Recovery Chat
          </h1>
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

        {/* Legal disclaimer banner */}
        <div className="flex items-center justify-center gap-1.5 border-b border-gray-100 bg-gray-50 px-4 py-2 text-center text-xs text-gray-500 leading-relaxed">
          <svg className="h-3.5 w-3.5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>
            General information about security deposit laws, not legal advice. Not a substitute for a{" "}
            <a href="https://www.findlegalhelp.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
              licensed attorney
            </a>.
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-stone-50 px-4 py-6">
          <div className="mx-auto max-w-3xl">
            {/* Loading skeleton while restoring session */}
            {sessionLoading && (
              <div className="mb-4 flex justify-start animate-pulse">
                <div className="max-w-[60%] rounded-2xl rounded-bl-md border border-gray-100 bg-white px-4 py-3 shadow-sm space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            )}

            {/* Greeting message (hidden while loading) */}
            {!sessionLoading && (
              <div className="mb-4 flex justify-start animate-fadeIn">
                <div className="max-w-[80%] rounded-2xl rounded-bl-md border border-gray-100/80 bg-white px-4 py-3 text-[15px] leading-relaxed text-gray-900 shadow-sm">
                  <div className="whitespace-pre-wrap">
                    {formatGreeting(isReturningUser ? RETURNING_GREETING : GREETING)}
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

            {/* Typing indicator */}
            {isLoading && (messages.length === 0 || messages[messages.length - 1]?.role === "user") && (
              <div className="flex justify-start mb-4">
                <div className="rounded-2xl rounded-bl-md border border-gray-100 bg-white px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
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
