/**
 * Meta-Knowledge: Synthesized Understanding of IntegrateWise
 *
 * This document captures the ESSENCE of what IntegrateWise is,
 * synthesized from reading all canonical source documents.
 * It exists so future AI sessions retrieve this context instead of starting from zero.
 */

import type { KnowledgeObject } from "../domain/knowledge";

export const metaKnowledge: KnowledgeObject = {
  id: "know-integratewise-essence",
  type: "doctrine",
  domain: "governance",
  title: "What IntegrateWise Is — Synthesized Essence",
  content: `# What IntegrateWise Is

IntegrateWise is NOT a product, a tool, a CRM overlay, an AI wrapper, a dashboard, a workflow builder, or a knowledge base.

IntegrateWise is a **continuity-native organizational operating system**.

It is a **way of operating** — not a destination, but a continuous practice of preserving operational memory so that work does not restart from zero every day.

---

## The Core Insight

**Organizations are streams of events, not collections of documents.**

The modern professional spends 30–40% of their time reconstructing context that should persist. This is the **Human API Problem**: humans forced to become the integration layer between their own tools.

The solution is not another tool. It is a **continuity substrate** — a persistent operational memory layer that sits beneath all tools, ingests from all sources, normalizes all signals, and maintains temporal, contextual, and governance continuity across the entire operational surface.

---

## The Foundational Principle

> **Memory is the asset. Cognition is rented. Humans govern execution.**

- **Truth is Owned, Not Generated**: AI proposes. Humans canonize.
- **Cognition is Rented, Memory is Owned**: Switch from OpenAI to Anthropic to local models — operational memory stays intact.
- **Context Compounds**: Every action enriches the memory that informs the next action. This is the Loop.

---

## What The Spine Actually Is

The Adaptive Spine is NOT a database. It is NOT CouchDB. It is NOT Postgres. It is NOT a single technology.

The Spine is an **adaptive continuity orchestration layer** — a living operational intelligence fabric that:
- ingests data, conversations, workflows, and signals from every connected system
- normalizes them into a single, governed, continuously updated operational layer
- continuously absorbs new operational patterns
- restructures context, changes relationship topology, evolves schemas
- reclassifies continuity and reshapes projections over time

The Spine stores continuity relationships, knowledge evolution, operational lineage, entity context, and adaptive projections. The actual storage substrates differ depending on the nature of continuity.

---

## The Two-Part Architecture: Spine + Surface

### The Spine (Postgres/Supabase) — Canonical Entity Layer
The Spine is where entities scattered across CRM, billing, support, communication, and all connected tools get **normalized into one canonical layer**.
- **Eliminates**: Data scattering — no more jumping between 15 tools to find customer info
- **Stores**: Contacts, companies, deals, tickets, invoices, activities, campaigns — all normalized
- **Nature**: Stable, governed, canonical truth. The single source of entity reality.

### The Surface (Cloudflare + CouchDB + Twin) — Human Continuity Layer
**Data alone is not enough.** Even with all entities in Postgres, humans still context-switch because raw entity data is incomplete without operational narrative.

The Surface gives humans:
- **Conversational continuity** — what was discussed, decided, reasoned (CouchDB)
- **Operational narrative** — the story layered on top of entity data
- **Governance context** — approvals, decisions, audit trails
- **AI reasoning companion** — the Twin that thinks alongside the human
- **Adaptive projections** — the right view of the right data at the right time

**The Surface eliminates the REMAINING context switching** — the incomplete narratives, missing operational context, and cognitive load of piecing together meaning from raw data.

### The Three Memory Substrates

| Layer | Technology | Nature | Stores |
|---|---|---|---|
| Conversational Continuity | CouchDB | Dynamic, adaptive, session-oriented | AI sessions, reasoning traces, transcripts, temporary continuity |
| Canonical Organizational Truth | Postgres/Supabase | Stable, governed, canonical | **Entities** (contacts, deals, tickets, invoices) + **Doctrine** (strategies, governance, architecture) |
| Attached Knowledge Artifacts | R2 | Media substrate | PDFs, images, presentations, diagrams, videos, datasets |

### The Critical Pipeline

\`\`\`
Raw AI cognition / Integration events
→ CouchDB (conversational buffer) + Pipeline (entity normalization)
→ Triage + Classification
→ Promotion / Governance
→ Postgres (canonical entity truth + knowledge canon)
→ Surface Projection (workbench / spine-org interface with narrative + reasoning)
\`\`\`

**Before**: Spine layer only = data normalization (still felt incomplete)
**Now**: Complete product = Spine (canonical data) + Surface (human continuity interface)

---

## The Five-Layer Stack

| Layer | Name | Responsibility |
|---|---|---|
| L5 | Surfaces | Where humans interact — Workbenches, APIs |
| L4 | Cognitive Shell | Where AI reasons — The Twin, reasoning chains |
| L3 | Orchestration | Where intent becomes governed action — Hermes, approval queues |
| L2 | Continuity Substrate | Where operational memory lives — Adaptive Spine, Entity 360 |
| L1 | Infrastructure | Where computation runs — Cloudflare Workers, Supabase, CouchDB, R2 |

---

## The Four Hard Walls

1. **No Cross-Tenant Memory**: Strict isolation by tenant
2. **AI Never Pollutes Canonical Data**: Twin outputs are proposals, not truth
3. **Private ↛ Shared**: User memory does not automatically become org truth
4. **Nothing Executes Without Approval**: Every action surfaces as an Approval Card

---

## What IntegrateWise Is NOT

| What It Is | What It Is Not |
|---|---|
| A continuity maintenance system | A productivity app or task manager |
| An operational memory substrate | A CRM, ERP, or system of record |
| A governance layer for AI execution | An AI chatbot or assistant |
| A compounding intelligence engine | A data warehouse or analytics platform |
| A continuity-native operating layer | An integration platform or iPaaS |
| A living, continuously updating system | A one-time data migration or setup tool |

---

## The Mission Now

The architecture is no longer speculative. The Spine exists. The integrations exist. The continuity doctrine exists.

The mission now is to:
1. Validate the complete live runtime
2. Consolidate everything into one canonical stack
3. Restore the Workbench as the operational closure layer
4. Operationalize IntegrateWise internally as **Customer Zero**
5. Evolve the product directly from lived operational continuity

The Workbench must once again become the adaptive operational surface where humans, AI, continuity, workflows, governance, and organizational knowledge converge into one living system.

---

## The Surface Identity

The deployed continuity interface is:
- **Domain**: spine-org.integratewise.ai
- **Host**: Cloudflare Pages (edge CDN)
- **Role**: Organizational Continuity Interface — NOT a brand site
- **Views**: Personal View + Work View (Twin, Governance, Org Memory)

---

## Key Architectural Decisions (Current)

- **TypeScript-Only**: Wall 5 — all execution logic in TypeScript, no Python for intellectual work
- **Cloudflare-Native**: Edge compute, D1, KV, R2, Queues, Durable Objects, Access
- **Zero Python in Production**: Only mechanical, non-intellectual tasks permitted
- **Supabase = Zero Agent Access**: Agents call Workers; Workers abstract storage
- **CouchDB = Conversational Continuity Only**: Not canonical knowledge
- **Infisical = Secret Governance**: Runtime secrets managed via Universal Auth
- **n8n Removed**: Replaced by Cloudflare Workflows and explicit TypeScript orchestration

---

## Source Documents

This synthesis was derived from:
- Memory Governance in AI.md (23K lines, ChatGPT continuity architecture)
- IntegrateWise_Company_OS.md (2.3K lines, canonical company OS)
- INTEGRATEWISE_ARCHITECTURE_TOOLS_AND_STACK.md v3.2
- All runtime implementation work through May 2026`,
  confidence: "certain",
  version: 1,
  lineage: [],
  references: ["ref-memory-governance", "ref-company-os"],
  tags: ["meta", "essence", "synthesis", "doctrine", "continuity", "spine"],
  authorId: "ai:kimi",
  entityIds: [],
  createdAt: Date.now(),
  updatedAt: Date.now(),
  promotedAt: Date.now(),
};
