"use client";

import { useState } from "react";

/**
 * Customer Zero Ops Surface
 * 
 * Dogfooding surface for IntegrateWise.
 * Shows operational data for the first customer (us).
 * 
 * This is where we eat our own dog food.
 */

export default function CustomerZeroPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "accounts" | "signals" | "health">("dashboard");

  // Customer Zero data (IntegrateWise eating its own dog food)
  const metrics = {
    totalARR: "$0",
    accounts: 1,
    health: 95,
    signals: 3,
    tasks: 8,
    proposals: 2,
  };

  const signals = [
    { type: "RISK", source: "Pipeline", message: "MCP endpoint latency +50ms", level: "warn" },
    { type: "OPPORTUNITY", source: "Product", message: "Knowledge Workbench adoption +15%", level: "ok" },
    { type: "MEMORY", source: "Governance", message: "3 pending proposals need review", level: "warn" },
  ];

  const tasks = [
    { name: "Set OPENROUTER_API_KEY", status: "open", priority: "critical" },
    { name: "Set DATABASE_URL", status: "open", priority: "critical" },
    { name: "Wire agent memory to org_memory", status: "in-progress", priority: "high" },
    { name: "Connect quick-start-ui to MCP", status: "open", priority: "high" },
    { name: "Connect BI UI to MCP", status: "open", priority: "high" },
    { name: "Build event logger", status: "open", priority: "medium" },
    { name: "Build status monitoring", status: "open", priority: "medium" },
    { name: "Build error handling", status: "open", priority: "medium" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-xl font-bold text-[#1a3a2a]">Customer Zero</h1>
        <p className="text-sm text-[#6b6556] mt-1">Dogfooding surface — we eat our own dog food here.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total ARR", value: metrics.totalARR, color: "#1a3a2a" },
          { label: "Accounts", value: String(metrics.accounts), color: "#2d7a4f" },
          { label: "Health Score", value: String(metrics.health), color: "#2d7a4f" },
          { label: "Active Signals", value: String(metrics.signals), color: "#bf8700" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[#e6e0d0] rounded-xl p-5">
            <p className="text-xs text-[#6b6556] uppercase tracking-wide">{stat.label}</p>
            <p className="font-serif text-2xl font-bold mt-1" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#e6e0d0]">
        {["dashboard", "accounts", "signals", "health"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-[#b8943f] text-[#1a3a2a]"
                : "border-transparent text-[#6b6556] hover:text-[#1a3a2a]"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Dashboard Tab */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* Pending Tasks */}
          <div>
            <h2 className="font-serif text-lg font-bold text-[#1a3a2a] mb-4">Pending Tasks</h2>
            <div className="bg-white border border-[#e6e0d0] rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e6e0d0]">
                    <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Task</th>
                    <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Status</th>
                    <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, i) => (
                    <tr key={i} className="border-b border-[#e6e0d0] last:border-0">
                      <td className="px-5 py-3 text-sm text-[#1a3a2a]">{task.name}</td>
                      <td className="px-5 py-3">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded" style={{
                          background: task.status === "in-progress" ? "#ddf4ff" : "#f0ece4",
                          color: task.status === "in-progress" ? "#0969da" : "#9b9484",
                        }}>
                          {task.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded" style={{
                          background: task.priority === "critical" ? "#ffebe9" : task.priority === "high" ? "#fff8c5" : "#f0ece4",
                          color: task.priority === "critical" ? "#9a1a24" : task.priority === "high" ? "#7a5500" : "#9b9484",
                        }}>
                          {task.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Signals */}
          <div>
            <h2 className="font-serif text-lg font-bold text-[#1a3a2a] mb-4">Active Signals</h2>
            <div className="space-y-3">
              {signals.map((signal, i) => (
                <div key={i} className="bg-white border border-[#e6e0d0] rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <span
                      className="text-[10px] font-mono uppercase px-2 py-0.5 rounded"
                      style={{
                        background: signal.type === "RISK" ? "#ffebe9" : signal.type === "OPPORTUNITY" ? "#dafbe1" : "#ddf4ff",
                        color: signal.type === "RISK" ? "#9a1a24" : signal.type === "OPPORTUNITY" ? "#1a5d34" : "#0969da",
                      }}
                    >
                      {signal.type}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-[#1a3a2a]">{signal.message}</p>
                      <p className="text-xs text-[#6b6556] mt-1">Source: {signal.source}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Accounts Tab */}
      {activeTab === "accounts" && (
        <div className="bg-white border border-[#e6e0d0] rounded-xl p-6 text-center">
          <p className="text-[10px] text-[#9b9484] uppercase tracking-wide mb-2">Customer Zero Account</p>
          <p className="text-sm text-[#6b6556]">IntegrateWise (dogfooding our own product)</p>
          <p className="text-xs text-[#9b9484] mt-2">Connect to MCP to view live account data.</p>
        </div>
      )}

      {/* Signals Tab */}
      {activeTab === "signals" && (
        <div className="space-y-4">
          {signals.map((signal, i) => (
            <div key={i} className="bg-white border border-[#e6e0d0] rounded-xl p-5">
              <div className="flex items-start gap-3">
                <span
                  className="text-[10px] font-mono uppercase px-2 py-0.5 rounded"
                  style={{
                    background: signal.type === "RISK" ? "#ffebe9" : signal.type === "OPPORTUNITY" ? "#dafbe1" : "#ddf4ff",
                    color: signal.type === "RISK" ? "#9a1a24" : signal.type === "OPPORTUNITY" ? "#1a5d34" : "#0969da",
                  }}
                >
                  {signal.type}
                </span>
                <div>
                  <p className="text-sm font-medium text-[#1a3a2a]">{signal.message}</p>
                  <p className="text-xs text-[#6b6556] mt-1">Source: {signal.source}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Health Tab */}
      {activeTab === "health" && (
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "MCP Connector", status: "healthy", latency: "45ms" },
            { name: "Gateway", status: "healthy", latency: "32ms" },
            { name: "Think", status: "healthy", latency: "128ms" },
            { name: "Knowledge", status: "healthy", latency: "56ms" },
            { name: "Govern", status: "healthy", latency: "23ms" },
            { name: "Pipeline", status: "healthy", latency: "89ms" },
          ].map((service, i) => (
            <div key={i} className="bg-white border border-[#e6e0d0] rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-[#2d7a4f]" />
                <h3 className="text-sm font-semibold text-[#1a3a2a]">{service.name}</h3>
              </div>
              <div className="flex gap-4 text-xs text-[#6b6556]">
                <span>Status: {service.status}</span>
                <span>Latency: {service.latency}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
