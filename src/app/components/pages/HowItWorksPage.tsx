import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, ChevronDown, ChevronUp,
  Database, Brain, Layers, Settings, Users, FileText,
  Shield, Zap, GitBranch, Server, Globe, RefreshCw,
  Lock, Eye, Sparkles, Activity, Network, Code,
  Terminal, Cloud, HardDrive, Cpu, Box, Link2,
  CheckCircle, Circle, ArrowDown, Workflow,
  BarChart3, Clock, CircleDot, Infinity
} from 'lucide-react';

/* ─── Step data ─── */
const steps = [
  {
    num: 1,
    title: 'The Loader',
    subtitle: 'Connects via APIs, webhooks, MCPs, and connectors',
    description:
      'The Loader is the system\'s intake layer. It connects to every external system — structured and unstructured — through APIs, webhooks, MCPs, and first-party connectors. Whether the data lives in a CRM, a spreadsheet, a chat thread, a document repository, or an event stream, the Loader ingests it following enterprise API principles: rate-limiting, retry logic, schema discovery, and progressive hydration.',
    details: [
      'Structured + unstructured data intake',
      'API, webhook, MCP, and connector protocols',
      'Enterprise API principles — rate limiting, retry, schema discovery',
      'Progressive hydration for complex data sources',
    ],
    icon: ArrowRight,
    color: 'var(--forest)',
  },
  {
    num: 2,
    title: 'The Normalizer',
    subtitle: 'Reformats into one coherent representation',
    description:
      'Once the Loader brings data in, the Normalizer transforms it into one coherent, canonical representation. This is not a simple format conversion. The Normalizer performs schema mapping, field alignment, relationship resolution, and format normalization so that data from completely different systems can coexist in the same truth layer without losing meaning or structure.',
    details: [
      'Schema mapping across heterogeneous sources',
      'Format normalization to canonical representation',
      'Relationship resolution and field alignment',
      'Meaning preserved through structural transformation',
    ],
    icon: Workflow,
    color: 'var(--forest-mid)',
  },
  {
    num: 3,
    title: 'The Spine',
    subtitle: 'Multi-provider: Postgres, Redis, KV, R2, D1, Supabase',
    description:
      'The Spine is the system\'s single source of truth. It is a multi-provider persistence layer — supporting Postgres, Redis, KV stores, R2, D1, and Supabase — but to the rest of the system, it presents as one logical memory. The Spine holds canonical entities, relationships, signals, evidence, and operational context. It is the constant underneath everything.',
    details: [
      'Multi-provider: Postgres, Redis, KV, R2, D1, Supabase',
      'One logical memory regardless of underlying storage',
      'Canonical entities, relationships, signals, and evidence',
      'The constant underneath the entire system',
    ],
    icon: Database,
    color: 'var(--gold)',
  },
  {
    num: 4,
    title: 'The Workbenches',
    subtitle: '4 workbenches + 3 memory layers',
    description:
      'On top of the Spine sit four distinct workbenches — each purpose-built for a specific mode of work — and three memory layers that organize how information persists across the system.',
    details: [
      'User Workbench — the projection-native operating surface for records, tasks, documents, workflows, and role-shaped views',
      'Cognitive Workbench — where reasoning, evidence, tools, retrieval, synthesis, and action proposals are assembled',
      'Twin Workbench — the AI reasoning surface where the Twin operates on full memory and context to identify actions, insights, and opportunities',
      'CLAW / Hermes — the deterministic execution layer that carries out approved actions through connected workflows and systems',
    ],
    memoryLayers: [
      {
        name: 'Personal Memory',
        desc: 'User-specific context, preferences, interaction history, and learned patterns that make the system personalized for each individual.',
      },
      {
        name: 'Organizational Memory',
        desc: 'Shared truth, institutional knowledge, operational patterns, and decision lineage that belong to the organization as a whole.',
      },
      {
        name: 'Conversational Memory',
        desc: 'Session-level context, dialogue history, and ephemeral reasoning that persists within conversations and promotes upward when valuable.',
      },
    ],
    icon: Layers,
    color: 'var(--forest)',
  },
  {
    num: 5,
    title: 'You Act',
    subtitle: 'Modify data, approve suggestions, make decisions',
    description:
      'The system does not act autonomously. You act. In this step, the user reviews what the AI proposes — suggestions, insights, actions — and decides what to approve, modify, or reject. Every consequential change passes through human judgment. The Twin suggests, the user decides, the Operator executes. This is the governance model that makes AI safe at scale.',
    details: [
      'Review and approve AI-generated suggestions',
      'Modify data, adjust recommendations, reject noise',
      'Human judgment gates every consequential action',
      'Governance-first design: nothing runs without approval',
    ],
    icon: Users,
    color: 'var(--forest-mid)',
  },
  {
    num: 6,
    title: 'Retirement',
    subtitle: 'Data goes back to source tools — governed writeback',
    description:
      'Approved actions do not stay inside IntegrateWise. They flow back to the source tools where work actually happens — through governed writeback. Updated records return to your CRM. Approved tasks appear in your project tool. New documents land in your knowledge base. The Spine is never the endpoint. It is the intelligence layer that ensures every writeback is grounded, authorized, and traceable.',
    details: [
      'Governed writeback to source systems',
      'Updated records return to CRM, project tools, knowledge bases',
      'Every writeback is grounded, authorized, and traceable',
      'Spine as intelligence layer, not endpoint',
    ],
    icon: RefreshCw,
    color: 'var(--gold)',
  },
  {
    num: 7,
    title: 'The Second Run',
    subtitle: 'Loader runs again, Spine grows, AI gets smarter',
    description:
      'After the first cycle completes, the Loader runs again. New data arrives from the source tools — including the data that was just written back. The Spine grows richer. The AI gets smarter. Each iteration compounds: more context, deeper relationships, sharper signals, better recommendations. This is the round trip. This is the thing no other product does.',
    details: [
      'Loader re-ingests data from source tools',
      'Spine grows richer with each cycle',
      'AI compounds context, relationships, and signals',
      'Each iteration produces sharper recommendations',
    ],
    icon: GitBranch,
    color: 'var(--forest)',
  },
  {
    num: 8,
    title: 'Continuity',
    subtitle: 'The model is a variable. The memory is a constant.',
    description:
      'The memory lives in the Spine. Not in the model. Not in the provider. Not in the session context window. When the model changes — from GPT-4 to Claude to Gemini to MiMo — the new model inherits all the memory. It does not start cold. It does not need to be told who the user is. The memory was there before it arrived. The memory will be there after it leaves.',
    details: [
      'Model changes — the memory stays',
      'Provider changes — the memory stays',
      'Infrastructure changes — the memory survives',
      'The Spine is the constant. Everything else is a variable.',
    ],
    icon: Infinity,
    color: 'var(--forest-mid)',
  },
];

