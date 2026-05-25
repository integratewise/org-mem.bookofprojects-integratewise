"use client"

import { useState } from "react"
import type { Account } from "./dashboard"

interface AccountDetailProps {
  account: Account
}

const LAYERS = [
  { num: 1, name: "Account Master", icon: "◼" },
  { num: 2, name: "People / Team", icon: "◉" },
  { num: 3, name: "Business Context", icon: "◈" },
  { num: 4, name: "Strategic Objectives", icon: "◇" },
  { num: 5, name: "Capabilities", icon: "◑" },
  { num: 6, name: "Value Streams", icon: "◐" },
  { num: 7, name: "API Portfolio", icon: "◻" },
  { num: 8, name: "Platform Health", icon: "◎" },
  { num: 9, name: "Initiatives", icon: "◆" },
  { num: 10, name: "Risk Register", icon: "▲" },
  { num: 11, name: "Stakeholder Outcomes", icon: "◍" },
  { num: 12, name: "Engagement Log", icon: "◌" },
  { num: 13, name: "Success Plan", icon: "◊" },
  { num: 14, name: "Task Manager", icon: "▣" },
  { num: 15, name: "AI Insights", icon: "✦" },
]

const INITIATIVES = [
  { name: "API Migration v3 → v4", phase: "In Progress", investment: 120000, benefit: 240000, status: "On Track" },
  { name: "Platform SSO Rollout", phase: "Planning", investment: 45000, benefit: 90000, status: "On Track" },
  { name: "Data Analytics Integration", phase: "Blocked", investment: 80000, benefit: 200000, status: "Blocked" },
]

const RISKS = [
  { category: "Executive Sponsor", description: "Primary sponsor departed Q4", impact: 8, probability: 7, mitigation: "Identify new champion" },
  { category: "API Stability", description: "Error rate elevated 3 weeks", impact: 9, probability: 6, mitigation: "Scheduled architecture review" },
  { category: "Adoption", description: "Usage dropped 18% last 30 days", impact: 7, probability: 8, mitigation: "Re-engagement QBR scheduled" },
]

const TASKS = [
  { title: "Schedule Executive QBR", owner: "Sarah Chen", due: "3 days", priority: "Critical", linked: "Risk: Sponsor departure" },
  { title: "API health root cause analysis", owner: "Engineering", due: "1 week", priority: "High", linked: "Risk: API Stability" },
  { title: "Send usage report + commentary", owner: "Sarah Chen", due: "2 days", priority: "High", linked: "Adoption drop" },
  { title: "Update success plan objectives", owner: "Sarah Chen", due: "2 weeks", priority: "Medium", linked: "Layer 13: Success Plan" },
]

function healthColor(label: Account["healthLabel"]) {
  if (label === "Healthy") return "var(--health-green)"
  if (label === "At Risk") return "var(--health-amber)"
  return "var(--health-red)"
}

