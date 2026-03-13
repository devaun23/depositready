"use client";

import { motion } from "framer-motion";
import { FileText, Download, Send, Lock, ShieldCheck, Scale } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { CaseAnalysis } from "@/lib/case-data";

interface DemandLetterProps {
  analysis: CaseAnalysis;
  isPro: boolean;
}

export default function DemandLetter({ analysis, isPro }: DemandLetterProps) {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Legal authority banner */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            This letter cites {analysis.stateName} statutes and includes penalty calculations enforceable in small claims court.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Landlords respond to formal demand letters in 64% of cases before court filing.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-foreground">Demand Letter</h3>
              <p className="text-sm text-muted-foreground">
                Auto-generated from your case facts · {analysis.violations.length} violation{analysis.violations.length !== 1 ? "s" : ""} cited
              </p>
            </div>
          </div>
        </div>

        {/* Letter Preview */}
        <div className="p-5 sm:p-8">
          <div className="bg-background border border-border rounded-lg p-5 sm:p-7 font-mono text-sm leading-relaxed shadow-inner">
            {/* Letterhead */}
            <div className="text-center border-b border-border pb-4 mb-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Demand for Return of Security Deposit
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">
                Prepared Under {analysis.statute}
              </p>
            </div>

            <p className="text-muted-foreground text-xs mb-3">{formattedDate}</p>
            <p className="text-foreground mb-3">To: [Landlord Name]</p>

            <p className="text-foreground text-xs mb-3">
              This letter constitutes a formal demand for the return of my security deposit
              pursuant to {analysis.statute}. The following violations of {analysis.stateName} deposit law have been identified:
            </p>

            {/* Violations */}
            <div className="space-y-3 mb-5">
              {analysis.violations.map((v, i) => (
                <div key={i} className="border-l-2 border-destructive/40 pl-3">
                  <p className="text-[10px] font-bold text-destructive uppercase tracking-wider mb-0.5">
                    Violation {i + 1}
                  </p>
                  <p className="text-foreground text-xs">{v}</p>
                </div>
              ))}
            </div>

            {/* Amount */}
            <div className="border border-border rounded-lg p-3 mb-5 bg-card">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Amount Owed
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Security deposit</span>
                  <span className="text-foreground">${analysis.deposit.toLocaleString()}</span>
                </div>
                {analysis.penaltyAmount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Statutory penalty ({analysis.penaltyMultiplier}×)</span>
                    <span className="text-primary">${analysis.penaltyAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between pt-1.5 border-t border-border font-bold">
                  <span className="text-foreground">Total claim</span>
                  <span className="text-foreground">${analysis.totalClaim.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Blurred section for non-pro */}
            <div className={`${!isPro ? "filter blur-sm select-none" : ""}`}>
              <p className="text-foreground text-xs mb-3">
                You have 15 days from receipt of this letter to remit payment in full.
                Failure to comply will result in further legal action, including filing
                in small claims court for the full statutory amount.
              </p>
              <p className="text-foreground text-xs">
                Sincerely,<br />
                [Your Name]
              </p>
            </div>

            {!isPro && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-2 rounded-full">
                  <Lock className="h-3.5 w-3.5" />
                  Unlock full letter with Recovery System
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="p-5 sm:p-6 border-t border-border bg-secondary/30">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant={isPro ? "hero" : "hero-outline"} size="lg" className="flex-1" disabled={!isPro}>
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button variant={isPro ? "hero" : "hero-outline"} size="lg" className="flex-1" disabled={!isPro}>
              <Send className="h-4 w-4" />
              Send Certified Mail (+$29)
            </Button>
          </div>
          {isPro && (
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Scale className="h-3 w-3" />
              <span>Includes USPS tracking and delivery confirmation</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
