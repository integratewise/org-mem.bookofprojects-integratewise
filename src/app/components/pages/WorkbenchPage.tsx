"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, PanelRightClose, PanelRightOpen, Sparkles, User, RefreshCw } from "lucide-react"

type CTX = "account-success" | "bizops"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  ts: string
}

const STARTERS: Record<CTX, string[]> = {
  "account-success": [
    "Which accounts are at risk this week?",
    "Summarise MedCore Health — renewal in 28 days",
    "What tasks are overdue across my portfolio?",
    "Show me NPS trends for Q2",
  ],
  "bizops": [
    "What is our MRR trend this month?",
    "Which department has the highest open blockers?",
    "Summarise pipeline health for this quarter",
    "What decisions are pending approval?",
  ],
}

const CTX_LABEL: Record<CTX, string> = {
  "account-success": "Account Success",
  "bizops": "Business Operations",
}

export function WorkbenchPage({ ctx = "account-success" }: { ctx?: CTX }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content: `I am your Twin for ${CTX_LABEL[ctx]}. I have full context of your org memory, active accounts, signals, and decisions. Ask me anything.`,
      ts: now(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function send(text?: string) {
    const msg = (text ?? input).trim()
    if (!msg) return
    setInput("")

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: msg, ts: now() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    // Simulated response — will be replaced with real AI call
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: simulateReply(msg, ctx),
        ts: now(),
      }
      setMessages(prev => [...prev, reply])
      setLoading(false)
    }, 800)
  }

  return (
    <div className="flex flex-col h-full" style={{ background: "var(--paper)", fontFamily: "var(--font-sans)" }}>

      {/* ── Header ── */}
      <div
        className="flex items-center gap-2.5 px-4 py-3 shrink-0"
        style={{ borderBottom: "1px solid var(--rule)", background: "var(--paper-warm)" }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "var(--forest)", }}
        >
          <Bot className="w-3.5 h-3.5" style={{ color: "var(--gold)" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold truncate" style={{ color: "var(--forest)" }}>
            Twin — {CTX_LABEL[ctx]}
          </p>
          <p className="text-[10px]" style={{ color: "var(--ink-ghost)", fontFamily: "var(--font-mono)" }}>
            ORG MEMORY · LIVE CONTEXT
          </p>
        </div>
        <button
          onClick={() => setMessages([{ id: "0", role: "assistant", content: `New session started for ${CTX_LABEL[ctx]}.`, ts: now() }])}
          className="p-1.5 rounded-lg transition-colors"
          style={{ color: "var(--ink-ghost)" }}
          title="New session"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            {/* Avatar */}
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{
                background: msg.role === "assistant" ? "var(--forest)" : "var(--gold)",
              }}
            >
              {msg.role === "assistant"
                ? <Sparkles className="w-3 h-3" style={{ color: "var(--paper)" }} />
                : <User className="w-3 h-3" style={{ color: "var(--forest)" }} />
              }
            </div>

            {/* Bubble */}
            <div
              className="max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed"
              style={{
                background: msg.role === "assistant" ? "var(--paper-warm)" : "var(--forest)",
                color: msg.role === "assistant" ? "var(--ink)" : "var(--paper)",
                border: msg.role === "assistant" ? "1px solid var(--rule)" : "none",
                borderRadius: msg.role === "user" ? "12px 2px 12px 12px" : "2px 12px 12px 12px",
              }}
            >
              {msg.content}
              <p
                className="text-[9px] mt-1 opacity-50"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {msg.ts}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-2.5">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "var(--forest)" }}
            >
              <Sparkles className="w-3 h-3" style={{ color: "var(--paper)" }} />
            </div>
            <div
              className="px-3 py-2 rounded-xl text-xs"
              style={{ background: "var(--paper-warm)", border: "1px solid var(--rule)", borderRadius: "2px 12px 12px 12px" }}
            >
              <span className="flex gap-1 items-center" style={{ color: "var(--ink-ghost)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Starters ── */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3 flex flex-wrap gap-1.5">
          {STARTERS[ctx].map(s => (
            <button
              key={s}
              onClick={() => send(s)}
              className="text-[10px] px-2.5 py-1.5 rounded-full transition-all"
              style={{
                background: "var(--paper-warm)",
                border: "1px solid var(--rule)",
                color: "var(--ink-muted)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--gold)"
                e.currentTarget.style.color = "var(--forest)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--rule)"
                e.currentTarget.style.color = "var(--ink-muted)"
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* ── Input ── */}
      <div
        className="px-3 pb-3 pt-2 shrink-0"
        style={{ borderTop: "1px solid var(--rule)" }}
      >
        <div
          className="flex items-end gap-2 rounded-xl px-3 py-2"
          style={{ background: "var(--paper-warm)", border: "1px solid var(--rule)" }}
        >
          <textarea
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                send()
              }
            }}
            placeholder={`Ask Twin about ${CTX_LABEL[ctx]}...`}
            className="flex-1 resize-none bg-transparent text-xs outline-none leading-relaxed"
            style={{ color: "var(--ink)", maxHeight: 120 }}
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all"
            style={{
              background: input.trim() && !loading ? "var(--forest)" : "var(--rule)",
              color: input.trim() && !loading ? "var(--paper)" : "var(--ink-ghost)",
            }}
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
        <p className="text-[9px] text-center mt-1.5" style={{ color: "var(--ink-ghost)", fontFamily: "var(--font-mono)" }}>
          Twin reads org memory · personal memory · live signals
        </p>
      </div>
    </div>
  )
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

function simulateReply(msg: string, ctx: CTX): string {
  const m = msg.toLowerCase()
  if (ctx === "account-success") {
    if (m.includes("risk") || m.includes("at risk")) return "2 accounts are currently at risk: MedCore Health (₹22L ARR, renewal in 28d, NPS 38) and Vantage Infra (₹48L ARR, renewal in 11d, NPS 14 — critical). Recommend immediate outreach on Vantage Infra."
    if (m.includes("medcore")) return "MedCore Health — ₹22L ARR. Renewal in 28 days. NPS dropped from 61 to 38 last quarter. CSM: Priya. Last engagement: 14 days ago. No open success plan. Twin recommends scheduling an EBR this week."
    if (m.includes("nps")) return "NPS summary: Axiom Capital 72 (↑4), TechStack SaaS 81 (stable), Crestline Mfg 62 (↓3), MedCore Health 38 (↓23 — flagged), Vantage Infra 14 (critical). Portfolio average: 49."
    if (m.includes("task") || m.includes("overdue")) return "3 tasks are overdue: QBR prep for Vantage Infra (11d overdue), Success Plan renewal for MedCore (5d overdue), Integration health check for Axiom Capital (2d overdue)."
  } else {
    if (m.includes("mrr")) return "MRR this month: ₹5.4L. Up ₹0.3L from last month. YTD revenue: ₹42.5L. Pipeline: ₹1.3Cr across 4 active deals. MuleSoft Consulting driving 60% of revenue."
    if (m.includes("pipeline")) return "Pipeline health: ₹1.3Cr total. 1 deal in proposal (₹38L), 2 in negotiation (₹52L + ₹28L), 1 in discovery (₹22L). Win rate: 60%. Avg close cycle: 42 days."
    if (m.includes("decision") || m.includes("pending")) return "4 decisions pending approval: Advisory retainer expansion (₹8L/month), Q3 hiring plan (2 roles), Razorpay billing integration go-live, MuleSoft partnership tier upgrade."
    if (m.includes("blocker") || m.includes("department")) return "Highest open blockers: Implementation team at 90% utilisation (capacity ceiling), 2 client onboardings delayed pending legal sign-off, CS automation workflow blocked on Supabase schema approval."
  }
  return "I have noted your query. Based on current org memory and live signals, I will surface the relevant context. This response will be replaced with a live AI call when connected to the MCP layer."
}

export default WorkbenchPage
