import posthog from 'posthog-js'


export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    const apiKey = import.meta.env.VITE_POSTHOG_API_KEY
    if (!apiKey) {
      console.warn('VITE_POSTHOG_API_KEY environment variable is required for PostHog analytics')
      return
    }
    
    posthog.init(
      apiKey,
      {
        api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
        loaded: (posthog) => {
          if (import.meta.env.DEV) posthog.debug()
        },
        capture_pageview: false, 
        capture_pageleave: false, 
      }
    )
  }
}

export { posthog }
