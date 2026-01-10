/**
 * Types for Google Places Address Autocomplete
 */

// Parsed address structure matching WizardData patterns
export interface ParsedAddress {
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
}

// Google Places component types (ambient declarations)
declare global {
  interface Window {
    google: typeof google;
  }
}
