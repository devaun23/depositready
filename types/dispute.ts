import type { StateCode } from '@/lib/state-rules/types';

/**
 * Types for DepositReady dispute packet
 * Simplified for 4-step wizard flow
 */

// Wizard step data
export interface WizardData {
  // State selection (determines which rules apply)
  stateCode: StateCode | null;

  // Step 1: Basics
  email: string; // For delivery
  moveOutDate: string | null; // ISO date string
  depositAmount: number | null;

  // Landlord Info
  landlord: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };

  // Step 2: Property & Tenant
  property: {
    address: string;
    city: string;
    state: string;
    zip: string;
    unit: string;
  };

  tenant: {
    name: string;
    currentAddress: string;
    city: string;
    state: string;
    zip: string;
    email: string;
    phone: string;
  };

  // Step 3: Dispute
  issueType: "no_refund" | "unfair_deductions" | "partial_refund" | null;
  amountReceived: number | null;
  deductions: Deduction[];

  // Step 4: Review (evidence checkboxes)
  evidence: {
    hasPhotos: boolean;
    hasVideos: boolean;
    hasReceipts: boolean;
    hasLeaseAgreement: boolean;
    hasMoveInChecklist: boolean;
    hasMoveOutChecklist: boolean;
    hasCorrespondence: boolean;
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
  email: "",
  moveOutDate: null,
  depositAmount: null,
  landlord: {
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  },
  property: {
    address: "",
    city: "",
    state: "",
    zip: "",
    unit: "",
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
  },
};
