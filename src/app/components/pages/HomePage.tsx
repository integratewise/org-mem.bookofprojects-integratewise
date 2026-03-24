import { useNavigate } from 'react-router';
import Image1Vectorized from '../../../imports/Image1Vectorized';
import {
  Palette,
  SwatchBook,
  Megaphone,
  HandCoins,
  Stamp,
  ArrowRight,
  Download,
  FileText,
  LayoutTemplate,
  Quote,
  Shield,
  Zap,
  Layers,
  GitBranch,
  Linkedin,
  Mail,
  Image,
  Type,
  Copy,
  Check,
  Package,
  Users,
  Building2,
} from 'lucide-react';
import { useState } from 'react';
import { copyToClipboard } from '../../utils/clipboard';
import { ValuePropDiagram } from '../diagrams/ArchitectureDiagrams';

const sections = [
  {
    to: '/company',
    icon: Building2,
    title: 'Company & Product',
    description: 'Company introduction, vision, mission, belief system, business model, and GTM strategy',
    count: 8,
    label: 'sections',
    color: '#4356A9',
  },
  {
    to: '/architecture',
    icon: GitBranch,
    title: 'Executive Architecture',
    description: 'L0/L1/L2/L3 layers, Spine, data flows, pipeline, and core architectural rules',
    count: 12,
    label: 'sections',
    color: '#636A82',
  },
  {
    to: '/brand-assets',
    icon: Palette,
    title: 'Brand Assets',
    description: 'Logo system, brand messaging, taglines, and visual identity guidelines',
    count: 5,
    label: 'assets',
    color: '#4356A9',
  },
  {
    to: '/design-tokens',
    icon: SwatchBook,
    title: 'Design Tokens',
    description: 'Colors, typography, spacing, and component foundations',
    count: 8,
    label: 'token groups',
    color: '#55608C',
  },
  {
    to: '/stationery',
    icon: Stamp,
    title: 'Stationery',
    description: 'Letterhead, invoice, proposal, seal, business card, email signature',
    count: 8,
    label: 'templates',
    color: '#232D42',
  },
  {
    to: '/marketing',
    icon: Megaphone,
    title: 'Marketing',
    description: 'Social templates, LinkedIn assets, WhatsApp catalog, marketing one-pagers',
    count: 14,
    label: 'deliverables',
    color: '#EB4F72',
  },
  {
    to: '/sales',
    icon: HandCoins,
    title: 'Sales',
    description: 'Pitch decks, one-pagers, case studies, battlecards, and proposals',
    count: 10,
    label: 'deliverables',
    color: '#D9637F',
  },
  {
    to: '/documentation',
    icon: FileText,
    title: 'Documentation',
    description: '6 master packs: Company, Category, Product, Architecture, Governance, GTM',
    count: 45,
    label: 'documents',
    color: '#636A82',
  },
];

const quickStats = [
  { icon: Download, label: 'Total Assets', value: '45+' },
  { icon: FileText, label: 'Templates', value: '26' },
  { icon: LayoutTemplate, label: 'Categories', value: '5' },
];

