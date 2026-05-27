'use client';
import React, { useState } from 'react';
import { Phone, Mail, TrendingUp, DollarSign, Users, Target, BarChart3 } from 'lucide-react';

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

const pipelineStages = [
  { label: 'New', count: 8, color: C.muted },
  { label: 'Contacted', count: 12, color: C.orange },
  { label: 'Qualified', count: 6, color: C.gold },
  { label: 'Converted', count: 71, color: C.green },
];

const activeDeals = [
  { id: 1, name: 'MuleSoft Advisory', company: 'Infotech Ltd', value: '₹38L', stage: 'Negotiation', stageColor: C.orange, contact: 'Rajesh Menon', next: 'Contract review — Jul 18' },
  { id: 2, name: 'CS Platform', company: 'FinServe Corp', value: '₹22L', stage: 'Proposal', stageColor: C.gold, contact: 'Anita Sharma', next: 'Proposal sent — awaiting reply' },
  { id: 3, name: 'Integration CTO', company: 'TechNova Pvt Ltd', value: '₹18L', stage: 'Discovery', stageColor: C.muted, contact: 'Vikram Patel', next: 'Discovery call — Jul 20' },
  { id: 4, name: 'Corporate Training', company: 'GlobalSoft India', value: '₹8L', stage: 'Qualified', stageColor: C.green, contact: 'Deepa Krishnan', next: 'Schedule demo — Jul 22' },
];

const stats = [
  { label: 'Total Pipeline', value: '₹1.3Cr', icon: DollarSign, color: C.forest },
  { label: 'Win Rate', value: '60%', icon: Target, color: C.green },
  { label: 'Avg Deal Size', value: '₹28L', icon: BarChart3, color: C.gold },
  { label: 'Avg Cycle', value: '42d', icon: TrendingUp, color: C.orange },
];

export default function CrmView() {
  const maxCount = Math.max(...pipelineStages.map(s => s.count));

  return (
    <div style={{ background: C.paper, minHeight: '100%', padding: '24px', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ width: '32px', height: '32px', background: C.forest, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={16} color={C.gold} />
          </div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: C.forest }}>CRM</h1>
          <span style={{ marginLeft: 'auto', fontSize: '12px', color: C.muted, background: C.white, border: `1px solid ${C.border}`, borderRadius: '20px', padding: '2px 10px' }}>Pipeline View</span>
        </div>
        <p style={{ margin: 0, fontSize: '13px', color: C.muted, paddingLeft: '42px' }}>Leads & deals management · 27 active contacts</p>
      </div>

      {/* Stats Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '14px 16px', textAlign: 'center' }}>
              <div style={{ width: '32px', height: '32px', background: s.color + '15', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                <Icon size={14} color={s.color} />
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: C.forest }}>{s.value}</div>
              <div style={{ fontSize: '11px', color: C.muted, fontWeight: 600, marginTop: '2px' }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Lead Pipeline */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: C.forest, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lead Pipeline</h2>
        <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '16px' }}>
          {pipelineStages.map((stage, i) => (
            <div key={stage.label} style={{ marginBottom: i < pipelineStages.length - 1 ? '12px' : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: C.forest }}>{stage.label}</span>
                <span style={{ fontSize: '14px', fontWeight: 800, color: stage.color }}>{stage.count}</span>
              </div>
              <div style={{ height: '10px', background: C.border, borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${(stage.count / maxCount) * 100}%`, height: '100%', background: stage.color, borderRadius: '5px', transition: 'width 0.5s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Deals */}
      <div>
        <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: C.forest, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Deals</h2>
        <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '12px', overflow: 'hidden' }}>
          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 1fr 1.5fr', gap: '8px', padding: '10px 16px', background: C.forest, color: C.white, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <span>Deal</span>
            <span>Contact</span>
            <span>Value</span>
            <span>Stage</span>
            <span>Next Action</span>
          </div>
          {/* Table Rows */}
          {activeDeals.map((deal, i) => (
            <div key={deal.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 1fr 1.5fr', gap: '8px', padding: '12px 16px', alignItems: 'center', borderBottom: i < activeDeals.length - 1 ? `1px solid ${C.border}` : 'none' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: C.forest }}>{deal.name}</div>
                <div style={{ fontSize: '11px', color: C.muted }}>{deal.company}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={12} color={C.muted} />
                <span style={{ fontSize: '12px', color: C.forest }}>{deal.contact}</span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: C.forest }}>{deal.value}</div>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 600, color: deal.stageColor, background: deal.stageColor + '18', borderRadius: '20px', padding: '2px 8px' }}>{deal.stage}</span>
              </div>
              <div style={{ fontSize: '11px', color: C.muted }}>{deal.next}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
