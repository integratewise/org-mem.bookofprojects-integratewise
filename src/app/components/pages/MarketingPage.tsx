import {
  Download,
  Eye,
  FileText,
  Image,
  Mail,
  Share2,
  Presentation,
  Globe,
  Megaphone,
  Filter,
  Search,
  LayoutGrid,
  List,
  Linkedin,
  MessageCircle,
  RotateCw,
  Copy,
  Check,
  Phone,
  MapPin,
  Clock,
  ShoppingBag,
  Zap,
  Shield,
  Brain,
  Layers,
} from 'lucide-react';
import { copyToClipboard } from '../../utils/clipboard';

type Category = 'all' | 'social' | 'linkedin' | 'whatsapp' | 'print' | 'web' | 'events';
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
}

const deliverables: Deliverable[] = [
  {
    id: '1',
    title: 'Social Media Template Kit',
    description: 'LinkedIn, Twitter, and Instagram post templates (1080x1080) with brand guidelines',
    category: 'social',
    format: 'Figma / PNG',
    status: 'ready',
    lastUpdated: 'Mar 15, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1769596722541-40dedee6789d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZyUyMHRlbXBsYXRlfGVufDF8fHx8MTc3MzYxMjIwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Share2,
  },
  {
    id: '2',
    title: 'LinkedIn Organization Banner',
    description: '1584x396 banner with brand messaging and spine network visualization',
    category: 'linkedin',
    format: 'PNG / Figma',
    status: 'ready',
    lastUpdated: 'Mar 14, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1702609342206-c37562b99740?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBjYW1wYWlnbiUyMG1hdGVyaWFscyUyMGJyYW5kaW5nfGVufDF8fHx8MTc3MzY0NTQyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Linkedin,
  },
  {
    id: '3',
    title: 'LinkedIn Post Templates',
    description: 'Product insight, problem, solution, architecture, and announcement post templates',
    category: 'linkedin',
    format: 'Figma / PNG',
    status: 'ready',
    lastUpdated: 'Mar 13, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1763296840082-cac05bc18337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBicmFuZCUyMGlkZW50aXR5JTIwZGVzaWduJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3MzY0NTQyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Linkedin,
  },
  {
    id: '4',
    title: 'WhatsApp Marketing Image',
    description: '1080x1080 with "Effortless Work Begins With Context" headline and Book a Demo CTA',
    category: 'whatsapp',
    format: 'PNG / Figma',
    status: 'ready',
    lastUpdated: 'Mar 12, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1683117927786-f146451082fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWFpbCUyMG5ld3NsZXR0ZXIlMjBtYXJrZXRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzczNjQ1NDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: MessageCircle,
  },
  {
    id: '5',
    title: 'WhatsApp Business Catalog',
    description: '5 catalog items: Platform, Adaptive Spine, Context-Aware AI, Approvals, Enterprise Workspace',
    category: 'whatsapp',
    format: 'Text / Images',
    status: 'ready',
    lastUpdated: 'Mar 11, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1769893464274-ef3af10359f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNhcmQlMjBjb3Jwb3JhdGUlMjBpZGVudGl0eXxlbnwxfHx8fDE3NzM1NTg0NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: MessageCircle,
  },
  {
    id: '6',
    title: 'Email Campaign Templates',
    description: 'Newsletter, product launch, and nurture sequence HTML templates with brand footer',
    category: 'web',
    format: 'HTML / Figma',
    status: 'ready',
    lastUpdated: 'Mar 10, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1683117927786-f146451082fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWFpbCUyMG5ld3NsZXR0ZXIlMjBtYXJrZXRpbmclMjBkZXNpZ258ZW58MXx8fHwxNzczNjQ1NDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Mail,
  },
  {
    id: '7',
    title: 'Product Brochure / Marketing Sheet',
    description: '2-page one-pager or 4-page fold with "Work Becomes Smarter When AI Understands Context"',
    category: 'print',
    format: 'PDF / InDesign',
    status: 'ready',
    lastUpdated: 'Mar 8, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1555000001-d923003e3c0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBicm9jaHVyZSUyMHByaW50JTIwZGVzaWdufGVufDF8fHx8MTc3MzY0NTQyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: FileText,
  },
  {
    id: '8',
    title: 'Company Profile One-Pager',
    description: '1200x1600 profile with "Effortless Work Begins With Context" and core principles',
    category: 'print',
    format: 'PDF / Figma',
    status: 'ready',
    lastUpdated: 'Mar 6, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1769893464274-ef3af10359f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNhcmQlMjBjb3Jwb3JhdGUlMjBpZGVudGl0eXxlbnwxfHx8fDE3NzM1NTg0NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: FileText,
  },
  {
    id: '9',
    title: 'Marketing One-Pager',
    description: '1200x900 with three columns: Connect, Propose, Learn + Book Demo CTA',
    category: 'print',
    format: 'PDF / Figma',
    status: 'ready',
    lastUpdated: 'Mar 5, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1702609342206-c37562b99740?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBjYW1wYWlnbiUyMG1hdGVyaWFscyUyMGJyYW5kaW5nfGVufDF8fHx8MTc3MzY0NTQyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Image,
  },
  {
    id: '10',
    title: 'Presentation Cover Template',
    description: '1920x1080 deck cover with tagline "AI Thinks in Context — and Waits for Approval"',
    category: 'events',
    format: 'PPTX / Keynote',
    status: 'ready',
    lastUpdated: 'Mar 4, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1765438864799-6e620d420a6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxlcyUyMHByZXNlbnRhdGlvbiUyMGJ1c2luZXNzJTIwcGl0Y2h8ZW58MXx8fHwxNzczNjQ1NDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Presentation,
  },
  {
    id: '11',
    title: 'Event Banner Set',
    description: 'Trade show booth graphics, banners, and signage templates',
    category: 'events',
    format: 'AI / PDF',
    status: 'draft',
    lastUpdated: 'Mar 2, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1773405286291-d470befc09d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkZSUyMHNob3clMjBib290aCUyMGV4aGliaXRpb258ZW58MXx8fHwxNzczNTcxOTk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Megaphone,
  },
  {
    id: '12',
    title: 'Ad Creative Templates',
    description: 'Google Display, Facebook, and LinkedIn ad templates in all standard sizes',
    category: 'web',
    format: 'Figma / PNG',
    status: 'in-review',
    lastUpdated: 'Feb 28, 2026',
    thumbnail: 'https://images.unsplash.com/photo-1769596722541-40dedee6789d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZyUyMHRlbXBsYXRlfGVufDF8fHx8MTc3MzYxMjIwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    icon: Globe,
  },
];

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'social', label: 'Social' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'print', label: 'Print' },
  { value: 'web', label: 'Web / Digital' },
  { value: 'events', label: 'Events' },
];

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  ready: { bg: 'bg-brand-success/10', text: 'text-brand-success', dot: 'bg-brand-success' },
  draft: { bg: 'bg-brand-gray-100', text: 'text-brand-gray-600', dot: 'bg-brand-gray-400' },
  'in-review': { bg: 'bg-brand-warning/10', text: 'text-brand-warning', dot: 'bg-brand-warning' },
};

