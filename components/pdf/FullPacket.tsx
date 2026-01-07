import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { WizardData } from "@/types/dispute";
import { DeadlineAnalysis, FLORIDA_RULES, analyzeDeadlines } from "@/lib/florida-rules";

// Note: React-PDF doesn't support combining multiple Documents.
// This creates a single comprehensive document with all sections.

const styles = StyleSheet.create({
  // Cover Page
  coverPage: {
    padding: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  coverTitle: {
    fontSize: 32,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1f2937",
  },
  coverSubtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 60,
  },
  coverProperty: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Helvetica-Bold",
  },
  coverInfo: {
    fontSize: 12,
    textAlign: "center",
    color: "#374151",
    marginBottom: 5,
  },
  coverBox: {
    marginTop: 60,
    padding: 20,
    backgroundColor: "#f3f4f6",
    width: "80%",
  },
  coverBoxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  coverBoxLabel: {
    fontSize: 11,
    color: "#6b7280",
  },
  coverBoxValue: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  coverDisclaimer: {
    position: "absolute",
    bottom: 50,
    left: 50,
    right: 50,
    fontSize: 9,
    textAlign: "center",
    color: "#9ca3af",
  },

  // Table of Contents
  tocPage: {
    padding: 50,
  },
  tocTitle: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    marginBottom: 30,
    textAlign: "center",
  },
  tocItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tocNumber: {
    width: 30,
    fontFamily: "Helvetica-Bold",
    color: "#3b82f6",
  },
  tocLabel: {
    flex: 1,
    fontSize: 12,
  },
  tocPageNumber: {
    width: 40,
    textAlign: "right",
    color: "#6b7280",
  },

  // Standard page
  page: {
    padding: 50,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  pageHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 10,
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
  },
  pageSubtitle: {
    fontSize: 10,
    color: "#6b7280",
  },

  // Content styles
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
  paragraph: {
    marginBottom: 12,
    lineHeight: 1.5,
    textAlign: "justify",
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  list: {
    marginLeft: 15,
    marginBottom: 12,
  },
  listItem: {
    marginBottom: 6,
    lineHeight: 1.4,
  },

  // Tables
  table: {
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableHeader: {
    backgroundColor: "#1f2937",
  },
  tableHeaderText: {
    color: "white",
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    padding: 8,
  },
  tableCell: {
    fontSize: 9,
    padding: 8,
    lineHeight: 1.3,
  },

  // Boxes
  alertBox: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#dc2626",
    padding: 12,
    marginVertical: 10,
  },
  alertTitle: {
    fontFamily: "Helvetica-Bold",
    color: "#dc2626",
    marginBottom: 5,
  },
  alertText: {
    color: "#991b1b",
    fontSize: 10,
    lineHeight: 1.4,
  },
  infoBox: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#3b82f6",
    padding: 12,
    marginVertical: 10,
  },
  infoTitle: {
    fontFamily: "Helvetica-Bold",
    color: "#1d4ed8",
    marginBottom: 5,
  },
  infoText: {
    color: "#1e40af",
    fontSize: 10,
    lineHeight: 1.4,
  },
  successBox: {
    backgroundColor: "#f0fdf4",
    borderWidth: 1,
    borderColor: "#22c55e",
    padding: 12,
    marginVertical: 10,
  },
  successTitle: {
    fontFamily: "Helvetica-Bold",
    color: "#15803d",
    marginBottom: 5,
  },
  successText: {
    color: "#166534",
    fontSize: 10,
    lineHeight: 1.4,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    fontSize: 8,
    color: "#9ca3af",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerLeft: {
    textAlign: "left",
  },
  footerRight: {
    textAlign: "right",
  },
});

