import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  Download,
  Eye,
  FileText,
  Target,
  Swords,
  Presentation,
  BookOpen,
  FileCheck,
  Users,
  Filter,
  Search,
  LayoutGrid,
  List,
  Star,
  ChartBar,
} from 'lucide-react';

type Category = 'all' | 'decks' | 'one-pagers' | 'case-studies' | 'battlecards' | 'proposals';
type ViewMode = 'grid' | 'list';

interface Deliverable {
  id: string;
  title: string;
  description: string;
  category: Category;
  format: string;
  status: 'ready' | 'draft' | 'in-review';
  lastUpdated: string;
  thumbnail: string;
  icon: typeof FileText;
  featured?: boolean;
}

const deliverables: Deliverable[] = [
  {
    id: '1',
    title: 'Master Sales Deck',
    description: 'Comprehensive IntegrateWise pitch deck with value propositions, product demo flow, and pricing slides',
    category: 'decks',
    format: 'PPTX / Keynote',
    status: 'ready',
    lastUpdated: 'Mar 14, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1765438864799-6e620d420a6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxlcyUyMHByZXNlbnRhdGlvbiUyMGJ1c2luZXNzJTIwcGl0Y2h8ZW58MXx8fHwxNzczNjQ1NDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Presentation,
    featured: true,
  },
  {
    id: '2',
    title: 'Product One-Pager',
    description: 'Single-page overview of IntegrateWise features, benefits, and key differentiators',
    category: 'one-pagers',
    format: 'PDF',
    status: 'ready',
    lastUpdated: 'Mar 12, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1681505526188-b05e68c77582?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb3Bvc2FsJTIwZG9jdW1lbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzczNjQ1NjIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: FileText,
  },
  {
    id: '3',
    title: 'Enterprise Case Study: Acme Corp',
    description: 'How Acme Corp reduced onboarding time by 60% using IntegrateWise knowledge workspace',
    category: 'case-studies',
    format: 'PDF / Web',
    status: 'ready',
    lastUpdated: 'Mar 10, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1621719455762-2888b120f1e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNlJTIwc3R1ZHklMjB3aGl0ZXBhcGVyJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc3MzY0NTYyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: BookOpen,
  },
  {
    id: '4',
    title: 'Competitive Battlecard: Notion',
    description: 'Feature-by-feature comparison, objection handling, and win strategies vs Notion',
    category: 'battlecards',
    format: 'PDF / Notion',
    status: 'ready',
    lastUpdated: 'Mar 8, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1533749871411-5e21e14bcc7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wZXRpdGl2ZSUyMGFuYWx5c2lzJTIwc3RyYXRlZ3klMjBjaGFydHxlbnwxfHx8fDE3NzM2NDU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Swords,
  },
  {
    id: '5',
    title: 'ROI Calculator Template',
    description: 'Interactive spreadsheet showing potential time & cost savings with IntegrateWise',
    category: 'one-pagers',
    format: 'Excel / Sheets',
    status: 'ready',
    lastUpdated: 'Mar 6, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1740818575919-5b370b0cd03e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwZGVtbyUyMHNvZnR3YXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzM2NDU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: ChartBar,
  },
  {
    id: '6',
    title: 'Proposal Template',
    description: 'Customizable proposal document with SOW, pricing tiers, and implementation timeline',
    category: 'proposals',
    format: 'DOCX / PDF',
    status: 'in-review',
    lastUpdated: 'Mar 4, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1681505526188-b05e68c77582?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb3Bvc2FsJTIwZG9jdW1lbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzczNjQ1NjIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: FileCheck,
  },
  {
    id: '7',
    title: 'Competitive Battlecard: Confluence',
    description: 'Feature comparison, migration guide, and objection handling vs Atlassian Confluence',
    category: 'battlecards',
    format: 'PDF / Notion',
    status: 'draft',
    lastUpdated: 'Mar 2, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1533749871411-5e21e14bcc7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wZXRpdGl2ZSUyMGFuYWx5c2lzJTIwc3RyYXRlZ3klMjBjaGFydHxlbnwxfHx8fDE3NzM2NDU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Swords,
  },
  {
    id: '8',
    title: 'Customer Reference Sheet',
    description: 'Contact details and talking points for reference customers by industry',
    category: 'case-studies',
    format: 'PDF',
    status: 'ready',
    lastUpdated: 'Feb 28, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1621719455762-2888b120f1e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNlJTIwc3R1ZHklMjB3aGl0ZXBhcGVyJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc3MzY0NTYyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Users,
  },
  {
    id: '9',
    title: 'Discovery Call Script',
    description: 'Structured questioning framework for qualification and needs analysis',
    category: 'proposals',
    format: 'DOCX / Notion',
    status: 'ready',
    lastUpdated: 'Feb 25, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1765438864799-6e620d420a6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxlcyUyMHByZXNlbnRhdGlvbiUyMGJ1c2luZXNzJTIwcGl0Y2h8ZW58MXx8fHwxNzczNjQ1NDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Target,
  },
  {
    id: '10',
    title: 'Technical Demo Deck',
    description: 'Deep-dive technical presentation for IT and developer audiences',
    category: 'decks',
    format: 'PPTX / Keynote',
    status: 'ready',
    lastUpdated: 'Feb 22, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1740818575919-5b370b0cd03e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwZGVtbyUyMHNvZnR3YXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzM2NDU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Presentation,
  },
];

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'decks', label: 'Pitch Decks' },
  { value: 'one-pagers', label: 'One-Pagers' },
  { value: 'case-studies', label: 'Case Studies' },
  { value: 'battlecards', label: 'Battlecards' },
  { value: 'proposals', label: 'Proposals' },
];

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  ready: { bg: 'bg-brand-success/10', text: 'text-brand-success', dot: 'bg-brand-success' },
  draft: { bg: 'bg-brand-gray-100', text: 'text-brand-gray-600', dot: 'bg-brand-gray-400' },
  'in-review': { bg: 'bg-brand-warning/10', text: 'text-brand-warning', dot: 'bg-brand-warning' },
};

