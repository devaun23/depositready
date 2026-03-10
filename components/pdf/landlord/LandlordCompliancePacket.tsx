import {
  Document,
} from "@react-pdf/renderer";
import type { LandlordIntakeData, AuditResult } from "@/lib/landlord/types";
import type { StateRules } from "@/lib/state-rules";
import type { CourtInfo } from "@/lib/state-rules/court-info";
import { ComplianceReport } from "./ComplianceReport";
import { DeadlineTimeline } from "./DeadlineTimeline";
import { InspectionChecklist } from "./InspectionChecklist";
import { DeductionLetterTemplate } from "./DeductionLetterTemplate";
import { WearAndTearGuide } from "./WearAndTearGuide";
import { CertifiedMailInstructions } from "./CertifiedMailInstructions";
import { PhotoDocGuide } from "./PhotoDocGuide";
import { EvidenceOrganizer } from "./EvidenceOrganizer";

interface LandlordCompliancePacketProps {
  data: LandlordIntakeData;
  auditResult: AuditResult;
  stateRules: StateRules;
  courtInfo: CourtInfo;
  tier: "standard" | "complete";
}

export function LandlordCompliancePacket({
  data,
  auditResult,
  stateRules,
  courtInfo,
  tier,
}: LandlordCompliancePacketProps) {
  return (
    <Document>
      {/* Standard tier pages */}
      <ComplianceReport auditResult={auditResult} stateRules={stateRules} />
      <DeadlineTimeline stateRules={stateRules} moveOutDate={data.moveOutDate} />
      <InspectionChecklist stateRules={stateRules} />
      <DeductionLetterTemplate data={data} stateRules={stateRules} />
      <WearAndTearGuide stateRules={stateRules} />
      <CertifiedMailInstructions />

      {/* Complete tier additions */}
      {tier === "complete" && (
        <>
          <PhotoDocGuide />
          <EvidenceOrganizer mode="compliance" />
        </>
      )}
    </Document>
  );
}