/* ─── Architecture layers ─── */
const archLayers = [
  {
    name: '1. Adaptive Spine',
    desc: 'The substrate, continuity core, truth base, routing base, and memory foundation. Holds and governs the connected operational reality.',
    icon: Database,
  },
  {
    name: '2. Normalizer Pipeline',
    desc: '8-stage pipeline that transforms raw connector data into canonical truth — analyze, classify, filter, refine, map, resolve, validate, and commit.',
    icon: Workflow,
  },
  {
    name: '3. Memory System',
    desc: 'Personal, organizational, and conversational memory layers that persist across sessions, models, and providers.',
    icon: Brain,
  },
  {
    name: '4. Cognitive Intelligence Layer',
    desc: '14 cognitive capabilities that enable context-aware reasoning, synthesis, governance, and proactive intelligence.',
    icon: Sparkles,
  },
  {
    name: '5. Workbench Surface',
    desc: 'Four purpose-built workbenches — User, Cognitive, Twin, CLAW/Hermes — for different modes of human-AI interaction.',
    icon: Layers,
  },
  {
    name: '6. Governance & Execution',
    desc: 'Approval-first execution with full lineage, audit trails, evidence linking, and governed writeback to source systems.',
    icon: Shield,
  },
  {
    name: '7. Ecosystem & Connectors',
    desc: 'External tools, APIs, webhooks, MCPs, and publication surfaces that extend IntegrateWise into the systems customers already use.',
    icon: Globe,
  },
];

/* ─── 14 Cognitive Capabilities ─── */
const cognitiveCapabilities = [
  { num: 1, name: 'Continuity Core', desc: 'Keeps context alive across sessions, models, providers.' },
  { num: 2, name: 'Operational Cognition', desc: 'Domain-specific reasoning across all business domains.' },
  { num: 3, name: 'Synthesis', desc: 'Cross-system reasoning, multi-conversation synthesis.' },
  { num: 4, name: 'Governance', desc: 'Evidence validation, trust scoring, approval gates.' },
  { num: 5, name: 'Execution', desc: 'Action routing, workspace projection, governed writeback.' },
  { num: 6, name: 'Projection', desc: 'Makes internal state visible to humans.' },
  { num: 7, name: 'Ecosystem', desc: 'Bridges external tools into the Spine.' },
  { num: 8, name: 'Memory Classification', desc: 'Routes information to the right memory layer.' },
  { num: 9, name: 'Promotion', desc: 'Moves knowledge from conversational to permanent.' },
  { num: 10, name: 'Lineage', desc: 'Tracks how everything evolved over time.' },
  { num: 11, name: 'Pattern Detection', desc: 'Finds recurring patterns across all data.' },
  { num: 12, name: 'Drift Detection', desc: 'Catches when reality diverges from intent.' },
  { num: 13, name: 'Proactive Intelligence', desc: 'Suggests before the user asks.' },
  { num: 14, name: 'Learned Workflows', desc: 'Workflows that get smarter with every execution.' },
];

