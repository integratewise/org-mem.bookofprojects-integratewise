# Design System Audit Report
## `src/app/components/pages/` — 25 Page Components

**Audit Date:** 2026-05-23  
**Auditor:** Kimi Code CLI  
**Scope:** Hardcoded colors, non-canonical CSS variables, font-family boundaries, Tailwind arbitrary values, non-token color references  
**Exclusions:**
- `DesignTokensPage.tsx` — excluded from hardcoded hex checks (documents canonical hex values)
- `StationeryPage.tsx` — excluded from hardcoded hex checks (print-exact colors required)
- `EmailPage.tsx` — email signature inline HTML styles exempted; React component code still audited

---

## Summary

| Category | Files Affected | Total Violations |
|----------|---------------|------------------|
| 1. Hardcoded rgba()/rgb() | 8 | 18 |
| 2. Non-canonical CSS variables | 25 | ~1,560 |
| 3. Font-family boundary violations | 6 | 28 |
| 4. Tailwind arbitrary hex values | 1* | 12* |
| 5. Canvas/SVG non-token colors | 3 | 14 |

*StationeryPage only (exempt from hex audit but noted for completeness).

---

## Category 1 — Hardcoded rgba() / rgb() Values

### AboutPage.tsx
*No hardcoded rgba violations.*

### AccountSuccessPage.tsx
*No hardcoded rgba violations.*

### ArchitecturePage.tsx
| Line | Violation | Suggested Fix |
|------|-----------|---------------|
| L163 | `boxShadow: "0 8px 30px rgba(0,0,0,0.12)"` in `AnimatedLayerCard` | Use `var(--shadow-lg)` or `color-mix(in srgb, var(--ink) 12%, transparent)` |
| L352 | `boxShadow: '0 2px 8px rgb(0 0 0 / 0.06)'` in `FlowDiagram` | Use `var(--shadow-sm)` or `color-mix(in srgb, var(--ink) 6%, transparent)` |

### BlogPage.tsx
*No hardcoded rgba violations.*

### BrandAssetsPage.tsx
*No hardcoded rgba violations.*

### BusinessIntelligencePage.tsx
| Line | Violation | Suggested Fix |
|------|-----------|---------------|
| L405 | `color: 'rgba(244,240,232,0.65)'` in "The Problem" section | Use `color-mix(in srgb, var(--paper) 65%, transparent)` |
| L837 | `background: 'rgba(244,240,232,0.12)'` in Dogfood section | Use `color-mix(in srgb, var(--paper) 12%, transparent)` |
| L838 | `color: 'rgba(244,240,232,0.85)'` in Dogfood section | Use `color-mix(in srgb, var(--paper) 85%, transparent)` |
| L867 | `color: 'rgba(244,240,232,0.75)'` in CTA section | Use `color-mix(in srgb, var(--paper) 75%, transparent)` |

### CompanyPage.tsx
| Line | Violation | Suggested Fix |
|------|-----------|---------------|
| L186 | `background: 'rgba(244,240,232,0.1)'` in stat grid | Use `color-mix(in srgb, var(--paper) 10%, transparent)` |
| L201 | `borderColor: 'rgba(244,240,232,0.12)'` in stat card | Use `color-mix(in srgb, var(--paper) 12%, transparent)` |
| L440 | `border: '2px solid rgba(244,240,232,0.35)'` in CTA button | Use `color-mix(in srgb, var(--paper) 35%, transparent)` |

### ContactPage.tsx
*No hardcoded rgba violations.*

### ControlPanelPage.tsx
*No hardcoded rgba violations.*

### DesignTokensPage.tsx *(exempt from hex audit, rgba still noted)*
| Line | Violation | Context |
|------|-----------|---------|
| L451 | `background: 'rgba(26,58,42,0.08)'` in TokenCard | Decorative swatch background; low priority |
| L494 | `boxShadow: '0 1px 4px 0 rgba(12,12,12,0.06)'` in TokenCard | Shadow on component preview; replace with `var(--shadow-sm)` |

### DocumentationPage.tsx
*No hardcoded rgba violations.*

### EmailPage.tsx
*No hardcoded rgba in non-email React code.*