export function SalesPage() {
  const [category, setCategory] = useState<Category>('all');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const filtered = deliverables.filter((d) => {
    const matchCat = category === 'all' || d.category === category;
    const matchSearch =
      !search ||
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = deliverables.find((d) => d.featured);

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: '#1B2544' }}>Sales Enablement</h2>
          <p className="mt-1" style={{ color: '#7B8AAD' }}>
            Pitch decks, battlecards, case studies, and proposal templates for the sales team
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm" style={{ color: '#9BA8C2' }}>
          <span>{filtered.length} deliverables</span>
        </div>
      </div>

      {/* Featured card */}
      {featured && (
        <div
          className="relative rounded-xl overflow-hidden bg-white"
          style={{ border: '1px solid #D5DAE5' }}
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
              <ImageWithFallback
                src={featured.thumbnail}
                alt={featured.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-warning text-[11px] font-semibold text-white">
                <Star className="w-3 h-3" />
                Featured
              </div>
            </div>
            <div className="flex-1 p-6 md:p-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(235,67,121,0.08)' }}>
                  <featured.icon className="w-5 h-5" style={{ color: '#EB4379' }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: '#1B2544' }}>{featured.title}</h3>
                  <p className="text-sm mt-1" style={{ color: '#5F6E93' }}>{featured.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-6 mt-6">
                <div>
                  <p className="text-[11px]" style={{ color: '#9BA8C2' }}>Format</p>
                  <p className="text-sm font-medium" style={{ color: '#475578' }}>{featured.format}</p>
                </div>
                <div>
                  <p className="text-[11px]" style={{ color: '#9BA8C2' }}>Last Updated</p>
                  <p className="text-sm font-medium" style={{ color: '#475578' }}>{featured.lastUpdated}</p>
                </div>
                <div>
                  <p className="text-[11px]" style={{ color: '#9BA8C2' }}>Status</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: '#10B981' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-success" />
                    Ready
                  </span>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  className="px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
                  style={{ background: '#EB4379' }}
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4" /> Download
                  </span>
                </button>
                <button className="px-5 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-[#F0F2F7]" style={{ border: '1px solid #D5DAE5', color: '#475578' }}>
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4" /> Preview
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9BA8C2' }} />
          <input
            type="text"
            placeholder="Search sales materials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#4154A3]/30 focus:border-[#4154A3]"
            style={{ border: '1px solid #D5DAE5' }}
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4" style={{ color: '#9BA8C2' }} />
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
              style={
                category === cat.value
                  ? { border: '1px solid #EB4379', background: 'rgba(235,67,121,0.08)', color: '#EB4379' }
                  : { border: '1px solid #D5DAE5', background: 'white', color: '#5F6E93' }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 rounded-lg p-1 bg-white self-start" style={{ border: '1px solid #D5DAE5' }}>
          <button
            onClick={() => setViewMode('grid')}
            className="p-1.5 rounded"
            style={viewMode === 'grid' ? { background: '#F0F2F7' } : undefined}
          >
            <LayoutGrid className="w-4 h-4" style={{ color: '#5F6E93' }} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className="p-1.5 rounded"
            style={viewMode === 'list' ? { background: '#F0F2F7' } : undefined}
          >
            <List className="w-4 h-4" style={{ color: '#5F6E93' }} />
          </button>
        </div>
      </div>

      {/* Deliverables */}
      {viewMode === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <SalesCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl divide-y" style={{ border: '1px solid #D5DAE5' }}>
          {filtered.map((item) => (
            <SalesRow key={item.id} item={item} />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p style={{ color: '#7B8AAD' }}>No sales materials found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

function SalesCard({ item }: { item: Deliverable }) {
  const status = statusColors[item.status];
  return (
    <div className="bg-white rounded-xl overflow-hidden group hover:shadow-md transition-shadow" style={{ border: '1px solid #D5DAE5' }}>
      <div className="relative h-40 overflow-hidden">
        <ImageWithFallback
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-medium ${status.bg} ${status.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' ')}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(235,67,121,0.08)' }}>
            <item.icon className="w-4 h-4" style={{ color: '#EB4379' }} />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold truncate" style={{ color: '#1B2544' }}>{item.title}</h4>
            <p className="text-xs mt-1 line-clamp-2" style={{ color: '#7B8AAD' }}>{item.description}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: '1px solid #E8ECF2' }}>
          <div>
            <p className="text-[11px]" style={{ color: '#9BA8C2' }}>Format</p>
            <p className="text-xs font-medium" style={{ color: '#475578' }}>{item.format}</p>
          </div>
          <div className="flex gap-1.5">
            <button className="p-2 rounded-md hover:bg-[#F0F2F7] transition-colors">
              <Eye className="w-4 h-4" style={{ color: '#7B8AAD' }} />
            </button>
            <button className="p-2 rounded-md hover:bg-[#F0F2F7] transition-colors">
              <Download className="w-4 h-4" style={{ color: '#7B8AAD' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SalesRow({ item }: { item: Deliverable }) {
  const status = statusColors[item.status];
  return (
    <div className="flex items-center gap-4 px-6 py-4 hover:bg-[#F0F2F7] transition-colors" style={{ borderBottom: '1px solid #E8ECF2' }}>
      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(235,67,121,0.08)' }}>
        <item.icon className="w-5 h-5" style={{ color: '#EB4379' }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: '#2F3D5E' }}>{item.title}</p>
        <p className="text-xs truncate" style={{ color: '#7B8AAD' }}>{item.description}</p>
      </div>
      <span className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${status.bg} ${status.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
        {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' ')}
      </span>
      <span className="hidden md:block text-xs w-24" style={{ color: '#7B8AAD' }}>{item.format}</span>
      <span className="hidden lg:block text-xs w-28" style={{ color: '#BCC3D4' }}>{item.lastUpdated}</span>
      <div className="flex gap-1">
        <button className="p-2 rounded-md hover:bg-[#F0F2F7] transition-colors">
          <Eye className="w-4 h-4" style={{ color: '#7B8AAD' }} />
        </button>
        <button className="p-2 rounded-md hover:bg-[#F0F2F7] transition-colors">
          <Download className="w-4 h-4" style={{ color: '#7B8AAD' }} />
        </button>
      </div>
    </div>
  );
}