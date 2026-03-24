# IntegrateWise — Full Documentation Refresh

**Status:** Consolidated documentation update
**Scope:** Company / Product / Architecture / Platform / Marketing / Page structure
**Source basis:**

* Technical Architecture
* Architectural & Technical System
* Firm & Product Documentation

**Canonical statement:** IntegrateWise is a **Knowledge Workspace over the Spine, empowered by AI and governed by approvals**.

---

# 1. Documentation System

This refresh treats the documentation as a **full doc set**, not as a single architecture note.

The updated system is organized into four layers of documentation:

1. **Company & Product Narrative**
   What IntegrateWise is, why it exists, what problem it solves, and how it is positioned.

2. **Executive Architecture**
   One-page leadership architecture view that explains L0 / L1 / L2 / L3, the Spine, the workspace, and governed action.

3. **Technical Architecture**
   Full implementation architecture covering data flow, runtime layers, departments, industries, pipeline, workspace loading, cognitive loop, approval, and re-ingestion.

4. **Website / GTM Pages**
   Homepage, Platform, Who It’s For, Use Cases, Integrations, Pricing, About, and supporting message architecture.

---

# 2. Canonical Documentation Rules

## 2.1 Product framing

Use in positioning, website, GTM, and external-facing narrative.

* **Knowledge Workspace** = the product surface
* **Spine** = the structured source of truth and context foundation
* **AI / Cognitive** = reasoning, signals, proposals, and intelligence support
* **Approvals** = human control layer

## 2.2 Runtime framing

Use in technical and implementation docs.

* **L0** = Onboarding
* **L1** = Workspace
* **L2** = Cognitive
* **L3** = Platform / Backend

## 2.3 Core non-negotiables

* The Spine is the only truth boundary.
* The workspace never loads raw connector data directly.
* Flow C never writes directly to Spine truth.
* No action executes without approval when policy requires it.
* Re-ingestion is mandatory.

---

# 3. Document Pack Structure

## Part A — Company & Product Documentation

### A1. Company Introduction

**Purpose:** Explain who IntegrateWise is and what category it is building.

### A2. Problem Statement

**Purpose:** Explain tool sprawl, fragmented context, and ungoverned AI.

### A3. What IntegrateWise Is

**Purpose:** Explain the system as Workspace + Spine + Contextual Intelligence + Governed Action.

### A4. The Adaptive Spine

**Purpose:** Explain the Spine as the structured, governed, operational truth layer.

### A5. How IntegrateWise Works

**Canonical loop:** Connect → Load / Normalize → Store → Think → Govern → Act → Learn

### A6. Product Philosophy

* Context before intelligence
* Governance before execution
* Truth must be structured and traceable
* Work should happen in one connected environment
* Governance is a product feature

### A7. What Makes IntegrateWise Different

* more than a dashboard
* more than an AI assistant
* more than iPaaS
* more than knowledge management
* more than workflow automation

### A8. Departmental Relevance

Document use cases by function:

* Customer Success
* Sales
* RevOps
* Marketing
* Product / Engineering
* Finance / Leadership
* plus the broader 12-department runtime system

### A9. Industry Adaptability

Show how the same architecture adapts across:

* SaaS / Tech
* Professional Services
* Healthcare
* Education
* Manufacturing
* Automotive
* Retail / Commerce
* Financial Services
* Logistics
* Media
* Public Sector

### A10. Governance & Trust Model

* approval-first action
* role-based and scoped controls
* evidence and auditability
* human accountability

### A11. Strategic Vision

Explain the long-term category: a unified cognitive work environment.

### A12. Positioning Statement

**Canonical positioning:**
IntegrateWise is a Knowledge Workspace empowered by AI and the Spine that helps organizations unify tools, context, and action in one governed system.

---

## Part B — Executive Architecture

### B1. One-page executive architecture

This page should answer:

* what are L0, L1, L2, L3?
* where does the Spine sit?
* how does AI work without breaking trust?
* why is the workspace the product surface?

### B2. Core architecture statement

IntegrateWise works because four things are kept separate but connected:

* **L0 Onboarding** establishes tenant identity, department, industry, and schema direction.
* **L1 Workspace** is the operating surface where people work.
* **L2 Cognitive** reasons over truth and proposes actions.
* **L3 Platform** is the controlled backend path where data enters, gets normalized, is stored, and returns through re-ingestion.

