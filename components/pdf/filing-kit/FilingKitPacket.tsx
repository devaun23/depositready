import { Document } from "@react-pdf/renderer";
import type { StateRules } from "@/lib/state-rules";
import type { CourtInfo } from "@/lib/state-rules/court-info";
import type { FilingKitData } from "@/types/filing-kit";
import { DamageWorksheet } from "./DamageWorksheet";
import { FilingGuide } from "./FilingGuide";
import { ServiceOfProcessGuide } from "./ServiceOfProcessGuide";
import { StatementOfClaim } from "./StatementOfClaim";
import { CourtroomScript } from "./CourtroomScript";
import { PostJudgmentGuide } from "./PostJudgmentGuide";

interface FilingKitPacketProps {
  data: FilingKitData;
  stateRules: StateRules;
  courtInfo: CourtInfo;
  tier: "standard" | "complete";
}

export function FilingKitPacket({ data, stateRules, courtInfo, tier }: FilingKitPacketProps) {
  return (
    <Document>
      {/* Standard tier: always included */}
      <DamageWorksheet data={data} stateRules={stateRules} />
      <FilingGuide stateRules={stateRules} courtInfo={courtInfo} />
      <ServiceOfProcessGuide stateRules={stateRules} courtInfo={courtInfo} />

      {/* Complete tier: additional documents */}
      {tier === "complete" && (
        <>
          <StatementOfClaim data={data} stateRules={stateRules} />
          <CourtroomScript data={data} stateRules={stateRules} />
          <PostJudgmentGuide stateRules={stateRules} courtInfo={courtInfo} />
        </>
      )}
    </Document>
  );
}
