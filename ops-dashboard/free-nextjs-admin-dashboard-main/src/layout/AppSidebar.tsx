"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: string;
  path?: string;
  subItems?: { name: string; path: string; badge?: string }[];
};

const navItems: NavItem[] = [
  {
    icon: "📊",
    name: "Dashboard",
    path: "/",
  },
  {
    icon: "📢",
    name: "Marketing",
    path: "/marketing",
  },
  {
    icon: "💰",
    name: "Sales",
    path: "/sales",
  },
  {
    icon: "🤝",
    name: "Customer Success",
    path: "/cs",
    subItems: [
      { name: "Accounts", path: "/cs", badge: "18" },
      { name: "At Risk", path: "/cs", badge: "5" },
      { name: "Renewals", path: "/cs", badge: "9" },
    ],
  },
  {
    icon: "📦",
    name: "Product",
    path: "/product",
  },
  {
    icon: "⚙️",
    name: "Operations",
    path: "/ops",
  },
  {
    icon: "💵",
    name: "Finance",
    path: "/finance",
  },
  {
    icon: "👥",
    name: "HR",
    path: "/hr",
  },
  {
    icon: "⚖️",
    name: "Legal",
    path: "/legal",
  },
];

const bottomItems: NavItem[] = [
  {
    icon: "🤖",
    name: "Triage Bot",
    path: "/triage",
    subItems: [
      { name: "Queue", path: "/triage/queue", badge: "pending" },
      { name: "API Keys", path: "/triage/api-keys" },
      { name: "Policies", path: "/triage/policies" },
    ],
  },
  {
    icon: "🧠",
    name: "Twin Workbench",
    path: "/twin",
  },
  {
    icon: "📋",
    name: "Governance",
    subItems: [
      { name: "Approval Queue", path: "/governance/queue", badge: "12" },
      { name: "Policy Violations", path: "/governance/violations" },
      { name: "Audit Trail", path: "/governance/audit" },
    ],
  },
  {
    icon: "💾",
    name: "Memory",
    subItems: [
      { name: "Personal", path: "/memory/personal" },
      { name: "Organizational", path: "/memory/org" },
      { name: "Conversational", path: "/memory/conv" },
    ],
  },
  {
    icon: "⚡",
    name: "Workers",
    path: "/workers",
    subItems: [
      { name: "Registry", path: "/workers" },
      { name: "Health", path: "/workers" },
      { name: "Incidents", path: "/workers" },
    ],
  },
  {
    icon: "🔌",
    name: "Connectors",
    path: "/connectors",
  },
  {
    icon: "⚙️",
    name: "Settings",
    path: "/settings",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <aside
      className={`fixed left-0 top-0 z-50 h-screen w-[280px] bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-[#94a3b8] transition-transform duration-300 ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Brand */}
      <div className="px-6 py-5 border-b border-white/5">
        <h1 className="font-serif text-xl font-bold text-[#e8e0d0] tracking-tight">
          IntegrateWise
        </h1>
        <p className="text-[11px] text-[#b8943f] font-mono mt-1">
          Ops Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {/* Main Navigation */}
        <div className="mb-4">
          <p className="px-3 mb-2 text-[10px] font-semibold tracking-widest text-[#5a7a64] uppercase">
            Operations
          </p>
          {navItems.map((item) => (
            <div key={item.name} className="mb-0.5">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                      openSubmenu === item.name
                        ? "bg-[#b8943f]/10 text-[#d4ab5a]"
                        : "text-[#a0b8a8] hover:bg-white/5"
                    }`}
                  >
                    <span className="w-5 text-center">{item.icon}</span>
                    <span className="flex-1">{item.name}</span>
                    <ChevronDownIcon
                      className={`w-3.5 h-3.5 transition-transform ${
                        openSubmenu === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openSubmenu === item.name && (
                    <div className="ml-5 pl-3 border-l border-white/10">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.path}
                          href={sub.path}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] transition-all ${
                            isActive(sub.path)
                              ? "bg-[#b8943f]/10 text-[#d4ab5a]"
                              : "text-[#8a9a8e] hover:bg-white/5"
                          }`}
                        >
                          {sub.name}
                          {sub.badge && (
                            <span className="ml-auto text-[10px] font-mono bg-white/5 text-[#7a9a84] px-1.5 py-0.5 rounded">
                              {sub.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.path || "#"}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                    isActive(item.path || "")
                      ? "bg-[#b8943f]/10 text-[#d4ab5a]"
                      : "text-[#a0b8a8] hover:bg-white/5"
                  }`}
                >
                  <span className="w-5 text-center">{item.icon}</span>
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="border-t border-white/5 pt-4">
          <p className="px-3 mb-2 text-[10px] font-semibold tracking-widest text-[#5a7a64] uppercase">
            System
          </p>
          {bottomItems.map((item) => (
            <div key={item.name} className="mb-0.5">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                      openSubmenu === item.name
                        ? "bg-[#b8943f]/10 text-[#d4ab5a]"
                        : "text-[#a0b8a8] hover:bg-white/5"
                    }`}
                  >
                    <span className="w-5 text-center">{item.icon}</span>
                    <span className="flex-1">{item.name}</span>
                    <ChevronDownIcon
                      className={`w-3.5 h-3.5 transition-transform ${
                        openSubmenu === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openSubmenu === item.name && (
                    <div className="ml-5 pl-3 border-l border-white/10">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.path}
                          href={sub.path}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] transition-all ${
                            isActive(sub.path)
                              ? "bg-[#b8943f]/10 text-[#d4ab5a]"
                              : "text-[#8a9a8e] hover:bg-white/5"
                          }`}
                        >
                          {sub.name}
                          {sub.badge && (
                            <span className="ml-auto text-[10px] font-mono bg-white/5 text-[#7a9a84] px-1.5 py-0.5 rounded">
                              {sub.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.path || "#"}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                    isActive(item.path || "")
                      ? "bg-[#b8943f]/10 text-[#d4ab5a]"
                      : "text-[#a0b8a8] hover:bg-white/5"
                  }`}
                >
                  <span className="w-5 text-center">{item.icon}</span>
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/5">
        <p className="text-[10px] text-[#4a6a54] font-mono">
          IntegrateWise Ops v1.0
        </p>
        <p className="text-[10px] text-[#6a8a74] mt-1">
          Connected via MCP
        </p>
      </div>
    </aside>
  );
};

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default AppSidebar;
