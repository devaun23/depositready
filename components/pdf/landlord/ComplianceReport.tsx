import {
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { AuditResult } from "@/lib/landlord/types";
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
  badgeRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  badgeCompliant: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    paddingHorizontal: 16,
    paddingVertical: 6,
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
  },
  badgeAtRisk: {
    backgroundColor: "#fef9c3",
    color: "#a16207",
    paddingHorizontal: 16,
    paddingVertical: 6,
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
  },
  badgeNonCompliant: {
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    paddingHorizontal: 16,
    paddingVertical: 6,
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  scoreLabel: {
    fontSize: 12,
    color: "#374151",
  },
  scoreValue: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#1e3a5f",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    backgroundColor: "#f3f4f6",
    padding: 8,
    marginBottom: 10,
  },
  violationCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 10,
    marginBottom: 8,
  },
  violationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  violationQuestion: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    flex: 1,
  },
  severityCritical: {
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  severityWarning: {
    backgroundColor: "#fef9c3",
    color: "#a16207",
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  statuteRef: {
    fontSize: 9,
    color: "#6366f1",
    marginBottom: 4,
  },
  recommendation: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.4,
  },
  compliantItem: {
    flexDirection: "row",
    marginBottom: 6,
    paddingLeft: 10,
  },
  checkmark: {
    color: "#16a34a",
    fontFamily: "Helvetica-Bold",
    marginRight: 8,
    fontSize: 12,
  },
  compliantText: {
    flex: 1,
    lineHeight: 1.4,
  },
  recItem: {
    flexDirection: "row",
    marginBottom: 6,
    paddingLeft: 10,
  },
  recBullet: {
    color: "#6366f1",
    marginRight: 8,
    fontFamily: "Helvetica-Bold",
  },
  recText: {
    flex: 1,
    lineHeight: 1.4,
    color: "#374151",
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

const STATUS_LABELS: Record<string, string> = {
  compliant: "COMPLIANT",
  at_risk: "AT RISK",
  non_compliant: "NON-COMPLIANT",
};

interface ComplianceReportProps {
  auditResult: AuditResult;
  stateRules: StateRules;
}

export function ComplianceReport({ auditResult, stateRules }: ComplianceReportProps) {
  const badgeStyle =
    auditResult.overallStatus === "compliant"
      ? styles.badgeCompliant
      : auditResult.overallStatus === "at_risk"
        ? styles.badgeAtRisk
        : styles.badgeNonCompliant;

  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Compliance Audit Report</Text>
      <Text style={styles.subtitle}>{stateRules.name} — {stateRules.statuteTitle}</Text>

      {/* Status Badge */}
      <View style={styles.badgeRow}>
        <Text style={badgeStyle}>
          {STATUS_LABELS[auditResult.overallStatus]}
        </Text>
      </View>

      {/* Score */}
      <View style={styles.scoreRow}>
        <Text style={styles.scoreLabel}>Compliance Score: </Text>
        <Text style={styles.scoreValue}>{auditResult.score}/100</Text>
      </View>

      {/* Violations */}
      {auditResult.violations.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Violations Found ({auditResult.violations.length})
          </Text>
          {auditResult.violations.map((v, i) => (
            <View key={i} style={styles.violationCard}>
              <View style={styles.violationHeader}>
                <Text style={styles.violationQuestion}>{v.questionText}</Text>
                <Text
                  style={
                    v.severity === "critical"
                      ? styles.severityCritical
                      : styles.severityWarning
                  }
                >
                  {v.severity.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.statuteRef}>{v.statuteRef}</Text>
              <Text style={styles.recommendation}>{v.recommendation}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Compliant Items */}
      {auditResult.compliantItems.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Compliant Items ({auditResult.compliantItems.length})
          </Text>
          {auditResult.compliantItems.map((item, i) => (
            <View key={i} style={styles.compliantItem}>
              <Text style={styles.checkmark}>+</Text>
              <Text style={styles.compliantText}>{item}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Recommendations */}
      {auditResult.recommendations.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {auditResult.recommendations.map((rec, i) => (
            <View key={i} style={styles.recItem}>
              <Text style={styles.recBullet}>{i + 1}.</Text>
              <Text style={styles.recText}>{rec}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.footer}>
        <Text>
          Generated by DepositReady.co | This document does not constitute legal advice.
        </Text>
      </View>
    </Page>
  );
}
