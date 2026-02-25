import { Page, View, Text } from "@react-pdf/renderer";
import { memoStyles, MEMO_COLORS, MEMO_CONSTANTS } from "./styles/memo";

interface MemoPageProps {
  children: React.ReactNode;
  name: string;
  /** Optional override for header title (defaults to "Case Review Memo") */
  headerTitle?: string;
}

/**
 * MemoPage — Branded page wrapper for the Case Review Memo
 *
 * Provides:
 * - Teal-accented header with "DEPOSITREADY" brand + document title
 * - Automatic page numbers via render prop (Page X of Y)
 * - Confidentiality footer with recipient name
 */
export function MemoPage({
  children,
  name,
  headerTitle = "Case Review Memo",
}: MemoPageProps) {
  return (
    <Page size="LETTER" style={memoStyles.page} wrap>
      {/* Page Header */}
      <View style={memoStyles.pageHeader} fixed>
        <Text style={memoStyles.pageHeaderBrand}>DEPOSITREADY</Text>
        <Text style={memoStyles.pageHeaderTitle}>{headerTitle}</Text>
      </View>

      {/* Content */}
      {children}

      {/* Page Footer */}
      <View style={memoStyles.pageFooter} fixed>
        <Text style={memoStyles.pageFooterText}>
          Confidential — Prepared for {name}
        </Text>
        <Text
          style={memoStyles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
      </View>
    </Page>
  );
}

/**
 * MemoCoverPage — Full cover page (no header/footer, custom layout)
 */
interface MemoCoverPageProps {
  name: string;
  stateCode: string;
  depositAmount: number;
  moveOutDate: string | null;
  landlordName: string | null;
  propertyAddress: string | null;
  generatedDate: Date;
}

export function MemoCoverPage({
  name,
  stateCode,
  depositAmount,
  moveOutDate,
  landlordName,
  propertyAddress,
  generatedDate,
}: MemoCoverPageProps) {
  const dateStr = generatedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Page size="LETTER" style={memoStyles.coverPage}>
      {/* Left accent bar */}
      <View style={memoStyles.coverAccentBar} />

      {/* Brand */}
      <Text style={memoStyles.coverBrand}>DepositReady</Text>

      {/* Title */}
      <Text style={memoStyles.coverTitle}>Case Review Memo</Text>
      <Text style={memoStyles.coverSubtitle}>
        Personalized analysis prepared for {name}
      </Text>

      {/* Case Summary Box */}
      <View style={memoStyles.coverInfoBox}>
        <View style={memoStyles.coverInfoRow}>
          <Text style={memoStyles.coverInfoLabel}>Client</Text>
          <Text style={memoStyles.coverInfoValue}>{name}</Text>
        </View>
        <View style={memoStyles.coverInfoRow}>
          <Text style={memoStyles.coverInfoLabel}>State</Text>
          <Text style={memoStyles.coverInfoValue}>{stateCode}</Text>
        </View>
        <View style={memoStyles.coverInfoRow}>
          <Text style={memoStyles.coverInfoLabel}>Deposit</Text>
          <Text style={memoStyles.coverInfoValue}>
            ${depositAmount.toLocaleString()}
          </Text>
        </View>
        {moveOutDate && (
          <View style={memoStyles.coverInfoRow}>
            <Text style={memoStyles.coverInfoLabel}>Move-Out</Text>
            <Text style={memoStyles.coverInfoValue}>{moveOutDate}</Text>
          </View>
        )}
        {landlordName && (
          <View style={memoStyles.coverInfoRow}>
            <Text style={memoStyles.coverInfoLabel}>Landlord</Text>
            <Text style={memoStyles.coverInfoValue}>{landlordName}</Text>
          </View>
        )}
        {propertyAddress && (
          <View style={memoStyles.coverInfoRow}>
            <Text style={memoStyles.coverInfoLabel}>Property</Text>
            <Text style={memoStyles.coverInfoValue}>{propertyAddress}</Text>
          </View>
        )}
      </View>

      {/* Date */}
      <Text style={memoStyles.coverDate}>Prepared {dateStr}</Text>

      {/* Confidential footer */}
      <Text style={memoStyles.coverConfidential}>
        CONFIDENTIAL — This document was prepared exclusively for {name} and
        contains a personalized analysis of their security deposit case.
      </Text>
    </Page>
  );
}
