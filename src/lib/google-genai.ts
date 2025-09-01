import { GoogleGenAI } from '@google/genai'

// Initialize Google Gen AI client with PostHog integration
export const createGoogleGenAIClient = () => {
  const client = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  })
  return { client }
}

// Helper to call text generation with analytics
export const generateText = async (
  prompt: string,
  options: {
    model?: string
    distinctId?: string
    traceId?: string
    properties?: Record<string, any>
    groups?: Record<string, any>
    privacyMode?: boolean
  } = {}
) => {
  const { client } = createGoogleGenAIClient()
  try {
    const response = await client.models.generateContent({
      model: options.model || 'gemini-2.5-flash',
      contents: [prompt],
    })

    // The SDK returns a response object; expose text for convenience
    // @ts-ignore - SDK shape; using `.text` helper per PostHog docs example
    return response.text
  } finally {
    // no-op
  }
}

// Helper to create embeddings if supported via Google Gen AI
export const createEmbeddingWithGoogle = async (
  input: string,
  options: {
    model?: string
    distinctId?: string
    traceId?: string
    properties?: Record<string, any>
    groups?: Record<string, any>
    privacyMode?: boolean
  } = {}
) => {
  const { client } = createGoogleGenAIClient()
  try {
    // Cast to any due to wrapper typings not exposing embedContent
    const response = await (client.models as any).embedContent({
      model: options.model || 'text-embedding-004',
      contents: [input],
    })

    // Normalize to a number[] similar to the OpenAI helper
    // @ts-ignore - response shape depends on SDK; map to vector
    const vector: number[] = response?.embeddings?.[0]?.values || response?.embedding?.values || []
    return vector
  } finally {
    // no-op
  }
}


