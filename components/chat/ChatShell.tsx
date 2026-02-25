"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useChat } from "./ChatContext";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { CaseSummaryCard } from "./CaseSummaryCard";
import type { ToolResult, PurchaseOffer } from "./ChatContext";

const GREETING =
  "Hi! I'm your deposit recovery assistant. Tell me what happened with your security deposit, and I'll help you understand your rights and options.\n\nFor example: *\"I moved out of my apartment 2 months ago and never got my deposit back.\"*";

export function ChatShell() {
  const {
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
    sessionToken,
    showSummary,
    setShowSummary,
  } = useChat();

  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Auto-scroll on new messages or streaming updates
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingMessageId]);

  // ── Send message → stream response ──────────────────────────────

  const sendMessage = useCallback(
    async (content: string) => {
      if (isStreaming) return;

      // Add user message to state
      addUserMessage(content);

      // Build message history for API
      const history = [
        ...messages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
        { role: "user" as const, content },
      ];

      // Create placeholder assistant message
      const assistantId = crypto.randomUUID();
      addAssistantMessage(assistantId, { content: "" });
      setIsStreaming(true);
      setStreamingMessageId(assistantId);

      // Abort any previous request
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      let fullContent = "";
      const toolResults: ToolResult[] = [];
      let purchaseOffer: PurchaseOffer | undefined;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history, sessionToken }),
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Chat API error: ${res.status}`);
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No response stream");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const event = JSON.parse(data);

              if (event.type === "text") {
                fullContent += event.content;
                updateAssistantStream(assistantId, fullContent);
              } else if (event.type === "tool_result") {
                toolResults.push({
                  tool: event.tool,
                  result: event.result,
                });
                // Update case data from tool results
                applyToolResult(event.tool, event.result, updateCaseData, setShowSummary);
              } else if (event.type === "purchase_offer") {
                purchaseOffer = event.offer;
              } else if (event.type === "error") {
                fullContent += "\n\nI'm sorry, something went wrong. Please try again.";
                updateAssistantStream(assistantId, fullContent);
              }
            } catch {
              // Skip malformed JSON lines
            }
          }
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          fullContent =
            fullContent || "I'm sorry, I couldn't process that. Please try again.";
          updateAssistantStream(assistantId, fullContent);
        }
      } finally {
        finalizeAssistantMessage(
          assistantId,
          fullContent,
          toolResults.length ? toolResults : undefined,
          purchaseOffer
        );
        setIsStreaming(false);
        setStreamingMessageId(null);
      }
    },
    [
      messages,
      isStreaming,
      sessionToken,
      addUserMessage,
      addAssistantMessage,
      updateAssistantStream,
      finalizeAssistantMessage,
      setIsStreaming,
      setStreamingMessageId,
      updateCaseData,
      setShowSummary,
    ]
  );

  const hasCaseData = caseData.stateCode || caseData.depositAmount || caseData.violationDetected !== null;

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

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mx-auto max-w-3xl">
            {/* Greeting message */}
            <div className="mb-4 flex justify-start animate-fadeIn">
              <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-gray-100 bg-white px-4 py-3 text-[15px] leading-relaxed text-gray-900 shadow-sm">
                <div className="whitespace-pre-wrap">{formatGreeting(GREETING)}</div>
              </div>
            </div>

            {/* Conversation */}
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isStreaming={msg.id === streamingMessageId}
              />
            ))}

            {/* Typing indicator */}
            {isStreaming && streamingMessageId && messages.find(m => m.id === streamingMessageId)?.content === "" && (
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
        <ChatInput onSend={sendMessage} disabled={isStreaming} />
      </div>

      {/* ── Desktop sidebar (case summary) ─────────────────── */}
      {hasCaseData && (
        <aside className="hidden w-80 shrink-0 border-l border-gray-200 bg-gray-50/50 lg:block">
          <CaseSummaryCard />
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
    });
    // Show summary on mobile when first analysis arrives
    setShowSummary(true);
  }

  if (tool === "calculate_damages") {
    updateCaseData({
      depositAmount: result.depositAmount as number,
      recoveryAmount: result.maxRecoverable as number,
      damagesMultiplier: result.damagesMultiplier as number,
    });
  }

  if (tool === "assess_case_strength") {
    updateCaseData({
      caseStrength: result.caseStrength as string,
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
