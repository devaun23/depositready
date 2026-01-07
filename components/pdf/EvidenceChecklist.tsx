import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { WizardData } from "@/types/dispute";

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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  intro: {
    marginBottom: 25,
    lineHeight: 1.5,
    color: "#374151",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    backgroundColor: "#f3f4f6",
    padding: 8,
    marginBottom: 10,
  },
  checkItem: {
    flexDirection: "row",
    marginBottom: 8,
    paddingLeft: 10,
  },
  checkbox: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: "#6b7280",
    marginRight: 10,
    marginTop: 1,
  },
  checkboxFilled: {
    backgroundColor: "#10b981",
    borderColor: "#10b981",
  },
  checkText: {
    flex: 1,
    lineHeight: 1.4,
  },
  checkLabel: {
    fontFamily: "Helvetica-Bold",
  },
  checkDesc: {
    color: "#6b7280",
    fontSize: 10,
  },
  priorityHigh: {
    backgroundColor: "#fef2f2",
    padding: 3,
    color: "#dc2626",
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    marginLeft: 5,
  },
  priorityMed: {
    backgroundColor: "#fef9c3",
    padding: 3,
    color: "#a16207",
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    marginLeft: 5,
  },
  tipsBox: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#3b82f6",
    padding: 15,
    marginTop: 20,
  },
  tipsTitle: {
    fontFamily: "Helvetica-Bold",
    color: "#1d4ed8",
    marginBottom: 8,
  },
  tipItem: {
    fontSize: 10,
    color: "#1e40af",
    marginBottom: 4,
    lineHeight: 1.4,
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

interface EvidenceChecklistProps {
  data: WizardData;
}

export function EvidenceChecklist({ data }: EvidenceChecklistProps) {
  const hasDeductions = data.deductions.length > 0;

  // Build customized checklist based on user's situation
  const essentialDocs = [
    {
      label: "Lease Agreement",
      desc: "Your original signed lease showing deposit amount and terms",
      have: data.evidence.hasLeaseAgreement,
      priority: "high",
    },
    {
      label: "Proof of Deposit Payment",
      desc: "Canceled check, bank statement, or receipt showing you paid the deposit",
      have: false,
      priority: "high",
    },
    {
      label: "Move-In Inspection Report",
      desc: "Documentation of property condition when you moved in",
      have: data.evidence.hasMoveInChecklist,
      priority: "high",
    },
    {
      label: "Move-Out Inspection Report",
      desc: "Documentation of property condition when you moved out",
      have: data.evidence.hasMoveOutChecklist,
      priority: "high",
    },
  ];

  const photoDocs = [
    {
      label: "Move-In Photos/Videos",
      desc: "Dated photos or videos of the property when you moved in",
      have: data.evidence.hasPhotos || data.evidence.hasVideos,
      priority: "high",
    },
    {
      label: "Move-Out Photos/Videos",
      desc: "Dated photos or videos of the property when you moved out",
      have: data.evidence.hasPhotos || data.evidence.hasVideos,
      priority: "high",
    },
  ];

  const communicationDocs = [
    {
      label: "Landlord's Deduction Notice",
      desc: "Any written notice from landlord claiming deductions",
      have: hasDeductions,
      priority: hasDeductions ? "high" : "med",
    },
    {
      label: "Email/Text Communications",
      desc: "All written communication with landlord about the deposit",
      have: data.evidence.hasCorrespondence,
      priority: "med",
    },
    {
      label: "Certified Mail Records",
      desc: "Proof of any certified mail sent or received",
      have: false,
      priority: "med",
    },
  ];

  const supportingDocs = [
    {
      label: "Cleaning Receipts",
      desc: "Receipts for professional cleaning done before move-out",
      have: data.evidence.hasReceipts,
      priority: "med",
    },
    {
      label: "Repair Receipts",
      desc: "Receipts for any repairs you made during tenancy",
      have: data.evidence.hasReceipts,
      priority: "med",
    },
    {
      label: "Utility Final Bills",
      desc: "Final utility statements showing account was current",
      have: false,
      priority: "med",
    },
    {
      label: "Witness Statements",
      desc: "Written statements from anyone who saw the property condition",
      have: false,
      priority: "med",
    },
  ];

  const renderChecklist = (items: typeof essentialDocs) => (
    <>
      {items.map((item, index) => (
        <View key={index} style={styles.checkItem}>
          <View style={[styles.checkbox, item.have ? styles.checkboxFilled : {}]} />
          <View style={styles.checkText}>
            <Text>
              <Text style={styles.checkLabel}>{item.label}</Text>
              {item.priority === "high" && (
                <Text style={styles.priorityHigh}> ESSENTIAL</Text>
              )}
              {item.priority === "med" && (
                <Text style={styles.priorityMed}> HELPFUL</Text>
              )}
            </Text>
            <Text style={styles.checkDesc}>{item.desc}</Text>
          </View>
        </View>
      ))}
    </>
  );

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Title */}
        <Text style={styles.title}>Evidence Checklist</Text>
        <Text style={styles.subtitle}>
          Documents to Strengthen Your Security Deposit Claim
        </Text>

        {/* Intro */}
        <View style={styles.intro}>
          <Text>
            Gathering strong evidence is crucial for recovering your security deposit.
            This checklist is customized based on your situation. Items marked as having
            evidence are based on your wizard responses. Review each item and gather
            any additional documentation before proceeding.
          </Text>
        </View>

        {/* Essential Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Essential Documents</Text>
          {renderChecklist(essentialDocs)}
        </View>

        {/* Photo/Video Evidence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photo & Video Evidence</Text>
          {renderChecklist(photoDocs)}
        </View>

        {/* Communication Records */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Communication Records</Text>
          {renderChecklist(communicationDocs)}
        </View>

        {/* Supporting Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Supporting Documents</Text>
          {renderChecklist(supportingDocs)}
        </View>

        {/* Tips */}
        <View style={styles.tipsBox}>
          <Text style={styles.tipsTitle}>Evidence Tips</Text>
          <Text style={styles.tipItem}>
            • Make copies of everything before submitting to court or landlord
          </Text>
          <Text style={styles.tipItem}>
            • Photos should have visible dates/timestamps if possible
          </Text>
          <Text style={styles.tipItem}>
            • Organize evidence chronologically (move-in to move-out)
          </Text>
          <Text style={styles.tipItem}>
            • Keep originals safe; submit copies to court
          </Text>
          <Text style={styles.tipItem}>
            • Text messages can be printed as screenshots with visible dates
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Generated by DepositReady.co | This document does not constitute legal advice.</Text>
        </View>
      </Page>
    </Document>
  );
}
