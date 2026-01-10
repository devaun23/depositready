"use client";

import dynamic from "next/dynamic";

// Client component wrapper to enable ssr: false for ExitIntentPopup
const ExitIntentPopup = dynamic(
  () => import("./ExitIntentPopup").then(mod => mod.ExitIntentPopup),
  { ssr: false, loading: () => null }
);

export function LazyExitIntentPopup() {
  return <ExitIntentPopup />;
}
