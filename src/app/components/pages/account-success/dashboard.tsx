"use client"

import { useState } from "react"
import AccountList from "./account-list"
import AccountDetail from "./account-detail"

export type Account = {
  id: string
  name: string
  industry: string
  arr: number
  healthScore: number
  healthLabel: "Healthy" | "At Risk" | "Critical"
  csm: string
  renewalDays: number
  stage: string
  npsScore: number
  lastEngagement: string
  openRisks: number
  openTasks: number
  apiHealth: number
  expansion: number
}

const ACCOUNTS: Account[] = [
  {
    id: "1",
    name: "Axiom Financial",
    industry: "Financial Services",
    arr: 420000,
    healthScore: 87,
    healthLabel: "Healthy",
    csm: "Sarah Chen",
    renewalDays: 94,
    stage: "Expansion",
    npsScore: 72,
    lastEngagement: "2 days ago",
    openRisks: 1,
    openTasks: 4,
    apiHealth: 99.2,
    expansion: 180000,
  },
  {
    id: "2",
    name: "MedCore Health Systems",
    industry: "Healthcare",
    arr: 310000,
    healthScore: 54,
    healthLabel: "At Risk",
    csm: "Marcus Webb",
    renewalDays: 28,
    stage: "Renewal Risk",
    npsScore: 38,
    lastEngagement: "12 days ago",
    openRisks: 5,
    openTasks: 9,
    apiHealth: 94.1,
    expansion: 0,
  },
  {
    id: "3",
    name: "Stellarworks SaaS",
    industry: "Technology",
    arr: 195000,
    healthScore: 91,
    healthLabel: "Healthy",
    csm: "Priya Nair",
    renewalDays: 187,
    stage: "Expansion",
    npsScore: 81,
    lastEngagement: "1 day ago",
    openRisks: 0,
    openTasks: 2,
    apiHealth: 99.9,
    expansion: 95000,
  },
  {
    id: "4",
    name: "Vantage Telecom",
    industry: "Telecommunications",
    arr: 540000,
    healthScore: 31,
    healthLabel: "Critical",
    csm: "Sarah Chen",
    renewalDays: 11,
    stage: "Churn Risk",
    npsScore: 14,
    lastEngagement: "21 days ago",
    openRisks: 9,
    openTasks: 14,
    apiHealth: 88.7,
    expansion: 0,
  },
  {
    id: "5",
    name: "Crestline Manufacturing",
    industry: "Manufacturing",
    arr: 260000,
    healthScore: 73,
    healthLabel: "Healthy",
    csm: "Marcus Webb",
    renewalDays: 142,
    stage: "Stable",
    npsScore: 62,
    lastEngagement: "5 days ago",
    openRisks: 2,
    openTasks: 5,
    apiHealth: 97.6,
    expansion: 40000,
  },
  {
    id: "6",
    name: "Luminos Retail Group",
    industry: "Retail & Commerce",
    arr: 88000,
    healthScore: 68,
    healthLabel: "Healthy",
    csm: "Priya Nair",
    renewalDays: 63,
    stage: "Stable",
    npsScore: 55,
    lastEngagement: "4 days ago",
    openRisks: 2,
    openTasks: 3,
    apiHealth: 98.4,
    expansion: 22000,
  },
]

interface AccountSuccessDashboardProps {
  navItem?: string
}

