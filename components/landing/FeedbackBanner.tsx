"use client";

import { useState } from "react";

export function FeedbackBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gray-100 text-center py-2 px-4 text-sm text-gray-600">
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
        className="ml-3 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Dismiss feedback banner"
      >
        &times;
      </button>
    </div>
  );
}
