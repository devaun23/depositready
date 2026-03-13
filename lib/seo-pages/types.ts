/**
 * SEO Page Factory — Serializable Content Model
 *
 * Content is structured data, not JSX. This enables batch operations,
 * AI-assisted content generation, and future DB migration.
 */

import type { StateRules } from '@/lib/state-rules';

// --- Content Blocks (discriminated union) ---

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'checklist'; variant: 'bullet' | 'check'; items: string[] }
  | { type: 'deadline-box'; title: string; items: { days: string; description: string }[]; note?: string }
  | { type: 'callout'; variant: 'info' | 'warning' | 'success'; text: string }
  | { type: 'verdict-cta' }
  | { type: 'verdict-cta-compact' }
  | { type: 'statute-note'; text: string }
  | { type: 'statute-quote'; quote: string; citation: string };

// --- Section Data ---

export interface SeoSectionData {
  id: string;
  heading: string;
  variant?: 'default' | 'gray';
  blocks: ContentBlock[];
}

// --- FAQ ---

export interface FaqItem {
  question: string;
  answer: string;
}

// --- Related Links ---

export interface RelatedLink {
  title: string;
  href: string;
  description?: string;
}

// --- Hero Data ---

export interface HeroData {
  title: string;
  subtitle: string;
  intro: string;
  secondaryButton?: { text: string; href: string };
}

// --- Page Type Config ---

export interface PageTypeConfig {
  id: string;
  slugPrefix: string;
  status: 'published' | 'draft' | 'review';
  titleTemplate: (s: StateRules) => string;
  descriptionTemplate: (s: StateRules) => string;
  hero: (s: StateRules) => HeroData;
  sections: (s: StateRules) => SeoSectionData[];
  faq: (s: StateRules) => FaqItem[];
}

// --- Parsed Slug ---

export interface ParsedSeoSlug {
  pageType: PageTypeConfig;
  stateSlug: string;
}
