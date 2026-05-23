import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Target,
  BarChart3,
  Users,
  Building2,
  TrendingUp,
  Zap,
  Brain,
  Shield,
  DollarSign,
  Briefcase,
  Scale,
  Network,
  BookOpen,
  Settings,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Layers,
  Globe,
  Sparkles,
  LineChart,
  PieChart,
  Workflow,
  Megaphone,
} from 'lucide-react';

// ─── Department Data ──────────────────────────────────────────────────────────

const departments = [
  {
    name: 'Strategy & Leadership',
    icon: Target,
    description: 'Company vision, OKRs, board communications, and strategic alignment across the organization.',
    color: 'var(--forest)',
  },
  {
    name: 'Marketing',
    icon: Megaphone,
    description: 'Campaigns, content, lead magnets, SEO performance, and brand reach tracking.',
    color: 'var(--gold)',
  },
  {
    name: 'Sales',
    icon: TrendingUp,
    description: 'Pipeline from Discovery to Won, deal tracking, conversion rates, and revenue forecasting.',
    color: 'var(--forest-mid)',
  },
  {
    name: 'Customer Success',
    icon: Users,
    description: 'Account health scores, renewal tracking, QBR preparation, and churn prevention.',
    color: 'var(--forest)',
  },
  {
    name: 'Product',
    icon: Lightbulb,
    description: 'Roadmap management, feature prioritization, user research insights, and product-market fit.',
    color: 'var(--gold)',
  },
  {
    name: 'Engineering',
    icon: Settings,
    description: 'Sprint management, technical debt tracking, deployment health, and engineering velocity.',
    color: 'var(--forest-mid)',
  },
  {
    name: 'Operations',
    icon: Workflow,
    description: 'Process management, resource allocation, vendor management, and operational efficiency.',
    color: 'var(--forest)',
  },
  {
    name: 'Finance',
    icon: DollarSign,
    description: 'MRR/ARR tracking, budget vs actuals, cost analysis, ROI calculations, and financial forecasting.',
    color: 'var(--gold)',
  },
  {
    name: 'Human Resources',
    icon: Users,
    description: 'Team composition, hiring pipeline, onboarding progress, and employee engagement metrics.',
    color: 'var(--forest-mid)',
  },
  {
    name: 'Legal & Compliance',
    icon: Scale,
    description: 'Contract management, compliance status, data governance, and regulatory tracking.',
    color: 'var(--forest)',
  },
  {
    name: 'BI & Analytics',
    icon: BarChart3,
    description: 'Cross-department metrics, trend analysis, predictive insights, and data storytelling.',
    color: 'var(--gold)',
  },
  {
    name: 'IT & Infrastructure',
    icon: Shield,
    description: 'Tool management, integration health, security posture, and infrastructure monitoring.',
    color: 'var(--forest-mid)',
  },
  {
    name: 'Partnerships & BD',
    icon: Network,
    description: 'Partner relationships, co-sell opportunities, ecosystem mapping, and alliance health.',
    color: 'var(--forest)',
  },
  {
    name: 'Knowledge Management',
    icon: BookOpen,
    description: 'Internal documentation, SOPs, training materials, and organizational knowledge base.',
    color: 'var(--gold)',
  },
];

// ─── AI Insight Examples ──────────────────────────────────────────────────────

const aiInsights = [
  {
    alert: 'Marketing spend up 20% but lead quality declined',
    severity: 'warning',
    department: 'Marketing',
    detail: 'Cost per qualified lead increased while conversion rate dropped 8%. Review targeting and content alignment.',
  },
  {
    alert: 'Engineering velocity dropped, 2 seniors at 100% utilization',
    severity: 'critical',
    department: 'Engineering',
    detail: 'Sprint completion rate fell from 92% to 74% over 3 weeks. Risk of delayed product milestones.',
  },
  {
    alert: 'Two departments at risk of missing quarterly targets',
    severity: 'warning',
    department: 'Leadership',
    detail: 'Sales pipeline coverage and CS NRR trending below target. Recommend cross-functional alignment meeting.',
  },
  {
    alert: 'Tool costing more than value delivered this quarter',
    severity: 'info',
    department: 'Operations',
    detail: 'Annual contract renewal in 45 days. Usage down 40% since last quarter. Evaluate alternatives or renegotiate.',
  },
  {
    alert: 'CS has 3 at-risk accounts = 40% of quarterly renewal value',
    severity: 'critical',
    department: 'Customer Success',
    detail: 'Combined ARR at risk: $1.2M. All three accounts show declining engagement over 60 days.',
  },
];

// ─── Scaling Data ─────────────────────────────────────────────────────────────

