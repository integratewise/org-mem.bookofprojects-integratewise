import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, ChevronDown, ChevronRight, ChevronLeft, ArrowLeft, Check, X, Edit3, Trash2, Copy, MoreHorizontal, FileText, FolderOpen, Shield, BarChart3, GitBranch, Bot, ExternalLink, MessageSquare } from 'lucide-react';
import { AISidebar } from './AISidebar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// ── Surface Types ───────────────────────────────────────────────────────────

type SurfaceView = 'governance' | 'intake' | 'triage' | 'internal' | 'public' | 'operations' | 'evolution' | 'book-of-projects';

// ── Document Types ──────────────────────────────────────────────────────────

interface Document {
  id: string;
  name: string;
  cat: 'public' | 'internal' | 'strategy';
  sub: string;
  desc: string;
  status: 'locked' | 'drafted' | 'inprogress' | 'pending' | 'na';
  priority: 'critical' | 'high' | 'medium' | 'low';
  tags: string[];
  linked: string;
  notes: string;
  content?: string;
}

// ── Intake Item (from Folder Monitor) ───────────────────────────────────────

interface IntakeItem {
  name: string;
  source: string;
  status: string;
  size: number;
  reason: string;
  domain?: string;
  priority?: string;
}

// ── Triage Item (from Notebook LLM) ────────────────────────────────────────

interface TriageItem {
  id: string;
  fileName: string;
  fileLink: string;
  notebookLLMOutput: {
    summary: string;
    keyPoints: string[];
    entities: Array<{ type: string; name: string }>;
    sentiment: string;
    confidence: number;
    suggestedCategory: string;
    suggestedPriority: string;
  };
  status: 'pending_review' | 'approved' | 'rejected' | 'published';
  assignedCategory?: string;
  assignedPriority?: string;
}

// ── Connected Surface ───────────────────────────────────────────────────────

interface ConnectedSurface {
  name: string;
  description: string;
  url: string;
  status: 'live' | 'local' | 'pending';
  icon: React.ReactNode;
}

// ── Connected Surfaces ──────────────────────────────────────────────────────

const CONNECTED_SURFACES: ConnectedSurface[] = [
  {
    name: 'Folder Monitor',
    description: 'Watches filesystem, manages intake queue, promotes files',
    url: '/Users/nirmal/Github/IntegrateWise Folder Monitor/index.html',
    status: 'local',
    icon: '📁',
  },
  {
    name: 'Public Docs',
    description: 'Sanitized documentation for external users',
    url: 'https://integratewise-docs.pages.dev',
    status: 'live',
    icon: '📖',
  },
  {
    name: 'Operations',
    description: 'Founder command center, KPIs, connected systems',
    url: 'http://localhost:5173',
    status: 'local',
    icon: '⚙️',
  },
  {
    name: 'Spine (Supabase)',
    description: 'Memory layer — Personal, Organisational, Conversational',
    url: 'https://supabase.com',
    status: 'live',
    icon: '🧠',
  },
];

// ── Intake Queue (from Folder Monitor) ──────────────────────────────────────

const INTAKE_QUEUE: IntakeItem[] = [
  { name: 'integratewise_architecture_document_v2.md', source: 'downloads', status: 'staging', size: 15400, reason: 'Architecture document v2' },
  { name: 'integratewise_architecture_document.md', source: 'downloads', status: 'staging', size: 12800, reason: 'Architecture document v1' },
  { name: 'Product Map — Complete Assembly Sequence', source: 'downloads', status: 'staging', size: 8200, reason: 'Product map from conversation' },
  { name: 'Business Ops UI Fields', source: 'downloads', status: 'staging', size: 4500, reason: 'UI field definitions' },
  { name: 'Five Pillars Narrative', source: 'downloads', status: 'staging', size: 3200, reason: 'Core messaging document' },
];

// ── Triage Queue (from Notebook LLM) ───────────────────────────────────────

const TRIAGE_QUEUE: TriageItem[] = [
  {
    id: 'triage_1',
    fileName: 'integratewise_architecture_document_v2.md',
    fileLink: 'https://drive.google.com/file/d/example1',
    notebookLLMOutput: {
      summary: 'Complete architecture document v2 describing the five-layer system, MCP pipeline, and memory model.',
      keyPoints: [
        'Five-layer architecture: Connection, Processing, Surface, Memory, Governance',
        'MCP as primary protocol for tool communication',
        'Three memory layers: Personal, Organisational, Conversational',
        'Model is variable, memory is constant',
      ],
      entities: [
        { type: 'concept', name: 'Spine' },
        { type: 'concept', name: 'MCP Pipeline' },
        { type: 'concept', name: 'Normalizer' },
      ],
      sentiment: 'positive',
      confidence: 0.92,
      suggestedCategory: 'architecture',
      suggestedPriority: 'critical',
    },
    status: 'pending_review',
  },
  {
    id: 'triage_2',
    fileName: 'Product Map — Complete Assembly Sequence',
    fileLink: 'https://drive.google.com/file/d/example2',
    notebookLLMOutput: {
      summary: 'Complete product map showing the assembly sequence for IntegrateWise from intake to execution.',
      keyPoints: [
        'Phase 1: Intake pipe (Folder Monitor + Queue)',
        'Phase 2: Routing layer (classification and promotion)',
        'Phase 3: Wire ops surfaces (merge December + Live)',
        'Phase 4: Twin memory (behavioral logging)',
        'Phase 5: Combined shell (one surface)',
      ],
      entities: [
        { type: 'repo', name: 'integratewise-ops' },
        { type: 'repo', name: 'integratewise-live' },
        { type: 'repo', name: 'Folder Monitor' },
      ],
      sentiment: 'positive',
      confidence: 0.88,
      suggestedCategory: 'product',
      suggestedPriority: 'high',
    },
    status: 'pending_review',
  },
];

// ── Document Content (from seed file) ───────────────────────────────────────

const DOC_CONTENT: Record<string, string> = {
  'pub-01': `# IntegrateWise — Your AI Remembers Everything

You use six tools. Your AI uses zero of them.

Every morning you rebuild context. Every meeting you re-explain what the AI should already know.
Every session starts from zero because no AI remembers what happened yesterday.

IntegrateWise changes that. Connect your tools. Your AI sees everything — your CRM,
your support tickets, your conversations, your docs. It remembers every account,
every decision, every risk. It never starts cold. It never forgets.

You open one place. Everything is there. Your AI already knows the context.
You stop re-explaining and start doing.

## One Place for Everything
All your tools, one surface. No more six tabs. No more copying context.

**14 modules:** Dashboard, CRM, Sales Hub, Clients, Accounts, Tasks, Documents,
Workflows, Calendar, Analytics, Strategic Hub, Metrics, Integration Hub, Ops Command Center.

**15-layer account intelligence:** Account Master, People, Business Context,
Strategic Objectives, Capabilities, Value Streams, API Portfolio, Platform Health,
Initiatives, Risk Register, Stakeholder Outcomes, Engagement Log, Success Plan,
Task Manager, Generated Insights.

## Your AI Never Forgets
The AI reads from the same memory you write to. Switch models — it still remembers.
The memory does not reset. Ever.

## You Stay in Control
The AI suggests. You decide. Nothing happens without your say-so.`,

  'pub-02': `# Website Content

## Hero
**Your AI remembers everything. Finally.**

You open your CRM. Then your support desk. Then Slack. Then your docs. Then your AI chat.
And then you explain everything. Again.

IntegrateWise connects to your tools — CRM, support desk, communication, documentation —
and puts all the data in one view. Your AI already knows the context.

## One Place for Everything
Not a dashboard with widgets from six tools. One connected, normalised view.
Edit something here, it updates back in the original tool.

## AI That Already Knows
Open your AI chat. Ask: "What accounts need attention this week?"
It answers. With real data. From your actual tools. Because it reads from the same memory you write to.

## You Stay In Control
The AI suggests. You decide. It recommends — you approve, adjust, or reject.
Every decision is recorded. Every change is tracked.

## Your Knowledge Stays
When someone leaves the team, the knowledge stays. Decisions, patterns, context — all captured.
The next person picks up where the last one left off.`,

  'pub-10': `# Architecture — High Level

## How IntegrateWise Works

**Two channels of entry:**
- Human: natural language, direct work on projected data
- Machine: MCP pipeline, watchers, AI connectors

**The Spine** — one logical memory across Postgres, Redis, CF KV/R2/D1, Supabase.
Holds three memory layers: Personal, Organisational, Conversational.

**Three surfaces:** User Workbench (operational truth + embedded Twin),
Twin Workbench (AI ecosystem, conversational memory, handoff),
Memory View Layer (Personal and Organisational memory).

**Governance:** Every action passes through approval.
AI proposes. Human approves. User executes through their own stack.

**Continuity:** The model is a variable. The memory is a constant.
Switch models, switch providers, rebuild infrastructure — the memory survives.`,

  'pub-13': `# Sales Collateral

**IntegrateWise — Your AI remembers everything.**

## One-Pager
Connect your tools. One place for all your data. AI that already has the context. You stay in control.
- One surface for all your tools
- AI that never forgets
- You approve everything
- Tools stay in sync automatically
- Knowledge stays when people leave

## Battle Cards

### vs. ChatGPT / Claude
**What they have:** A chat window that forgets everything. No access to tools.
**What you offer:** AI that reads from all tools, remembers everything, never starts cold.
**Key message:** "Your AI is smart but amnesiac. IntegrateWise gives it memory."

### vs. Microsoft Copilot
**What they have:** AI inside Microsoft tools. Locked to Azure OpenAI.
**What you offer:** AI across all tools. Any model. One memory.

### vs. Notion / Confluence
**What they have:** Manual documentation. No AI reasoning.
**What you offer:** Knowledge captured automatically. AI surfaces what matters.

## Objection Handling
"We already have AI." — You do, and you spend 10 minutes per session explaining context.
IntegrateWise gives your AI the memory it does not have.

"This sounds complicated." — Connect one tool. See your data. Ask a question.
That is the first five minutes.

"What if we switch AI providers?" — Your memory stays. Switch models freely.`,

  'pub-16': `# Case Studies

## The $8 Million Account

A Customer Success Manager managed 30+ accounts across six tools — CRM, support desk,
Slack, documentation, email, project tracker. None talked to each other.

An $8 million account was in trouble. The signals were scattered across six different tools.
No single tool showed the full picture. Nobody connected the dots.

He had built an early version of what would become IntegrateWise. A place where data
from all six tools landed in one view. He could see what nobody else could see:
the pattern that connected the escalation, the usage drop, and the tone shift.

He intervened with full context. Addressed the issue. Saved $8 million.

That is what IntegrateWise does. It connects the dots your tools leave scattered.

## IntegrateWise on IntegrateWise

The founder connects the company's tools through IntegrateWise. Engineering, product,
communication, documentation — all feeding into one surface. The AI knows every project,
every decision, every priority. One tab every morning runs the company.`,

  'pub-22': `# FAQ

**What is this?**
IntegrateWise connects all your work tools and gives your AI the memory it does not have.
One place for everything. AI that already knows the context. You stay in control.

**How is this different from ChatGPT?**
ChatGPT forgets everything when you close the tab. It does not know your CRM, your support
tickets, or your team's decisions. IntegrateWise gives any AI access to all of that.

**Do I have to replace my tools?**
No. IntegrateWise connects to your existing tools. You keep using them.

**What AI models can I use?**
Any of them. GPT-4, Claude, Gemini, and hundreds more. Switch freely.
The memory stays the same regardless of which model you use.

**Is my data safe?**
Your data is yours. Personal notes stay personal. You approve every action.

**What if someone leaves the team?**
Their knowledge stays. Decisions, context, history — all captured.
The next person picks up with full context.

**How long does it take to set up?**
Connect one tool. See your data. Ask the AI a question. First five minutes.`,

  'int-01': `# System Architecture

## Five-Layer System

**Layer 5: User Surfaces** — User Workbench (two product configurations:
Business Ops with 14 modules, Account Success with 15-layer intelligence schema),
Twin Workbench, Memory View Layer.

**Layer 4: Cognition** — Twin (Hermes) reasoning engine, skills, model orchestration.

**Layer 3: Governance** — Approval gates, lineage, policies, audit.

**Layer 2: Persistence** — Spine across 6 physical stores. 31 entity types.

**Layer 1: Connection** — MCP Server, Loader, Normalizer, Watchers, AI Connectors.

## 31 Entity Types
Account Success (16): account_master, risk, task_item, engagement_log,
generated_insight, success_plan, initiative, strategic_objective, capability,
value_stream, api_portfolio, platform_health_metric, people_team,
business_context, stakeholder_outcome

Business Ops (13): account, opportunity, task, document, workflow,
calendar_event, okr, kpi, ops_metric

Platform (5): memory_item, lineage, approval, entity_relationship, generated_insight`,

  'str-01': `# Vision Document

## The World We Are Building
A world where every organisation has a living, persistent, governed memory
that every person and every AI can read from and contribute to.

AI never starts cold. Switching models is as simple as switching screens.
A team member can leave and the knowledge stays. The human is the decision maker,
not the integration layer.

## The Conviction
Memory is the layer nobody else owns. CRM vendors own CRM data.
Support vendors own tickets. Communication vendors own messages.
Nobody owns the cross-system, persistent, governed memory that ties it all together.

That is what IntegrateWise owns. That is the entire product.

## The Trajectory
**Year 1:** Establish the memory layer. Connect tools. Prove persistence.
**Year 2:** Scale the connector ecosystem.
**Year 3:** Become the default memory layer for organisations.`,

  'str-02': `# Founder Thesis

**As a Customer Success Manager,** he was the human API.
Managed 30+ accounts across six tools. Rebuilt context every morning.
Held the full picture in his head because no system held it for him.

**As a MuleSoft Architect,** he designed enterprise integration platforms.
Built secure data flows between systems never meant to connect.
Enforced security policies. Applied architectural best practices at scale.

**The convergence:** The CSM knew what needed to exist.
The architect knew how to build it. One person held both.

**The $8M moment:** An $8 million account at risk. Because the Spine connected
dots that no one else could connect, he saw the full picture. Saved $8 million.

That was the moment. Not a business plan. Not a market analysis.
One account. One Spine. $8 million saved.`,

  'str-03': `# Product Philosophy

**Memory First** — Memory is the product. Everything else supports memory.

**Governance by Default** — Nothing happens without human approval.
Governance is the foundation, not a feature.

**Model Independence** — The model is a variable. The memory is a constant.
We do not bet on any single AI provider.

**The Human Decides** — AI proposes. The human decides.
The user executes through their own stack.

**Continuity Is the Foundation** — If the system loses context when the model changes,
it is not a memory system. Continuity is the minimum requirement.`,

  'str-05': `# Narrative & Messaging

## The One Sentence
> IntegrateWise owns memory. You own execution. MCP connects the two.

## The Five Pillars
1. **One Surface** — stop juggling tools
2. **Persistent Memory** — it knows everything, always
3. **AI That Knows Everything** — AI thinks in context, waits for approval
4. **Governance and Security** — nothing happens without your approval
5. **Continuity** — between the systems, the work, and your memory

## Key Messages
**For CSMs:** "You manage 30 accounts across six tools. IntegrateWise puts all of them
in one view with an AI that already knows every account's history."

**For Founders:** "You run your company from six dashboards. IntegrateWise gives you
one surface with AI that sees the whole business."

**For Enterprise:** "Enterprise-grade security by default. Governance on every action."

**For Investors:** "Memory is the layer nobody else owns. The model is a variable.
The memory is a constant."`,
};

