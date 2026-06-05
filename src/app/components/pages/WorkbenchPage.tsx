"use client"

import { useState, useRef, useEffect } from "react"
import {
  Home,
  Inbox,
  Terminal,
  Gavel,
  Play,
  Zap,
  TrendingUp,
  Compass,
  Layers,
  FileText,
  Link2,
  Bot,
  Settings,
  Send,
  Sparkles,
  User,
  Check,
  X,
  RefreshCw,
  ChevronRight,
  Eye,
  Shield,
  HelpCircle,
  Database,
  ArrowRight,
  ChevronDown,
  Info,
  Calendar,
  AlertTriangle,
  MessageSquare,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react"

type L1Tab =
  | "desk"
  | "inbox"
  | "build"
  | "decide"
  | "run"
  | "react"
  | "grow"
  | "horizon"
  | "entity-360"
  | "assets"
  | "connections"
  | "twins"
  | "settings"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  ts: string
  hasArtifact?: boolean
  artifactTitle?: string
  artifactData?: any
}

// ── Left Navigation Configurations ──
const L1_ITEMS: Array<{ id: L1Tab; label: string; icon: any; path: string; group: "cockpit" | "system" }> = [
  { id: "desk", label: "Desk", icon: Home, path: "/desk", group: "cockpit" },
  { id: "inbox", label: "Inbox", icon: Inbox, path: "/inbox", group: "cockpit" },
  { id: "build", label: "Build", icon: Terminal, path: "/build", group: "cockpit" },
  { id: "decide", label: "Decide", icon: Gavel, path: "/decide", group: "cockpit" },
  { id: "run", label: "Run", icon: Play, path: "/run", group: "cockpit" },
  { id: "react", label: "React", icon: Zap, path: "/react", group: "cockpit" },
  { id: "grow", label: "Grow", icon: TrendingUp, path: "/grow", group: "cockpit" },
  { id: "horizon", label: "Horizon", icon: Compass, path: "/horizon", group: "cockpit" },
  
  { id: "entity-360", label: "Entity 360", icon: Layers, path: "/entity-360", group: "system" },
  { id: "assets", label: "Assets", icon: FileText, path: "/assets", group: "system" },
  { id: "connections", label: "Connections", icon: Link2, path: "/connections", group: "system" },
  { id: "twins", label: "Twins", icon: Bot, path: "/twins", group: "system" },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings", group: "system" },
]

// ── Active Tab Details ──
const TAB_META: Record<L1Tab, { title: string; desc: string; icon: any; details: string }> = {
  desk: {
    title: "My Desk",
    desc: "Personal operational desk. Direct view of active tasks, system signals, and daily briefs.",
    icon: Home,
    details: "Ready. 3 urgent issues require developer/CSM coordination.",
  },
  inbox: {
    title: "Inbox",
    desc: "Operational handovers, alerts from D1/KV spine monitoring, and human-in-the-loop requests.",
    icon: Inbox,
    details: "2 unread alerts. 1 partner handshake signal pending validation.",
  },
  build: {
    title: "Build Workspace",
    desc: "Integration builder. Connect API normalizers, write processing scripts, and verify schemas.",
    icon: Terminal,
    details: "All build schemas locked in strict TypeScript. Zero-Python rule active.",
  },
  decide: {
    title: "Decide Board",
    desc: "Triage proposals queue, promoted memories, and corporate governance decisions log.",
    icon: Gavel,
    details: "4 proposals pending founder signature. Last promoted memory: 2h ago.",
  },
  run: {
    title: "Run Orchestrator",
    desc: "Active workers monitoring, task runners, cron pipelines, and real-time execution logs.",
    icon: Play,
    details: "6 pipelines active. Gateway latency: 24ms. Memory crawler idle.",
  },
  react: {
    title: "React Signals",
    desc: "Proactive alert triggers, threshold alerts, and anomaly indicators across client portfolio.",
    icon: Zap,
    details: "CRITICAL: Vantage Telecom health drop anomaly flagged.",
  },
  grow: {
    title: "Grow Hub",
    desc: "Revenue operations, expansion signals, portfolio health tracking, and renewal risks.",
    icon: TrendingUp,
    details: "Total portfolio MRR: ₹5.4L. Axiom Financial showing +34% expansion potential.",
  },
  horizon: {
    title: "Horizon Simulation",
    desc: "Predictive modeling, rule changes testing, and LLM behavior simulations.",
    icon: Compass,
    details: "Simulation engine ready. Running test parameters on 'Flow C' routing changes.",
  },
  "entity-360": {
    title: "Entity 360",
    desc: "Comprehensive portfolio views. Deep context, team logs, value streams, and platform health.",
    icon: Layers,
    details: "Viewing 5 active enterprise accounts. Click to pivot variables.",
  },
  assets: {
    title: "Assets Library",
    desc: "Brand assets, document templates, presentation decks, stationery, and copy decks.",
    icon: FileText,
    details: "10 brand folders, 26 active templates fully vectorized and exportable.",
  },
  connections: {
    title: "Continuity Bridge™",
    desc: "One connection between your AI and corporate data systems. Unified Spine Gateway.",
    icon: Link2,
    details: "Spine Connected. Active MCP server exposing normalized APIs.",
  },
  twins: {
    title: "Twins Manager",
    desc: "Configure digital twins. Train behavioral models, set token access scopes, audit memory.",
    icon: Bot,
    details: "3 twins active: AS Twin, Marketing Twin, Ops Twin.",
  },
  settings: {
    title: "Settings",
    desc: "Access credentials, secrets vault configurations, workspace themes, and developer tools.",
    icon: Settings,
    details: "Machine vault loaded from ~/.iw/secrets.env.",
  },
}

