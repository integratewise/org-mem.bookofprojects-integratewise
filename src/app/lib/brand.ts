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
  category: 'Knowledge Workspace',
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
  descriptor: 'Knowledge Workspace empowered by AI and the Spine',

  /** Full descriptor for letterheads, one-pagers */
  descriptorFull: 'The Knowledge Workspace empowered by AI and the Spine',

  /** Extended form for banners and marketing copy */
  descriptorExtended:
    'Knowledge Workspace over the Spine and Empowered by AI',

  /** Long-form value statement */
  valueProp:
    'AI Thinks in Context. Humans Stay in Control. Every Action Waits for Approval.',

  /** One-paragraph product narrative */
  oneParagraph:
    'IntegrateWise is a Knowledge Workspace empowered by AI and the Spine — a workspace-first system that connects your tools, grounds intelligence in the Spine, compounds approved knowledge, and enables governed action.',
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