export function MarketingPage() {
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

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: '#1B2544' }}>Marketing Deliverables</h2>
          <p className="mt-1" style={{ color: '#7B8AAD' }}>
            Social templates, LinkedIn assets, WhatsApp catalog, print collateral, and digital campaigns
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm" style={{ color: '#9BA8C2' }}>
          <span>{filtered.length} deliverables</span>
        </div>
      </div>

      {/* Social Content Rotation */}
      <div className="rounded-xl p-6" style={{ background: 'linear-gradient(135deg, rgba(65,84,163,0.05), rgba(235,67,121,0.05))', border: '1px solid rgba(65,84,163,0.1)' }}>
        <div className="flex items-center gap-2 mb-3">
          <RotateCw className="w-4 h-4" style={{ color: '#4154A3' }} />
          <p className="text-sm font-semibold" style={{ color: '#1B2544' }}>Social Content Rotation System</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            'The Knowledge Workspace empowered by AI and the Spine',
            'AI Thinks in Context — and Waits for Approval',
            'Bring Work, Knowledge, and Decisions Together',
            'The Spine is the Unified Intelligence Layer',
            'Human Approvals Stay in Control',
          ].map((line, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-sm" style={{ color: '#475578' }}>
              <span className="w-5 h-5 rounded-full text-[10px] font-semibold flex items-center justify-center shrink-0" style={{ background: 'rgba(65,84,163,0.08)', color: '#4154A3' }}>{i + 1}</span>
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* LinkedIn Org Page Info */}
      <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #D5DAE5' }}>
        <div className="flex items-center gap-2 mb-3">
          <Linkedin className="w-4 h-4" style={{ color: '#0A66C2' }} />
          <p className="text-sm font-semibold" style={{ color: '#1B2544' }}>LinkedIn Organization Page</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <p className="text-[11px] mb-1" style={{ color: '#9BA8C2' }}>PAGE TAGLINE</p>
            <p className="text-sm" style={{ color: '#2F3D5E' }}>The Knowledge Workspace empowered by AI and the Spine</p>
          </div>
          <div>
            <p className="text-[11px] mb-1" style={{ color: '#9BA8C2' }}>SPECIALTIES</p>
            <div className="flex flex-wrap gap-1.5">
              {['AI Workspace', 'Knowledge Workspace', 'Enterprise AI', 'Context-Aware AI', 'Human-Governed AI', 'Workflow Automation'].map((s) => (
                <span key={s} className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(65,84,163,0.08)', color: '#4154A3' }}>{s}</span>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <p className="text-[11px] mb-1" style={{ color: '#9BA8C2' }}>ABOUT SECTION</p>
            <p className="text-sm leading-relaxed" style={{ color: '#475578' }}>
              IntegrateWise is a knowledge workspace powered by the Spine — a unified intelligence
              layer that connects tools, context, and decisions. By organizing operational truth
              into the Spine, AI can reason across systems, propose actions, and continuously
              learn while ensuring that every action waits for human approval.
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp Catalog Preview */}
      <WhatsAppBusinessCatalog />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9BA8C2' }} />
          <input
            type="text"
            placeholder="Search deliverables..."
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
                  ? { border: '1px solid #4154A3', background: 'rgba(65,84,163,0.08)', color: '#4154A3' }
                  : { border: '1px solid #D5DAE5', background: 'white', color: '#5F6E93' }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded-lg p-1 bg-white self-start" style={{ border: '1px solid #D5DAE5' }}>
          <button onClick={() => setViewMode('grid')} className="p-1.5 rounded" style={viewMode === 'grid' ? { background: '#F0F2F7' } : undefined}>
            <LayoutGrid className="w-4 h-4" style={{ color: '#5F6E93' }} />
          </button>
          <button onClick={() => setViewMode('list')} className="p-1.5 rounded" style={viewMode === 'list' ? { background: '#F0F2F7' } : undefined}>
            <List className="w-4 h-4" style={{ color: '#5F6E93' }} />
          </button>
        </div>
      </div>

      {/* Deliverables */}
      {viewMode === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <DeliverableCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl divide-y" style={{ border: '1px solid #D5DAE5' }}>
          {filtered.map((item) => (
            <DeliverableRow key={item.id} item={item} />
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p style={{ color: '#7B8AAD' }}>No deliverables found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

function DeliverableCard({ item }: { item: Deliverable }) {
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
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(65,84,163,0.08)' }}>
            <item.icon className="w-4 h-4" style={{ color: '#4154A3' }} />
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

function DeliverableRow({ item }: { item: Deliverable }) {
  const status = statusColors[item.status];
  return (
    <div className="flex items-center gap-4 px-6 py-4 hover:bg-[#F0F2F7] transition-colors" style={{ borderBottom: '1px solid #E8ECF2' }}>
      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(65,84,163,0.08)' }}>
        <item.icon className="w-5 h-5" style={{ color: '#4154A3' }} />
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

function WhatsAppBusinessCatalog() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    copyToClipboard(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const catalogItems = [
    {
      id: 'platform',
      name: 'IntegrateWise Platform',
      tagline: 'A Knowledge Workspace empowered by AI and the Spine.',
      description: 'IntegrateWise is a Knowledge Workspace that connects your tools, documents, conversations, and decisions through the Spine — a unified intelligence layer. AI reasons across your entire operational context and proposes actions, while humans stay in control of every approval.',
      price: 'Starting at $499/mo',
      category: 'SaaS Platform',
      icon: Layers,
      link: 'https://integratewise.ai/platform',
    },
    {
      id: 'spine',
      name: 'Adaptive Spine',
      tagline: 'The unified intelligence layer connecting tools, context, knowledge, and decisions.',
      description: 'The Spine is IntegrateWise\'s core architecture — it adapts to your organization\'s unique structure, learns from interactions, and maintains a living map of operational truth. It connects every tool, document, and conversation into a single intelligence layer.',
      price: 'Included with Platform',
      category: 'Core Technology',
      icon: Zap,
      link: 'https://integratewise.ai/spine',
    },
    {
      id: 'ai',
      name: 'Context-Aware AI',
      tagline: 'AI that understands context across systems and proposes intelligent actions.',
      description: 'Unlike generic AI, IntegrateWise AI thinks in context. It understands relationships between documents, conversations, and decisions across your entire workspace. It proposes actions based on deep contextual understanding — never hallucinating, always grounded in your operational reality.',
      price: 'Included with Platform',
      category: 'AI Intelligence',
      icon: Brain,
      link: 'https://integratewise.ai/ai',
    },
    {
      id: 'approvals',
      name: 'Approval-Driven Workflows',
      tagline: 'Actions proposed by AI, executed only after human approval.',
      description: 'Every action AI proposes goes through a human approval workflow. Whether it\'s sending an email, updating a document, or triggering an integration — nothing happens without explicit consent. This is Human-Governed AI: intelligent automation with accountability.',
      price: 'Included with Platform',
      category: 'Governance',
      icon: Shield,
      link: 'https://integratewise.ai/approvals',
    },
    {
      id: 'workspace',
      name: 'Enterprise Knowledge Workspace',
      tagline: 'Bring tools, documents, conversations, and operational truth into one workspace.',
      description: 'Consolidate your entire operational landscape into a single workspace. Connect Slack, Jira, Notion, Google Drive, CRMs, and more. The workspace becomes the single source of truth where your team collaborates, AI assists, and decisions are tracked with full audit trails.',
      price: 'Custom Enterprise Pricing',
      category: 'Enterprise',
      icon: ShoppingBag,
      link: 'https://integratewise.ai/enterprise',
    },
  ];

  const messageTemplates = [
    {
      id: 'welcome',
      name: 'Welcome Message',
      text: '👋 Welcome to IntegrateWise!\n\nThe Knowledge Workspace empowered by AI and the Spine — connecting your tools, context, and decisions in one place.\n\nHow can we help you today?\n\n🔹 Learn about our Platform\n🔹 Book a Demo\n🔹 Talk to Sales',
    },
    {
      id: 'demo',
      name: 'Book a Demo',
      text: '📅 Ready to see IntegrateWise in action?\n\nWe\'d love to show you how the Spine connects your entire workspace and how AI Thinks in Context — and Waits for Approval.\n\n👉 Book your personalized demo: https://integratewise.ai/demo\n\nOr reply with your preferred time and we\'ll set it up!',
    },
    {
      id: 'followup',
      name: 'Follow-Up',
      text: 'Hi! 👋\n\nThank you for your interest in IntegrateWise. Here\'s a quick summary of what we discussed:\n\n✅ The Spine — unified intelligence across all your tools\n✅ Context-Aware AI — grounded in your operational reality\n✅ Human-Governed Approvals — nothing executes without consent\n\nWould you like to explore a pilot program? Let me know!',
    },
    {
      id: 'pricing',
      name: 'Pricing Inquiry',
      text: '💰 IntegrateWise Pricing\n\n🔹 Starter: $499/mo — Up to 25 users, core integrations\n🔹 Professional: $999/mo — Up to 100 users, advanced AI\n🔹 Enterprise: Custom — Unlimited users, dedicated Spine instance\n\nAll plans include the Adaptive Spine, Context-Aware AI, and Approval Workflows.\n\n👉 See full details: https://integratewise.ai/pricing',
    },
  ];

  const quickReplies = [
    '📅 Book a Demo',
    '💰 See Pricing',
    '🔗 Visit Website',
    '📞 Talk to Sales',
    '📄 Download Brochure',
    '✉️ Email Us',
  ];

  return (
    <div className="space-y-6">
      {/* Main WhatsApp Business Catalog Header */}
      <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #D5DAE5' }}>
        <div className="px-6 py-4 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #075E54, #128C7E)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold">WhatsApp Business Catalog</p>
              <p className="text-white/70 text-xs">5 catalog items · 4 message templates · 6 quick replies</p>
            </div>
          </div>
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/20 text-white">Ready</span>
        </div>

        {/* Business Profile Section */}
        <div className="p-6" style={{ borderBottom: '1px solid #E8ECF2' }}>
          <p className="text-[11px] mb-3 tracking-wide" style={{ color: '#9BA8C2' }}>BUSINESS PROFILE</p>
          <div className="flex items-start gap-4">
            <img src={logoIcon} alt="IntegrateWise" className="h-14 w-auto shrink-0" />
            <div className="flex-1 space-y-2">
              <div>
                <p className="font-semibold" style={{ color: '#1B2544' }}>IntegrateWise LLP</p>
                <p className="text-xs" style={{ color: '#5F6E93' }}>The Knowledge Workspace empowered by AI and the Spine</p>
              </div>
              <div className="flex flex-wrap gap-4 text-xs" style={{ color: '#7B8AAD' }}>
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +91-XXXX-XXXXXX</span>
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> connect@integratewise.co</span>
                <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> integratewise.ai</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Bengaluru, India</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Mon–Fri, 9 AM – 6 PM IST</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#475578' }}>
                IntegrateWise is a knowledge workspace powered by the Spine — a unified intelligence layer. 
                AI Thinks in Context — and Waits for Approval.
              </p>
            </div>
          </div>
        </div>

        {/* Catalog Items */}
        <div className="p-6" style={{ borderBottom: '1px solid #E8ECF2' }}>
          <p className="text-[11px] mb-4 tracking-wide" style={{ color: '#9BA8C2' }}>CATALOG ITEMS (5)</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {catalogItems.map((item) => (
              <div key={item.id} className="rounded-lg overflow-hidden group" style={{ border: '1px solid #E8ECF2' }}>
                {/* Item header with icon */}
                <div className="p-4 flex items-start gap-3" style={{ background: '#F8FAFC' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(7,94,84,0.08)' }}>
                    <item.icon className="w-5 h-5" style={{ color: '#075E54' }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: '#1B2544' }}>{item.name}</p>
                    <p className="text-[11px]" style={{ color: '#128C7E' }}>{item.category}</p>
                  </div>
                </div>
                {/* Item body */}
                <div className="p-4 space-y-2">
                  <p className="text-xs font-medium" style={{ color: '#2F3D5E' }}>{item.tagline}</p>
                  <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: '#7B8AAD' }}>{item.description}</p>
                  <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid #E8ECF2' }}>
                    <span className="text-xs font-semibold" style={{ color: '#075E54' }}>{item.price}</span>
                    <button
                      onClick={() => handleCopy(item.id, `${item.name}\n${item.tagline}\n\n${item.description}\n\nPrice: ${item.price}\n${item.link}`)}
                      className="p-1.5 rounded-md hover:bg-[#F0F2F7] transition-colors"
                      title="Copy catalog text"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-brand-success" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" style={{ color: '#9BA8C2' }} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Templates */}
        <div className="p-6" style={{ borderBottom: '1px solid #E8ECF2' }}>
          <p className="text-[11px] mb-4 tracking-wide" style={{ color: '#9BA8C2' }}>MESSAGE TEMPLATES (4)</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {messageTemplates.map((tpl) => (
              <div key={tpl.id} className="rounded-lg p-4" style={{ background: '#F0F2F7', border: '1px solid #E8ECF2' }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium" style={{ color: '#1B2544' }}>{tpl.name}</p>
                  <button
                    onClick={() => handleCopy(`tpl-${tpl.id}`, tpl.text)}
                    className="p-1.5 rounded-md hover:bg-white transition-colors"
                    title="Copy message text"
                  >
                    {copiedId === `tpl-${tpl.id}` ? (
                      <Check className="w-3.5 h-3.5 text-brand-success" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" style={{ color: '#9BA8C2' }} />
                    )}
                  </button>
                </div>
                {/* WhatsApp-style chat bubble */}
                <div className="rounded-lg p-3 bg-white shadow-sm" style={{ borderLeft: '3px solid #25D366' }}>
                  <p className="text-[11px] leading-relaxed whitespace-pre-line" style={{ color: '#475578' }}>
                    {tpl.text.length > 180 ? tpl.text.slice(0, 180) + '…' : tpl.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Replies */}
        <div className="p-6" style={{ borderBottom: '1px solid #E8ECF2' }}>
          <p className="text-[11px] mb-3 tracking-wide" style={{ color: '#9BA8C2' }}>QUICK REPLY BUTTONS (6)</p>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => handleCopy(`qr-${reply}`, reply)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium bg-white transition-colors hover:bg-[#F0F2F7]"
                style={{ border: '1px solid #D5DAE5', color: '#2F3D5E' }}
              >
                {reply}
                {copiedId === `qr-${reply}` ? (
                  <Check className="w-3 h-3 text-brand-success" />
                ) : (
                  <Copy className="w-3 h-3" style={{ color: '#BCC3D4' }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* WhatsApp Business API Config */}
        <div className="p-6">
          <p className="text-[11px] mb-3 tracking-wide" style={{ color: '#9BA8C2' }}>API CONFIGURATION</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Business Account ID', value: 'IW-WABA-2026-XXX', copyable: true },
              { label: 'Display Name', value: 'IntegrateWise', copyable: true },
              { label: 'Verified Status', value: '✅ Green Badge Verified', copyable: false },
              { label: 'Catalog ID', value: 'CAT-IW-001', copyable: true },
              { label: 'Default Language', value: 'English (en)', copyable: false },
              { label: 'Webhook URL', value: 'https://api.integratewise.ai/wa/hook', copyable: true },
            ].map((cfg) => (
              <div key={cfg.label} className="flex items-start justify-between gap-2 p-3 rounded-lg" style={{ background: '#F8FAFC', border: '1px solid #E8ECF2' }}>
                <div className="min-w-0">
                  <p className="text-[10px]" style={{ color: '#9BA8C2' }}>{cfg.label}</p>
                  <p className="text-xs font-medium truncate mt-0.5" style={{ color: '#2F3D5E' }}>{cfg.value}</p>
                </div>
                {cfg.copyable && (
                  <button
                    onClick={() => handleCopy(`cfg-${cfg.label}`, cfg.value)}
                    className="p-1 rounded hover:bg-white transition-colors shrink-0"
                  >
                    {copiedId === `cfg-${cfg.label}` ? (
                      <Check className="w-3 h-3 text-brand-success" />
                    ) : (
                      <Copy className="w-3 h-3" style={{ color: '#BCC3D4' }} />
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}