"use client";

export default function MarketingPage() {
  const campaigns = [
    { name: "Q2 Product Launch", status: "active", budget: "$12K", spent: "$8.4K", leads: 234, conversion: 4.2 },
    { name: "LinkedIn Thought Leadership", status: "active", budget: "$5K", spent: "$3.2K", leads: 156, conversion: 2.8 },
    { name: "Email Nurture Sequence", status: "paused", budget: "$3K", spent: "$2.1K", leads: 89, conversion: 5.1 },
    { name: "Webinar Series", status: "draft", budget: "$8K", spent: "$0", leads: 0, conversion: 0 },
  ];

  const content = [
    { title: "Blog: Memory-Native OS", type: "blog", status: "published", views: 1247, shares: 89 },
    { title: "Case Study: $8M Account", type: "case-study", status: "draft", views: 0, shares: 0 },
    { title: "One-Pager v2", type: "one-pager", status: "review", views: 0, shares: 0 },
    { title: "Social: Feature Announcement", type: "social", status: "scheduled", views: 0, shares: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-xl font-bold text-[#1a3a2a]">Marketing</h1>
        <p className="text-sm text-[#6b6556] mt-1">Campaigns, content, and social media performance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Active Campaigns", value: "12", change: "+2 this month", color: "#2d7a4f" },
          { label: "Total Leads", value: "847", change: "+124 this week", color: "#2d7a4f" },
          { label: "Conversion Rate", value: "3.2%", change: "+0.4%", color: "#2d7a4f" },
          { label: "Budget Spent", value: "$13.7K", change: "of $28K", color: "#bf8700" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[#e6e0d0] rounded-xl p-5">
            <p className="text-xs text-[#6b6556] uppercase tracking-wide">{stat.label}</p>
            <p className="font-serif text-2xl font-bold text-[#1a3a2a] mt-1">{stat.value}</p>
            <p className="text-xs mt-1" style={{ color: stat.color }}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Campaigns */}
      <div>
        <h2 className="font-serif text-lg font-bold text-[#1a3a2a] mb-4">Campaigns</h2>
        <div className="bg-white border border-[#e6e0d0] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e6e0d0]">
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Campaign</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Budget</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Leads</th>
                <th className="text-left px-5 py-3 text-[10px] font-semibold text-[#6b6556] uppercase tracking-wide">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign, i) => (
                <tr key={i} className="border-b border-[#e6e0d0] last:border-0">
                  <td className="px-5 py-3 text-sm text-[#1a3a2a] font-medium">{campaign.name}</td>
                  <td className="px-5 py-3">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded" style={{
                      background: campaign.status === "active" ? "#dafbe1" : campaign.status === "paused" ? "#fff8c5" : "#f0ece4",
                      color: campaign.status === "active" ? "#1a5d34" : campaign.status === "paused" ? "#7a5500" : "#9b9484",
                    }}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-[#6b6556] font-mono">{campaign.budget}</td>
                  <td className="px-5 py-3 text-sm text-[#6b6556] font-mono">{campaign.leads}</td>
                  <td className="px-5 py-3 text-sm text-[#6b6556] font-mono">{campaign.conversion}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content */}
      <div>
        <h2 className="font-serif text-lg font-bold text-[#1a3a2a] mb-4">Content</h2>
        <div className="grid grid-cols-2 gap-4">
          {content.map((item, i) => (
            <div key={i} className="bg-white border border-[#e6e0d0] rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-[#1a3a2a]">{item.title}</h3>
                  <p className="text-xs text-[#6b6556] mt-1">{item.type}</p>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded" style={{
                  background: item.status === "published" ? "#dafbe1" : item.status === "draft" ? "#f0ece4" : "#ddf4ff",
                  color: item.status === "published" ? "#1a5d34" : item.status === "draft" ? "#9b9484" : "#0969da",
                }}>
                  {item.status}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-[#6b6556]">
                <span>{item.views} views</span>
                <span>{item.shares} shares</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
