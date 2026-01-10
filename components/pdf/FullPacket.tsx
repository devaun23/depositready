import { Document, Text, View } from "@react-pdf/renderer";
import { WizardData } from "@/types/dispute";
import type { StateRules } from "@/lib/state-rules";
import { analyzeDeadlines } from "@/lib/state-rules";
import {
  PleadingPage,
  CaseCaption,
  CoverSheet,
  NumberedParagraph,
  SubParagraph,
  CheckboxItem,
  SignatureBlock,
  CertificateOfService,
  pleadingStyles,
} from "./shared";

interface FullPacketProps {
  data: WizardData;
  stateRules: StateRules;
  generatedDate?: Date;
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

export function FullPacket({
  data,
  stateRules,
  generatedDate = new Date(),
}: FullPacketProps) {
  const deadlines = data.moveOutDate
    ? analyzeDeadlines(new Date(data.moveOutDate), stateRules)
    : null;

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
  const noNotice = Boolean(
    deadlines?.claimDeadlinePassed &&
    (data.issueType === "no_refund" || !data.wasItemized)
  );
  const returnDeadlinePassed = deadlines?.returnDeadlinePassed || false;
  const claimDeadlinePassed = deadlines?.claimDeadlinePassed || false;

  // Paragraph counter for demand letter
  let demandParagraphNum = 0;
  const nextDemandParagraph = () => ++demandParagraphNum;

  return (
    <Document>
      {/* ========== PAGE 1: COVER SHEET ========== */}
      <PleadingPage pageNumber={1} showLineNumbers={true}>
        <CoverSheet
          tenantName={data.tenant.name}
          landlordName={data.landlord.name}
          propertyAddress={propertyAddress}
          depositAmount={depositAmount}
          moveOutDate={deadlines?.moveOutDate || new Date()}
          generatedDate={generatedDate}
          stateName={stateRules.name}
          statuteTitle={stateRules.statuteTitle}
          courtName={stateRules.courtName}
        />
      </PleadingPage>

      {/* ========== PAGES 2-4: FORMAL DEMAND LETTER ========== */}
      {/* Page 2: Demand Letter Header and Opening */}
      <PleadingPage pageNumber={2} showLineNumbers={true}>
        {/* Certified Mail Header */}
        <Text style={pleadingStyles.certifiedMailHeader}>
          SENT VIA{" "}
          {stateRules.certifiedMailRequired
            ? "CERTIFIED MAIL, RETURN RECEIPT REQUESTED"
            : "FIRST CLASS MAIL"}
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
              Deposit Amount:{" "}
              <Text style={pleadingStyles.bold}>
                {formatCurrency(depositAmount)}
              </Text>
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            <Text style={{ width: 50 }} />
            <Text>
              RESPONSE DEADLINE:{" "}
              <Text style={pleadingStyles.bold}>
                {formatDate(responseDeadline)}
              </Text>
            </Text>
          </View>
        </View>

        {/* Salutation */}
        <Text style={pleadingStyles.salutation}>Dear {data.landlord.name}:</Text>

        {/* Paragraph 1: Introduction */}
        <NumberedParagraph number={nextDemandParagraph()}>
          <Text style={pleadingStyles.bodyText}>
            I am the former tenant of the above-referenced property located at{" "}
            <Text style={pleadingStyles.bold}>{propertyAddress}</Text>. This
            letter constitutes a formal demand for the return of my security
            deposit in accordance with{" "}
            <Text style={pleadingStyles.bold}>{stateRules.statuteTitle}</Text>.
          </Text>
        </NumberedParagraph>

        {/* Paragraph 2: Statement of Facts */}
        <NumberedParagraph number={nextDemandParagraph()}>
          <Text style={[pleadingStyles.bodyText, pleadingStyles.bold]}>
            STATEMENT OF FACTS:
          </Text>
          <Text style={pleadingStyles.bodyText}>
            On or about{" "}
            {deadlines ? formatDate(deadlines.moveOutDate) : "[move-out date]"}, I
            vacated the premises at the above-referenced property. At the
            commencement of my tenancy, I paid a security deposit in the amount of{" "}
            <Text style={pleadingStyles.bold}>
              {formatCurrency(depositAmount)}
            </Text>
            . Prior to my departure, I left the premises in good condition,
            reasonable wear and tear excepted, and provided my forwarding address
            as required.
          </Text>
        </NumberedParagraph>

        {/* Paragraph 3: Statutory Requirements */}
        <NumberedParagraph number={nextDemandParagraph()}>
          <Text style={[pleadingStyles.bodyText, pleadingStyles.bold]}>
            STATUTORY REQUIREMENTS:
          </Text>
          <Text style={pleadingStyles.bodyText}>
            Under{" "}
            <Text style={pleadingStyles.citation}>
              {stateRules.statuteSections?.returnDeadline || stateRules.statuteTitle}
            </Text>
            , you were required to comply with the following obligations:
          </Text>
          <SubParagraph letter="a">
            Return the full security deposit within{" "}
            <Text style={pleadingStyles.bold}>
              {stateRules.returnDeadline} days
            </Text>{" "}
            if no deductions were to be claimed; OR
          </SubParagraph>
          <SubParagraph letter="b">
            Within{" "}
            <Text style={pleadingStyles.bold}>
              {stateRules.claimDeadline} days
            </Text>
            , provide a written, itemized statement of any deductions{" "}
            {stateRules.certifiedMailRequired && "via certified mail "}
            along with any remaining balance of the deposit.
          </SubParagraph>
        </NumberedParagraph>
      </PleadingPage>

      {/* Page 3: Violations and Legal Consequences */}
      <PleadingPage pageNumber={3} showLineNumbers={true}>
        {/* Paragraph 4: Your Violation */}
        <NumberedParagraph number={nextDemandParagraph()}>
          <Text style={[pleadingStyles.bodyText, pleadingStyles.bold]}>
            YOUR VIOLATION:
          </Text>
          <Text style={pleadingStyles.bodyText}>
            You have failed to comply with your statutory obligations.
            Specifically:
          </Text>
        </NumberedParagraph>

        {/* Violation Checkboxes */}
        <View style={{ marginLeft: 36, marginBottom: 16 }}>
          <CheckboxItem checked={noReturn}>
            You have not returned any portion of my security deposit
          </CheckboxItem>
          <CheckboxItem checked={returnDeadlinePassed}>
            More than {stateRules.returnDeadline} days have elapsed since I
            vacated the premises
          </CheckboxItem>
          <CheckboxItem checked={noNotice}>
            You have not provided proper written notice of intent to claim
            deductions
            {stateRules.certifiedMailRequired &&
              " via certified mail as required by law"}
          </CheckboxItem>
          <CheckboxItem checked={claimDeadlinePassed}>
            The {stateRules.claimDeadline}-day deadline for providing itemized
            deductions has passed
          </CheckboxItem>
          {data.deductions.length > 0 && (
            <CheckboxItem checked={true}>
              The deductions claimed are improper, excessive, or lack proper
              documentation
            </CheckboxItem>
          )}
        </View>

        {/* Paragraph 5: Legal Consequences */}
        <NumberedParagraph number={nextDemandParagraph()}>
          <Text style={[pleadingStyles.bodyText, pleadingStyles.bold]}>
            LEGAL CONSEQUENCES:
          </Text>
          <Text style={pleadingStyles.bodyText}>
            Your failure to comply with{" "}
            <Text style={pleadingStyles.citation}>
              {stateRules.statuteSections?.forfeitureProvision ||
                stateRules.statuteTitle}
            </Text>{" "}
            results in the following legal consequences:
          </Text>
          <SubParagraph letter="a">
            <Text style={pleadingStyles.bold}>Forfeiture of Right to Claim:</Text>{" "}
            {stateRules.statutoryLanguage?.forfeitureClause ||
              `You forfeit your right to retain any portion of the security deposit.`}
          </SubParagraph>
          <SubParagraph letter="b">
            <Text style={pleadingStyles.bold}>Statutory Damages:</Text> Pursuant
            to{" "}
            <Text style={pleadingStyles.citation}>
              {stateRules.statuteSections?.damagesProvision ||
                stateRules.statuteTitle}
            </Text>
            ,{" "}
            {stateRules.statutoryLanguage?.damagesClause ||
              `you may be liable for ${stateRules.damagesDescription} of the deposit wrongfully withheld.`}
          </SubParagraph>
          <SubParagraph letter="c">
            <Text style={pleadingStyles.bold}>Additional Recovery:</Text> Court
            costs, reasonable attorney{"'"}s fees, and any other damages allowed
            by law.
            {stateRules.additionalDamages &&
              ` Specifically: ${stateRules.additionalDamages}`}
          </SubParagraph>
        </NumberedParagraph>

        {/* Paragraph 6: Potential Damages Exposure */}
        <NumberedParagraph number={nextDemandParagraph()}>
          <Text style={[pleadingStyles.bodyText, pleadingStyles.bold]}>
            YOUR POTENTIAL LIABILITY:
          </Text>
          <Text style={pleadingStyles.bodyText}>
            If I am required to pursue this matter in{" "}
            {stateRules.courtName || "small claims court"}, your total exposure
            may include:
          </Text>
        </NumberedParagraph>

        {/* Damages Table */}
        <View style={pleadingStyles.table}>
          <View style={pleadingStyles.tableHeader}>
            <Text style={[pleadingStyles.tableCellHeader, { width: "60%" }]}>
              CATEGORY
            </Text>
            <Text
              style={[
                pleadingStyles.tableCellHeader,
                { width: "40%", borderRightWidth: 0 },
              ]}
            >
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
            <Text
              style={[
                pleadingStyles.tableCell,
                { width: "60%", fontFamily: "Times-Bold" },
              ]}
            >
              MAXIMUM TOTAL EXPOSURE
            </Text>
            <Text
              style={[
                pleadingStyles.tableCellLast,
                { width: "40%", fontFamily: "Times-Bold" },
              ]}
            >
              {formatCurrency(multiplierDamages + stateRules.filingFee.max)}
            </Text>
          </View>
        </View>
      </PleadingPage>

      {/* Page 4: Demand, Closing, and Signature */}
      <PleadingPage pageNumber={4} showLineNumbers={true}>
        {/* Disputed Deductions Section (if applicable) */}
        {data.deductions.length > 0 && (
          <>
            <NumberedParagraph number={nextDemandParagraph()}>
              <Text style={[pleadingStyles.bodyText, pleadingStyles.bold]}>
                RESPONSE TO CLAIMED DEDUCTIONS:
              </Text>
              <Text style={pleadingStyles.bodyText}>
                I have received notice of claimed deductions totaling{" "}
                <Text style={pleadingStyles.bold}>
                  {formatCurrency(totalDeductions)}
                </Text>
                . I dispute these deductions as follows:
              </Text>
            </NumberedParagraph>

            {data.deductions.map((deduction, index) => (
              <View key={index} style={{ marginLeft: 36, marginBottom: 12 }}>
                <Text
                  style={[pleadingStyles.bodyTextSingle, pleadingStyles.bold]}
                >
                  {index + 1}. {deduction.description} -{" "}
                  {formatCurrency(deduction.amount)}
                </Text>
                <Text
                  style={[pleadingStyles.bodyTextSingle, { marginLeft: 20 }]}
                >
                  Disputed:{" "}
                  {deduction.dispute ||
                    "This charge is improper, excessive, or lacks proper documentation as required by law."}
                </Text>
              </View>
            ))}
          </>
        )}

        {/* No Refund Statement */}
        {data.issueType === "no_refund" && (
          <NumberedParagraph number={nextDemandParagraph()}>
            <Text style={pleadingStyles.bodyText}>
              To date, I have not received any portion of my security deposit,
              nor have I received any itemized statement of deductions as
              required by{" "}
              <Text style={pleadingStyles.citation}>
                {stateRules.statuteSections?.itemizationRequirement ||
                  stateRules.statuteTitle}
              </Text>
              . Your complete failure to comply with the statutory requirements
              constitutes a forfeiture of your right to retain any portion of
              the deposit.
            </Text>
          </NumberedParagraph>
        )}

        {/* Partial Refund Statement */}
        {data.issueType === "partial_refund" && amountReceived > 0 && (
          <NumberedParagraph number={nextDemandParagraph()}>
            <Text style={pleadingStyles.bodyText}>
              I have received only {formatCurrency(amountReceived)} of my{" "}
              {formatCurrency(depositAmount)} deposit, leaving an outstanding
              balance of{" "}
              <Text style={pleadingStyles.bold}>{formatCurrency(amountOwed)}</Text>
              .
            </Text>
          </NumberedParagraph>
        )}

        {/* DEMAND */}
        <View style={pleadingStyles.infoBox}>
          <Text style={pleadingStyles.infoBoxTitle}>DEMAND</Text>
          <Text style={pleadingStyles.infoBoxText}>
            I hereby demand that you remit payment in the amount of{" "}
            <Text style={pleadingStyles.bold}>{formatCurrency(amountOwed)}</Text>{" "}
            within <Text style={pleadingStyles.bold}>fourteen (14) days</Text> of
            the date of this letter, no later than{" "}
            <Text style={pleadingStyles.bold}>
              {formatDate(responseDeadline)}
            </Text>
            .
          </Text>
          <Text style={[pleadingStyles.infoBoxText, { marginTop: 8 }]}>
            Payment should be made payable to{" "}
            <Text style={pleadingStyles.bold}>{data.tenant.name}</Text> and
            mailed to:
          </Text>
          <Text
            style={[pleadingStyles.infoBoxText, { marginTop: 4, marginLeft: 20 }]}
          >
            {tenantFullAddress}
          </Text>
        </View>

        {/* Consequences of Non-Compliance */}
        <NumberedParagraph number={nextDemandParagraph()}>
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
            <Text style={pleadingStyles.citation}>
              {stateRules.statuteSections?.damagesProvision ||
                stateRules.statuteTitle}
            </Text>
            ;
          </SubParagraph>
          <SubParagraph letter="c">
            Recovery of all court costs and reasonable attorney{"'"}s fees;
          </SubParagraph>
          <SubParagraph letter="d">
            Filing complaints with the {stateRules.name} Attorney General{"'"}s
            Office and other applicable consumer protection agencies.
          </SubParagraph>
        </NumberedParagraph>

        {/* Closing */}
        <NumberedParagraph number={nextDemandParagraph()}>
          <Text style={pleadingStyles.bodyText}>
            This letter constitutes my good faith attempt to resolve this matter
            without litigation. I strongly encourage you to take this demand
            seriously and respond accordingly.
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
      </PleadingPage>

      {/* ========== PAGE 5: STATEMENT OF FACTS ========== */}
      <PleadingPage pageNumber={5} showLineNumbers={true}>
        <Text style={pleadingStyles.documentTitle}>STATEMENT OF FACTS</Text>

        <NumberedParagraph number={1}>
          <Text style={pleadingStyles.bodyText}>
            I, {data.tenant.name}, resided at {propertyAddress} pursuant to a
            residential lease agreement with {data.landlord.name}.
          </Text>
        </NumberedParagraph>

        <NumberedParagraph number={2}>
          <Text style={pleadingStyles.bodyText}>
            At the commencement of the tenancy, I paid a security deposit in the
            amount of{" "}
            <Text style={pleadingStyles.bold}>
              {formatCurrency(depositAmount)}
            </Text>{" "}
            as required by the lease agreement.
          </Text>
        </NumberedParagraph>

        <NumberedParagraph number={3}>
          <Text style={pleadingStyles.bodyText}>
            On or about{" "}
            <Text style={pleadingStyles.bold}>
              {deadlines ? formatDate(deadlines.moveOutDate) : "[move-out date]"}
            </Text>
            , I vacated the premises and surrendered possession to the landlord.
          </Text>
        </NumberedParagraph>

        <NumberedParagraph number={4}>
          <Text style={pleadingStyles.bodyText}>
            Prior to vacating, I cleaned the premises and left them in good
            condition, reasonable wear and tear excepted. I documented the
            condition of the premises with photographs/videos dated at the time
            of move-out.
          </Text>
        </NumberedParagraph>

        <NumberedParagraph number={5}>
          <Text style={pleadingStyles.bodyText}>
            Upon vacating, I provided my forwarding address to the landlord as
            follows: {tenantFullAddress}
          </Text>
        </NumberedParagraph>

        {data.deductions.length > 0 ? (
          <NumberedParagraph number={6}>
            <Text style={pleadingStyles.bodyText}>
              The landlord has claimed deductions totaling{" "}
              {formatCurrency(totalDeductions)} from my security deposit. I
              dispute these deductions as improper, excessive, or unsupported by
              documentation.
            </Text>
          </NumberedParagraph>
        ) : (
          <NumberedParagraph number={6}>
            <Text style={pleadingStyles.bodyText}>
              To date, I have not received any itemized statement of deductions
              from the landlord, nor have I received any portion of my security
              deposit.
            </Text>
          </NumberedParagraph>
        )}

        <NumberedParagraph number={7}>
          <Text style={pleadingStyles.bodyText}>
            As of the date of this document, {deadlines?.daysSinceMoveOut || 0}{" "}
            days have elapsed since I vacated the premises.
          </Text>
        </NumberedParagraph>

        {/* Declaration */}
        <View style={{ marginTop: 36 }}>
          <Text style={[pleadingStyles.bodyText, { marginBottom: 24 }]}>
            I declare under penalty of perjury under the laws of the State of{" "}
            {stateRules.name} that the foregoing is true and correct.
          </Text>

          <Text style={pleadingStyles.bodyTextSingle}>
            Executed on ________________, 20____ at ________________,{" "}
            {stateRules.name}.
          </Text>

          <View style={[pleadingStyles.signatureBlock, { marginTop: 36 }]}>
            <View style={pleadingStyles.signatureLine} />
            <Text style={pleadingStyles.signatureName}>{data.tenant.name}</Text>
          </View>
        </View>
      </PleadingPage>

      {/* ========== PAGE 6: LEGAL ANALYSIS ========== */}
      <PleadingPage pageNumber={6} showLineNumbers={true}>
        <Text style={pleadingStyles.documentTitle}>LEGAL ANALYSIS</Text>
        <Text
          style={[
            pleadingStyles.bodyTextSingle,
            { textAlign: "center", marginBottom: 24 },
          ]}
        >
          Statutory Violations Under {stateRules.statuteTitle}
        </Text>

        {/* Applicable Law */}
        <Text style={pleadingStyles.sectionHeader}>APPLICABLE LAW</Text>
        <Text style={pleadingStyles.bodyText}>
          This matter is governed by{" "}
          <Text style={pleadingStyles.citation}>{stateRules.statuteTitle}</Text>,
          which establishes the requirements for return of security deposits in{" "}
          {stateRules.name}.
        </Text>

        {/* Statutory Requirements */}
        <Text style={pleadingStyles.sectionHeader}>STATUTORY REQUIREMENTS</Text>
        <View style={{ marginBottom: 16 }}>
          <Text style={[pleadingStyles.bodyTextSingle, pleadingStyles.bold]}>
            Return Deadline:
          </Text>
          <Text style={pleadingStyles.citationBlock}>
            {stateRules.statutoryLanguage?.deadlineClause ||
              `The landlord must return the security deposit within ${stateRules.returnDeadline} days after the tenant vacates the premises.`}
          </Text>
          <Text
            style={[
              pleadingStyles.bodyTextSingle,
              { textAlign: "right", marginTop: 4 },
            ]}
          >
            —{" "}
            <Text style={pleadingStyles.citation}>
              {stateRules.statuteSections?.returnDeadline ||
                stateRules.statuteTitle}
            </Text>
          </Text>
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={[pleadingStyles.bodyTextSingle, pleadingStyles.bold]}>
            Forfeiture Provision:
          </Text>
          <Text style={pleadingStyles.citationBlock}>
            {stateRules.statutoryLanguage?.forfeitureClause ||
              `Failure to comply with the statutory requirements results in forfeiture of the right to impose any claim on the deposit.`}
          </Text>
          <Text
            style={[
              pleadingStyles.bodyTextSingle,
              { textAlign: "right", marginTop: 4 },
            ]}
          >
            —{" "}
            <Text style={pleadingStyles.citation}>
              {stateRules.statuteSections?.forfeitureProvision ||
                stateRules.statuteTitle}
            </Text>
          </Text>
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={[pleadingStyles.bodyTextSingle, pleadingStyles.bold]}>
            Damages Provision:
          </Text>
          <Text style={pleadingStyles.citationBlock}>
            {stateRules.statutoryLanguage?.damagesClause ||
              `In cases of bad faith retention, the tenant may recover ${stateRules.damagesDescription}.`}
          </Text>
          <Text
            style={[
              pleadingStyles.bodyTextSingle,
              { textAlign: "right", marginTop: 4 },
            ]}
          >
            —{" "}
            <Text style={pleadingStyles.citation}>
              {stateRules.statuteSections?.damagesProvision ||
                stateRules.statuteTitle}
            </Text>
          </Text>
        </View>

        {/* Landlord's Violations */}
        <Text style={pleadingStyles.sectionHeader}>
          LANDLORD{"'"}S VIOLATIONS
        </Text>
        <Text style={pleadingStyles.bodyText}>
          Based on the facts presented, the landlord has violated the following
          statutory requirements:
        </Text>

        <View style={{ marginLeft: 24, marginTop: 12 }}>
          {returnDeadlinePassed && (
            <CheckboxItem checked={true}>
              Failed to return the security deposit within{" "}
              {stateRules.returnDeadline} days as required by{" "}
              {stateRules.statuteSections?.returnDeadline ||
                stateRules.statuteTitle}
            </CheckboxItem>
          )}
          {claimDeadlinePassed && (
            <CheckboxItem checked={true}>
              Failed to provide itemized statement of deductions within{" "}
              {stateRules.claimDeadline} days as required by{" "}
              {stateRules.statuteSections?.claimDeadline ||
                stateRules.statuteTitle}
            </CheckboxItem>
          )}
          {stateRules.certifiedMailRequired && noNotice && (
            <CheckboxItem checked={true}>
              Failed to send required notice via certified mail
            </CheckboxItem>
          )}
        </View>
      </PleadingPage>

      {/* ========== PAGE 7: TIMELINE ========== */}
      <PleadingPage pageNumber={7} showLineNumbers={true}>
        <Text style={pleadingStyles.documentTitle}>TIMELINE OF EVENTS</Text>

        <View style={pleadingStyles.table}>
          <View style={pleadingStyles.tableHeader}>
            <Text style={[pleadingStyles.tableCellHeader, { width: "35%" }]}>
              DATE
            </Text>
            <Text style={[pleadingStyles.tableCellHeader, { width: "50%" }]}>
              EVENT
            </Text>
            <Text
              style={[
                pleadingStyles.tableCellHeader,
                { width: "15%", borderRightWidth: 0 },
              ]}
            >
              DAY
            </Text>
          </View>

          {deadlines && (
            <>
              <View style={pleadingStyles.tableRow}>
                <Text style={[pleadingStyles.tableCell, { width: "35%" }]}>
                  {formatDate(deadlines.moveOutDate)}
                </Text>
                <Text style={[pleadingStyles.tableCell, { width: "50%" }]}>
                  Tenant vacated premises
                </Text>
                <Text style={[pleadingStyles.tableCellLast, { width: "15%" }]}>
                  0
                </Text>
              </View>

              <View style={pleadingStyles.tableRow}>
                <Text style={[pleadingStyles.tableCell, { width: "35%" }]}>
                  {formatDate(deadlines.returnDeadline)}
                </Text>
                <Text style={[pleadingStyles.tableCell, { width: "50%" }]}>
                  {stateRules.returnDeadline}-day return deadline
                </Text>
                <Text style={[pleadingStyles.tableCellLast, { width: "15%" }]}>
                  {stateRules.returnDeadline}
                </Text>
              </View>

              {stateRules.returnDeadline !== stateRules.claimDeadline && (
                <View style={pleadingStyles.tableRow}>
                  <Text style={[pleadingStyles.tableCell, { width: "35%" }]}>
                    {formatDate(deadlines.claimDeadline)}
                  </Text>
                  <Text style={[pleadingStyles.tableCell, { width: "50%" }]}>
                    {stateRules.claimDeadline}-day claim deadline
                  </Text>
                  <Text style={[pleadingStyles.tableCellLast, { width: "15%" }]}>
                    {stateRules.claimDeadline}
                  </Text>
                </View>
              )}

              <View style={pleadingStyles.tableRow}>
                <Text style={[pleadingStyles.tableCell, { width: "35%" }]}>
                  {formatDate(deadlines.today)}
                </Text>
                <Text
                  style={[
                    pleadingStyles.tableCell,
                    { width: "50%", fontFamily: "Times-Bold" },
                  ]}
                >
                  Today
                </Text>
                <Text
                  style={[
                    pleadingStyles.tableCellLast,
                    { width: "15%", fontFamily: "Times-Bold" },
                  ]}
                >
                  {deadlines.daysSinceMoveOut}
                </Text>
              </View>

              <View style={pleadingStyles.tableRowLast}>
                <Text style={[pleadingStyles.tableCell, { width: "35%" }]}>
                  {formatDate(responseDeadline)}
                </Text>
                <Text style={[pleadingStyles.tableCell, { width: "50%" }]}>
                  Response deadline (14 days from letter)
                </Text>
                <Text style={[pleadingStyles.tableCellLast, { width: "15%" }]}>
                  —
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Deadline Status */}
        {deadlines?.landlordInViolation && (
          <View style={pleadingStyles.infoBox}>
            <Text style={pleadingStyles.infoBoxTitle}>DEADLINE VIOLATION</Text>
            <Text style={pleadingStyles.infoBoxText}>
              The landlord has exceeded all statutory deadlines for returning
              the security deposit or providing an itemized statement of
              deductions. Under{" "}
              <Text style={pleadingStyles.citation}>
                {stateRules.statuteTitle}
              </Text>
              , this violation results in forfeiture of the right to retain any
              portion of the deposit.
            </Text>
          </View>
        )}

        {/* Damages Calculation */}
        <Text style={[pleadingStyles.sectionHeader, { marginTop: 24 }]}>
          DAMAGES CALCULATION
        </Text>

        <View style={pleadingStyles.table}>
          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "60%" }]}>
              Original Security Deposit
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "40%" }]}>
              {formatCurrency(depositAmount)}
            </Text>
          </View>
          {amountReceived > 0 && (
            <View style={pleadingStyles.tableRow}>
              <Text style={[pleadingStyles.tableCell, { width: "60%" }]}>
                Amount Already Received
              </Text>
              <Text style={[pleadingStyles.tableCellLast, { width: "40%" }]}>
                ({formatCurrency(amountReceived)})
              </Text>
            </View>
          )}
          <View style={pleadingStyles.tableRow}>
            <Text
              style={[
                pleadingStyles.tableCell,
                { width: "60%", fontFamily: "Times-Bold" },
              ]}
            >
              Base Amount Owed
            </Text>
            <Text
              style={[
                pleadingStyles.tableCellLast,
                { width: "40%", fontFamily: "Times-Bold" },
              ]}
            >
              {formatCurrency(amountOwed)}
            </Text>
          </View>
          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "60%" }]}>
              Potential {stateRules.damagesDescription} (
              {stateRules.damagesMultiplier}x)
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "40%" }]}>
              {formatCurrency(multiplierDamages)}
            </Text>
          </View>
          <View style={pleadingStyles.tableRowLast}>
            <Text
              style={[
                pleadingStyles.tableCell,
                { width: "60%", fontFamily: "Times-Bold" },
              ]}
            >
              MAXIMUM POTENTIAL RECOVERY
            </Text>
            <Text
              style={[
                pleadingStyles.tableCellLast,
                { width: "40%", fontFamily: "Times-Bold" },
              ]}
            >
              {formatCurrency(multiplierDamages)}
            </Text>
          </View>
        </View>
      </PleadingPage>

      {/* ========== PAGE 8: EVIDENCE INDEX ========== */}
      <PleadingPage pageNumber={8} showLineNumbers={true}>
        <Text style={pleadingStyles.documentTitle}>EVIDENCE INDEX</Text>

        <Text style={pleadingStyles.bodyText}>
          The following exhibits support this security deposit dispute. Gather
          available documentation before sending the demand letter or filing in
          court.
        </Text>

        <View style={pleadingStyles.table}>
          <View style={pleadingStyles.tableHeader}>
            <Text style={[pleadingStyles.tableCellHeader, { width: "15%" }]}>
              EXHIBIT
            </Text>
            <Text style={[pleadingStyles.tableCellHeader, { width: "45%" }]}>
              DESCRIPTION
            </Text>
            <Text
              style={[
                pleadingStyles.tableCellHeader,
                { width: "40%", borderRightWidth: 0 },
              ]}
            >
              STATUS/NOTES
            </Text>
          </View>

          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "15%" }]}>A</Text>
            <Text style={[pleadingStyles.tableCell, { width: "45%" }]}>
              Lease Agreement
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "40%" }]}>
              Shows deposit amount and terms
            </Text>
          </View>

          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "15%" }]}>B</Text>
            <Text style={[pleadingStyles.tableCell, { width: "45%" }]}>
              Security Deposit Receipt
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "40%" }]}>
              Proof of {formatCurrency(depositAmount)} paid
            </Text>
          </View>

          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "15%" }]}>C</Text>
            <Text style={[pleadingStyles.tableCell, { width: "45%" }]}>
              Move-In Inspection Report
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "40%" }]}>
              Original condition baseline
            </Text>
          </View>

          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "15%" }]}>D</Text>
            <Text style={[pleadingStyles.tableCell, { width: "45%" }]}>
              Move-Out Photos/Videos
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "40%" }]}>
              Dated condition documentation
            </Text>
          </View>

          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "15%" }]}>E</Text>
            <Text style={[pleadingStyles.tableCell, { width: "45%" }]}>
              Communication Records
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "40%" }]}>
              Emails, texts, letters with landlord
            </Text>
          </View>

          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "15%" }]}>F</Text>
            <Text style={[pleadingStyles.tableCell, { width: "45%" }]}>
              Deduction Notice from Landlord
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "40%" }]}>
              {data.deductions.length > 0 ? "Received" : "Not received"}
            </Text>
          </View>

          <View style={pleadingStyles.tableRowLast}>
            <Text style={[pleadingStyles.tableCell, { width: "15%" }]}>G</Text>
            <Text style={[pleadingStyles.tableCell, { width: "45%" }]}>
              Proof of Forwarding Address
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "40%" }]}>
              Change of address confirmation
            </Text>
          </View>
        </View>

        {/* Documentation Tips */}
        <View style={pleadingStyles.infoBox}>
          <Text style={pleadingStyles.infoBoxTitle}>DOCUMENTATION TIPS</Text>
          <Text style={pleadingStyles.infoBoxText}>
            1. Make copies of everything before submitting to landlord or court
            {"\n"}
            2. Photos should have visible dates/timestamps{"\n"}
            3. Organize evidence chronologically{"\n"}
            4. Keep originals safe; submit copies{"\n"}
            5. Label each exhibit clearly (Exhibit A, B, C, etc.)
          </Text>
        </View>
      </PleadingPage>

      {/* ========== PAGE 9: SMALL CLAIMS GUIDE ========== */}
      <PleadingPage pageNumber={9} showLineNumbers={true}>
        <Text style={pleadingStyles.documentTitle}>SMALL CLAIMS COURT GUIDE</Text>
        <Text
          style={[
            pleadingStyles.bodyTextSingle,
            { textAlign: "center", marginBottom: 24 },
          ]}
        >
          {stateRules.name} {stateRules.courtName || "Small Claims Court"}
        </Text>

        <Text style={pleadingStyles.sectionHeader}>
          JURISDICTION AND FILING FEES
        </Text>
        <View style={pleadingStyles.table}>
          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "50%" }]}>
              Maximum Claim Amount
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "50%" }]}>
              {formatCurrency(stateRules.maxSmallClaims)}
            </Text>
          </View>
          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "50%" }]}>
              Filing Fee Range
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "50%" }]}>
              {formatCurrency(stateRules.filingFee.min)} -{" "}
              {formatCurrency(stateRules.filingFee.max)}
            </Text>
          </View>
          <View style={pleadingStyles.tableRowLast}>
            <Text style={[pleadingStyles.tableCell, { width: "50%" }]}>
              Your Claim Amount
            </Text>
            <Text
              style={[
                pleadingStyles.tableCellLast,
                { width: "50%", fontFamily: "Times-Bold" },
              ]}
            >
              {formatCurrency(amountOwed)}
              {amountOwed <= stateRules.maxSmallClaims
                ? " (within limits)"
                : " (may exceed limits)"}
            </Text>
          </View>
        </View>

        {stateRules.smallClaimsNote && (
          <Text style={[pleadingStyles.bodyTextSingle, { marginTop: 8, fontFamily: "Times-Italic" }]}>
            Note: {stateRules.smallClaimsNote}
          </Text>
        )}

        <Text style={pleadingStyles.sectionHeader}>HOW TO FILE</Text>
        <NumberedParagraph number={1}>
          <Text style={pleadingStyles.bodyTextSingle}>
            <Text style={pleadingStyles.bold}>Locate your courthouse:</Text>{" "}
            File in the county where the rental property is located or where the
            landlord resides/does business.
          </Text>
        </NumberedParagraph>

        <NumberedParagraph number={2}>
          <Text style={pleadingStyles.bodyTextSingle}>
            <Text style={pleadingStyles.bold}>Complete the forms:</Text> Obtain
            small claims forms from the courthouse or court website. Include all
            parties, the amount claimed, and a brief statement of your claim.
          </Text>
        </NumberedParagraph>

        <NumberedParagraph number={3}>
          <Text style={pleadingStyles.bodyTextSingle}>
            <Text style={pleadingStyles.bold}>Pay the filing fee:</Text> Fees
            vary based on claim amount. You may recover this fee if you win.
          </Text>
        </NumberedParagraph>

        <NumberedParagraph number={4}>
          <Text style={pleadingStyles.bodyTextSingle}>
            <Text style={pleadingStyles.bold}>Serve the defendant:</Text> The
            landlord must be properly served with notice of the lawsuit. Follow
            court instructions for service.
          </Text>
        </NumberedParagraph>

        <NumberedParagraph number={5}>
          <Text style={pleadingStyles.bodyTextSingle}>
            <Text style={pleadingStyles.bold}>Attend the hearing:</Text> Bring
            all evidence organized by exhibit. Be prepared to explain your case
            clearly and concisely.
          </Text>
        </NumberedParagraph>

        <View style={pleadingStyles.infoBox}>
          <Text style={pleadingStyles.infoBoxTitle}>WHAT TO BRING TO COURT</Text>
          <Text style={pleadingStyles.infoBoxText}>
            - This complete dispute packet{"\n"}- Original lease agreement{"\n"}-
            Proof of deposit payment{"\n"}- Move-in/move-out photos (dated)
            {"\n"}- All correspondence with landlord{"\n"}- Certified mail
            receipt for demand letter{"\n"}- Calculator for damages
          </Text>
        </View>
      </PleadingPage>

      {/* ========== PAGE 10: CERTIFICATE OF SERVICE ========== */}
      <PleadingPage pageNumber={10} showLineNumbers={true}>
        <Text style={pleadingStyles.documentTitle}>CERTIFICATE OF SERVICE</Text>

        <CertificateOfService
          recipientName={data.landlord.name}
          recipientAddress={landlordFullAddress}
          mailingMethod={
            stateRules.certifiedMailRequired
              ? "certified mail, return receipt requested"
              : "first class mail, postage prepaid"
          }
        />

        <View style={{ marginTop: 48, paddingTop: 24, borderTopWidth: 1, borderTopColor: "#cccccc" }}>
          <Text style={[pleadingStyles.bodyTextSingle, pleadingStyles.italic, { textAlign: "center" }]}>
            This document was prepared using DepositReady.co
          </Text>
          <Text style={[pleadingStyles.bodyTextSingle, pleadingStyles.italic, { textAlign: "center", marginTop: 8 }]}>
            This packet does not constitute legal advice. Consult a licensed attorney for complex legal matters.
          </Text>
        </View>
      </PleadingPage>
    </Document>
  );
}
