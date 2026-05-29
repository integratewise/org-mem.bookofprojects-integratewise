"use client";

export default function ProductPage() {
  const features = [
    { name: "Knowledge Workbench", status: "shipped", sprint: "Sprint 12", points: 13, adoption: 78 },
    { name: "Twin Workbench", status: "in-progress", sprint: "Sprint 13", points: 21, adoption: 0 },
    { name: "Governance Surface", status: "in-progress", sprint: "Sprint 13", points: 13, adoption: 0 },
    { name: "Memory View", status: "backlog", sprint: "Sprint 14", points: 8, adoption: 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-xl font-bold text-[#1a3a2a]">Product</h1>
        <p className="text-sm text-[#6b6556] mt-1">Features, roadmap, and sprint tracking.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Active Features", value: "14", change: "+3 this sprint", color: "#2d7a4f" },
          { label: "Sprint Velocity", value: "42", change: "points/sprint", color: "#6b6556" },
          { label: "Adoption Rate", value: "68%", change: "+5%", color: "#2d7a4f" },
          { label: "Tech Debt", value: "12", change: "items", color: "#bf8700" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[#e6e0d0] rounded-xl p-5">
            <p className="text-xs text-[#6b6556] uppercase tracking-wide">{stat.label}</p>
            <p className="font-serif text-2xl font-bold text-[#1a3a2a] mt-1">{stat.value}</p>
            <p className="text-xs mt-1" style={{ color: stat.color }}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-serif text-lg font-bold text-[#1a3a2a] mb-4">Features</h2>
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
      </div>
    </div>
  );
}
