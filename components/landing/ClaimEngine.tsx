"use client";

import { useState, useMemo } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

// ─── State Deposit Laws ───────────────────────────────────────────────
const STATE_LAWS: Record<string, { deadline: number; penaltyMultiplier: number; statute: string; stateName: string }> = {
  AL: { deadline: 60, penaltyMultiplier: 2, statute: "AL Code § 35-9A-201", stateName: "Alabama" },
  AK: { deadline: 14, penaltyMultiplier: 2, statute: "AK Stat. § 34.03.070", stateName: "Alaska" },
  AZ: { deadline: 14, penaltyMultiplier: 2, statute: "AZ Rev. Stat. § 33-1321", stateName: "Arizona" },
  AR: { deadline: 60, penaltyMultiplier: 2, statute: "AR Code § 18-16-305", stateName: "Arkansas" },
  CA: { deadline: 21, penaltyMultiplier: 2, statute: "CA Civ. Code § 1950.5", stateName: "California" },
  CO: { deadline: 60, penaltyMultiplier: 3, statute: "CO Rev. Stat. § 38-12-103", stateName: "Colorado" },
  CT: { deadline: 30, penaltyMultiplier: 2, statute: "CT Gen. Stat. § 47a-21", stateName: "Connecticut" },
  DE: { deadline: 20, penaltyMultiplier: 2, statute: "DE Code tit. 25 § 5514", stateName: "Delaware" },
  FL: { deadline: 30, penaltyMultiplier: 3, statute: "FL Stat. § 83.49", stateName: "Florida" },
  GA: { deadline: 30, penaltyMultiplier: 3, statute: "GA Code § 44-7-35", stateName: "Georgia" },
  HI: { deadline: 14, penaltyMultiplier: 2, statute: "HI Rev. Stat. § 521-44", stateName: "Hawaii" },
  ID: { deadline: 30, penaltyMultiplier: 2, statute: "ID Code § 6-321", stateName: "Idaho" },
  IL: { deadline: 45, penaltyMultiplier: 2, statute: "765 ILCS 710/1", stateName: "Illinois" },
  IN: { deadline: 45, penaltyMultiplier: 2, statute: "IN Code § 32-31-3-12", stateName: "Indiana" },
  IA: { deadline: 30, penaltyMultiplier: 2, statute: "IA Code § 562A.12", stateName: "Iowa" },
  KS: { deadline: 30, penaltyMultiplier: 2, statute: "KS Stat. § 58-2550", stateName: "Kansas" },
  KY: { deadline: 30, penaltyMultiplier: 2, statute: "KY Rev. Stat. § 383.580", stateName: "Kentucky" },
  LA: { deadline: 30, penaltyMultiplier: 2, statute: "LA Rev. Stat. § 9:3251", stateName: "Louisiana" },
  ME: { deadline: 30, penaltyMultiplier: 2, statute: "ME Rev. Stat. tit. 14 § 6033", stateName: "Maine" },
  MD: { deadline: 45, penaltyMultiplier: 3, statute: "MD Code Real Prop. § 8-203", stateName: "Maryland" },
  MA: { deadline: 30, penaltyMultiplier: 3, statute: "MA Gen. Laws ch. 186 § 15B", stateName: "Massachusetts" },
  MI: { deadline: 30, penaltyMultiplier: 2, statute: "MI Comp. Laws § 554.613", stateName: "Michigan" },
  MN: { deadline: 21, penaltyMultiplier: 2, statute: "MN Stat. § 504B.178", stateName: "Minnesota" },
  MS: { deadline: 45, penaltyMultiplier: 2, statute: "MS Code § 89-8-21", stateName: "Mississippi" },
  MO: { deadline: 30, penaltyMultiplier: 2, statute: "MO Rev. Stat. § 535.300", stateName: "Missouri" },
  MT: { deadline: 30, penaltyMultiplier: 2, statute: "MT Code § 70-25-202", stateName: "Montana" },
  NE: { deadline: 14, penaltyMultiplier: 2, statute: "NE Rev. Stat. § 76-1416", stateName: "Nebraska" },
  NV: { deadline: 30, penaltyMultiplier: 2, statute: "NV Rev. Stat. § 118A.242", stateName: "Nevada" },
  NH: { deadline: 30, penaltyMultiplier: 2, statute: "NH Rev. Stat. § 540-A:7", stateName: "New Hampshire" },
  NJ: { deadline: 30, penaltyMultiplier: 2, statute: "NJ Rev. Stat. § 46:8-21.1", stateName: "New Jersey" },
  NM: { deadline: 30, penaltyMultiplier: 2, statute: "NM Stat. § 47-8-18", stateName: "New Mexico" },
  NY: { deadline: 14, penaltyMultiplier: 2, statute: "NY GOL § 7-108", stateName: "New York" },
  NC: { deadline: 30, penaltyMultiplier: 2, statute: "NC Gen. Stat. § 42-52", stateName: "North Carolina" },
  ND: { deadline: 30, penaltyMultiplier: 2, statute: "ND Cent. Code § 47-16-07.1", stateName: "North Dakota" },
  OH: { deadline: 30, penaltyMultiplier: 2, statute: "ORC § 5321.16", stateName: "Ohio" },
  OK: { deadline: 45, penaltyMultiplier: 2, statute: "OK Stat. tit. 41 § 115", stateName: "Oklahoma" },
  OR: { deadline: 31, penaltyMultiplier: 2, statute: "ORS 90.300", stateName: "Oregon" },
  PA: { deadline: 30, penaltyMultiplier: 2, statute: "68 Pa.C.S. § 250.512", stateName: "Pennsylvania" },
  RI: { deadline: 20, penaltyMultiplier: 2, statute: "RI Gen. Laws § 34-18-19", stateName: "Rhode Island" },
  SC: { deadline: 30, penaltyMultiplier: 3, statute: "SC Code § 27-40-410", stateName: "South Carolina" },
  SD: { deadline: 14, penaltyMultiplier: 2, statute: "SD Codified Laws § 43-32-24", stateName: "South Dakota" },
  TN: { deadline: 30, penaltyMultiplier: 2, statute: "TN Code § 66-28-301", stateName: "Tennessee" },
  TX: { deadline: 30, penaltyMultiplier: 3, statute: "TX Prop. Code § 92.109", stateName: "Texas" },
  UT: { deadline: 30, penaltyMultiplier: 2, statute: "UT Code § 57-17-3", stateName: "Utah" },
  VT: { deadline: 14, penaltyMultiplier: 2, statute: "VT Stat. tit. 9 § 4461", stateName: "Vermont" },
  VA: { deadline: 45, penaltyMultiplier: 2, statute: "VA Code § 55.1-1226", stateName: "Virginia" },
  WA: { deadline: 21, penaltyMultiplier: 2, statute: "RCW 59.18.280", stateName: "Washington" },
  WV: { deadline: 60, penaltyMultiplier: 2, statute: "WV Code § 37-6A-2", stateName: "West Virginia" },
  WI: { deadline: 21, penaltyMultiplier: 2, statute: "WI Stat. § 704.28", stateName: "Wisconsin" },
  WY: { deadline: 30, penaltyMultiplier: 2, statute: "WY Stat. § 1-21-1208", stateName: "Wyoming" },
};

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

