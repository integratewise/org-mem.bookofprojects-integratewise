"use client";

export default function HRPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-xl font-bold text-[#1a3a2a]">Human Resources</h1>
        <p className="text-sm text-[#6b6556] mt-1">Team, hiring, and people operations.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Team Size", value: "12", change: "+2 this quarter", color: "#2d7a4f" },
          { label: "Open Roles", value: "3", change: "Engineering, Sales, CS", color: "#bf8700" },
          { label: "Attrition", value: "8%", change: "industry avg: 12%", color: "#2d7a4f" },
          { label: "Satisfaction", value: "82%", change: "+5%", color: "#2d7a4f" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[#e6e0d0] rounded-xl p-5">
            <p className="text-xs text-[#6b6556] uppercase tracking-wide">{stat.label}</p>
            <p className="font-serif text-2xl font-bold text-[#1a3a2a] mt-1">{stat.value}</p>
            <p className="text-xs mt-1" style={{ color: stat.color }}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#e6e0d0] rounded-xl p-6 text-center">
        <p className="text-[10px] text-[#9b9484] uppercase tracking-wide mb-2">HR View</p>
        <p className="text-sm text-[#6b6556]">Team directory, hiring pipeline, and performance tracking coming soon.</p>
      </div>
    </div>
  );
}
