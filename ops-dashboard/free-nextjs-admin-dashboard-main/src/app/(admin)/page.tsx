"use client";

import { useState, useEffect } from "react";
import { useOrgMemory, useProposals, useSignals, useEntities } from "@/hooks/use-mcp";

// Department data (will be replaced with MCP data)
const departments = [
  {
    name: "Marketing",
    icon: "📢",
    color: "#b8943f",
    metrics: {
      campaigns: 12,
      leads: 847,
      conversion: 3.2,
      budget: "$24K",
    },
    status: "active",
  },
  {
    name: "Sales",
    icon: "💰",
    color: "#2d7a4f",
    metrics: {
      pipeline: "$1.2M",
      deals: 23,
      winRate: 34,
      velocity: "$45K/mo",
    },
    status: "active",
  },
  {
    name: "Customer Success",
    icon: "🤝",
    color: "#0969da",
    metrics: {
      accounts: 18,
      health: 74,
      renewals: 9,
      atRisk: 5,
    },
    status: "warning",
  },
  {
    name: "Product",
    icon: "📦",
    color: "#8250df",
    metrics: {
      features: 14,
      sprints: 3,
      velocity: 42,
      adoption: 68,
    },
    status: "active",
  },
  {
    name: "Operations",
    icon: "⚙️",
    color: "#bf8700",
    metrics: {
      processes: 28,
      incidents: 2,
      automation: 72,
      compliance: 95,
    },
    status: "active",
  },
  {
    name: "Finance",
    icon: "💵",
    color: "#cf222e",
    metrics: {
      revenue: "$24.6K",
      expenses: "$18.2K",
      burn: "$6.4K",
      runway: "14mo",
    },
    status: "active",
  },
  {
    name: "HR",
    icon: "👥",
    color: "#0969da",
    metrics: {
      team: 12,
      hiring: 3,
      attrition: 8,
      satisfaction: 82,
    },
    status: "active",
  },
  {
    name: "Legal",
    icon: "⚖️",
    color: "#6b7280",
    metrics: {
      contracts: 15,
      compliance: 98,
      policies: 12,
      risk: 2,
    },
    status: "active",
  },
];

