"use client";

import type { UIMessage } from "ai";
import { PurchaseCard } from "./PurchaseCard";
import { MilestoneCard } from "./MilestoneCard";
import { StatuteCitation } from "./StatuteCitation";
import { useChat } from "./ChatContext";
import type { PurchaseOffer } from "./ChatContext";

interface ChatMessageProps {
  message: UIMessage;
  isStreaming?: boolean;
}

const MILESTONE_TOOLS = ["analyze_deadline", "calculate_damages", "assess_case_strength"];

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user";
  const { caseData } = useChat();

  // Extract content from message parts
  const textContent = getTextContent(message);
  const toolNames = getToolNames(message);
  const purchaseOffer = getPurchaseOffer(message);
  const fileParts = getFileParts(message);
  const hasAnalysis = toolNames.some((t) => MILESTONE_TOOLS.includes(t));
  const milestoneTools = toolNames.filter((t) => MILESTONE_TOOLS.includes(t));

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-5 animate-messageEnter`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
          isUser
            ? "bg-brand/8 text-gray-900 rounded-br-md"
            : "bg-white text-gray-900 shadow-sm border border-gray-100/80 rounded-bl-md"
        }`}
      >
        {/* File attachments (images / PDFs) */}
        {fileParts.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {fileParts.map((fp, i) =>
              fp.mediaType.startsWith("image/") ? (
                <img
                  key={i}
                  src={fp.url}
                  alt={fp.filename || "Attached image"}
                  className="max-h-48 rounded-lg object-cover border border-gray-200/50"
                />
              ) : (
                <div
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200/50 bg-white/60 px-2.5 py-1.5 text-xs text-gray-600"
                >
                  <svg className="h-3.5 w-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <span className="max-w-[120px] truncate">{fp.filename || "Document"}</span>
                </div>
              )
            )}
          </div>
        )}

        {/* Message content — render with basic formatting */}
        {textContent && (
          <div className="whitespace-pre-wrap break-words">
            {formatContent(textContent)}
            {isStreaming && (
              <span className="inline-block w-0.5 h-[1.1em] bg-accent ml-0.5 rounded-sm animate-cursor-blink align-text-bottom" />
            )}
          </div>
        )}

        {/* Milestone cards for significant tool findings */}
        {milestoneTools.length > 0 && (
          <div className="mt-2 space-y-2 stagger-children">
            {milestoneTools.map((name) => (
              <MilestoneCard key={name} toolName={name} caseData={caseData} />
            ))}
          </div>
        )}

        {/* Tool result badges (e.g., "Analyzed Florida deadlines") */}
        {toolNames.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5 stagger-children">
            {toolNames.map((name, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {formatToolName(name)}
              </span>
            ))}
          </div>
        )}

        {/* Contextual legal disclaimer after analysis results */}
        {!isUser && hasAnalysis && (
          <p className="mt-2.5 text-[11px] leading-relaxed text-gray-400 border-t border-gray-100 pt-2">
            Estimates based on general state law. Consult an attorney for advice specific to your situation.
          </p>
        )}

        {/* In-chat purchase card */}
        {purchaseOffer && (
          <div className="mt-3">
            <PurchaseCard offer={purchaseOffer} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Part extraction helpers ──────────────────────────────────────────

/** Get combined text content from message parts */
function getTextContent(message: UIMessage): string {
  if (!message.parts?.length) return "";
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

/** Get tool names from completed tool invocations (AI SDK v6 format) */
function getToolNames(message: UIMessage): string[] {
  if (!message.parts?.length) return [];
  const TOOL_PREFIX = "tool-";
  const TOOL_NAMES = ["analyze_deadline", "calculate_damages", "assess_case_strength", "recommend_product"];
  return message.parts
    .filter((p) => {
      if (!p.type.startsWith(TOOL_PREFIX)) return false;
      const name = p.type.slice(TOOL_PREFIX.length);
      if (!TOOL_NAMES.includes(name)) return false;
      return (p as { state?: string }).state === "output-available";
    })
    .map((p) => p.type.slice(TOOL_PREFIX.length));
}

/** Extract file parts from user messages */
function getFileParts(message: UIMessage): { mediaType: string; url: string; filename?: string }[] {
  if (message.role !== "user" || !message.parts?.length) return [];
  return message.parts
    .filter((p): p is { type: "file"; mediaType: string; url: string; filename?: string } => p.type === "file")
    .map((p) => ({ mediaType: p.mediaType, url: p.url, filename: p.filename }));
}

/** Extract purchase offer from custom data parts */
function getPurchaseOffer(message: UIMessage): PurchaseOffer | null {
  if (!message.parts?.length) return null;
  const part = message.parts.find((p) => p.type === "data-purchase-offer");
  if (!part) return null;
  return (part as { data: PurchaseOffer }).data;
}

// ── Formatting helpers ───────────────────────────────────────────────

/** Format tool names for display */
function formatToolName(tool: string): string {
  const names: Record<string, string> = {
    analyze_deadline: "Deadline analysis",
    calculate_damages: "Recovery calculation",
    assess_case_strength: "Case strength assessment",
    recommend_product: "Product recommendation",
  };
  return names[tool] || tool;
}

/**
 * Regex matching statute citation formats across all 16 supported states.
 *
 * Matches patterns like:
 *   F.S. 83.49(3)(a)           — Florida
 *   Cal. Civ. Code § 1950.5    — California
 *   765 ILCS 710/1             — Illinois
 *   RCW 59.18.280(1)           — Washington
 *   ORC § 5321.16(B)           — Ohio
 *   M.G.L. c. 186 § 15B(4)    — Massachusetts
 *
 * Structure: abbreviated prefix + optional § + section number + optional sub-sections
 */
const STATUTE_RE =
  /(?:(?:[A-Z][A-Za-z.]{1,20}(?:\s+[A-Za-z.]+){0,4})\s*§\s*[\d][\w.:-]*(?:\([^)]*\))*|F\.S\.\s*[\d]+\.[\d]+(?:\([^)]*\))*|\d+\s+(?:ILCS|Pa\.\s*Stat\.)\s*[\d]+(?:\/[\d]+)?(?:\([^)]*\))*|(?:RCW|MCL)\s*[\d]+\.[\d]+\.[\d]+(?:\([^)]*\))*)/g;

/** Basic markdown-lite formatting for chat messages */
function formatContent(content: string): React.ReactNode {
  if (!content) return null;

  // First pass: split by **bold** markers
  const boldParts = content.split(/(\*\*[^*]+\*\*)/g);

  return boldParts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Second pass on plain text: detect statute citations
    const segments = splitByCitations(part);
    if (segments.length === 1 && !segments[0].isCitation) {
      return part;
    }
    return segments.map((seg, j) =>
      seg.isCitation ? (
        <StatuteCitation key={`${i}-${j}`} citation={seg.text} />
      ) : (
        <span key={`${i}-${j}`}>{seg.text}</span>
      )
    );
  });
}

/** Split text into segments of plain text and statute citations */
function splitByCitations(text: string): { text: string; isCitation: boolean }[] {
  const segments: { text: string; isCitation: boolean }[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(STATUTE_RE)) {
    const start = match.index;
    if (start > lastIndex) {
      segments.push({ text: text.slice(lastIndex, start), isCitation: false });
    }
    segments.push({ text: match[0], isCitation: true });
    lastIndex = start + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), isCitation: false });
  }

  return segments.length ? segments : [{ text, isCitation: false }];
}
