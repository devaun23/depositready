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
  subheading: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    marginBottom: 4,
    marginTop: 6,
    color: "#1e3a5f",
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 5,
    paddingLeft: 10,
  },
  bullet: {
    marginRight: 8,
    color: "#6366f1",
    fontFamily: "Helvetica-Bold",
  },
  bulletText: {
    flex: 1,
    lineHeight: 1.4,
  },
  paragraph: {
    marginBottom: 10,
    lineHeight: 1.5,
    color: "#374151",
  },
  tipBox: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#3b82f6",
    padding: 12,
    marginTop: 12,
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

const ROOM_ITEMS = [
  {
    room: "Living Room / Common Areas",
    items: [
      "Wide-angle shot of entire room from doorway",
      "All walls (one photo per wall)",
      "Flooring — carpet, hardwood, or tile condition",
      "Windows, blinds, and screens",
      "Light fixtures and switches",
      "Any pre-existing or new damage (close-up)",
    ],
  },
  {
    room: "Kitchen",
    items: [
      "Overall room shot from doorway",
      "All appliances (inside and outside of oven, fridge, microwave, dishwasher)",
      "Countertops and backsplash",
      "Under sink (check for leaks/damage)",
      "Cabinet interiors",
      "Flooring condition",
    ],
  },
  {
    room: "Bathroom(s)",
    items: [
      "Overall room shot",
      "Tub/shower — caulking, tile, grout",
      "Toilet — base, tank, seat",
      "Vanity and mirror",
      "Under sink area",
      "Exhaust fan and fixtures",
    ],
  },
  {
    room: "Bedroom(s)",
    items: [
      "Wide-angle from doorway",
      "Each wall surface",
      "Closet interior — shelving, rods, doors",
      "Flooring condition",
      "Window condition and hardware",
    ],
  },
  {
    room: "Exterior / Patio / Garage",
    items: [
      "Front entrance and door condition",
      "Patio/balcony surface and railing",
      "Parking area or garage",
      "Landscaping (if tenant-maintained)",
      "Storage areas",
    ],
  },
];

export function PhotoDocGuide() {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Photo Documentation Guide</Text>
      <Text style={styles.subtitle}>
        Best Practices for Property Condition Evidence
      </Text>

      {/* When to Photograph */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>When to Photograph</Text>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>*</Text>
          <Text style={styles.bulletText}>
            Before move-in — document baseline property condition
          </Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>*</Text>
          <Text style={styles.bulletText}>
            During the move-out inspection — with the tenant present if possible
          </Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>*</Text>
          <Text style={styles.bulletText}>
            After the tenant vacates — full documentation of final condition
          </Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>*</Text>
          <Text style={styles.bulletText}>
            Before and after any repairs — to substantiate deduction costs
          </Text>
        </View>
      </View>

      {/* What to Capture */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What to Capture Per Room</Text>
        {ROOM_ITEMS.map((room, ri) => (
          <View key={ri} wrap={false}>
            <Text style={styles.subheading}>{room.room}</Text>
            {room.items.map((item, ii) => (
              <View key={ii} style={styles.bulletItem}>
                <Text style={styles.bullet}>*</Text>
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Technical Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technical Tips</Text>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>*</Text>
          <Text style={styles.bulletText}>
            Lighting: Open blinds and turn on all lights. Avoid flash when
            possible — it can wash out details. Use natural light for best
            results.
          </Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>*</Text>
          <Text style={styles.bulletText}>
            Angles: Take wide-angle shots from the doorway first, then close-ups
            of specific areas. Shoot damage from multiple angles.
          </Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>*</Text>
          <Text style={styles.bulletText}>
            Timestamps: Enable date/time stamps on your camera or phone. If not
            available, include a dated newspaper or printed date card in the first
            photo of each session.
          </Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>*</Text>
          <Text style={styles.bulletText}>
            Scale: Place a ruler or common object (coin, pen) next to damage to
            show size. This is especially important for holes, stains, and cracks.
          </Text>
        </View>
      </View>

      {/* Organization and Backup */}
      <View style={styles.tipBox}>
        <Text style={styles.tipTitle}>Organization & Backup</Text>
        <Text style={styles.tipText}>
          Create folders by date and property address. Name files descriptively
          (e.g., &quot;2026-03-01_kitchen_countertop_burn.jpg&quot;).
        </Text>
        <Text style={styles.tipText}>
          Back up photos in at least two locations: cloud storage (Google Drive,
          iCloud, Dropbox) and a local hard drive or USB. Email copies to
          yourself for a timestamped record.
        </Text>
        <Text style={styles.tipText}>
          Never edit or filter photos used as evidence. Courts may question
          altered images. Keep originals untouched.
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
