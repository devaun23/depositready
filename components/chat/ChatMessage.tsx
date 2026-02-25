"use client";

import type { ChatMessage as ChatMessageType } from "./ChatContext";
import { PurchaseCard } from "./PurchaseCard";

interface ChatMessageProps {
  message: ChatMessageType;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-5 animate-fadeSlideUp`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
          isUser
            ? "bg-brand/8 text-gray-900 rounded-br-md"
            : "bg-white text-gray-900 shadow-sm border border-gray-100/80 rounded-bl-md"
        }`}
      >
        {/* Message content — render with basic formatting */}
        <div className="whitespace-pre-wrap break-words">
          {formatContent(message.content)}
          {isStreaming && (
            <span className="inline-block w-1.5 h-4 bg-accent ml-0.5 animate-pulse rounded-full" />
          )}
        </div>

        {/* Tool result badges (e.g., "Analyzed Florida deadlines") */}
        {message.toolResults && message.toolResults.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {message.toolResults.map((tr, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {formatToolName(tr.tool)}
              </span>
            ))}
          </div>
        )}

        {/* Contextual legal disclaimer after analysis results */}
        {!isUser && hasAnalysisResults(message) && (
          <p className="mt-2.5 text-[11px] leading-relaxed text-gray-400 border-t border-gray-100 pt-2">
            Estimates based on general state law. Consult an attorney for advice specific to your situation.
          </p>
        )}

        {/* In-chat purchase card */}
        {message.purchaseOffer && (
          <div className="mt-3">
            <PurchaseCard offer={message.purchaseOffer} />
          </div>
        )}
      </div>
    </div>
  );
}

/** Check if message contains analysis tool results (not just product recommendations) */
function hasAnalysisResults(message: ChatMessageType): boolean {
  if (!message.toolResults?.length) return false;
  const analysisTools = ["analyze_deadline", "calculate_damages", "assess_case_strength"];
  return message.toolResults.some((tr) => analysisTools.includes(tr.tool));
}

/** Format tool names for display */
function formatToolName(tool: string): string {
  const names: Record<string, string> = {
    analyze_deadline: "Deadline analysis",
    calculate_damages: "Recovery calculation",
    lookup_statute: "Statute lookup",
    assess_case_strength: "Case strength assessment",
  };
  return names[tool] || tool;
}

/** Basic markdown-lite formatting for chat messages */
function formatContent(content: string): React.ReactNode {
  if (!content) return null;

  // Split by **bold** markers and render
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
