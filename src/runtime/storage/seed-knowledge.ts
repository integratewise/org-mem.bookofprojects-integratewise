/**
 * Canonical Knowledge Seed
 *
 * Synthesized from current source documents:
 * - Memory Governance in AI.md (23K lines, ChatGPT continuity architecture)
 * - IntegrateWise_Company_OS.md (2.3K lines, canonical company OS)
 * - BHIVE office space research (operational planning)
 *
 * These are NOT truncated copies. They are structured KnowledgeObjects
 * with synthesized content, proper tagging, and source references.
 */

import type { KnowledgeObject } from "../domain/knowledge";
import type { Reference } from "../domain/references";

export const seedReferences: Reference[] = [
  {
    id: "ref-memory-governance",
    type: "document",
    title: "Memory Governance in AI — Continuity Architecture",
    source: "Memory Governance in AI.md",
    checksum: "a5aef0fbd7890856",
    capturedAt: Date.now(),
    metadata: {
      origin: "ChatGPT continuity-system conversation",
      dateRange: "2026-05-17",
      lines: 23244,
    },
  },
  {
    id: "ref-company-os",
    type: "document",
    title: "The IntegrateWise Operating System",
    source: "IntegrateWise_Company_OS.md",
    checksum: "35285a05d839c0e7",
    capturedAt: Date.now(),
    metadata: {
      origin: "Canonical company doctrine",
      dateRange: "2026-05",
      lines: 2356,
    },
  },
  {
    id: "ref-bhive-research",
    type: "document",
    title: "Office Space Research: Bangalore HSR Layout",
    source: "BHIVE Premium HSR Sector 6.md",
    checksum: "n/a",
    capturedAt: Date.now(),
    metadata: {
      origin: "Perplexity search",
      date: "2026-05-08",
      purpose: "Operational workspace planning",
    },
  },
];

