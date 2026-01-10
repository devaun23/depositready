import { Page, View, Text } from "@react-pdf/renderer";
import { ReactNode } from "react";
import { pleadingStyles, PLEADING_CONSTANTS } from "./styles/pleading";

interface PleadingPageProps {
  children: ReactNode;
  pageNumber?: number;
  totalPages?: number;
  showLineNumbers?: boolean;
  caseReference?: string;
  documentTitle?: string;
}

/**
 * Generate line numbers for pleading paper (1-28)
 */
function LineNumbers() {
  const lines = Array.from(
    { length: PLEADING_CONSTANTS.linesPerPage },
    (_, i) => i + 1
  );

  return (
    <View style={pleadingStyles.lineNumberColumn}>
      {lines.map((num) => (
        <Text key={num} style={pleadingStyles.lineNumber}>
          {num}
        </Text>
      ))}
    </View>
  );
}

/**
 * Page footer with case reference and page number
 */
function PageFooter({
  pageNumber,
  totalPages,
  caseReference,
}: {
  pageNumber?: number;
  totalPages?: number;
  caseReference?: string;
}) {
  return (
    <View style={pleadingStyles.footer}>
      <Text style={pleadingStyles.footerLeft}>
        {caseReference || "Security Deposit Demand"}
      </Text>
      <Text style={pleadingStyles.footerCenter}>CONFIDENTIAL</Text>
      <Text style={pleadingStyles.footerRight}>
        {pageNumber && totalPages
          ? `Page ${pageNumber} of ${totalPages}`
          : pageNumber
            ? `Page ${pageNumber}`
            : ""}
      </Text>
    </View>
  );
}

/**
 * PleadingPage - Base component for court-style document pages
 *
 * Features:
 * - 28 numbered lines down left margin
 * - Professional margins (1.5" left, 1" others)
 * - Footer with page numbers
 */
export function PleadingPage({
  children,
  pageNumber,
  totalPages,
  showLineNumbers = true,
  caseReference,
}: PleadingPageProps) {
  return (
    <Page size="LETTER" style={pleadingStyles.page}>
      {showLineNumbers && <LineNumbers />}
      {showLineNumbers && <View style={pleadingStyles.verticalLine} />}
      <View style={pleadingStyles.content}>{children}</View>
      <PageFooter
        pageNumber={pageNumber}
        totalPages={totalPages}
        caseReference={caseReference}
      />
    </Page>
  );
}