/* ─── Governance model ─── */
const governanceSteps = [
  { step: '1', title: 'The Twin suggests', desc: 'Operating on the user\'s full memory and context, the Twin identifies an action, insight, risk, or opportunity and presents it.' },
  { step: '2', title: 'The user reviews', desc: 'In the Cognitive Workbench, the user sees the suggestion along with the evidence. Approve, adjust, reject, or defer.' },
  { step: '3', title: 'The Operator executes', desc: 'If approved, the Operator carries it out — understanding what the action means and which tools to touch.' },
  { step: '4', title: 'Results flow back', desc: 'Every execution adds to the memory. Every decision is recorded with full lineage.' },
  { step: '5', title: 'The Spine grows', desc: 'And the next cycle is smarter because of it.' },
];

/* ─── Sub-components ─── */

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-3"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--forest)',
      }}
    >
      {children}
    </p>
  );
}

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      style={{
        background: 'transparent',
        border: '1px solid var(--rule-light)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        position: 'relative',
      }}
    >
      {/* Step number badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-lg)',
            background: step.color,
            color: 'var(--paper)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-serif)',
            fontSize: '1.25rem',
            letterSpacing: '0.02em',
            flexShrink: 0,
          }}
        >
          {step.num}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-xl)',
              color: 'var(--ink)',
              letterSpacing: '0.015em',
              marginBottom: '0.25rem',
            }}
          >
            {step.title}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--gold)',
              letterSpacing: '0.04em',
              marginBottom: '0.75rem',
            }}
          >
            {step.subtitle}
          </p>
        </div>
        <Icon size={20} style={{ color: step.color, flexShrink: 0, marginTop: '4px' }} />
      </div>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          lineHeight: 1.65,
          color: 'var(--ink)',
          marginBottom: expanded ? '1rem' : 0,
        }}
      >
        {step.description}
      </p>

      {/* Expand / collapse details */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--forest)',
          padding: '0.5rem 0 0 0',
        }}
      >
        {expanded ? 'Less' : 'Details'}
        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {step.details.map((d, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.625rem',
                    padding: '0.375rem 0',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-sans)',
                    lineHeight: 1.5,
                  }}
                >
                  <CircleDot size={12} style={{ color: 'var(--forest)', marginTop: '3px', flexShrink: 0 }} />
                  {d}
                </li>
              ))}
            </ul>

            {/* Memory layers for Step 4 */}
            {step.memoryLayers && (
              <div style={{ marginTop: '1.25rem' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--forest)',
                    marginBottom: '0.75rem',
                  }}
                >
                  Three Memory Layers
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {step.memoryLayers.map((layer, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--paper)',
                        border: '1px solid var(--rule-light)',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: 'var(--gold)',
                          marginBottom: '0.25rem',
                        }}
                      >
                        {layer.name}
                      </p>
                      <p
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-muted)',
                          lineHeight: 1.5,
                        }}
                      >
                        {layer.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main Component ─── */

export function HowItWorksPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--paper)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* ─── HERO ─── */}
      <section
        style={{
          padding: '6rem 2rem 4rem',
          maxWidth: '52rem',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionEyebrow>IntegrateWise</SectionEyebrow>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-display)',
              lineHeight: 0.92,
              letterSpacing: '0.015em',
              color: 'var(--ink)',
              marginBottom: '1.5rem',
            }}
          >
            The round trip.
            <br />
            <span style={{ color: 'var(--forest)' }}>
              The thing no other product does.
            </span>
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-xl)',
              lineHeight: 1.5,
              color: 'var(--text-muted)',
              maxWidth: '36rem',
              margin: '0 auto',
            }}
          >
            IntegrateWise is built around a connected loop where truth, context, intelligence, approval, and action remain linked.
          </p>
        </motion.div>
      </section>

      {/* ─── THE COMPLETE FLOW ─── */}
      <section
        style={{
          padding: '4rem 2rem',
          maxWidth: '52rem',
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionEyebrow>The Complete Flow</SectionEyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              letterSpacing: '0.015em',
              color: 'var(--ink)',
              marginBottom: '0.5rem',
            }}
          >
            Eight steps. One connected loop.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--text-muted)',
              marginBottom: '3rem',
              maxWidth: '36rem',
            }}
          >
            Data enters through the Loader, gets normalized into truth, lives in the Spine, surfaces through workbenches, gets acted on by you, returns to source tools, and makes the next cycle smarter. This is the round trip.
          </p>
        </motion.div>

        {/* Timeline line */}
        <div style={{ position: 'relative' }}>
          {/* Vertical timeline connector */}
          <div
            style={{
              position: 'absolute',
              left: '23px',
              top: '24px',
              bottom: '24px',
              width: '2px',
              background: 'linear-gradient(180deg, var(--forest), var(--gold), var(--forest-mid))',
              opacity: 0.25,
              borderRadius: '1px',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── ARCHITECTURE DEEP DIVE ─── */}
      <section
        style={{
          padding: '4rem 2rem',
          maxWidth: '52rem',
          margin: '0 auto',
          borderTop: '1px solid var(--rule-light)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionEyebrow>Architecture Deep Dive</SectionEyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              letterSpacing: '0.015em',
              color: 'var(--ink)',
              marginBottom: '0.5rem',
            }}
          >
            Seven layers. One system.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'var(--text-muted)',
              marginBottom: '3rem',
              maxWidth: '36rem',
            }}
          >
            The architecture is designed around clean separation between substrate, cognition, governance, execution, and external operating surfaces.
          </p>
        </motion.div>

        {/* 7 Architecture Layers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '4rem' }}>
          {archLayers.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.25rem 1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'transparent',
                  border: '1px solid var(--rule-light)',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--forest)',
                    color: 'var(--paper)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'var(--text-md)',
                      color: 'var(--ink)',
                      letterSpacing: '0.01em',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {layer.name}
                  </h4>
                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                    }}
                  >
                    {layer.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ─── 14 Cognitive Capabilities ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '4rem' }}
        >
          <SectionEyebrow>14 Cognitive Capabilities</SectionEyebrow>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-2xl)',
              letterSpacing: '0.015em',
              color: 'var(--ink)',
              marginBottom: '1.5rem',
            }}
          >
            The intelligence capabilities.
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {cognitiveCapabilities.map((cap) => (
              <div
                key={cap.num}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'transparent',
                  border: '1px solid var(--rule-light)',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--forest)',
                    color: 'var(--paper)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {cap.num}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 600,
                      color: 'var(--ink)',
                    }}
                  >
                    {cap.name}
                  </p>
                  <p
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {cap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── Governance Model ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '4rem' }}
        >
          <SectionEyebrow>The Governance Model</SectionEyebrow>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-2xl)',
              letterSpacing: '0.015em',
              color: 'var(--ink)',
              marginBottom: '1.5rem',
            }}
          >
            Human in the Loop. Nothing runs without approval.
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {governanceSteps.map((item) => (
              <div
                key={item.step}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.25rem 1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'transparent',
                  border: '1px solid var(--rule-light)',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--gold)',
                    color: 'var(--paper)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '0.875rem',
                    flexShrink: 0,
                  }}
                >
                  {item.step}
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'var(--text-md)',
                      color: 'var(--ink)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── Infrastructure Summary ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '2rem' }}
        >
          <SectionEyebrow>Infrastructure Summary</SectionEyebrow>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-2xl)',
              letterSpacing: '0.015em',
              color: 'var(--ink)',
              marginBottom: '1.5rem',
            }}
          >
            Built for continuity. Designed for scale.
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '0.75rem',
            }}
          >
            {[
              { label: 'Persistence', value: 'Postgres · Redis · KV · R2 · D1 · Supabase', icon: Database },
              { label: 'Ingestion', value: 'APIs · Webhooks · MCPs · First-party connectors', icon: ArrowRight },
              { label: 'Intelligence', value: '14 cognitive capabilities · Multi-model', icon: Brain },
              { label: 'Governance', value: 'Approval-first · Full lineage · Audit trails', icon: Shield },
              { label: 'Execution', value: 'CLAW / Hermes · Governed writeback', icon: Zap },
              { label: 'Continuity', value: 'Model-agnostic · Provider-independent · Memory-persistent', icon: Infinity },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-lg)',
                    background: 'transparent',
                    border: '1px solid var(--rule-light)',
                  }}
                >
                  <Icon size={18} style={{ color: 'var(--forest)', marginBottom: '0.5rem' }} />
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--forest)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ─── Footer spacer ─── */}
      <div style={{ height: '4rem' }} />
    </div>
  );
}