### GeneratorsPage.tsx
| Line | Violation | Suggested Fix |
|------|-----------|---------------|
| L377 | `background: 'rgba(12,12,12,0.5)'` in image upload overlay | Use `color-mix(in srgb, var(--ink) 50%, transparent)` |
| L711 | `boxShadow: '0 4px ${blur}px rgba(0,0,0,0.1)'` in LinkedInBannerGenerator | Use `color-mix(in srgb, var(--ink) 10%, transparent)` |
| L734 | `background: 'rgba(0,0,0,${opacity})'` in overlay | Dynamic but uses raw rgba pattern; use `color-mix(in srgb, var(--ink) ${opacity}%, transparent)` |
| L902 | `boxShadow: '0 4px ${blur}px rgba(0,0,0,0.1)'` in SocialPostGenerator | Same as L711 |
| L927 | `background: 'rgba(0,0,0,${opacity})'` in overlay | Same as L734 |
| L1220 | `background: 'rgba(244,240,232,0.15)'` in tool sidebar | Use `color-mix(in srgb, var(--paper) 15%, transparent)` |
| L1228 | `background: 'rgba(244,240,232,0.25)'` in badge | Use `color-mix(in srgb, var(--paper) 25%, transparent)` |

### HomePage.tsx
*No hardcoded rgba violations.*

### HowItWorksPage.tsx
*No hardcoded rgba violations.*

### LinkedInPage.tsx
*No hardcoded rgba violations.*

### MarketingPage.tsx
| Line | Violation | Suggested Fix |
|------|-----------|---------------|
| L322 | `background: 'rgba(12,12,12,0.55)'` in preview modal backdrop | Use `color-mix(in srgb, var(--ink) 55%, transparent)` or `bg-[var(--ink)]/55` |

### PresentationsPage.tsx
*No hardcoded rgba violations.*

### PricingPage.tsx
*No hardcoded rgba violations.*

### ProductGalleryPage.tsx
*No hardcoded rgba violations.*

### ProductWriteupPage.tsx
*No hardcoded rgba violations.*

### QuickStartPage.tsx
*No hardcoded rgba violations.*

### SalesPage.tsx
*No hardcoded rgba violations.*

### StationeryPage.tsx *(exempt from hex audit)*
| Line | Violation | Context |
|------|-----------|---------|
| L1628 | `boxShadow: "0 12px 40px rgba(0,0,0,0.1)"` in StationeryCard | Print preview hover effect; exempt |
| L1630 | `boxShadow: '0 1px 4px rgba(12,12,12,0.06)'` in StationeryCard | Print preview card shadow; exempt |

### WhatsAppPage.tsx
| Line | Violation | Suggested Fix |
|------|-----------|---------------|
| L241 | `background: 'rgba(244,240,232,0.2)'` in phone preview avatar | Use `color-mix(in srgb, var(--paper) 20%, transparent)` |
| L249 | `background: 'rgba(244,240,232,0.2)'` in phone header input | Use `color-mix(in srgb, var(--paper) 20%, transparent)` |
| L269 | `background: 'rgba(244,240,232,0.5)'` in chat timestamp | Use `color-mix(in srgb, var(--paper) 50%, transparent)` |

---

## Category 2 — Non-Canonical CSS Variable Usage

**Canonical color variables:** `--ink`, `--paper`, `--paper-warm`, `--paper-deep`, `--rule`, `--rule-light`, `--forest`, `--forest-mid`, `--forest-bright`, `--gold`, `--gold-light`, `--gold-pale`, `--slate`, `--slate-mid`, `--red`, `--red-pale`, `--ink-muted`, `--ink-ghost`, `--mark-indigo`, `--mark-pink`

