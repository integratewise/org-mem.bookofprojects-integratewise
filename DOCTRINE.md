# IntegrateWise — Canonical Doctrine

This document is the authoritative reference for IntegrateWise's product doctrine, canonical terminology, and architecture model. All pages, docs, navigation, and content in this repository align to this doctrine.

---

## 1. Core Doctrine

### Continuity is the primitive

Continuity is not a feature or a view — it is the fundamental unit of organizational knowledge in IntegrateWise. A continuity is the live, structured model of how the organization operates: its entities, relationships, decisions, evidence, and operational signals, kept coherent across systems and time.

Every other concept in IntegrateWise derives from continuity.

### The Adaptive Spine

The **Adaptive Spine** is the continuity infrastructure — the single source of organizational truth. It holds entities, relationships, schema, and evidence. It is adaptive because it continuously updates as operational reality changes.

The Spine is not a database, a CRM, or a knowledge base. It is a continuity core that organizes operational truth so that AI can reason in grounded context and humans can govern every consequential action.

### Continuity Hydration

**Hydration** is the process by which the Spine learns from reality. Connectors (integrations), workflows, conversations, and operational signals continuously hydrate the Spine with current organizational state.

Hydration is not a sync job — it is the ongoing alignment of the Spine with what is actually happening in the organization.

### Workspace as Projection

The **workspace** is not a static interface. It is a projection of the current continuity topology understood by the Spine. As continuity evolves, the workspace adapts to reflect the current organizational state.

### Knowledge as Adaptive Understanding

**Knowledge** in IntegrateWise is adaptive organizational understanding — the structured, evidence-linked model of what the organization knows, has decided, and should do next. Knowledge adapts as continuity evolves.

### Organizational Continuity Evolution

The **product outcome** is organizational continuity evolution — the organization's continuity becoming more accurate, complete, and actionable over time through the system.

---

## 2. System Model

```
Connectors + Workflows + Operational Signals
                    ↓
         Continuity Hydration (ongoing)
                    ↓
            Adaptive Spine
          (single source of truth)
                    ↓
         Workspace Projection ←→ Knowledge Adaptation
                    ↓
        Human-Governed AI Execution
                    ↓
     Organizational Continuity Evolution
```

---

## 3. Canonical Terminology

| Canonical Term | Use | Avoid |
|---------------|-----|-------|
| Continuity | The primitive unit of organizational knowledge | "knowledge base", "notes", "memory" |
| Adaptive Spine | The continuity core and SSOT | "database", "CRM overlay", "knowledge graph" |
| Hydration | How connectors update the Spine | "sync", "import", "integration pull" |
| Workspace | Projection of current continuity | "dashboard", "view", "interface" |
| Knowledge | Adaptive organizational understanding | "notes", "docs", "records" |
| Continuity evolution | The product outcome | "productivity", "efficiency", "automation" |
| Adaptive Continuity Workspace | Short product descriptor | "Knowledge Workspace" (deprecated) |
| Human-governed AI execution | How AI acts | "AI automation", "agentic execution" |

---

## 4. Product Identity

**IntegrateWise is an adaptive organizational continuity system.**

It is not:
- A dashboard product
- A generic docs site
- An AI notes tool
- A static enterprise platform
- A CRM overlay
- An automation tool

It is a continuity-native operating environment where organizational truth is kept coherent, AI reasons in grounded context, and every consequential action waits for human approval.

---

## 5. Primary Tagline

> **AI Thinks in Context — and Waits for Approval**

---

## 6. Product Descriptors (in order of length)

| Variant | Text |
|---------|------|
| Category | Adaptive Continuity Workspace |
| Short | Adaptive continuity workspace hydrated by the Spine |
| Full | The adaptive continuity workspace hydrated by the Spine |
| Extended | Adaptive continuity workspace projected from hydrated organizational reality |
| Narrative | IntegrateWise is an adaptive continuity workspace where connectors, workflows, conversations, and artifacts continuously hydrate the Spine; workspace and knowledge then project from current continuity with human-governed AI execution. |

---

## 7. What Makes IntegrateWise Different

| Dimension | IntegrateWise | Others |
|-----------|--------------|--------|
| Foundation | Continuity as primitive | Documents, tasks, or chats |
| Intelligence | AI reasons over Spine context | AI operates on isolated prompts |
| Execution | Every action waits for approval | Automation executes without friction |
| Workspace | Projects from continuity | Static interface |
| Knowledge | Adapts with continuity | Stored, not adaptive |

---

## 8. Source of Truth

The master doctrine document is:

```
src/imports/pasted_text/integratewise-overview.md
```

All documentation packs displayed in the app are extracted from this file. To update doctrine in the app, edit this file only.

Brand constants (taglines, contact, identity) are in:

```
src/app/lib/brand.ts
```
