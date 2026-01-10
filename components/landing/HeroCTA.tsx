"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui";

// Lazy load modal - only needed when user clicks CTA
const EligibilityModal = dynamic(
  () => import("./EligibilityModal").then(mod => mod.EligibilityModal),
  { ssr: false, loading: () => null }
);

export function HeroCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* CTA - Desktop only (mobile uses sticky bottom CTA) */}
      <div className="hidden sm:flex flex-col items-center justify-center gap-4 mb-4">
        <Button
          onClick={() => setIsModalOpen(true)}
          size="lg"
        >
          Check My Deadline
        </Button>
        <p className="text-sm text-gray-600 max-w-md">
          Most renters don&apos;t lose disputes because of photos — they lose them because of missed deadlines.
        </p>
      </div>

      {/* Eligibility Modal */}
      <EligibilityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 sm:hidden z-40">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full"
          size="lg"
        >
          Check My Deadline
        </Button>
      </div>
    </>
  );
}
