"use client";

import ErrorFallback from "@/components/ui/ErrorFallback";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorFallback
      error={error}
      reset={reset}
      title="Something went wrong"
      description="We encountered an unexpected error. Please try again or return to the home page."
    />
  );
}