### B3. Executive loop

**Ingest → Normalize → Store → Render → Think → Govern / HITL → Act → Re-ingest**

### B4. Executive architecture diagram

Use one simplified runtime graphic:

`Landing → Auth → L0 Onboarding → L1 Workspace → L2 Cognitive → L3 Platform`

### B5. Executive design principles

* Workspace-first
* Spine-based truth
* AI thinks in context
* approvals before execution
* re-ingestion keeps truth current

---

## Part C — Final Technical Architecture

### C1. Runtime architecture

The canonical runtime order is:

**Experience → Gateway → Workspace Runtime → External Connectivity → Data Plane → SSOT / Spine → Cognitive → AI Providers**

### C2. L0 Onboarding Architecture

Onboarding determines:

* tenant identity
* department base schema family
* industry override profile
* connector relevance
* initial workspace readiness
* schema direction

### C3. Department activation model

Department determines:

* allowed entity types
* priority fields
* workspace emphasis
* organic UI capability mapping
* cognitive relevance

**Primary department configs:**

* CUSTOMER_SUCCESS
* REVOPS
* SALES
* MARKETING
* PRODUCT_ENGINEERING
* FINANCE
* SERVICE
* PROCUREMENT
* IT_ADMIN
* STUDENT_TEACHER
* BIZOPS
* PERSONAL

### C4. Department alias layer

* SUPPORT → SERVICE
* ENGINEERING → PRODUCT_ENGINEERING
* PRODUCT → PRODUCT_ENGINEERING
* LEGAL → BIZOPS
* HR → BIZOPS
* SUPPLY_CHAIN → PROCUREMENT
* SERVICE_OPS → SERVICE

### C5. Industry override model

Industry modifies the department base config through additive overrides.

**Industry profiles:**

* SAAS_TECH
* PROFESSIONAL_SERVICES
* HEALTHCARE
* EDUCATION
* MANUFACTURING
* AUTOMOTIVE
* RETAIL_COMMERCE
* FINANCIAL_SERVICES
* LOGISTICS
* MEDIA
* PUBLIC_SECTOR

### C6. Connector and sync model

Connectors:

* authenticate systems
* bind installations to tenant
* start phased sync
* deliver records into the queue / pipeline
* accept write-back instructions from Act

**Sync phases:**

* Creamy
* Needed
* Delta

### C7. Data plane and pipeline

Every meaningful record passes through the 8-stage pipeline:

1. Analyze
2. Classify
3. Filter
4. Refine
5. Extract
6. Validate
7. Sanity
8. Sectorize

### C8. Three data flows

#### Flow A — Structured operational truth

Connector → Loader → Queue → 8-stage pipeline → Spine → Workspace / Entity 360 / Signals

#### Flow B — Unstructured context and evidence

Ingest → Extraction / chunking / embeddings → entity linking → Knowledge + Spine references → Entity 360

#### Flow C — AI / MCP / knowledge-first

Capture → Triage → approved knowledge / decision support → approved action → re-ingestion → Spine

**Rule:** Flow C never writes directly to Spine truth.

### C9. Spine architecture

The Spine stores:

* canonical entities
* relationships
* schema observations
* structured truth
* linked references
* stable read models for workspace and cognitive surfaces

### C10. Workspace layer architecture

L1 is the operating surface, not the ingestion path.

**Workspace rule:**
The Workspace Layer does not load from connectors directly. It loads from Spine-backed runtime projections after connector auth, loader, queue, pipeline, and canonical Spine write.

**L1 phases:**

* Shell ready
* Creamy workspace ready
* Module hydration
* Needed expansion
* Delta freshness

**L1 loading surfaces:**

* Workspace shell
* Home dashboard
* Module data
* Intelligence overlays back into L1

### C11. Entity 360

Entity 360 is a fused read model built from:

* Spine truth
* Knowledge context
* Signals
* optional approved memory

It is not a write surface.

### C12. Cognitive architecture

L2 includes:

* Context
* IQ Hub
* Evidence
* Signals
* Think
* Govern
* HITL
* Act
* Adjust
* Audit
* Twin

**Cognitive loop:**
Entity 360 → Think → Govern → HITL → Act → Adjust → Re-ingest → Spine

### C13. Approval and action architecture

Every governed action must follow:

