type AnalyticsEventData = Record<string, string | number | boolean>

interface UmamiTracker {
  track: (eventName: string, eventData?: AnalyticsEventData) => void
}

declare global {
  interface Window {
    umami?: UmamiTracker
  }
}

function readEnv(name: string): string {
  const value = import.meta.env[name]
  return typeof value === 'string' ? value.trim() : ''
}

export const umamiConfig = {
  websiteId: readEnv('VITE_UMAMI_WEBSITE_ID'),
  scriptUrl: readEnv('VITE_UMAMI_SCRIPT_URL') || 'https://cloud.umami.is/script.js',
  hostUrl: readEnv('VITE_UMAMI_HOST_URL'),
  domains: readEnv('VITE_UMAMI_DOMAINS'),
  tag: readEnv('VITE_UMAMI_TAG') || 'gcg-website',
  performance: readEnv('VITE_UMAMI_PERFORMANCE') === 'true',
  respectDoNotTrack: readEnv('VITE_UMAMI_RESPECT_DNT') !== 'false',
} as const

export function isAnalyticsEnabled(): boolean {
  return umamiConfig.websiteId.length > 0
}

export function trackAnalyticsEvent(eventName: string, eventData?: AnalyticsEventData): void {
  if (typeof window === 'undefined' || !window.umami) return
  window.umami.track(eventName, eventData)
}