export default function AccountDetail({ account }: AccountDetailProps) {
  const [activeLayer, setActiveLayer] = useState(1)

  return (
    <div className="flex h-full">
      {/* Layer Nav */}
      <div
        className="w-48 shrink-0 border-r overflow-y-auto h-full py-3"
        style={{ borderColor: "var(--border)", background: "var(--card)" }}
      >
        <p className="text-[10px] font-medium uppercase tracking-widest px-4 mb-2" style={{ color: "var(--ink-muted)" }}>
          15 Layers
        </p>
        {LAYERS.map((layer) => (
          <button
            key={layer.num}
            onClick={() => setActiveLayer(layer.num)}
            className="w-full text-left px-4 py-2 flex items-center gap-2 transition-colors hover:bg-[#EAE5D8]"
            style={{
              background: activeLayer === layer.num ? "var(--paper-dark)" : "transparent",
              borderLeft: activeLayer === layer.num ? "2px solid var(--gold)" : "2px solid transparent",
            }}
          >
            <span className="text-xs shrink-0" style={{ color: "var(--gold)" }}>{layer.icon}</span>
            <span className="text-[11px] leading-tight" style={{ color: activeLayer === layer.num ? "var(--forest)" : "var(--ink-muted)" }}>
              <span className="font-medium" style={{ color: "var(--ink-muted)", fontSize: "10px" }}>{layer.num}.</span>{" "}
              {layer.name}
            </span>
          </button>
        ))}
      </div>

      {/* Detail Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Account header */}
        <div
          className="px-6 py-5 border-b flex items-start justify-between gap-4"
          style={{ borderColor: "var(--border)", background: "var(--card)" }}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-semibold" style={{ color: "var(--forest)", fontFamily: "var(--font-lora), serif" }}>
                {account.name}
              </h2>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded"
                style={{
                  background: account.healthLabel === "Critical" ? "#FDECEC" : account.healthLabel === "At Risk" ? "#FFF3E0" : "#E8F5EE",
                  color: healthColor(account.healthLabel),
                }}
              >
                {account.healthLabel}
              </span>
            </div>
            <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
              {account.industry} · CSM: {account.csm} · Last engagement: {account.lastEngagement}
            </p>
          </div>
          <div className="flex items-center gap-6 text-center shrink-0">
            <div>
              <p className="text-xl font-bold" style={{ color: "var(--forest)" }}>
                {account.healthScore}
              </p>
              <p className="text-[10px]" style={{ color: "var(--ink-muted)" }}>Health</p>
            </div>
            <div>
              <p className="text-xl font-bold" style={{ color: "var(--forest)" }}>
                ${(account.arr / 1000).toFixed(0)}K
              </p>
              <p className="text-[10px]" style={{ color: "var(--ink-muted)" }}>ARR</p>
            </div>
            <div>
              <p
                className="text-xl font-bold"
                style={{ color: account.renewalDays <= 30 ? "var(--health-red)" : "var(--forest)" }}
              >
                {account.renewalDays}d
              </p>
              <p className="text-[10px]" style={{ color: "var(--ink-muted)" }}>Renewal</p>
            </div>
            <div>
              <p className="text-xl font-bold" style={{ color: "var(--forest)" }}>{account.npsScore}</p>
              <p className="text-[10px]" style={{ color: "var(--ink-muted)" }}>NPS</p>
            </div>
          </div>
        </div>

        {/* Layer content */}
        <div className="p-6">
          <LayerContent layer={activeLayer} account={account} />
        </div>
      </div>
    </div>
  )
}

function LayerContent({ layer, account }: { layer: number; account: Account }) {
  const layerName = LAYERS.find((l) => l.num === layer)?.name ?? ""

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded"
          style={{ background: "var(--forest)", color: "var(--gold)" }}
        >
          Layer {layer}
        </span>
        <h3 className="text-sm font-semibold" style={{ color: "var(--forest)", fontFamily: "var(--font-lora), serif" }}>
          {layerName}
        </h3>
      </div>

      {layer === 1 && <Layer1 account={account} />}
      {layer === 2 && <Layer2 account={account} />}
      {layer === 3 && <Layer3 />}
      {layer === 4 && <Layer4 />}
      {layer === 5 && <Layer5 />}
      {layer === 6 && <Layer6 />}
      {layer === 7 && <Layer7 account={account} />}
      {layer === 8 && <Layer8 account={account} />}
      {layer === 9 && <Layer9 />}
      {layer === 10 && <Layer10 />}
      {layer === 11 && <Layer11 />}
      {layer === 12 && <Layer12 />}
      {layer === 13 && <Layer13 account={account} />}
      {layer === 14 && <Layer14 />}
      {layer === 15 && <Layer15 account={account} />}
    </div>
  )
}

