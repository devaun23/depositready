import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Preview PDF - shows structure with redacted content for conversion optimization
// This is a static/cached PDF with no user data

const styles = StyleSheet.create({
  // Cover Page
  coverPage: {
    padding: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  coverTitle: {
    fontSize: 32,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#1f2937",
  },
  coverSubtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#374151",
    marginBottom: 40,
    fontFamily: "Helvetica",
  },
  coverTagline: {
    fontSize: 12,
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 60,
    maxWidth: 350,
    lineHeight: 1.6,
  },
  coverStateBox: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  coverStateText: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#374151",
    textAlign: "center",
  },
  coverFeatures: {
    marginTop: 20,
    width: "70%",
  },
  coverFeatureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  coverFeatureCheck: {
    fontSize: 14,
    color: "#22c55e",
    marginRight: 10,
    fontFamily: "Helvetica-Bold",
  },
  coverFeatureText: {
    fontSize: 11,
    color: "#374151",
  },
  coverDisclaimer: {
    position: "absolute",
    bottom: 40,
    left: 50,
    right: 50,
    fontSize: 9,
    textAlign: "center",
    color: "#9ca3af",
  },
  coverDivider: {
    width: 100,
    height: 2,
    backgroundColor: "#e5e7eb",
    marginBottom: 40,
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
    color: "#1f2937",
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
    fontSize: 12,
  },
  tocLabel: {
    flex: 1,
    fontSize: 12,
  },
  tocPageNumber: {
    width: 40,
    textAlign: "right",
    color: "#9ca3af",
    fontSize: 12,
  },
  tocInfoBox: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#3b82f6",
    padding: 15,
    marginTop: 30,
    alignItems: "center",
  },
  tocInfoText: {
    color: "#1d4ed8",
    fontSize: 11,
    textAlign: "center",
  },
  bold: {
    fontFamily: "Helvetica-Bold",
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
    color: "#1f2937",
  },
  pageSubtitle: {
    fontSize: 10,
    color: "#6b7280",
  },

  // Redacted content
  redactedBlock: {
    backgroundColor: "#1f2937",
    height: 14,
    marginBottom: 8,
  },
  redactedLine: {
    backgroundColor: "#374151",
    height: 10,
    marginBottom: 6,
  },
  redactedShort: {
    backgroundColor: "#374151",
    height: 10,
    width: "40%",
    marginBottom: 6,
  },
  redactedMedium: {
    backgroundColor: "#374151",
    height: 10,
    width: "70%",
    marginBottom: 6,
  },
  paragraph: {
    marginBottom: 12,
    lineHeight: 1.5,
    color: "#374151",
  },

  // Letter format
  letterSenderBlock: {
    marginBottom: 20,
  },
  letterDateBlock: {
    marginBottom: 20,
  },
  letterRecipientBlock: {
    marginBottom: 20,
  },
  letterSubject: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 20,
    fontSize: 11,
  },
  letterSalutation: {
    marginBottom: 15,
  },

  // Info boxes
  infoBox: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#3b82f6",
    padding: 12,
    marginVertical: 15,
  },
  infoText: {
    color: "#1d4ed8",
    fontSize: 10,
    textAlign: "center",
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
  },
  tableCellRedacted: {
    padding: 8,
  },

  // Locked overlay
  lockedBox: {
    backgroundColor: "#f3f4f6",
    borderWidth: 2,
    borderColor: "#d1d5db",
    borderStyle: "dashed",
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  lockedIcon: {
    fontSize: 24,
    marginBottom: 15,
    color: "#6b7280",
  },
  lockedTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#374151",
    marginBottom: 10,
  },
  lockedText: {
    fontSize: 11,
    color: "#6b7280",
    textAlign: "center",
    maxWidth: 250,
    lineHeight: 1.5,
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

  // Quote box
  quoteBox: {
    backgroundColor: "#f9fafb",
    borderLeftWidth: 3,
    borderLeftColor: "#3b82f6",
    padding: 12,
    marginVertical: 15,
  },
  quoteText: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#4b5563",
  },

  // Section
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    backgroundColor: "#f3f4f6",
    padding: 8,
    marginBottom: 10,
    color: "#1f2937",
  },

  // List
  list: {
    marginLeft: 15,
    marginBottom: 12,
  },
  listItem: {
    marginBottom: 8,
    fontSize: 10,
    color: "#374151",
  },
});

