"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useScrollReveal } from "@/lib/useScrollReveal";
import {
  Scale,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { STATE_LAWS, analyzeCaseData } from "@/lib/case-data";
import type { CaseData } from "@/lib/case-data";
import { trackClaimEngine } from "@/lib/analytics";

const US_STATES = [
  { value: "", label: "Select your state" },
  { value: "AL", label: "Alabama" }, { value: "AK", label: "Alaska" }, { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" }, { value: "CA", label: "California" }, { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" }, { value: "DE", label: "Delaware" }, { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" }, { value: "HI", label: "Hawaii" }, { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" }, { value: "IN", label: "Indiana" }, { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" }, { value: "KY", label: "Kentucky" }, { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" }, { value: "MD", label: "Maryland" }, { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" }, { value: "MN", label: "Minnesota" }, { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" }, { value: "MT", label: "Montana" }, { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" }, { value: "NH", label: "New Hampshire" }, { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" }, { value: "NY", label: "New York" }, { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" }, { value: "OH", label: "Ohio" }, { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" }, { value: "PA", label: "Pennsylvania" }, { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" }, { value: "SD", label: "South Dakota" }, { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" }, { value: "UT", label: "Utah" }, { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" }, { value: "WA", label: "Washington" }, { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" }, { value: "WY", label: "Wyoming" },
];

export function ClaimEngine() {
  const router = useRouter();
  const { ref, visible } = useScrollReveal();
  const [caseData, setCaseData] = useState<CaseData>({
    state: "",
    depositAmount: "",
    daysSinceMoveOut: "",
    depositReturned: "no",
    writtenNotice: "no",
    damageDeductions: "no",
  });

  const update = (field: keyof CaseData, value: string) => {
    setCaseData((prev) => ({ ...prev, [field]: value }));
  };

  const analysis = useMemo(() => {
    const result = analyzeCaseData(caseData);
    if (result && caseData.state && caseData.depositAmount && caseData.daysSinceMoveOut) {
      trackClaimEngine.submit({
        state: result.stateCode,
        deposit: result.deposit,
        violations: result.violations.length,
        strength: result.strength,
        total_claim: result.totalClaim,
      });
    }
    return result;
  }, [caseData]);
  const hasMinimumInput = !!(caseData.state && caseData.depositAmount && caseData.daysSinceMoveOut);

  const handleSeeFullAnalysis = () => {
    if (analysis) {
      trackClaimEngine.viewDashboard({ state: analysis.stateCode, total_claim: analysis.totalClaim });
      localStorage.setItem("dr-analysis", JSON.stringify(analysis));
      router.push("/dashboard");
    }
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="claim-engine"
      className="py-16 sm:py-24 px-4 bg-card border-y border-border"
    >
      <div className="container max-w-5xl mx-auto">
        <div className={`text-center mb-10 ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationFillMode: "both" }}>
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.15em] mb-3">Live Claim Engine</p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground">Check if your landlord violated the law</h2>
          <p className="mt-2 text-muted-foreground text-sm sm:text-base">Enter your case details and watch your claim calculate in real time.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Side */}
          <div className="rounded-xl border border-border bg-background p-6 space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">State</label>
              <div className="relative">
                <select
                  value={caseData.state}
                  onChange={(e) => update("state", e.target.value)}
                  className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring appearance-none cursor-pointer"
                >
                  {US_STATES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Deposit Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <input
                  type="number"
                  placeholder="1200"
                  value={caseData.depositAmount}
                  onChange={(e) => update("depositAmount", e.target.value)}
                  className="flex h-11 w-full rounded-lg border border-input bg-background pl-7 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Days Since Move-Out</label>
              <input
                type="number"
                placeholder="e.g. 45"
                value={caseData.daysSinceMoveOut}
                onChange={(e) => update("daysSinceMoveOut", e.target.value)}
                className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <p className="text-xs text-muted-foreground">How many days ago did you move out?</p>
            </div>

            <div className="space-y-4 pt-2">
              {([
                { key: "depositReturned" as const, label: "Has any deposit been returned?" },
                { key: "writtenNotice" as const, label: "Did landlord send written notice?" },
                { key: "damageDeductions" as const, label: "Were damage deductions taken?" },
              ]).map(({ key, label }) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">{label}</label>
                  <div className="flex gap-2">
                    {["yes", "no"].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => update(key, val)}
                        className={`flex-1 h-9 rounded-lg text-sm font-medium transition-all duration-200 border ${
                          caseData[key] === val
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-background text-muted-foreground border-border hover:border-primary/30"
                        }`}
                      >
                        {val === "yes" ? "Yes" : "No"}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Result Side */}
          <div className="rounded-xl border border-border bg-background p-6">
            {!hasMinimumInput && (
              <div className="h-full flex flex-col items-center justify-center py-16 text-center">
                <div className="h-16 w-16 rounded-full bg-background flex items-center justify-center mb-4 border border-border">
                  <Scale className="h-7 w-7 text-muted-foreground/50" />
                </div>
                <p className="text-sm text-muted-foreground">Enter your case details to see<br />your claim calculated live</p>
              </div>
            )}

            {hasMinimumInput && analysis && (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Estimated Recovery</p>
                  <motion.p
                    key={analysis.totalClaim}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-serif text-5xl sm:text-6xl text-foreground"
                  >
                    ${analysis.totalClaim.toLocaleString()}
                  </motion.p>
                  {analysis.penaltyAmount > 0 && (
                    <p className="mt-2 text-sm text-primary font-medium">
                      Potential penalty: {analysis.penaltyMultiplier}× deposit
                    </p>
                  )}
                </div>

                {analysis.violations.length > 0 && (
                  <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 space-y-2">
                    <p className="text-xs font-semibold text-destructive uppercase tracking-wider">Possible Violations Detected</p>
                    {analysis.violations.map((v, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        <span className="text-foreground">{v}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className={`rounded-lg p-4 border ${
                  analysis.strength === "STRONG" ? "bg-success/5 border-success/20" :
                  analysis.strength === "MODERATE" ? "bg-primary/5 border-primary/20" :
                  "bg-background border-border"
                }`}>
                  <div className="flex items-center gap-2">
                    {analysis.strength === "STRONG" ? (
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-primary" />
                    )}
                    <span className={`text-sm font-bold uppercase tracking-wider ${analysis.strength === "STRONG" ? "text-success" : "text-primary"}`}>
                      Confidence: {analysis.strength}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on {analysis.statute}
                  </p>
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full shadow-xl shadow-primary/20"
                  onClick={handleSeeFullAnalysis}
                >
                  See Full Case Analysis
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {hasMinimumInput && !analysis && (
              <div className="h-full flex flex-col items-center justify-center py-16 text-center">
                <div className="h-16 w-16 rounded-full bg-background flex items-center justify-center mb-4 border border-border">
                  <Clock className="h-7 w-7 text-muted-foreground/50" />
                </div>
                <p className="text-sm text-muted-foreground">Analyzing your case&hellip;</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
