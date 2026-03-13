/**
 * SEO Page Renderer — Maps serializable data → SEO components.
 *
 * Pure mapping layer. No business logic.
 * Reads ContentBlock types and renders the corresponding component.
 */

import {
  SEOPageLayout,
  SEOHeroWithCTA,
  SEOSection,
  SEOCheckList,
  SEODeadlineBox,
  SEOCallout,
  SEOFAQWithSchema,
  SEORelatedResources,
  SEODisclaimer,
} from '@/components/seo';
import { SEOVerdictCTA } from './SEOVerdictCTA';
import type { StateRules } from '@/lib/state-rules';
import type {
  SeoSectionData,
  ContentBlock,
  FaqItem,
  RelatedLink,
  HeroData,
} from '@/lib/seo-pages/types';

interface SeoPageRendererProps {
  hero: HeroData;
  sections: SeoSectionData[];
  faq: FaqItem[];
  relatedLinks: RelatedLink[];
  rules: StateRules;
  slug: string;
  pageTypeId: string;
}

function renderBlock(
  block: ContentBlock,
  index: number,
  rules: StateRules,
  slug: string,
  pageTypeId: string,
) {
  switch (block.type) {
    case 'paragraph':
      return <p key={index}>{block.text}</p>;

    case 'checklist':
      return <SEOCheckList key={index} items={block.items} variant={block.variant} />;

    case 'deadline-box':
      return (
        <SEODeadlineBox
          key={index}
          title={block.title}
          items={block.items}
          note={block.note}
        />
      );

    case 'callout':
      return (
        <SEOCallout key={index} variant={block.variant}>
          {block.text}
        </SEOCallout>
      );

    case 'verdict-cta':
      return (
        <SEOVerdictCTA
          key={index}
          stateName={rules.name}
          stateSlug={rules.slug}
          stateCode={rules.code}
          slug={slug}
          pageTypeId={pageTypeId}
          damagesMultiplier={rules.damagesMultiplier}
        />
      );

    case 'verdict-cta-compact':
      return (
        <SEOVerdictCTA
          key={index}
          stateName={rules.name}
          stateSlug={rules.slug}
          stateCode={rules.code}
          slug={slug}
          pageTypeId={pageTypeId}
          damagesMultiplier={rules.damagesMultiplier}
          compact
        />
      );

    case 'statute-note':
      return (
        <p key={index} className="text-sm text-gray-500">
          {block.text}
        </p>
      );

    case 'statute-quote':
      return (
        <blockquote
          key={index}
          className="border-l-4 border-indigo-300 bg-indigo-50/50 pl-4 py-3 my-4 text-sm text-gray-700 italic"
        >
          <p>"{block.quote}"</p>
          <cite className="block mt-2 text-xs text-gray-500 not-italic font-medium">
            — {block.citation}
          </cite>
        </blockquote>
      );
  }
}

export function SeoPageRenderer({
  hero,
  sections,
  faq,
  relatedLinks,
  rules,
  slug,
  pageTypeId,
}: SeoPageRendererProps) {
  return (
    <SEOPageLayout>
      <SEOHeroWithCTA
        title={hero.title}
        subtitle={hero.subtitle}
        intro={hero.intro}
        primaryButton={{ text: 'Check My Case Free', href: `/check-my-case?state=${rules.code}&ref=${slug}&page_type=${pageTypeId}` }}
        secondaryButton={hero.secondaryButton}
        tagline={`Used by renters across ${rules.name} · Secure checkout · Not legal advice`}
      />

      {sections.map((section) => {
        // Sections with no heading that only contain a CTA render the CTA directly
        if (!section.heading && section.blocks.length === 1 && (section.blocks[0].type === 'verdict-cta' || section.blocks[0].type === 'verdict-cta-compact')) {
          return renderBlock(section.blocks[0], 0, rules, slug, pageTypeId);
        }

        return (
          <SEOSection
            key={section.id}
            title={section.heading || undefined}
            variant={section.variant === 'gray' ? 'gray' : 'white'}
          >
            {section.blocks.map((block, i) =>
              renderBlock(block, i, rules, slug, pageTypeId)
            )}
          </SEOSection>
        );
      })}

      <SEOFAQWithSchema title={`${rules.name} FAQ`} items={faq} />

      <SEORelatedResources links={relatedLinks} />

      <SEODisclaimer />
    </SEOPageLayout>
  );
}
