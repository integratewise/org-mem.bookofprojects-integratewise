/**
 * Local Storage Adapter
 *
 * Provides Infisical-like canonical storage semantics for the knowledge runtime.
 * Uses localStorage with JSON serialization.
 * Future: swap for IndexedDB or Cloudflare Spine client.
 */

import type { Signal, TriageQueue, TriageIteration } from "../domain/triage";
import type { KnowledgeObject, KnowledgeQuery } from "../domain/knowledge";
import type { Reference, Citation, LineageChain } from "../domain/references";
import type { ApprovedDomain } from "../core/domains";
import type { CanonicalState } from "../core/paths";
import { createKnowledgeObject } from "../domain/knowledge";

const PREFIX = "iw:runtime:";

function key(table: string, id: string): string {
  return `${PREFIX}${table}:${id}`;
}

function listKeys(table: string): string[] {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith(`${PREFIX}${table}:`)) keys.push(k);
  }
  return keys;
}

function getAll<T>(table: string): T[] {
  return listKeys(table)
    .map((k) => {
      try {
        return JSON.parse(localStorage.getItem(k) || "null");
      } catch {
        return null;
      }
    })
    .filter(Boolean) as T[];
}

function save<T extends { id: string }>(table: string, item: T): void {
  localStorage.setItem(key(table, item.id), JSON.stringify(item));
}

function remove(table: string, id: string): void {
  localStorage.removeItem(key(table, id));
}

// --- Signals ---

export const SignalStore = {
  save: (s: Signal) => save("signals", s),
  get: (id: string): Signal | null => {
    const raw = localStorage.getItem(key("signals", id));
    return raw ? JSON.parse(raw) : null;
  },
  list: (): Signal[] =>
    getAll<Signal>("signals").sort((a, b) => b.timestamp - a.timestamp),
  remove: (id: string) => remove("signals", id),
};

// --- Triage ---

export const TriageStore = {
  saveQueue: (q: TriageQueue) => save("triage_queues", q),
  getQueue: (id: string): TriageQueue | null => {
    const raw = localStorage.getItem(key("triage_queues", id));
    return raw ? JSON.parse(raw) : null;
  },
  listQueues: (): TriageQueue[] =>
    getAll<TriageQueue>("triage_queues").sort((a, b) => b.updatedAt - a.updatedAt),
  saveIteration: (i: TriageIteration) => save("triage_iterations", i),
  getIterationsForSignal: (signalId: string): TriageIteration[] =>
    getAll<TriageIteration>("triage_iterations")
      .filter((i) => i.signalId === signalId)
      .sort((a, b) => a.iteration - b.iteration),
  pendingIterations: (): TriageIteration[] =>
    getAll<TriageIteration>("triage_iterations")
      .filter((i) => i.status === "pending" || i.status === "reviewing")
      .sort((a, b) => b.createdAt - a.createdAt),
};

// --- Knowledge ---

export const KnowledgeStore = {
  save: (k: KnowledgeObject) => save("knowledge", k),
  get: (id: string): KnowledgeObject | null => {
    const raw = localStorage.getItem(key("knowledge", id));
    return raw ? JSON.parse(raw) : null;
  },
  remove: (id: string) => remove("knowledge", id),
  query: (q: KnowledgeQuery): KnowledgeObject[] => {
    let results = getAll<KnowledgeObject>("knowledge");
    if (q.type) results = results.filter((k) => k.type === q.type);
    if (q.domain) results = results.filter((k) => k.domain === q.domain);
    if (q.tags) results = results.filter((k) => q.tags!.every((t) => k.tags.includes(t)));
    if (q.entityId) results = results.filter((k) => k.entityIds.includes(q.entityId!));
    if (q.confidence) results = results.filter((k) => k.confidence === q.confidence);
    if (q.search) {
      const term = q.search.toLowerCase();
      results = results.filter(
        (k) =>
          k.title.toLowerCase().includes(term) ||
          k.content.toLowerCase().includes(term) ||
          k.tags.some((t) => t.toLowerCase().includes(term))
      );
    }
    results = results.sort((a, b) => b.updatedAt - a.updatedAt);
    const offset = q.offset || 0;
    const limit = q.limit || 50;
    return results.slice(offset, offset + limit);
  },
  count: (): number => listKeys("knowledge").length,
  byDomain: (): Record<string, number> => {
    const map: Record<string, number> = {};
    getAll<KnowledgeObject>("knowledge").forEach((k) => {
      map[k.domain] = (map[k.domain] || 0) + 1;
    });
    return map;
  },
};

// --- References ---

export const ReferenceStore = {
  save: (r: Reference) => save("references", r),
  get: (id: string): Reference | null => {
    const raw = localStorage.getItem(key("references", id));
    return raw ? JSON.parse(raw) : null;
  },
  list: (): Reference[] =>
    getAll<Reference>("references").sort((a, b) => b.capturedAt - a.capturedAt),
  remove: (id: string) => remove("references", id),
};

