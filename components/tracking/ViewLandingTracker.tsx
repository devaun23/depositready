"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface ViewLandingTrackerProps {
  state?: string;
}

export function ViewLandingTracker({ state }: ViewLandingTrackerProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "view_landing", {
        event_category: "engagement",
        state: state || "national",
      });
    }
  }, [state]);

  return null;
}
