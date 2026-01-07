import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { WizardData } from "@/types/dispute";
import { DeadlineAnalysis, FLORIDA_RULES } from "@/lib/florida-rules";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    marginBottom: 10,
    backgroundColor: "#f3f4f6",
    padding: 8,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 8,
  },
  labelCol: {
    width: "40%",
    fontFamily: "Helvetica-Bold",
  },
  valueCol: {
    width: "60%",
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 15,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 15,
    marginTop: 3,
  },
  dotPassed: {
    backgroundColor: "#dc2626",
  },
  dotCurrent: {
    backgroundColor: "#f59e0b",
  },
  dotFuture: {
    backgroundColor: "#10b981",
  },
  timelineContent: {
    flex: 1,
  },
  timelineDate: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  timelineLabel: {
    color: "#374151",
    marginBottom: 2,
  },
  timelineStatus: {
    fontSize: 10,
    marginTop: 2,
  },
  statusPassed: {
    color: "#dc2626",
    fontFamily: "Helvetica-Bold",
  },
  statusOk: {
    color: "#10b981",
  },
  violationBox: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#dc2626",
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  violationTitle: {
    fontFamily: "Helvetica-Bold",
    color: "#dc2626",
    marginBottom: 8,
  },
  violationText: {
    color: "#991b1b",
    lineHeight: 1.5,
  },
  infoBox: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#3b82f6",
    padding: 15,
    marginTop: 15,
  },
  infoTitle: {
    fontFamily: "Helvetica-Bold",
    color: "#1d4ed8",
    marginBottom: 8,
  },
  infoText: {
    color: "#1e40af",
    lineHeight: 1.5,
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

interface TimelineProps {
  data: WizardData;
  deadlines: DeadlineAnalysis;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function Timeline({ data, deadlines }: TimelineProps) {
  const propertyAddress = `${data.property.address}${data.property.unit ? `, ${data.property.unit}` : ""}, ${data.property.city}, FL ${data.property.zip}`;

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Title */}
        <Text style={styles.title}>Florida Security Deposit Timeline</Text>
        <Text style={styles.subtitle}>
          Legal Deadlines Under Florida Statute {FLORIDA_RULES.statute}
        </Text>

        {/* Property Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Information</Text>
          <View style={styles.row}>
            <Text style={styles.labelCol}>Property Address:</Text>
            <Text style={styles.valueCol}>{propertyAddress}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelCol}>Move-Out Date:</Text>
            <Text style={styles.valueCol}>{formatDate(deadlines.moveOutDate)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelCol}>Days Since Move-Out:</Text>
            <Text style={styles.valueCol}>{deadlines.daysSinceMoveOut} days</Text>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Deadlines</Text>

          {/* Move-Out Date */}
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, styles.dotPassed]} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineDate}>{formatShortDate(deadlines.moveOutDate)}</Text>
              <Text style={styles.timelineLabel}>Move-Out Date (Day 0)</Text>
              <Text style={[styles.timelineStatus, styles.statusOk]}>Completed</Text>
            </View>
          </View>

          {/* 15-Day Deadline */}
          <View style={styles.timelineItem}>
            <View style={[
              styles.timelineDot,
              deadlines.returnDeadlinePassed ? styles.dotPassed : styles.dotFuture
            ]} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineDate}>{formatShortDate(deadlines.returnDeadline)}</Text>
              <Text style={styles.timelineLabel}>
                15-Day Return Deadline (No Deductions)
              </Text>
              {deadlines.returnDeadlinePassed ? (
                <Text style={[styles.timelineStatus, styles.statusPassed]}>
                  DEADLINE PASSED - {Math.abs(deadlines.daysUntilReturnDeadline)} days ago
                </Text>
              ) : (
                <Text style={[styles.timelineStatus, styles.statusOk]}>
                  {deadlines.daysUntilReturnDeadline} days remaining
                </Text>
              )}
            </View>
          </View>

          {/* 30-Day Deadline */}
          <View style={styles.timelineItem}>
            <View style={[
              styles.timelineDot,
              deadlines.claimDeadlinePassed ? styles.dotPassed : styles.dotFuture
            ]} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineDate}>{formatShortDate(deadlines.claimDeadline)}</Text>
              <Text style={styles.timelineLabel}>
                30-Day Claim Deadline (With Deductions)
              </Text>
              {deadlines.claimDeadlinePassed ? (
                <Text style={[styles.timelineStatus, styles.statusPassed]}>
                  DEADLINE PASSED - {Math.abs(deadlines.daysUntilClaimDeadline)} days ago
                </Text>
              ) : (
                <Text style={[styles.timelineStatus, styles.statusOk]}>
                  {deadlines.daysUntilClaimDeadline} days remaining
                </Text>
              )}
            </View>
          </View>

          {/* Today */}
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, styles.dotCurrent]} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineDate}>{formatShortDate(deadlines.today)}</Text>
              <Text style={styles.timelineLabel}>Today</Text>
            </View>
          </View>
        </View>

        {/* Violation Alert */}
        {deadlines.landlordInViolation && (
          <View style={styles.violationBox}>
            <Text style={styles.violationTitle}>LANDLORD IN VIOLATION</Text>
            <Text style={styles.violationText}>
              Based on the timeline above, your landlord has failed to comply with Florida Statute {FLORIDA_RULES.statute}.
              {deadlines.violationType === "both" && " Both the 15-day return deadline and 30-day claim deadline have passed without proper action."}
              {deadlines.violationType === "return" && " The 15-day deadline to return your deposit (when no deductions are claimed) has passed."}
              {deadlines.violationType === "claim" && " The 30-day deadline to provide written notice of intent to claim deductions has passed."}
              {"\n\n"}Under Florida law, this failure may result in your landlord forfeiting the right to impose any claim on your deposit.
            </Text>
          </View>
        )}

        {/* Legal Reference */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Florida Statute {FLORIDA_RULES.statute} Requirements</Text>
          <Text style={styles.infoText}>
            • If NO deductions: Landlord must return full deposit within 15 days{"\n"}
            • If claiming deductions: Landlord must send certified mail notice within 30 days{"\n"}
            • Notice must itemize each deduction with specific amounts{"\n"}
            • Failure to comply: Landlord forfeits right to claim any deductions{"\n"}
            • Bad faith retention: Tenant may recover triple the deposit amount
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            Generated by DepositReady.co | This document does not constitute legal advice.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
