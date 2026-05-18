/**
 * References Domain Model
 *
 * References are immutable links to source material.
 * They provide provenance, citation, and lineage for every knowledge object.
 */

export type ReferenceType =
  | "document" // A file or document
  | "session" // A conversational session
  | "webhook" // An incoming webhook payload
  | "connector" // A connector sync record
  | "commit" // A code or config commit
  | "url"; // An external URL

export interface Reference {
  id: string;
  type: ReferenceType;
  title: string;
  source: string; // e.g., filename, session ID, URL
  sourceUrl?: string;
  checksum: string; // Integrity verification
  capturedAt: number;
  metadata: Record<string, unknown>;
}

export interface Citation {
  id: string;
  knowledgeId: string;
  referenceId: string;
  excerpt: string; // Relevant excerpt from the source
  location: string; // Page, line, timestamp, etc.
  createdAt: number;
}

export interface LineageChain {
  knowledgeId: string;
  chain: {
    step: number;
    type: "signal" | "triage" | "synthesis" | "governance" | "commit";
    id: string;
    timestamp: number;
    actor: string; // who/what caused this step
  }[];
}

// --- Factory ---

export function createReference(
  partial: Omit<Reference, "id" | "capturedAt" | "checksum">
): Reference {
  const now = Date.now();
  const sourceStr = `${partial.type}:${partial.source}:${now}`;
  return {
    ...partial,
    id: `ref_${now}_${Math.random().toString(36).slice(2, 7)}`,
    capturedAt: now,
    checksum: btoa(sourceStr).slice(0, 16),
  };
}

export function createCitation(
  knowledgeId: string,
  referenceId: string,
  excerpt: string,
  location: string
): Citation {
  return {
    id: `cit_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    knowledgeId,
    referenceId,
    excerpt,
    location,
    createdAt: Date.now(),
  };
}

export function buildLineage(knowledgeId: string, chain: LineageChain["chain"]): LineageChain {
  return {
    knowledgeId,
    chain: chain.map((step, idx) => ({ ...step, step: idx + 1 })),
  };
}
