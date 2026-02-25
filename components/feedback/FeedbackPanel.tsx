"use client";

import { useState, useEffect, useCallback } from "react";

interface FeedbackPanelProps {
  pagePath: string;
  onClose: () => void;
}

export function FeedbackPanel({ pagePath, onClose }: FeedbackPanelProps) {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const getSessionId = useCallback(() => {
    if (typeof window === "undefined") return null;
    let id = sessionStorage.getItem("feedback_session_id");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("feedback_session_id", id);
    }
    return id;
  }, []);

  const handleSubmit = async () => {
    if (!text.trim() || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page_path: pagePath,
          trigger_type: "floating_button",
          session_id: getSessionId(),
          improvement_suggestion: text,
          user_agent: navigator.userAgent,
          screen_width: window.innerWidth,
        }),
      });
    } catch (err) {
      console.error("Feedback submit failed:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  // Auto-close 2s after submission
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted, onClose]);

  return (
    <div className="fixed bottom-16 left-4 z-50 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-900">
          {submitted ? "Thanks!" : "Share your feedback"}
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
        {!submitted ? (
          <div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              rows={3}
              autoFocus
            />
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !text.trim()}
              className="w-full mt-3 bg-brand text-white text-sm font-medium py-2 rounded-lg hover:bg-brand-light transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="text-sm text-gray-600">Your feedback helps us improve.</p>
          </div>
        )}
      </div>
    </div>
  );
}