// ── Document Registry ───────────────────────────────────────────────────────

const DOCS: Document[] = [
  // PUBLIC DOCS
  { id:"pub-01", name:"Product Overview", cat:"public", sub:"public-product", desc:"What IntegrateWise is, who it is for, what it does.", status:"locked", priority:"critical", tags:["product"], linked:"Product Doc v1.0", notes:"Locked. Three-surface model, five pillars, execution boundary all confirmed." },
  { id:"pub-02", name:"Website Content", cat:"public", sub:"public-product", desc:"Landing page copy, feature sections, hero messaging, CTAs.", status:"pending", priority:"critical", tags:["gtm","product"], linked:"One-Pager, Product Doc v1.0", notes:"Next deliverable. Design and copy to be produced." },
  { id:"pub-03", name:"Feature Documentation", cat:"public", sub:"public-product", desc:"Detailed documentation for each feature.", status:"pending", priority:"high", tags:["product"], linked:"Architecture Doc v3.0", notes:"Each feature needs its own page once website is live." },
  { id:"pub-04", name:"Pricing & Plans", cat:"public", sub:"public-product", desc:"Pricing tiers, what is included at each level.", status:"pending", priority:"high", tags:["gtm"], linked:"", notes:"Needs decision on pricing model." },
  { id:"pub-05", name:"API Documentation", cat:"public", sub:"public-docs", desc:"MCP endpoints, authentication, request/response schemas.", status:"pending", priority:"high", tags:["eng"], linked:"Architecture Doc v3.0 §4", notes:"Auto-generable from MCP server." },
  { id:"pub-06", name:"SDK Guides", cat:"public", sub:"public-docs", desc:"Client SDKs for connecting to IntegrateWise.", status:"pending", priority:"low", tags:["eng"], linked:"", notes:"Post-MVP." },
  { id:"pub-07", name:"Integration Guides", cat:"public", sub:"public-docs", desc:"How to connect specific tools.", status:"pending", priority:"high", tags:["product","eng"], linked:"Architecture Doc v3.0 §4-6", notes:"Start with most common tools." },
  { id:"pub-08", name:"Quick Start Guides", cat:"public", sub:"public-docs", desc:"Get from zero to first connected tool in under 10 minutes.", status:"pending", priority:"high", tags:["product"], linked:"", notes:"Critical for adoption." },
  { id:"pub-09", name:"Tutorials & Walkthroughs", cat:"public", sub:"public-docs", desc:"Step-by-step guides for common use cases.", status:"pending", priority:"medium", tags:["product"], linked:"", notes:"Create after first 5 users." },
  { id:"pub-10", name:"Architecture (High-Level)", cat:"public", sub:"public-docs", desc:"Public-facing architecture overview.", status:"pending", priority:"high", tags:["arch","product"], linked:"Architecture Doc v3.0", notes:"Derive from Architecture Doc." },
  { id:"pub-11", name:"Release Notes", cat:"public", sub:"public-docs", desc:"What changed in each release.", status:"pending", priority:"medium", tags:["eng"], linked:"", notes:"Start from first public release." },
  { id:"pub-12", name:"Changelogs", cat:"public", sub:"public-docs", desc:"Detailed technical changelog.", status:"pending", priority:"low", tags:["eng"], linked:"", notes:"Auto-generated from git." },
  { id:"pub-13", name:"Sales Collateral", cat:"public", sub:"public-gtm", desc:"One-pagers, battle cards, objection handling.", status:"pending", priority:"high", tags:["gtm"], linked:"One-Pager", notes:"Derive from One-Pager." },
  { id:"pub-14", name:"Investor Deck (Sanitized)", cat:"public", sub:"public-gtm", desc:"Public-safe investor presentation.", status:"pending", priority:"medium", tags:["gtm","strategy"], linked:"", notes:"Create after core narrative locked." },
  { id:"pub-15", name:"Brand Assets", cat:"public", sub:"public-gtm", desc:"Logo files, color palette, typography, usage guidelines.", status:"pending", priority:"medium", tags:["gtm"], linked:"", notes:"Forest + Paper design system documented." },
  { id:"pub-16", name:"Case Studies", cat:"public", sub:"public-gtm", desc:"Customer stories including the $8M account proof point.", status:"pending", priority:"high", tags:["gtm","product"], linked:"", notes:"First case study: the $8M account." },
  { id:"pub-17", name:"GTM Materials", cat:"public", sub:"public-gtm", desc:"Campaign briefs, content calendar, launch plans.", status:"pending", priority:"medium", tags:["gtm"], linked:"", notes:"Depends on website and pricing." },
  { id:"pub-18", name:"Public Roadmap", cat:"public", sub:"public-gtm", desc:"What is coming next.", status:"pending", priority:"medium", tags:["product","gtm"], linked:"", notes:"Publish after first release." },
  { id:"pub-19", name:"Demo Videos", cat:"public", sub:"public-gtm", desc:"Product walkthroughs, feature demos.", status:"pending", priority:"high", tags:["gtm","product"], linked:"", notes:"Start with 3-minute overview." },
  { id:"pub-20", name:"Security Overview", cat:"public", sub:"public-support", desc:"How IntegrateWise handles security.", status:"pending", priority:"high", tags:["eng","arch"], linked:"Architecture Doc v3.0 §12", notes:"Critical for enterprise buyers." },
  { id:"pub-21", name:"Compliance Statements", cat:"public", sub:"public-support", desc:"GDPR, SOC2 readiness, data residency.", status:"pending", priority:"medium", tags:["eng"], linked:"", notes:"Legal review required." },
  { id:"pub-22", name:"FAQ", cat:"public", sub:"public-support", desc:"Frequently asked questions.", status:"pending", priority:"medium", tags:["product","gtm"], linked:"", notes:"Build from real questions." },
  { id:"pub-23", name:"Support Documentation", cat:"public", sub:"public-support", desc:"Troubleshooting guides, known issues.", status:"pending", priority:"medium", tags:["product"], linked:"", notes:"After first external users." },
  { id:"pub-24", name:"Knowledge Base", cat:"public", sub:"public-support", desc:"Searchable repository of articles.", status:"pending", priority:"medium", tags:["product"], linked:"", notes:"Grows from docs and FAQ." },
  { id:"pub-25", name:"Community Guidelines", cat:"public", sub:"public-support", desc:"How to participate in the community.", status:"pending", priority:"low", tags:["gtm"], linked:"", notes:"Post-MVP." },
  { id:"pub-26", name:"Marketplace Listings", cat:"public", sub:"public-support", desc:"Integration marketplace listings.", status:"pending", priority:"low", tags:["gtm"], linked:"", notes:"Depends on MCP maturity." },
  { id:"pub-27", name:"Open Source Documentation", cat:"public", sub:"public-support", desc:"Open-source components, contribution guidelines.", status:"pending", priority:"low", tags:["eng"], linked:"", notes:"If/when open-source released." },
  { id:"pub-28", name:"Partner Documentation", cat:"public", sub:"public-support", desc:"How partners integrate and co-sell.", status:"pending", priority:"low", tags:["gtm"], linked:"", notes:"Post-MVP." },
  { id:"pub-29", name:"Public Whitepapers", cat:"public", sub:"public-support", desc:"Deep-dive papers on memory, governance, continuity.", status:"pending", priority:"low", tags:["strategy","arch"], linked:"Architecture Doc v3.0", notes:"Thought leadership." },

  // INTERNAL DOCS
  { id:"int-01", name:"System Architecture", cat:"internal", sub:"internal-arch", desc:"Complete technical architecture. The source of truth.", status:"locked", priority:"critical", tags:["arch","eng"], linked:"", notes:"Architecture Doc v3.0. Locked." },
  { id:"int-02", name:"Memory Architecture", cat:"internal", sub:"internal-arch", desc:"Deep dive into the Spine.", status:"drafted", priority:"critical", tags:["arch","eng"], linked:"Architecture Doc v3.0 §9", notes:"Needs standalone deep dive." },
  { id:"int-03", name:"Data Models", cat:"internal", sub:"internal-arch", desc:"Entity schemas, relationship graphs, field definitions.", status:"inprogress", priority:"high", tags:["eng","arch"], linked:"Architecture Doc v3.0 §9", notes:"Active development." },
  { id:"int-04", name:"Internal APIs", cat:"internal", sub:"internal-arch", desc:"Internal service-to-service APIs.", status:"inprogress", priority:"high", tags:["eng"], linked:"Architecture Doc v3.0 §8", notes:"Evolving with implementations." },
  { id:"int-05", name:"Infrastructure Design", cat:"internal", sub:"internal-arch", desc:"VPS layout, Docker networks, Cloudflare Workers.", status:"drafted", priority:"high", tags:["eng"], linked:"Architecture Doc v3.0 §12", notes:"Hostinger VPS, 3 Docker networks." },
  { id:"int-06", name:"Folder Watcher Logic", cat:"internal", sub:"internal-arch", desc:"How watchers work.", status:"drafted", priority:"medium", tags:["eng"], linked:"Architecture Doc v3.0 §5", notes:"Exists in code. Needs docs." },
  { id:"int-07", name:"Automation Flows", cat:"internal", sub:"internal-arch", desc:"Internal automation.", status:"inprogress", priority:"medium", tags:["eng"], linked:"Architecture Doc v3.0 §8", notes:"Pipeline definitions locked." },
  { id:"int-08", name:"Deployment Playbooks", cat:"internal", sub:"internal-ops", desc:"How to deploy, update, rollback.", status:"drafted", priority:"high", tags:["eng"], linked:"Architecture Doc v3.0 §12", notes:"Manual first deploy doctrine." },
  { id:"int-09", name:"DevOps Runbooks", cat:"internal", sub:"internal-ops", desc:"Operational procedures.", status:"pending", priority:"high", tags:["eng"], linked:"", notes:"Post-stabilization." },
  { id:"int-10", name:"Vendor Configurations", cat:"internal", sub:"internal-ops", desc:"Configuration details for all providers.", status:"drafted", priority:"medium", tags:["eng"], linked:"", notes:"Scattered across .env files." },
  { id:"int-11", name:"Cost Optimization", cat:"internal", sub:"internal-ops", desc:"Provider costs, optimization strategies.", status:"pending", priority:"medium", tags:["strategy","eng"], linked:"", notes:"Track as usage grows." },
  { id:"int-12", name:"Incident Management", cat:"internal", sub:"internal-ops", desc:"Incident response procedures.", status:"pending", priority:"medium", tags:["eng"], linked:"", notes:"Create after first incident." },
  { id:"int-13", name:"Debugging Playbooks", cat:"internal", sub:"internal-ops", desc:"Common failure modes, diagnostic steps.", status:"pending", priority:"medium", tags:["eng"], linked:"", notes:"Build from real sessions." },
  { id:"int-14", name:"Operational Dashboards", cat:"internal", sub:"internal-ops", desc:"Internal monitoring dashboards.", status:"inprogress", priority:"high", tags:["eng"], linked:"", notes:"Being built alongside product." },
  { id:"int-15", name:"Cognitive Layer Design", cat:"internal", sub:"internal-ai", desc:"How the Twin reasons.", status:"drafted", priority:"critical", tags:["arch","eng"], linked:"Architecture Doc v3.0 §8", notes:"Core differentiator." },
  { id:"int-16", name:"Governance Layer", cat:"internal", sub:"internal-ai", desc:"How governance works at every layer.", status:"drafted", priority:"critical", tags:["arch","eng"], linked:"Architecture Doc v3.0 §11", notes:"Needs standalone." },
  { id:"int-17", name:"Agent Orchestration", cat:"internal", sub:"internal-ai", desc:"How the Twin orchestrates multi-model reasoning.", status:"drafted", priority:"high", tags:["arch","eng"], linked:"Architecture Doc v3.0 §8", notes:"Handoff pipeline documented." },
  { id:"int-18", name:"Prompt Engineering Standards", cat:"internal", sub:"internal-ai", desc:"Standards for prompt construction.", status:"inprogress", priority:"high", tags:["eng"], linked:"", notes:"Active refinement." },
  { id:"int-19", name:"AI Safety Controls", cat:"internal", sub:"internal-ai", desc:"Guardrails, output validation, drift detection.", status:"drafted", priority:"high", tags:["eng"], linked:"", notes:"Drift protection is core." },
  { id:"int-20", name:"Drift Protection Logic", cat:"internal", sub:"internal-ai", desc:"How the system prevents AI drift.", status:"drafted", priority:"critical", tags:["eng","arch"], linked:"Architecture Doc v3.0 §13", notes:"Core value proposition." },
  { id:"int-21", name:"Memory Promotion Rules", cat:"internal", sub:"internal-ai", desc:"Rules governing memory promotion.", status:"drafted", priority:"high", tags:["eng","arch"], linked:"Architecture Doc v3.0 §10", notes:"Governance pipeline in §8." },
  { id:"int-22", name:"AI Evaluation Benchmarks", cat:"internal", sub:"internal-ai", desc:"How AI performance is measured.", status:"pending", priority:"medium", tags:["eng"], linked:"", notes:"Establish before scaling." },
  { id:"int-23", name:"Security Policies", cat:"internal", sub:"internal-ai", desc:"Detailed security policies.", status:"drafted", priority:"high", tags:["eng"], linked:"Architecture Doc v3.0 §12", notes:"Needs standalone." },
  { id:"int-24", name:"Access Control Policies", cat:"internal", sub:"internal-ai", desc:"Who can access what.", status:"drafted", priority:"high", tags:["eng"], linked:"Architecture Doc v3.0 §12", notes:"Memory boundary enforcement." },
  { id:"int-25", name:"Approval Workflows", cat:"internal", sub:"internal-ai", desc:"Detailed approval workflow definitions.", status:"drafted", priority:"medium", tags:["eng"], linked:"Architecture Doc v3.0 §11", notes:"Workflow detail needed." },
  { id:"int-26", name:"Internal SOPs", cat:"internal", sub:"internal-org", desc:"Standard operating procedures.", status:"pending", priority:"medium", tags:["strategy"], linked:"", notes:"After team grows." },
  { id:"int-27", name:"Internal Research Notes", cat:"internal", sub:"internal-org", desc:"Market research, competitive analysis.", status:"pending", priority:"medium", tags:["strategy"], linked:"", notes:"Capture as research happens." },
  { id:"int-28", name:"Experimental Features", cat:"internal", sub:"internal-org", desc:"Features in experimentation.", status:"pending", priority:"medium", tags:["eng","product"], linked:"", notes:"Track experiments." },
  { id:"int-29", name:"Engineering RFCs", cat:"internal", sub:"internal-org", desc:"Request for Comments on engineering decisions.", status:"pending", priority:"medium", tags:["eng"], linked:"", notes:"Start using RFCs." },
  { id:"int-30", name:"Internal Meeting Notes", cat:"internal", sub:"internal-org", desc:"Key decisions from meetings.", status:"pending", priority:"low", tags:["strategy"], linked:"", notes:"Dogfood IntegrateWise." },
  { id:"int-31", name:"Employee Onboarding", cat:"internal", sub:"internal-org", desc:"How new team members get up to speed.", status:"pending", priority:"low", tags:["strategy"], linked:"", notes:"Create before first hire." },
  { id:"int-32", name:"Org Structure", cat:"internal", sub:"internal-org", desc:"Team structure, roles, responsibilities.", status:"pending", priority:"low", tags:["strategy"], linked:"", notes:"Currently founder-only." },
  { id:"int-33", name:"Internal QA Docs", cat:"internal", sub:"internal-org", desc:"Testing strategy, test plans.", status:"pending", priority:"medium", tags:["eng"], linked:"", notes:"Before external users." },
  { id:"int-34", name:"Workspace Design", cat:"internal", sub:"internal-org", desc:"How the internal workspace is organized.", status:"drafted", priority:"medium", tags:["eng"], linked:"", notes:"Needs formalization." },

  // STRATEGY DOCS
  { id:"str-01", name:"Vision Document", cat:"strategy", sub:"strategy-vision", desc:"Where IntegrateWise is going.", status:"drafted", priority:"critical", tags:["strategy"], linked:"", notes:"Core conviction exists." },
  { id:"str-02", name:"Founder Thesis", cat:"strategy", sub:"strategy-vision", desc:"The CSM/architect convergence. The $8M account.", status:"drafted", priority:"critical", tags:["strategy","gtm"], linked:"", notes:"Story exists. Needs narrative." },
  { id:"str-03", name:"Product Philosophy", cat:"strategy", sub:"strategy-vision", desc:"Core beliefs about how products should work.", status:"drafted", priority:"high", tags:["strategy","product"], linked:"", notes:"Needs its own voice." },
  { id:"str-04", name:"Operating Principles", cat:"strategy", sub:"strategy-vision", desc:"How IntegrateWise operates.", status:"drafted", priority:"high", tags:["strategy"], linked:"", notes:"Needs consolidation." },
  { id:"str-05", name:"Narrative & Messaging", cat:"strategy", sub:"strategy-vision", desc:"The story IntegrateWise tells.", status:"drafted", priority:"critical", tags:["strategy","gtm"], linked:"One-Pager", notes:"Five pillars are foundation." },
  { id:"str-06", name:"Product Strategy", cat:"strategy", sub:"strategy-market", desc:"What to build, in what order, for whom.", status:"drafted", priority:"critical", tags:["strategy","product"], linked:"", notes:"Three-surface model locked." },
  { id:"str-07", name:"GTM Strategy", cat:"strategy", sub:"strategy-market", desc:"How IntegrateWise reaches the market.", status:"pending", priority:"critical", tags:["strategy","gtm"], linked:"", notes:"Depends on website." },
  { id:"str-08", name:"Monetization Strategy", cat:"strategy", sub:"strategy-market", desc:"How IntegrateWise makes money.", status:"pending", priority:"high", tags:["strategy","gtm"], linked:"Pricing & Plans", notes:"Needs decision." },
  { id:"str-09", name:"Customer Segmentation", cat:"strategy", sub:"strategy-market", desc:"ICP definition, persona mapping.", status:"drafted", priority:"high", tags:["strategy","gtm"], linked:"Product Doc v1.0", notes:"ICP needs sharpening." },
  { id:"str-10", name:"Competitive Analysis", cat:"strategy", sub:"strategy-market", desc:"Who else is in the space.", status:"pending", priority:"high", tags:["strategy","gtm"], linked:"", notes:"Needs formal document." },
  { id:"str-11", name:"Differentiation Matrix", cat:"strategy", sub:"strategy-market", desc:"Feature-by-feature comparison.", status:"pending", priority:"high", tags:["strategy","gtm"], linked:"", notes:"Derive from competitive analysis." },
  { id:"str-12", name:"Market Positioning", cat:"strategy", sub:"strategy-market", desc:"Where IntegrateWise sits in the market.", status:"drafted", priority:"high", tags:["strategy","gtm"], linked:"", notes:"'Governed memory layer' is position." },
  { id:"str-13", name:"Adoption Strategy", cat:"strategy", sub:"strategy-market", desc:"How users go from first connection to full adoption.", status:"pending", priority:"high", tags:["strategy","product"], linked:"", notes:"Quick Start is entry." },
  { id:"str-14", name:"Retention Strategy", cat:"strategy", sub:"strategy-market", desc:"Why users stay.", status:"pending", priority:"medium", tags:["strategy"], linked:"", notes:"Memory persistence IS retention." },
  { id:"str-15", name:"Enterprise Strategy", cat:"strategy", sub:"strategy-market", desc:"How IntegrateWise moves upmarket.", status:"pending", priority:"medium", tags:["strategy","gtm"], linked:"", notes:"Security posture ready." },
  { id:"str-16", name:"Expansion Strategy", cat:"strategy", sub:"strategy-market", desc:"How IntegrateWise grows beyond initial ICP.", status:"pending", priority:"medium", tags:["strategy"], linked:"", notes:"Platform is universal." },
  { id:"str-17", name:"AI Strategy", cat:"strategy", sub:"strategy-platform", desc:"How IntegrateWise approaches AI.", status:"drafted", priority:"critical", tags:["strategy","arch"], linked:"Architecture Doc v3.0", notes:"Model is variable, memory is constant." },
  { id:"str-18", name:"Platform Strategy", cat:"strategy", sub:"strategy-platform", desc:"How IntegrateWise evolves to platform.", status:"drafted", priority:"high", tags:["strategy","arch"], linked:"", notes:"MCP as extension mechanism." },
  { id:"str-19", name:"Ecosystem Strategy", cat:"strategy", sub:"strategy-platform", desc:"How the connector ecosystem grows.", status:"pending", priority:"medium", tags:["strategy","gtm"], linked:"", notes:"Post-MVP." },
  { id:"str-20", name:"Platform Governance Strategy", cat:"strategy", sub:"strategy-platform", desc:"How governance scales.", status:"drafted", priority:"high", tags:["strategy","arch"], linked:"Architecture Doc v3.0 §11", notes:"Scaling strategy needed." },
  { id:"str-21", name:"Multi-Agent Strategy", cat:"strategy", sub:"strategy-platform", desc:"How IntegrateWise supports multi-agent ecosystems.", status:"drafted", priority:"high", tags:["strategy","arch"], linked:"Architecture Doc v3.0 §8", notes:"Coordination needs strategy." },
  { id:"str-22", name:"Memory Strategy", cat:"strategy", sub:"strategy-platform", desc:"How memory evolves.", status:"drafted", priority:"high", tags:["strategy","arch"], linked:"Architecture Doc v3.0 §10", notes:"Three layers locked." },
  { id:"str-23", name:"Continuity Strategy", cat:"strategy", sub:"strategy-platform", desc:"How continuity extends.", status:"drafted", priority:"medium", tags:["strategy","arch"], linked:"Architecture Doc v3.0 §13", notes:"Continuity is foundation." },
  { id:"str-24", name:"Provider Abstraction Strategy", cat:"strategy", sub:"strategy-platform", desc:"How IntegrateWise abstracts across AI providers.", status:"drafted", priority:"medium", tags:["strategy","arch"], linked:"", notes:"OpenRouter exists." },
  { id:"str-25", name:"Security & Trust Strategy", cat:"strategy", sub:"strategy-platform", desc:"How security evolves.", status:"drafted", priority:"high", tags:["strategy","eng"], linked:"Architecture Doc v3.0 §12", notes:"Communicating trust." },
  { id:"str-26", name:"Roadmaps", cat:"strategy", sub:"strategy-platform", desc:"Product, engineering, platform roadmaps.", status:"pending", priority:"critical", tags:["strategy","product"], linked:"", notes:"After prioritization." },
  { id:"str-27", name:"Partnership Strategy", cat:"strategy", sub:"strategy-platform", desc:"Which partners to pursue.", status:"pending", priority:"medium", tags:["strategy","gtm"], linked:"", notes:"Post-MVP." },
  { id:"str-28", name:"Acquisition Targets", cat:"strategy", sub:"strategy-platform", desc:"Potential acquisitions.", status:"pending", priority:"low", tags:["strategy"], linked:"", notes:"Long-term." },
  { id:"str-29", name:"Investment Planning", cat:"strategy", sub:"strategy-platform", desc:"Fundraising strategy.", status:"pending", priority:"high", tags:["strategy"], linked:"", notes:"When ready to raise." },
  { id:"str-30", name:"Risk Analysis", cat:"strategy", sub:"strategy-platform", desc:"Strategic risks.", status:"pending", priority:"medium", tags:["strategy"], linked:"", notes:"Formalize known risks." },
  { id:"str-31", name:"Long-Term Architecture Vision", cat:"strategy", sub:"strategy-platform", desc:"Where the architecture goes over 3-5 years.", status:"drafted", priority:"medium", tags:["strategy","arch"], linked:"", notes:"Founder has vision." },
  { id:"str-32", name:"Strategic Research", cat:"strategy", sub:"strategy-platform", desc:"Ongoing research.", status:"pending", priority:"medium", tags:["strategy"], linked:"", notes:"Continuous activity." },
  { id:"str-33", name:"Opportunity Mapping", cat:"strategy", sub:"strategy-platform", desc:"Adjacent opportunities enabled by memory layer.", status:"pending", priority:"medium", tags:["strategy"], linked:"", notes:"Memory is platform." },
];

