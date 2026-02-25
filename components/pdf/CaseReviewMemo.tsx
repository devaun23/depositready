import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

export interface CaseReviewMemoProps {
  name: string;
  stateCode: string;
  depositAmount: number;
  moveOutDate: string | null;
  landlordName: string | null;
  propertyAddress: string | null;
  generatedDate: Date;
  founderNotes: string | null;
  sections: {
    yourSituation: string;
    whatTheLawSays: string;
    caseAssessment: string;
    actionPlan: string;
    keyDeadlines: string;
    whenToEscalate: string;
  };
}

const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontFamily: "Times-Roman",
    fontSize: 11,
    lineHeight: 1.5,
    color: "#1a1a1a",
  },
  // Header
  headerBar: {
    borderBottomWidth: 2,
    borderBottomColor: "#000000",
    paddingBottom: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: "Times-Bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: "#555555",
  },
  // Meta info
  metaBlock: {
    backgroundColor: "#f7f7f7",
    padding: 12,
    marginBottom: 20,
    borderRadius: 2,
  },
  metaRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  metaLabel: {
    fontFamily: "Times-Bold",
    fontSize: 10,
    width: 100,
    color: "#555555",
  },
  metaValue: {
    fontSize: 10,
    flex: 1,
  },
  // Sections
  sectionHeader: {
    fontSize: 14,
    fontFamily: "Times-Bold",
    marginTop: 18,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  sectionBody: {
    fontSize: 11,
    lineHeight: 1.6,
    marginBottom: 6,
  },
  // Founder notes
  founderBlock: {
    backgroundColor: "#fffbeb",
    padding: 12,
    marginTop: 18,
    borderLeftWidth: 3,
    borderLeftColor: "#f59e0b",
    borderRadius: 2,
  },
  founderLabel: {
    fontFamily: "Times-Bold",
    fontSize: 11,
    marginBottom: 4,
    color: "#92400e",
  },
  founderText: {
    fontSize: 11,
    lineHeight: 1.5,
    color: "#78350f",
  },
  // Disclaimer
  disclaimer: {
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
  },
  disclaimerText: {
    fontSize: 8,
    color: "#999999",
    lineHeight: 1.4,
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 30,
    left: 60,
    right: 60,
    textAlign: "center",
    fontSize: 8,
    color: "#bbbbbb",
  },
});

function renderMarkdownToTextBlocks(text: string): string[] {
  // Strip markdown formatting for PDF rendering — split into paragraphs
  return text
    .replace(/#{1,3}\s+/g, "") // Remove ## headers (we handle sections separately)
    .replace(/\*\*(.*?)\*\*/g, "$1") // Bold markers removed (can't style inline in react-pdf)
    .replace(/\*(.*?)\*/g, "$1") // Italic markers removed
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);
}

export function CaseReviewMemo({
  name,
  stateCode,
  depositAmount,
  moveOutDate,
  landlordName,
  propertyAddress,
  generatedDate,
  founderNotes,
  sections,
}: CaseReviewMemoProps) {
  const dateStr = generatedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const sectionEntries: { title: string; content: string }[] = [
    { title: "1. Your Situation", content: sections.yourSituation },
    { title: "2. What the Law Says", content: sections.whatTheLawSays },
    { title: "3. Case Assessment", content: sections.caseAssessment },
    { title: "4. Action Plan", content: sections.actionPlan },
    { title: "5. Key Deadlines", content: sections.keyDeadlines },
    { title: "6. When to Escalate", content: sections.whenToEscalate },
  ];

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.headerBar}>
          <Text style={styles.title}>Case Review Memo</Text>
          <Text style={styles.subtitle}>
            Prepared for {name} — {dateStr}
          </Text>
        </View>

        {/* Case Info */}
        <View style={styles.metaBlock}>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>State:</Text>
            <Text style={styles.metaValue}>{stateCode}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Deposit:</Text>
            <Text style={styles.metaValue}>
              ${depositAmount.toLocaleString()}
            </Text>
          </View>
          {moveOutDate && (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Move-Out:</Text>
              <Text style={styles.metaValue}>{moveOutDate}</Text>
            </View>
          )}
          {landlordName && (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Landlord:</Text>
              <Text style={styles.metaValue}>{landlordName}</Text>
            </View>
          )}
          {propertyAddress && (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Property:</Text>
              <Text style={styles.metaValue}>{propertyAddress}</Text>
            </View>
          )}
        </View>

        {/* Sections */}
        {sectionEntries.map((section) => (
          <View key={section.title} wrap={false}>
            <Text style={styles.sectionHeader}>{section.title}</Text>
            {renderMarkdownToTextBlocks(section.content).map((para, i) => (
              <Text key={i} style={styles.sectionBody}>
                {para}
              </Text>
            ))}
          </View>
        ))}

        {/* Founder Notes */}
        {founderNotes && (
          <View style={styles.founderBlock} wrap={false}>
            <Text style={styles.founderLabel}>Specialist&apos;s Notes</Text>
            <Text style={styles.founderText}>{founderNotes}</Text>
          </View>
        )}

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            DISCLAIMER: This case review is for informational purposes only and
            does not constitute legal advice. DepositReady is not a law firm.
            The information provided is based on publicly available state
            statutes and the facts as described by the client. Individual results
            may vary. For legal representation, please consult a licensed
            attorney in your state.
          </Text>
          <Text style={styles.disclaimerText}>
            {"\n"}© {generatedDate.getFullYear()} DepositReady — depositready.co
          </Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          DepositReady Case Review — Confidential — Prepared for {name}
        </Text>
      </Page>
    </Document>
  );
}
