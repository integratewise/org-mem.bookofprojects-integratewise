# IntegrateWise — Organizational Continuity Interface

> **Canonical Domain:** `spine-org.integratewise.ai`
> **Runtime Role:** The adaptive operational continuity interface over the IntegrateWise Spine.

This is NOT a marketing site, documentation layer, or static enterprise platform.

This is the **organizational continuity and cognition surface** — the live projection layer for:

- Operational memory
- Continuity views
- Adaptive workbenches
- Twin surfaces
- Governance surfaces
- Organizational knowledge retrieval

---

## What This Surface Is

The `spine-org` interface is the **continuity access layer** — where humans interact with the Adaptive Spine, govern AI execution, and navigate organizational knowledge as a living system.

### Personal View
- Personal workspace
- Continuity memory
- Conversational base
- StackEdit-like knowledge capture

### Work View
- Department/role workbench
- Twin Workbench (OpenWebUI-style)
- Governance Workbench (HITL + workflows)
- Org Memory View (Spine/Postgres/KV)
- Personal Memory View
- Conversational Memory View

### Organizational Memory
- Synthesized knowledge objects
- Continuity lineage
- Operational summaries
- References and citations
- Governance history

### Adaptive Cognition
- Twin reasoning interface
- Continuity retrieval
- Contextual synthesis

---

## Architecture

```
┌─────────────────────────────────────────┐
│  spine-org.integratewise.ai             │
│  (Cloudflare Pages — Edge CDN)          │
│                                         │
│  React 18 + Vite + Tailwind + shadcn/ui │
│  ─────────────────────────────────────  │
│  Runtime Surfaces:                      │
│  ├── /runtime           → Dashboard     │
│  ├── /runtime/triage    → Triage Queue  │
│  ├── /runtime/knowledge → Knowledge Hub │
│  ├── /runtime/references→ References    │
│  └── /runtime/governance→ Governance    │
│  ─────────────────────────────────────  │
│  Projection Surfaces:                   │
│  ├── /                  → Home          │
│  ├── /company           → Doctrine      │
│  ├── /architecture      → System        │
│  ├── /documentation     → Library       │
│  └── ... (17 brand pages preserved)     │
└─────────────────────────────────────────┘
                    │
                    ▼
        api.integratewise.ai
        (Cloudflare Workers Gateway)
                    │
    ┌───────────────┼───────────────┐
    ▼               ▼               ▼
 pipeline.*    think.*        hermes.*
  (Spine)     (Twin)        (Operator)
    │               │               │
    └───────────────┴───────────────┘
                    │
                    ▼
        Hostinger Runtime Mesh
        (CouchDB + LiteLLM + n8n + Infisical)
```

---

## Run Locally

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # production build
```

---

## Development → Production Pipeline

| Stage | Host | Purpose |
|---|---|---|
| **Local** | `localhost:5173` | Runtime UI evolution, continuity flow refinement |
| **Preview** | Vercel | Branch previews, stakeholder review |
| **Production** | Cloudflare Pages | `spine-org.integratewise.ai` — canonical continuity interface |

---

## Core Runtime Files

| File | Purpose |
|---|---|
| `src/runtime/domain/triage.ts` | Signal ingestion, classification, queue |
| `src/runtime/domain/knowledge.ts` | Knowledge objects, synthesis, evolution |
| `src/runtime/domain/references.ts` | Provenance, citations, lineage |
| `src/runtime/storage/local-store.ts` | localStorage adapter (swappable for Spine) |
| `src/runtime/governance.ts` | Approval queues, HITL gates, audit |
| `src/runtime/adaptive-spine.ts` | Entity graph, schema evolution, health |
| `src/app/runtime/*.tsx` | UI surfaces for runtime pages |

---

## Canonical Doctrine Source

`src/imports/pasted_text/integratewise-overview.md` remains the master doctrine document.

**To update any doctrine or product content → edit `integratewise-overview.md` only.**

---

*This surface is governed by `Docs/INTEGRATEWISE_ARCHITECTURE_TOOLS_AND_STACK.md` v3.2.*
