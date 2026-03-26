/**
 * Single source of truth: integratewise-overview.md
 *
 * Every doc ID maps to a section of the master overview document.
 * To update content, edit the markdown file — nothing else.
 * To add a new doc, add an entry below pointing to the relevant heading.
 */
import overview from '../../imports/pasted_text/integratewise-overview.md?raw';
import { extractSection } from './sectionExtractor';

const s = (heading: string) => extractSection(overview, heading);

export const documentContent: Record<string, string> = {
  // Pack A — Company & Corporate Strategy
  'a-01': s('1. IntegrateWise in One View'),
  'a-02': s('2. Company Overview'),
  'a-03': s('5. Vision, Mission, and Belief System'),
  'a-04': s('6. Founder and Strategic Thesis'),

  // Pack B — Category, Positioning & Brand
  'b-01': s('4. Category Definition'),
  'b-02': s('20. Go-to-Market Narrative'),
  'b-04': s('10. How IntegrateWise Is Different'),
  'b-05': s('18. Who IntegrateWise Is For'),

  // Pack C — Product Narrative & System
  'c-01': s('7. What the Product Is'),
  'c-02': s('8. The Adaptive Spine'),
  'c-03': s('19. Use Cases'),
  'c-04': s('9. Core Product Capabilities'),

  // Pack D — Architecture & Technical System
  'd-01': s('11. The Product Operating Model'),
  'd-02': s('8. The Adaptive Spine'),
  'd-03': s('12. Flow Model'),
  'd-04': s('13. Entity 360 and Evidence Model'),
  'd-05': s('14. Human-in-the-Loop and Approval-First Execution'),

  // Pack E — AI, Governance & Trust
  'e-01': s('15. AI Governance and Trust Model'),
  'e-02': s('14. Human-in-the-Loop and Approval-First Execution'),

  // Pack F — GTM, Sales & Customer Success
  'f-01': s('20. Go-to-Market Narrative'),
  'f-02': s('23. Why This Matters Now'),
  'f-03': s('21. One-Paragraph Product Narrative'),

  // Convenience aliases
  'overview': overview,
};

export function getDocumentContent(docId: string): string | null {
  return documentContent[docId] || null;
}
