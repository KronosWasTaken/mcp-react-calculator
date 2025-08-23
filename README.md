# MCP React Calculator - Workflow Automation Experiment

This project demonstrates how **official MCP (Model Context Protocol) servers** can automate project management workflows by integrating **Atlassian's official MCP server** and **GitHub's official Copilot MCP server** to create a React calculator app.

## 🎯 Experiment Goal

Test the effectiveness of **official MCP servers** in automating:
- Task breakdown and requirements analysis
- **Jira ticket creation** via official Atlassian MCP server
- **GitHub PR creation** via official GitHub Copilot MCP server
- Linking and traceability between tools

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Cursor MCP Settings
**This is the only setup step needed!** 

#### Option A: Global Configuration (Recommended)
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
    }
  }
}
```

#### Option B: Project-Specific Configuration
Create `.cursor/mcp.json` in your project root with the same content.

**Important**: Replace `YOUR_GITHUB_PAT` with your actual GitHub Personal Access Token.

### 3. Get GitHub Personal Access Token
1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name like "Cursor MCP Integration"
4. Select scopes: `repo`, `workflow`, `admin:org` (for full access)
5. Copy the token and replace `YOUR_GITHUB_PAT` in the config

### 4. Restart Cursor
- **Close Cursor completely**
- **Reopen Cursor**
- This is crucial for MCP changes to take effect

## 🧪 Testing the Integration

### 1. Verify MCP Tools Status
- Go to **Settings** (gear icon) in Cursor
- Click **Tools & Integrations**
- Look for **MCP Tools** section
- Both servers should show green dots ✅

### 2. Test in Chat
Open a new chat and try these commands:

```
Show me available MCP tools
```

```
List my GitHub repositories
```

```
Create a Jira ticket for "Calculator App Setup"
```

## 🔧 MCP Server Configuration

### **Official Atlassian MCP Server** 🆕
- **No installation required** - hosted by Atlassian
- **Direct access** to Jira and Confluence
- **OAuth authentication** via browser
- **Enterprise-grade reliability**

### **Official GitHub Copilot MCP Server** 🆕
- **No installation required** - hosted by GitHub
- **Direct access** to GitHub repositories
- **Personal Access Token authentication**
- **Official GitHub support**

## 📋 Testing the Workflow

### The Test Prompt
```
"We want to create a react calculator app, help me breakdown tasks, create in JIRA and create corresponding PRs"
```

### Expected Workflow
1. **Requirements Analysis**: MCP server analyzes calculator app requirements
2. **Jira Integration**: Creates actual tickets via official Atlassian MCP server
3. **GitHub Integration**: Creates PRs via official GitHub Copilot MCP server
4. **Linking**: Establishes traceability between Jira tickets and GitHub PRs

## 📊 Evaluation Criteria

- ✅ **Task Breakdown Quality**: How well does it understand and decompose requirements?
- ✅ **Automation Level**: How much manual intervention is still needed?
- ✅ **Integration Quality**: How well do the tools work together?
- ✅ **Traceability**: Can you easily track progress from ticket to PR?
- ✅ **User Experience**: Ease of use and reliability

## 🛠️ Development

### Project Structure
```
├── mcp-config.json            # MCP server configuration
├── src/                       # React app source
└── README.md                  # This setup guide
```

### Available Scripts
- `npm run dev`: Start React development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build

## 🔍 Troubleshooting

### Common Issues
1. **MCP Server Connection**: Ensure Cursor MCP settings are configured correctly
2. **GitHub PAT**: Verify your Personal Access Token has correct scopes
3. **Cursor Restart**: Always restart Cursor after changing MCP configuration
4. **Network**: Check if your network allows connections to Atlassian and GitHub APIs

### Getting Help
- Check the console output for specific error messages
- Ensure MCP servers are properly configured in Cursor
- Both servers have official support from their respective companies



## 📚 Resources

- [Model Context Protocol Official Documentation](https://modelcontextprotocol.io/docs/getting-started/intro) - Official MCP introduction and concepts
- [GitHub MCP Server Installation Guide for Cursor](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-cursor.md) - Official GitHub MCP server setup
- [Cursor MCP Documentation](https://docs.cursor.com/en/context/mcp) - Cursor-specific MCP configuration and usage
- [Atlassian Rovo IDE Setup Guide](https://support.atlassian.com/rovo/docs/setting-up-ides/) - Atlassian's official IDE integration documentation



