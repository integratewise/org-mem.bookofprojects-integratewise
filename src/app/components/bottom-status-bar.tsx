"use client"

export default function BottomStatusBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-10 border-t flex items-center justify-between px-4 text-xs"
      style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--ink-muted)" }}
    >
      {/* Left: Connection Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
          <span>Connected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
          <span>Sync: 2s ago</span>
        </div>
      </div>

      {/* Center: System Status */}
      <div className="flex items-center gap-4">
        <span>Hermes v0.14.0</span>
        <span>•</span>
        <span>116 skills active</span>
        <span>•</span>
        <span className="text-yellow-600">32 gaps pending</span>
      </div>

      {/* Right: Storage & Info */}
      <div className="flex items-center gap-4">
        <span>Cloud: 87% full</span>
        <span>•</span>
        <span>5 workspaces</span>
      </div>
    </div>
  )
}
