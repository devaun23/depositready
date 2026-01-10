"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function ExitIntentPopup() {
  const [shown, setShown] = useState(false);
  // Initialize dismissed state lazily from sessionStorage
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("exitIntentDismissed") === "true";
    }
    return false;
  });
  const pathname = usePathname();

  // Don't show on preview, success, checkout, or SEO pages
  const excludedPaths = [
    "/preview",
    "/success",
    "/download",
    "/landlord-kept-security-deposit",
    "/security-deposit-deadline",
    "/security-deposit-demand-letter",
    "/security-deposit-dispute",
    "/security-deposit-deadline-florida",
    "/security-deposit-deadline-georgia",
  ];
  const isExcludedPage = excludedPaths.some((path) => pathname?.startsWith(path));

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves top of viewport
      if (e.clientY < 10 && !shown && !dismissed && !isExcludedPage) {
        setShown(true);

        // Track popup shown event
        if (typeof window !== "undefined" && "gtag" in window) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).gtag("event", "exit_intent_shown", {
            event_category: "engagement",
            page: pathname,
          });
        }
      }
    };

    // Only add listener on desktop (mobile doesn't have meaningful mouse leave)
    if (typeof window !== "undefined" && window.innerWidth > 768) {
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shown, dismissed, isExcludedPage, pathname]);

  const handleDismiss = () => {
    setShown(false);
    setDismissed(true);
    sessionStorage.setItem("exitIntentDismissed", "true");
  };

  const handleContinue = () => {
    setShown(false);

    // Track popup click event
    if (typeof window !== "undefined" && "gtag" in window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).gtag("event", "exit_intent_clicked", {
        event_category: "engagement",
        page: pathname,
      });
    }
  };

  if (!shown || isExcludedPage) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">&#9888;</div>
          <h2 className="font-serif text-2xl font-semibold text-black mb-2">
            Before you go...
          </h2>
          <p className="text-gray-600">
            Your landlord has a legal deadline to return your deposit.
            Make sure you don&apos;t miss yours.
          </p>
        </div>

        {/* Value props */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <span className="text-green-600">&#10003;</span>
              Takes only 10 minutes to complete
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">&#10003;</span>
              Preview your packet before paying
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">&#10003;</span>
              7-day money-back guarantee
            </li>
          </ul>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <Link
            href="/wizard"
            onClick={handleContinue}
            className="block w-full bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition text-center"
          >
            Continue Building My Packet
          </Link>
          <button
            onClick={handleDismiss}
            className="block w-full text-gray-500 hover:text-gray-700 text-sm py-2 transition"
          >
            No thanks, I&apos;ll come back later
          </button>
        </div>

        {/* Price reminder */}
        <p className="text-center text-xs text-gray-400 mt-4">
          $39 one-time purchase. No subscription.
        </p>
      </div>
    </div>
  );
}
