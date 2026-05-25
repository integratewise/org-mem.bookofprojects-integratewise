import { motion } from 'motion/react';
import {
  ArrowRight, Users, Zap, Shield, RefreshCw,
  CheckCircle, Layers, Code, Brain, Heart,
  Wrench, Globe, Lightbulb, Star
} from 'lucide-react';

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider() {
  return <div className="border-t my-16" style={{ borderColor: 'var(--rule)' }} />;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative px-8 lg:px-16 pt-20 pb-24 overflow-hidden"
             style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

      {/* Warm gold accent */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 55% 45% at 75% 15%, color-mix(in srgb, var(--gold) 7%, transparent) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-5xl"
      >
        <p className="iw-hero-eyebrow mb-6 flex items-center gap-3">
          <span style={{ display: 'inline-block', width: 32, height: 1, background: 'var(--gold)' }} />
          IntegrateWise · About
        </p>

        <h1 className="iw-hero-title mb-8" style={{ color: 'var(--ink)' }}>
          Built from the seat.<br />
          <span style={{ color: 'var(--forest)' }}>Not from the sideline.</span>
        </h1>

        <p className="iw-body mb-12 max-w-2xl" style={{ color: 'var(--text-muted)' }}>
          IntegrateWise was born from someone who sat in the customer's chair —
          and built the product they wished existed.
        </p>

        <div className="flex flex-wrap gap-4">
          <motion.a
            href="https://integratewise.ai"
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold"
            style={{ background: 'var(--forest)', color: 'var(--paper)', fontSize: 15 }}
          >
            Try it free <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </motion.div>

      {/* Stat strip */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="relative flex flex-wrap gap-12 mt-16 pt-10 border-t"
        style={{ borderColor: 'var(--rule)' }}
      >
        {[
          { stat: '2', label: 'roles lived — CSM and MuleSoft Architect' },
          { stat: '$8M', label: 'saved through one implementation' },
          { stat: '1', label: 'person fully committed to building' },
        ].map(({ stat, label }) => (
          <div key={stat}>
            <p className="font-serif mb-1"
               style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1, color: 'var(--forest)', letterSpacing: '0.01em' }}>
              {stat}
            </p>
            <p className="iw-body" style={{ color: 'var(--text-muted)' }}>{label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────
function Story() {
  return (
    <section className="px-8 lg:px-16 py-16 max-w-5xl">
      <p className="iw-label mb-4">The Story</p>
      <h2 className="iw-doctrine mb-12">
        Two roles. <strong>One person. One product.</strong>
      </h2>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-8"
          style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-xl p-3" style={{ background: 'var(--forest)', color: 'var(--paper)' }}>
              <Users className="w-5 h-5" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--ink)' }}>
              Customer Success Manager
            </h3>
          </div>
          <p className="iw-body" style={{ color: 'var(--text-muted)' }}>
            Sat with customers every day. Watched them struggle with fragmented tools.
            Saw the same context lost between calls, tickets, and CRM notes.
            Understood the pain from the inside — not from a demo, not from a spec.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl p-8"
          style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-xl p-3" style={{ background: 'var(--gold)', color: 'var(--paper)' }}>
              <Code className="w-5 h-5" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--ink)' }}>
              MuleSoft Architect
            </h3>
          </div>
          <p className="iw-body" style={{ color: 'var(--text-muted)' }}>
            Designed integration platforms at scale. Knew how to connect systems,
            how to manage data flow, and how to build governance into architecture.
            Combined both perspectives into a single vision for memory-native AI.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── The Moment ───────────────────────────────────────────────────────────────
function TheMoment() {
  return (
    <section className="px-8 lg:px-16 py-16 max-w-5xl">
      <p className="iw-label mb-4">The Moment</p>
      <h2 className="iw-doctrine mb-12">
        <strong>$8 million</strong> saved.
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl p-10"
        style={{ background: 'linear-gradient(135deg, var(--forest) 0%, var(--forest-mid) 100%)', color: 'var(--paper)' }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-xl p-3 bg-[var(--paper)]/10">
            <Zap className="w-5 h-5" />
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, opacity: 0.8, letterSpacing: '0.05em' }}>
            THE TURNING POINT
          </p>
        </div>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.4, fontWeight: 600, maxWidth: 700 }}>
          One implementation. One memory system. Eight million dollars saved.
        </p>
        <p className="mt-6" style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, maxWidth: 600 }}>
          The moment the numbers landed, the question changed from
          <em> "could this work?"</em> to <em>"why doesn't everyone have this?"</em>
          That's when IntegrateWise stopped being an idea and became a commitment.
        </p>
      </motion.div>
    </section>
  );
}

