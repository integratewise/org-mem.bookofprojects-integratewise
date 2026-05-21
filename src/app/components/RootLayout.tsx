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
  Sparkles,
  Rocket,
  Image,
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
  {
    type: 'item',
    item: { to: '/quick-start', icon: Rocket, label: 'Quick Start', color: 'var(--gold)' },
  },
  {
    type: 'item',
    item: { to: '/gallery', icon: Image, label: 'Product Gallery', color: 'var(--slate-mid)' },
  },
  {
    type: 'group',
    group: {
      id: 'brand-system',
      label: 'Brand System',
      icon: Palette,
      color: 'var(--forest)',
      children: [
        { to: '/brand-assets', icon: Palette, label: 'Brand Assets', color: 'var(--forest)' },
        { to: '/design-tokens', icon: SwatchBook, label: 'Design Tokens', color: 'var(--gold-light)' },
        { to: '/stationery', icon: Stamp, label: 'Stationery', color: 'var(--forest-mid)' },
      ],
    },
  },
  {
    type: 'group',
    group: {
      id: 'company-system',
      label: 'Company & Product',
      icon: Building2,
      color: 'var(--slate)',
      children: [
        { to: '/company', icon: Target, label: 'Strategy & Execution', color: 'var(--slate-mid)' },
        { to: '/architecture', icon: GitBranch, label: 'Architecture', color: 'var(--slate)' },
      ],
    },
  },
  // Top level items
  {
    type: 'group',
    group: {
      id: 'marketing-gtm',
      label: 'Marketing & GTM',
      icon: Megaphone,
      color: 'var(--gold)',
      children: [
        { to: '/generators', icon: Zap, label: 'Quick Generators', color: 'var(--gold)' },
        { to: '/marketing', icon: Megaphone, label: 'Marketing', color: 'var(--gold)' },
        { to: '/linkedin', icon: Megaphone, label: 'LinkedIn', color: 'var(--slate-mid)' },
        { to: '/whatsapp', icon: MessageCircle, label: 'WhatsApp', color: 'var(--forest-bright)' },
        { to: '/email', icon: Mail, label: 'Email', color: 'var(--slate-mid)' },
        { to: '/presentations', icon: Presentation, label: 'Presentations', color: 'var(--slate)' },
        { to: '/sales', icon: HandCoins, label: 'Sales', color: 'var(--red)' },
      ],
    },
  },
  {
    type: 'item',
    item: { to: '/control-panel', icon: LayoutDashboard, label: 'Control Panel', color: 'var(--slate-mid)' },
  },
  // Documentation Library (6 items)
  {
    type: 'group',
    group: {
      id: 'documentation',
      label: 'Documentation Library',
      icon: BookOpen,
      color: 'var(--slate)',
        children: [
        { to: '/documentation?pack=pack-a', icon: Building2, label: 'Doctrine & Continuity Strategy', color: 'var(--forest)' },
        { to: '/documentation?pack=pack-b', icon: Target, label: 'Category & Positioning', color: 'var(--gold)' },
        { to: '/documentation?pack=pack-c', icon: Box, label: 'Product Narrative & Continuity', color: 'var(--gold-light)' },
        { to: '/documentation?pack=pack-d', icon: GitBranch, label: 'Adaptive Spine & Technical System', color: 'var(--slate)' },
        { to: '/documentation?pack=pack-e', icon: Shield, label: 'AI Governance & Trust', color: 'var(--forest-mid)' },
        { to: '/documentation?pack=pack-f', icon: Megaphone, label: 'GTM, Sales & Customer Success', color: 'var(--red)' },
      ],
    },
  },
];

/* ═══════════════════════════════════════════════════════════════ */

