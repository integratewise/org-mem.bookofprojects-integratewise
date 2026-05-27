'use client';
import React, { useState } from 'react';
import { CheckCircle, Clock, AlertTriangle, Calendar, User, Filter, ChevronRight, Circle } from 'lucide-react';

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

type Task = {
  id: number;
  title: string;
  account: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
  status: 'Open' | 'In Progress' | 'Done' | 'Overdue';
};

const tasks: Task[] = [
  { id: 1, title: 'Renewal contract follow-up with Vantage leadership', account: 'Vantage Infra', dueDate: '2026-05-28', priority: 'High', assignee: 'Nirmal', status: 'Overdue' },
  { id: 2, title: 'Prepare QBR deck for Axiom Capital Q2 review', account: 'Axiom Capital', dueDate: '2026-05-30', priority: 'High', assignee: 'Nirmal', status: 'In Progress' },
  { id: 3, title: 'Send NPS survey to Orbit Dynamics contacts', account: 'Orbit Dynamics', dueDate: '2026-05-29', priority: 'Medium', assignee: 'Karan', status: 'Open' },
  { id: 4, title: 'Review MedCore contract amendment for HIPAA clause', account: 'MedCore Health', dueDate: '2026-06-02', priority: 'High', assignee: 'Priya', status: 'In Progress' },
  { id: 5, title: 'Schedule EBR with Crestline VP Operations', account: 'Crestline Mfg', dueDate: '2026-06-05', priority: 'Medium', assignee: 'Priya', status: 'Open' },
  { id: 6, title: 'Share MuleSoft 4.6 migration plan with Axiom DevOps', account: 'Axiom Capital', dueDate: '2026-05-27', priority: 'High', assignee: 'Nirmal', status: 'Overdue' },
  { id: 7, title: 'Update TechStack integration architecture document', account: 'TechStack SaaS', dueDate: '2026-06-01', priority: 'Low', assignee: 'Karan', status: 'Open' },
  { id: 8, title: 'Resolve HL7 FHIR adapter hotfix for MedCore prod', account: 'MedCore Health', dueDate: '2026-05-24', priority: 'High', assignee: 'Priya', status: 'Done' },
  { id: 9, title: 'Prepare customs API connector proposal for Orbit', account: 'Orbit Dynamics', dueDate: '2026-05-26', priority: 'Medium', assignee: 'Karan', status: 'Overdue' },
  { id: 10, title: 'Send annual health score report to Crestline', account: 'Crestline Mfg', dueDate: '2026-05-31', priority: 'Low', assignee: 'Priya', status: 'Done' },
];

const tabs = ['All', 'My Tasks', 'Overdue'];

const priorityConfig: Record<string, { color: string; bg: string }> = {
  High: { color: C.red, bg: '#FEE2E2' },
  Medium: { color: C.orange, bg: '#FEF3C7' },
  Low: { color: C.green, bg: '#D1FAE5' },
};

const statusIcon: Record<string, React.ReactNode> = {
  Open: <Circle size={16} color={C.muted} />,
  'In Progress': <Clock size={16} color={C.orange} />,
  Done: <CheckCircle size={16} color={C.green} />,
  Overdue: <AlertTriangle size={16} color={C.red} />,
};

const statusColor: Record<string, string> = {
  Open: C.muted,
  'In Progress': C.orange,
  Done: C.green,
  Overdue: C.red,
};

export default function TasksView() {
  const [activeTab, setActiveTab] = useState('All');

  const myName = 'Nirmal';
  const filtered = tasks.filter(t => {
    if (activeTab === 'My Tasks') return t.assignee === myName;
    if (activeTab === 'Overdue') return t.status === 'Overdue';
    return true;
  });

  const stats = {
    total: tasks.length,
    open: tasks.filter(t => t.status === 'Open').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    done: tasks.filter(t => t.status === 'Done').length,
    overdue: tasks.filter(t => t.status === 'Overdue').length,
  };

  return (
    <div style={{ background: C.paper, minHeight: '100vh', padding: 32 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ background: C.forest, borderRadius: 10, padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckCircle size={22} color={C.gold} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: C.forest }}>Tasks</h1>
          <p style={{ margin: 0, fontSize: 13, color: C.muted }}>Account success task management & tracking</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { label: 'Total', value: stats.total, color: C.forest, bg: C.goldLight },
          { label: 'Open', value: stats.open, color: C.muted, bg: '#F3F4F6' },
          { label: 'In Progress', value: stats.inProgress, color: C.orange, bg: '#FEF3C7' },
          { label: 'Done', value: stats.done, color: C.green, bg: '#D1FAE5' },
          { label: 'Overdue', value: stats.overdue, color: C.red, bg: '#FEE2E2' },
        ].map(s => (
          <div key={s.label} style={{
            background: s.bg, borderRadius: 8, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 8, minWidth: 100,
          }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</span>
            <span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
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
            }}
          >
            {tab}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 13, color: C.muted }}>{filtered.length} tasks</span>
      </div>

      {/* Table */}
      <div style={{ background: C.white, borderRadius: 10, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2.5fr 1.2fr 1fr 0.8fr 1fr 1fr 0.5fr',
          gap: 8,
          padding: '12px 20px',
          background: C.forest,
          color: C.white,
          fontSize: 12,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}>
          <span>Task</span>
          <span>Account</span>
          <span>Due Date</span>
          <span>Priority</span>
          <span>Assignee</span>
          <span>Status</span>
          <span></span>
        </div>

        {/* Table Rows */}
        {filtered.map((task, i) => {
          const pc = priorityConfig[task.priority];
          const isOverdue = task.status === 'Overdue';
          return (
            <div
              key={task.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '2.5fr 1.2fr 1fr 0.8fr 1fr 1fr 0.5fr',
                gap: 8,
                padding: '14px 20px',
                alignItems: 'center',
                background: isOverdue ? '#FEF2F2' : i % 2 === 0 ? C.white : C.cardBg,
                borderBottom: `1px solid ${C.border}`,
                fontSize: 13,
              }}
            >
              <span style={{ fontWeight: 600, color: C.forest }}>{task.title}</span>
              <span style={{ color: C.muted, fontSize: 12 }}>{task.account}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: isOverdue ? C.red : '#374151', fontSize: 12, fontWeight: isOverdue ? 600 : 400 }}>
                <Calendar size={13} />
                {new Date(task.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                padding: '3px 10px', borderRadius: 12,
                background: pc.bg, color: pc.color, fontSize: 11, fontWeight: 700, width: 'fit-content',
              }}>
                {task.priority}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#374151', fontSize: 12 }}>
                <User size={13} color={C.muted} /> {task.assignee}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: statusColor[task.status], fontSize: 12, fontWeight: 600 }}>
                {statusIcon[task.status]} {task.status}
              </span>
              <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ChevronRight size={16} color={C.muted} style={{ cursor: 'pointer' }} />
              </span>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 48, color: C.muted, fontSize: 14 }}>
          <CheckCircle size={32} style={{ marginBottom: 8, opacity: 0.4 }} />
          <p>No tasks match this filter.</p>
        </div>
      )}
    </div>
  );
}
