"use client";

import ErrorFallback from "@/components/ui/ErrorFallback";

export default function WizardError({
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
      title="Wizard Error"
      description="Something went wrong while collecting your information. Your progress may be saved. Please try again."
    />
  );
}
