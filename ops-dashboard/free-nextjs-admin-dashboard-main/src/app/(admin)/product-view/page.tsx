"use client";

import { useState } from "react";

/**
 * Product View Surface
 * 
 * Shows product-related data: features, roadmap, sprints, metrics
 * Connects via MCP to read from Spine
 */

export default function ProductViewPage() {
  const [activeTab, setActiveTab] = useState<"features" | "roadmap" | "sprints" | "metrics">("features");

  const features = [
    { name: "Knowledge Workbench", status: "shipped", sprint: "Sprint 12", points: 13, adoption: 78 },
    { name: "Twin Workbench", status: "in-progress", sprint: "Sprint 13", points: 21, adoption: 0 },
    { name: "Governance Surface", status: "in-progress", sprint: "Sprint 13", points: 13, adoption: 0 },
    { name: "Memory View", status: "backlog", sprint: "Sprint 14", points: 8, adoption: 0 },
    { name: "Triage Bot", status: "shipped", sprint: "Sprint 12", points: 8, adoption: 45 },
    { name: "Worker Registry", status: "shipped", sprint: "Sprint 12", points: 5, adoption: 60 },
    { name: "Agent Memory", status: "shipped", sprint: "Sprint 12", points: 8, adoption: 30 },
    { name: "MCP Connectors", status: "in-progress", sprint: "Sprint 13", points: 21, adoption: 0 },
  ];

  const roadmap = [
    { quarter: "Q2 2026", items: ["Knowledge Workbench", "Triage Bot", "MCP Connectors", "Agent Memory"] },
    { quarter: "Q3 2026", items: ["ADK Orchestrator", "Status Monitoring", "Error Handling", "Cache Memory"] },
    { quarter: "Q4 2026", items: ["Full Connector Suite", "Vector DB", "Relationship Graph", "Mobile App"] },
  ];

  const sprints = [
    { name: "Sprint 12", status: "completed", features: 5, points: 42 },
    { name: "Sprint 13", status: "active", features: 4, points: 56 },
    { name: "Sprint 14", status: "planned", features: 3, points: 32 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-xl font-bold text-[#1a3a2a]">Product View</h1>
        <p className="text-sm text-[#6b6556] mt-1">Features, roadmap, sprints, and product metrics.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Shipped Features", value: "4", color: "#2d7a4f" },
          { label: "In Progress", value: "3", color: "#0969da" },
          { label: "Backlog", value: "1", color: "#6b6556" },
          { label: "Total Points", value: "98", color: "#1a3a2a" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[#e6e0d0] rounded-xl p-5">
            <p className="text-xs text-[#6b6556] uppercase tracking-wide">{stat.label}</p>
            <p className="font-serif text-2xl font-bold mt-1" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#e6e0d0]">
        {["features", "roadmap", "sprints", "metrics"].map((tab) => (
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

      {/* Features Tab */}
      {activeTab === "features" && (
        <div className="bg-white border border-[#e6e0d0] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e6e0d0]">
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Feature</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Sprint</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Points</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Adoption</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr key={i} className="border-b border-[#e6e0d0] last:border-0">
                  <td className="px-5 py-3 text-sm text-[#1a3a2a] font-medium">{feature.name}</td>
                  <td className="px-5 py-3">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded" style={{
                      background: feature.status === "shipped" ? "#dafbe1" : feature.status === "in-progress" ? "#ddf4ff" : "#f0ece4",
                      color: feature.status === "shipped" ? "#1a5d34" : feature.status === "in-progress" ? "#0969da" : "#9b9484",
                    }}>
                      {feature.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-[#6b6556]">{feature.sprint}</td>
                  <td className="px-5 py-3 text-sm text-[#6b6556] font-mono">{feature.points}</td>
                  <td className="px-5 py-3 text-sm text-[#6b6556] font-mono">{feature.adoption}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Roadmap Tab */}
      {activeTab === "roadmap" && (
        <div className="space-y-4">
          {roadmap.map((quarter, i) => (
            <div key={i} className="bg-white border border-[#e6e0d0] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#1a3a2a] mb-3">{quarter.quarter}</h3>
              <div className="flex flex-wrap gap-2">
                {quarter.items.map((item, j) => (
                  <span key={j} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[#f4f0e8] text-[#1a3a2a]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sprints Tab */}
      {activeTab === "sprints" && (
        <div className="grid grid-cols-3 gap-4">
          {sprints.map((sprint, i) => (
            <div key={i} className="bg-white border border-[#e6e0d0] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#1a3a2a]">{sprint.name}</h3>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded" style={{
                  background: sprint.status === "completed" ? "#dafbe1" : sprint.status === "active" ? "#ddf4ff" : "#f0ece4",
                  color: sprint.status === "completed" ? "#1a5d34" : sprint.status === "active" ? "#0969da" : "#9b9484",
                }}>
                  {sprint.status}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-[#6b6556]">
                <span>{sprint.features} features</span>
                <span>{sprint.points} points</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Metrics Tab */}
      {activeTab === "metrics" && (
        <div className="bg-white border border-[#e6e0d0] rounded-xl p-6 text-center">
          <p className="text-[10px] text-[#9b9484] uppercase tracking-wide mb-2">Product Metrics</p>
          <p className="text-sm text-[#6b6556]">Connect to MCP endpoint to view live product metrics.</p>
        </div>
      )}
    </div>
  );
}