export default function Dashboard() {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  
  // MCP hooks
  const { search: searchOrgMemory, isLoading: memoryLoading } = useOrgMemory();
  const { list: listProposals, isLoading: proposalsLoading } = useProposals();
  const { list: listSignals, isLoading: signalsLoading } = useSignals();
  const { list: listEntities, isLoading: entitiesLoading } = useEntities();

  // State for MCP data
  const [orgMemory, setOrgMemory] = useState<any[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [signals, setSignals] = useState<any[]>([]);
  const [entities, setEntities] = useState<any[]>([]);

  // Fetch data via MCP on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch org memory
        const memoryResult = await searchOrgMemory({ category: 'doctrine', limit: 10 });
        setOrgMemory(memoryResult?.items || []);

        // Fetch proposals
        const proposalsResult = await listProposals({ status: 'pending_review', limit: 10 });
        setProposals(proposalsResult?.proposals || []);

        // Fetch signals
        const signalsResult = await listSignals({ limit: 10 });
        setSignals(signalsResult?.signals || []);

        // Fetch entities
        const entitiesResult = await listEntities('account', { limit: 10 });
        setEntities(entitiesResult?.entities || []);
      } catch (error) {
        console.error('Failed to fetch MCP data:', error);
      }
    };

    fetchData();
  }, [searchOrgMemory, listProposals, listSignals, listEntities]);

  // Twin signals (from MCP or fallback)
  const twinSignals = signals.length > 0 ? signals.map(signal => ({
    type: signal.band?.toUpperCase() || 'CONTEXT',
    account: signal.title || 'Unknown',
    description: signal.description || '',
    source: signal.source || 'MCP',
    time: new Date(signal.created_at).toLocaleString(),
  })) : [
    {
      type: "RISK",
      account: "Northwind Logistics",
      description: "Champion silent 14 days. Renewal in 38 days.",
      source: "CRM",
      time: "12m ago",
    },
    {
      type: "OPPORTUNITY",
      account: "Helix Pharma",
      description: "Expansion signals detected. Engage this week.",
      source: "PRODUCT",
      time: "2h ago",
    },
    {
      type: "MEMORY",
      account: "Brightwave Foods",
      description: "Q3 invoice variance detected. Review needed.",
      source: "FINANCE",
      time: "4h ago",
    },
    {
      type: "CONTEXT",
      account: "Aperture Robotics",
      description: "CSAT score dropped 12 points. Investigate.",
      source: "SUPPORT",
      time: "1d ago",
    },
  ];

  return (
    <div className="flex h-screen bg-[#f4f0e8]">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-[#f4f0e8]/90 backdrop-blur-sm border-b border-[#c4baa8] px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-xl font-bold text-[#1a3a2a]">
                Ops Dashboard
              </h1>
              <p className="text-sm text-[#6b6556] mt-1">
                All departments, one surface. Connected via MCP.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-[#6b6556]">Portfolio ARR</p>
                <p className="font-mono text-lg font-bold text-[#1a3a2a]">$24.6M</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#6b6556]">At Risk</p>
                <p className="font-mono text-lg font-bold text-[#cf222e]">$3.1M</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#6b6556]">Health Score</p>
                <p className="font-mono text-lg font-bold text-[#2d7a4f]">74</p>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Row */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Total ARR", value: "$24.6M", change: "+4.2%", color: "#2d7a4f" },
              { label: "At-Risk ARR", value: "$3.1M", change: "-1.8%", color: "#cf222e" },
              { label: "Renewals 90D", value: "$8.4M", change: "12 accounts", color: "#bf8700" },
              { label: "Avg Health", value: "74", change: "+3", color: "#0969da" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-[#e6e0d0] rounded-xl p-5"
              >
                <p className="text-xs text-[#6b6556] uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className="font-serif text-2xl font-bold text-[#1a3a2a] mt-1">
                  {stat.value}
                </p>
                <p className="text-xs mt-1" style={{ color: stat.color }}>
                  {stat.change}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* MCP Status */}
        <div className="px-8 pb-4">
          <div className="bg-white border border-[#e6e0d0] rounded-xl p-4 flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-[#2d7a4f]"></div>
            <p className="text-sm text-[#1a3a2a]">
              Connected via MCP — {orgMemory.length} memory items, {proposals.length} pending proposals, {signals.length} signals
            </p>
            <p className="text-xs text-[#6b6556] ml-auto">
              Last sync: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Department Grid */}
        <div className="px-8 pb-6">
          <h2 className="font-serif text-lg font-bold text-[#1a3a2a] mb-4">
            Departments
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {departments.map((dept) => (
              <div
                key={dept.name}
                className={`bg-white border rounded-xl p-5 cursor-pointer transition-all hover:shadow-md ${
                  selectedDept === dept.name
                    ? "border-[#b8943f] shadow-md"
                    : "border-[#e6e0d0]"
                }`}
                onClick={() => setSelectedDept(dept.name)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{dept.icon}</span>
                  <div>
                    <h3 className="font-semibold text-[#1a3a2a]">{dept.name}</h3>
                    <span
                      className="text-[10px] font-mono uppercase px-2 py-0.5 rounded"
                      style={{
                        background:
                          dept.status === "active"
                            ? "#dafbe1"
                            : dept.status === "warning"
                            ? "#fff8c5"
                            : "#ffebe9",
                        color:
                          dept.status === "active"
                            ? "#1a5d34"
                            : dept.status === "warning"
                            ? "#7a5500"
                            : "#9a1a24",
                      }}
                    >
                      {dept.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(dept.metrics).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-[10px] text-[#6b6556] uppercase">
                        {key}
                      </p>
                      <p className="font-mono text-sm font-semibold text-[#1a3a2a]">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="px-8 pb-8">
          <h2 className="font-serif text-lg font-bold text-[#1a3a2a] mb-4">
            Recent Activity
          </h2>
          <div className="bg-white border border-[#e6e0d0] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e6e0d0]">
                  <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">
                    Action
                  </th>
                  <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">
                    Department
                  </th>
                  <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">
                    User
                  </th>
                  <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    action: "Campaign approved",
                    dept: "Marketing",
                    user: "Anya Sharma",
                    time: "12m ago",
                  },
                  {
                    action: "Deal won: Helix Pharma",
                    dept: "Sales",
                    user: "Marcus Lee",
                    time: "2h ago",
                  },
                  {
                    action: "Risk flagged: Northwind",
                    dept: "Customer Success",
                    user: "Twin",
                    time: "4h ago",
                  },
                  {
                    action: "Sprint completed",
                    dept: "Product",
                    user: "Priya Iyer",
                    time: "1d ago",
                  },
                ].map((activity, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#e6e0d0] last:border-0"
                  >
                    <td className="px-5 py-3 text-sm text-[#1a3a2a]">
                      {activity.action}
                    </td>
                    <td className="px-5 py-3 text-sm text-[#6b6556]">
                      {activity.dept}
                    </td>
                    <td className="px-5 py-3 text-sm text-[#6b6556]">
                      {activity.user}
                    </td>
                    <td className="px-5 py-3 text-xs text-[#9b9484] font-mono">
                      {activity.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Twin Strip */}
      <div className="w-[320px] bg-[#1a3a2a] border-l border-[#2d5a3d] flex flex-col">
        {/* Twin Header */}
        <div className="px-5 py-4 border-b border-[#2d5a3d]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#b8943f] flex items-center justify-center">
              <span className="text-sm">🧠</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#e8e0d0]">Twin</p>
              <p className="text-[10px] text-[#7a9a84] font-mono">
                WATCHING — Reasoning from MCP + Spine
              </p>
            </div>
          </div>
        </div>

        {/* Focus Context */}
        <div className="px-5 py-3 border-b border-[#2d5a3d]">
          <p className="text-[10px] text-[#5a7a64] uppercase tracking-wide mb-1">
            Focus
          </p>
          <p className="text-xs text-[#d4ab5a] font-medium">
            Portfolio Overview
          </p>
        </div>

        {/* Signals */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <p className="text-[10px] text-[#5a7a64] uppercase tracking-wide mb-3">
            Signals ({signalsLoading ? '...' : twinSignals.length})
          </p>
          <div className="space-y-3">
            {twinSignals.map((signal, i) => (
              <div
                key={i}
                className="bg-white/5 rounded-lg p-3 border border-white/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded"
                    style={{
                      background:
                        signal.type === "RISK"
                          ? "#cf222e20"
                          : signal.type === "OPPORTUNITY"
                          ? "#2d7a4f20"
                          : signal.type === "MEMORY"
                          ? "#b8943f20"
                          : "#0969da20",
                      color:
                        signal.type === "RISK"
                          ? "#cf222e"
                          : signal.type === "OPPORTUNITY"
                          ? "#2d7a4f"
                          : signal.type === "MEMORY"
                          ? "#b8943f"
                          : "#0969da",
                    }}
                  >
                    {signal.type}
                  </span>
                  <span className="text-[10px] text-[#7a9a84]">
                    {signal.source}
                  </span>
                  <span className="text-[10px] text-[#5a7a64] ml-auto">
                    {signal.time}
                  </span>
                </div>
                <p className="text-xs font-medium text-[#e8e0d0] mb-1">
                  {signal.account}
                </p>
                <p className="text-[11px] text-[#8a9a84] leading-relaxed">
                  {signal.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Twin Input */}
        <div className="px-5 py-4 border-t border-[#2d5a3d]">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Think with Twin..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-[#e8e0d0] placeholder-[#5a7a64] outline-none focus:border-[#b8943f]"
            />
            <button className="w-8 h-8 rounded-lg bg-[#b8943f] flex items-center justify-center hover:bg-[#d4ac5a] transition-colors">
              <svg
                className="w-4 h-4 text-[#1a3a2a]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
