// FeatureStatusPage.tsx - Live Feature Status Tracker for IntegrateWise
// Updated: March 28, 2026
// Purpose: Track what's working vs what's not across the entire platform

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock,
  Server,
  Database,
  Shield,
  Zap,
  Mail,
  Layout,
  Cloud,
  RefreshCw,
  Activity
} from 'lucide-react';

// Types
export type FeatureStatus = 'working' | 'not-working' | 'partial' | 'pending' | 'deprecated';

export interface Feature {
  id: string;
  name: string;
  category: string;
  status: FeatureStatus;
  endpoint?: string;
  lastChecked: string;
  notes: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  assignedTo?: string;
  dependencies?: string[];
}

// Feature Data - This is the source of truth
export const FEATURES: Feature[] = [
  // === CORE SERVICES ===
  {
    id: 'svc-mcp-connector',
    name: 'MCP Connector',
    category: 'Core Services',
    status: 'working',
    endpoint: 'https://integratewise-mcp-connector.connect-a1b.workers.dev',
    lastChecked: '2026-03-28',
    notes: '✅ LIVE - 12 tools available (kb.*, figma.*). Health check passing.',
    priority: 'critical',
    dependencies: ['cloudflare-account', 'supabase']
  },
  {
    id: 'svc-gateway',
    name: 'API Gateway',
    category: 'Core Services',
    status: 'working',
    endpoint: 'https://integratewise-gateway.connect-a1b.workers.dev',
    lastChecked: '2026-03-28',
    notes: '✅ LIVE - Entry point for all API calls. Service bindings active.',
    priority: 'critical',
    dependencies: ['mcp-connector', 'knowledge', 'workflow']
  },
  {
    id: 'svc-knowledge',
    name: 'Knowledge Service',
    category: 'Core Services',
    status: 'working',
    endpoint: 'https://integratewise-knowledge.connect-a1b.workers.dev',
    lastChecked: '2026-03-28',
    notes: '✅ LIVE - Knowledge base operations. Scheduled tasks running.',
    priority: 'critical',
    dependencies: ['supabase']
  },
  {
    id: 'svc-workflow',
    name: 'Workflow Service (BFF)',
    category: 'Core Services',
    status: 'working',
    endpoint: 'https://integratewise-bff.connect-a1b.workers.dev',
    lastChecked: '2026-03-28',
    notes: '✅ LIVE - Backend-for-frontend. Daily scheduled tasks.',
    priority: 'high',
    dependencies: ['supabase']
  },
  {
    id: 'svc-think',
    name: 'Think Service (AI)',
    category: 'Core Services',
    status: 'partial',
    endpoint: 'https://integratewise-think.connect-a1b.workers.dev',
    lastChecked: '2026-03-28',
    notes: '⚠️ DEPLOYED but endpoint structure needs verification. May need OpenRouter config.',
    priority: 'high',
    dependencies: ['openrouter-api-key']
  },
  {
    id: 'svc-normalizer',
    name: 'Normalizer Service',
    category: 'Core Services',
    status: 'working',
    endpoint: 'https://integratewise-normalizer.connect-a1b.workers.dev',
    lastChecked: '2026-03-28',
    notes: '✅ LIVE - Data normalization pipeline.',
    priority: 'high',
    dependencies: []
  },
  {
    id: 'svc-loader',
    name: 'Loader Service',
    category: 'Core Services',
    status: 'working',
    lastChecked: '2026-03-28',
    notes: '✅ DEPLOYED - Data loading pipeline.',
    priority: 'medium',
    dependencies: []
  },
  {
    id: 'svc-govern',
    name: 'Govern Service',
    category: 'Core Services',
    status: 'working',
    lastChecked: '2026-03-28',
    notes: '✅ DEPLOYED - Governance engine.',
    priority: 'medium',
    dependencies: []
  },
  {
    id: 'svc-act',
    name: 'Act Service',
    category: 'Core Services',
    status: 'working',
    lastChecked: '2026-03-28',
    notes: '✅ DEPLOYED - Action execution.',
    priority: 'medium',
    dependencies: []
  },
  {
    id: 'svc-pipeline',
    name: 'Pipeline Service',
    category: 'Core Services',
    status: 'working',
    lastChecked: '2026-03-28',
    notes: '✅ DEPLOYED - Data pipeline orchestration.',
    priority: 'medium',
    dependencies: []
  },

  // === CONNECTORS ===
  {
    id: 'conn-figma',
    name: 'Figma Connector',
    category: 'Connectors',
    status: 'working',
    lastChecked: '2026-03-28',
    notes: '✅ IMPLEMENTED - figma.get_file, figma.export_image, figma.get_components, figma.get_comments, figma.get_node. Token configured.',
    priority: 'high',
    dependencies: ['figma-access-token']
  },
  {
    id: 'conn-sendgrid',
    name: 'SendGrid Connector (Email)',
    category: 'Connectors',
    status: 'not-working',
    lastChecked: '2026-03-28',
    notes: '❌ NOT CONFIGURED - Code exists (sendgrid.ts) but SENDGRID_API_KEY is placeholder. Sign up at sendgrid.com required.',
    priority: 'critical',
    assignedTo: 'Nirmal',
    dependencies: ['sendgrid-api-key']
  },
  {
    id: 'conn-gmail',
    name: 'Gmail Connector',
    category: 'Connectors',
    status: 'not-working',
    lastChecked: '2026-03-28',
    notes: '❌ NOT CONFIGURED - Code exists. Requires Google OAuth credentials.',
    priority: 'high',
    dependencies: ['google-client-id', 'google-client-secret']
  },
  {
    id: 'conn-slack',
    name: 'Slack Connector',
    category: 'Connectors',
    status: 'not-working',
    lastChecked: '2026-03-28',
    notes: '❌ NOT CONFIGURED - Code exists. Requires SLACK_BOT_TOKEN.',
    priority: 'medium',
    dependencies: ['slack-bot-token']
  },
  {
    id: 'conn-hubspot',
    name: 'HubSpot Connector',
    category: 'Connectors',
    status: 'not-working',
    lastChecked: '2026-03-28',
    notes: '❌ NOT CONFIGURED - Code exists. OAuth credentials needed.',
    priority: 'low',
    dependencies: ['hubspot-client-id', 'hubspot-client-secret']
  },
  {
    id: 'conn-salesforce',
    name: 'Salesforce Connector',
    category: 'Connectors',
    status: 'not-working',
    lastChecked: '2026-03-28',
    notes: '❌ NOT CONFIGURED - Code exists. OAuth credentials needed.',
    priority: 'low',
    dependencies: ['salesforce-client-id', 'salesforce-client-secret']
  },
  {
    id: 'conn-stripe',
    name: 'Stripe Connector',
    category: 'Connectors',
    status: 'not-working',
    lastChecked: '2026-03-28',
    notes: '❌ NOT CONFIGURED - Code exists. Requires STRIPE_SECRET_KEY.',
    priority: 'medium',
    dependencies: ['stripe-secret-key']
  },
  {
    id: 'conn-linear',
    name: 'Linear Connector',
    category: 'Connectors',
    status: 'not-working',
    lastChecked: '2026-03-28',
    notes: '❌ NOT CONFIGURED - Code exists. Requires LINEAR_API_KEY.',
    priority: 'medium',
    dependencies: ['linear-api-key']
  },
  {
    id: 'conn-github',
    name: 'GitHub Connector',
    category: 'Connectors',
    status: 'partial',
    lastChecked: '2026-03-28',
    notes: '⚠️ PLACEHOLDER - GITHUB_WEBHOOK_SECRET configured but GITHUB_CLIENT_ID is placeholder.',
    priority: 'medium',
    dependencies: ['github-client-id', 'github-client-secret']
  },

  // === AI SERVICES ===
  {
    id: 'ai-openrouter',
    name: 'OpenRouter Integration',
    category: 'AI Services',
    status: 'working',
    lastChecked: '2026-03-28',
    notes: '✅ CONFIGURED - API key active. $0.022 usage. Default model: claude-3.5-sonnet.',
    priority: 'critical',
    dependencies: ['openrouter-api-key']
  },
  {
    id: 'ai-moonshot',
    name: 'Moonshot AI (Kimi)',
    category: 'AI Services',
    status: 'working',
    lastChecked: '2026-03-28',
    notes: '✅ CONFIGURED - API key active. Used by Kimi Code CLI.',
    priority: 'medium',
    dependencies: ['moonshot-api-key']
  },
  {
    id: 'ai-image-gen',
    name: 'AI Image Generation',
    category: 'AI Services',
    status: 'partial',
    lastChecked: '2026-03-28',
    notes: '⚠️ IMPLEMENTED but API keys are placeholders. Supports GenSpark, OpenRouter, Pollinations, Stability AI. Pollinations works (free).',
    priority: 'medium',
    dependencies: ['genspark-api-key', 'stability-api-key']
  },

  // === AUTOMATION ===
  {
    id: 'auto-n8n',
    name: 'n8n Workflows',
    category: 'Automation',
    status: 'partial',
    lastChecked: '2026-03-28',
    notes: '⚠️ WORKFLOWS CREATED but need import. GCP instance running at n8n.integratewise.co. Morning brief + LinkedIn workflows ready.',
    priority: 'high',
    assignedTo: 'Nirmal',
    dependencies: ['email-service']
  },
  {
    id: 'auto-morning-brief',
    name: 'Morning Brief Automation',
    category: 'Automation',
    status: 'not-working',
    lastChecked: '2026-03-28',
    notes: '❌ PENDING - n8n workflow created but not imported/activated. Needs email credentials.',
    priority: 'high',
    assignedTo: 'Nirmal',
    dependencies: ['n8n', 'email-service']
  },

  // === DEPLOYMENT ===
  {
    id: 'deploy-cloudflare',
    name: 'Cloudflare Workers',
    category: 'Deployment',
    status: 'working',
    lastChecked: '2026-03-28',
    notes: '✅ WORKING - 6+ services deployed. Account ID and API token configured.',
    priority: 'critical',
    dependencies: ['cloudflare-api-token']
  },
  {
    id: 'deploy-supabase',
    name: 'Supabase Database',
    category: 'Deployment',
    status: 'working',
    lastChecked: '2026-03-28',
    notes: '✅ CONFIGURED - URL and service keys set. D1 database for Flow C.',
    priority: 'critical',
    dependencies: ['supabase-service-key']
  },
  {
    id: 'deploy-n8n-gcp',
    name: 'n8n on GCP',
    category: 'Deployment',
    status: 'working',
    lastChecked: '2026-03-28',
    notes: '✅ RUNNING - Instance at n8n.integratewise.co. Workflows need import.',
    priority: 'high',
    dependencies: ['gcp-instance']
  },

  // === CREDENTIALS ===
  {
    id: 'cred-email',
    name: 'Email Service (SendGrid/Resend)',
    category: 'Credentials',
    status: 'not-working',
    lastChecked: '2026-03-28',
    notes: '❌ NOT CONFIGURED - No email API key. Required for morning brief automation. Get from sendgrid.com or resend.com.',
    priority: 'critical',
    assignedTo: 'Nirmal',
    dependencies: []
  },
  {
    id: 'cred-calendar',
    name: 'Google Calendar Integration',
    category: 'Credentials',
    status: 'not-working',
    lastChecked: '2026-03-28',
    notes: '❌ NOT CONFIGURED - Requires Google OAuth credentials.',
    priority: 'medium',
    dependencies: ['google-client-id', 'google-client-secret']
  },

  // === FRONTEND ===
  {
    id: 'fe-brand-store',
    name: 'Brand Store (Ops Command Center)',
    category: 'Frontend',
    status: 'partial',
    lastChecked: '2026-03-28',
    notes: '⚠️ BUILT but not deployed. Components ready: AIAssistant, OpsCommandCenter, CredentialsVault. Need build & deploy.',
    priority: 'high',
    assignedTo: 'Agent',
    dependencies: ['mcp-connector', 'credentials']
  },
  {
    id: 'fe-marketing-site',
    name: 'Marketing Site (integratewise.online)',
    category: 'Frontend',
    status: 'partial',
    lastChecked: '2026-03-28',
    notes: '⚠️ PAGES BUILT (Product, Home, Solutions) but need deployment. Domain updated to .ai.',
    priority: 'high',
    assignedTo: 'Agent',
    dependencies: []
  },
  {
    id: 'fe-cursor-mcp',
    name: 'Cursor MCP Integration',
    category: 'Frontend',
    status: 'partial',
    lastChecked: '2026-03-28',
    notes: '⚠️ CONFIG UPDATED - Hardcoded values. May need Cursor reload. Test in progress.',
    priority: 'medium',
    dependencies: ['mcp-connector']
  }
];

