/**
 * PM Deposit Disposition Packet
 *
 * A 6-page PDF for property managers to comply with FL §83.49(3)(a).
 * Pages:
 * 1.   Cover Page
 * 2-3. Notice of Intent to Impose Claim on Security Deposit
 * 4.   Itemized Deductions Statement
 * 5.   Evidence Checklist
 * 6.   Certified Mail Instructions + Deadline Timeline
 */

import { Document, Text, View } from "@react-pdf/renderer";
import type { PMFormData } from "@/types/pm";
import { PM_DEDUCTION_CATEGORY_LABELS, PM_EVIDENCE_TYPE_LABELS } from "@/types/pm";
import type { StateRules } from "@/lib/state-rules";
import {
  PleadingPage,
  NumberedParagraph,
  SubParagraph,
  CheckboxItem,
  SignatureBlock,
  CertificateOfService,
  pleadingStyles,
} from "./shared";

interface PMDispositionPacketProps {
  data: PMFormData;
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

export function PMDispositionPacket({
  data,
  stateRules,
  generatedDate = new Date(),
}: PMDispositionPacketProps) {
  const moveOutDate = new Date(data.moveOutDate);
  const returnDeadline = addDays(moveOutDate, stateRules.returnDeadline);
  const claimDeadline = addDays(moveOutDate, stateRules.claimDeadline);
  const depositAmount = data.depositAmount || 0;
  const totalDeductions = data.deductions.reduce((sum, d) => sum + d.amount, 0);
  const amountToReturn = Math.max(0, depositAmount - totalDeductions);

  const propertyAddress = `${data.property.address}${data.property.unit ? `, Unit ${data.property.unit}` : ""}, ${data.property.city}, ${data.property.state} ${data.property.zip}`;
  const tenantAddress = `${data.tenant.forwardingAddress}, ${data.tenant.city}, ${data.tenant.state} ${data.tenant.zip}`;
  const companyAddress = `${data.company.address}, ${data.company.city}, ${data.company.state} ${data.company.zip}`;

  let paragraphNum = 0;
  const nextParagraph = () => ++paragraphNum;

  // Group deductions by category
  const deductionsByCategory = data.deductions.reduce((acc, d) => {
    if (!acc[d.category]) acc[d.category] = [];
    acc[d.category].push(d);
    return acc;
  }, {} as Record<string, typeof data.deductions>);

  return (
    <Document>
      {/* ========== PAGE 1: COVER PAGE ========== */}
      <PleadingPage pageNumber={1} totalPages={6} showLineNumbers={false}>
        <View style={{ marginTop: 60, marginBottom: 40 }}>
          <Text style={[pleadingStyles.documentTitle, { fontSize: 18, marginBottom: 8 }]}>
            SECURITY DEPOSIT
          </Text>
          <Text style={[pleadingStyles.documentTitle, { fontSize: 18, marginTop: 0 }]}>
            DISPOSITION NOTICE PACKET
          </Text>
        </View>

        <View style={{ marginBottom: 32 }}>
          <Text style={[pleadingStyles.bodyTextSingle, { textAlign: "center" }]}>
            Prepared in Compliance with {stateRules.statuteTitle}
          </Text>
        </View>

        <View style={pleadingStyles.table}>
          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCellHeader, { width: "35%" }]}>
              PROPERTY
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "65%" }]}>
              {propertyAddress}
            </Text>
          </View>
          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCellHeader, { width: "35%" }]}>
              TENANT
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "65%" }]}>
              {data.tenant.name}
            </Text>
          </View>
          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCellHeader, { width: "35%" }]}>
              MOVE-OUT DATE
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "65%" }]}>
              {formatDate(moveOutDate)}
            </Text>
          </View>
          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCellHeader, { width: "35%" }]}>
              DEPOSIT AMOUNT
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "65%" }]}>
              {formatCurrency(depositAmount)}
            </Text>
          </View>
          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCellHeader, { width: "35%" }]}>
              TOTAL DEDUCTIONS
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "65%" }]}>
              {formatCurrency(totalDeductions)}
            </Text>
          </View>
          <View style={pleadingStyles.tableRowLast}>
            <Text style={[pleadingStyles.tableCellHeader, { width: "35%" }]}>
              AMOUNT TO RETURN
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "65%", fontFamily: "Times-Bold" }]}>
              {formatCurrency(amountToReturn)}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 24, marginBottom: 24 }}>
          <Text style={[pleadingStyles.sectionHeader, { textAlign: "center" }]}>
            TABLE OF CONTENTS
          </Text>
          <View style={{ marginLeft: 48 }}>
            <Text style={pleadingStyles.bodyTextSingle}>
              Pages 2-3 ... Notice of Intent to Impose Claim on Security Deposit
            </Text>
            <Text style={pleadingStyles.bodyTextSingle}>
              Page 4 ..... Itemized Deductions Statement
            </Text>
            <Text style={pleadingStyles.bodyTextSingle}>
              Page 5 ..... Evidence Documentation Checklist
            </Text>
            <Text style={pleadingStyles.bodyTextSingle}>
              Page 6 ..... Certified Mail Instructions & Deadline Timeline
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 24, marginBottom: 24 }}>
          <Text style={[pleadingStyles.bodyTextSingle, { textAlign: "center", fontFamily: "Times-Bold" }]}>
            Prepared by: {data.company.companyName}
          </Text>
          <Text style={[pleadingStyles.bodyTextSingle, { textAlign: "center" }]}>
            {data.company.managerName} | {data.company.phone} | {data.company.email}
          </Text>
          <Text style={[pleadingStyles.bodyTextSingle, { textAlign: "center" }]}>
            {companyAddress}
          </Text>
        </View>

        <View style={pleadingStyles.infoBox}>
          <Text style={pleadingStyles.infoBoxTitle}>IMPORTANT NOTICE</Text>
          <Text style={pleadingStyles.infoBoxText}>
            This packet was generated using DepositReady.co and does not constitute
            legal advice. The templates are based on {stateRules.statuteTitle} and
            should be reviewed for accuracy before sending. Consult a licensed attorney
            for complex legal matters. Send all notices via certified mail, return
            receipt requested, to the tenant&apos;s last known mailing address.
          </Text>
        </View>

        <Text style={[pleadingStyles.bodyTextSingle, { textAlign: "center", marginTop: 16 }]}>
          Generated: {formatDate(generatedDate)}
        </Text>
      </PleadingPage>

      {/* ========== PAGE 2: NOTICE OF INTENT TO IMPOSE CLAIM ========== */}
      <PleadingPage pageNumber={2} totalPages={6}>
        <Text style={pleadingStyles.certifiedMailHeader}>
          SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED
        </Text>

        <Text style={pleadingStyles.dateLine}>{formatDate(generatedDate)}</Text>

        {/* Tenant Address */}
        <View style={pleadingStyles.addressBlock}>
          <Text style={pleadingStyles.addressLine}>{data.tenant.name}</Text>
          <Text style={pleadingStyles.addressLine}>
            {data.tenant.forwardingAddress}
          </Text>
          <Text style={pleadingStyles.addressLine}>
            {data.tenant.city}, {data.tenant.state} {data.tenant.zip}
          </Text>
        </View>

        {/* RE Lines */}
        <View style={pleadingStyles.reLine}>
          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            <Text style={[pleadingStyles.reLineLabel, { width: 50 }]}>RE:</Text>
            <Text style={pleadingStyles.bold}>
              NOTICE OF INTENT TO IMPOSE CLAIM ON SECURITY DEPOSIT
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            <Text style={{ width: 50 }} />
            <Text>Property: {propertyAddress}</Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            <Text style={{ width: 50 }} />
            <Text>
              Security Deposit:{" "}
              <Text style={pleadingStyles.bold}>{formatCurrency(depositAmount)}</Text>
            </Text>
          </View>
        </View>

        <Text style={pleadingStyles.salutation}>Dear {data.tenant.name}:</Text>

        {/* Opening paragraph with statutory authority */}
        <NumberedParagraph number={nextParagraph()}>
          <Text style={pleadingStyles.bodyText}>
            Pursuant to{" "}
            <Text style={pleadingStyles.citation}>
              {stateRules.statuteTitle}
            </Text>
            , this letter serves as formal written notice of my intention to impose
            a claim on your security deposit for the property located at{" "}
            <Text style={pleadingStyles.bold}>{propertyAddress}</Text>.
            Your tenancy ended on {formatDate(moveOutDate)}.
          </Text>
        </NumberedParagraph>

        {/* Statutory basis */}
        <NumberedParagraph number={nextParagraph()}>
          <Text style={[pleadingStyles.bodyText, pleadingStyles.bold]}>
            STATUTORY BASIS:
          </Text>
          <Text style={[pleadingStyles.citation, { fontSize: 11, lineHeight: 1.5, marginLeft: 12 }]}>
            &quot;{stateRules.statutoryLanguage.deadlineClause}&quot;
          </Text>
        </NumberedParagraph>

        {/* Deductions summary */}
        <NumberedParagraph number={nextParagraph()}>
          <Text style={[pleadingStyles.bodyText, pleadingStyles.bold]}>
            ITEMIZED CLAIM:
          </Text>
          <Text style={pleadingStyles.bodyText}>
            The following deductions are being claimed against your{" "}
            {formatCurrency(depositAmount)} security deposit:
          </Text>
        </NumberedParagraph>

        {/* Deductions table */}
        {data.deductions.length > 0 && (
          <View style={pleadingStyles.table}>
            <View style={pleadingStyles.tableHeader}>
              <Text style={[pleadingStyles.tableCellHeader, { width: "45%" }]}>
                DESCRIPTION
              </Text>
              <Text style={[pleadingStyles.tableCellHeader, { width: "25%" }]}>
                CATEGORY
              </Text>
              <Text
                style={[pleadingStyles.tableCellHeader, { width: "30%", borderRightWidth: 0 }]}
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
                <Text style={[pleadingStyles.tableCell, { width: "45%" }]}>
                  {deduction.description}
                </Text>
                <Text style={[pleadingStyles.tableCell, { width: "25%" }]}>
                  {PM_DEDUCTION_CATEGORY_LABELS[deduction.category]}
                </Text>
                <Text style={[pleadingStyles.tableCellLast, { width: "30%" }]}>
                  {formatCurrency(deduction.amount)}
                </Text>
              </View>
            ))}
            <View style={[pleadingStyles.tableRowLast, { borderTopWidth: 2, borderTopColor: "#000000" }]}>
              <Text
                style={[pleadingStyles.tableCell, { width: "45%", fontFamily: "Times-Bold" }]}
              >
                TOTAL DEDUCTIONS
              </Text>
              <Text style={[pleadingStyles.tableCell, { width: "25%" }]} />
              <Text
                style={[pleadingStyles.tableCellLast, { width: "30%", fontFamily: "Times-Bold" }]}
              >
                {formatCurrency(totalDeductions)}
              </Text>
            </View>
          </View>
        )}
      </PleadingPage>

      {/* ========== PAGE 3: NOTICE CONTINUED ========== */}
      <PleadingPage pageNumber={3} totalPages={6}>
        {/* Balance calculation */}
        <NumberedParagraph number={nextParagraph()}>
          <Text style={[pleadingStyles.bodyText, pleadingStyles.bold]}>
            DEPOSIT ACCOUNTING:
          </Text>
          <SubParagraph letter="a">
            Original Security Deposit: {formatCurrency(depositAmount)}
          </SubParagraph>
          <SubParagraph letter="b">
            Total Lawful Deductions: {formatCurrency(totalDeductions)}
          </SubParagraph>
          <SubParagraph letter="c">
            {amountToReturn > 0
              ? `Balance Due to Tenant: ${formatCurrency(amountToReturn)}`
              : `No balance due to tenant. Deductions equal or exceed deposit amount.`}
          </SubParagraph>
        </NumberedParagraph>

        {amountToReturn > 0 && (
          <NumberedParagraph number={nextParagraph()}>
            <Text style={pleadingStyles.bodyText}>
              A check in the amount of {formatCurrency(amountToReturn)} is enclosed
              herewith, representing the balance of your security deposit after lawful
              deductions.
            </Text>
          </NumberedParagraph>
        )}

        {/* Tenant's right to object */}
        <NumberedParagraph number={nextParagraph()}>
          <Text style={[pleadingStyles.bodyText, pleadingStyles.bold]}>
            YOUR RIGHT TO OBJECT:
          </Text>
          <Text style={pleadingStyles.bodyText}>
            Pursuant to {stateRules.statuteTitle}, you have fifteen (15) days from
            the date of receipt of this notice to object to the claim. If you do not
            object within 15 days after receipt of this notice, the landlord may then
            deduct the amount of the claim and shall remit the balance of the deposit,
            if any, to you within thirty (30) days after the date of this notice.
          </Text>
        </NumberedParagraph>

        {/* Objection instructions */}
        <NumberedParagraph number={nextParagraph()}>
          <Text style={pleadingStyles.bodyText}>
            If you wish to object to this claim, you must do so in writing and send
            your objection to the address below within the fifteen (15) day period:
          </Text>
        </NumberedParagraph>

        <View style={{ marginLeft: 48, marginBottom: 16 }}>
          <Text style={pleadingStyles.bodyTextSingle}>{data.company.companyName}</Text>
          <Text style={pleadingStyles.bodyTextSingle}>
            Attn: {data.company.managerName}
          </Text>
          <Text style={pleadingStyles.bodyTextSingle}>{data.company.address}</Text>
          <Text style={pleadingStyles.bodyTextSingle}>
            {data.company.city}, {data.company.state} {data.company.zip}
          </Text>
        </View>

        {/* Supporting documentation reference */}
        <NumberedParagraph number={nextParagraph()}>
          <Text style={pleadingStyles.bodyText}>
            Supporting documentation for the above deductions, including photographs,
            receipts, and inspection reports, is available upon request. Please see the
            enclosed Itemized Deductions Statement (Page 4) for additional detail.
          </Text>
        </NumberedParagraph>

        <Text style={[pleadingStyles.bodyText, { marginTop: 12 }]}>
          Sincerely,
        </Text>

        <SignatureBlock
          name={data.company.managerName}
          address={data.company.address}
          city={data.company.city}
          state={data.company.state}
          zip={data.company.zip}
          email={data.company.email}
          phone={data.company.phone}
          showDate={false}
        />

        <View style={{ marginTop: 12 }}>
          <Text style={[pleadingStyles.bodyTextSingle, pleadingStyles.bold]}>
            {data.company.companyName}
          </Text>
          {data.company.licenseNumber && (
            <Text style={pleadingStyles.bodyTextSingle}>
              License #: {data.company.licenseNumber}
            </Text>
          )}
        </View>
      </PleadingPage>

      {/* ========== PAGE 4: ITEMIZED DEDUCTIONS STATEMENT ========== */}
      <PleadingPage pageNumber={4} totalPages={6}>
        <Text style={pleadingStyles.documentTitle}>
          ITEMIZED DEDUCTIONS STATEMENT
        </Text>
        <Text
          style={[pleadingStyles.bodyTextSingle, { textAlign: "center", marginBottom: 24 }]}
        >
          Property: {propertyAddress} | Tenant: {data.tenant.name}
        </Text>

        {/* Detailed deductions by category */}
        {Object.entries(deductionsByCategory).map(([category, deductions]) => {
          const categoryTotal = deductions.reduce((sum, d) => sum + d.amount, 0);
          return (
            <View key={category} style={{ marginBottom: 16 }}>
              <Text style={pleadingStyles.sectionHeader}>
                {PM_DEDUCTION_CATEGORY_LABELS[category as keyof typeof PM_DEDUCTION_CATEGORY_LABELS] || category}
              </Text>
              <View style={pleadingStyles.table}>
                <View style={pleadingStyles.tableHeader}>
                  <Text style={[pleadingStyles.tableCellHeader, { width: "40%" }]}>
                    DESCRIPTION
                  </Text>
                  <Text style={[pleadingStyles.tableCellHeader, { width: "30%" }]}>
                    EVIDENCE
                  </Text>
                  <Text style={[pleadingStyles.tableCellHeader, { width: "30%", borderRightWidth: 0 }]}>
                    AMOUNT
                  </Text>
                </View>
                {deductions.map((d, idx) => (
                  <View
                    key={d.id}
                    style={
                      idx === deductions.length - 1
                        ? pleadingStyles.tableRowLast
                        : pleadingStyles.tableRow
                    }
                  >
                    <Text style={[pleadingStyles.tableCell, { width: "40%" }]}>
                      {d.description}
                    </Text>
                    <Text style={[pleadingStyles.tableCell, { width: "30%" }]}>
                      {d.evidenceType.length > 0
                        ? d.evidenceType.map((e) => PM_EVIDENCE_TYPE_LABELS[e]).join(", ")
                        : "N/A"}
                    </Text>
                    <Text style={[pleadingStyles.tableCellLast, { width: "30%" }]}>
                      {formatCurrency(d.amount)}
                    </Text>
                  </View>
                ))}
                <View style={[pleadingStyles.tableRowLast, { borderTopWidth: 1, borderTopColor: "#000000" }]}>
                  <Text style={[pleadingStyles.tableCell, { width: "40%", fontFamily: "Times-Bold" }]}>
                    Subtotal
                  </Text>
                  <Text style={[pleadingStyles.tableCell, { width: "30%" }]} />
                  <Text style={[pleadingStyles.tableCellLast, { width: "30%", fontFamily: "Times-Bold" }]}>
                    {formatCurrency(categoryTotal)}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}

        {/* Grand total */}
        <View style={[pleadingStyles.infoBox, { marginTop: 24 }]}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
            <Text style={[pleadingStyles.infoBoxText, pleadingStyles.bold]}>
              Security Deposit:
            </Text>
            <Text style={pleadingStyles.infoBoxText}>
              {formatCurrency(depositAmount)}
            </Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
            <Text style={[pleadingStyles.infoBoxText, pleadingStyles.bold]}>
              Total Deductions:
            </Text>
            <Text style={pleadingStyles.infoBoxText}>
              ({formatCurrency(totalDeductions)})
            </Text>
          </View>
          <View style={{ borderTopWidth: 1, borderTopColor: "#000000", paddingTop: 4, flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={[pleadingStyles.infoBoxText, pleadingStyles.bold]}>
              {amountToReturn > 0 ? "Balance Due to Tenant:" : "Amount Owed by Tenant:"}
            </Text>
            <Text style={[pleadingStyles.infoBoxText, pleadingStyles.bold]}>
              {amountToReturn > 0
                ? formatCurrency(amountToReturn)
                : formatCurrency(totalDeductions - depositAmount)}
            </Text>
          </View>
        </View>
      </PleadingPage>

      {/* ========== PAGE 5: EVIDENCE CHECKLIST ========== */}
      <PleadingPage pageNumber={5} totalPages={6}>
        <Text style={pleadingStyles.documentTitle}>
          EVIDENCE DOCUMENTATION CHECKLIST
        </Text>
        <Text
          style={[pleadingStyles.bodyTextSingle, { textAlign: "center", marginBottom: 24 }]}
        >
          Gather This Evidence to Support Your Deductions
        </Text>

        {/* Per-deduction evidence */}
        {Object.entries(deductionsByCategory).map(([category, deductions]) => (
          <View key={category} style={{ marginBottom: 16 }}>
            <Text style={pleadingStyles.sectionHeader}>
              {PM_DEDUCTION_CATEGORY_LABELS[category as keyof typeof PM_DEDUCTION_CATEGORY_LABELS] || category}
            </Text>
            {deductions.map((d) => (
              <View key={d.id} style={{ marginLeft: 12, marginBottom: 12 }}>
                <Text style={[pleadingStyles.bodyTextSingle, pleadingStyles.bold]}>
                  {d.description} — {formatCurrency(d.amount)}
                </Text>
                <View style={{ marginLeft: 12 }}>
                  {d.evidenceType.map((e) => (
                    <CheckboxItem key={e} checked={d.hasDocumentation}>
                      {PM_EVIDENCE_TYPE_LABELS[e]}
                    </CheckboxItem>
                  ))}
                  {d.evidenceType.length === 0 && (
                    <CheckboxItem checked={false}>
                      Documentation needed
                    </CheckboxItem>
                  )}
                </View>
              </View>
            ))}
          </View>
        ))}

        {/* General evidence items */}
        <Text style={pleadingStyles.sectionHeader}>GENERAL DOCUMENTATION</Text>
        <View style={{ marginLeft: 24, marginBottom: 16 }}>
          <CheckboxItem checked={false}>
            Signed lease agreement with security deposit clause
          </CheckboxItem>
          <CheckboxItem checked={false}>
            Move-in inspection report (dated and signed)
          </CheckboxItem>
          <CheckboxItem checked={false}>
            Move-out inspection report (dated and signed)
          </CheckboxItem>
          <CheckboxItem checked={false}>
            Move-in photos (dated)
          </CheckboxItem>
          <CheckboxItem checked={false}>
            Move-out photos (dated)
          </CheckboxItem>
          <CheckboxItem checked={false}>
            Rent payment ledger
          </CheckboxItem>
          <CheckboxItem checked={false}>
            All contractor invoices and receipts
          </CheckboxItem>
          <CheckboxItem checked={false}>
            Copy of this notice (keep for your records)
          </CheckboxItem>
        </View>

        <View style={pleadingStyles.infoBox}>
          <Text style={pleadingStyles.infoBoxTitle}>
            EVIDENCE TIPS
          </Text>
          <Text style={pleadingStyles.infoBoxText}>
            {"\u2022"} Photos should be date-stamped and clearly show the condition
            {"\n"}
            {"\u2022"} Invoices should itemize work performed, not just list a total
            {"\n"}
            {"\u2022"} You cannot deduct for normal wear and tear
            {"\n"}
            {"\u2022"} Keep originals; provide copies to the tenant if requested
            {"\n"}
            {"\u2022"} Organize evidence by deduction category for easy reference
          </Text>
        </View>
      </PleadingPage>

      {/* ========== PAGE 6: CERTIFIED MAIL INSTRUCTIONS + TIMELINE ========== */}
      <PleadingPage pageNumber={6} totalPages={6}>
        <Text style={pleadingStyles.documentTitle}>
          CERTIFIED MAIL INSTRUCTIONS & DEADLINE TIMELINE
        </Text>

        <Text style={pleadingStyles.sectionHeader}>
          HOW TO SEND THIS NOTICE
        </Text>
        <View style={{ marginLeft: 24, marginBottom: 16 }}>
          <Text style={pleadingStyles.bodyTextSingle}>
            1. Print this entire packet (all 6 pages)
          </Text>
          <Text style={pleadingStyles.bodyTextSingle}>
            2. Place pages 2-4 (the Notice + Itemized Statement) in an envelope
          </Text>
          <Text style={pleadingStyles.bodyTextSingle}>
            3. Address to: {data.tenant.name}, {tenantAddress}
          </Text>
          <Text style={pleadingStyles.bodyTextSingle}>
            4. Go to your local USPS Post Office (or schedule a pickup)
          </Text>
          <Text style={pleadingStyles.bodyTextSingle}>
            5. Request: <Text style={pleadingStyles.bold}>Certified Mail with Return Receipt Requested</Text>
          </Text>
          <Text style={pleadingStyles.bodyTextSingle}>
            6. Keep the certified mail receipt (white slip) and tracking number
          </Text>
          <Text style={pleadingStyles.bodyTextSingle}>
            7. When the green return receipt card comes back, file it with this packet
          </Text>
          <Text style={pleadingStyles.bodyTextSingle}>
            8. Keep pages 5-6 + all evidence for your records
          </Text>
        </View>

        {amountToReturn > 0 && (
          <View style={pleadingStyles.infoBox}>
            <Text style={pleadingStyles.infoBoxTitle}>INCLUDE REFUND CHECK</Text>
            <Text style={pleadingStyles.infoBoxText}>
              Include a check for {formatCurrency(amountToReturn)} (the balance after
              deductions) in the envelope with the notice. This demonstrates good faith
              compliance with {stateRules.statuteTitle}.
            </Text>
          </View>
        )}

        <Text style={pleadingStyles.sectionHeader}>CRITICAL DEADLINES</Text>
        <View style={pleadingStyles.table}>
          <View style={pleadingStyles.tableHeader}>
            <Text style={[pleadingStyles.tableCellHeader, { width: "30%" }]}>
              DATE
            </Text>
            <Text style={[pleadingStyles.tableCellHeader, { width: "55%" }]}>
              EVENT
            </Text>
            <Text style={[pleadingStyles.tableCellHeader, { width: "15%", borderRightWidth: 0 }]}>
              STATUS
            </Text>
          </View>

          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "30%" }]}>
              {formatDate(moveOutDate)}
            </Text>
            <Text style={[pleadingStyles.tableCell, { width: "55%" }]}>
              Tenant moved out (Day 0)
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "15%" }]}>
              Done
            </Text>
          </View>

          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "30%" }]}>
              {formatDate(returnDeadline)}
            </Text>
            <Text style={[pleadingStyles.tableCell, { width: "55%" }]}>
              {stateRules.returnDeadline}-day deadline: Return full deposit if no deductions
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "15%" }]}>
              {new Date() > returnDeadline ? "Passed" : "Pending"}
            </Text>
          </View>

          <View style={pleadingStyles.tableRow}>
            <Text style={[pleadingStyles.tableCell, { width: "30%", fontFamily: "Times-Bold" }]}>
              {formatDate(claimDeadline)}
            </Text>
            <Text style={[pleadingStyles.tableCell, { width: "55%", fontFamily: "Times-Bold" }]}>
              {stateRules.claimDeadline}-DAY DEADLINE: Must send this notice via certified mail
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "15%", fontFamily: "Times-Bold" }]}>
              {new Date() > claimDeadline ? "PASSED" : "CRITICAL"}
            </Text>
          </View>

          <View style={pleadingStyles.tableRowLast}>
            <Text style={[pleadingStyles.tableCell, { width: "30%" }]}>
              {formatDate(addDays(claimDeadline, 15))}
            </Text>
            <Text style={[pleadingStyles.tableCell, { width: "55%" }]}>
              Tenant&apos;s 15-day objection period ends (after receiving notice)
            </Text>
            <Text style={[pleadingStyles.tableCellLast, { width: "15%" }]}>
              &mdash;
            </Text>
          </View>
        </View>

        <View style={[pleadingStyles.infoBox, { borderColor: "#cc0000" }]}>
          <Text style={[pleadingStyles.infoBoxTitle, { color: "#cc0000" }]}>
            FAILURE TO COMPLY
          </Text>
          <Text style={pleadingStyles.infoBoxText}>
            Per {stateRules.statuteTitle}: &quot;{stateRules.statutoryLanguage.forfeitureClause}&quot;
            {"\n\n"}
            Potential exposure: Up to {formatCurrency(depositAmount * stateRules.damagesMultiplier)} ({stateRules.damagesDescription}) plus attorney fees and court costs.
          </Text>
        </View>

        {/* Certificate of Service */}
        <CertificateOfService
          recipientName={data.tenant.name}
          recipientAddress={tenantAddress}
        />

        <View style={{ marginTop: 24, borderTopWidth: 1, borderTopColor: "#cccccc", paddingTop: 12 }}>
          <Text style={[pleadingStyles.bodyTextSingle, pleadingStyles.italic, { textAlign: "center" }]}>
            Generated by DepositReady.co — This document does not constitute legal advice.
          </Text>
        </View>
      </PleadingPage>
    </Document>
  );
}