interface FullPacketProps {
  data: WizardData;
  generatedDate?: Date;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function FullPacket({ data, generatedDate = new Date() }: FullPacketProps) {
  const deadlines = data.moveOutDate
    ? analyzeDeadlines(new Date(data.moveOutDate))
    : null;

  const depositAmount = data.depositAmount || 0;
  const amountReceived = data.amountReceived || 0;
  const amountOwed = depositAmount - amountReceived;
  const totalDeductions = data.deductions.reduce((sum, d) => sum + d.amount, 0);

  const propertyAddress = `${data.property.address}${data.property.unit ? `, ${data.property.unit}` : ""}, ${data.property.city}, FL ${data.property.zip}`;
  const landlordAddress = `${data.landlord.address}, ${data.landlord.city}, ${data.landlord.state} ${data.landlord.zip}`;
  const tenantAddress = `${data.tenant.currentAddress}, ${data.tenant.city}, ${data.tenant.state} ${data.tenant.zip}`;

  return (
    <Document>
      {/* COVER PAGE */}
      <Page size="LETTER" style={styles.coverPage}>
        <Text style={styles.coverTitle}>Security Deposit{"\n"}Dispute Packet</Text>
        <Text style={styles.coverSubtitle}>Prepared Under Florida Statute 83.49</Text>

        <Text style={styles.coverProperty}>{propertyAddress}</Text>
        <Text style={styles.coverInfo}>{data.tenant.name} vs. {data.landlord.name}</Text>
        <Text style={styles.coverInfo}>Generated: {formatDate(generatedDate)}</Text>

        <View style={styles.coverBox}>
          <View style={styles.coverBoxRow}>
            <Text style={styles.coverBoxLabel}>Deposit Amount:</Text>
            <Text style={styles.coverBoxValue}>{formatCurrency(depositAmount)}</Text>
          </View>
          <View style={styles.coverBoxRow}>
            <Text style={styles.coverBoxLabel}>Amount Owed:</Text>
            <Text style={[styles.coverBoxValue, { color: "#15803d" }]}>{formatCurrency(amountOwed)}</Text>
          </View>
          {deadlines && (
            <View style={styles.coverBoxRow}>
              <Text style={styles.coverBoxLabel}>Landlord Status:</Text>
              <Text style={[styles.coverBoxValue, { color: deadlines.landlordInViolation ? "#dc2626" : "#6b7280" }]}>
                {deadlines.landlordInViolation ? "IN VIOLATION" : "Within Deadlines"}
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.coverDisclaimer}>
          This packet was prepared using DepositReady.co and does not constitute legal advice.
          Consult a licensed attorney for complex legal matters.
        </Text>
      </Page>

      {/* TABLE OF CONTENTS */}
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.tocTitle}>Table of Contents</Text>

        {[
          { num: "1", label: "Demand Letter", desc: "Formal demand for deposit return" },
          { num: "2", label: "Legal Timeline", desc: "Florida deadline analysis" },
          { num: "3", label: "Deductions Summary", desc: "Line-by-line dispute table" },
          { num: "4", label: "Evidence Checklist", desc: "Documentation to gather" },
          { num: "5", label: "Small Claims Guide", desc: "Court filing instructions" },
          { num: "6", label: "Florida Statute 83.49", desc: "Full legal reference" },
        ].map((item, i) => (
          <View key={i} style={styles.tocItem}>
            <Text style={styles.tocNumber}>{item.num}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.tocLabel, styles.bold]}>{item.label}</Text>
              <Text style={[styles.tocLabel, { color: "#6b7280", fontSize: 10 }]}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </Page>

      {/* DEMAND LETTER */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Section 1: Demand Letter</Text>
          <Text style={styles.pageSubtitle}>Send via certified mail with return receipt requested</Text>
        </View>

        {/* Sender Info */}
        <View style={{ marginBottom: 15 }}>
          <Text>{data.tenant.name}</Text>
          <Text>{tenantAddress}</Text>
          {data.tenant.email && <Text>{data.tenant.email}</Text>}
        </View>

        <Text style={{ marginBottom: 15 }}>{formatDate(generatedDate)}</Text>

        {/* Recipient */}
        <View style={{ marginBottom: 15 }}>
          <Text>{data.landlord.name}</Text>
          <Text>{landlordAddress}</Text>
        </View>

        <Text style={[styles.bold, { marginBottom: 15 }]}>
          RE: DEMAND FOR RETURN OF SECURITY DEPOSIT - {propertyAddress}
        </Text>

        <Text style={{ marginBottom: 10 }}>Dear {data.landlord.name},</Text>

        <Text style={styles.paragraph}>
          This letter serves as formal demand for the return of my security deposit in the amount of{" "}
          <Text style={styles.bold}>{formatCurrency(depositAmount)}</Text>, which I paid at the commencement of my tenancy at the above-referenced property.
          {deadlines && ` I vacated the premises on ${formatDate(deadlines.moveOutDate)}.`}
        </Text>

        <Text style={styles.paragraph}>
          Under <Text style={styles.bold}>Florida Statute {FLORIDA_RULES.statute}</Text>, a landlord must either return the tenant's security deposit within{" "}
          <Text style={styles.bold}>15 days</Text> of the tenant vacating the premises, or, if the landlord intends to impose a claim on the deposit, provide the tenant with written notice by certified mail within{" "}
          <Text style={styles.bold}>30 days</Text> stating the landlord's intention to impose a claim and the reason for imposing the claim.
        </Text>

        {deadlines?.landlordInViolation && (
          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>DEADLINE VIOLATION</Text>
            <Text style={styles.alertText}>
              {deadlines.violationType === "both" && "Both the 15-day return deadline and 30-day claim deadline have passed without proper action."}
              {deadlines.violationType === "return" && "The 15-day deadline to return the deposit (when no deductions are claimed) has passed."}
              {deadlines.violationType === "claim" && "The 30-day deadline to provide written notice of intent to claim deductions has passed."}
            </Text>
          </View>
        )}

        {data.deductions.length > 0 && (
          <Text style={styles.paragraph}>
            I have received notice of deductions totaling <Text style={styles.bold}>{formatCurrency(totalDeductions)}</Text>.
            I dispute these deductions as detailed in the attached Deductions Summary.
          </Text>
        )}

        <Text style={styles.paragraph}>
          Florida Statute {FLORIDA_RULES.statute}(3)(c) provides that if a landlord fails to comply with the requirements of this section, the landlord forfeits the right to impose a claim upon the security deposit. Furthermore, if the failure to return the deposit is found to be in bad faith, I may be entitled to{" "}
          <Text style={styles.bold}>triple the amount</Text> of the deposit wrongfully withheld, plus court costs and reasonable attorney's fees.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>DEMAND</Text>
          <Text style={styles.infoText}>
            I hereby demand that you return my security deposit in the amount of {formatCurrency(amountOwed)} within fourteen (14) days of the date of this letter.
          </Text>
        </View>

        <Text style={styles.paragraph}>
          If I do not receive the full amount owed within the stated timeframe, I will have no choice but to pursue all available legal remedies, including but not limited to filing a claim in small claims court.
        </Text>

        <View style={{ marginTop: 30 }}>
          <Text>Sincerely,</Text>
          <Text style={{ marginTop: 40 }}>{data.tenant.name}</Text>
        </View>

        <View style={styles.footer}>
          <Text>DepositReady.co - Not legal advice</Text>
          <Text>Page 3</Text>
        </View>
      </Page>

      {/* TIMELINE PAGE */}
      {deadlines && (
        <Page size="LETTER" style={styles.page}>
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>Section 2: Legal Timeline</Text>
            <Text style={styles.pageSubtitle}>Florida Statute 83.49 Deadline Analysis</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Dates</Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <View style={{ width: "40%" }}><Text style={styles.tableHeaderText}>Event</Text></View>
                <View style={{ width: "30%" }}><Text style={styles.tableHeaderText}>Date</Text></View>
                <View style={{ width: "30%" }}><Text style={styles.tableHeaderText}>Status</Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={{ width: "40%" }}><Text style={styles.tableCell}>Move-Out Date</Text></View>
                <View style={{ width: "30%" }}><Text style={styles.tableCell}>{formatDate(deadlines.moveOutDate)}</Text></View>
                <View style={{ width: "30%" }}><Text style={styles.tableCell}>Day 0</Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={{ width: "40%" }}><Text style={styles.tableCell}>15-Day Return Deadline</Text></View>
                <View style={{ width: "30%" }}><Text style={styles.tableCell}>{formatDate(deadlines.returnDeadline)}</Text></View>
                <View style={{ width: "30%" }}>
                  <Text style={[styles.tableCell, { color: deadlines.returnDeadlinePassed ? "#dc2626" : "#15803d" }]}>
                    {deadlines.returnDeadlinePassed ? "PASSED" : `${deadlines.daysUntilReturnDeadline} days left`}
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={{ width: "40%" }}><Text style={styles.tableCell}>30-Day Claim Deadline</Text></View>
                <View style={{ width: "30%" }}><Text style={styles.tableCell}>{formatDate(deadlines.claimDeadline)}</Text></View>
                <View style={{ width: "30%" }}>
                  <Text style={[styles.tableCell, { color: deadlines.claimDeadlinePassed ? "#dc2626" : "#15803d" }]}>
                    {deadlines.claimDeadlinePassed ? "PASSED" : `${deadlines.daysUntilClaimDeadline} days left`}
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={{ width: "40%" }}><Text style={styles.tableCell}>Today</Text></View>
                <View style={{ width: "30%" }}><Text style={styles.tableCell}>{formatDate(deadlines.today)}</Text></View>
                <View style={{ width: "30%" }}><Text style={styles.tableCell}>Day {deadlines.daysSinceMoveOut}</Text></View>
              </View>
            </View>
          </View>

          {deadlines.landlordInViolation && (
            <View style={styles.alertBox}>
              <Text style={styles.alertTitle}>LANDLORD IN VIOLATION</Text>
              <Text style={styles.alertText}>
                Based on the timeline above, your landlord has failed to comply with Florida Statute {FLORIDA_RULES.statute}.
                Under Florida law, this failure may result in your landlord forfeiting the right to impose any claim on your deposit.
              </Text>
            </View>
          )}

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Florida Statute 83.49 Requirements</Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>• If NO deductions: Landlord must return full deposit within 15 days</Text>
              <Text style={styles.listItem}>• If claiming deductions: Landlord must send certified mail notice within 30 days</Text>
              <Text style={styles.listItem}>• Notice must itemize each deduction with specific amounts</Text>
              <Text style={styles.listItem}>• Failure to comply: Landlord forfeits right to claim any deductions</Text>
              <Text style={styles.listItem}>• Bad faith retention: Tenant may recover triple the deposit amount</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text>DepositReady.co - Not legal advice</Text>
            <Text>Page 4</Text>
          </View>
        </Page>
      )}

      {/* DEDUCTIONS TABLE */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Section 3: Deductions Summary</Text>
          <Text style={styles.pageSubtitle}>Line-by-Line Analysis of Claimed Deductions</Text>
        </View>

        {data.deductions.length > 0 ? (
          <>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <View style={{ width: "25%" }}><Text style={styles.tableHeaderText}>Deduction</Text></View>
                <View style={{ width: "15%" }}><Text style={styles.tableHeaderText}>Amount</Text></View>
                <View style={{ width: "60%" }}><Text style={styles.tableHeaderText}>Your Dispute</Text></View>
              </View>
              {data.deductions.map((d, i) => (
                <View key={i} style={[styles.tableRow, i % 2 === 1 ? { backgroundColor: "#f9fafb" } : {}]}>
                  <View style={{ width: "25%" }}><Text style={styles.tableCell}>{d.description}</Text></View>
                  <View style={{ width: "15%" }}><Text style={[styles.tableCell, { color: "#dc2626" }]}>{formatCurrency(d.amount)}</Text></View>
                  <View style={{ width: "60%" }}><Text style={styles.tableCell}>{d.dispute || "Disputed"}</Text></View>
                </View>
              ))}
              <View style={[styles.tableRow, { backgroundColor: "#fef2f2" }]}>
                <View style={{ width: "25%" }}><Text style={[styles.tableCell, styles.bold]}>TOTAL</Text></View>
                <View style={{ width: "15%" }}><Text style={[styles.tableCell, styles.bold, { color: "#dc2626" }]}>{formatCurrency(totalDeductions)}</Text></View>
                <View style={{ width: "60%" }}><Text style={styles.tableCell}></Text></View>
              </View>
            </View>

            <View style={styles.successBox}>
              <Text style={styles.successTitle}>Financial Summary</Text>
              <Text style={styles.successText}>
                Original Deposit: {formatCurrency(depositAmount)}{"\n"}
                Disputed Deductions: ({formatCurrency(totalDeductions)}){"\n"}
                {amountReceived > 0 ? `Already Received: ${formatCurrency(amountReceived)}\n` : ""}
                <Text style={styles.bold}>Amount Owed to You: {formatCurrency(amountOwed)}</Text>
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>No Itemized Deductions Received</Text>
            <Text style={styles.infoText}>
              Your landlord did not provide itemized deductions. Under Florida Statute 83.49, if the landlord intends to impose a claim on the security deposit, they must provide written notice by certified mail within 30 days of the tenant vacating the premises, specifying the reason for imposing the claim.
              {"\n\n"}
              Failure to provide this notice means the landlord forfeits any right to claim deductions from your deposit.
            </Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text>DepositReady.co - Not legal advice</Text>
          <Text>Page 5</Text>
        </View>
      </Page>

      {/* EVIDENCE CHECKLIST */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Section 4: Evidence Checklist</Text>
          <Text style={styles.pageSubtitle}>Documents to Strengthen Your Claim</Text>
        </View>

        <Text style={styles.paragraph}>
          Gathering strong evidence is crucial for recovering your security deposit. Review this checklist and gather any documentation you have before sending your demand letter or filing in court.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Essential Documents</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>☐ Lease Agreement (showing deposit amount and terms)</Text>
            <Text style={styles.listItem}>☐ Proof of Deposit Payment (check, bank statement, receipt)</Text>
            <Text style={styles.listItem}>☐ Move-In Inspection Report</Text>
            <Text style={styles.listItem}>☐ Move-Out Inspection Report</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photo & Video Evidence</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>☐ Move-In Photos/Videos (dated)</Text>
            <Text style={styles.listItem}>☐ Move-Out Photos/Videos (dated)</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Communication Records</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>☐ Landlord's Deduction Notice (if received)</Text>
            <Text style={styles.listItem}>☐ Email/Text Communications</Text>
            <Text style={styles.listItem}>☐ Certified Mail Records</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Supporting Documents</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>☐ Cleaning Receipts</Text>
            <Text style={styles.listItem}>☐ Repair Receipts</Text>
            <Text style={styles.listItem}>☐ Utility Final Bills</Text>
            <Text style={styles.listItem}>☐ Witness Statements</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Tips</Text>
          <Text style={styles.infoText}>
            • Make copies of everything before submitting{"\n"}
            • Photos should have visible dates/timestamps{"\n"}
            • Organize evidence chronologically{"\n"}
            • Keep originals safe; submit copies to court
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>DepositReady.co - Not legal advice</Text>
          <Text>Page 6</Text>
        </View>
      </Page>

      {/* SMALL CLAIMS GUIDE */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Section 5: Small Claims Court Guide</Text>
          <Text style={styles.pageSubtitle}>Florida Filing Instructions</Text>
        </View>

        <View style={amountOwed <= FLORIDA_RULES.maxSmallClaims ? styles.successBox : styles.alertBox}>
          <Text style={amountOwed <= FLORIDA_RULES.maxSmallClaims ? styles.successTitle : styles.alertTitle}>
            {amountOwed <= FLORIDA_RULES.maxSmallClaims ? "Eligible for Small Claims" : "May Exceed Limit"}
          </Text>
          <Text style={amountOwed <= FLORIDA_RULES.maxSmallClaims ? styles.successText : styles.alertText}>
            Your claim of {formatCurrency(amountOwed)} is {amountOwed <= FLORIDA_RULES.maxSmallClaims ? "within" : "may exceed"} Florida's {formatCurrency(FLORIDA_RULES.maxSmallClaims)} small claims limit.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.bold, { marginBottom: 10 }]}>Step 1: Send Demand Letter</Text>
          <Text style={styles.paragraph}>
            Send the demand letter in this packet via certified mail. Keep the receipt. Wait 14 days for response.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.bold, { marginBottom: 10 }]}>Step 2: File Your Claim</Text>
          <Text style={styles.paragraph}>
            If no response, file a Statement of Claim (Form 7.340) at the county courthouse where the property is located. Pay the filing fee.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.bold, { marginBottom: 10 }]}>Step 3: Serve the Landlord</Text>
          <Text style={styles.paragraph}>
            Pay the service fee ($10-40). Sheriff or process server will deliver papers. Landlord has 5 days to respond.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.bold, { marginBottom: 10 }]}>Step 4: Mediation</Text>
          <Text style={styles.paragraph}>
            Florida requires mediation before trial. Bring all evidence. Many cases settle at this stage.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.bold, { marginBottom: 10 }]}>Step 5: Trial</Text>
          <Text style={styles.paragraph}>
            If mediation fails, present your case to a judge. Bring 3 copies of all evidence. Cite Florida Statute 83.49.
          </Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={{ width: "60%" }}><Text style={styles.tableHeaderText}>Filing Fees</Text></View>
            <View style={{ width: "40%" }}><Text style={styles.tableHeaderText}>Cost</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={{ width: "60%" }}><Text style={styles.tableCell}>Claims up to $500</Text></View>
            <View style={{ width: "40%" }}><Text style={styles.tableCell}>$55</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={{ width: "60%" }}><Text style={styles.tableCell}>Claims $501-$2,500</Text></View>
            <View style={{ width: "40%" }}><Text style={styles.tableCell}>$175</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={{ width: "60%" }}><Text style={styles.tableCell}>Claims $2,501-$8,000</Text></View>
            <View style={{ width: "40%" }}><Text style={styles.tableCell}>$300</Text></View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>DepositReady.co - Not legal advice</Text>
          <Text>Page 7</Text>
        </View>
      </Page>

      {/* STATUTE REFERENCE */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Section 6: Florida Statute 83.49</Text>
          <Text style={styles.pageSubtitle}>Security Deposit Law - Key Excerpts</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>83.49(3)(a) - Return of Deposit</Text>
          <Text style={[styles.paragraph, { fontStyle: "italic", fontSize: 10 }]}>
            "Upon the vacating of the premises for termination of the lease, if the landlord does not intend to impose a claim on the security deposit, the landlord shall have 15 days to return the security deposit together with interest if otherwise required, or the landlord shall have 30 days to give the tenant written notice by certified mail to the tenant's last known mailing address of his or her intention to impose a claim on the deposit and the reason for imposing the claim."
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>83.49(3)(b) - Notice Requirements</Text>
          <Text style={[styles.paragraph, { fontStyle: "italic", fontSize: 10 }]}>
            "Unless the tenant objects to the imposition of the landlord's claim or the amount thereof within 15 days after receipt of the landlord's notice of intention to impose a claim, the landlord may then deduct the amount of his or her claim and shall remit the balance of the deposit to the tenant within 30 days after the date of the notice of intention to impose a claim for damages."
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>83.49(3)(c) - Penalty for Noncompliance</Text>
          <Text style={[styles.paragraph, { fontStyle: "italic", fontSize: 10 }]}>
            "If the landlord fails to give the required notice within the 30-day period, he or she forfeits the right to impose a claim upon the security deposit and may not seek a setoff against the deposit but may file an action for damages after return of the deposit."
          </Text>
        </View>

        <View style={styles.alertBox}>
          <Text style={styles.alertTitle}>Triple Damages for Bad Faith</Text>
          <Text style={styles.alertText}>
            Florida courts have interpreted this statute to allow tenants to recover up to three times the deposit amount when landlords act in bad faith. Bad faith includes knowingly making false claims, refusing to return deposits without legitimate reason, or deliberately ignoring statutory requirements.
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Full Statute Reference</Text>
          <Text style={styles.infoText}>
            For the complete text of Florida Statute 83.49, visit:{"\n"}
            {FLORIDA_RULES.statuteUrl}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>DepositReady.co - Not legal advice</Text>
          <Text>Page 8</Text>
        </View>
      </Page>
    </Document>
  );
}
