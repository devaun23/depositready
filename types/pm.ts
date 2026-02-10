import type { StateCode } from "@/lib/state-rules";

export interface PMFormData {
  stateCode: StateCode;

  // Property & Lease (Step 1)
  property: {
    address: string;
    city: string;
    state: string;
    zip: string;
    unit?: string;
  };
  leaseStartDate: string;
  leaseEndDate: string;
  moveOutDate: string;
  depositAmount: number;

  // Deductions (Step 2)
  deductions: PMDeduction[];

  // Tenant Info (Step 3) — forwarding address required for certified mail per FL §83.49(3)(a)
  tenant: {
    name: string;
    forwardingAddress: string;
    city: string;
    state: string;
    zip: string;
    email?: string;
    phone?: string;
  };

  // PM / Company Info (Step 4)
  company: {
    companyName: string;
    managerName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
    licenseNumber?: string;
  };
}

export interface PMDeduction {
  id: string;
  category: PMDeductionCategory;
  description: string;
  amount: number;
  evidenceType: PMEvidenceType[];
  hasDocumentation: boolean;
}

export type PMDeductionCategory =
  | "cleaning"
  | "repairs"
  | "damages"
  | "unpaid_rent"
  | "early_termination"
  | "utilities"
  | "other";

export type PMEvidenceType =
  | "photos_before"
  | "photos_after"
  | "invoice"
  | "receipt"
  | "contractor_estimate"
  | "move_in_checklist"
  | "move_out_checklist"
  | "ledger"
  | "lease_clause"
  | "other";

export const PM_DEDUCTION_CATEGORY_LABELS: Record<PMDeductionCategory, string> = {
  cleaning: "Cleaning",
  repairs: "Repairs",
  damages: "Damages Beyond Wear & Tear",
  unpaid_rent: "Unpaid Rent",
  early_termination: "Early Termination",
  utilities: "Unpaid Utilities",
  other: "Other",
};

export const PM_EVIDENCE_TYPE_LABELS: Record<PMEvidenceType, string> = {
  photos_before: "Move-in Photos",
  photos_after: "Move-out Photos",
  invoice: "Invoice",
  receipt: "Receipt",
  contractor_estimate: "Contractor Estimate",
  move_in_checklist: "Move-in Checklist",
  move_out_checklist: "Move-out Checklist",
  ledger: "Payment Ledger",
  lease_clause: "Lease Clause",
  other: "Other Documentation",
};
