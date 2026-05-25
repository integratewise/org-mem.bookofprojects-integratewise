"use client"

import { useState } from "react"
import { X, ChevronUp } from "lucide-react"

interface CognitiveOverlayProps {
  isOpen: boolean
  onClose: () => void
  insights?: Array<{
    id: string
    title: string
    description: string
    priority: "high" | "medium" | "low"
    action?: string
  }>
}

export default function CognitiveOverlay({ isOpen, onClose, insights = [] }: CognitiveOverlayProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 pointer-events-auto transition-opacity"
        onClick={onClose}
        style={{ opacity: isExpanded ? 1 : 0 }}
      />

      {/* Drawer from bottom - 50% height when expanded */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-auto rounded-t-2xl transition-all duration-300 overflow-hidden shadow-2xl"
        style={{
          background: "var(--card)",
          height: isExpanded ? "50vh" : "120px",
          borderTop: "1px solid var(--border)",
        }}
      >
        {/* Header / Tab */}
        <div
          className="flex items-center justify-between px-6 py-4 cursor-pointer border-b hover:bg-[#F9F7F3]"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <span className="text-base" style={{ color: "var(--gold)" }}>✦</span>
            <div>
              <h3 className="text-sm font-semibold" style={{ color: "var(--forest)" }}>
                Cognitive Overlay
              </h3>
              <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
                {insights.length} signals detected
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className="p-1 hover:bg-[#EAE5D8] rounded"
            >
              <X size={18} style={{ color: "var(--ink-muted)" }} />
            </button>
            <ChevronUp
              size={20}
              style={{
                color: "var(--forest)",
                transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                transition: "transform 0.3s",
              }}
            />
          </div>
        </div>

        {/* Content - Only visible when expanded */}
        {isExpanded && (
          <div className="overflow-y-auto h-[calc(50vh-80px)] px-6 py-4 space-y-3">
            {insights.length > 0 ? (
              insights.map((insight) => (
                <div
                  key={insight.id}
                  className="p-3 rounded-lg border transition-colors hover:bg-[#F9F7F3]"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--paper-dark)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="text-sm font-bold mt-0.5"
                      style={{
                        color:
                          insight.priority === "high"
                            ? "var(--health-red)"
                            : insight.priority === "medium"
                              ? "var(--health-amber)"
                              : "var(--health-green)",
                      }}
                    >
                      {insight.priority === "high" ? "⚠" : insight.priority === "medium" ? "◐" : "✓"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold" style={{ color: "var(--forest)" }}>
                        {insight.title}
                      </p>
                      <p className="text-[11px] mt-1" style={{ color: "var(--ink-muted)" }}>
                        {insight.description}
                      </p>
                      {insight.action && (
                        <p className="text-[10px] font-medium mt-2" style={{ color: "var(--gold)" }}>
                          → {insight.action}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
                  No signals detected at this time
                </p>
              </div>
            )}
          </div>
        )}

        {/* Collapsed Preview */}
        {!isExpanded && insights.length > 0 && (
          <div className="px-6 py-2 overflow-hidden">
            <p className="text-[11px] leading-relaxed truncate" style={{ color: "var(--ink-muted)" }}>
              {insights[0].description}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
