/**
 * Input/output guardrails for the chat AI.
 *
 * Input: reject prompt injection and off-topic manipulation.
 * Output: flag if Claude breaks character (claims to be a lawyer, guarantees outcomes).
 */

// ── Input guardrails ────────────────────────────────────────────────

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /ignore\s+(all\s+)?above\s+instructions/i,
  /you\s+are\s+now\s+a\s+lawyer/i,
  /act\s+as\s+(a\s+)?lawyer/i,
  /pretend\s+you\s+are\s+(a\s+)?lawyer/i,
  /what\s+are\s+your\s+(system\s+)?instructions/i,
  /show\s+me\s+your\s+(system\s+)?prompt/i,
  /reveal\s+your\s+(system\s+)?prompt/i,
  /repeat\s+your\s+(system\s+)?instructions/i,
  /print\s+your\s+(system\s+)?prompt/i,
  /output\s+your\s+(system\s+)?prompt/i,
  /disregard\s+(all\s+)?prior/i,
  /jailbreak/i,
  /DAN\s+mode/i,
];

const REDIRECT_MESSAGE =
  "I'm here to help with security deposit questions! What happened with your deposit?";

/**
 * Check user input for prompt injection or manipulation attempts.
 * Returns null if clean, or a redirect message if flagged.
 */
export function checkInput(message: string): string | null {
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(message)) {
      return REDIRECT_MESSAGE;
    }
  }
  return null;
}

// ── Output guardrails ───────────────────────────────────────────────

interface OutputFlag {
  type: "lawyer_claim" | "guaranteed_outcome" | "ungrounded_citation";
  detail: string;
}

const LAWYER_PATTERNS = [
  /as\s+your\s+attorney/i,
  /I\s+am\s+a\s+lawyer/i,
  /I\s+am\s+an?\s+attorney/i,
  /my\s+legal\s+advice/i,
  /I\s+advise\s+you\s+to/i,
  /this\s+constitutes\s+legal\s+advice/i,
];

const GUARANTEE_PATTERNS = [
  /you\s+will\s+recover/i,
  /guaranteed\s+to\s+recover/i,
  /you\s+will\s+get\s+back/i,
  /guaranteed\s+recovery/i,
  /I\s+guarantee/i,
  /100%\s+chance/i,
];

/**
 * Scan Claude's output for problematic patterns.
 * Returns an array of flags (empty if clean).
 * Callers can decide whether to strip, append disclaimers, or log.
 */
export function checkOutput(
  text: string,
  toolCitations?: string[]
): OutputFlag[] {
  const flags: OutputFlag[] = [];

  for (const pattern of LAWYER_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      flags.push({ type: "lawyer_claim", detail: match[0] });
    }
  }

  for (const pattern of GUARANTEE_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      flags.push({ type: "guaranteed_outcome", detail: match[0] });
    }
  }

  // Check for statute citations not present in tool results
  if (toolCitations?.length) {
    // Match patterns like "F.S. 83.49(3)(a)" or "§ 7-108" or "CCC § 1950.5"
    const citationRegex = /(?:F\.S\.|§|Section|Statute)\s*[\d§.()-]+(?:\([a-zA-Z0-9]+\))*/g;
    const outputCitations = text.match(citationRegex) || [];

    for (const citation of outputCitations) {
      const normalized = citation.replace(/\s+/g, " ").trim();
      const grounded = toolCitations.some(
        (tc) => normalized.includes(tc) || tc.includes(normalized)
      );
      if (!grounded) {
        flags.push({
          type: "ungrounded_citation",
          detail: `Citation "${normalized}" not found in tool results`,
        });
      }
    }
  }

  return flags;
}
