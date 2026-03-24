// This file imports all documentation markdown files and maps them to document IDs
import companyIntro from '../../imports/pasted_text/integratewise-company-intro.md?raw';
import aboutPage from '../../imports/pasted_text/integratewise-about.md?raw';
import brochure from '../../imports/pasted_text/integratewise-brochure.md?raw';
import intro from '../../imports/pasted_text/integratewise-intro.md?raw';
import websiteCopy from '../../imports/pasted_text/integratewise-website-copy.md?raw';
import productDoc from '../../imports/pasted_text/integratewise-product-doc.md?raw';
import websitePages from '../../imports/pasted_text/integratewise-website-pages.md?raw';
import overview from '../../imports/pasted_text/integratewise-overview.md?raw';

// Map document IDs to their content
export const documentContent: Record<string, string> = {
  // Pack A - Company & Corporate Strategy
  'a-01': companyIntro,
  'a-02': companyIntro, // Company Profile (reuse intro for now)
  'a-03': intro, // Vision, Mission, Belief System
  
  // Pack B - Category, Positioning & Brand
  'b-01': overview, // Category Definition
  'b-02': websiteCopy, // Messaging Framework
  'b-03': websiteCopy, // Brand Guidelines (from website copy which has brand messaging)
  'b-04': intro, // Positioning Statement
  'b-05': overview, // ICP Definition
  
  // Pack C - Product Narrative & System
  'c-01': productDoc, // Product Overview
  'c-02': overview, // Product Vision
  'c-03': productDoc, // Use Case Library
  'c-04': productDoc, // Feature Map
  
  // Pack D - Architecture & Technical System
  'd-01': productDoc, // Architecture Overview
  'd-02': productDoc, // Spine Architecture
  'd-03': productDoc, // Flow A/B/C Documentation
  'd-04': productDoc, // Governed Intelligence Cycle
  'd-05': productDoc, // Approval Workflow Architecture
  
  // Pack E - AI, Governance & Trust
  'e-01': productDoc, // AI Governance Framework
  'e-02': productDoc, // Approval-first Execution Policy
  
  // Pack F - GTM, Sales & Customer Success
  'f-01': websiteCopy, // Sales Deck
  'f-02': websiteCopy, // Investor Deck
  'f-03': brochure, // One-Pager
  'f-04': aboutPage, // Demo Narrative
  
  // Additional content mappings
  'website-home': websitePages,
  'website-about': aboutPage,
  'brochure': brochure,
  'overview': overview,
};

export function getDocumentContent(docId: string): string | null {
  return documentContent[docId] || null;
}
