"use client";

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-xl font-bold text-[#1a3a2a]">Finance</h1>
        <p className="text-sm text-[#6b6556] mt-1">Revenue, expenses, and budget tracking.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Revenue", value: "$24.6K", change: "+4.2%", color: "#2d7a4f" },
          { label: "Expenses", value: "$18.2K", change: "stable", color: "#6b6556" },
          { label: "Burn Rate", value: "$6.4K", change: "-$1.2K", color: "#2d7a4f" },
          { label: "Runway", value: "14mo", change: "stable", color: "#2d7a4f" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[#e6e0d0] rounded-xl p-5">
            <p className="text-xs text-[#6b6556] uppercase tracking-wide">{stat.label}</p>
            <p className="font-serif text-2xl font-bold text-[#1a3a2a] mt-1">{stat.value}</p>
            <p className="text-xs mt-1" style={{ color: stat.color }}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#e6e0d0] rounded-xl p-6 text-center">
        <p className="text-[10px] text-[#9b9484] uppercase tracking-wide mb-2">Finance View</p>
        <p className="text-sm text-[#6b6556]">Revenue dashboard, expense tracking, and budget management coming soon.</p>
      </div>
    </div>
  );
}
