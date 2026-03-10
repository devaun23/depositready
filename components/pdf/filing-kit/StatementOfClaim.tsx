import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { StateRules } from "@/lib/state-rules";
import type { FilingKitData } from "@/types/filing-kit";

const styles = StyleSheet.create({
  page: { padding: 50, fontFamily: "Helvetica", fontSize: 11 },
  title: { fontSize: 16, fontFamily: "Helvetica-Bold", marginBottom: 6, textAlign: "center" },
  subtitle: { fontSize: 10, textAlign: "center", color: "#666", marginBottom: 20 },
  sectionTitle: { fontSize: 12, fontFamily: "Helvetica-Bold", marginBottom: 8, marginTop: 14 },
  paragraph: { marginBottom: 8, lineHeight: 1.6 },
  numberedPara: { flexDirection: "row", marginBottom: 8 },
  paraNum: { width: 25, fontFamily: "Helvetica-Bold" },
  paraText: { flex: 1, lineHeight: 1.6 },
  note: { fontSize: 9, color: "#666", marginTop: 20, fontStyle: "italic", borderTopWidth: 0.5, borderTopColor: "#e5e7eb", paddingTop: 8 },
});

function formatDate(dateStr: string): string {
  if (!dateStr) return "[DATE]";
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

interface StatementOfClaimProps {
  data: FilingKitData;
  stateRules: StateRules;
}

export function StatementOfClaim({ data, stateRules }: StatementOfClaimProps) {
  const deposit = data.depositAmount || 0;
  const returned = data.amountReturned || 0;
  const amountOwed = deposit - returned;

  let paraNum = 0;
  const next = () => ++paraNum;

  return (
    <Page size="LETTER" style={styles.page}>
      <Text style={styles.title}>Statement of Claim</Text>
      <Text style={styles.subtitle}>
        {data.tenantName || "[TENANT NAME]"} v. {data.landlordName || "[LANDLORD NAME]"}
      </Text>

      <Text style={styles.sectionTitle}>Parties</Text>
      <View style={styles.numberedPara}>
        <Text style={styles.paraNum}>{next()}.</Text>
        <Text style={styles.paraText}>
          Plaintiff, {data.tenantName || "[TENANT NAME]"}, resides at{" "}
          {data.tenantAddress ? `${data.tenantAddress}, ${data.tenantCity}, ${data.tenantState} ${data.tenantZip}` : "[CURRENT ADDRESS]"}.
        </Text>
      </View>
      <View style={styles.numberedPara}>
        <Text style={styles.paraNum}>{next()}.</Text>
        <Text style={styles.paraText}>
          Defendant, {data.landlordName || "[LANDLORD NAME]"}, can be served at{" "}
          {data.landlordAddress ? `${data.landlordAddress}, ${data.landlordCity}, ${data.landlordState} ${data.landlordZip}` : "[LANDLORD ADDRESS]"}.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Facts</Text>
      <View style={styles.numberedPara}>
        <Text style={styles.paraNum}>{next()}.</Text>
        <Text style={styles.paraText}>
          Plaintiff was a tenant at {data.propertyAddress ? `${data.propertyAddress}${data.propertyUnit ? `, Unit ${data.propertyUnit}` : ""}, ${data.propertyCity}, ${data.propertyState} ${data.propertyZip}` : "[RENTAL PROPERTY ADDRESS]"} (the "Property").
        </Text>
      </View>
      <View style={styles.numberedPara}>
        <Text style={styles.paraNum}>{next()}.</Text>
        <Text style={styles.paraText}>
          Plaintiff paid a security deposit of {formatCurrency(deposit)} at the beginning of the tenancy.
        </Text>
      </View>
      <View style={styles.numberedPara}>
        <Text style={styles.paraNum}>{next()}.</Text>
        <Text style={styles.paraText}>
          Plaintiff vacated the Property on or about {formatDate(data.moveOutDate)}.
        </Text>
      </View>
      <View style={styles.numberedPara}>
        <Text style={styles.paraNum}>{next()}.</Text>
        <Text style={styles.paraText}>
          Under {stateRules.statuteTitle} ({stateRules.statuteSections.returnDeadline}),
          Defendant was required to return the security deposit within {stateRules.returnDeadline} days
          of Plaintiff's move-out, or provide an itemized statement of deductions within {stateRules.claimDeadline} days.
        </Text>
      </View>
      <View style={styles.numberedPara}>
        <Text style={styles.paraNum}>{next()}.</Text>
        <Text style={styles.paraText}>
          {data.depositReturnStatus === "nothing"
            ? "Defendant has failed to return any portion of the security deposit or provide any itemized statement of deductions."
            : data.depositReturnStatus === "partial"
            ? `Defendant returned only ${formatCurrency(returned)} of the ${formatCurrency(deposit)} deposit. The itemized deductions, if provided, are disputed.`
            : "Defendant returned the deposit but the deductions claimed are disputed."}
        </Text>
      </View>

      {data.sentDemandLetter && (
        <View style={styles.numberedPara}>
          <Text style={styles.paraNum}>{next()}.</Text>
          <Text style={styles.paraText}>
            On {formatDate(data.demandLetterDate)}, Plaintiff sent a written demand
            {data.demandLetterMethod === "certified_mail" ? " via certified mail" : ""} requesting
            return of the deposit. {data.landlordResponded
              ? `Defendant responded: "${data.landlordResponseSummary}"`
              : "Defendant did not respond."}
          </Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Legal Basis</Text>
      <View style={styles.numberedPara}>
        <Text style={styles.paraNum}>{next()}.</Text>
        <Text style={styles.paraText}>
          Defendant&apos;s failure to comply with {stateRules.statuteTitle} entitles Plaintiff to
          recovery of the wrongfully withheld deposit, plus {stateRules.damagesDescription} per{" "}
          {stateRules.statuteSections.damagesProvision}, plus court costs and filing fees.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Relief Requested</Text>
      <View style={styles.numberedPara}>
        <Text style={styles.paraNum}>{next()}.</Text>
        <Text style={styles.paraText}>
          Plaintiff requests judgment against Defendant in the amount of{" "}
          {formatCurrency(amountOwed)} (deposit owed), plus statutory penalties of up to{" "}
          {formatCurrency(deposit * stateRules.damagesMultiplier)} ({stateRules.damagesDescription}),
          plus court costs and filing fees.
        </Text>
      </View>

      <Text style={styles.note}>
        This statement of claim is a template based on the facts you provided. Review it carefully
        and adjust as needed for your specific situation. This is not legal advice.
      </Text>
    </Page>
  );
}
