import Script from "next/script";
import { SEOFAQ } from "./SEOFAQ";

interface SEOFAQWithSchemaProps {
  title: string;
  items: { question: string; answer: string }[];
}

/**
 * SEOFAQ component with FAQPage schema.org structured data.
 * The JSON-LD data is built from our own static FAQ content (trusted).
 */
export function SEOFAQWithSchema({ title, items }: SEOFAQWithSchemaProps) {
  // Build FAQPage schema from items
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(faqSchema)}
      </Script>
      <SEOFAQ title={title} items={items} />
    </>
  );
}
