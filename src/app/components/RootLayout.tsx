import { Outlet, NavLink, useLocation, useNavigate } from 'react-router';
import { IntegrateWiseLogo } from './IntegrateWiseLogo';
import { AIAssistant } from './ai/AIAssistant';
import {
  type LucideIcon,
  Palette,
  SwatchBook,
  Megaphone,
  HandCoins,
  Stamp,
  Menu,
  X,
  Zap,
  BookOpen,
  ChevronRight,
  ChevronDown,
  Search,
  Building2,
  Target,
  Box,
  GitBranch,
  Shield,
  MessageCircle,
  Mail,
  Presentation,
  LayoutDashboard,
  Rocket,
  Image,
  Users,
  Wrench,
  Scale,
  Globe,
  Archive,
  HeartHandshake,
  Sun,
  Moon,
  Layers,
} from 'lucide-react';
import { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════
   NAV DATA STRUCTURE — tree-based, mirrors DocumentationPage
   ═══════════════════════════════════════════════════════════════ */

interface NavItem {
  to: string;
  icon: LucideIcon;
  label: string;
  end?: boolean;
  color?: string;
}

interface NavGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  children: NavItem[];
}

type NavEntry = { type: 'item'; item: NavItem } | { type: 'group'; group: NavGroup };

const NAV_STRUCTURE: NavEntry[] = [
  // ── 00 Company Strategy ──────────────────────────────────────────────
  {
    type: 'group',
    group: {
      id: '00-company-strategy',
      label: '00 Company Strategy',
      icon: Building2,
      color: 'var(--brand-primary)',
      children: [
        { to: '/docs/company', icon: Target, label: 'Strategic Planning', color: 'var(--brand-primary)' },
        { to: '/docs/documentation?pack=pack-a', icon: BookOpen, label: 'Doctrine & Continuity', color: 'var(--brand-primary-dark)' },
      ],
    },
  },
  // ── 01 Product & Engineering ─────────────────────────────────────────
  {
    type: 'group',
    group: {
      id: '01-product-engineering',
      label: '01 Product & Engineering',
      icon: GitBranch,
      color: 'var(--slate)',
      children: [
        { to: '/docs/architecture', icon: GitBranch, label: 'Adaptive Spine & Architecture', color: 'var(--slate)' },
        { to: '/docs/workbench', icon: Layers, label: 'Live Workbench', color: 'var(--forest)' },
        { to: '/docs/documentation?pack=pack-c', icon: Box, label: 'Product Narrative & Continuity', color: 'var(--brand-accent-dark)' },
        { to: '/docs/documentation?pack=pack-d', icon: Shield, label: 'Technical System', color: 'var(--slate-mid)' },
      ],
    },
  },
  // ── 02 Marketing & Creative ──────────────────────────────────────────
  {
    type: 'group',
    group: {
      id: '02-marketing-creative',
      label: '02 Marketing & Creative',
      icon: Megaphone,
      color: 'var(--brand-accent)',
      children: [
        { to: '/docs/brand-assets', icon: Palette, label: 'Brand Assets', color: 'var(--brand-primary)' },
        { to: '/docs/design-tokens', icon: SwatchBook, label: 'Design Tokens', color: 'var(--brand-accent)' },
        { to: '/docs/stationery', icon: Stamp, label: 'Stationery', color: 'var(--brand-primary-dark)' },
        { to: '/docs/marketing', icon: Megaphone, label: 'Marketing', color: 'var(--brand-accent)' },
        { to: '/docs/linkedin', icon: Megaphone, label: 'LinkedIn', color: 'var(--slate-mid)' },
        { to: '/docs/whatsapp', icon: MessageCircle, label: 'WhatsApp', color: 'var(--brand-primary-light)' },
        { to: '/docs/email', icon: Mail, label: 'Email', color: 'var(--slate-mid)' },
        { to: '/docs/presentations', icon: Presentation, label: 'Presentations', color: 'var(--slate)' },
        { to: '/docs/generators', icon: Zap, label: 'Quick Generators', color: 'var(--brand-accent)' },
        { to: '/docs/documentation?pack=pack-b', icon: Target, label: 'Category & Positioning', color: 'var(--brand-accent)' },
      ],
    },
  },
  // ── 03 Sales ─────────────────────────────────────────────────────────
  {
    type: 'group',
    group: {
      id: '03-sales',
      label: '03 Sales',
      icon: HandCoins,
      color: 'var(--brand-error)',
      children: [
        { to: '/docs/sales', icon: HandCoins, label: 'Sales Enablement', color: 'var(--brand-error)' },
        { to: '/docs/documentation?pack=pack-f', icon: Megaphone, label: 'GTM & Customer Success', color: 'var(--brand-error)' },
      ],
    },
  },
  // ── 04 Customer Success ──────────────────────────────────────────────
  {
    type: 'group',
    group: {
      id: '04-customer-success',
      label: '04 Customer Success',
      icon: HeartHandshake,
      color: 'var(--brand-primary-light)',
      children: [
        { to: '/docs/coming-soon?section=04', icon: HeartHandshake, label: 'Onboarding & Implementation', color: 'var(--brand-primary-light)' },
        { to: '/docs/coming-soon?section=04', icon: HeartHandshake, label: 'Support & Health', color: 'var(--brand-primary-light)' },
      ],
    },
  },
  // ── 05 Operations ────────────────────────────────────────────────────
  {
    type: 'group',
    group: {
      id: '05-operations',
      label: '05 Operations',
      icon: Wrench,
      color: 'var(--slate-mid)',
      children: [
        { to: '/docs/control-panel', icon: LayoutDashboard, label: 'Control Panel', color: 'var(--slate-mid)' },
        { to: '/docs/coming-soon?section=05', icon: Wrench, label: 'Runbooks & DR', color: 'var(--slate-mid)' },
      ],
    },
  },
  // ── 06 Finance, Legal, HR ────────────────────────────────────────────
  {
    type: 'group',
    group: {
      id: '06-finance-legal-hr',
      label: '06 Finance, Legal, HR',
      icon: Scale,
      color: 'var(--slate)',
      children: [
        { to: '/docs/coming-soon?section=06', icon: Scale, label: 'Finance & Legal', color: 'var(--slate)' },
        { to: '/docs/coming-soon?section=06', icon: Users, label: 'HR & People Ops', color: 'var(--slate)' },
      ],
    },
  },
  // ── 07 Resources & Knowledge Base ────────────────────────────────────
  {
    type: 'group',
    group: {
      id: '07-resources-kb',
      label: '07 Resources & Knowledge Base',
      icon: BookOpen,
      color: 'var(--brand-accent-dark)',
      children: [
        { to: '/docs/quick-start', icon: Rocket, label: 'Quick Start', color: 'var(--brand-accent)' },
        { to: '/docs/gallery', icon: Image, label: 'Product Gallery', color: 'var(--slate-mid)' },
        { to: '/docs/documentation', icon: BookOpen, label: 'Documentation Library', color: 'var(--brand-accent-dark)' },
        { to: '/docs/documentation?pack=pack-e', icon: Shield, label: 'AI Governance & Trust', color: 'var(--brand-primary-dark)' },
        { to: '/docs/governance', icon: Shield, label: 'Document Governance (95 docs)', color: 'var(--gold)' },
        { to: '/docs/evolution', icon: GitBranch, label: 'Evolution Timeline', color: 'var(--forest-bright)' },
      ],
    },
  },
  // ── 08 External Communications ───────────────────────────────────────
  {
    type: 'group',
    group: {
      id: '08-external-comms',
      label: '08 External Communications',
      icon: Globe,
      color: 'var(--brand-accent)',
      children: [
        { to: '/docs/coming-soon?section=08', icon: Globe, label: 'Website & Public Narrative', color: 'var(--brand-accent)' },
        { to: '/docs/coming-soon?section=08', icon: Megaphone, label: 'Press & Events', color: 'var(--slate-mid)' },
      ],
    },
  },
  // ── 09 Archives & Retention ──────────────────────────────────────────
  {
    type: 'group',
    group: {
      id: '09-archives',
      label: '09 Archives & Retention',
      icon: Archive,
      color: 'var(--slate-mid)',
      children: [
        { to: '/docs/coming-soon?section=09', icon: Archive, label: 'Archives', color: 'var(--slate-mid)' },
      ],
    },
  },
];

