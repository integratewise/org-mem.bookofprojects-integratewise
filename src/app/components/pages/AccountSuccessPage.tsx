import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Layers,
  Database,
  Users,
  Shield,
  Globe,
  Activity,
  Zap,
  Brain,
  GitBranch,
  Sparkles,
  Server,
  RefreshCw,
  Heart,
  Building2,
  BarChart3,
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Target,
  TrendingUp,
  Network,
  Eye,
  Lock,
  Workflow,
} from 'lucide-react';

const sections = [
  { id: 'hero', label: 'Overview', icon: Layers },
  { id: 'problem', label: 'The Problem', icon: AlertTriangle },
  { id: 'solution', label: 'The Solution', icon: Sparkles },
  { id: 'layers', label: '15 Layers', icon: Database },
  { id: 'graph', label: 'Intelligence Graph', icon: Network },
  { id: 'roles', label: 'Who It Is For', icon: Users },
  { id: 'ai', label: 'Proactive AI', icon: Brain },
  { id: 'proof', label: 'Proof', icon: TrendingUp },
  { id: 'cta', label: 'Get Started', icon: Zap },
];

function SectionNav({ active }: { active: string }) {
  return (
    <nav
      className="hidden lg:block fixed left-0 top-0 h-screen w-56 pt-20 pb-8 px-4 overflow-y-auto"
      style={{ background: 'var(--paper-warm)', borderRight: '1px solid var(--rule)' }}
    >
      <p
        className="text-[10px] font-bold tracking-[0.2em] mb-4"
        style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}
      >
        ACCOUNT SUCCESS
      </p>
      <div className="space-y-1">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              active === s.id ? 'font-semibold' : ''
            }`}
            style={{
              background: active === s.id ? 'var(--forest)' : 'transparent',
              color: active === s.id ? 'var(--paper)' : 'var(--text-muted)',
            }}
          >
            <s.icon className="w-3.5 h-3.5" />
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Callout({
  children,
  type = 'insight',
}: {
  children: React.ReactNode;
  type?: 'insight' | 'warning' | 'rule';
}) {
  const colors: Record<string, { bg: string; border: string; text: string }> = {
    insight: {
      bg: 'color-mix(in srgb, var(--gold) 6%, var(--paper))',
      border: 'var(--gold)',
      text: 'var(--ink)',
    },
    warning: {
      bg: 'color-mix(in srgb, var(--risk) 8%, var(--paper))',
      border: 'var(--risk)',
      text: 'var(--ink)',
    },
    rule: {
      bg: 'color-mix(in srgb, var(--forest) 6%, var(--paper))',
      border: 'var(--forest)',
      text: 'var(--ink)',
    },
  };
  const c = colors[type];
  return (
    <div
      className="my-6 px-5 py-4 rounded-xl"
      style={{ background: c.bg, borderLeft: `3px solid ${c.border}` }}
    >
      <p
        className="text-sm leading-relaxed"
        style={{ color: c.text, fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}
      >
        {children}
      </p>
    </div>
  );
}

function LayerCard({
  num,
  title,
  description,
}: {
  num: number;
  title: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{ background: 'var(--forest)', color: 'var(--paper)', fontFamily: 'var(--font-mono)' }}
          >
            {String(num).padStart(2, '0')}
          </div>
          <span className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            {title}
          </span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
        ) : (
          <ChevronDown className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5" style={{ borderTop: '1px solid var(--border-subtle)' }}>
              <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const fifteenLayers = [
  {
    num: 1,
    title: 'Account Master',
    description:
      'The canonical identity of the account. Company name, domains, subsidiaries, hierarchy, ownership, lifecycle stage. One source of truth for who the customer is.',
  },
  {
    num: 2,
    title: 'People / Team',
    description:
      'Every stakeholder mapped by role, influence, sentiment, and relationship strength. Org charts, reporting lines, decision makers, champions, and detractors — all in one view.',
  },
  {
    num: 3,
    title: 'Business Context',
    description:
      'Industry, company size, revenue, funding stage, growth trajectory, competitive landscape. The business reality that shapes every decision and conversation.',
  },
  {
    num: 4,
    title: 'Strategic Objectives',
    description:
      'What the customer is trying to achieve this quarter, this year, this cycle. OKRs, digital transformation goals, cost reduction targets, expansion plans — connected to every interaction.',
  },
  {
    num: 5,
    title: 'Capabilities',
    description:
      'What the customer has deployed, what is in trial, what is planned. Feature adoption, usage depth, integration maturity, and capability gaps that create opportunity.',
  },
  {
    num: 6,
    title: 'Value Streams',
    description:
      'The business processes the customer runs on your platform. Revenue impact, cost savings, efficiency gains — quantified and tracked per value stream.',
  },
  {
    num: 7,
    title: 'API Portfolio',
    description:
      'Every API endpoint the customer uses. Call volumes, error rates, latency trends, deprecation risks. The technical health of the integration layer.',
  },
  {
    num: 8,
    title: 'Platform Health',
    description:
      'Uptime, incidents, support tickets, performance metrics, and SLA compliance. The operational pulse of the account — real-time and historical.',
  },
  {
    num: 9,
    title: 'Initiatives',
    description:
      'Active projects, migrations, rollouts, and experiments. Timelines, owners, blockers, dependencies, and progress — all linked to the account context.',
  },
  {
    num: 10,
    title: 'Risk Register',
    description:
      'Churn risk, competitive displacement, executive turnover, budget cuts, technical debt. Every risk identified, scored, and tracked with mitigation actions.',
  },
  {
    num: 11,
    title: 'Stakeholder Outcomes',
    description:
      'What each stakeholder personally needs to succeed. Career goals, political pressures, success metrics — the human layer beneath the business layer.',
  },
  {
    num: 12,
    title: 'Engagement Log',
    description:
      'Every meeting, email, Slack thread, support ticket, and call — normalized and searchable. The complete interaction history without the tool fragmentation.',
  },
  {
    num: 13,
    title: 'Success Plan',
    description:
      'The living playbook for this account. Milestones, health metrics, renewal timeline, expansion roadmap, and the next best action — always current.',
  },
  {
    num: 14,
    title: 'Task Manager',
    description:
      'Open actions, deadlines, owners, and dependencies. Cross-functional tasks that span CS, engineering, sales, and support — all in one place.',
  },
  {
    num: 15,
    title: 'Generated Insights',
    description:
      'AI-surfaced patterns, anomalies, recommendations, and predictions. Not dashboards. Intelligence that emerges from the intersection of all 14 layers.',
  },
];

const roles = [
  {
    title: 'CSMs',
    description: 'Health scores, renewal timelines, QBR prep, expansion signals',
    icon: Heart,
  },
  {
    title: 'TAMs',
    description: 'Technical details, API health, integration status, platform stability',
    icon: Server,
  },
  {
    title: 'AEs',
    description: 'Pipeline visibility, deal progression, stakeholder mapping, competitive intel',
    icon: BarChart3,
  },
  {
    title: 'Solutions Architects',
    description: 'Implementation status, capability gaps, technical architecture, migration paths',
    icon: GitBranch,
  },
  {
    title: 'Support Managers',
    description: 'Escalation patterns, resolution timelines, recurring issues, SLA compliance',
    icon: Shield,
  },
  {
    title: 'BD Leads',
    description: 'Partnership health, co-sell opportunities, strategic alignment, market signals',
    icon: Briefcase,
  },
  {
    title: 'Leadership',
    description: 'Portfolio-level visibility, risk overview, revenue forecasting, team performance',
    icon: Eye,
  },
];

const industries = [
  { title: 'Tech', icon: Globe },
  { title: 'FinServ', icon: Lock },
  { title: 'Healthcare', icon: Heart },
  { title: 'Manufacturing', icon: Workflow },
  { title: 'Pro Services', icon: Users },
];

const proactiveInsights = [
  {
    title: 'Renewal Risk Alert',
    description: 'Acme Corp renewal in 45 days. Usage dropped 30% this quarter. Champion left last month. New stakeholder has not been engaged. Recommend immediate outreach.',
    severity: 'high',
    icon: AlertTriangle,
  },
  {
    title: 'Expansion Opportunity',
    description: 'Banks & Co. API calls grew 3x in 60 days on Tier 1 plan. Usage patterns suggest they need Tier 2. Three team members requested features only available on higher tier.',
    severity: 'opportunity',
    icon: TrendingUp,
  },
  {
    title: 'Stakeholder Change Detected',
    description: 'GlobalTech CTO changed. New CTO came from a competitor. Three of their internal projects reference competitor capabilities. Risk of competitive displacement.',
    severity: 'warning',
    icon: Users,
  },
  {
    title: 'QBR Preparation Ready',
    description: 'Meridian QBR is in 12 days. All 15 layers have been updated within the last week. Three success metrics exceeded targets. One risk item needs attention.',
    severity: 'ready',
    icon: CheckCircle2,
  },
  {
    title: 'Cross-Account Pattern',
    description: 'Four accounts in the same vertical showed the same usage spike pattern this month. All four are mid-market. This appears to be a seasonal pattern, not organic growth.',
    severity: 'insight',
    icon: Brain,
  },
  {
    title: 'SLA Breach Imminent',
    description: 'Pinnacle Inc has 2 open P1 tickets past 48-hour SLA. Engineering has not responded. TAM is on PTO. Escalation path is unclear. Immediate action needed.',
    severity: 'critical',
    icon: Clock,
  },
];

export function AccountSuccessPage() {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <div className="flex min-h-screen">
      <SectionNav active={activeSection} />

      <main className="flex-1 lg:ml-56">
        {/* Hero */}
        <section
          id="hero"
          className="relative py-20 px-6 lg:px-16 overflow-hidden"
          style={{ background: 'var(--forest)' }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div
              className="absolute top-0 right-0 w-96 h-96 rounded-full"
              style={{ background: 'var(--gold)', filter: 'blur(120px)' }}
            />
            <div
              className="absolute bottom-0 left-0 w-64 h-64 rounded-full"
              style={{ background: 'var(--gold)', filter: 'blur(100px)' }}
            />
          </div>
          <div className="relative z-10 max-w-3xl">
            <p
              className="text-xs font-bold tracking-[0.2em] mb-4"
              style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}
            >
              INTEGRATEWISE — ACCOUNT SUCCESS
            </p>
            <h1
              className="text-4xl lg:text-5xl font-bold leading-tight mb-6"
              style={{ color: 'var(--paper)', fontFamily: 'var(--font-serif)' }}
            >
              Every account detail. Every conversation. Every decision. Remembered.
            </h1>
            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: 'var(--paper)', opacity: 0.8 }}
            >
              Fifteen layers of account intelligence. One persistent memory. AI that never forgets a single detail about any customer, any stakeholder, any interaction.
            </p>
            <button
              className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
              style={{ background: 'var(--gold)', color: 'var(--forest)' }}
            >
              Request a demo
            </button>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-6 lg:px-16 py-16 space-y-24">
          {/* The Problem */}
          <section id="problem">
            <p
              className="text-[10px] font-bold tracking-[0.2em] mb-3"
              style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}
            >
              THE PROBLEM
            </p>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}
            >
              You are the memory. We are building the machine.
            </h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
              <p>
                Every CSM knows the feeling. You open six tools before 9 AM. CRM for the account overview. Support desk for the latest tickets. Slack for the internal threads. Documentation for the technical details. Spreadsheet for the QBR data. Email for the stakeholder conversations. By the time you have the full picture, you have lost an hour.
              </p>
              <p>
                And then the AI forgets. Every 30 minutes, the context resets. Every new session, you re-explain who the customer is, what they care about, what changed last week, and why that one metric matters. You become the integration layer between your tools and your AI. You become the memory.
              </p>
              <p>
                This is not a tooling problem. This is an architecture problem. Every existing tool — CRM, support desk, communication platform, project management — solves one slice of the account. None of them connect the slices. The human holds the full picture, and when the human leaves, the picture leaves with them.
              </p>
            </div>
            <Callout type="warning">
              The average CSM manages 25–40 accounts across 5–6 tools. The context switching tax alone costs 2 hours per day. The re-explanation tax to AI costs another hour. That is 15 hours per week of non-value-added work — per person.
            </Callout>
          </section>

          {/* The Solution */}
          <section id="solution">
            <p
              className="text-[10px] font-bold tracking-[0.2em] mb-3"
              style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}
            >
              THE SOLUTION
            </p>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}
            >
              One customer view. Persistent AI memory. The round trip.
            </h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
              <p>
                Account Success is a 15-layer intelligence system for managing complex customer relationships. Every layer captures a different dimension of the account. Together, they form one living record that AI reads from and writes to — permanently.
              </p>
              <p>
                The Loader pulls data from your CRM, support desk, communication platform, and every other tool you use. The Normalizer transforms it into a common shape. The Spine stores it in 15 structured layers. And the AI — which has never lost context, never started cold, and never forgotten a single detail — gives you the intelligence you need before you ask for it.
              </p>
            </div>

            <div className="my-8 grid grid-cols-2 gap-3">
              {[
                'One view per account',
                '15 structured layers',
                'Persistent AI memory',
                'Cross-tool normalization',
                'Proactive intelligence',
                'Human-in-the-loop governance',
              ].map((item) => (
                <div
                  key={item}
                  className="px-4 py-3 rounded-lg text-xs font-medium text-center"
                  style={{
                    background: 'color-mix(in srgb, var(--forest) 8%, var(--paper))',
                    color: 'var(--forest)',
                    border: '1px solid color-mix(in srgb, var(--forest) 15%, transparent)',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <Callout type="rule">
              The round trip is the product. Data flows in from your tools, gets normalized into 15 layers, gets acted on by AI and humans, and flows back to the source tools. Continuity without the chaos.
            </Callout>
          </section>

          {/* 15 Layers */}
          <section id="layers">
            <p
              className="text-[10px] font-bold tracking-[0.2em] mb-3"
              style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}
            >
              THE 15 LAYERS
            </p>
            <h2
              className="text-3xl font-bold mb-8"
              style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}
            >
              Fifteen layers of account intelligence.
            </h2>
            <div className="space-y-3">
              {fifteenLayers.map((layer) => (
                <LayerCard
                  key={layer.num}
                  num={layer.num}
                  title={layer.title}
                  description={layer.description}
                />
              ))}
            </div>
          </section>

          {/* Intelligence Graph */}
          <section id="graph">
            <p
              className="text-[10px] font-bold tracking-[0.2em] mb-3"
              style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}
            >
              THE INTELLIGENCE GRAPH
            </p>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}
            >
              Not fifteen tables. One living intelligence graph.
            </h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
              <p>
                The 15 layers are not independent silos. Every entity in every layer is connected to every other entity through a living graph. A stakeholder is connected to the initiatives they own, the risks they are exposed to, the outcomes they need, and the engagements they participate in.
              </p>
              <p>
                When the AI reads this account, it does not read 15 tables. It reads one connected intelligence graph where every node has context from every other node. This is why the AI can surface insights that no human could surface manually — because the graph connects dots that live in different tools, different teams, and different timeframes.
              </p>
            </div>

            <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { title: 'Connected Entities', desc: 'Every stakeholder, initiative, risk, and outcome linked across layers' },
                { title: 'Temporal Context', desc: 'How the account evolved over time — not just the current snapshot' },
                { title: 'Cross-Layer Intelligence', desc: 'Insights that emerge from the intersection of multiple layers' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-xl"
                  style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)' }}
                >
                  <p
                    className="text-[10px] font-bold tracking-widest mb-2"
                    style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}
                  >
                    {item.title.toUpperCase()}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <Callout type="insight">
              The graph is what makes Account Success different from a dashboard. A dashboard shows you data. The graph shows you relationships, patterns, and predictions that no static view could surface.
            </Callout>
          </section>

          {/* Who It Is For */}
          <section id="roles">
            <p
              className="text-[10px] font-bold tracking-[0.2em] mb-3"
              style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}
            >
              WHO IT IS FOR
            </p>
            <h2
              className="text-3xl font-bold mb-8"
              style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}
            >
              Built for every role that manages relationships.
            </h2>

            <div className="space-y-3 mb-8">
              {roles.map((role) => (
                <div
                  key={role.title}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)' }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'var(--forest)', color: 'var(--paper)' }}
                  >
                    <role.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                      {role.title}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {role.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p
              className="text-[10px] font-bold tracking-[0.2em] mb-3"
              style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}
            >
              ACROSS EVERY INDUSTRY
            </p>
            <div className="flex flex-wrap gap-3">
              {industries.map((industry) => (
                <div
                  key={industry.title}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
                  style={{
                    background: 'color-mix(in srgb, var(--forest) 6%, var(--paper))',
                    border: '1px solid color-mix(in srgb, var(--forest) 12%, transparent)',
                    color: 'var(--ink)',
                  }}
                >
                  <industry.icon className="w-4 h-4" style={{ color: 'var(--forest)' }} />
                  {industry.title}
                </div>
              ))}
            </div>
          </section>

          {/* Proactive AI */}
          <section id="ai">
            <p
              className="text-[10px] font-bold tracking-[0.2em] mb-3"
              style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}
            >
              PROACTIVE AI
            </p>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}
            >
              AI that tells you what you need to know before you ask.
            </h2>
            <div className="space-y-4 text-sm leading-relaxed mb-8" style={{ color: 'var(--ink)' }}>
              <p>
                Because the AI has read all 15 layers and the intelligence graph connecting them, it surfaces insights that no dashboard could produce. Not reactive alerts. Proactive intelligence that connects dots across tools, teams, and timeframes.
              </p>
            </div>

            <div className="space-y-4">
              {proactiveInsights.map((insight) => {
                const severityColors: Record<string, { bg: string; border: string; label: string }> = {
                  high: {
                    bg: 'color-mix(in srgb, var(--risk, var(--red)) 6%, var(--paper))',
                    border: 'var(--risk, var(--red))',
                    label: 'HIGH RISK',
                  },
                  opportunity: {
                    bg: 'color-mix(in srgb, var(--forest) 6%, var(--paper))',
                    border: 'var(--forest)',
                    label: 'OPPORTUNITY',
                  },
                  warning: {
                    bg: 'color-mix(in srgb, var(--gold) 8%, var(--paper))',
                    border: 'var(--gold)',
                    label: 'WARNING',
                  },
                  ready: {
                    bg: 'color-mix(in srgb, var(--forest) 4%, var(--paper))',
                    border: 'var(--forest)',
                    label: 'READY',
                  },
                  insight: {
                    bg: 'color-mix(in srgb, var(--forest) 4%, var(--paper))',
                    border: 'var(--forest)',
                    label: 'INSIGHT',
                  },
                  critical: {
                    bg: 'color-mix(in srgb, var(--risk, var(--red)) 8%, var(--paper))',
                    border: 'var(--risk, var(--red))',
                    label: 'CRITICAL',
                  },
                };
                const s = severityColors[insight.severity] || severityColors.insight;
                return (
                  <div
                    key={insight.title}
                    className="p-5 rounded-xl"
                    style={{ background: s.bg, borderLeft: `3px solid ${s.border}` }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <insight.icon className="w-4 h-4" style={{ color: s.border }} />
                      <p
                        className="text-[10px] font-bold tracking-widest"
                        style={{ color: s.border, fontFamily: 'var(--font-mono)' }}
                      >
                        {s.label}
                      </p>
                    </div>
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--ink)' }}>
                      {insight.title}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {insight.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <Callout type="insight">
              These are not hypothetical examples. Every one of these insights is generated by connecting data across at least 5 of the 15 layers. No single tool could produce any of them alone.
            </Callout>
          </section>

          {/* Proof */}
          <section id="proof">
            <p
              className="text-[10px] font-bold tracking-[0.2em] mb-3"
              style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}
            >
              THE PROOF
            </p>
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}
            >
              $8 million saved. One account. One Spine.
            </h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
              <p>
                An account was marked red. The CRM said churn risk. The support desk said ticket volume was up. The communication platform had fragments of concern. But no single tool had the full picture.
              </p>
              <p>
                Because the Spine connected dots across all tools — the usage data, the support patterns, the stakeholder conversations, the technical health metrics, the strategic objectives — the full picture emerged. The account was not at risk. The account was in transition. And that transition was an $8 million expansion opportunity hiding in plain sight.
              </p>
              <p>
                The Spine surfaced the context. The AI connected the dots. The CSM made the call. $8 million saved — not by working harder, but by having the complete picture when no one else did.
              </p>
            </div>

            <div
              className="my-8 p-8 rounded-xl text-center"
              style={{ background: 'var(--forest)' }}
            >
              <p
                className="text-5xl font-bold mb-2"
                style={{ color: 'var(--gold)', fontFamily: 'var(--font-serif)' }}
              >
                $8M
              </p>
              <p className="text-sm" style={{ color: 'var(--paper)', opacity: 0.8 }}>
                Saved by connecting context that six tools kept separate
              </p>
            </div>

            <Callout type="rule">
              This is not a feature story. This is what happens when you give a human the complete picture instead of fragments. The $8 million was always there. The tools just could not see it. The Spine could.
            </Callout>
          </section>

          {/* CTA */}
          <section id="cta">
            <div
              className="p-8 rounded-xl text-center"
              style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-subtle)' }}
            >
              <p
                className="text-3xl font-bold mb-4"
                style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}
              >
                Stop rebuilding context every morning.
              </p>
              <p className="text-sm mb-8 max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
                Your accounts deserve better than six disconnected tools and an AI that forgets every thirty minutes.
              </p>
              <button
                className="px-8 py-4 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'var(--gold)', color: 'var(--forest)' }}
              >
                Request a demo
              </button>
            </div>
          </section>

          {/* Footer */}
          <div className="pt-8 text-center" style={{ borderTop: '1px solid var(--rule)' }}>
            <p
              className="text-xs"
              style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}
            >
              IntegrateWise — Account Success
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>
              Fifteen layers. One memory. Every detail. Remembered.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
