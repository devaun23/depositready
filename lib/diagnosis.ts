/**
 * Diagnosis Engine
 *
 * Analyzes a renter's situation against state-specific deposit return deadlines
 * to determine notice status, case strength, and recovery estimates.
 *
 * Built on top of the existing state rules engine — does NOT modify any state files.
 */

import { getStateRulesByCode } from '@/lib/state-rules';
import type {
  DiagnosisInput,
  DiagnosisResult,
  NoticeStatus,
  CaseStrength,
  TimelineEvent,
  StateRules,
} from '@/lib/state-rules/types';

function toMidnight(d: Date): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function daysBetween(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function getDeadlineDate(moveOutDate: Date, rules: StateRules): Date {
  const deadline = new Date(moveOutDate);
  deadline.setDate(deadline.getDate() + rules.claimDeadline);
  return deadline;
}

function classifyNotice(
  input: DiagnosisInput,
  deadlineDate: Date,
  today: Date
): { status: NoticeStatus; strength: CaseStrength; daysLate: number | null; daysRemaining: number | null } {
  const deadlinePassed = today > deadlineDate;

  if (input.receivedNotice === 'no') {
    if (deadlinePassed) {
      return {
        status: 'NOTICE_MISSED',
        strength: 'STRONG',
        daysLate: daysBetween(deadlineDate, today),
        daysRemaining: null,
      };
    }
    return {
      status: 'NOTICE_PENDING',
      strength: 'MODERATE',
      daysLate: null,
      daysRemaining: daysBetween(today, deadlineDate),
    };
  }

  if (input.receivedNotice === 'yes' && input.noticeSentDate) {
    const noticeDate = toMidnight(new Date(input.noticeSentDate));
    if (noticeDate > deadlineDate) {
      const late = daysBetween(deadlineDate, noticeDate);
      return {
        status: 'NOTICE_LATE',
        strength: late > 7 ? 'STRONG' : 'MODERATE',
        daysLate: late,
        daysRemaining: null,
      };
    }
    return {
      status: 'NOTICE_TIMELY',
      strength: 'WEAK',
      daysLate: null,
      daysRemaining: null,
    };
  }

  // not_sure or yes without a date
  return {
    status: 'NOTICE_UNCLEAR',
    strength: 'MODERATE',
    daysLate: null,
    daysRemaining: deadlinePassed ? null : daysBetween(today, deadlineDate),
  };
}

function calculateRecovery(
  input: DiagnosisInput,
  status: NoticeStatus,
  rules: StateRules
): { estimate: number; max: number | null; basis: 'forfeiture' | 'withheld_only' } {
  const withheld = input.amountWithheld || input.totalDeposit;

  switch (status) {
    case 'NOTICE_MISSED':
    case 'NOTICE_LATE':
      // Forfeiture: landlord loses right to withhold — full deposit recoverable
      return {
        estimate: input.totalDeposit,
        max: rules.damagesMultiplier > 1 ? input.totalDeposit * rules.damagesMultiplier : null,
        basis: 'forfeiture',
      };

    case 'NOTICE_PENDING':
    case 'NOTICE_UNCLEAR':
      // Show potential forfeiture amount (deadline hasn't passed or unclear)
      return {
        estimate: input.totalDeposit,
        max: rules.damagesMultiplier > 1 ? input.totalDeposit * rules.damagesMultiplier : null,
        basis: 'forfeiture',
      };

    case 'NOTICE_TIMELY':
      // No timing violation — can only dispute withheld amount
      return {
        estimate: withheld,
        max: null,
        basis: 'withheld_only',
      };
  }
}

function buildTimeline(
  input: DiagnosisInput,
  deadlineDate: Date,
  today: Date
): TimelineEvent[] {
  const moveOut = toMidnight(new Date(input.moveOutDate));
  const events: TimelineEvent[] = [
    { date: moveOut, label: 'Move-out', type: 'neutral' },
    {
      date: deadlineDate,
      label: 'Deadline',
      type: today > deadlineDate ? 'violation' : 'neutral',
    },
  ];

  if (input.receivedNotice === 'yes' && input.noticeSentDate) {
    const noticeDate = toMidnight(new Date(input.noticeSentDate));
    events.push({
      date: noticeDate,
      label: 'Notice sent',
      type: noticeDate > deadlineDate ? 'violation' : 'compliant',
    });
  }

  events.push({ date: today, label: 'Today', type: 'neutral' });

  // Sort chronologically
  events.sort((a, b) => a.date.getTime() - b.date.getTime());

  return events;
}

export function diagnose(input: DiagnosisInput): DiagnosisResult {
  const rules = getStateRulesByCode(input.stateCode);
  const today = toMidnight(new Date());
  const moveOut = toMidnight(new Date(input.moveOutDate));
  const deadlineDate = getDeadlineDate(moveOut, rules);

  const { status, strength, daysLate, daysRemaining } = classifyNotice(input, deadlineDate, today);
  const { estimate, max, basis } = calculateRecovery(input, status, rules);
  const timeline = buildTimeline(input, deadlineDate, today);
  const roiMultiple = Math.round((estimate / 79) * 10) / 10;

  return {
    noticeStatus: status,
    caseStrength: strength,
    daysLate,
    daysRemaining,
    recoveryEstimate: estimate,
    maxRecovery: max,
    recoveryBasis: basis,
    deadlineDate,
    stateRules: rules,
    timeline,
    roiMultiple,
  };
}