// ─── The Commitment ───────────────────────────────────────────────────────────
function TheCommitment() {
  return (
    <section className="px-8 lg:px-16 py-16 max-w-5xl">
      <p className="iw-label mb-4">The Commitment</p>
      <h2 className="iw-doctrine mb-12">
        <strong>Full-time.</strong> All in.
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl p-8"
        style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="rounded-xl p-3" style={{ background: 'var(--forest)', color: 'var(--paper)', flexShrink: 0 }}>
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--ink)', marginBottom: 12 }}>
              No side projects. No consulting. No distractions.
            </h3>
            <p className="iw-body" style={{ color: 'var(--text-muted)' }}>
              IntegrateWise is a full-time commitment. Every day is spent building
              the product that customer success managers, operations teams, and
              integration architects actually need. Not a feature. Not a module.
              The complete memory-native operating system for enterprise AI.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {[
            { icon: CheckCircle, text: 'Built by someone who sat in the chair' },
            { icon: Shield, text: 'Governance is not an afterthought' },
            { icon: Globe, text: 'Designed for enterprise from day one' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 p-4 rounded-xl"
                 style={{ background: 'var(--paper-warm)' }}>
              <Icon className="w-4 h-4" style={{ color: 'var(--forest)', flexShrink: 0 }} />
              <p style={{ fontSize: 14, color: 'var(--ink)', fontWeight: 500 }}>{text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── Principles ───────────────────────────────────────────────────────────────
const principles = [
  {
    icon: RefreshCw,
    title: 'The round trip is the product',
    description: 'Data goes out, context comes back. Every signal flows through the Spine, every action waits for approval, every result enriches memory. If it does not complete the round trip, it is not the product.',
  },
  {
    icon: Brain,
    title: 'The model is a variable. The memory is a constant.',
    description: 'Models change, improve, get replaced. Memory persists. Your institutional knowledge survives every model upgrade, every provider switch, every team change.',
  },
  {
    icon: Shield,
    title: 'Governance is the architecture',
    description: 'Not a layer. Not a feature. Not an admin panel. Governance is the foundation every action, approval, and memory write is built on. It cannot be optional.',
  },
  {
    icon: Star,
    title: 'Enterprise-grade by default',
    description: 'Multi-tenant isolation, RBAC, audit logs, encrypted memory, provider failover. Not enterprise-tier. Enterprise-default. Every deployment, every plan.',
  },
  {
    icon: Lightbulb,
    title: 'The company eats its own cooking',
    description: 'IntegrateWise runs on itself. Its own memory, its own governance, its own approval workflows. If it does not work for us, it does not ship.',
  },
];

function Principles() {
  return (
    <section className="px-8 lg:px-16 py-16 max-w-5xl">
      <p className="iw-label mb-4">The Principles</p>
      <h2 className="iw-doctrine mb-12">
        Five things we <strong>will not compromise on.</strong>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {principles.map(({ icon: Icon, title, description }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-2xl p-8"
            style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}
          >
            <div className="rounded-xl p-3 mb-6 inline-flex"
                 style={{ background: index % 2 === 0 ? 'var(--forest)' : 'var(--gold)', color: 'var(--paper)' }}>
              <Icon className="w-5 h-5" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--ink)', marginBottom: 12, lineHeight: 1.3 }}>
              {title}
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-muted)' }}>
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function AboutPage() {
  return (
    <div style={{ background: 'var(--paper)' }}>
      <Hero />
      <Divider />
      <Story />
      <Divider />
      <TheMoment />
      <Divider />
      <TheCommitment />
      <Divider />
      <Principles />

      {/* Footer */}
      <footer className="px-8 lg:px-16 py-16 mt-8" style={{ borderTop: '1px solid var(--rule)' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 600, color: 'var(--ink)' }}>
              IntegrateWise
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>
              The Memory-Native Operating System for Enterprise AI
            </p>
          </div>
          <a
            href="mailto:hello@integratewise.ai"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
            style={{ background: 'var(--forest)', color: 'var(--paper)', fontSize: 14 }}
          >
            Get in touch <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </footer>
    </div>
  );
}
