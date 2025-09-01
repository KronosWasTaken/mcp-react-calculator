import { PostHog } from 'posthog-node'

// Initialize PostHog for server-side LLM analytics
export const createPostHogClient = () => {
  const apiKey = import.meta.env.VITE_POSTHOG_API_KEY
  if (!apiKey) {
    throw new Error('VITE_POSTHOG_API_KEY environment variable is required')
  }
  
  return new PostHog(
    apiKey,
    { 
      host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com' 
    }
  )
}

// Helper function to shutdown PostHog client
export const shutdownPostHogClient = (client: PostHog) => {
  client.shutdown()
}
