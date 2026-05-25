import { useState } from "react";
import {
  Brain, Briefcase, Heart, Shield, Settings,
  Search, ChevronRight, User, Building2, TrendingUp,
  BarChart3, Users, FileText, Layers,
  Zap, Target, Megaphone, DollarSign, Handshake,
  Scale, Lightbulb, Server, Globe, MessageSquare,
  LayoutDashboard, Rocket, Bell, GitBranch,
  AlertTriangle, CheckCircle, Clock, Eye, BriefcaseBusiness,
  Workflow, BookOpen, Plug
} from "lucide-react";

/* ─── Types ─── */
type Room = "twin" | "ops" | "kb";
type CTX = "bizops" | "account-success";

interface SidebarItem {
  id: string;
  label: string;
  icon: typeof Heart;
  badge?: number;
  indent?: boolean;
}

interface SidebarSection {
  label: string;
  items: SidebarItem[];
}

/* ─── BizOps Sidebar Sections ─── */
const BIZOPS_SECTION_1: SidebarSection[] = [
  {
    label: "",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Strategy & Leadership",
    items: [
      { id: "strategic-hub", label: "Strategic Hub", icon: Target },
      { id: "founder-ops", label: "Founder Ops", icon: Rocket },
      { id: "ceo-view", label: "CEO View", icon: Eye },
      { id: "coo-view", label: "COO View", icon: Eye },
      { id: "cio-cto-view", label: "CIO/CTO View", icon: Eye },
    ],
  },
  {
    label: "Departments",
    items: [
      { id: "marketing", label: "Marketing", icon: Megaphone },
      { id: "sales", label: "Sales", icon: TrendingUp },
      { id: "cs", label: "Customer Success", icon: Heart },
      { id: "product-eng", label: "Product & Eng", icon: Layers },
      { id: "operations", label: "Operations", icon: Zap },
      { id: "finance", label: "Finance", icon: DollarSign },
      { id: "hr", label: "Human Resources", icon: Users },
      { id: "legal", label: "Legal & Compliance", icon: Scale },
      { id: "bi", label: "Business Intelligence", icon: BarChart3 },
      { id: "it", label: "IT & Infrastructure", icon: Server },
      { id: "partnerships", label: "Partnerships", icon: Handshake },
    ],
  },
  {
    label: "Workspace",
    items: [
      { id: "projects", label: "Projects", icon: GitBranch },
      { id: "tasks", label: "Tasks", icon: CheckCircle },
      { id: "documents", label: "Documents", icon: FileText },
      { id: "clients", label: "Clients", icon: Building2 },
      { id: "metrics", label: "Metrics", icon: BarChart3 },
      { id: "crm", label: "CRM", icon: Users },
    ],
  },
  {
    label: "Knowledge",
    items: [
      { id: "knowledge", label: "Knowledge Hub", icon: BookOpen },
    ],
  },
];

/* ─── Account Success Sidebar Sections ─── */
const AS_SECTION_1: SidebarSection[] = [
  {
    label: "",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "",
    items: [
      { id: "accounts", label: "Accounts", icon: Building2 },
      { id: "at-risk", label: "At Risk", icon: AlertTriangle, badge: 2 },
      { id: "tasks", label: "Tasks", icon: CheckCircle },
      { id: "meetings", label: "Meetings", icon: Clock },
      { id: "engagement-log", label: "Engagement Log", icon: MessageSquare },
    ],
  },
];

/* ─── Section 2: Intelligence (universal shape, scoped content) ─── */
const INTELLIGENCE_SECTION = (ctx: CTX): SidebarSection => ({
  label: "Intelligence",
  items: ctx === "bizops"
    ? [
        { id: "bizops-today", label: "BizOps Today", icon: Rocket },
        { id: "queue", label: "Queue", icon: Bell, badge: 5 },
        { id: "decisions", label: "Decisions", icon: FileText },
      ]
    : [
        { id: "insights", label: "Insights", icon: Lightbulb },
        { id: "queue", label: "Queue", icon: Bell, badge: 3 },
        { id: "decisions", label: "Decisions", icon: FileText },
      ],
});

/* ─── Section 3: Tools (universal — same everywhere) ─── */
const TOOLS_SECTION: SidebarSection = {
  label: "Tools",
  items: [
    { id: "twin", label: "Twin", icon: Brain },
    { id: "knowledge-tools", label: "Knowledge", icon: BookOpen },
    { id: "workflows", label: "Workflows", icon: Workflow },
    { id: "settings", label: "Settings", icon: Settings },
  ],
};