1. Think creates proposal
2. Govern checks policy
3. HITL captures approval
4. Act executes externally
5. Result re-enters the pipeline
6. Spine updates
7. Workspace reflects reconciled truth

### C14. Real-time architecture

Real-time should push:

* new signals
* approvals state changes
* dashboard refresh cues
* readiness changes

Realtime is a projection layer, not a truth layer.

### C15. Storage model

* **Spine** = canonical structured truth
* **Knowledge** = chunks, embeddings, linked context
* **Approved memory / compounding space** = governed contextual memory
* **Audit / decisions / actions** = execution and approval history
* **Object storage** = raw file artifacts
* **Queues / state stores** = operational mechanics

### C16. Anti-patterns

* direct source-to-truth writes
* workspace loading connector APIs directly
* AI writing directly to Spine truth
* Entity 360 becoming a write surface
* shadow schemas
* approval bypass
* using Knowledge as SSOT

---

## Part D — Website / Page Refresh

This section maps the updated docs into actual pages.

## D1. Homepage

### Headline

Your tools have answers. They just never talk to each other.

### Core message

IntegrateWise connects CRM, support, billing, email, docs, and product data into one Adaptive Spine. Then AI surfaces what matters, proposes what to do next, and waits for human approval before anything executes.

### Homepage structure

* Hero
* Problem section
* Solution section
* How it works (5-step)
* Feature highlights
* Who it’s for
* Proof / outcomes
* CTA

## D2. Platform page

### Core statement

Not another dashboard. Not another AI chatbot. A new operating layer for work.

### Platform page structure

* The Adaptive Spine
* The 4-layer stack
* The 8-stage loader pipeline
* The three data flows
* Why AI never writes directly to the Spine
* Why the workspace reads from the Spine instead of connectors

## D3. Who It’s For page

Personas:

* Customer Success
* RevOps
* MarketingOps
* Founders / Executives

### Rule

This page should be role-based and outcome-based, not architecture-heavy.

## D4. Use Cases page

Priority use cases:

* Account Health & Churn Prevention
* Revenue Operations Intelligence
* Marketing Attribution & Campaign ROI
* Customer Onboarding & Time-to-Value

## D5. Integrations page

### Structure

* Connector categories
* OAuth / API-key auth
* Creamy / full-depth / delta sync explanation
* “IntegrateWise doesn’t migrate your data. It reads and connects it.”

## D6. Pricing page

Should emphasize:

* start with one department
* scale to more departments
* connector and Spine value
* governed AI, not generic AI

## D7. About page

Should preserve:

* founder context
* $8M account story
* why the category exists
* why IntegrateWise is building a knowledge workspace over the Spine

## D8. Footer / site-wide consistency

Use one consistent footer line:
**IntegrateWise LLP · Bengaluru, India · AI Thinks in Context. Actions Wait for Humans.**

---

## Part E — Internal Appendices

### E1. Department Activation Matrix

Should map:

* tenant-facing department
* base config key
* primary workspace emphasis
* cognitive emphasis

### E2. Industry Override Matrix

Should map:

* industry
* additive entity types
* priority-field overrides
* runtime effect

### E3. Scenario Trace Matrix

Should include:

* HubSpot sync trace
* approved AI action trace
* schema drift trace

### E4. Screenshot mapping appendix

Should map:

* L1 Workspace home
* L2 cognitive drawer
* intelligence feed in L1
* work layer navigation
* normalization / active node visibility

---

# 4. Final Documentation Position

The entire documentation set should now follow this hierarchy:

1. **Company & Product docs** explain category, problem, and positioning.
2. **Executive Architecture** explains the system in one page.
3. **Technical Architecture** explains the full runtime and data model.
4. **Website pages** translate the same logic into market-facing copy.
5. **Appendices** hold the runtime matrices, traces, and visuals.

This prevents confusion between:

* product narrative
* runtime architecture
* implementation details
* page-level marketing copy

---

# 5. Final Master Statement

**IntegrateWise documentation should describe one coherent system: a Knowledge Workspace over the Spine, where onboarding activates the right schema, the platform normalizes all meaningful data into canonical truth, the workspace renders Spine-backed runtime projections, the cognitive layer reasons over Entity 360, and every meaningful action is governed, approved, executed, and re-ingested so truth remains consistent over time.**