function InfoGrid({ items }: { items: { label: string; value: string; alert?: boolean }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg p-3.5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <p className="text-[10px] font-medium uppercase tracking-wide mb-1" style={{ color: "var(--ink-muted)" }}>
            {item.label}
          </p>
          <p className="text-sm font-semibold" style={{ color: item.alert ? "var(--health-red)" : "var(--forest)" }}>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  )
}

function SectionNote({ text }: { text: string }) {
  return (
    <div className="mt-4 p-3 rounded-lg text-xs leading-relaxed" style={{ background: "var(--paper-dark)", color: "var(--ink-muted)", border: "1px solid var(--border)" }}>
      {text}
    </div>
  )
}

function Layer1({ account }: { account: Account }) {
  return (
    <InfoGrid items={[
      { label: "Contract Start", value: "Jan 1, 2023" },
      { label: "Renewal Date", value: `In ${account.renewalDays} days`, alert: account.renewalDays <= 30 },
      { label: "ARR", value: `$${(account.arr / 1000).toFixed(0)}K` },
      { label: "ACV", value: `$${(account.arr / 1000 / 12 * 1000).toFixed(0)} / mo` },
      { label: "Health Score", value: `${account.healthScore} / 100` },
      { label: "Engagement Cadence", value: "Bi-weekly" },
      { label: "Account Status", value: account.stage },
      { label: "Region", value: "North America" },
      { label: "Tier", value: "Enterprise" },
    ]} />
  )
}

function Layer2({ account }: { account: Account }) {
  return (
    <div className="space-y-4">
      <InfoGrid items={[
        { label: "CSM", value: account.csm },
        { label: "AE", value: "Jordan Kim" },
        { label: "Solutions Architect", value: "Dev Patel" },
        { label: "CSM ARR Load", value: "$1.2M total" },
        { label: "At-Risk ARR", value: "$780K" },
        { label: "Team Capacity", value: "87%" },
      ]} />
      <SectionNote text="Sarah Chen manages 8 accounts totalling $1.2M ARR. 3 of those accounts are at risk or critical, representing a concentration risk for the team." />
    </div>
  )
}

function Layer3() {
  return (
    <div className="space-y-4">
      <InfoGrid items={[
        { label: "Business Model", value: "B2B SaaS" },
        { label: "Market Position", value: "Market Leader" },
        { label: "Digital Maturity", value: "Advanced" },
        { label: "Cloud Strategy", value: "Hybrid" },
        { label: "IT Complexity", value: "High" },
        { label: "Data Classification", value: "Regulated (PII)" },
      ]} />
      <SectionNote text="Operating in a heavily regulated environment with significant legacy ERP dependencies. Cloud migration is a stated 3-year priority. Data sovereignty requirements constrain integration architecture choices." />
    </div>
  )
}

