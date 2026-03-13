import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { parseSeoSlug, getAllSeoSlugs } from '@/lib/seo-pages';
import { getStateRules } from '@/lib/state-rules';
import { generateRelatedLinks } from '@/lib/seo-pages/linking';
import { SeoPageRenderer } from '@/components/seo/SeoPageRenderer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSeoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSeoSlug(slug);
  if (!parsed) return {};

  const rules = getStateRules(parsed.stateSlug);
  if (!rules) return {};

  return {
    title: parsed.pageType.titleTemplate(rules),
    description: parsed.pageType.descriptionTemplate(rules),
  };
}

export default async function SeoPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseSeoSlug(slug);
  if (!parsed) notFound();

  const rules = getStateRules(parsed.stateSlug);
  if (!rules) notFound();

  const { pageType } = parsed;
  const relatedLinks = generateRelatedLinks(pageType, rules);

  return (
    <SeoPageRenderer
      hero={pageType.hero(rules)}
      sections={pageType.sections(rules)}
      faq={pageType.faq(rules)}
      relatedLinks={relatedLinks}
      rules={rules}
      slug={slug}
      pageTypeId={pageType.id}
    />
  );
}
