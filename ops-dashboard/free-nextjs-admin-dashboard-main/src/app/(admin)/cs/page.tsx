"use client";

export default function CustomerSuccessPage() {
  const accounts = [
    { name: "Northwind Logistics", arr: "$840K", health: 62, renewal: "38d", risk: "high", csm: "Anya Sharma" },
    { name: "Helix Pharma", arr: "$520K", health: 78, renewal: "92d", risk: "low", csm: "Marcus Lee" },
    { name: "Brightwave Foods", arr: "$420K", health: 45, renewal: "15d", risk: "critical", csm: "Priya Iyer" },
    { name: "Orion Capital", arr: "$380K", health: 82, renewal: "180d", risk: "low", csm: "Anya Sharma" },
    { name: "Aperture Robotics", arr: "$290K", health: 71, renewal: "45d", risk: "medium", csm: "Marcus Lee" },
  ];

  const renewals = [
    { name: "Brightwave Foods", arr: "$420K", days: 15, status: "at-risk" },
    { name: "Northwind Logistics", arr: "$840K", days: 38, status: "needs-attention" },
    { name: "Aperture Robotics", arr: "$290K", days: 45, status: "on-track" },
    { name: "Stellar Foods", arr: "$180K", days: 62, status: "on-track" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-xl font-bold text-[#1a3a2a]">Customer Success</h1>
        <p className="text-sm text-[#6b6556] mt-1">Account health, renewals, and risk management.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Accounts", value: "18", change: "+2 this quarter", color: "#2d7a4f" },
          { label: "Avg Health Score", value: "74", change: "+3", color: "#2d7a4f" },
          { label: "Renewals 90D", value: "9", change: "$8.4M", color: "#bf8700" },
          { label: "At Risk", value: "5", change: "$3.1M", color: "#cf222e" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[#e6e0d0] rounded-xl p-5">
            <p className="text-xs text-[#6b6556] uppercase tracking-wide">{stat.label}</p>
            <p className="font-serif text-2xl font-bold text-[#1a3a2a] mt-1">{stat.value}</p>
            <p className="text-xs mt-1" style={{ color: stat.color }}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Accounts */}
      <div>
        <h2 className="font-serif text-lg font-bold text-[#1a3a2a] mb-4">Accounts</h2>
        <div className="bg-white border border-[#e6e0d0] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e6e0d0]">
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Account</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">ARR</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Health</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Renewal</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Risk</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">CSM</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, i) => (
                <tr key={i} className="border-b border-[#e6e0d0] last:border-0">
                  <td className="px-5 py-3 text-sm text-[#1a3a2a] font-medium">{account.name}</td>
                  <td className="px-5 py-3 text-sm text-[#6b6556] font-mono">{account.arr}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-mono font-bold" style={{
                        borderColor: account.health >= 80 ? "#2d7a4f" : account.health >= 60 ? "#bf8700" : "#cf222e",
                        color: account.health >= 80 ? "#2d7a4f" : account.health >= 60 ? "#bf8700" : "#cf222e",
                      }}>
                        {account.health}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-[#6b6556] font-mono">{account.renewal}</td>
                  <td className="px-5 py-3">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded" style={{
                      background: account.risk === "low" ? "#dafbe1" : account.risk === "medium" ? "#fff8c5" : account.risk === "high" ? "#fff8c5" : "#ffebe9",
                      color: account.risk === "low" ? "#1a5d34" : account.risk === "medium" ? "#7a5500" : account.risk === "high" ? "#7a5500" : "#9a1a24",
                    }}>
                      {account.risk}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-[#6b6556]">{account.csm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Renewals */}
      <div>
        <h2 className="font-serif text-lg font-bold text-[#1a3a2a] mb-4">Upcoming Renewals</h2>
        <div className="grid grid-cols-2 gap-4">
          {renewals.map((renewal, i) => (
            <div key={i} className="bg-white border border-[#e6e0d0] rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-[#1a3a2a]">{renewal.name}</h3>
                  <p className="text-xs text-[#6b6556] font-mono mt-1">{renewal.arr}</p>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded" style={{
                  background: renewal.status === "on-track" ? "#dafbe1" : renewal.status === "needs-attention" ? "#fff8c5" : "#ffebe9",
                  color: renewal.status === "on-track" ? "#1a5d34" : renewal.status === "needs-attention" ? "#7a5500" : "#9a1a24",
                }}>
                  {renewal.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#6b6556]">Renews in</span>
                <span className="font-mono text-sm font-bold text-[#1a3a2a]">{renewal.days} days</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