// ── Sidebar Structure ───────────────────────────────────────────────────────

const SIDEBAR_SECTIONS = [
  { id: 'all', label: 'All Documents', icon: '◉' },
  { id: 'public', label: 'All Public', icon: '◻', section: 'PUBLIC DOCS' },
  { id: 'public-product', label: 'Product & Website', icon: '→' },
  { id: 'public-docs', label: 'Documentation', icon: '→' },
  { id: 'public-gtm', label: 'GTM & Sales', icon: '→' },
  { id: 'public-support', label: 'Support & Community', icon: '→' },
  { id: 'internal', label: 'All Internal', icon: '◻', section: 'INTERNAL DOCS' },
  { id: 'internal-arch', label: 'Architecture & Eng', icon: '→' },
  { id: 'internal-ops', label: 'Operations & DevOps', icon: '→' },
  { id: 'internal-ai', label: 'AI & Cognition', icon: '→' },
  { id: 'internal-org', label: 'Organizational', icon: '→' },
  { id: 'strategy', label: 'All Strategy', icon: '◻', section: 'STRATEGY DOCS' },
  { id: 'strategy-vision', label: 'Vision & Direction', icon: '→' },
  { id: 'strategy-market', label: 'Market & GTM', icon: '→' },
  { id: 'strategy-platform', label: 'Platform & Technical', icon: '→' },
  { id: 'status-locked', label: 'Locked', icon: '●', section: 'BY STATUS', color: 'var(--forest-bright)' },
  { id: 'status-drafted', label: 'Drafted', icon: '●', color: 'var(--gold)' },
  { id: 'status-inprogress', label: 'In Progress', icon: '●', color: 'var(--slate-mid)' },
  { id: 'status-pending', label: 'Pending', icon: '●', color: 'var(--gold-light)' },
];