/* ─── Main Component ─── */
export function WorkbenchPage() {
  const [ctx, setCtx] = useState<CTX>("bizops");
  const [activeItem, setActiveItem] = useState("dashboard");
  const [room, setRoom] = useState<Room>("twin");
  const [searchFocused, setSearchFocused] = useState(false);

  const domainSections = ctx === "bizops" ? BIZOPS_SECTION_1 : AS_SECTION_1;
  const intelligenceSection = INTELLIGENCE_SECTION(ctx);

  const allItems = [...domainSections.flatMap(s => s.items), ...intelligenceSection.items, ...TOOLS_SECTION.items];
  const activeLabel = allItems.find(i => i.id === activeItem)?.label || "Dashboard";

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: "var(--paper)" }}>
      {/* ═══════════════════════════════════════════════════════════════
          SIDEBAR — 3 Sections: Domain Nav | Intelligence | Tools
          ═══════════════════════════════════════════════════════════════ */}
      <aside
        className="w-56 flex flex-col border-r shrink-0"
        style={{ background: "var(--paper-warm)", borderColor: "var(--rule)" }}
      >
        {/* ── Brand + Location ── */}
        <div className="px-4 pt-4 pb-2">
          <p className="text-[11px] font-semibold tracking-wide" style={{ color: "var(--ink)", fontFamily: "var(--font-sans)" }}>
            IntegrateWise
          </p>
          <p className="text-[10px] mt-0.5" style={{ color: "var(--ink-ghost)", fontFamily: "var(--font-mono)" }}>
            {ctx === "bizops" ? "Business Ops" : "Account Success"} › {activeLabel}
          </p>
        </div>

        {/* ── Search ── */}
        <div className="px-3 pb-3">
          <div
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] transition-colors cursor-text"
            style={{
              background: searchFocused ? "var(--paper)" : "transparent",
              border: searchFocused ? "1px solid var(--rule)" : "1px solid transparent",
              color: "var(--ink-ghost)",
            }}
          >
            <Search size={12} />
            <span className="flex-1">Search everything...</span>
            <span className="text-[9px] px-1 py-0.5 rounded" style={{ background: "var(--paper-deep)", color: "var(--ink-ghost)", fontFamily: "var(--font-mono)" }}>⌘K</span>
          </div>
        </div>

        {/* ── Notification + User + CTX Toggle ── */}
        <div className="px-3 pb-2 flex items-center gap-2">
          <button className="relative p-1.5 rounded-lg" style={{ color: "var(--ink-ghost)" }}>
            <Bell size={14} />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold"
              style={{ background: "var(--red)", color: "var(--paper)" }}>3</span>
          </button>
          <div className="flex-1" />
          {/* CTX Toggle — for demo: switch between BizOps and Account Success */}
          <div className="flex rounded-md p-0.5" style={{ background: "var(--paper)" }}>
            {([["bizops" as CTX, "BO"], ["account-success" as CTX, "AS"]] as const).map(([c, label]) => (
              <button key={c} onClick={() => { setCtx(c); setActiveItem("dashboard"); }}
                className="px-1.5 py-0.5 rounded text-[8px] font-bold transition-all"
                style={{
                  background: ctx === c ? "var(--forest)" : "transparent",
                  color: ctx === c ? "var(--paper)" : "var(--ink-ghost)",
                }}>
                {label}
              </button>
            ))}
          </div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
            style={{ background: "var(--forest-mid)", color: "var(--paper)" }}>N</div>
        </div>

        {/* ═══ SECTION 1: DOMAIN NAV ═══ */}
        <div className="flex-1 overflow-y-auto px-2 pb-1">
          {domainSections.map((section, si) => (
            <div key={si} className="mb-1.5">
              {section.label && (
                <p className="text-[9px] font-medium tracking-widest uppercase px-2.5 py-1.5"
                  style={{ color: "var(--ink-ghost)", fontFamily: "var(--font-mono)" }}>
                  {section.label}
                </p>
              )}
              {section.items.map(item => (
                <SidebarButton key={item.id} item={item} active={activeItem === item.id} onClick={() => setActiveItem(item.id)} />
              ))}
            </div>
          ))}

          {/* ═══ SECTION 2: INTELLIGENCE ═══ */}
          <div className="mb-1.5">
            <p className="text-[9px] font-medium tracking-widest uppercase px-2.5 py-1.5"
              style={{ color: "var(--ink-ghost)", fontFamily: "var(--font-mono)" }}>
              {intelligenceSection.label}
            </p>
            {intelligenceSection.items.map(item => (
              <SidebarButton key={item.id} item={item} active={activeItem === item.id} onClick={() => setActiveItem(item.id)} />
            ))}
          </div>

          {/* ═══ SECTION 3: TOOLS ═══ */}
          <div className="mb-1.5">
            <p className="text-[9px] font-medium tracking-widest uppercase px-2.5 py-1.5"
              style={{ color: "var(--ink-ghost)", fontFamily: "var(--font-mono)" }}>
              {TOOLS_SECTION.label}
            </p>
            {TOOLS_SECTION.items.map(item => (
              <SidebarButton key={item.id} item={item} active={activeItem === item.id} onClick={() => setActiveItem(item.id)} />
            ))}
          </div>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════════════════
          MAIN CONTENT
          ═══════════════════════════════════════════════════════════════ */}
      <main className="flex-1 flex items-center justify-center" style={{ background: "var(--paper)" }}>
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
            style={{ background: "var(--paper-warm)", border: "1px solid var(--rule)" }}>
            <LayoutDashboard size={20} style={{ color: "var(--ink-ghost)" }} />
          </div>
          <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>{activeLabel}</p>
          <p className="text-[11px] mt-1" style={{ color: "var(--ink-ghost)" }}>
            {ctx === "bizops" ? "Business Ops" : "Account Success"} — {room === "twin" ? "AI Assistant" : room === "ops" ? "Ops" : "Knowledge"}
          </p>
        </div>
      </main>
    </div>
  );
}

/* ─── Sidebar Button ─── */
function SidebarButton({ item, active, onClick }: { item: SidebarItem; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-[11px] transition-colors"
      style={{
        background: active ? "var(--forest)" : "transparent",
        color: active ? "var(--paper)" : "var(--ink-muted)",
        fontWeight: active ? 500 : 400,
        paddingLeft: item.indent ? "2rem" : undefined,
      }}
    >
      <item.icon size={13} />
      <span className="truncate">{item.label}</span>
      {item.badge && (
        <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full font-bold shrink-0"
          style={{ background: active ? "rgba(244,240,232,0.2)" : "var(--red)", color: active ? "var(--paper)" : "var(--paper)" }}>
          {item.badge}
        </span>
      )}
    </button>
  );
}

export default WorkbenchPage;
