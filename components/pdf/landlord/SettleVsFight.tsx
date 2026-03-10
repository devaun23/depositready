import {
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { LiabilityExposure } from "@/lib/landlord/types";

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
  intro: {
    marginBottom: 20,
    lineHeight: 1.5,
    color: "#374151",
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
  comparisonTable: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1e3a5f",
    padding: 8,
  },
  tableHeaderText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: "#ffffff",
    flex: 1,
    textAlign: "center",
  },
  tableHeaderLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: "#ffffff",
    flex: 2,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  tableRowAlt: {
    backgroundColor: "#f9fafb",
  },
  tableLabel: {
    flex: 2,
    fontSize: 10,
  },
  tableCellSettle: {
    flex: 1,
    textAlign: "center",
    fontSize: 10,
    color: "#166534",
    fontFamily: "Helvetica-Bold",
  },
  tableCellDefend: {
    flex: 1,
    textAlign: "center",
    fontSize: 10,
    color: "#dc2626",
    fontFamily: "Helvetica-Bold",
  },
  totalRow: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderTopColor: "#1e3a5f",
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: "#f3f4f6",
  },
  totalLabel: {
    flex: 2,
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
  },
  totalSettle: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: "#166534",
  },
  totalDefend: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: "#dc2626",
  },
  breakEvenBox: {
    backgroundColor: "#faf5ff",
    borderWidth: 1,
    borderColor: "#9333ea",
    padding: 14,
    marginBottom: 20,
  },
  breakEvenTitle: {
    fontFamily: "Helvetica-Bold",
    color: "#7e22ce",
    fontSize: 12,
    marginBottom: 6,
  },
  breakEvenAmount: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#1e3a5f",
    marginBottom: 6,
  },
  breakEvenDesc: {
    fontSize: 10,
    color: "#6b21a8",
    lineHeight: 1.4,
  },
  recBox: {
    padding: 14,
    marginBottom: 20,
    borderWidth: 2,
  },
  recBoxSettle: {
    backgroundColor: "#f0fdf4",
    borderColor: "#16a34a",
  },
  recBoxNegotiate: {
    backgroundColor: "#fef9c3",
    borderColor: "#eab308",
  },
  recBoxDefend: {
    backgroundColor: "#eff6ff",
    borderColor: "#3b82f6",
  },
  recTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 13,
    marginBottom: 6,
  },
  recText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#374151",
  },
  factorsTitle: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
    color: "#1e3a5f",
  },
  factorItem: {
    flexDirection: "row",
    marginBottom: 6,
    paddingLeft: 10,
  },
  factorBullet: {
    marginRight: 8,
    color: "#6366f1",
    fontFamily: "Helvetica-Bold",
  },
  factorText: {
    flex: 1,
    lineHeight: 1.4,
    fontSize: 10,
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

interface SettleVsFightProps {
  liability: LiabilityExposure;
}

export function SettleVsFight({ liability }: SettleVsFightProps) {
  const settleCost = liability.breakEvenSettlement;
  const defendCost = liability.worstCaseTotal;
  const courtCosts = liability.breakdown.estimatedCourtCosts;
  const attorneyFees = liability.breakdown.estimatedAttorneyFees;
  const timeCostEstimate = 500; // Estimated value of time spent on litigation

  const recStyle =
    liability.recommendation === "settle"
      ? styles.recBoxSettle
      : liability.recommendation === "negotiate"
        ? styles.recBoxNegotiate
        : styles.recBoxDefend;

  const recLabel =
    liability.recommendation === "settle"
      ? "Recommendation: Settle"
      : liability.recommendation === "negotiate"
        ? "Recommendation: Negotiate"
        : "Recommendation: Defend";

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Settlement Analysis: Settle vs. Defend</Text>
      <Text style={styles.subtitle}>Cost-Benefit Comparison</Text>

      <View style={styles.intro}>
        <Text>
          This analysis compares the projected costs of settling the tenant&apos;s
          claim versus defending it in court. The goal is to identify the most
          financially sound path forward based on your specific exposure.
        </Text>
      </View>

      {/* Comparison Table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cost Comparison</Text>
        <View style={styles.comparisonTable}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderLabel}>Cost Category</Text>
            <Text style={styles.tableHeaderText}>Settle</Text>
            <Text style={styles.tableHeaderText}>Defend</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Deposit Return / Settlement Payment</Text>
            <Text style={styles.tableCellSettle}>{fmt(settleCost)}</Text>
            <Text style={styles.tableCellDefend}>
              {fmt(liability.breakdown.depositReturn)}
            </Text>
          </View>
          <View style={[styles.tableRow, styles.tableRowAlt]}>
            <Text style={styles.tableLabel}>Penalty Damages (if court rules against you)</Text>
            <Text style={styles.tableCellSettle}>{fmt(0)}</Text>
            <Text style={styles.tableCellDefend}>
              {fmt(liability.breakdown.penaltyDamages)}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Court Filing Fees</Text>
            <Text style={styles.tableCellSettle}>{fmt(0)}</Text>
            <Text style={styles.tableCellDefend}>{fmt(courtCosts)}</Text>
          </View>
          <View style={[styles.tableRow, styles.tableRowAlt]}>
            <Text style={styles.tableLabel}>Attorney Fees / Legal Costs</Text>
            <Text style={styles.tableCellSettle}>{fmt(0)}</Text>
            <Text style={styles.tableCellDefend}>{fmt(attorneyFees)}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Estimated Time Cost (hearings, preparation)</Text>
            <Text style={styles.tableCellSettle}>{fmt(0)}</Text>
            <Text style={styles.tableCellDefend}>{fmt(timeCostEstimate)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Estimated Cost</Text>
            <Text style={styles.totalSettle}>{fmt(settleCost)}</Text>
            <Text style={styles.totalDefend}>
              {fmt(defendCost + timeCostEstimate)}
            </Text>
          </View>
        </View>
      </View>

      {/* Break-Even Point */}
      <View style={styles.breakEvenBox}>
        <Text style={styles.breakEvenTitle}>Break-Even Point</Text>
        <Text style={styles.breakEvenAmount}>{fmt(settleCost)}</Text>
        <Text style={styles.breakEvenDesc}>
          Any settlement at or below this amount is more cost-effective than
          defending the claim in court. This factors in the deposit amount,
          potential penalty multiplier ({liability.penaltyMultiplier}x), court
          costs, and litigation risk.
        </Text>
      </View>

      {/* Recommendation */}
      <View style={[styles.recBox, recStyle]}>
        <Text style={styles.recTitle}>{recLabel}</Text>
        <Text style={styles.recText}>
          {liability.recommendation === "settle" &&
            "Based on your risk level and exposure, settling is the most cost-effective option. The potential penalty damages and court costs significantly exceed the settlement amount. We recommend making a prompt, good-faith settlement offer to resolve this matter."}
          {liability.recommendation === "negotiate" &&
            "Your risk level suggests room for negotiation. While your position has some vulnerabilities, the exposure is moderate enough that a negotiated resolution below the full claim amount may be achievable. Approach the tenant with a reasonable counter-offer."}
          {liability.recommendation === "defend" &&
            "Your compliance position is relatively strong. While litigation always carries some risk, the cost of settlement may exceed what a court would likely award. Consider defending your position, but remain open to reasonable settlement offers that arise during the process."}
        </Text>
      </View>

      {/* Factors to Consider */}
      <View style={styles.section}>
        <Text style={styles.factorsTitle}>Factors to Consider</Text>
        <View style={styles.factorItem}>
          <Text style={styles.factorBullet}>*</Text>
          <Text style={styles.factorText}>
            Strength of your documentation (photos, inspection reports, receipts)
          </Text>
        </View>
        <View style={styles.factorItem}>
          <Text style={styles.factorBullet}>*</Text>
          <Text style={styles.factorText}>
            Whether all statutory deadlines were met for deposit return and itemization
          </Text>
        </View>
        <View style={styles.factorItem}>
          <Text style={styles.factorBullet}>*</Text>
          <Text style={styles.factorText}>
            The reasonableness and documentation of each deduction claimed
          </Text>
        </View>
        <View style={styles.factorItem}>
          <Text style={styles.factorBullet}>*</Text>
          <Text style={styles.factorText}>
            Local court tendencies — small claims judges often favor tenants in close cases
          </Text>
        </View>
        <View style={styles.factorItem}>
          <Text style={styles.factorBullet}>*</Text>
          <Text style={styles.factorText}>
            Your time and stress — litigation requires court appearances and preparation
          </Text>
        </View>
        <View style={styles.factorItem}>
          <Text style={styles.factorBullet}>*</Text>
          <Text style={styles.factorText}>
            Reputation risk — court records are public and may affect future tenants
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>
          Generated by DepositReady.co | This document does not constitute legal advice.
        </Text>
      </View>
    </Page>
  );
}
