import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, ArrowRight, Layers, Database, Brain, Workflow, Shield, Users, GitBranch, Sparkles, Activity, Eye, Lock, RefreshCw, Globe, Server, Zap } from 'lucide-react';

const sections = [
  { id: 'problem', label: 'The Problem', icon: Layers },
  { id: 'origin', label: 'The Origin', icon: Database },
  { id: 'founder', label: "Founder's Experience", icon: Users },
  { id: 'methodology', label: 'Methodology', icon: Workflow },
  { id: 'roundtrip', label: 'The Round Trip', icon: RefreshCw },
  { id: 'layers', label: 'Seven Layers', icon: Layers },
  { id: 'cognitive', label: '14 Cognitive Layers', icon: Brain },
  { id: 'products', label: 'Two Products', icon: Sparkles },
  { id: 'memory', label: 'Memory Continuity', icon: Database },
  { id: 'governance', label: 'Governance', icon: Shield },
  { id: 'infrastructure', label: 'Infrastructure', icon: Server },
  { id: 'convergence', label: 'Convergence', icon: Activity },
];

function SectionNav({ active }: { active: string }) {
  return (
    <nav className="hidden lg:block fixed left-0 top-0 h-screen w-56 pt-20 pb-8 px-4 overflow-y-auto" style={{ background: 'var(--paper-warm)', borderRight: '1px solid var(--rule)' }}>
      <p className="text-xs font-bold tracking-[0.2em] mb-4" style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>PRODUCT WRITEUP</p>
      <div className="space-y-1">
        {sections.map(s => (
          <a key={s.id} href={`#${s.id}`} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${active === s.id ? 'font-semibold' : ''}`} style={{ background: active === s.id ? 'var(--forest)' : 'transparent', color: active === s.id ? 'var(--paper)' : 'var(--text-muted)' }}>
            <s.icon className="w-3.5 h-3.5" />
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Callout({ children, type = 'insight' }: { children: React.ReactNode; type?: 'insight' | 'warning' | 'rule' }) {
  const colors: Record<string, { bg: string; border: string; text: string }> = {
    insight: { bg: 'color-mix(in srgb, var(--gold) 6%, var(--paper))', border: 'var(--gold)', text: 'var(--ink)' },
    warning: { bg: 'color-mix(in srgb, var(--risk) 8%, var(--paper))', border: 'var(--risk)', text: 'var(--ink)' },
    rule: { bg: 'color-mix(in srgb, var(--forest) 6%, var(--paper))', border: 'var(--forest)', text: 'var(--ink)' },
  };
  const c = colors[type];
  return (
    <div className="my-6 px-5 py-4 rounded-xl" style={{ background: c.bg, borderLeft: `3px solid ${c.border}` }}>
      <p className="text-sm leading-relaxed" style={{ color: c.text, fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>{children}</p>
    </div>
  );
}

function LayerCard({ num, title, what, whatUser, whatSolves, whatNot }: { num: number; title: string; what: string; whatUser?: string; whatSolves: string; whatNot?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: 'var(--forest)', color: 'var(--paper)', fontFamily: 'var(--font-mono)' }}>{num}</div>
          <span className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4" style={{ color: 'var(--text-muted)' }} /> : <ChevronDown className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-5 pb-5 space-y-3" style={{ borderTop: '1px solid var(--rule-light)' }}>
              <p className="text-sm mt-3" style={{ color: 'var(--text-muted)' }}>{what}</p>
              {whatUser && <div><p className="text-xs font-bold tracking-widest mb-1" style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>WHAT THE USER DOES</p><p className="text-sm" style={{ color: 'var(--ink)' }}>{whatUser}</p></div>}
              <div><p className="text-xs font-bold tracking-widest mb-1" style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>WHAT THIS SOLVES</p><p className="text-sm" style={{ color: 'var(--ink)' }}>{whatSolves}</p></div>
              {whatNot && <div><p className="text-xs font-bold tracking-widest mb-1" style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>WHAT THIS DOES NOT SOLVE</p><p className="text-sm" style={{ color: 'var(--text-muted)' }}>{whatNot}</p></div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProductWriteupPage() {
  const [activeSection, setActiveSection] = useState('problem');

  return (
    <div className="flex min-h-screen">
      <SectionNav active={activeSection} />

      <main className="flex-1 lg:ml-56">
        {/* Hero */}
        <section className="relative py-20 px-6 lg:px-16 overflow-hidden" style={{ background: 'var(--forest)' }}>
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ background: 'var(--gold)', filter: 'blur(120px)' }} />
          </div>
          <div className="relative z-10 max-w-3xl">
            <p className="text-xs font-bold tracking-[0.2em] mb-4" style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}>INTEGRATEWISE — COMPLETE PRODUCT WRITEUP</p>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ color: 'var(--paper)', fontFamily: 'var(--font-serif)' }}>
              The Memory-Native Operating System
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--paper)', opacity: 0.8 }}>
              AI that remembers. Systems that learn. Humans that decide.
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-6 lg:px-16 py-16 space-y-24">

          {/* THE PROBLEM */}
          <section id="problem">
            <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>THE PROBLEM</p>
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>People juggle multiple tabs, multiple apps, multiple tools.</h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
              <p>Every 30 minutes, AI loses context. Every 30 minutes the human has to re-inject context into the AI. Without that reinjection, AI drifts. Workflows break. Scripted automations do not help because they are blind — they follow rules but carry no understanding. The human becomes the integration layer. The human becomes the router. The human becomes the memory.</p>
              <p>This is not a productivity problem. This is an operating model problem. Every existing tool — CRM, support desk, communication platform, project management, documentation — solves one piece. None of them connect the pieces. The human shuttles context between tools. The human re-explains the same context to AI every session. The human holds the full picture — and if the human leaves, the picture leaves with them.</p>
              <p>Giving the user a unified view of their tools does not solve this. A dashboard that shows data from six tools in one surface is still just a dashboard. The context switching problem is not about where the data is displayed. The problem is that the AI starts cold every time. The problem is that there is no persistent memory. The problem is that every AI session is a new session. The problem is that the human is the only entity in the system that remembers.</p>
              <p>The root cause is deeper than workflow friction. It is platform lock-in. Every tool is designed to keep data in, not let data out. Every platform creates a silo. Users cannot use their complete data because no platform lets them. They work with fragments. They make decisions on partial information. They hold the full picture in their heads because no system holds it for them.</p>
            </div>
            <Callout type="rule">IntegrateWise solves the problem the problem actually is: the absence of persistent, operational, model-independent memory that keeps the AI in sync with the user across every session, every tool change, every model change, and every provider change — permanently.</Callout>
          </section>

          {/* THE ORIGIN */}
          <section id="origin">
            <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>THE ORIGIN</p>
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>Built during the work, not after it.</h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
              <p>Nirmal was a Customer Success Manager and a MuleSoft Architect. The CSM side gave him the operational pain — managing 30+ accounts across six tools that refused to talk to each other, being the human API who shuttled context between systems because no system would connect them. The MuleSoft Architect side gave him the architectural discipline — years of designing enterprise integration platforms, building secure data flows between systems that were never meant to connect.</p>
              <p>These two experiences converged in one person. The CSM knew what needed to exist. The architect knew how to build it. And because the architect had spent years building integration platforms for enterprises, every architectural principle, every best practice, every security policy that governs enterprise-grade integration is embedded in IntegrateWise by default. Not bolted on. Inherent in the foundation.</p>
            </div>

            <div className="my-8 space-y-4">
              {[
                { step: '01', title: 'The insight came first', desc: 'As a CSM, Nirmal saw what every CSM sees: tools do not talk to each other. Every platform has lock-in. Every platform keeps its data siloed. The user pays the price.' },
                { step: '02', title: 'Templates came first', desc: 'While still working as a CSM, Nirmal started creating structures for organizing what he knew about his accounts. The 15-layer schema. The account structures. Not as a product. As a way to organize scattered information.' },
                { step: '03', title: 'The Spine came next', desc: 'A place where data from multiple tools could land in one representation. Not a database. A living record. The piece that connected the dots between tools that refused to connect.' },
                { step: '04', title: 'Loader and Normalizer came next', desc: 'The Loader fetches data from external tools. The Normalizer transforms it into a common shape. Together they break through platform lock-in.' },
                { step: '05', title: 'The $8M moment', desc: 'An account marked red. Because the Spine connected dots no one else could connect, Nirmal saw the full picture. He saved $8 million. That was the moment.' },
              ].map(item => (
                <div key={item.step} className="flex gap-4 p-4 rounded-xl" style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: 'var(--forest)', color: 'var(--paper)', fontFamily: 'var(--font-mono)' }}>{item.step}</div>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--ink)' }}>{item.title}</p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Callout type="insight">This is not my problem. This is everyone's problem. Every CSM. Every account manager. Every operator. Every founder. The Spine could change this for all of them.</Callout>
          </section>

          {/* FOUNDER'S EXPERIENCE */}
          <section id="founder">
            <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>THE FOUNDER'S EXPERIENCE</p>
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>Two roles. One product.</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 rounded-xl" style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}>
                <p className="text-xs font-bold tracking-widest mb-3" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>AS A CSM</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>He was the human API. He managed 30+ accounts across CRM, support desk, communication platform, documentation tools, and email. He tracked a renewal in the CRM while the customer's technical issue lived in the support desk while the internal coordination happened in the communication platform. He rebuilt context every morning because overnight everything moved.</p>
              </div>
              <div className="p-5 rounded-xl" style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}>
                <p className="text-xs font-bold tracking-widest mb-3" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>AS A MULESOFT ARCHITECT</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>He designed enterprise integration platforms. He built secure data flows between systems that were never meant to connect. He enforced security policies. He applied architectural best practices at scale. He understood data transformation, schema mapping, API governance, and the principles that make enterprise integrations reliable.</p>
              </div>
            </div>
            <div className="space-y-3 text-sm" style={{ color: 'var(--ink)' }}>
              <p>Every architectural decision in IntegrateWise carries the architect's discipline:</p>
              <ul className="space-y-2 ml-4">
                {['Multi-provider Spine designed like an enterprise data platform', 'Loader and Normalizer built with enterprise ETL principles', 'Security model follows enterprise security policies by default', 'Governance model mirrors enterprise integration controls', 'Connector architecture follows enterprise API-led connectivity'].map(item => (
                  <li key={item} className="flex items-start gap-2"><ArrowRight className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: 'var(--forest)' }} />{item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* METHODOLOGY */}
          <section id="methodology">
            <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>THE INTEGRATEWISE METHODOLOGY</p>
            <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>Six principles. One system.</h2>
            <div className="space-y-4">
              {[
                { title: 'One Work Surface', desc: 'Not six tabs. Not four tools. One surface that shows normalized data from every connected tool, ready to be acted on.' },
                { title: 'AI That Lives Inside the Ecosystem', desc: 'AI reads from the same memory the user writes to. AI sees the same data the user sees. AI does not start cold. AI has never been cold.' },
                { title: 'Persistent Memory', desc: 'The Spine stores organizational memory, personal memory, and conversational memory permanently. The memory survives model changes. The memory survives provider changes. The memory grows every day.' },
                { title: 'The Round Trip', desc: 'Data flows in, gets normalized, gets projected, gets acted on, and flows back to the source tool. The round trip is the product.' },
                { title: 'Human in the Loop', desc: 'AI proposes. Human approves. Operator executes. Nothing runs without human approval. This is not a limitation. This is the architecture.' },
                { title: 'Continuity Across Change', desc: 'The model is a variable. The memory is a constant. Change the AI model — the new model inherits all the memory. The user never re-explains.' },
              ].map((item, i) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-xl" style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: 'color-mix(in srgb, var(--forest) 10%, transparent)', color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--ink)' }}>{item.title}</p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* THE ROUND TRIP */}
          <section id="roundtrip">
            <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>THE COMPLETE DATA FLOW</p>
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>The Round Trip</h2>
            <div className="space-y-6">
              {[
                { phase: 'Phase 1', title: 'Inbound — Loader and Normalizer', desc: 'The Loader connects to external tools through APIs, webhooks, MCPs, and connectors. It pulls data in. The Normalizer takes raw data and reformats it into a common shape. One coherent representation regardless of source.' },
                { phase: 'Phase 2', title: 'The Spine — Normalization and Storage', desc: 'All collected data lands in the Spine. Postgres for structured data. Redis for fast lookups. KV for edge state. R2 for objects. D1 for edge SQL. One logical layer across multiple physical providers.' },
                { phase: 'Phase 3', title: 'Projection — Into the Workbenches', desc: 'The Spine projects normalized data into the workbenches. The user sees everything on one surface. No tab switching. No context loss.' },
                { phase: 'Phase 4', title: 'User Action', desc: 'The user works. Modifies data. Adds entries. Approves. Rejects. Prioritizes. This is where human intent meets normalized data.' },
                { phase: 'Phase 5', title: 'Retirement — Back to Tools', desc: 'Modified data retires back to the source tools. A CRM record edited in the workspace goes back to the CRM. Only when the round trip is complete is continuity real.' },
                { phase: 'Phase 6', title: 'Second Run — The Intelligence Loop', desc: 'On the next cycle, the Loader runs again. Picks up all changes. The Spine grows. The memory gets richer. Each cycle adds another layer of organizational knowledge.' },
              ].map(item => (
                <div key={item.phase} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--forest)', color: 'var(--paper)', fontFamily: 'var(--font-mono)' }}>{item.phase.replace('Phase ', '')}</div>
                    <div className="flex-1 w-px my-1" style={{ background: 'var(--rule)' }} />
                  </div>
                  <div className="pb-6">
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--ink)' }}>{item.title}</p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Callout type="rule">Every cycle the Spine grows. Every cycle the AI gets smarter. Every cycle the user has to explain less. The system learns. The memory compounds. The drift stops.</Callout>
          </section>

          {/* SEVEN LAYERS */}
          <section id="layers">
            <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>THE SEVEN LAYERS</p>
            <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>Seven layers. One system.</h2>
            <div className="space-y-3">
              <LayerCard num={1} title="User's Workbench" what="The operational surface where the user works on normalized data from all connected tools. BookStack-like interface for canonical knowledge and operational data." whatUser="Sees normalized data from all connected tools in one view. Modifies records, adds entries, restructures information, prioritizes actions." whatSolves="Tool switching. Instead of opening six tools, the user opens one surface." whatNot="Context reinjection. The User Workbench shows data but does not remember why the user made certain decisions." />
              <LayerCard num={2} title="Cognitive Workbench" what="The knowledge and intelligence surface. Where the organizational brain is visible and operable. An Open WebUI-based interface that is the Spine surface." whatSolves="The absence of organizational memory. Workflows, conversations, evidence, and approval gates live here." />
              <LayerCard num={3} title="Twin Workbench" what="The primary AI operational surface. Where the Twin lives, thinks, and acts. Agent Zero, multi-model orchestration, 148 cognition modules, skill invocation, and function execution." whatSolves="The AI starting cold. Every other AI product gives you a chat window with one model and no memory. The Twin Workbench gives you every model, every skill, every function, complete memory, and full governance." />
              <LayerCard num={4} title="CLAW / Hermes Workbench" what="The operator layer. The execution engine. Takes approved actions from the Twin and executes them across connected tools with governance, error handling, and retry logic." whatSolves="The gap between deciding and doing. The Twin thinks. The user approves. The Operator executes." />
              <LayerCard num={5} title="Personal Memory" what="The user's private memory layer. Individual. Belongs to the user alone. Never intersects with organizational memory." whatSolves="The personalization problem. The Twin understands THIS user, not a generic user." whatNot="Personal Memory never intersects with Organizational Memory. This is a trust boundary, not a feature." />
              <LayerCard num={6} title="Organizational Memory" what="The company-level memory layer. Shared across the team. The institutional knowledge that survives when individuals leave." whatSolves="The institutional memory problem. When a team member leaves, their knowledge leaves with them. Organizational Memory captures all of it. Permanently." />
              <LayerCard num={7} title="Conversational Memory" what="The intermediate layer. The staging area between raw interaction and permanent knowledge. Everything flows here first, then gets promoted to the right permanent layer." whatSolves="The gap between talking and knowing. Every conversation is captured. Important items get promoted. The rest stays available as operational context." />
            </div>
            <div className="mt-6 p-5 rounded-xl" style={{ background: 'color-mix(in srgb, var(--gold) 6%, var(--paper))', border: '1px solid var(--gold)' }}>
              <p className="text-xs font-bold tracking-widest mb-2" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>LAYER 8 — UNDERNEATH</p>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--ink)' }}>Entity Relationship Context</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>The connective tissue. The relational graph that connects every entity to every other entity across all seven layers. Not a user-facing view. The graph that makes all other layers intelligent. Without it, seven layers are seven separate databases. With it, they are one system.</p>
            </div>
          </section>

          {/* 14 COGNITIVE LAYERS */}
          <section id="cognitive">
            <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>THE 14 COGNITIVE LAYERS</p>
            <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>The intelligence capabilities.</h2>
            <div className="space-y-2">
              {[
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
              ].map(item => (
                <div key={item.num} className="flex items-center gap-3 px-4 py-3 rounded-lg" style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}>
                  <div className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold shrink-0" style={{ background: 'var(--forest)', color: 'var(--paper)', fontFamily: 'var(--font-mono)' }}>{item.num}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{item.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TWO PRODUCTS */}
          <section id="products">
            <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>THE TWO PRODUCTS</p>
            <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>Two products. One architecture.</h2>

            {/* Account Success */}
            <div className="mb-8 p-6 rounded-xl" style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}>
              <p className="text-xs font-bold tracking-widest mb-2" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>PRODUCT 1</p>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>Account Success</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>A tool-organistic and platform-organistic system for managing complex relationships across any tool, any role, any industry, and any department. Born from a CSM's need to connect dots that no tool would connect. Built with an architect's discipline. Proven by an $8 million save.</p>
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>THE 15 LAYERS</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {['Account Master', 'People / Team', 'Business Context', 'Strategic Objectives', 'Capabilities', 'Value Streams', 'API Portfolio', 'Platform Health', 'Initiatives', 'Risk Register', 'Stakeholder Outcomes', 'Engagement Log', 'Success Plan', 'Task Manager', 'Generated Insights'].map((layer, i) => (
                  <div key={layer} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: 'var(--paper)', border: '1px solid var(--rule-light)' }}>
                    <span className="font-bold" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ color: 'var(--ink)' }}>{layer}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Intelligence */}
            <div className="p-6 rounded-xl" style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}>
              <p className="text-xs font-bold tracking-widest mb-2" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>PRODUCT 2</p>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>Business Intelligence (Business Ops)</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>A complete operational nervous system for running any organization from one surface. Born from a founder's need to run his own company from one surface. Proven by IntegrateWise running on IntegrateWise.</p>
              <p className="text-xs font-bold tracking-widest mb-3" style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>ALL FUNCTIONAL DEPARTMENTS</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {['Strategy & Leadership', 'Marketing', 'Sales', 'Customer Success', 'Product', 'Engineering', 'Operations', 'Finance', 'Human Resources', 'Legal & Compliance', 'BI / Analytics', 'IT & Infrastructure', 'Partnerships & BD', 'Knowledge Management'].map(dept => (
                  <div key={dept} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: 'var(--paper)', border: '1px solid var(--rule-light)' }}>
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--forest)' }} />
                    <span style={{ color: 'var(--ink)' }}>{dept}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* MEMORY CONTINUITY */}
          <section id="memory">
            <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>MEMORY CONTINUITY</p>
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>The model is a variable. The memory is a constant.</h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
              <p>The memory lives in the Spine. Not in the model. Not in the provider. Not in the session context window. The Spine.</p>
              <p>When the model changes — from GPT-4 to Claude to Gemini to MiMo — the new model inherits all the memory. It does not start cold. It does not need to be told who the user is. The memory was there before it arrived. The memory will be there after it leaves.</p>
              <p>When the provider changes — from OpenRouter to direct API to a new provider — the memory is still there. When the infrastructure changes — VPS rebuilt, containers replaced — the memory survives. The Spine is the constant. Everything else is a variable.</p>
            </div>
            <div className="my-6 grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Never re-inject context', 'AI never drifts', 'Provider changes do not reset', 'Model upgrades do not lose knowledge', 'System gets smarter regardless of model', 'Any AI operates within the memory'].map(item => (
                <div key={item} className="px-4 py-3 rounded-lg text-xs font-medium text-center" style={{ background: 'color-mix(in srgb, var(--forest) 8%, var(--paper))', color: 'var(--forest)', border: '1px solid color-mix(in srgb, var(--forest) 15%, transparent)' }}>{item}</div>
              ))}
            </div>
          </section>

          {/* GOVERNANCE */}
          <section id="governance">
            <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>THE GOVERNANCE MODEL</p>
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>Human in the Loop. Nothing runs without approval.</h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'The Twin suggests', desc: 'Operating on the user\'s full memory and context, the Twin identifies an action, insight, risk, or opportunity and presents it.' },
                { step: '2', title: 'The user reviews', desc: 'In the Cognitive Workbench, the user sees the suggestion along with the evidence. Approve, adjust, reject, or defer.' },
                { step: '3', title: 'The Operator executes', desc: 'If approved, the Operator carries it out. Not through scripts. Intellectually. Understanding what the action means and which tools to touch.' },
                { step: '4', title: 'Results flow back', desc: 'Every execution adds to the memory. Every decision is recorded with full lineage.' },
                { step: '5', title: 'The Spine grows', desc: 'And the next cycle is smarter because of it.' },
              ].map(item => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: 'var(--forest)', color: 'var(--paper)', fontFamily: 'var(--font-mono)' }}>{item.step}</div>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--ink)' }}>{item.title}</p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* INFRASTRUCTURE */}
          <section id="infrastructure">
            <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>THE INFRASTRUCTURE</p>
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>Enterprise-grade by default.</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'VPS Stack', items: ['Hostinger VPS', '5 directories, 4 containers', '3 Docker networks', 'operations.integratewise.ai'] },
                { title: 'Cloudflare', items: ['11 Workers', 'MCP Connector v2.0.0', 'Gateway, Think, Knowledge', 'Normalizer, Billing, Govern'] },
                { title: 'Providers', items: ['OpenRouter (365 models)', 'Google Gemini (direct)', 'Cloudflare Workers AI', 'GitHub Copilot'] },
                { title: 'Security', items: ['Supabase via Worker only', 'Infisical secrets management', 'Docker network isolation', 'CF Access on every call'] },
              ].map(card => (
                <div key={card.title} className="p-5 rounded-xl" style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}>
                  <p className="text-xs font-bold tracking-widest mb-3" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>{card.title.toUpperCase()}</p>
                  <ul className="space-y-1.5">
                    {card.items.map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--ink)' }}>
                        <div className="w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--forest)' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* CONVERGENCE */}
          <section id="convergence">
            <p className="text-xs font-bold tracking-[0.2em] mb-3" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>THE CONVERGENCE</p>
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>Every morning. One surface. The whole company.</h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
              <p>Nirmal opens one surface every morning and operates the company from it. Connected system data is normalized. The Twin carries complete context. The Operator executes approved actions. The Spine grows. The system learns. The user never re-explains. The AI never starts cold. The drift never happens.</p>
              <p>IntegrateWise was born from two roles held by one person. A CSM who was the human API. An architect who designed enterprise integrations. These two experiences converged. The CSM knew what needed to exist. The architect knew how to build it.</p>
              <p>That Spine saved an $8 million account by surfacing context that was scattered across six tools. And in that moment, the problem became universal. Not a CSM problem. An everyone problem.</p>
            </div>
            <Callout type="rule">The human becomes the decision maker. The system becomes the memory. The AI becomes the intelligence. The Operator becomes the executor. The Spine becomes the living record that grows every day. That is IntegrateWise.</Callout>
          </section>

          {/* Footer */}
          <div className="pt-8 text-center" style={{ borderTop: '1px solid var(--rule)' }}>
            <p className="text-xs" style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>IntegrateWise — The Memory-Native Operating System</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>AI that remembers. Systems that learn. Humans that decide.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
