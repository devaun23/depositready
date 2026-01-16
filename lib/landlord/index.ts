/**
 * Landlord Module
 *
 * Exports for landlord-facing risk calculator and related utilities.
 */

export type { RiskLevel, RiskCalculatorInput, RiskAssessment } from './types';
export { calculateLandlordRisk, getDeadlineRange } from './risk-calculator';
