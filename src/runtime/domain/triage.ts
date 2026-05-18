/**
 * Triage Domain Model
 *
 * Signals are immutable observations that flow into the system.
 * Triage is the process of classifying, scoring, and routing signals
 * toward either: auto-approval, HITL gate, or rejection.
 *
 * The path (iterations) IS the intelligence — never collapsed.
 */

export type SignalSeverity = "critical" | "high" | "medium" | "low" | "info";
export type SignalSource = "connector" | "webhook" | "twin" | "human" | "system";
export type TriageStatus = "pending" | "classified" | "reviewing" | "approved" | "rejected" | "escalated";
export type TriageAction = "auto_approve" | "hitl_gate" | "reject" | "escalate" | "defer";

export interface Signal {
  id: string;
  source: SignalSource;
  sourceId: string; // e.g., connector name, webhook ID
  entityType: string; // e.g., "contact", "deal", "ticket"
  entityId: string;
  action: string; // e.g., "created", "updated", "deleted", "stalled"
  payload: Record<string, unknown>;
  severity: SignalSeverity;
  confidence: number; // 0-1
  timestamp: number;
  hash: string; // integrity hash of payload
}

export interface TriageIteration {
  id: string;
  signalId: string;
  iteration: number;
  status: TriageStatus;
  classifiedAs: TriageAction | null;
  score: number; // composite risk/saliency score
  reasoning: string;
  reviewerId: string | null;
  reviewedAt: number | null;
  createdAt: number;
}

export interface TriageQueue {
  id: string;
  name: string;
  signals: Signal[];
  iterations: TriageIteration[];
  maxIterations: number;
  createdAt: number;
  updatedAt: number;
}

// --- Classification Engine (client-side heuristic) ---

export function classifySignal(signal: Signal): TriageAction {
  if (signal.severity === "critical") return "hitl_gate";
  if (signal.severity === "high" && signal.confidence < 0.7) return "reviewing";
  if (signal.severity === "info") return "auto_approve";
  if (signal.source === "twin" && signal.confidence > 0.85) return "auto_approve";
  return "hitl_gate";
}

export function scoreSignal(signal: Signal): number {
  const severityWeights: Record<SignalSeverity, number> = {
    critical: 1.0,
    high: 0.75,
    medium: 0.5,
    low: 0.25,
    info: 0.1,
  };
  return severityWeights[signal.severity] * signal.confidence;
}

// --- Factory ---

export function createSignal(partial: Omit<Signal, "id" | "timestamp" | "hash">): Signal {
  const payloadStr = JSON.stringify(partial.payload);
  return {
    ...partial,
    id: `sig_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp: Date.now(),
    hash: btoa(payloadStr).slice(0, 16),
  };
}

export function createTriageIteration(signal: Signal, iteration: number): TriageIteration {
  const action = classifySignal(signal);
  return {
    id: `tri_${signal.id}_${iteration}`,
    signalId: signal.id,
    iteration,
    status: action === "auto_approve" ? "approved" : "pending",
    classifiedAs: action,
    score: scoreSignal(signal),
    reasoning: `Classified as ${action} based on severity=${signal.severity}, confidence=${signal.confidence.toFixed(2)}`,
    reviewerId: null,
    reviewedAt: null,
    createdAt: Date.now(),
  };
}

export function createTriageQueue(name: string): TriageQueue {
  const now = Date.now();
  return {
    id: `queue_${now}_${Math.random().toString(36).slice(2, 7)}`,
    name,
    signals: [],
    iterations: [],
    maxIterations: 12,
    createdAt: now,
    updatedAt: now,
  };
}
