import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { WizardData } from "@/types/dispute";
import type { StateRules } from "@/lib/state-rules";
import { analyzeDeadlines } from "@/lib/state-rules";

// Lawyer-grade styling: Times-Roman throughout, minimal colors, professional layout
const styles = StyleSheet.create({
  // Page setup - 0.9 inch margins
  page: {
    padding: 65,
    fontSize: 11,
    fontFamily: "Times-Roman",
    lineHeight: 1.4,
    color: "#1f2937",
  },

  // Typography
  title: {
    fontSize: 16,
    fontFamily: "Times-Bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 11,
    fontFamily: "Times-Italic",
    color: "#4b5563",
    textAlign: "center",
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 12,
    fontFamily: "Times-Bold",
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    paddingBottom: 5,
  },
  bold: {
    fontFamily: "Times-Bold",
  },
  italic: {
    fontFamily: "Times-Italic",
  },

  // Paragraphs
  paragraph: {
    marginBottom: 12,
    lineHeight: 1.5,
    textAlign: "left",
  },

  // Tables
  table: {
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
  },
  tableRowLast: {
    flexDirection: "row",
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
  },
  tableCellLabel: {
    width: "40%",
    padding: 8,
    fontSize: 10,
    backgroundColor: "#f9fafb",
    fontFamily: "Times-Bold",
  },
  tableCellValue: {
    width: "60%",
    padding: 8,
    fontSize: 10,
  },

  // Simple bordered box (replaces colored boxes)
  box: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 12,
    marginVertical: 15,
    backgroundColor: "#f9fafb",
  },
  boxTitle: {
    fontFamily: "Times-Bold",
    fontSize: 11,
    marginBottom: 8,
  },
  boxText: {
    fontSize: 10,
    lineHeight: 1.4,
  },

  // Lists
  list: {
    marginLeft: 15,
    marginVertical: 10,
  },
  listItem: {
    marginBottom: 6,
    fontSize: 10,
    lineHeight: 1.4,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 30,
    left: 65,
    right: 65,
    fontSize: 9,
    color: "#6b7280",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  // Cover page specific
  coverPage: {
    padding: 65,
    justifyContent: "center",
    alignItems: "center",
  },
  coverTitle: {
    fontSize: 24,
    fontFamily: "Times-Bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#1f2937",
  },
  coverSubtitle: {
    fontSize: 12,
    fontFamily: "Times-Italic",
    textAlign: "center",
    color: "#4b5563",
    marginBottom: 40,
  },
  coverProperty: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "Times-Bold",
  },
  coverInfo: {
    fontSize: 11,
    textAlign: "center",
    color: "#4b5563",
    marginBottom: 4,
  },
  coverDisclaimer: {
    position: "absolute",
    bottom: 50,
    left: 65,
    right: 65,
    fontSize: 9,
    textAlign: "center",
    color: "#6b7280",
  },
});

