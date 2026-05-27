'use client';
import React, { useState } from 'react';
import { Phone, Mail, Calendar, Users, MessageSquare, Clock, Filter, ChevronRight } from 'lucide-react';

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

type Entry = {
  id: number;
  account: string;
  type: 'Call' | 'Email' | 'Meeting' | 'QBR' | 'EBR';
  summary: string;
  date: string;
  csm: string;
  outcome: 'Positive' | 'Neutral' | 'Needs Follow-up';
};

const entries: Entry[] = [
  { id: 1, account: 'Axiom Capital', type: 'QBR', summary: 'Quarterly business review with Axiom leadership. Discussed MuleSoft API gateway expansion roadmap and upcoming Anypoint upgrade. Client satisfied with current SLA adherence (99.7% uptime).', date: '2026-05-24', csm: 'Nirmal', outcome: 'Positive' },
  { id: 2, account: 'MedCore Health', type: 'Call', summary: 'Escalation call regarding intermittent HL7 FHIR adapter failures in production. Priya walked through diagnostics and committed to a hotfix by EOD. Client expressed concern over recent instability.', date: '2026-05-22', csm: 'Priya', outcome: 'Needs Follow-up' },
  { id: 3, account: 'TechStack SaaS', type: 'Email', summary: 'Shared updated integration architecture doc for their new microservices migration. Included Kafka-to-MuleSoft bridge pattern recommendations. Karan awaiting client feedback.', date: '2026-05-20', csm: 'Karan', outcome: 'Neutral' },
  { id: 4, account: 'Vantage Infra', type: 'Meeting', summary: 'Emergency sync with Vantage CTO regarding contract renewal concerns. Budget freeze communicated — leadership reviewing all vendor spends. Critical ₹48L renewal at risk in 11 days.', date: '2026-05-18', csm: 'Nirmal', outcome: 'Needs Follow-up' },
  { id: 5, account: 'Crestline Mfg', type: 'EBR', summary: 'Executive business review with Crestline VP Operations. Presented ROI metrics — integration uptime improved from 94.2% to 99.1% post-IntegrateWise adoption. Discussed SAP B1 connector roadmap.', date: '2026-05-15', csm: 'Priya', outcome: 'Positive' },
  { id: 6, account: 'Orbit Dynamics', type: 'Call', summary: 'Routine health check call. Orbit team happy with real-time shipment tracking integrations. Explored adding customs API connector for international logistics workflows.', date: '2026-05-12', csm: 'Karan', outcome: 'Positive' },
  { id: 7, account: 'Axiom Capital', type: 'Email', summary: 'Sent MuleSoft 4.6 migration checklist and compatibility matrix. Flagged deprecated connectors that need replacement before Q3. Included estimated effort breakdown: ~120 hours.', date: '2026-05-08', csm: 'Nirmal', outcome: 'Neutral' },
  { id: 8, account: 'MedCore Health', type: 'Meeting', summary: 'On-site meeting at MedCore Pune office. Reviewed HIPAA compliance audit findings for integration layer. Two gaps identified in data-at-rest encryption for HL7 message queue.', date: '2026-04-28', csm: 'Priya', outcome: 'Needs Follow-up' },
];

const typeConfig: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  Call: { color: '#2563EB', bg: '#EFF6FF', icon: <Phone size={14} /> },
  Email: { color: '#7C3AED', bg: '#F5F3FF', icon: <Mail size={14} /> },
  Meeting: { color: '#0891B2', bg: '#ECFEFF', icon: <Calendar size={14} /> },
  QBR: { color: '#B8943F', bg: '#F5E6C8', icon: <Users size={14} /> },
  EBR: { color: '#1A3A2A', bg: '#D1FAE5', icon: <MessageSquare size={14} /> },
};

const outcomeConfig: Record<string, { color: string; bg: string }> = {
  Positive: { color: C.green, bg: '#D1FAE5' },
  Neutral: { color: C.muted, bg: '#F3F4F6' },
  'Needs Follow-up': { color: C.orange, bg: '#FEF3C7' },
};

const tabs = ['All', 'Call', 'Email', 'Meeting', 'QBR', 'EBR'];

export default function EngagementLogView() {
  const [activeTab, setActiveTab] = useState('All');
  const filtered = activeTab === 'All' ? entries : entries.filter(e => e.type === activeTab);

  return (
    <div style={{ background: C.paper, minHeight: '100vh', padding: 32 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ background: C.forest, borderRadius: 10, padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MessageSquare size={22} color={C.gold} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: C.forest }}>Engagement Log</h1>
          <p style={{ margin: 0, fontSize: 13, color: C.muted }}>Chronological feed of all account engagement activities</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        <Filter size={16} color={C.muted} style={{ marginRight: 4 }} />
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '6px 16px',
              borderRadius: 20,
              border: activeTab === tab ? `2px solid ${C.forest}` : `1px solid ${C.border}`,
              background: activeTab === tab ? C.forest : C.white,
              color: activeTab === tab ? C.white : C.forest,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {tab}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 13, color: C.muted }}>{filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}</span>
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 19, top: 0, bottom: 0, width: 2, background: C.border }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map(entry => {
            const tc = typeConfig[entry.type];
            const oc = outcomeConfig[entry.outcome];
            return (
              <div key={entry.id} style={{ display: 'flex', gap: 16, position: 'relative' }}>
                {/* Timeline dot */}
                <div style={{ width: 40, display: 'flex', justifyContent: 'center', flexShrink: 0, paddingTop: 16 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: C.forest, border: `3px solid ${C.paper}`, zIndex: 1 }} />
                </div>
                {/* Card */}
                <div style={{
                  flex: 1,
                  background: C.white,
                  borderRadius: 10,
                  border: `1px solid ${C.border}`,
                  padding: '16px 20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 0.15s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: C.forest }}>{entry.account}</span>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      padding: '3px 10px', borderRadius: 12,
                      background: tc.bg, color: tc.color, fontSize: 12, fontWeight: 600,
                    }}>
                      {tc.icon} {entry.type}
                    </span>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      padding: '3px 10px', borderRadius: 12,
                      background: oc.bg, color: oc.color, fontSize: 12, fontWeight: 600,
                    }}>
                      {entry.outcome}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 10px', fontSize: 14, color: '#374151', lineHeight: 1.6 }}>{entry.summary}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: C.muted }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={13} /> {new Date(entry.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <Users size={13} /> CSM: {entry.csm}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 48, color: C.muted, fontSize: 14 }}>
          <MessageSquare size={32} style={{ marginBottom: 8, opacity: 0.4 }} />
          <p>No engagement entries found for this filter.</p>
        </div>
      )}
    </div>
  );
}
