"use client";

import type { CaseData } from "./ChatContext";

interface MilestoneCardProps {
  toolName: string;
  caseData: CaseData;
}

interface MilestoneContent {
  title: string;
  message: string;
  icon: React.ReactNode;
}

/**
 * Renders a celebratory milestone card when a tool result indicates
 * a significant positive finding. Returns null if no milestone applies.
 */
export function MilestoneCard({ toolName, caseData }: MilestoneCardProps) {
  const milestone = getMilestone(toolName, caseData);
  if (!milestone) return null;

  return (
    <div className="mt-2 rounded-xl border border-accent/20 bg-accent/5 p-3 animate-fadeSlideUp animate-milestone-glow">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
          {milestone.icon}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm text-gray-900">
            {milestone.title}
          </p>
          <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
            {milestone.message}
          </p>
        </div>
      </div>
    </div>
  );
}

function getMilestone(toolName: string, caseData: CaseData): MilestoneContent | null {
  if (toolName === "analyze_deadline" && caseData.violationDetected) {
    const daysText = caseData.returnDeadlineDays
      ? `the ${caseData.returnDeadlineDays}-day`
      : "the return";
    return {
      title: "Violation Found",
      message: `Your landlord missed ${daysText} deadline. This strengthens your case.`,
      icon: <CheckCircleIcon />,
    };
  }

  if (toolName === "calculate_damages" && caseData.recoveryAmount && caseData.depositAmount) {
    const multiplier = caseData.recoveryAmount / caseData.depositAmount;
    if (multiplier > 1) {
      return {
        title: "Recovery Calculated",
        message: `You may be entitled to up to $${caseData.recoveryAmount.toLocaleString()} — that's ${multiplier.toFixed(1)}x your deposit.`,
        icon: <DollarIcon />,
      };
    }
    return {
      title: "Recovery Calculated",
      message: `You may be entitled to up to $${caseData.recoveryAmount.toLocaleString()}.`,
      icon: <DollarIcon />,
    };
  }

  if (toolName === "assess_case_strength" && caseData.caseStrength === "STRONG") {
    return {
      title: "Strong Case",
      message: `Your case looks strong based on ${caseData.stateName || "state"} law.`,
      icon: <ShieldCheckIcon />,
    };
  }

  return null;
}

function CheckCircleIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
