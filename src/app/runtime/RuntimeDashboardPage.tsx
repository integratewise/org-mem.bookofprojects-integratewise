import { useEffect, useState } from "react";
import { Activity, BookOpen, GitBranch, Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { runtimeStats } from "../../runtime/storage/local-store";
import { ApprovalQueue } from "../../runtime/governance";
import { computeSystemHealth } from "../../runtime/adaptive-spine";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
}

function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="rounded-xl border p-5 flex items-center gap-4" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: color + "20" }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <div className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{value}</div>
        <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{label}</div>
      </div>
    </div>
  );
}

export function RuntimeDashboardPage() {
  const [stats, setStats] = useState({ signals: 0, triageQueues: 0, pendingReviews: 0, knowledgeObjects: 0, references: 0 });
  const [health, setHealth] = useState({ entityCount: 0, avgEntityHealth: 0, schemaCount: 0, relationshipCount: 0, staleEntities: 0 });
  const [pendingApprovals, setPendingApprovals] = useState(0);

  useEffect(() => {
    setStats(runtimeStats());
    setHealth(computeSystemHealth());
    setPendingApprovals(ApprovalQueue.pending().length);
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Runtime Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          Continuity-native organizational knowledge runtime — live substrate status
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard label="Signals" value={stats.signals} icon={Activity} color="#1BA784" />
        <StatCard label="Triage Queues" value={stats.triageQueues} icon={Clock} color="#6366F1" />
        <StatCard label="Pending Reviews" value={stats.pendingReviews} icon={AlertTriangle} color="#F59E0B" />
        <StatCard label="Knowledge Objects" value={stats.knowledgeObjects} icon={BookOpen} color="#3B82F6" />
        <StatCard label="References" value={stats.references} icon={GitBranch} color="#8B5CF6" />
      </div>

      {/* Adaptive Spine Health */}
      <div className="rounded-xl border p-6 mb-8" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--foreground)" }}>
          <Activity className="w-5 h-5 text-[#1BA784]" />
          Adaptive Spine Health
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg" style={{ background: "var(--muted)" }}>
            <div className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{health.entityCount}</div>
            <div className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>Entities</div>
          </div>
          <div className="text-center p-4 rounded-lg" style={{ background: "var(--muted)" }}>
            <div className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{(health.avgEntityHealth * 100).toFixed(0)}%</div>
            <div className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>Avg Health</div>
          </div>
          <div className="text-center p-4 rounded-lg" style={{ background: "var(--muted)" }}>
            <div className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{health.schemaCount}</div>
            <div className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>Schemas</div>
          </div>
          <div className="text-center p-4 rounded-lg" style={{ background: "var(--muted)" }}>
            <div className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{health.staleEntities}</div>
            <div className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>Stale Entities</div>
          </div>
        </div>
      </div>

      {/* Governance Status */}
      <div className="rounded-xl border p-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--foreground)" }}>
          <Shield className="w-5 h-5 text-[#F59E0B]" />
          Governance Queue
        </h2>
        {pendingApprovals === 0 ? (
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
            <CheckCircle className="w-4 h-4 text-green-500" />
            No pending approvals. All systems governed.
          </div>
        ) : (
          <div className="text-sm" style={{ color: "var(--foreground)" }}>
            <span className="font-semibold text-amber-500">{pendingApprovals}</span> approval(s) awaiting review.
          </div>
        )}
      </div>
    </div>
  );
}
