"use client";

import { useState, useCallback } from "react";

interface InlinePulseProps {
  pagePath: string;
  question?: string;
  context?: Record<string, unknown>;
}

export function InlinePulse({
  pagePath,
  question = "Was this helpful?",
  context,
}: InlinePulseProps) {
  const [state, setState] = useState<"idle" | "followup" | "done">("idle");
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getSessionId = useCallback(() => {
    if (typeof window === "undefined") return null;
    let id = sessionStorage.getItem("feedback_session_id");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("feedback_session_id", id);
    }
    return id;
  }, []);

  const submit = useCallback(async (isHelpful: boolean, followUpText?: string) => {
    setIsSubmitting(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page_path: pagePath,
          trigger_type: "inline_pulse",
          session_id: getSessionId(),
          helpful: isHelpful,
          sentiment: isHelpful ? "positive" : "negative",
          improvement_suggestion: followUpText || null,
          user_agent: navigator.userAgent,
          screen_width: window.innerWidth,
          page_context: { question, ...context },
        }),
      });
    } catch (err) {
      console.error("Pulse feedback failed:", err);
    } finally {
      setIsSubmitting(false);
      setState("done");
    }
  }, [pagePath, question, context, getSessionId]);

  const handleVote = (isHelpful: boolean) => {
    setHelpful(isHelpful);
    if (isHelpful) {
      submit(true);
    } else {
      setState("followup");
    }
  };

  const handleFollowUp = () => {
    submit(false, text);
  };

  if (state === "done") {
    return (
      <div className="flex items-center justify-center gap-2 py-2 text-xs text-gray-500">
        <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Thanks for your feedback
      </div>
    );
  }

  return (
    <div className="border-t border-gray-100 pt-3 mt-3">
      {state === "idle" && (
        <div className="flex items-center justify-center gap-3">
          <span className="text-xs text-gray-500">{question}</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => handleVote(true)}
              className="p-1.5 rounded-md hover:bg-green-50 text-gray-400 hover:text-green-600 transition"
              aria-label="Yes, helpful"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </button>
            <button
              onClick={() => handleVote(false)}
              className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition"
              aria-label="No, not helpful"
            >
              <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {state === "followup" && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 text-center">What could be better?</p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tell us what was confusing or missing..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            rows={2}
            autoFocus
          />
          <div className="flex gap-2 justify-center">
            <button
              onClick={handleFollowUp}
              disabled={isSubmitting}
              className="bg-black text-white text-xs font-medium px-4 py-1.5 rounded-md hover:bg-gray-800 transition disabled:bg-gray-300"
            >
              {isSubmitting ? "..." : "Send"}
            </button>
            <button
              onClick={() => submit(false)}
              disabled={isSubmitting}
              className="text-xs text-gray-500 hover:text-gray-700 px-2 transition"
            >
              Skip
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
