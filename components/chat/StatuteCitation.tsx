"use client";

import { useState, useRef, useEffect } from "react";

interface StatuteCitationProps {
  citation: string;
}

/**
 * Renders a statute citation as a styled badge with a tooltip
 * showing the full reference. Clickable on mobile (tap to toggle).
 */
export function StatuteCitation({ citation }: StatuteCitationProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Close tooltip on outside click
  useEffect(() => {
    if (!showTooltip) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showTooltip]);

  return (
    <span ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setShowTooltip(!showTooltip)}
        className="inline-flex items-center gap-0.5 rounded bg-brand/8 px-1.5 py-0.5 text-[13px] font-medium text-brand hover:bg-brand/15 transition-colors cursor-pointer"
        aria-label={`Statute reference: ${citation}`}
      >
        <svg className="h-3 w-3 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        {citation}
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg z-50">
          <span className="block font-medium mb-0.5">Statute Reference</span>
          <span className="block text-gray-300">{citation}</span>
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </span>
      )}
    </span>
  );
}
