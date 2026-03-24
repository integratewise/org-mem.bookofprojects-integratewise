import { Outlet, NavLink, useLocation, useNavigate } from 'react-router';
import { IntegrateWiseLogo } from './IntegrateWiseLogo';
import {
  Home,
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
} from 'lucide-react';
import { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════
   NAV DATA STRUCTURE — tree-based, mirrors DocumentationPage
   ═══════════════════════════════════════════════════════════════ */

interface NavItem {
  to: string;
  icon: typeof Home;
  label: string;
  end?: boolean;
  color?: string;
}

interface NavGroup {
  id: string;
  label: string;
  icon: typeof Home;
  color: string;
  children: NavItem[];
}

type NavEntry = { type: 'item'; item: NavItem } | { type: 'group'; group: NavGroup };

const NAV_STRUCTURE: NavEntry[] = [
  {
    type: 'item',
    item: { to: '/', icon: Home, label: 'Dashboard', end: true },
  },
  {
    type: 'group',
    group: {
      id: 'company-product',
      label: 'Company & Product',
      icon: Building2,
      color: '#4356A9',
      children: [
        { to: '/company', icon: Building2, label: 'Company & Product Master', color: '#4356A9' },
        { to: '/architecture', icon: GitBranch, label: 'Executive Architecture', color: '#636A82' },
      ],
    },
  },
  {
    type: 'group',
    group: {
      id: 'brand-identity',
      label: 'Brand & Identity',
      icon: Palette,
      color: '#4356A9',
      children: [
        { to: '/brand-assets', icon: Palette, label: 'Brand Assets', color: '#4356A9' },
        { to: '/design-tokens', icon: SwatchBook, label: 'Design Tokens', color: '#55608C' },
        { to: '/stationery', icon: Stamp, label: 'Stationery', color: '#232D42' },
      ],
    },
  },
  {
    type: 'group',
    group: {
      id: 'marketing-gtm',
      label: 'Marketing & GTM',
      icon: Megaphone,
      color: '#EB4F72',
      children: [
        { to: '/generators', icon: Zap, label: 'Quick Generators', color: '#EB4F72' },
        { to: '/marketing', icon: Megaphone, label: 'Marketing', color: '#EB4F72' },
        { to: '/sales', icon: HandCoins, label: 'Sales', color: '#D9637F' },
      ],
    },
  },
  {
    type: 'group',
    group: {
      id: 'documentation',
      label: 'Documentation Library',
      icon: BookOpen,
      color: '#636A82',
      children: [
        { to: '/documentation?pack=pack-a', icon: Building2, label: 'Company & Corporate', color: '#4356A9' },
        { to: '/documentation?pack=pack-b', icon: Target, label: 'Category & Positioning', color: '#EB4F72' },
        { to: '/documentation?pack=pack-c', icon: Box, label: 'Product Narrative', color: '#55608C' },
        { to: '/documentation?pack=pack-d', icon: GitBranch, label: 'Architecture & Technical', color: '#636A82' },
        { to: '/documentation?pack=pack-e', icon: Shield, label: 'AI Governance & Trust', color: '#232D42' },
        { to: '/documentation?pack=pack-f', icon: Megaphone, label: 'GTM & Customer Success', color: '#D9637F' },
      ],
    },
  },
];

/* ═══════════════════════════════════════════════════════════════ */

export function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['brand-identity', 'marketing-gtm']));
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
    return 'Brand Store';
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
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--brand-gray-100)' }}>
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
        style={{ background: 'var(--brand-navy-800)', borderRight: '1px solid var(--brand-navy-700)' }}
      >
        {/* Sidebar header */}
        <div
          className="h-16 flex items-center px-6 shrink-0"
          style={{ borderBottom: '1px solid var(--brand-navy-700)' }}
        >
          <IntegrateWiseLogo variant="icon-only" className="scale-75 origin-left" />
          <div className="ml-2">
            <p className="text-sm font-semibold text-white">IntegrateWise</p>
            <p className="text-[11px]" style={{ color: 'var(--brand-navy-400)' }}>Brand & Marketing Hub</p>
          </div>
          <button
            className="ml-auto lg:hidden p-1 rounded-md"
            style={{ color: 'var(--brand-navy-400)' }}
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
              style={{ color: 'var(--brand-navy-400)' }}
            />
            <input
              type="text"
              placeholder="Search navigation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg text-xs"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--brand-navy-700)',
                color: 'var(--brand-navy-300)',
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
                      ? { background: 'var(--brand-primary)' }
                      : { color: 'var(--brand-navy-300)' }
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon
                        className="w-5 h-5 shrink-0"
                        style={!isActive ? { color: 'var(--brand-navy-500)' } : undefined}
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
                    background: isExpanded ? 'rgba(255,255,255,0.04)' : 'transparent',
                    color: hasActiveChild ? '#fff' : 'var(--brand-navy-300)',
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
                                ? { background: 'var(--brand-primary)', color: '#fff' }
                                : { color: 'var(--brand-navy-300)' }
                            }
                          >
                            <child.icon
                              className="w-4 h-4 shrink-0"
                              style={{
                                color: isActive ? '#fff' : child.color || 'var(--brand-navy-500)',
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
                              ? { background: 'var(--brand-primary)', color: '#fff' }
                              : { color: 'var(--brand-navy-300)' }
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <child.icon
                                className="w-4 h-4 shrink-0"
                                style={{
                                  color: isActive ? '#fff' : child.color || 'var(--brand-navy-500)',
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
        <div className="p-4 shrink-0" style={{ borderTop: '1px solid var(--brand-navy-700)' }}>
          <div className="px-4 py-3 rounded-lg" style={{ background: 'rgba(67,86,169,0.15)' }}>
            <p className="text-xs font-medium text-white">Brand & Marketing Hub v1.0</p>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--brand-navy-400)' }}>
              6 Master Packs &middot; 45+ Documents
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="h-16 bg-white flex items-center px-6 shrink-0"
          style={{ borderBottom: '1px solid var(--brand-gray-200)' }}
        >
          <button
            className="lg:hidden p-2 -ml-2 mr-3 rounded-md"
            style={{ color: 'var(--brand-gray-600)' }}
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
                          <span className="text-sm" style={{ color: 'var(--brand-gray-500)' }}>
                            {entry.group.label}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5" style={{ color: 'var(--brand-gray-400)' }} />
                        </>
                      );
                    }
                  }
                }
              }
              return null;
            })()}
            <h1 className="text-lg font-semibold" style={{ color: 'var(--brand-navy-800)' }}>
              {currentPage}
            </h1>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}