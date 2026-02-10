import type { StateRules } from "@/lib/state-rules";

export type PMUrgency = "safe" | "soon" | "urgent" | "overdue";

export interface PMDeadlineAnalysis {
  moveOutDate: Date;
  returnDeadline: Date;
  claimDeadline: Date;
  recommendedMailByDate: Date;
  today: Date;
  daysSinceMoveOut: number;
  daysUntilReturnDeadline: number;
  daysUntilClaimDeadline: number;
  daysUntilRecommendedMailBy: number;
  urgency: PMUrgency;
  urgencyLabel: string;
  urgencyDescription: string;
}

function subtractBusinessDays(date: Date, days: number): Date {
  const result = new Date(date);
  let remaining = days;
  while (remaining > 0) {
    result.setDate(result.getDate() - 1);
    const dayOfWeek = result.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      remaining--;
    }
  }
  return result;
}

function daysBetween(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

export function calculatePMDeadlines(
  moveOutDate: Date,
  rules: StateRules
): PMDeadlineAnalysis {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const moveOut = new Date(moveOutDate);
  moveOut.setHours(0, 0, 0, 0);

  const returnDeadline = new Date(moveOut);
  returnDeadline.setDate(returnDeadline.getDate() + rules.returnDeadline);

  const claimDeadline = new Date(moveOut);
  claimDeadline.setDate(claimDeadline.getDate() + rules.claimDeadline);

  // Allow 5 business days for USPS delivery
  const recommendedMailByDate = subtractBusinessDays(claimDeadline, 5);

  const daysSinceMoveOut = daysBetween(moveOut, today);
  const daysUntilReturnDeadline = daysBetween(today, returnDeadline);
  const daysUntilClaimDeadline = daysBetween(today, claimDeadline);
  const daysUntilRecommendedMailBy = daysBetween(today, recommendedMailByDate);

  let urgency: PMUrgency;
  let urgencyLabel: string;
  let urgencyDescription: string;

  if (daysUntilClaimDeadline < 0) {
    urgency = "overdue";
    urgencyLabel = "Deadline Passed";
    urgencyDescription = `Your 30-day notice deadline passed ${Math.abs(daysUntilClaimDeadline)} day(s) ago. Under ${rules.statuteTitle}, you may have forfeited your right to claim deductions. Generate this packet anyway for your records.`;
  } else if (daysUntilRecommendedMailBy < 0) {
    urgency = "urgent";
    urgencyLabel = "Mail Immediately";
    urgencyDescription = `Your recommended mail-by date has passed. You have ${daysUntilClaimDeadline} day(s) until the statutory deadline. Mail this notice via certified mail today.`;
  } else if (daysUntilClaimDeadline <= 10) {
    urgency = "soon";
    urgencyLabel = "Deadline Approaching";
    urgencyDescription = `You have ${daysUntilClaimDeadline} day(s) until your 30-day notice deadline. Mail by ${formatDate(recommendedMailByDate)} to allow for delivery time.`;
  } else {
    urgency = "safe";
    urgencyLabel = "On Track";
    urgencyDescription = `You have ${daysUntilClaimDeadline} day(s) until your 30-day notice deadline. Recommended mail-by date: ${formatDate(recommendedMailByDate)}.`;
  }

  return {
    moveOutDate: moveOut,
    returnDeadline,
    claimDeadline,
    recommendedMailByDate,
    today,
    daysSinceMoveOut,
    daysUntilReturnDeadline,
    daysUntilClaimDeadline,
    daysUntilRecommendedMailBy,
    urgency,
    urgencyLabel,
    urgencyDescription,
  };
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
