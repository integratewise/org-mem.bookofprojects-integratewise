"use client"

type WorkspaceMode = "workbench" | "cognitive" | "twin" | "operator"

interface LeftRailProps {
  activeMode: WorkspaceMode
  onModeChange: (mode: WorkspaceMode) => void
}

export default function LeftRail({ activeMode, onModeChange }: LeftRailProps) {
  const modes: Array<{ id: WorkspaceMode; icon: string; label: string; title: string }> = [
    { id: "workbench", icon: "⊞", label: "Main", title: "Main Workbench" },
    { id: "cognitive", icon: "◆", label: "Cognitive", title: "Cognitive Overlay" },
    { id: "twin", icon: "◇", label: "Twin", title: "Twin Workbench" },
    { id: "operator", icon: "▲", label: "Operator", title: "Operator UI" },
  ]

  return (
    <div
      className="w-16 shrink-0 flex flex-col items-center gap-2 py-6 border-r"
      style={{ background: "var(--forest)", borderColor: "var(--forest-light)" }}
    >
      {/* Workspace Mode Icons */}
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          title={mode.title}
          className="w-10 h-10 rounded-lg flex items-center justify-center transition-all text-lg font-bold hover:scale-110"
          style={{
            background: activeMode === mode.id ? "var(--gold)" : "transparent",
            color: activeMode === mode.id ? "var(--forest)" : "var(--paper-dark)",
            border: activeMode === mode.id ? "2px solid var(--gold)" : "2px solid transparent",
          }}
        >
          {mode.icon}
        </button>
      ))}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom icons */}
      <div className="space-y-2">
        {/* User profile */}
        <button
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-colors hover:bg-[#2D5A3D]"
          title="User Profile"
          style={{ color: "var(--paper-dark)" }}
        >
          👤
        </button>

        {/* Settings */}
        <button
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-colors hover:bg-[#2D5A3D]"
          title="Settings"
          style={{ color: "var(--paper-dark)" }}
        >
          ⚙
        </button>
      </div>
    </div>
  )
}
