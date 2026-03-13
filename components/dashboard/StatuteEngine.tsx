"use client";

import { motion } from "framer-motion";
import { Scale, BookOpen } from "lucide-react";
import type { CaseAnalysis } from "@/lib/case-data";

interface StatuteEngineProps {
  analysis: CaseAnalysis;
}

export default function StatuteEngine({ analysis }: StatuteEngineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      <div className="p-5 sm:p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Scale className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground">Statute Engine</h3>
            <p className="text-sm text-muted-foreground">
              Relevant laws and penalty calculations
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Primary statute */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-4 w-4 text-primary" />
            <p className="text-xs font-bold text-primary uppercase tracking-wider">
              Primary Statute
            </p>
          </div>
          <p className="font-serif text-lg text-foreground mb-2">{analysis.statute}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {analysis.stateName} law requires landlords to return the security deposit within{" "}
            <span className="font-semibold text-foreground">{analysis.deadline} days</span>{" "}
            of move-out or provide written notice of deductions. Failure to comply may result in
            penalties of up to{" "}
            <span className="font-semibold text-foreground">
              {analysis.penaltyMultiplier}× the deposit amount
            </span>.
          </p>
        </div>

        {/* Penalty formula */}
        <div className="rounded-lg border border-border bg-background p-5">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
            Penalty Calculation
          </p>
          <div className="space-y-3 font-mono text-sm">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Original deposit</span>
              <span className="text-foreground">${analysis.deposit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Penalty multiplier</span>
              <span className="text-primary font-semibold">×{analysis.penaltyMultiplier}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Statutory penalty</span>
              <span className="text-primary">${analysis.penaltyAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span className="text-foreground">Maximum claim</span>
              <span className="text-foreground">${analysis.totalClaim.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Violation citations */}
        {analysis.violations.length > 0 && (
          <div className="rounded-lg border border-border bg-background p-5">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
              Violation Citations
            </p>
            <div className="space-y-3">
              {analysis.violations.map((v, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-xs font-bold text-destructive bg-destructive/10 h-6 w-6 rounded flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm text-foreground font-medium">{v}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Ref: {analysis.statute}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
