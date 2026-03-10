import {
  Document,
} from "@react-pdf/renderer";
import type { LandlordIntakeData, AuditResult, LiabilityExposure } from "@/lib/landlord/types";
import type { StateRules } from "@/lib/state-rules";
import type { CourtInfo } from "@/lib/state-rules/court-info";
import { LiabilityReport } from "./LiabilityReport";
import { ComplianceReport } from "./ComplianceReport";
import { ResponseLetter } from "./ResponseLetter";
import { SettleVsFight } from "./SettleVsFight";
import { DeadlineTimeline } from "./DeadlineTimeline";
import { CertifiedMailInstructions } from "./CertifiedMailInstructions";
import { SettlementAgreement } from "./SettlementAgreement";
import { EvidenceOrganizer } from "./EvidenceOrganizer";
import { PhotoDocGuide } from "./PhotoDocGuide";

interface LandlordDefensePacketProps {
  data: LandlordIntakeData;
  auditResult: AuditResult;
  liability: LiabilityExposure;
  stateRules: StateRules;
  courtInfo: CourtInfo;
  tier: "standard" | "complete";
}

export function LandlordDefensePacket({
  data,
  auditResult,
  liability,
  stateRules,
  courtInfo,
  tier,
}: LandlordDefensePacketProps) {
  return (
    <Document>
      {/* Standard tier pages */}
      <LiabilityReport liability={liability} stateRules={stateRules} />
      <ComplianceReport auditResult={auditResult} stateRules={stateRules} />
      <ResponseLetter data={data} stateRules={stateRules} />
      <SettleVsFight liability={liability} />
      <DeadlineTimeline stateRules={stateRules} moveOutDate={data.moveOutDate} />
      <CertifiedMailInstructions />

      {/* Complete tier additions */}
      {tier === "complete" && (
        <>
          <SettlementAgreement data={data} />
          <EvidenceOrganizer mode="defense" />
          <PhotoDocGuide />
        </>
      )}
    </Document>
  );
}
