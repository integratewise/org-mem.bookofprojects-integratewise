"use client";

export default function LegalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-xl font-bold text-[#1a3a2a]">Legal</h1>
        <p className="text-sm text-[#6b6556] mt-1">Contracts, compliance, and risk management.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Active Contracts", value: "15", change: "3 pending review", color: "#bf8700" },
          { label: "Compliance", value: "98%", change: "GDPR, SOC2", color: "#2d7a4f" },
          { label: "Policies", value: "12", change: "all current", color: "#2d7a4f" },
          { label: "Risk Items", value: "2", change: "medium severity", color: "#bf8700" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[#e6e0d0] rounded-xl p-5">
            <p className="text-xs text-[#6b6556] uppercase tracking-wide">{stat.label}</p>
            <p className="font-serif text-2xl font-bold text-[#1a3a2a] mt-1">{stat.value}</p>
            <p className="text-xs mt-1" style={{ color: stat.color }}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#e6e0d0] rounded-xl p-6 text-center">
        <p className="text-[10px] text-[#9b9484] uppercase tracking-wide mb-2">Legal View</p>
        <p className="text-sm text-[#6b6556]">Contract management, compliance tracking, and policy enforcement coming soon.</p>
      </div>
    </div>
  );
}
