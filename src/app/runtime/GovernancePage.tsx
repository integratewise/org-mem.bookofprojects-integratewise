import { useEffect, useState } from "react";
import { Shield, CheckCircle, XCircle, Clock, Mail, Globe, Database, Rocket } from "lucide-react";
import { ApprovalQueue, AuditLog, type ApprovalRequest, type GateType } from "../../runtime/governance";

const gateIcons: Record<GateType, React.ElementType> = {
  email_send: Mail,
  external_post: Globe,
  canonical_mutation: Database,
  production_deploy: Rocket,
};

const gateColors: Record<GateType, string> = {
  email_send: "#3B82F6",
  external_post: "#8B5CF6",
  canonical_mutation: "#F59E0B",
  production_deploy: "#EF4444",
};

export function GovernancePage() {
  const [pending, setPending] = useState<ApprovalRequest[]>([]);
  const [history, setHistory] = useState<ApprovalRequest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<{ gateType: GateType; title: string; description: string; proposedAction: string }>({
    gateType: "canonical_mutation",
    title: "",
    description: "",
    proposedAction: "",
  });

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    setPending(ApprovalQueue.pending());
    setHistory(ApprovalQueue.list({}).slice(0, 20));
  }

  function submitRequest() {
    if (!form.title.trim()) return;
    ApprovalQueue.submit({
      gateType: form.gateType,
      title: form.title,
      description: form.description,
      proposedAction: form.proposedAction,
      proposerId: "human:operator",
    });
    setForm({ gateType: "canonical_mutation", title: "", description: "", proposedAction: "" });
    setShowForm(false);
    refresh();
  }

  function decide(id: string, decision: "approved" | "rejected") {
    ApprovalQueue.decide(id, decision, "human:operator", decision === "approved" ? "LGTM" : "Rejected by operator");
    refresh();
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Governance Workbench</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            HITL gates, approval queues, and audit trails
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90 flex items-center gap-2"
          style={{ background: "var(--brand-primary)" }}
        >
          <Shield className="w-4 h-4" />
          Submit Request
        </button>
      </header>

      {showForm && (
        <div className="rounded-xl border p-5 mb-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>Submit Approval Request</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <select
              value={form.gateType}
              onChange={(e) => setForm({ ...form, gateType: e.target.value as GateType })}
              className="px-3 py-2 rounded-lg border text-sm"
              style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
            >
              <option value="email_send">Email Send</option>
              <option value="external_post">External Post</option>
              <option value="canonical_mutation">Canonical Mutation</option>
              <option value="production_deploy">Production Deploy</option>
            </select>
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="px-3 py-2 rounded-lg border text-sm"
              style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
            />
          </div>
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 rounded-lg border text-sm mb-3"
            style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
          />
          <input
            placeholder="Proposed action (JSON or description)"
            value={form.proposedAction}
            onChange={(e) => setForm({ ...form, proposedAction: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border text-sm mb-3"
            style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
          />
          <button
            onClick={submitRequest}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: "var(--brand-primary)" }}
          >
            Submit for Approval
          </button>
        </div>
      )}

      {/* Pending Approvals */}
      <div className="rounded-xl border p-6 mb-8" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--foreground)" }}>
          <Clock className="w-5 h-5 text-amber-500" />
          Pending Approvals ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
            <CheckCircle className="w-4 h-4 text-green-500" />
            Queue clear. No actions awaiting governance.
          </div>
        ) : (
          <div className="space-y-3">
            {pending.map((req) => {
              const Icon = gateIcons[req.gateType];
              return (
                <div
                  key={req.id}
                  className="flex items-start gap-4 p-4 rounded-lg border"
                  style={{ borderColor: "var(--border)", background: "var(--muted)" }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: gateColors[req.gateType] + "15" }}>
                    <Icon className="w-5 h-5" style={{ color: gateColors[req.gateType] }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{req.title}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: gateColors[req.gateType] + "15", color: gateColors[req.gateType] }}>
                        {req.gateType}
                      </span>
                    </div>
                    <p className="text-sm mb-2" style={{ color: "var(--muted-foreground)" }}>{req.description}</p>
                    <code className="text-xs block p-2 rounded mb-2 overflow-x-auto" style={{ background: "var(--card)", color: "var(--foreground)" }}>
                      {req.proposedAction}
                    </code>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                      Proposed by {req.proposerId} · {new Date(req.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => decide(req.id, "approved")}
                      className="p-2 rounded-lg hover:bg-green-50 transition-colors"
                      title="Approve"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </button>
                    <button
                      onClick={() => decide(req.id, "rejected")}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Reject"
                    >
                      <XCircle className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* History */}
      <div className="rounded-xl border p-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--foreground)" }}>Recent History</h2>
        <div className="space-y-2">
          {history.map((req) => (
            <div key={req.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "var(--muted)" }}>
              <div className="flex items-center gap-3">
                {req.status === "approved" ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : req.status === "rejected" ? (
                  <XCircle className="w-4 h-4 text-red-500" />
                ) : (
                  <Clock className="w-4 h-4 text-amber-500" />
                )}
                <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{req.title}</span>
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: "var(--card)", color: "var(--muted-foreground)" }}>
                  {req.gateType}
                </span>
              </div>
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                {req.status} {req.reviewedAt ? `· ${new Date(req.reviewedAt).toLocaleDateString()}` : ""}
              </span>
            </div>
          ))}
          {history.length === 0 && (
            <div className="text-center py-4 text-sm" style={{ color: "var(--muted-foreground)" }}>
              No governance history yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
