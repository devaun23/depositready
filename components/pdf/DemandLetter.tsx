import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { WizardData } from "@/types/dispute";
import type { StateRules, DeadlineAnalysis } from "@/lib/state-rules";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 11,
    fontFamily: "Times-Roman",
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 30,
  },
  senderInfo: {
    marginBottom: 20,
  },
  date: {
    marginBottom: 20,
  },
  recipientInfo: {
    marginBottom: 20,
  },
  subject: {
    marginBottom: 20,
    fontFamily: "Times-Bold",
  },
  salutation: {
    marginBottom: 15,
  },
  paragraph: {
    marginBottom: 12,
    textAlign: "justify",
  },
  bold: {
    fontFamily: "Times-Bold",
  },
  italic: {
    fontFamily: "Times-Italic",
  },
  list: {
    marginLeft: 20,
    marginBottom: 12,
  },
  listItem: {
    marginBottom: 4,
  },
  signature: {
    marginTop: 30,
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

interface DemandLetterProps {
  data: WizardData;
  deadlines: DeadlineAnalysis;
  generatedDate: Date;
  stateRules: StateRules;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function DemandLetter({ data, deadlines, generatedDate, stateRules }: DemandLetterProps) {
  const depositAmount = data.depositAmount || 0;
  const amountReceived = data.amountReceived || 0;
  const amountOwed = depositAmount - amountReceived;
  const totalDeductions = data.deductions.reduce((sum, d) => sum + d.amount, 0);

  const propertyAddress = `${data.property.address}${data.property.unit ? `, ${data.property.unit}` : ""}, ${data.property.city}, ${stateRules.code} ${data.property.zip}`;
  const landlordAddress = `${data.landlord.address}, ${data.landlord.city}, ${data.landlord.state} ${data.landlord.zip}`;
  const tenantAddress = `${data.tenant.currentAddress}, ${data.tenant.city}, ${data.tenant.state} ${data.tenant.zip}`;

  // Determine violation language
  let violationText = "";
  if (deadlines.violationType === "both") {
    violationText = `You have failed to either return my security deposit within ${stateRules.returnDeadline} days or provide written notice of your intent to impose a claim within ${stateRules.claimDeadline} days of my vacating the premises on ${formatDate(deadlines.moveOutDate)}. Both deadlines have now passed.`;
  } else if (deadlines.violationType === "claim") {
    violationText = `You have failed to provide written notice of your intent to impose a claim on the security deposit within ${stateRules.claimDeadline} days of my vacating the premises on ${formatDate(deadlines.moveOutDate)}.`;
  } else if (deadlines.violationType === "return") {
    violationText = `You have failed to return my security deposit within ${stateRules.returnDeadline} days of my vacating the premises on ${formatDate(deadlines.moveOutDate)}, despite making no claim for deductions.`;
  }

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Sender Info */}
        <View style={styles.senderInfo}>
          <Text>{data.tenant.name}</Text>
          <Text>{tenantAddress}</Text>
          {data.tenant.email && <Text>{data.tenant.email}</Text>}
          {data.tenant.phone && <Text>{data.tenant.phone}</Text>}
        </View>

        {/* Date */}
        <View style={styles.date}>
          <Text>{formatDate(generatedDate)}</Text>
        </View>

        {/* Recipient Info */}
        <View style={styles.recipientInfo}>
          <Text>{data.landlord.name}</Text>
          <Text>{landlordAddress}</Text>
        </View>

        {/* Subject Line */}
        <View style={styles.subject}>
          <Text>
            RE: DEMAND FOR RETURN OF SECURITY DEPOSIT - {propertyAddress}
          </Text>
        </View>

        {/* Salutation */}
        <View style={styles.salutation}>
          <Text>Dear {data.landlord.name},</Text>
        </View>

        {/* Opening Paragraph */}
        <View style={styles.paragraph}>
          <Text>
            This letter serves as formal demand for the return of my security deposit in the amount of{" "}
            <Text style={styles.bold}>{formatCurrency(depositAmount)}</Text>, which I paid at the commencement of my tenancy at the above-referenced property. I vacated the premises on{" "}
            <Text style={styles.bold}>{formatDate(deadlines.moveOutDate)}</Text>.
          </Text>
        </View>

        {/* Legal Basis */}
        <View style={styles.paragraph}>
          <Text>
            Under <Text style={styles.bold}>{stateRules.statuteTitle}</Text>, a landlord must either return the tenant's security deposit within{" "}
            <Text style={styles.bold}>{stateRules.returnDeadline} days</Text> of the tenant vacating the premises, or, if the landlord intends to impose a claim on the deposit, provide the tenant with written notice{stateRules.certifiedMailRequired ? " by certified mail" : ""} within{" "}
            <Text style={styles.bold}>{stateRules.claimDeadline} days</Text> stating the landlord's intention to impose a claim and the reason for imposing the claim.
          </Text>
        </View>

        {/* Violation Statement */}
        {deadlines.landlordInViolation && (
          <View style={styles.paragraph}>
            <Text style={styles.bold}>{violationText}</Text>
          </View>
        )}

        {/* Deductions Dispute (if applicable) */}
        {data.deductions.length > 0 && (
          <>
            <View style={styles.paragraph}>
              <Text>
                I have received notice of deductions totaling{" "}
                <Text style={styles.bold}>{formatCurrency(totalDeductions)}</Text>. I dispute these deductions for the following reasons:
              </Text>
            </View>
            <View style={styles.list}>
              {data.deductions.map((deduction, index) => (
                <View key={index} style={styles.listItem}>
                  <Text>
                    • <Text style={styles.bold}>{deduction.description}</Text> ({formatCurrency(deduction.amount)}): {deduction.dispute || "Disputed"}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* No Refund Case */}
        {data.issueType === "no_refund" && (
          <View style={styles.paragraph}>
            <Text>
              To date, I have received no portion of my security deposit, nor have I received any itemized statement of deductions as required by law.
            </Text>
          </View>
        )}

        {/* Partial Refund Case */}
        {data.issueType === "partial_refund" && amountReceived > 0 && (
          <View style={styles.paragraph}>
            <Text>
              I have received only {formatCurrency(amountReceived)} of my {formatCurrency(depositAmount)} deposit, leaving an outstanding balance of{" "}
              <Text style={styles.bold}>{formatCurrency(amountOwed)}</Text>.
            </Text>
          </View>
        )}

        {/* Legal Consequences */}
        <View style={styles.paragraph}>
          <Text>
            {stateRules.statuteTitle} provides that if a landlord fails to comply with the requirements of this section, the landlord forfeits the right to impose a claim upon the security deposit. Furthermore, if the failure to return the deposit is found to be in bad faith, I may be entitled to{" "}
            <Text style={styles.bold}>{stateRules.damagesDescription}</Text> of the deposit wrongfully withheld, plus court costs and reasonable attorney's fees.
          </Text>
        </View>

        {/* Demand */}
        <View style={styles.paragraph}>
          <Text style={styles.bold}>
            DEMAND: I hereby demand that you return my security deposit in the amount of{" "}
            {formatCurrency(amountOwed)} within fourteen (14) days of the date of this letter.
          </Text>
        </View>

        {/* Closing */}
        <View style={styles.paragraph}>
          <Text>
            If I do not receive the full amount owed within the stated timeframe, I will have no choice but to pursue all available legal remedies, including but not limited to filing a claim in small claims court. Please be advised that {stateRules.name} law allows for the recovery of court costs and attorney's fees in such actions.
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text>
            Please remit payment to the address listed above. I am available to discuss this matter at your earliest convenience.
          </Text>
        </View>

        {/* Signature */}
        <View style={styles.signature}>
          <Text>Sincerely,</Text>
          <Text style={{ marginTop: 40 }}>{data.tenant.name}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            This letter was prepared using DepositReady.co and does not constitute legal advice.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
