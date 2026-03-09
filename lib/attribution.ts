/**
 * UTM attribution capture.
 * Reads URL params on landing, stores in sessionStorage for the conversion funnel.
 * Auto-detects platform from document.referrer when utm_source isn't explicit.
 */

const STORAGE_KEY = "dr_attribution";

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

const REFERRER_PLATFORM_MAP: Record<string, string> = {
  "tiktok.com": "tiktok",
  "instagram.com": "instagram",
  "l.instagram.com": "instagram",
  "twitter.com": "twitter",
  "x.com": "twitter",
  "t.co": "twitter",
  "facebook.com": "facebook",
  "l.facebook.com": "facebook",
  "m.facebook.com": "facebook",
  "lm.facebook.com": "facebook",
  "youtube.com": "youtube",
  "m.youtube.com": "youtube",
  "youtu.be": "youtube",
  "reddit.com": "reddit",
  "old.reddit.com": "reddit",
  "linkedin.com": "linkedin",
  "lnkd.in": "linkedin",
};

/**
 * Detect platform from document.referrer hostname.
 * Returns platform name or undefined if referrer is unrecognized / empty.
 */
function detectPlatformFromReferrer(): string | undefined {
  try {
    const referrer = document.referrer;
    if (!referrer) return undefined;
    const hostname = new URL(referrer).hostname.replace(/^www\./, "");
    return REFERRER_PLATFORM_MAP[hostname];
  } catch {
    return undefined;
  }
}

/**
 * Read UTM params from the current URL and persist in sessionStorage.
 * If no explicit utm_source, auto-detects platform from referrer.
 * Only captures on first visit in the session (doesn't overwrite).
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  // Don't overwrite existing attribution
  if (sessionStorage.getItem(STORAGE_KEY)) return;

  const params = new URLSearchParams(window.location.search);
  const attribution: Attribution = {};

  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");

  // Use explicit utm_source, or fall back to referrer detection
  if (utmSource) {
    attribution.utm_source = utmSource;
  } else {
    const detected = detectPlatformFromReferrer();
    if (detected) attribution.utm_source = detected;
  }

  if (utmMedium) attribution.utm_medium = utmMedium;
  if (utmCampaign) attribution.utm_campaign = utmCampaign;

  // Only store if we actually captured something
  if (Object.keys(attribution).length > 0) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  }
}

/**
 * Retrieve stored attribution data.
 */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}