const SUB_NAMES: Record<string, string> = {
  'public-product': 'Product & Website',
  'public-docs': 'Documentation',
  'public-gtm': 'GTM & Sales',
  'public-support': 'Support & Community',
  'internal-arch': 'Architecture & Engineering',
  'internal-ops': 'Operations & DevOps',
  'internal-ai': 'AI & Cognition',
  'internal-org': 'Organizational',
  'strategy-vision': 'Vision & Direction',
  'strategy-market': 'Market & GTM Strategy',
  'strategy-platform': 'Platform & Technical Strategy',
};

const VIEW_META: Record<string, { title: string; desc: string }> = {
  'all': { title: 'All Documents', desc: 'Complete document governance across public, internal, and strategy' },
  'public': { title: 'Public Docs', desc: 'Customer-facing, ecosystem-facing, community-visible' },
  'public-product': { title: 'Product & Website', desc: 'Overview, website, features, pricing' },
  'public-docs': { title: 'Documentation', desc: 'API docs, guides, tutorials, release notes' },
  'public-gtm': { title: 'GTM & Sales', desc: 'Collateral, case studies, brand, demos' },
  'public-support': { title: 'Support & Community', desc: 'Security, compliance, FAQ, knowledge base' },
  'internal': { title: 'Internal Docs', desc: 'Operational, engineering, organizational knowledge' },
  'internal-arch': { title: 'Architecture & Engineering', desc: 'System architecture, memory, data models, infra' },
  'internal-ops': { title: 'Operations & DevOps', desc: 'Deployment, runbooks, monitoring, incidents' },
  'internal-ai': { title: 'AI & Cognition', desc: 'Cognitive layer, governance, drift protection' },
  'internal-org': { title: 'Organizational', desc: 'SOPs, onboarding, org structure, QA' },
  'strategy': { title: 'Strategy Docs', desc: 'Decision-making, direction-setting, competitive thinking' },
  'strategy-vision': { title: 'Vision & Direction', desc: 'Vision, thesis, philosophy, messaging' },
  'strategy-market': { title: 'Market & GTM', desc: 'Product strategy, GTM, monetization, positioning' },
  'strategy-platform': { title: 'Platform & Technical', desc: 'AI, platform, ecosystem, memory strategies' },
  'status-locked': { title: 'Locked Documents', desc: 'Finalized and approved' },
  'status-drafted': { title: 'Drafted', desc: 'Written but not finalized' },
  'status-inprogress': { title: 'In Progress', desc: 'Actively being worked on' },
  'status-pending': { title: 'Pending', desc: 'Not yet created' },
};

// ── Status & Priority Config ────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string; border: string }> = {
  locked: { label: 'LOCKED', bg: 'var(--forest-bright)', color: 'var(--paper)', border: 'var(--forest-bright)' },
  drafted: { label: 'DRAFTED', bg: 'var(--gold-pale)', color: 'var(--gold)', border: 'var(--gold)' },
  inprogress: { label: 'IN PROGRESS', bg: 'var(--slate-mid)', color: 'var(--paper)', border: 'var(--slate-mid)' },
  pending: { label: 'PENDING', bg: 'var(--gold-pale)', color: 'var(--gold)', border: 'var(--gold-light)' },
  na: { label: 'N/A', bg: 'var(--paper-deep)', color: 'var(--ink-muted)', border: 'var(--rule)' },
};

const PRIORITY_CONFIG: Record<string, { label: string; color: string }> = {
  critical: { label: 'CRITICAL', color: 'var(--red)' },
  high: { label: 'HIGH', color: 'var(--gold)' },
  medium: { label: 'MED', color: 'var(--slate-mid)' },
  low: { label: 'LOW', color: 'var(--ink-muted)' },
};

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  arch: { bg: 'var(--slate)', color: 'var(--paper)' },
  product: { bg: 'var(--forest)', color: 'var(--paper)' },
  gtm: { bg: 'var(--gold)', color: 'var(--paper)' },
  eng: { bg: 'var(--slate-mid)', color: 'var(--paper)' },
  strategy: { bg: 'var(--red)', color: 'var(--paper)' },
};

// ── Main Component ──────────────────────────────────────────────────────────

