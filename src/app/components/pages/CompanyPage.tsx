import { motion } from 'motion/react';
import {
  ArrowRight, Database, Brain, Shield, RefreshCw,
  Users, Zap, CheckCircle, Layers, GitBranch,
  Building2, Target, Quote
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

      {/* Warm gold accent — stays in paper family */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 55% 45% at 75% 15%, color-mix(in srgb, var(--gold) 7%, transparent) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-5xl"
      >
        {/* Eyebrow */}
        <p className="iw-hero-eyebrow mb-6 flex items-center gap-3">
          <span style={{ display: 'inline-block', width: 32, height: 1, background: 'var(--gold)' }} />
          IntegrateWise · The Company
        </p>

        {/* Display headline */}
        <h1 className="iw-hero-title mb-8" style={{ color: 'var(--ink)' }}>
          The Memory-Native<br />
          <span style={{ color: 'var(--forest)' }}>Operating System</span>
        </h1>

        {/* Three-line tagline */}
        <div className="iw-hero-col mb-10" style={{ opacity: 0.85 }}>
          <p>AI that remembers.</p>
          <p>Systems that learn.</p>
          <p>Humans that decide.</p>
        </div>

        {/* Subline */}
        <p className="iw-body mb-12 max-w-2xl">
          Connect every tool to one Spine. Give AI persistent memory across sessions, models, and providers.
          Keep humans in control. The complete round trip — no other system does this.
        </p>

        {/* CTAs */}
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
          <motion.a
            href="mailto:hello@integratewise.ai"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold"
            style={{ border: '2px solid var(--forest)', color: 'var(--forest)', fontSize: 15 }}
          >
            Request a demo
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
          { stat: '30–40%', label: 'of knowledge work is manual integration' },
          { stat: '~30 min', label: 'before AI resets its context' },
          { stat: '$0', label: 'institutional memory when someone leaves' },
        ].map(({ stat, label }) => (
          <div key={stat}>
            <p className="font-display mb-1"
               style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1, color: 'var(--forest)', letterSpacing: '0.01em' }}>
              {stat}
            </p>
            <p className="iw-body" style={{ color: 'var(--text-muted)' }}>{label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── The Problem ──────────────────────────────────────────────────────────────
function TheProblem() {
  return (
    <section className="px-8 lg:px-16 py-16 max-w-5xl">
      <p className="iw-label mb-4">The Problem</p>
      <h2 className="iw-doctrine mb-12">
        Your team is <strong>the integration layer.</strong>
      </h2>

      <div className="grid lg:grid-cols-3 gap-6">
        {[
          {
            icon: RefreshCw,
            heading: 'AI starts cold every session',
            body: 'Every conversation resets. Every model forgets. Every new session demands the same context again. Your team explains the same things over and over — to people, to AI, to systems.',
          },
          {
            icon: GitBranch,
            heading: 'Tools do not talk to each other',
            body: 'Your CRM knows the deal. Your support tool knows the issues. Your Slack knows the sentiment. None of them know what the others know. Your team manually reconstructs the picture every day.',
          },
          {
            icon: Users,
            heading: 'Knowledge walks out the door',
            body: 'When someone leaves, everything they knew leaves with them. No system captured it. No AI remembers it. The next person starts from zero. The cost is invisible until it is not.',
          },
        ].map(({ icon: Icon, heading, body }, i) => (
          <motion.div
            key={heading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl p-6"
            style={{ background: 'var(--surface-raised)', border: '1px solid var(--rule)' }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                 style={{ background: 'var(--paper-deep)' }}>
              <Icon className="w-4 h-4" style={{ color: 'var(--forest)' }} />
            </div>
            <p className="iw-s-title mb-2">{heading}</p>
            <p className="iw-body" style={{ color: 'var(--text-muted)' }}>{body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── The Round Trip ───────────────────────────────────────────────────────────
function TheRoundTrip() {
  const steps = [
    { label: 'Your Tools',   sub: 'CRM · Slack · Docs · Calendar',      icon: Database },
    { label: 'Loader',       sub: 'Ingests every signal',                icon: Zap      },
    { label: 'Normalizer',   sub: 'Cleans and maps the data',            icon: Layers   },
    { label: 'The Spine',    sub: 'Persistent memory layer',             icon: Brain    },
    { label: 'Workbenches',  sub: 'AI acts with full context',           icon: Target   },
    { label: 'Governance',   sub: 'Human approves every action',         icon: Shield   },
    { label: 'Back to Tools',sub: 'Data flows back. Spine grows.',       icon: RefreshCw},
  ];

  return (
    <section className="px-8 lg:px-16 py-20 mx-4 rounded-2xl"
             style={{ background: 'var(--forest)' }}>
      <p className="iw-label mb-4" style={{ color: 'var(--gold)' }}>The Solution</p>
      <h2 className="iw-doctrine mb-4" style={{ color: 'var(--paper)' }}>
        The complete round trip.
      </h2>
      <p className="iw-body mb-16 max-w-2xl" style={{ color: 'var(--paper)', opacity: 0.7 }}>
        Data flows in, gets acted on, flows back. Every cycle makes the system smarter.
        Every cycle means you explain less. No other system does this.
      </p>

      {/* Flow */}
      <div className="flex flex-wrap items-start gap-0 mb-16">
        {steps.map(({ label, sub, icon: Icon }, i) => (
          <div key={label} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex flex-col items-center text-center"
              style={{ width: 110 }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                   style={{ background: i === 3 ? 'var(--gold)' : 'rgba(244,240,232,0.1)' }}>
                <Icon className="w-5 h-5" style={{ color: i === 3 ? 'var(--forest)' : 'var(--paper)' }} />
              </div>
              <p className="iw-mono-label mb-1" style={{ color: 'var(--paper)', opacity: 0.9, fontSize: 8 }}>{label}</p>
              <p style={{ fontSize: 10, color: 'var(--paper)', opacity: 0.5, lineHeight: 1.4 }}>{sub}</p>
            </motion.div>
            {i < steps.length - 1 && (
              <ArrowRight className="w-3 h-3 mx-0.5 shrink-0" style={{ color: 'var(--gold)', opacity: 0.5 }} />
            )}
          </div>
        ))}
      </div>

      {/* Three principles */}
      <div className="grid lg:grid-cols-3 gap-8 pt-10 border-t"
           style={{ borderColor: 'rgba(244,240,232,0.12)' }}>
        {[
          { heading: 'Persistent Memory',    body: 'The Spine carries full context across every session, every model, every provider. AI never starts cold.' },
          { heading: 'Model Independence',   body: 'Swap providers without losing memory. The Spine owns the context — the model is a variable.' },
          { heading: 'Governance by Design', body: 'Every AI suggestion shows its evidence. Every action requires human approval before execution.' },
        ].map(({ heading, body }) => (
          <div key={heading}>
            <CheckCircle className="w-5 h-5 mb-3" style={{ color: 'var(--gold)' }} />
            <p className="iw-s-title mb-2" style={{ color: 'var(--paper)' }}>{heading}</p>
            <p className="iw-body" style={{ color: 'var(--paper)', opacity: 0.7 }}>{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Two Products ─────────────────────────────────────────────────────────────
function TwoProducts() {
  return (
    <section className="px-8 lg:px-16 py-16 max-w-5xl">
      <p className="iw-label mb-4">Two Products. One Spine.</p>
      <h2 className="iw-doctrine mb-4">
        Built for the roles that <strong>run the company.</strong>
      </h2>
      <p className="iw-body mb-12" style={{ color: 'var(--text-muted)' }}>
        Same architecture. Same Spine. Two surfaces for two distinct operational realities.
      </p>

      <div className="grid lg:grid-cols-2 gap-8">
        {[
          {
            name: 'Account Success',
            tagline: 'Relationship intelligence for CS teams.',
            description: 'One customer view across every tool. AI that remembers every account, every conversation, every decision. 15 layers of intelligence — from health scores to stakeholder mapping. Proactive insights before you ask.',
            origin: 'Built by a CSM who managed 30 accounts and saved $8 million by surfacing context no one else could see.',
            roles: ['Customer Success', 'RevOps', 'Account Management'],
            accent: 'var(--forest)',
          },
          {
            name: 'Business Ops',
            tagline: 'The operating system for your company.',
            description: '14 departments. One surface. AI that knows your business across every function. Goals-first: every metric connected to organisational objectives.',
            origin: 'Built by a MuleSoft architect who designed enterprise integration platforms. Every architectural principle and security policy embedded from day one.',
            roles: ['Founders', 'COOs', 'Operations Leaders'],
            accent: 'var(--slate)',
          },
        ].map(({ name, tagline, description, origin, roles, accent }) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-8"
            style={{ background: 'var(--surface-raised)', border: '2px solid var(--rule)' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                   style={{ background: accent }}>
                <Building2 className="w-5 h-5" style={{ color: 'var(--paper)' }} />
              </div>
              <div>
                <p className="iw-s-title">{name}</p>
                <p className="iw-body" style={{ color: 'var(--text-muted)', fontSize: 12 }}>{tagline}</p>
              </div>
            </div>

            <p className="iw-body mb-5">{description}</p>

            <div className="iw-callout-insight mb-5">
              <p>{origin}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {roles.map((r) => (
                <span key={r} className="iw-mono-label px-3 py-1 rounded-full"
                      style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
                  {r}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Value Props ──────────────────────────────────────────────────────────────
function ValueProps() {
  const props = [
    { role: 'Customer Success', icon: Users,      value: 'One customer view across every tool.',           detail: 'AI that remembers every account, every conversation, every decision. 15 layers of intelligence. Proactive insights before you ask. No more reopening six tabs to understand one customer.' },
    { role: 'RevOps',           icon: GitBranch,  value: 'Pipeline intelligence with full context.',       detail: 'Pipeline data from your CRM, enrichment tools, and communication platform — unified in one Spine. AI tracks deal velocity, flags stalled opportunities, and projects revenue with operational context.' },
    { role: 'Marketing',        icon: Target,     value: 'Prove ROI from impression to closed deal.',      detail: 'Campaign data connected to pipeline connected to revenue. AI traces the full funnel. No more last-click attribution. Evidence from every touchpoint.' },
    { role: 'Compliance',       icon: Shield,     value: 'Every action has lineage.',                      detail: 'Every decision recorded. Every AI suggestion shows its evidence. Every execution governed. Built on enterprise-grade integration architecture by a MuleSoft architect.' },
    { role: 'Leaders',          icon: Brain,      value: '14 departments. One surface.',                   detail: 'AI that knows your business. Goals-first: every metric connected to organisational objectives. Proactive insights across every function.' },
    { role: 'Operations',       icon: RefreshCw,  value: 'The complete round trip.',                       detail: 'Every tool connected to one Spine. Data flows in, gets acted on, flows back. The Loader and Normalizer handle the complexity. Your team makes decisions instead of shuttling data.' },
  ];

  return (
    <section className="px-8 lg:px-16 py-16 max-w-6xl">
      <p className="iw-label mb-4">Who It Is For</p>
      <h2 className="iw-doctrine mb-4">
        Built for the people who <strong>run the work.</strong>
      </h2>
      <p className="iw-body mb-12" style={{ color: 'var(--text-muted)' }}>
        Not another dashboard. Not another AI assistant that forgets everything after the call.
        A system that grows every time you use it.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {props.map(({ role, icon: Icon, value, detail }, i) => (
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl p-6"
            style={{ background: 'var(--surface-raised)', border: '1px solid var(--rule)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                   style={{ background: 'var(--forest)' }}>
                <Icon className="w-3.5 h-3.5" style={{ color: 'var(--paper)' }} />
              </div>
              <p className="iw-label">{role}</p>
            </div>
            <p className="iw-s-title mb-2">{value}</p>
            <p className="iw-body" style={{ color: 'var(--text-muted)' }}>{detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Origin Story ─────────────────────────────────────────────────────────────
function OriginStory() {
  return (
    <section className="px-8 lg:px-16 py-16 max-w-4xl">
      <p className="iw-label mb-4">The Origin</p>
      <h2 className="iw-doctrine mb-10">
        Built by a CSM who <strong>saved $8 million.</strong>
      </h2>

      <div className="rounded-2xl p-10"
           style={{ background: 'var(--surface-raised)', border: '2px solid var(--rule)' }}>
        <Quote className="w-8 h-8 mb-6" style={{ color: 'var(--gold)' }} />

        <div className="space-y-5 iw-body">
          <p>IntegrateWise was not designed in a boardroom. It was built at a desk.</p>
          <p>Nirmal managed 30+ accounts across six tools. He was the only person who remembered what happened yesterday. He built templates to structure what he knew. He built a Spine to connect what was scattered.</p>
          <p>That Spine saved an $8 million red account by surfacing context no one else could see. That moment proved the problem is universal.</p>
          <p>The co-founder designed enterprise integration platforms — secure data flows, governed access, scalable architecture. Every architectural principle from enterprise integration is embedded in the foundation.</p>
          <p style={{ color: 'var(--forest)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
            IntegrateWise runs on IntegrateWise. The company eats its own cooking.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t" style={{ borderColor: 'var(--rule)' }}>
          {[
            { label: 'CSM background',       detail: '30+ accounts · 6 tools · daily context reconstruction' },
            { label: 'MuleSoft architecture', detail: 'Enterprise integration · governance · security by design' },
            { label: 'Proven in production',  detail: '$8M account saved · problem confirmed · company built' },
          ].map(({ label, detail }) => (
            <div key={label}>
              <p className="iw-label mb-1">{label}</p>
              <p className="iw-body" style={{ color: 'var(--text-muted)' }}>{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Vision & Mission ─────────────────────────────────────────────────────────
function VisionMission() {
  return (
    <section className="px-8 lg:px-16 py-16 max-w-5xl">
      <div className="grid lg:grid-cols-2 gap-16">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <p className="iw-label mb-4">Vision</p>
          <h2 className="iw-s-title mb-6" style={{ fontSize: 'var(--text-2xl)' }}>
            Make the human the decision maker — not the integration layer.
          </h2>
          <div className="space-y-3 iw-body" style={{ color: 'var(--text-muted)' }}>
            <p>To give every organisation AI that remembers — across sessions, across models, across providers — so that every interaction builds on the last.</p>
            <p>To create the operating system where tools connect, memory accumulates, and nothing happens without human approval.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <p className="iw-label mb-4">Mission</p>
          <h2 className="iw-s-title mb-6" style={{ fontSize: 'var(--text-2xl)' }}>
            Connect every tool. Build persistent memory. Keep humans in control.
          </h2>
          <div className="space-y-3 iw-body" style={{ color: 'var(--text-muted)' }}>
            <p>To connect every tool to one Spine through the Loader and Normalizer.</p>
            <p>To give AI persistent, model-independent memory that grows every day.</p>
            <p>To ensure every action is governed by a human before execution.</p>
            <p>To create the round trip where data flows in, gets acted on, flows back, and the system gets smarter with every cycle.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="px-8 lg:px-16 py-24 text-center mx-4 mb-16 rounded-2xl"
             style={{ background: 'var(--forest)' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="iw-label mb-6" style={{ color: 'var(--gold)' }}>Get Started</p>

        <h2 className="iw-hero-title mb-6" style={{ color: 'var(--paper)', fontSize: 'clamp(48px, 7vw, 96px)' }}>
          Ready to stop being<br />the integration layer?
        </h2>

        <p className="iw-body mb-10 max-w-xl mx-auto" style={{ color: 'var(--paper)', opacity: 0.7 }}>
          Free tier: 1 user · 2 tools · 30-day memory. No credit card required.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <motion.a
            href="https://integratewise.ai" target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-10 py-4 rounded-xl font-semibold"
            style={{ background: 'var(--gold)', color: 'var(--forest)', fontSize: 15 }}
          >
            Try it free <ArrowRight className="w-4 h-4" />
          </motion.a>
          <motion.a
            href="mailto:hello@integratewise.ai"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-10 py-4 rounded-xl font-semibold"
            style={{ border: '2px solid rgba(244,240,232,0.35)', color: 'var(--paper)', fontSize: 15 }}
          >
            Request a demo
          </motion.a>
        </div>

        <p className="mt-10 iw-label" style={{ color: 'var(--paper)', opacity: 0.4 }}>
          IntegrateWise LLP · Bengaluru, India · hello@integratewise.ai
        </p>
      </motion.div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export function CompanyPage() {
  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh' }}>
      <Hero />
      <div className="max-w-6xl mx-auto">
        <Divider />
        <TheProblem />
      </div>
      <TheRoundTrip />
      <div className="max-w-6xl mx-auto">
        <Divider />
        <TwoProducts />
        <Divider />
        <ValueProps />
        <Divider />
        <OriginStory />
        <Divider />
        <VisionMission />
      </div>
      <CTA />
    </div>
  );
}

export default CompanyPage;
