import { Document, Text, View } from "@react-pdf/renderer";
import { WizardData } from "@/types/dispute";
import type { StateRules, DeadlineAnalysis } from "@/lib/state-rules";
import {
  PleadingPage,
  CaseCaption,
  NumberedParagraph,
  SubParagraph,
  CheckboxItem,
  SignatureBlock,
  pleadingStyles,
} from "./shared";

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

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function DemandLetter({
  data,
  deadlines,
  generatedDate,
  stateRules,
}: DemandLetterProps) {
  const depositAmount = data.depositAmount || 0;
  const amountReceived = data.amountReceived || 0;
  const amountOwed = depositAmount - amountReceived;
  const totalDeductions = data.deductions.reduce((sum, d) => sum + d.amount, 0);
  const responseDeadline = addDays(generatedDate, 14);

  // Calculate potential damages
  const multiplierDamages = depositAmount * stateRules.damagesMultiplier;

  // Build full addresses
  const propertyAddress = `${data.property.address}${data.property.unit ? `, ${data.property.unit}` : ""}, ${data.property.city}, ${stateRules.code} ${data.property.zip}`;
  const landlordFullAddress = `${data.landlord.address}, ${data.landlord.city}, ${data.landlord.state} ${data.landlord.zip}`;
  const tenantFullAddress = `${data.tenant.currentAddress}, ${data.tenant.city}, ${data.tenant.state} ${data.tenant.zip}`;

  // Determine violations
  const noReturn = data.issueType === "no_refund";
  const noNotice =
    deadlines.claimDeadlinePassed &&
    (data.issueType === "no_refund" || !data.wasItemized);
  const returnDeadlinePassed = deadlines.returnDeadlinePassed;
  const claimDeadlinePassed = deadlines.claimDeadlinePassed;

  // Paragraph counter
  let paragraphNum = 0;
  const nextParagraph = () => ++paragraphNum;

  return (
    <Document>
      {/* Page 1: Header, Caption, and Opening */}
      <PleadingPage pageNumber={1} showLineNumbers={true}>
        {/* Certified Mail Header */}
        <Text style={pleadingStyles.certifiedMailHeader}>
          SENT VIA {stateRules.certifiedMailRequired ? "CERTIFIED MAIL, RETURN RECEIPT REQUESTED" : "FIRST CLASS MAIL"}
        </Text>

        {/* Date */}
        <Text style={pleadingStyles.dateLine}>{formatDate(generatedDate)}</Text>

        {/* Recipient Address Block */}
        <View style={pleadingStyles.addressBlock}>
          <Text style={pleadingStyles.addressLine}>{data.landlord.name}</Text>
          <Text style={pleadingStyles.addressLine}>{data.landlord.address}</Text>
          <Text style={pleadingStyles.addressLine}>
            {data.landlord.city}, {data.landlord.state} {data.landlord.zip}
          </Text>
        </View>

        {/* RE: Lines */}
        <View style={pleadingStyles.reLine}>
          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            <Text style={[pleadingStyles.reLineLabel, { width: 50 }]}>RE:</Text>
            <Text style={pleadingStyles.bold}>
              FORMAL DEMAND FOR RETURN OF SECURITY DEPOSIT
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            <Text style={{ width: 50 }} />
            <Text>Property: {propertyAddress}</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            <Text style={{ width: 50 }} />
            <Text>
              Deposit Amount: <Text style={pleadingStyles.bold}>{formatCurrency(depositAmount)}</Text>
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            <Text style={{ width: 50 }} />
            <Text>
              RESPONSE DEADLINE: <Text style={pleadingStyles.bold}>{formatDate(responseDeadline)}</Text>
            </Text>
          </View>
        </View>

        {/* Salutation */}
        <Text style={pleadingStyles.salutation}>Dear {data.landlord.name}:</Text>

        {/* Paragraph 1: Introduction */}
        <NumberedParagraph number={nextParagraph()}>
          <Text style={pleadingStyles.bodyText}>
            I am the former tenant of the above-referenced property located at{" "}
            <Text style={pleadingStyles.bold}>{propertyAddress}</Text>. This
            letter constitutes a formal demand for the return of my security
            deposit in accordance with{" "}
            <Text style={pleadingStyles.bold}>{stateRules.statuteTitle}</Text>.
          </Text>
        </NumberedParagraph>

        {/* Paragraph 2: Statement of Facts */}
        <NumberedParagraph number={nextParagraph()}>
          <Text style={[pleadingStyles.bodyText, pleadingStyles.bold]}>
            STATEMENT OF FACTS:
          </Text>
          <Text style={pleadingStyles.bodyText}>
            On or about {formatDate(deadlines.moveOutDate)}, I vacated the
            premises at the above-referenced property. At the commencement of my
            tenancy, I paid a security deposit in the amount of{" "}
            <Text style={pleadingStyles.bold}>{formatCurrency(depositAmount)}</Text>.
            Prior to my departure, I left the premises in good condition,
            reasonable wear and tear excepted, and provided my forwarding address
            as required.
          </Text>
        </NumberedParagraph>

        {/* Paragraph 3: Statutory Requirements */}
        <NumberedParagraph number={nextParagraph()}>
          <Text style={[pleadingStyles.bodyText, pleadingStyles.bold]}>
            STATUTORY REQUIREMENTS:
          </Text>
          <Text style={pleadingStyles.bodyText}>
            Under <Text style={pleadingStyles.citation}>{stateRules.statuteSections?.returnDeadline || stateRules.statuteTitle}</Text>,
            you were required to comply with the following obligations:
          </Text>
          <SubParagraph letter="a">
            Return the full security deposit within{" "}
            <Text style={pleadingStyles.bold}>{stateRules.returnDeadline} days</Text>{" "}
            if no deductions were to be claimed; OR
          </SubParagraph>
          <SubParagraph letter="b">
            Within <Text style={pleadingStyles.bold}>{stateRules.claimDeadline} days</Text>,
            provide a written, itemized statement of any deductions{" "}
            {stateRules.certifiedMailRequired && "via certified mail "}
            along with any remaining balance of the deposit.
          </SubParagraph>
        </NumberedParagraph>
      </PleadingPage>

      {/* Page 2: Violations and Legal Consequences */}
      <PleadingPage pageNumber={2} showLineNumbers={true}>
        {/* Paragraph 4: Your Violation */}
        <NumberedParagraph number={nextParagraph()}>
          <Text style={[pleadingStyles.bodyText, pleadingStyles.bold]}>
            YOUR VIOLATION:
          </Text>
          <Text style={pleadingStyles.bodyText}>
            You have failed to comply with your statutory obligations. Specifically:
          </Text>
        </NumberedParagraph>

        {/* Violation Checkboxes */}
        <View style={{ marginLeft: 36, marginBottom: 16 }}>
          <CheckboxItem checked={noReturn}>
            You have not returned any portion of my security deposit
          </CheckboxItem>
          <CheckboxItem checked={returnDeadlinePassed}>
            More than {stateRules.returnDeadline} days have elapsed since I vacated the premises
          </CheckboxItem>
          <CheckboxItem checked={noNotice}>
            You have not provided proper written notice of intent to claim deductions
            {stateRules.certifiedMailRequired && " via certified mail as required by law"}
          </CheckboxItem>
          <CheckboxItem checked={claimDeadlinePassed}>
            The {stateRules.claimDeadline}-day deadline for providing itemized deductions has passed
          </CheckboxItem>
          {data.deductions.length > 0 && (
            <CheckboxItem checked={true}>
              The deductions claimed are improper, excessive, or lack proper documentation
            </CheckboxItem>
          )}
        </View>

        {/* Paragraph 5: Legal Consequences */}
        <NumberedParagraph number={nextParagraph()}>
          <Text style={[pleadingStyles.bodyText, pleadingStyles.bold]}>
            LEGAL CONSEQUENCES:
          </Text>
          <Text style={pleadingStyles.bodyText}>
            Your failure to comply with{" "}
            <Text style={pleadingStyles.citation}>{stateRules.statuteSections?.forfeitureProvision || stateRules.statuteTitle}</Text>{" "}
            results in the following legal consequences:
          </Text>
          <SubParagraph letter="a">
            <Text style={pleadingStyles.bold}>Forfeiture of Right to Claim:</Text>{" "}
            {stateRules.statutoryLanguage?.forfeitureClause ||
              `You forfeit your right to retain any portion of the security deposit.`}
          </SubParagraph>
          <SubParagraph letter="b">
            <Text style={pleadingStyles.bold}>Statutory Damages:</Text>{" "}
            Pursuant to <Text style={pleadingStyles.citation}>{stateRules.statuteSections?.damagesProvision || stateRules.statuteTitle}</Text>,{" "}
            {stateRules.statutoryLanguage?.damagesClause ||
              `you may be liable for ${stateRules.damagesDescription} of the deposit wrongfully withheld.`}
          </SubParagraph>
          <SubParagraph letter="c">
            <Text style={pleadingStyles.bold}>Additional Recovery:</Text>{" "}
            Court costs, reasonable attorney{"'"}s fees, and any other damages allowed by law.
            {stateRules.additionalDamages && ` Specifically: ${stateRules.additionalDamages}`}
          </SubParagraph>
        </NumberedParagraph>

        {/* Paragraph 6: Potential Damages Exposure */}
        <NumberedParagraph number={nextParagraph()}>
          <Text style={[pleadingStyles.bodyText, pleadingStyles.bold]}>
            YOUR POTENTIAL LIABILITY:
          </Text>
          <Text style={pleadingStyles.bodyText}>
            If I am required to pursue this matter in {stateRules.courtName || "small claims court"},
            your total exposure may include:
          </Text>
        </NumberedParagraph>

        {/* Damages Table */}
        <View style={pleadingStyles.table}>
          <View style={pleadingStyles.tableHeader}>
            <Text style={[pleadingStyles.tableCellHeader, { width: "60%" }]}>
              CATEGORY
            </Text>
            <Text style={[pleadingStyles.tableCellHeader, { width: "40%", borderRightWidth: 0 }]}>
              AMOUNT
            </Text>
          </View>
          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "60%" }]}>
              Security Deposit Owed
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "40%" }]}>
              {formatCurrency(amountOwed)}
            </Text>
          </View>
          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "60%" }]}>
              Statutory Damages ({stateRules.damagesMultiplier}x multiplier)
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "40%" }]}>
              {formatCurrency(multiplierDamages)}
            </Text>
          </View>
          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "60%" }]}>
              Court Costs (estimated)
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "40%" }]}>
              {formatCurrency(stateRules.filingFee.max)}
            </Text>
          </View>
          <View style={pleadingStyles.tableRowLast}>
            <Text style={[pleadingStyles.tableCell, { width: "60%", fontFamily: "Times-Bold" }]}>
              MAXIMUM TOTAL EXPOSURE
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "40%", fontFamily: "Times-Bold" }]}>
              {formatCurrency(multiplierDamages + stateRules.filingFee.max)}
            </Text>
          </View>
        </View>
      </PleadingPage>

      {/* Page 3: Disputed Deductions (if any), Demand, and Closing */}
      <PleadingPage pageNumber={3} showLineNumbers={true}>
        {/* Disputed Deductions Section (if applicable) */}
        {data.deductions.length > 0 && (
          <>
            <NumberedParagraph number={nextParagraph()}>
              <Text style={[pleadingStyles.bodyText, pleadingStyles.bold]}>
                RESPONSE TO CLAIMED DEDUCTIONS:
              </Text>
              <Text style={pleadingStyles.bodyText}>
                I have received notice of claimed deductions totaling{" "}
                <Text style={pleadingStyles.bold}>{formatCurrency(totalDeductions)}</Text>.
                I dispute these deductions as follows:
              </Text>
            </NumberedParagraph>

            {data.deductions.map((deduction, index) => (
              <View key={index} style={{ marginLeft: 36, marginBottom: 12 }}>
                <Text style={[pleadingStyles.bodyTextSingle, pleadingStyles.bold]}>
                  {index + 1}. {deduction.description} - {formatCurrency(deduction.amount)}
                </Text>
                <Text style={[pleadingStyles.bodyTextSingle, { marginLeft: 20 }]}>
                  Disputed: {deduction.dispute || "This charge is improper, excessive, or lacks proper documentation as required by law."}
                </Text>
              </View>
            ))}
          </>
        )}

        {/* No Refund Statement */}
        {data.issueType === "no_refund" && (
          <NumberedParagraph number={nextParagraph()}>
            <Text style={pleadingStyles.bodyText}>
              To date, I have not received any portion of my security deposit,
              nor have I received any itemized statement of deductions as required
              by <Text style={pleadingStyles.citation}>{stateRules.statuteSections?.itemizationRequirement || stateRules.statuteTitle}</Text>.
              Your complete failure to comply with the statutory requirements
              constitutes a forfeiture of your right to retain any portion of the deposit.
            </Text>
          </NumberedParagraph>
        )}

        {/* Partial Refund Statement */}
        {data.issueType === "partial_refund" && amountReceived > 0 && (
          <NumberedParagraph number={nextParagraph()}>
            <Text style={pleadingStyles.bodyText}>
              I have received only {formatCurrency(amountReceived)} of my{" "}
              {formatCurrency(depositAmount)} deposit, leaving an outstanding balance of{" "}
              <Text style={pleadingStyles.bold}>{formatCurrency(amountOwed)}</Text>.
            </Text>
          </NumberedParagraph>
        )}

        {/* DEMAND */}
        <View style={pleadingStyles.infoBox}>
          <Text style={pleadingStyles.infoBoxTitle}>DEMAND</Text>
          <Text style={pleadingStyles.infoBoxText}>
            I hereby demand that you remit payment in the amount of{" "}
            <Text style={pleadingStyles.bold}>{formatCurrency(amountOwed)}</Text>{" "}
            within <Text style={pleadingStyles.bold}>fourteen (14) days</Text> of the date of
            this letter, no later than{" "}
            <Text style={pleadingStyles.bold}>{formatDate(responseDeadline)}</Text>.
          </Text>
          <Text style={[pleadingStyles.infoBoxText, { marginTop: 8 }]}>
            Payment should be made payable to{" "}
            <Text style={pleadingStyles.bold}>{data.tenant.name}</Text> and
            mailed to:
          </Text>
          <Text style={[pleadingStyles.infoBoxText, { marginTop: 4, marginLeft: 20 }]}>
            {tenantFullAddress}
          </Text>
        </View>

        {/* Consequences of Non-Compliance */}
        <NumberedParagraph number={nextParagraph()}>
          <Text style={[pleadingStyles.bodyText, pleadingStyles.bold]}>
            CONSEQUENCES OF NON-COMPLIANCE:
          </Text>
          <Text style={pleadingStyles.bodyText}>
            If you fail to remit the full amount demanded within the stated
            timeframe, I will pursue all legal remedies available to me,
            including but not limited to:
          </Text>
          <SubParagraph letter="a">
            Filing a complaint in {stateRules.courtName || "Small Claims Court"}{" "}
            (jurisdiction up to {formatCurrency(stateRules.maxSmallClaims)});
          </SubParagraph>
          <SubParagraph letter="b">
            Seeking {stateRules.damagesDescription} as permitted by{" "}
            <Text style={pleadingStyles.citation}>{stateRules.statuteSections?.damagesProvision || stateRules.statuteTitle}</Text>;
          </SubParagraph>
          <SubParagraph letter="c">
            Recovery of all court costs and reasonable attorney{"'"}s fees;
          </SubParagraph>
          <SubParagraph letter="d">
            Filing complaints with the {stateRules.name} Attorney General{"'"}s Office
            and other applicable consumer protection agencies.
          </SubParagraph>
        </NumberedParagraph>

        {/* Closing */}
        <NumberedParagraph number={nextParagraph()}>
          <Text style={pleadingStyles.bodyText}>
            This letter constitutes my good faith attempt to resolve this matter
            without litigation. I strongly encourage you to take this demand
            seriously and respond accordingly. I am available to discuss this
            matter if you wish to propose a reasonable resolution.
          </Text>
        </NumberedParagraph>

        <Text style={[pleadingStyles.bodyText, { marginTop: 12 }]}>
          Govern yourself accordingly.
        </Text>

        {/* Signature Block */}
        <SignatureBlock
          name={data.tenant.name}
          address={data.tenant.currentAddress}
          city={data.tenant.city}
          state={data.tenant.state}
          zip={data.tenant.zip}
          email={data.tenant.email || undefined}
          phone={data.tenant.phone || undefined}
          showDate={false}
        />

        {/* Enclosures Notice */}
        <View style={{ marginTop: 36 }}>
          <Text style={[pleadingStyles.bodyTextSingle, pleadingStyles.bold]}>
            Enclosures:
          </Text>
          <Text style={pleadingStyles.bodyTextSingle}>
            - Complete Security Deposit Dispute Packet
          </Text>
          <Text style={pleadingStyles.bodyTextSingle}>
            - Evidence Documentation (if applicable)
          </Text>
        </View>
      </PleadingPage>
    </Document>
  );
}
