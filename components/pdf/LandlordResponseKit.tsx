/**
 * Landlord Response Kit PDF
 *
 * A 6-page PDF kit for landlords who received a tenant demand letter.
 * Includes:
 * 1-2. State-Specific Response Letter
 * 3.   Deduction Documentation Checklist
 * 4.   Settle vs Fight Decision Framework
 * 5.   Small Claims Court Defense Guide
 * 6.   Deadline Tracking Timeline
 */

import { Document, Text, View } from "@react-pdf/renderer";
import type { LandlordFormData } from "@/types/landlord";
import type { StateRules } from "@/lib/state-rules";
import {
  PleadingPage,
  NumberedParagraph,
  SubParagraph,
  CheckboxItem,
  SignatureBlock,
  pleadingStyles,
} from "./shared";

interface LandlordResponseKitProps {
  data: LandlordFormData;
  stateRules: StateRules;
  generatedDate?: Date;
}

// Helper functions
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

export function LandlordResponseKit({
  data,
  stateRules,
  generatedDate = new Date(),
}: LandlordResponseKitProps) {
  const demandDate = new Date(data.demandLetterDate);
  const responseDeadline = addDays(demandDate, 14); // Standard 14-day response
  const depositAmount = data.depositAmount || 0;
  const amountReturned = data.amountReturned || 0;
  const totalDeductions = data.deductions.reduce((sum, d) => sum + d.amount, 0);

  // Calculate landlord's exposure
  const exposureMultiplier = stateRules.damagesMultiplier;
  const maxExposure =
    depositAmount * exposureMultiplier + stateRules.filingFee.max;

  // Build addresses
  const propertyAddress = `${data.property.address}${data.property.unit ? `, ${data.property.unit}` : ""}, ${data.property.city}, ${data.property.state} ${data.property.zip}`;

  let paragraphNum = 0;
  const nextParagraph = () => ++paragraphNum;

  return (
    <Document>
      {/* ========== PAGE 1: RESPONSE LETTER ========== */}
      <PleadingPage pageNumber={1} totalPages={6}>
        {/* Header */}
        <Text style={pleadingStyles.certifiedMailHeader}>
          LANDLORD RESPONSE TO SECURITY DEPOSIT DEMAND
        </Text>

        <Text style={pleadingStyles.dateLine}>{formatDate(generatedDate)}</Text>

        {/* Tenant Address */}
        <View style={pleadingStyles.addressBlock}>
          <Text style={pleadingStyles.addressLine}>{data.tenant.name}</Text>
          {data.tenant.currentAddress && (
            <>
              <Text style={pleadingStyles.addressLine}>
                {data.tenant.currentAddress}
              </Text>
              <Text style={pleadingStyles.addressLine}>
                {data.tenant.city}, {data.tenant.state} {data.tenant.zip}
              </Text>
            </>
          )}
        </View>

        {/* RE Lines */}
        <View style={pleadingStyles.reLine}>
          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            <Text style={[pleadingStyles.reLineLabel, { width: 50 }]}>RE:</Text>
            <Text style={pleadingStyles.bold}>
              RESPONSE TO SECURITY DEPOSIT DEMAND
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            <Text style={{ width: 50 }} />
            <Text>Property: {propertyAddress}</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            <Text style={{ width: 50 }} />
            <Text>
              Your Demand Dated:{" "}
              <Text style={pleadingStyles.bold}>{formatDate(demandDate)}</Text>
            </Text>
          </View>
        </View>

        <Text style={pleadingStyles.salutation}>Dear {data.tenant.name}:</Text>

        {/* Opening - Acknowledges without admitting */}
        <NumberedParagraph number={nextParagraph()}>
          <Text style={pleadingStyles.bodyText}>
            I am in receipt of your correspondence dated {formatDate(demandDate)}{" "}
            regarding the security deposit for the property located at{" "}
            <Text style={pleadingStyles.bold}>{propertyAddress}</Text>. This
            letter constitutes my formal response.
          </Text>
        </NumberedParagraph>

        {/* Position Statement */}
        <NumberedParagraph number={nextParagraph()}>
          <Text style={[pleadingStyles.bodyText, pleadingStyles.bold]}>
            POSITION STATEMENT:
          </Text>
          <Text style={pleadingStyles.bodyText}>
            I have reviewed your demand and the applicable provisions of{" "}
            <Text style={pleadingStyles.citation}>
              {stateRules.statuteTitle}
            </Text>
            .
            {data.itemizedListSent
              ? ` An itemized statement of deductions was provided on ${data.itemizedListDate ? formatDate(new Date(data.itemizedListDate)) : "[date]"}.`
              : " I am providing the itemization of deductions with this response."}
          </Text>
        </NumberedParagraph>

        {/* Deductions Summary */}
        {data.deductions.length > 0 && (
          <NumberedParagraph number={nextParagraph()}>
            <Text style={[pleadingStyles.bodyText, pleadingStyles.bold]}>
              ITEMIZED DEDUCTIONS:
            </Text>
            <Text style={pleadingStyles.bodyText}>
              The following deductions were made from your{" "}
              {formatCurrency(depositAmount)} security deposit:
            </Text>
          </NumberedParagraph>
        )}

        {/* Deductions Table */}
        {data.deductions.length > 0 && (
          <View style={pleadingStyles.table}>
            <View style={pleadingStyles.tableHeader}>
              <Text style={[pleadingStyles.tableCellHeader, { width: "50%" }]}>
                DESCRIPTION
              </Text>
              <Text style={[pleadingStyles.tableCellHeader, { width: "25%" }]}>
                CATEGORY
              </Text>
              <Text
                style={[
                  pleadingStyles.tableCellHeader,
                  { width: "25%", borderRightWidth: 0 },
                ]}
              >
                AMOUNT
              </Text>
            </View>
            {data.deductions.map((deduction, index) => (
              <View
                key={deduction.id}
                style={
                  index === data.deductions.length - 1
                    ? pleadingStyles.tableRowLast
                    : pleadingStyles.tableRow
                }
              >
                <Text style={[pleadingStyles.tableCell, { width: "50%" }]}>
                  {deduction.description}
                </Text>
                <Text style={[pleadingStyles.tableCell, { width: "25%" }]}>
                  {deduction.category.charAt(0).toUpperCase() +
                    deduction.category.slice(1).replace("_", " ")}
                </Text>
                <Text style={[pleadingStyles.tableCellLast, { width: "25%" }]}>
                  {formatCurrency(deduction.amount)}
                </Text>
              </View>
            ))}
            <View style={pleadingStyles.tableRowLast}>
              <Text
                style={[
                  pleadingStyles.tableCell,
                  { width: "50%", fontFamily: "Times-Bold" },
                ]}
              >
                TOTAL DEDUCTIONS
              </Text>
              <Text style={[pleadingStyles.tableCell, { width: "25%" }]} />
              <Text
                style={[
                  pleadingStyles.tableCellLast,
                  { width: "25%", fontFamily: "Times-Bold" },
                ]}
              >
                {formatCurrency(totalDeductions)}
              </Text>
            </View>
          </View>
        )}
      </PleadingPage>

      {/* ========== PAGE 2: RESPONSE LETTER CONTINUED ========== */}
      <PleadingPage pageNumber={2} totalPages={6}>
        {/* Documentation Statement */}
        <NumberedParagraph number={nextParagraph()}>
          <Text style={[pleadingStyles.bodyText, pleadingStyles.bold]}>
            SUPPORTING DOCUMENTATION:
          </Text>
          <Text style={pleadingStyles.bodyText}>
            Documentation supporting these deductions includes:
          </Text>
        </NumberedParagraph>

        <View style={{ marginLeft: 36, marginBottom: 16 }}>
          {data.deductions
            .filter((d) => d.hasDocumentation)
            .map((deduction) => (
              <CheckboxItem key={deduction.id} checked={true}>
                {deduction.description}:{" "}
                {deduction.documentationType || "Documentation on file"}
              </CheckboxItem>
            ))}
          {data.deductions.filter((d) => d.hasDocumentation).length === 0 && (
            <CheckboxItem checked={false}>
              Move-in/move-out inspection reports
            </CheckboxItem>
          )}
        </View>

        {/* Balance Statement */}
        <NumberedParagraph number={nextParagraph()}>
          <Text style={pleadingStyles.bodyText}>
            Based on the above itemization:
          </Text>
          <SubParagraph letter="a">
            Original Security Deposit: {formatCurrency(depositAmount)}
          </SubParagraph>
          <SubParagraph letter="b">
            Total Lawful Deductions: {formatCurrency(totalDeductions)}
          </SubParagraph>
          <SubParagraph letter="c">
            {amountReturned > 0
              ? `Amount Previously Returned: ${formatCurrency(amountReturned)}`
              : `Amount Due to Tenant: ${formatCurrency(Math.max(0, depositAmount - totalDeductions))}`}
          </SubParagraph>
        </NumberedParagraph>

        {/* Closing - Professional, non-combative */}
        <NumberedParagraph number={nextParagraph()}>
          <Text style={pleadingStyles.bodyText}>
            I believe the deductions outlined above are lawful and properly
            documented pursuant to {stateRules.name} law. However, I am open to
            discussing this matter further to reach a mutually acceptable
            resolution.
          </Text>
        </NumberedParagraph>

        <Text style={[pleadingStyles.bodyText, { marginTop: 12 }]}>
          Please respond within fourteen (14) days if you wish to discuss this
          matter further.
        </Text>

        <Text style={[pleadingStyles.bodyText, { marginTop: 12 }]}>
          Respectfully,
        </Text>

        <SignatureBlock
          name={data.landlord.name}
          address={data.landlord.address}
          city={data.landlord.city}
          state={data.landlord.state}
          zip={data.landlord.zip}
          email={data.landlord.email}
          phone={data.landlord.phone}
          showDate={false}
        />
      </PleadingPage>

      {/* ========== PAGE 3: DEDUCTION DOCUMENTATION CHECKLIST ========== */}
      <PleadingPage pageNumber={3} totalPages={6}>
        <Text style={pleadingStyles.documentTitle}>
          DEDUCTION DOCUMENTATION CHECKLIST
        </Text>
        <Text
          style={[
            pleadingStyles.bodyTextSingle,
            { textAlign: "center", marginBottom: 24 },
          ]}
        >
          Evidence Required to Justify Security Deposit Deductions
        </Text>

        <Text style={pleadingStyles.sectionHeader}>CLEANING DEDUCTIONS</Text>
        <View style={{ marginLeft: 24, marginBottom: 16 }}>
          <CheckboxItem checked={false}>
            Move-in inspection photos (dated)
          </CheckboxItem>
          <CheckboxItem checked={false}>
            Move-out inspection photos (dated)
          </CheckboxItem>
          <CheckboxItem checked={false}>
            Cleaning service invoice/receipt
          </CheckboxItem>
          <CheckboxItem checked={false}>
            Itemized cleaning costs (not &quot;cleaning fee&quot;)
          </CheckboxItem>
        </View>

        <Text style={pleadingStyles.sectionHeader}>REPAIR DEDUCTIONS</Text>
        <View style={{ marginLeft: 24, marginBottom: 16 }}>
          <CheckboxItem checked={false}>
            Photos of damage (before repair)
          </CheckboxItem>
          <CheckboxItem checked={false}>Contractor invoice or receipt</CheckboxItem>
          <CheckboxItem checked={false}>
            Proof damage exceeds normal wear and tear
          </CheckboxItem>
          <CheckboxItem checked={false}>
            Age of item being repaired/replaced
          </CheckboxItem>
        </View>

        <Text style={pleadingStyles.sectionHeader}>UNPAID RENT</Text>
        <View style={{ marginLeft: 24, marginBottom: 16 }}>
          <CheckboxItem checked={false}>Lease showing rent amount</CheckboxItem>
          <CheckboxItem checked={false}>
            Payment ledger showing missed payments
          </CheckboxItem>
          <CheckboxItem checked={false}>
            Notice of rent due (if sent)
          </CheckboxItem>
        </View>

        <Text style={pleadingStyles.sectionHeader}>
          DAMAGES BEYOND WEAR AND TEAR
        </Text>
        <View style={{ marginLeft: 24, marginBottom: 16 }}>
          <CheckboxItem checked={false}>
            Definition of &quot;normal wear and tear&quot; for your state
          </CheckboxItem>
          <CheckboxItem checked={false}>
            Comparison photos (move-in vs move-out)
          </CheckboxItem>
          <CheckboxItem checked={false}>
            Professional assessment if needed
          </CheckboxItem>
        </View>

        <View style={pleadingStyles.infoBox}>
          <Text style={pleadingStyles.infoBoxTitle}>
            WHAT YOU CANNOT DEDUCT
          </Text>
          <Text style={pleadingStyles.infoBoxText}>
            {"\u2022"} Normal wear and tear (faded paint, worn carpet, minor scuffs)
            {"\n"}
            {"\u2022"} Pre-existing conditions documented at move-in
            {"\n"}
            {"\u2022"} Repairs needed due to property age, not tenant damage
            {"\n"}
            {"\u2022"} Costs that exceed actual repair/replacement value
            {"\n"}
            {"\u2022"} &quot;Cleaning fees&quot; without itemization
          </Text>
        </View>
      </PleadingPage>

      {/* ========== PAGE 4: SETTLE VS FIGHT DECISION FRAMEWORK ========== */}
      <PleadingPage pageNumber={4} totalPages={6}>
        <Text style={pleadingStyles.documentTitle}>
          SETTLE VS FIGHT DECISION FRAMEWORK
        </Text>
        <Text
          style={[
            pleadingStyles.bodyTextSingle,
            { textAlign: "center", marginBottom: 24 },
          ]}
        >
          When to Negotiate, Refund, or Prepare for Court
        </Text>

        <Text style={pleadingStyles.sectionHeader}>YOUR CURRENT EXPOSURE</Text>
        <View style={pleadingStyles.table}>
          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "60%" }]}>
              Deposit Amount
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "40%" }]}>
              {formatCurrency(depositAmount)}
            </Text>
          </View>
          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "60%" }]}>
              Potential Damages ({exposureMultiplier}x in {stateRules.code})
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "40%" }]}>
              {formatCurrency(depositAmount * exposureMultiplier)}
            </Text>
          </View>
          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "60%" }]}>
              Court Costs (if you lose)
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
              MAXIMUM EXPOSURE
            </Text>
            <Text
              style={[
                pleadingStyles.tableCellLast,
                { width: "40%", fontFamily: "Times-Bold" },
              ]}
            >
              {formatCurrency(maxExposure)}
            </Text>
          </View>
        </View>

        <Text style={pleadingStyles.sectionHeader}>DECISION MATRIX</Text>

        <View style={{ marginBottom: 16 }}>
          <Text style={[pleadingStyles.bodyTextSingle, pleadingStyles.bold]}>
            SETTLE (Return deposit or negotiate) if:
          </Text>
          <View style={{ marginLeft: 24 }}>
            <CheckboxItem checked={false}>
              You missed the statutory deadline for returning deposit or sending
              itemization
            </CheckboxItem>
            <CheckboxItem checked={false}>
              Your deductions lack proper documentation
            </CheckboxItem>
            <CheckboxItem checked={false}>
              The disputed amount is less than {formatCurrency(500)} (not worth
              court time)
            </CheckboxItem>
            <CheckboxItem checked={false}>
              Your deductions include &quot;normal wear and tear&quot; items
            </CheckboxItem>
          </View>
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={[pleadingStyles.bodyTextSingle, pleadingStyles.bold]}>
            FIGHT (Defend your position) if:
          </Text>
          <View style={{ marginLeft: 24 }}>
            <CheckboxItem checked={false}>
              You have strong documentation (photos, receipts, inspections)
            </CheckboxItem>
            <CheckboxItem checked={false}>
              You complied with all statutory deadlines
            </CheckboxItem>
            <CheckboxItem checked={false}>
              The damage clearly exceeds normal wear and tear
            </CheckboxItem>
            <CheckboxItem checked={false}>
              The tenant&apos;s claims are factually inaccurate
            </CheckboxItem>
          </View>
        </View>

        <View style={pleadingStyles.infoBox}>
          <Text style={pleadingStyles.infoBoxTitle}>SETTLEMENT TIP</Text>
          <Text style={pleadingStyles.infoBoxText}>
            If you decide to settle, get the tenant to sign a release of all
            claims before transferring any money. A simple release prevents them
            from accepting your payment and still filing suit.
          </Text>
        </View>
      </PleadingPage>

      {/* ========== PAGE 5: SMALL CLAIMS COURT DEFENSE GUIDE ========== */}
      <PleadingPage pageNumber={5} totalPages={6}>
        <Text style={pleadingStyles.documentTitle}>
          SMALL CLAIMS COURT DEFENSE GUIDE
        </Text>
        <Text
          style={[
            pleadingStyles.bodyTextSingle,
            { textAlign: "center", marginBottom: 24 },
          ]}
        >
          {stateRules.name} {stateRules.courtName || "Small Claims Court"}
        </Text>

        <Text style={pleadingStyles.sectionHeader}>
          IF THE TENANT FILES SUIT
        </Text>
        <NumberedParagraph number={1}>
          <Text style={pleadingStyles.bodyTextSingle}>
            <Text style={pleadingStyles.bold}>File your response on time:</Text>{" "}
            You typically have 14-30 days after being served to file an answer.
            Missing this deadline can result in a default judgment against you.
          </Text>
        </NumberedParagraph>

        <NumberedParagraph number={2}>
          <Text style={pleadingStyles.bodyTextSingle}>
            <Text style={pleadingStyles.bold}>Gather your evidence:</Text>{" "}
            Organize all documentation chronologically. Make 3 copies of
            everything (one for you, one for the court, one for the tenant).
          </Text>
        </NumberedParagraph>

        <NumberedParagraph number={3}>
          <Text style={pleadingStyles.bodyTextSingle}>
            <Text style={pleadingStyles.bold}>Prepare your testimony:</Text>{" "}
            Practice explaining your deductions clearly and concisely. Judges
            have limited time — get to the point.
          </Text>
        </NumberedParagraph>

        <Text style={pleadingStyles.sectionHeader}>WHAT JUDGES LOOK FOR</Text>
        <View style={{ marginLeft: 24, marginBottom: 16 }}>
          <CheckboxItem checked={false}>
            Did you comply with statutory deadlines?
          </CheckboxItem>
          <CheckboxItem checked={false}>
            Did you provide proper itemization?
          </CheckboxItem>
          <CheckboxItem checked={false}>
            Are deductions reasonable and documented?
          </CheckboxItem>
          <CheckboxItem checked={false}>
            Can you prove damage vs. normal wear and tear?
          </CheckboxItem>
          <CheckboxItem checked={false}>Did you act in good faith?</CheckboxItem>
        </View>

        <Text style={pleadingStyles.sectionHeader}>
          COMMON LANDLORD MISTAKES TO AVOID
        </Text>
        <View style={{ marginLeft: 24, marginBottom: 16 }}>
          <Text style={pleadingStyles.bodyTextSingle}>
            {"\u2022"} Claiming &quot;cleaning fee&quot; without itemizing actual cleaning costs
          </Text>
          <Text style={pleadingStyles.bodyTextSingle}>
            {"\u2022"} Deducting for pre-existing conditions (document move-in condition!)
          </Text>
          <Text style={pleadingStyles.bodyTextSingle}>
            {"\u2022"} Missing the statutory deadline for itemization
          </Text>
          <Text style={pleadingStyles.bodyTextSingle}>
            {"\u2022"} Not using certified mail when required by state law
          </Text>
          <Text style={pleadingStyles.bodyTextSingle}>
            {"\u2022"} Charging full replacement cost for used items
          </Text>
        </View>

        <View style={pleadingStyles.infoBox}>
          <Text style={pleadingStyles.infoBoxTitle}>COURT JURISDICTION</Text>
          <Text style={pleadingStyles.infoBoxText}>
            {stateRules.courtName || "Small Claims Court"} handles claims up to{" "}
            {formatCurrency(stateRules.maxSmallClaims)}. Filing fees range from{" "}
            {formatCurrency(stateRules.filingFee.min)} to{" "}
            {formatCurrency(stateRules.filingFee.max)}.
          </Text>
        </View>
      </PleadingPage>

      {/* ========== PAGE 6: DEADLINE TRACKING TIMELINE ========== */}
      <PleadingPage pageNumber={6} totalPages={6}>
        <Text style={pleadingStyles.documentTitle}>
          DEADLINE TRACKING TIMELINE
        </Text>
        <Text
          style={[
            pleadingStyles.bodyTextSingle,
            { textAlign: "center", marginBottom: 24 },
          ]}
        >
          Critical Dates for {stateRules.name} Landlords
        </Text>

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
              STATUS
            </Text>
          </View>

          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "35%" }]}>
              {formatDate(demandDate)}
            </Text>
            <Text style={[pleadingStyles.tableCell, { width: "50%" }]}>
              Demand letter received
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "15%" }]}>
              Done
            </Text>
          </View>

          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "35%" }]}>
              {formatDate(responseDeadline)}
            </Text>
            <Text
              style={[
                pleadingStyles.tableCell,
                { width: "50%", fontFamily: "Times-Bold" },
              ]}
            >
              Recommended response deadline
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "15%" }]}>
              Pending
            </Text>
          </View>

          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "35%" }]}>
              {formatDate(addDays(demandDate, 30))}
            </Text>
            <Text style={[pleadingStyles.tableCell, { width: "50%" }]}>
              Tenant may file suit after this date
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "15%" }]}>
              —
            </Text>
          </View>

          <View style={pleadingStyles.tableRowLast}>
            <Text style={[pleadingStyles.tableCell, { width: "35%" }]}>
              {formatDate(addDays(demandDate, 45))}
            </Text>
            <Text style={[pleadingStyles.tableCell, { width: "50%" }]}>
              Typical court date if suit filed
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "15%" }]}>
              —
            </Text>
          </View>
        </View>

        <Text style={pleadingStyles.sectionHeader}>
          NEXT STEPS IF TENANT IGNORES YOUR RESPONSE
        </Text>
        <View style={{ marginLeft: 24, marginBottom: 16 }}>
          <Text style={pleadingStyles.bodyTextSingle}>
            1. Keep a copy of your response letter with proof of mailing
          </Text>
          <Text style={pleadingStyles.bodyTextSingle}>
            2. Document that no further communication was received
          </Text>
          <Text style={pleadingStyles.bodyTextSingle}>
            3. If they file suit later, you have evidence you responded in good
            faith
          </Text>
        </View>

        <Text style={pleadingStyles.sectionHeader}>
          NEXT STEPS IF TENANT ESCALATES
        </Text>
        <View style={{ marginLeft: 24, marginBottom: 16 }}>
          <Text style={pleadingStyles.bodyTextSingle}>
            1. Do not ignore court summons — respond by the deadline
          </Text>
          <Text style={pleadingStyles.bodyTextSingle}>
            2. Consider whether settlement makes financial sense (see Page 4)
          </Text>
          <Text style={pleadingStyles.bodyTextSingle}>
            3. Prepare your evidence package (see Page 3)
          </Text>
        </View>

        <View
          style={{
            marginTop: 36,
            paddingTop: 24,
            borderTopWidth: 1,
            borderTopColor: "#cccccc",
          }}
        >
          <Text
            style={[
              pleadingStyles.bodyTextSingle,
              pleadingStyles.italic,
              { textAlign: "center" },
            ]}
          >
            This document was prepared using DepositReady.co
          </Text>
          <Text
            style={[
              pleadingStyles.bodyTextSingle,
              pleadingStyles.italic,
              { textAlign: "center", marginTop: 8 },
            ]}
          >
            This kit does not constitute legal advice. Consult a licensed
            attorney for complex legal matters.
          </Text>
        </View>
      </PleadingPage>
    </Document>
  );
}
