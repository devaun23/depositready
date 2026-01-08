/**
 * State Rules Module
 *
 * Central export for all state-specific security deposit rules.
 * Use this module to get rules for any supported state.
 */

export type { StateCode, StateRules, DeadlineAnalysis, DamagesCalculation } from './types';

import { FLORIDA } from './florida';
import { CALIFORNIA } from './california';
import { TEXAS } from './texas';
import { NEW_YORK } from './new-york';
import { GEORGIA } from './georgia';
import { ILLINOIS } from './illinois';
import type { StateCode, StateRules } from './types';

// Registry of all supported states
const STATE_REGISTRY: Record<StateCode, StateRules> = {
  FL: FLORIDA,
  CA: CALIFORNIA,
  TX: TEXAS,
  NY: NEW_YORK,
  GA: GEORGIA,
  IL: ILLINOIS,
};

// Slug to code mapping
const SLUG_TO_CODE: Record<string, StateCode> = {
  florida: 'FL',
  california: 'CA',
  texas: 'TX',
  'new-york': 'NY',
  georgia: 'GA',
  illinois: 'IL',
};

/**
 * Get state rules by URL slug (e.g., "florida", "new-york")
 * Returns null if state is not supported
 */
export function getStateRules(slug: string): StateRules | null {
  const code = SLUG_TO_CODE[slug.toLowerCase()];
  if (!code) return null;
  return STATE_REGISTRY[code];
}

/**
 * Get state rules by state code (e.g., "FL", "CA")
 * Throws if state code is not supported
 */
export function getStateRulesByCode(code: StateCode): StateRules {
  const rules = STATE_REGISTRY[code];
  if (!rules) {
    throw new Error(`Unsupported state code: ${code}`);
  }
  return rules;
}

/**
 * Get all supported states
 */
export function getAllStates(): StateRules[] {
  return Object.values(STATE_REGISTRY);
}

/**
 * Get all supported state slugs (for generateStaticParams)
 */
export function getAllStateSlugs(): string[] {
  return Object.keys(SLUG_TO_CODE);
}

/**
 * Get all supported state codes
 */
export function getAllStateCodes(): StateCode[] {
  return Object.keys(STATE_REGISTRY) as StateCode[];
}

/**
 * Check if a slug is a valid state
 */
export function isValidStateSlug(slug: string): boolean {
  return slug.toLowerCase() in SLUG_TO_CODE;
}

/**
 * Check if a code is a valid state
 */
export function isValidStateCode(code: string): code is StateCode {
  return code in STATE_REGISTRY;
}

/**
 * Get state code from slug
 */
export function getStateCodeFromSlug(slug: string): StateCode | null {
  return SLUG_TO_CODE[slug.toLowerCase()] || null;
}

/**
 * Format a date for legal documents (Month Day, Year)
 */
export function formatLegalDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Generate statute citation for a state
 */
export function getStatuteCitation(rules: StateRules): string {
  return rules.statuteTitle;
}

// Re-export individual state rules for direct import if needed
export { FLORIDA } from './florida';
export { CALIFORNIA } from './california';
export { TEXAS } from './texas';
export { NEW_YORK } from './new-york';
export { GEORGIA } from './georgia';
export { ILLINOIS } from './illinois';

// Re-export deadline and damages functions
export { analyzeDeadlines } from './deadlines';
export { calculateDamages } from './damages';
