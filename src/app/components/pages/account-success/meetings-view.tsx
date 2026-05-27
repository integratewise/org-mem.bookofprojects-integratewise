'use client';
import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Video, Phone, CheckCircle, XCircle, ChevronRight } from 'lucide-react';

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

type Meeting = {
  id: number;
  title: string;
  account: string;
  type: 'QBR' | 'EBR' | 'Onboarding' | 'Check-in' | 'Executive Review';
  date: string;
  time: string;
  attendees: string[];
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  mode: 'video' | 'phone' | 'in-person';
};

const meetings: Meeting[] = [
  { id: 1, title: 'Q2 Quarterly Business Review', account: 'Axiom Capital', type: 'QBR', date: '2026-05-28', time: '10:00 AM IST', attendees: ['Nirmal', 'Rajesh Mehta (Axiom CTO)', 'Deepa Sharma (Axiom DevOps Lead)'], status: 'Scheduled', mode: 'video' },
  { id: 2, title: 'Renewal Discussion & Contract Review', account: 'Vantage Infra', type: 'Executive Review', date: '2026-05-29', time: '2:00 PM IST', attendees: ['Nirmal', 'Suresh Pillai (Vantage CEO)', 'Ananya Rao (Vantage Procurement)'], status: 'Scheduled', mode: 'video' },
  { id: 3, title: 'NPS Review & Health Check', account: 'Orbit Dynamics', type: 'Check-in', date: '2026-05-30', time: '11:30 AM IST', attendees: ['Karan', 'Vikram Joshi (Orbit Ops Head)'], status: 'Scheduled', mode: 'phone' },
  { id: 4, title: 'SAP B1 Connector Roadmap Discussion', account: 'Crestline Mfg', type: 'EBR', date: '2026-06-01', time: '3:00 PM IST', attendees: ['Priya', 'Manoj Gupta (Crestline VP Ops)', 'Sneha Kulkarni (Crestline IT)'], status: 'Scheduled', mode: 'video' },
  { id: 5, title: 'Kafka Integration Architecture Review', account: 'TechStack SaaS', type: 'Check-in', date: '2026-06-02', time: '10:30 AM IST', attendees: ['Karan', 'Arjun Nair (TechStack CTO)', 'Fatima Sheikh (TechStack Platform)'], status: 'Scheduled', mode: 'video' },
  { id: 6, title: 'MuleSoft 4.6 Migration Planning', account: 'Axiom Capital', type: 'QBR', date: '2026-06-03', time: '4:00 PM IST', attendees: ['Nirmal', 'Deepa Sharma (Axiom DevOps Lead)'], status: 'Scheduled', mode: 'video' },
  { id: 7, title: 'FHIR Adapter Hotfix Debrief', account: 'MedCore Health', type: 'Check-in', date: '2026-05-20', time: '11:00 AM IST', attendees: ['Priya', 'Dr. Anita Deshmukh (MedCore IT Director)'], status: 'Completed', mode: 'video' },
  { id: 8, title: 'Q1 EBR — ROI & Uptime Metrics Review', account: 'Crestline Mfg', type: 'EBR', date: '2026-05-15', time: '2:30 PM IST', attendees: ['Priya', 'Manoj Gupta (Crestline VP Ops)', 'Nirmal'], status: 'Completed', mode: 'in-person' },
  { id: 9, title: 'Customs API Connector Kickoff', account: 'Orbit Dynamics', type: 'Onboarding', date: '2026-05-18', time: '10:00 AM IST', attendees: ['Karan', 'Vikram Joshi (Orbit Ops Head)', 'Rohit Menon (Orbit IT)'], status: 'Completed', mode: 'video' },
  { id: 10, title: 'Integration Health & SLA Review', account: 'Axiom Capital', type: 'Check-in', date: '2026-05-12', time: '3:00 PM IST', attendees: ['Nirmal', 'Rajesh Mehta (Axiom CTO)'], status: 'Completed', mode: 'phone' },
];

const typeConfig: Record<string, { color: string; bg: string }> = {
  QBR: { color: C.gold, bg: C.goldLight },
  EBR: { color: C.forest, bg: '#D1FAE5' },
  Onboarding: { color: '#2563EB', bg: '#DBEAFE' },
  'Check-in': { color: '#7C3AED', bg: '#F5F3FF' },
  'Executive Review': { color: C.red, bg: '#FEE2E2' },
};

