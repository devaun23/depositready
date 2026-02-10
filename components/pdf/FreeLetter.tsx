import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { StateCode } from "@/lib/state-rules";

interface FreeLetterProps {
  landlordName?: string;
  stateCode: StateCode;
  stateName: string;
  statuteTitle: string;
  depositAmount: number;
  moveOutDate: string;
  returnDeadline: string;
  deadlinePassed: boolean;
  damagesMultiplier: number;
  damagesDescription: string;
  generatedDate: Date;
}

const styles = StyleSheet.create({
  page: {
    padding: 72, // 1 inch margins
    fontFamily: "Times-Roman",
    fontSize: 12,
    lineHeight: 1.6,
  },
  certifiedMail: {
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 24,
    color: "#666666",
  },
  date: {
    marginBottom: 24,
  },
  addressBlock: {
    marginBottom: 24,
  },
  addressLine: {
    lineHeight: 1.4,
  },
  blankLine: {
    color: "#999999",
  },
  reBox: {
    borderWidth: 1,
    borderColor: "#000000",
    borderLeftWidth: 4,
    padding: 12,
    marginBottom: 24,
    backgroundColor: "#f9f9f9",
  },
  reTitle: {
    fontFamily: "Times-Bold",
    fontSize: 12,
    marginBottom: 8,
  },
  reItem: {
    fontSize: 11,
    marginBottom: 4,
  },
  bold: {
    fontFamily: "Times-Bold",
  },
  salutation: {
    marginBottom: 16,
  },
  paragraph: {
    marginBottom: 12,
    textAlign: "justify",
  },
  demandParagraph: {
    fontFamily: "Times-Bold",
    marginBottom: 12,
    textAlign: "justify",
  },
  closing: {
    marginTop: 24,
    marginBottom: 48,
  },
  signatureBlock: {
    width: 200,
  },
  signaturePlaceholder: {
    color: "#999999",
    marginBottom: 4,
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 4,
    marginBottom: 4,
  },
  footer: {
    position: "absolute",
    bottom: 48,
    left: 72,
    right: 72,
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    paddingTop: 12,
  },
  footerText: {
    fontSize: 9,
    color: "#f59e0b", // amber-500
  },
  footerNote: {
    fontSize: 9,
    color: "#666666",
    marginTop: 8,
  },
});

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(dateStr: string | Date): string {
  const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function FreeLetter({
  landlordName,
  stateName,
  statuteTitle,
  depositAmount,
  moveOutDate,
  returnDeadline,
  deadlinePassed,
  damagesMultiplier,
  damagesDescription,
  generatedDate,
}: FreeLetterProps) {
  // Calculate response deadline (14 days from today)
  const responseDeadline = new Date(generatedDate);
  responseDeadline.setDate(responseDeadline.getDate() + 14);

  const potentialDamages = depositAmount * damagesMultiplier;
  const displayLandlord = landlordName || "[Landlord Name]";

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Certified Mail Header */}
        <Text style={styles.certifiedMail}>
          SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED
        </Text>

        {/* Date */}
        <Text style={styles.date}>{formatDate(generatedDate)}</Text>

        {/* Recipient Address */}
        <View style={styles.addressBlock}>
          <Text style={styles.addressLine}>{displayLandlord}</Text>
          <Text style={[styles.addressLine, styles.blankLine]}>[Landlord Address]</Text>
          <Text style={[styles.addressLine, styles.blankLine]}>[City, State ZIP]</Text>
        </View>

        {/* RE: Box */}
        <View style={styles.reBox}>
          <Text style={styles.reTitle}>RE: FORMAL DEMAND FOR RETURN OF SECURITY DEPOSIT</Text>
          <Text style={[styles.reItem, styles.blankLine]}>Property: [Your Rental Property Address]</Text>
          <Text style={styles.reItem}>
            Deposit Amount: <Text style={styles.bold}>{formatCurrency(depositAmount)}</Text>
          </Text>
          <Text style={styles.reItem}>
            Response Deadline: <Text style={styles.bold}>{formatDate(responseDeadline)}</Text>
          </Text>
        </View>

        {/* Salutation */}
        <Text style={styles.salutation}>Dear {displayLandlord}:</Text>

        {/* Paragraph 1 */}
        <Text style={styles.paragraph}>
          I am the former tenant of the above-referenced property. This letter constitutes a formal
          demand for the return of my security deposit in accordance with{" "}
          <Text style={styles.bold}>{statuteTitle}</Text>.
        </Text>

        {/* Paragraph 2 */}
        <Text style={styles.paragraph}>
          On or about <Text style={styles.bold}>{formatDate(moveOutDate)}</Text>, I vacated
          the premises. At the commencement of my tenancy, I paid a security deposit in the amount
          of <Text style={styles.bold}>{formatCurrency(depositAmount)}</Text>. Prior to my
          departure, I left the premises in good condition, reasonable wear and tear excepted,
          and provided my forwarding address as required by law.
        </Text>

        {/* Paragraph 3: Deadline Status */}
        {deadlinePassed ? (
          <Text style={styles.paragraph}>
            Pursuant to {statuteTitle}, you were required to return my security deposit or provide
            an itemized written statement of deductions by{" "}
            <Text style={styles.bold}>{returnDeadline}</Text>. As of the date of this letter,
            I have not received either my deposit or a lawful itemization. You are therefore{" "}
            <Text style={styles.bold}>in violation of {stateName} law</Text>.
          </Text>
        ) : (
          <Text style={styles.paragraph}>
            Pursuant to {statuteTitle}, you are required to return my security deposit or provide
            an itemized written statement of deductions by{" "}
            <Text style={styles.bold}>{returnDeadline}</Text>. This letter serves as formal
            notice of my intent to pursue all available legal remedies if this deadline is not met.
          </Text>
        )}

        {/* Paragraph 4: Damages Warning */}
        <Text style={styles.paragraph}>
          Under {stateName} law, your failure to comply may result in liability for{" "}
          <Text style={styles.bold}>{damagesDescription}</Text>, meaning you could be ordered
          to pay up to <Text style={styles.bold}>{formatCurrency(potentialDamages)}</Text>,
          plus court costs and potentially attorney&apos;s fees.
        </Text>

        {/* Paragraph 5: Demand */}
        <Text style={styles.demandParagraph}>
          I hereby demand that you return my full security deposit of{" "}
          {formatCurrency(depositAmount)} within fourteen (14) days of the date of this letter.
        </Text>

        {/* Paragraph 6: Legal Action */}
        <Text style={styles.paragraph}>
          Should you fail to comply, I am prepared to file a claim in Small Claims Court without
          further notice. All correspondence should be directed to the undersigned at the address below.
        </Text>

        {/* Closing */}
        <Text style={styles.closing}>Sincerely,</Text>

        {/* Signature Block */}
        <View style={styles.signatureBlock}>
          <Text style={styles.signaturePlaceholder}>[Your Signature]</Text>
          <View style={styles.signatureLine} />
          <Text style={styles.blankLine}>[Your Name]</Text>
          <Text style={styles.blankLine}>[Your Address]</Text>
          <Text style={styles.blankLine}>[City, State ZIP]</Text>
          <Text style={styles.blankLine}>[Your Email]</Text>
        </View>

        {/* Footer Note */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Before sending: Fill in the bracketed sections with your actual information.
          </Text>
          <Text style={styles.footerNote}>
            Send via certified mail with return receipt requested for proof of delivery.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