**Non-canonical variables found:** `--primary-color`, `--primary-hover`, `--primary-soft`, `--accent-color`, `--accent-soft`, `--success-color`, `--warning-color`, `--error-color`, `--status-success`, `--status-warning`, `--status-danger`, `--text-color`, `--text-muted`, `--text-faint`, `--text-strong`, `--text-inverse`, `--text-default`, `--surface`, `--surface-raised`, `--surface-2`, `--surface-subtle`, `--surface-inverse`, `--border-subtle`, `--border-base`, `--border-default`, `--brand-primary`, `--brand-primary-light`, `--overlay-medium`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-2xl`, `--risk`

| File | Occurrences | Key Non-Canonical Variables |
|------|-------------|----------------------------|
| GeneratorsPage.tsx | 194 | `--primary-color`, `--accent-color`, `--text-color`, `--text-muted`, `--text-faint`, `--surface`, `--surface-raised`, `--surface-2`, `--border-subtle`, `--border-base`, `--primary-soft`, `--accent-soft`, `--success-color` |
| PresentationsPage.tsx | 140 | `--primary-color`, `--text-color`, `--text-muted`, `--surface-raised`, `--border-subtle`, `--border-base`, `--shadow-sm`, `--shadow-md` |
| ArchitecturePage.tsx | 127 | `--primary-color`, `--accent-color`, `--text-color`, `--text-muted`, `--text-faint`, `--text-strong`, `--success-color`, `--warning-color`, `--error-color`, `--surface`, `--surface-raised`, `--surface-2`, `--border-subtle`, `--border-base`, `--primary-soft`, `--accent-soft`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-2xl`, `--brand-primary-light` |
| BrandAssetsPage.tsx | 116 | `--primary-color`, `--accent-color`, `--text-color`, `--text-muted`, `--text-faint`, `--text-strong`, `--text-inverse`, `--surface`, `--surface-raised`, `--surface-2`, `--surface-inverse`, `--border-subtle`, `--border-base`, `--brand-primary`, `--brand-primary-light`, `--overlay-medium`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-2xl`, `--primary-soft`, `--accent-soft`, `--primary-hover` |
| LinkedInPage.tsx | 129 | `--primary-color`, `--primary-hover`, `--primary-soft`, `--accent-color`, `--accent-soft`, `--text-color`, `--text-muted`, `--text-faint`, `--text-default`, `--text-inverse`, `--surface-raised`, `--surface-subtle`, `--border-subtle`, `--border-base`, `--border-default`, `--status-success`, `--status-danger`, `--shadow-sm`, `--shadow-md`, `--brand-primary-light` |
| StationeryPage.tsx | 109 | `--primary-color`, `--text-color`, `--text-muted`, `--text-faint`, `--surface-raised`, `--surface-2`, `--border-subtle`, `--border-base` |
| QuickStartPage.tsx | 82 | `--text-strong`, `--text-muted`, `--text-faint`, `--surface-raised`, `--surface-2`, `--surface`, `--border-base`, `--border-subtle`, `--forest-bright`, `--primary-color` |
| DocumentationPage.tsx | 84 | `--primary-color`, `--accent-color`, `--text-color`, `--text-muted`, `--text-faint`, `--text-strong`, `--text-inverse`, `--success-color`, `--warning-color`, `--surface`, `--surface-raised`, `--surface-2`, `--border-subtle`, `--border-base`, `--primary-soft` |
| ControlPanelPage.tsx | 84 | `--primary-color`, `--text-color`, `--text-muted`, `--text-faint`, `--surface-raised`, `--surface`, `--border-subtle`, `--border-base`, `--success-color`, `--warning-color`, `--error-color`, `--forest-bright`, `--shadow-sm` |
| EmailPage.tsx | 85 | `--primary-color`, `--text-color`, `--text-muted`, `--text-faint`, `--surface-raised`, `--surface`, `--surface-2`, `--border-subtle`, `--border-base`, `--success-color`, `--forest`, `--forest-mid`, `--slate` |
| ProductWriteupPage.tsx | 44 | `--text-muted`, `--text-faint`, `--border-subtle`, `--surface-raised`, `--risk`, `--forest`, `--ink`, `--paper` |
| WhatsAppPage.tsx | 49 | `--primary-color`, `--text-color`, `--text-muted`, `--surface-raised`, `--border-subtle`, `--border-base`, `--forest-bright`, `--success-color`, `--red` |
| SalesPage.tsx | 63 | `--primary-color`, `--accent-color`, `--text-color`, `--text-muted`, `--text-faint`, `--surface-raised`, `--border-subtle`, `--border-base`, `--brand-primary-light`, `--warning-color`, `--success-color` |
| ProductGalleryPage.tsx | 54 | `--text-strong`, `--text-muted`, `--text-faint`, `--surface-raised`, `--surface-2`, `--surface`, `--border-base`, `--primary-color`, `--text-color` |
| HomePage.tsx | 52 | `--surface`, `--surface-raised`, `--primary-color`, `--accent-color`, `--text-strong`, `--text-muted`, `--border-subtle`, `--rule-light`, `--primary-soft`, `--accent-soft`, `--shadow-sm`, `--warning-color` |
| AccountSuccessPage.tsx | 23 | `--text-faint`, `--text-muted`, `--surface-raised`, `--border-subtle`, `--risk`, `--forest-bright`, `--error-color`, `--success-color`, `--warning-color`, `--status-success` |
| BusinessIntelligencePage.tsx | 32 | `--text-muted`, `--text-faint`, `--surface-raised`, `--border-subtle`, `--forest-bright`, `--primary-soft` |
| HowItWorksPage.tsx | 21 | `--surface-raised`, `--border-subtle`, `--text-muted`, `--text-faint` |
| AboutPage.tsx | 15 | `--text-muted`, `--surface-raised`, `--border-subtle` |
| CompanyPage.tsx | 13 | `--text-muted`, `--surface-raised`, `--rule` |
| ContactPage.tsx | 14 | `--surface-raised`, `--border-subtle`, `--text-muted`, `--text-faint`, `--ink` |
| MarketingPage.tsx | 14 | `--rule-light`, `--rule`, `--surface-raised`, `--shadow-sm`, `--slate-mid`, `--ink`, `--forest`, `--gold` |
| PricingPage.tsx | 7 | `--surface-raised`, `--border-subtle`, `--text-muted`, `--ink` |
| BlogPage.tsx | 3 | `--text-muted`, `--surface-raised` |
| DesignTokensPage.tsx | 6 | Documenting tokens; low priority |

**Recommendation:** These variables are widely used and likely defined in the global CSS/theme. A migration to canonical tokens should be planned. `--text-color`, `--text-muted`, `--surface-raised`, `--border-subtle`, `--primary-color`, and `--accent-color` are the highest-impact candidates for canonicalization or alias mapping.

---

## Category 3 — Font-Family Boundary Violations

**Canonical font rules:**
- `--font-display` (Bebas Neue): **campaign/hero sections only**
- `--font-serif` (DM Serif): **h1–h3 only**
- `--font-sans` (Instrument Sans): UI/body
- `--font-mono` (IBM Plex Mono): technical strings

### 3a — `--font-serif` used outside h1–h3

| File | Line | Context | Element |
|------|------|---------|---------|
| AboutPage.tsx | L70 | Stat number display | `<p>` (not heading) |
| AboutPage.tsx | L319 | Footer brand text | `<p>` (not heading) |
| AccountSuccessPage.tsx | L112 | Callout body text | `<p>` with italic |
| BusinessIntelligencePage.tsx | L321 | CTA button "Request a demo" | `<motion.button>` |
| BusinessIntelligencePage.tsx | L342 | CTA button | `<motion.button>` |
| ProductWriteupPage.tsx | L45 | Callout body italic | `<p>` inside Callout |

*Note: HowItWorksPage.tsx, ProductWriteupPage.tsx, PricingPage.tsx, ContactPage.tsx, BlogPage.tsx, and CompanyPage.tsx use `fontFamily: 'var(--font-serif)'` exclusively on h1–h3 elements. These are compliant.*

### 3b — `--font-display` used outside hero/campaign

| File | Line | Context | Element |
|------|------|---------|---------|
| MarketingPage.tsx | L331 | LinkedIn preview modal avatar | `<div>` with "IW" text |

*Note: MarketingPage.tsx L536 and L551 use `--font-display` in `BannerPreview` (a banner/hero context). These are compliant.*

### 3c — Hardcoded `Arial` / `system-ui` / `sans-serif` fonts

| File | Lines | Context |
|------|-------|---------|
| GeneratorsPage.tsx | L505, L508, L511, L529, L531, L533, L661, L663, L665, L843, L845, L851 | Canvas 2D `ctx.font` uses `system-ui` / `system-ui, sans-serif` |
| SalesPage.tsx | L95–L102 | Generated SVG strings with `font-family="Arial, sans-serif"` |
| SalesPage.tsx | L120 | HTML body style `font-family: Arial, sans-serif` |
| StationeryPage.tsx | L85–L90 | SVG seal with `font-family="Arial, sans-serif"` |
| StationeryPage.tsx | L992 | Invoice preview `fontFamily: 'Arial, sans-serif'` |
| StationeryPage.tsx | L1297–L1597 | HTML template generation uses `font-family:Arial,sans-serif` extensively |
| EmailPage.tsx | L101, L129 | Email signature HTML `font-family: Arial, sans-serif` *(exempt)* |
| GeneratorsPage.tsx | L1120 | Email signature builder `font-family:Arial,Helvetica,sans-serif` *(exempt)* |

**Recommendation:** Canvas 2D and SVG exports should use loaded webfonts or pre-rendered font paths. For `system-ui` in canvas, consider loading Bebas Neue / DM Serif via `@font-face` and using `document.fonts.load()` before canvas render.

---

## Category 4 — Tailwind Arbitrary Color Values (`bg-[#...]`, `text-[#...]`, `border-[#...]`)

### Non-Exempt Files
*No hex-based Tailwind arbitrary color values found in any non-exempt file.*

### StationeryPage.tsx *(exempt from hex audit)*
| Line | Violation |
|------|-----------|
| L758 | `text-[#636A82]` |
| L760 | `text-[#636A82]` |
| L766 | `text-[#333944]` |
| L789 | `text-[#636A82]` |
| L826 | `text-[#636A82]` |
| L837 | `text-[#636A82]` |
| L860 | `text-[#333944]` |
| L917 | `text-[#636A82]` |
| L1063 | `text-[#636A82]` |
| L1065 | `text-[#333944]` |
| L1069 | `text-[#636A82]` |
| L1070 | `text-[#636A82]` |
| L1071 | `text-[#636A82]` |

---

## Category 5 — Canvas/SVG Non-Token Color References

**Issue:** Canvas 2D `fillStyle` and SVG `fill` cannot reliably resolve CSS custom properties in exported images or external contexts.

| File | Lines | Issue |
|------|-------|-------|
| GeneratorsPage.tsx | L495, L504, L528, L660 | `ctx.fillStyle = 'var(--paper)'` / `'var(--ink)'` — Canvas cannot resolve CSS vars at export time |
| GeneratorsPage.tsx | L498, L526, L840 | Gradient stops use `BRAND.colors.primary` / `.primaryDark` which hold `var(--primary-color)` strings — Canvas will not resolve |
| SalesPage.tsx | L95–L102 | SVG `fill="white"` / `opacity="0.92"` — hardcoded white with opacity; use `var(--paper)` if SVG is inline, or pre-compute hex |
| StationeryPage.tsx | L82–L90 | SVG seal uses `fill="#ffffff"`, `fill="#636A82"`, `fill="var(--primary-color)"` — mixed hardcoded and var usage |

**Recommendation:** For canvas-based exporters, resolve CSS variables to actual hex values at runtime before drawing, or maintain a JS-side color map that mirrors the CSS tokens.

---

## Priority Matrix

| Priority | Fix | Rationale |
|----------|-----|-----------|
| **P0** | Migrate Canvas 2D fonts from `system-ui` to brand fonts | Exported brand assets use wrong typeface |
| **P0** | Replace Canvas 2D `ctx.fillStyle = 'var(--...)'` with resolved hex values | Exported images will have broken/missing colors |
| **P1** | Replace all hardcoded `rgba(244,240,232,…)` with `color-mix(in srgb, var(--paper) …)` | Paper color is tokenized; opacity variants should use `color-mix` |
| **P1** | Replace hardcoded `rgba(12,12,12,…)` / `rgba(0,0,0,…)` with `color-mix(in srgb, var(--ink) …)` | Ink color is tokenized |
| **P1** | Remove `--font-serif` from buttons, callouts, stat numbers, footer text | Serif font restricted to h1–h3 per design system |
| **P2** | Audit and map non-canonical CSS variables to canonical tokens | ~1,560 occurrences; requires systematic theme refactor |
| **P2** | Remove `--font-display` from non-hero/non-campaign contexts | Display font restricted to hero/campaign per design system |
| **P3** | Replace `text-white` / `bg-white` in exempt files with `var(--paper)` | Consistency across print/digital boundaries |

---

## Appendix — File Line Counts

| File | Lines |
|------|-------|
| AboutPage.tsx | 337 |
| AccountSuccessPage.tsx | 802 |
| ArchitecturePage.tsx | 1,132 |
| BlogPage.tsx | 102 |
| BrandAssetsPage.tsx | 1,004 |
| BusinessIntelligencePage.tsx | 1,189 |
| CompanyPage.tsx | 479 |
| ContactPage.tsx | 123 |
| ControlPanelPage.tsx | 634 |
| DesignTokensPage.tsx | 519 |
| DocumentationPage.tsx | 815 |
| EmailPage.tsx | 658 |
| GeneratorsPage.tsx | 1,263 |
| HomePage.tsx | 519 |
| HowItWorksPage.tsx | 884 |
| LinkedInPage.tsx | 998 |
| MarketingPage.tsx | 760 |
| PresentationsPage.tsx | 1,016 |
| PricingPage.tsx | 88 |
| ProductGalleryPage.tsx | 575 |
| ProductWriteupPage.tsx | 398 |
| QuickStartPage.tsx | 666 |
| SalesPage.tsx | 463 |
| StationeryPage.tsx | 1,830 |
| WhatsAppPage.tsx | 640 |
