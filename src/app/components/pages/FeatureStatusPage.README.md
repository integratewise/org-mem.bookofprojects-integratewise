# Feature Status Tracker - README

## Overview

The Feature Status Tracker is a live dashboard that tracks the operational status of all IntegrateWise features across the platform.

## Files

- `FeatureStatusPage.tsx` - React component with full dashboard
- `FeatureStatusPage.README.md` - This documentation
- `/public/data/feature-status.csv` - CSV export for external use

## How to Use

### Viewing the Dashboard

1. Navigate to the Feature Status page in the Brand Store
2. Use filters to focus on specific categories or statuses
3. Review Critical Action Items at the bottom

### Updating Status

To update a feature's status, edit the `FEATURES` array in `FeatureStatusPage.tsx`:

```typescript
{
  id: 'unique-id',
  name: 'Feature Name',
  category: 'Category',
  status: 'working' | 'not-working' | 'partial' | 'pending',
  endpoint?: 'https://...',
  lastChecked: '2026-03-28',
  notes: 'Detailed notes about status',
  priority: 'critical' | 'high' | 'medium' | 'low',
  assignedTo?: 'Person Name',
  dependencies?: ['dep1', 'dep2']
}
```

## Status Definitions

- **working** ✅ - Feature is fully operational
- **partial** ⚠️ - Feature works but has limitations or needs configuration
- **not-working** ❌ - Feature is broken or not configured
- **pending** ⏳ - Feature is planned but not yet implemented
- **deprecated** 🚫 - Feature is no longer supported

## Priority Levels

- **critical** 🔴 - Blocks core functionality, fix immediately
- **high** 🟠 - Important feature, fix within 1 week
- **medium** 🟡 - Nice to have, fix when possible
- **low** 🔵 - Minor feature, fix when convenient

## Current Status Summary (March 28, 2026)

### Working ✅ (10)
- MCP Connector (12 tools live)
- API Gateway
- Knowledge Service
- Workflow Service
- Normalizer Service
- Figma Connector
- OpenRouter AI
- Moonshot AI (Kimi)
- Cloudflare Workers
- Supabase Database

### Partial ⚠️ (8)
- Think Service (needs endpoint verification)
- GitHub Connector (needs OAuth)
- AI Image Generation (placeholders)
- n8n Workflows (need import)
- Brand Store (built, not deployed)
- Marketing Site (built, not deployed)
- Cursor MCP (needs testing)

### Not Working ❌ (12)
- SendGrid/Email (needs API key)
- Gmail Connector
- Slack Connector
- HubSpot Connector
- Salesforce Connector
- Stripe Connector
- Linear Connector
- Morning Brief Automation
- Google Calendar

## Critical Action Items

1. **Email Service** - Get SendGrid/Resend API key
2. **Morning Brief** - Import n8n workflow and activate
3. **Brand Store** - Deploy to production
4. **Marketing Site** - Deploy to integratewise.online

## Maintenance

**Last Updated:** March 28, 2026

**Update Frequency:** 
- After each deployment
- When feature status changes
- Weekly review recommended

**Owner:** IntegrateWise Development Team
