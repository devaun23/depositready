import { StyleSheet } from "@react-pdf/renderer";

/**
 * Memo Style System — Professional Consultant Report
 *
 * Distinct from the pleading.ts (court-filing) style.
 * Aesthetic: clean, modern, teal-accented report with generous whitespace.
 */

export const MEMO_COLORS = {
  teal: "#6366f1",
  tealLight: "#eef2ff",
  tealDark: "#4338ca",
  navy: "#1e3a5f",
  navyLight: "#e8edf4",
  black: "#111827",
  gray900: "#1a1a1a",
  gray700: "#374151",
  gray500: "#6b7280",
  gray300: "#d1d5db",
  gray100: "#f3f4f6",
  white: "#ffffff",
  amber: "#f59e0b",
  amberLight: "#fffbeb",
  amberDark: "#92400e",
  red: "#dc2626",
  redLight: "#fef2f2",
};

export const MEMO_CONSTANTS = {
  pageWidth: 612,
  pageHeight: 792,
  marginTop: 72,
  marginBottom: 72,
  marginLeft: 60,
  marginRight: 60,
  headerHeight: 36,
  footerHeight: 24,
  accentBarWidth: 4,
};

export const memoStyles = StyleSheet.create({
  // ──── Page ────
  page: {
    paddingTop: MEMO_CONSTANTS.marginTop,
    paddingBottom: MEMO_CONSTANTS.marginBottom + 20, // room for footer
    paddingLeft: MEMO_CONSTANTS.marginLeft,
    paddingRight: MEMO_CONSTANTS.marginRight,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.5,
    color: MEMO_COLORS.gray900,
  },

  // ──── Cover Page ────
  coverPage: {
    paddingTop: 120,
    paddingBottom: MEMO_CONSTANTS.marginBottom,
    paddingLeft: MEMO_CONSTANTS.marginLeft,
    paddingRight: MEMO_CONSTANTS.marginRight,
    fontFamily: "Helvetica",
    color: MEMO_COLORS.gray900,
  },

  coverAccentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 8,
    height: "100%",
    backgroundColor: MEMO_COLORS.teal,
  },

  coverBrand: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    color: MEMO_COLORS.teal,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 40,
  },

  coverTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 32,
    color: MEMO_COLORS.navy,
    marginBottom: 8,
  },

  coverSubtitle: {
    fontFamily: "Helvetica",
    fontSize: 14,
    color: MEMO_COLORS.gray500,
    marginBottom: 48,
  },

  coverInfoBox: {
    backgroundColor: MEMO_COLORS.gray100,
    borderLeftWidth: 4,
    borderLeftColor: MEMO_COLORS.teal,
    padding: 16,
    borderRadius: 2,
  },

  coverInfoRow: {
    flexDirection: "row",
    marginBottom: 6,
  },

  coverInfoLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: MEMO_COLORS.gray500,
    width: 90,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  coverInfoValue: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: MEMO_COLORS.gray900,
    flex: 1,
  },

  coverDate: {
    fontSize: 10,
    color: MEMO_COLORS.gray500,
    marginTop: 24,
  },

  coverConfidential: {
    position: "absolute",
    bottom: 60,
    left: MEMO_CONSTANTS.marginLeft,
    right: MEMO_CONSTANTS.marginRight,
    fontSize: 8,
    color: MEMO_COLORS.gray500,
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: MEMO_COLORS.gray300,
    paddingTop: 8,
  },

  // ──── Page Header ────
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: MEMO_COLORS.teal,
    marginBottom: 20,
  },

  pageHeaderBrand: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: MEMO_COLORS.teal,
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  pageHeaderTitle: {
    fontFamily: "Helvetica",
    fontSize: 8,
    color: MEMO_COLORS.gray500,
  },

  // ──── Page Footer ────
  pageFooter: {
    position: "absolute",
    bottom: 36,
    left: MEMO_CONSTANTS.marginLeft,
    right: MEMO_CONSTANTS.marginRight,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: MEMO_COLORS.gray300,
    paddingTop: 6,
  },

  pageFooterText: {
    fontSize: 7,
    color: MEMO_COLORS.gray500,
  },

  pageNumber: {
    fontSize: 7,
    color: MEMO_COLORS.gray500,
  },

  // ──── Section Headers ────
  sectionHeader: {
    fontFamily: "Helvetica-Bold",
    fontSize: 14,
    color: MEMO_COLORS.navy,
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: MEMO_COLORS.gray300,
  },

  sectionNumber: {
    fontFamily: "Helvetica-Bold",
    fontSize: 14,
    color: MEMO_COLORS.teal,
  },

  subsectionHeader: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: MEMO_COLORS.gray900,
    marginTop: 14,
    marginBottom: 6,
  },

  // ──── Body Text ────
  body: {
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.6,
    color: MEMO_COLORS.gray900,
    marginBottom: 8,
  },

  bodyBold: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    lineHeight: 1.6,
    color: MEMO_COLORS.gray900,
  },

  bodyItalic: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 10,
    lineHeight: 1.6,
    color: MEMO_COLORS.gray700,
  },

  // ──── Bullet Lists ────
  bulletRow: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 12,
  },

  bulletDot: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: MEMO_COLORS.teal,
    width: 14,
  },

  bulletText: {
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.5,
    flex: 1,
    color: MEMO_COLORS.gray900,
  },

  // ──── Numbered Checklist ────
  checklistRow: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "flex-start",
  },

  checklistBox: {
    width: 12,
    height: 12,
    borderWidth: 1.5,
    borderColor: MEMO_COLORS.teal,
    borderRadius: 2,
    marginRight: 8,
    marginTop: 1,
  },

  checklistNumber: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: MEMO_COLORS.teal,
    width: 20,
    marginRight: 4,
  },

  checklistText: {
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.5,
    flex: 1,
    color: MEMO_COLORS.gray900,
  },

  // ──── Callout Box (for statutes / important notes) ────
  calloutBox: {
    backgroundColor: MEMO_COLORS.tealLight,
    borderLeftWidth: MEMO_CONSTANTS.accentBarWidth,
    borderLeftColor: MEMO_COLORS.teal,
    padding: 12,
    marginVertical: 10,
    borderRadius: 2,
  },

  calloutLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: MEMO_COLORS.tealDark,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  calloutText: {
    fontFamily: "Helvetica",
    fontSize: 9,
    lineHeight: 1.5,
    color: MEMO_COLORS.tealDark,
  },

  // ──── Founder Notes Callout ────
  founderBox: {
    backgroundColor: MEMO_COLORS.amberLight,
    borderLeftWidth: MEMO_CONSTANTS.accentBarWidth,
    borderLeftColor: MEMO_COLORS.amber,
    padding: 12,
    marginVertical: 12,
    borderRadius: 2,
  },

  founderLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: MEMO_COLORS.amberDark,
    marginBottom: 4,
  },

  founderText: {
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.6,
    color: MEMO_COLORS.amberDark,
  },

  // ──── Tables ────
  table: {
    marginVertical: 12,
    borderWidth: 1,
    borderColor: MEMO_COLORS.gray300,
    borderRadius: 2,
  },

  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: MEMO_COLORS.navy,
    borderBottomWidth: 1,
    borderBottomColor: MEMO_COLORS.gray300,
  },

  tableHeaderCell: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: MEMO_COLORS.white,
    padding: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: MEMO_COLORS.gray100,
  },

  tableRowAlt: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: MEMO_COLORS.gray100,
    backgroundColor: MEMO_COLORS.gray100,
  },

  tableCell: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: MEMO_COLORS.gray900,
    padding: 8,
  },

  tableCellBold: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: MEMO_COLORS.gray900,
    padding: 8,
  },

  tableCellStatus: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    padding: 8,
  },

  // ──── Disclaimer ────
  disclaimer: {
    marginTop: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: MEMO_COLORS.gray300,
  },

  disclaimerText: {
    fontFamily: "Helvetica",
    fontSize: 7,
    color: MEMO_COLORS.gray500,
    lineHeight: 1.4,
  },

  // ──── Contact Footer ────
  contactFooter: {
    marginTop: 16,
    padding: 12,
    backgroundColor: MEMO_COLORS.gray100,
    borderRadius: 2,
    textAlign: "center",
  },

  contactText: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: MEMO_COLORS.gray700,
  },

  contactLink: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: MEMO_COLORS.teal,
  },
});
