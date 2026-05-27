"use client"

import { useState } from "react"
import { Outlet, useNavigate, useLocation } from "react-router"
import {
  LayoutDashboard, Users, AlertTriangle, CheckCircle2,
  MessageSquare, BookOpen, Workflow, Settings,
  Building2, TrendingUp, BarChart3, Briefcase,
  Megaphone, DollarSign, Scale, Server, Globe,
  Handshake, Brain, Zap, ChevronLeft, ChevronRight,
  Bell, User, Search,
} from "lucide-react"

type Domain = "account-success" | "bizops"

const DOMAIN_NAV: Record<Domain, { sections: { label: string; items: { id: string; label: string; icon: typeof LayoutDashboard; path: string }[] }[] }> = {
  "account-success": {
    sections: [
      {
        label: "NAVIGATE",
        items: [
          { id: "dashboard",      label: "Dashboard",      icon: LayoutDashboard, path: "/app/account-success" },
          { id: "accounts",       label: "Accounts",        icon: Users,           path: "/app/account-success/accounts" },
          { id: "at-risk",        label: "At Risk",         icon: AlertTriangle,   path: "/app/account-success/at-risk" },
          { id: "tasks",          label: "Tasks",           icon: CheckCircle2,    path: "/app/account-success/tasks" },
          { id: "meetings",       label: "Meetings",        icon: MessageSquare,   path: "/app/account-success/meetings" },
          { id: "engagement-log", label: "Engagement Log",  icon: BookOpen,        path: "/app/account-success/engagement-log" },
        ],
      },
      {
        label: "INTELLIGENCE",
        items: [
          { id: "insights",   label: "Insights",   icon: Brain,    path: "/app/account-success/insights" },
          { id: "queue",      label: "Queue",      icon: Bell,     path: "/app/account-success/queue" },
          { id: "decisions",  label: "Decisions",  icon: Zap,      path: "/app/account-success/decisions" },
        ],
      },
      {
        label: "TOOLS",
        items: [
          { id: "twin",       label: "Twin",       icon: Brain,    path: "/app/account-success/twin" },
          { id: "knowledge",  label: "Knowledge",  icon: BookOpen, path: "/app/account-success/knowledge" },
          { id: "workflows",  label: "Workflows",  icon: Workflow, path: "/app/account-success/workflows" },
          { id: "settings",   label: "Settings",   icon: Settings, path: "/app/account-success/settings" },
        ],
      },
    ],
  },
  "bizops": {
    sections: [
      {
        label: "COMMAND",
        items: [
          { id: "dashboard",     label: "Dashboard",          icon: LayoutDashboard, path: "/app/bizops" },
          { id: "strategic-hub", label: "Strategic Hub",      icon: TrendingUp,      path: "/app/bizops/strategic-hub" },
          { id: "founder-ops",   label: "Founder Ops",        icon: User,            path: "/app/bizops/founder-ops" },
        ],
      },
      {
        label: "DEPARTMENTS",
        items: [
          { id: "marketing",  label: "Marketing",        icon: Megaphone,    path: "/app/bizops/marketing" },
          { id: "sales",      label: "Sales",            icon: TrendingUp,   path: "/app/bizops/sales" },
          { id: "cs",         label: "Customer Success", icon: Users,        path: "/app/bizops/cs" },
          { id: "product",    label: "Product & Eng",    icon: Zap,          path: "/app/bizops/product" },
          { id: "operations", label: "Operations",       icon: Workflow,     path: "/app/bizops/operations" },
          { id: "finance",    label: "Finance",          icon: DollarSign,   path: "/app/bizops/finance" },
          { id: "hr",         label: "Human Resources",  icon: Users,        path: "/app/bizops/hr" },
          { id: "legal",      label: "Legal",            icon: Scale,        path: "/app/bizops/legal" },
          { id: "bi",         label: "Business Intel",   icon: BarChart3,    path: "/app/bizops/bi" },
          { id: "it",         label: "IT & Infra",       icon: Server,       path: "/app/bizops/it" },
          { id: "partnerships", label: "Partnerships",   icon: Handshake,    path: "/app/bizops/partnerships" },
          { id: "knowledge",  label: "Knowledge",        icon: BookOpen,     path: "/app/bizops/knowledge" },
        ],
      },
      {
        label: "INTELLIGENCE",
        items: [
          { id: "bizops-today", label: "BizOps Today", icon: Brain,  path: "/app/bizops/today" },
          { id: "queue",        label: "Queue",         icon: Bell,   path: "/app/bizops/queue" },
          { id: "decisions",    label: "Decisions",     icon: Zap,    path: "/app/bizops/decisions" },
        ],
      },
      {
        label: "TOOLS",
        items: [
          { id: "twin",      label: "Twin",      icon: Brain,    path: "/app/bizops/twin" },
          { id: "knowledge", label: "Knowledge", icon: BookOpen, path: "/app/bizops/knowledge" },
          { id: "workflows", label: "Workflows", icon: Workflow, path: "/app/bizops/workflows" },
          { id: "settings",  label: "Settings",  icon: Settings, path: "/app/bizops/settings" },
        ],
      },
    ],
  },
}

