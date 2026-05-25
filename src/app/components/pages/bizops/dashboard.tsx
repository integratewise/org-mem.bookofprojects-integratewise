import { useState } from "react"

type DeptId =
  | "overview"
  | "strategy"
  | "marketing"
  | "sales"
  | "cs"
  | "product"
  | "engineering"
  | "finance"
  | "hr"
  | "bi"
  | "it"
  | "ops"
  | "partnerships"

const DEPARTMENTS: { id: DeptId; label: string; icon: string }[] = [
  { id: "overview", label: "Company Overview", icon: "◎" },
  { id: "strategy", label: "Strategy & Leadership", icon: "◇" },
  { id: "marketing", label: "Marketing", icon: "◑" },
  { id: "sales", label: "Sales", icon: "◆" },
  { id: "cs", label: "Customer Success", icon: "◉" },
  { id: "product", label: "Product", icon: "◐" },
  { id: "engineering", label: "Engineering", icon: "◻" },
  { id: "finance", label: "Finance", icon: "◼" },
  { id: "hr", label: "Human Resources", icon: "◈" },
  { id: "bi", label: "BI & Analytics", icon: "✦" },
  { id: "it", label: "IT & Infrastructure", icon: "▣" },
  { id: "ops", label: "Operations", icon: "◍" },
  { id: "partnerships", label: "Partnerships & BD", icon: "◌" },
]

