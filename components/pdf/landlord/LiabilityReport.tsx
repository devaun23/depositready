import {
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { LiabilityExposure } from "@/lib/landlord/types";
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
    marginBottom: 24,
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  badgeHigh: {
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    paddingHorizontal: 16,
    paddingVertical: 6,
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
  },
  badgeMedium: {
    backgroundColor: "#fef9c3",
    color: "#a16207",
    paddingHorizontal: 16,
    paddingVertical: 6,
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
  },
  badgeLow: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    paddingHorizontal: 16,
    paddingVertical: 6,
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    backgroundColor: "#f3f4f6",
    padding: 8,
    marginBottom: 10,
  },
  table: {
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tableRowAlt: {
    backgroundColor: "#f9fafb",
  },
  tableLabel: {
    flex: 3,
    fontSize: 11,
  },
  tableValue: {
    flex: 1,
    textAlign: "right",
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  totalRow: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderTopColor: "#1e3a5f",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fef2f2",
  },
  totalLabel: {
    flex: 3,
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    color: "#dc2626",
  },
  totalValue: {
    flex: 1,
    textAlign: "right",
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    color: "#dc2626",
  },
  settlementBox: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#3b82f6",
    padding: 14,
    marginBottom: 20,
  },
  settlementTitle: {
    fontFamily: "Helvetica-Bold",
    color: "#1d4ed8",
    fontSize: 12,
    marginBottom: 6,
  },
  settlementAmount: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#1e3a5f",
    marginBottom: 6,
  },
  settlementDesc: {
    fontSize: 10,
    color: "#1e40af",
    lineHeight: 1.4,
  },
  narrativeBox: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
  },
  narrativeTitle: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
    color: "#1e3a5f",
  },
  narrativeText: {
    lineHeight: 1.6,
    color: "#374151",
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

function fmt(n: number): string {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

interface LiabilityReportProps {
  liability: LiabilityExposure;
  stateRules: StateRules;
}

export function LiabilityReport({ liability, stateRules }: LiabilityReportProps) {
  const badgeStyle =
    liability.riskLevel === "high"
      ? styles.badgeHigh
      : liability.riskLevel === "medium"
        ? styles.badgeMedium
        : styles.badgeLow;

  const recLabel =
    liability.recommendation === "settle"
      ? "Settle"
      : liability.recommendation === "negotiate"
        ? "Negotiate"
        : "Defend";

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Liability Exposure Report</Text>
      <Text style={styles.subtitle}>{stateRules.name} — {stateRules.statuteTitle}</Text>

      {/* Risk Badge */}
      <View style={styles.badgeRow}>
        <Text style={badgeStyle}>
          RISK LEVEL: {liability.riskLevel.toUpperCase()}
        </Text>
      </View>

      {/* Worst Case Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Worst-Case Liability Breakdown</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Security Deposit Return</Text>
            <Text style={styles.tableValue}>
              {fmt(liability.breakdown.depositReturn)}
            </Text>
          </View>
          <View style={[styles.tableRow, styles.tableRowAlt]}>
            <Text style={styles.tableLabel}>
              Penalty Damages ({stateRules.damagesDescription})
            </Text>
            <Text style={styles.tableValue}>
              {fmt(liability.breakdown.penaltyDamages)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Estimated Court Costs</Text>
            <Text style={styles.tableValue}>
              {fmt(liability.breakdown.estimatedCourtCosts)}
            </Text>
          </View>
          <View style={[styles.tableRow, styles.tableRowAlt]}>
            <Text style={styles.tableLabel}>Estimated Attorney Fees</Text>
            <Text style={styles.tableValue}>
              {fmt(liability.breakdown.estimatedAttorneyFees)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              Total Worst-Case Exposure
            </Text>
            <Text style={styles.totalValue}>
              {fmt(liability.worstCaseTotal)}
            </Text>
          </View>
        </View>
      </View>

      {/* Settlement Target */}
      <View style={styles.settlementBox}>
        <Text style={styles.settlementTitle}>
          Recommended Settlement Target
        </Text>
        <Text style={styles.settlementAmount}>
          {fmt(liability.breakEvenSettlement)}
        </Text>
        <Text style={styles.settlementDesc}>
          Based on the penalty multiplier of {liability.penaltyMultiplier}x, court
          filing fees of {fmt(liability.filingFeeRange.min)}-
          {fmt(liability.filingFeeRange.max)}, and the overall risk assessment,
          our recommendation is to{" "}
          <Text style={{ fontFamily: "Helvetica-Bold" }}>
            {recLabel.toLowerCase()}
          </Text>
          . A settlement at or below this amount is likely more cost-effective
          than litigation.
        </Text>
      </View>

      {/* Risk Narrative */}
      <View style={styles.narrativeBox}>
        <Text style={styles.narrativeTitle}>Risk Assessment</Text>
        <Text style={styles.narrativeText}>
          {liability.riskLevel === "high" && (
            `Your liability exposure is significant. Under ${stateRules.statuteTitle}, the tenant may be entitled to ${stateRules.damagesDescription} for wrongful withholding of the security deposit. Combined with potential court costs and attorney fees, the total exposure of ${fmt(liability.worstCaseTotal)} makes settlement the most financially prudent path. Immediate action is recommended to mitigate further risk.`
          )}
          {liability.riskLevel === "medium" && (
            `Your exposure is moderate. While there are compliance concerns, the overall risk may be manageable through negotiation. Under ${stateRules.statuteTitle}, penalty damages of ${stateRules.damagesDescription} could apply if the case proceeds to court. Consider making a good-faith offer to the tenant to resolve the matter before litigation costs escalate.`
          )}
          {liability.riskLevel === "low" && (
            `Your risk exposure is relatively low based on the current compliance assessment. While the tenant may pursue a claim, your position appears defensible. However, any litigation carries inherent costs and uncertainty. If a claim is filed, responding promptly and professionally will strengthen your position. The estimated filing fees alone (${fmt(liability.filingFeeRange.min)}-${fmt(liability.filingFeeRange.max)}) should be factored into your decision.`
          )}
        </Text>
      </View>

      <View style={styles.footer}>
        <Text>
          Generated by DepositReady.co | This document does not constitute legal advice.
        </Text>
      </View>
    </Page>
  );
}