export function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['brand-system', 'company-system', 'marketing-gtm', 'documentation']));
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

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
    return 'Continuity Documentation System';
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

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--paper-warm)' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 flex flex-col transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ background: 'var(--forest)', borderRight: '1px solid var(--sidebar-border)' }}
      >
        {/* Sidebar header */}
        <div
          className="h-16 flex items-center px-6 shrink-0"
          style={{ borderBottom: '1px solid var(--sidebar-border)' }}
        >
          <IntegrateWiseLogo variant="icon-only" className="scale-75 origin-left" />
          <div className="ml-2">
            <p className="text-sm font-semibold text-white">IntegrateWise</p>
              <p className="text-[11px]" style={{ color: 'rgba(244,240,232,0.72)' }}>Continuity Documentation System</p>
          </div>
          <button
            className="ml-auto lg:hidden p-1 rounded-md"
            style={{ color: 'rgba(244,240,232,0.72)' }}
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
              style={{ color: 'rgba(244,240,232,0.72)' }}
            />
            <input
              type="text"
              placeholder="Search navigation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg text-xs"
              style={{
                background: 'rgba(244,240,232,0.08)',
                border: '1px solid var(--sidebar-border)',
                color: 'rgba(244,240,232,0.82)',
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
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                      isActive ? 'text-white' : ''
                    }`
                  }
                  style={({ isActive }) =>
                    isActive
                      ? { background: 'var(--gold)', color: 'var(--ink)' }
                      : { color: 'rgba(244,240,232,0.82)' }
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon
                        className="w-5 h-5 shrink-0"
                        style={!isActive ? { color: 'rgba(244,240,232,0.56)' } : undefined}
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
                    background: isExpanded ? 'rgba(244,240,232,0.06)' : 'transparent',
                    color: hasActiveChild ? 'var(--paper)' : 'rgba(244,240,232,0.82)',
                  }}
                >
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 shrink-0" style={{ color: group.color }} />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 shrink-0" style={{ color: group.color }} />
                  )}
                  <group.icon
                    className="w-4 h-4 shrink-0"
                    style={{ color: hasActiveChild ? group.color : 'var(--brand-navy-500)' }}
                  />
                  <span className="text-[13px] font-medium flex-1">{group.label}</span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{
                      background: `${group.color}20`,
                      color: group.color,
                    }}
                  >
                    {group.children.length}
                  </span>
                </button>

                {/* Group children */}
                {isExpanded && (
                  <div className="ml-4 pl-3 space-y-0.5" style={{ borderLeft: `2px solid ${group.color}25` }}>
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
                                ? { background: 'var(--gold)', color: 'var(--ink)' }
                                : { color: 'rgba(244,240,232,0.82)' }
                            }
                          >
                            <child.icon
                              className="w-4 h-4 shrink-0"
                              style={{
                                color: isActive ? 'var(--ink)' : child.color || 'rgba(244,240,232,0.56)',
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
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                              isActive ? 'text-white' : ''
                            }`
                          }
                          style={({ isActive }) =>
                            isActive
                              ? { background: 'var(--gold)', color: 'var(--ink)' }
                              : { color: 'rgba(244,240,232,0.82)' }
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <child.icon
                                className="w-4 h-4 shrink-0"
                                style={{
                                  color: isActive ? 'var(--ink)' : child.color || 'rgba(244,240,232,0.56)',
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
          <div className="px-4 py-3 rounded-lg" style={{ background: 'rgba(184,148,63,0.18)' }}>
            <p className="text-xs font-medium text-white">Continuity Documentation System v1.0</p>
            <p className="text-[11px] mt-0.5" style={{ color: 'rgba(244,240,232,0.72)' }}>
              6 Doctrine Packs &middot; 40 Documents
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="h-16 flex items-center px-6 shrink-0"
          style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule-light)' }}
        >
          <button
            className="lg:hidden p-2 -ml-2 mr-3 rounded-md"
            style={{ color: 'var(--slate)' }}
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
                          <span className="text-sm" style={{ color: 'var(--slate-mid)' }}>
                            {entry.group.label}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5" style={{ color: 'var(--rule)' }} />
                        </>
                      );
                    }
                  }
                }
              }
              return null;
            })()}
            <h1 className="text-lg font-semibold" style={{ color: 'var(--ink)' }}>
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
