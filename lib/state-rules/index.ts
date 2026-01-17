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
// Tier 1 expansion states
import { NEW_JERSEY } from './new-jersey';
import { ARIZONA } from './arizona';
import { COLORADO } from './colorado';
import { WASHINGTON } from './washington';
import { NORTH_CAROLINA } from './north-carolina';
import { VIRGINIA } from './virginia';
import { OHIO } from './ohio';
import { PENNSYLVANIA } from './pennsylvania';
import { MICHIGAN } from './michigan';
import { MASSACHUSETTS } from './massachusetts';
import type { StateCode, StateRules } from './types';

// Registry of all supported states
const STATE_REGISTRY: Record<StateCode, StateRules> = {
  // Original 6
  FL: FLORIDA,
  CA: CALIFORNIA,
  TX: TEXAS,
  NY: NEW_YORK,
  GA: GEORGIA,
  IL: ILLINOIS,
  // Tier 1 expansion
  NJ: NEW_JERSEY,
  AZ: ARIZONA,
  CO: COLORADO,
  WA: WASHINGTON,
  NC: NORTH_CAROLINA,
  VA: VIRGINIA,
  OH: OHIO,
  PA: PENNSYLVANIA,
  MI: MICHIGAN,
  MA: MASSACHUSETTS,
};

// Slug to code mapping
const SLUG_TO_CODE: Record<string, StateCode> = {
  // Original 6
  florida: 'FL',
  california: 'CA',
  texas: 'TX',
  'new-york': 'NY',
  georgia: 'GA',
  illinois: 'IL',
  // Tier 1 expansion
  'new-jersey': 'NJ',
  arizona: 'AZ',
  colorado: 'CO',
  washington: 'WA',
  'north-carolina': 'NC',
  virginia: 'VA',
  ohio: 'OH',
  pennsylvania: 'PA',
  michigan: 'MI',
  massachusetts: 'MA',
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
 * State options for select dropdowns
 */
export const STATE_OPTIONS = Object.entries(STATE_REGISTRY).map(([code, rules]) => ({
  value: code as StateCode,
  label: rules.name,
}));

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
// Tier 1 expansion
export { NEW_JERSEY } from './new-jersey';
export { ARIZONA } from './arizona';
export { COLORADO } from './colorado';
export { WASHINGTON } from './washington';
export { NORTH_CAROLINA } from './north-carolina';
export { VIRGINIA } from './virginia';
export { OHIO } from './ohio';
export { PENNSYLVANIA } from './pennsylvania';
export { MICHIGAN } from './michigan';
export { MASSACHUSETTS } from './massachusetts';

// Re-export deadline and damages functions
export { analyzeDeadlines } from './deadlines';
export { calculateDamages } from './damages';
