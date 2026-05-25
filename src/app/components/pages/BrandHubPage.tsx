import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import {
  Palette, SwatchBook, Stamp, Megaphone, Presentation,
  Zap, BookOpen, GitBranch, Image, Target, HandCoins,
  Rocket, Shield, Box, ArrowRight,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────
   BRAND HUB — The canonical entry point for IntegrateWise
   brand documentation, design tokens, and organisational truth.
   ───────────────────────────────────────────────────────────────── */

function Divider() {
  return <div className="border-t my-16" style={{ borderColor: 'var(--rule)' }} />;
}

/* ─── Hero ─────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative px-8 lg:px-16 pt-16 pb-12">
      {/* Subtle gold radial accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 75% 15%, color-mix(in srgb, var(--gold) 6%, transparent) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl"
      >
        <p className="iw-hero-eyebrow mb-6 flex items-center gap-3">
          <span style={{ display: 'inline-block', width: 32, height: 1, background: 'var(--gold)' }} />
          IntegrateWise · Brand System
        </p>

        <h1 className="iw-hero-title mb-8" style={{ color: 'var(--ink)' }}>
          One doctrine.<br />
          <span style={{ color: 'var(--forest)' }}>One design system.</span>
        </h1>

        <p className="iw-body max-w-2xl" style={{ color: 'var(--ink-muted)' }}>
          The canonical source for IntegrateWise brand assets, design tokens,
          documentation packs, and organisational continuity. Every surface,
          every message, every decision flows from here.
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section cards ────────────────────────────────────────────── */
interface HubCardProps {
  icon: React.ElementType;
  label: string;
  title: string;
  description: string;
  to: string;
  color: string;
  delay?: number;
}

function HubCard({ icon: Icon, label, title, description, to, color, delay = 0 }: HubCardProps) {
  const navigate = useNavigate();
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      onClick={() => navigate(to)}
      className="w-full text-left rounded-xl p-6 transition-all hover:-translate-y-0.5 group"
      style={{
        background: 'transparent',
        border: '1px solid var(--rule)',
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: color, color: 'var(--paper)' }}
        >
          <Icon className="w-5 h-5" />
        </div>
        <ArrowRight
          className="w-4 h-4 mt-1 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
          style={{ color: 'var(--ink-ghost)' }}
        />
      </div>
      <p className="iw-label mb-2" style={{ fontSize: 10, letterSpacing: '0.18em' }}>{label}</p>
      <h3 className="iw-s-title mb-2" style={{ fontSize: 18 }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-muted)' }}>{description}</p>
    </motion.button>
  );
}

/* ─── Creative System ──────────────────────────────────────────── */
function CreativeSystem() {
  return (
    <section className="px-8 lg:px-16 py-8 max-w-6xl">
      <p className="iw-label mb-4">02 Marketing & Creative</p>
      <h2 className="iw-doctrine mb-10">
        The <strong>creative system.</strong>
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <HubCard
          icon={Palette}
          label="Brand"
          title="Brand Assets"
          description="Logo system, lockups, clearspace rules, messaging hierarchy, and usage guidelines."
          to="/brand-assets"
          color="var(--forest)"
          delay={0}
        />
        <HubCard
          icon={SwatchBook}
          label="Tokens"
          title="Design Tokens"
          description="Canonical colors, typography, spacing, radii, and shadows. The source of truth for every surface."
          to="/design-tokens"
          color="var(--gold)"
          delay={0.05}
        />
        <HubCard
          icon={Stamp}
          label="Stationery"
          title="Stationery"
          description="Letterhead, business cards, envelopes, and printed matter specifications."
          to="/stationery"
          color="var(--forest-mid)"
          delay={0.1}
        />
        <HubCard
          icon={Megaphone}
          label="Marketing"
          title="Marketing Materials"
          description="Social templates, one-pagers, campaign assets, and channel-specific guidelines."
          to="/marketing"
          color="var(--gold)"
          delay={0.15}
        />
        <HubCard
          icon={Presentation}
          label="Decks"
          title="Presentations"
          description="Slide templates, speaker notes, and presentation guidelines for every audience."
          to="/presentations"
          color="var(--slate)"
          delay={0.2}
        />
        <HubCard
          icon={Zap}
          label="Tools"
          title="Quick Generators"
          description="Batch-export logos, stationery, and social assets in every format and size."
          to="/generators"
          color="var(--gold)"
          delay={0.25}
        />
      </div>
    </section>
  );
}

/* ─── Channel Assets ───────────────────────────────────────────── */
function ChannelAssets() {
  return (
    <section className="px-8 lg:px-16 py-8 max-w-6xl">
      <p className="iw-label mb-4">Channel Guidelines</p>
      <h2 className="iw-doctrine mb-10">
        Assets for <strong>every channel.</strong>
      </h2>

      <div className="grid sm:grid-cols-3 gap-4">
        <HubCard
          icon={Megaphone}
          label="Social"
          title="LinkedIn"
          description="Post templates, banner specs, and brand voice for the professional network."
          to="/linkedin"
          color="var(--slate-mid)"
          delay={0}
        />
        <HubCard
          icon={Megaphone}
          label="Messaging"
          title="WhatsApp"
          description="Status templates, business profile assets, and conversational brand guidelines."
          to="/whatsapp"
          color="var(--forest-bright)"
          delay={0.05}
        />
        <HubCard
          icon={Megaphone}
          label="Email"
          title="Email"
          description="Signature templates, newsletter layouts, and transactional email design."
          to="/email"
          color="var(--slate-mid)"
          delay={0.1}
        />
      </div>
    </section>
  );
}

