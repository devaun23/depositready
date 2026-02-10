/**
 * Analytics events for the diagnosis-to-checkout funnel.
 * Uses gtag (Google Analytics 4) — safe to call server-side (no-ops).
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(event: string, eventName: string, params: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(event, eventName, params);
  }
}

export const trackDiagnosis = {
  started: (state: string) =>
    gtag('event', 'diagnosis_started', { state }),

  completed: (data: { state: string; violation_type: string; strength: string; estimated_recovery: number }) =>
    gtag('event', 'diagnosis_completed', data),

  checkoutClicked: (data: { estimated_recovery: number; strength: string }) =>
    gtag('event', 'checkout_clicked', data),

  paymentCompleted: (data: { amount: number; state: string }) =>
    gtag('event', 'payment_completed', data),
};