export function PreviewPacket() {
  return (
    <Document>
      {/* PAGE 1: COVER PAGE - FULLY VISIBLE */}
      <Page size="LETTER" style={styles.coverPage}>
        <Text style={styles.coverTitle}>Security Deposit{"\n"}Demand Packet</Text>
        <Text style={styles.coverSubtitle}>Professional Dispute Documentation</Text>

        <View style={styles.coverDivider} />

        <View style={styles.coverStateBox}>
          <Text style={styles.coverStateText}>Prepared for: [Your State]</Text>
        </View>

        <Text style={styles.coverTagline}>
          A professionally structured dispute packet used by tenants to recover withheld security deposits in accordance with state law.
        </Text>

        <View style={styles.coverFeatures}>
          <View style={styles.coverFeatureRow}>
            <Text style={styles.coverFeatureCheck}>✓</Text>
            <Text style={styles.coverFeatureText}>Customized demand letter</Text>
          </View>
          <View style={styles.coverFeatureRow}>
            <Text style={styles.coverFeatureCheck}>✓</Text>
            <Text style={styles.coverFeatureText}>State-specific deadlines</Text>
          </View>
          <View style={styles.coverFeatureRow}>
            <Text style={styles.coverFeatureCheck}>✓</Text>
            <Text style={styles.coverFeatureText}>Legal timeline analysis</Text>
          </View>
          <View style={styles.coverFeatureRow}>
            <Text style={styles.coverFeatureCheck}>✓</Text>
            <Text style={styles.coverFeatureText}>Evidence documentation guide</Text>
          </View>
          <View style={styles.coverFeatureRow}>
            <Text style={styles.coverFeatureCheck}>✓</Text>
            <Text style={styles.coverFeatureText}>Small claims court instructions</Text>
          </View>
        </View>

        <Text style={styles.coverDisclaimer}>
          Generated on-demand • Prepared for tenant use • Not legal advice
        </Text>
      </Page>

      {/* PAGE 2: TABLE OF CONTENTS - PARTIAL BLUR */}
      <Page size="LETTER" style={styles.tocPage}>
        <Text style={styles.tocTitle}>Table of Contents</Text>

        {[
          { num: "1", label: "Demand Letter", desc: "Formal demand for deposit return" },
          { num: "2", label: "Legal Timeline", desc: "State deadline analysis" },
          { num: "3", label: "Deductions Summary", desc: "Line-by-line dispute table" },
          { num: "4", label: "Evidence Checklist", desc: "Documentation to gather" },
          { num: "5", label: "Small Claims Guide", desc: "Court filing instructions" },
          { num: "6", label: "State Law Reference", desc: "Full legal reference" },
        ].map((item, i) => (
          <View key={i} style={styles.tocItem}>
            <Text style={styles.tocNumber}>{item.num}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.tocLabel, styles.bold]}>{item.label}</Text>
              <Text style={[styles.tocLabel, { color: "#6b7280", fontSize: 10 }]}>{item.desc}</Text>
            </View>
            <Text style={styles.tocPageNumber}>██</Text>
          </View>
        ))}

        <View style={styles.tocInfoBox}>
          <Text style={styles.tocInfoText}>
            Your packet is fully customized after checkout with your specific details, deadlines, and state law references.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>DepositReady.co - Preview</Text>
          <Text>Page 2</Text>
        </View>
      </Page>

      {/* PAGE 3: DEMAND LETTER - HEAVILY REDACTED */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Section 1: Demand Letter</Text>
          <Text style={styles.pageSubtitle}>Send via certified mail with return receipt requested</Text>
        </View>

        {/* Sender Info - Redacted */}
        <View style={styles.letterSenderBlock}>
          <View style={[styles.redactedMedium, { marginBottom: 4 }]} />
          <View style={[styles.redactedMedium, { marginBottom: 4 }]} />
          <View style={styles.redactedShort} />
        </View>

        {/* Date - Redacted */}
        <View style={styles.letterDateBlock}>
          <View style={styles.redactedShort} />
        </View>

        {/* Recipient - Redacted */}
        <View style={styles.letterRecipientBlock}>
          <View style={[styles.redactedMedium, { marginBottom: 4 }]} />
          <View style={styles.redactedMedium} />
        </View>

        {/* Subject - Redacted */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.letterSubject}>RE: DEMAND FOR RETURN OF SECURITY DEPOSIT</Text>
          <View style={styles.redactedMedium} />
        </View>

        {/* Salutation */}
        <Text style={styles.letterSalutation}>Dear Property Management,</Text>

        {/* Opening paragraph - Visible */}
        <Text style={styles.paragraph}>
          This letter serves as formal demand for the return of my security deposit. I vacated the premises and am entitled to the return of my deposit in accordance with state law.
        </Text>

        {/* Redacted content */}
        <View style={{ marginBottom: 15 }}>
          <View style={styles.redactedLine} />
          <View style={styles.redactedLine} />
          <View style={styles.redactedLine} />
          <View style={styles.redactedMedium} />
        </View>

        <View style={{ marginBottom: 15 }}>
          <View style={styles.redactedLine} />
          <View style={styles.redactedLine} />
          <View style={styles.redactedLine} />
          <View style={styles.redactedLine} />
          <View style={styles.redactedShort} />
        </View>

        {/* Info box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            {"This letter references your state's security deposit deadlines and legal consequences for non-compliance."}
          </Text>
        </View>

        {/* More redacted content */}
        <View style={{ marginBottom: 15 }}>
          <View style={styles.redactedLine} />
          <View style={styles.redactedLine} />
          <View style={styles.redactedMedium} />
        </View>

        <View style={styles.footer}>
          <Text>DepositReady.co - Preview</Text>
          <Text>Page 3</Text>
        </View>
      </Page>

      {/* PAGE 4: EVIDENCE LOG - PARTIAL */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Section 4: Evidence Checklist</Text>
          <Text style={styles.pageSubtitle}>Documents to Strengthen Your Claim</Text>
        </View>

        <Text style={styles.paragraph}>
          Gathering strong evidence is crucial for recovering your security deposit. This checklist helps you organize documentation.
        </Text>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={{ width: "30%" }}><Text style={styles.tableHeaderText}>Document Type</Text></View>
            <View style={{ width: "25%" }}><Text style={styles.tableHeaderText}>Status</Text></View>
            <View style={{ width: "45%" }}><Text style={styles.tableHeaderText}>Notes</Text></View>
          </View>
          {[1, 2, 3, 4].map((_, i) => (
            <View key={i} style={[styles.tableRow, i % 2 === 1 ? { backgroundColor: "#f9fafb" } : {}]}>
              <View style={[styles.tableCellRedacted, { width: "30%" }]}>
                <View style={[styles.redactedMedium, { width: "80%", marginBottom: 0 }]} />
              </View>
              <View style={[styles.tableCellRedacted, { width: "25%" }]}>
                <View style={[styles.redactedShort, { width: "60%", marginBottom: 0 }]} />
              </View>
              <View style={[styles.tableCellRedacted, { width: "45%" }]}>
                <View style={[styles.redactedLine, { width: "90%", marginBottom: 0 }]} />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.quoteBox}>
          <Text style={styles.quoteText}>
            {'"Landlords respond when disputes are documented and organized. A proper paper trail is your strongest leverage."'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Evidence Categories</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>☐ Lease Agreement & Deposit Receipt</Text>
            <Text style={styles.listItem}>☐ Move-In / Move-Out Inspection Reports</Text>
            <Text style={styles.listItem}>☐ Photos & Videos (dated)</Text>
            <Text style={styles.listItem}>☐ Communication Records</Text>
            <Text style={styles.listItem}>{"☐ Landlord's Deduction Notice"}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>DepositReady.co - Preview</Text>
          <Text>Page 4</Text>
        </View>
      </Page>

      {/* PAGE 5: LEGAL REFERENCES - LOCKED */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Section 6: State Law Reference</Text>
          <Text style={styles.pageSubtitle}>Security Deposit Statute - Key Points</Text>
        </View>

        <View style={styles.lockedBox}>
          <Text style={styles.lockedIcon}>🔒</Text>
          <Text style={styles.lockedTitle}>LOCKED</Text>
          <Text style={styles.lockedText}>
            State-specific legal references unlock after checkout. Your packet will include the full statute text for your state.
          </Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <Text style={[styles.sectionTitle, { marginBottom: 15 }]}>Includes:</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• Applicable statute text for your state</Text>
            <Text style={styles.listItem}>• Return deadline requirements</Text>
            <Text style={styles.listItem}>• Claim notice requirements</Text>
            <Text style={styles.listItem}>• Itemization requirements</Text>
            <Text style={styles.listItem}>• Penalty provisions for non-compliance</Text>
            <Text style={styles.listItem}>• Bad faith damages multiplier</Text>
            <Text style={styles.listItem}>• Tenant rights summary</Text>
            <Text style={styles.listItem}>• Link to full statute online</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            {"Your state's law determines deadlines, required notices, and penalties. This section is customized based on where your rental property is located."}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>DepositReady.co - Preview</Text>
          <Text>Page 5</Text>
        </View>
      </Page>
    </Document>
  );
}
