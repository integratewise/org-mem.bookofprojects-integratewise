"use client"

import type { Account } from "./dashboard"

interface AccountListProps {
  accounts: Account[]
  selectedId?: string
  onSelect: (account: Account) => void
}

function healthColor(label: Account["healthLabel"]) {
  if (label === "Healthy") return "var(--health-green)"
  if (label === "At Risk") return "var(--health-amber)"
  return "var(--health-red)"
}

function healthBg(label: Account["healthLabel"]) {
  if (label === "Healthy") return "#E8F5EE"
  if (label === "At Risk") return "#FFF3E0"
  return "#FDECEC"
}

export default function AccountList({ accounts, selectedId, onSelect }: AccountListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {accounts.map((account) => {
        const isSelected = account.id === selectedId
        return (
          <button
            key={account.id}
            onClick={() => onSelect(account)}
            className="w-full text-left px-4 py-3.5 border-b transition-colors hover:bg-[#EAE5D8]"
            style={{
              borderColor: "var(--border)",
              background: isSelected ? "var(--paper-dark)" : "transparent",
            }}
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="text-xs font-semibold leading-tight" style={{ color: "var(--forest)" }}>
                {account.name}
              </span>
              <span
                className="text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0"
                style={{ background: healthBg(account.healthLabel), color: healthColor(account.healthLabel) }}
              >
                {account.healthLabel}
              </span>
            </div>
            <p className="text-[11px] mb-2" style={{ color: "var(--ink-muted)" }}>
              {account.industry}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold" style={{ color: "var(--forest)" }}>
                  ${(account.arr / 1000).toFixed(0)}K ARR
                </span>
                <span className="text-[11px]" style={{ color: account.renewalDays <= 30 ? "var(--health-red)" : "var(--ink-muted)" }}>
                  {account.renewalDays}d renewal
                </span>
              </div>
              {/* Health bar */}
              <div className="flex items-center gap-1">
                <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${account.healthScore}%`,
                      background: healthColor(account.healthLabel),
                    }}
                  />
                </div>
                <span className="text-[10px] font-medium" style={{ color: healthColor(account.healthLabel) }}>
                  {account.healthScore}
                </span>
              </div>
            </div>
            {(account.openRisks > 0 || account.openTasks > 0) && (
              <div className="flex gap-2 mt-1.5">
                {account.openRisks > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "#FDECEC", color: "var(--health-red)" }}>
                    {account.openRisks} risks
                  </span>
                )}
                {account.openTasks > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "#E8F0FF", color: "#3B5BDB" }}>
                    {account.openTasks} tasks
                  </span>
                )}
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
