import { ReactNode } from "react";
import { Navbar, Footer } from "@/components/landing";

interface SEOPageLayoutProps {
  children: ReactNode;
}

export function SEOPageLayout({ children }: SEOPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