export const CitationStore = {
  save: (c: Citation) => save("citations", c),
  forKnowledge: (knowledgeId: string): Citation[] =>
    getAll<Citation>("citations")
      .filter((c) => c.knowledgeId === knowledgeId)
      .sort((a, b) => b.createdAt - a.createdAt),
};

export const LineageStore = {
  save: (l: LineageChain) => save("lineage", l),
  get: (knowledgeId: string): LineageChain | null => {
    const raw = localStorage.getItem(key("lineage", knowledgeId));
    return raw ? JSON.parse(raw) : null;
  },
};

// --- Domain-Scoped Canonical Storage ---

export const DomainStore = {
  knowledgeByDomain: (domain: ApprovedDomain): KnowledgeObject[] =>
    getAll<KnowledgeObject>("knowledge")
      .filter((k) => k.domain === domain)
      .sort((a, b) => b.updatedAt - a.updatedAt),

  referencesByDomain: (domain: ApprovedDomain): Reference[] =>
    getAll<Reference>("references")
      .filter((r) => r.metadata?.domain === domain)
      .sort((a, b) => b.capturedAt - a.capturedAt),

  signalsByDomain: (domain: ApprovedDomain): Signal[] =>
    getAll<Signal>("signals")
      .filter((s) => s.payload?.domain === domain || s.sourceId?.startsWith(domain))
      .sort((a, b) => b.timestamp - a.timestamp),

  countByDomainAndState: (): Record<string, Record<CanonicalState, number>> => {
    const result: Record<string, Record<CanonicalState, number>> = {};
    for (const k of getAll<KnowledgeObject>("knowledge")) {
      if (!result[k.domain]) result[k.domain] = { triage: 0, "knowledge-persisted": 0, references: 0 };
      result[k.domain]["knowledge-persisted"]++;
    }
    for (const s of getAll<Signal>("signals")) {
      const domain = (s.payload?.domain as string) || "unknown";
      if (!result[domain]) result[domain] = { triage: 0, "knowledge-persisted": 0, references: 0 };
      result[domain].triage++;
    }
    for (const r of getAll<Reference>("references")) {
      const domain = (r.metadata?.domain as string) || "unknown";
      if (!result[domain]) result[domain] = { triage: 0, "knowledge-persisted": 0, references: 0 };
      result[domain].references++;
    }
    return result;
  },
};

// --- Promotion Engine: Triage → Knowledge-Persisted ---

export const PromotionEngine = {
  promoteSignal: (signalId: string, reviewerId: string): KnowledgeObject | null => {
    const signal = SignalStore.get(signalId);
    if (!signal) return null;

    const iterations = TriageStore.getIterationsForSignal(signalId);
    const lastIteration = iterations[iterations.length - 1];
    if (!lastIteration || lastIteration.status !== "approved") return null;

    const domain = (signal.payload?.domain as ApprovedDomain) || "business-operations";
    const knowledge = createKnowledgeObject({
      type: "summary",
      domain,
      title: `Synthesis of ${signal.entityType}:${signal.entityId}`,
      content: `**Signal Source**: ${signal.source}\n**Action**: ${signal.action}\n**Payload**: \`\`\`json\n${JSON.stringify(signal.payload, null, 2)}\n\`\`\`\n\n**Classification**: ${lastIteration.classifiedAs}\n**Score**: ${lastIteration.score.toFixed(2)}\n**Reasoning**: ${lastIteration.reasoning}`,
      confidence: signal.confidence > 0.8 ? "certain" : signal.confidence > 0.5 ? "probable" : "speculative",
      references: [],
      tags: ["promoted", signal.source, signal.entityType, signal.action],
      authorId: reviewerId,
      entityIds: [signal.entityId],
    });

    KnowledgeStore.save(knowledge);

    // Mark iteration as fully promoted
    const promoted: TriageIteration = { ...lastIteration, status: "approved" };
    TriageStore.saveIteration(promoted);

    return knowledge;
  },
};

// --- Stats ---

export function runtimeStats(): {
  signals: number;
  triageQueues: number;
  pendingReviews: number;
  knowledgeObjects: number;
  references: number;
} {
  return {
    signals: listKeys("signals").length,
    triageQueues: listKeys("triage_queues").length,
    pendingReviews: TriageStore.pendingIterations().length,
    knowledgeObjects: listKeys("knowledge").length,
    references: listKeys("references").length,
  };
}

// --- Seed data for demo ---

import { seedKnowledge, seedReferences } from "./seed-knowledge";
import { metaKnowledge } from "./seed-knowledge-meta";

export function seedRuntimeData(): void {
  if (KnowledgeStore.count() > 0) return; // Already seeded

  // Load canonical references
  for (const ref of seedReferences) {
    ReferenceStore.save(ref);
  }

  // Load canonical knowledge objects
  for (const know of seedKnowledge) {
    KnowledgeStore.save(know);
  }

  // Load meta-knowledge: synthesized essence of IntegrateWise
  KnowledgeStore.save(metaKnowledge);
}