const scalingRoles = [
  { label: 'CEO / Founder', description: 'Full company view on one screen' },
  { label: 'COO', description: 'Operational efficiency and process health' },
  { label: 'VP Sales', description: 'Pipeline, forecasting, and rep performance' },
  { label: 'VP Marketing', description: 'Campaign ROI and lead funnel metrics' },
  { label: 'CFO', description: 'Budget tracking, burn rate, and financial health' },
  { label: 'VP Engineering', description: 'Velocity, tech debt, and deployment status' },
];

const scalingIndustries = [
  { label: 'SaaS', description: 'MRR, churn, NRR, and expansion revenue' },
  { label: 'Professional Services', description: 'Utilization, project margins, and delivery' },
  { label: 'E-commerce', description: 'Inventory, fulfillment, and customer LTV' },
  { label: 'Manufacturing', description: 'Supply chain, production, and quality' },
  { label: 'Healthcare', description: 'Compliance, patient outcomes, and operations' },
  { label: 'Fintech', description: 'Regulatory, risk metrics, and growth' },
];

const scalingUseCases = [
  { label: 'Board Reporting', description: 'Auto-generated board decks from live data' },
  { label: 'Quarterly Planning', description: 'Cross-department OKR alignment' },
  { label: 'Investor Updates', description: 'Automated financial and growth summaries' },
  { label: 'Risk Management', description: 'Early warning signals across all departments' },
  { label: 'M&A Integration', description: 'Post-merger operational consolidation' },
  { label: 'Remote Leadership', description: 'Manage distributed teams from one surface' },
];

