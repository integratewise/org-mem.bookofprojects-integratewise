'use client';
import React, { useState } from 'react';
import { Globe, Eye, MousePointerClick, Mail, Share2, FileText, Video, BookOpen } from 'lucide-react';

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

const trafficStats = [
  { label: 'Page Views', value: '37,200', change: '+18%', icon: Eye, color: C.forest },
  { label: 'Unique Visitors', value: '28,300', change: '+12%', icon: Globe, color: C.gold },
  { label: 'Conversions', value: '1,482', change: '+24%', icon: MousePointerClick, color: C.green },
  { label: 'Bounce Rate', value: '28.2%', change: '-3.1%', icon: Share2, color: C.orange },
];

const channels = [
  { label: 'LinkedIn', pct: 45, color: C.forest },
  { label: 'Website Organic', pct: 30, color: C.gold },
  { label: 'Referral', pct: 15, color: C.green },
  { label: 'Email', pct: 10, color: C.orange },
];

const campaigns = [
  { id: 1, name: 'MuleSoft Mastery Webinar Series', budget: '₹1.2L', spent: '₹78K', leads: 142, roi: '4.2x', status: 'active' },
  { id: 2, name: 'Integration CTO LinkedIn Campaign', budget: '₹80K', spent: '₹65K', leads: 88, roi: '3.1x', status: 'active' },
  { id: 3, name: 'Corporate Training Email Drip', budget: '₹40K', spent: '₹22K', leads: 34, roi: '2.8x', status: 'active' },
];

const contentLibrary = [
  { type: 'Blog', count: 12, icon: FileText, color: C.forest },
  { type: 'Case Study', count: 4, icon: BookOpen, color: C.gold },
  { type: 'Whitepaper', count: 2, icon: FileText, color: C.green },
  { type: 'Video', count: 6, icon: Video, color: C.orange },
];

export default function MarketingView() {
  return (
    <div style={{ background: C.paper, minHeight: '100%', padding: '24px', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{ width: '32px', height: '32px', background: C.forest, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe size={16} color={C.gold} />
          </div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: C.forest }}>Marketing</h1>
          <span style={{ marginLeft: 'auto', fontSize: '12px', color: C.muted, background: C.white, border: `1px solid ${C.border}`, borderRadius: '20px', padding: '2px 10px' }}>Performance Dashboard</span>
        </div>
        <p style={{ margin: 0, fontSize: '13px', color: C.muted, paddingLeft: '42px' }}>Traffic, campaigns & content · July 2025</p>
      </div>

      {/* Traffic Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {trafficStats.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '14px 16px', textAlign: 'center' }}>
              <div style={{ width: '32px', height: '32px', background: s.color + '15', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                <Icon size={14} color={s.color} />
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: C.forest }}>{s.value}</div>
              <div style={{ fontSize: '11px', color: C.muted, fontWeight: 600, marginTop: '2px' }}>{s.label}</div>
              <div style={{ fontSize: '10px', color: s.change.startsWith('+') ? C.green : s.change.startsWith('-') && s.label === 'Bounce Rate' ? C.green : C.red, marginTop: '4px', fontWeight: 600 }}>{s.change}</div>
            </div>
          );
        })}
      </div>

      {/* Channel Breakdown */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: C.forest, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Channel Breakdown</h2>
        <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '16px' }}>
          {channels.map((ch, i) => (
            <div key={ch.label} style={{ marginBottom: i < channels.length - 1 ? '12px' : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: C.forest }}>{ch.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: ch.color }}>{ch.pct}%</span>
              </div>
              <div style={{ height: '10px', background: C.border, borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${ch.pct}%`, height: '100%', background: ch.color, borderRadius: '5px', transition: 'width 0.5s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Performance */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: C.forest, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Campaigns</h2>
        <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr 1fr 1fr 1fr', gap: '8px', padding: '10px 16px', background: C.forest, color: C.white, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <span>Campaign</span>
            <span>Budget</span>
            <span>Spent</span>
            <span>Leads</span>
            <span>ROI</span>
          </div>
          {campaigns.map((c, i) => (
            <div key={c.id} style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr 1fr 1fr 1fr', gap: '8px', padding: '12px 16px', alignItems: 'center', borderBottom: i < campaigns.length - 1 ? `1px solid ${C.border}` : 'none' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: C.forest }}>{c.name}</span>
              <span style={{ fontSize: '12px', color: C.forest }}>{c.budget}</span>
              <span style={{ fontSize: '12px', color: C.muted }}>{c.spent}</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: C.forest }}>{c.leads}</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: C.green }}>{c.roi}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content Library */}
      <div>
        <h2 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 700, color: C.forest, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Content Library</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {contentLibrary.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.type} style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <div style={{ width: '36px', height: '36px', background: item.color + '12', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                  <Icon size={16} color={item.color} />
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: C.forest }}>{item.count}</div>
                <div style={{ fontSize: '11px', color: C.muted, fontWeight: 600, marginTop: '2px' }}>{item.type}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