export const seedKnowledge: KnowledgeObject[] = [
  // ─── DOCTRINE ───
  {
    id: "know-continuity-primitive",
    type: "doctrine",
    domain: "governance",
    title: "Continuity as Core Primitive",
    content: `IntegrateWise optimizes for **continuity** — the property of an operational system wherein context, memory, and governance persist and compound across time, tools, and people.

Continuity is not a feature. It is a **primitive** — a fundamental property that must be designed into the architecture from the ground up, not retrofitted onto existing systems. Like security or scalability, continuity cannot be added later without structural compromise.

## Three Principles of Operational Memory

1. **Truth is Owned, Not Generated**
   The organization's canonical operational truth belongs to the organization, not to any AI model. AI can propose, suggest, draft, and reason. But only humans can canonize truth. This is the HITL doctrine.

2. **Cognition is Rented, Memory is Owned**
   The intelligence that reasons over operational data is fungible. Organizations switch models and providers regularly. The memory those models reason over must remain constant and provider-independent.

3. **Context Compounds**
   Every action taken within the system should enrich the memory that informs the next action. This is the Loop: the bidirectional cycle where actions feed back into memory, and memory improves future actions.

## Seven Non-Negotiable Principles

1. Truth Before Automation
2. Context Before Recommendations
3. Evidence Before Action
4. Approval Before Mutation
5. Memory Compounds Over Time
6. AI Remains Subordinate to Continuity
7. Canonical Truth Outranks Generated Output`,
    confidence: "certain",
    version: 1,
    lineage: [],
    references: ["ref-company-os"],
    tags: ["doctrine", "continuity", "principles", "HITL"],
    authorId: "human:founder",
    entityIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    promotedAt: Date.now(),
  },

  {
    id: "know-human-api-problem",
    type: "summary",
    domain: "product",
    title: "The Human API Problem",
    content: `The modern professional begins each day with a ritual of reconstruction. Before any productive work can occur, they must become a human API — manually querying a dozen disconnected systems, copying context between tabs, reconstructing the state of the world from fragments scattered across CRMs, billing platforms, support tickets, email threads, chat messages, project management tools, spreadsheets, and AI chat sessions that forget everything from yesterday.

This is not a productivity problem. It is a **continuity problem**.

## Six Categories of Disconnection

| Category | Symptom | Cost |
|---|---|---|
| Tool Fragmentation | Data scattered across 8–15+ SaaS tools | Reconstruction time, duplication errors |
| Temporal Fragmentation | Each day starts from zero; session history lost | Repeated explanations, forgotten decisions |
| Conversational Fragmentation | Context trapped in chat threads, meeting notes, emails | Action items lost, follow-ups missed |
| Workflow Fragmentation | Processes span tools without continuity | Handoff errors, approval gaps, dropped balls |
| Intelligence Fragmentation | AI tools operate without organizational context | Generic outputs, missed insights, low trust |
| Governance Fragmentation | Decisions made without audit trail or lineage | Unreversible changes, compliance risk, blame diffusion |

Teams spend **30–40% of their working hours** reconstructing context that should persist.`,
    confidence: "probable",
    version: 1,
    lineage: [],
    references: ["ref-company-os"],
    tags: ["product", "human-api", "fragmentation", "problem-statement"],
    authorId: "human:founder",
    entityIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    promotedAt: Date.now(),
  },

  // ─── ARCHITECTURE ───
  {
    id: "know-five-layer-stack",
    type: "doctrine",
    domain: "engineering",
    title: "The Five-Layer Architecture Stack",
    content: `The IntegrateWise architecture is organized into five conceptual layers, each with a single, non-overlapping responsibility.

| Layer | Name | Responsibility | Key Components |
|-------|------|---------------|----------------|
| **L5** | **Surfaces** | Where humans and external systems interact | Adaptive Workbenches, MCP connectors, APIs |
| **L4** | **Cognitive Shell** | Where AI reasoning occurs | The Twin, reasoning chains, dialectic synthesis |
| **L3** | **Orchestration** | Where intent becomes governed action | Hermes, approval queues, session management |
| **L2** | **Continuity Substrate** | Where operational memory lives | Adaptive Spine, D1, Entity 360, signals |
| **L1** | **Infrastructure** | Where computation and storage run | Cloudflare Workers, Supabase, CouchDB, R2 |

The directional flow between layers is strictly governed. Surfaces read from and write to the Spine (L2) through the Orchestration layer (L3). The Cognitive Shell (L4) reasons over Spine data but **never writes directly to canonical memory** — all Twin outputs route through Hermes and the approval queue.`,
    confidence: "certain",
    version: 1,
    lineage: [],
    references: ["ref-company-os"],
    tags: ["architecture", "layers", "engineering", "spine"],
    authorId: "human:founder",
    entityIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    promotedAt: Date.now(),
  },

  {
    id: "know-four-hard-walls",
    type: "doctrine",
    domain: "governance",
    title: "The Four Hard Walls",
    content: `The architectural integrity of the system depends on four immutable boundaries:

**Wall 1: Spine ↛ Spine (No Cross-Tenant Memory)**
Operational memory is strictly isolated by tenant. No entity in one organization's Spine can access, reference, or infer data from another organization's Spine.

**Wall 2: Spine ↛ Twin Output (AI Never Pollutes Canonical Data)**
The Twin's reasoning, inferences, and operational insights never write directly to the canonical truth layer. All Twin outputs are **proposals** — drafts that route through the approval queue for human review before any mutation to organizational memory.

**Wall 3: Private ↛ Shared (User Memory vs. Org Memory)**
Individual users have private memory spaces that do not automatically become organizational truth. Promotion from User Memory to Work Memory to Org Memory requires explicit approval and governance gating.

**Wall 4: Twin ↛ Action (Nothing Executes Without Approval)**
No AI-generated action executes without explicit human approval. Every proposed action surfaces as an **Approval Card** in the Governance Workbench.`,
    confidence: "certain",
    version: 1,
    lineage: [],
    references: ["ref-company-os"],
    tags: ["governance", "hard-walls", "security", "architecture"],
    authorId: "human:founder",
    entityIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    promotedAt: Date.now(),
  },

  {
    id: "know-typescript-only",
    type: "decision",
    domain: "engineering",
    title: "TypeScript-Only Doctrine (Wall 5)",
    content: `All execution logic is written in TypeScript. No Python. No Ruby. No Go. No polyglot microservices where logic hides in language boundaries.

This is **Hard Rule 5** — a constitutional constraint alongside the Four Hard Walls.

Python scripts in cron jobs, Jupyter notebooks, and ad-hoc automation scripts represent **invisible execution** — logic that runs without the governance, observability, and review discipline that the IntegrateWise architecture requires.

## Exception: Dumb Mechanical Tasks Only

Python is permitted for purely mechanical, non-intellectual tasks:
- Merging CSV files, reformatting JSON, batch-renaming files
- Simple data transformation scripts (one-off, reviewed)
- Mechanical test data generation
- Log parsing and aggregation for debugging

**Intellectual work stays in natural language documentation and TypeScript code.**`,
    confidence: "certain",
    version: 1,
    lineage: [],
    references: ["ref-company-os"],
    tags: ["engineering", "typescript", "python-ban", "architecture"],
    authorId: "human:founder",
    entityIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    promotedAt: Date.now(),
  },

  {
    id: "know-spine-8-stage",
    type: "doctrine",
    domain: "engineering",
    title: "Adaptive Spine: 8-Stage Pipeline",
    content: `Every piece of data that enters the Spine passes through an 8-stage mandatory pipeline:

| Stage | Function | What Happens |
|-------|----------|-------------|
| **1. Ingest** | Webhook or API event arrives | Raw payload captured from source system |
| **2. Parse** | Payload validated against schema | Malformed events routed to dead-letter queue |
| **3. Extract** | Entities identified | People, organizations, deals, campaigns surfaced |
| **4. Normalize** | Values converted to canonical form | Field mapping, type coercion, standardization |
| **5. Deduplicate** | Checked against existing memory | Redundant events folded, conflicts flagged |
| **6. Link** | Relationships resolved | Entity connections, parent-child, temporal chains |
| **7. Score** | Signals detected and tagged | Urgency, risk, opportunity, churn indicators |
| **8. Write** | Committed to Digital Memory | Audit record, lineage, timestamp, actor |

Raw activity becomes interpreted signal. Signal becomes linked memory. Memory becomes durable truth — scoped, permissioned, and traceable.`,
    confidence: "certain",
    version: 1,
    lineage: [],
    references: ["ref-company-os"],
    tags: ["spine", "pipeline", "engineering", "data-flow"],
    authorId: "human:founder",
    entityIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    promotedAt: Date.now(),
  },

  // ─── MEMORY GOVERNANCE ───
  {
    id: "know-triage-gatekeeper",
    type: "doctrine",
    domain: "governance",
    title: "Triage-Governed Memory Gatekeeper",
    content: `The very first step is **not writing memory**. It is establishing the Triage-Governed Memory Gatekeeper.

Before a single agent is allowed to persist continuity into the shared memory layer, the system must decide:
- what is signal,
- what is noise,
- what is durable,
- what is temporary reasoning,
- what is operational doctrine,
- what is hallucination,
- and what deserves continuity permanence.

## The Pipeline

\`\`\`
Ingest
→ Triage
→ Extract
→ Normalize
→ Validate
→ Sanity
→ Identity Merge
→ Persist
\`\`\`

> AI memory cannot behave like chat history. It must behave like governed organizational continuity.`,
    confidence: "certain",
    version: 1,
    lineage: [],
    references: ["ref-memory-governance"],
    tags: ["triage", "memory", "governance", "gatekeeper"],
    authorId: "human:founder",
    entityIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    promotedAt: Date.now(),
  },

  {
    id: "know-event-continuity",
    type: "doctrine",
    domain: "engineering",
    title: "Continuous Event Continuity System",
    content: `The canonical primitive is no longer chat, transcript, note, or memory blob. The canonical primitive becomes **Event**.

Everything becomes an event stream. Not conversation history — **continuity-producing operational events**.

## Event Types

| Event Type | Purpose |
|---|---|
| cognition.event | AI reasoning |
| entity.event | customer/project mutation |
| governance.event | approvals/rejections |
| workflow.event | automation execution |
| communication.event | messages/emails/chats |
| continuity.event | long-term memory |
| system.event | deployments/errors/runtime |
| decision.event | durable organizational decisions |

## Triage Determines

**Ephemeral Event**: Useful temporarily. Not continuity-worthy. (intermediate AI reasoning, failed draft)

**Durable Event**: Should persist into continuity graph. (customer escalation, deployment decision, approved governance action)

Continuity becomes reconstructable.`,
    confidence: "probable",
    version: 1,
    lineage: [],
    references: ["ref-memory-governance"],
    tags: ["events", "continuity", "architecture", "triage"],
    authorId: "human:founder",
    entityIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    promotedAt: Date.now(),
  },

  {
    id: "know-three-layers",
    type: "doctrine",
    domain: "engineering",
    title: "The Spine + Surface Architecture",
    content: `The complete product has TWO parts: the Spine (data normalization) and the Surface (human continuity interface).

## The Spine (Postgres/Supabase) — Canonical Entity Layer
The Spine is where entities scattered across CRM, billing, support, and all connected tools get normalized into one canonical layer.
- **Eliminates**: Data scattering — no more jumping between tools to find customer info
- **Stores**: Contacts, companies, deals, tickets, invoices, activities — all normalized from integrations
- **Also stores**: Doctrine, strategies, governance, architecture, audit trails
- **Nature**: Stable, governed, canonical truth. The single source of reality.

## The Surface (Cloudflare + CouchDB + Twin) — Human Continuity Layer
**Data alone is not enough.** Even with all entities in Postgres, humans still context-switch because raw entity data is incomplete without operational narrative.

The Surface gives humans:
- **Conversational continuity** — what was discussed, decided, reasoned (CouchDB)
- **Operational narrative** — the story layered on top of entity data
- **Governance context** — approvals, decisions, audit trails
- **AI reasoning companion** — the Twin that thinks alongside the human
- **Adaptive projections** — the right view at the right time

**The Surface eliminates the REMAINING context switching** — incomplete narratives, missing operational context, and the cognitive load of piecing together meaning from raw data.

## The Three Memory Substrates

| Layer | Technology | Stores |
|---|---|---|
| Conversational Continuity | CouchDB | AI sessions, transcripts, temporary reasoning — RAW cognition BEFORE governance |
| Canonical Organizational Truth | Postgres/Supabase | Entities from all tools + doctrine + governance + audit |
| Attached Knowledge Artifacts | R2 | PDFs, images, presentations, videos, datasets |

## The Critical Pipeline

\`\`\`
Raw AI cognition / Integration events
→ CouchDB (conversational buffer) + Pipeline (entity normalization)
→ Triage + Classification
→ Promotion / Governance
→ Postgres (canonical entity truth + knowledge canon)
→ Surface Projection (workbench / spine-org interface with narrative + reasoning)
\`\`\`

**Before**: Spine only = data normalization (still felt incomplete)
**Now**: Complete product = Spine (canonical data) + Surface (human continuity interface)`,
    confidence: "certain",
    version: 1,
    lineage: [],
    references: ["ref-memory-governance", "ref-company-os"],
    tags: ["storage", "couchdb", "postgres", "r2", "architecture"],
    authorId: "human:founder",
    entityIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    promotedAt: Date.now(),
  },

  {
    id: "know-knowledge-promotion",
    type: "doctrine",
    domain: "governance",
    title: "Knowledge Promotion & Triage Outcomes",
    content: `The system must continuously decide: "Should this remain conversational continuity, or become canonical organizational knowledge?"

That is the bridge between ephemeral cognition and durable truth.

## Triage Outcomes

| Outcome | Meaning |
|---|---|
| retain_ephemeral | keep only in Couch continuity |
| summarize | compress into continuity abstraction |
| promote_to_knowledge | update canonical docs/books |
| attach_artifact | persist media/object |
| update_doctrine | mutate organizational canon |
| generate_projection | create view-layer synthesis |
| archive | retain historically only |

This is MUCH more powerful than simple approve/reject.

## The Real Missing Layer

Not storage. Not ingestion. Not transcripts.

The real missing layer is **Knowledge Synthesis + Projection** — the system must continuously answer: "What should become part of the living canon?"

That is where triage, consolidation, summarization, promotion, hierarchy placement, entity linking, and projection rendering all converge.`,
    confidence: "probable",
    version: 1,
    lineage: [],
    references: ["ref-memory-governance"],
    tags: ["triage", "promotion", "governance", "knowledge"],
    authorId: "human:founder",
    entityIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    promotedAt: Date.now(),
  },

  {
    id: "know-projection-views",
    type: "doctrine",
    domain: "product",
    title: "Projection-Based Knowledge Views",
    content: `The knowledge cannot remain as folders, files, docs, or random markdown. It needs Projection-Based Knowledge Views.

The system dynamically composes:
- the current state of IntegrateWise,
- the current operational doctrine,
- the current architecture,
- the current strategy,
- the current continuity state.

Not static docs. Living organizational embodiment.

## What This Means for the Workbench

The Brand Documentation was only the preface. Now the system must continuously synthesize:
- real sessions,
- real decisions,
- architectural evolution,
- operational doctrine,
- deployment lineage,
- governance history,
- strategic mutations

into **living organizational books**.

This is extremely different from static docs, exported markdown, or wiki pages. You are essentially building **Continuously Evolving Organizational Literature**.`,
    confidence: "probable",
    version: 1,
    lineage: [],
    references: ["ref-memory-governance"],
    tags: ["projection", "views", "workbench", "product", "books"],
    authorId: "human:founder",
    entityIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    promotedAt: Date.now(),
  },

  {
    id: "know-adaptive-spine",
    type: "doctrine",
    domain: "engineering",
    title: "The Spine Is A Living Adaptive Layer",
    content: `The Spine should not become rigid around one event doctrine. The core principle is:

**The Spine adapts continuously to operational reality.**

Not: operations adapting to fixed architecture.
But: architecture adapting to continuity emergence.

The Spine continuously:
- absorbs new operational patterns,
- restructures context,
- changes relationship topology,
- evolves schemas,
- reclassifies continuity,
- and reshapes projections over time.

## The Real Primitive Is Not "Event"

The real primitive is **Adaptive Continuity Mutation**.

Sometimes that mutation appears as:
- an event,
- a transcript,
- a decision,
- a workflow,
- a memory,
- a governance action,
- a topology shift,
- or an operational state transition.

The system should not force all reality into one shape. It should continuously reinterpret operational reality.

## The Triage Layer Is More Important Than The Storage Layer

Because the system must continuously decide: "What is becoming operationally important now?"

Not: "What schema did we define six months ago?"`,
    confidence: "certain",
    version: 1,
    lineage: [],
    references: ["ref-memory-governance"],
    tags: ["spine", "adaptive", "mutation", "architecture"],
    authorId: "human:founder",
    entityIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    promotedAt: Date.now(),
  },

  // ─── OPERATIONS ───
  {
    id: "know-office-bangalore",
    type: "summary",
    domain: "operations",
    title: "Office Space: Bangalore HSR Layout Research",
    content: `Research conducted for IntegrateWise office space in Bangalore.

## Options Evaluated

**BHIVE Premium HSR Sector 6**
- Address: L-148, 5th Main Road, Sector 6, HSR Layout
- 10-minute walk to Central Silk Board Metro Station
- Polished, premium, managed-office feel
- Close to ORR / Silk Board junction

**BHIVE Honeykomb HSR 19th Main (Sector 3)**
- Premium BHIVE setup in the heart of 19th Main ecosystem
- Strong café/startup street vibe
- More walkable, denser mix of early-stage startups

**Incubex HSR7 + other Sector 7 spaces**
- Budget-friendly but modern
- Startup-ish, mixed teams
- Southern HSR, away from main junction

## Recommendation

For IntegrateWise: something like **BHIVE Honeykomb (Sector 3)** or an **Incubex-type space in Sector 7** will feel much closer to the "true HSR" startup vibe than the Silk Board-side centres.

Trade-off: walkable from ORR/bus/metro vs. being in the middle of the café + startup street ecosystem.`,
    confidence: "speculative",
    version: 1,
    lineage: [],
    references: ["ref-bhive-research"],
    tags: ["office", "bangalore", "operations", "workspace"],
    authorId: "human:founder",
    entityIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    promotedAt: Date.now(),
  },

  {
    id: "know-customer-zero",
    type: "doctrine",
    domain: "operations",
    title: "Customer Zero Principle",
    content: `IntegrateWise operates as its own first customer. The company's internal workflows, decisions, and knowledge management all run on the same architecture offered to external customers.

Nothing is theoretical. Every workbench is operationally validated before it reaches a paying user.

## Product vs Ops Separation

| Dimension | Product | Operations |
|-----------|---------|------------|
| What | What gets sold to customers | How the company runs itself |
| Surfaces | Three Workbenches + Platform | Hermes, Telegram, Cron, Sentinel |
| Memory | Org Memory + Conversational Memory | Work Memory + Session KBs |
| Truth | Spine (Cloudflare Pipeline) | Same Spine, ops writes internal-only |
| Customer-facing | Yes | No |

Operations runs ON the product: the company's own sales, marketing, delivery, and governance all operate through the same architecture offered to customers.`,
    confidence: "certain",
    version: 1,
    lineage: [],
    references: ["ref-company-os"],
    tags: ["customer-zero", "operations", "doctrine"],
    authorId: "human:founder",
    entityIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    promotedAt: Date.now(),
  },
];
