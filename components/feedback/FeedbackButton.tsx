"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FeedbackPanel } from "./FeedbackPanel";

export function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Don't show on admin pages or preview
  const excludedPaths = ["/admin", "/preview", "/download"];
  const isExcluded = excludedPaths.some((p) => pathname?.startsWith(p));

  if (isExcluded) return null;

  return (
    <>
      {/* Floating pill — bottom-left to avoid conflict with mobile sticky CTAs at bottom-center */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 left-4 z-40 bg-white text-gray-700 text-xs font-medium px-3 py-2 rounded-full shadow-lg border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all"
          aria-label="Send feedback"
        >
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Feedback
          </span>
        </button>
      )}

      {/* Panel */}
      {isOpen && (
        <FeedbackPanel
          pagePath={pathname || "/"}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
