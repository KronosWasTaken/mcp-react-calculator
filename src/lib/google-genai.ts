import { GoogleGenAI } from '@google/genai'

export const createGoogleGenAIClient = () => {
  const client = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  })
  return { client }
}

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

    return response.text
  } finally {
  }
}

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
    const response = await (client.models as any).embedContent({
      model: options.model || 'text-embedding-004',
      contents: [input],
    })

    const vector: number[] = response?.embeddings?.[0]?.values || response?.embedding?.values || []
    return vector
  } finally {
  }
}


