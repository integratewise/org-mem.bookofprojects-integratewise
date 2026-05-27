'use client';
import React, { useState } from 'react';
import { Brain, AlertTriangle, TrendingUp, TrendingDown, Lightbulb, CheckCircle, MessageSquare, X, Clock } from 'lucide-react';

const C = {
  forest: '#1A3A2A',
  paper: '#F4F0E8',
  gold: '#B8943F',
  goldLight: '#F5E6C8',
  white: '#FFFFFF',
  red: '#C0392B',
  orange: '#E67E22',
  green: '#27AE60',
  muted: '#6B7280',
  border: '#D6CFC0',
  cardBg: '#FDFBF7',
};

type Insight = {
  id: number;
  signal: string;
  recommendation: string;
  priority: 'High' | 'Medium' | 'Low';
  account: string;
  timestamp: string;
  icon: 'alert' | 'trending-up' | 'trending-down' | 'lightbulb';
};

const insights: Insight[] = [
  {
    id: 1,
    signal: 'MuleSoft dependency risk detected for Axiom Capital. 78% of their integration flows depend on MuleSoft Anypoint Platform. Vendor lock-in score is elevated at 8.4/10. Any MuleSoft pricing changes or service disruptions would critically impact their operations.',
    recommendation: 'Propose a multi-runtime strategy to Axiom. Suggest piloting 2-3 non-critical flows on an alternative runtime (e.g., Apache Camel) to reduce single-vendor dependency. Schedule a vendor risk assessment workshop with their DevOps team.',
    priority: 'High',
    account: 'Axiom Capital',
    timestamp: '2026-05-25T08:30:00',
    icon: 'alert',
  },
  {
    id: 2,
    signal: 'Vantage Infra renewal at risk — contract expires in 11 days (June 5, 2026). No renewal discussion initiated yet. Budget freeze signals detected from recent engagement notes. ARR value: ₹48L.',
    recommendation: 'Escalate to Nirmal immediately. Prepare a retention proposal with flexible payment terms (quarterly billing option). Highlight ROI metrics: 99.1% uptime, ₹12L saved in manual integration costs. Consider offering a 15% loyalty discount for 2-year commitment.',
    priority: 'High',
    account: 'Vantage Infra',
    timestamp: '2026-05-25T07:15:00',
    icon: 'alert',
  },
  {
    id: 3,
    signal: 'NPS drop signal for MedCore Health — score dropped from 52 to 38 in the last 30 days. Correlated with 3 production incidents in the HL7 FHIR adapter layer. Support ticket volume up 40% month-over-month.',
    recommendation: 'Schedule an urgent health check meeting with MedCore IT Director (Dr. Anita Deshmukh). Prepare an incident post-mortem document. Propose a dedicated integration support SLA upgrade. Consider assigning a part-time technical resource for the next quarter.',
    priority: 'High',
    account: 'MedCore Health',
    timestamp: '2026-05-24T16:45:00',
    icon: 'trending-down',
  },
  {
    id: 4,
    signal: 'Engagement gap detected for Crestline Mfg — 42 days since last meaningful contact. No scheduled meetings on calendar. Last interaction was an EBR on April 14, 2026. Account health score trending down from 82 to 71.',
    recommendation: 'Reach out to Crestline VP Operations (Manoj Gupta) this week with a check-in call. Share the SAP B1 connector roadmap update as a conversation starter. Schedule the next EBR before the engagement gap widens further.',
    priority: 'Medium',
    account: 'Crestline Mfg',
    timestamp: '2026-05-24T11:20:00',
    icon: 'trending-down',
  },
  {
    id: 5,
    signal: 'Upsell opportunity for TechStack SaaS — detected 34% increase in API call volume over the last 60 days. Their engineering team grew from 12 to 18 members. Current plan utilization at 89% of licensed connector capacity.',
    recommendation: 'Propose an Enterprise tier upgrade to Karan to present to TechStack. Highlight cost-per-connector savings at scale. Suggest bundling the new Kafka bridge connector (launching Q3) into a package deal. Estimated ARR uplift: ₹6-8L.',
    priority: 'Medium',
    account: 'TechStack SaaS',
    timestamp: '2026-05-23T14:10:00',
    icon: 'lightbulb',
  },
];

const priorityConfig: Record<string, { color: string; bg: string }> = {
  High: { color: C.red, bg: '#FEE2E2' },
  Medium: { color: C.orange, bg: '#FEF3C7' },
  Low: { color: C.green, bg: '#D1FAE5' },
};

