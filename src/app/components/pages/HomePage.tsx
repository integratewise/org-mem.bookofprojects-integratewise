import { useNavigate } from 'react-router';
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
  Database,
} from 'lucide-react';
import { useState } from 'react';
import { copyToClipboard } from '../../utils/clipboard';
import { ValuePropDiagram } from '../diagrams/ArchitectureDiagrams';
import { IntegrateWiseLogo } from '../IntegrateWiseLogo';
import { TAGLINES, BRAND, CONTACT, FOOTER_LINE } from '../../lib/brand';
import {
  APPROVED_KNOWLEDGE_DOMAINS,
  KNOWLEDGE_STATES,
  CANONICAL_DOMAIN_STATE_CONTAINERS,
  buildKnowledgePath,
} from '../../lib/knowledgeRuntime';

const sections = [
  {
    to: '/company',
    icon: Building2,
    title: 'Doctrine & Product',
    description: 'Continuity doctrine, company narrative, mission, and whole-system operating model',
    count: 8,
    label: 'sections',
    color: 'var(--forest)',
  },
  {
    to: '/architecture',
    icon: GitBranch,
    title: 'Adaptive Architecture',
    description: 'Adaptive Spine, hydration flows, continuity pipeline, and execution architecture',
    count: 12,
    label: 'sections',
    color: 'var(--slate)',
  },
  {
    to: '/brand-assets',
    icon: Palette,
    title: 'Brand Assets',
    description: 'Logo system, brand messaging, taglines, and visual identity guidelines',
    count: 5,
    label: 'assets',
    color: 'var(--forest)',
  },
  {
    to: '/design-tokens',
    icon: SwatchBook,
    title: 'Design Tokens',
    description: 'Forest + Paper tokens, typography, spacing, and component foundations',
    count: 8,
    label: 'token groups',
    color: 'var(--gold-light)',
  },
  {
    to: '/stationery',
    icon: Stamp,
    title: 'Stationery',
    description: 'Letterhead, invoice, proposal, seal, business card, email signature',
    count: 8,
    label: 'templates',
    color: 'var(--forest-mid)',
  },
  {
    to: '/marketing',
    icon: Megaphone,
    title: 'Marketing',
    description: 'Social templates, LinkedIn assets, WhatsApp catalog, marketing one-pagers',
    count: 14,
    label: 'deliverables',
    color: 'var(--gold)',
  },
  {
    to: '/sales',
    icon: HandCoins,
    title: 'Sales',
    description: 'Pitch decks, one-pagers, case studies, battlecards, and proposals',
    count: 10,
    label: 'deliverables',
    color: 'var(--red)',
  },
  {
    to: '/documentation',
    icon: FileText,
    title: 'Documentation',
    description: '6 doctrine packs: continuity, category, product, architecture, governance, and GTM',
    count: 40,
    label: 'documents',
    color: 'var(--slate)',
  },
];

const quickStats = [
  { icon: Download, label: 'Core Docs', value: '40' },
  { icon: FileText, label: 'Templates', value: '26' },
  { icon: LayoutTemplate, label: 'Categories', value: '5' },
];

