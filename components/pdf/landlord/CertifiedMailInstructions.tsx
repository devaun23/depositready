import {
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  intro: {
    marginBottom: 24,
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
  step: {
    flexDirection: "row",
    marginBottom: 10,
    paddingLeft: 10,
  },
  stepNumber: {
    width: 24,
    height: 24,
    backgroundColor: "#1e3a5f",
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    paddingTop: 4,
    marginRight: 12,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.4,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 6,
    paddingLeft: 10,
  },
  bullet: {
    marginRight: 8,
    color: "#6366f1",
    fontFamily: "Helvetica-Bold",
  },
  bulletText: {
    flex: 1,
    lineHeight: 1.4,
  },
  tipBox: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#3b82f6",
    padding: 12,
    marginTop: 16,
  },
  tipTitle: {
    fontFamily: "Helvetica-Bold",
    color: "#1d4ed8",
    marginBottom: 6,
  },
  tipText: {
    fontSize: 10,
    color: "#1e40af",
    lineHeight: 1.4,
    marginBottom: 4,
  },
  importantBox: {
    backgroundColor: "#fef9c3",
    borderWidth: 1,
    borderColor: "#eab308",
    padding: 12,
    marginTop: 12,
  },
  importantTitle: {
    fontFamily: "Helvetica-Bold",
    color: "#a16207",
    marginBottom: 6,
  },
  importantText: {
    fontSize: 10,
    color: "#854d0e",
    lineHeight: 1.4,
    marginBottom: 4,
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

export function CertifiedMailInstructions() {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Certified Mail Instructions</Text>
      <Text style={styles.subtitle}>
        USPS Certified Mail with Return Receipt Requested
      </Text>

      <View style={styles.intro}>
        <Text>
          Sending your security deposit itemization and any refund via certified
          mail creates a legal record of delivery. This proof can be critical in
          court if the tenant claims they never received your notice.
        </Text>
      </View>

      {/* Steps */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Step-by-Step Process</Text>

        <View style={styles.step}>
          <Text style={styles.stepNumber}>1</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Prepare Your Documents</Text>
            <Text style={styles.stepDesc}>
              Print your itemized deduction letter, include any refund check, and
              make a complete photocopy of everything for your records before
              sealing the envelope.
            </Text>
          </View>
        </View>

        <View style={styles.step}>
          <Text style={styles.stepNumber}>2</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Visit the Post Office</Text>
            <Text style={styles.stepDesc}>
              Go to a USPS post office (not a drop box). Request &quot;Certified Mail
              with Return Receipt Requested&quot; (also called a &quot;green card&quot;).
            </Text>
          </View>
        </View>

        <View style={styles.step}>
          <Text style={styles.stepNumber}>3</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Fill Out PS Form 3800</Text>
            <Text style={styles.stepDesc}>
              The postal clerk will provide the certified mail form. Fill in: (a) the
              recipient&apos;s name and address, (b) your return address, (c) check the
              &quot;Return Receipt Requested&quot; box.
            </Text>
          </View>
        </View>

        <View style={styles.step}>
          <Text style={styles.stepNumber}>4</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Fill Out the Green Return Receipt Card</Text>
            <Text style={styles.stepDesc}>
              Complete PS Form 3811 (the green card): your address goes in the
              &quot;SENDER&quot; section, the tenant&apos;s address goes in the delivery section.
              Check &quot;Certified Mail&quot; under service type.
            </Text>
          </View>
        </View>

        <View style={styles.step}>
          <Text style={styles.stepNumber}>5</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Pay and Get Your Receipt</Text>
            <Text style={styles.stepDesc}>
              The clerk will attach the certified mail label and green card to your
              envelope. Keep the receipt with the tracking number — this is your
              proof of mailing date.
            </Text>
          </View>
        </View>

        <View style={styles.step}>
          <Text style={styles.stepNumber}>6</Text>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Track Delivery Online</Text>
            <Text style={styles.stepDesc}>
              Use the tracking number at usps.com/tracking to confirm delivery.
              The green return receipt card will be mailed back to you with the
              recipient&apos;s signature and delivery date.
            </Text>
          </View>
        </View>
      </View>

      {/* What to Include */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What to Include in the Envelope</Text>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>*</Text>
          <Text style={styles.bulletText}>
            Itemized statement of deductions (your deduction letter)
          </Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>*</Text>
          <Text style={styles.bulletText}>
            Refund check for any remaining deposit balance
          </Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>*</Text>
          <Text style={styles.bulletText}>
            Copies of receipts or invoices for deducted repairs (if available)
          </Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>*</Text>
          <Text style={styles.bulletText}>
            Copy of the move-out inspection report (if completed)
          </Text>
        </View>
      </View>

      {/* Keep Copies */}
      <View style={styles.tipBox}>
        <Text style={styles.tipTitle}>Keep Copies of Everything</Text>
        <Text style={styles.tipText}>
          Before sealing the envelope, photocopy every document you are sending.
          Keep these copies together with your certified mail receipt and, when
          it arrives, the signed green return receipt card.
        </Text>
        <Text style={styles.tipText}>
          Store these records for at least 3 years (or longer depending on your
          state&apos;s statute of limitations) in case of future disputes.
        </Text>
      </View>

      {/* Green Receipt */}
      <View style={styles.importantBox}>
        <Text style={styles.importantTitle}>
          Green Receipt Return Process
        </Text>
        <Text style={styles.importantText}>
          After the recipient signs for the mail, USPS will mail the green card
          back to your return address. This typically takes 1-2 weeks after
          delivery. The green card contains the recipient&apos;s signature and the
          date of delivery — this is your strongest proof of compliance with
          notice requirements.
        </Text>
        <Text style={styles.importantText}>
          If the letter is returned as undeliverable or unclaimed, keep the
          returned envelope sealed as evidence that you attempted delivery.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text>
          Generated by DepositReady.co | This document does not constitute legal advice.
        </Text>
      </View>
    </Page>
  );
}
