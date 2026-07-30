type AnalyticsValue = string | number | boolean | undefined;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, parameters?: Record<string, AnalyticsValue>) => void;
  }
}

const SESSION_KEY = "noor-analytics-session";
const ATTRIBUTION_KEY = "noor-analytics-attribution";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

type JourneySession = { id: string; startedAt: number; lastSeenAt: number };
type JourneyAttribution = {
  landing_page: string;
  initial_referrer: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getJourneyContext(): Record<string, AnalyticsValue> {
  if (typeof window === "undefined") return {};

  const now = Date.now();
  const stored = safeParse<JourneySession>(window.sessionStorage.getItem(SESSION_KEY));
  const session =
    stored && now - stored.lastSeenAt < SESSION_TIMEOUT_MS
      ? { ...stored, lastSeenAt: now }
      : { id: createId(), startedAt: now, lastSeenAt: now };
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));

  let attribution = safeParse<JourneyAttribution>(window.localStorage.getItem(ATTRIBUTION_KEY));
  if (!attribution) {
    const params = new URLSearchParams(window.location.search);
    attribution = {
      landing_page: window.location.pathname,
      initial_referrer: document.referrer ? new URL(document.referrer).hostname : "direct",
      utm_source: params.get("utm_source")?.slice(0, 100) || undefined,
      utm_medium: params.get("utm_medium")?.slice(0, 100) || undefined,
      utm_campaign: params.get("utm_campaign")?.slice(0, 100) || undefined,
    };
    window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  }

  return {
    journey_session_id: session.id,
    journey_started_at: new Date(session.startedAt).toISOString(),
    ...attribution,
  };
}

export function trackEvent(eventName: string, parameters: Record<string, AnalyticsValue> = {}) {
  if (typeof window === "undefined" || window.location.pathname.startsWith("/admin")) return;
  window.gtag?.("event", eventName, { ...getJourneyContext(), ...parameters });

  const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  if (adsId && conversionLabel && ["contact_enquiry", "whatsapp_click", "phone_click"].includes(eventName)) {
    window.gtag?.("event", "conversion", {
      send_to: `${adsId}/${conversionLabel}`,
      value: 1,
      currency: "INR",
    });
  }
}
