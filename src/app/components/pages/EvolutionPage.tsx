import React, { useState, useEffect } from 'react';

interface DayEntry {
  date: string;
  label: string;
  what: string;
  decisions: string[];
  quotes?: string[];
  locked?: string[];
}

interface ManifestPillar {
  label: string;
  description: string;
  canonical: string;
  evolution: string[];
}

interface ManifestEntry {
  id: string;
  date: string;
  label: string;
  pillar: string;
  type: string;
}

interface ManifestPending {
  item: string;
  copies: number;
  action: string;
}

interface Manifest {
  pillars: Record<string, ManifestPillar>;
  entries: ManifestEntry[];
  pending: ManifestPending[];
}

const entries: DayEntry[] = [
  {
    date: "Before the Code",
    label: "The Origin — Suffered, Visualised, Built",
    what: `IntegrateWise was not ideated. It was suffered.\n\nThe founder's path to IntegrateWise ran through integration development first — developer, then team lead, then architect. He built the systems that customer-facing teams depend on. Then he crossed to the other side and became a CSM. Six months in, at age 35, he watched an $8M account go red because the renewal signal was split across Salesforce, Zendesk, and a Slack thread that no one had connected. Three systems. Zero shared memory. He saw it because he had spent years building exactly the kind of integrations that should have prevented it. The architect who became the CSM understood both the cause and the consequence. That is the origin. Not a theory. A personal failure that should not have been possible.\n\nThe solution was visualised before it was built. First in the mind. Then in Excel — modelling account health, renewal signals, cross-system correlation manually, proving the value before writing a line of code. Then templated. Then coded. Simple at first. Mature over time.\n\nWhat exists today — integratewise-live, 237,000 lines, an 8-stage normalisation pipeline, ten operational contexts, four domain shells, the GoalAlignmentBar, the Entity 360, the approval gate — is the fourth rebuild of a system that has been deleted, lost, or destroyed three times before reaching this state.\n\nThe four repos:\n1. integratewise-os — the first canonical build. Lost.\n2. integratewise-ai-workspace Phase 2 — rebuilt stronger. Lost.\n3. integratewise-ai-workspace on Bitbucket Phase 3 — the entire Bitbucket organisation was deleted. Gone with it: 45 days of the most complete version built to date — a fully working UI with 28 connected systems via live APIs, brainstorming sessions (the concept that became knowledge base, then conversational memory), a view layer for any user or org, goals and metrics tracked against org-level KPIs, tool ROI tracking showing business return per software investment. The proof of concept. Lost.\n4. integratewise-live — the current canonical repo. Alive.\n\nEach time the code was lost, the architecture survived — because it lived in the founder's mind, not in any repository. Each rebuild came back stronger. Not because the loss was acceptable, but because the understanding was deeper. The time and money spent never came back. The thinking compounded.\n\nThe December 2025 system (integratewise-ops, the surviving artefact) had: a live Command Center pulling from 16 Firestore collections simultaneously, Google Calendar integration, Google Drive search, AI insights on demand, a 9-category knowledge base, a Founder console with strategic decisions, blockers, product pipeline, hiring tracker, live ACV and churn risk KPIs, HermesMemoryPanel reading Coda via MCP, IntegrationHealth monitoring. 28 systems connected. All working. Built in 3 days in December 2025.\n\nThe January to mid-February 2026 period — 45 days after that December — is what was lost in the Bitbucket deletion. No export. No backup. No record anywhere except in the founder's memory.\n\nPost-December, the salary stopped. Until December 2025 there was income — a salary, funds to spend on development without counting the cost. From January 2026 onwards every tool decision became a financial decision. Free tiers. Freemium products. Whatever had a freebie. That constraint forced a pattern of hopping between tools to avoid costs — and tool hopping at the infrastructure level produces fragments. Each fragment was functional in isolation. None of them connected into something usable. The architecture that was clear in the mind kept hitting the ceiling of what free tiers would support. That fragmentation is the honest reason January to May felt slower than December. It was not a lack of vision or capability. It was the financial reality of a solo founder who stopped drawing a salary to build something he believed in — and had to build around every constraint that created.\n\nThis entry exists so that record is no longer only in one person's head.\n\nSolo founder. No team. No investor. No external validation before the first customer. Built it anyway. Lost it. Built it again. Lost it again. Built it again. This is the fourth version. What you are reading is the record that should have existed from the beginning.`,
    decisions: [
      "The product was proved in Excel before it was coded — value-first, then engineering.",
      "The architecture survived four repo deletions because it was never only in the code.",
      "December 2025: 28 systems connected in 3 days. Brainstorming sessions, view layer, org goals, tool KPIs — all working.",
      "January–February 2026: 45 days of evolution lost in Bitbucket org deletion. No backup. Rebuilt.",
      "Each rebuild produced a stronger architecture. The cost — time and money — was not recoverable.",
      "The current canonical system is integratewise-live. Fourth rebuild. Enterprise-grade.",
      "The proof point that started everything: $8M account, three systems, zero shared Memory.",
    ],
    quotes: [
      "Every time it got vanished, I was so devastated but then bounced back with stronger architecture only. But the amount of time invested and money that was spent never come back — that's the saddest thing.",
      "I have only suffered the pain, visualised the solution, built it in small scale in Excel and got the value, then templated and then coded simple way — now it's a complete mature system, equivalent to an enterprise system.",
      "My mind and memory stays.",
    ],
    locked: [
      "Solo founder build — no team, no investor, no external validation.",
      "Four rebuilds. Three losses. One surviving canonical repo.",
      "December 2025: 28 connected systems, working UI, knowledge base, org KPIs, tool ROI — all live.",
      "The concept of conversational memory existed and was working in December 2025 before it had a name.",
    ],
  },
  {
    date: "May 8, 2026",
    label: "The Vault Scan — What Existed",
    what: "The first session with Hermes began with a full scan of the IntegrateWise vault — Google Drive, iCloud, local Github. 6,017 files, 4.91 GB. The intent was to surface what had been built, documented, and decided before this period. What emerged was a complete body of locked work — doctrine, vocabulary, architecture, sales materials — all aligned to a single document date: May 6, 2026. The second half of the session went deeper into the product codebase (integratewise-live), reading the full Workspace Live UI — Sidebar, TopBar, SpineClient, IntelligenceDrawer, CommandPalette, GoalAlignmentBar, DomainShells. The architecture was real and complete.",
    decisions: [
      "Vocabulary Lock v1.1 canonical — four terms: Memory, Spine, Twin, Connectors.",
      "Master Operating Architecture v1.3 locked — Cloudflare Orchestrates, CouchDB Persists, Coda Projects.",
      "CouchDB operational memory substrate confirmed — 11 application databases, awaiting n8n wiring.",
      "n8n demoted from primary orchestration to transitional/bootstrap role.",
      "Supabase Auth added as canonical identity layer.",
      "Pitch deck, one-pager, battle cards, demo script, sales emails — all May 6, vocabulary v1.1 aligned.",
      "docs.integratewise.ai found 4 weeks stale — pre-v1.1 vocabulary across 108 files.",
      "integratewise-live codebase read in full — Workspace Live with 10 switchable CTX contexts, 4 Domain Deep Dive shells (Account Success, Personal, RevOps, SalesOps), GoalAlignmentBar on every module.",
      "HARD RULE recorded: Zero Python in any IntegrateWise repo. TypeScript only. No exceptions.",
      "integratewise-live CI/CD: OpenClaw multi-model triage — Kimi (code review) + Claude (architecture) + Human approval. Four triage levels L0–L3.",
    ],
    quotes: [
      "Stop being the Human API. — Pitch deck tagline, May 6",
      "Memory is the asset. Cognition is rented. — Launch blog post, May 6",
      "CouchDB owns operational truth. Cloudflare accelerates, secures, routes, retrieves, and orchestrates around that truth. — Cloudflare Architecture v1.0",
      "Every metric must serve either the product company OR the client company. If it serves neither, it is just a number. — Integration OS Master Strategy",
    ],
    locked: [
      "The Four: Memory (owned) · Spine (backbone) · Twin (rented cognition) · Connectors (integrations)",
      "Doctrine: Cloudflare Orchestrates · CouchDB Persists · Coda Projects · MCP Carries Context · AI Cognizes",
      "Product UI: Next.js · Tailwind · shadcn/ui · Framer Motion · dark graphite · #FFB22C accent",
      "Billing: Razorpay (India primary) · Stripe (future/global)",
      "Origin proof point: $8M account saved — three systems, zero shared Memory",
    ],
  },
  {
    date: "May 9–10, 2026",
    label: "Repo Consolidation Decision",
    what: "A short session captured a critical architectural decision about the website repos. Three repos existed at the time — integratewise-loveable-marketing, integratewise-nexify, and a third. The decision was made to consolidate: rename integratewise-loveable-marketing to integratewise-website, set up CI/CD for automatic Firebase deploy on push, run a content sprint (blog, docs, changelog), and archive the other two repos. DNS for integratewise.ai to be pointed to Firebase Hosting.",
    decisions: [
      "Rename integratewise-loveable-marketing → integratewise-website.",
      "Set up CI/CD for automatic Firebase deploy on push to main.",
      "Archive nexify-app and the third repo after visual element extraction.",
      "Point integratewise.ai DNS to Firebase Hosting.",
    ],
    quotes: [],
    locked: [],
  },
  {
    date: "May 11, 2026",
    label: "Infrastructure Day — Workers, Secondary Mac, WebUI Models",
    what: "A full infrastructure deployment day. All Cloudflare Workers from the integratewise-live monorepo were deployed in parallel — the first time the full edge layer was live end-to-end. Simultaneously, a second Mac was being configured as a dedicated compute node: responsible for heavy cron jobs, background automation, the Hermes runner, n8n Docker, and git sync. Open WebUI was already running with an initial set of models and needed the LiteLLM proxy layer wired in to serve the full model roster. This was the day Nirmal asked the first identity question: 'Hermes or Twin?' — a question about what role the AI system should play in the organisation.",
    decisions: [
      "All Cloudflare Workers from integratewise-live deployed — the edge layer is live.",
      "Secondary Mac designated as the dedicated ops compute node — runs cron jobs, Hermes, n8n, and git sync. Primary Mac is the development and orchestration machine.",
      "Cloudflare API token permissions locked: Workers Scripts Edit + Account Workers Edit + Secrets Store Edit are all required. A token missing any one of these will fail silently at deploy time.",
      "WebUI model roster expanded via LiteLLM proxy — the proxy handles all model routing so WebUI does not need per-model configuration.",
      "Hermes venv is managed on primary and rsync'd to secondary — the canonical install lives on primary, secondary is a mirror.",
      "Supabase continuity migration queued — the schema extension for Hermes session persistence was ready but not yet applied.",
    ],
    quotes: [
      "Hermes or Twin? — Nirmal, May 11. The first identity question.",
    ],
    locked: [
      "Secondary Mac role: heavy cron jobs, Hermes runner, n8n Docker, git sync node. It does not run product builds or deployments — those stay on primary.",
      "Cloudflare token must include Workers Scripts Edit, Account Workers Edit, and Secrets Store Edit. Three permissions, all required.",
    ],
  },
  {
    date: "May 12–13, 2026",
    label: "Org Memory Infrastructure — The Founding Architecture Statement",
    what: "The most important architectural statement of this period was made on these two days. Nirmal defined, verbatim, the order in which IntegrateWise must be built: infrastructure first, endpoints open to the world, triage via webhooks — and then any tool can plug in at any time without rebuilding the foundation. This is not a technical preference. It is the operating model: memory is the centre, everything else attaches to it. The session also resolved the AI routing architecture: Hermes is the orchestrator that decides which model handles which task. Workers execute but do not decide. One provider key routes all model calls. The product UI architecture was also being refined — HTML and React separation in the Kimi Agent Deployment was reviewed for confusion points.",
    decisions: [
      "Org memory infrastructure is built first — the public endpoint and triage webhook must exist before any tool integration is added. This is the canonical build order.",
      "Any tool — built by the operator, by Hermes, or by an external system — can attach to the triage webhook at any time. The architecture does not require rebuilding to add a new source.",
      "Cognitive routing locked as doctrine: Hermes decides the model per task type. Classification jobs use the cheapest capable model. Synthesis uses mid-tier. Reasoning and judgment use the most capable. Content generation has its own route. Workers receive a task type, not a model choice.",
      "A single AI provider handles all model calls across all Workers — no per-Worker model configuration, no multiple provider keys. Provider abstraction prevents lock-in.",
      "Three-Mac topology formalised: primary for development and orchestration, secondary for heavy ops, a third node for Tailscale-connected automation.",
      "Claude Sonnet 4.6 confirmed as the Hermes orchestrator model — reasoning quality over speed for the orchestration layer.",
    ],
    quotes: [
      "I feel the org memory should be created first, or org memory should be made externally, or it should be made accessible with the endpoints. The endpoints should be accessible to the rest of the world, and the triage should be made possible with the webhook. Maybe the infrastructure should be set very clearly, and that is what is the initial task I feel. Then what we can do is add any number of tools. Any tool base can be added at any point in time, at any time. You can directly add it, the operator can directly add it, and can go on. — Nirmal",
      "When you are performing the operations of design, you should speak up. You should explicitly say 'spine' as an organisational memory or a data centre or a data store, or you can say it as a unified intelligence layer built across multiple tools. If you say 'spine' generally, it will mean biological spine, so you will have to avoid that particular piece. Nowhere are we going to use Python, and that is again I am making very clear. When we run workflows in the web UI, I shouldn't see any Python codes. — Nirmal",
    ],
    locked: [
      "The Adaptive Spine (the unified intelligence layer built across tools) must always be referred to with its qualifier. 'Spine' alone is ambiguous. In all written and spoken contexts: 'Adaptive Spine', 'data spine', or 'unified intelligence layer'.",
      "No Python in any IntegrateWise system — not in scripts, automations, integrations, Workers, runners, or WebUI workflows. TypeScript is the only language. This applies to AI-generated code as well.",
      "Cognitive routing doctrine: Hermes decides the model, Workers execute. Workers never choose a model. The decision matrix lives with the orchestrator.",
    ],
  },
  {
    date: "May 14–15, 2026",
    label: "Ops System Live — Memory API, Daily Briefing, MCP Coda",
    what: "The operational infrastructure reached confirmed live status for the first time. The memory API was responding. The daily briefing was delivering. The MCP layer was connected to Coda. A critical deployment pitfall was identified and documented: a legacy environment variable in the secrets file was silently overriding the Cloudflare authentication session, causing all deployment commands to fail with an invalid token error even when the session itself was valid. The fix is operational knowledge, not a one-time fix — it must be applied every time. The iw-memory-triage cron was corrected to write to both its destinations: the Coda projection layer and the Spine memory API. Writing to only one breaks the architecture — Coda shows operators what is happening, the memory API is what the system reasons over.",
    decisions: [
      "Memory API confirmed live — health check and memory endpoint both returning successfully.",
      "Cloudflare deployment pitfall documented as a permanent operational rule: the legacy API token environment variable in secrets.env overrides the OAuth session. It must be unset before running any deployment command. This is not optional and must be part of any deployment runbook.",
      "iw-memory-triage writes to two destinations: the Coda projection layer for operator visibility, and the Spine memory API as the canonical store. Both are required. Writing to only Coda means the system cannot reason over new memory. Writing to only the API means operators cannot see what is happening.",
      "Daily briefing delivery confirmed and operational.",
      "MCP Coda connection confirmed — the AI system can now read and write Coda documents through the MCP layer. This closes the loop between the AI operator and the operational projection layer.",
      "DNS record for the gateway subdomain queued as a manual action — requires Cloudflare dashboard, not automatable via the CLI in this configuration.",
    ],
    quotes: [],
    locked: [
      "Before any Cloudflare deployment: unset the legacy API token environment variable from secrets.env. The OAuth session is the correct authentication method. The env variable overrides it silently.",
      "iw-memory-triage must write to both destinations on every run: Coda for operator visibility, Spine memory API for system reasoning. One without the other is a broken state.",
    ],
  },
  {
    date: "May 25, 2026",
    label: "The Articulation Day — The Complete System Stated for the First Time",
    what: `This was not the invention day. It was the articulation day.\n\nThe four founding pieces of IntegrateWise were built in August 2025: Loader. Normalizer. Spine. Trait Detection and Resource Type Resolution. They existed before Hermes. Before the ops stack. Before the Memory repo. Before December. They are the reason everything else was built — not features on top of a platform, but the axioms the platform is built on.\n\nOn May 25 2026 — nine months later — these four pieces were named, connected to each other, and connected to everything built on top of them. The islands became one system. The complete architecture was stated in a single conversation for the first time.\n\nTwo founding pains were identified as the real origin. Pain 1: tool fragmentation — every tool was an island, data lived in HubSpot or Jira or Notion separately, and the human was the integration layer, manually carrying context between six tools every morning. Pain 2: AI conversations vanishing — every insight produced in ChatGPT or Claude disappeared the moment the tab closed. The thinking did not accumulate. The organisation never learned.\n\nThe four founding pieces answer both pains directly. The Loader intakes from any tool. The Normalizer — an eight-stage cognitive pipeline — reasons over raw data and produces MCP tool calls as output, not transformed records. The Spine holds the canonical single truth for every entity across every connected tool. Trait Detection and Resource Type Resolution identify what objects ARE by their properties — not by what each tool calls them — and neutralise any connector so that a HubSpot Contact and a Salesforce Lead resolve to the same Person entity in the Spine.\n\nThe deeper insight that emerged: every plugin, every skill, every Python connector that the industry built in response to LLM blindness made the problem worse. Each gave the LLM a keyhole where there should have been a window. The LLM was never incapable. It was blindfolded by architecture. IntegrateWise removes the blindfold — by normalising everything to a single canonical truth before the LLM ever sees it, and delivering that truth via MCP as full context not fragmented fragments.\n\nThe MCP insight was stated completely: IntegrateWise was built for the world MCP was designed to create. The connector layer is a temporary bridge between the present (tools on REST APIs, partial MCP adoption) and the future Anthropic designed for. As tools adopt MCP natively, connectors shrink. IntegrateWise becomes more elegant over time. Every other integration platform gets more complex as they add more connectors. IntegrateWise gets cleaner as the ecosystem catches up to the protocol it already runs on internally.\n\nThe complete product end-to-end was mapped: 19 remaining backend items, 12 frontend items, 5 infrastructure items, 8 policy documents. Four weeks to full connection. The UI strategy was confirmed: one shell, three rooms (Twin Workbench, Ops and Governance, Knowledge Base), a cognitive overlay layer, and entity focus via right-click — not tabs, not navigation, not feature discovery. The system comes to the user. Features surface when needed.\n\nAll founding doctrine and evolved architecture were written to integratewise-memory as permanent record. 19 files. ~180 KB of full document bodies. The architecture is locked. The connections are pending.`,
    decisions: [
      "Founding doctrine locked as immutable axioms — origin August 2025. Not subject to revision: Loader Doctrine, Normalizer Doctrine, Spine Doctrine, Trait + Resource Type Doctrine.",
      "Evolved architecture decisions recorded with May 2026 dates: MCP as internal protocol, CF-first writes, Supabase fortress, Schema AI ownership of all DB formats, CouchDB removed, n8n to Cloud Run, workflow split rule (<2s/stateless = CF), API policy framework, resilience contract.",
      "The Normalizer is a membrane, not a gateway. External dirty data crosses once, is normalised, and flows through MCP directly forever after. Internal clean data never passes through the Normalizer.",
      "Trait Detection identifies objects by nature not label. 18 core traits. 7 canonical resource types. Connector neutralisation makes any tool a source of canonical IW resource types, regardless of what it calls its objects.",
      "Plugins and skills and Python connectors made LLMs blind. IntegrateWise removes the blindfold. Normalization to single canonical truth is the act of restoring sight to the LLM.",
      "The connector layer is temporary scaffolding. As MCP adoption grows the scaffolding drops away. The clean MCP-native architecture underneath is what was always there since August 2025.",
      "UI: one shell, three rooms, cognitive overlay, entity focus. Zero navigation. Zero context switching. The system comes to the user.",
      "19 documents written to integratewise-memory: 5 founding doctrine files (00-Founding-Architecture/), 6 evolved architecture specs (01-Engineering/), 8 policy documents (01-Engineering/00-Policy-Documents/).",
    ],
    quotes: [
      "These four did not evolve later. In fact these four are the core from August. — Nirmal, May 25",
      "The tools did not make the LLM powerful. The tools made the LLM blind. — Articulation Day insight",
      "Normalisation is not a technical step in a data pipeline. Normalisation is the act of restoring sight to the LLM. — Articulation Day insight",
      "IntegrateWise is already living in the future MCP was designed to create. The connector layer is the bridge backward to the present. — Articulation Day insight",
      "The architecture I described may be exactly what happens in practice, probably without anyone realising it. We are already indirectly using the right approach. — Nirmal, May 25",
    ],
    locked: [
      "FOUNDING AXIOMS (August 2025, immutable): Loader — universal intake membrane. Normalizer — eight-stage cognitive pipeline producing MCP tool calls. Spine — single canonical truth for every entity across all tools. Trait Detection + Resource Type Resolution — object identity by nature not label.",
      "The two founding pains: (1) Tool fragmentation — human was the integration layer. (2) AI conversations vanishing — thinking did not accumulate.",
      "The Normalizer membrane rule: external dirty data crosses once, clean forever. Internal data flows MCP directly. Normalisation cost paid once per entity. Compounding begins immediately.",
      "MCP is the protocol. Single canonical truth is the insight. IntegrateWise arrived at the same architecture from two different directions — the data problem and the protocol specification — confirming the architecture is not a choice but the answer.",
      "Architecture locked. Build sequence confirmed. Four weeks to full connection.",
    ],
  },
];

