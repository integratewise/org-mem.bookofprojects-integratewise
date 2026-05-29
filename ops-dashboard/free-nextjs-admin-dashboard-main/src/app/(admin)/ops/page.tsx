"use client";

export default function OperationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-xl font-bold text-[#1a3a2a]">Operations</h1>
        <p className="text-sm text-[#6b6556] mt-1">Processes, incidents, and operational health.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Active Processes", value: "28", change: "stable", color: "#6b6556" },
          { label: "Open Incidents", value: "2", change: "-1 this week", color: "#2d7a4f" },
          { label: "Automation", value: "72%", change: "+3%", color: "#2d7a4f" },
          { label: "Compliance", value: "95%", change: "stable", color: "#2d7a4f" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[#e6e0d0] rounded-xl p-5">
            <p className="text-xs text-[#6b6556] uppercase tracking-wide">{stat.label}</p>
            <p className="font-serif text-2xl font-bold text-[#1a3a2a] mt-1">{stat.value}</p>
            <p className="text-xs mt-1" style={{ color: stat.color }}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#e6e0d0] rounded-xl p-6 text-center">
        <p className="text-[10px] text-[#9b9484] uppercase tracking-wide mb-2">Operations View</p>
        <p className="text-sm text-[#6b6556]">Process management, incident tracking, and runbooks coming soon.</p>
      </div>
    </div>
  );
}
