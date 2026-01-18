import type { StateCode } from "../state-rules/types";

export interface SmallClaimsCourt {
  name: string;
  address: string;
  filingInfo?: string;
  phone?: string;
}

export interface CityData {
  slug: string;
  name: string;
  stateCode: StateCode;
  stateSlug: string;
  population?: number;
  county: string;
  smallClaimsCourt: SmallClaimsCourt;
  rentalMarketInfo?: string;
}