const pill = (text: string, color: string) => (
  <span
    key={text}
    style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: '999px',
      fontSize: '11px',
      fontFamily: 'var(--font-mono)',
      background: color,
      color: 'var(--paper)',
      marginRight: 6,
      marginBottom: 4,
      letterSpacing: '0.03em',
    }}
  >
    {text}
  </span>
);

const PILLAR_COLORS: Record<string, string> = {
  "one-surface": "var(--forest-bright)",
  "memory": "var(--gold)",
  "operating-environment": "var(--slate-mid)",
  "governance": "var(--red)",
  "continuity": "var(--forest)",
};

export function EvolutionPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [activePillar, setActivePillar] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/continuity-manifest.json')
      .then(r => r.json())
      .then(setManifest)
      .catch(() => {});
  }, []);

  const filteredEntries = activePillar
    ? entries.filter(e => manifest?.entries.find(me => me.label === e.label)?.pillar === activePillar)
    : entries;

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <p className="iw-label" style={{ marginBottom: 8 }}>Book of Records</p>
        <h1
          className="iw-doctrine"
          style={{ fontSize: '2rem', lineHeight: 1.2, marginBottom: 16 }}
        >
          The Evolution of IntegrateWise
        </h1>
        <p
          className="iw-body"
          style={{ color: 'var(--ink-muted)', maxWidth: 600, lineHeight: 1.7 }}
        >
          A chronological record of how IntegrateWise evolved — drawn from every Hermes session,
          every conversation, every decision that was made.
          Written as it happened. Permanent.
        </p>
        <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {pill("May 2025 – ongoing", "var(--forest)")}
          {pill(`${entries.length} records`, "var(--ink-muted)")}
          {pill("Source: continuity-manifest.json", "var(--gold)")}
        </div>

        {/* Pillar filters */}
        {manifest && (
          <div style={{ marginTop: 24 }}>
            <p className="iw-mono-label" style={{ marginBottom: 10, fontSize: 10 }}>
              Filter by pillar
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button
                onClick={() => setActivePillar(null)}
                style={{
                  padding: '6px 14px', borderRadius: 20, border: '1px solid var(--rule)',
                  background: !activePillar ? 'var(--forest)' : 'transparent',
                  color: !activePillar ? 'var(--paper)' : 'var(--ink-muted)',
                  fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-mono)',
                  transition: 'all 0.15s',
                }}
              >
                All
              </button>
              {Object.entries(manifest.pillars).map(([key, p]) => (
                <button
                  key={key}
                  onClick={() => setActivePillar(activePillar === key ? null : key)}
                  style={{
                    padding: '6px 14px', borderRadius: 20, border: '1px solid var(--rule)',
                    background: activePillar === key ? PILLAR_COLORS[key] : 'transparent',
                    color: activePillar === key ? 'var(--paper)' : 'var(--ink-muted)',
                    fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-mono)',
                    transition: 'all 0.15s',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative' }}>
        {/* Vertical line */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 0,
            bottom: 0,
            width: 2,
            background: 'var(--rule)',
          }}
        />

        {filteredEntries.map((entry, i) => {
          const me = manifest?.entries.find(e => e.label === entry.label);
          const pColor = me ? (PILLAR_COLORS[me.pillar] || 'var(--forest)') : 'var(--forest)';
          return (
          <div key={i} style={{ position: 'relative', paddingLeft: 56, marginBottom: 32 }}>
            {/* Dot */}
            <div
              style={{
                position: 'absolute',
                left: 12,
                top: 20,
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: open === i ? (me ? PILLAR_COLORS[me.pillar] || 'var(--forest)' : 'var(--forest)') : 'var(--paper-warm)',
                border: `2px solid ${me ? PILLAR_COLORS[me.pillar] || 'var(--forest)' : 'var(--forest)'}`,
                transition: 'background 0.2s',
              }}
            />

            {/* Card */}
            <div
              style={{
                background: 'var(--paper-warm)',
                border: '1px solid var(--rule)',
                borderRadius: 12,
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {/* Header row */}
              <div
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <div>
                  <p
                    className="iw-mono-label"
                    style={{ color: 'var(--gold)', marginBottom: 4, fontSize: 11 }}
                  >
                    {entry.date}
                  </p>
                  <h2
                    className="iw-doctrine"
                    style={{ fontSize: '1rem', lineHeight: 1.3 }}
                  >
                    {entry.label}
                  </h2>
                  {me && (
                    <span
                      style={{
                        display: 'inline-block', marginTop: 6,
                        padding: '2px 8px', borderRadius: 999, fontSize: 10,
                        fontFamily: 'var(--font-mono)',
                        background: PILLAR_COLORS[me.pillar] || 'var(--ink-muted)',
                        color: 'var(--paper)',
                      }}
                    >
                      {manifest?.pillars[me.pillar]?.label || me.pillar}
                    </span>
                  )}
                </div>
                <span
                  style={{
                    fontSize: 18,
                    color: 'var(--ink-muted)',
                    transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                    flexShrink: 0,
                  }}
                >
                  ↓
                </span>
              </div>

              {/* Expanded content */}
              {open === i && (
                <div
                  style={{
                    borderTop: '1px solid var(--rule)',
                    padding: '20px 20px 24px',
                  }}
                >
                  {/* What happened */}
                  <p
                    className="iw-body"
                    style={{
                      color: 'var(--ink)',
                      lineHeight: 1.75,
                      marginBottom: 24,
                    }}
                  >
                    {entry.what}
                  </p>

                  {/* Quotes */}
                  {entry.quotes && entry.quotes.length > 0 && (
                    <div style={{ marginBottom: 24 }}>
                      <p className="iw-label" style={{ marginBottom: 12, fontSize: 11 }}>
                        From the record
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {entry.quotes.map((q, qi) => (
                          <div
                            key={qi}
                            style={{
                              padding: '12px 16px',
                              borderLeft: '3px solid var(--gold)',
                              background: 'var(--paper)',
                              borderRadius: '0 8px 8px 0',
                            }}
                          >
                            <p
                              className="iw-body"
                              style={{
                                color: 'var(--ink)',
                                fontStyle: 'italic',
                                lineHeight: 1.6,
                                fontSize: '0.9rem',
                              }}
                            >
                              "{q}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Decisions */}
                  <div style={{ marginBottom: entry.locked ? 24 : 0 }}>
                    <p className="iw-label" style={{ marginBottom: 12, fontSize: 11 }}>
                      Decisions made
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {entry.decisions.map((d, di) => (
                        <div
                          key={di}
                          style={{
                            display: 'flex',
                            gap: 10,
                            padding: '10px 14px',
                            background: 'var(--paper)',
                            borderRadius: 8,
                            border: '1px solid var(--rule-light)',
                          }}
                        >
                          <span style={{ color: 'var(--forest)', flexShrink: 0, marginTop: 1 }}>
                            ✓
                          </span>
                          <p
                            className="iw-body"
                            style={{ color: 'var(--ink)', lineHeight: 1.55, fontSize: '0.875rem' }}
                          >
                            {d}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Locked doctrine */}
                  {entry.locked && entry.locked.length > 0 && (
                    <div>
                      <p className="iw-label" style={{ marginBottom: 12, fontSize: 11 }}>
                        Locked as doctrine
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {entry.locked.map((l, li) => (
                          <div
                            key={li}
                            style={{
                              display: 'flex',
                              gap: 10,
                              padding: '10px 14px',
                              background: 'color-mix(in srgb, var(--forest) 8%, var(--paper))',
                              borderRadius: 8,
                              border: '1px solid color-mix(in srgb, var(--forest) 20%, transparent)',
                            }}
                          >
                            <span style={{ color: 'var(--forest)', flexShrink: 0, marginTop: 1, fontSize: 12 }}>
                              ⬡
                            </span>
                            <p
                              className="iw-body"
                              style={{ color: 'var(--ink)', lineHeight: 1.55, fontSize: '0.875rem' }}
                            >
                              {l}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      </div>

      {/* Pending items */}
      {manifest && manifest.pending.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <p className="iw-label" style={{ marginBottom: 16, fontSize: 11 }}>
            Pending ingestion — {manifest.pending.length} items
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {manifest.pending.map((p, i) => (
              <div
                key={i}
                style={{
                  padding: '14px 18px',
                  background: 'var(--paper-warm)',
                  border: '1px dashed var(--gold)',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                }}
              >
                <span style={{ color: 'var(--gold)', fontSize: 14, flexShrink: 0, marginTop: 1 }}>○</span>
                <div>
                  <p className="iw-body" style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                    {p.item}
                  </p>
                  <p className="iw-body" style={{ color: 'var(--ink-muted)', fontSize: '0.8rem', marginTop: 2 }}>
                    {p.action}
                  </p>
                  {p.copies > 1 && (
                    <span
                      style={{
                        display: 'inline-block', marginTop: 6,
                        padding: '2px 8px', borderRadius: 999, fontSize: 10,
                        fontFamily: 'var(--font-mono)',
                        background: 'var(--gold-pale)', color: 'var(--gold)',
                      }}
                    >
                      {p.copies} copies — dedup needed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          marginTop: 48,
          paddingTop: 24,
          borderTop: '1px solid var(--rule)',
        }}
      >
        <p className="iw-mono-label" style={{ color: 'var(--ink-muted)', fontSize: 11 }}>
          Source: continuity-manifest.json · Hermes CLI sessions · merged_files.txt
        </p>
        <p className="iw-body" style={{ color: 'var(--ink-muted)', marginTop: 4, fontSize: '0.8rem' }}>
          This is a living record managed by continuity-manifest.json. Entries track evolution
          across the five pillars. Pending items await ingestion into the memory repo.
        </p>
      </div>
    </div>
  );
}
