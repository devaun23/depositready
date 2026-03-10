import {
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { StateRules } from "@/lib/state-rules";

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
  intro: {
    marginBottom: 20,
    lineHeight: 1.5,
    color: "#374151",
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1e3a5f",
    padding: 8,
  },
  tableHeaderText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: "#ffffff",
    flex: 1,
  },
  categoryRow: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  categoryText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    minHeight: 28,
  },
  cellWear: {
    flex: 1,
    padding: 6,
    backgroundColor: "#f0fdf4",
  },
  cellDamage: {
    flex: 1,
    padding: 6,
    backgroundColor: "#fef2f2",
  },
  cellText: {
    fontSize: 10,
    lineHeight: 1.4,
  },
  warningBox: {
    backgroundColor: "#fef9c3",
    borderWidth: 1,
    borderColor: "#eab308",
    padding: 12,
    marginTop: 16,
  },
  warningTitle: {
    fontFamily: "Helvetica-Bold",
    color: "#a16207",
    marginBottom: 6,
  },
  warningText: {
    fontSize: 10,
    color: "#854d0e",
    lineHeight: 1.4,
    marginBottom: 4,
  },
  stateBox: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#3b82f6",
    padding: 12,
    marginTop: 12,
  },
  stateTitle: {
    fontFamily: "Helvetica-Bold",
    color: "#1d4ed8",
    marginBottom: 6,
  },
  stateText: {
    fontSize: 10,
    color: "#1e40af",
    lineHeight: 1.4,
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

interface WearAndTearCategory {
  name: string;
  wear: string;
  damage: string;
}

const CATEGORIES: WearAndTearCategory[] = [
  {
    name: "Walls",
    wear: "Small nail holes, minor scuffs, faded paint, slight discoloration from furniture or pictures",
    damage: "Large holes, unauthorized paint colors, wallpaper removal damage, crayon/marker, excessive holes",
  },
  {
    name: "Floors",
    wear: "Minor wear patterns in carpet, slight dulling of hardwood finish, small indentations from furniture",
    damage: "Stained or burned carpet, gouged hardwood, broken tiles, pet urine damage, torn vinyl",
  },
  {
    name: "Appliances",
    wear: "Worn knobs, minor surface scratches, reduced efficiency from normal use",
    damage: "Broken doors, missing parts, burned-out elements from misuse, interior damage from neglect",
  },
  {
    name: "Fixtures",
    wear: "Minor water mineral deposits, slight discoloration, worn finishes from regular cleaning",
    damage: "Broken fixtures, cracked porcelain, stripped faucet handles, missing towel bars or rods",
  },
  {
    name: "Doors / Windows",
    wear: "Slightly sticky doors from humidity, minor weatherstripping wear, small scratches on hardware",
    damage: "Broken glass, holes in doors, missing screens, broken locks, pet scratches on doors",
  },
  {
    name: "Exterior",
    wear: "Normal lawn wear, minor soil compaction, weathered appearance of outdoor surfaces",
    damage: "Dead landscaping from neglect, oil stains on driveway, broken fence sections, unauthorized modifications",
  },
];

interface WearAndTearGuideProps {
  stateRules: StateRules;
}

export function WearAndTearGuide({ stateRules }: WearAndTearGuideProps) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Normal Wear & Tear vs. Damage Guide</Text>
      <Text style={styles.subtitle}>{stateRules.name} — Deduction Reference</Text>

      <View style={styles.intro}>
        <Text>
          Landlords may only deduct from a security deposit for damage beyond
          normal wear and tear. Understanding the distinction is critical for
          making defensible deductions. Courts generally side with tenants when
          deductions are poorly documented or fall into the &quot;normal wear&quot;
          category.
        </Text>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>
            Normal Wear & Tear (NOT Deductible)
          </Text>
          <Text style={styles.tableHeaderText}>
            Tenant Damage (Deductible)
          </Text>
        </View>
        {CATEGORIES.map((cat, i) => (
          <View key={i} wrap={false}>
            <View style={styles.categoryRow}>
              <Text style={styles.categoryText}>{cat.name}</Text>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.cellWear}>
                <Text style={styles.cellText}>{cat.wear}</Text>
              </View>
              <View style={styles.cellDamage}>
                <Text style={styles.cellText}>{cat.damage}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* State-specific note */}
      <View style={styles.stateBox}>
        <Text style={styles.stateTitle}>
          {stateRules.name} Court Standards
        </Text>
        <Text style={styles.stateText}>
          Under {stateRules.statuteTitle}, landlords who wrongfully withhold
          deposits may face {stateRules.damagesDescription}. Courts in{" "}
          {stateRules.name} typically evaluate the property condition against the
          length of tenancy — longer tenancies carry higher expectations for
          normal wear and tear.
          {stateRules.additionalDamages
            ? ` Additional damages may include ${stateRules.additionalDamages}.`
            : ""}
        </Text>
      </View>

      {/* Warning */}
      <View style={styles.warningBox}>
        <Text style={styles.warningTitle}>Warning: Disputed Deductions</Text>
        <Text style={styles.warningText}>
          If a tenant disputes a deduction, the burden of proof is on the
          landlord. Always document damage with dated, timestamped photographs
          and repair receipts from licensed contractors. Estimates alone may not
          be sufficient — actual invoices carry more weight in court.
        </Text>
        <Text style={styles.warningText}>
          Depreciation matters: Courts may reduce deductions based on the age
          and expected lifespan of materials (e.g., carpet with 5+ years of use
          cannot be charged at full replacement cost).
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
