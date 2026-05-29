"use client";

export default function SalesPage() {
  const deals = [
    { name: "Helix Pharma Expansion", value: "$180K", stage: "proposal", probability: 65, closeDate: "Jun 15", owner: "Marcus Lee" },
    { name: "Northwind Renewal", value: "$840K", stage: "negotiation", probability: 80, closeDate: "Jul 1", owner: "Anya Sharma" },
    { name: "Orion Capital Upsell", value: "$95K", stage: "discovery", probability: 30, closeDate: "Aug 30", owner: "Priya Iyer" },
    { name: "Brightwave Save", value: "$420K", stage: "qualification", probability: 45, closeDate: "Jul 15", owner: "Marcus Lee" },
  ];

  const pipeline = [
    { stage: "Discovery", count: 8, value: "$320K" },
    { stage: "Qualification", count: 5, value: "$475K" },
    { stage: "Proposal", count: 3, value: "$285K" },
    { stage: "Negotiation", count: 2, value: "$920K" },
    { stage: "Won", count: 4, value: "$1.2M" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-xl font-bold text-[#1a3a2a]">Sales</h1>
        <p className="text-sm text-[#6b6556] mt-1">Pipeline, deals, and revenue tracking.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Pipeline Value", value: "$1.2M", change: "+$180K this month", color: "#2d7a4f" },
          { label: "Win Rate", value: "34%", change: "+2%", color: "#2d7a4f" },
          { label: "Avg Deal Size", value: "$45K", change: "stable", color: "#6b6556" },
          { label: "Sales Velocity", value: "$45K/mo", change: "+$5K", color: "#2d7a4f" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[#e6e0d0] rounded-xl p-5">
            <p className="text-xs text-[#6b6556] uppercase tracking-wide">{stat.label}</p>
            <p className="font-serif text-2xl font-bold text-[#1a3a2a] mt-1">{stat.value}</p>
            <p className="text-xs mt-1" style={{ color: stat.color }}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Pipeline */}
      <div>
        <h2 className="font-serif text-lg font-bold text-[#1a3a2a] mb-4">Pipeline</h2>
        <div className="flex gap-2">
          {pipeline.map((stage) => (
            <div key={stage.stage} className="flex-1 bg-white border border-[#e6e0d0] rounded-xl p-4 text-center">
              <p className="text-xs text-[#6b6556] uppercase tracking-wide">{stage.stage}</p>
              <p className="font-serif text-lg font-bold text-[#1a3a2a] mt-1">{stage.count}</p>
              <p className="text-xs text-[#6b6556] font-mono">{stage.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Deals */}
      <div>
        <h2 className="font-serif text-lg font-bold text-[#1a3a2a] mb-4">Active Deals</h2>
        <div className="bg-white border border-[#e6e0d0] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e6e0d0]">
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Deal</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Value</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Stage</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Probability</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Close Date</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Owner</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal, i) => (
                <tr key={i} className="border-b border-[#e6e0d0] last:border-0">
                  <td className="px-5 py-3 text-sm text-[#1a3a2a] font-medium">{deal.name}</td>
                  <td className="px-5 py-3 text-sm text-[#6b6556] font-mono">{deal.value}</td>
                  <td className="px-5 py-3">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded" style={{
                      background: deal.stage === "won" ? "#dafbe1" : deal.stage === "negotiation" ? "#fff8c5" : "#ddf4ff",
                      color: deal.stage === "won" ? "#1a5d34" : deal.stage === "negotiation" ? "#7a5500" : "#0969da",
                    }}>
                      {deal.stage}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-[#6b6556] font-mono">{deal.probability}%</td>
                  <td className="px-5 py-3 text-sm text-[#6b6556] font-mono">{deal.closeDate}</td>
                  <td className="px-5 py-3 text-sm text-[#6b6556]">{deal.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