const statusConfig: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  Scheduled: { color: '#2563EB', bg: '#DBEAFE', icon: <Clock size={14} /> },
  Completed: { color: C.green, bg: '#D1FAE5', icon: <CheckCircle size={14} /> },
  Cancelled: { color: C.red, bg: '#FEE2E2', icon: <XCircle size={14} /> },
};

const modeIcon: Record<string, React.ReactNode> = {
  video: <Video size={14} color={C.muted} />,
  phone: <Phone size={14} color={C.muted} />,
  'in-person': <MapPin size={14} color={C.muted} />,
};

export default function MeetingsView() {
  const upcoming = meetings.filter(m => m.status === 'Scheduled');
  const recent = meetings.filter(m => m.status === 'Completed' || m.status === 'Cancelled');

  const stats = {
    total: meetings.length,
    upcoming: meetings.filter(m => m.status === 'Scheduled').length,
    completed: meetings.filter(m => m.status === 'Completed').length,
    cancelled: meetings.filter(m => m.status === 'Cancelled').length,
  };

  const renderMeeting = (meeting: Meeting) => {
    const tc = typeConfig[meeting.type];
    const sc = statusConfig[meeting.status];
    return (
      <div
        key={meeting.id}
        style={{
          background: C.white,
          borderRadius: 10,
          border: `1px solid ${C.border}`,
          padding: '16px 20px',
          marginBottom: 10,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          cursor: 'pointer',
          transition: 'box-shadow 0.15s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: C.forest }}>{meeting.title}</span>
              <span style={{
                padding: '3px 10px', borderRadius: 12,
                background: tc.bg, color: tc.color, fontSize: 11, fontWeight: 700,
              }}>
                {meeting.type}
              </span>
            </div>
            <span style={{ fontSize: 13, color: C.muted, fontWeight: 500 }}>{meeting.account}</span>
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '4px 12px', borderRadius: 12,
            background: sc.bg, color: sc.color, fontSize: 12, fontWeight: 600,
          }}>
            {sc.icon} {meeting.status}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10, fontSize: 12, color: '#374151', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Calendar size={13} color={C.muted} />
            {new Date(meeting.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Clock size={13} color={C.muted} /> {meeting.time}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            {modeIcon[meeting.mode]}
            {meeting.mode === 'video' ? 'Video Call' : meeting.mode === 'phone' ? 'Phone' : 'In-Person'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.muted }}>
          <Users size={13} />
          <span>{meeting.attendees.join(' · ')}</span>
        </div>
      </div>
    );
  };

  return (
    <div style={{ background: C.paper, minHeight: '100vh', padding: 32 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ background: C.forest, borderRadius: 10, padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Calendar size={22} color={C.gold} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: C.forest }}>Meetings</h1>
          <p style={{ margin: 0, fontSize: 13, color: C.muted }}>Schedule and manage account meetings</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          { label: 'Total This Month', value: stats.total, color: C.forest, bg: C.goldLight },
          { label: 'Upcoming', value: stats.upcoming, color: '#2563EB', bg: '#DBEAFE' },
          { label: 'Completed', value: stats.completed, color: C.green, bg: '#D1FAE5' },
          { label: 'Cancelled', value: stats.cancelled, color: C.red, bg: '#FEE2E2' },
        ].map(s => (
          <div key={s.label} style={{
            background: s.bg, borderRadius: 8, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</span>
            <span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Upcoming Section */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: C.forest, margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Clock size={18} color={C.gold} /> Upcoming — Next 7 Days
          <span style={{ fontSize: 12, fontWeight: 500, color: C.muted, marginLeft: 4 }}>({upcoming.length})</span>
        </h2>
        {upcoming.map(renderMeeting)}
      </div>

      {/* Recent Section */}
      <div>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: C.forest, margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle size={18} color={C.green} /> Recent — Last 14 Days
          <span style={{ fontSize: 12, fontWeight: 500, color: C.muted, marginLeft: 4 }}>({recent.length})</span>
        </h2>
        {recent.map(renderMeeting)}
      </div>
    </div>
  );
}