/* ─── Knowledge Base ───────────────────────────────────────────── */
function KnowledgeBase() {
  return (
    <section className="px-8 lg:px-16 py-8 max-w-6xl">
      <p className="iw-label mb-4">07 Resources & Knowledge Base</p>
      <h2 className="iw-doctrine mb-10">
        Documentation <strong>& continuity.</strong>
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <HubCard
          icon={BookOpen}
          label="Library"
          title="Documentation"
          description="Six doctrine packs. Forty-plus documents. The complete organisational narrative."
          to="/documentation"
          color="var(--forest)"
          delay={0}
        />
        <HubCard
          icon={GitBranch}
          label="Architecture"
          title="Adaptive Spine"
          description="System architecture, hydration flows, entity models, and technical diagrams."
          to="/architecture"
          color="var(--slate)"
          delay={0.05}
        />
        <HubCard
          icon={Rocket}
          label="Start"
          title="Quick Start"
          description="Edit brand content, export assets, and publish documentation in minutes."
          to="/quick-start"
          color="var(--gold)"
          delay={0.1}
        />
        <HubCard
          icon={Image}
          label="Gallery"
          title="Product Gallery"
          description="Campaign imagery, product shots, diagrams, and visual asset library."
          to="/gallery"
          color="var(--slate-mid)"
          delay={0.15}
        />
      </div>
    </section>
  );
}

/* ─── Design Tokens Preview ────────────────────────────────────── */
function TokensPreview() {
  const colors = [
    { name: 'Ink', token: '--ink', bg: '#0C0C0C', fg: '#F4F0E8' },
    { name: 'Paper', token: '--paper', bg: '#F4F0E8', fg: '#0C0C0C' },
    { name: 'Forest', token: '--forest', bg: '#1A3A2A', fg: '#F4F0E8' },
    { name: 'Gold', token: '--gold', bg: '#B8943F', fg: '#0C0C0C' },
    { name: 'Slate', token: '--slate', bg: '#1A2E4A', fg: '#F4F0E8' },
    { name: 'Red', token: '--red', bg: '#8B2020', fg: '#F4F0E8' },
  ];

  return (
    <section className="px-8 lg:px-16 py-8 max-w-6xl">
      <p className="iw-label mb-4">Tokens at a Glance</p>
      <h2 className="iw-doctrine mb-10">
        The <strong>core palette.</strong>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {colors.map(({ name, token, bg, fg }, i) => (
          <motion.div
            key={token}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid var(--rule)' }}
          >
            <div className="h-20 w-full" style={{ background: bg }} />
            <div className="p-3">
              <p className="text-xs font-semibold" style={{ color: 'var(--ink)' }}>{name}</p>
              <p className="text-[10px] font-mono mt-0.5" style={{ color: 'var(--ink-ghost)' }}>{token}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl" style={{ border: '1px solid var(--rule)' }}>
          <p className="iw-mono-label mb-3">Typography</p>
          <p className="font-serif text-xl mb-1" style={{ color: 'var(--ink)' }}>DM Serif Display</p>
          <p className="text-xs" style={{ color: 'var(--ink-muted)' }}>Headings, doctrine statements, editorial display</p>
        </div>
        <div className="p-5 rounded-xl" style={{ border: '1px solid var(--rule)' }}>
          <p className="iw-mono-label mb-3">Typography</p>
          <p className="text-xl mb-1" style={{ fontFamily: 'var(--font-sans)', color: 'var(--ink)', fontWeight: 500 }}>Instrument Sans</p>
          <p className="text-xs" style={{ color: 'var(--ink-muted)' }}>Body text, UI chrome, labels, buttons</p>
        </div>
        <div className="p-5 rounded-xl" style={{ border: '1px solid var(--rule)' }}>
          <p className="iw-mono-label mb-3">Typography</p>
          <p className="font-mono text-xl mb-1" style={{ color: 'var(--ink)' }}>IBM Plex Mono</p>
          <p className="text-xs" style={{ color: 'var(--ink-muted)' }}>Technical labels, data strings, code, timestamps</p>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Export ──────────────────────────────────────────────── */
export function BrandHubPage() {
  return (
    <div>
      <Hero />
      <Divider />
      <CreativeSystem />
      <Divider />
      <ChannelAssets />
      <Divider />
      <KnowledgeBase />
      <Divider />
      <TokensPreview />

      {/* Footer */}
      <footer className="px-8 lg:px-16 py-12" style={{ borderTop: '1px solid var(--rule)' }}>
        <div className="max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-serif text-lg" style={{ color: 'var(--ink)', fontWeight: 600 }}>
              IntegrateWise Brand System
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--ink-muted)' }}>
              Canonical source of organisational truth
            </p>
          </div>
          <p className="text-xs font-mono" style={{ color: 'var(--ink-ghost)' }}>
            Version 1.0 · Forest + Paper Design System
          </p>
        </div>
      </footer>
    </div>
  );
}
