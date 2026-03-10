"use client";

import dynamic from "next/dynamic";

const CalculatorShell = dynamic(
  () =>
    import("@/components/calculator/CalculatorShell").then(
      (m) => m.CalculatorShell
    ),
  { ssr: false }
);

export function CalculatorLoader() {
  return <CalculatorShell />;
}