export function KnowledgeWorkbench() {
  const [activeSurface, setActiveSurface] = useState<SurfaceView>('governance');
  const [currentView, setCurrentView] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showBulkBar, setShowBulkBar] = useState(false);
  const [showAISidebar, setShowAISidebar] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Dynamic memory states
  const [memoryIndex, setMemoryIndex] = useState<any>(null);
  const [selectedBookSection, setSelectedBookSection] = useState<string | null>(null);
  const [selectedBookFile, setSelectedBookFile] = useState<string | null>(null);
  const [bookFileContent, setBookFileContent] = useState<string>('');
  const [bookViewMode, setBookViewMode] = useState<'human' | 'ai'>('human');

  useEffect(() => {
    fetch('/memory/index.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setMemoryIndex(data))
      .catch(err => console.error('Failed to load memory index:', err));
  }, []);

  const handleSelectBookFile = (section: string, filename: string) => {
    setSelectedBookFile(filename);
    setBookFileContent('Loading...');
    
    let folder = '';
    if (section === 'Decisions') folder = 'decisions';
    else if (section === 'Episodes') folder = 'conversational';
    else folder = 'org';
    
    fetch(`/memory/${folder}/${filename}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then(text => setBookFileContent(text))
      .catch(err => setBookFileContent(`Failed to load content: ${err.message}`));
  };

  // LocalStorage state
  const getDocState = useCallback((id: string) => {
    try {
      const state = JSON.parse(localStorage.getItem('iw-docs-state') || '{}');
      return state[id] || null;
    } catch { return null; }
  }, []);

  const setDocState = useCallback((id: string, data: Partial<Document>) => {
    try {
      const state = JSON.parse(localStorage.getItem('iw-docs-state') || '{}');
      state[id] = { ...(state[id] || {}), ...data };
      localStorage.setItem('iw-docs-state', JSON.stringify(state));
    } catch {}
  }, []);

  const getEffectiveDoc = useCallback((doc: Document): Document => {
    const saved = getDocState(doc.id);
    return saved ? { ...doc, ...saved } : doc;
  }, [getDocState]);

  // Filter documents
  const getFilteredDocs = useCallback(() => {
    let docs = DOCS.map(getEffectiveDoc);

    if (currentView !== 'all') {
      if (currentView.startsWith('status-')) {
        const status = currentView.replace('status-', '');
        docs = docs.filter(d => d.status === status);
      } else {
        docs = docs.filter(d => d.cat === currentView || d.sub === currentView);
      }
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      docs = docs.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.desc.toLowerCase().includes(q) ||
        d.notes.toLowerCase().includes(q) ||
        d.linked.toLowerCase().includes(q)
      );
    }

    return docs;
  }, [currentView, searchQuery, getEffectiveDoc]);

  // Get counts
  const getCounts = useCallback(() => {
    const allDocs = DOCS.map(getEffectiveDoc);
    return {
      all: allDocs.length,
      public: allDocs.filter(d => d.cat === 'public').length,
      'public-product': allDocs.filter(d => d.sub === 'public-product').length,
      'public-docs': allDocs.filter(d => d.sub === 'public-docs').length,
      'public-gtm': allDocs.filter(d => d.sub === 'public-gtm').length,
      'public-support': allDocs.filter(d => d.sub === 'public-support').length,
      internal: allDocs.filter(d => d.cat === 'internal').length,
      'internal-arch': allDocs.filter(d => d.sub === 'internal-arch').length,
      'internal-ops': allDocs.filter(d => d.sub === 'internal-ops').length,
      'internal-ai': allDocs.filter(d => d.sub === 'internal-ai').length,
      'internal-org': allDocs.filter(d => d.sub === 'internal-org').length,
      strategy: allDocs.filter(d => d.cat === 'strategy').length,
      'strategy-vision': allDocs.filter(d => d.sub === 'strategy-vision').length,
      'strategy-market': allDocs.filter(d => d.sub === 'strategy-market').length,
      'strategy-platform': allDocs.filter(d => d.sub === 'strategy-platform').length,
      locked: allDocs.filter(d => d.status === 'locked').length,
      drafted: allDocs.filter(d => d.status === 'drafted').length,
      inprogress: allDocs.filter(d => d.status === 'inprogress').length,
      pending: allDocs.filter(d => d.status === 'pending').length,
    };
  }, [getEffectiveDoc]);

  const counts = getCounts();
  const filteredDocs = getFilteredDocs();
  const meta = VIEW_META[currentView] || VIEW_META['all'];

  // Inline editing
  const startEdit = (docId: string, field: string, value: string) => {
    setEditingField(`${docId}-${field}`);
    setEditValue(value);
  };

  const saveEdit = (docId: string, field: string) => {
    setDocState(docId, { [field]: editValue });
    setEditingField(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  // Bulk selection
  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
    setShowBulkBar(next.size > 0);
  };

  const selectAll = () => {
    if (selectedIds.size === filteredDocs.length) {
      setSelectedIds(new Set());
      setShowBulkBar(false);
    } else {
      setSelectedIds(new Set(filteredDocs.map(d => d.id)));
      setShowBulkBar(true);
    }
  };

  const bulkUpdateStatus = (status: string) => {
    selectedIds.forEach(id => setDocState(id, { status: status as Document['status'] }));
    setSelectedIds(new Set());
    setShowBulkBar(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (editingField) cancelEdit();
        else if (selectedDoc) setSelectedDoc(null);
      }
      if (e.key === '/' && !editingField) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editingField, selectedDoc]);

  // Group docs if needed
  const shouldGroup = ['all', 'public', 'internal', 'strategy'].includes(currentView);
  const groupedDocs = shouldGroup
    ? filteredDocs.reduce((acc, doc) => {
        const key = doc.sub || doc.cat;
        if (!acc[key]) acc[key] = [];
        acc[key].push(doc);
        return acc;
      }, {} as Record<string, Document[]>)
    : null;

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--paper)', fontFamily: 'var(--font-sans)' }}>
      {/* Sidebar */}
      <aside style={{ width: 280, background: 'linear-gradient(180deg, var(--forest) 0%, var(--forest-mid) 100%)', color: 'var(--paper)', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--paper)', letterSpacing: -0.3 }}>IntegrateWise</h1>
          <div style={{ fontSize: 11, color: 'var(--gold)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>One Surface</div>
        </div>

        {/* Surface Navigation */}
        <div style={{ padding: '16px 12px 8px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--gold)', padding: '0 12px', marginBottom: 8 }}>
            WORKSPACES
          </div>
          {[
            { id: 'governance' as SurfaceView, label: 'Governance', icon: '📋', desc: '95 documents' },
            { id: 'intake' as SurfaceView, label: 'Intake', icon: '📥', desc: 'Folder Monitor' },
            { id: 'triage' as SurfaceView, label: 'Triage', icon: '🤖', desc: 'Notebook LLM' },
            { id: 'internal' as SurfaceView, label: 'Internal Docs', icon: '📄', desc: 'Team knowledge' },
            { id: 'public' as SurfaceView, label: 'Public Docs', icon: '🌐', desc: 'External users' },
            { id: 'operations' as SurfaceView, label: 'Operations', icon: '⚙️', desc: 'KPIs & systems' },
            { id: 'evolution' as SurfaceView, label: 'Evolution', icon: '📈', desc: 'Timeline' },
            { id: 'book-of-projects' as SurfaceView, label: 'Book of Projects', icon: '📚', desc: 'How we think & what we decided' },
          ].map(surface => (
            <button
              key={surface.id}
              onClick={() => { setActiveSurface(surface.id); setCurrentView('all'); setSelectedDoc(null); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 6,
                cursor: 'pointer', fontSize: 13, fontWeight: 500, width: '100%', textAlign: 'left',
                background: activeSurface === surface.id ? 'var(--gold)' : 'transparent',
                color: activeSurface === surface.id ? 'var(--forest)' : 'var(--paper)',
                border: 'none', transition: 'all 0.15s',
              }}
            >
              <span style={{ width: 18, textAlign: 'center', fontSize: 14 }}>{surface.icon}</span>
              <div style={{ flex: 1 }}>
                <div>{surface.label}</div>
                <div style={{ fontSize: 10, color: 'var(--gold)', marginTop: 1 }}>{surface.desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Governance Sub-navigation (only when governance is active) */}
        {activeSurface === 'governance' && (
          <nav style={{ flex: 1, padding: '8px 0', overflow: 'auto' }}>
            {SIDEBAR_SECTIONS.map(item => (
              <div key={item.id}>
                {item.section && (
                  <div style={{ padding: '16px 16px 4px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--gold)' }}>
                    {item.section}
                  </div>
                )}
                <button
                  onClick={() => { setCurrentView(item.id); setSelectedDoc(null); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 6,
                    cursor: 'pointer', fontSize: 13, fontWeight: 500, width: '100%', textAlign: 'left',
                    background: currentView === item.id ? 'var(--gold)' : 'transparent',
                    color: currentView === item.id ? 'var(--forest)' : 'var(--paper)',
                    border: 'none', transition: 'all 0.15s',
                  }}
                >
                  <span style={{ width: 18, textAlign: 'center', fontSize: 13, color: item.color || 'inherit' }}>{item.icon}</span>
                  {item.label}
                  <span style={{
                    marginLeft: 'auto', fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)',
                    background: currentView === item.id ? 'var(--forest)' : 'rgba(255,255,255,0.08)',
                    color: currentView === item.id ? 'var(--gold)' : 'var(--paper)',
                    padding: '2px 7px', borderRadius: 10, minWidth: 22, textAlign: 'center',
                  }}>
                    {counts[item.id as keyof typeof counts] || 0}
                  </span>
                </button>
              </div>
            ))}
          </nav>
        )}

        {/* Connected Surfaces */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--gold)', padding: '0 12px', marginBottom: 8 }}>
            CONNECTED
          </div>
          {CONNECTED_SURFACES.map(surface => (
            <a
              key={surface.name}
              href={surface.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 4,
                fontSize: 11, color: 'var(--paper)', textDecoration: 'none', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--gold)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--paper)'; }}
            >
              <span style={{ fontSize: 12 }}>{surface.icon}</span>
              <span style={{ flex: 1 }}>{surface.name}</span>
              <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: surface.status === 'live' ? 'var(--forest-bright)' : 'var(--gold)' }}>
                {surface.status}
              </span>
            </a>
          ))}
        </div>

        <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 11, color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>
          One Surface v1.0<br />
          <span style={{ color: 'var(--paper)' }}>All connected via MCP</span>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Topbar */}
        <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--paper)', borderBottom: '1px solid var(--rule)', padding: '16px 40px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: 'var(--forest)' }}>
              {activeSurface === 'governance' && meta.title}
              {activeSurface === 'intake' && 'Intake Queue'}
              {activeSurface === 'triage' && 'Triage Queue'}
              {activeSurface === 'internal' && 'Internal Documentation'}
              {activeSurface === 'public' && 'Public Documentation'}
              {activeSurface === 'operations' && 'Operations'}
              {activeSurface === 'evolution' && 'Evolution Timeline'}
              {activeSurface === 'book-of-projects' && 'Book of Projects'}
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>
              {activeSurface === 'governance' && meta.desc}
              {activeSurface === 'intake' && 'Files from Downloads awaiting triage and promotion'}
              {activeSurface === 'triage' && 'Notebook LLM processed content for review'}
              {activeSurface === 'internal' && 'Team knowledge — Architecture, Operations, AI, Organization'}
              {activeSurface === 'public' && 'Sanitized documentation for external users'}
              {activeSurface === 'operations' && 'KPIs, connected systems, execution status'}
              {activeSurface === 'evolution' && 'Continuity manifest and timeline'}
              {activeSurface === 'book-of-projects' && 'A permanent, human-readable record of what we decided, learned, and committed to.'}
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Book of Projects view toggle */}
            {activeSurface === 'book-of-projects' && (
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--paper-deep)', border: '1px solid var(--rule)', borderRadius: 8, padding: 3, gap: 2 }}>
                <button
                  onClick={() => { setBookViewMode('human'); setSelectedBookSection(null); }}
                  title="Human view — plain language chapters"
                  style={{
                    padding: '5px 12px', borderRadius: 6, border: 'none', fontSize: 11, fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-mono)',
                    background: bookViewMode === 'human' ? 'var(--forest)' : 'transparent',
                    color: bookViewMode === 'human' ? 'var(--paper)' : 'var(--ink-muted)',
                  }}
                >👤 Human</button>
                <button
                  onClick={() => { setBookViewMode('ai'); setSelectedBookSection(null); }}
                  title="AI view — system-level memory framing"
                  style={{
                    padding: '5px 12px', borderRadius: 6, border: 'none', fontSize: 11, fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-mono)',
                    background: bookViewMode === 'ai' ? 'var(--gold)' : 'transparent',
                    color: bookViewMode === 'ai' ? 'var(--forest)' : 'var(--ink-muted)',
                  }}
                >🤖 AI</button>
              </div>
            )}
            <button
              onClick={() => setShowAISidebar(!showAISidebar)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 8,
                background: showAISidebar ? 'var(--gold)' : 'var(--forest)',
                color: showAISidebar ? 'var(--forest)' : 'var(--paper)',
                border: 'none',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <MessageSquare style={{ width: 16, height: 16 }} />
              AI Intake
            </button>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: 'var(--ink-muted)', pointerEvents: 'none' }} />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ fontFamily: 'var(--font-sans)', fontSize: 13, padding: '8px 14px 8px 36px', border: '1px solid var(--rule)', borderRadius: 8, background: 'var(--paper)', color: 'var(--ink)', width: 280, outline: 'none' }}
              />
            </div>
          </div>
        </header>

        {/* Surface Content */}
        {activeSurface === 'governance' && (
          <>
            {/* Stats */}
            <div style={{ padding: '28px 40px 12px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { label: 'Locked', value: counts.locked, icon: '✓', bg: 'var(--forest)', color: 'var(--paper)' },
                { label: 'Drafted', value: counts.drafted, icon: '◆', bg: 'var(--gold)', color: 'var(--paper)' },
                { label: 'In Progress', value: counts.inprogress, icon: '▶', bg: 'var(--slate-mid)', color: 'var(--paper)' },
                { label: 'Pending', value: counts.pending, icon: '○', bg: 'var(--gold-pale)', color: 'var(--gold)' },
              ].map(stat => (
                <div key={stat.label} style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: '20px 22px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: stat.bg, color: stat.color, display: 'grid', placeItems: 'center', fontSize: 18, flexShrink: 0 }}>{stat.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--forest)', lineHeight: 1 }}>{stat.value}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 4 }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Documents */}
            <div style={{ flex: 1, overflow: 'auto', padding: '0 40px 60px' }}>
              {filteredDocs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--ink-muted)' }}>
                  <div style={{ fontSize: 32, marginBottom: 12, opacity: 0.5 }}>◇</div>
                  <p style={{ fontSize: 13 }}>No documents match the current view and filters.</p>
                </div>
              ) : groupedDocs ? (
                Object.entries(groupedDocs).map(([key, docs]) => (
                  <div key={key}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '32px 0 16px', paddingBottom: 12, borderBottom: '1px solid var(--rule)' }}>
                      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--forest)' }}>{SUB_NAMES[key] || key}</h2>
                      <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', background: 'var(--paper-deep)', color: 'var(--ink-muted)', padding: '3px 10px', borderRadius: 10 }}>{docs.length}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 12 }}>
                      {docs.map(doc => <DocumentCard key={doc.id} doc={doc} />)}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 12, marginTop: 16 }}>
                  {filteredDocs.map(doc => <DocumentCard key={doc.id} doc={doc} />)}
                </div>
              )}
            </div>
          </>
        )}

        {/* Intake View */}
        {activeSurface === 'intake' && (
          <div style={{ flex: 1, overflow: 'auto', padding: '28px 40px 60px' }}>
            <div style={{ background: 'var(--gold-pale)', border: '1px solid var(--gold)', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold)', marginBottom: 4 }}>📥 Intake from Downloads</div>
              <div style={{ fontSize: 12, color: 'var(--gold)' }}>These files were detected in your Downloads folder. They need triage before promotion to organisational memory.</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 12 }}>
              {INTAKE_QUEUE.map((item, i) => (
                <div key={i} style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                    <div style={{ fontSize: 20 }}>📄</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--forest)', marginBottom: 4 }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{item.reason}</div>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)', padding: '3px 10px', borderRadius: 4, background: 'var(--gold-pale)', color: 'var(--gold)', border: '1px solid var(--gold)' }}>
                      {item.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button style={{ flex: 1, padding: '8px', borderRadius: 6, background: 'var(--forest)', color: 'var(--paper)', border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Upload to Google Drive</button>
                    <button style={{ padding: '8px 12px', borderRadius: 6, background: 'transparent', color: 'var(--ink-muted)', border: '1px solid var(--rule)', fontSize: 12, cursor: 'pointer' }}>Skip</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Triage View */}
        {activeSurface === 'triage' && (
          <div style={{ flex: 1, overflow: 'auto', padding: '28px 40px 60px' }}>
            <div style={{ background: 'var(--slate)', border: '1px solid var(--slate-mid)', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--paper)', marginBottom: 4 }}>🤖 Triage Queue — Notebook LLM</div>
              <div style={{ fontSize: 12, color: 'var(--paper)' }}>Files processed by Notebook LLM. Review the AI analysis and approve/reject for publication.</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {TRIAGE_QUEUE.map((item) => (
                <div key={item.id} style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                    <div style={{ fontSize: 28 }}>📄</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--forest)', marginBottom: 4 }}>{item.fileName}</div>
                      <div style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 12 }}>{item.notebookLLMOutput.summary}</div>
                      
                      {/* Key Points */}
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--ink-muted)', marginBottom: 6 }}>Key Points</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {item.notebookLLMOutput.keyPoints.map((point, i) => (
                            <div key={i} style={{ fontSize: 12, color: 'var(--ink)', paddingLeft: 12, position: 'relative' }}>
                              <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>•</span>
                              {point}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Entities */}
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--ink-muted)', marginBottom: 6 }}>Entities</div>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {item.notebookLLMOutput.entities.map((entity, i) => (
                            <span key={i} style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: 'var(--gold-pale)', color: 'var(--gold)' }}>
                              {entity.type}: {entity.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* AI Analysis */}
                      <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--ink-muted)' }}>
                        <div>
                          <span style={{ fontWeight: 600 }}>Category:</span> {item.notebookLLMOutput.suggestedCategory}
                        </div>
                        <div>
                          <span style={{ fontWeight: 600 }}>Priority:</span> {item.notebookLLMOutput.suggestedPriority}
                        </div>
                        <div>
                          <span style={{ fontWeight: 600 }}>Confidence:</span> {Math.round(item.notebookLLMOutput.confidence * 100)}%
                        </div>
                        <div>
                          <span style={{ fontWeight: 600 }}>Sentiment:</span> {item.notebookLLMOutput.sentiment}
                        </div>
                      </div>
                    </div>

                    <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)', padding: '3px 10px', borderRadius: 4, background: item.status === 'pending_review' ? 'var(--gold-pale)' : item.status === 'approved' ? 'var(--forest-bright)' : 'var(--red)', color: item.status === 'pending_review' ? 'var(--gold)' : item.status === 'approved' ? 'var(--paper)' : 'var(--paper)', border: `1px solid ${item.status === 'pending_review' ? 'var(--gold)' : item.status === 'approved' ? 'var(--forest-bright)' : 'var(--red)'}` }}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Actions */}
                  {item.status === 'pending_review' && (
                    <div style={{ display: 'flex', gap: 8, paddingTop: 16, borderTop: '1px solid var(--rule)' }}>
                      <button style={{ flex: 1, padding: '10px', borderRadius: 6, background: 'var(--forest)', color: 'var(--paper)', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                        ✓ Approve & Publish
                      </button>
                      <button style={{ padding: '10px 16px', borderRadius: 6, background: 'transparent', color: 'var(--ink-muted)', border: '1px solid var(--rule)', fontSize: 13, cursor: 'pointer' }}>
                        Edit Category
                      </button>
                      <button style={{ padding: '10px 16px', borderRadius: 6, background: 'transparent', color: 'var(--red)', border: '1px solid var(--red)', fontSize: 13, cursor: 'pointer' }}>
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Internal Docs View */}
        {activeSurface === 'internal' && (
          <div style={{ flex: 1, overflow: 'auto', padding: '28px 40px 60px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {[
                { name: 'Architecture & Engineering', count: 7, icon: '🏗️', desc: 'System architecture, memory design, data models' },
                { name: 'Operations & DevOps', count: 7, icon: '⚙️', desc: 'Deployment, runbooks, monitoring, incidents' },
                { name: 'AI & Cognition', count: 11, icon: '🧠', desc: 'Cognitive layer, governance, drift protection' },
                { name: 'Organizational', count: 9, icon: '👥', desc: 'SOPs, onboarding, org structure, QA' },
              ].map(section => (
                <div key={section.name} style={{ background: '#ffffff', border: '1px solid #e6e0d0', borderRadius: 12, padding: '24px', cursor: 'pointer', transition: 'all 0.2s' }}
                  onClick={() => { setActiveSurface('governance'); setCurrentView(section.name.toLowerCase().replace(/[^a-z]/g, '-')); }}
                >
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{section.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#1a3a2a', marginBottom: 4 }}>{section.name}</div>
                  <div style={{ fontSize: 12, color: '#6b6556', marginBottom: 12 }}>{section.desc}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: '#b8943f' }}>{section.count} documents</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Public Docs View */}
        {activeSurface === 'public' && (
          <div style={{ flex: 1, overflow: 'auto', padding: '28px 40px 60px' }}>
            <div style={{ background: '#ddf4ff', border: '1px solid #54aeff', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0a4a9a', marginBottom: 4 }}>🌐 Public Documentation</div>
              <div style={{ fontSize: 12, color: '#0a4a9a' }}>Sanitized subset for external users. Published to integratewise-docs.</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {[
                { name: 'Product & Website', count: 4, icon: '🏠' },
                { name: 'Documentation', count: 8, icon: '📖' },
                { name: 'GTM & Sales', count: 7, icon: '📊' },
                { name: 'Support & Community', count: 10, icon: '🤝' },
              ].map(section => (
                <div key={section.name} style={{ background: '#ffffff', border: '1px solid #e6e0d0', borderRadius: 12, padding: '24px', cursor: 'pointer' }}
                  onClick={() => { setActiveSurface('governance'); setCurrentView(section.name.toLowerCase().replace(/[^a-z]/g, '-')); }}
                >
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{section.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#1a3a2a', marginBottom: 4 }}>{section.name}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: '#b8943f' }}>{section.count} documents</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Operations View */}
        {activeSurface === 'operations' && (
          <div style={{ flex: 1, overflow: 'auto', padding: '28px 40px 60px' }}>
            <div style={{ background: '#fbefff', border: '1px solid #8250df', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#5a2d82', marginBottom: 4 }}>⚙️ Operations Dashboard</div>
              <div style={{ fontSize: 12, color: '#5a2d82' }}>Connected systems, KPIs, execution status. Links to integratewise-ops.</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
              {CONNECTED_SURFACES.map(surface => (
                <a key={surface.name} href={surface.url} target="_blank" rel="noopener noreferrer"
                  style={{ background: '#ffffff', border: '1px solid #e6e0d0', borderRadius: 12, padding: '24px', textDecoration: 'none', transition: 'all 0.2s' }}
                >
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{surface.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#1a3a2a', marginBottom: 4 }}>{surface.name}</div>
                  <div style={{ fontSize: 12, color: '#6b6556', marginBottom: 12 }}>{surface.description}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: surface.status === 'live' ? '#2d7a4f' : '#b8943f' }}>
                    {surface.status} →
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Evolution View */}
        {activeSurface === 'evolution' && (
          <div style={{ flex: 1, overflow: 'auto', padding: '28px 40px 60px' }}>
            <div style={{ background: 'var(--forest-bright)', border: '1px solid var(--forest-bright)', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--paper)', marginBottom: 4 }}>📈 Evolution Timeline</div>
              <div style={{ fontSize: 12, color: 'var(--paper)' }}>Continuity manifest showing how IntegrateWise evolved over time.</div>
            </div>
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--ink-muted)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📈</div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: 'var(--forest)' }}>Evolution Timeline</div>
              <div style={{ fontSize: 13 }}>23 entries across 5 pillars. View at <a href="/evolution" style={{ color: 'var(--forest)' }}>/evolution</a></div>
            </div>
          </div>
        )}

        {/* Book of Projects View */}
        {activeSurface === 'book-of-projects' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' }}>

            {/* ── AI VIEW (original machine-centric framing) ───────────────── */}
            {bookViewMode === 'ai' && (
              <div style={{ flex: 1, overflow: 'auto', padding: '28px 40px 60px' }}>
                {/* Banner */}
                <div style={{ background: 'var(--gold-pale)', border: '1px solid var(--gold)', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold)', marginBottom: 4 }}>📚 Book of Projects — AI Memory View</div>
                  <div style={{ fontSize: 12, color: 'var(--gold)' }}>Institutional memory — decisions, commitments, learnings, episodes. Separate from Spine (operational data).</div>
                </div>

                {/* Original flat cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                  {[
                    {
                      icon: '📖',
                      title: 'Episodes',
                      desc: 'Active episodes tracking organizational decisions and events',
                      count: memoryIndex ? Object.keys(memoryIndex.conversational || {}).length : 0,
                      key: 'Work Sessions'
                    },
                    {
                      icon: '✅',
                      title: 'Decisions',
                      desc: 'Key decisions made by the organization',
                      count: memoryIndex ? Object.values(memoryIndex.decisions || {}).reduce((acc: number, d: any) => acc + (d.decision_count || 0), 0) : 0,
                      key: 'Decisions'
                    },
                    {
                      icon: '💡',
                      title: 'Learnings',
                      desc: 'Patterns and insights discovered over time',
                      count: memoryIndex ? Object.values(memoryIndex.org || {}).filter((o: any) => o.category === 'learning').length : 0,
                      key: 'Principles'
                    },
                    {
                      icon: '🤝',
                      title: 'Commitments',
                      desc: 'Promises and commitments made',
                      count: memoryIndex ? Object.values(memoryIndex.org || {}).filter((o: any) => o.category === 'commitment').length : 0,
                      key: 'Commitments'
                    },
                    {
                      icon: '📊',
                      title: 'Facts',
                      desc: 'Verified facts, doctrines and data points',
                      count: memoryIndex ? Object.values(memoryIndex.org || {}).filter((o: any) => ['doctrine', 'fact', 'insight'].includes(o.category)).length : 0,
                      key: 'Reference Facts'
                    },
                  ].map((section) => (
                    <div
                      key={section.title}
                      onClick={() => { setSelectedBookSection(section.key); setSelectedBookFile(null); setBookFileContent(''); }}
                      style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: '24px', cursor: 'pointer' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--rule)'; }}
                    >
                      <div style={{ fontSize: 28, marginBottom: 12 }}>{section.icon}</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--forest)', marginBottom: 4 }}>{section.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 12 }}>{section.desc}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--gold)' }}>{section.count} items</div>
                    </div>
                  ))}
                </div>

                {/* Original "How it works" block */}
                <div style={{ marginTop: 24, background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: '24px' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--forest)', marginBottom: 12 }}>How it works</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.7 }}>
                    <p>The <strong>Book of Projects</strong> is separate from the Spine (operational data).</p>
                    <p style={{ marginTop: 8 }}><strong>Spine</strong> = What is the state of the business right now?</p>
                    <p><strong>Book of Projects</strong> = What has the organization learned, decided, committed to?</p>
                    <p style={{ marginTop: 8 }}>Written only through Triage Bot → HITL → sole-writer path. Append-only. Versioned. Nothing deleted.</p>
                  </div>
                </div>

                {/* System metadata */}
                <div style={{ marginTop: 16, background: 'var(--paper-deep)', border: '1px solid var(--rule)', borderRadius: 8, padding: '16px 20px', display: 'flex', gap: 32 }}>
                  {[
                    { label: 'Memory source', value: '/Users/nirmal/.iw-memory' },
                    { label: 'Index', value: '/memory/index.json' },
                    { label: 'Sync target', value: 'D1 · integratewise-spine-cache' },
                    { label: 'Path', value: 'decisions/ · conversational/ · org/' },
                  ].map(m => (
                    <div key={m.label}>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--ink-ghost)', marginBottom: 4 }}>{m.label}</div>
                      <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--gold)' }}>{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── HUMAN VIEW (chapter-based, question-driven) ──────────────── */}
            {bookViewMode === 'human' && selectedBookSection === null ? (
              <div style={{ flex: 1, overflow: 'auto', padding: '28px 40px 60px' }}>
                {/* Page header */}
                <div style={{ marginBottom: 32 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: 1.5, color: 'var(--gold)', marginBottom: 8 }}>IntegrateWise · Living Record</div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--forest)', margin: 0, marginBottom: 10 }}>Book of Projects</h2>
                  <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.6, maxWidth: 560, margin: 0 }}>
                    Everything we have decided, learned, and committed to — written in plain language, preserved permanently. This is how we think, not just what we built.
                  </p>
                </div>

                {/* Chapter cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 32 }}>
                  {[
                    {
                      icon: '✍️',
                      chapter: 'Chapter I',
                      title: 'Decisions',
                      question: 'What did we decide, and why?',
                      desc: 'Every significant call we made — on product, architecture, and how we work. Written at the moment of decision.',
                      count: memoryIndex ? Object.values(memoryIndex.decisions || {}).reduce((acc: number, d: any) => acc + (d.decision_count || 0), 0) : 0,
                      unit: 'recorded decisions'
                    },
                    {
                      icon: '📅',
                      chapter: 'Chapter II',
                      title: 'Work Sessions',
                      question: 'What happened in our working sessions?',
                      desc: 'A log of key working sessions — what was discussed, what was built, what changed. The diary of how this organisation grew.',
                      count: memoryIndex ? Object.keys(memoryIndex.conversational || {}).length : 0,
                      unit: 'sessions logged'
                    },
                    {
                      icon: '💡',
                      chapter: 'Chapter III',
                      title: 'Principles',
                      question: 'What patterns did we discover?',
                      desc: 'The truths we kept rediscovering — doctrine, hard-won insight, and the principles we now operate by.',
                      count: memoryIndex ? Object.values(memoryIndex.org || {}).filter((o: any) => o.category === 'learning').length : 0,
                      unit: 'principles'
                    },
                    {
                      icon: '🤝',
                      chapter: 'Chapter IV',
                      title: 'Commitments',
                      question: 'What did we promise ourselves?',
                      desc: 'Targets we set, standards we agreed to hold, and policies we chose to enforce. Public to the whole team.',
                      count: memoryIndex ? Object.values(memoryIndex.org || {}).filter((o: any) => o.category === 'commitment').length : 0,
                      unit: 'commitments'
                    },
                    {
                      icon: '📐',
                      chapter: 'Chapter V',
                      title: 'Reference Facts',
                      question: 'What is definitively true?',
                      desc: 'Verified specifications, canonical facts, and reference doctrine. Things we do not want to debate again.',
                      count: memoryIndex ? Object.values(memoryIndex.org || {}).filter((o: any) => ['doctrine', 'fact', 'insight'].includes(o.category)).length : 0,
                      unit: 'reference entries'
                    },
                  ].map((section) => (
                    <div
                      key={section.title}
                      onClick={() => { setSelectedBookSection(section.title); setSelectedBookFile(null); setBookFileContent(''); }}
                      style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: '24px 24px 20px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--ink-ghost)', marginBottom: 12 }}>{section.chapter}</div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                        <div style={{ fontSize: 24, lineHeight: 1 }}>{section.icon}</div>
                        <div>
                          <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--forest)', fontFamily: 'var(--font-serif)', marginBottom: 2 }}>{section.title}</div>
                          <div style={{ fontSize: 12, color: 'var(--gold)', fontStyle: 'italic' }}>{section.question}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--ink-muted)', lineHeight: 1.6, marginBottom: 16 }}>{section.desc}</div>
                      <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)', color: section.count > 0 ? 'var(--forest)' : 'var(--ink-ghost)' }}>
                          {section.count > 0 ? `${section.count} ${section.unit}` : 'Nothing recorded yet'}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 600 }}>Open →</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Doctrine strip */}
                <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: '24px' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--forest)', marginBottom: 12 }}>What this is — and is not</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--gold)', marginBottom: 8 }}>This book</div>
                      <ul style={{ fontSize: 12, color: 'var(--ink-muted)', lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
                        <li>What we decided and why</li>
                        <li>What we learned and now believe</li>
                        <li>What we committed to</li>
                        <li>Append-only — nothing is deleted</li>
                        <li>Written in plain language, for humans</li>
                      </ul>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--ink-ghost)', marginBottom: 8 }}>Not this book</div>
                      <ul style={{ fontSize: 12, color: 'var(--ink-muted)', lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
                        <li>Live business state (that's the Spine)</li>
                        <li>Real-time KPIs or dashboards</li>
                        <li>Drafts or unreviewed notes</li>
                        <li>Things we haven't decided yet</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' }}>
                {/* Section Header */}
                <div style={{ padding: '20px 40px', borderBottom: '1px solid var(--rule)', display: 'flex', alignItems: 'center', gap: 16, background: 'var(--paper-deep)' }}>
                  <button
                    onClick={() => setSelectedBookSection(null)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--forest)', fontWeight: 600 }}
                  >
                    <ArrowLeft size={16} /> Back to Book
                  </button>
                  <div style={{ fontSize: 13, color: 'var(--ink-ghost)' }}>/</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--forest)', fontFamily: 'var(--font-serif)' }}>{selectedBookSection}</div>
                </div>

                {/* Split Pane */}
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                  {/* Left: Files List */}
                  <div style={{ width: 340, borderRight: '1px solid var(--rule)', overflow: 'auto', background: 'var(--paper-deep)', display: 'flex', flexDirection: 'column' }}>
                    {(() => {
                      let files: string[] = [];
                      if (selectedBookSection === 'Decisions') {
                        files = Object.keys(memoryIndex?.decisions || {});
                      } else if (selectedBookSection === 'Work Sessions') {
                        files = Object.keys(memoryIndex?.conversational || {});
                      } else if (selectedBookSection === 'Principles') {
                        files = Object.keys(memoryIndex?.org || {}).filter(fn => memoryIndex.org[fn].category === 'learning');
                      } else if (selectedBookSection === 'Commitments') {
                        files = Object.keys(memoryIndex?.org || {}).filter(fn => memoryIndex.org[fn].category === 'commitment');
                      } else if (selectedBookSection === 'Reference Facts') {
                        files = Object.keys(memoryIndex?.org || {}).filter(fn => ['doctrine', 'fact', 'insight'].includes(memoryIndex.org[fn].category));
                      }

                      if (files.length === 0) {
                        return (
                          <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--ink-muted)', fontSize: 13 }}>
                            <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
                            <div style={{ fontWeight: 600, color: 'var(--forest)', marginBottom: 4 }}>Nothing here yet</div>
                            <div style={{ fontSize: 12 }}>Entries will appear here as they are written and approved.</div>
                          </div>
                        );
                      }

                      return files.map(filename => {
                        const isSelected = selectedBookFile === filename;
                        let detailText = '';
                        let subtitleText = '';
                        
                        if (selectedBookSection === 'Decisions') {
                          const info = memoryIndex.decisions[filename];
                          detailText = `${info.decision_count} ${info.decision_count === 1 ? 'decision' : 'decisions'}`;
                          subtitleText = info.date;
                        } else if (selectedBookSection === 'Work Sessions') {
                          const info = memoryIndex.conversational[filename];
                          detailText = `${(info.size_bytes / 1024).toFixed(1)} KB`;
                          subtitleText = new Date(info.synced_at).toLocaleDateString();
                        } else {
                          const info = memoryIndex.org[filename];
                          detailText = info.category === 'learning' ? 'Principle' : info.category === 'commitment' ? 'Commitment' : 'Reference';
                          subtitleText = info.department || '';
                        }

                        return (
                          <div
                            key={filename}
                            onClick={() => handleSelectBookFile(selectedBookSection, filename)}
                            style={{
                              padding: '16px 20px',
                              borderBottom: '1px solid var(--rule)',
                              cursor: 'pointer',
                              background: isSelected ? 'var(--paper)' : 'transparent',
                              borderLeft: isSelected ? '4px solid var(--gold)' : '4px solid transparent',
                              transition: 'all 0.15s'
                            }}
                          >
                            <div style={{ fontSize: 13, fontWeight: 600, color: isSelected ? 'var(--forest)' : 'var(--ink)', marginBottom: 5, lineHeight: 1.4 }}>
                              {filename.replace(/\.(md|txt|json)$/i, '').replace(/[-_]/g, ' ')}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ink-muted)' }}>
                              <span>{subtitleText}</span>
                              <span style={{ fontWeight: 600, color: isSelected ? 'var(--gold)' : 'var(--ink-ghost)' }}>{detailText}</span>
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>

                  {/* Right: File Viewer */}
                  <div style={{ flex: 1, overflow: 'auto', padding: '40px', background: 'var(--paper)' }}>
                    {selectedBookFile ? (
                      <div className="prose prose-forest max-w-none" style={{ color: 'var(--ink)' }}>
                        <div style={{ borderBottom: '1px solid var(--rule)', paddingBottom: 20, marginBottom: 28 }}>
                          <div style={{ fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: 1.5, color: 'var(--gold)', marginBottom: 10 }}>
                            Book of Projects · {selectedBookSection}
                          </div>
                          <h2 style={{ fontSize: 24, fontFamily: 'var(--font-serif)', color: 'var(--forest)', margin: 0, marginBottom: 10, lineHeight: 1.3 }}>
                            {selectedBookFile.replace(/\.(md|txt)$/i, '').replace(/[-_]/g, ' ')}
                          </h2>
                          <div style={{ fontSize: 12, color: 'var(--ink-ghost)', fontFamily: 'var(--font-mono)' }}>
                            {selectedBookFile}
                          </div>
                        </div>
                        {bookFileContent === 'Loading...' ? (
                          <div style={{ color: 'var(--ink-muted)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', border: '2px solid var(--gold)', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
                            Reading entry…
                          </div>
                        ) : (
                          <div className="markdown-content" style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--ink)' }}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{bookFileContent}</ReactMarkdown>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-muted)', padding: '40px 0', gap: 8 }}>
                        <div style={{ fontSize: 40, marginBottom: 8 }}>📖</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--forest)', fontFamily: 'var(--font-serif)' }}>Choose an entry to read</div>
                        <div style={{ fontSize: 12, color: 'var(--ink-muted)', textAlign: 'center', maxWidth: 240 }}>Select any entry from the left to open and read its full content.</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bulk Action Bar */}
        {showBulkBar && (
          <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: '#1a3a2a', color: '#e8e0d0', padding: '12px 24px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.2)', zIndex: 100 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{selectedIds.size} selected</span>
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)' }} />
            {Object.entries(STATUS_CONFIG).filter(([k]) => k !== 'na').map(([key, config]) => (
              <button key={key} onClick={() => bulkUpdateStatus(key)} style={{ background: config.bg, color: config.color, border: `1px solid ${config.border}`, padding: '4px 12px', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>
                {config.label}
              </button>
            ))}
            <button onClick={() => { setSelectedIds(new Set()); setShowBulkBar(false); }} style={{ background: 'transparent', color: '#9b9484', border: 'none', cursor: 'pointer', fontSize: 13 }}>✕</button>
          </div>
        )}
      </main>

      {/* Detail Panel */}
      {selectedDoc && (
        <DetailPanel doc={getEffectiveDoc(selectedDoc)} onClose={() => setSelectedDoc(null)} onSave={setDocState} />
      )}
      {/* AI Sidebar */}
      <AISidebar
        isOpen={showAISidebar}
        onClose={() => setShowAISidebar(false)}
        onTriageSubmit={(content, category, priority) => {
          // Add to triage queue
          const triageItem: TriageItem = {
            id: `triage_${Date.now()}`,
            fileName: `Knowledge Input ${new Date().toLocaleTimeString()}`,
            fileLink: '',
            notebookLLMOutput: {
              summary: content.substring(0, 200),
              keyPoints: [content.substring(0, 100)],
              entities: [],
              suggestedCategory: category,
              suggestedPriority: priority,
              sentiment: 'neutral',
              confidence: 0.8,
            },
            status: 'pending_review',
          };
          TRIAGE_QUEUE.push(triageItem);
        }}
      />
    </div>
  );

  // ── Document Card ─────────────────────────────────────────────────────────

  function DocumentCard({ doc }: { doc: Document }) {
    const status = STATUS_CONFIG[doc.status] || STATUS_CONFIG.na;
    const priority = PRIORITY_CONFIG[doc.priority] || PRIORITY_CONFIG.low;
    const isSelected = selectedIds.has(doc.id);
    const isEditing = editingField === `${doc.id}-name`;

    return (
      <div
        onClick={() => setSelectedDoc(doc)}
        style={{
          background: 'var(--paper)', border: `1px solid ${isSelected ? 'var(--gold)' : 'var(--rule)'}`, borderRadius: 12,
          padding: '18px 20px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: 10,
          boxShadow: isSelected ? '0 0 0 2px var(--gold-pale)' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={e => { e.stopPropagation(); toggleSelect(doc.id); }}
            onClick={e => e.stopPropagation()}
            style={{ marginTop: 2, cursor: 'pointer' }}
          />
          {isEditing ? (
            <input
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              onBlur={() => saveEdit(doc.id, 'name')}
              onKeyDown={e => { if (e.key === 'Enter') saveEdit(doc.id, 'name'); if (e.key === 'Escape') cancelEdit(); }}
              autoFocus
              style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--forest)', border: '1px solid var(--gold)', borderRadius: 4, padding: '2px 6px', outline: 'none' }}
            />
          ) : (
            <h4
              onClick={e => { e.stopPropagation(); setSelectedDoc(doc); }}
              style={{ fontSize: 14, fontWeight: 600, color: 'var(--forest)', lineHeight: 1.35, flex: 1, cursor: 'pointer' }}
            >
              {doc.name}
            </h4>
          )}
          <span style={{
            fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-mono)', padding: '3px 10px', borderRadius: 4,
            background: status.bg, color: status.color, border: `1px solid ${status.border}`,
            textTransform: 'uppercase', letterSpacing: 0.5, whiteSpace: 'nowrap', flexShrink: 0, cursor: 'pointer',
          }}>
            {status.label}
          </span>
        </div>

        <div style={{ fontSize: 12.5, color: 'var(--ink-muted)', lineHeight: 1.55 }}>{doc.desc}</div>

        {doc.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {doc.tags.map(tag => {
              const tagColor = TAG_COLORS[tag] || { bg: 'var(--paper-deep)', color: 'var(--ink-muted)' };
              return <span key={tag} style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: tagColor.bg, color: tagColor.color, letterSpacing: 0.2 }}>{tag}</span>;
            })}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', marginTop: 'auto', paddingTop: 6, borderTop: '1px solid var(--rule)' }}>
          <span style={{ fontWeight: 600, color: priority.color }}>{priority.label}</span>
          {doc.linked && <span>→ {doc.linked}</span>}
        </div>
      </div>
    );
  }
}

// ── Detail Panel ────────────────────────────────────────────────────────────

function DetailPanel({ doc, onClose, onSave }: { doc: Document; onClose: () => void; onSave: (id: string, data: Partial<Document>) => void }) {
  const [status, setStatus] = useState(doc.status);
  const [priority, setPriority] = useState(doc.priority);
  const [notes, setNotes] = useState(doc.notes);
  const [linked, setLinked] = useState(doc.linked);
  const [activeTab, setActiveTab] = useState<'content' | 'settings'>('content');

  const content = DOC_CONTENT[doc.id];

  const save = () => {
    onSave(doc.id, { status: status as Document['status'], priority: priority as Document['priority'], notes, linked });
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(15,34,24,0.5)', backdropFilter: 'blur(4px)' }} />
      <div style={{ position: 'relative', width: 620, height: '100vh', background: '#ffffff', boxShadow: '-4px 0 20px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '24px 32px 16px', borderBottom: '1px solid #e6e0d0', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 20, fontWeight: 700, color: '#1a3a2a', marginBottom: 4 }}>{doc.name}</h3>
              <div style={{ fontSize: 12, color: '#6b6556' }}>{doc.desc}</div>
            </div>
            <button onClick={onClose} style={{ background: 'transparent', border: '1px solid #d4cdb8', borderRadius: 6, width: 28, height: 28, display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#6b6556' }}>✕</button>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            {doc.tags.map(tag => {
              const tagColor = TAG_COLORS[tag] || { bg: '#ece7db', color: '#6b6556' };
              return <span key={tag} style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: tagColor.bg, color: tagColor.color }}>{tag}</span>;
            })}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e6e0d0', flexShrink: 0 }}>
          <button
            onClick={() => setActiveTab('content')}
            style={{
              flex: 1, padding: '10px', textAlign: 'center', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              background: 'transparent', border: 'none',
              color: activeTab === 'content' ? '#1a3a2a' : '#6b6556',
              borderBottom: activeTab === 'content' ? '2px solid #b8943f' : '2px solid transparent',
            }}
          >
            Content
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              flex: 1, padding: '10px', textAlign: 'center', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              background: 'transparent', border: 'none',
              color: activeTab === 'settings' ? '#1a3a2a' : '#6b6556',
              borderBottom: activeTab === 'settings' ? '2px solid #b8943f' : '2px solid transparent',
            }}
          >
            Settings
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: 32 }}>
          {activeTab === 'content' ? (
            content ? (
              <div style={{ fontSize: 13.5, lineHeight: 1.75, color: '#1a1a14', fontFamily: "'DM Sans', sans-serif" }}>
                {content.split('\n').map((line, i) => {
                  if (line.startsWith('# ')) return <h1 key={i} style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 26, fontWeight: 700, color: '#1a3a2a', margin: '0 0 6px', letterSpacing: -0.4 }}>{line.slice(2)}</h1>;
                  if (line.startsWith('## ')) return <h2 key={i} style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 20, fontWeight: 700, color: '#1a3a2a', margin: '28px 0 8px', letterSpacing: -0.2, borderBottom: '1px solid #e6e0d0', paddingBottom: 6 }}>{line.slice(3)}</h2>;
                  if (line.startsWith('### ')) return <h3 key={i} style={{ fontSize: 15, fontWeight: 700, color: '#1a3a2a', margin: '20px 0 6px' }}>{line.slice(4)}</h3>;
                  if (line.startsWith('> ')) return <blockquote key={i} style={{ borderLeft: '3px solid #b8943f', background: '#f5ecd4', padding: '12px 16px', margin: '16px 0', borderRadius: '0 8px 8px 0', fontStyle: 'italic', color: '#5c4813' }}>{line.slice(2)}</blockquote>;
                  if (line.startsWith('**') && line.endsWith('**')) return <p key={i} style={{ margin: '0 0 12px', fontWeight: 600, color: '#1a1a14' }}>{line.slice(2, -2)}</p>;
                  if (line.startsWith('- ')) return <div key={i} style={{ paddingLeft: 18, margin: '0 0 4px', position: 'relative' }}><span style={{ position: 'absolute', left: 0 }}>•</span>{line.slice(2)}</div>;
                  if (line.trim() === '') return <div key={i} style={{ height: 12 }} />;
                  return <p key={i} style={{ margin: '0 0 12px' }}>{line}</p>;
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#9b9484' }}>
                <div style={{ fontSize: 24, marginBottom: 8, opacity: 0.5 }}>◇</div>
                <p style={{ fontSize: 13 }}>No content available for this document yet.</p>
                <p style={{ fontSize: 12, marginTop: 4 }}>Content will be added from the memory pipeline.</p>
              </div>
            )
          ) : (
            <>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: '#6b6556', marginBottom: 6 }}>Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)} style={{ width: '100%', fontFamily: "'DM Sans', sans-serif", fontSize: 13, padding: '10px 14px', border: '1px solid #d4cdb8', borderRadius: 8, background: '#faf8f3', color: '#1a1a14', outline: 'none' }}>
                {Object.entries(STATUS_CONFIG).filter(([k]) => k !== 'na').map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>

              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: '#6b6556', marginBottom: 6, marginTop: 14 }}>Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', fontFamily: "'DM Sans', sans-serif", fontSize: 13, padding: '10px 14px', border: '1px solid #d4cdb8', borderRadius: 8, background: '#faf8f3', color: '#1a1a14', outline: 'none' }}>
                {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>

              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: '#6b6556', marginBottom: 6, marginTop: 14 }}>Notes</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} style={{ width: '100%', fontFamily: "'DM Sans', sans-serif", fontSize: 13, padding: '10px 14px', border: '1px solid #d4cdb8', borderRadius: 8, background: '#faf8f3', color: '#1a1a14', outline: 'none', resize: 'vertical', minHeight: 80, lineHeight: 1.55 }} />

              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, color: '#6b6556', marginBottom: 6, marginTop: 14 }}>Linked Documents</label>
              <input value={linked} onChange={e => setLinked(e.target.value)} placeholder="e.g. Architecture Doc v3.0" style={{ width: '100%', fontFamily: "'DM Sans', sans-serif", fontSize: 13, padding: '10px 14px', border: '1px solid #d4cdb8', borderRadius: 8, background: '#faf8f3', color: '#1a1a14', outline: 'none' }} />

              <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
                <button onClick={onClose} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, padding: '9px 20px', borderRadius: 8, background: 'transparent', color: '#6b6556', border: '1px solid #d4cdb8', cursor: 'pointer' }}>Cancel</button>
                <button onClick={save} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, padding: '9px 20px', borderRadius: 8, background: '#1a3a2a', color: '#e8e0d0', border: '1px solid #1a3a2a', cursor: 'pointer' }}>Save</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
