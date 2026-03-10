import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { StateRules } from "@/lib/state-rules";
import type { FilingKitData } from "@/types/filing-kit";

const styles = StyleSheet.create({
  page: { padding: 50, fontFamily: "Helvetica", fontSize: 11 },
  title: { fontSize: 16, fontFamily: "Helvetica-Bold", marginBottom: 20, textAlign: "center" },
  sectionTitle: { fontSize: 13, fontFamily: "Helvetica-Bold", marginBottom: 8, marginTop: 16, color: "#1e3a5f" },
  speakerLabel: { fontFamily: "Helvetica-Bold", fontSize: 10, color: "#f97316", marginBottom: 2, marginTop: 10 },
  scriptText: { marginBottom: 6, lineHeight: 1.6, paddingLeft: 10 },
  tipBox: { backgroundColor: "#f0f4f8", padding: 10, borderRadius: 4, marginVertical: 8 },
  tipLabel: { fontFamily: "Helvetica-Bold", fontSize: 9, color: "#1e3a5f", marginBottom: 2 },
  tipText: { fontSize: 10, lineHeight: 1.4 },
  note: { fontSize: 9, color: "#666", marginTop: 20, fontStyle: "italic" },
});

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

interface CourtroomScriptProps {
  data: FilingKitData;
  stateRules: StateRules;
}

export function CourtroomScript({ data, stateRules }: CourtroomScriptProps) {
  const deposit = data.depositAmount || 0;

  return (
    <Page size="LETTER" style={styles.page}>
      <Text style={styles.title}>Courtroom Script</Text>

      <Text style={styles.sectionTitle}>Before the Hearing</Text>
      <Text style={styles.scriptText}>
        Arrive 15-30 minutes early. Dress professionally. Bring 3 copies of all documents
        (one for the judge, one for the defendant, one for yourself). Turn off your phone.
      </Text>

      <Text style={styles.sectionTitle}>Opening Statement</Text>
      <Text style={styles.speakerLabel}>YOU:</Text>
      <Text style={styles.scriptText}>
        &quot;Your Honor, my name is {data.tenantName || "[YOUR NAME]"}. I am the plaintiff in
        this case. I am here because my former landlord, {data.landlordName || "[LANDLORD NAME]"},
        has failed to return my security deposit of {formatCurrency(deposit)} as required by{" "}
        {stateRules.statuteTitle}.&quot;
      </Text>

      <Text style={styles.sectionTitle}>Presenting Your Case</Text>
      <Text style={styles.speakerLabel}>YOU:</Text>
      <Text style={styles.scriptText}>
        &quot;I moved out of the property at {data.propertyAddress || "[ADDRESS]"} on{" "}
        {data.moveOutDate ? new Date(data.moveOutDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "[DATE]"}.
        Under {stateRules.name} law, my landlord had {stateRules.returnDeadline} days to return my deposit
        or {stateRules.claimDeadline} days to provide an itemized list of deductions.&quot;
      </Text>

      <Text style={styles.speakerLabel}>YOU:</Text>
      <Text style={styles.scriptText}>
        {data.depositReturnStatus === "nothing"
          ? `"As of today, I have received nothing — no deposit return and no itemized statement of deductions. I have here [hold up evidence] my lease showing the deposit amount, and ${data.sentDemandLetter ? "the demand letter I sent on [DATE]" : "documentation of my attempts to resolve this"}."`
          : `"I received only ${formatCurrency(data.amountReturned || 0)} of my ${formatCurrency(deposit)} deposit. The deductions claimed by my landlord are [describe — cleaning, painting, etc.], which I believe constitute normal wear and tear."`}
      </Text>

      <View style={styles.tipBox}>
        <Text style={styles.tipLabel}>TIP</Text>
        <Text style={styles.tipText}>
          When presenting evidence, hand it to the court clerk, not directly to the judge.
          Say: &quot;Your Honor, I&apos;d like to submit [description] as evidence.&quot;
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Key Legal Points to Make</Text>
      <Text style={styles.speakerLabel}>YOU:</Text>
      <Text style={styles.scriptText}>
        &quot;Under {stateRules.statuteSections.returnDeadline}, the landlord was required to
        [return the deposit / provide itemized deductions] within {stateRules.claimDeadline} days.
        They failed to do so. Per {stateRules.statuteSections.damagesProvision}, I am entitled
        to {stateRules.damagesDescription} — up to {formatCurrency(deposit * stateRules.damagesMultiplier)}.&quot;
      </Text>

      <Text style={styles.sectionTitle}>Closing</Text>
      <Text style={styles.speakerLabel}>YOU:</Text>
      <Text style={styles.scriptText}>
        &quot;Your Honor, I am asking for judgment in the amount of {formatCurrency(deposit)} for
        the unreturned deposit, plus statutory penalties, plus my filing fees and court costs.
        Thank you.&quot;
      </Text>

      <View style={styles.tipBox}>
        <Text style={styles.tipLabel}>IF THE LANDLORD MAKES CLAIMS</Text>
        <Text style={styles.tipText}>
          Stay calm. Don&apos;t interrupt. When it&apos;s your turn to respond, stick to the facts
          and the law. &quot;Your Honor, the landlord is claiming [X], but under {stateRules.name} law,
          normal wear and tear such as [describe] cannot be deducted.&quot;
        </Text>
      </View>

      <Text style={styles.note}>
        This script is a guide. Adapt it to your specific situation and the judge&apos;s questions.
        Judges appreciate brevity and organization. This is not legal advice.
      </Text>
    </Page>
  );
}