interface CaseData {
  state: string;
  depositAmount: string;
  daysSinceMoveOut: string;
  depositReturned: string;
  writtenNotice: string;
  damageDeductions: string;
}

export function ClaimEngine() {
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
    const deposit = parseFloat(caseData.depositAmount) || 0;
    const stateLaw = STATE_LAWS[caseData.state];
    const days = parseInt(caseData.daysSinceMoveOut) || 0;
    if (!deposit || !stateLaw || !days) return null;

    const violations: string[] = [];
    let penaltyAmount = 0;

    if (days > stateLaw.deadline && caseData.depositReturned === "no") {
      violations.push(`Missed ${stateLaw.deadline}-day statutory return deadline`);
      penaltyAmount = deposit * (stateLaw.penaltyMultiplier - 1);
    }
    if (caseData.writtenNotice === "no" && caseData.depositReturned === "no") {
      violations.push("Missing itemized deductions notice");
    }
    if (caseData.damageDeductions === "yes" && caseData.writtenNotice === "no") {
      violations.push("Deductions taken without proper itemization");
    }

    const totalClaim = deposit + penaltyAmount;
    const strength = violations.length >= 2 ? "STRONG" : violations.length === 1 ? "MODERATE" : "WEAK";

    return {
      deposit,
      days,
      deadline: stateLaw.deadline,
      violations,
      penaltyAmount,
      totalClaim,
      strength,
      statute: stateLaw.statute,
      stateName: stateLaw.stateName,
      penaltyMultiplier: stateLaw.penaltyMultiplier,
    };
  }, [caseData]);

  const hasMinimumInput = !!(caseData.state && caseData.depositAmount && caseData.daysSinceMoveOut);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="claim-engine"
      className="py-16 sm:py-24 px-4 bg-card border-y border-border"
    >
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-10 ${visible ? "animate-fadeSlideUp" : "opacity-0"}`} style={{ animationFillMode: "both" }}>
          <p className="text-xs font-semibold text-accent uppercase tracking-[0.15em] mb-3">Live Claim Engine</p>
          <h2 className="text-2xl sm:text-3xl text-foreground">Check if your landlord violated the law</h2>
          <p className="mt-2 text-muted text-sm sm:text-base">Enter your case details and watch your claim calculate in real time.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Side */}
          <div className="rounded-xl border border-border bg-background p-6 space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted uppercase tracking-wider">State</label>
              <div className="relative">
                <select
                  value={caseData.state}
                  onChange={(e) => update("state", e.target.value)}
                  className="flex h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent appearance-none cursor-pointer"
                >
                  {US_STATES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                {/* ChevronDown */}
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted uppercase tracking-wider">Deposit Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
                <input
                  type="number"
                  placeholder="1200"
                  value={caseData.depositAmount}
                  onChange={(e) => update("depositAmount", e.target.value)}
                  className="flex h-11 w-full rounded-lg border border-border bg-background pl-7 pr-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted uppercase tracking-wider">Days Since Move-Out</label>
              <input
                type="number"
                placeholder="e.g. 45"
                value={caseData.daysSinceMoveOut}
                onChange={(e) => update("daysSinceMoveOut", e.target.value)}
                className="flex h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              />
              <p className="text-xs text-muted">How many days ago did you move out?</p>
            </div>

            <div className="space-y-4 pt-2">
              {([
                { key: "depositReturned" as const, label: "Has any deposit been returned?" },
                { key: "writtenNotice" as const, label: "Did landlord send written notice?" },
                { key: "damageDeductions" as const, label: "Were damage deductions taken?" },
              ]).map(({ key, label }) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-xs font-medium text-muted">{label}</label>
                  <div className="flex gap-2">
                    {["yes", "no"].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => update(key, val)}
                        className={`flex-1 h-9 rounded-lg text-sm font-medium transition-all duration-200 border ${
                          caseData[key] === val
                            ? "bg-accent text-white border-accent shadow-sm"
                            : "bg-background text-muted border-border hover:border-accent/30"
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
                  {/* Scale icon */}
                  <svg className="h-7 w-7 text-muted/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" />
                  </svg>
                </div>
                <p className="text-sm text-muted">Enter your case details to see<br />your claim calculated live</p>
              </div>
            )}

            {hasMinimumInput && analysis && (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <p className="text-xs font-medium text-muted uppercase tracking-wider mb-2">Estimated Recovery</p>
                  <p className="font-serif text-5xl sm:text-6xl text-foreground animate-scaleFadeIn">
                    ${analysis.totalClaim.toLocaleString()}
                  </p>
                  {analysis.penaltyAmount > 0 && (
                    <p className="mt-2 text-sm text-accent font-medium">
                      Potential penalty: {analysis.penaltyMultiplier}&times; deposit
                    </p>
                  )}
                </div>

                {analysis.violations.length > 0 && (
                  <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 space-y-2">
                    <p className="text-xs font-semibold text-destructive uppercase tracking-wider">Possible Violations Detected</p>
                    {analysis.violations.map((v, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        {/* AlertTriangle */}
                        <svg className="h-4 w-4 text-destructive shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        <span className="text-foreground">{v}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className={`rounded-lg p-4 border ${
                  analysis.strength === "STRONG" ? "bg-success/5 border-success/20" :
                  analysis.strength === "MODERATE" ? "bg-accent/5 border-accent/20" :
                  "bg-background border-border"
                }`}>
                  <div className="flex items-center gap-2">
                    {analysis.strength === "STRONG" ? (
                      <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                    )}
                    <span className={`text-sm font-bold uppercase tracking-wider ${analysis.strength === "STRONG" ? "text-success" : "text-accent"}`}>
                      Confidence: {analysis.strength}
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-1">
                    Based on {analysis.statute}
                  </p>
                </div>

                <a
                  href="#pricing"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 shadow-xl shadow-accent/20 min-h-[44px]"
                >
                  See Full Case Analysis
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            )}

            {hasMinimumInput && !analysis && (
              <div className="h-full flex flex-col items-center justify-center py-16 text-center">
                <div className="h-16 w-16 rounded-full bg-background flex items-center justify-center mb-4 border border-border">
                  <svg className="h-7 w-7 text-muted/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-muted">Analyzing your case&hellip;</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
