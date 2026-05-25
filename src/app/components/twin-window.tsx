"use client"

import { useState } from "react"

interface TwinWindowProps {
  isOpen: boolean
  onClose: () => void
}

export default function TwinWindow({ isOpen, onClose }: TwinWindowProps) {
  const [splitMode, setSplitMode] = useState<"horizontal" | "vertical">("horizontal")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className="w-full max-w-6xl rounded-xl border shadow-2xl overflow-hidden"
        style={{ background: "var(--card)", borderColor: "var(--border)", height: "80vh" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <div className="text-2xl">◇</div>
            <div>
              <h2 className="text-base font-semibold" style={{ color: "var(--forest)" }}>
                Twin Workbench
              </h2>
              <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
                Compare and analyze two entities side-by-side
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Split Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setSplitMode("horizontal")}
                className="px-3 py-1 rounded text-xs font-medium transition-colors"
                style={{
                  background: splitMode === "horizontal" ? "var(--gold)" : "transparent",
                  color: splitMode === "horizontal" ? "var(--forest)" : "var(--ink-muted)",
                }}
              >
                ⟷ H-Split
              </button>
              <button
                onClick={() => setSplitMode("vertical")}
                className="px-3 py-1 rounded text-xs font-medium transition-colors"
                style={{
                  background: splitMode === "vertical" ? "var(--gold)" : "transparent",
                  color: splitMode === "vertical" ? "var(--forest)" : "var(--ink-muted)",
                }}
              >
                ⟨⟩ V-Split
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1 hover:bg-[#F5EBE0] rounded transition-colors"
              style={{ color: "var(--ink-muted)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content Area - Split View */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left/Top Pane */}
          <div
            className={`flex-1 border-r flex flex-col ${splitMode === "vertical" ? "" : "border-b"}`}
            style={{ borderColor: "var(--border)" }}
          >
            <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)", background: "var(--paper-dark)" }}>
              <p className="text-xs font-medium" style={{ color: "var(--forest)" }}>
                Primary: Axiom Financial
              </p>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>
                    Account Health
                  </p>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                    <div className="h-full w-4/5" style={{ background: "var(--health-green)" }} />
                  </div>
                  <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
                    87% health score
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>
                    ARR: $420K
                  </p>
                  <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
                    Renewal in 94 days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right/Bottom Pane */}
          <div className="flex-1 flex flex-col">
            <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)", background: "var(--paper-dark)" }}>
              <p className="text-xs font-medium" style={{ color: "var(--forest)" }}>
                Secondary: Vantage Telecom
              </p>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>
                    Account Health
                  </p>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                    <div className="h-full w-1/3" style={{ background: "var(--health-red)" }} />
                  </div>
                  <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
                    31% health score · CRITICAL
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>
                    ARR: $540K
                  </p>
                  <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
                    Renewal in 11 days · URGENT
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
