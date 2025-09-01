# MCP React Calculator - Cloudflare Integration

This project demonstrates how **official MCP (Model Context Protocol) servers** can automate project management workflows by integrating **Atlassian's official MCP server**, **GitHub's official Copilot MCP server**, **Cloudflare's official MCP servers**, and **PostHog analytics** to create a React calculator app.

## 🎯 Project Goal

Test the effectiveness of **official MCP servers** in automating:
- Task breakdown and requirements analysis
- **Jira ticket creation** via official Atlassian MCP server
- **GitHub PR creation** via official GitHub Copilot MCP server
- **Cloudflare services integration** via official Cloudflare MCP servers
- **PostHog analytics integration** for user behavior tracking
- Linking and traceability between tools

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Cursor MCP Settings

#### Global Configuration (Recommended)
Create or edit `~/.cursor/mcp.json` in your home directory:

```json
{
  "mcpServers": {
    "atlassian": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.atlassian.com/v1/sse"],
      "env": {}
    },
    "github": {
      "url": "https://api.githubcopilot.com/mcp/",
      "headers": {
        "Authorization": "Bearer YOUR_GITHUB_PAT"
      }
    },
    "posthog": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote@latest",
        "https://mcp.posthog.com/sse",
        "--header",
        "Authorization:${POSTHOG_AUTH_HEADER}"
      ],
      "env": {
        "POSTHOG_AUTH_HEADER": "Bearer YOUR_POSTHOG_PERSONAL_API_KEY"
      }
    },
    "cloudflare-docs": {
      "command": "npx",
      "args": ["mcp-remote", "https://docs.mcp.cloudflare.com/sse"]
    },
    "cloudflare-bindings": {
      "command": "npx",
      "args": ["mcp-remote", "https://bindings.mcp.cloudflare.com/sse"]
    },
    "cloudflare-observability": {
      "command": "npx",
      "args": ["mcp-remote", "https://observability.mcp.cloudflare.com/sse"]
    },
    "cloudflare-radar": {
      "command": "npx",
      "args": ["mcp-remote", "https://radar.mcp.cloudflare.com/sse"]
    },
    "cloudflare-ai-gateway": {
      "command": "npx",
      "args": ["mcp-remote", "https://ai-gateway.mcp.cloudflare.com/sse"]
    }
  }
}
```

**Important**: Replace `YOUR_GITHUB_PAT` and `YOUR_POSTHOG_PERSONAL_API_KEY` with your actual tokens.

### 3. Set Up Jira Integration

