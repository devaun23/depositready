/**
 * TikTok + Meta pixel event helpers.
 * Safe to call server-side or before pixels load — they no-op gracefully.
 */

declare global {
  interface Window {
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void;
      identify: (params: Record<string, unknown>) => void;
    };
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackTikTokEvent(
  event: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.ttq) {
    window.ttq.track(event, params);
  }
}

export function trackMetaEvent(
  event: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, params);
  }
}

/**
 * Fire a conversion event on all pixels simultaneously.
 * Maps to standard events both platforms optimize for.
 */
export function trackConversion(
  event: "ViewContent" | "CompleteRegistration" | "InitiateCheckout" | "Purchase",
  params?: Record<string, unknown>
) {
  trackTikTokEvent(event, params);
  trackMetaEvent(event, params);
}
