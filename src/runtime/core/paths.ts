/**
 * Canonical Path Model
 *
 * All storage systems MUST map to:
 *   /{domain}/{state}/{item}
 *
 * Where state is one of: triage | knowledge-persisted | references
 */

import type { ApprovedDomain } from "./domains";

export type CanonicalState = "triage" | "knowledge-persisted" | "references";

export const CANONICAL_STATES: CanonicalState[] = ["triage", "knowledge-persisted", "references"];

export const STATE_LABELS: Record<CanonicalState, string> = {
  triage: "Triage",
  "knowledge-persisted": "Knowledge Persisted",
  references: "References",
};

export const STATE_DESCRIPTIONS: Record<CanonicalState, string> = {
  triage: "Incoming, raw, unprocessed operational material",
  "knowledge-persisted": "Stabilized, canonical, reusable knowledge",
  references: "Supporting evidence, citations, source material",
};

export interface CanonicalPath {
  domain: ApprovedDomain;
  state: CanonicalState;
  itemId: string;
}

export function buildCanonicalPath(domain: ApprovedDomain, state: CanonicalState, itemId: string): string {
  return `/${domain}/${state}/${itemId}`;
}

export function parseCanonicalPath(path: string): CanonicalPath | null {
  const parts = path.split("/").filter(Boolean);
  if (parts.length !== 3) return null;
  const [domain, state, itemId] = parts;
  if (!domain || !state || !itemId) return null;
  if (!CANONICAL_STATES.includes(state as CanonicalState)) return null;
  return { domain: domain as ApprovedDomain, state: state as CanonicalState, itemId };
}

export function buildStorageKey(table: string, path: string): string {
  return `iw:runtime:${table}:path:${path}`;
}
