"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

// ─── Inline SVG Icons ──────────────────────────────────────────────────────────

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

function AlertTriangleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function FileTextIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function ScaleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

// ─── State Deposit Laws — All 50 States ────────────────────────────────────────

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

// ─── Types ─────────────────────────────────────────────────────────────────────

interface CaseData {
  state: string;
  depositAmount: string;
  daysSinceMoveOut: string;
  depositReturned: string;
  writtenNotice: string;
  damageDeductions: string;
}

// ─── Page Component ────────────────────────────────────────────────────────────

export default function CheckMyCase() {
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
    const daysSinceMoveOut = parseInt(caseData.daysSinceMoveOut) || 0;
    if (!deposit || !stateLaw || !daysSinceMoveOut) {
      return null;
    }

    const violations: string[] = [];
    let penaltyAmount = 0;

    if (daysSinceMoveOut > stateLaw.deadline && caseData.depositReturned === "no") {
      violations.push(`Landlord missed the ${stateLaw.deadline}-day statutory deadline by ${daysSinceMoveOut - stateLaw.deadline} days`);
      penaltyAmount = deposit * (stateLaw.penaltyMultiplier - 1);
    }

    if (caseData.writtenNotice === "no" && caseData.depositReturned === "no") {
      violations.push("No itemized written notice of deductions provided");
    }

    if (caseData.damageDeductions === "yes" && caseData.writtenNotice === "no") {
      violations.push("Deductions taken without proper itemization");
    }

    const totalClaim = deposit + penaltyAmount;
    const strength = violations.length >= 2 ? "STRONG" : violations.length === 1 ? "MODERATE" : "WEAK";

    return {
      deposit,
      daysSinceMoveOut,
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

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleCheckout = useCallback(async () => {
    if (!analysis || analysis.violations.length === 0) return;
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/check-my-case/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          state: caseData.state,
          stateName: analysis.stateName,
          depositAmount: analysis.deposit,
          daysSinceMoveOut: analysis.daysSinceMoveOut,
          violations: analysis.violations,
          penaltyAmount: analysis.penaltyAmount,
          totalClaim: analysis.totalClaim,
          statute: analysis.statute,
          strength: analysis.strength,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
        setCheckoutLoading(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setCheckoutLoading(false);
    }
  }, [analysis, caseData.state]);

  return (
    <>
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted hover:text-foreground transition-colors">
            <ArrowLeftIcon className="h-4 w-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <Link href="/" className="font-serif text-xl text-foreground">
            DepositReady
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <LockIcon className="h-3 w-3" />
            <span>Secure</span>
          </div>
        </div>
      </header>

      {/* Page title */}
      <div className="bg-gradient-to-b from-accent/[0.08] to-transparent py-8 sm:py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground animate-fadeSlideUp"
            style={{ animationDuration: "0.5s", animationFillMode: "both" }}
          >
            Deposit Recovery Engine
          </h1>
          <p
            className="mt-2 text-sm sm:text-base text-muted animate-fadeSlideUp"
            style={{ animationDuration: "0.5s", animationDelay: "100ms", animationFillMode: "both" }}
          >
            Enter your details. Watch your claim calculate in real time.
          </p>
        </div>
      </div>

      {/* Three Panel Layout */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Panel 1 — Claim Engine (CENTER, shown first visually) */}
          <div className="lg:col-span-5 lg:order-2">
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <AlertTriangleIcon className="h-4 w-4 text-accent" />
                </div>
                <h2 className="font-serif text-lg text-foreground">Claim Engine</h2>
              </div>

              {!hasMinimumInput && (
                <div className="py-16 text-center">
                  <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <ScaleIcon className="h-7 w-7 text-gray-400" />
                  </div>
                  <p className="text-sm text-muted">Enter your case details to see<br />your claim calculated live</p>
                </div>
              )}

              {hasMinimumInput && analysis && (
                <div className="space-y-6">
                  {/* Big number */}
                  <div className="text-center py-6">
                    <p className="text-xs font-medium text-muted uppercase tracking-wider mb-2">Estimated Amount You May Be Owed</p>
                    <p
                      key={analysis.totalClaim}
                      className="font-serif text-5xl sm:text-6xl lg:text-7xl text-foreground animate-scaleFadeIn"
                    >
                      ${analysis.totalClaim.toLocaleString()}
                    </p>
                    <p className="mt-2 text-xs text-muted">Based on {analysis.stateName} deposit law</p>
                  </div>

                  {/* Calculation breakdown */}
                  <div className="rounded-lg bg-gray-50 p-4 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted">Deposit owed</span>
                      <span className="font-medium text-foreground">${analysis.deposit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Statutory deadline</span>
                      <span className="font-medium text-foreground">{analysis.deadline} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Days since move-out</span>
                      <span className="font-medium text-foreground">{analysis.daysSinceMoveOut}</span>
                    </div>
                    {analysis.penaltyAmount > 0 && (
                      <>
                        <div className="h-px bg-border" />
                        <div className="flex justify-between">
                          <span className="text-muted">Statutory penalty ({analysis.penaltyMultiplier}×)</span>
                          <span className="font-semibold text-accent">${analysis.penaltyAmount.toLocaleString()}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Case Strength */}
                  <div className={`rounded-lg p-4 border ${
                    analysis.strength === "STRONG"
                      ? "bg-green-50 border-green-200"
                      : analysis.strength === "MODERATE"
                      ? "bg-accent/5 border-accent/20"
                      : "bg-gray-100 border-border"
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {analysis.strength === "STRONG" ? (
                        <CheckCircleIcon className="h-5 w-5 text-success" />
                      ) : (
                        <AlertTriangleIcon className="h-5 w-5 text-accent" />
                      )}
                      <span className={`text-sm font-bold uppercase tracking-wider ${
                        analysis.strength === "STRONG" ? "text-success" : "text-accent"
                      }`}>
                        Case Strength: {analysis.strength}
                      </span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">
                      Under {analysis.statute}, landlords must return deposits or provide written notice within {analysis.deadline} days. Your answers suggest {analysis.violations.length} potential violation{analysis.violations.length !== 1 ? "s" : ""}.
                    </p>
                  </div>

                  {/* Violations list */}
                  {analysis.violations.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted uppercase tracking-wider">Violations Detected</p>
                      {analysis.violations.map((v, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <AlertTriangleIcon className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                          <span className="text-foreground">{v}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Why This Works */}
                  <div className="rounded-lg bg-gray-50 border border-border p-4">
                    <p className="text-xs font-medium text-foreground mb-1">Why This Works</p>
                    <p className="text-xs text-muted leading-relaxed">
                      Landlords often ignore generic demand letters. Your recovery packet references the exact statute and documents the specific violations detected in your case — making it significantly harder to dismiss.
                    </p>
                  </div>
                </div>
              )}

              {hasMinimumInput && !analysis && (
                <div className="py-16 text-center">
                  <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <ClockIcon className="h-7 w-7 text-gray-400" />
                  </div>
                  <p className="text-sm text-muted">Analyzing your case…</p>
                </div>
              )}
            </div>
          </div>

          {/* Panel 2 — Case Input (LEFT) */}
          <div className="lg:col-span-3 lg:order-1">
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <ScaleIcon className="h-4 w-4 text-accent" />
                </div>
                <h2 className="font-serif text-lg text-foreground">Case Details</h2>
              </div>

              <div className="space-y-5">
                {/* State */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted uppercase tracking-wider">State</label>
                  <div className="relative">
                    <select
                      value={caseData.state}
                      onChange={(e) => update("state", e.target.value)}
                      className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand appearance-none cursor-pointer"
                    >
                      {US_STATES.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
                  </div>
                </div>

                {/* Deposit Amount */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted uppercase tracking-wider">Deposit Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
                    <Input
                      type="number"
                      placeholder="1200"
                      value={caseData.depositAmount}
                      onChange={(e) => update("depositAmount", e.target.value)}
                      className="pl-7 !h-11"
                    />
                  </div>
                </div>

                {/* Days Since Move-Out */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted uppercase tracking-wider">Days Since Move-Out</label>
                  <Input
                    type="number"
                    placeholder="e.g. 45"
                    value={caseData.daysSinceMoveOut}
                    onChange={(e) => update("daysSinceMoveOut", e.target.value)}
                    className="!h-11"
                  />
                  <p className="text-xs text-muted">How many days ago did you move out?</p>
                </div>

                {/* Yes/No Questions */}
                <div className="space-y-4 pt-2">
                  {([
                    { key: "depositReturned" as const, label: "Has any deposit been returned?" },
                    { key: "writtenNotice" as const, label: "Did landlord send written notice?" },
                    { key: "damageDeductions" as const, label: "Were damage deductions taken?" },
                  ]).map(({ key, label }) => (
                    <div key={key} className="space-y-1.5">
                      <label className="text-xs font-medium text-muted">{label}</label>
                      <div className="flex gap-2">
                        {(["yes", "no"] as const).map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => update(key, val)}
                            className={`flex-1 h-9 rounded-lg text-sm font-medium transition-all duration-200 border ${
                              caseData[key] === val
                                ? "bg-accent text-white border-accent shadow-sm"
                                : "bg-white text-muted border-border hover:border-accent/30"
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
            </div>
          </div>

          {/* Panel 3 — Recovery Packet (RIGHT) */}
          <div className="lg:col-span-4 lg:order-3">
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <FileTextIcon className="h-4 w-4 text-accent" />
                </div>
                <h2 className="font-serif text-lg text-foreground">Recovery Packet</h2>
              </div>

              {/* Packet preview */}
              <div className="rounded-lg border border-border bg-white overflow-hidden">
                <div className="bg-gray-50 px-5 py-4 border-b border-border text-center">
                  <p className="text-xs font-bold text-foreground uppercase tracking-[0.2em]">Deposit Recovery Demand</p>
                  <p className="text-[10px] text-muted mt-1">
                    {analysis ? `Prepared Under ${analysis.statute}` : "Prepared Under State Deposit Law"}
                  </p>
                </div>

                <div className="p-5 space-y-4">
                  {[
                    { label: "Violation Summary", desc: analysis ? `${analysis.violations.length} violation(s) documented` : "Awaiting case analysis", ready: !!(analysis && analysis.violations.length > 0) },
                    { label: "Timeline of Events", desc: "Move-out date, deadlines & breach", ready: hasMinimumInput },
                    { label: "Formal Legal Demand", desc: "State-specific statutory demand letter", ready: !!(analysis && analysis.violations.length > 0) },
                    { label: "Statutory Citation", desc: analysis?.statute || "Awaiting state selection", ready: !!caseData.state },
                    { label: "Evidence Log", desc: "Supporting documentation & records", ready: hasMinimumInput },
                    { label: "Response Deadline", desc: "14-day compliance window", ready: hasMinimumInput },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-start gap-3 transition-opacity duration-300 ${item.ready ? "opacity-100" : "opacity-40"}`}
                    >
                      <div className={`mt-0.5 h-5 w-5 rounded-md flex items-center justify-center shrink-0 ${
                        item.ready ? "bg-green-50" : "bg-gray-100"
                      }`}>
                        {item.ready ? (
                          <CheckCircleIcon className="h-3.5 w-3.5 text-success" />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-gray-300" />
                        )}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${item.ready ? "text-foreground" : "text-muted"}`}>
                          {item.label}
                        </p>
                        <p className="text-xs text-muted">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleCheckout}
                  disabled={!analysis || analysis.violations.length === 0}
                  loading={checkoutLoading}
                  className="shadow-xl shadow-accent/20 gap-2"
                >
                  Send My Recovery Demand
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
                <p className="text-center text-lg font-serif text-foreground">$39</p>

                <div className="flex items-center justify-center gap-2 text-xs text-muted pt-1">
                  <LockIcon className="h-3 w-3" />
                  <span>Money-back guarantee · Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom trust bar */}
      <div className="border-t border-border bg-white/50 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <ShieldCheckIcon className="h-3.5 w-3.5 text-accent" />
            Money-back guarantee
          </span>
          <span className="h-3 w-px bg-border" />
          <span className="flex items-center gap-1.5">
            <ClockIcon className="h-3.5 w-3.5 text-accent" />
            Results in 60 seconds
          </span>
          <span className="h-3 w-px bg-border" />
          <span>2,400+ renter deposit cases analyzed</span>
          <span className="h-3 w-px bg-border" />
          <span className="font-medium">Average recovery: $1,200+</span>
        </div>
      </div>
    </>
  );
}
