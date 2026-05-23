
# IntegrateWise — Continuity Documentation System

The canonical IntegrateWise documentation and product narrative system. One doctrine, one architecture story, one navigation model, one coherent product identity.

---

## What IntegrateWise Is

IntegrateWise is an **adaptive organizational continuity system** — not a dashboard, AI notes tool, or static enterprise platform.

It is the operating layer for organizations that need continuity, intelligence, and governed execution in a single connected environment.

---

## The Problem It Solves

Modern organizations run on disconnected tools. Critical context lives across CRM records, support tickets, documents, email, chat, spreadsheets, and AI-generated outputs. Each system captures only a fragment. Teams reconstruct context constantly, make decisions with incomplete understanding, and adopt AI that operates outside the real operational state of the business.

IntegrateWise solves that structural fragmentation.

---

## What Continuity Means

**Continuity** is the primitive unit of organizational knowledge in IntegrateWise. It is not a document, a task, or a chat thread — it is the live, structured model of how the organization operates: its entities, relationships, decisions, signals, and evidence, kept coherent across systems and time.

---

## The Adaptive Spine

The **Adaptive Spine** is the continuity core — the single source of organizational truth. Connectors and workflows continuously hydrate the Spine from operational reality. The Spine holds entities, relationships, schema, and truth so that AI can reason in grounded context and humans can govern every consequential action.

---

## The System Model

```
Connectors + Workflows
        ↓
  Continuity Hydration
        ↓
   Adaptive Spine
        ↓
  Workspace Projection   ←→   Knowledge Adaptation
        ↓
  Human-Governed AI Execution
        ↓
  Organizational Continuity Evolution
```

---

## Canonical Doctrine

| Concept | Definition |
|---------|-----------|
| **Continuity** | The primitive — live structured model of organizational reality |
| **Adaptive Spine** | Core infrastructure holding continuity as a single source of truth |
| **Hydration** | How connectors and operational signals continuously update the Spine |
| **Workspace** | A projection of the current continuity topology understood by the Spine |
| **Knowledge** | Adaptive organizational understanding derived from continuity |
| **Evolution** | The product outcome — organizational continuity that improves over time |

---

## Repository Structure

```
src/
├── app/
│   ├── App.tsx                    # Application root
│   ├── routes.tsx                 # All route definitions
│   ├── components/
│   │   ├── RootLayout.tsx         # Navigation + sidebar
│   │   ├── pages/                 # All page components
│   │   ├── diagrams/              # Architecture diagrams
│   │   └── ai/                    # AI assistant
│   └── lib/
│       ├── brand.ts               # Single source of truth for brand strings
│       ├── documentationContent.ts # Maps doctrine sections into doc packs
│       └── ...
└── imports/
    └── pasted_text/
        └── integratewise-overview.md  # ← MASTER DOCTRINE SOURCE
```

---

## Canonical Doctrine Source

`src/imports/pasted_text/integratewise-overview.md` is the app-import doctrine source for the BrandDocumentations runtime surface.
It must align upward to:
- Company OS v1.0 (`book:iw:company-os-v1`)
- `/Users/nirmal/.hermes/skills/software-development/integratewise-architecture/references/may2026-doctrine-consolidation.md`
- `/Users/nirmal/Github/integratewise-live/docs/tech/DOCTRINE_SYNC_AND_SOURCE_MAP.md`

Cross-surface taxonomy rule:
- 00 Company Strategy
- 01 Product & Engineering
- 02 Marketing & Creative
- 03 Sales
- 04 Customer Success
- 05 Operations
- 06 Finance, Legal, HR
- 07 Resources & Knowledge Base
- 08 External Communications
- 09 Archives & Retention

All 6 documentation packs (40+ documents) are extracted from sections of this file via `src/app/lib/sectionExtractor.ts` and mapped in `src/app/lib/documentationContent.ts`.

**To update doctrine or product content shown in the app, edit `integratewise-overview.md` — but keep it aligned to the current canon hierarchy above.**

---

## Navigation & Pages

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | System overview and quick actions |
| `/quick-start` | Quick Start | Edit brand content and export assets |
| `/company` | Doctrine & Product | Continuity doctrine, company narrative, strategy |
| `/architecture` | Architecture | Adaptive Spine, hydration flows, system model |
| `/documentation` | Documentation Library | 6 doctrine packs, 40+ documents |
| `/brand-assets` | Brand Assets | Logo system, brand messaging, visual identity |
| `/design-tokens` | Design Tokens | Colors, typography, component foundations |
| `/stationery` | Stationery | Letterhead, business cards, email signatures |
| `/marketing` | Marketing | Social templates, one-pagers |
| `/generators` | Quick Generators | Batch export brand assets |
| `/sales` | Sales | Pitch decks, proposals, battlecards |
| `/presentations` | Presentations | Deck builder and templates |
| `/gallery` | Product Gallery | Product image gallery |
| `/control-panel` | Control Panel | System-wide settings and export |

---

## Run Locally

```bash
npm install
npm run dev      # development server
npm run build    # production build (Vite)
```

---

## Development → Production Pipeline

| Stage | Host | Purpose |
|---|---|---|
| **Local** | `localhost:5173` | Runtime UI evolution, continuity flow refinement |
| **Preview** | Cloudflare Pages preview branch deploys | Branch previews, stakeholder review |
| **Production** | Cloudflare Pages | `spine-org.integratewise.ai` / `spine-org.pages.dev` — canonical continuity interface |

### GitHub Actions deployment pipeline

This repository now includes a Cloudflare Pages deployment workflow at:

- `.github/workflows/cloudflare-pages-deploy.yml`

Behavior:
- push to `main` → production Pages deploy
- pull request to `main` → preview Pages deploy
- manual run (`workflow_dispatch`) → preview or production deploy, depending on input

Required GitHub repository secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Cloudflare Pages assumptions:
- Pages project name: `spine-org`
- build output directory: `dist`

---

## Core Files to Know

| File | Purpose |
|------|---------|
| `src/app/lib/brand.ts` | Brand constants — taglines, contact, identity |
| `src/imports/pasted_text/integratewise-overview.md` | Master doctrine document |
| `src/app/lib/documentationContent.ts` | Doc pack section mapping |
| `src/app/routes.tsx` | Route definitions |
| `src/app/components/RootLayout.tsx` | Navigation structure |

---

## Doctrine Documentation Packs

| Pack | Name | Focus |
|------|------|-------|
| A | Doctrine & Continuity Strategy | Company, mission, strategic framing |
| B | Category & Positioning | Market category, differentiation |
| C | Product Narrative & Continuity | Product story, use cases, capabilities |
| D | Adaptive Spine & Technical System | Architecture, flow model, entities |
| E | AI Governance & Trust | AI governance, human-in-the-loop |
| F | GTM, Sales & Customer Success | Go-to-market, sales narrative |

