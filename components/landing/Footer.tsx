import Link from "next/link";
import { Logo } from "@/components/ui";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo size="sm" className="text-primary" />
            <span className="font-serif text-lg text-foreground">DepositReady</span>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <a href="mailto:support@depositready.co" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground/60">
            DepositReady is a self-help documentation tool and not a law firm. No legal advice provided.
          </p>
          <p className="text-xs text-muted-foreground/40 mt-2">
            &copy; {new Date().getFullYear()} DepositReady. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
