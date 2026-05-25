"use client"

import { BarChart3 } from "lucide-react"

interface AIInsight {
  id: string
  title: string
  stat: string
  trend: "up" | "down" | "stable"
  description: string
}

interface AIInsightsPanelProps {
  isOpen: boolean
  insights?: AIInsight[]
}

export default function AIInsightsPanel({ isOpen, insights = [] }: AIInsightsPanelProps) {
  if (!isOpen || insights.length === 0) return null

  return (
    <div
      className="fixed right-0 top-0 h-full w-96 shadow-2xl overflow-y-auto transition-transform duration-300 border-l z-40"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
      }}
    >
      {/* Header */}
      <div className="sticky top-0 px-6 py-4 border-b" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <div className="flex items-center gap-2">
          <BarChart3 size={18} style={{ color: "var(--gold)" }} />
          <h2 className="text-sm font-semibold" style={{ color: "var(--forest)" }}>
            AI Insights
          </h2>
        </div>
        <p className="text-xs mt-1" style={{ color: "var(--ink-muted)" }}>
          Real-time signals & recommendations
        </p>
      </div>

      {/* Insights List */}
      <div className="p-6 space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="rounded-lg p-4 border"
            style={{
              background: "var(--paper-dark)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-xs font-semibold" style={{ color: "var(--forest)" }}>
                {insight.title}
              </h3>
              <span
                className="text-xs font-bold"
                style={{
                  color:
                    insight.trend === "up"
                      ? "var(--health-red)"
                      : insight.trend === "down"
                        ? "var(--health-green)"
                        : "var(--ink-muted)",
                }}
              >
                {insight.trend === "up" ? "↑" : insight.trend === "down" ? "↓" : "→"}
              </span>
            </div>

            <p className="text-lg font-bold mb-2" style={{ color: "var(--gold)" }}>
              {insight.stat}
            </p>

            <p className="text-[11px] leading-relaxed" style={{ color: "var(--ink-muted)" }}>
              {insight.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
