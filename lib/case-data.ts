export interface CaseData {
  state: string;
  depositAmount: string;
  daysSinceMoveOut: string;
  depositReturned: string;
  writtenNotice: string;
  damageDeductions: string;
}

export interface CaseAnalysis {
  deposit: number;
  days: number;
  deadline: number;
  violations: string[];
  penaltyAmount: number;
  totalClaim: number;
  strength: "STRONG" | "MODERATE" | "WEAK";
  statute: string;
  stateName: string;
  stateCode: string;
  penaltyMultiplier: number;
}

export const STATE_LAWS: Record<string, { deadline: number; penaltyMultiplier: number; statute: string; stateName: string }> = {
  AL: { deadline: 60, penaltyMultiplier: 2, statute: "AL Code § 35-9A-201", stateName: "Alabama" },
  AK: { deadline: 14, penaltyMultiplier: 2, statute: "AK Stat. § 34.03.070", stateName: "Alaska" },
  AZ: { deadline: 14, penaltyMultiplier: 2, statute: "AZ Rev. Stat. § 33-1321", stateName: "Arizona" },
  AR: { deadline: 60, penaltyMultiplier: 2, statute: "AR Code § 18-16-305", stateName: "Arkansas" },
  CA: { deadline: 21, penaltyMultiplier: 2, statute: "CA Civ. Code § 1950.5", stateName: "California" },
  CO: { deadline: 60, penaltyMultiplier: 3, statute: "CO Rev. Stat. § 38-12-103", stateName: "Colorado" },
  CT: { deadline: 30, penaltyMultiplier: 2, statute: "CT Gen. Stat. § 47a-21", stateName: "Connecticut" },
  DE: { deadline: 20, penaltyMultiplier: 2, statute: "DE Code tit. 25 § 5514", stateName: "Delaware" },
  FL: { deadline: 30, penaltyMultiplier: 3, statute: "FL Stat. § 83.49", stateName: "Florida" },
  GA: { deadline: 30, penaltyMultiplier: 3, statute: "GA Code § 44-7-35", stateName: "Georgia" },
  HI: { deadline: 14, penaltyMultiplier: 2, statute: "HI Rev. Stat. § 521-44", stateName: "Hawaii" },
  ID: { deadline: 30, penaltyMultiplier: 2, statute: "ID Code § 6-321", stateName: "Idaho" },
  IL: { deadline: 45, penaltyMultiplier: 2, statute: "765 ILCS 710/1", stateName: "Illinois" },
  IN: { deadline: 45, penaltyMultiplier: 2, statute: "IN Code § 32-31-3-12", stateName: "Indiana" },
  IA: { deadline: 30, penaltyMultiplier: 2, statute: "IA Code § 562A.12", stateName: "Iowa" },
  KS: { deadline: 30, penaltyMultiplier: 2, statute: "KS Stat. § 58-2550", stateName: "Kansas" },
  KY: { deadline: 30, penaltyMultiplier: 2, statute: "KY Rev. Stat. § 383.580", stateName: "Kentucky" },
  LA: { deadline: 30, penaltyMultiplier: 2, statute: "LA Rev. Stat. § 9:3251", stateName: "Louisiana" },
  ME: { deadline: 30, penaltyMultiplier: 2, statute: "ME Rev. Stat. tit. 14 § 6033", stateName: "Maine" },
  MD: { deadline: 45, penaltyMultiplier: 3, statute: "MD Code Real Prop. § 8-203", stateName: "Maryland" },
  MA: { deadline: 30, penaltyMultiplier: 3, statute: "MA Gen. Laws ch. 186 § 15B", stateName: "Massachusetts" },
  MI: { deadline: 30, penaltyMultiplier: 2, statute: "MI Comp. Laws § 554.613", stateName: "Michigan" },
  MN: { deadline: 21, penaltyMultiplier: 2, statute: "MN Stat. § 504B.178", stateName: "Minnesota" },
  MS: { deadline: 45, penaltyMultiplier: 2, statute: "MS Code § 89-8-21", stateName: "Mississippi" },
  MO: { deadline: 30, penaltyMultiplier: 2, statute: "MO Rev. Stat. § 535.300", stateName: "Missouri" },
  MT: { deadline: 30, penaltyMultiplier: 2, statute: "MT Code § 70-25-202", stateName: "Montana" },
  NE: { deadline: 14, penaltyMultiplier: 2, statute: "NE Rev. Stat. § 76-1416", stateName: "Nebraska" },
  NV: { deadline: 30, penaltyMultiplier: 2, statute: "NV Rev. Stat. § 118A.242", stateName: "Nevada" },
  NH: { deadline: 30, penaltyMultiplier: 2, statute: "NH Rev. Stat. § 540-A:7", stateName: "New Hampshire" },
  NJ: { deadline: 30, penaltyMultiplier: 2, statute: "NJ Rev. Stat. § 46:8-21.1", stateName: "New Jersey" },
  NM: { deadline: 30, penaltyMultiplier: 2, statute: "NM Stat. § 47-8-18", stateName: "New Mexico" },
  NY: { deadline: 14, penaltyMultiplier: 2, statute: "NY GOL § 7-108", stateName: "New York" },
  NC: { deadline: 30, penaltyMultiplier: 2, statute: "NC Gen. Stat. § 42-52", stateName: "North Carolina" },
  ND: { deadline: 30, penaltyMultiplier: 2, statute: "ND Cent. Code § 47-16-07.1", stateName: "North Dakota" },
  OH: { deadline: 30, penaltyMultiplier: 2, statute: "ORC § 5321.16", stateName: "Ohio" },
  OK: { deadline: 45, penaltyMultiplier: 2, statute: "OK Stat. tit. 41 § 115", stateName: "Oklahoma" },
  OR: { deadline: 31, penaltyMultiplier: 2, statute: "ORS 90.300", stateName: "Oregon" },
  PA: { deadline: 30, penaltyMultiplier: 2, statute: "68 Pa.C.S. § 250.512", stateName: "Pennsylvania" },
  RI: { deadline: 20, penaltyMultiplier: 2, statute: "RI Gen. Laws § 34-18-19", stateName: "Rhode Island" },
  SC: { deadline: 30, penaltyMultiplier: 3, statute: "SC Code § 27-40-410", stateName: "South Carolina" },
  SD: { deadline: 14, penaltyMultiplier: 2, statute: "SD Codified Laws § 43-32-24", stateName: "South Dakota" },
  TN: { deadline: 30, penaltyMultiplier: 2, statute: "TN Code § 66-28-301", stateName: "Tennessee" },
  TX: { deadline: 30, penaltyMultiplier: 3, statute: "TX Prop. Code § 92.109", stateName: "Texas" },
  UT: { deadline: 30, penaltyMultiplier: 2, statute: "UT Code § 57-17-3", stateName: "Utah" },
  VT: { deadline: 14, penaltyMultiplier: 2, statute: "VT Stat. tit. 9 § 4461", stateName: "Vermont" },
  VA: { deadline: 45, penaltyMultiplier: 2, statute: "VA Code § 55.1-1226", stateName: "Virginia" },
  WA: { deadline: 21, penaltyMultiplier: 2, statute: "RCW 59.18.280", stateName: "Washington" },
  WV: { deadline: 60, penaltyMultiplier: 2, statute: "WV Code § 37-6A-2", stateName: "West Virginia" },
  WI: { deadline: 21, penaltyMultiplier: 2, statute: "WI Stat. § 704.28", stateName: "Wisconsin" },
  WY: { deadline: 30, penaltyMultiplier: 2, statute: "WY Stat. § 1-21-1208", stateName: "Wyoming" },
};

