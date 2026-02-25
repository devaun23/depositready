"use client";

import dynamic from "next/dynamic";

const FeedbackButton = dynamic(
  () => import("./FeedbackButton").then((mod) => mod.FeedbackButton),
  { ssr: false, loading: () => null }
);

export function LazyFeedbackButton() {
  return <FeedbackButton />;
}
