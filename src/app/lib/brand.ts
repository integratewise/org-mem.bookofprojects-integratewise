/**
 * IntegrateWise Brand Constants
 *
 * Single source of truth for all brand strings, contacts, and copy.
 * To update any brand element, change it here — nowhere else.
 */

// ─── Identity ────────────────────────────────────────────────────────────────

export const BRAND = {
  name: 'IntegrateWise',
  legalName: 'IntegrateWise LLP',
  founded: '2024',
  location: 'Bengaluru, India',
  website: 'integratewise.ai',
  category: 'Adaptive Continuity Workspace',
} as const;

// ─── Taglines & Descriptors ───────────────────────────────────────────────────

export const TAGLINES = {
  /** Primary tagline — use everywhere by default */
  primary: 'AI Thinks in Context — and Waits for Approval',

  /** Split form for stationery / large type (top + bottom) */
  split: {
    top: 'AI Thinks in Context',
    bottom: 'and Waits for Approval',
  },

  /** Short descriptor for headlines, social bios, slide subtitles */
  descriptor: 'Adaptive continuity workspace hydrated by the Spine',

  /** Full descriptor for letterheads, one-pagers */
  descriptorFull: 'The adaptive continuity workspace hydrated by the Spine',

  /** Extended form for banners and marketing copy */
  descriptorExtended:
    'Adaptive continuity workspace projected from hydrated organizational reality',

  /** Long-form value statement */
  valueProp:
    'AI Thinks in Context. Humans Stay in Control. Every Action Waits for Approval.',

  /** One-paragraph product narrative */
  oneParagraph:
    'IntegrateWise is an adaptive continuity workspace where connectors, workflows, conversations, and artifacts continuously hydrate the Spine; workspace and knowledge then project from current continuity with human-governed AI execution.',
} as const;

// ─── Contact & Social ─────────────────────────────────────────────────────────

export const CONTACT = {
  general: 'hello@integratewise.ai',
  connect: 'connect@integratewise.ai',
  sales: 'sales@integratewise.ai',
  support: 'support@integratewise.ai',
  billing: 'billing@integratewise.ai',
  marketing: 'marketing@integratewise.ai',
  careers: 'careers@integratewise.ai',
  security: 'security@integratewise.ai',
  demo: 'https://integratewise.ai/demo',
} as const;

// ─── Footer line ──────────────────────────────────────────────────────────────

/** Standard footer string used in stationery, email signatures, and templates */
export const FOOTER_LINE =
  `${BRAND.legalName} · ${BRAND.location} · ${CONTACT.general}`;