// ── Context Starters ──
const CONTEXT_STARTERS: Record<L1Tab, string[]> = {
  desk: [
    "What needs my attention today?",
    "Summarise my tasks for Axiom Capital",
    "Show recent handovers to team",
  ],
  inbox: [
    "Read the pending alert from Folder Monitor",
    "Show me messages about MedCore contract",
    "List critical handovers requiring signature",
  ],
  build: [
    "Verify the Razorpay normalizer schema",
    "Show active connectors in build",
    "Run schema validation for flow-a",
  ],
  decide: [
    "What decisions are pending in triage?",
    "Review proposed memory for yesterday's session",
    "Show history of promoted principles",
  ],
  run: [
    "Check memory sync pipeline status",
    "Trigger full backfill sync for Crestline",
    "Show worker error logs from last 12h",
  ],
  react: [
    "Why did Vantage Telecom health drop?",
    "List anomaly triggers active this week",
    "What are the risk factors for MedCore Health?",
  ],
  grow: [
    "Which accounts have expansion potential?",
    "Summarise pipeline for this quarter",
    "Show NPS trends against ARR size",
  ],
  horizon: [
    "Simulate client churn risk if CS engagement falls",
    "Project MRR growth with MuleSoft Retainer active",
    "Run rule simulation on automatic triage",
  ],
  "entity-360": [
    "Load complete profile for Axiom Capital",
    "Show platform health for Vantage Telecom",
    "Compare MedCore vs TechStack metrics",
  ],
  assets: [
    "Download vectorized email signature",
    "Get cover slide for the Sales Presentation",
    "Show LinkedIn banner templates",
  ],
  connections: [
    "Show current D1/KV synchronization status",
    "Test connection to Hubspot gateway",
    "View Continuity Bridge MCP schema",
  ],
  twins: [
    "Is the AS Twin authorized to write proposals?",
    "Show training logs for Ops Twin",
    "Modify twin response confidence threshold",
  ],
  settings: [
    "Check CF secrets store connection",
    "Rotate workspace API keys",
    "View active token exchange log",
  ],
}

