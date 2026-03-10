import {
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    backgroundColor: "#f3f4f6",
    padding: 8,
    marginBottom: 10,
  },
  checkItem: {
    flexDirection: "row",
    marginBottom: 7,
    paddingLeft: 10,
  },
  checkbox: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: "#6b7280",
    marginRight: 10,
    marginTop: 1,
  },
  checkContent: {
    flex: 1,
  },
  checkLabel: {
    fontFamily: "Helvetica-Bold",
    lineHeight: 1.4,
  },
  checkDesc: {
    fontSize: 10,
    color: "#6b7280",
    lineHeight: 1.3,
  },
  tipBox: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#3b82f6",
    padding: 12,
    marginTop: 16,
  },
  tipTitle: {
    fontFamily: "Helvetica-Bold",
    color: "#1d4ed8",
    marginBottom: 6,
  },
  tipText: {
    fontSize: 10,
    color: "#1e40af",
    lineHeight: 1.4,
    marginBottom: 4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    fontSize: 9,
    color: "#666",
    textAlign: "center",
  },
});

interface EvidenceCategory {
  title: string;
  items: { label: string; desc: string }[];
  defenseOnly?: boolean;
}

const CATEGORIES: EvidenceCategory[] = [
  {
    title: "Lease Documents",
    items: [
      { label: "Original signed lease agreement", desc: "Including all addenda, amendments, and renewals" },
      { label: "Lease termination notice", desc: "Written notice of move-out from tenant or landlord" },
      { label: "Security deposit receipt", desc: "Proof of deposit amount received and account information" },
      { label: "Move-in condition report", desc: "Signed by both parties at start of tenancy" },
    ],
  },
  {
    title: "Move-In / Move-Out Inspection Reports",
    items: [
      { label: "Move-in inspection checklist", desc: "Detailed condition at start of tenancy" },
      { label: "Move-out inspection checklist", desc: "Detailed condition at end of tenancy" },
      { label: "Inspection comparison notes", desc: "Side-by-side comparison of condition changes" },
    ],
  },
  {
    title: "Photos (Dated)",
    items: [
      { label: "Move-in photos", desc: "Timestamped photos of every room at start of tenancy" },
      { label: "Move-out photos", desc: "Timestamped photos of every room after tenant vacated" },
      { label: "Damage-specific close-ups", desc: "Detailed photos of any damage claimed as deductions" },
      { label: "Before/after repair photos", desc: "Photos documenting condition before and after repairs" },
    ],
  },
  {
    title: "Communication Records",
    items: [
      { label: "Written correspondence", desc: "All letters, emails, and texts with the tenant about the deposit" },
      { label: "Certified mail receipts", desc: "Proof of mailing for deposit-related communications" },
      { label: "Green return receipt cards", desc: "Signed delivery confirmations" },
      { label: "Maintenance request records", desc: "Tenant requests and your responses during tenancy" },
    ],
  },
  {
    title: "Receipts for Repairs",
    items: [
      { label: "Contractor invoices", desc: "Itemized invoices from licensed contractors for repairs" },
      { label: "Material receipts", desc: "Receipts for repair materials if work was done in-house" },
      { label: "Cleaning service invoices", desc: "Professional cleaning receipts if cleaning was deducted" },
      { label: "Cost estimates (if work pending)", desc: "Written estimates from licensed contractors" },
    ],
  },
  {
    title: "Deposit Handling Records",
    items: [
      { label: "Deposit account statements", desc: "Bank statements showing deposit held in required account" },
      { label: "Interest calculations", desc: "Interest accrued if required by state law" },
      { label: "Itemized deduction letter (copy)", desc: "Your copy of the deduction letter sent to tenant" },
      { label: "Refund check copy", desc: "Copy of any refund check issued" },
    ],
  },
  {
    title: "Threat Documentation",
    defenseOnly: true,
    items: [
      { label: "Demand letter from tenant/attorney", desc: "Copy of any demand letter received" },
      { label: "Court filing documents", desc: "Small claims complaint or summons if filed" },
      { label: "Attorney correspondence", desc: "Letters from tenant's attorney" },
    ],
  },
  {
    title: "Timeline of Events",
    defenseOnly: true,
    items: [
      { label: "Chronological event log", desc: "Date-by-date record of all deposit-related events" },
      { label: "Deadline tracking sheet", desc: "Record of all statutory deadlines and compliance dates" },
    ],
  },
];

interface EvidenceOrganizerProps {
  mode: "compliance" | "defense";
}

export function EvidenceOrganizer({ mode }: EvidenceOrganizerProps) {
  const filteredCategories = CATEGORIES.filter(
    (cat) => !cat.defenseOnly || mode === "defense"
  );

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Evidence Organization Checklist</Text>
      <Text style={styles.subtitle}>
        {mode === "compliance"
          ? "Compliance Kit — Document Organization"
          : "Defense Kit — Document Organization"}
      </Text>

      {filteredCategories.map((cat, ci) => (
        <View key={ci} style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>{cat.title}</Text>
          {cat.items.map((item, ii) => (
            <View key={ii} style={styles.checkItem}>
              <View style={styles.checkbox} />
              <View style={styles.checkContent}>
                <Text style={styles.checkLabel}>{item.label}</Text>
                <Text style={styles.checkDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      ))}

      <View style={styles.tipBox}>
        <Text style={styles.tipTitle}>Filing System Recommendations</Text>
        <Text style={styles.tipText}>
          Create a physical folder and a digital backup for each property/tenant.
          Organize documents chronologically with divider tabs for each category
          above.
        </Text>
        <Text style={styles.tipText}>
          Label everything clearly with the property address, tenant name, and
          date range of tenancy. Keep original documents in the physical folder
          and scanned copies in cloud storage.
        </Text>
        <Text style={styles.tipText}>
          Retain all records for at least 5 years after the tenancy ends, or
          longer if there is any pending or potential legal action.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text>
          Generated by DepositReady.co | This document does not constitute legal advice.
        </Text>
      </View>
    </Page>
  );
}
