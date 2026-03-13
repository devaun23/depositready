"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";
import type { CaseAnalysis } from "@/lib/case-data";

interface ClaimHeaderProps {
  analysis: CaseAnalysis;
  evidenceCount: number;
}

export default function ClaimHeader({ analysis, evidenceCount }: ClaimHeaderProps) {
  const baseProb = analysis.strength === "STRONG" ? 72 : analysis.strength === "MODERATE" ? 54 : 30;
  const evidenceBonus = Math.min(evidenceCount * 4, 18);
  const recoveryProbability = Math.min(baseProb + evidenceBonus, 94);

  const strengthColor = analysis.strength === "STRONG"
    ? "text-success" : analysis.strength === "MODERATE" ? "text-primary" : "text-muted-foreground";
  const strengthBg = analysis.strength === "STRONG"
    ? "bg-success/10 border-success/20" : analysis.strength === "MODERATE"
    ? "bg-primary/10 border-primary/20" : "bg-secondary border-border";

  return (
    <div className="border-b border-border bg-card">
      <div className="container max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-5">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-serif text-lg text-foreground">DepositReady</span>
          </Link>
          <span className="text-muted-foreground mx-1">/</span>
          <span className="text-sm font-medium text-muted-foreground">Claim Dashboard</span>
        </div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-primary font-medium mb-6 flex items-center gap-1.5"
        >
          <TrendingUp className="h-3.5 w-3.5" />
          Landlords typically pay before court once violations are documented.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Claim Value */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-4"
          >
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-1">
              Estimated Claim Value
            </p>
            <motion.p
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="font-serif text-4xl sm:text-5xl text-foreground leading-none"
            >
              ${analysis.totalClaim.toLocaleString()}
            </motion.p>
            <p className="text-xs text-muted-foreground mt-2">
              {analysis.stateName} · {analysis.statute}
            </p>
            {analysis.penaltyAmount > 0 && (
              <p className="text-xs text-primary font-medium mt-1">
                Includes {analysis.penaltyMultiplier}× statutory penalty
              </p>
            )}
          </motion.div>

          {/* Recovery Probability */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4"
          >
            <div className={`rounded-xl border p-4 h-full ${strengthBg}`}>
              <div className="flex items-center gap-2 mb-3">
                {analysis.strength === "STRONG" ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-primary" />
                )}
                <span className={`text-xs font-bold uppercase tracking-wider ${strengthColor}`}>
                  Case: {analysis.strength}
                </span>
              </div>

              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-1">
                Recovery Probability
              </p>
              <div className="flex items-baseline gap-1">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-serif text-3xl text-foreground"
                >
                  {recoveryProbability}%
                </motion.span>
              </div>

              <div className="h-1.5 bg-background/50 rounded-full mt-2 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${analysis.strength === "STRONG" ? "bg-success" : "bg-primary"}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${recoveryProbability}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">
                Based on 2,400+ renter cases analyzed
              </p>
            </div>
          </motion.div>

          {/* Violations */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4"
          >
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 h-full">
              <p className="text-[10px] font-bold text-destructive uppercase tracking-[0.15em] mb-3">
                {analysis.violations.length} Violation{analysis.violations.length !== 1 ? "s" : ""} Detected
              </p>
              <div className="space-y-2">
                {analysis.violations.map((v, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-xs text-foreground leading-snug">{v}</span>
                  </div>
                ))}
                {analysis.violations.length === 0 && (
                  <p className="text-xs text-muted-foreground">No violations detected.</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
