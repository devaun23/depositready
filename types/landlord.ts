/**
 * Landlord Response Kit Types
 *
 * Types for the landlord-facing response kit and wizard.
 * Used to generate the Landlord Response Kit PDF.
 */

import type { StateCode } from "@/lib/state-rules";

export interface LandlordFormData {
  // State and timing
  stateCode: StateCode;
  demandLetterDate: string; // ISO date string
  moveOutDate?: string; // When tenant moved out (if known)

  // Deposit info
  depositAmount: number;
  amountReturned: number;

  // Compliance status
  depositReturned: boolean;
  itemizedListSent: boolean;
  itemizedListDate?: string; // When itemization was sent

  // Deductions made
  deductions: LandlordDeduction[];

  // Landlord info
  landlord: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    email?: string;
    phone?: string;
  };

  // Tenant info (from demand letter)
  tenant: {
    name: string;
    currentAddress?: string;
    city?: string;
    state?: string;
    zip?: string;
  };

  // Property
  property: {
    address: string;
    city: string;
    state: string;
    zip: string;
    unit?: string;
  };
}

export interface LandlordDeduction {
  id: string;
  category: "cleaning" | "repairs" | "damages" | "unpaid_rent" | "other";
  description: string;
  amount: number;
  hasDocumentation: boolean;
  documentationType?: string; // e.g., "photos", "receipts", "invoices"
}