const S = {
  rail:         "#111D14",
  sidebar:      "var(--forest)",
  sidebarBorder:"var(--forest-mid)",
  paper:        "var(--paper)",
  paperWarm:    "var(--paper-warm)",
  text:         "var(--paper)",
  textMuted:    "rgba(244,240,232,0.6)",
  textFaint:    "rgba(244,240,232,0.35)",
  gold:         "var(--gold)",
  goldLight:    "var(--gold-light)",
  activeBg:     "var(--accent-soft)",
  hoverBg:      "rgba(244,240,232,0.07)",
}

export function WorkbenchLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [domain, setDomain] = useState<Domain>("account-success")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [search, setSearch] = useState("")

  const nav = DOMAIN_NAV[domain]
  const isActive = (path: string) => location.pathname === path

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: S.paper, fontFamily: "var(--font-sans)" }}>

      {/* ── Left Rail (48px) ── */}
      <div
        className="flex flex-col items-center py-4 gap-3 shrink-0 z-20"
        style={{ width: 48, background: S.rail, borderRight: `1px solid ${S.sidebarBorder}` }}
      >
        {/* IW mark */}
        <div
          className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold mb-2 shrink-0"
          style={{ background: S.gold, color: S.sidebar, fontFamily: "var(--font-mono)" }}
        >
          IW
        </div>

        {/* Domain switchers */}
        <button
          onClick={() => { setDomain("account-success"); navigate("/app/account-success") }}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all text-[10px] font-bold"
          style={{
            background: domain === "account-success" ? S.activeBg : "transparent",
            color: domain === "account-success" ? S.gold : S.textMuted,
            border: `1px solid ${domain === "account-success" ? S.gold : "transparent"}`,
            fontFamily: "var(--font-mono)",
          }}
          title="Account Success"
        >
          AS
        </button>
        <button
          onClick={() => { setDomain("bizops"); navigate("/app/bizops") }}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all text-[9px] font-bold"
          style={{
            background: domain === "bizops" ? S.activeBg : "transparent",
            color: domain === "bizops" ? S.gold : S.textMuted,
            border: `1px solid ${domain === "bizops" ? S.gold : "transparent"}`,
            fontFamily: "var(--font-mono)",
          }}
          title="BizOps"
        >
          BO
        </button>

        <div className="flex-1" />

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarCollapsed(c => !c)}
          className="w-8 h-8 rounded flex items-center justify-center transition-all"
          style={{ color: S.textFaint }}
          onMouseEnter={e => (e.currentTarget.style.color = S.textMuted)}
          onMouseLeave={e => (e.currentTarget.style.color = S.textFaint)}
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* ── Expanded Sidebar ── */}
      {!sidebarCollapsed && (
        <div
          className="flex flex-col shrink-0 overflow-hidden"
          style={{ width: 256, background: S.sidebar, borderRight: `1px solid ${S.sidebarBorder}` }}
        >
          {/* Header */}
          <div className="px-4 py-3 shrink-0" style={{ borderBottom: `1px solid ${S.sidebarBorder}` }}>
            <p className="text-xs font-semibold" style={{ color: S.text, fontFamily: "var(--font-sans)" }}>
              {domain === "account-success" ? "Account Success" : "Business Operations"}
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: S.textFaint, fontFamily: "var(--font-mono)" }}>
              {domain === "account-success" ? "CUSTOMER PORTFOLIO" : "ORG COMMAND CENTER"}
            </p>
          </div>

          {/* Search */}
          <div className="px-3 py-2.5 shrink-0" style={{ borderBottom: `1px solid ${S.sidebarBorder}` }}>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3" style={{ color: S.textFaint }} />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-7 pr-3 py-1.5 rounded text-xs outline-none"
                style={{ background: "rgba(244,240,232,0.07)", border: `1px solid ${S.sidebarBorder}`, color: S.text }}
              />
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-4">
            {nav.sections.map(section => (
              <div key={section.label}>
                <p
                  className="px-3 mb-1 text-[10px] font-semibold tracking-widest"
                  style={{ color: S.textFaint, fontFamily: "var(--font-mono)" }}
                >
                  {section.label}
                </p>
                <div className="space-y-0.5">
                  {section.items
                    .filter(item => !search || item.label.toLowerCase().includes(search.toLowerCase()))
                    .map(item => {
                      const active = isActive(item.path)
                      return (
                        <button
                          key={item.id}
                          onClick={() => navigate(item.path)}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs transition-all"
                          style={{
                            background: active ? S.activeBg : "transparent",
                            color: active ? S.gold : S.textMuted,
                            fontWeight: active ? 600 : 400,
                          }}
                          onMouseEnter={e => { if (!active) e.currentTarget.style.background = S.hoverBg }}
                          onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent" }}
                        >
                          <item.icon className="w-3.5 h-3.5 shrink-0" style={{ color: active ? S.gold : S.textFaint }} />
                          {item.label}
                        </button>
                      )
                    })}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-4 py-3 shrink-0" style={{ borderTop: `1px solid ${S.sidebarBorder}` }}>
            <p className="text-[10px]" style={{ color: S.textFaint, fontFamily: "var(--font-mono)" }}>
              IntegrateWise · spine-org.pages.dev
            </p>
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto" style={{ background: S.paper }}>
        <Outlet />
      </main>
    </div>
  )
}
