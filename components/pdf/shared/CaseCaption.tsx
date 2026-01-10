import { View, Text } from "@react-pdf/renderer";
import { pleadingStyles } from "./styles/pleading";

interface CaseCaptionProps {
  courtName?: string;
  tenantName: string;
  landlordName: string;
  propertyAddress: string;
  caseReference?: string;
  stateName: string;
  statuteTitle: string;
}

/**
 * CaseCaption - Formal court-style case caption
 *
 * Format:
 * ================================================
 *            [COURT NAME / STATE LAW]
 *
 * TENANT NAME,                    )
 *          Tenant/Claimant,       )  Case Ref: XXX
 *                                 )
 *     vs.                         )  Property:
 *                                 )  123 Main St
 * LANDLORD NAME,                  )
 *          Landlord/Respondent.   )
 * ================================================
 */
export function CaseCaption({
  courtName,
  tenantName,
  landlordName,
  propertyAddress,
  caseReference,
  stateName,
  statuteTitle,
}: CaseCaptionProps) {
  // Generate a case reference if not provided
  const displayCaseRef =
    caseReference ||
    `DR-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  return (
    <View style={pleadingStyles.captionContainer}>
      {/* Court/Jurisdiction Line */}
      <Text style={pleadingStyles.captionCourtName}>
        {courtName || `IN THE MATTER OF SECURITY DEPOSIT DISPUTE`}
      </Text>
      <Text
        style={[
          pleadingStyles.captionCourtName,
          { fontSize: 10, marginBottom: 16 },
        ]}
      >
        Pursuant to {statuteTitle}
      </Text>

      <View style={pleadingStyles.captionDivider} />

      {/* Parties Section */}
      <View style={pleadingStyles.captionParties}>
        {/* Left side - Party names */}
        <View style={pleadingStyles.captionLeft}>
          <Text style={pleadingStyles.captionPartyName}>
            {tenantName.toUpperCase()},
          </Text>
          <Text style={pleadingStyles.captionPartyRole}>Tenant/Claimant,</Text>

          <Text
            style={[pleadingStyles.captionPartyRole, { marginVertical: 8 }]}
          >
            vs.
          </Text>

          <Text style={pleadingStyles.captionPartyName}>
            {landlordName.toUpperCase()},
          </Text>
          <Text style={pleadingStyles.captionPartyRole}>
            Landlord/Respondent.
          </Text>
        </View>

        {/* Center - Bracket lines */}
        <View style={pleadingStyles.captionCenter}>
          <Text style={pleadingStyles.captionBracket}>)</Text>
          <Text style={pleadingStyles.captionBracket}>)</Text>
          <Text style={pleadingStyles.captionBracket}>)</Text>
          <Text style={pleadingStyles.captionBracket}>)</Text>
          <Text style={pleadingStyles.captionBracket}>)</Text>
          <Text style={pleadingStyles.captionBracket}>)</Text>
          <Text style={pleadingStyles.captionBracket}>)</Text>
        </View>

        {/* Right side - Case info */}
        <View style={pleadingStyles.captionRight}>
          <Text style={pleadingStyles.captionCaseInfoBold}>
            Case Reference:
          </Text>
          <Text style={pleadingStyles.captionCaseInfo}>{displayCaseRef}</Text>

          <Text style={[pleadingStyles.captionCaseInfoBold, { marginTop: 12 }]}>
            Property Address:
          </Text>
          <Text style={pleadingStyles.captionCaseInfo}>{propertyAddress}</Text>

          <Text style={[pleadingStyles.captionCaseInfoBold, { marginTop: 12 }]}>
            Jurisdiction:
          </Text>
          <Text style={pleadingStyles.captionCaseInfo}>{stateName}</Text>
        </View>
      </View>

      <View style={pleadingStyles.captionDivider} />
    </View>
  );
}
