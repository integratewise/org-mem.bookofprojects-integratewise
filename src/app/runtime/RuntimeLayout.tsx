import { NavLink, Outlet } from "react-router";
import { Activity, BookOpen, GitBranch, LayoutDashboard, Shield } from "lucide-react";

const navItems = [
  { to: "/runtime", label: "Dashboard", icon: LayoutDashboard },
  { to: "/runtime/triage", label: "Triage", icon: Activity },
  { to: "/runtime/knowledge", label: "Knowledge", icon: BookOpen },
  { to: "/runtime/references", label: "References", icon: GitBranch },
  { to: "/runtime/governance", label: "Governance", icon: Shield },
];

export function RuntimeLayout() {
  return (
    <div className="min-h-screen flex" style={{ background: "var(--landing-surface)" }}>
      {/* Sidebar */}
      <aside className="w-64 border-r flex flex-col" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <div className="p-6">
          <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
            Knowledge Runtime
          </h2>
          <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
            Canonical continuity substrate
          </p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/runtime"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--brand-primary)] text-white"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t text-xs" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
          v0.1.0 · Local Storage
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
