import type { StateCode } from '@/lib/state-rules/types';

/** A single compliance question with state-specific applicability */
export interface ComplianceQuestion {
  id: string;
  text: string;
  helpText: string;
  /** Which StateRules field makes this question relevant */
  relevantWhen?: (rules: { certifiedMailRequired: boolean; itemizedDeductionsRequired: boolean }) => boolean;
  /** Statute section key for citation */
  statuteKey: 'returnDeadline' | 'claimDeadline' | 'itemizationRequirement' | 'forfeitureProvision' | 'damagesProvision';
}

/** Landlord's answer to a compliance question */
export interface ComplianceAnswer {
  questionId: string;
  answer: boolean; // true = compliant, false = non-compliant
}

/** A single violation found by the audit */
export interface ComplianceViolation {
  questionId: string;
  questionText: string;
  statuteRef: string;
  severity: 'critical' | 'warning';
  recommendation: string;
}

/** Result of running the compliance audit */
export interface AuditResult {
  stateCode: StateCode;
  stateName: string;
  overallStatus: 'compliant' | 'at_risk' | 'non_compliant';
  violations: ComplianceViolation[];
  compliantItems: string[];
  recommendations: string[];
  score: number; // 0-100
}

/** Liability exposure calculation for a landlord */
export interface LiabilityExposure {
  depositAmount: number;
  penaltyMultiplier: number;
  worstCaseTotal: number;
  breakEvenSettlement: number;
  filingFeeRange: { min: number; max: number };
  recommendation: 'settle' | 'negotiate' | 'defend';
  riskLevel: 'high' | 'medium' | 'low';
  breakdown: {
    depositReturn: number;
    penaltyDamages: number;
    estimatedCourtCosts: number;
    estimatedAttorneyFees: number;
  };
}

/** Shared intake data for landlord products (H1 + H2) */
export interface LandlordIntakeData {
  mode: 'compliance' | 'defense';
  // Step 1: State + Deposit
  stateCode: StateCode | null;
  depositAmount: number | null;
  moveOutDate: string;
  // Step 2: Compliance answers
  complianceAnswers: ComplianceAnswer[];
  // Step 3 (compliance): Property info
  propertyAddress: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  propertyType: 'single_family' | 'multi_family' | 'condo' | 'apartment' | '';
  numUnits: number | null;
  // Step 3 (defense): Threat details
  threatType: 'demand_letter' | 'verbal' | 'email' | 'attorney_letter' | 'court_filing' | '';
  threatDate: string;
  threatDescription: string;
  // Step 4: Landlord info
  landlordName: string;
  landlordEmail: string;
  landlordPhone: string;
  landlordAddress: string;
  landlordCity: string;
  landlordState: string;
  landlordZip: string;
  // Step 5 (defense): Tenant info
  tenantName: string;
  tenantEmail: string;
  tenantAddress: string;
  tenantCity: string;
  tenantState: string;
  tenantZip: string;
  // Checkout
  tier: 'standard' | 'complete';
  name: string;
  email: string;
  phone: string;
}

export const EMPTY_LANDLORD_INTAKE: LandlordIntakeData = {
  mode: 'compliance',
  stateCode: null,
  depositAmount: null,
  moveOutDate: '',
  complianceAnswers: [],
  propertyAddress: '',
  propertyCity: '',
  propertyState: '',
  propertyZip: '',
  propertyType: '',
  numUnits: null,
  threatType: '',
  threatDate: '',
  threatDescription: '',
  landlordName: '',
  landlordEmail: '',
  landlordPhone: '',
  landlordAddress: '',
  landlordCity: '',
  landlordState: '',
  landlordZip: '',
  tenantName: '',
  tenantEmail: '',
  tenantAddress: '',
  tenantCity: '',
  tenantState: '',
  tenantZip: '',
  tier: 'standard',
  name: '',
  email: '',
  phone: '',
};
