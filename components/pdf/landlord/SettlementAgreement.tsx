import {
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { LandlordIntakeData } from "@/lib/landlord/types";

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
    marginBottom: 4,
  },
  templateLabel: {
    fontSize: 10,
    textAlign: "center",
    color: "#dc2626",
    fontFamily: "Helvetica-Bold",
    marginBottom: 16,
  },
  disclaimer: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#dc2626",
    padding: 10,
    marginBottom: 20,
  },
  disclaimerText: {
    fontSize: 10,
    color: "#991b1b",
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    lineHeight: 1.4,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    marginBottom: 10,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1e3a5f",
    paddingBottom: 4,
  },
  paragraph: {
    marginBottom: 12,
    lineHeight: 1.6,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  termItem: {
    marginBottom: 10,
    paddingLeft: 10,
  },
  termNumber: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  termText: {
    lineHeight: 1.5,
    color: "#374151",
  },
  fillLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
    borderStyle: "dashed",
  },
  signatureBlock: {
    marginTop: 30,
  },
  signatureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  signatureCol: {
    width: "45%",
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
    marginBottom: 4,
    marginTop: 30,
  },
  signatureLabel: {
    fontSize: 10,
    color: "#6b7280",
  },
  notarySection: {
    borderTopWidth: 1,
    borderTopColor: "#d1d5db",
    paddingTop: 16,
    marginTop: 20,
  },
  notaryTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
    color: "#6b7280",
  },
  notaryText: {
    fontSize: 10,
    color: "#6b7280",
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

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface SettlementAgreementProps {
  data: LandlordIntakeData;
}

export function SettlementAgreement({ data }: SettlementAgreementProps) {
  const depositAmount = data.depositAmount ?? 0;

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Settlement & Release Agreement</Text>
      <Text style={styles.templateLabel}>— TEMPLATE —</Text>

      {/* Disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          IMPORTANT: This is a template only. It is not a substitute for legal
          advice. Consult a licensed attorney in your jurisdiction before signing
          any settlement agreement. Terms may need to be modified to comply with
          your state and local laws.
        </Text>
      </View>

      {/* Parties */}
      <Text style={styles.sectionTitle}>Parties</Text>
      <View style={styles.paragraph}>
        <Text>
          This Settlement and Release Agreement (&quot;Agreement&quot;) is entered into
          as of {formatDate(new Date())} by and between:
        </Text>
      </View>
      <View style={styles.paragraph}>
        <Text>
          <Text style={styles.bold}>LANDLORD: </Text>
          {data.landlordName || "[Landlord Full Name]"},{" "}
          residing at {data.landlordAddress || "[Address]"},{" "}
          {data.landlordCity || "[City]"}, {data.landlordState || "[State]"}{" "}
          {data.landlordZip || "[ZIP]"}
        </Text>
      </View>
      <View style={styles.paragraph}>
        <Text>
          <Text style={styles.bold}>TENANT: </Text>
          {data.tenantName || "[Tenant Full Name]"},{" "}
          residing at {data.tenantAddress || "[Address]"},{" "}
          {data.tenantCity || "[City]"}, {data.tenantState || "[State]"}{" "}
          {data.tenantZip || "[ZIP]"}
        </Text>
      </View>

      {/* Recitals */}
      <Text style={styles.sectionTitle}>Recitals</Text>
      <View style={styles.paragraph}>
        <Text>
          WHEREAS, the Tenant leased the property located at{" "}
          {data.propertyAddress || "[Property Address]"},{" "}
          {data.propertyCity || "[City]"}, {data.propertyState || "[State]"}{" "}
          {data.propertyZip || "[ZIP]"} (&quot;the Property&quot;);
        </Text>
      </View>
      <View style={styles.paragraph}>
        <Text>
          WHEREAS, a security deposit in the amount of{" "}
          ${depositAmount.toLocaleString()} was collected at the commencement of
          the tenancy;
        </Text>
      </View>
      <View style={styles.paragraph}>
        <Text>
          WHEREAS, a dispute has arisen regarding the disposition of the security
          deposit; and the parties wish to resolve this dispute amicably without
          further legal proceedings;
        </Text>
      </View>

      {/* Terms */}
      <Text style={styles.sectionTitle}>Terms & Conditions</Text>

      <View style={styles.termItem}>
        <Text style={styles.termNumber}>1. Settlement Amount</Text>
        <Text style={styles.termText}>
          Landlord agrees to pay Tenant the sum of $__________ (&quot;Settlement
          Amount&quot;) in full and final settlement of all claims arising from the
          security deposit for the Property.
        </Text>
      </View>

      <View style={styles.termItem}>
        <Text style={styles.termNumber}>2. Payment Timeline</Text>
        <Text style={styles.termText}>
          The Settlement Amount shall be paid within ______ calendar days of the
          execution of this Agreement, via [check / money order / bank transfer]
          to the Tenant at the address listed above.
        </Text>
      </View>

      <View style={styles.termItem}>
        <Text style={styles.termNumber}>3. Release of Claims</Text>
        <Text style={styles.termText}>
          Upon receipt of the Settlement Amount, Tenant hereby releases and forever
          discharges Landlord from any and all claims, demands, actions, or causes
          of action arising from or related to the security deposit for the
          Property, including but not limited to claims for penalty damages,
          interest, attorney fees, and court costs.
        </Text>
      </View>

      <View style={styles.termItem}>
        <Text style={styles.termNumber}>4. Mutual Release</Text>
        <Text style={styles.termText}>
          Landlord likewise releases and forever discharges Tenant from any and all
          claims related to property damage or unpaid rent for the Property, except
          as expressly excluded in writing and attached hereto.
        </Text>
      </View>

      <View style={styles.termItem}>
        <Text style={styles.termNumber}>5. Confidentiality</Text>
        <Text style={styles.termText}>
          Both parties agree to keep the terms of this Agreement confidential and
          shall not disclose the Settlement Amount or terms to any third party,
          except as required by law, tax obligations, or legal counsel.
        </Text>
      </View>

      <View style={styles.termItem}>
        <Text style={styles.termNumber}>6. No Admission of Liability</Text>
        <Text style={styles.termText}>
          This Agreement is a compromise of disputed claims. Nothing herein shall
          be construed as an admission of liability by either party.
        </Text>
      </View>

      {/* Signatures */}
      <View style={styles.signatureBlock}>
        <Text style={styles.sectionTitle}>Signatures</Text>
        <View style={styles.signatureRow}>
          <View style={styles.signatureCol}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>
              Landlord: {data.landlordName || "[Name]"}
            </Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Date</Text>
          </View>
          <View style={styles.signatureCol}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>
              Tenant: {data.tenantName || "[Name]"}
            </Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Date</Text>
          </View>
        </View>
      </View>

      {/* Notary */}
      <View style={styles.notarySection}>
        <Text style={styles.notaryTitle}>Notarization (Optional)</Text>
        <Text style={styles.notaryText}>
          State of ____________, County of ____________
        </Text>
        <Text style={styles.notaryText}>
          Subscribed and sworn before me this _____ day of ___________, 20____.
        </Text>
        <Text style={styles.notaryText}>
          Notary Public: _________________________ My Commission Expires: _________
        </Text>
      </View>

      <View style={styles.footer}>
        <Text>
          Generated by DepositReady.co | TEMPLATE ONLY — Not legal advice.
        </Text>
      </View>
    </Page>
  );
}
