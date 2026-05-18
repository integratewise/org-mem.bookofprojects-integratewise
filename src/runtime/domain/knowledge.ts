/**
 * Knowledge Domain Model
 *
 * KnowledgeObjects are canonical, persisted units of organizational understanding.
 * They are NOT documents — they are synthesized, linked, and versioned continuity artifacts.
 */

export type KnowledgeType =
  | "entity" // A business entity (contact, company, deal)
  | "relationship" // A connection between entities
  | "summary" // A synthesized understanding
  | "decision" // A governed decision with rationale
  | "workflow" // A process or automation definition
  | "doctrine"; // A permanent organizational principle

export type KnowledgeConfidence = "certain" | "probable" | "speculative" | "deprecated";

export interface KnowledgeObject {
  id: string;
  type: KnowledgeType;
  domain: string; // e.g., "sales", "support", "engineering"
  title: string;
  content: string; // Markdown or structured text
  confidence: KnowledgeConfidence;
  version: number;
  lineage: string[]; // IDs of prior versions this supersedes
  references: string[]; // Reference IDs
  tags: string[];
  authorId: string; // human or agent ID
  entityIds: string[]; // Linked entity IDs
  createdAt: number;
  updatedAt: number;
  promotedAt: number | null; // When triage promoted this to canonical knowledge
}

export interface KnowledgeQuery {
  type?: KnowledgeType;
  domain?: string;
  tags?: string[];
  entityId?: string;
  confidence?: KnowledgeConfidence;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface KnowledgeGraph {
  nodes: KnowledgeObject[];
  edges: { from: string; to: string; label: string }[];
}

// --- Factory ---

export function createKnowledgeObject(
  partial: Omit<KnowledgeObject, "id" | "version" | "lineage" | "createdAt" | "updatedAt" | "promotedAt">
): KnowledgeObject {
  const now = Date.now();
  return {
    ...partial,
    id: `know_${now}_${Math.random().toString(36).slice(2, 7)}`,
    version: 1,
    lineage: [],
    createdAt: now,
    updatedAt: now,
    promotedAt: null,
  };
}

export function evolveKnowledge(
  prior: KnowledgeObject,
  changes: Partial<Omit<KnowledgeObject, "id" | "lineage" | "createdAt">>
): KnowledgeObject {
  const now = Date.now();
  return {
    ...prior,
    ...changes,
    id: `know_${now}_${Math.random().toString(36).slice(2, 7)}`,
    version: prior.version + 1,
    lineage: [...prior.lineage, prior.id],
    createdAt: prior.createdAt,
    updatedAt: now,
  };
}

// --- Synthesis Helpers ---

export function synthesizeFromSignals(
  title: string,
  domain: string,
  signalIds: string[],
  authorId: string
): KnowledgeObject {
  return createKnowledgeObject({
    type: "summary",
    domain,
    title,
    content: `Synthesized from ${signalIds.length} signal(s).\n\nSignals: ${signalIds.join(", ")}`,
    confidence: "probable",
    references: [],
    tags: ["synthesized", domain],
    authorId,
    entityIds: [],
  });
}
