"use client";

import ErrorFallback from "@/components/ui/ErrorFallback";

export default function SuccessError({
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
      title="Download Error"
      description="We couldn't load your download page. If you completed payment, please check your email for the download link or contact support."
    />
  );
}
