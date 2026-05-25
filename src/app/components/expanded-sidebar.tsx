"use client"

import { useState } from "react"
import type { ActiveProduct } from "@/app/page"

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
  { id: "product", label: "Product" },
  { id: "engineering", label: "Engineering" },
  { id: "finance", label: "Finance" },
  { id: "hr", label: "Human Resources" },
  { id: "operations", label: "Operations" },
  { id: "legal", label: "Legal & Compliance" },
  { id: "bi", label: "BI & Analytics" },
  { id: "communications", label: "Communications" },
]

// Sample data with comprehensive real values
const SAMPLE_ACCOUNTS = [
  { id: "1", name: "Axiom Financial", health: "healthy", arr: 420, renewal: 94, nps: 72, csm: "Sarah" },
  { id: "2", name: "MedCore Health", health: "risk", arr: 310, renewal: 28, nps: 38, csm: "Marcus" },
  { id: "3", name: "Stellarworks SaaS", health: "healthy", arr: 195, renewal: 187, nps: 81, csm: "Priya" },
  { id: "4", name: "Vantage Telecom", health: "critical", arr: 540, renewal: 11, nps: 14, csm: "Sarah" },
  { id: "5", name: "Crestline Mfg", health: "healthy", arr: 260, renewal: 142, nps: 62, csm: "Marcus" },
]

const SAMPLE_DEPARTMENTS = [
  { id: "marketing", name: "Marketing", members: 8 },
  { id: "sales", name: "Sales", members: 12 },
  { id: "engineering", name: "Engineering", members: 15 },
  { id: "finance", name: "Finance", members: 5 },
  { id: "product", name: "Product", members: 6 },
]

interface ExpandedSidebarProps {
  activeProduct: ActiveProduct
  onProductChange: (p: ActiveProduct) => void
  activeNavItem?: string
  onNavItemChange?: (id: string) => void
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
    : listData

  return (
    <aside
      className="w-80 shrink-0 flex flex-col border-r overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Header - Wordmark & Product Switcher */}
      <div className="px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
            style={{ background: "var(--gold)", color: "var(--forest)" }}
          >
            IW
          </div>
          <span className="text-xs font-semibold tracking-wide" style={{ color: "var(--forest)" }}>
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
                background: activeProduct === product ? "var(--gold)" : "transparent",
                color: activeProduct === product ? "var(--forest)" : "var(--ink-muted)",
                border: `1px solid ${activeProduct === product ? "var(--gold)" : "var(--border)"}`,
              }}
            >
              {product === "account-success" ? "AS" : "BizOps"}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="px-3 py-3 border-b" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs font-medium uppercase tracking-widest mb-2 px-2" style={{ color: "var(--ink-muted)" }}>
          Navigate
        </p>
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavItemChange?.(item.id)}
              className="w-full text-left px-3 py-2 rounded text-xs transition-colors hover:bg-[#F5EBE0]"
              style={{
                color: activeNavItem === item.id ? "var(--forest)" : "var(--ink-muted)",
                background: activeNavItem === item.id ? "rgba(255, 193, 7, 0.1)" : "transparent",
                fontWeight: activeNavItem === item.id ? 600 : 400,
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Search & Filters */}
      <div className="px-3 py-3 border-b space-y-3" style={{ borderColor: "var(--border)" }}>
        <input
          type="text"
          placeholder={activeProduct === "account-success" ? "Search accounts..." : "Search departments..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 rounded text-xs border"
          style={{ borderColor: "var(--border)", background: "var(--paper)" }}
        />

        {/* Filters */}
        {activeProduct === "account-success" && (
          <div className="flex gap-2">
            {["all", "healthy", "risk", "critical"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className="flex-1 px-2 py-1 rounded text-[10px] font-medium transition-colors"
                style={{
                  background: selectedFilter === filter ? "var(--forest)" : "transparent",
                  color: selectedFilter === filter ? "var(--gold)" : "var(--ink-muted)",
                  border: `1px solid ${selectedFilter === filter ? "var(--forest)" : "var(--border)"}`,
                }}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* List - Accounts or Departments */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <p className="text-xs font-medium uppercase tracking-widest mb-2 px-2" style={{ color: "var(--ink-muted)" }}>
          {activeProduct === "account-success" ? "Accounts" : "Departments"}
        </p>

        <div className="space-y-2">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-lg border cursor-pointer transition-all hover:border-[var(--gold)]"
              style={{
                borderColor: "var(--border)",
                background: "var(--paper)",
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>
                    {item.name}
                  </p>
                  {activeProduct === "account-success" && (
                    <p className="text-[10px] mt-0.5" style={{ color: "var(--ink-muted)" }}>
                      ${item.arr}K ARR
                    </p>
                  )}
                </div>
                {activeProduct === "account-success" && (
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0"
                    style={{
                      background: item.health === "healthy" ? "#E8F5EE" : item.health === "risk" ? "#FFF3E0" : "#FDECEC",
                      color: item.health === "healthy" ? "var(--health-green)" : item.health === "risk" ? "var(--health-amber)" : "var(--health-red)",
                    }}
                  >
                    {item.health.charAt(0).toUpperCase() + item.health.slice(1)}
                  </span>
                )}
              </div>

              {activeProduct === "account-success" && (
                <div className="grid grid-cols-3 gap-2 text-[10px]">
                  <div>
                    <p style={{ color: "var(--ink-muted)" }}>Renewal</p>
                    <p className="font-semibold" style={{ color: item.renewal <= 30 ? "var(--health-red)" : "var(--forest)" }}>
                      {item.renewal}d
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "var(--ink-muted)" }}>NPS</p>
                    <p className="font-semibold" style={{ color: item.nps < 40 ? "var(--health-red)" : "var(--forest)" }}>
                      {item.nps}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "var(--ink-muted)" }}>CSM</p>
                    <p className="font-semibold text-[9px]" style={{ color: "var(--forest)" }}>
                      {item.csm}
                    </p>
                  </div>
                </div>
              )}
              {activeProduct === "bizops" && (
                <p className="text-[10px]" style={{ color: "var(--ink-muted)" }}>
                  {item.members} members
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Saved Views */}
      <div className="px-3 py-3 border-t" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs font-medium uppercase tracking-widest mb-2 px-2" style={{ color: "var(--ink-muted)" }}>
          Views
        </p>
        <div className="space-y-1">
          {["Recent", "Favorites", "Pinned"].map((view) => (
            <button
              key={view}
              className="w-full text-left px-3 py-1.5 rounded text-xs transition-colors hover:bg-[#F5EBE0]"
              style={{ color: "var(--ink-muted)" }}
            >
              {view}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