export default function AccountSuccessDashboard({ navItem = "overview" }: AccountSuccessDashboardProps) {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)

  const totalArr = ACCOUNTS.reduce((s, a) => s + a.arr, 0)
  const atRisk = ACCOUNTS.filter((a) => a.healthLabel !== "Healthy").length
  const renewingSoon = ACCOUNTS.filter((a) => a.renewalDays <= 30).length
  const totalExpansion = ACCOUNTS.reduce((s, a) => s + a.expansion, 0)

  const renderContent = () => {
    switch (navItem) {
      case "accounts":
        return (
          <div className="flex h-full gap-6 p-6">
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--forest)" }}>
                Account Portfolio
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ACCOUNTS.map((account) => (
                  <div
                    key={account.id}
                    onClick={() => setSelectedAccount(account)}
                    className="p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md"
                    style={{
                      background: selectedAccount?.id === account.id ? "var(--paper-dark)" : "var(--card)",
                      borderColor: selectedAccount?.id === account.id ? "var(--gold)" : "var(--border)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold" style={{ color: "var(--forest)" }}>
                          {account.name}
                        </h4>
                        <p className="text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>
                          {account.industry}
                        </p>
                      </div>
                      <span
                        className="text-[10px] font-semibold px-2 py-1 rounded shrink-0"
                        style={{
                          background: account.healthLabel === "Healthy" ? "#E8F5EE" : account.healthLabel === "At Risk" ? "#FFF3E0" : "#FDECEC",
                          color: account.healthLabel === "Healthy" ? "var(--health-green)" : account.healthLabel === "At Risk" ? "var(--health-amber)" : "var(--health-red)",
                        }}
                      >
                        {account.healthLabel}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs border-t pt-3" style={{ borderColor: "var(--border)" }}>
                      <div>
                        <p style={{ color: "var(--ink-muted)" }}>ARR</p>
                        <p className="font-semibold" style={{ color: "var(--forest)" }}>
                          ${(account.arr / 1000).toFixed(0)}K
                        </p>
                      </div>
                      <div>
                        <p style={{ color: "var(--ink-muted)" }}>Renewal</p>
                        <p className="font-semibold" style={{ color: account.renewalDays <= 30 ? "var(--health-red)" : "var(--forest)" }}>
                          {account.renewalDays}d
                        </p>
                      </div>
                      <div>
                        <p style={{ color: "var(--ink-muted)" }}>Health</p>
                        <p className="font-semibold" style={{ color: "var(--forest)" }}>
                          {account.healthScore}%
                        </p>
                      </div>
                      <div>
                        <p style={{ color: "var(--ink-muted)" }}>NPS</p>
                        <p className="font-semibold" style={{ color: account.npsScore < 40 ? "var(--health-red)" : "var(--forest)" }}>
                          {account.npsScore}
                        </p>
                      </div>
                      <div>
                        <p style={{ color: "var(--ink-muted)" }}>API Health</p>
                        <p className="font-semibold" style={{ color: "var(--forest)" }}>
                          {account.apiHealth}%
                        </p>
                      </div>
                      <div>
                        <p style={{ color: "var(--ink-muted)" }}>Stage</p>
                        <p className="font-semibold text-[10px]" style={{ color: "var(--forest)" }}>
                          {account.stage}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t flex justify-between text-[10px]" style={{ borderColor: "var(--border)" }}>
                      <div>
                        <p style={{ color: "var(--ink-muted)" }}>CSM</p>
                        <p className="font-semibold" style={{ color: "var(--forest)" }}>
                          {account.csm}
                        </p>
                      </div>
                      <div className="text-right">
                        <p style={{ color: "var(--ink-muted)" }}>Open Items</p>
                        <p className="font-semibold" style={{ color: account.openRisks + account.openTasks > 0 ? "var(--health-red)" : "var(--forest)" }}>
                          {account.openRisks + account.openTasks}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-96">
              {selectedAccount ? (
                <AccountDetail account={selectedAccount} />
              ) : (
                <EmptyState />
              )}
            </div>
          </div>
        )

      case "risks":
        return (
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--forest)" }}>
              Risk Register
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACCOUNTS.filter((a) => a.openRisks > 0).map((account) => (
                <div key={account.id} className="p-4 rounded-lg border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold" style={{ color: "var(--forest)" }}>
                        {account.name}
                      </h3>
                      <p className="text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>
                        {account.industry}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded font-semibold shrink-0" style={{ background: "#FDECEC", color: "var(--health-red)" }}>
                      {account.openRisks} risks
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-xs border-t pt-3" style={{ borderColor: "var(--border)", color: "var(--ink-muted)" }}>
                    <div className="flex justify-between">
                      <span>Health Score:</span>
                      <span className="font-semibold" style={{ color: "var(--forest)" }}>{account.healthScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Renewal Risk:</span>
                      <span className="font-semibold" style={{ color: account.renewalDays <= 30 ? "var(--health-red)" : "var(--forest)" }}>
                        {account.renewalDays}d
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>NPS Trend:</span>
                      <span className="font-semibold" style={{ color: account.npsScore < 40 ? "var(--health-red)" : "var(--forest)" }}>
                        {account.npsScore} / 100
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Stage:</span>
                      <span className="font-semibold" style={{ color: "var(--forest)" }}>{account.stage}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t" style={{ borderColor: "var(--border)" }}>
                      <span>Assigned CSM:</span>
                      <span className="font-semibold" style={{ color: "var(--forest)" }}>{account.csm}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "tasks":
        return (
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--forest)" }}>
              Task Manager
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACCOUNTS.filter((a) => a.openTasks > 0).map((account) => (
                <div key={account.id} className="p-4 rounded-lg border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold" style={{ color: "var(--forest)" }}>
                        {account.name}
                      </h3>
                      <p className="text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>
                        {account.stage}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded font-semibold shrink-0" style={{ background: "#E8F0FF", color: "#3B5BDB" }}>
                      {account.openTasks} tasks
                    </span>
                  </div>

                  <div className="space-y-2 text-xs border-t pt-3" style={{ borderColor: "var(--border)", color: "var(--ink-muted)" }}>
                    <div className="flex justify-between">
                      <span>ARR:</span>
                      <span className="font-semibold" style={{ color: "var(--forest)" }}>${(account.arr / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Priority:</span>
                      <span className="font-semibold" style={{ color: account.renewalDays <= 30 ? "var(--health-red)" : "#3B5BDB" }}>
                        {account.renewalDays <= 30 ? "Critical" : "Standard"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Health:</span>
                      <span className="font-semibold" style={{ color: "var(--forest)" }}>{account.healthLabel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Due:</span>
                      <span className="font-semibold" style={{ color: "var(--forest)" }}>{account.lastEngagement}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t" style={{ borderColor: "var(--border)" }}>
                      <span>Owner:</span>
                      <span className="font-semibold" style={{ color: "var(--forest)" }}>{account.csm.split(" ")[0]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "engagement":
        return (
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--forest)" }}>
              Engagement Log
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACCOUNTS.map((account) => (
                <div key={account.id} className="p-4 rounded-lg border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold" style={{ color: "var(--forest)" }}>
                        {account.name}
                      </h3>
                      <p className="text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>
                        {account.industry}
                      </p>
                    </div>
                    <span
                      className="text-[10px] px-2 py-1 rounded font-semibold shrink-0"
                      style={{
                        background: account.healthLabel === "Healthy" ? "#E8F5EE" : account.healthLabel === "At Risk" ? "#FFF3E0" : "#FDECEC",
                        color: account.healthLabel === "Healthy" ? "var(--health-green)" : account.healthLabel === "At Risk" ? "var(--health-amber)" : "var(--health-red)",
                      }}
                    >
                      {account.healthLabel}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs border-t pt-3" style={{ borderColor: "var(--border)", color: "var(--ink-muted)" }}>
                    <div className="flex justify-between">
                      <span>Last Contact:</span>
                      <span className="font-semibold" style={{ color: "var(--forest)" }}>{account.lastEngagement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Account Manager:</span>
                      <span className="font-semibold" style={{ color: "var(--forest)" }}>{account.csm}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>NPS Score:</span>
                      <span className="font-semibold" style={{ color: account.npsScore < 40 ? "var(--health-red)" : "var(--forest)" }}>
                        {account.npsScore}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Renewal Date:</span>
                      <span className="font-semibold" style={{ color: "var(--forest)" }}>
                        {new Date(new Date().getTime() + account.renewalDays * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t" style={{ borderColor: "var(--border)" }}>
                      <span>ARR Status:</span>
                      <span className="font-semibold" style={{ color: "var(--forest)" }}>${(account.arr / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="p-6 space-y-6">
            {/* Portfolio KPIs - Card Grid with Detailed Values */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  label: "Total ARR",
                  value: `$${(totalArr / 1000).toFixed(0)}K`,
                  subtext: `${ACCOUNTS.length} accounts`,
                  trend: "↑ 12% vs Q1",
                  icon: "💰",
                },
                {
                  label: "Expansion Pipeline",
                  value: `$${(totalExpansion / 1000).toFixed(0)}K`,
                  subtext: `${ACCOUNTS.filter((a) => a.expansion > 0).length} accounts expanding`,
                  trend: "↑ $80K this month",
                  icon: "📈",
                },
                {
                  label: "At Risk / Critical",
                  value: `${atRisk} accts`,
                  subtext: `$${ACCOUNTS.filter((a) => a.healthLabel !== "Healthy").reduce((s, a) => s + a.arr, 0) / 1000 | 0}K ARR at risk`,
                  alert: atRisk > 0,
                  trend: "↑ 1 new risk",
                  icon: "⚠",
                },
                {
                  label: "Renewing ≤ 30d",
                  value: `${renewingSoon} accts`,
                  subtext: `$${ACCOUNTS.filter((a) => a.renewalDays <= 30).reduce((s, a) => s + a.arr, 0) / 1000 | 0}K at renewal`,
                  alert: renewingSoon > 0,
                  trend: "Next: MedCore in 28d",
                  icon: "⏰",
                },
              ].map((kpi) => (
                <div key={kpi.label} className="p-4 rounded-lg border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
                    {kpi.icon} {kpi.label}
                  </p>
                  <p
                    className="text-xl font-bold mt-2 mb-2"
                    style={{ color: kpi.alert ? "var(--health-red)" : "var(--forest)" }}
                  >
                    {kpi.value}
                  </p>
                  <p className="text-[10px] leading-snug mb-2" style={{ color: "var(--ink-muted)" }}>
                    {kpi.subtext}
                  </p>
                  <p className="text-[10px] font-medium" style={{ color: kpi.alert ? "var(--health-red)" : "var(--forest)" }}>
                    {kpi.trend}
                  </p>
                </div>
              ))}
            </div>

            {/* Health Status Blocks - Rich Data Cards */}
            <div>
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--forest)" }}>
                Account Health Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ACCOUNTS.slice(0, 6).map((account) => (
                  <div key={account.id} className="p-4 rounded-lg border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                    {/* Header - Name and Status Badge */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex-1">
                        <h4 className="text-xs font-semibold leading-tight" style={{ color: "var(--forest)" }}>
                          {account.name}
                        </h4>
                        <p className="text-[10px] mt-0.5" style={{ color: "var(--ink-muted)" }}>
                          {account.industry}
                        </p>
                      </div>
                      <span
                        className="text-[10px] font-medium px-2 py-1 rounded shrink-0 whitespace-nowrap"
                        style={{
                          background: account.healthLabel === "Healthy" ? "#E8F5EE" : account.healthLabel === "At Risk" ? "#FFF3E0" : "#FDECEC",
                          color: account.healthLabel === "Healthy" ? "var(--health-green)" : account.healthLabel === "At Risk" ? "var(--health-amber)" : "var(--health-red)",
                        }}
                      >
                        {account.healthLabel}
                      </span>
                    </div>

                    {/* Health Score Progress */}
                    <div className="mb-3 pb-3 border-b" style={{ borderColor: "var(--border)" }}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[11px]" style={{ color: "var(--ink-muted)" }}>Health Score</p>
                        <p className="text-[11px] font-semibold" style={{ color: "var(--forest)" }}>{account.healthScore}%</p>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${account.healthScore}%`,
                            background: account.healthLabel === "Healthy" ? "var(--health-green)" : account.healthLabel === "At Risk" ? "var(--health-amber)" : "var(--health-red)",
                          }}
                        />
                      </div>
                    </div>

                    {/* KPI Grid - Real Values */}
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <p style={{ color: "var(--ink-muted)" }}>ARR</p>
                        <p className="font-semibold" style={{ color: "var(--forest)" }}>${(account.arr / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p style={{ color: "var(--ink-muted)" }}>Renewal</p>
                        <p className="font-semibold" style={{ color: account.renewalDays <= 30 ? "var(--health-red)" : "var(--forest)" }}>
                          {account.renewalDays}d
                        </p>
                      </div>
                      <div>
                        <p style={{ color: "var(--ink-muted)" }}>NPS Score</p>
                        <p className="font-semibold" style={{ color: "var(--forest)" }}>{account.npsScore}</p>
                      </div>
                      <div>
                        <p style={{ color: "var(--ink-muted)" }}>API Health</p>
                        <p className="font-semibold" style={{ color: "var(--forest)" }}>{account.apiHealth}%</p>
                      </div>
                      <div>
                        <p style={{ color: "var(--ink-muted)" }}>Stage</p>
                        <p className="font-semibold text-[10px]" style={{ color: "var(--forest)" }}>{account.stage}</p>
                      </div>
                      <div>
                        <p style={{ color: "var(--ink-muted)" }}>CSM</p>
                        <p className="font-semibold text-[10px]" style={{ color: "var(--forest)" }}>{account.csm.split(" ")[0]}</p>
                      </div>
                    </div>

                    {/* Expansion & Risks Footer */}
                    <div className="mt-3 pt-3 border-t flex justify-between text-[10px]" style={{ borderColor: "var(--border)" }}>
                      <div>
                        <p style={{ color: "var(--ink-muted)" }}>Expansion</p>
                        <p className="font-semibold" style={{ color: account.expansion > 0 ? "var(--health-green)" : "var(--ink-muted)" }}>
                          {account.expansion > 0 ? `$${(account.expansion / 1000).toFixed(0)}K` : "—"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p style={{ color: "var(--ink-muted)" }}>Open Items</p>
                        <p className="font-semibold" style={{ color: "var(--forest)" }}>
                          {account.openRisks + account.openTasks}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex h-full flex-col w-full" style={{ background: "var(--paper)" }}>
      {/* Header */}
      <div className="px-6 py-4 border-b" style={{ borderColor: "var(--border)" }}>
        <h1 className="text-lg font-semibold" style={{ color: "var(--forest)", fontFamily: "var(--font-lora), serif" }}>
          Account Success
        </h1>
        <p className="text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>
          Portfolio Intelligence — {ACCOUNTS.length} accounts
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-12">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
        style={{ background: "var(--paper-dark)", color: "var(--forest-muted)" }}
      >
        ◎
      </div>
      <h2 className="text-sm font-semibold" style={{ color: "var(--forest)" }}>Select an account</h2>
      <p className="text-xs leading-relaxed" style={{ color: "var(--ink-muted)" }}>
        Choose an account from the list to view its 15-layer intelligence graph — from contract metadata to AI-generated strategic insights.
      </p>
    </div>
  )
}
