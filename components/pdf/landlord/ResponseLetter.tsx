import {
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { LandlordIntakeData } from "@/lib/landlord/types";
import type { StateRules } from "@/lib/state-rules";

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
    marginBottom: 30,
  },
  dateBlock: {
    marginBottom: 20,
  },
  addressBlock: {
    marginBottom: 20,
    lineHeight: 1.5,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  paragraph: {
    marginBottom: 14,
    lineHeight: 1.6,
  },
  reBlock: {
    marginBottom: 20,
  },
  reLabel: {
    fontFamily: "Helvetica-Bold",
  },
  signatureSection: {
    marginTop: 40,
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
    width: 250,
    marginBottom: 4,
    marginTop: 30,
  },
  signatureLabel: {
    fontSize: 10,
    color: "#6b7280",
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

interface ResponseLetterProps {
  data: LandlordIntakeData;
  stateRules: StateRules;
}

export function ResponseLetter({ data, stateRules }: ResponseLetterProps) {
  const today = formatDate(new Date());
  const depositAmount = data.depositAmount ?? 0;

  const threatTypeLabel = {
    demand_letter: "demand letter",
    verbal: "verbal communication",
    email: "email correspondence",
    attorney_letter: "attorney letter",
    court_filing: "court filing",
    "": "communication",
  }[data.threatType] || "communication";

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Response to Security Deposit Demand</Text>

      {/* Date */}
      <View style={styles.dateBlock}>
        <Text>{today}</Text>
      </View>

      {/* Sent via */}
      <View style={styles.paragraph}>
        <Text style={styles.bold}>VIA CERTIFIED MAIL — RETURN RECEIPT REQUESTED</Text>
      </View>

      {/* Addressee */}
      <View style={styles.addressBlock}>
        <Text style={styles.bold}>{data.tenantName || "[Tenant Name]"}</Text>
        <Text>{data.tenantAddress || "[Tenant Address]"}</Text>
        <Text>
          {data.tenantCity || "[City]"}, {data.tenantState || "[State]"}{" "}
          {data.tenantZip || "[ZIP]"}
        </Text>
      </View>

      {/* RE line */}
      <View style={styles.reBlock}>
        <Text>
          <Text style={styles.reLabel}>RE: </Text>
          Response to Security Deposit Claim — {data.propertyAddress || "[Property Address]"},{" "}
          {data.propertyCity || "[City]"}, {data.propertyState || "[State]"}{" "}
          {data.propertyZip || "[ZIP]"}
        </Text>
      </View>

      {/* Salutation */}
      <View style={styles.paragraph}>
        <Text>Dear {data.tenantName || "[Tenant Name]"},</Text>
      </View>

      {/* Acknowledgment */}
      <View style={styles.paragraph}>
        <Text>
          I am writing in response to your {threatTypeLabel}
          {data.threatDate ? ` dated ${formatDate(new Date(data.threatDate))}` : ""}{" "}
          regarding the security deposit for the property located at{" "}
          {data.propertyAddress || "[Property Address]"},{" "}
          {data.propertyCity || "[City]"}, {data.propertyState || "[State]"}{" "}
          {data.propertyZip || "[ZIP]"}. I acknowledge receipt of your{" "}
          {threatTypeLabel} and take this matter seriously.
        </Text>
      </View>

      {/* Position */}
      <View style={styles.paragraph}>
        <Text>
          The original security deposit amount was ${depositAmount.toLocaleString()}.
          After conducting a thorough inspection of the property following your
          move-out, deductions were assessed in accordance with the terms of the
          lease agreement and applicable {stateRules.name} law. An itemized
          statement of these deductions{" "}
          {data.mode === "defense"
            ? "was provided to you as required"
            : "will be provided to you"}{" "}
          under {stateRules.statuteTitle}.
        </Text>
      </View>

      {/* Statute reference */}
      <View style={styles.paragraph}>
        <Text>
          Pursuant to {stateRules.statuteSections.returnDeadline}, landlords are
          required to return the security deposit or provide an itemized
          statement of deductions within {stateRules.returnDeadline} days of the
          tenant vacating the premises. I believe the deductions assessed are
          reasonable, documented, and in compliance with this requirement.
        </Text>
      </View>

      {/* Resolution */}
      <View style={styles.paragraph}>
        <Text>
          I am open to discussing this matter in good faith and reaching a
          mutually acceptable resolution. Should you wish to discuss the specific
          deductions, please contact me in writing at the address below. I am
          committed to resolving this matter promptly and fairly.
        </Text>
      </View>

      {/* Closing */}
      <View style={styles.paragraph}>
        <Text>
          Please direct all future correspondence regarding this matter to:
        </Text>
      </View>

      <View style={styles.addressBlock}>
        <Text>{data.landlordName || "[Landlord Name]"}</Text>
        <Text>{data.landlordAddress || "[Landlord Address]"}</Text>
        <Text>
          {data.landlordCity || "[City]"}, {data.landlordState || "[State]"}{" "}
          {data.landlordZip || "[ZIP]"}
        </Text>
        {data.landlordEmail && <Text>{data.landlordEmail}</Text>}
      </View>

      {/* Signature */}
      <View style={styles.signatureSection}>
        <Text>Respectfully,</Text>
        <View style={styles.signatureLine} />
        <Text style={styles.signatureLabel}>
          {data.landlordName || "[Landlord Name]"}
        </Text>
        <Text style={styles.signatureLabel}>Date: _______________</Text>
      </View>

      <View style={styles.footer}>
        <Text>
          Generated by DepositReady.co | This document does not constitute legal advice.
        </Text>
      </View>
    </Page>
  );
}