// Components
const StatusBadge: React.FC<{ status: FeatureStatus }> = ({ status }) => {
  const styles = {
    working: 'bg-green-100 text-green-800 border-green-200',
    'not-working': 'bg-red-100 text-red-800 border-red-200',
    partial: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    pending: 'bg-blue-100 text-blue-800 border-blue-200',
    deprecated: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  const icons = {
    working: CheckCircle,
    'not-working': XCircle,
    partial: AlertCircle,
    pending: Clock,
    deprecated: Activity
  };

  const Icon = icons[status];

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      <Icon className="w-3 h-3" />
      {status.replace('-', ' ').toUpperCase()}
    </span>
  );
};

const PriorityBadge: React.FC<{ priority: string }> = ({ priority }) => {
  const styles = {
    critical: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[priority as keyof typeof styles]}`}>
      {priority.toUpperCase()}
    </span>
  );
};

const CategoryIcon: React.FC<{ category: string }> = ({ category }) => {
  const icons: Record<string, React.ReactNode> = {
    'Core Services': <Server className="w-4 h-4" />,
    'Connectors': <Database className="w-4 h-4" />,
    'AI Services': <Zap className="w-4 h-4" />,
    'Automation': <RefreshCw className="w-4 h-4" />,
    'Deployment': <Cloud className="w-4 h-4" />,
    'Credentials': <Shield className="w-4 h-4" />,
    'Frontend': <Layout className="w-4 h-4" />
  };

  return <>{icons[category] || <Activity className="w-4 h-4" />}</>;
};

// Main Page Component
export default function FeatureStatusPage() {
  const [filter, setFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const categories = [...new Set(FEATURES.map(f => f.category))];
  
  const filteredFeatures = FEATURES.filter(f => {
    const categoryMatch = filter === 'all' || f.category === filter;
    const statusMatch = statusFilter === 'all' || f.status === statusFilter;
    return categoryMatch && statusMatch;
  });

  const stats = {
    total: FEATURES.length,
    working: FEATURES.filter(f => f.status === 'working').length,
    notWorking: FEATURES.filter(f => f.status === 'not-working').length,
    partial: FEATURES.filter(f => f.status === 'partial').length,
    critical: FEATURES.filter(f => f.priority === 'critical').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            IntegrateWise Feature Status
          </h1>
          <p className="text-gray-600">
            Live status tracker for all features across the platform. 
            Last updated: March 28, 2026
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Features</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-green-200">
            <div className="text-2xl font-bold text-green-600">{stats.working}</div>
            <div className="text-sm text-gray-600">Working</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-red-200">
            <div className="text-2xl font-bold text-red-600">{stats.notWorking}</div>
            <div className="text-sm text-gray-600">Not Working</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-600">{stats.partial}</div>
            <div className="text-sm text-gray-600">Partial</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-red-300">
            <div className="text-2xl font-bold text-red-700">{stats.critical}</div>
            <div className="text-sm text-gray-600">Critical Priority</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow border mb-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="working">Working</option>
                <option value="partial">Partial</option>
                <option value="not-working">Not Working</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Features Table */}
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Feature</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFeatures.map(feature => (
                <tr key={feature.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <CategoryIcon category={feature.category} />
                      <div>
                        <div className="font-medium text-gray-900">{feature.name}</div>
                        {feature.endpoint && (
                          <div className="text-xs text-gray-500 truncate max-w-xs">
                            {feature.endpoint}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{feature.category}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={feature.status} />
                  </td>
                  <td className="px-4 py-3">
                    <PriorityBadge priority={feature.priority} />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-md">
                    {feature.notes}
                    {feature.assignedTo && (
                      <div className="text-xs text-blue-600 mt-1">
                        Assigned: {feature.assignedTo}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Items Summary */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Critical Action Items
          </h2>
          <div className="space-y-3">
            {FEATURES
              .filter(f => f.priority === 'critical' && f.status !== 'working')
              .map(f => (
                <div key={f.id} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-red-900">{f.name}</div>
                    <div className="text-sm text-red-700">{f.notes}</div>
                    {f.assignedTo && (
                      <div className="text-xs text-red-600 mt-1">Owner: {f.assignedTo}</div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>This is a living document. Update as features change status.</p>
          <p className="mt-1">File: BrandDocumentations/src/app/components/pages/FeatureStatusPage.tsx</p>
        </div>
      </div>
    </div>
  );
}
