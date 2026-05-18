/**
 * Governance Runtime
 *
 * Queue-first governance: no execution without queue entry.
 * All gated actions flow through approval queues with full audit trails.
 */

export type GateType = "email_send" | "external_post" | "canonical_mutation" | "production_deploy";
export type ApprovalStatus = "pending" | "approved" | "rejected" | "snoozed";

export interface ApprovalRequest {
  id: string;
  gateType: GateType;
  title: string;
  description: string;
  proposedAction: string; // JSON-stringified action
  proposerId: string; // twin agent or human
  status: ApprovalStatus;
  reviewerId: string | null;
  reviewComment: string | null;
  reviewedAt: number | null;
  snoozeUntil: number | null;
  createdAt: number;
}

export interface AuditEntry {
  id: string;
  requestId: string;
  actor: string;
  action: string;
  detail: string;
  timestamp: number;
}

const PREFIX = "iw:gov:";

function key(table: string, id: string): string {
  return `${PREFIX}${table}:${id}`;
}

function getAll<T>(table: string): T[] {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith(`${PREFIX}${table}:`)) keys.push(k);
  }
  return keys
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

// --- Approval Queue ---

export const ApprovalQueue = {
  submit: (req: Omit<ApprovalRequest, "id" | "status" | "reviewerId" | "reviewComment" | "reviewedAt" | "snoozeUntil" | "createdAt">): ApprovalRequest => {
    const now = Date.now();
    const request: ApprovalRequest = {
      ...req,
      id: `req_${now}_${Math.random().toString(36).slice(2, 7)}`,
      status: "pending",
      reviewerId: null,
      reviewComment: null,
      reviewedAt: null,
      snoozeUntil: null,
      createdAt: now,
    };
    save("approvals", request);
    AuditLog.append({
      id: `aud_${now}_${Math.random().toString(36).slice(2, 7)}`,
      requestId: request.id,
      actor: req.proposerId,
      action: "submitted",
      detail: `Gate: ${req.gateType}`,
      timestamp: now,
    });
    return request;
  },

  get: (id: string): ApprovalRequest | null => {
    const raw = localStorage.getItem(key("approvals", id));
    return raw ? JSON.parse(raw) : null;
  },

  list: (filters?: { status?: ApprovalStatus; gateType?: GateType }): ApprovalRequest[] => {
    let results = getAll<ApprovalRequest>("approvals").sort((a, b) => b.createdAt - a.createdAt);
    if (filters?.status) results = results.filter((r) => r.status === filters.status);
    if (filters?.gateType) results = results.filter((r) => r.gateType === filters.gateType);
    return results;
  },

  pending: (): ApprovalRequest[] =>
    getAll<ApprovalRequest>("approvals")
      .filter((r) => r.status === "pending" && (!r.snoozeUntil || r.snoozeUntil < Date.now()))
      .sort((a, b) => b.createdAt - a.createdAt),

  decide: (
    id: string,
    decision: "approved" | "rejected",
    reviewerId: string,
    comment?: string
  ): ApprovalRequest | null => {
    const req = ApprovalQueue.get(id);
    if (!req || req.status !== "pending") return null;
    const now = Date.now();
    const updated: ApprovalRequest = {
      ...req,
      status: decision,
      reviewerId,
      reviewComment: comment || null,
      reviewedAt: now,
    };
    save("approvals", updated);
    AuditLog.append({
      id: `aud_${now}_${Math.random().toString(36).slice(2, 7)}`,
      requestId: id,
      actor: reviewerId,
      action: decision,
      detail: comment || "No comment",
      timestamp: now,
    });
    return updated;
  },

  snooze: (id: string, durationMinutes: number, reviewerId: string): ApprovalRequest | null => {
    const req = ApprovalQueue.get(id);
    if (!req || req.status !== "pending") return null;
    const now = Date.now();
    const updated: ApprovalRequest = {
      ...req,
      status: "snoozed",
      snoozeUntil: now + durationMinutes * 60 * 1000,
    };
    save("approvals", updated);
    AuditLog.append({
      id: `aud_${now}_${Math.random().toString(36).slice(2, 7)}`,
      requestId: id,
      actor: reviewerId,
      action: "snoozed",
      detail: `${durationMinutes} minutes`,
      timestamp: now,
    });
    return updated;
  },
};

// --- Audit Log ---

export const AuditLog = {
  append: (entry: AuditEntry) => save("audit", entry),
  forRequest: (requestId: string): AuditEntry[] =>
    getAll<AuditEntry>("audit")
      .filter((e) => e.requestId === requestId)
      .sort((a, b) => a.timestamp - b.timestamp),
  recent: (limit = 50): AuditEntry[] =>
    getAll<AuditEntry>("audit")
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit),
};
