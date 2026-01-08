import type { StateCode } from '@/lib/state-rules/types';

/**
 * Types for DepositReady dispute packet
 */

// Wizard step data
export interface WizardData {
  // State selection (determines which rules apply)
  stateCode: StateCode | null;

  // Step 1: Situation
  situation: "moved_out" | "still_living" | null;

  // Step 2: Timeline
  moveOutDate: string | null; // ISO date string
  depositPaidDate: string | null;

  // Step 3: Deposit Details
  depositAmount: number | null;
  wasItemized: boolean | null;

  // Step 4: Landlord Info
  landlord: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    email: string;
    phone: string;
  };

  // Step 5: Property Info
  property: {
    address: string;
    city: string;
    state: string;
    zip: string;
    unit: string;
    leaseStartDate: string | null;
    leaseEndDate: string | null;
  };

  // Step 6: What Happened
  issueType: "no_refund" | "unfair_deductions" | "partial_refund" | null;
  amountReceived: number | null;

  // Step 7: Deductions (if applicable)
  deductions: Deduction[];

  // Step 8: Evidence
  evidence: {
    hasPhotos: boolean;
    hasVideos: boolean;
    hasReceipts: boolean;
    hasLeaseAgreement: boolean;
    hasMoveInChecklist: boolean;
    hasMoveOutChecklist: boolean;
    hasCorrespondence: boolean;
    otherEvidence: string;
  };

  // Step 9: Prior Communication
  priorCommunication: {
    hasContacted: boolean;
    contactMethod: "email" | "phone" | "letter" | "in_person" | null;
    contactDate: string | null;
    response: string;
  };

  // Step 10: Tenant Info (for documents)
  tenant: {
    name: string;
    currentAddress: string;
    city: string;
    state: string;
    zip: string;
    email: string;
    phone: string;
  };
}

export interface Deduction {
  id: string;
  description: string;
  amount: number;
  dispute: string; // Tenant's rebuttal
  category:
    | "cleaning"
    | "damage"
    | "unpaid_rent"
    | "utilities"
    | "other"
    | null;
}

// Database record
export interface DisputeRecord {
  id: string;
  created_at: string;
  wizard_data: WizardData;
  move_out_date: string | null;
  deposit_amount: number | null;
  landlord_name: string | null;
  property_address: string | null;
  stripe_session_id: string | null;
  paid_at: string | null;
  amount_paid: number | null;
  download_token: string | null;
  downloaded_at: string | null;
}

// Empty wizard data for initialization
export const EMPTY_WIZARD_DATA: WizardData = {
  stateCode: null,
  situation: null,
  moveOutDate: null,
  depositPaidDate: null,
  depositAmount: null,
  wasItemized: null,
  landlord: {
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
  },
  property: {
    address: "",
    city: "",
    state: "",
    zip: "",
    unit: "",
    leaseStartDate: null,
    leaseEndDate: null,
  },
  issueType: null,
  amountReceived: null,
  deductions: [],
  evidence: {
    hasPhotos: false,
    hasVideos: false,
    hasReceipts: false,
    hasLeaseAgreement: false,
    hasMoveInChecklist: false,
    hasMoveOutChecklist: false,
    hasCorrespondence: false,
    otherEvidence: "",
  },
  priorCommunication: {
    hasContacted: false,
    contactMethod: null,
    contactDate: null,
    response: "",
  },
  tenant: {
    name: "",
    currentAddress: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
  },
};
