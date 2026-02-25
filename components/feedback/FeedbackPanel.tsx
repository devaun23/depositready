"use client";

import { useState, useCallback } from "react";

interface FeedbackPanelProps {
  pagePath: string;
  onClose: () => void;
}

interface PageQuestion {
  primary: string;
  secondary: string;
  placeholder: string;
}

function getQuestionsForPage(path: string): PageQuestion {
  if (path === "/") {
    return {
      primary: "What brought you here today?",
      secondary: "Finding what you need?",
      placeholder: "I'm looking for help with...",
    };
  }
  if (path.startsWith("/quiz") || path.startsWith("/diagnose")) {
    return {
      primary: "Was this analysis helpful?",
      secondary: "What's unclear?",
      placeholder: "Something I didn't understand...",
    };
  }
  if (path.startsWith("/recover") || path.startsWith("/free")) {
    return {
      primary: "Is the pricing clear?",
      secondary: "What would help you decide?",
      placeholder: "I'm not sure about...",
    };
  }
  if (path.startsWith("/wizard")) {
    return {
      primary: "Having trouble with this step?",
      secondary: "What info are you missing?",
      placeholder: "I need help with...",
    };
  }
  if (path.startsWith("/success")) {
    return {
      primary: "How was your experience?",
      secondary: "Anything we could improve?",
      placeholder: "My experience was...",
    };
  }
  return {
    primary: "How can we improve?",
    secondary: "What brought you to this page?",
    placeholder: "I think you could...",
  };
}

export function FeedbackPanel({ pagePath, onClose }: FeedbackPanelProps) {
  const [step, setStep] = useState<"sentiment" | "details" | "thanks">("sentiment");
  const [sentiment, setSentiment] = useState<"positive" | "negative" | "neutral" | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = getQuestionsForPage(pagePath);
  const isSuccessPage = pagePath.startsWith("/success");

  const getSessionId = useCallback(() => {
    if (typeof window === "undefined") return null;
    let id = sessionStorage.getItem("feedback_session_id");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("feedback_session_id", id);
    }
    return id;
  }, []);

  const submitFeedback = useCallback(async (extraData?: Record<string, unknown>) => {
    setIsSubmitting(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page_path: pagePath,
          trigger_type: "floating_button",
          session_id: getSessionId(),
          sentiment,
          rating,
          confusion_area: text || null,
          improvement_suggestion: text || null,
          email: email || null,
          user_agent: navigator.userAgent,
          screen_width: window.innerWidth,
          page_context: { question: questions.primary },
          ...extraData,
        }),
      });
    } catch (err) {
      console.error("Feedback submit failed:", err);
    } finally {
      setIsSubmitting(false);
      setStep("thanks");
    }
  }, [pagePath, sentiment, rating, text, email, questions.primary, getSessionId]);

  const handleSentiment = (s: "positive" | "negative" | "neutral") => {
    setSentiment(s);
    setStep("details");
  };

  const handleRating = (r: number) => {
    setRating(r);
    setStep("details");
  };

  return (
    <div className="fixed bottom-16 left-4 z-50 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-900">
          {step === "thanks" ? "Thank you!" : questions.primary}
        </span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition"
          aria-label="Close feedback"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-4">
        {step === "sentiment" && !isSuccessPage && (
          <div>
            <div className="flex justify-center gap-4 mb-3">
              {([
                { key: "positive" as const, emoji: "\u{1F60A}", label: "Good" },
                { key: "neutral" as const, emoji: "\u{1F610}", label: "Okay" },
                { key: "negative" as const, emoji: "\u{1F615}", label: "Confused" },
              ]).map(({ key, emoji, label }) => (
                <button
                  key={key}
                  onClick={() => handleSentiment(key)}
                  className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-xs text-gray-600">{label}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center">{questions.secondary}</p>
          </div>
        )}

        {step === "sentiment" && isSuccessPage && (
          <div>
            <p className="text-sm text-gray-600 mb-3 text-center">Rate your experience</p>
            <div className="flex justify-center gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => handleRating(n)}
                  className={`w-9 h-9 rounded-full border text-sm font-medium transition ${
                    rating === n
                      ? "bg-black text-white border-black"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 px-1">
              <span>Poor</span>
              <span>Great</span>
            </div>
          </div>
        )}

        {step === "details" && (
          <div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={questions.placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              rows={3}
              autoFocus
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional)"
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => submitFeedback()}
                disabled={isSubmitting}
                className="flex-1 bg-black text-white text-sm font-medium py-2 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-300"
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
              <button
                onClick={() => submitFeedback()}
                disabled={isSubmitting}
                className="text-sm text-gray-500 hover:text-gray-700 px-3 transition"
              >
                Skip
              </button>
            </div>
          </div>
        )}

        {step === "thanks" && (
          <div className="text-center py-2">
            <p className="text-sm text-gray-600">Your feedback helps us improve.</p>
            <button
              onClick={onClose}
              className="mt-2 text-sm text-gray-500 hover:text-gray-700 transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
