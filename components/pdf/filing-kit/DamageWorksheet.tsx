import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { StateRules } from "@/lib/state-rules";
import type { FilingKitData } from "@/types/filing-kit";

const styles = StyleSheet.create({
  page: { padding: 50, fontFamily: "Helvetica", fontSize: 11 },
  title: { fontSize: 16, fontFamily: "Helvetica-Bold", marginBottom: 20, textAlign: "center" },
  subtitle: { fontSize: 12, fontFamily: "Helvetica-Bold", marginBottom: 10, marginTop: 15 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4, borderBottomWidth: 0.5, borderBottomColor: "#e5e7eb" },
  label: { flex: 1 },
  amount: { width: 100, textAlign: "right", fontFamily: "Helvetica-Bold" },
  totalRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6, borderTopWidth: 2, borderTopColor: "#000", marginTop: 8 },
  totalLabel: { flex: 1, fontFamily: "Helvetica-Bold", fontSize: 12 },
  totalAmount: { width: 100, textAlign: "right", fontFamily: "Helvetica-Bold", fontSize: 14 },
  note: { fontSize: 9, color: "#666", marginTop: 20 },
  statuteRef: { fontSize: 9, color: "#333", marginTop: 4, fontStyle: "italic" },
});

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

interface DamageWorksheetProps {
  data: FilingKitData;
  stateRules: StateRules;
}

export function DamageWorksheet({ data, stateRules }: DamageWorksheetProps) {
  const deposit = data.depositAmount || 0;
  const returned = data.amountReturned || 0;
  const deductions = data.deductionsAmount || 0;
  const amountOwed = deposit - returned;
  const penaltyDamages = deposit * stateRules.damagesMultiplier;
  const filingFee = stateRules.filingFee.max;
  const serviceCost = 75;
  const totalClaim = amountOwed + penaltyDamages + filingFee + serviceCost;

  return (
    <Page size="LETTER" style={styles.page}>
      <Text style={styles.title}>Damage Calculation Worksheet</Text>

      <Text style={styles.subtitle}>Deposit & Return</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Security deposit paid</Text>
        <Text style={styles.amount}>{formatCurrency(deposit)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Amount returned by landlord</Text>
        <Text style={styles.amount}>({formatCurrency(returned)})</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Amount owed (deposit - returned)</Text>
        <Text style={styles.amount}>{formatCurrency(amountOwed)}</Text>
      </View>

      {deductions > 0 && (
        <>
          <Text style={styles.subtitle}>Disputed Deductions</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Landlord&apos;s claimed deductions</Text>
            <Text style={styles.amount}>{formatCurrency(deductions)}</Text>
          </View>
          {data.deductionsClaimed && (
            <Text style={{ fontSize: 9, color: "#666", marginTop: 2 }}>
              Details: {data.deductionsClaimed}
            </Text>
          )}
        </>
      )}

      <Text style={styles.subtitle}>Statutory Penalties</Text>
      <View style={styles.row}>
        <Text style={styles.label}>
          {stateRules.damagesDescription} ({stateRules.damagesMultiplier}x deposit)
        </Text>
        <Text style={styles.amount}>{formatCurrency(penaltyDamages)}</Text>
      </View>
      <Text style={styles.statuteRef}>
        Per {stateRules.statuteSections.damagesProvision}
      </Text>

      <Text style={styles.subtitle}>Court Costs</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Filing fee (estimated)</Text>
        <Text style={styles.amount}>{formatCurrency(filingFee)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Service of process (estimated)</Text>
        <Text style={styles.amount}>{formatCurrency(serviceCost)}</Text>
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>TOTAL CLAIM AMOUNT</Text>
        <Text style={styles.totalAmount}>{formatCurrency(totalClaim)}</Text>
      </View>

      {totalClaim > stateRules.maxSmallClaims && (
        <Text style={{ ...styles.note, color: "#b91c1c" }}>
          Warning: Total claim ({formatCurrency(totalClaim)}) exceeds the {stateRules.name} small claims
          limit of {formatCurrency(stateRules.maxSmallClaims)}. You may need to reduce your claim or
          file in a higher court.
        </Text>
      )}

      <Text style={styles.note}>
        This worksheet calculates the maximum potential recovery. Actual recovery depends on
        the court&apos;s findings. Penalty damages require showing that the landlord acted
        wrongfully. Not legal advice.
      </Text>
    </Page>
  );
}
