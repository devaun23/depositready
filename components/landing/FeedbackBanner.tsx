"use client";

import { useState } from "react";

export function FeedbackBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gray-100 flex items-center justify-center py-2 px-4 text-sm text-gray-600">
      <span>
        Got feedback?{" "}
        <a
          href="mailto:devaun0506@gmail.com?subject=DepositReady%20Feedback"
          className="underline hover:text-black transition-colors"
        >
          Let us know &rarr;
        </a>
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="ml-3 p-2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Dismiss feedback banner"
      >
        &times;
      </button>
    </div>
  );
}
