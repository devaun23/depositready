import type { StateCode } from '@/lib/state-rules/types';

export interface FilingKitData {
  // Step 1: Case info
  stateCode: StateCode | null;
  depositAmount: number | null;
  moveOutDate: string;
  depositReturnStatus: 'nothing' | 'partial' | 'full' | '';
  amountReturned: number | null;

  // Step 2: Addresses
  landlordName: string;
  landlordAddress: string;
  landlordCity: string;
  landlordState: string;
  landlordZip: string;
  propertyAddress: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  propertyUnit: string;

  // Step 3: Demand history
  sentDemandLetter: boolean;
  demandLetterDate: string;
  demandLetterMethod: 'certified_mail' | 'email' | 'hand_delivered' | 'regular_mail' | '';
  landlordResponded: boolean;
  landlordResponseSummary: string;
  deductionsClaimed: string;
  deductionsAmount: number | null;

  // Step 4: Tenant info
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  tenantAddress: string;
  tenantCity: string;
  tenantState: string;
  tenantZip: string;

  // Step 5: Tier + checkout
  tier: 'standard' | 'complete';
  name: string;
  email: string;
  phone: string;
}

export const EMPTY_FILING_KIT_DATA: FilingKitData = {
  stateCode: null,
  depositAmount: null,
  moveOutDate: '',
  depositReturnStatus: '',
  amountReturned: null,
  landlordName: '',
  landlordAddress: '',
  landlordCity: '',
  landlordState: '',
  landlordZip: '',
  propertyAddress: '',
  propertyCity: '',
  propertyState: '',
  propertyZip: '',
  propertyUnit: '',
  sentDemandLetter: false,
  demandLetterDate: '',
  demandLetterMethod: '',
  landlordResponded: false,
  landlordResponseSummary: '',
  deductionsClaimed: '',
  deductionsAmount: null,
  tenantName: '',
  tenantEmail: '',
  tenantPhone: '',
  tenantAddress: '',
  tenantCity: '',
  tenantState: '',
  tenantZip: '',
  tier: 'standard',
  name: '',
  email: '',
  phone: '',
};