const productArchitecture = [
  {
    icon: GitBranch,
    title: 'The Spine (SSOT)',
    description: 'Single Source of Truth — the unified intelligence layer connecting tools, context, and decisions across the workspace.',
    color: '#4356A9',
  },
  {
    icon: Zap,
    title: 'AI Context Engine',
    description: 'AI operates on top of the Spine context — thinking, proposing, and learning while every action remains under human approval.',
    color: '#55608C',
  },
  {
    icon: Shield,
    title: 'Approval Governance',
    description: 'Every AI-initiated action passes through human-controlled checkpoints. Nothing executes without explicit approval.',
    color: '#232D42',
  },
  {
    icon: Layers,
    title: 'Workspace Layers',
    description: 'Structured layers for knowledge management, task orchestration, and cross-tool integration within a single platform.',
    color: '#636A82',
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const quickCopy = (id: string, text: string) => {
    copyToClipboard(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
      {/* Hero banner */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ background: '#232D42' }}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-120px] right-[-60px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(67,86,169,0.3) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[-80px] left-[-40px] w-[300px] h-[300px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(235,79,114,0.15) 0%, transparent 70%)' }} />
          {/* Spine node decorative line */}
          <svg className="absolute right-8 top-8 opacity-10" width="200" height="200" viewBox="0 0 200 200" fill="none">
            <circle cx="30" cy="30" r="8" fill="#4356A9" />
            <circle cx="100" cy="80" r="12" fill="#4356A9" />
            <circle cx="170" cy="50" r="6" fill="#EB4F72" />
            <circle cx="140" cy="150" r="10" fill="#4356A9" />
            <line x1="30" y1="30" x2="100" y2="80" stroke="#4356A9" strokeWidth="2" />
            <line x1="100" y1="80" x2="170" y2="50" stroke="#4356A9" strokeWidth="2" />
            <line x1="100" y1="80" x2="140" y2="150" stroke="#4356A9" strokeWidth="2" />
          </svg>
        </div>
        <div className="relative z-10 p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(67,86,169,0.4)' }}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">IntegrateWise</p>
              <p className="text-xs" style={{ color: '#808CA9' }}>Enterprise Brand Store</p>
            </div>
          </div>
          <div className="max-w-2xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-white">
              Brand Identity & Asset Repository
            </h2>
            <p className="mt-3" style={{ color: '#A4A9BE' }}>
              Your centralized hub for brand assets, corporate stationery, marketing
              collateral, and sales enablement materials. Everything to represent
              IntegrateWise consistently across legal, finance, product, and marketing.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-8">
            {quickStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-lg px-5 py-3"
                style={{ background: 'rgba(67,86,169,0.25)', border: '1px solid rgba(67,86,169,0.35)' }}
              >
                <stat.icon className="w-5 h-5" style={{ color: '#808CA9' }} />
                <div>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs" style={{ color: '#808CA9' }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Value Proposition Diagram */}
      <div className="bg-white rounded-2xl border border-[#E8ECF2] p-6">
        <div className="flex items-center gap-3 mb-4">
          <Layers className="w-5 h-5 text-[#4154A3]" />
          <h3 className="text-lg font-semibold" style={{ color: '#1B2544' }}>Core Value Propositions</h3>
        </div>
        <ValuePropDiagram />
      </div>

      {/* Daily Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5" style={{ color: '#EB4379' }} />
            <h3 className="text-lg font-semibold" style={{ color: '#1B2544' }}>Daily Quick Actions</h3>
          </div>
          <button
            onClick={() => navigate('/generators')}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
            style={{ color: '#4154A3', background: 'rgba(65,84,163,0.08)' }}
          >
            All Generators <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        {/* Campaign Kit highlight */}
        <button
          onClick={() => navigate('/generators')}
          className="w-full mb-4 group relative overflow-hidden rounded-xl p-5 text-left hover:shadow-lg transition-all"
          style={{ background: 'linear-gradient(135deg, #4154A3, #EB4379)', border: 'none' }}
        >
          <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] rounded-full bg-white/10" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/15 backdrop-blur-sm shrink-0">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-white">Generate Full Campaign Kit</p>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/25 text-white">ONE CLICK</span>
              </div>
              <p className="text-xs text-white/70 mt-0.5">LinkedIn banners + social posts + team signatures + contact blocks + copy library in one ZIP</p>
            </div>
            <ArrowRight className="w-5 h-5 text-white/60 group-hover:translate-x-1 transition-transform ml-auto shrink-0" />
          </div>
        </button>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Linkedin, label: 'LinkedIn Banners', desc: 'Batch export all 4 styles', to: '/generators', color: '#0A66C2' },
            { icon: Users, label: 'Team & Signatures', desc: 'Manage roster, copy HTML', to: '/generators', color: '#364789' },
            { icon: Image, label: 'Social Posts', desc: 'Editable, all platforms', to: '/generators', color: '#EB4379' },
            { icon: Type, label: 'Copy Library', desc: 'One-click copy all', to: '/generators', color: '#6B7DC4' },
          ].map(action => (
            <button
              key={action.label}
              onClick={() => navigate(action.to)}
              className="group flex items-center gap-3 bg-white rounded-xl px-5 py-4 text-left hover:shadow-md transition-all"
              style={{ border: '1px solid #D5DAE5' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
                style={{ background: `${action.color}12` }}>
                <action.icon className="w-5 h-5" style={{ color: action.color }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: '#1B2544' }}>{action.label}</p>
                <p className="text-[11px]" style={{ color: '#9BA8C2' }}>{action.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* One-Click Copy Bar */}
      <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #D5DAE5' }}>
        <p className="text-xs font-semibold mb-3" style={{ color: '#475578' }}>One-Click Copy</p>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'qc1', label: 'Tagline', text: 'AI Thinks in Context �� and Waits for Approval' },
            { id: 'qc2', label: 'Descriptor', text: 'Knowledge Workspace over the Spine, empowered by AI and governed by approvals' },
            { id: 'qc3', label: 'Short', text: 'Knowledge Workspace over the Spine Intelligence and Empowered by AI' },
            { id: 'qc4', label: 'Website', text: 'integratewise.ai' },
            { id: 'qc5', label: 'Email', text: 'connect@integratewise.ai' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => quickCopy(item.id, item.text)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all"
              style={{
                background: copiedId === item.id ? '#10B981' : '#F0F2F7',
                color: copiedId === item.id ? '#fff' : '#475578',
              }}
            >
              {copiedId === item.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" style={{ color: '#9BA8C2' }} />}
              {copiedId === item.id ? 'Copied!' : item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Two-column layout: Brand Identity + Product Architecture */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Brand Identity System */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-1 w-10 rounded-full" style={{ background: '#4356A9' }} />
            <h3 className="text-lg font-semibold" style={{ color: '#232D42' }}>Brand Identity System</h3>
          </div>

          {/* Figma Vectorized Logo Preview */}
          <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #E5E8F4' }}>
            <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #E5E8F4' }}>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#232D42' }}>Master Logo Composition</p>
                <p className="text-xs" style={{ color: '#808CA9' }}>Vectorized brand identity asset</p>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full font-medium" style={{ background: 'rgba(67,86,169,0.08)', color: '#4356A9' }}>
                Figma Source
              </span>
            </div>
            <div className="relative w-full" style={{ aspectRatio: '1344/768' }}>
              <Image1Vectorized />
            </div>
          </div>

          {/* Brand Positioning */}
          <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #E5E8F4' }}>
            <div className="flex items-center gap-2 mb-4">
              <Quote className="w-4 h-4" style={{ color: '#4356A9' }} />
              <p className="text-sm font-semibold" style={{ color: '#232D42' }}>Brand Positioning</p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] tracking-widest mb-1" style={{ color: '#808CA9' }}>CANONICAL STATEMENT</p>
                <p className="text-sm font-medium" style={{ color: '#333944' }}>Knowledge Workspace over the Spine, empowered by AI and governed by approvals</p>
              </div>
              <div>
                <p className="text-[10px] tracking-widest mb-1" style={{ color: '#808CA9' }}>PRIMARY TAGLINE</p>
                <p className="text-sm font-medium" style={{ color: '#333944' }}>AI Thinks in Context — and Waits for Approval</p>
              </div>
              <div>
                <p className="text-[10px] tracking-widest mb-1" style={{ color: '#808CA9' }}>SHORT VERSION</p>
                <p className="text-sm font-medium" style={{ color: '#333944' }}>Context-Aware AI. Approval-Controlled Work.</p>
              </div>
              <div>
                <p className="text-[10px] tracking-widest mb-1" style={{ color: '#808CA9' }}>FOOTER LINE</p>
                <p className="text-sm font-medium" style={{ color: '#333944' }}>IntegrateWise LLP · Bengaluru, India · AI Thinks in Context. Actions Wait for Humans.</p>
              </div>
            </div>
          </div>

          {/* Color Palette Quick View */}
          <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #E5E8F4' }}>
            <p className="text-sm font-semibold mb-4" style={{ color: '#232D42' }}>Enterprise Color Palette</p>
            <div className="grid grid-cols-5 gap-3">
              {[
                { name: 'Primary Blue', color: '#4356A9' },
                { name: 'Dark Navy', color: '#232D42' },
                { name: 'Accent Pink', color: '#EB4F72' },
                { name: 'Blue Grey', color: '#636A82' },
                { name: 'Soft Grey', color: '#EDEEF0' },
              ].map((c) => (
                <div key={c.name} className="flex flex-col gap-2">
                  <div className="h-14 rounded-lg" style={{ background: c.color, border: c.color === '#EDEEF0' ? '1px solid #E5E8F4' : undefined }} />
                  <div>
                    <p className="text-[10px] font-medium" style={{ color: '#333944' }}>{c.name}</p>
                    <p className="text-[10px] font-mono" style={{ color: '#808CA9' }}>{c.color}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Architecture System */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-1 w-10 rounded-full" style={{ background: '#EB4F72' }} />
            <h3 className="text-lg font-semibold" style={{ color: '#232D42' }}>Product Architecture System</h3>
          </div>

          {productArchitecture.map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-6" style={{ border: '1px solid #E5E8F4' }}>
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${item.color}10` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold" style={{ color: '#232D42' }}>{item.title}</h4>
                  <p className="text-sm mt-1.5 leading-relaxed" style={{ color: '#636A82' }}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Product Essence */}
          <div className="rounded-xl p-6" style={{ background: 'linear-gradient(135deg, rgba(67,86,169,0.06), rgba(235,79,114,0.06))', border: '1px solid rgba(67,86,169,0.12)' }}>
            <p className="text-[10px] tracking-widest mb-2" style={{ color: '#808CA9' }}>PRODUCT ESSENCE</p>
            <p className="text-sm leading-relaxed" style={{ color: '#333944' }}>
              IntegrateWise is a knowledge workspace where the Spine becomes the single source
              of truth and AI operates on top of that context — thinking, proposing, and
              learning while every action remains under human approval.
            </p>
          </div>
        </div>
      </div>

      {/* Section cards */}
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#232D42' }}>Browse Categories</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <button
              key={section.to}
              onClick={() => navigate(section.to)}
              className="group bg-white rounded-xl p-6 text-left hover:shadow-lg transition-all"
              style={{ border: '1px solid #E5E8F4' }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ background: `${section.color}10` }}
                >
                  <section.icon className="w-6 h-6" style={{ color: section.color }} />
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-all" style={{ color: '#A4A9BE' }} />
              </div>
              <h4 className="text-base font-semibold mt-4" style={{ color: '#232D42' }}>{section.title}</h4>
              <p className="text-sm mt-1" style={{ color: '#808CA9' }}>{section.description}</p>
              <div className="mt-4 flex items-center gap-2">
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background: `${section.color}10`, color: section.color }}
                >
                  {section.count} {section.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Contact System */}
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#232D42' }}>Official Contact System</h3>
        <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #E5E8F4' }}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { dept: 'General', emails: ['hello@integratewise.ai', 'connect@integratewise.ai'] },
              { dept: 'Sales', emails: ['sales@integratewise.ai'] },
              { dept: 'Support', emails: ['support@integratewise.ai'] },
              { dept: 'Billing', emails: ['billing@integratewise.ai'] },
            ].map((contact) => (
              <div key={contact.dept}>
                <p className="text-xs font-semibold mb-2" style={{ color: '#333944' }}>{contact.dept}</p>
                {contact.emails.map((email) => (
                  <p key={email} className="text-xs font-mono" style={{ color: '#808CA9' }}>{email}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 flex flex-wrap gap-6" style={{ borderTop: '1px solid #E5E8F4' }}>
            {[
              { dept: 'Marketing', email: 'marketing@integratewise.ai' },
              { dept: 'Careers', email: 'careers@integratewise.ai' },
              { dept: 'Security', email: 'security@integratewise.ai' },
              { dept: 'Website', email: 'integratewise.ai' },
            ].map((c) => (
              <div key={c.dept}>
                <p className="text-xs font-semibold" style={{ color: '#333944' }}>{c.dept}</p>
                <p className="text-xs font-mono" style={{ color: '#808CA9' }}>{c.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent updates */}
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#232D42' }}>Recent Updates</h3>
        <div className="bg-white rounded-xl" style={{ border: '1px solid #E5E8F4' }}>
          {[
            { title: 'Logo Mark v2 Updated', category: 'Brand Assets', date: 'Mar 14, 2026', color: '#4356A9' },
            { title: 'Corporate Stationery Suite Published', category: 'Stationery', date: 'Mar 13, 2026', color: '#232D42' },
            { title: 'Q1 Sales Deck Published', category: 'Sales', date: 'Mar 12, 2026', color: '#D9637F' },
            { title: 'LinkedIn & WhatsApp Assets Added', category: 'Marketing', date: 'Mar 10, 2026', color: '#EB4F72' },
            { title: 'Design Tokens v1.0 Finalized', category: 'Design Tokens', date: 'Mar 8, 2026', color: '#55608C' },
          ].map((update, i, arr) => (
            <div
              key={i}
              className="flex items-center gap-4 px-6 py-4"
              style={i < arr.length - 1 ? { borderBottom: '1px solid #E5E8F4' } : undefined}
            >
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: update.color }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: '#333944' }}>{update.title}</p>
                <p className="text-xs" style={{ color: '#A4A9BE' }}>{update.category}</p>
              </div>
              <span className="text-xs shrink-0" style={{ color: '#A4A9BE' }}>{update.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}