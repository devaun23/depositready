import { StyleSheet } from "@react-pdf/renderer";

/**
 * Court Pleading Paper Standards
 * Based on California Rules of Court, Rule 2.111 and Federal Rules of Civil Procedure Rule 10
 */
export const PLEADING_CONSTANTS = {
  // Page dimensions (LETTER size: 612 x 792 points, 1 point = 1/72 inch)
  pageWidth: 612,
  pageHeight: 792,

  // Margins (in points)
  marginTop: 72, // 1 inch
  marginBottom: 72, // 1 inch
  marginLeft: 108, // 1.5 inches (for line numbers + binding)
  marginRight: 72, // 1 inch

  // Line specifications
  linesPerPage: 28,
  lineHeight: 24, // Double-spaced (12pt font x 2)
  lineNumberWidth: 30,
  lineNumberGutter: 18,

  // Typography
  bodyFontSize: 12,
  headerFontSize: 14,
  captionFontSize: 11,
  footnoteSize: 9,
  lineNumberFontSize: 9,
};

export const pleadingStyles = StyleSheet.create({
  // Page container
  page: {
    paddingTop: PLEADING_CONSTANTS.marginTop,
    paddingBottom: PLEADING_CONSTANTS.marginBottom,
    paddingLeft: PLEADING_CONSTANTS.marginLeft,
    paddingRight: PLEADING_CONSTANTS.marginRight,
    fontFamily: "Times-Roman",
    fontSize: PLEADING_CONSTANTS.bodyFontSize,
    position: "relative",
  },

  // Line numbers column (positioned absolutely on left)
  lineNumberColumn: {
    position: "absolute",
    left: 36,
    top: PLEADING_CONSTANTS.marginTop,
    width: PLEADING_CONSTANTS.lineNumberWidth,
  },

  lineNumber: {
    fontFamily: "Courier",
    fontSize: PLEADING_CONSTANTS.lineNumberFontSize,
    height: PLEADING_CONSTANTS.lineHeight,
    textAlign: "right",
    color: "#666666",
    paddingRight: 4,
  },

  // Vertical line separator
  verticalLine: {
    position: "absolute",
    left: 72,
    top: PLEADING_CONSTANTS.marginTop,
    bottom: PLEADING_CONSTANTS.marginBottom,
    width: 1,
    backgroundColor: "#cccccc",
  },

  // Content area
  content: {
    flex: 1,
  },

  // Case caption styles
  captionContainer: {
    marginBottom: 24,
  },

  captionDivider: {
    borderBottomWidth: 2,
    borderBottomColor: "#000000",
    marginVertical: 12,
  },

  captionCourtName: {
    fontFamily: "Times-Bold",
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 16,
  },

  captionParties: {
    flexDirection: "row",
  },

  captionLeft: {
    width: "48%",
  },

  captionCenter: {
    width: "4%",
    alignItems: "center",
    justifyContent: "center",
  },

  captionRight: {
    width: "48%",
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: "#000000",
  },

  captionPartyName: {
    fontFamily: "Times-Bold",
    fontSize: 11,
    marginBottom: 2,
  },

  captionPartyRole: {
    fontFamily: "Times-Italic",
    fontSize: 10,
    marginLeft: 24,
    marginBottom: 8,
  },

  captionBracket: {
    fontSize: 11,
    lineHeight: 1.8,
  },

  captionCaseInfo: {
    fontSize: 10,
    marginBottom: 4,
  },

  captionCaseInfoBold: {
    fontFamily: "Times-Bold",
    fontSize: 10,
    marginBottom: 4,
  },

  // Document title
  documentTitle: {
    fontFamily: "Times-Bold",
    fontSize: 14,
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 24,
    marginTop: 16,
    textDecoration: "underline",
  },

  // Section headers
  sectionHeader: {
    fontFamily: "Times-Bold",
    fontSize: 12,
    textTransform: "uppercase",
    marginTop: 20,
    marginBottom: 12,
  },

  sectionHeaderUnderline: {
    fontFamily: "Times-Bold",
    fontSize: 12,
    textTransform: "uppercase",
    marginTop: 20,
    marginBottom: 12,
    textDecoration: "underline",
  },

  // Body text - double spaced
  bodyText: {
    fontFamily: "Times-Roman",
    fontSize: 12,
    lineHeight: 2,
    textAlign: "justify",
    marginBottom: 12,
  },

  bodyTextSingle: {
    fontFamily: "Times-Roman",
    fontSize: 12,
    lineHeight: 1.4,
    textAlign: "justify",
    marginBottom: 8,
  },

  // Numbered paragraphs
  numberedParagraph: {
    flexDirection: "row",
    marginBottom: 16,
  },

  paragraphNumber: {
    width: 36,
    fontFamily: "Times-Roman",
    fontSize: 12,
    textAlign: "left",
  },

  paragraphContent: {
    flex: 1,
    fontFamily: "Times-Roman",
    fontSize: 12,
    lineHeight: 2,
    textAlign: "justify",
  },

  // Sub-paragraphs (a), (b), (c)
  subParagraph: {
    flexDirection: "row",
    marginLeft: 36,
    marginTop: 8,
    marginBottom: 8,
  },

  subParagraphLetter: {
    width: 30,
    fontFamily: "Times-Roman",
    fontSize: 12,
  },

  subParagraphContent: {
    flex: 1,
    fontFamily: "Times-Roman",
    fontSize: 12,
    lineHeight: 1.8,
  },

  // Citations
  citation: {
    fontFamily: "Times-Italic",
    fontSize: 12,
  },

  citationBlock: {
    marginLeft: 48,
    marginRight: 48,
    marginTop: 12,
    marginBottom: 12,
    fontFamily: "Times-Italic",
    fontSize: 11,
    lineHeight: 1.5,
    textAlign: "justify",
  },

  // Bold and italic emphasis
  bold: {
    fontFamily: "Times-Bold",
  },

  italic: {
    fontFamily: "Times-Italic",
  },

  boldItalic: {
    fontFamily: "Times-BoldItalic",
  },

  underline: {
    textDecoration: "underline",
  },

  // Checkbox style
  checkboxRow: {
    flexDirection: "row",
    marginBottom: 8,
    marginLeft: 36,
    alignItems: "flex-start",
  },

  checkbox: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: "#000000",
    marginRight: 8,
    marginTop: 2,
  },

  checkboxChecked: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#000000",
    marginRight: 8,
    marginTop: 2,
  },

  checkboxLabel: {
    flex: 1,
    fontSize: 11,
    lineHeight: 1.6,
  },

  // Signature block
  signatureBlock: {
    marginTop: 48,
    width: "50%",
    marginLeft: "50%",
  },

  signatureLabel: {
    fontFamily: "Times-Roman",
    fontSize: 12,
    marginBottom: 36,
  },

  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    marginBottom: 4,
  },

  signatureName: {
    fontFamily: "Times-Roman",
    fontSize: 12,
  },

  signatureAddress: {
    fontFamily: "Times-Roman",
    fontSize: 11,
    marginTop: 4,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 36,
    left: PLEADING_CONSTANTS.marginLeft,
    right: PLEADING_CONSTANTS.marginRight,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    color: "#666666",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    paddingTop: 8,
  },

  footerLeft: {
    fontSize: 9,
    color: "#666666",
  },

  footerCenter: {
    fontSize: 9,
    color: "#666666",
    textAlign: "center",
  },

  footerRight: {
    fontSize: 9,
    color: "#666666",
    textAlign: "right",
  },

  // Tables
  table: {
    marginVertical: 16,
    borderWidth: 1,
    borderColor: "#000000",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 2,
    borderBottomColor: "#000000",
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },

  tableRowLast: {
    flexDirection: "row",
  },

  tableCell: {
    padding: 8,
    fontSize: 10,
    borderRightWidth: 1,
    borderRightColor: "#cccccc",
  },

  tableCellLast: {
    padding: 8,
    fontSize: 10,
  },

  tableCellHeader: {
    fontFamily: "Times-Bold",
    fontSize: 10,
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: "#cccccc",
  },

  // Info box (for important notices)
  infoBox: {
    borderWidth: 2,
    borderColor: "#000000",
    padding: 12,
    marginVertical: 16,
  },

  infoBoxTitle: {
    fontFamily: "Times-Bold",
    fontSize: 11,
    textTransform: "uppercase",
    marginBottom: 8,
    textAlign: "center",
  },

  infoBoxText: {
    fontFamily: "Times-Roman",
    fontSize: 11,
    lineHeight: 1.5,
  },

  // RE: line for demand letter
  reLine: {
    marginBottom: 20,
    marginLeft: 48,
  },

  reLineLabel: {
    fontFamily: "Times-Bold",
    fontSize: 12,
  },

  reLineContent: {
    fontFamily: "Times-Roman",
    fontSize: 12,
    marginLeft: 48,
  },

  // Certified mail header
  certifiedMailHeader: {
    fontFamily: "Times-Bold",
    fontSize: 10,
    textTransform: "uppercase",
    marginBottom: 24,
    textDecoration: "underline",
  },

  // Address block
  addressBlock: {
    marginBottom: 16,
  },

  addressLine: {
    fontFamily: "Times-Roman",
    fontSize: 12,
    lineHeight: 1.4,
  },

  // Date
  dateLine: {
    fontFamily: "Times-Roman",
    fontSize: 12,
    marginBottom: 20,
  },

  // Salutation
  salutation: {
    fontFamily: "Times-Roman",
    fontSize: 12,
    marginBottom: 16,
  },
});
