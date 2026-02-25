import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui";
import { SocialLandingContent } from "./SocialLandingContent";

export const metadata: Metadata = {
  title: "Your Landlord Owes You Money | DepositReady",
  description:
    "Free 30-second check. See if your landlord broke the law and how much you could recover.",
  openGraph: {
    title: "Your Landlord Owes You Money",
    description: "Free 30-second check. See how much you could recover.",
    url: "https://depositready.co/s",
  },
};

export default function SocialLandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Minimal header — just logo */}
      <header className="px-4 pt-4 pb-2">
        <Link href="/" className="inline-flex items-center gap-1.5">
          <Logo size="sm" />
          <span className="text-sm font-semibold text-gray-500">DepositReady</span>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
        <Suspense fallback={null}>
          <SocialLandingContent />
        </Suspense>
      </main>

      {/* Minimal footer */}
      <footer className="text-center text-xs text-gray-400 pb-4 px-4">
        Not a law firm. Not legal advice.
      </footer>
    </div>
  );
}
