"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function ViewFreeLandingTracker() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "view_free_landing", {
        event_category: "engagement",
        page_type: "free_mvp",
      });
    }
  }, []);

  return null;
}