function Layer4() {
  const objectives = [
    { name: "Reduce operational costs by 22%", progress: 61, target: "Q4 2025", driver: "Automation" },
    { name: "Expand into APAC markets", progress: 18, target: "Q2 2026", driver: "Growth" },
    { name: "Achieve ISO 27001 certification", progress: 75, target: "Q1 2026", driver: "Compliance" },
  ]
  return (
    <div className="space-y-3">
      {objectives.map((obj) => (
        <div key={obj.name} className="rounded-lg p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-start justify-between gap-4 mb-3">
            <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>{obj.name}</p>
            <span className="text-[10px] px-2 py-0.5 rounded shrink-0" style={{ background: "var(--paper-dark)", color: "var(--ink-muted)" }}>
              {obj.driver}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
              <div className="h-full rounded-full" style={{ width: `${obj.progress}%`, background: "var(--forest-light)" }} />
            </div>
            <span className="text-xs font-semibold shrink-0" style={{ color: "var(--forest)" }}>{obj.progress}%</span>
            <span className="text-[10px] shrink-0" style={{ color: "var(--ink-muted)" }}>{obj.target}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function Layer5() {
  const capabilities = [
    { domain: "Data Integration", current: 3, target: 5, gap: 2, status: "In Progress" },
    { domain: "API Management", current: 4, target: 5, gap: 1, status: "Nearly Done" },
    { domain: "Security & Compliance", current: 2, target: 4, gap: 2, status: "Planning" },
    { domain: "Analytics & BI", current: 1, target: 4, gap: 3, status: "Not Started" },
    { domain: "Process Automation", current: 3, target: 5, gap: 2, status: "In Progress" },
  ]
  return (
    <div className="space-y-2">
      {capabilities.map((cap) => (
        <div key={cap.domain} className="rounded-lg p-3.5 flex items-center gap-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--forest)" }}>{cap.domain}</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="h-2 flex-1 rounded"
                  style={{
                    background: n <= cap.current ? "var(--forest)" : n <= cap.target ? "var(--forest-muted)" : "var(--border)",
                    opacity: n <= cap.current ? 1 : n <= cap.target ? 0.4 : 1,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px]" style={{ color: "var(--ink-muted)" }}>{cap.current} → {cap.target}</p>
            <p className="text-[10px] font-medium mt-0.5" style={{ color: cap.gap >= 3 ? "var(--health-amber)" : "var(--forest-muted)" }}>
              {cap.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function Layer6() {
  const streams = [
    { name: "Order Processing", volume: "42K txns/day", cycle: "4.2 hrs", value: "$8.4M/mo", csat: 72 },
    { name: "Customer Onboarding", volume: "120 / mo", cycle: "8.5 days", value: "$210K", csat: 58 },
    { name: "Support Resolution", volume: "890 / mo", cycle: "28 hrs", value: "$180K", csat: 61 },
  ]
  return (
    <div className="space-y-3">
      {streams.map((s) => (
        <div key={s.name} className="rounded-lg p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <p className="text-xs font-semibold mb-3" style={{ color: "var(--forest)" }}>{s.name}</p>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Volume", value: s.volume },
              { label: "Cycle Time", value: s.cycle },
              { label: "Business Value", value: s.value },
              { label: "CSAT", value: `${s.csat}/100` },
            ].map((m) => (
              <div key={m.label}>
                <p className="text-[10px]" style={{ color: "var(--ink-muted)" }}>{m.label}</p>
                <p className="text-xs font-semibold mt-0.5" style={{ color: "var(--forest)" }}>{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Layer7({ account }: { account: Account }) {
  const apis = [
    { name: "Core REST API v4", type: "REST", health: account.apiHealth, sla: 99.9, errors: 0.08, consuming: 12 },
    { name: "Webhook Events Bus", type: "Webhook", health: 97.4, sla: 99.5, errors: 0.24, consuming: 5 },
    { name: "GraphQL Gateway", type: "GraphQL", health: 99.1, sla: 99.5, errors: 0.12, consuming: 3 },
    { name: "Legacy SOAP Adapter", type: "SOAP", health: 88.2, sla: 95.0, errors: 1.8, consuming: 2 },
  ]
  return (
    <div className="space-y-2">
      {apis.map((api) => (
        <div key={api.name} className="rounded-lg p-3.5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono" style={{ background: "var(--paper-dark)", color: "var(--ink-muted)" }}>
                {api.type}
              </span>
              <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>{api.name}</p>
            </div>
            <span
              className="text-[10px] font-bold"
              style={{ color: api.health >= 99 ? "var(--health-green)" : api.health >= 95 ? "var(--health-amber)" : "var(--health-red)" }}
            >
              {api.health}% up
            </span>
          </div>
          <div className="flex gap-4 text-[11px]" style={{ color: "var(--ink-muted)" }}>
            <span>SLA: {api.sla}%</span>
            <span>Error rate: {api.errors}%</span>
            <span>{api.consuming} consuming apps</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function Layer8({ account }: { account: Account }) {
  const metrics = [
    { name: "API Uptime", current: account.apiHealth, target: 99.9, warn: 99, crit: 97, unit: "%" },
    { name: "Monthly Active Users", current: 412, target: 600, warn: 400, crit: 300, unit: "" },
    { name: "Feature Adoption Rate", current: 38, target: 70, warn: 45, crit: 30, unit: "%" },
    { name: "Support CSAT", current: account.npsScore, target: 80, warn: 60, crit: 40, unit: "" },
    { name: "Avg Response Time", current: 124, target: 100, warn: 200, crit: 400, unit: "ms" },
  ]
  return (
    <div className="space-y-2">
      {metrics.map((m) => {
        const pct = Math.min((m.current / m.target) * 100, 100)
        const color = m.current >= m.warn ? "var(--health-green)" : m.current >= m.crit ? "var(--health-amber)" : "var(--health-red)"
        return (
          <div key={m.name} className="rounded-lg p-3.5 flex items-center gap-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>{m.name}</p>
                <span className="text-xs font-bold" style={{ color }}>
                  {m.current}{m.unit}
                  <span className="text-[10px] font-normal ml-1" style={{ color: "var(--ink-muted)" }}>
                    / {m.target}{m.unit} target
                  </span>
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Layer9() {
  return (
    <div className="space-y-3">
      {INITIATIVES.map((init) => (
        <div key={init.name} className="rounded-lg p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>{init.name}</p>
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded"
              style={{
                background: init.status === "Blocked" ? "#FDECEC" : "#E8F5EE",
                color: init.status === "Blocked" ? "var(--health-red)" : "var(--health-green)",
              }}
            >
              {init.status}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-[10px]" style={{ color: "var(--ink-muted)" }}>Phase</p>
              <p className="text-xs font-medium mt-0.5" style={{ color: "var(--forest)" }}>{init.phase}</p>
            </div>
            <div>
              <p className="text-[10px]" style={{ color: "var(--ink-muted)" }}>Investment</p>
              <p className="text-xs font-medium mt-0.5" style={{ color: "var(--forest)" }}>${(init.investment / 1000).toFixed(0)}K</p>
            </div>
            <div>
              <p className="text-[10px]" style={{ color: "var(--ink-muted)" }}>Annual Benefit</p>
              <p className="text-xs font-medium mt-0.5" style={{ color: "var(--health-green)" }}>${(init.benefit / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Layer10() {
  return (
    <div className="space-y-3">
      {RISKS.map((risk) => {
        const composite = risk.impact * risk.probability
        const compositeColor = composite >= 60 ? "var(--health-red)" : composite >= 35 ? "var(--health-amber)" : "var(--health-green)"
        return (
          <div key={risk.category} className="rounded-lg p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "var(--gold)" }}>{risk.category}</span>
                <p className="text-xs font-semibold mt-0.5" style={{ color: "var(--forest)" }}>{risk.description}</p>
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ background: compositeColor + "22", color: compositeColor }}
              >
                {composite}
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3 text-[11px]" style={{ color: "var(--ink-muted)" }}>
              <span>Impact: <strong style={{ color: "var(--forest)" }}>{risk.impact}/10</strong></span>
              <span>Probability: <strong style={{ color: "var(--forest)" }}>{risk.probability}/10</strong></span>
            </div>
            <div className="mt-2 text-[11px] p-2 rounded" style={{ background: "var(--paper-dark)", color: "var(--ink-muted)" }}>
              Mitigation: {risk.mitigation}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Layer11() {
  const stakeholders = [
    { name: "James Whitmore", role: "CTO", outcome: "Zero unplanned downtime", baseline: 3, current: 1.2, target: 0, unit: "incidents/mo" },
    { name: "Diane Reeves", role: "VP Operations", outcome: "25% cost reduction", baseline: 100, current: 82, target: 75, unit: "% baseline" },
    { name: "Kevin Shah", role: "Head of Engineering", outcome: "API latency < 100ms", baseline: 380, current: 124, target: 100, unit: "ms" },
  ]
  return (
    <div className="space-y-3">
      {stakeholders.map((s) => (
        <div key={s.name} className="rounded-lg p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>{s.name}</p>
              <p className="text-[10px]" style={{ color: "var(--ink-muted)" }}>{s.role}</p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: "var(--paper-dark)", color: "var(--ink-muted)" }}>
              {s.outcome}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: "Baseline", value: s.baseline },
              { label: "Current", value: s.current },
              { label: "Target", value: s.target },
            ].map((m) => (
              <div key={m.label} className="rounded p-2" style={{ background: "var(--paper-dark)" }}>
                <p className="text-[10px]" style={{ color: "var(--ink-muted)" }}>{m.label}</p>
                <p className="text-xs font-bold mt-0.5" style={{ color: "var(--forest)" }}>{m.value} <span className="text-[10px] font-normal">{s.unit}</span></p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Layer12() {
  const entries = [
    { type: "QBR", date: "May 10", attendees: "James W, Diane R, Sarah C, Jordan K", sentiment: "Positive", topics: "Roadmap review, API migration update", next: "Technical deep dive Jun 3" },
    { type: "Escalation Call", date: "Apr 28", attendees: "Kevin S, Dev P, Sarah C", sentiment: "Tense", topics: "API error spike, SOAP adapter instability", next: "RCA delivery May 2" },
    { type: "Check-in", date: "Apr 15", attendees: "Diane R, Sarah C", sentiment: "Neutral", topics: "Usage review, onboarding backlog", next: "Usage report May 5" },
  ]
  return (
    <div className="space-y-3">
      {entries.map((e) => (
        <div key={e.date} className="rounded-lg p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: "var(--paper-dark)", color: "var(--forest)" }}>{e.type}</span>
              <span className="text-[11px]" style={{ color: "var(--ink-muted)" }}>{e.date}</span>
            </div>
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded"
              style={{
                background: e.sentiment === "Positive" ? "#E8F5EE" : e.sentiment === "Tense" ? "#FDECEC" : "#F5F5F0",
                color: e.sentiment === "Positive" ? "var(--health-green)" : e.sentiment === "Tense" ? "var(--health-red)" : "var(--ink-muted)",
              }}
            >
              {e.sentiment}
            </span>
          </div>
          <p className="text-[11px] mb-1" style={{ color: "var(--forest)" }}>{e.topics}</p>
          <p className="text-[10px]" style={{ color: "var(--ink-muted)" }}>Attendees: {e.attendees}</p>
          <p className="text-[10px] mt-1" style={{ color: "var(--gold)" }}>→ {e.next}</p>
        </div>
      ))}
    </div>
  )
}

function Layer13({ account }: { account: Account }) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <p className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: "var(--gold)" }}>Executive Summary</p>
        <p className="text-xs leading-relaxed" style={{ color: "var(--forest)" }}>
          {account.name} is a {account.healthLabel === "Healthy" ? "high-performing" : "high-risk"} enterprise account with {account.renewalDays} days to renewal.
          Primary focus areas: executive champion stabilization, API platform health, and usage re-engagement. Expansion pipeline of ${(account.expansion / 1000).toFixed(0)}K identified pending health recovery.
        </p>
      </div>
      <InfoGrid items={[
        { label: "Account Plan", value: "v3 — Updated May 2025" },
        { label: "Executive Sponsor (Us)", value: "Rachel Odom, VP CS" },
        { label: "Executive Sponsor (Them)", value: "James Whitmore, CTO" },
        { label: "Next QBR", value: "Jun 3, 2025" },
        { label: "Success Milestones", value: "4 of 7 achieved" },
        { label: "Renewal Confidence", value: account.healthLabel === "Critical" ? "Low" : account.healthLabel === "At Risk" ? "Medium" : "High" },
      ]} />
    </div>
  )
}

function Layer14() {
  return (
    <div className="space-y-2">
      {TASKS.map((task) => (
        <div key={task.title} className="rounded-lg p-3.5 flex items-start gap-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div
            className="w-4 h-4 rounded border-2 mt-0.5 shrink-0"
            style={{ borderColor: task.priority === "Critical" ? "var(--health-red)" : task.priority === "High" ? "var(--health-amber)" : "var(--border)" }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>{task.title}</p>
            <p className="text-[10px] mt-0.5" style={{ color: "var(--ink-muted)" }}>
              {task.owner} · Due: {task.due} · Linked: {task.linked}
            </p>
          </div>
          <span
            className="text-[10px] font-medium px-2 py-0.5 rounded shrink-0"
            style={{
              background: task.priority === "Critical" ? "#FDECEC" : task.priority === "High" ? "#FFF3E0" : "var(--paper-dark)",
              color: task.priority === "Critical" ? "var(--health-red)" : task.priority === "High" ? "var(--health-amber)" : "var(--ink-muted)",
            }}
          >
            {task.priority}
          </span>
        </div>
      ))}
    </div>
  )
}

function Layer15({ account }: { account: Account }) {
  const insights = [
    {
      type: "Risk",
      confidence: 92,
      text: `${account.name} exhibits a churn signal pattern: executive sponsor departure + usage decline + open critical risks. Historical similarity: 78% of accounts with this pattern churned within 90 days without intervention.`,
      action: "Schedule executive QBR within 7 days. Involve your VP of CS.",
      linked: ["Risk Register", "Engagement Log", "Platform Health"],
    },
    {
      type: "Opportunity",
      confidence: 81,
      text: `API v4 migration completion will unlock the Analytics module. ${account.name} has expressed strong interest in BI capabilities (Layer 4 Objective 2). Expansion opportunity of $${(account.expansion / 1000).toFixed(0)}K identified.`,
      action: "Include Analytics roadmap demo in next QBR. Tie to cost reduction objective.",
      linked: ["API Portfolio", "Strategic Objectives", "Initiatives"],
    },
    {
      type: "Pattern",
      confidence: 74,
      text: "Support ticket volume has increased 34% over 60 days while CSAT has declined 11 points. This precedes a relationship depth drop in similar accounts. Proactive intervention recommended before next renewal cycle.",
      action: "Assign TAM to shadow 3 open tickets. Identify systemic cause.",
      linked: ["Platform Health", "Stakeholder Outcomes"],
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: "#1A3A2A11", border: "1px solid #1A3A2A22" }}>
        <span style={{ color: "var(--gold)" }}>✦</span>
        <p className="text-xs" style={{ color: "var(--forest)" }}>
          <strong>Twin Workbench Active</strong> — AI is operating on full account context: 15 layers, {account.name} history, team patterns.
        </p>
      </div>
      {insights.map((ins) => (
        <div key={ins.text.slice(0, 30)} className="rounded-lg p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded"
              style={{
                background: ins.type === "Risk" ? "#FDECEC" : ins.type === "Opportunity" ? "#E8F5EE" : "#E8F0FF",
                color: ins.type === "Risk" ? "var(--health-red)" : ins.type === "Opportunity" ? "var(--health-green)" : "#3B5BDB",
              }}
            >
              {ins.type}
            </span>
            <span className="text-[10px] font-semibold" style={{ color: "var(--gold)" }}>
              {ins.confidence}% confidence
            </span>
          </div>
          <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--forest)" }}>{ins.text}</p>
          <div className="p-2.5 rounded" style={{ background: "var(--forest)", color: "var(--paper)" }}>
            <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: "var(--gold)" }}>Recommended Action</p>
            <p className="text-xs leading-relaxed">{ins.action}</p>
          </div>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {ins.linked.map((l) => (
              <span key={l} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "var(--paper-dark)", color: "var(--ink-muted)" }}>
                {l}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
