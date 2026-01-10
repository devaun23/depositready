import { MetadataRoute } from "next";

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
    "/security-deposit-deadline-california",
    "/security-deposit-deadline-florida",
    "/security-deposit-deadline-georgia",
    "/security-deposit-deadline-illinois",
    "/security-deposit-deadline-texas",
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

  // Policy pages
  const policyPages = ["/privacy", "/terms"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...corePages, ...seoPages, ...policyPages];
}