// ── Pre-Loaded Threads for Killer Demo ──
const PRELOADED_CONVERSATIONS: Record<L1Tab, Message[]> = {
  desk: [
    {
      id: "d1",
      role: "assistant",
      content: "Hello Nirmal. I am your Twin, connected directly to the IntegrateWise Continuity Bridge™. I have loaded today's Desk variables from the Spine. How can I help you?",
      ts: "9:00 AM",
    },
  ],
  inbox: [
    {
      id: "i1",
      role: "assistant",
      content: "Inbox loaded. I see 2 unread alerts and 1 partner handshake signal pending approval. Select any alert to investigate, or ask me for details.",
      ts: "9:00 AM",
    },
  ],
  build: [
    {
      id: "b1",
      role: "assistant",
      content: "Build system active. The TypeScript API client has compiled with zero errors. All connectors are strictly bound to `DOMAIN_SPINE_CONFIG` to prevent drift.",
      ts: "9:00 AM",
    },
  ],
  decide: [
    {
      id: "de1",
      role: "assistant",
      content: "Decide Board loaded. Triage Bot has proposed 4 new organizational memories from recent conversations. They are awaiting your approval in the right drawer.",
      ts: "9:00 AM",
    },
  ],
  run: [
    {
      id: "r1",
      role: "assistant",
      content: "Run status: 6 active edge pipelines. Spine sync is at 100% efficiency. Memory indexes are being auto-updated on D1 without write conflicts.",
      ts: "9:00 AM",
    },
  ],
  react: [
    {
      id: "rc1",
      role: "assistant",
      content: "Proactive alert engine active. I have identified a critical anomaly in Vantage Telecom's health score. Let me know if you would like me to compile the evidence chain.",
      ts: "9:01 AM",
    },
  ],
  grow: [
    {
      id: "g1",
      role: "assistant",
      content: "Grow dashboard synchronized. Portfolio MRR is stable at ₹5.4L. I have detected strong expansion signals from Axiom Financial based on API volume spikes.",
      ts: "9:00 AM",
    },
  ],
  horizon: [
    {
      id: "h1",
      role: "assistant",
      content: "Horizon simulation sandbox ready. What behavioral or model rules would you like to simulate today?",
      ts: "9:00 AM",
    },
  ],
  "entity-360": [
    {
      id: "e1",
      role: "assistant",
      content: "Entity 360 loaded. I have indexed all 5 active enterprise accounts. What customer details would you like to retrieve from the Spine?",
      ts: "9:00 AM",
    },
  ],
  assets: [
    {
      id: "a1",
      role: "assistant",
      content: "Brand assets and design templates loaded. You can browse individual categories in L1 or generate a complete Campaign Kit from the generators tab.",
      ts: "9:00 AM",
    },
  ],
  connections: [
    {
      id: "c1",
      role: "assistant",
      content: "Continuity Bridge connection status: Live. The MCP server is actively exposing 5 capability endpoints: Operational Truth, Org Memory, Continuity, Governance, and Twin Context.",
      ts: "9:00 AM",
    },
  ],
  twins: [
    {
      id: "t1",
      role: "assistant",
      content: "Digital twins configured. Active profile: AS Twin (read-only for Spine, write-proposal for Triage queue).",
      ts: "9:00 AM",
    },
  ],
  settings: [
    {
      id: "s1",
      role: "assistant",
      content: "Settings module online. Machine vaults are encrypted. Access credentials are fully secure.",
      ts: "9:00 AM",
    },
  ],
}

// ── Proactive Drawer Alerts ──
interface DrawerAlert {
  id: string
  title: string
  type: "warning" | "info" | "success"
  message: string
  evidence: string[]
  reasoning: string
  actionLabel: string
  actionTriggered: boolean
  targetAccount?: string
}

const INITIAL_DRAWER_ALERTS: DrawerAlert[] = [
  {
    id: "alert-1",
    title: "Vantage Telecom Escalation Pattern",
    type: "warning",
    message: "Critical Churn Indicator: Health dropped 18 points, champion inactive 21 days.",
    evidence: [
      "NPS dropped to 14 (critical threshold is 40)",
      "CSM Nirmal Prince has had 0 engagements in 21 days",
      "Matches Q4 churn signature pattern (87% confidence)",
    ],
    reasoning: "The customer's API usage dropped 24% over the last 14 days, and support ticket resolution time has risen, leading to a severe sentiment degradation.",
    actionLabel: "Draft Executive Outreach Email",
    actionTriggered: false,
    targetAccount: "Vantage Telecom",
  },
  {
    id: "alert-2",
    title: "MedCore Health Renewal Risk",
    type: "warning",
    message: "Contract renewal in 28 days with NPS score of 38. Urgent review needed.",
    evidence: [
      "Renewal Date: June 28 (28 days left)",
      "NPS score: 38 (previous score: 61)",
      "Open issues: 5 technical support tickets pending",
    ],
    reasoning: "Support ticket bottleneck on Razorpay database integrations has stalled their rollout, triggering high risk on contract value renewal.",
    actionLabel: "Schedule Technical Alignment",
    actionTriggered: false,
    targetAccount: "MedCore Health",
  },
  {
    id: "alert-3",
    title: "Axiom Financial Expansion Signal",
    type: "success",
    message: "Upsell Opportunity: API calls +34% MoM and high user engagement.",
    evidence: [
      "API usage grew from 1.2M to 1.61M monthly hits",
      "Executive alignment meeting completed yesterday (positive sentiment)",
      "CSM Nirmal Prince logs indicate intent to expand data-flow volume",
    ],
    reasoning: "Axiom is preparing to roll out their second vertical market product, requiring a higher tier memory integration package.",
    actionLabel: "Propose RetentionRetainer Upgrade",
    actionTriggered: false,
    targetAccount: "Axiom Financial",
  },
]

