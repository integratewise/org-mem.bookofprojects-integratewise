# Canonical Doctrine Sources

## Primary Source of Truth

**`integratewise-overview.md`** — the app-import doctrine source for BrandDocumentations.

Within the BrandDocumentations app surface, this is the only file imported by the application (`documentationContent.ts`). All 6 documentation packs and their 40+ documents are extracted from sections of this file via `sectionExtractor.ts`.

It must stay aligned upward to:
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

To update doctrine, product narrative, or architecture content displayed in the app, edit **`integratewise-overview.md`** and keep those upstream canon sources in sync.

---

## Other Files in This Directory

The remaining files are raw reference pastes and working drafts captured during the system's development and consolidation phase. They are **not** imported by the application and are kept here as historical reference only.

| File | Status | Notes |
|------|--------|-------|
| `integratewise-overview.md` | ✅ **Canonical — used by app** | Master doctrine source |
| `integratewise-architecture.md` | Reference | Architecture narrative draft |
| `integratewise-brand-guide.md` | Reference | Brand guide draft |
| `integratewise-brand-stationery.md` | Reference | Stationery design reference |
| `integratewise-brand-system.md` | Reference | Brand system design notes |
| `integratewise-branding-alignme.md` | Reference | Branding alignment notes |
| `integratewise-brochure.md` | Reference | Brochure copy draft |
| `integratewise-company-intro.md` | Reference | Company introduction draft |
| `integratewise-data-flow.md` | Reference | Data flow documentation |
| `integratewise-design-brief.md` | Reference | Design brief |
| `integratewise-design-system.md` | Reference | Design system reference |
| `integratewise-doc-index.md` | Reference | Documentation index |
| `integratewise-doc-refresh.md` | Reference | Doc refresh working notes |
| `integratewise-intro.md` | Reference | Intro copy draft |
| `integratewise-marketing-websit.md` | Reference | Website marketing copy |
| `integratewise-master-doc.md` | Reference | Earlier master doc version |
| `integratewise-product-doc.md` | Reference | Product documentation draft |
| `integratewise-tech-arch.md` | Reference | Technical architecture |
| `integratewise-website-copy.md` | Reference | Website copy draft |
| `integratewise-website-pages.md` | Reference | Website IA and pages |
| `integration-data-flow-a.md` | Reference | Integration data flow |
| `pasted-attachment-2.txt` | Reference | Raw paste artifact |
| `integratewise-about.md` | Reference | About page copy |

**Rule:** When in doubt, always read `integratewise-overview.md` as the single authoritative source.
