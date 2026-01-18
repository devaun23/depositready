import type { CityData } from "./types";
import { GEORGIA_CITIES } from "./georgia";

// Registry of all cities by state
const CITY_REGISTRY: Record<string, CityData[]> = {
  georgia: GEORGIA_CITIES,
};

/**
 * Get all cities across all states
 */
export function getAllCities(): CityData[] {
  return Object.values(CITY_REGISTRY).flat();
}

/**
 * Get all cities for a specific state
 */
export function getCitiesByState(stateSlug: string): CityData[] {
  return CITY_REGISTRY[stateSlug] || [];
}

/**
 * Get city data by state and city slug
 */
export function getCityData(
  stateSlug: string,
  citySlug: string
): CityData | null {
  const cities = CITY_REGISTRY[stateSlug];
  if (!cities) return null;
  return cities.find((city) => city.slug === citySlug) || null;
}

/**
 * Check if a city exists
 */
export function isValidCity(stateSlug: string, citySlug: string): boolean {
  return getCityData(stateSlug, citySlug) !== null;
}

/**
 * Get all state-city combinations for generateStaticParams
 */
export function getAllCityParams(): { state: string; city: string }[] {
  return getAllCities().map((city) => ({
    state: city.stateSlug,
    city: city.slug,
  }));
}

/**
 * Get all city slugs for a state
 */
export function getCitySlugs(stateSlug: string): string[] {
  return getCitiesByState(stateSlug).map((city) => city.slug);
}

// Re-export types
export type { CityData, SmallClaimsCourt } from "./types";
