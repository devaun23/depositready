import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { WizardData } from "@/types/dispute";
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  intro: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: "#f0fdf4",
    borderWidth: 1,
    borderColor: "#22c55e",
    lineHeight: 1.5,
  },
  introTitle: {
    fontFamily: "Helvetica-Bold",
    color: "#15803d",
    marginBottom: 8,
  },
  introText: {
    color: "#166534",
  },
  step: {
    marginBottom: 20,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  stepNumberText: {
    color: "white",
    fontFamily: "Helvetica-Bold",
    fontSize: 14,
  },
  stepTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
  },
  stepContent: {
    marginLeft: 38,
    lineHeight: 1.5,
    color: "#374151",
  },
  bulletList: {
    marginTop: 8,
    marginLeft: 10,
  },
  bullet: {
    marginBottom: 4,
  },
  infoBox: {
    backgroundColor: "#fef3c7",
    borderWidth: 1,
    borderColor: "#f59e0b",
    padding: 12,
    marginTop: 10,
    marginLeft: 38,
  },
  infoText: {
    fontSize: 10,
    color: "#92400e",
    lineHeight: 1.4,
  },
  costTable: {
    marginTop: 20,
    marginBottom: 20,
  },
  tableTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 6,
  },
  tableHeader: {
    backgroundColor: "#f3f4f6",
  },
  tableCol1: {
    width: "60%",
    paddingRight: 10,
  },
  tableCol2: {
    width: "40%",
  },
  tableHeaderText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  tableCellText: {
    fontSize: 10,
  },
  importantBox: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#dc2626",
    padding: 15,
    marginTop: 20,
  },
  importantTitle: {
    fontFamily: "Helvetica-Bold",
    color: "#dc2626",
    marginBottom: 8,
  },
  importantText: {
    color: "#991b1b",
    lineHeight: 1.5,
    fontSize: 10,
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

interface SmallClaimsGuideProps {
  data: WizardData;
  stateRules: StateRules;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function SmallClaimsGuide({ data, stateRules }: SmallClaimsGuideProps) {
  const depositAmount = data.depositAmount || 0;
  const amountOwed = depositAmount - (data.amountReceived || 0);
  const isEligible = amountOwed <= stateRules.maxSmallClaims;
  const maxDamagesAmount = depositAmount * stateRules.damagesMultiplier;

  // Determine county from property address
  const county = data.property.city; // Would need proper county lookup in production

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Title */}
        <Text style={styles.title}>{stateRules.name} Small Claims Court Guide</Text>
        <Text style={styles.subtitle}>
          Step-by-Step Instructions for Filing Your Security Deposit Claim
        </Text>

        {/* Eligibility Check */}
        <View style={styles.intro}>
          <Text style={styles.introTitle}>
            {isEligible ? "You Qualify for Small Claims Court" : "Amount Exceeds Small Claims Limit"}
          </Text>
          <Text style={styles.introText}>
            {isEligible
              ? `Your claim of ${formatCurrency(amountOwed)} is within ${stateRules.name}'s small claims limit of ${formatCurrency(stateRules.maxSmallClaims)}. You can represent yourself without an attorney.`
              : `Your claim exceeds the ${formatCurrency(stateRules.maxSmallClaims)} small claims limit. Consider consulting an attorney or reducing your claim to fit within the limit.`
            }
            {stateRules.smallClaimsNote && `\n\nNote: ${stateRules.smallClaimsNote}`}
            {"\n\n"}
            Note: If claiming {stateRules.damagesDescription} for bad faith (up to {formatCurrency(maxDamagesAmount)}), this may exceed the small claims limit.
          </Text>
        </View>

        {/* Step 1 */}
        <View style={styles.step}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepTitle}>Send Demand Letter (Required)</Text>
          </View>
          <View style={styles.stepContent}>
            <Text>
              Before filing, you must send a demand letter giving the landlord a chance to pay.
              Use the demand letter included in this packet. Send via certified mail with return receipt.
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bullet}>• Keep the certified mail receipt</Text>
              <Text style={styles.bullet}>• Wait 14 days for response</Text>
              <Text style={styles.bullet}>• Document if letter is refused or unclaimed</Text>
            </View>
          </View>
        </View>

        {/* Step 2 */}
        <View style={styles.step}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepTitle}>File Your Claim</Text>
          </View>
          <View style={styles.stepContent}>
            <Text>
              If the landlord doesn{"'"}t pay, file a Statement of Claim at the county courthouse
              where the rental property is located ({county} County).
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bullet}>• Complete Form 7.340 (Statement of Claim)</Text>
              <Text style={styles.bullet}>• Include landlord{"'"}s full name and address</Text>
              <Text style={styles.bullet}>• State the amount claimed and why</Text>
              <Text style={styles.bullet}>• Pay the filing fee (see cost table below)</Text>
            </View>
          </View>
        </View>

        {/* Step 3 */}
        <View style={styles.step}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepTitle}>Serve the Landlord</Text>
          </View>
          <View style={styles.stepContent}>
            <Text>
              The landlord must be officially served with notice of your lawsuit.
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bullet}>• Pay service fee (usually $10-40)</Text>
              <Text style={styles.bullet}>• Sheriff or process server will deliver papers</Text>
              <Text style={styles.bullet}>• Landlord has 5 days to respond after service</Text>
            </View>
          </View>
        </View>

        {/* Step 4 */}
        <View style={styles.step}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={styles.stepTitle}>Attend Pre-Trial Mediation</Text>
          </View>
          <View style={styles.stepContent}>
            <Text>
              Florida requires mediation before trial. A neutral mediator will help you
              try to settle. Many cases resolve here.
            </Text>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                Tip: Bring all your evidence to mediation. Landlords often settle when
                they see strong documentation.
              </Text>
            </View>
          </View>
        </View>

        {/* Step 5 */}
        <View style={styles.step}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>5</Text>
            </View>
            <Text style={styles.stepTitle}>Trial (If Needed)</Text>
          </View>
          <View style={styles.stepContent}>
            <Text>
              If mediation fails, you{"'"}ll have a trial before a judge (no jury in small claims).
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bullet}>• Arrive early and dress professionally</Text>
              <Text style={styles.bullet}>• Bring 3 copies of all evidence</Text>
              <Text style={styles.bullet}>• Be prepared to explain your case in 5-10 minutes</Text>
              <Text style={styles.bullet}>• Cite {stateRules.statuteTitle} and the deadlines</Text>
            </View>
          </View>
        </View>

        {/* Cost Table */}
        <View style={styles.costTable}>
          <Text style={styles.tableTitle}>Estimated Costs</Text>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableHeaderText}>Item</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.tableHeaderText}>Estimated Cost</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCellText}>Filing Fee (up to $500 claim)</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.tableCellText}>$55</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCellText}>Filing Fee ($501-$2,500)</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.tableCellText}>$175</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCellText}>Filing Fee ($2,501-$8,000)</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.tableCellText}>$300</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCellText}>Service of Process</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.tableCellText}>$10-40</Text>
            </View>
          </View>
        </View>

        {/* Important Note */}
        <View style={styles.importantBox}>
          <Text style={styles.importantTitle}>Important: You Can Recover Costs</Text>
          <Text style={styles.importantText}>
            If you win, {stateRules.name} law allows you to recover your filing fees and court costs
            from the landlord. Keep all receipts. Additionally, under {stateRules.statuteTitle},
            you may be entitled to attorney{"'"}s fees if you choose to hire one.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Generated by DepositReady.co | This document does not constitute legal advice.</Text>
        </View>
      </Page>
    </Document>
  );
}
