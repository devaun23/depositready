"use client";

import { Button } from "@/components/ui";

export function LandlordCTA() {
  const scrollToCalculator = () => {
    const calculator = document.getElementById("risk-calculator");
    if (calculator) {
      calculator.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 sm:hidden z-40">
        <Button onClick={scrollToCalculator} className="w-full" size="lg">
          Check My Risk — Free
        </Button>
      </div>
    </>
  );
}
