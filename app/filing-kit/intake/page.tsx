"use client";

import { FilingKitProvider } from "@/components/filing-kit/FilingKitIntakeContext";
import { FilingKitIntakeShell } from "@/components/filing-kit/FilingKitIntakeShell";

export default function FilingKitIntakePage() {
  return (
    <FilingKitProvider>
      <FilingKitIntakeShell />
    </FilingKitProvider>
  );
}
