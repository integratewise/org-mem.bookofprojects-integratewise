"use client";

import { useState } from "react";
import { useWorkerRegistry } from "@/hooks/use-worker-registry";

// Default workers (will be replaced with registry data)
const DEFAULT_WORKERS = [
  { name: "MCP Connector", type: "active", status: "healthy", url: "mcp.integratewise.ai", description: "Protocol layer for all tool access", capabilities: ["kb.*", "memory.*", "spine.*", "signal.*", "proposal.*", "figma.*"] },
  { name: "Gateway", type: "active", status: "healthy", url: "gateway.integratewise.ai", description: "API gateway, routing, auth", capabilities: ["routing", "auth", "rate-limiting"] },
  { name: "Think", type: "active", status: "healthy", url: "think.integratewise.ai", description: "AI reasoning, proposals, signals", capabilities: ["reasoning", "proposals", "signals"] },
  { name: "Knowledge", type: "active", status: "healthy", url: "knowledge.integratewise.ai", description: "Memory access, knowledge search", capabilities: ["memory-access", "search"] },
  { name: "Govern", type: "active", status: "healthy", url: "govern.integratewise.ai", description: "Governance, approvals, policy enforcement", capabilities: ["governance", "approvals", "policy"] },
  { name: "Pipeline", type: "active", status: "healthy", url: "pipeline.integratewise.ai", description: "Loader, normalizer, data processing", capabilities: ["loader", "normalizer", "processing"] },
  { name: "Hooks", type: "active", status: "healthy", url: "hooks.integratewise.ai", description: "Webhooks, inbound ingestion", capabilities: ["webhooks", "ingestion"] },
  { name: "Files", type: "active", status: "healthy", url: "files.integratewise.ai", description: "File/object access layer", capabilities: ["file-access", "storage"] },
  { name: "Spine", type: "active", status: "healthy", url: "spine.integratewise.ai", description: "Spine-facing architecture/runtime", capabilities: ["spine", "runtime"] },
  { name: "Continuity", type: "active", status: "healthy", url: "continuity.integratewise.ai", description: "Continuity-facing product/API", capabilities: ["continuity", "api"] },
  { name: "MCP Connector Backup", type: "backup", status: "healthy", url: "mcp-backup.integratewise.ai", description: "Backup MCP connector", capabilities: ["kb.*", "memory.*", "spine.*"] },
  { name: "Gateway Backup", type: "backup", status: "healthy", url: "gateway-backup.integratewise.ai", description: "Backup gateway", capabilities: ["routing", "auth"] },
  { name: "Think Passive", type: "passive", status: "unknown", url: "think-passive.integratewise.ai", description: "Passive think worker, ready to activate", capabilities: ["reasoning", "proposals"] },
];

