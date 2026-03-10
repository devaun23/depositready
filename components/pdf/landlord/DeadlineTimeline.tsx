import {
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { StateRules } from "@/lib/state-rules";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
    marginTop: 2,
  },
  dotOk: {
    backgroundColor: "#16a34a",
  },
  dotWarning: {
    backgroundColor: "#eab308",
  },
  dotDanger: {
    backgroundColor: "#dc2626",
  },
  dotNeutral: {
    backgroundColor: "#6366f1",
  },
  line: {
    position: "absolute",
    left: 5,
    top: 14,
    width: 2,
    height: 60,
    backgroundColor: "#d1d5db",
  },
  itemContent: {
    flex: 1,
  },
  itemDate: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#1e3a5f",
    marginBottom: 2,
  },
  itemLabel: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  itemDesc: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.4,
    marginBottom: 2,
  },
  itemStatute: {
    fontSize: 9,
    color: "#6366f1",
  },
  warningBox: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#dc2626",
    padding: 12,
    marginTop: 20,
  },
  warningTitle: {
    fontFamily: "Helvetica-Bold",
    color: "#dc2626",
    marginBottom: 6,
    fontSize: 12,
  },
  warningText: {
    fontSize: 10,
    color: "#991b1b",
    lineHeight: 1.4,
  },
  infoBox: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#3b82f6",
    padding: 12,
    marginTop: 20,
  },
  infoTitle: {
    fontFamily: "Helvetica-Bold",
    color: "#1d4ed8",
    marginBottom: 6,
  },
  infoText: {
    fontSize: 10,
    color: "#1e40af",
    lineHeight: 1.4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    fontSize: 9,
    color: "#666",
    textAlign: "center",
  },
});

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

interface DeadlineTimelineProps {
  stateRules: StateRules;
  moveOutDate: string;
}

export function DeadlineTimeline({ stateRules, moveOutDate }: DeadlineTimelineProps) {
  const moveOut = new Date(moveOutDate);
  const today = new Date();
  const returnDate = addDays(moveOut, stateRules.returnDeadline);
  const claimDate = addDays(moveOut, stateRules.claimDeadline);

  const returnPassed = today > returnDate;
  const claimPassed = today > claimDate;
  const returnApproaching =
    !returnPassed && daysBetween(today, returnDate) <= 7;
  const claimApproaching =
    !claimPassed && daysBetween(today, claimDate) <= 7;

  const hasWarning =
    returnPassed || claimPassed || returnApproaching || claimApproaching;

  const items = [
    {
      date: moveOut,
      label: "Move-Out Date",
      description: "Tenant vacated the property. All deadlines begin from this date.",
      statute: "",
      status: "neutral" as const,
    },
    {
      date: returnDate,
      label: `Deposit Return Deadline (${stateRules.returnDeadline} days)`,
      description: `Under ${stateRules.statuteTitle}, the security deposit or itemized statement of deductions must be provided to the tenant within ${stateRules.returnDeadline} days of move-out.`,
      statute: stateRules.statuteSections.returnDeadline,
      status: returnPassed
        ? ("danger" as const)
        : returnApproaching
          ? ("warning" as const)
          : ("ok" as const),
    },
    {
      date: claimDate,
      label: `Tenant Claim Deadline (${stateRules.claimDeadline} days)`,
      description: `The tenant has ${stateRules.claimDeadline} days from move-out to pursue a claim for the return of their security deposit.`,
      statute: stateRules.statuteSections.claimDeadline,
      status: claimPassed
        ? ("danger" as const)
        : claimApproaching
          ? ("warning" as const)
          : ("ok" as const),
    },
  ];

  // Add itemization deadline if required
  if (stateRules.itemizedDeductionsRequired) {
    items.splice(2, 0, {
      date: returnDate,
      label: "Itemization Deadline",
      description: `${stateRules.name} requires landlords to provide an itemized statement of deductions. This must accompany the deposit return or be sent within the return deadline.`,
      statute: stateRules.statuteSections.itemizationRequirement,
      status: returnPassed ? "danger" : returnApproaching ? "warning" : "ok",
    });
  }

  const dotStyle = (status: "ok" | "warning" | "danger" | "neutral") => {
    switch (status) {
      case "ok":
        return styles.dotOk;
      case "warning":
        return styles.dotWarning;
      case "danger":
        return styles.dotDanger;
      default:
        return styles.dotNeutral;
    }
  };

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Legal Deadline Timeline</Text>
      <Text style={styles.subtitle}>
        {stateRules.name} — Based on move-out date: {formatDate(moveOut)}
      </Text>

      {items.map((item, i) => (
        <View key={i} style={styles.timelineItem}>
          <View>
            <View style={[styles.dot, dotStyle(item.status)]} />
            {i < items.length - 1 && <View style={styles.line} />}
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemDate}>{formatDate(item.date)}</Text>
            <Text style={styles.itemLabel}>{item.label}</Text>
            <Text style={styles.itemDesc}>{item.description}</Text>
            {item.statute ? (
              <Text style={styles.itemStatute}>{item.statute}</Text>
            ) : null}
          </View>
        </View>
      ))}

      {hasWarning && (
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>Deadline Warning</Text>
          {returnPassed && (
            <Text style={styles.warningText}>
              The deposit return deadline has passed. Failure to return the deposit
              or provide an itemized statement may expose you to penalty damages
              under {stateRules.statuteTitle}.
            </Text>
          )}
          {!returnPassed && returnApproaching && (
            <Text style={styles.warningText}>
              The deposit return deadline is approaching. You have{" "}
              {daysBetween(today, returnDate)} day(s) remaining to return the deposit
              or provide an itemized deduction statement.
            </Text>
          )}
          {claimPassed && (
            <Text style={styles.warningText}>
              The tenant claim deadline has passed. The tenant may no longer be
              able to file a claim, though exceptions may apply.
            </Text>
          )}
        </View>
      )}

      {!hasWarning && (
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>All Deadlines Current</Text>
          <Text style={styles.infoText}>
            All deadlines are within the legal window. Ensure you comply with each
            deadline to avoid potential liability. Mark these dates on your calendar
            and set reminders.
          </Text>
        </View>
      )}

      <View style={styles.footer}>
        <Text>
          Generated by DepositReady.co | This document does not constitute legal advice.
        </Text>
      </View>
    </Page>
  );
}
