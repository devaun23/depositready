"use client";

import ErrorFallback from "@/components/ui/ErrorFallback";

export default function PreviewError({
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
      title="Preview Error"
      description="We couldn't generate your packet preview. Please return to the wizard to ensure all information is filled in correctly."
    />
  );
}