export default function WorkersPage() {
  const { workers, incidents, isLoading, error, refresh } = useWorkerRegistry();
  const [activeTab, setActiveTab] = useState<"registry" | "health" | "incidents">("registry");
  const [filterType, setFilterType] = useState<"all" | "active" | "backup" | "passive">("all");

  // Use default workers if registry is empty
  const displayWorkers = workers.length > 0 ? workers : DEFAULT_WORKERS;

  // Filter workers
  const filteredWorkers = filterType === "all" 
    ? displayWorkers 
    : displayWorkers.filter(w => w.type === filterType);

  // Stats
  const stats = {
    total: displayWorkers.length,
    active: displayWorkers.filter(w => w.type === "active").length,
    backup: displayWorkers.filter(w => w.type === "backup").length,
    passive: displayWorkers.filter(w => w.type === "passive").length,
    healthy: displayWorkers.filter(w => w.status === "healthy").length,
    degraded: displayWorkers.filter(w => w.status === "degraded").length,
    down: displayWorkers.filter(w => w.status === "down").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-xl font-bold text-[#1a3a2a]">Worker Registry</h1>
        <p className="text-sm text-[#6b6556] mt-1">
          Track all workers, maintain backup/passive workers for failover.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Workers", value: stats.total, color: "#1a3a2a" },
          { label: "Active", value: stats.active, color: "#2d7a4f" },
          { label: "Backup", value: stats.backup, color: "#b8943f" },
          { label: "Passive", value: stats.passive, color: "#6b6556" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[#e6e0d0] rounded-xl p-5">
            <p className="text-xs text-[#6b6556] uppercase tracking-wide">{stat.label}</p>
            <p className="font-serif text-2xl font-bold mt-1" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Health Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Healthy", value: stats.healthy, color: "#2d7a4f", bg: "#dafbe1" },
          { label: "Degraded", value: stats.degraded, color: "#bf8700", bg: "#fff8c5" },
          { label: "Down", value: stats.down, color: "#cf222e", bg: "#ffebe9" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[#e6e0d0] rounded-xl p-5 flex items-center gap-4">
            <div className="w-3 h-3 rounded-full" style={{ background: stat.color }} />
            <div>
              <p className="text-xs text-[#6b6556] uppercase tracking-wide">{stat.label}</p>
              <p className="font-serif text-2xl font-bold mt-1" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#e6e0d0]">
        {[
          { id: "registry", label: "Worker Registry" },
          { id: "health", label: "Health Status" },
          { id: "incidents", label: "Incidents" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-[#b8943f] text-[#1a3a2a]"
                : "border-transparent text-[#6b6556] hover:text-[#1a3a2a]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["all", "active", "backup", "passive"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type as any)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filterType === type
                ? "bg-[#1a3a2a] text-white"
                : "bg-white text-[#6b6556] border border-[#e6e0d0] hover:bg-[#f4f0e8]"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Worker Registry */}
      {activeTab === "registry" && (
        <div className="space-y-4">
          {filteredWorkers.map((worker, i) => (
            <div key={i} className="bg-white border border-[#e6e0d0] rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: worker.status === "healthy" ? "#2d7a4f" : worker.status === "degraded" ? "#bf8700" : worker.status === "down" ? "#cf222e" : "#9b9484",
                    }}
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-[#1a3a2a]">{worker.name}</h3>
                    <p className="text-xs text-[#6b6556] mt-1">{worker.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-mono uppercase px-2 py-0.5 rounded"
                    style={{
                      background: worker.type === "active" ? "#dafbe1" : worker.type === "backup" ? "#f5ecd4" : "#f0ece4",
                      color: worker.type === "active" ? "#1a5d34" : worker.type === "backup" ? "#7a5c10" : "#9b9484",
                    }}
                  >
                    {worker.type}
                  </span>
                  <span
                    className="text-[10px] font-mono uppercase px-2 py-0.5 rounded"
                    style={{
                      background: worker.status === "healthy" ? "#dafbe1" : worker.status === "degraded" ? "#fff8c5" : worker.status === "down" ? "#ffebe9" : "#f0ece4",
                      color: worker.status === "healthy" ? "#1a5d34" : worker.status === "degraded" ? "#7a5500" : worker.status === "down" ? "#9a1a24" : "#9b9484",
                    }}
                  >
                    {worker.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-[#6b6556]">
                <span className="font-mono">{worker.url}</span>
                {worker.capabilities && (
                  <div className="flex gap-1 ml-auto">
                    {worker.capabilities.slice(0, 3).map((cap, j) => (
                      <span key={j} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f0ece4] text-[#9b9484]">
                        {cap}
                      </span>
                    ))}
                    {worker.capabilities.length > 3 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f0ece4] text-[#9b9484]">
                        +{worker.capabilities.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Health Status */}
      {activeTab === "health" && (
        <div className="bg-white border border-[#e6e0d0] rounded-xl p-6 text-center">
          <p className="text-[10px] text-[#9b9484] uppercase tracking-wide mb-2">Health Status</p>
          <p className="text-sm text-[#6b6556]">Real-time health monitoring for all workers.</p>
          <p className="text-xs text-[#9b9484] mt-2">Connect to MCP endpoint to view live health data.</p>
        </div>
      )}

      {/* Incidents */}
      {activeTab === "incidents" && (
        <div className="space-y-4">
          {incidents.length === 0 ? (
            <div className="bg-white border border-[#e6e0d0] rounded-xl p-6 text-center">
              <p className="text-[10px] text-[#9b9484] uppercase tracking-wide mb-2">No Incidents</p>
              <p className="text-sm text-[#6b6556]">All workers are operating normally.</p>
            </div>
          ) : (
            incidents.map((incident, i) => (
              <div key={i} className="bg-white border border-[#e6e0d0] rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#1a3a2a]">{incident.description}</h3>
                    <p className="text-xs text-[#6b6556] mt-1">Worker: {incident.worker_id}</p>
                  </div>
                  <span
                    className="text-[10px] font-mono uppercase px-2 py-0.5 rounded"
                    style={{
                      background: incident.severity === "critical" ? "#ffebe9" : incident.severity === "high" ? "#fff8c5" : incident.severity === "medium" ? "#ddf4ff" : "#f0ece4",
                      color: incident.severity === "critical" ? "#9a1a24" : incident.severity === "high" ? "#7a5500" : incident.severity === "medium" ? "#0a4a9a" : "#9b9484",
                    }}
                  >
                    {incident.severity}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-[#6b6556]">
                  <span>Type: {incident.type}</span>
                  <span>Started: {new Date(incident.started_at).toLocaleString()}</span>
                  {incident.resolved_at && <span>Resolved: {new Date(incident.resolved_at).toLocaleString()}</span>}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
