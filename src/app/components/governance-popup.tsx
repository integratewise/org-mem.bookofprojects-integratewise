"use client"

import { AlertCircle, CheckCircle, Clock } from "lucide-react"

interface Notification {
  id: string
  title: string
  description: string
  type: "approval" | "governance" | "warning"
  action?: {
    label: string
    onClick: () => void
  }
}

interface GovernancePopupProps {
  isOpen: boolean
  onClose: () => void
  notifications?: Notification[]
}

export default function GovernancePopup({ isOpen, onClose, notifications = [] }: GovernancePopupProps) {
  if (!isOpen || notifications.length === 0) return null

  return (
    <div className="fixed inset-0 flex items-start justify-end p-4 pointer-events-none z-50">
      {/* Notification Stack */}
      <div className="pointer-events-auto space-y-3 max-w-sm">
        {notifications.map((notif, idx) => (
          <div
            key={notif.id}
            className="rounded-lg p-4 shadow-lg border animation-slide-in"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              animation: `slideInRight 0.3s ease-out forwards`,
              animationDelay: `${idx * 100}ms`,
            }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {notif.type === "approval" && (
                  <Clock size={18} style={{ color: "var(--gold)" }} />
                )}
                {notif.type === "governance" && (
                  <AlertCircle size={18} style={{ color: "var(--health-amber)" }} />
                )}
                {notif.type === "warning" && (
                  <AlertCircle size={18} style={{ color: "var(--health-red)" }} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold" style={{ color: "var(--forest)" }}>
                  {notif.title}
                </h4>
                <p className="text-xs mt-1" style={{ color: "var(--ink-muted)" }}>
                  {notif.description}
                </p>

                {notif.action && (
                  <button
                    onClick={notif.action.onClick}
                    className="mt-2 text-xs font-semibold px-3 py-1.5 rounded transition-colors"
                    style={{
                      background: "var(--gold)",
                      color: "var(--forest)",
                    }}
                  >
                    {notif.action.label}
                  </button>
                )}
              </div>

              <button
                onClick={onClose}
                className="text-lg shrink-0 hover:opacity-60 transition-opacity"
                style={{ color: "var(--ink-muted)" }}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