interface FullPacketProps {
  data: WizardData;
  stateRules: StateRules;
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

function getTenantLastName(name: string): string {
  const parts = name.trim().split(" ");
  return parts[parts.length - 1];
}

export function FullPacket({ data, stateRules, generatedDate = new Date() }: FullPacketProps) {
  const deadlines = data.moveOutDate
    ? analyzeDeadlines(new Date(data.moveOutDate), stateRules)
    : null;

  const depositAmount = data.depositAmount || 0;
  const amountReceived = data.amountReceived || 0;
  const amountOwed = depositAmount - amountReceived;
  const totalDeductions = data.deductions.reduce((sum, d) => sum + d.amount, 0);
  const tenantLastName = getTenantLastName(data.tenant.name);

  const propertyAddress = `${data.property.address}${data.property.unit ? `, ${data.property.unit}` : ""}, ${data.property.city}, ${stateRules.code} ${data.property.zip}`;
  const landlordAddress = `${data.landlord.address}, ${data.landlord.city}, ${data.landlord.state} ${data.landlord.zip}`;
  const tenantAddress = `${data.tenant.currentAddress}, ${data.tenant.city}, ${data.tenant.state} ${data.tenant.zip}`;

  // Calculate response deadline (14 days from generated date)
  const responseDeadline = new Date(generatedDate);
  responseDeadline.setDate(responseDeadline.getDate() + 14);

  return (
    <Document>
      {/* PAGE 1: CASE SUMMARY */}
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.title}>CASE SUMMARY</Text>
        <Text style={styles.subtitle}>Security Deposit Dispute</Text>

        {/* Key Facts Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Tenant</Text>
            <Text style={styles.tableCellValue}>{data.tenant.name}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Rental Property</Text>
            <Text style={styles.tableCellValue}>{propertyAddress}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Landlord</Text>
            <Text style={styles.tableCellValue}>{data.landlord.name}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Move-Out Date</Text>
            <Text style={styles.tableCellValue}>{deadlines ? formatDate(deadlines.moveOutDate) : "Not specified"}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Security Deposit Paid</Text>
            <Text style={styles.tableCellValue}>{formatCurrency(depositAmount)}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Deposit Deadline ({stateRules.code})</Text>
            <Text style={styles.tableCellValue}>{deadlines ? formatDate(deadlines.claimDeadline) : "Not calculated"}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Deductions Received</Text>
            <Text style={styles.tableCellValue}>{data.deductions.length > 0 ? `Yes (${formatCurrency(totalDeductions)})` : "None"}</Text>
          </View>
          <View style={styles.tableRowLast}>
            <Text style={styles.tableCellLabel}>Status</Text>
            <Text style={[styles.tableCellValue, { fontFamily: "Times-Bold" }]}>
              {deadlines?.landlordInViolation ? "DEADLINE MISSED" : "Within Deadlines"}
            </Text>
          </View>
        </View>

        {/* What Happened */}
        <Text style={styles.sectionHeader}>WHAT HAPPENED</Text>
        <Text style={styles.paragraph}>
          On {deadlines ? formatDate(deadlines.moveOutDate) : "[move-out date]"}, tenant surrendered the premises at {propertyAddress}.
          The unit was left in good condition, documented with photographs.
          {data.deductions.length > 0
            ? ` Landlord has claimed ${formatCurrency(totalDeductions)} in deductions. Tenant disputes any deductions not supported by the lease, evidence, or exceeding ordinary wear and tear.`
            : " No itemized deductions have been received from the landlord."
          }
        </Text>

        {/* Plain English Legal Summary */}
        <View style={styles.box}>
          <Text style={styles.boxText}>
            Under {stateRules.name} law ({stateRules.statuteTitle}), landlords must return the security deposit or send written notice of intent to impose a claim within {stateRules.claimDeadline} days.
            {deadlines?.landlordInViolation && ` That deadline passed on ${formatDate(deadlines.claimDeadline)}.`}
          </Text>
        </View>

        {/* Request */}
        <Text style={styles.sectionHeader}>REQUEST</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Tenant demands return of {formatCurrency(amountOwed)}</Text> no later than {formatDate(responseDeadline)}.
        </Text>

        <View style={styles.footer}>
          <Text>Deposit dispute file - {tenantLastName}</Text>
          <Text>Page 1</Text>
        </View>
      </Page>

      {/* PAGE 2: TIMELINE */}
      {deadlines && (
        <Page size="LETTER" style={styles.page}>
          <Text style={styles.title}>TIMELINE</Text>
          <Text style={styles.subtitle}>{stateRules.statuteTitle} Deadline Analysis</Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: "50%", fontFamily: "Times-Bold" }]}>Event</Text>
              <Text style={[styles.tableCell, { width: "30%", fontFamily: "Times-Bold" }]}>Date</Text>
              <Text style={[styles.tableCell, { width: "20%", fontFamily: "Times-Bold" }]}>Status</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: "50%" }]}>Move-Out Date</Text>
              <Text style={[styles.tableCell, { width: "30%" }]}>{formatDate(deadlines.moveOutDate)}</Text>
              <Text style={[styles.tableCell, { width: "20%" }]}>Day 0</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: "50%" }]}>{stateRules.returnDeadline}-Day Return Deadline</Text>
              <Text style={[styles.tableCell, { width: "30%" }]}>{formatDate(deadlines.returnDeadline)}</Text>
              <Text style={[styles.tableCell, { width: "20%" }]}>{deadlines.returnDeadlinePassed ? "PASSED" : `${deadlines.daysUntilReturnDeadline} days`}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { width: "50%" }]}>{stateRules.claimDeadline}-Day Claim Deadline</Text>
              <Text style={[styles.tableCell, { width: "30%" }]}>{formatDate(deadlines.claimDeadline)}</Text>
              <Text style={[styles.tableCell, { width: "20%" }]}>{deadlines.claimDeadlinePassed ? "PASSED" : `${deadlines.daysUntilClaimDeadline} days`}</Text>
            </View>
            <View style={styles.tableRowLast}>
              <Text style={[styles.tableCell, { width: "50%" }]}>Today</Text>
              <Text style={[styles.tableCell, { width: "30%" }]}>{formatDate(deadlines.today)}</Text>
              <Text style={[styles.tableCell, { width: "20%" }]}>Day {deadlines.daysSinceMoveOut}</Text>
            </View>
          </View>

          {deadlines.landlordInViolation && (
            <View style={styles.box}>
              <Text style={styles.boxTitle}>DEADLINE VIOLATION</Text>
              <Text style={styles.boxText}>
                Based on the timeline above, the landlord has failed to comply with {stateRules.statuteTitle}.
                Under {stateRules.name} law, this failure may result in the landlord forfeiting the right to impose any claim on the deposit.
              </Text>
            </View>
          )}

          <Text style={styles.sectionHeader}>{stateRules.name} Requirements</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>1. If NO deductions: Landlord must return full deposit within {stateRules.returnDeadline} days</Text>
            <Text style={styles.listItem}>2. If claiming deductions: Landlord must send {stateRules.certifiedMailRequired ? "certified mail " : ""}notice within {stateRules.claimDeadline} days</Text>
            <Text style={styles.listItem}>3. Notice must itemize each deduction with specific amounts</Text>
            <Text style={styles.listItem}>4. Failure to comply: Landlord may forfeit right to claim any deductions</Text>
            <Text style={styles.listItem}>5. Bad faith retention: Tenant may recover {stateRules.damagesDescription}</Text>
          </View>

          <View style={styles.footer}>
            <Text>Deposit dispute file - {tenantLastName}</Text>
            <Text>Page 2</Text>
          </View>
        </Page>
      )}

      {/* PAGE 3: EVIDENCE INDEX */}
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.title}>EVIDENCE INDEX</Text>
        <Text style={styles.subtitle}>Supporting Documentation</Text>

        <Text style={styles.paragraph}>
          The following exhibits support this dispute. Gather available documentation before sending the demand letter or filing in court.
        </Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: "15%", fontFamily: "Times-Bold" }]}>Exhibit</Text>
            <Text style={[styles.tableCell, { width: "45%", fontFamily: "Times-Bold" }]}>Description</Text>
            <Text style={[styles.tableCell, { width: "40%", fontFamily: "Times-Bold" }]}>Status</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: "15%" }]}>A</Text>
            <Text style={[styles.tableCell, { width: "45%" }]}>Lease Agreement</Text>
            <Text style={[styles.tableCell, { width: "40%" }]}>Shows deposit amount and terms</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: "15%" }]}>B</Text>
            <Text style={[styles.tableCell, { width: "45%" }]}>Security Deposit Receipt</Text>
            <Text style={[styles.tableCell, { width: "40%" }]}>Proof of payment</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: "15%" }]}>C</Text>
            <Text style={[styles.tableCell, { width: "45%" }]}>Move-Out Photos/Videos</Text>
            <Text style={[styles.tableCell, { width: "40%" }]}>Dated condition documentation</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: "15%" }]}>D</Text>
            <Text style={[styles.tableCell, { width: "45%" }]}>Communication Records</Text>
            <Text style={[styles.tableCell, { width: "40%" }]}>Emails, texts, letters</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: "15%" }]}>E</Text>
            <Text style={[styles.tableCell, { width: "45%" }]}>Deduction Notice from Landlord</Text>
            <Text style={[styles.tableCell, { width: "40%" }]}>{data.deductions.length > 0 ? "Received" : "Not received"}</Text>
          </View>
          <View style={styles.tableRowLast}>
            <Text style={[styles.tableCell, { width: "15%" }]}>F</Text>
            <Text style={[styles.tableCell, { width: "45%" }]}>Move-In Inspection Report</Text>
            <Text style={[styles.tableCell, { width: "40%" }]}>Original condition baseline</Text>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>DOCUMENTATION TIPS</Text>
          <Text style={styles.boxText}>
            - Make copies of everything before submitting{"\n"}
            - Photos should have visible dates/timestamps{"\n"}
            - Organize evidence chronologically{"\n"}
            - Keep originals safe; submit copies to court
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>Deposit dispute file - {tenantLastName}</Text>
          <Text>Page 3</Text>
        </View>
      </Page>

      {/* PAGE 4: DEMAND LETTER */}
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.title}>DEMAND LETTER</Text>
        <Text style={styles.subtitle}>Send via certified mail with return receipt requested</Text>

        {/* Sender Info */}
        <View style={{ marginBottom: 20 }}>
          <Text>{data.tenant.name}</Text>
          <Text>{tenantAddress}</Text>
          {data.tenant.email && <Text>{data.tenant.email}</Text>}
        </View>

        <Text style={{ marginBottom: 20 }}>{formatDate(generatedDate)}</Text>

        {/* Recipient */}
        <View style={{ marginBottom: 20 }}>
          <Text>{data.landlord.name}</Text>
          <Text>{landlordAddress}</Text>
        </View>

        <Text style={[styles.bold, { marginBottom: 20 }]}>
          Re: Security deposit return for {propertyAddress}
        </Text>

        <Text style={{ marginBottom: 15 }}>Dear {data.landlord.name},</Text>

        <Text style={styles.paragraph}>
          I am writing regarding the security deposit for {propertyAddress}, which I vacated on {deadlines ? formatDate(deadlines.moveOutDate) : "[move-out date]"}.
          The security deposit paid was {formatCurrency(depositAmount)}.
        </Text>

        <Text style={styles.paragraph}>
          This letter serves two purposes: (1) to request prompt return of the amount owed, and (2) to create a written record of the facts, timeline, and documentation supporting my position.
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>Enclosed please find a summary of facts and supporting documentation.</Text>
        </Text>

        <Text style={styles.sectionHeader}>FACTS AND DOCUMENTATION</Text>
        <Text style={styles.paragraph}>
          The unit was surrendered on {deadlines ? formatDate(deadlines.moveOutDate) : "[move-out date]"}. I documented the condition with dated photographs and a room-by-room evidence log, included in this packet.
          Any deduction must be supported by an itemized statement and documentation connecting claimed damage beyond ordinary wear and tear.
        </Text>

        {/* State-specific insert */}
        <Text style={styles.paragraph}>
          <Text style={styles.italic}>{stateRules.demandLetterInsert}</Text>
        </Text>

        {data.deductions.length > 0 && (
          <Text style={styles.paragraph}>
            I have received notice of deductions totaling {formatCurrency(totalDeductions)}. I dispute these deductions as detailed in the attached Deductions Summary.
          </Text>
        )}

        <Text style={styles.sectionHeader}>REQUEST</Text>
        <Text style={styles.paragraph}>
          Please return {formatCurrency(amountOwed)} no later than {formatDate(responseDeadline)}.
        </Text>
        <Text style={styles.paragraph}>
          If you believe any deduction is appropriate, provide a corrected itemized statement with supporting documentation.
        </Text>

        <Text style={styles.sectionHeader}>NEXT STEPS</Text>
        <Text style={styles.paragraph}>
          If I do not receive a timely response, I will proceed with the next appropriate escalation step, which may include a formal complaint or small claims filing.
        </Text>

        <View style={{ marginTop: 30 }}>
          <Text>Sincerely,</Text>
          <Text style={{ marginTop: 40 }}>{data.tenant.name}</Text>
        </View>

        <Text style={{ marginTop: 20, fontSize: 10, fontFamily: "Times-Italic" }}>
          Enclosures: Dispute file and exhibits
        </Text>

        <View style={styles.footer}>
          <Text>Deposit dispute file - {tenantLastName}</Text>
          <Text>Page 4</Text>
        </View>
      </Page>

      {/* PAGE 5: DEDUCTIONS SUMMARY */}
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.title}>DEDUCTIONS SUMMARY</Text>
        <Text style={styles.subtitle}>Line-by-Line Analysis of Claimed Deductions</Text>

        {data.deductions.length > 0 ? (
          <>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, { width: "25%", fontFamily: "Times-Bold" }]}>Deduction</Text>
                <Text style={[styles.tableCell, { width: "15%", fontFamily: "Times-Bold" }]}>Amount</Text>
                <Text style={[styles.tableCell, { width: "60%", fontFamily: "Times-Bold" }]}>Dispute Reason</Text>
              </View>
              {data.deductions.map((d, i) => (
                <View key={i} style={i === data.deductions.length - 1 ? styles.tableRowLast : styles.tableRow}>
                  <Text style={[styles.tableCell, { width: "25%" }]}>{d.description}</Text>
                  <Text style={[styles.tableCell, { width: "15%" }]}>{formatCurrency(d.amount)}</Text>
                  <Text style={[styles.tableCell, { width: "60%" }]}>{d.dispute || "Disputed"}</Text>
                </View>
              ))}
            </View>

            <View style={styles.box}>
              <Text style={styles.boxTitle}>FINANCIAL SUMMARY</Text>
              <Text style={styles.boxText}>
                Original Deposit: {formatCurrency(depositAmount)}{"\n"}
                Disputed Deductions: ({formatCurrency(totalDeductions)}){"\n"}
                {amountReceived > 0 ? `Already Received: ${formatCurrency(amountReceived)}\n` : ""}
                <Text style={styles.bold}>Amount Owed: {formatCurrency(amountOwed)}</Text>
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.box}>
            <Text style={styles.boxTitle}>NO ITEMIZED DEDUCTIONS RECEIVED</Text>
            <Text style={styles.boxText}>
              The landlord did not provide itemized deductions. Under {stateRules.statuteTitle}, if the landlord intends to impose a claim on the security deposit, they must provide written notice{stateRules.certifiedMailRequired ? " by certified mail" : ""} within {stateRules.claimDeadline} days of the tenant vacating, specifying the reason for imposing the claim.
              {"\n\n"}
              Failure to provide this notice means the landlord may forfeit any right to claim deductions from the deposit.
            </Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text>Deposit dispute file - {tenantLastName}</Text>
          <Text>Page 5</Text>
        </View>
      </Page>

      {/* PAGE 6: STATE LAW KEY POINTS */}
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.title}>{stateRules.statuteTitle}</Text>
        <Text style={styles.subtitle}>Security Deposit Law - Key Points</Text>

        <Text style={styles.sectionHeader}>Deadline Requirements</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>- Return deadline: {stateRules.returnDeadline} days after tenant vacates (if no deductions)</Text>
          <Text style={styles.listItem}>- Claim deadline: {stateRules.claimDeadline} days to send written notice of deductions</Text>
          {stateRules.certifiedMailRequired && <Text style={styles.listItem}>- Notice method: Certified mail required</Text>}
        </View>

        <Text style={styles.sectionHeader}>Itemization Requirements</Text>
        <Text style={styles.paragraph}>
          {stateRules.itemizedDeductionsRequired
            ? `${stateRules.name} requires landlords to provide an itemized statement of all deductions, including specific amounts for each item claimed.`
            : `${stateRules.name} law governs what deductions landlords may claim from security deposits.`
          }
        </Text>

        <Text style={styles.sectionHeader}>Penalty for Noncompliance</Text>
        <Text style={styles.paragraph}>
          If the landlord fails to comply with {stateRules.name} security deposit law, they may forfeit the right to impose any claim on the deposit.
          The tenant may be entitled to recover the full deposit amount.
        </Text>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>BAD FAITH DAMAGES</Text>
          <Text style={styles.boxText}>
            {stateRules.name} courts may allow tenants to recover {stateRules.damagesDescription} when landlords act in bad faith.
            Bad faith includes knowingly making false claims, refusing to return deposits without legitimate reason, or deliberately ignoring statutory requirements.
            {stateRules.additionalDamages && `\n\nAdditional remedies: ${stateRules.additionalDamages}`}
          </Text>
        </View>

        <Text style={styles.sectionHeader}>Full Statute Reference</Text>
        <Text style={styles.paragraph}>
          For the complete text of {stateRules.statuteTitle}, visit:{"\n"}
          {stateRules.statuteUrl}
        </Text>

        <View style={styles.footer}>
          <Text>Deposit dispute file - {tenantLastName}</Text>
          <Text>Page 6</Text>
        </View>
      </Page>

      {/* PAGE 7: MAILING & FOLLOW-UP PROTOCOL */}
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.title}>MAILING & FOLLOW-UP PROTOCOL</Text>
        <Text style={styles.subtitle}>Step-by-Step Instructions</Text>

        <Text style={styles.sectionHeader}>Step 1: Prepare Your Packet</Text>
        <Text style={styles.paragraph}>
          Print the demand letter and all supporting documentation. Make copies of everything for your records.
          Organize documents in exhibit order (A, B, C, etc.).
        </Text>

        <Text style={styles.sectionHeader}>Step 2: Send via Certified Mail</Text>
        <Text style={styles.paragraph}>
          Go to your local post office and send via certified mail with return receipt requested.
          This provides proof of delivery that is admissible in court. Keep the tracking number and receipt.
          {stateRules.certifiedMailRequired && ` Note: ${stateRules.name} law requires certified mail for deposit disputes.`}
        </Text>

        <Text style={styles.sectionHeader}>Step 3: Save Proof of Mailing</Text>
        <Text style={styles.paragraph}>
          Take a photo of the envelope, the certified mail receipt, and the tracking number.
          When the return receipt arrives, file it with your copies.
        </Text>

        <Text style={styles.sectionHeader}>Step 4: Wait for Response</Text>
        <Text style={styles.paragraph}>
          Allow 14 days for the landlord to respond. If you receive a partial payment, document the amount and date.
          If you receive a counteroffer, evaluate it against your documented damages.
        </Text>

        <Text style={styles.sectionHeader}>Step 5: Escalate if Necessary</Text>
        <Text style={styles.paragraph}>
          If no satisfactory response is received, you may file in small claims court.
          Your claim of {formatCurrency(amountOwed)} is {amountOwed <= stateRules.maxSmallClaims ? "within" : "may exceed"} the {stateRules.name} small claims limit of {formatCurrency(stateRules.maxSmallClaims)}.
          {stateRules.smallClaimsNote && ` ${stateRules.smallClaimsNote}`}
        </Text>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>FILING FEES ({stateRules.name.toUpperCase()})</Text>
          <Text style={styles.boxText}>
            Small claims filing fees typically range from {formatCurrency(stateRules.filingFee.min)} to {formatCurrency(stateRules.filingFee.max)}, depending on the claim amount.
            You may recover these fees if you win your case.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>Deposit dispute file - {tenantLastName}</Text>
          <Text>Page 7</Text>
        </View>
      </Page>

      {/* PAGE 8: COVER SHEET (END) */}
      <Page size="LETTER" style={styles.coverPage}>
        <Text style={styles.coverTitle}>Security Deposit{"\n"}Dispute File</Text>
        <Text style={styles.coverSubtitle}>Prepared Under {stateRules.statuteTitle}</Text>

        <Text style={styles.coverProperty}>{propertyAddress}</Text>
        <Text style={styles.coverInfo}>{data.tenant.name} vs. {data.landlord.name}</Text>
        <Text style={styles.coverInfo}>Generated: {formatDate(generatedDate)}</Text>

        <View style={[styles.table, { marginTop: 40, width: "80%" }]}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Deposit Amount</Text>
            <Text style={styles.tableCellValue}>{formatCurrency(depositAmount)}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Amount Owed</Text>
            <Text style={[styles.tableCellValue, { fontFamily: "Times-Bold" }]}>{formatCurrency(amountOwed)}</Text>
          </View>
          <View style={styles.tableRowLast}>
            <Text style={styles.tableCellLabel}>Landlord Status</Text>
            <Text style={[styles.tableCellValue, { fontFamily: "Times-Bold" }]}>
              {deadlines?.landlordInViolation ? "IN VIOLATION" : "Within Deadlines"}
            </Text>
          </View>
        </View>

        <Text style={styles.coverDisclaimer}>
          This file was prepared using DepositReady.co and does not constitute legal advice.{"\n"}
          Consult a licensed attorney for complex legal matters.
        </Text>
      </Page>
    </Document>
  );
}
