import { useState } from 'react';
import { useSearchParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getDocumentContent } from '../../lib/documentationContent';

import {
  FileText,
  Building2,
  Target,
  Box,
  GitBranch,
  Shield,
  Megaphone,
  Download,
  Eye,
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Circle,
  Layers,
  Users,
  Briefcase,
  Sparkles,
  Lock,
  TrendingUp,
  FileCheck,
  BookOpen,
  Zap,
  Copy,
  CheckCheck,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════
   DOCUMENTATION PACKS DATA STRUCTURE
   Based on integratewise-doc-index.md
   ═══════════════════════════════════════════════════════════════════ */

type DocStatus = 'complete' | 'in-progress' | 'planned';
type DocPriority = 'tier1' | 'tier2' | 'tier3';

interface Document {
  id: string;
  title: string;
  description: string;
  status: DocStatus;
  priority: DocPriority;
  owner: string;
}

interface DocumentPack {
  id: string;
  name: string;
  icon: typeof FileText;
  color: string;
  description: string;
  primaryAudience: string;
  documents: Document[];
}

const DOCUMENTATION_PACKS: DocumentPack[] = [
  {
    id: 'pack-a',
    name: 'Doctrine & Continuity Strategy',
    icon: Building2,
    color: 'var(--slate)',
    description: 'Defines continuity doctrine, company direction, and strategic business framing.',
    primaryAudience: 'Investors, partners, strategic hires, ecosystem stakeholders',
    documents: [
      {
        id: 'a-01',
        title: 'Company Introduction',
        description: 'Comprehensive introduction to IntegrateWise as a company',
        status: 'complete',
        priority: 'tier1',
        owner: 'Founder',
      },
      {
        id: 'a-02',
        title: 'Company Profile',
        description: 'Formal company profile for partnerships and investors',
        status: 'complete',
        priority: 'tier1',
        owner: 'Founder',
      },
      {
        id: 'a-03',
        title: 'Vision, Mission, and Belief System',
        description: 'Core values and long-term direction',
        status: 'in-progress',
        priority: 'tier1',
        owner: 'Founder',
      },
      {
        id: 'a-04',
        title: 'Founder Narrative / Origin Story',
        description: 'Why IntegrateWise was created',
        status: 'planned',
        priority: 'tier2',
        owner: 'Founder'
      },
      {
        id: 'a-05',
        title: 'Business Model Overview',
        description: 'How IntegrateWise generates revenue',
        status: 'planned',
        priority: 'tier2',
        owner: 'Founder'
      },
      {
        id: 'a-06',
        title: 'Strategic Priorities Document',
        description: 'Current strategic focus areas',
        status: 'planned',
        priority: 'tier2',
        owner: 'Founder'
      },
      {
        id: 'a-07',
        title: 'Market Opportunity Overview',
        description: 'TAM, SAM, SOM analysis',
        status: 'planned',
        priority: 'tier2',
        owner: 'Strategy'
      },
      {
        id: 'a-08',
        title: 'Go-to-Market Strategy',
        description: 'Market entry and growth strategy',
        status: 'planned',
        priority: 'tier2',
        owner: 'GTM'
      },
    ]
  },
  {
    id: 'pack-b',
    name: 'Category, Positioning & Brand',
    icon: Target,
    color: 'var(--red)',
    description: 'Defines the market category, language, positioning, and narrative architecture.',
    primaryAudience: 'Marketing, founders, sales, web/brand teams, investors',
    documents: [
      {
        id: 'b-01',
        title: 'Category Definition Brief',
        description: 'Continuity as a category and operating model',
        status: 'complete',
        priority: 'tier1',
        owner: 'Marketing',
      },
      {
        id: 'b-02',
        title: 'Messaging Framework',
        description: 'Core messaging architecture',
        status: 'complete',
        priority: 'tier1',
        owner: 'Marketing',
      },
      {
        id: 'b-03',
        title: 'Brand Guidelines',
        description: 'Visual identity, colors, typography, logo usage',
        status: 'complete',
        priority: 'tier1',
        owner: 'Marketing'
      },
      {
        id: 'b-04',
        title: 'Positioning Statement',
        description: 'How IntegrateWise positions against alternatives',
        status: 'in-progress',
        priority: 'tier1',
        owner: 'Marketing'
      },
      {
        id: 'b-05',
        title: 'ICP Definition',
        description: 'Ideal Customer Profile',
        status: 'in-progress',
        priority: 'tier1',
        owner: 'Product'
      },
      {
        id: 'b-06',
        title: 'Competitive Positioning Sheet',
        description: 'How IntegrateWise differs from alternatives',
        status: 'planned',
        priority: 'tier2',
        owner: 'Marketing'
      },
      {
        id: 'b-07',
        title: 'Objection Handling Guide',
        description: 'Common objections and responses',
        status: 'planned',
        priority: 'tier2',
        owner: 'Sales'
      },
    ]
  },
  {
    id: 'pack-c',
    name: 'Product Narrative & Continuity System',
    icon: Box,
    color: 'var(--slate)',
    description: 'Defines the continuity-native product model, users, and capability architecture.',
    primaryAudience: 'Product, design, GTM, implementation, engineering',
    documents: [
      {
        id: 'c-01',
        title: 'Product Overview',
        description: 'High-level product summary',
        status: 'complete',
        priority: 'tier1',
        owner: 'Product',
      },
      {
        id: 'c-02',
        title: 'Product Vision Document',
        description: 'Long-term product direction',
        status: 'in-progress',
        priority: 'tier1',
        owner: 'Product'
      },
      {
        id: 'c-03',
        title: 'Use Case Library',
        description: 'Real-world use cases and scenarios',
        status: 'in-progress',
        priority: 'tier1',
        owner: 'Product'
      },
      {
        id: 'c-04',
        title: 'Feature Map / Capability Map',
        description: 'Complete feature inventory',
        status: 'in-progress',
        priority: 'tier2',
        owner: 'Product'
      },
      {
        id: 'c-05',
        title: 'Product Roadmap',
        description: 'Planned features and timeline',
        status: 'planned',
        priority: 'tier2',
        owner: 'Product'
      },
      {
        id: 'c-06',
        title: 'Master PRD',
        description: 'Comprehensive product requirements',
        status: 'planned',
        priority: 'tier3',
        owner: 'Product'
      },
    ]
  },
  {
    id: 'pack-d',
    name: 'Adaptive Spine & Technical System',
    icon: GitBranch,
    color: 'var(--slate)',
    description: 'Defines hydration flows and how the Adaptive Spine operates as core infrastructure.',
    primaryAudience: 'Engineering, product, solution architecture, investors, enterprise buyers',
    documents: [
      {
        id: 'd-01',
        title: 'Architecture Overview',
        description: 'High-level system architecture',
        status: 'complete',
        priority: 'tier1',
        owner: 'Engineering',
      },
      {
        id: 'd-02',
        title: 'Spine Architecture Document',
        description: 'Detailed Spine design and implementation',
        status: 'complete',
        priority: 'tier1',
        owner: 'Engineering'
      },
      {
        id: 'd-03',
        title: 'Flow A / Flow B / Flow C Documentation',
        description: 'Data flow architecture',
        status: 'complete',
        priority: 'tier1',
        owner: 'Engineering'
      },
      {
        id: 'd-04',
        title: 'Governed Intelligence Cycle Documentation',
        description: 'AI governance workflow',
        status: 'in-progress',
        priority: 'tier1',
        owner: 'Engineering'
      },
      {
        id: 'd-05',
        title: 'Approval Workflow Architecture',
        description: 'How approval system works',
        status: 'in-progress',
        priority: 'tier1',
        owner: 'Engineering'
      },
      {
        id: 'd-06',
        title: 'Connector / Integration Architecture',
        description: 'How external systems connect',
        status: 'planned',
        priority: 'tier2',
        owner: 'Engineering'
      },
      {
        id: 'd-07',
        title: 'API Documentation',
        description: 'Complete API reference',
        status: 'planned',
        priority: 'tier3',
        owner: 'Engineering'
      },
    ]
  },
  {
    id: 'pack-e',
    name: 'AI, Governance & Trust',
    icon: Shield,
    color: 'var(--ink)',
    description: 'Defines how AI is governed, how actions are controlled, and why the system is trustworthy.',
    primaryAudience: 'Enterprise buyers, security teams, compliance, product, leadership',
    documents: [
      {
        id: 'e-01',
        title: 'AI Governance Framework',
        description: 'How AI is controlled and governed',
        status: 'complete',
        priority: 'tier1',
        owner: 'Product',
      },
      {
        id: 'e-02',
        title: 'Approval-first Execution Policy',
        description: 'Detailed approval workflow rules',
        status: 'complete',
        priority: 'tier1',
        owner: 'Product'
      },
      {
        id: 'e-03',
        title: 'Security Overview',
        description: 'Security architecture and practices',
        status: 'in-progress',
        priority: 'tier2',
        owner: 'Engineering'
      },
      {
        id: 'e-04',
        title: 'Privacy Overview',
        description: 'Data privacy and handling',
        status: 'in-progress',
        priority: 'tier2',
        owner: 'Engineering'
      },
      {
        id: 'e-05',
        title: 'Compliance Mapping',
        description: 'SOC2, GDPR, ISO compliance',
        status: 'planned',
        priority: 'tier3',
        owner: 'Security'
      },
    ]
  },
  {
    id: 'pack-f',
    name: 'GTM, Sales & Customer Success',
    icon: Megaphone,
    color: 'var(--red)',
    description: 'Defines how IntegrateWise is sold, deployed, adopted, and supported.',
    primaryAudience: 'Sales, CS, implementation, partners, customer teams',
    documents: [
      {
        id: 'f-01',
        title: 'Sales Deck',
        description: '10-slide master sales presentation',
        status: 'complete',
        priority: 'tier1',
        owner: 'Sales',
      },
      {
        id: 'f-02',
        title: 'Investor Deck',
        description: 'Pitch deck for fundraising',
        status: 'complete',
        priority: 'tier1',
        owner: 'Founder'
      },
      {
        id: 'f-03',
        title: 'One-Pager',
        description: 'Single-page company overview',
        status: 'complete',
        priority: 'tier1',
        owner: 'Marketing'
      },
      {
        id: 'f-04',
        title: 'Demo Narrative',
        description: 'How to demo IntegrateWise',
        status: 'in-progress',
        priority: 'tier2',
        owner: 'Sales'
      },
      {
        id: 'f-05',
        title: 'Discovery Questions Framework',
        description: 'Questions for sales discovery',
        status: 'planned',
        priority: 'tier2',
        owner: 'Sales'
      },
      {
        id: 'f-06',
        title: 'Onboarding Guide',
        description: 'Customer onboarding process',
        status: 'planned',
        priority: 'tier2',
        owner: 'CS'
      },
      {
        id: 'f-07',
        title: 'Implementation Guide',
        description: 'Technical implementation steps',
        status: 'planned',
        priority: 'tier2',
        owner: 'CS'
      },
    ]
  },
];

export function DocumentationPage() {
  const [searchParams] = useSearchParams();
  const packFromUrl = searchParams.get('pack');

  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [expandedPacks, setExpandedPacks] = useState<Set<string>>(
    new Set(packFromUrl ? [packFromUrl] : ['pack-a'])
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<DocStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<DocPriority | 'all'>('all');
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(() => {
    // Auto-select first doc of the pack from URL
    if (packFromUrl) {
      const pack = DOCUMENTATION_PACKS.find(p => p.id === packFromUrl);
      return pack?.documents[0] || null;
    }
    return null;
  });

  // React to URL changes (when user clicks different doc pack in sidebar)
  const [lastPack, setLastPack] = useState(packFromUrl);
  if (packFromUrl && packFromUrl !== lastPack) {
    setLastPack(packFromUrl);
    setExpandedPacks(new Set([packFromUrl]));
    const pack = DOCUMENTATION_PACKS.find(p => p.id === packFromUrl);
    if (pack?.documents[0]) {
      setSelectedDoc(pack.documents[0]);
    }
  }

  const togglePack = (packId: string) => {
    const newExpanded = new Set(expandedPacks);
    if (newExpanded.has(packId)) {
      newExpanded.delete(packId);
    } else {
      newExpanded.add(packId);
    }
    setExpandedPacks(newExpanded);
  };

  const getStatusIcon = (status: DocStatus) => {
    switch (status) {
      case 'complete': return CheckCircle2;
      case 'in-progress': return Clock;
      case 'planned': return Circle;
    }
  };

  const getStatusColor = (status: DocStatus) => {
    switch (status) {
      case 'complete': return 'var(--success-color)';
      case 'in-progress': return 'var(--warning-color)';
      case 'planned': return 'var(--slate)';
    }
  };

  const getPriorityLabel = (priority: DocPriority) => {
    switch (priority) {
      case 'tier1': return 'High Priority';
      case 'tier2': return 'Medium';
      case 'tier3': return 'Future';
    }
  };

  const filteredPacks = DOCUMENTATION_PACKS.map(pack => ({
    ...pack,
    documents: pack.documents.filter(doc => {
      const matchesSearch = searchQuery === '' || 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || doc.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    })
  })).filter(pack => pack.documents.length > 0);

  const allDocs = DOCUMENTATION_PACKS.flatMap(pack => pack.documents);
  const completeDocs = allDocs.filter(d => d.status === 'complete').length;
  const inProgressDocs = allDocs.filter(d => d.status === 'in-progress').length;
  const plannedDocs = allDocs.filter(d => d.status === 'planned').length;

  const handleDownloadDoc = (doc: Document, format: 'md' | 'txt') => {
    const content = getDocumentContent(doc.id);
    if (!content) {
      alert('This document does not have content yet.');
      return;
    }

    const blob = new Blob([content], { type: format === 'md' ? 'text/markdown;charset=utf-8' : 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/\s+/g, '_')}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-full p-6 lg:p-8 max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--primary-soft)' }}>
            <BookOpen className="w-4 h-4" style={{ color: 'var(--primary-color)' }} />
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-strong)' }}>Documentation Library</h1>
        </div>
        <p className="text-sm ml-12" style={{ color: 'var(--text-muted)' }}>
          6 doctrine packs · {allDocs.length} documents across continuity strategy, product, architecture, governance, and go-to-market.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="px-4 py-3 rounded-xl flex items-center gap-3" style={{ background: 'var(--surface)', border: '1px solid var(--border-base)' }}>
          <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: 'var(--status-success)' }} />
          <div>
            <p className="text-xl font-bold leading-none" style={{ color: 'var(--status-success)' }}>{completeDocs}</p>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-faint)' }}>Complete</p>
          </div>
        </div>
        <div className="px-4 py-3 rounded-xl flex items-center gap-3" style={{ background: 'var(--surface)', border: '1px solid var(--border-base)' }}>
          <Clock className="w-5 h-5 shrink-0" style={{ color: 'var(--status-warning)' }} />
          <div>
            <p className="text-xl font-bold leading-none" style={{ color: 'var(--status-warning)' }}>{inProgressDocs}</p>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-faint)' }}>In Progress</p>
          </div>
        </div>
        <div className="px-4 py-3 rounded-xl flex items-center gap-3" style={{ background: 'var(--surface)', border: '1px solid var(--border-base)' }}>
          <Circle className="w-5 h-5 shrink-0" style={{ color: 'var(--text-faint)' }} />
          <div>
            <p className="text-xl font-bold leading-none" style={{ color: 'var(--text-faint)' }}>{plannedDocs}</p>
            <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-faint)' }}>Planned</p>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-faint)' }} />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg text-sm"
            style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-base)', color: 'var(--text-strong)' }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as DocStatus | 'all')}
          className="px-3 py-2 rounded-lg text-xs"
          style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-base)', color: 'var(--text-muted)' }}
        >
          <option value="all">All Status</option>
          <option value="complete">Complete</option>
          <option value="in-progress">In Progress</option>
          <option value="planned">Planned</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as DocPriority | 'all')}
          className="px-3 py-2 rounded-lg text-xs"
          style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-base)', color: 'var(--text-muted)' }}
        >
          <option value="all">All Priority</option>
          <option value="tier1">Tier 1</option>
          <option value="tier2">Tier 2</option>
          <option value="tier3">Tier 3</option>
        </select>
      </div>

      {/* Pack tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => { setSelectedPack(null); setSelectedDoc(null); }}
          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          style={{
            background: selectedPack === null ? 'var(--primary-color)' : 'var(--surface)',
            color: selectedPack === null ? 'var(--text-inverse)' : 'var(--text-muted)',
            border: '1px solid var(--border-base)',
          }}
        >
          All Packs
        </button>
        {DOCUMENTATION_PACKS.map(pack => (
          <button
            key={pack.id}
            onClick={() => { setSelectedPack(pack.id); setSelectedDoc(pack.documents[0] || null); }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
            style={{
              background: selectedPack === pack.id ? pack.color : 'var(--surface)',
              color: selectedPack === pack.id ? '#fff' : 'var(--text-muted)',
              border: `1px solid ${selectedPack === pack.id ? pack.color : 'var(--border-base)'}`,
            }}
          >
            {pack.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Selected doc detail */}
      {selectedDoc ? (
        <div className="mb-8">
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border-base)' }}>
            {/* Doc header */}
            <div className="p-6" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border-base)' }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-strong)' }}>{selectedDoc.title}</h2>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{selectedDoc.description}</p>
                </div>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="text-xs px-3 py-1.5 rounded-lg"
                  style={{ color: 'var(--text-muted)', background: 'var(--surface-2)', border: '1px solid var(--border-base)' }}
                >
                  Close
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: `color-mix(in srgb, ${getStatusColor(selectedDoc.status)} 12%, transparent)`, color: getStatusColor(selectedDoc.status) }}>
                  {(() => { const S = getStatusIcon(selectedDoc.status); return <S className="w-3 h-3" />; })()}
                  {selectedDoc.status.replace('-', ' ')}
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
                  <Layers className="w-3 h-3" />{getPriorityLabel(selectedDoc.priority)}
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
                  <Users className="w-3 h-3" />Owner: {selectedDoc.owner}
                </span>
              </div>
              {getDocumentContent(selectedDoc.id) && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleDownloadDoc(selectedDoc, 'md')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{ background: 'var(--primary-color)', color: 'var(--text-inverse)' }}
                  >
                    <Download className="w-3.5 h-3.5" />Download Markdown
                  </button>
                  <button
                    onClick={() => handleDownloadDoc(selectedDoc, 'txt')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-base)', color: 'var(--text-muted)' }}
                  >
                    <Download className="w-3.5 h-3.5" />Download TXT
                  </button>
                </div>
              )}
            </div>
            {/* Doc content */}
            <div className="p-6" style={{ background: 'var(--surface-raised)' }}>
              {getDocumentContent(selectedDoc.id) ? (
                <article className="markdown-content prose prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{getDocumentContent(selectedDoc.id)!}</ReactMarkdown>
                </article>
              ) : (
                <div className="py-12 text-center">
                  <FileText className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--text-faint)' }} />
                  <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-strong)' }}>Document In Progress</h3>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    This document is {selectedDoc.status === 'in-progress' ? 'currently being worked on' : 'planned for future development'}.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* Pack cards */}
      <div className="space-y-3">
        {filteredPacks.map(pack => {
          const Icon = pack.icon;
          const isOpen = expandedPacks.has(pack.id);
          const complete = pack.documents.filter(d => d.status === 'complete').length;
          const total = pack.documents.length;
          const progress = (complete / total) * 100;

          return (
            <div key={pack.id} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-base)' }}>
              {/* Pack header */}
              <button
                onClick={() => togglePack(pack.id)}
                className="w-full flex items-center gap-3 p-5 text-left transition-colors"
                style={{ background: isOpen ? 'var(--surface)' : 'var(--surface-raised)' }}
              >
                <div className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center" style={{ background: `color-mix(in srgb, ${pack.color} 14%, transparent)` }}>
                  <Icon className="w-4 h-4" style={{ color: pack.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold truncate" style={{ color: 'var(--text-strong)' }}>{pack.name}</h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full shrink-0" style={{ background: `color-mix(in srgb, ${pack.color} 12%, transparent)`, color: pack.color }}>{total}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--surface-2)' }}>
                      <div className="h-full rounded-full" style={{ width: `${progress}%`, background: pack.color }} />
                    </div>
                    <span className="text-[10px] shrink-0" style={{ color: 'var(--text-faint)' }}>{complete}/{total}</span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 shrink-0 transition-transform" style={{ color: 'var(--text-faint)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>

              {/* Doc list */}
              {isOpen && (
                <div style={{ borderTop: '1px solid var(--border-base)' }}>
                  {pack.documents.map((doc, i) => {
                    const StatusIcon = getStatusIcon(doc.status);
                    const isSelected = selectedDoc?.id === doc.id;
                    return (
                      <button
                        key={doc.id}
                        onClick={() => setSelectedDoc(isSelected ? null : doc)}
                        className="w-full flex items-start gap-3 px-5 py-3 text-left transition-colors"
                        style={{
                          background: isSelected ? 'var(--primary-soft)' : i % 2 === 0 ? 'var(--surface-raised)' : 'var(--surface)',
                          borderTop: i > 0 ? '1px solid var(--border-subtle)' : 'none',
                        }}
                      >
                        <StatusIcon className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: getStatusColor(doc.status) }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium" style={{ color: isSelected ? 'var(--primary-color)' : 'var(--text-strong)' }}>{doc.title}</p>
                          <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-faint)' }}>{doc.owner} · {getPriorityLabel(doc.priority)}</p>
                        </div>
                        <ChevronRight className="w-3 h-3 shrink-0 mt-0.5" style={{ color: 'var(--text-faint)' }} />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Priority roadmap */}
      <div className="mt-8 rounded-xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border-base)' }}>
        <h3 className="text-base font-semibold mb-4" style={{ color: 'var(--text-strong)' }}>Priority Roadmap</h3>
        <div className="space-y-3">
          {(['tier1', 'tier2', 'tier3'] as const).map(tier => {
            const tierDocs = allDocs.filter(d => d.priority === tier);
            const tierComplete = tierDocs.filter(d => d.status === 'complete').length;
            return (
              <div key={tier} className="flex items-center gap-4">
                <div className="w-20 shrink-0">
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-strong)' }}>{tier === 'tier1' ? 'Tier 1' : tier === 'tier2' ? 'Tier 2' : 'Tier 3'}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-faint)' }}>{tier === 'tier1' ? 'Immediate' : tier === 'tier2' ? 'Next' : 'Future'}</p>
                </div>
                <div className="flex-1 h-2 rounded-full" style={{ background: 'var(--surface-2)' }}>
                  <div className="h-full rounded-full" style={{ width: `${(tierComplete / tierDocs.length) * 100}%`, background: tier === 'tier1' ? 'var(--status-success)' : tier === 'tier2' ? 'var(--status-warning)' : 'var(--text-faint)' }} />
                </div>
                <p className="text-xs font-medium w-16 text-right shrink-0" style={{ color: 'var(--text-muted)' }}>{tierComplete}/{tierDocs.length} done</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}