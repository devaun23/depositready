"use client";

import { motion } from "framer-motion";
import { Clock, Send, Mail, AlertTriangle, Scale, Bell, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { CaseAnalysis } from "@/lib/case-data";

interface EnforcementTimelineProps {
  analysis: CaseAnalysis;
  isPro: boolean;
}

const steps = [
  {
    day: 0,
    week: "Week 1",
    label: "Demand Letter Sent",
    description: "Formal demand delivered via certified mail with return receipt",
    icon: Send,
    status: "pending" as const,
  },
  {
    day: 7,
    week: "Week 2",
    label: "Follow-Up Reminder",
    description: "Second notice sent if no response received",
    icon: Bell,
    status: "upcoming" as const,
  },
  {
    day: 14,
    week: "Week 3",
    label: "Final Demand",
    description: "Final demand with notice of intent to file in small claims court",
    icon: AlertTriangle,
    status: "upcoming" as const,
  },
  {
    day: 21,
    week: "Week 4",
    label: "Small Claims Eligible",
    description: "You may file in small claims court for the full statutory amount",
    icon: Scale,
    status: "upcoming" as const,
  },
];

export default function EnforcementTimeline({ analysis, isPro }: EnforcementTimelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Next Action Banner */}
      <div className="rounded-xl border-2 border-primary bg-primary/5 p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.15em] mb-1">Next Action</p>
            <p className="font-serif text-lg text-foreground">Send Demand Letter</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start the enforcement process with a certified demand letter
            </p>
          </div>
          <Button variant="hero" size="lg" className="shadow-xl shadow-primary/20 shrink-0" disabled={!isPro}>
            Send Now
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Resolution timeline */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-foreground">Enforcement Timeline</h3>
              <p className="text-sm text-muted-foreground">
                Average recovery time: <span className="font-semibold text-foreground">17 days</span>
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="relative">
            <div className="absolute left-[1.15rem] top-5 bottom-5 w-px bg-border" />

            <div className="space-y-0">
              {steps.map((step, i) => (
                <motion.div
                  key={step.day}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="relative flex gap-4 pb-7 last:pb-0"
                >
                  <div className={`relative z-10 h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${
                    step.status === "pending"
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-secondary text-muted-foreground border border-border"
                  }`}>
                    <step.icon className="h-4 w-4" />
                  </div>

                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                        {step.week} · Day {step.day}
                      </span>
                      {step.status === "pending" && (
                        <span className="text-[9px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                          Next
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-foreground">{step.label}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Statute reference */}
          <div className="mt-5 p-4 rounded-lg bg-accent-light/50 border border-border">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Applicable statute:</span>{" "}
              {analysis.statute} — {analysis.stateName} requires deposit return within{" "}
              {analysis.deadline} days. Penalties of up to {analysis.penaltyMultiplier}× deposit may apply.
            </p>
          </div>

          {/* Certified mail tracking placeholder */}
          {isPro && (
            <div className="mt-5 p-4 rounded-lg border border-border bg-background">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-2">
                Demand Letter Delivery
              </p>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Certified Mail Tracking</p>
                  <p className="text-xs font-mono text-muted-foreground/60">USPS #——————————————</p>
                </div>
                <span className="ml-auto text-[10px] font-bold bg-secondary text-muted-foreground px-2 py-1 rounded uppercase tracking-wider">
                  Pending
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
