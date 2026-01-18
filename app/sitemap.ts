import { MetadataRoute } from "next";
import { getAllCityParams } from "@/lib/city-data";

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
  ];

  // SEO content pages
  const seoPages = [
    "/security-deposit-deadline",
    // Original state deadline pages
    "/security-deposit-deadline-california",
    "/security-deposit-deadline-florida",
    "/security-deposit-deadline-georgia",
    "/security-deposit-deadline-illinois",
    "/security-deposit-deadline-texas",
    // Tier 1 expansion states
    "/security-deposit-deadline-new-jersey",
    "/security-deposit-deadline-arizona",
    "/security-deposit-deadline-colorado",
    "/security-deposit-deadline-washington",
    "/security-deposit-deadline-north-carolina",
    "/security-deposit-deadline-virginia",
    "/security-deposit-deadline-ohio",
    "/security-deposit-deadline-pennsylvania",
    "/security-deposit-deadline-michigan",
    "/security-deposit-deadline-massachusetts",
    // High-intent keyword pages
    "/normal-wear-and-tear-vs-damage",
    "/can-landlord-charge-for-cleaning",
    "/can-landlord-charge-for-painting",
    "/security-deposit-not-returned-after-30-days",
    "/how-to-sue-landlord-for-security-deposit",
    // Other SEO content
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

  return [...corePages, ...seoPages, ...cityPages, ...policyPages];
}