/* ═══════════════════════════════════════════════════════════════ */

export function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['00-company-strategy', '01-product-engineering', '02-marketing-creative', '03-sales']));
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Dark mode init
  useEffect(() => {
    const stored = localStorage.getItem('iw-theme');
    const shouldBeDark = stored === 'dark';
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('iw-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('iw-theme', 'light');
    }
  };

  // Auto-expand group containing the current route
  useEffect(() => {
    const path = location.pathname + location.search;
    for (const entry of NAV_STRUCTURE) {
      if (entry.type === 'group') {
        const match = entry.group.children.some((child) => {
          if (child.to.includes('?')) {
            return path.startsWith(child.to.split('?')[0]) && path.includes(child.to.split('?')[1]);
          }
          return location.pathname === child.to || location.pathname.startsWith(child.to + '/');
        });
        if (match && !expandedGroups.has(entry.group.id)) {
          setExpandedGroups((prev) => new Set([...prev, entry.group.id]));
        }
      }
    }
  }, [location.pathname, location.search, expandedGroups]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  const currentPage = (() => {
    const path = location.pathname;
    for (const entry of NAV_STRUCTURE) {
      if (entry.type === 'item' && (entry.item.end ? path === entry.item.to : path.startsWith(entry.item.to))) {
        return entry.item.label;
      }
      if (entry.type === 'group') {
        for (const child of entry.group.children) {
          const childPath = child.to.split('?')[0];
          if (path === childPath || path.startsWith(childPath + '/')) {
            if (child.to.includes('?') && location.search.includes(child.to.split('?')[1])) {
              return child.label;
            }
            if (!child.to.includes('?')) {
              return child.label;
            }
          }
        }
      }
    }
    return 'Org Memory — Book of Projects';
  })();

  // Check if a doc-pack nav item is "active" (matches current URL including query)
  const isDocPackActive = (to: string) => {
    if (!to.includes('?')) return false;
    const [base, query] = to.split('?');
    return location.pathname === base && location.search.includes(query);
  };

  // Filter nav based on search
  const filteredNav: NavEntry[] = searchQuery
    ? NAV_STRUCTURE.map((entry) => {
        if (entry.type === 'item') {
          return entry.item.label.toLowerCase().includes(searchQuery.toLowerCase()) ? entry : null;
        }
        const filteredChildren = entry.group.children.filter((c) =>
          c.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filteredChildren.length > 0 || entry.group.label.toLowerCase().includes(searchQuery.toLowerCase())) {
          return {
            type: 'group' as const,
            group: {
              ...entry.group,
              children: filteredChildren.length > 0 ? filteredChildren : entry.group.children,
            },
          };
        }
        return null;
      }).filter(Boolean) as NavEntry[]
    : NAV_STRUCTURE;

  const handleNavClick = (to: string) => {
    setSidebarOpen(false);
    if (to.includes('?')) {
      // For doc pack links, use navigate to preserve query params
      navigate(to);
    }
  };

  const activeNavStyle = {
    background: 'var(--sidebar-primary)',
    color: 'var(--sidebar-primary-foreground)',
    border: '1px solid var(--border-subtle)',
  };

  const inactiveNavStyle = {
    color: 'var(--text-muted)',
    border: '1px solid transparent',
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--surface-canvas)' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[var(--ink)]/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 flex flex-col transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{
          background: 'var(--sidebar)',
          borderRight: '1px solid var(--sidebar-border)',
          boxShadow: '0 20px 40px -32px rgb(23 28 24 / 0.28)',
        }}
      >
        {/* Sidebar header */}
        <div
          className="h-16 flex items-center px-6 shrink-0"
          style={{ borderBottom: '1px solid var(--sidebar-border)' }}
        >
          <IntegrateWiseLogo variant="icon-only" className="scale-75 origin-left" />
          <div className="ml-2">
            <p className="text-sm font-semibold" style={{ color: 'var(--text-strong)' }}>IntegrateWise</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Org Memory — Book of Projects</p>
          </div>
          <button
            className="ml-auto lg:hidden p-1 rounded-md"
            style={{ color: 'var(--text-muted)' }}
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pt-4 pb-2 shrink-0">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
              style={{ color: 'var(--text-faint)' }}
            />
            <input
              type="text"
              placeholder="Search navigation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg text-xs"
              style={{
                background: 'var(--surface-raised)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-default)',
                boxShadow: 'inset 0 1px 2px rgb(23 28 24 / 0.03)',
              }}
            />
          </div>
        </div>

        {/* Navigation tree */}
        <nav className="flex-1 px-3 pb-3 overflow-y-auto space-y-1">
          {filteredNav.map((entry) => {
            if (entry.type === 'item') {
              const item = entry.item;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors"
                  style={({ isActive }) =>
                    isActive
                      ? activeNavStyle
                      : inactiveNavStyle
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon
                        className="w-5 h-5 shrink-0"
                        style={{ color: isActive ? 'currentColor' : item.color || 'var(--text-faint)' }}
                      />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            }

            // Group entry — collapsible
            const group = entry.group;
            const isExpanded = expandedGroups.has(group.id) || searchQuery.length > 0;
            const hasActiveChild = group.children.some((child) => {
              if (child.to.includes('?')) return isDocPackActive(child.to);
              return location.pathname === child.to || location.pathname.startsWith(child.to + '/');
            });

            return (
              <div key={group.id} className="space-y-0.5">
                {/* Group header */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center gap-2.5 px-4 py-2 rounded-lg text-left transition-colors"
                  style={{
                    background: isExpanded ? 'var(--sidebar-accent)' : 'transparent',
                    color: hasActiveChild ? 'var(--text-strong)' : 'var(--text-muted)',
                    border: '1px solid transparent',
                  }}
                >
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 shrink-0" style={{ color: group.color }} />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 shrink-0" style={{ color: group.color }} />
                  )}
                  <group.icon
                    className="w-4 h-4 shrink-0"
                    style={{ color: hasActiveChild ? group.color : 'var(--text-faint)' }}
                  />
                  <span className="text-[13px] font-medium flex-1">{group.label}</span>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-full"
                      style={{
                        background: `color-mix(in srgb, ${group.color} 12%, var(--paper))`,
                        color: group.color,
                      }}
                    >
                    {group.children.length}
                  </span>
                </button>

                {/* Group children */}
                {isExpanded && (
                  <div className="ml-4 pl-3 space-y-0.5" style={{ borderLeft: `2px solid color-mix(in srgb, ${group.color} 18%, white)` }}>
                    {group.children.map((child) => {
                      // For doc pack links with query params, use button + navigate
                      if (child.to.includes('?')) {
                        const isActive = isDocPackActive(child.to);
                        return (
                          <button
                            key={child.to}
                            onClick={() => handleNavClick(child.to)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors text-sm"
                            style={
                              isActive
                                ? activeNavStyle
                                : inactiveNavStyle
                            }
                          >
                            <child.icon
                              className="w-4 h-4 shrink-0"
                              style={{
                                color: isActive ? 'currentColor' : child.color || 'var(--text-faint)',
                              }}
                            />
                            <span className="text-xs">{child.label}</span>
                          </button>
                        );
                      }

                      // Standard NavLink
                      return (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          onClick={() => setSidebarOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors"
                          style={({ isActive }) =>
                            isActive
                              ? activeNavStyle
                              : inactiveNavStyle
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <child.icon
                                className="w-4 h-4 shrink-0"
                                style={{
                                  color: isActive ? 'currentColor' : child.color || 'var(--text-faint)',
                                }}
                              />
                              <span className="text-xs">{child.label}</span>
                            </>
                          )}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="p-4 shrink-0" style={{ borderTop: '1px solid var(--sidebar-border)' }}>
          <div className="flex items-center gap-2">
          <div
            className="px-4 py-3 rounded-lg flex-1"
            style={{
              background: 'var(--accent-soft)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <p className="text-xs font-medium" style={{ color: 'var(--text-strong)' }}>
              Org Memory — Book of Projects v1.0
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              6 Doctrine Packs &middot; 40 Documents
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg shrink-0 transition-colors"
            style={{ color: 'var(--text-muted)', border: '1px solid var(--border-subtle)', background: 'var(--surface-raised)' }}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="h-16 flex items-center px-6 shrink-0"
          style={{
            background: 'var(--surface)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <button
            className="lg:hidden p-2 -ml-2 mr-3 rounded-md"
            style={{ color: 'var(--text-muted)' }}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb-style header */}
          <div className="flex items-center gap-2">
            {(() => {
              // Find the group this page belongs to
              for (const entry of NAV_STRUCTURE) {
                if (entry.type === 'group') {
                  for (const child of entry.group.children) {
                    const childPath = child.to.split('?')[0];
                    const isMatch = child.to.includes('?')
                      ? location.pathname === childPath && location.search.includes(child.to.split('?')[1])
                      : location.pathname === childPath;
                    if (isMatch) {
                      return (
                        <>
                          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            {entry.group.label}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5" style={{ color: 'var(--text-faint)' }} />
                        </>
                      );
                    }
                  }
                }
              }
              return null;
            })()}
            <h1 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>
              {currentPage}
            </h1>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* AI Assistant - available on all pages */}
      <AIAssistant pageTitle={currentPage} />
    </div>
  );
}