#### Atlassian Account Setup
1. Go to [Atlassian.com](https://atlassian.com) and sign up/sign in
2. Create or access your Jira workspace
3. **No API keys needed** - MCP server uses OAuth authentication

#### Jira Workspace Configuration
1. Ensure you have **Admin** or **Project Admin** permissions
2. Create a project for the calculator app (if needed)
3. The MCP server will handle authentication via browser

### 4. Set Up GitHub Integration

#### GitHub Personal Access Token
1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes: `repo`, `workflow`, `admin:org`
4. Copy the token and replace `YOUR_GITHUB_PAT` in the config

#### Repository Setup
1. Ensure you have a GitHub repository for the project
2. You need **Admin** or **Maintain** permissions
3. The MCP server will create PRs and manage workflows

### 5. Set Up PostHog Analytics

#### PostHog Account Setup
1. Go to [PostHog.com](https://posthog.com) and sign up/sign in
2. Create a new project or use existing one
3. Get your **Project API Key** (starts with `phc_`)
4. Note your **Instance URL** (e.g., `https://us.i.posthog.com`)

#### Get PostHog Personal API Key (for MCP)
1. In PostHog dashboard, go to **Settings** → **Access Management**
2. Click **Personal API Keys**
3. Generate a new key with **Full access** permissions
4. Copy the key and replace `YOUR_POSTHOG_PERSONAL_API_KEY` in MCP config

#### Install PostHog in React App
```bash
npm install posthog-js
```

#### Create Environment Variables
Create `.env` file in your project root:
```env
VITE_PUBLIC_POSTHOG_KEY=your_project_api_key_here
VITE_PUBLIC_POSTHOG_HOST=your_instance_url_here
```

#### Initialize PostHog
Update `src/main.tsx`:
```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PostHogProvider } from 'posthog-js/react'

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2025-05-24',
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={options}>
      <App />
    </PostHogProvider>
  </StrictMode>
);
```

### 6. Restart Cursor
- **Close Cursor completely**
- **Reopen Cursor**
- This is crucial for MCP changes to take effect

## ☁️ Cloudflare Setup

### Account Creation
1. Go to [Cloudflare.com](https://cloudflare.com) and sign up
2. Verify your email address
3. Add a domain (or use a subdomain)

### Enable Required Services
1. **Workers**: Automatically enabled
2. **Pages**: Automatically enabled  
3. **R2 Storage**: Enable in Dashboard → R2 → Get Started
4. **D1 Database**: Enable in Dashboard → D1 → Create Database
5. **KV Storage**: Enable in Dashboard → Workers & Pages → KV

### MCP Server Access
All Cloudflare MCP servers are **free** and require **no API keys**:
- **`cloudflare-docs`**: Documentation and guides
- **`cloudflare-bindings`**: Workers, KV, R2, D1, Hyperdrive
- **`cloudflare-observability`**: Monitoring and debugging
- **`cloudflare-radar`**: Internet traffic insights
- **`cloudflare-ai-gateway`**: AI usage analytics

## 📊 PostHog Analytics Features

### What Gets Tracked Automatically
✅ **Page Views** - Every page load and navigation
✅ **User Sessions** - How long users stay engaged
✅ **Browser/Device Info** - User environment details
✅ **Referrer Data** - Where users came from
✅ **Custom Events** - Calculator interactions

### Calculator-Specific Tracking
✅ **Number Button Clicks** - `calculator_number_clicked`
✅ **Operation Buttons** - `calculator_operation_clicked`
✅ **Calculations** - `calculator_calculation`
✅ **Clear Actions** - `calculator_cleared`
✅ **Decimal Usage** - `calculator_decimal_clicked`

### Analytics Dashboard
✅ **Real-time Events** - Live data as users interact
✅ **User Engagement** - Daily/weekly active users
✅ **Button Usage Heatmap** - Most clicked numbers
✅ **Operation Performance** - Popular mathematical operations
✅ **Session Duration** - User engagement time
✅ **Custom Insights** - Tailored analytics for your app

### Advanced Features
✅ **Session Recordings** - Watch full user interactions
✅ **Cohort Analysis** - User behavior segmentation
✅ **Funnel Analysis** - User journey tracking
✅ **Feature Flags** - A/B testing capabilities
✅ **Data Export** - CSV/JSON data export

## 🧪 Testing the Integration

### Verify MCP Tools Status
- Go to **Settings** (gear icon) in Cursor
- Click **Tools & Integrations**
- Look for **MCP Tools** section
- All servers should show green dots ✅

### Test Commands
Open a new chat and try:

```
Show me available MCP tools
```

```
List my GitHub repositories
```

```
Create a Jira ticket for "Calculator App Setup"
```

```
Show me Cloudflare documentation for Workers
```

```
Help me build a Cloudflare Worker with AI capabilities
```

```
Show me PostHog analytics for my calculator
```

### Test PostHog Analytics
1. **Use your calculator** - click buttons, perform calculations
2. **Check PostHog dashboard** - events should appear in real-time
3. **View analytics** - see user behavior patterns

## 📋 Testing the Workflow

### The Test Prompt
```
"We want to create a react calculator app, help me breakdown tasks, create in JIRA and create corresponding PRs, then deploy to Cloudflare Pages with AI capabilities and track user behavior with PostHog"
```

### Expected Workflow
1. **Requirements Analysis**: MCP server analyzes calculator app requirements
2. **Jira Integration**: Creates actual tickets via official Atlassian MCP server
3. **GitHub Integration**: Creates PRs via official GitHub Copilot MCP server
4. **Cloudflare Integration**: Uses official MCP servers for deployment and AI features
5. **PostHog Integration**: Tracks user behavior and provides analytics insights
6. **Linking**: Establishes traceability between Jira tickets, GitHub PRs, Cloudflare deployment, and user analytics

## 🛠️ Development

### Available Scripts
- `npm run dev`: Start React development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

### Project Structure
```
├── .env                    # PostHog environment variables
├── src/
│   ├── main.tsx          # PostHog initialization
│   ├── components/
│   │   └── Calculator.tsx # PostHog event tracking
│   └── ...
├── mcp-config.json       # MCP server configuration
└── README.md             # This setup guide
```

## 🔍 Troubleshooting

### Common Issues
1. **MCP Server Connection**: Ensure Cursor MCP settings are configured correctly
2. **GitHub PAT**: Verify your Personal Access Token has correct scopes
3. **PostHog API Keys**: Check both project key and personal API key
4. **Jira Permissions**: Ensure you have Admin/Project Admin access
5. **Cursor Restart**: Always restart Cursor after changing MCP configuration
6. **Cloudflare Services**: Enable required services in Cloudflare Dashboard
7. **Environment Variables**: Verify .env file is in project root

### PostHog Specific Issues
1. **No Events Appearing**: Check API key and host URL in .env
2. **MCP Server Errors**: Verify personal API key in MCP config
3. **Build Errors**: Ensure PostHog package is installed
4. **Environment Variables**: Check VITE_ prefix for Vite projects

### Getting Help
- Check the console output for specific error messages
- Ensure MCP servers are properly configured in Cursor
- All servers have official support from their respective companies
- PostHog has excellent documentation and community support

## 📚 Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/docs/getting-started/intro)
- [GitHub MCP Server Guide](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-cursor.md)
- [Cursor MCP Documentation](https://docs.cursor.com/en/context/mcp)
- [PostHog Documentation](https://posthog.com/docs)
- [PostHog React Integration](https://posthog.com/docs/libraries/react)
- [Cloudflare MCP Servers](https://developers.cloudflare.com/mcp/)
- [Cloudflare Dashboard](https://dash.cloudflare.com)
- [Cloudflare Firewall for AI](https://blog.cloudflare.com/firewall-for-ai/)
- [PostHog Dashboard](https://us.i.posthog.com/project/2-for-ai/13295/dashboard/529133)

# PostHog LLM Analytics Integration

This project now includes comprehensive LLM analytics integration with PostHog, allowing you to track Google Gen AI (Gemini) usage, monitor performance, and analyze user interactions with AI features.

## 🚀 Features

- **Automatic LLM Event Capture**: All OpenAI API calls are automatically tracked
- **Performance Monitoring**: Latency, token usage, and model performance metrics
- **User Analytics**: Track individual user interactions and conversation patterns
- **Embedding Analytics**: Monitor embedding generation and usage
- **Custom Event Tracking**: Capture additional business-specific events
- **Privacy Controls**: Configurable privacy modes for sensitive data

## 📦 Installation

The required packages have been installed:

```bash
npm install posthog-node @posthog/ai @google/genai
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
# PostHog Configuration
VITE_POSTHOG_API_KEY=your_posthog_project_api_key_here
VITE_POSTHOG_HOST=https://us.i.posthog.com

# Google Gen AI (Gemini) Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### PostHog Setup

1. **Get your API key** from [PostHog Dashboard](https://us.i.posthog.com/project/2-for-ai/13295/settings)
2. **Update the .env file** with your actual Gemini API key
3. **Restart your development server**

## 🔧 Usage

### Basic LLM Call with Analytics

```typescript
import { generateText } from './lib/google-genai'

const response = await generateText('Tell me a joke', {
  model: 'gemini-2.5-flash',
  distinctId: 'user_123',
  traceId: 'conversation_456',
  properties: {
    conversation_id: 'chat_789',
    user_type: 'premium'
  }
})
```

### Embedding Generation with Analytics

```typescript
import { createEmbeddingWithGoogle } from './lib/google-genai'

const embedding = await createEmbeddingWithGoogle('Sample text', {
  model: 'text-embedding-004',
  distinctId: 'user_123',
  properties: {
    text_length: 11,
    source: 'user_input'
  }
})
```

### Custom Event Tracking

```typescript
import { posthog } from './lib/posthog'

// Track custom events
posthog.capture('user_action', {
  action: 'button_click',
  user_id: 'user_123',
  timestamp: Date.now()
})
```

## 📊 Analytics Dashboard

### LLM Analytics Section

In your PostHog dashboard, you'll find:

- **Traces**: Complete conversation flows with timing
- **Generations**: Individual LLM responses with metadata
- **Performance Metrics**: Latency, token usage, and model performance
- **User Analytics**: Individual user interaction patterns
- **Cost Tracking**: Monitor API usage and costs

### Key Metrics Tracked

- `$ai_input`: User prompts and input content
- `$ai_input_tokens`: Token count for input
- `$ai_output_tokens`: Token count for responses
- `$ai_latency`: Response time in milliseconds
- `$ai_model`: Model used (e.g., gpt-4o-mini)
- `$ai_model_parameters`: Model configuration
- `$ai_cache_read_input_tokens`: Cache hit metrics
- `$ai_reasoning_tokens`: Reasoning token usage
- `$ai_tools`: Tool usage in responses
- `$ai_output_choices`: Response choices and metadata

## 🎯 Demo Component

A complete demo component is available at `/llm-demo` route that showcases:

- **LLM Request Demo**: Test Google Gen AI calls with full analytics
- **Embedding Demo**: Generate and analyze text embeddings with Gemini
- **Event Tracking**: Monitor custom events in real-time
- **Performance Metrics**: View response times and token usage

### Accessing the Demo

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:5173/llm-demo`
3. Test the LLM analytics functionality
4. Check your PostHog dashboard for real-time data

## 🔒 Privacy and Security

### Privacy Controls

- **Anonymous Events**: Don't pass `distinctId` for anonymous tracking
- **Privacy Mode**: Enable `privacyMode: true` for sensitive data
- **Data Filtering**: Configure what data is captured in PostHog
- **User Consent**: Implement consent management for GDPR compliance

### Security Best Practices

- **Environment Variables**: Never commit API keys to version control
- **API Key Rotation**: Regularly rotate your OpenAI API keys
- **Access Control**: Limit PostHog dashboard access to authorized users
- **Data Retention**: Configure appropriate data retention policies

## 🚨 Troubleshooting

### Common Issues

1. **No LLM Events in PostHog**
   - Verify API keys are correct
   - Check PostHog host URL
   - Ensure Gemini API key is valid

2. **Build Errors**
   - Verify all packages are installed
   - Check TypeScript compilation
   - Ensure environment variables are loaded

3. **Performance Issues**
   - Monitor API rate limits
   - Check network connectivity
   - Verify PostHog service status

### Debug Mode

Enable debug mode in development:

```typescript
// In src/lib/posthog.ts
loaded: (posthog) => {
  if (import.meta.env.DEV) posthog.debug()
}
```

## 📚 Additional Resources

- [PostHog LLM Analytics Documentation](https://posthog.com/docs/llm-analytics)
- [Google Gen AI (Gemini) Docs](https://ai.google.dev/)
- [PostHog AI SDK](https://github.com/PostHog/posthog-ai)
- [Model Context Protocol](https://modelcontextprotocol.io/)