const productArchitecture = [
  {
    icon: GitBranch,
    title: 'Adaptive Spine',
    description: 'Continuity core that hydrates organizational truth, relationships, signals, and decisions.',
    color: 'var(--forest)',
  },
  {
    icon: Zap,
    title: 'AI Context Engine',
    description: 'AI operates on top of the Spine context — thinking, proposing, and learning while every action remains under human approval.',
    color: 'var(--gold-light)',
  },
  {
    icon: Shield,
    title: 'Approval Governance',
    description: 'Every AI-initiated action passes through human-controlled checkpoints. Nothing executes without explicit approval.',
    color: 'var(--forest-mid)',
  },
  {
    icon: Layers,
    title: 'Workspace Projection',
    description: 'Work surfaces continuously adapt to the current continuity topology understood by the Spine.',
    color: 'var(--slate)',
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
        style={{
          background: 'linear-gradient(135deg, var(--paper-warm) 0%, color-mix(in srgb, var(--forest) 8%, transparent) 58%, var(--gold-pale) 100%)',
          border: '1px solid var(--rule-light)',
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-120px] right-[-60px] w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--forest) 14%, transparent) 0%, transparent 72%)' }} />
          <div className="absolute bottom-[-80px] left-[-40px] w-[300px] h-[300px] rounded-full" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--gold) 14%, transparent) 0%, transparent 72%)' }} />
          <svg className="absolute right-8 top-8 opacity-25" width="200" height="200" viewBox="0 0 200 200" fill="none">
            <circle cx="30" cy="30" r="8" fill="var(--forest)" />
            <circle cx="100" cy="80" r="12" fill="var(--forest)" />
            <circle cx="170" cy="50" r="6" fill="var(--gold)" />
            <circle cx="140" cy="150" r="10" fill="var(--forest)" />
            <line x1="30" y1="30" x2="100" y2="80" stroke="var(--gold)" strokeWidth="2" opacity="0.55" />
            <line x1="100" y1="80" x2="170" y2="50" stroke="var(--gold)" strokeWidth="2" opacity="0.55" />
            <line x1="100" y1="80" x2="140" y2="150" stroke="var(--forest)" strokeWidth="2" opacity="0.4" />
          </svg>
        </div>
        <div className="relative z-10 p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}>
              <Shield className="w-5 h-5" style={{ color: 'var(--forest)' }} />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-strong)' }}>IntegrateWise</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Adaptive continuity workspace hydrated by the Spine</p>
            </div>
          </div>
          <div className="max-w-2xl">
            <h2 className="text-2xl lg:text-3xl font-bold" style={{ color: 'var(--text-strong)' }}>
              The system that holds context, governs execution, and never forgets
            </h2>
            <p className="mt-3" style={{ color: 'var(--text-muted)' }}>
              Doctrine, architecture, and execution language stay aligned in one bright system: continuity is the primitive,
              connectors hydrate the Spine, and every workspace stays readable, structured, and human-trustworthy.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-8">
            {quickStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-lg px-5 py-3"
                style={{ background: 'color-mix(in srgb, var(--paper) 84%, transparent)', border: '1px solid var(--rule-light)', boxShadow: 'var(--shadow-sm)' }}
              >
                <stat.icon className="w-5 h-5" style={{ color: 'var(--forest)' }} />
                <div>
                  <p className="text-xl font-bold" style={{ color: 'var(--text-strong)' }}>{stat.value}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Value Proposition Diagram */}
      <div className="rounded-2xl p-6" style={{ background: 'var(--paper)', border: '1px solid var(--rule-light)' }}>
        <div className="flex items-center gap-3 mb-4">
          <Layers className="w-5 h-5" style={{ color: 'var(--forest)' }} />
          <h3 className="text-lg font-semibold" style={{ color: 'var(--ink)' }}>Core Value Propositions</h3>
        </div>
        <ValuePropDiagram />
      </div>

      {/* Canonical Knowledge Runtime Foundation */}
      <div className="bg-white rounded-2xl border border-[#E8ECF2] p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-[#4154A3]" />
          <h3 className="text-lg font-semibold" style={{ color: '#1B2544' }}>
            Canonical Knowledge Runtime Foundation
          </h3>
        </div>
        <p className="text-sm" style={{ color: '#636A82' }}>
          Domain/state foundation used for implementation-neutral runtime mapping:
          <span className="font-mono ml-1">/{'{domain}'}/triage</span>,
          <span className="font-mono ml-1">/{'{domain}'}/knowledge-persisted</span>,
          <span className="font-mono ml-1">/{'{domain}'}/references</span>.
        </p>
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold mb-2" style={{ color: '#333944' }}>Approved Domains</p>
            <div className="flex flex-wrap gap-2">
              {APPROVED_KNOWLEDGE_DOMAINS.map((domain) => (
                <span
                  key={domain}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ background: '#F0F2F7', color: '#475578' }}
                >
                  {domain}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold mb-2" style={{ color: '#333944' }}>Canonical States</p>
            <div className="space-y-1">
              {KNOWLEDGE_STATES.map((state) => (
                <p key={state} className="text-xs font-mono" style={{ color: '#636A82' }}>
                  {buildKnowledgePath('executive', state)}
                </p>
              ))}
            </div>
            <p className="text-[11px] mt-2" style={{ color: '#9BA8C2' }}>
              Seeded containers: {CANONICAL_DOMAIN_STATE_CONTAINERS.length}
            </p>
          </div>
        </div>
      </div>

      {/* Daily Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5" style={{ color: 'var(--gold)' }} />
            <h3 className="text-lg font-semibold" style={{ color: 'var(--ink)' }}>Daily Quick Actions</h3>
          </div>
          <button
            onClick={() => navigate('/generators')}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
            style={{ color: 'var(--forest)', background: 'color-mix(in srgb, var(--forest) 8%, transparent)' }}
          >
            All Generators <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        {/* Campaign Kit highlight */}
        <button
          onClick={() => navigate('/generators')}
          className="w-full mb-4 group relative overflow-hidden rounded-xl p-5 text-left hover:shadow-lg transition-all"
          style={{
            background: 'linear-gradient(135deg, var(--paper-warm) 0%, color-mix(in srgb, var(--forest) 8%, transparent) 62%, var(--gold-pale) 100%)',
            border: '1px solid var(--rule-light)',
          }}
        >
          <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] rounded-full" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--forest) 8%, transparent) 0%, transparent 72%)' }} />
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}>
              <Package className="w-6 h-6" style={{ color: 'var(--forest)' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold" style={{ color: 'var(--text-strong)' }}>Generate Full Campaign Kit</p>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'var(--gold-pale)', color: 'var(--warning-color)' }}>ONE CLICK</span>
              </div>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>LinkedIn banners + social posts + team signatures + contact blocks + copy library in one ZIP</p>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform ml-auto shrink-0" style={{ color: 'var(--forest)' }} />
          </div>
        </button>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Linkedin, label: 'LinkedIn Banners', desc: 'Batch export all 4 styles', to: '/generators', color: 'var(--slate-mid)' },
            { icon: Users, label: 'Team & Signatures', desc: 'Manage roster, copy HTML', to: '/generators', color: 'var(--forest-mid)' },
            { icon: Image, label: 'Social Posts', desc: 'Editable, all platforms', to: '/generators', color: 'var(--gold)' },
            { icon: Type, label: 'Copy Library', desc: 'One-click copy all', to: '/generators', color: 'var(--slate)' },
          ].map(action => (
            <button
              key={action.label}
              onClick={() => navigate(action.to)}
              className="group flex items-center gap-3 rounded-xl px-5 py-4 text-left hover:shadow-md transition-all"
              style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
                style={{ background: `color-mix(in srgb, ${action.color} 12%, transparent)` }}>
                <action.icon className="w-5 h-5" style={{ color: action.color }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{action.label}</p>
                <p className="text-xs" style={{ color: 'var(--slate-mid)' }}>{action.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* One-Click Copy Bar */}
      <div className="rounded-xl p-5" style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}>
        <p className="text-xs font-semibold mb-3" style={{ color: 'var(--forest-mid)' }}>One-Click Copy</p>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'qc1', label: 'Tagline', text: TAGLINES.primary },
            { id: 'qc2', label: 'Descriptor', text: TAGLINES.descriptor },
            { id: 'qc3', label: 'Short', text: TAGLINES.descriptorExtended },
            { id: 'qc4', label: 'Website', text: BRAND.website },
            { id: 'qc5', label: 'Email', text: CONTACT.connect },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => quickCopy(item.id, item.text)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all"
              style={{
                background: copiedId === item.id ? 'var(--forest)' : 'var(--paper-deep)',
                color: copiedId === item.id ? 'var(--text-inverse)' : 'var(--text-muted)',
              }}
            >
              {copiedId === item.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" style={{ color: 'var(--slate-mid)' }} />}
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
            <div className="h-1 w-10 rounded-full" style={{ background: 'var(--forest)' }} />
            <h3 className="text-lg font-semibold" style={{ color: 'var(--ink)' }}>Brand Identity System</h3>
          </div>
          {/* Canonical Logo Preview */}
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--rule-light)', background: 'var(--paper)' }}>
            <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--rule-light)' }}>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>Canonical Mark & Wordmark</p>
                <p className="text-xs" style={{ color: 'var(--slate-mid)' }}>Forest + Paper — the IntegrateWise design language</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: 'color-mix(in srgb, var(--gold) 12%, transparent)', color: 'var(--forest)' }}>
                Current Canonical
              </span>
            </div>
            <div className="px-6 py-10 flex items-center justify-center" style={{ background: 'linear-gradient(180deg, var(--paper) 0%, var(--paper-warm) 100%)' }}>
              <IntegrateWiseLogo variant="compact" />
            </div>
          </div>

          {/* Brand Positioning */}
          <div className="rounded-xl p-6" style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Quote className="w-4 h-4" style={{ color: 'var(--forest)' }} />
              <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>Brand Positioning</p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs tracking-widest mb-1" style={{ color: 'var(--slate-mid)' }}>CANONICAL STATEMENT</p>
                <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{TAGLINES.descriptor}</p>
              </div>
              <div>
                <p className="text-xs tracking-widest mb-1" style={{ color: 'var(--slate-mid)' }}>PRIMARY TAGLINE</p>
                <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{TAGLINES.primary}</p>
              </div>
              <div>
                <p className="text-xs tracking-widest mb-1" style={{ color: 'var(--slate-mid)' }}>SHORT VERSION</p>
                <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>Context-Aware AI. Approval-Controlled Work.</p>
              </div>
              <div>
                <p className="text-xs tracking-widest mb-1" style={{ color: 'var(--slate-mid)' }}>FOOTER LINE</p>
                <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{FOOTER_LINE}</p>
              </div>
            </div>
          </div>

          {/* Color Palette Quick View */}
          <div className="rounded-xl p-6" style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}>
            <p className="text-sm font-semibold mb-4" style={{ color: 'var(--ink)' }}>Forest + Paper Palette</p>
            <div className="grid grid-cols-5 gap-3">
              {[
                { name: 'Paper', color: 'var(--paper)' },
                { name: 'Paper Warm', color: 'var(--paper-warm)' },
                { name: 'Forest', color: 'var(--forest)' },
                { name: 'Gold', color: 'var(--gold)' },
                { name: 'Ink', color: 'var(--ink)' },
              ].map((c) => (
                <div key={c.name} className="flex flex-col gap-2">
                  <div className="h-14 rounded-lg" style={{ background: c.color, border: c.name.startsWith('Paper') ? '1px solid var(--rule-light)' : undefined }} />
                  <div>
                    <p className="text-xs font-medium" style={{ color: 'var(--ink)' }}>{c.name}</p>
                    <p className="text-xs font-mono" style={{ color: 'var(--slate-mid)' }}>{c.color}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Architecture System */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-1 w-10 rounded-full" style={{ background: 'var(--gold)' }} />
            <h3 className="text-lg font-semibold" style={{ color: 'var(--ink)' }}>Product Architecture System</h3>
          </div>

          {productArchitecture.map((item) => (
            <div key={item.title} className="rounded-xl p-6" style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}>
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `color-mix(in srgb, ${item.color} 10%, transparent)` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{item.title}</h4>
                  <p className="text-sm mt-1.5 leading-relaxed" style={{ color: 'var(--slate)' }}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Product Essence */}
          <div className="rounded-xl p-6" style={{ background: 'linear-gradient(135deg, var(--paper-warm) 0%, var(--gold-pale) 100%)', border: '1px solid var(--rule-light)' }}>
            <p className="text-xs tracking-widest mb-2" style={{ color: 'var(--slate-mid)' }}>PRODUCT ESSENCE</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
              IntegrateWise is a continuity workspace where the Adaptive Spine continuously hydrates
              from connected systems and operational behavior, while AI proposes actions with evidence
              and every execution path remains human-approved.
            </p>
          </div>
        </div>
      </div>

      {/* Section cards */}
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--ink)' }}>Browse Categories</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <button
              key={section.to}
              onClick={() => navigate(section.to)}
              className="group rounded-xl p-6 text-left hover:shadow-lg transition-all"
              style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ background: `color-mix(in srgb, ${section.color} 10%, transparent)` }}
                >
                  <section.icon className="w-6 h-6" style={{ color: section.color }} />
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-all" style={{ color: 'var(--slate-mid)' }} />
              </div>
              <h4 className="text-base font-semibold mt-4" style={{ color: 'var(--ink)' }}>{section.title}</h4>
              <p className="text-sm mt-1" style={{ color: 'var(--slate-mid)' }}>{section.description}</p>
              <div className="mt-4 flex items-center gap-2">
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background: `color-mix(in srgb, ${section.color} 10%, transparent)`, color: section.color }}
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
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--ink)' }}>Official Contact System</h3>
        <div className="rounded-xl p-6" style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { dept: 'General', emails: ['hello@integratewise.ai', 'connect@integratewise.ai'] },
              { dept: 'Sales', emails: ['sales@integratewise.ai'] },
              { dept: 'Support', emails: ['support@integratewise.ai'] },
              { dept: 'Billing', emails: ['billing@integratewise.ai'] },
            ].map((contact) => (
              <div key={contact.dept}>
                <p className="text-xs font-semibold mb-2" style={{ color: 'var(--ink)' }}>{contact.dept}</p>
                {contact.emails.map((email) => (
                  <p key={email} className="text-xs font-mono" style={{ color: 'var(--slate-mid)' }}>{email}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 flex flex-wrap gap-6" style={{ borderTop: '1px solid var(--rule-light)' }}>
            {[
              { dept: 'Marketing', email: 'marketing@integratewise.ai' },
              { dept: 'Careers', email: 'careers@integratewise.ai' },
              { dept: 'Security', email: 'security@integratewise.ai' },
              { dept: 'Website', email: 'integratewise.ai' },
            ].map((c) => (
              <div key={c.dept}>
                <p className="text-xs font-semibold" style={{ color: 'var(--ink)' }}>{c.dept}</p>
                <p className="text-xs font-mono" style={{ color: 'var(--slate-mid)' }}>{c.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent updates */}
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--ink)' }}>Recent Updates</h3>
        <div className="rounded-xl" style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}>
          {[
            { title: 'Logo Mark v2 Updated', category: 'Brand Assets', date: 'Mar 14, 2026', color: 'var(--forest)' },
            { title: 'Corporate Stationery Suite Published', category: 'Stationery', date: 'Mar 13, 2026', color: 'var(--forest-mid)' },
            { title: 'Q1 Sales Deck Published', category: 'Sales', date: 'Mar 12, 2026', color: 'var(--red)' },
            { title: 'LinkedIn & WhatsApp Assets Added', category: 'Marketing', date: 'Mar 10, 2026', color: 'var(--gold)' },
            { title: 'Design Tokens v1.0 Finalized', category: 'Design Tokens', date: 'Mar 8, 2026', color: 'var(--slate)' },
          ].map((update, i, arr) => (
            <div
              key={i}
              className="flex items-center gap-4 px-6 py-4"
              style={i < arr.length - 1 ? { borderBottom: '1px solid var(--rule-light)' } : undefined}
            >
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: update.color }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: 'var(--ink)' }}>{update.title}</p>
                <p className="text-xs" style={{ color: 'var(--slate-mid)' }}>{update.category}</p>
              </div>
              <span className="text-xs shrink-0" style={{ color: 'var(--slate-mid)' }}>{update.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}