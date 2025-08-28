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