export function WorkbenchPage() {
  const [activeTab, setActiveTab] = useState<L1Tab>("desk")
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  const [selectedModel, setSelectedModel] = useState("Claude 3.5 Sonnet")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "assistant",
      content: "Hello Nirmal. I am your Twin, connected directly to the IntegrateWise Continuity Bridge™. I have loaded today's Desk variables from the Spine. How can I help you?",
      ts: "9:00 AM",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [drawerAlerts, setDrawerAlerts] = useState<DrawerAlert[]>(INITIAL_DRAWER_ALERTS)
  const [activeDrawerTab, setActiveDrawerTab] = useState<"react" | "evidence" | "lineage">("react")
  const [activeAlertId, setActiveAlertId] = useState<string>("alert-1")
  
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load pre-loaded conversation on tab switch
    setMessages(PRELOADED_CONVERSATIONS[activeTab])
  }, [activeTab])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const activeAlert = drawerAlerts.find((a) => a.id === activeAlertId) || drawerAlerts[0]

  const send = (text?: string) => {
    const msg = (text ?? input).trim()
    if (!msg) return
    setInput("")

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: msg,
      ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    // Simulate Twin reasoning
    setTimeout(() => {
      let replyContent = ""
      const m = msg.toLowerCase()

      if (m.includes("escalating acme") || m.includes("vantage") || m.includes("acme")) {
        replyContent = `**Vantage Telecom escalation audit details:**\n\nBased on live data synchronized via the **Continuity Bridge**:\n\n1. **Health Anomaly:** Health score dropped by **18 points** over 14 days, currently sits at **14** (critical threshold).\n2. **Champion Silence:** Key stakeholder has had **21 days of inactivity** in our portal.\n3. **Pattern Match:** Historical analysis matches a Q4 churn pattern with **87% confidence**.\n\n*Recommended action:* CSM lead should initiate immediate executive outreach. Draft proposed email is loaded in your **Intelligence Drawer** to the right.`
      } else if (m.includes("medcore")) {
        replyContent = `**MedCore Health status details:**\n\n- **Current ARR:** ₹22L\n- **Renewal Window:** 28 days left\n- **NPS Score:** 38 (severe drop from 61)\n- **Spine analysis:** Stalled integration workflow on Razorpay API gateway is driving user frustration. Twin has queued a technical alignment proposal.`
      } else if (m.includes("axiom")) {
        replyContent = `**Axiom Financial expansion audit:**\n\n- **MRR Signal:** API volume is **+34% MoM** (currently 1.61M monthly operations).\n- **Spine memory:** Meeting transcript from yesterday records buyer intent to add 2 new data integrations.\n- **Upsell proposal:** Propose upgrade to the Enterprise retention package (adds ₹1.5L ARR).`
      } else if (m.includes("mcp") || m.includes("continuity bridge")) {
        replyContent = `**IntegrateWise Continuity Bridge™ Specifications:**\n\nIt runs as a unified **MCP Server** directly connecting to the Spine. It exposes the following capabilities directly to my environment:\n\n- **Operational Truth:** Current state, signals, health metrics.\n- **Org Memory:** Decisions, learnings, doctrine.\n- **Continuity:** Conversational history and previous task outcomes.\n- **Governance:** Policy, exceptions, risk register.\n- **Twin Context:** Context briefings and recommended actions.`
      } else {
        replyContent = `I have queried the Spine for details regarding "${msg}". Based on our organizational memory: everything is synchronized. Let me know if you want me to write a proposal or review pending actions in the Intelligence Drawer.`
      }

      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: replyContent,
        ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, reply])
      setLoading(false)
    }, 900)
  }

  const handleApproveAlert = (alertId: string) => {
    setDrawerAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, actionTriggered: true } : a))
    )
    
    // Add success message to chat indicating action taken
    const approvedAlert = drawerAlerts.find((a) => a.id === alertId)
    if (!approvedAlert) return

    setLoading(true)
    setTimeout(() => {
      const systemMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: `✅ **Action Approved & Executed:** I have compiled the context for **${approvedAlert.targetAccount}**, generated the required assets, and logged this decision in the Book of Projects (Spine).`,
        ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, systemMessage])
      setLoading(false)
    }, 600)
  }

  return (
    <div
      className="flex h-screen overflow-hidden text-sm"
      style={{ background: "#F4F0E8", color: "#1F2925" }}
    >
      {/* ═══════════════════════════════════════════════════════════════
          L1 — WORKBENCH LEFT NAVIGATION
          ═══════════════════════════════════════════════════════════════ */}
      <aside
        className="w-64 shrink-0 flex flex-col border-r select-none"
        style={{ background: "#111D14", borderColor: "#1B2F21" }}
      >
        {/* Header Branding */}
        <div className="p-5 border-b" style={{ borderColor: "#1B2F21" }}>
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs"
              style={{ background: "#C6A15C", color: "#111D14" }}
            >
              IW
            </div>
            <div>
              <h1 className="font-serif font-bold text-sm text-white tracking-wide">
                IntegrateWise
              </h1>
              <span className="text-[10px] font-mono block text-[#C6A15C] tracking-widest mt-0.5">
                CONTINUITY BRIDGE™
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {/* Cockpit Group */}
          <div>
            <p className="text-[9px] font-mono font-bold tracking-widest px-3 mb-2 text-[#F4F0E8]/40 uppercase">
              Cockpit
            </p>
            <div className="space-y-0.5">
              {L1_ITEMS.filter((item) => item.group === "cockpit").map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs transition-all duration-150"
                    style={{
                      background: isActive ? "rgba(198, 161, 92, 0.15)" : "transparent",
                      color: isActive ? "#C6A15C" : "rgba(244, 240, 232, 0.7)",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    <Icon
                      className="w-4 h-4 shrink-0"
                      style={{ color: isActive ? "#C6A15C" : "rgba(244, 240, 232, 0.4)" }}
                    />
                    <span className="flex-1">{item.label}</span>
                    {item.id === "react" && (
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* System Group */}
          <div>
            <p className="text-[9px] font-mono font-bold tracking-widest px-3 mb-2 text-[#F4F0E8]/40 uppercase">
              System
            </p>
            <div className="space-y-0.5">
              {L1_ITEMS.filter((item) => item.group === "system").map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs transition-all duration-150"
                    style={{
                      background: isActive ? "rgba(198, 161, 92, 0.15)" : "transparent",
                      color: isActive ? "#C6A15C" : "rgba(244, 240, 232, 0.7)",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    <Icon
                      className="w-4 h-4 shrink-0"
                      style={{ color: isActive ? "#C6A15C" : "rgba(244, 240, 232, 0.4)" }}
                    />
                    <span className="flex-1">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Footer Status */}
        <div className="p-4 border-t" style={{ borderColor: "#1B2F21" }}>
          <div className="bg-[#182A1D] border border-[#1F3927] rounded-lg p-3">
            <div className="flex items-center gap-2 text-[10px] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
              <span className="font-mono text-[9px] tracking-wide">SPINE SYNC: 100%</span>
            </div>
            <p className="text-[9px] text-white/50 font-mono mt-1">
              D1/KV Gateway Active
            </p>
          </div>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════════════════
          L2 — TWIN WORKSPACE (CENTER PANEL)
          ═══════════════════════════════════════════════════════════════ */}
      <section className="flex-1 flex flex-col overflow-hidden min-w-0 bg-white">
        {/* Topbar Header */}
        <header
          className="px-6 py-4 border-b flex items-center justify-between shrink-0"
          style={{ borderColor: "#E2DACB", background: "#FAF7F2" }}
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-[#C6A15C] uppercase font-bold">
                L2 — Twin Workspace
              </span>
              <span className="text-[9px] font-mono bg-[#E8E1D5] px-1.5 py-0.5 rounded text-[#5C5549]">
                Open WebUI Runtime
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <h2 className="font-serif font-bold text-lg text-[#111D14]">
                {TAB_META[activeTab].title}
              </h2>
              <span className="text-xs text-[#5C5549] hidden md:inline">
                · {TAB_META[activeTab].desc}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Connection Status Badge */}
            <div className="relative group">
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-help"
                style={{ background: "#E5ECE7", color: "#2B5E3C" }}
              >
                <Check className="w-3.5 h-3.5" />
                <span>Continuity Bridge</span>
              </div>
              
              {/* Tooltip on Hover */}
              <div className="absolute right-0 top-8 hidden group-hover:block w-72 bg-[#111D14] text-white text-xs rounded-lg p-3 shadow-xl z-50">
                <p className="font-bold text-[#C6A15C] mb-1">✓ Bridge Active (5 APIs exposed):</p>
                <ul className="space-y-1 text-white/80 font-mono text-[10px]">
                  <li>1. Operational Truth (Current state/signals)</li>
                  <li>2. Org Memory (Decisions/doctrine)</li>
                  <li>3. Continuity (Prior outcomes)</li>
                  <li>4. Governance (Policies/risk)</li>
                  <li>5. Twin Context (Briefings/recs)</li>
                </ul>
              </div>
            </div>

            {/* Model Selector */}
            <div className="relative">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="appearance-none pl-3 pr-8 py-1.5 bg-white border border-[#C6A15C]/40 rounded-lg text-xs font-medium text-[#111D14] focus:outline-none focus:ring-1 focus:ring-[#C6A15C]"
              >
                <option>Claude 3.5 Sonnet</option>
                <option>GPT-4o</option>
                <option>Gemini 1.5 Pro</option>
              </select>
              <ChevronDown className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#5C5549]" />
            </div>

            {/* Toggle Drawer Button */}
            <button
              onClick={() => setIsDrawerOpen((d) => !d)}
              className="p-1.5 border border-[#C6A15C]/40 rounded-lg hover:bg-[#FAF7F2] transition-colors"
              title={isDrawerOpen ? "Close Intelligence Drawer" : "Open Intelligence Drawer"}
              style={{ color: "#111D14" }}
            >
              {isDrawerOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Conversation Message Logs */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5" style={{ background: "#FAF7F2" }}>
          {messages.map((msg) => {
            const isTwin = msg.role === "assistant"
            return (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background: isTwin ? "#111D14" : "#C6A15C",
                  }}
                >
                  {isTwin ? (
                    <Sparkles className="w-3.5 h-3.5" style={{ color: "#C6A15C" }} />
                  ) : (
                    <User className="w-3.5 h-3.5" style={{ color: "#111D14" }} />
                  )}
                </div>

                {/* Message Balloon */}
                <div className="max-w-[75%] space-y-2">
                  <div
                    className="px-4 py-3 rounded-2xl text-xs leading-relaxed border"
                    style={{
                      background: isTwin ? "white" : "#111D14",
                      color: isTwin ? "#1F2925" : "white",
                      borderColor: isTwin ? "#E2DACB" : "transparent",
                      borderRadius: isTwin ? "2px 16px 16px 16px" : "16px 2px 16px 16px",
                      boxShadow: "0 1px 3px rgba(23, 28, 24, 0.04)",
                    }}
                  >
                    {/* Render raw/newline formatting simply */}
                    <div className="whitespace-pre-line font-sans">
                      {msg.content}
                    </div>

                    <div className="flex items-center gap-1.5 mt-2 opacity-40 text-[9px] font-mono">
                      <span>{msg.ts}</span>
                      <span>·</span>
                      <span>{isTwin ? selectedModel : "You"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          {loading && (
            <div className="flex gap-3.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "#111D14" }}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: "#C6A15C" }} />
              </div>
              <div
                className="px-4 py-3 bg-white border border-[#E2DACB] rounded-2xl text-xs"
                style={{ borderRadius: "2px 16px 16px 16px" }}
              >
                <span className="flex gap-1.5 items-center" style={{ color: "#C6A15C" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Context Starters Prompt Buttons */}
        {messages.length <= 1 && (
          <div className="px-6 pb-2 pt-2 flex flex-wrap gap-2 shrink-0" style={{ background: "#FAF7F2" }}>
            {CONTEXT_STARTERS[activeTab].map((starter) => (
              <button
                key={starter}
                onClick={() => send(starter)}
                className="text-[10px] font-mono px-3 py-1.5 rounded-full border bg-white border-[#E2DACB] text-[#5C5549] hover:border-[#C6A15C] hover:text-[#111D14] transition-all"
              >
                {starter}
              </button>
            ))}
          </div>
        )}

        {/* Input Text Box */}
        <div
          className="px-6 py-4 shrink-0 border-t"
          style={{ borderColor: "#E2DACB", background: "#FAF7F2" }}
        >
          <div
            className="flex items-end gap-2.5 rounded-xl px-4 py-3 border shadow-sm"
            style={{ background: "white", borderColor: "#C6A15C" }}
          >
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  send()
                }
              }}
              placeholder={`Query Twin on ${TAB_META[activeTab].title}...`}
              className="flex-1 resize-none bg-transparent text-xs outline-none leading-relaxed"
              style={{ color: "#1F2925", maxHeight: 100 }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all"
              style={{
                background: input.trim() && !loading ? "#111D14" : "#E2DACB",
                color: input.trim() && !loading ? "#C6A15C" : "rgba(31, 41, 37, 0.4)",
              }}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
          <p
            className="text-[9px] text-center mt-2 font-mono"
            style={{ color: "#5C5549" }}
          >
            IntegrateWise Continuity Bridge™ resolves tool states instantly. Zero training delay.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          L3 — INTELLIGENCE DRAWER (RIGHT PANEL)
          ═══════════════════════════════════════════════════════════════ */}
      {isDrawerOpen && (
        <aside
          className="w-96 shrink-0 flex flex-col border-l overflow-hidden"
          style={{ borderColor: "#E2DACB", background: "white" }}
        >
          {/* Header */}
          <div className="p-5 border-b" style={{ borderColor: "#E2DACB", background: "#FAF7F2" }}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#C6A15C] uppercase font-bold">
                  L3 — Intelligence
                </span>
                <h3 className="font-serif font-bold text-base text-[#111D14] mt-0.5">
                  Intelligence Drawer
                </h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 font-mono rounded bg-red-100 text-red-700 border border-red-200">
                PROACTIVE
              </span>
            </div>
          </div>

          {/* Active Alert Picker */}
          <div className="px-4 py-3 bg-[#FAF7F2] border-b" style={{ borderColor: "#E2DACB" }}>
            <p className="text-[9px] font-mono font-bold tracking-widest text-[#5C5549] uppercase mb-1.5 px-1">
              Active Operational Signals
            </p>
            <div className="flex gap-2">
              {drawerAlerts.map((alert) => (
                <button
                  key={alert.id}
                  onClick={() => setActiveAlertId(alert.id)}
                  className="flex-1 text-left p-2 rounded-lg border text-[11px] transition-all"
                  style={{
                    background: activeAlertId === alert.id ? "#111D14" : "white",
                    color: activeAlertId === alert.id ? "#C6A15C" : "#1F2925",
                    borderColor: activeAlertId === alert.id ? "#111D14" : "#E2DACB",
                  }}
                >
                  <div className="font-bold truncate">{alert.targetAccount}</div>
                  <div className="text-[9px] opacity-75 mt-0.5 truncate">
                    {alert.title.split(' ')[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Alert Callout */}
          <div className="p-4 bg-red-50/50 border-b border-red-100">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-xs text-red-800">{activeAlert.title}</h4>
                <p className="text-[11px] text-red-700 mt-1 leading-relaxed">{activeAlert.message}</p>
              </div>
            </div>
          </div>

          {/* Tabs header */}
          <div className="flex border-b text-center" style={{ borderColor: "#E2DACB" }}>
            {(["react", "evidence", "lineage"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveDrawerTab(tab)}
                className="flex-1 py-2 text-xs font-mono font-bold tracking-wide border-b-2 capitalize transition-all"
                style={{
                  color: activeDrawerTab === tab ? "#111D14" : "#5C5549",
                  borderColor: activeDrawerTab === tab ? "#C6A15C" : "transparent",
                  background: activeDrawerTab === tab ? "transparent" : "#FAF7F2",
                }}
              >
                {tab === "react" ? "React State" : tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {activeDrawerTab === "react" && (
              <div className="space-y-4">
                {/* Proactive Checklist */}
                <div>
                  <h4 className="text-[10px] font-mono tracking-widest text-[#5C5549] uppercase font-bold mb-2">
                    Evidence Signals Checklist
                  </h4>
                  <div className="space-y-2">
                    {activeAlert.evidence.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-2.5 rounded-lg border bg-[#FAF7F2]"
                        style={{ borderColor: "#E2DACB" }}
                      >
                        <span className="text-red-500 font-bold mt-0.5">•</span>
                        <span className="text-xs text-[#1F2925] leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reasoning */}
                <div>
                  <h4 className="text-[10px] font-mono tracking-widest text-[#5C5549] uppercase font-bold mb-1.5">
                    Spine Reasoning
                  </h4>
                  <p className="text-xs text-[#5C5549] leading-relaxed bg-[#FAF7F2] p-3 rounded-lg border border-[#E2DACB]">
                    {activeAlert.reasoning}
                  </p>
                </div>
              </div>
            )}

            {activeDrawerTab === "evidence" && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] font-mono tracking-widest text-[#5C5549] uppercase font-bold mb-2">
                    Spine Entity Matches
                  </h4>
                  <div className="space-y-2.5">
                    <div className="p-3 bg-[#FAF7F2] border border-[#E2DACB] rounded-lg">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#111D14]">
                        <Database className="w-3.5 h-3.5" />
                        <span>account_master / {activeAlert.targetAccount}</span>
                      </div>
                      <p className="text-[10px] text-[#5C5549] mt-1 font-mono">
                        ID: uuid_vantage_telecom_spine_master
                      </p>
                    </div>

                    <div className="p-3 bg-[#FAF7F2] border border-[#E2DACB] rounded-lg">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#111D14]">
                        <Zap className="w-3.5 h-3.5" />
                        <span>platform_health_metric</span>
                      </div>
                      <p className="text-[10px] text-[#5C5549] mt-1 font-mono">
                        Trend: -18% drop over 14d window
                      </p>
                    </div>

                    <div className="p-3 bg-[#FAF7F2] border border-[#E2DACB] rounded-lg">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#111D14]">
                        <FileText className="w-3.5 h-3.5" />
                        <span>organisational_memory</span>
                      </div>
                      <p className="text-[10px] text-[#5C5549] mt-1">
                        Matched Decision: **D-2026-06-05-012** (Operational Fallback & Escalation rules).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeDrawerTab === "lineage" && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] font-mono tracking-widest text-[#5C5549] uppercase font-bold mb-2">
                    Decision Audit Trail
                  </h4>
                  <div className="relative pl-4 border-l border-[#E2DACB] space-y-4">
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#C6A15C] border border-white" />
                      <div className="text-xs font-bold text-[#111D14]">CSM Cadence Check Fail</div>
                      <p className="text-[10px] text-[#5C5549] mt-0.5 font-mono">2026-06-05 08:30</p>
                      <p className="text-[11px] text-[#5C5549] mt-1">
                        Continuous monitoring worker detected 0 communications logged by CSM Prince.
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#E2DACB] border border-white" />
                      <div className="text-xs font-bold text-[#111D14]">NPS Input Sync</div>
                      <p className="text-[10px] text-[#5C5549] mt-0.5 font-mono">2026-06-03 14:15</p>
                      <p className="text-[11px] text-[#5C5549] mt-1">
                        Razorpay/Stripe ticket sync logged CS survey score of 14.
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#E2DACB] border border-white" />
                      <div className="text-xs font-bold text-[#111D14]">Initial Onboarding Promoted</div>
                      <p className="text-[10px] text-[#5C5549] mt-0.5 font-mono">2026-05-12 09:00</p>
                      <p className="text-[11px] text-[#5C5549] mt-1">
                        Founder Prince promoted onboarding context to org memory table.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Decision surface buttons */}
          <div className="p-5 border-t space-y-2.5 bg-[#FAF7F2]" style={{ borderColor: "#E2DACB" }}>
            {activeAlert.actionTriggered ? (
              <div
                className="p-3.5 rounded-xl text-center text-xs font-semibold flex items-center justify-center gap-2"
                style={{ background: "#E5ECE7", color: "#2B5E3C" }}
              >
                <Check className="w-4 h-4" />
                <span>Action Executed & Spine Updated</span>
              </div>
            ) : (
              <>
                <button
                  onClick={() => handleApproveAlert(activeAlert.id)}
                  className="w-full py-2.5 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  style={{ background: "#111D14", color: "#C6A15C" }}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{activeAlert.actionLabel}</span>
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      alert("Decision rejected. CSM has been notified to re-evaluate signals.")
                    }}
                    className="flex-1 py-2 border rounded-lg text-xs font-medium text-red-600 border-red-200 bg-red-50/50 hover:bg-red-50 hover:border-red-300 transition-colors"
                  >
                    Reject Signal
                  </button>
                  <button
                    onClick={() => {
                      const mod = prompt("Modify Outreach Content:", "Executive outreach request: Urgent health review invitation.")
                      if (mod) handleApproveAlert(activeAlert.id)
                    }}
                    className="flex-1 py-2 border rounded-lg text-xs font-medium text-[#5C5549] border-[#E2DACB] bg-white hover:bg-[#FAF7F2] transition-colors"
                  >
                    Modify
                  </button>
                </div>
              </>
            )}
          </div>
        </aside>
      )}
    </div>
  )
}

export default WorkbenchPage
