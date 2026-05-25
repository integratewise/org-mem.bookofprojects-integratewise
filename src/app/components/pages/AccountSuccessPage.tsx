"use client"

import { useState, useMemo } from "react"
import LeftRail from "../left-rail"
import ExpandedSidebar from "../expanded-sidebar"
import CognitiveOverlay from "../cognitive-overlay"
import GovernancePopup from "../governance-popup"
import AIInsightsPanel from "../ai-insights-panel"
import BottomStatusBar from "../bottom-status-bar"
import TwinWindow from "../twin-window"
import AccountSuccessDashboard from "./account-success/dashboard"

type ActiveProduct = "account-success" | "bizops"
type WorkspaceMode = "workbench" | "cognitive" | "twin" | "operator"

export function AccountSuccessPage() {
  const [activeNavItem, setActiveNavItem] = useState<string>("overview")
  const [activeMode, setActiveMode] = useState<WorkspaceMode>("workbench")
  const [showAIInsights] = useState(true)

  const aiInsights = useMemo(
    () => [
      {
        id: "1",
        title: "At-Risk Revenue",
        stat: "₹8.5L ARR",
        trend: "down" as const,
        description: "2 accounts at critical health — Vantage Telecom renews in 11 days. Immediate action required.",
      },
      {
        id: "2",
        title: "Expansion Pipeline",
        stat: "₹2.75L",
        trend: "up" as const,
        description: "Axiom Financial and Stellarworks SaaS showing strong expansion signals. Engage this week.",
      },
      {
        id: "3",
        title: "Engagement Gap",
        stat: "+12 days",
        trend: "down" as const,
        description: "Vantage Telecom last contacted 21 days ago. Cadence failure is a leading churn indicator.",
      },
    ],
    []
  )

  const governanceNotifications = useMemo(
    () => [
      {
        id: "gov-1",
        title: "Approval Required",
        description: "Vantage Telecom renewal exception needs CSM lead approval — 11 days to renewal.",
        type: "approval" as const,
        action: {
          label: "Review",
          onClick: () => {},
        },
      },
      {
        id: "gov-2",
        title: "Governance Alert",
        description: "MedCore Health: 5 open risks, no updates in 12 days. Escalation threshold reached.",
        type: "governance" as const,
      },
    ],
    []
  )

  const cognitiveInsights = useMemo(
    () => [
      {
        id: "cog-1",
        title: "Renewal Pattern Detected",
        description: "Accounts with NPS < 40 and renewal ≤ 30 days have 78% churn probability. MedCore matches profile.",
        priority: "high" as const,
        action: "Schedule executive review for MedCore Health this week",
      },
      {
        id: "cog-2",
        title: "Expansion Signal",
        description: "Axiom Financial API usage +34% MoM. Strong indicator for upsell conversation.",
        priority: "medium" as const,
        action: "Prepare expansion proposal for Axiom Financial",
      },
    ],
    []
  )

  return (
    <div className="flex h-screen overflow-hidden relative" style={{ background: "var(--paper)" }}>
      {/* Left Rail — Workspace Mode Switcher */}
      <LeftRail activeMode={activeMode} onModeChange={setActiveMode} />

      {/* Expanded Sidebar — Navigation, Search, Account List */}
      <ExpandedSidebar
        activeProduct={"account-success" as ActiveProduct}
        onProductChange={() => {}}
        activeNavItem={activeNavItem}
        onNavItemChange={setActiveNavItem}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative pb-10">
        {activeMode === "workbench" && (
          <AccountSuccessDashboard navItem={activeNavItem} />
        )}

        {activeMode === "workbench" && (
          <CognitiveOverlay isOpen={true} onClose={() => {}} insights={cognitiveInsights} />
        )}

        {activeMode === "twin" && (
          <TwinWindow isOpen={true} onClose={() => setActiveMode("workbench")} />
        )}

        {activeMode === "operator" && (
          <div className="flex items-center justify-center h-full">
            <div
              className="p-8 rounded-lg border text-center max-w-md"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <div className="text-5xl mb-4">▲</div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--forest)" }}>
                Operator WorkBench
              </h2>
              <p className="text-sm mb-6" style={{ color: "var(--ink-muted)" }}>
                Workflows, approvals, and governance queue for Account Success.
              </p>
            </div>
          </div>
        )}

        {activeMode === "cognitive" && (
          <div className="flex items-center justify-center h-full">
            <div
              className="p-8 rounded-lg border text-center max-w-md"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <div className="text-5xl mb-4">◆</div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--forest)" }}>
                Cognitive Overlay
              </h2>
              <p className="text-sm mb-6" style={{ color: "var(--ink-muted)" }}>
                Full-screen AI intelligence — signals, patterns, and recommended actions across your portfolio.
              </p>
            </div>
          </div>
        )}

        {showAIInsights && aiInsights.length > 0 && (
          <AIInsightsPanel isOpen={showAIInsights} insights={aiInsights} />
        )}
      </div>

      {/* Governance Notifications */}
      <GovernancePopup isOpen={true} onClose={() => {}} notifications={governanceNotifications} />

      {/* Bottom Status Bar */}
      <BottomStatusBar />
    </div>
  )
}
