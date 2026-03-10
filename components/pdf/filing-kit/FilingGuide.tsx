import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { StateRules } from "@/lib/state-rules";
import type { CourtInfo } from "@/lib/state-rules/court-info";

const styles = StyleSheet.create({
  page: { padding: 50, fontFamily: "Helvetica", fontSize: 11 },
  title: { fontSize: 16, fontFamily: "Helvetica-Bold", marginBottom: 20, textAlign: "center" },
  sectionTitle: { fontSize: 13, fontFamily: "Helvetica-Bold", marginBottom: 8, marginTop: 16, color: "#1e3a5f" },
  text: { marginBottom: 6, lineHeight: 1.5 },
  boldText: { fontFamily: "Helvetica-Bold" },
  listItem: { flexDirection: "row", marginBottom: 4, paddingLeft: 10 },
  bullet: { width: 15, fontFamily: "Helvetica-Bold" },
  listText: { flex: 1, lineHeight: 1.4 },
  infoBox: { backgroundColor: "#f0f4f8", padding: 12, borderRadius: 4, marginBottom: 12 },
  infoLabel: { fontSize: 9, color: "#666", marginBottom: 2 },
  infoValue: { fontFamily: "Helvetica-Bold", fontSize: 11 },
  note: { fontSize: 9, color: "#666", marginTop: 20, fontStyle: "italic" },
});

interface FilingGuideProps {
  stateRules: StateRules;
  courtInfo: CourtInfo;
}

export function FilingGuide({ stateRules, courtInfo }: FilingGuideProps) {
  return (
    <Page size="LETTER" style={styles.page}>
      <Text style={styles.title}>
        Small Claims Filing Guide — {stateRules.name}
      </Text>

      <Text style={styles.sectionTitle}>Where to File</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Court</Text>
        <Text style={styles.infoValue}>{stateRules.courtName}</Text>
        <Text style={{ ...styles.infoLabel, marginTop: 6 }}>Claim Form</Text>
        <Text style={styles.infoValue}>{courtInfo.claimFormName}</Text>
        <Text style={{ ...styles.infoLabel, marginTop: 6 }}>Filing Fee</Text>
        <Text style={styles.infoValue}>
          ${stateRules.filingFee.min} - ${stateRules.filingFee.max}
        </Text>
        <Text style={{ ...styles.infoLabel, marginTop: 6 }}>Small Claims Limit</Text>
        <Text style={styles.infoValue}>
          ${stateRules.maxSmallClaims.toLocaleString()}
          {stateRules.smallClaimsNote ? ` (${stateRules.smallClaimsNote})` : ""}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Step-by-Step Filing Process</Text>
      {[
        "Gather your evidence: lease, deposit receipt, demand letter (if sent), photos, communications.",
        `Obtain the claim form: "${courtInfo.claimFormName}" from the clerk's office or court website.`,
        "Fill out the form with your name, the landlord's name/address, the amount you're claiming, and a brief description.",
        `Pay the filing fee ($${stateRules.filingFee.min}-$${stateRules.filingFee.max}). ${courtInfo.feeWaiverAvailable ? courtInfo.feeWaiverNote : ""}`,
        `Serve the landlord: ${courtInfo.serviceMethod}.`,
        `Attend the hearing (typically ${courtInfo.typicalHearingTimeline}).`,
        "Bring 3 copies of all evidence to court — one for you, one for the judge, one for the other side.",
      ].map((step, i) => (
        <View key={i} style={styles.listItem}>
          <Text style={styles.bullet}>{i + 1}.</Text>
          <Text style={styles.listText}>{step}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Filing Tips for {stateRules.name}</Text>
      {courtInfo.filingTips.map((tip, i) => (
        <View key={i} style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>{tip}</Text>
        </View>
      ))}

      {courtInfo.feeWaiverAvailable && (
        <>
          <Text style={styles.sectionTitle}>Fee Waiver</Text>
          <Text style={styles.text}>{courtInfo.feeWaiverNote}</Text>
        </>
      )}

      <Text style={styles.note}>
        This guide provides general information about {stateRules.name} small claims
        court procedures. Court rules may change. Verify current procedures with the
        court clerk before filing.
      </Text>
    </Page>
  );
}
