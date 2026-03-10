import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { StateRules } from "@/lib/state-rules";
import type { CourtInfo } from "@/lib/state-rules/court-info";

const styles = StyleSheet.create({
  page: { padding: 50, fontFamily: "Helvetica", fontSize: 11 },
  title: { fontSize: 16, fontFamily: "Helvetica-Bold", marginBottom: 20, textAlign: "center" },
  sectionTitle: { fontSize: 13, fontFamily: "Helvetica-Bold", marginBottom: 8, marginTop: 16, color: "#1e3a5f" },
  text: { marginBottom: 6, lineHeight: 1.5 },
  listItem: { flexDirection: "row", marginBottom: 4, paddingLeft: 10 },
  bullet: { width: 15, fontFamily: "Helvetica-Bold" },
  listText: { flex: 1, lineHeight: 1.4 },
  infoBox: { backgroundColor: "#fff7ed", padding: 12, borderRadius: 4, marginBottom: 12, borderLeftWidth: 3, borderLeftColor: "#f97316" },
  note: { fontSize: 9, color: "#666", marginTop: 20, fontStyle: "italic" },
});

interface ServiceOfProcessGuideProps {
  stateRules: StateRules;
  courtInfo: CourtInfo;
}

export function ServiceOfProcessGuide({ stateRules, courtInfo }: ServiceOfProcessGuideProps) {
  return (
    <Page size="LETTER" style={styles.page}>
      <Text style={styles.title}>
        Service of Process Guide — {stateRules.name}
      </Text>

      <View style={styles.infoBox}>
        <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 11, marginBottom: 4 }}>
          Required Method for {stateRules.name}
        </Text>
        <Text style={styles.text}>{courtInfo.serviceMethod}</Text>
      </View>

      <Text style={styles.sectionTitle}>What is Service of Process?</Text>
      <Text style={styles.text}>
        Service of process means officially delivering the court papers to the defendant
        (your landlord). The court requires proof that the landlord was notified of the
        lawsuit. Without proper service, the court cannot proceed.
      </Text>

      <Text style={styles.sectionTitle}>How to Serve in {stateRules.name}</Text>
      <Text style={styles.text}>
        {courtInfo.serviceMethod.includes("sheriff") || courtInfo.serviceMethod.includes("constable")
          ? "Personal service by a law enforcement officer or licensed process server is the most reliable method. Contact the sheriff's office in the county where the landlord can be found."
          : "Follow the court's instructions for service. The clerk may handle service by mail in some jurisdictions."}
      </Text>

      <Text style={styles.sectionTitle}>Service Checklist</Text>
      {[
        "Confirm the landlord's current address. If using a management company, serve the registered agent.",
        "Make sure you are NOT the one serving the papers — a third party must do it.",
        "Keep proof of service (return receipt, affidavit of service, or sheriff's return).",
        "File the proof of service with the court before your hearing date.",
        "If the landlord cannot be found, ask the clerk about alternative service methods.",
      ].map((step, i) => (
        <View key={i} style={styles.listItem}>
          <Text style={styles.bullet}>{i + 1}.</Text>
          <Text style={styles.listText}>{step}</Text>
        </View>
      ))}

      {stateRules.certifiedMailRequired && (
        <>
          <Text style={styles.sectionTitle}>Certified Mail Instructions</Text>
          <Text style={styles.text}>
            {stateRules.name} allows or requires service by certified mail with return
            receipt requested. Go to your local post office and:
          </Text>
          {[
            "Request a certified mail receipt (PS Form 3800) and a return receipt (PS Form 3811).",
            "Address the envelope to the landlord at their official address.",
            "Keep the certified mail receipt number — this is your tracking number.",
            "When the green card (return receipt) comes back signed, file it with the court.",
          ].map((step, i) => (
            <View key={i} style={styles.listItem}>
              <Text style={styles.bullet}>{i + 1}.</Text>
              <Text style={styles.listText}>{step}</Text>
            </View>
          ))}
        </>
      )}

      <Text style={styles.note}>
        Service requirements vary by jurisdiction. Verify current rules with the court clerk.
      </Text>
    </Page>
  );
}
