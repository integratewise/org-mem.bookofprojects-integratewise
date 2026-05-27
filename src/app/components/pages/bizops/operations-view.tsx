'use client';
import React, { useState } from 'react';
import { Activity, Server, Users, AlertTriangle, CheckCircle, Clock, Cpu, Workflow } from 'lucide-react';

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

const teamUtilisation = [
  { team: 'Implementation', pct: 90, color: C.red, status: 'At capacity' },
  { team: 'Consulting', pct: 85, color: C.orange, status: 'High load' },
  { team: 'Support', pct: 75, color: C.green, status: 'Normal' },
];

const projects = [
  { label: 'Total Active', value: '7', icon: Activity, color: C.forest, bg: C.forest + '12' },
  { label: 'On Track', value: '5', icon: CheckCircle, color: C.green, bg: '#E8F8EE' },
  { label: 'At Risk', value: '2', icon: AlertTriangle, color: C.red, bg: '#FDECEA' },
];

const slaRows = [
  { metric: 'API Uptime', current: '99.7%', target: '99.9%', status: 'warning', icon: Server },
  { metric: 'Avg Response Time', current: '2.1s', target: '<2.0s', status: 'warning', icon: Clock },
  { metric: 'Resolution Rate', current: '94%', target: '95%', status: 'ok', icon: CheckCircle },
];

const workflowStats = { runs: 24, failures: 0, avgTime: '1.8s' };
const pendingApprovals = 4;
const connectedTools = { healthy: 9, total: 13 };

export default function OperationsView() {
  return (
    <div style={{ background: C.paper, minHeight: '100%', padding: '24px', fontFamily: 'Inter, sans-serif' }}>
      {/* Alert Banner */}
      <div style={{ background: '#FDECEA', border: `1px solid ${C.red}30`, borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <AlertTriangle size={16} color={C.red} />
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: C.red }}>Capacity Alert: </span>
          <span style={{ fontSize: '13px', color: C.forest }}>Implementation team at 90% utilisation — capacity ceiling reached. Consider reallocating or deferring new onboarding tasks.</span>
        </div>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ width: '32px', height: '32px', background: C.forest, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Cpu size={16} color={C.gold} />
          </div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: C.forest }}>Operations</h1>
          <span style={{ marginLeft: 'auto', fontSize: '12px', color: C.muted, background: C.white, border: `1px solid ${C.border}`, borderRadius: '20px', padding: '2px 10px' }}>Command Center</span>
        </div>
        <p style={{ margin: 0, fontSize: '13px', color: C.muted, paddingLeft: '42px' }}>System health, team utilisation & workflows</p>
      </div>

      {/* Team Utilisation */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: C.forest, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Team Utilisation</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {teamUtilisation.map(t => {
            const radius = 40;
            const stroke = 8;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (t.pct / 100) * circumference;
            return (
              <div key={t.team} style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                <div style={{ position: 'relative', width: '96px', height: '96px', margin: '0 auto 10px' }}>
                  <svg width="96" height="96" viewBox="0 0 96 96" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="48" cy="48" r={radius} fill="none" stroke={C.border} strokeWidth={stroke} />
                    <circle cx="48" cy="48" r={radius} fill="none" stroke={t.color} strokeWidth={stroke} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
                  </svg>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '20px', fontWeight: 800, color: t.color }}>{t.pct}%</div>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: C.forest }}>{t.team}</div>
                <div style={{ fontSize: '11px', color: t.color, fontWeight: 600, marginTop: '2px' }}>{t.status}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Projects */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: C.forest, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {projects.map(p => {
            const Icon = p.icon;
            return (
              <div key={p.label} style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <div style={{ width: '36px', height: '36px', background: p.bg, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                  <Icon size={16} color={p.color} />
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: C.forest }}>{p.value}</div>
                <div style={{ fontSize: '11px', color: C.muted, fontWeight: 600, marginTop: '2px' }}>{p.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SLA Status */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: C.forest, textTransform: 'uppercase', letterSpacing: '0.05em' }}>SLA Status</h2>
        <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '8px', padding: '10px 16px', background: C.forest, color: C.white, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <span>Metric</span>
            <span>Current</span>
            <span>Target</span>
            <span>Status</span>
          </div>
          {slaRows.map((row, i) => {
            const Icon = row.icon;
            const statusColor = row.status === 'ok' ? C.green : C.orange;
            const statusBg = row.status === 'ok' ? '#E8F8EE' : '#FEF3E2';
            const statusLabel = row.status === 'ok' ? 'Met' : 'Warning';
            return (
              <div key={row.metric} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '8px', padding: '12px 16px', alignItems: 'center', borderBottom: i < slaRows.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={14} color={C.muted} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: C.forest }}>{row.metric}</span>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: C.forest }}>{row.current}</span>
                <span style={{ fontSize: '12px', color: C.muted }}>{row.target}</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: statusColor, background: statusBg, borderRadius: '20px', padding: '2px 8px', display: 'inline-block', width: 'fit-content' }}>{statusLabel}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {/* Workflow Engine */}
        <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
          <div style={{ width: '36px', height: '36px', background: C.forest + '12', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
            <Workflow size={16} color={C.forest} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: C.forest }}>{workflowStats.runs}</div>
          <div style={{ fontSize: '11px', color: C.muted, fontWeight: 600, marginTop: '2px' }}>Workflow Runs Today</div>
          <div style={{ fontSize: '10px', color: workflowStats.failures === 0 ? C.green : C.red, fontWeight: 600, marginTop: '4px' }}>{workflowStats.failures} failures</div>
        </div>

        {/* Pending Approvals */}
        <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
          <div style={{ width: '36px', height: '36px', background: C.orange + '15', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
            <Clock size={16} color={C.orange} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: C.forest }}>{pendingApprovals}</div>
          <div style={{ fontSize: '11px', color: C.muted, fontWeight: 600, marginTop: '2px' }}>Pending Approvals</div>
          <div style={{ fontSize: '10px', color: C.orange, fontWeight: 600, marginTop: '4px' }}>Action required</div>
        </div>

        {/* Connected Tools */}
        <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
          <div style={{ width: '36px', height: '36px', background: C.green + '15', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
            <Server size={16} color={C.green} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: C.forest }}>{connectedTools.healthy}<span style={{ fontSize: '14px', color: C.muted, fontWeight: 600 }}>/{connectedTools.total}</span></div>
          <div style={{ fontSize: '11px', color: C.muted, fontWeight: 600, marginTop: '2px' }}>Connected Tools</div>
          <div style={{ fontSize: '10px', color: C.green, fontWeight: 600, marginTop: '4px' }}>Healthy</div>
        </div>

        {/* System Activity */}
        <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
          <div style={{ width: '36px', height: '36px', background: C.gold + '15', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
            <Activity size={16} color={C.gold} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: C.forest }}>98.4%</div>
          <div style={{ fontSize: '11px', color: C.muted, fontWeight: 600, marginTop: '2px' }}>System Uptime</div>
          <div style={{ fontSize: '10px', color: C.green, fontWeight: 600, marginTop: '4px' }}>Last 30 days</div>
        </div>
      </div>
    </div>
  );
}
