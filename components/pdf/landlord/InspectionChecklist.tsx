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
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    backgroundColor: "#f3f4f6",
    padding: 8,
    marginBottom: 8,
  },
  checkItem: {
    flexDirection: "row",
    marginBottom: 6,
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
  checkText: {
    flex: 1,
    lineHeight: 1.4,
  },
  notesLine: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 32,
  },
  notesLabel: {
    fontSize: 9,
    color: "#6b7280",
  },
  notesUnderline: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    marginLeft: 4,
  },
  infoBox: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#3b82f6",
    padding: 12,
    marginTop: 16,
  },
  infoTitle: {
    fontFamily: "Helvetica-Bold",
    color: "#1d4ed8",
    marginBottom: 6,
  },
  infoText: {
    fontSize: 10,
    color: "#1e40af",
    lineHeight: 1.4,
    marginBottom: 4,
  },
  photoBox: {
    backgroundColor: "#faf5ff",
    borderWidth: 1,
    borderColor: "#9333ea",
    padding: 12,
    marginTop: 12,
  },
  photoTitle: {
    fontFamily: "Helvetica-Bold",
    color: "#7e22ce",
    marginBottom: 6,
  },
  photoText: {
    fontSize: 10,
    color: "#6b21a8",
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

interface Room {
  name: string;
  items: string[];
}

const ROOMS: Room[] = [
  {
    name: "Living Room",
    items: [
      "Walls — check for holes, scuffs, marks beyond normal wear",
      "Flooring — carpet stains, hardwood scratches, tile damage",
      "Windows — glass intact, locks functional, screens present",
      "Light fixtures — all working, covers intact",
      "Outlets and switches — functional, no damage to plates",
      "Ceiling — no water stains, cracks, or damage",
    ],
  },
  {
    name: "Kitchen",
    items: [
      "Appliances — stove, oven, refrigerator, dishwasher, microwave",
      "Countertops — chips, burns, stains, cracks",
      "Cabinets — doors aligned, hardware intact, interior clean",
      "Sink and faucet — drains properly, no leaks, no damage",
      "Flooring — tile grout, vinyl tears, stains",
      "Exhaust fan/hood — functional and clean",
    ],
  },
  {
    name: "Bathroom(s)",
    items: [
      "Toilet — functional, no leaks, seat intact",
      "Tub/shower — caulking, grout, drain, fixtures",
      "Sink and vanity — drains properly, cabinet doors intact",
      "Mirror — no cracks or damage",
      "Exhaust fan — functional",
      "Tile and flooring — grout, caulking, water damage",
    ],
  },
  {
    name: "Bedroom(s)",
    items: [
      "Walls — holes, marks, paint damage",
      "Flooring — carpet condition, hardwood scratches",
      "Closet — doors, shelving, rods intact",
      "Windows — glass, locks, screens",
      "Light fixtures — functional, covers intact",
    ],
  },
  {
    name: "Hallways / Entry",
    items: [
      "Walls — scuffs, holes, marks",
      "Flooring — wear patterns, damage",
      "Front door — lock, deadbolt, weatherstripping",
      "Doorbell — functional",
      "Light fixtures — functional",
    ],
  },
  {
    name: "Exterior / Patio",
    items: [
      "Patio/balcony — surface condition, railing intact",
      "Exterior door(s) — lock, condition, weatherstripping",
      "Landscaping — condition of assigned areas",
      "Parking area — oil stains, damage to assigned space",
      "Storage unit — clean, lock functional (if applicable)",
    ],
  },
];

interface InspectionChecklistProps {
  stateRules: StateRules;
}

export function InspectionChecklist({ stateRules }: InspectionChecklistProps) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Move-Out Inspection Checklist</Text>
      <Text style={styles.subtitle}>{stateRules.name} — Room-by-Room Assessment</Text>

      {ROOMS.map((room, ri) => (
        <View key={ri} style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>{room.name}</Text>
          {room.items.map((item, ii) => (
            <View key={ii}>
              <View style={styles.checkItem}>
                <View style={styles.checkbox} />
                <Text style={styles.checkText}>{item}</Text>
              </View>
              <View style={styles.notesLine}>
                <Text style={styles.notesLabel}>Notes:</Text>
                <View style={styles.notesUnderline} />
              </View>
            </View>
          ))}
        </View>
      ))}

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>
          {stateRules.name} Documentation Requirements
        </Text>
        <Text style={styles.infoText}>
          Under {stateRules.statuteTitle}, landlords must provide an itemized
          statement of deductions within {stateRules.returnDeadline} days of
          move-out.
          {stateRules.itemizedDeductionsRequired
            ? " Itemized deductions are required by law in your state."
            : " While not all states require itemization, it is strongly recommended for legal protection."}
        </Text>
        <Text style={styles.infoText}>
          {stateRules.certifiedMailRequired
            ? "Your state requires deposit communications to be sent via certified mail."
            : "Sending deposit communications via certified mail is recommended for proof of delivery."}
        </Text>
      </View>

      <View style={styles.photoBox}>
        <Text style={styles.photoTitle}>Photo Documentation Reminder</Text>
        <Text style={styles.photoText}>
          Photograph each room before and after the tenant move-out. Include
          timestamps and wide-angle shots showing overall room condition.
          Close-up shots should capture any specific damage. This evidence is
          critical if deductions are disputed.
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
