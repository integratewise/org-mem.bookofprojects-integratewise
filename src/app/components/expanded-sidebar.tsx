"use client"

import { useState } from "react"

type ActiveProduct = "account-success" | "bizops"
type Account = { id: string; name: string; health: string; arr: number; renewal: number; nps: number; csm: string }
type Department = { id: string; name: string; members: number }

const NAV_ITEMS_AS = [
  { id: "personal", label: "Personal" },
  { id: "work", label: "Work" },
]

const NAV_ITEMS_BIZOPS = [
  { id: "overview", label: "Company Overview" },
  { id: "account-success", label: "Account Success" },
  { id: "strategy", label: "Strategy & Leadership" },
  { id: "marketing", label: "Marketing" },
  { id: "sales", label: "Sales" },
  { id: "product", label: "Product & Eng" },
  { id: "finance", label: "Finance" },
  { id: "hr", label: "Human Resources" },
  { id: "operations", label: "Operations" },
  { id: "legal", label: "Legal & Compliance" },
  { id: "bi", label: "BI & Analytics" },
  { id: "it", label: "IT & Infrastructure" },
]

// Real IW accounts — INR, India-based
const SAMPLE_ACCOUNTS = [
  { id: "1", name: "Axiom Capital", health: "healthy", arr: 38, renewal: 94, nps: 72, csm: "Nirmal" },
  { id: "2", name: "MedCore Health", health: "risk", arr: 22, renewal: 28, nps: 38, csm: "Priya" },
  { id: "3", name: "TechStack SaaS", health: "healthy", arr: 18, renewal: 187, nps: 81, csm: "Karan" },
  { id: "4", name: "Vantage Infra", health: "critical", arr: 48, renewal: 11, nps: 14, csm: "Nirmal" },
  { id: "5", name: "Crestline Mfg", health: "healthy", arr: 26, renewal: 142, nps: 62, csm: "Priya" },
]

const SAMPLE_DEPARTMENTS = [
  { id: "marketing", name: "Marketing", members: 3 },
  { id: "sales", name: "Sales", members: 4 },
  { id: "engineering", name: "Engineering", members: 6 },
  { id: "finance", name: "Finance", members: 2 },
  { id: "product", name: "Product", members: 3 },
  { id: "cs", name: "Customer Success", members: 5 },
  { id: "ops", name: "Operations", members: 2 },
]

interface ExpandedSidebarProps {
  activeProduct: ActiveProduct
  onProductChange: (p: ActiveProduct) => void
  activeNavItem?: string
  onNavItemChange?: (id: string) => void
}

// Forest sidebar — paper text on forest background
const S = {
  sidebar:      "var(--forest)",
  border:       "var(--forest-mid)",
  text:         "var(--paper)",
  textMuted:    "rgba(244,240,232,0.65)",
  textFaint:    "rgba(244,240,232,0.4)",
  activeTab:    "var(--gold)",
  activeTabText:"var(--forest)",
  hoverBg:      "rgba(244,240,232,0.07)",
  activeBg:     "rgba(184,148,63,0.15)",
  activeText:   "var(--gold)",
  inputBg:      "rgba(244,240,232,0.08)",
  cardBg:       "rgba(244,240,232,0.07)",
  cardHover:    "rgba(184,148,63,0.12)",
  filterActive: "var(--gold)",
  filterBorder: "var(--forest-mid)",
}