export function analyzeCaseData(caseData: CaseData): CaseAnalysis | null {
  const deposit = parseFloat(caseData.depositAmount) || 0;
  const stateLaw = STATE_LAWS[caseData.state];
  const days = parseInt(caseData.daysSinceMoveOut) || 0;
  if (!deposit || !stateLaw || !days) return null;

  const violations: string[] = [];
  let penaltyAmount = 0;

  if (days > stateLaw.deadline && caseData.depositReturned === "no") {
    violations.push(`Missed ${stateLaw.deadline}-day statutory return deadline`);
    penaltyAmount = deposit * (stateLaw.penaltyMultiplier - 1);
  }
  if (caseData.writtenNotice === "no" && caseData.depositReturned === "no") {
    violations.push("Missing itemized deductions notice");
  }
  if (caseData.damageDeductions === "yes" && caseData.writtenNotice === "no") {
    violations.push("Deductions taken without proper itemization");
  }

  const totalClaim = deposit + penaltyAmount;
  const strength = violations.length >= 2 ? "STRONG" : violations.length === 1 ? "MODERATE" : "WEAK";

  return {
    deposit,
    days,
    deadline: stateLaw.deadline,
    violations,
    penaltyAmount,
    totalClaim,
    strength,
    statute: stateLaw.statute,
    stateName: stateLaw.stateName,
    stateCode: caseData.state,
    penaltyMultiplier: stateLaw.penaltyMultiplier,
  };
}
