import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { StateRules } from "@/lib/state-rules";
import type { CourtInfo } from "@/lib/state-rules/court-info";

const styles = StyleSheet.create({
  page: { padding: 50, fontFamily: "Helvetica", fontSize: 11 },
  title: { fontSize: 16, fontFamily: "Helvetica-Bold", marginBottom: 20, textAlign: "center" },
  sectionTitle: { fontSize: 13, fontFamily: "Helvetica-Bold", marginBottom: 8, marginTop: 16, color: "#1e3a5f" },
  text: { marginBottom: 6, lineHeight: 1.5 },
  listItem: { flexDirection: "row", marginBottom: 6, paddingLeft: 10 },
  bullet: { width: 15, fontFamily: "Helvetica-Bold" },
  listText: { flex: 1, lineHeight: 1.4 },
  infoBox: { backgroundColor: "#f0fdf4", padding: 12, borderRadius: 4, marginBottom: 12, borderLeftWidth: 3, borderLeftColor: "#22c55e" },
  warningBox: { backgroundColor: "#fff7ed", padding: 12, borderRadius: 4, marginBottom: 12, borderLeftWidth: 3, borderLeftColor: "#f97316" },
  note: { fontSize: 9, color: "#666", marginTop: 20, fontStyle: "italic" },
});

interface PostJudgmentGuideProps {
  stateRules: StateRules;
  courtInfo: CourtInfo;
}

export function PostJudgmentGuide({ stateRules, courtInfo }: PostJudgmentGuideProps) {
  return (
    <Page size="LETTER" style={styles.page}>
      <Text style={styles.title}>
        Post-Judgment Collection Guide — {stateRules.name}
      </Text>

      <View style={styles.infoBox}>
        <Text style={{ fontFamily: "Helvetica-Bold", marginBottom: 4 }}>
          Congratulations on your judgment!
        </Text>
        <Text style={{ fontSize: 10, lineHeight: 1.4 }}>
          A judgment means the court agrees the landlord owes you money. But a judgment
          alone doesn&apos;t mean you get paid automatically. Here&apos;s how to collect.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Step 1: Wait for Voluntary Payment</Text>
      <Text style={styles.text}>
        After the judgment, the landlord has a short window (usually 10-30 days) to pay
        voluntarily or file an appeal. Many landlords pay at this stage to avoid further
        legal action.
      </Text>

      <Text style={styles.sectionTitle}>Step 2: If They Don&apos;t Pay</Text>
      <Text style={styles.text}>
        If the landlord doesn&apos;t pay voluntarily, you have several collection tools
        available in {stateRules.name}:
      </Text>
      {courtInfo.collectionMethods.map((method, i) => (
        <View key={i} style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>{method}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>How to Start Collection</Text>
      {[
        "Return to the court clerk's office and request a Writ of Execution (the name varies by state).",
        "Provide information about the landlord's assets: bank accounts, employer, property owned.",
        "The sheriff or marshal will enforce the writ by levying bank accounts or garnishing wages.",
        "You may need to pay a small fee for the writ, which gets added to what the landlord owes.",
      ].map((step, i) => (
        <View key={i} style={styles.listItem}>
          <Text style={styles.bullet}>{i + 1}.</Text>
          <Text style={styles.listText}>{step}</Text>
        </View>
      ))}

      <View style={styles.warningBox}>
        <Text style={{ fontFamily: "Helvetica-Bold", marginBottom: 4 }}>
          Important: Judgments Have Expiration Dates
        </Text>
        <Text style={{ fontSize: 10, lineHeight: 1.4 }}>
          In most states, judgments are valid for 5-20 years and can be renewed. Don&apos;t
          wait too long to begin collection. Interest accrues on the judgment amount.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Tips for Successful Collection</Text>
      {[
        "If the landlord owns rental property, a judgment lien can attach to it — they can't sell without paying you.",
        "Property management companies often have known business bank accounts that can be levied.",
        "If you can't find assets, consider hiring a skip-tracing service or judgment recovery specialist.",
        "Keep all court documents safe — you'll need them for enforcement.",
      ].map((tip, i) => (
        <View key={i} style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>{tip}</Text>
        </View>
      ))}

      <Text style={styles.note}>
        Collection procedures vary by jurisdiction. Contact the court clerk for specific
        forms and procedures. This is general information, not legal advice.
      </Text>
    </Page>
  );
}