export default function BizOpsDashboard() {
  const [activeDept, setActiveDept] = useState<DeptId>("overview")
  const dept = DEPARTMENTS.find((d) => d.id === activeDept)!

  return (
    <div className="flex h-full">
      {/* Dept nav */}
      <div
        className="w-52 shrink-0 border-r overflow-y-auto h-full py-3"
        style={{ borderColor: "var(--border)", background: "var(--card)" }}
      >
        <p className="text-[10px] font-medium uppercase tracking-widest px-4 mb-2" style={{ color: "var(--ink-muted)" }}>
          13 Departments
        </p>
        {DEPARTMENTS.map((d) => (
          <button
            key={d.id}
            onClick={() => setActiveDept(d.id)}
            className="w-full text-left px-4 py-2.5 flex items-center gap-2 transition-colors hover:bg-[#EAE5D8]"
            style={{
              background: activeDept === d.id ? "var(--paper-dark)" : "transparent",
              borderLeft: activeDept === d.id ? "2px solid var(--gold)" : "2px solid transparent",
            }}
          >
            <span className="text-xs shrink-0" style={{ color: "var(--gold)" }}>{d.icon}</span>
            <span
              className="text-[11px]"
              style={{ color: activeDept === d.id ? "var(--forest)" : "var(--ink-muted)", fontWeight: activeDept === d.id ? 600 : 400 }}
            >
              {d.label}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6" style={{ background: "var(--paper)" }}>
        <div className="flex items-center gap-2 mb-5">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded"
            style={{ background: "var(--forest)", color: "var(--gold)" }}
          >
            BizOps
          </span>
          <h2
            className="text-sm font-semibold"
            style={{ color: "var(--forest)", fontFamily: "var(--font-lora), serif" }}
          >
            {dept.label}
          </h2>
        </div>

        {activeDept === "overview" && <OverviewDept />}
        {activeDept === "strategy" && <StrategyDept />}
        {activeDept === "marketing" && <MarketingDept />}
        {activeDept === "sales" && <SalesDept />}
        {activeDept === "cs" && <CSDept />}
        {activeDept === "product" && <ProductDept />}
        {activeDept === "engineering" && <EngineeringDept />}
        {activeDept === "finance" && <FinanceDept />}
        {activeDept === "hr" && <HRDept />}
        {activeDept === "bi" && <BIDept />}
        {activeDept === "it" && <ITDept />}
        {activeDept === "ops" && <OpsDept />}
        {activeDept === "partnerships" && <PartnershipsDept />}
      </div>
    </div>
  )
}

// ─── Shared UI ──────────────────────────────────────────────────────────────

function MetricCard({ label, value, sub, alert, positive }: { label: string; value: string; sub?: string; alert?: boolean; positive?: boolean }) {
  const color = alert ? "var(--health-red)" : positive ? "var(--health-green)" : "var(--forest)"
  return (
    <div className="rounded-lg p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
      <p className="text-[10px] font-medium uppercase tracking-wide mb-1" style={{ color: "var(--ink-muted)" }}>{label}</p>
      <p className="text-xl font-bold" style={{ color }}>{value}</p>
      {sub && <p className="text-[10px] mt-0.5" style={{ color: "var(--ink-muted)" }}>{sub}</p>}
    </div>
  )
}

function MetricRow({ label, value, target, pct, color }: { label: string; value: string; target: string; pct: number; color?: string }) {
  const c = color ?? "var(--forest-light)"
  return (
    <div className="rounded-lg p-3.5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>{label}</p>
        <div className="text-right">
          <span className="text-xs font-bold" style={{ color: "var(--forest)" }}>{value}</span>
          <span className="text-[10px] ml-1" style={{ color: "var(--ink-muted)" }}>/ {target}</span>
        </div>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
        <div className="h-full rounded-full" style={{ width: `${Math.min(pct, 100)}%`, background: c }} />
      </div>
    </div>
  )
}

function InsightBanner({ text, action }: { text: string; action: string }) {
  return (
    <div className="rounded-lg p-4 flex gap-3" style={{ background: "var(--forest)", border: "1px solid var(--forest-light)" }}>
      <span className="text-base shrink-0" style={{ color: "var(--gold)" }}>✦</span>
      <div>
        <p className="text-xs leading-relaxed mb-1.5" style={{ color: "var(--paper-dark)" }}>{text}</p>
        <p className="text-[10px] font-semibold" style={{ color: "var(--gold)" }}>→ {action}</p>
      </div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest mb-2 mt-5 first:mt-0" style={{ color: "var(--ink-muted)" }}>
      {children}
    </p>
  )
}

// ─── Departments ─────────────────────────────────────────────────────────────

function OverviewDept() {
  return (
    <div className="space-y-4">
      <InsightBanner
        text="MuleSoft consulting and CS automation projects are driving 60% of revenue. Advisory retainer offerings are under-indexed — expansion opportunity flagged. Two departments watching utilisation ceiling."
        action="Expand advisory retainer portfolio. Review implementation team capacity before next engagement."
      />

      <SectionTitle>Company Goals — YTD</SectionTitle>
      <div className="space-y-2">
        <MetricRow label="Revenue Target — ₹50L YTD" value="₹42.5L" target="₹50L" pct={85} />
        <MetricRow label="MRR Target — ₹6L" value="₹5.4L" target="₹6L" pct={90} />
        <MetricRow label="Pipeline — ₹1.5Cr" value="₹1.3Cr" target="₹1.5Cr" pct={87} />
        <MetricRow label="Deal Win Rate — 65%" value="60%" target="65%" pct={92} color="var(--health-amber)" />
      </div>

      <SectionTitle>All Departments — Status Snapshot</SectionTitle>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {[
          { dept: "Strategy", status: "On Track", health: 82 },
          { dept: "Marketing", status: "Watch", health: 62 },
          { dept: "Sales", status: "On Track", health: 78 },
          { dept: "Customer Success", status: "On Track", health: 74 },
          { dept: "Product", status: "On Track", health: 85 },
          { dept: "Engineering", status: "On Track", health: 80 },
          { dept: "Finance", status: "On Track", health: 91 },
          { dept: "HR", status: "On Track", health: 83 },
          { dept: "BI & Analytics", status: "On Track", health: 79 },
          { dept: "IT", status: "On Track", health: 88 },
          { dept: "Operations", status: "On Track", health: 76 },
          { dept: "Partnerships", status: "Watch", health: 63 },
        ].map((d) => (
          <div key={d.dept} className="rounded-lg p-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>{d.dept}</p>
              <span
                className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                style={{
                  background: d.status === "On Track" ? "#E8F5EE" : d.status === "At Risk" ? "#FDECEC" : "#FFF3E0",
                  color: d.status === "On Track" ? "var(--health-green)" : d.status === "At Risk" ? "var(--health-red)" : "var(--health-amber)",
                }}
              >
                {d.status}
              </span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${d.health}%`,
                  background: d.status === "On Track" ? "var(--health-green)" : d.status === "At Risk" ? "var(--health-red)" : "var(--health-amber)",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <SectionTitle>Connected Tools</SectionTitle>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
        {[
          { name: "Slack", status: "Connected" },
          { name: "HubSpot CRM", status: "Connected" },
          { name: "LinkedIn", status: "Connected" },
          { name: "Google Sheets", status: "Connected" },
          { name: "Google Analytics", status: "Connected" },
          { name: "Discord", status: "Connected" },
          { name: "Razorpay", status: "Connected" },
          { name: "Pipedrive", status: "Connected" },
          { name: "Asana", status: "Connected" },
        ].map((tool) => (
          <div key={tool.name} className="rounded-lg p-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>{tool.name}</p>
            <span className="text-[10px] font-medium" style={{ color: "var(--health-green)" }}>
              {tool.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StrategyDept() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="YTD Revenue" value="₹42.5L" sub="Target: ₹50L" />
        <MetricCard label="MRR" value="₹5.4L" sub="+8% MoM" positive />
        <MetricCard label="Pipeline" value="₹1.3Cr" sub="Active deals" positive />
        <MetricCard label="Win Rate" value="60%" sub="Target: 65%" />
      </div>
      <SectionTitle>Strategic OKRs</SectionTitle>
      <div className="space-y-2">
        <MetricRow label="Revenue — ₹50L YTD" value="₹42.5L" target="₹50L" pct={85} />
        <MetricRow label="MRR — ₹6L" value="₹5.4L" target="₹6L" pct={90} />
        <MetricRow label="Clients — 12 active" value="10 clients" target="12" pct={83} color="var(--health-amber)" />
        <MetricRow label="Win Rate — 65%" value="60%" target="65%" pct={92} color="var(--health-amber)" />
      </div>
      <InsightBanner
        text="MuleSoft consulting drives 60% of revenue. Advisory retainer expansion is the highest-leverage next move — low delivery overhead, high margin, repeatable."
        action="Define advisory retainer tiers. Target 3 new retainer conversions in next 60 days."
      />
    </div>
  )
}

function MarketingDept() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="Page Views" value="37,200" sub="Total" />
        <MetricCard label="Unique Visitors" value="28,300" sub="Total" positive />
        <MetricCard label="Total Conversions" value="1,482" sub="All channels" positive />
        <MetricCard label="Bounce Rate" value="28.2%" sub="Avg — good" positive />
      </div>
      <SectionTitle>Content Library</SectionTitle>
      <div className="space-y-2">
        {[
          { type: "Articles", count: "Active", channel: "Blog / LinkedIn" },
          { type: "Videos", count: "Active", channel: "YouTube / LinkedIn" },
          { type: "Ebooks", count: "Active", channel: "Lead capture" },
          { type: "Guides", count: "Active", channel: "SEO / Docs" },
          { type: "Newsletters", count: "Active", channel: "Email" },
        ].map((c) => (
          <div key={c.type} className="rounded-lg p-3.5 flex items-center gap-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex-1">
              <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>{c.type}</p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--ink-muted)" }}>{c.channel}</p>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "#E8F5EE", color: "var(--health-green)" }}>
              {c.count}
            </span>
          </div>
        ))}
      </div>
      <InsightBanner
        text="28,300 unique visitors with 1,482 conversions — conversion rate of 5.2%. Bounce rate of 28.2% is well below industry average. Content is working."
        action="Double down on highest-converting content types. Map conversion paths to service tiers."
      />
    </div>
  )
}

function SalesDept() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="Pipeline Value" value="₹1.3Cr" sub="Active deals" positive />
        <MetricCard label="Win Rate" value="60%" sub="YTD" positive />
        <MetricCard label="Total Clients" value="10" sub="7 active, 2 onboarding, 1 prospect" />
        <MetricCard label="YTD Revenue" value="₹42.5L" sub="Target: ₹50L" />
      </div>
      <SectionTitle>Revenue by Tier</SectionTitle>
      <div className="space-y-2">
        {[
          { tier: "Professional", pct: 60, color: "var(--forest)" },
          { tier: "Recurring", pct: 25, color: "var(--forest-light)" },
          { tier: "Digital", pct: 15, color: "var(--health-amber)" },
          { tier: "Scalable", pct: 10, color: "var(--health-green)" },
          { tier: "SaaS", pct: 5, color: "var(--gold)" },
        ].map((t) => (
          <div key={t.tier} className="rounded-lg p-3.5 flex items-center gap-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="w-28 shrink-0">
              <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>{t.tier}</p>
            </div>
            <div className="flex-1">
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                <div className="h-full rounded-full" style={{ width: `${t.pct}%`, background: t.color }} />
              </div>
            </div>
            <span className="text-xs font-bold shrink-0" style={{ color: "var(--forest)" }}>{t.pct}%</span>
          </div>
        ))}
      </div>
      <SectionTitle>Pipeline Stages</SectionTitle>
      <div className="space-y-2">
        {[
          { stage: "Discovery", deals: "-", value: "" },
          { stage: "Qualification", deals: "-", value: "" },
          { stage: "Proposal", deals: "-", value: "" },
          { stage: "Negotiation", deals: "-", value: "" },
        ].map((s) => (
          <div key={s.stage} className="rounded-lg p-3.5 flex items-center gap-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="text-xs font-semibold w-32 shrink-0" style={{ color: "var(--forest)" }}>{s.stage}</p>
            <div className="flex-1">
              <div className="h-1.5 rounded-full" style={{ background: "var(--border)" }} />
            </div>
            <span className="text-[10px]" style={{ color: "var(--ink-muted)" }}>Connect CRM</span>
          </div>
        ))}
      </div>
      <InsightBanner
        text="60% win rate is strong. 71 converted leads on record. Pipeline at ₹1.3Cr with 10 clients — 7 active, 2 onboarding, 1 prospect. Professional tier accounts for 60% of revenue."
        action="Prioritise onboarding completion for 2 new clients. Accelerate prospect conversion."
      />
    </div>
  )
}

function CSDept() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="Active Clients" value="7" sub="of 10 total" positive />
        <MetricCard label="Onboarding" value="2" sub="In progress" />
        <MetricCard label="Prospects" value="1" sub="Pipeline" />
        <MetricCard label="Support Utilization" value="75%" sub="Target: 80%" />
      </div>
      <SectionTitle>Core Services</SectionTitle>
      <div className="space-y-2">
        {[
          { name: "MuleSoft Consulting", revenue: "60% of revenue", status: "Core" },
          { name: "CS Automation", revenue: "Active", status: "Growing" },
          { name: "Integration CTO Advisory", revenue: "Retainer", status: "Expand" },
          { name: "Corporate Training", revenue: "Active", status: "Active" },
        ].map((s) => (
          <div key={s.name} className="rounded-lg p-3.5 flex items-center gap-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex-1">
              <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>{s.name}</p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--ink-muted)" }}>{s.revenue}</p>
            </div>
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded shrink-0"
              style={{
                background: s.status === "Core" ? "#E8F5EE" : s.status === "Expand" ? "#FFF3E0" : "var(--paper-dark)",
                color: s.status === "Core" ? "var(--health-green)" : s.status === "Expand" ? "var(--health-amber)" : "var(--ink-muted)",
              }}
            >
              {s.status}
            </span>
          </div>
        ))}
      </div>
      <InsightBanner
        text="MuleSoft projects drive 60% of revenue. Advisory retainer is under-indexed — highest margin, lowest delivery overhead. CS automation is a growing category."
        action="Convert Integration CTO Advisory to a formal retainer tier. Target 2 new retainer clients."
      />
    </div>
  )
}

function ProductDept() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="Total Offerings" value="12" sub="Across 5 tiers" />
        <MetricCard label="Service Tiers" value="5" sub="Prof · Recurring · Scalable · SaaS · Digital" />
        <MetricCard label="Community Tier" value="Active" positive />
        <MetricCard label="MRR" value="₹5.4L" sub="+8% MoM" positive />
      </div>
      <SectionTitle>Offering Catalog — 12 Services</SectionTitle>
      <div className="space-y-2">
        {[
          { name: "MuleSoft Consulting", tier: "Professional", billing: "Project", status: "Active" },
          { name: "CS Automation", tier: "Professional", billing: "Project", status: "Active" },
          { name: "Integration CTO Advisory", tier: "Recurring", billing: "Retainer", status: "Active" },
          { name: "Corporate Training", tier: "Professional", billing: "Fixed", status: "Active" },
          { name: "SaaS Platform Access", tier: "SaaS", billing: "Monthly", status: "Active" },
          { name: "Digital Products", tier: "Digital", billing: "One-time", status: "Active" },
          { name: "Scalable Implementation", tier: "Scalable", billing: "Milestone", status: "Active" },
          { name: "Community Access", tier: "Community", billing: "Free/Paid", status: "Active" },
        ].map((o) => (
          <div key={o.name} className="rounded-lg p-3.5 flex items-center gap-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex-1">
              <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>{o.name}</p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--ink-muted)" }}>{o.billing}</p>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ background: "var(--paper-dark)", color: "var(--forest)" }}>
              {o.tier}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "#E8F5EE", color: "var(--health-green)" }}>
              {o.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function EngineeringDept() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="Implementation Util." value="90%" sub="Target: 90%" positive />
        <MetricCard label="Consulting Util." value="85%" sub="Target: 88%" />
        <MetricCard label="Support Util." value="75%" sub="Target: 80%" />
        <MetricCard label="AI Models Active" value="4" sub="GPT-4, Claude, Gemini, Groq" positive />
      </div>
      <SectionTitle>Team Utilization</SectionTitle>
      <div className="space-y-2">
        <MetricRow label="Implementation Team" value="90%" target="90%" pct={100} />
        <MetricRow label="Consulting Team" value="85%" target="88%" pct={97} color="var(--health-amber)" />
        <MetricRow label="Support Team" value="75%" target="80%" pct={94} color="var(--health-amber)" />
      </div>
      <SectionTitle>AI Models</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "OpenAI GPT-4", status: "Active" },
          { name: "OpenAI GPT-3.5", status: "Active" },
          { name: "Claude (Anthropic)", status: "Active" },
          { name: "Gemini (Google)", status: "Active" },
          { name: "Groq", status: "Active" },
        ].map((m) => (
          <div key={m.name} className="rounded-lg p-3 flex items-center justify-between" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>{m.name}</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#2D7A4F" }} />
              <span className="text-[10px]" style={{ color: "var(--health-green)" }}>{m.status}</span>
            </div>
          </div>
        ))}
      </div>
      <InsightBanner
        text="Implementation team is at capacity (90%). Consulting at 85% — 3% headroom. Any new project intake requires capacity planning first."
        action="Assess project pipeline against team capacity before committing new engagements."
      />
    </div>
  )
}

function FinanceDept() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="MRR" value="₹5.4L" sub="+8% MoM" positive />
        <MetricCard label="YTD Revenue" value="₹42.5L" sub="Target: ₹50L" />
        <MetricCard label="Pipeline" value="₹1.3Cr" sub="Total opportunity" positive />
        <MetricCard label="Payment Gateway" value="Razorpay" sub="Connected" positive />
      </div>
      <SectionTitle>Revenue by Tier — Distribution</SectionTitle>
      <div className="space-y-2">
        {[
          { tier: "Professional", share: 60, revenue: "₹25.5L" },
          { tier: "Recurring", share: 25, revenue: "₹10.6L" },
          { tier: "Digital", share: 15, revenue: "₹6.4L" },
          { tier: "Scalable", share: 10, revenue: "₹4.3L" },
          { tier: "SaaS", share: 5, revenue: "₹2.1L" },
        ].map((d) => (
          <div key={d.tier} className="rounded-lg p-3.5 flex items-center gap-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="w-28 shrink-0">
              <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>{d.tier}</p>
            </div>
            <div className="flex-1">
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                <div className="h-full rounded-full" style={{ width: `${d.share}%`, background: "var(--forest-light)" }} />
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-bold" style={{ color: "var(--forest)" }}>{d.revenue}</span>
              <span className="text-[10px] ml-1" style={{ color: "var(--ink-muted)" }}>{d.share}%</span>
            </div>
          </div>
        ))}
      </div>
      <InsightBanner
        text="Professional tier dominates at 60% of revenue. Recurring at 25% provides stability. Growing recurring share reduces delivery risk and improves predictability."
        action="Target 30% recurring revenue mix by EOY. Prioritise retainer conversion for top 3 accounts."
      />
    </div>
  )
}

function HRDept() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="Implementation Util." value="90%" sub="At capacity" positive />
        <MetricCard label="Consulting Util." value="85%" sub="Target: 88%" />
        <MetricCard label="Support Util." value="75%" sub="Target: 80%" />
        <MetricCard label="AI Workforce" value="Active" sub="4 models integrated" positive />
      </div>
      <SectionTitle>Team Capacity by Function</SectionTitle>
      <div className="space-y-2">
        <MetricRow label="Implementation" value="90%" target="90%" pct={100} />
        <MetricRow label="Consulting" value="85%" target="88%" pct={97} color="var(--health-amber)" />
        <MetricRow label="Support" value="75%" target="80%" pct={94} color="var(--health-amber)" />
      </div>
      <InsightBanner
        text="Implementation team at ceiling. New project intake will require hiring or offboarding existing lower-priority work. Consulting has 3% headroom only."
        action="Define hiring plan for implementation team. Assess contractor capacity as buffer."
      />
    </div>
  )
}

function BIDept() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="Connected Platforms" value="9" sub="All operational" positive />
        <MetricCard label="AI Models" value="4" sub="GPT-4 · Claude · Gemini · Groq" positive />
        <MetricCard label="Page Views" value="37,200" sub="Total" />
        <MetricCard label="Conversions" value="1,482" sub="5.2% rate" positive />
      </div>
      <SectionTitle>Key Cross-Department Signals</SectionTitle>
      <div className="space-y-2">
        {[
          { signal: "Revenue ↔ Services", finding: "MuleSoft consulting drives 60% of revenue. Advisory retainer at <5% — significant expansion gap.", severity: "High" },
          { signal: "Marketing ↔ Sales", finding: "28,300 unique visitors converting at 5.2%. Bounce rate 28.2% — well below industry average. Content quality is high.", severity: "Low" },
          { signal: "CS ↔ Pipeline", finding: "10 clients total: 7 active, 2 onboarding, 1 prospect. 60% win rate is above benchmark.", severity: "Low" },
          { signal: "Capacity ↔ Growth", finding: "Implementation team at 90% utilisation. Pipeline growth requires capacity planning before new commitments.", severity: "High" },
        ].map((s) => (
          <div key={s.signal} className="rounded-lg p-3.5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold" style={{ color: "var(--gold)" }}>{s.signal}</span>
              <span
                className="text-[10px] px-1.5 py-0.5 rounded"
                style={{
                  background: s.severity === "High" ? "#FDECEC" : s.severity === "Medium" ? "#FFF3E0" : "var(--paper-dark)",
                  color: s.severity === "High" ? "var(--health-red)" : s.severity === "Medium" ? "var(--health-amber)" : "var(--ink-muted)",
                }}
              >
                {s.severity}
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--forest)" }}>{s.finding}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ITDept() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="Connected Platforms" value="9" sub="All healthy" positive />
        <MetricCard label="AI Models" value="4" sub="All active" positive />
        <MetricCard label="Admin Email" value="admin@" sub="integratewise.com" />
        <MetricCard label="Demo User" value="demo@" sub="integratewise.online" />
      </div>
      <SectionTitle>Connected Systems</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "Slack", status: "Connected" },
          { name: "HubSpot CRM", status: "Connected" },
          { name: "LinkedIn", status: "Connected" },
          { name: "Google Sheets", status: "Connected" },
          { name: "Google Analytics", status: "Connected" },
          { name: "Discord", status: "Connected" },
          { name: "Razorpay", status: "Connected" },
          { name: "Pipedrive", status: "Connected" },
          { name: "Asana", status: "Connected" },
        ].map((sys) => (
          <div key={sys.name} className="rounded-lg p-3 flex items-center justify-between" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>{sys.name}</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#2D7A4F" }} />
              <span className="text-[10px]" style={{ color: "var(--health-green)" }}>{sys.status}</span>
            </div>
          </div>
        ))}
      </div>
      <SectionTitle>AI Infrastructure</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "OpenAI GPT-4", status: "Active" },
          { name: "OpenAI GPT-3.5", status: "Active" },
          { name: "Claude (Anthropic)", status: "Active" },
          { name: "Gemini (Google)", status: "Active" },
          { name: "Groq", status: "Active" },
        ].map((m) => (
          <div key={m.name} className="rounded-lg p-3 flex items-center justify-between" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>{m.name}</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#2D7A4F" }} />
              <span className="text-[10px]" style={{ color: "var(--health-green)" }}>{m.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function OpsDept() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="Workspace" value="IntegrateWise" sub="integratewise.app" />
        <MetricCard label="Total Clients" value="10" sub="7 active · 2 onboarding · 1 prospect" />
        <MetricCard label="Win Rate" value="60%" sub="YTD" positive />
        <MetricCard label="Converted Leads" value="71" sub="On record" positive />
      </div>
      <SectionTitle>Operational Metrics</SectionTitle>
      <div className="space-y-2">
        <MetricRow label="Implementation Utilisation" value="90%" target="90%" pct={100} />
        <MetricRow label="Consulting Utilisation" value="85%" target="88%" pct={97} color="var(--health-amber)" />
        <MetricRow label="Support Utilisation" value="75%" target="80%" pct={94} color="var(--health-amber)" />
        <MetricRow label="Pipeline Coverage" value="₹1.3Cr" target="₹1.5Cr" pct={87} />
      </div>
      <InsightBanner
        text="All core operations healthy. Implementation at ceiling — no new project intake without capacity review. Ops is running lean with 9 connected platforms and 4 AI models active."
        action="Review capacity before Q3 pipeline conversion. Define onboarding SLA for 2 new clients."
      />
    </div>
  )
}

function PartnershipsDept() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="Core Services" value="4" sub="MuleSoft · CS Auto · Advisory · Training" />
        <MetricCard label="Revenue Contribution" value="60%" sub="MuleSoft projects" />
        <MetricCard label="Advisory Retainers" value="Under-indexed" sub="Expansion opportunity" alert />
        <MetricCard label="Pipeline" value="₹1.3Cr" positive />
      </div>
      <SectionTitle>Service Partnership Signals</SectionTitle>
      <div className="space-y-2">
        {[
          { name: "MuleSoft Ecosystem", type: "Platform", signal: "60% of revenue", status: "Core" },
          { name: "Integration CTO Advisory", type: "Retainer", signal: "Expand — high margin", status: "Grow" },
          { name: "CS Automation", type: "Service", signal: "Growing category", status: "Grow" },
          { name: "Corporate Training", type: "Service", signal: "Active", status: "Active" },
        ].map((p) => (
          <div key={p.name} className="rounded-lg p-3.5 flex items-center gap-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex-1">
              <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>{p.name}</p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--ink-muted)" }}>{p.type} · {p.signal}</p>
            </div>
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded shrink-0"
              style={{
                background: p.status === "Core" ? "#E8F5EE" : p.status === "Grow" ? "#FFF3E0" : "var(--paper-dark)",
                color: p.status === "Core" ? "var(--health-green)" : p.status === "Grow" ? "var(--health-amber)" : "var(--ink-muted)",
              }}
            >
              {p.status}
            </span>
          </div>
        ))}
      </div>
      <InsightBanner
        text="Advisory retainer is the highest-leverage expansion move. Low delivery overhead, high margin, predictable revenue. Currently under-indexed vs project-based work."
        action="Define formal advisory retainer tiers. Pitch to top 3 current clients in next 30 days."
      />
    </div>
  )
}
