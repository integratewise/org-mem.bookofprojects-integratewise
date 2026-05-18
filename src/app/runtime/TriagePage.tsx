import { useEffect, useState } from "react";
import { Activity, CheckCircle, XCircle, AlertTriangle, Clock, Filter } from "lucide-react";
import { createSignal, createTriageQueue, createTriageIteration, type Signal, type TriageIteration, type TriageStatus } from "../../runtime/domain/triage";
import { SignalStore, TriageStore } from "../../runtime/storage/local-store";

const statusIcons: Record<TriageStatus, React.ElementType> = {
  pending: Clock,
  classified: Activity,
  reviewing: AlertTriangle,
  approved: CheckCircle,
  rejected: XCircle,
  escalated: AlertTriangle,
};

const statusColors: Record<TriageStatus, string> = {
  pending: "#F59E0B",
  classified: "#6366F1",
  reviewing: "#F59E0B",
  approved: "#10B981",
  rejected: "#EF4444",
  escalated: "#DC2626",
};

export function TriagePage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [iterations, setIterations] = useState<TriageIteration[]>([]);
  const [filter, setFilter] = useState<TriageStatus | "all">("all");

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    setSignals(SignalStore.list());
    const allIterations = TriageStore.pendingIterations();
    const sigIds = new Set(SignalStore.list().map((s) => s.id));
    setIterations(allIterations.filter((i) => sigIds.has(i.signalId)));
  }

  function ingestDemoSignal() {
    const sources = ["connector", "webhook", "twin", "human", "system"] as const;
    const severities = ["critical", "high", "medium", "low", "info"] as const;
    const actions = ["created", "updated", "deleted", "stalled", "merged"];
    const types = ["contact", "company", "deal", "ticket", "invoice"];

    const sig = createSignal({
      source: sources[Math.floor(Math.random() * sources.length)],
      sourceId: `demo-${Math.floor(Math.random() * 100)}`,
      entityType: types[Math.floor(Math.random() * types.length)],
      entityId: `ent_${Math.floor(Math.random() * 1000)}`,
      action: actions[Math.floor(Math.random() * actions.length)],
      payload: { demo: true, timestamp: Date.now() },
      severity: severities[Math.floor(Math.random() * severities.length)],
      confidence: Math.random(),
    });
    SignalStore.save(sig);
    TriageStore.saveIteration(createTriageIteration(sig, 1));
    refresh();
  }

  function actOnIteration(iterationId: string, action: "approved" | "rejected") {
    const it = iterations.find((i) => i.id === iterationId);
    if (!it) return;
    const updated: TriageIteration = { ...it, status: action, reviewedAt: Date.now(), reviewerId: "human:operator" };
    TriageStore.saveIteration(updated);
    refresh();
  }

  const filteredIterations = filter === "all" ? iterations : iterations.filter((i) => i.status === filter);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Triage Queue</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            Signal ingestion → classification → governance routing
          </p>
        </div>
        <button
          onClick={ingestDemoSignal}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--brand-primary)" }}
        >
          Ingest Demo Signal
        </button>
      </header>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
        {(["all", "pending", "classified", "reviewing", "approved", "rejected", "escalated"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filter === s ? "text-white" : ""
            }`}
            style={{
              background: filter === s ? statusColors[s] || "var(--brand-primary)" : "var(--muted)",
              color: filter === s ? "#fff" : "var(--muted-foreground)",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Iterations Table */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-sm">
          <thead style={{ background: "var(--muted)" }}>
            <tr>
              <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>Status</th>
              <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>Entity</th>
              <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>Action</th>
              <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>Score</th>
              <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>Reasoning</th>
              <th className="text-right px-4 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredIterations.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
                  No iterations match the current filter.
                </td>
              </tr>
            ) : (
              filteredIterations.map((it) => {
                const sig = signals.find((s) => s.id === it.signalId);
                const Icon = statusIcons[it.status];
                return (
                  <tr key={it.id} className="border-t" style={{ borderColor: "var(--border)" }}>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: statusColors[it.status] + "15", color: statusColors[it.status] }}>
                        <Icon className="w-3 h-3" />
                        {it.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>
                      {sig ? `${sig.entityType}:${sig.entityId}` : it.signalId}
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>
                      {sig?.action ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                          <div className="h-full rounded-full" style={{ width: `${(it.score * 100).toFixed(0)}%`, background: statusColors[it.status] }} />
                        </div>
                        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{it.score.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate" style={{ color: "var(--muted-foreground)" }} title={it.reasoning}>
                      {it.reasoning}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {it.status === "pending" || it.status === "reviewing" ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => actOnIteration(it.id, "approved")}
                            className="p-1 rounded hover:bg-green-50"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </button>
                          <button
                            onClick={() => actOnIteration(it.id, "rejected")}
                            className="p-1 rounded hover:bg-red-50"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                          {it.reviewedAt ? new Date(it.reviewedAt).toLocaleDateString() : "—"}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
