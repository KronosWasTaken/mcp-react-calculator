import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Textarea } from './ui/textarea'
import { generateText, createEmbeddingWithGoogle } from '../lib/google-genai'
import { posthog } from '../lib/posthog'

export const LLMAnalyticsDemo: React.FC = () => {
  const [prompt, setPrompt] = useState('Tell me a fun fact about hedgehogs')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [embeddingText, setEmbeddingText] = useState('The quick brown fox')
  const [embeddingResult, setEmbeddingResult] = useState<number[]>([])

  const handleLLMCall = async () => {
    setLoading(true)
    try {
      const start = performance.now()
      // Generate a unique trace ID for this conversation
      const traceId = `trace_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      // Capture user interaction event
      posthog.capture('llm_request_started', {
        prompt,
        trace_id: traceId,
        user_id: 'demo_user_123'
      })

      const result = await generateText(prompt, {
        model: 'gemini-2.5-flash',
        distinctId: 'demo_user_123',
        traceId,
        properties: {
          conversation_id: `conv_${Date.now()}`,
          source: 'calculator_app',
          user_type: 'demo'
        },
        groups: {
          app: 'react_calculator'
        },
        privacyMode: false
      })

      setResponse(result || 'No response received')
      
      // Capture successful completion
      posthog.capture('llm_request_completed', {
        prompt,
        response: result,
        trace_id: traceId,
        user_id: 'demo_user_123'
      })

      // Manual LLM analytics capture to guarantee visibility in PostHog
      const latencySec = (performance.now() - start) / 1000
      posthog.capture('$ai_generation', {
        $ai_model: 'gemini-2.5-flash',
        $ai_latency: latencySec,
        $ai_input: [
          { role: 'user', content: prompt }
        ],
        $ai_output_choices: [
          { role: 'assistant', content: result }
        ],
        $ai_tools: [],
        posthog_distinct_id: 'demo_user_123',
        posthog_trace_id: traceId,
        conversation_id: `conv_manual_${Date.now()}`,
        source: 'calculator_app',
      })
    } catch (error) {
      console.error('Error making LLM call:', error)
      setResponse('Error: ' + (error as Error).message)
      
      // Capture error event
      posthog.capture('llm_request_error', {
        prompt,
        error: (error as Error).message,
        user_id: 'demo_user_123'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEmbedding = async () => {
    try {
      const embedding = await createEmbeddingWithGoogle(embeddingText, {
        model: 'text-embedding-004',
        distinctId: 'demo_user_123',
        properties: {
          text_length: embeddingText.length,
          source: 'calculator_app'
        }
      })
      
      setEmbeddingResult(embedding)
    } catch (error) {
      console.error('Error creating embedding:', error)
      setEmbeddingResult([])
    }
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>PostHog LLM Analytics Demo</CardTitle>
          <CardDescription>
            This component demonstrates PostHog LLM analytics integration with Google Gen AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="prompt" className="text-sm font-medium">
              Prompt for Google Gen AI
            </label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              rows={3}
            />
          </div>
          
          <Button 
            onClick={handleLLMCall} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Generating...' : 'Generate Response'}
          </Button>

          {response && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Response:</label>
              <div className="p-3 bg-muted rounded-md text-sm">
                {response}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Embeddings Demo</CardTitle>
          <CardDescription>
            Test embedding generation with PostHog analytics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="embedding-text" className="text-sm font-medium">
              Text for Embedding
            </label>
            <Input
              id="embedding-text"
              value={embeddingText}
              onChange={(e) => setEmbeddingText(e.target.value)}
              placeholder="Enter text to embed..."
            />
          </div>
          
          <Button onClick={handleEmbedding} className="w-full">
            Generate Embedding
          </Button>

          {embeddingResult.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Embedding Vector:</label>
              <div className="p-3 bg-muted rounded-md text-sm font-mono text-xs">
                [{embeddingResult.slice(0, 10).join(', ')}...]
                <div className="mt-2 text-muted-foreground">
                  Vector length: {embeddingResult.length} dimensions
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analytics Events</CardTitle>
          <CardDescription>
            Custom events being captured in PostHog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>LLM Request Started:</span>
              <span className="text-green-600">✓</span>
            </div>
            <div className="flex justify-between">
              <span>LLM Request Completed:</span>
              <span className="text-green-600">✓</span>
            </div>
            <div className="flex justify-between">
              <span>Embedding Generation:</span>
              <span className="text-green-600">✓</span>
            </div>
            <div className="flex justify-between">
              <span>PostHog AI Events:</span>
              <span className="text-green-600">✓</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