export default function ExpandedSidebar({
  activeProduct,
  onProductChange,
  activeNavItem,
  onNavItemChange,
}: ExpandedSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<string>("all")

  const navItems = activeProduct === "account-success" ? NAV_ITEMS_AS : NAV_ITEMS_BIZOPS
  const listData = activeProduct === "account-success" ? SAMPLE_ACCOUNTS : SAMPLE_DEPARTMENTS

  const filteredData = searchQuery
    ? listData.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : activeProduct === "account-success" && selectedFilter !== "all"
      ? SAMPLE_ACCOUNTS.filter((a) => a.health === selectedFilter)
      : listData

  return (
    <aside
      className="w-80 shrink-0 flex flex-col border-r overflow-hidden"
      style={{ background: S.sidebar, borderColor: S.border }}
    >
      {/* Header — Wordmark & Product Switcher */}
      <div className="px-5 py-4 border-b" style={{ borderColor: S.border }}>
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
            style={{ background: S.activeTab, color: S.activeTabText }}
          >
            IW
          </div>
          <span className="text-xs font-semibold tracking-wide" style={{ color: S.text }}>
            IntegrateWise
          </span>
        </div>

        {/* Product Tabs */}
        <div className="flex gap-2">
          {(["account-success", "bizops"] as const).map((product) => (
            <button
              key={product}
              onClick={() => onProductChange(product)}
              className="flex-1 px-2 py-1.5 rounded text-xs font-medium transition-colors"
              style={{
                background: activeProduct === product ? S.activeTab : "transparent",
                color: activeProduct === product ? S.activeTabText : S.textMuted,
                border: `1px solid ${activeProduct === product ? S.activeTab : S.border}`,
              }}
            >
              {product === "account-success" ? "AS" : "BizOps"}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="px-3 py-3 border-b" style={{ borderColor: S.border }}>
        <p className="text-xs font-medium uppercase tracking-widest mb-2 px-2" style={{ color: S.textFaint }}>
          Navigate
        </p>
        <div className="space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavItemChange?.(item.id)}
              className="w-full text-left px-3 py-2 rounded text-xs transition-colors"
              style={{
                color: activeNavItem === item.id ? S.activeText : S.textMuted,
                background: activeNavItem === item.id ? S.activeBg : "transparent",
                fontWeight: activeNavItem === item.id ? 600 : 400,
              }}
              onMouseEnter={(e) => {
                if (activeNavItem !== item.id)
                  (e.currentTarget as HTMLElement).style.background = S.hoverBg
              }}
              onMouseLeave={(e) => {
                if (activeNavItem !== item.id)
                  (e.currentTarget as HTMLElement).style.background = "transparent"
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Search & Filters */}
      <div className="px-3 py-3 border-b space-y-2.5" style={{ borderColor: S.border }}>
        <input
          type="text"
          placeholder={activeProduct === "account-success" ? "Search accounts..." : "Search departments..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 rounded text-xs border outline-none"
          style={{
            borderColor: S.border,
            background: S.inputBg,
            color: S.text,
          }}
        />

        {activeProduct === "account-success" && (
          <div className="flex gap-1.5">
            {["all", "healthy", "risk", "critical"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className="flex-1 px-1.5 py-1 rounded text-[10px] font-medium transition-colors"
                style={{
                  background: selectedFilter === filter ? S.filterActive : "transparent",
                  color: selectedFilter === filter ? S.activeTabText : S.textMuted,
                  border: `1px solid ${selectedFilter === filter ? S.filterActive : S.filterBorder}`,
                }}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* List — Accounts or Departments */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <p className="text-xs font-medium uppercase tracking-widest mb-2 px-2" style={{ color: S.textFaint }}>
          {activeProduct === "account-success" ? "Accounts" : "Departments"}
        </p>

        <div className="space-y-1.5">
          {activeProduct === "account-success"
            ? (filteredData as Account[]).map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-lg border cursor-pointer transition-all"
              style={{ borderColor: S.border, background: S.cardBg }}
              onMouseEnter={(e) => (e.currentTarget.style.background = S.cardHover)}
              onMouseLeave={(e) => (e.currentTarget.style.background = S.cardBg)}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold" style={{ color: S.text }}>{item.name}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: S.textMuted }}>₹{item.arr}L ARR</p>
                </div>
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0"
                  style={{
                    background: item.health === "healthy" ? "rgba(61,122,80,0.25)" : item.health === "risk" ? "rgba(184,148,63,0.25)" : "rgba(139,32,32,0.3)",
                    color: item.health === "healthy" ? "var(--gold-light)" : item.health === "risk" ? "var(--gold)" : "#F09090",
                  }}
                >
                  {item.health.charAt(0).toUpperCase() + item.health.slice(1)}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div>
                  <p style={{ color: S.textFaint }}>Renewal</p>
                  <p className="font-semibold" style={{ color: item.renewal <= 30 ? "#F09090" : S.text }}>{item.renewal}d</p>
                </div>
                <div>
                  <p style={{ color: S.textFaint }}>NPS</p>
                  <p className="font-semibold" style={{ color: item.nps < 40 ? "#F09090" : S.text }}>{item.nps}</p>
                </div>
                <div>
                  <p style={{ color: S.textFaint }}>CSM</p>
                  <p className="font-semibold text-[9px]" style={{ color: S.textMuted }}>{item.csm}</p>
                </div>
              </div>
            </div>
          ))
            : (filteredData as Department[]).map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-lg border cursor-pointer transition-all"
              style={{ borderColor: S.border, background: S.cardBg }}
              onMouseEnter={(e) => (e.currentTarget.style.background = S.cardHover)}
              onMouseLeave={(e) => (e.currentTarget.style.background = S.cardBg)}
            >
              <p className="text-xs font-semibold" style={{ color: S.text }}>{item.name}</p>
              <p className="text-[10px] mt-0.5" style={{ color: S.textMuted }}>{item.members} members</p>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Views */}
      <div className="px-3 py-3 border-t" style={{ borderColor: S.border }}>
        <p className="text-xs font-medium uppercase tracking-widest mb-2 px-2" style={{ color: S.textFaint }}>
          Views
        </p>
        <div className="space-y-0.5">
          {["Recent", "Favorites", "Pinned"].map((view) => (
            <button
              key={view}
              className="w-full text-left px-3 py-1.5 rounded text-xs transition-colors"
              style={{ color: S.textMuted }}
              onMouseEnter={(e) => (e.currentTarget.style.background = S.hoverBg)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {view}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
