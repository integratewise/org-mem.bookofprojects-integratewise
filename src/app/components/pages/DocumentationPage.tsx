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
    color: '#4356A9',
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
    color: '#EB4F72',
    description: 'Defines the market category, language, positioning, and narrative architecture.',
    primaryAudience: 'Marketing, founders, sales, web/brand teams, investors',
    documents: [
      {
        id: 'b-01',
        title: 'Category Definition Brief',
        description: 'Knowledge Workspace as a category',
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
    color: '#55608C',
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
    color: '#636A82',
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
    color: '#232D42',
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
    color: '#D9637F',
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
      case 'complete': return '#10B981';
      case 'in-progress': return '#F59E0B';
      case 'planned': return '#808CA9';
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
    <div className="h-full flex">
      {/* Left sidebar - Documentation tree */}
      <div className="w-80 flex flex-col" style={{ background: '#F8F9FB', borderRight: '1px solid #E5E8F4' }}>
        {/* Header */}
        <div className="p-6 shrink-0" style={{ borderBottom: '1px solid #E5E8F4' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#4356A9' }}>
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold" style={{ color: '#232D42' }}>Documentation Library</h2>
              <p className="text-xs" style={{ color: '#808CA9' }}>6 Master Packs</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="px-3 py-2 rounded-lg" style={{ background: '#fff', border: '1px solid #E5E8F4' }}>
              <p className="text-lg font-bold" style={{ color: '#10B981' }}>{completeDocs}</p>
              <p className="text-[10px]" style={{ color: '#808CA9' }}>Complete</p>
            </div>
            <div className="px-3 py-2 rounded-lg" style={{ background: '#fff', border: '1px solid #E5E8F4' }}>
              <p className="text-lg font-bold" style={{ color: '#F59E0B' }}>{inProgressDocs}</p>
              <p className="text-[10px]" style={{ color: '#808CA9' }}>In Progress</p>
            </div>
            <div className="px-3 py-2 rounded-lg" style={{ background: '#fff', border: '1px solid #E5E8F4' }}>
              <p className="text-lg font-bold" style={{ color: '#808CA9' }}>{plannedDocs}</p>
              <p className="text-[10px]" style={{ color: '#808CA9' }}>Planned</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#808CA9' }} />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg text-sm"
              style={{ background: '#fff', border: '1px solid #E5E8F4', color: '#232D42' }}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 mt-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as DocStatus | 'all')}
              className="flex-1 px-2 py-1.5 rounded-md text-xs"
              style={{ background: '#fff', border: '1px solid #E5E8F4', color: '#636A82' }}
            >
              <option value="all">All Status</option>
              <option value="complete">Complete</option>
              <option value="in-progress">In Progress</option>
              <option value="planned">Planned</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as DocPriority | 'all')}
              className="flex-1 px-2 py-1.5 rounded-md text-xs"
              style={{ background: '#fff', border: '1px solid #E5E8F4', color: '#636A82' }}
            >
              <option value="all">All Priority</option>
              <option value="tier1">Tier 1</option>
              <option value="tier2">Tier 2</option>
              <option value="tier3">Tier 3</option>
            </select>
          </div>
        </div>

        {/* Documentation tree */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredPacks.map(pack => {
            const isExpanded = expandedPacks.has(pack.id);
            const Icon = pack.icon;

            return (
              <div key={pack.id} className="space-y-1">
                <button
                  onClick={() => togglePack(pack.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left hover:bg-white/60 transition-colors"
                  style={{ background: isExpanded ? '#fff' : 'transparent' }}
                >
                  {isExpanded ? <ChevronDown className="w-4 h-4" style={{ color: pack.color }} /> : <ChevronRight className="w-4 h-4" style={{ color: pack.color }} />}
                  <Icon className="w-4 h-4" style={{ color: pack.color }} />
                  <span className="text-sm font-medium flex-1" style={{ color: '#232D42' }}>{pack.name}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: `${pack.color}15`, color: pack.color }}>
                    {pack.documents.length}
                  </span>
                </button>

                {isExpanded && (
                  <div className="ml-6 space-y-1">
                    {pack.documents.map(doc => {
                      const StatusIcon = getStatusIcon(doc.status);
                      const isSelected = selectedDoc?.id === doc.id;

                      return (
                        <button
                          key={doc.id}
                          onClick={() => setSelectedDoc(doc)}
                          className="w-full flex items-start gap-2 px-3 py-2 rounded-lg text-left hover:bg-white transition-colors"
                          style={{ background: isSelected ? '#fff' : 'transparent', border: isSelected ? '1px solid #E5E8F4' : '1px solid transparent' }}
                        >
                          <StatusIcon className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: getStatusColor(doc.status) }} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate" style={{ color: '#232D42' }}>{doc.title}</p>
                            <p className="text-[10px] mt-0.5" style={{ color: '#808CA9' }}>{doc.owner}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto">
        {selectedDoc ? (
          // Document detail view
          <div className="p-8 max-w-4xl mx-auto">
            {/* Document header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2" style={{ color: '#232D42' }}>{selectedDoc.title}</h1>
                  <p className="text-sm" style={{ color: '#636A82' }}>{selectedDoc.description}</p>
                </div>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100"
                  style={{ color: '#636A82' }}
                >
                  Close
                </button>
              </div>

              {/* Meta info */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: `${getStatusColor(selectedDoc.status)}15` }}>
                  {(() => {
                    const StatusIcon = getStatusIcon(selectedDoc.status);
                    return <StatusIcon className="w-3.5 h-3.5" style={{ color: getStatusColor(selectedDoc.status) }} />;
                  })()}
                  <span className="text-xs font-medium capitalize" style={{ color: getStatusColor(selectedDoc.status) }}>
                    {selectedDoc.status.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: '#F0F2F7' }}>
                  <Layers className="w-3.5 h-3.5" style={{ color: '#636A82' }} />
                  <span className="text-xs font-medium" style={{ color: '#636A82' }}>
                    {getPriorityLabel(selectedDoc.priority)}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: '#F0F2F7' }}>
                  <Users className="w-3.5 h-3.5" style={{ color: '#636A82' }} />
                  <span className="text-xs font-medium" style={{ color: '#636A82' }}>
                    Owner: {selectedDoc.owner}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            {getDocumentContent(selectedDoc.id) && (
              <div className="mb-6 flex gap-2">
                <button
                  onClick={() => handleDownloadDoc(selectedDoc, 'md')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{ background: '#4356A9', color: '#fff' }}
                >
                  <Download className="w-4 h-4" />
                  Download Markdown
                </button>
                <button
                  onClick={() => handleDownloadDoc(selectedDoc, 'txt')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{ background: '#fff', border: '1px solid #E5E8F4', color: '#636A82' }}
                >
                  <Download className="w-4 h-4" />
                  Download TXT
                </button>
              </div>
            )}

            {/* Content */}
            {getDocumentContent(selectedDoc.id) ? (
              <div className="prose prose-sm max-w-none">
                <div className="bg-white rounded-xl p-8" style={{ border: '1px solid #E5E8F4' }}>
                  <article className="markdown-content">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        img: ({node, ...props}) => (
                          <span className="my-8 flex justify-center w-full">
                            <img
                              {...props}
                              className="rounded-xl shadow-lg border max-h-[400px] object-cover"
                              style={{ borderColor: '#E5E8F4' }}
                            />
                          </span>
                        )
                      }}
                    >
                      {getDocumentContent(selectedDoc.id)!}
                    </ReactMarkdown>
                  </article>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 text-center" style={{ border: '1px solid #E5E8F4' }}>
                <FileText className="w-12 h-12 mx-auto mb-4" style={{ color: '#808CA9' }} />
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#232D42' }}>Document In Progress</h3>
                <p className="text-sm" style={{ color: '#636A82' }}>
                  This document is {selectedDoc.status === 'in-progress' ? 'currently being worked on' : 'planned for future development'}.
                </p>
              </div>
            )}

            {/* Pack context */}
            <div className="mt-8 p-6 rounded-xl" style={{ background: '#F8F9FB', border: '1px solid #E5E8F4' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: '#808CA9' }}>PART OF</p>
              {(() => {
                const pack = DOCUMENTATION_PACKS.find(p => p.documents.some(d => d.id === selectedDoc.id));
                if (!pack) return null;
                const Icon = pack.icon;
                return (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${pack.color}15` }}>
                      <Icon className="w-5 h-5" style={{ color: pack.color }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold" style={{ color: '#232D42' }}>{pack.name}</h4>
                      <p className="text-xs mt-1" style={{ color: '#636A82' }}>{pack.description}</p>
                      <p className="text-[10px] mt-2" style={{ color: '#808CA9' }}>
                        <strong>Primary Audience:</strong> {pack.primaryAudience}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        ) : (
          // Overview / landing state
          <div className="p-8 max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-3" style={{ color: '#232D42' }}>IntegrateWise Continuity Documentation System</h1>
              <p className="text-base" style={{ color: '#636A82' }}>
                Unified doctrine documentation organized into 6 packs covering continuity strategy,
                category narrative, product system, adaptive architecture, governance, and go-to-market.
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #E5E8F4' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#10B98115' }}>
                    <CheckCircle2 className="w-5 h-5" style={{ color: '#10B981' }} />
                  </div>
                  <p className="text-2xl font-bold" style={{ color: '#10B981' }}>{completeDocs}</p>
                </div>
                <p className="text-sm font-medium" style={{ color: '#636A82' }}>Complete Documents</p>
              </div>
              <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #E5E8F4' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#F59E0B15' }}>
                    <Clock className="w-5 h-5" style={{ color: '#F59E0B' }} />
                  </div>
                  <p className="text-2xl font-bold" style={{ color: '#F59E0B' }}>{inProgressDocs}</p>
                </div>
                <p className="text-sm font-medium" style={{ color: '#636A82' }}>In Progress</p>
              </div>
              <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #E5E8F4' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#808CA915' }}>
                    <Circle className="w-5 h-5" style={{ color: '#808CA9' }} />
                  </div>
                  <p className="text-2xl font-bold" style={{ color: '#808CA9' }}>{plannedDocs}</p>
                </div>
                <p className="text-sm font-medium" style={{ color: '#636A82' }}>Planned</p>
              </div>
              <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #E5E8F4' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#4356A915' }}>
                    <Layers className="w-5 h-5" style={{ color: '#4356A9' }} />
                  </div>
                  <p className="text-2xl font-bold" style={{ color: '#4356A9' }}>{allDocs.length}</p>
                </div>
                <p className="text-sm font-medium" style={{ color: '#636A82' }}>Total Documents</p>
              </div>
            </div>

            {/* Pack overview cards */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4" style={{ color: '#232D42' }}>Documentation Packs</h2>
              {DOCUMENTATION_PACKS.map(pack => {
                const Icon = pack.icon;
                const complete = pack.documents.filter(d => d.status === 'complete').length;
                const total = pack.documents.length;
                const progress = (complete / total) * 100;

                return (
                  <div key={pack.id} className="bg-white rounded-xl p-6" style={{ border: '1px solid #E5E8F4' }}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${pack.color}15` }}>
                        <Icon className="w-6 h-6" style={{ color: pack.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1" style={{ color: '#232D42' }}>{pack.name}</h3>
                        <p className="text-sm mb-3" style={{ color: '#636A82' }}>{pack.description}</p>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" style={{ color: '#808CA9' }} />
                            <p className="text-xs" style={{ color: '#808CA9' }}>
                              <strong>Audience:</strong> {pack.primaryAudience}
                            </p>
                          </div>
                        </div>
                        {/* Progress bar */}
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 rounded-full" style={{ background: '#F0F2F7' }}>
                            <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: pack.color }} />
                          </div>
                          <p className="text-xs font-medium shrink-0" style={{ color: pack.color }}>
                            {complete}/{total} complete
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setExpandedPacks(new Set([pack.id]));
                          if (pack.documents[0]) {
                            setSelectedDoc(pack.documents[0]);
                          }
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-50"
                        style={{ color: pack.color, border: `1px solid ${pack.color}30` }}
                      >
                        View <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Priority tiers */}
            <div className="mt-8 bg-white rounded-xl p-6" style={{ border: '1px solid #E5E8F4' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#232D42' }}>Priority Roadmap</h3>
              <div className="space-y-4">
                {(['tier1', 'tier2', 'tier3'] as const).map(tier => {
                  const tierDocs = allDocs.filter(d => d.priority === tier);
                  const tierComplete = tierDocs.filter(d => d.status === 'complete').length;
                  
                  return (
                    <div key={tier} className="flex items-center gap-4">
                      <div className="w-24 shrink-0">
                        <p className="text-sm font-semibold" style={{ color: '#232D42' }}>
                          {tier === 'tier1' ? 'Tier 1' : tier === 'tier2' ? 'Tier 2' : 'Tier 3'}
                        </p>
                        <p className="text-xs" style={{ color: '#808CA9' }}>
                          {tier === 'tier1' ? 'Immediate' : tier === 'tier2' ? 'Next' : 'Future'}
                        </p>
                      </div>
                      <div className="flex-1 h-2 rounded-full" style={{ background: '#F0F2F7' }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(tierComplete / tierDocs.length) * 100}%`,
                            background: tier === 'tier1' ? '#10B981' : tier === 'tier2' ? '#F59E0B' : '#808CA9'
                          }}
                        />
                      </div>
                      <p className="text-xs font-medium w-24 text-right" style={{ color: '#636A82' }}>
                        {tierComplete}/{tierDocs.length} done
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
