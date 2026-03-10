import {
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { LandlordIntakeData } from "@/lib/landlord/types";
import type { StateRules } from "@/lib/state-rules";

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
    marginBottom: 30,
  },
  dateBlock: {
    marginBottom: 20,
  },
  addressBlock: {
    marginBottom: 20,
    lineHeight: 1.5,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  paragraph: {
    marginBottom: 14,
    lineHeight: 1.6,
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderBottomWidth: 1,
    borderBottomColor: "#1e3a5f",
    padding: 8,
  },
  tableHeaderText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    padding: 8,
    minHeight: 28,
  },
  colItem: {
    flex: 3,
  },
  colAmount: {
    flex: 1,
    textAlign: "right",
  },
  totalRow: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderTopColor: "#1e3a5f",
    padding: 8,
    backgroundColor: "#f9fafb",
  },
  totalLabel: {
    flex: 3,
    fontFamily: "Helvetica-Bold",
  },
  totalAmount: {
    flex: 1,
    textAlign: "right",
    fontFamily: "Helvetica-Bold",
  },
  calcSection: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    marginBottom: 20,
  },
  calcRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  calcLabel: {
    fontSize: 11,
  },
  calcValue: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  calcDivider: {
    borderTopWidth: 1,
    borderTopColor: "#d1d5db",
    marginVertical: 6,
  },
  signatureSection: {
    marginTop: 40,
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
    width: 250,
    marginBottom: 4,
    marginTop: 30,
  },
  signatureLabel: {
    fontSize: 10,
    color: "#6b7280",
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

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface DeductionLetterTemplateProps {
  data: LandlordIntakeData;
  stateRules: StateRules;
}

export function DeductionLetterTemplate({ data, stateRules }: DeductionLetterTemplateProps) {
  const today = formatDate(new Date());
  const depositAmount = data.depositAmount ?? 0;
  const blankRows = 5;

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Security Deposit Itemization Letter</Text>

      {/* Date */}
      <View style={styles.dateBlock}>
        <Text>{today}</Text>
      </View>

      {/* Addressee */}
      <View style={styles.addressBlock}>
        <Text style={styles.bold}>{data.tenantName || "[Tenant Name]"}</Text>
        <Text>{data.tenantAddress || "[Tenant Address]"}</Text>
        <Text>
          {data.tenantCity || "[City]"}, {data.tenantState || "[State]"}{" "}
          {data.tenantZip || "[ZIP]"}
        </Text>
      </View>

      {/* Opening */}
      <View style={styles.paragraph}>
        <Text>
          Dear {data.tenantName || "[Tenant Name]"},
        </Text>
      </View>

      <View style={styles.paragraph}>
        <Text>
          Pursuant to {stateRules.statuteTitle}, this letter serves as the
          itemized statement of deductions from the security deposit for the
          property located at {data.propertyAddress || "[Property Address]"},{" "}
          {data.propertyCity || "[City]"}, {data.propertyState || "[State]"}{" "}
          {data.propertyZip || "[ZIP]"}. The original security deposit amount was{" "}
          ${depositAmount.toLocaleString()}.
        </Text>
      </View>

      {/* Deduction Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.colItem]}>
            Deduction Item
          </Text>
          <Text style={[styles.tableHeaderText, styles.colAmount]}>Amount</Text>
        </View>
        {Array.from({ length: blankRows }).map((_, i) => (
          <View key={i} style={styles.tableRow}>
            <Text style={styles.colItem}> </Text>
            <Text style={styles.colAmount}>$</Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Deductions</Text>
          <Text style={styles.totalAmount}>$________</Text>
        </View>
      </View>

      {/* Deposit Calculation */}
      <View style={styles.calcSection}>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>Original Security Deposit</Text>
          <Text style={styles.calcValue}>
            ${depositAmount.toLocaleString()}
          </Text>
        </View>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>Less: Total Deductions</Text>
          <Text style={styles.calcValue}>- $________</Text>
        </View>
        <View style={styles.calcDivider} />
        <View style={styles.calcRow}>
          <Text style={[styles.calcLabel, styles.bold]}>Amount Returned to Tenant</Text>
          <Text style={styles.calcValue}>$________</Text>
        </View>
      </View>

      {/* Closing */}
      <View style={styles.paragraph}>
        <Text>
          {stateRules.certifiedMailRequired
            ? `As required by ${stateRules.name} law, this notice is being sent via certified mail with return receipt requested. `
            : "This notice is being sent via certified mail with return receipt requested for proof of delivery. "}
          Enclosed is a check in the amount of the balance due, if any. If you
          have questions about any deduction, please contact me in writing at the
          address above.
        </Text>
      </View>

      {/* Signature */}
      <View style={styles.signatureSection}>
        <Text>Sincerely,</Text>
        <View style={styles.signatureLine} />
        <Text style={styles.signatureLabel}>
          {data.landlordName || "[Landlord Name]"}
        </Text>
        <Text style={styles.signatureLabel}>
          {data.landlordAddress || "[Landlord Address]"}
        </Text>
        <Text style={styles.signatureLabel}>
          {data.landlordCity || "[City]"}, {data.landlordState || "[State]"}{" "}
          {data.landlordZip || "[ZIP]"}
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
