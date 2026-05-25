type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: 'event', eventName: string, params?: AnalyticsEventParams) => void;
  }
}

export const trackEvent = (eventName: string, params: AnalyticsEventParams = {}) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', eventName, params);
};
