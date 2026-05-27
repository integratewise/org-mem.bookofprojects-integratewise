'use client';
import React, { useState } from 'react';
import { TrendingUp, Users, AlertCircle, CheckCircle, Clock, Brain, Target, IndianRupee } from 'lucide-react';

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

const priorities = [
  { id: 1, title: 'Finalise MuleSoft advisory proposal for Infotech Ltd', priority: 'high', due: 'Today', icon: Target },
  { id: 2, title: 'Review Q3 hiring plan — 2 senior integration consultants', priority: 'high', due: 'Today', icon: Users },
  { id: 3, title: 'Approve revised marketing campaign budget for August', priority: 'medium', due: 'Today', icon: IndianRupee },
];

const revenue = [
  { label: 'MRR', value: '₹5.4L', change: '+12%', icon: IndianRupee, color: C.green },
  { label: 'ARR', value: '₹42.5L', change: '+8%', icon: TrendingUp, color: C.green },
  { label: 'Pipeline', value: '₹1.3Cr', change: '+₹18L this week', icon: Target, color: C.gold },
  { label: 'Win Rate', value: '60%', change: 'Last 30 days', icon: CheckCircle, color: C.green },
];

const teamPulse = [
  { team: 'Implementation', pct: 90, color: C.red },
  { team: 'Consulting', pct: 85, color: C.orange },
  { team: 'Support', pct: 75, color: C.green },
];

const openDecisions = [
  { id: 1, title: 'Approve ₹2.4L Q3 marketing budget increase', owner: 'Founder', due: 'Today', priority: 'high' },
  { id: 2, title: 'Select MuleSoft training partner for enterprise batch', owner: 'Nirmal R.', due: 'Jul 18', priority: 'high' },
  { id: 3, title: 'Finalise Platform v2 feature scope cut', owner: 'Arjun M.', due: 'Jul 20', priority: 'medium' },
  { id: 4, title: 'Renew AWS infrastructure contract (₹8.2L/yr)', owner: 'Founder', due: 'Jul 25', priority: 'medium' },
];

const aiSignals = [
  { id: 1, title: 'Revenue dip risk: MuleSoft deal stalling at negotiation', detail: 'CS Platform ₹22L proposal delayed 14 days — follow-up recommended.', severity: 'high', action: 'Escalate to Sales' },
  { id: 2, title: 'Team overload: Implementation at 90% utilisation', detail: 'Capacity ceiling reached. New onboarding may slip by 1 week.', severity: 'high', action: 'Reallocate Resources' },
];

const priorityConfig: Record<string, { color: string; bg: string }> = {
  high: { color: C.red, bg: '#FDECEA' },
  medium: { color: C.orange, bg: '#FEF3E2' },
};

export default function FounderOpsView() {
  const [decisions, setDecisions] = useState(openDecisions);

  const handleDecision = (id: number, action: 'approve' | 'defer') => {
    setDecisions(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div style={{ background: C.paper, minHeight: '100%', padding: '24px', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ width: '32px', height: '32px', background: C.forest, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={16} color={C.gold} />
          </div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: C.forest }}>Founder Ops</h1>
          <span style={{ marginLeft: 'auto', fontSize: '12px', color: C.muted, background: C.white, border: `1px solid ${C.border}`, borderRadius: '20px', padding: '2px 10px' }}>Daily Brief</span>
        </div>
        <p style={{ margin: 0, fontSize: '13px', color: C.muted, paddingLeft: '42px' }}>Your command centre · {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      </div>

      {/* Today's Priorities */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: C.forest, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Today's Priorities</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {priorities.map(p => {
            const pc = priorityConfig[p.priority];
            const Icon = p.icon;
            return (
              <div key={p.id} style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', background: C.forest + '12', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} color={C.forest} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', color: C.forest, fontWeight: 500 }}>{p.title}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: pc.color, background: pc.bg, borderRadius: '20px', padding: '2px 8px' }}>{p.priority}</span>
                  <div style={{ fontSize: '11px', color: C.muted, marginTop: '3px', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end' }}>
                    <Clock size={10} /> {p.due}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Revenue Snapshot */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: C.forest, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Revenue Snapshot</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {revenue.map(r => {
            const Icon = r.icon;
            return (
              <div key={r.label} style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ width: '32px', height: '32px', background: r.color + '15', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                  <Icon size={14} color={r.color} />
                </div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: C.forest }}>{r.value}</div>
                <div style={{ fontSize: '11px', color: C.muted, fontWeight: 600, marginTop: '2px' }}>{r.label}</div>
                <div style={{ fontSize: '10px', color: r.color, marginTop: '4px', fontWeight: 600 }}>{r.change}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team Pulse */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: C.forest, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Team Pulse</h2>
        <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '16px' }}>
          {teamPulse.map(t => (
            <div key={t.team} style={{ marginBottom: t.team === 'Support' ? 0 : '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: C.forest }}>{t.team}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: t.color }}>{t.pct}%</span>
              </div>
              <div style={{ height: '8px', background: C.border, borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${t.pct}%`, height: '100%', background: t.color, borderRadius: '4px', transition: 'width 0.5s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Open Decisions */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: C.forest, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Open Decisions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {decisions.map(d => {
            const pc = priorityConfig[d.priority];
            return (
              <div key={d.id} style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: pc.color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', color: C.forest, fontWeight: 500 }}>{d.title}</div>
                  <div style={{ fontSize: '11px', color: C.muted, marginTop: '2px' }}>Owner: {d.owner}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: pc.color, background: pc.bg, borderRadius: '20px', padding: '2px 8px' }}>{d.priority}</span>
                  <span style={{ fontSize: '11px', color: C.muted, display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Clock size={10} /> {d.due}
                  </span>
                  <button
                    onClick={() => handleDecision(d.id, 'approve')}
                    style={{ fontSize: '11px', fontWeight: 600, color: C.white, background: C.green, border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer' }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecision(d.id, 'defer')}
                    style={{ fontSize: '11px', fontWeight: 600, color: C.muted, background: C.white, border: `1px solid ${C.border}`, borderRadius: '6px', padding: '4px 10px', cursor: 'pointer' }}
                  >
                    Defer
                  </button>
                </div>
              </div>
            );
          })}
          {decisions.length === 0 && (
            <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
              <CheckCircle size={20} color={C.green} style={{ margin: '0 auto 6px' }} />
              <div style={{ fontSize: '13px', color: C.green, fontWeight: 600 }}>All decisions resolved</div>
            </div>
          )}
        </div>
      </div>

      {/* AI Signals */}
      <div>
        <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: C.forest, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Brain size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
          AI Signals from Twin
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {aiSignals.map(s => (
            <div key={s.id} style={{ background: '#FDECEA', border: `1px solid ${C.red}30`, borderRadius: '12px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <AlertCircle size={16} color={C.red} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: C.forest, marginBottom: '4px' }}>{s.title}</div>
                  <div style={{ fontSize: '12px', color: C.muted, marginBottom: '10px' }}>{s.detail}</div>
                  <button
                    style={{ fontSize: '11px', fontWeight: 600, color: C.white, background: C.red, border: 'none', borderRadius: '6px', padding: '5px 14px', cursor: 'pointer' }}
                  >
                    {s.action}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
