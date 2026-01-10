import { View, Text } from "@react-pdf/renderer";
import { pleadingStyles, PLEADING_CONSTANTS } from "./styles/pleading";
import { CaseCaption } from "./CaseCaption";

interface CoverSheetProps {
  tenantName: string;
  landlordName: string;
  propertyAddress: string;
  depositAmount: number;
  moveOutDate: Date;
  generatedDate: Date;
  stateName: string;
  statuteTitle: string;
  courtName?: string;
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

/**
 * CoverSheet - Professional cover page for the dispute packet
 *
 * This is the first page of the full packet and provides:
 * - Case caption with parties
 * - Document title
 * - Summary of the dispute
 * - Table of contents
 */
export function CoverSheet({
  tenantName,
  landlordName,
  propertyAddress,
  depositAmount,
  moveOutDate,
  generatedDate,
  stateName,
  statuteTitle,
  courtName,
}: CoverSheetProps) {
  return (
    <View>
      {/* Case Caption */}
      <CaseCaption
        courtName={courtName}
        tenantName={tenantName}
        landlordName={landlordName}
        propertyAddress={propertyAddress}
        stateName={stateName}
        statuteTitle={statuteTitle}
      />

      {/* Document Title */}
      <Text style={pleadingStyles.documentTitle}>
        SECURITY DEPOSIT DISPUTE PACKET
      </Text>

      {/* Summary Box */}
      <View style={pleadingStyles.infoBox}>
        <Text style={pleadingStyles.infoBoxTitle}>CASE SUMMARY</Text>

        <View style={{ flexDirection: "row", marginBottom: 8 }}>
          <Text style={[pleadingStyles.infoBoxText, { width: 140 }]}>
            Claimant:
          </Text>
          <Text style={[pleadingStyles.infoBoxText, pleadingStyles.bold]}>
            {tenantName}
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 8 }}>
          <Text style={[pleadingStyles.infoBoxText, { width: 140 }]}>
            Respondent:
          </Text>
          <Text style={[pleadingStyles.infoBoxText, pleadingStyles.bold]}>
            {landlordName}
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 8 }}>
          <Text style={[pleadingStyles.infoBoxText, { width: 140 }]}>
            Property Address:
          </Text>
          <Text style={pleadingStyles.infoBoxText}>{propertyAddress}</Text>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 8 }}>
          <Text style={[pleadingStyles.infoBoxText, { width: 140 }]}>
            Security Deposit:
          </Text>
          <Text style={[pleadingStyles.infoBoxText, pleadingStyles.bold]}>
            {formatCurrency(depositAmount)}
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 8 }}>
          <Text style={[pleadingStyles.infoBoxText, { width: 140 }]}>
            Move-Out Date:
          </Text>
          <Text style={pleadingStyles.infoBoxText}>
            {formatDate(moveOutDate)}
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 8 }}>
          <Text style={[pleadingStyles.infoBoxText, { width: 140 }]}>
            Applicable Law:
          </Text>
          <Text style={[pleadingStyles.infoBoxText, pleadingStyles.italic]}>
            {statuteTitle}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={[pleadingStyles.infoBoxText, { width: 140 }]}>
            Date Prepared:
          </Text>
          <Text style={pleadingStyles.infoBoxText}>
            {formatDate(generatedDate)}
          </Text>
        </View>
      </View>

      {/* Table of Contents */}
      <Text style={[pleadingStyles.sectionHeaderUnderline, { marginTop: 24 }]}>
        TABLE OF CONTENTS
      </Text>

      <View style={{ marginTop: 12 }}>
        <TableOfContentsItem number={1} title="Formal Demand Letter" page="1-3" />
        <TableOfContentsItem number={2} title="Statement of Facts" page="4" />
        <TableOfContentsItem number={3} title="Legal Analysis" page="5" />
        <TableOfContentsItem number={4} title="Deductions Response" page="6" />
        <TableOfContentsItem number={5} title="Damages Calculation" page="7" />
        <TableOfContentsItem number={6} title="Evidence Index" page="8" />
        <TableOfContentsItem number={7} title="Timeline of Events" page="9" />
        <TableOfContentsItem number={8} title="Small Claims Court Guide" page="10" />
        <TableOfContentsItem number={9} title="Certificate of Service" page="11" />
      </View>

      {/* Important Notice */}
      <View style={[pleadingStyles.infoBox, { marginTop: 24 }]}>
        <Text style={pleadingStyles.infoBoxTitle}>IMPORTANT NOTICE</Text>
        <Text style={pleadingStyles.infoBoxText}>
          This packet was prepared using DepositReady.co and contains all
          documentation necessary to support a formal demand for return of a
          security deposit under {stateName} law. This document does not
          constitute legal advice. If you require legal assistance, please
          consult with a licensed attorney in your jurisdiction.
        </Text>
      </View>

      {/* Instructions */}
      <Text style={[pleadingStyles.sectionHeader, { marginTop: 24 }]}>
        INSTRUCTIONS
      </Text>

      <View style={{ marginTop: 8 }}>
        <Text style={pleadingStyles.bodyTextSingle}>
          1. Review all documents in this packet for accuracy.
        </Text>
        <Text style={pleadingStyles.bodyTextSingle}>
          2. Sign and date the demand letter where indicated.
        </Text>
        <Text style={pleadingStyles.bodyTextSingle}>
          3. Make a copy of this entire packet for your records.
        </Text>
        <Text style={pleadingStyles.bodyTextSingle}>
          4. Send the original via certified mail, return receipt requested.
        </Text>
        <Text style={pleadingStyles.bodyTextSingle}>
          5. Complete the Certificate of Service after mailing.
        </Text>
        <Text style={pleadingStyles.bodyTextSingle}>
          6. Retain the certified mail receipt as proof of delivery.
        </Text>
        <Text style={pleadingStyles.bodyTextSingle}>
          7. If no response within 14 days, proceed to small claims court.
        </Text>
      </View>
    </View>
  );
}

/**
 * Table of Contents Item
 */
function TableOfContentsItem({
  number,
  title,
  page,
}: {
  number: number;
  title: string;
  page: string;
}) {
  return (
    <View style={{ flexDirection: "row", marginBottom: 6 }}>
      <Text style={[pleadingStyles.bodyTextSingle, { width: 30 }]}>
        {number}.
      </Text>
      <Text style={[pleadingStyles.bodyTextSingle, { flex: 1 }]}>{title}</Text>
      <Text
        style={[
          pleadingStyles.bodyTextSingle,
          { width: 50, textAlign: "right" },
        ]}
      >
        {page}
      </Text>
    </View>
  );
}
