"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

export function HeroCTA() {
  const router = useRouter();

  return (
    <>
      {/* CTA - Desktop only (mobile uses sticky bottom CTA) */}
      <div className="hidden sm:flex flex-col items-center justify-center gap-3 mb-4">
        <Button onClick={() => router.push("/recover")} size="lg">
          See Your Letter Free
        </Button>
        <Button onClick={() => router.push("/diagnose")} variant="outline" size="sm">
          Check Eligibility First
        </Button>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 sm:hidden z-40">
        <Button onClick={() => router.push("/recover")} className="w-full" size="lg">
          See Your Letter Free
        </Button>
      </div>
    </>
  );
}
