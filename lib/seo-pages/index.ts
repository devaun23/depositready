/**
 * SEO Page Factory — Registry + Slug Parsing
 *
 * Central registry for all programmatic SEO page types.
 * Handles slug parsing, static param generation, and page type lookup.
 */

import { getAllStateSlugs, getStateRules } from '@/lib/state-rules';
import type { PageTypeConfig, ParsedSeoSlug } from './types';
import { deadlineTemplate } from './templates/deadline';
import { lawTemplate } from './templates/law';
import { penaltyTemplate } from './templates/penalty';

// --- Registry ---

export const PAGE_TYPES: PageTypeConfig[] = [
  deadlineTemplate,
  lawTemplate,
  penaltyTemplate,
];

// --- Lookup ---

export function getPageType(id: string): PageTypeConfig | undefined {
  return PAGE_TYPES.find(pt => pt.id === id);
}

// --- Slug Parsing ---

/**
 * Parse an SEO slug into its page type and state.
 *
 * Examples:
 *   "security-deposit-deadline-florida" → { pageType: deadline, stateSlug: "florida" }
 *   "security-deposit-law-new-york"     → { pageType: law, stateSlug: "new-york" }
 *   "deposit-penalty-texas"             → { pageType: penalty, stateSlug: "texas" }
 */
export function parseSeoSlug(slug: string): ParsedSeoSlug | null {
  for (const pageType of PAGE_TYPES) {
    const prefix = `${pageType.slugPrefix}-`;
    if (slug.startsWith(prefix)) {
      const stateSlug = slug.slice(prefix.length);
      const rules = getStateRules(stateSlug);
      if (rules) {
        return { pageType, stateSlug };
      }
    }
  }
  return null;
}

// --- Static Params ---

/**
 * Generate all SEO slugs for generateStaticParams.
 * Only includes published page types.
 */
export function getAllSeoSlugs(): string[] {
  const slugs: string[] = [];
  const stateSlugs = getAllStateSlugs();

  for (const pageType of PAGE_TYPES) {
    if (pageType.status !== 'published') continue;
    for (const stateSlug of stateSlugs) {
      slugs.push(`${pageType.slugPrefix}-${stateSlug}`);
    }
  }

  return slugs;
}

// Re-export types
export type { PageTypeConfig, ParsedSeoSlug, SeoSectionData, ContentBlock, FaqItem, RelatedLink, HeroData } from './types';