const iconMap: Record<string, React.ReactNode> = {
  alert: <AlertTriangle size={20} color={C.red} />,
  'trending-up': <TrendingUp size={20} color={C.green} />,
  'trending-down': <TrendingDown size={20} color={C.orange} />,
  lightbulb: <Lightbulb size={20} color={C.gold} />,
};

export default function InsightsView() {
  const [acknowledged, setAcknowledged] = useState<Set<number>>(new Set());
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());

  const handleAcknowledge = (id: number) => {
    setAcknowledged(prev => new Set(prev).add(id));
  };

  const handleDismiss = (id: number) => {
    setDismissed(prev => new Set(prev).add(id));
  };

  const visibleInsights = insights.filter(i => !dismissed.has(i.id));
  const highCount = insights.filter(i => i.priority === 'High').length;
  const medCount = insights.filter(i => i.priority === 'Medium').length;

  return (
    <div style={{ background: C.paper, minHeight: '100vh', padding: 32 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ background: C.forest, borderRadius: 10, padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Brain size={22} color={C.gold} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: C.forest }}>AI Insights</h1>
          <p style={{ margin: 0, fontSize: 13, color: C.muted }}>Signals and recommendations from IntegrateWise Twin</p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{
            background: '#FEE2E2', color: C.red, padding: '4px 12px', borderRadius: 12,
            fontSize: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>
            <AlertTriangle size={12} /> {highCount} High
          </span>
          <span style={{
            background: '#FEF3C7', color: C.orange, padding: '4px 12px', borderRadius: 12,
            fontSize: 12, fontWeight: 700,
          }}>
            {medCount} Medium
          </span>
        </div>
      </div>

      {/* Insights Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {visibleInsights.map(insight => {
          const pc = priorityConfig[insight.priority];
          const isAcknowledged = acknowledged.has(insight.id);
          return (
            <div
              key={insight.id}
              style={{
                background: C.white,
                borderRadius: 10,
                border: `1px solid ${insight.priority === 'High' ? C.red : C.border}`,
                borderLeft: `4px solid ${insight.priority === 'High' ? C.red : insight.priority === 'Medium' ? C.orange : C.green}`,
                padding: '20px 24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                opacity: isAcknowledged ? 0.65 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              {/* Top Row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <div style={{ flexShrink: 0, marginTop: 2 }}>{iconMap[insight.icon]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: C.forest }}>{insight.account}</span>
                    <span style={{
                      padding: '3px 10px', borderRadius: 12,
                      background: pc.bg, color: pc.color, fontSize: 11, fontWeight: 700,
                    }}>
                      {insight.priority}
                    </span>
                    {isAcknowledged && (
                      <span style={{
                        padding: '3px 10px', borderRadius: 12,
                        background: '#D1FAE5', color: C.green, fontSize: 11, fontWeight: 600,
                        display: 'inline-flex', alignItems: 'center', gap: 3,
                      }}>
                        <CheckCircle size={11} /> Acknowledged
                      </span>
                    )}
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: C.muted }}>
                    <Clock size={11} />
                    {new Date(insight.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}
                  </span>
                </div>
              </div>

              {/* Signal */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.forest, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
                  Signal Detected
                </div>
                <p style={{ margin: 0, fontSize: 14, color: '#374151', lineHeight: 1.65 }}>{insight.signal}</p>
              </div>

              {/* Recommendation */}
              <div style={{
                background: C.goldLight, borderRadius: 8, padding: '12px 16px', marginBottom: 14,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
                  Twin Recommendation
                </div>
                <p style={{ margin: 0, fontSize: 13, color: '#374151', lineHeight: 1.6 }}>{insight.recommendation}</p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {!isAcknowledged && (
                  <button
                    onClick={() => handleAcknowledge(insight.id)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '7px 16px', borderRadius: 8,
                      background: C.forest, color: C.white, border: 'none',
                      fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    <CheckCircle size={14} /> Acknowledge
                  </button>
                )}
                <button
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    padding: '7px 16px', borderRadius: 8,
                    background: C.white, color: C.forest, border: `1px solid ${C.border}`,
                    fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  <MessageSquare size={14} /> Ask Twin
                </button>
                <button
                  onClick={() => handleDismiss(insight.id)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    padding: '7px 16px', borderRadius: 8,
                    background: C.white, color: C.muted, border: `1px solid ${C.border}`,
                    fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  <X size={14} /> Dismiss
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {visibleInsights.length === 0 && (
        <div style={{ textAlign: 'center', padding: 48, color: C.muted, fontSize: 14 }}>
          <Brain size={32} style={{ marginBottom: 8, opacity: 0.4 }} />
          <p>All insights have been dismissed. Twin is monitoring for new signals.</p>
        </div>
      )}
    </div>
  );
}
