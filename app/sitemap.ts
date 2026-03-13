import { MetadataRoute } from "next";
import { getAllCityParams } from "@/lib/city-data";
import { getAllSeoSlugs } from "@/lib/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://depositready.com";

  // Core pages
  const corePages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/wizard`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/chat`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
  ];

  // Programmatic SEO pages (deadline, law, penalty × 16 states)
  const programmaticPages = getAllSeoSlugs().map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Non-state SEO content pages (manually listed)
  const seoPages = [
    "/security-deposit-deadline",
    "/normal-wear-and-tear-vs-damage",
    "/can-landlord-charge-for-cleaning",
    "/can-landlord-charge-for-painting",
    "/security-deposit-not-returned-after-30-days",
    "/how-to-sue-landlord-for-security-deposit",
    "/security-deposit-dispute",
    "/security-deposit-demand-letter",
    "/landlord-kept-security-deposit",
    "/what-can-landlords-deduct-from-security-deposit",
    "/florida-rules",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // City pages
  const cityPages = getAllCityParams().map(({ state, city }) => ({
    url: `${baseUrl}/${state}/${city}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Policy pages
  const policyPages = ["/privacy", "/terms"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...corePages, ...programmaticPages, ...seoPages, ...cityPages, ...policyPages];
}
