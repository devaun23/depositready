import { ReactNode } from "react";
import Link from "next/link";
import { Navbar, Footer } from "@/components/landing";

interface SEOPageLayoutProps {
  children: ReactNode;
}

export function SEOPageLayout({ children }: SEOPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6">
        <nav className="pt-6 pb-2">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Resources
          </Link>
        </nav>
        {children}
      </main>
      <Footer />
    </div>
  );
}
