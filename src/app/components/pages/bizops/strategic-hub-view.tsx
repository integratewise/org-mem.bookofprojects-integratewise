'use client';
import React, { useState } from 'react';
import { Target, TrendingUp, Users, Package, ChevronRight, AlertCircle, CheckCircle, Clock, Flag } from 'lucide-react';

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

const goals = [
  {
    id: 1,
    title: 'Revenue Target',
    description: '₹50L ARR by Q4',
    owner: 'Nirmal R.',
    due: 'Dec 31, 2025',
    progress: 85,
    status: 'on-track',
    modules: ['CRM', 'Finance'],
    icon: TrendingUp,
    metric: '₹42.5L / ₹50L',
  },
  {
    id: 2,
    title: 'Market Position',
    description: 'MuleSoft category leader',
    owner: 'Priya S.',
    due: 'Nov 30, 2025',
    progress: 60,
    status: 'at-risk',
    modules: ['Marketing', 'CRM'],
    icon: Target,
    metric: '3 of 5 milestones',
  },
  {
    id: 3,
    title: 'Product Launch',
    description: 'Platform v2 release',
    owner: 'Arjun M.',
    due: 'Oct 15, 2025',
    progress: 40,
    status: 'behind',
    modules: ['Product', 'Engineering'],
    icon: Package,
    metric: '8 of 20 features',
  },
  {
    id: 4,
    title: 'Team Growth',
    description: 'Hire 2 senior roles',
    owner: 'Kavitha N.',
    due: 'Sep 30, 2025',
    progress: 25,
    status: 'at-risk',
    modules: ['HR', 'Finance'],
    icon: Users,
    metric: '1 of 4 interviews',
  },
];

const decisions = [
  { id: 1, title: 'Approve Q3 marketing budget increase (₹2.4L)', priority: 'high', due: 'Today', owner: 'Founder' },
  { id: 2, title: 'Select MuleSoft training partner for enterprise batch', priority: 'high', due: 'Jul 18', owner: 'Nirmal R.' },
  { id: 3, title: 'Finalise Platform v2 feature scope cut', priority: 'medium', due: 'Jul 20', owner: 'Arjun M.' },
  { id: 4, title: 'Renew AWS infrastructure contract (₹8.2L/yr)', priority: 'medium', due: 'Jul 25', owner: 'Founder' },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  'on-track': { label: 'On Track', color: C.green, bg: '#E8F8EE', icon: CheckCircle },
  'at-risk': { label: 'At Risk', color: C.orange, bg: '#FEF3E2', icon: AlertCircle },
  'behind': { label: 'Behind', color: C.red, bg: '#FDECEA', icon: Flag },
};

const priorityConfig: Record<string, { color: string; bg: string }> = {
  high: { color: C.red, bg: '#FDECEA' },
  medium: { color: C.orange, bg: '#FEF3E2' },
};

export default function StrategicHubView() {
  const [expandedGoal, setExpandedGoal] = useState<number | null>(null);

  return (
    <div style={{ background: C.paper, minHeight: '100%', padding: '24px', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ width: '32px', height: '32px', background: C.forest, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Target size={16} color={C.gold} />
          </div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: C.forest }}>Strategic Hub</h1>
          <span style={{ marginLeft: 'auto', fontSize: '12px', color: C.muted, background: C.white, border: `1px solid ${C.border}`, borderRadius: '20px', padding: '2px 10px' }}>Q3 2025</span>
        </div>
        <p style={{ margin: 0, fontSize: '13px', color: C.muted, paddingLeft: '42px' }}>OKR tracker · 4 active strategic goals</p>
      </div>

      {/* Summary strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'On Track', value: '1', color: C.green, bg: '#E8F8EE' },
          { label: 'At Risk', value: '2', color: C.orange, bg: '#FEF3E2' },
          { label: 'Behind', value: '1', color: C.red, bg: '#FDECEA' },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.color}30`, borderRadius: '10px', padding: '12px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: s.color, fontWeight: 600, marginTop: '2px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* OKR Goals */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: C.forest, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Strategic Goals</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {goals.map(goal => {
            const sc = statusConfig[goal.status];
            const StatusIcon = sc.icon;
            const GoalIcon = goal.icon;
            const isExpanded = expandedGoal === goal.id;
            const barColor = goal.status === 'on-track' ? C.green : goal.status === 'at-risk' ? C.orange : C.red;

            return (
              <div
                key={goal.id}
                style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '16px', cursor: 'pointer', transition: 'box-shadow 0.2s' }}
                onClick={() => setExpandedGoal(isExpanded ? null : goal.id)}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', background: C.forest + '12', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <GoalIcon size={16} color={C.forest} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: C.forest }}>{goal.title}</span>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: sc.color, background: sc.bg, borderRadius: '20px', padding: '2px 8px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <StatusIcon size={10} /> {sc.label}
                      </span>
                      <ChevronRight size={14} color={C.muted} style={{ marginLeft: 'auto', transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                    </div>
                    <p style={{ margin: '0 0 10px', fontSize: '12px', color: C.muted }}>{goal.description}</p>
                    {/* Progress bar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ flex: 1, height: '6px', background: C.border, borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${goal.progress}%`, height: '100%', background: barColor, borderRadius: '3px', transition: 'width 0.5s ease' }} />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: barColor, minWidth: '32px' }}>{goal.progress}%</span>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: `1px solid ${C.border}` }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                      <div>
                        <div style={{ fontSize: '10px', color: C.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Owner</div>
                        <div style={{ fontSize: '13px', color: C.forest, fontWeight: 600 }}>{goal.owner}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '10px', color: C.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Due Date</div>
                        <div style={{ fontSize: '13px', color: C.forest, fontWeight: 600 }}>{goal.due}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '10px', color: C.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Progress</div>
                        <div style={{ fontSize: '13px', color: C.forest, fontWeight: 600 }}>{goal.metric}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '10px', color: C.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Linked Modules</div>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {goal.modules.map(m => (
                            <span key={m} style={{ fontSize: '11px', color: C.gold, background: C.goldLight, borderRadius: '4px', padding: '1px 6px', fontWeight: 600 }}>{m}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Decisions Pending */}
      <div>
        <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: C.forest, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Decisions Pending</h2>
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
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: pc.color, background: pc.bg, borderRadius: '20px', padding: '2px 8px' }}>{d.priority}</span>
                  <div style={{ fontSize: '11px', color: C.muted, marginTop: '3px', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end' }}>
                    <Clock size={10} /> {d.due}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