// ─── Helper Components ────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 16px',
        borderRadius: '999px',
        background: 'rgba(7, 94, 84, 0.08)',
        color: 'var(--forest)',
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase' as const,
        marginBottom: '24px',
      }}
    >
      {children}
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    critical: { bg: 'rgba(139, 32, 32, 0.1)', text: 'var(--red)' },
    warning: { bg: 'rgba(184, 148, 63, 0.1)', text: 'var(--gold)' },
    info: { bg: 'var(--primary-soft)', text: 'var(--forest)' },
  };
  const c = colors[severity] || colors.info;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 10px',
        borderRadius: '999px',
        background: c.bg,
        color: c.text,
        fontSize: '11px',
        fontWeight: 600,
        fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05em',
      }}
    >
      {severity === 'critical' ? (
        <AlertTriangle style={{ width: 12, height: 12 }} />
      ) : severity === 'warning' ? (
        <AlertTriangle style={{ width: 12, height: 12 }} />
      ) : (
        <Lightbulb style={{ width: 12, height: 12 }} />
      )}
      {severity}
    </span>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export function BusinessIntelligencePage() {
  const [hoveredDept, setHoveredDept] = useState<number | null>(null);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--paper)',
        color: 'var(--text-color)',
      }}
    >
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '120px 40px 80px',
          maxWidth: '960px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>Business Intelligence</SectionLabel>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.15,
              color: 'var(--ink)',
              margin: '0 0 24px',
            }}
          >
            Run your company from one surface.{' '}
            <span style={{ color: 'var(--forest)' }}>Every department.</span>{' '}
            Every metric.{' '}
            <span style={{ color: 'var(--gold)' }}>Every decision.</span>
          </h1>

          <p
            style={{
              fontSize: '20px',
              lineHeight: 1.6,
              color: 'var(--text-muted)',
              maxWidth: '700px',
              margin: '0 auto 40px',
            }}
          >
            14 departments. One nervous system. IntegrateWise connects every
            team, every metric, and every decision into a single operational
            surface — powered by the Adaptive Spine.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                borderRadius: '12px',
                background: 'var(--forest)',
                color: 'var(--paper)',
                border: 'none',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--font-serif)',
              }}
            >
              Request a demo
              <ArrowRight style={{ width: 18, height: 18 }} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                borderRadius: '12px',
                background: 'var(--surface-raised)',
                color: 'var(--text-color)',
                border: '1px solid var(--border-subtle)',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--font-serif)',
              }}
            >
              Explore departments
              <Layers style={{ width: 18, height: 18 }} />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ─── Problem ──────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '80px 40px',
          background: 'var(--ink)',
          color: 'var(--paper)',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '999px',
                background: 'rgba(139, 32, 32, 0.15)',
                color: 'var(--gold-light)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                marginBottom: '24px',
              }}
            >
              <AlertTriangle style={{ width: 14, height: 14 }} />
              The Problem
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 700,
                lineHeight: 1.2,
                margin: '0 0 24px',
              }}
            >
              Your company runs on 20 tools.{' '}
              <span style={{ opacity: 0.6 }}>You connect them all. Manually.</span>
            </h2>

            <p
              style={{
                fontSize: '18px',
                lineHeight: 1.6,
                color: 'rgba(244,240,232,0.65)',
                maxWidth: '640px',
                margin: '0 auto',
              }}
            >
              Spreadsheets, dashboards, Slack messages, Notion pages, CRM
              fields — you copy data between systems, reconcile conflicting
              numbers, and still don't have a single source of truth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Solution ─────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '80px 40px',
          background: 'var(--paper-warm)',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>
              <Zap style={{ width: 14, height: 14 }} />
              The Solution
            </SectionLabel>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 700,
                lineHeight: 1.2,
                color: 'var(--ink)',
                margin: '0 0 24px',
              }}
            >
              One operational nervous system.{' '}
              <span style={{ color: 'var(--forest)' }}>Every department connected.</span>
            </h2>

            <p
              style={{
                fontSize: '18px',
                lineHeight: 1.6,
                color: 'var(--text-muted)',
                maxWidth: '640px',
                margin: '0 auto',
              }}
            >
              The Adaptive Spine hydrates every department with unified context.
              AI reasons across all signals. Every action goes through governance.
              One surface. One truth. One intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── All Departments ──────────────────────────────────────────── */}
      <section
        id="departments"
        style={{
          padding: '80px 40px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <SectionLabel>
            <Building2 style={{ width: 14, height: 14 }} />
            All Departments
          </SectionLabel>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              color: 'var(--ink)',
              margin: '0 0 16px',
            }}
          >
            Every team. One surface.
          </h2>

          <p
            style={{
              fontSize: '18px',
              color: 'var(--text-muted)',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            14 departments connected through the Adaptive Spine. Each with
            their own context, metrics, and AI-powered insights.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {departments.map((dept, i) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                onMouseEnter={() => setHoveredDept(i)}
                onMouseLeave={() => setHoveredDept(null)}
                style={{
                  padding: '28px',
                  borderRadius: '16px',
                  background: hoveredDept === i ? 'var(--surface-raised)' : 'var(--paper)',
                  border: `1px solid ${hoveredDept === i ? 'var(--forest)' : 'var(--border-subtle)'}`,
                  transition: 'all 0.2s ease',
                  cursor: 'default',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: `${dept.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <Icon style={{ width: 22, height: 22, color: dept.color }} />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '17px',
                    fontWeight: 700,
                    color: 'var(--ink)',
                    margin: '0 0 8px',
                  }}
                >
                  {dept.name}
                </h3>

                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.55,
                    color: 'var(--text-muted)',
                    margin: 0,
                  }}
                >
                  {dept.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── Goals & Milestones ───────────────────────────────────────── */}
      <section
        style={{
          padding: '80px 40px',
          background: 'var(--paper-deep)',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>
              <Target style={{ width: 14, height: 14 }} />
              Goals & Milestones
            </SectionLabel>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 700,
                lineHeight: 1.2,
                color: 'var(--ink)',
                margin: '0 0 24px',
              }}
            >
              It starts with intent.{' '}
              <span style={{ color: 'var(--forest)' }}>Not data.</span>
            </h2>

            <p
              style={{
                fontSize: '18px',
                lineHeight: 1.6,
                color: 'var(--text-muted)',
                maxWidth: '640px',
                margin: '0 auto 48px',
              }}
            >
              Define what success looks like. IntegrateWise tracks every
              department's progress toward those goals — automatically.
              Milestones update as teams execute. AI surfaces blockers before
              they become problems.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
              }}
            >
              {[
                { icon: Target, title: 'Set OKRs', desc: 'Define objectives at company, department, and team level' },
                { icon: LineChart, title: 'Track Progress', desc: 'Real-time progress bars powered by department data' },
                { icon: Brain, title: 'AI Analysis', desc: 'Identify risks and opportunities before they impact targets' },
                { icon: CheckCircle, title: 'Achieve Goals', desc: 'Celebrate wins and learn from misses, together' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    style={{
                      padding: '24px',
                      borderRadius: '16px',
                      background: 'var(--surface-raised)',
                      border: '1px solid var(--border-subtle)',
                      textAlign: 'left',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'var(--primary-soft)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '14px',
                      }}
                    >
                      <Icon style={{ width: 20, height: 20, color: 'var(--forest)' }} />
                    </div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '16px',
                        fontWeight: 700,
                        color: 'var(--ink)',
                        margin: '0 0 6px',
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        fontSize: '13px',
                        lineHeight: 1.5,
                        color: 'var(--text-muted)',
                        margin: 0,
                      }}
                    >
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── AI Insights ──────────────────────────────────────────────── */}
      <section
        style={{
          padding: '80px 40px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <SectionLabel>
            <Sparkles style={{ width: 14, height: 14 }} />
            AI Insights
          </SectionLabel>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              color: 'var(--ink)',
              margin: '0 0 16px',
            }}
          >
            AI that sees what you miss.
          </h2>

          <p
            style={{
              fontSize: '18px',
              color: 'var(--text-muted)',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Context-aware insights across all 14 departments. Not dashboards —
            intelligence that surfaces what matters, when it matters.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
          {aiInsights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                padding: '24px 28px',
                borderRadius: '14px',
                background: 'var(--surface-raised)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '10px',
                  flexWrap: 'wrap',
                }}
              >
                <SeverityBadge severity={insight.severity} />
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--text-faint)',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.05em',
                  }}
                >
                  {insight.department}
                </span>
              </div>

              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  margin: '0 0 6px',
                  lineHeight: 1.4,
                }}
              >
                {insight.alert}
              </p>

              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {insight.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Dogfood ──────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '80px 40px',
          background: 'var(--forest)',
          color: 'var(--paper)',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '999px',
                background: 'rgba(244,240,232,0.12)',
                color: 'rgba(244,240,232,0.85)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                marginBottom: '24px',
              }}
            >
              <Globe style={{ width: 14, height: 14 }} />
              We Use It Ourselves
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 700,
                lineHeight: 1.2,
                margin: '0 0 24px',
              }}
            >
              IntegrateWise runs on IntegrateWise.
            </h2>

            <p
              style={{
                fontSize: '18px',
                lineHeight: 1.6,
                color: 'rgba(244,240,232,0.75)',
                maxWidth: '640px',
                margin: '0 auto',
              }}
            >
              We're our own most demanding customer. Every department at
              IntegrateWise operates on the same surface we're offering you.
              Our engineering sprints, sales pipeline, marketing campaigns, and
              financial forecasts all flow through the Adaptive Spine.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Scaling ──────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '80px 40px',
          background: 'var(--paper-warm)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '56px' }}
          >
            <SectionLabel>
              <Globe style={{ width: 14, height: 14 }} />
              Scaling
            </SectionLabel>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 700,
                color: 'var(--ink)',
                margin: '0 0 16px',
              }}
            >
              Built for every role, industry, and use case.
            </h2>

            <p
              style={{
                fontSize: '18px',
                color: 'var(--text-muted)',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Whether you're a 10-person startup or a 10,000-person enterprise,
              IntegrateWise adapts to your structure.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
            }}
          >
            {/* By Role */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  margin: '0 0 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Briefcase style={{ width: 18, height: 18, color: 'var(--forest)' }} />
                By Role
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {scalingRoles.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '12px',
                      background: 'var(--surface-raised)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: '14px',
                        color: 'var(--ink)',
                        marginBottom: '4px',
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        color: 'var(--text-muted)',
                        lineHeight: 1.4,
                      }}
                    >
                      {item.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* By Industry */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  margin: '0 0 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Building2 style={{ width: 18, height: 18, color: 'var(--gold)' }} />
                By Industry
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {scalingIndustries.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '12px',
                      background: 'var(--surface-raised)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: '14px',
                        color: 'var(--ink)',
                        marginBottom: '4px',
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        color: 'var(--text-muted)',
                        lineHeight: 1.4,
                      }}
                    >
                      {item.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* By Use Case */}
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--ink)',
                  margin: '0 0 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <PieChart style={{ width: 18, height: 18, color: 'var(--forest-mid)' }} />
                By Use Case
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {scalingUseCases.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '12px',
                      background: 'var(--surface-raised)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: '14px',
                        color: 'var(--ink)',
                        marginBottom: '4px',
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: '13px',
                        color: 'var(--text-muted)',
                        lineHeight: 1.4,
                      }}
                    >
                      {item.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '100px 40px',
          background: `linear-gradient(135deg, var(--ink) 0%, var(--forest) 100%)`,
          color: 'var(--paper)',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(32px, 5vw, 52px)',
                fontWeight: 700,
                lineHeight: 1.15,
                margin: '0 0 20px',
              }}
            >
              Your company on one screen.
            </h2>

            <p
              style={{
                fontSize: '18px',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '520px',
                margin: '0 auto 40px',
              }}
            >
              14 departments. One nervous system. Every metric connected. Every
              decision informed.
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 40px',
                borderRadius: '14px',
                background: 'var(--paper)',
                color: 'var(--forest)',
                border: 'none',
                fontSize: '18px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'var(--font-serif)',
              }}
            >
              Request a demo
              <ArrowRight style={{ width: 20, height: 20 }} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────────────── */}
      <footer
        style={{
          padding: '40px',
          textAlign: 'center',
          borderTop: '1px solid var(--rule)',
        }}
      >
        <p
          style={{
            fontSize: '13px',
            color: 'var(--text-faint)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          © 2026 IntegrateWise. Context before Intelligence. Governance before Execution.
        </p>
      </footer>
    </div>
  );
}
