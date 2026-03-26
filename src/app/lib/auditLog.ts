/**
 * Audit Logging System
 * Track all changes with user attribution, timestamps, and detailed context
 */

import { loadJson, saveJson } from './storage';

export type AuditAction = 
  | 'document.create'
  | 'document.update'
  | 'document.delete'
  | 'document.publish'
  | 'document.export'
  | 'asset.upload'
  | 'asset.update'
  | 'asset.delete'
  | 'asset.download'
  | 'user.login'
  | 'user.logout'
  | 'user.update'
  | 'sync.trigger'
  | 'sync.complete'
  | 'sync.fail'
  | 'version.commit'
  | 'version.revert'
  | 'setting.change'
  | 'export.generate'
  | 'ai.query';

export interface AuditEntry {
  id: string;
  timestamp: number;
  userId: string;
  userName: string;
  userEmail: string;
  action: AuditAction;
  resourceType: 'document' | 'asset' | 'user' | 'system' | 'sync' | 'version';
  resourceId: string;
  resourceName: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  changes?: {
    before: any;
    after: any;
  };
}

export interface AuditFilter {
  userId?: string;
  action?: AuditAction;
  resourceType?: string;
  resourceId?: string;
  severity?: AuditEntry['severity'];
  startDate?: Date;
  endDate?: Date;
  search?: string;
}

const STORAGE_KEY = 'audit_log';
const MAX_ENTRIES = 10000; // Keep last 10k entries

// Generate ID
function generateId(): string {
  return `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Get current user from session
function getCurrentUser(): { id: string; name: string; email: string } | null {
  // This would integrate with auth system
  const session = loadJson<{ user: { id: string; name: string; email: string } } | null>('session', null);
  return session?.user || null;
}

// Add audit entry
export function logAudit(
  action: AuditAction,
  resourceType: AuditEntry['resourceType'],
  resourceId: string,
  resourceName: string,
  details: Record<string, any> = {},
  severity: AuditEntry['severity'] = 'info',
  changes?: { before: any; after: any }
): AuditEntry {
  const user = getCurrentUser() || { id: 'anonymous', name: 'Anonymous', email: '' };
  
  const entry: AuditEntry = {
    id: generateId(),
    timestamp: Date.now(),
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    action,
    resourceType,
    resourceId,
    resourceName,
    details,
    severity,
    changes,
  };
  
  const entries = getAllEntries();
  entries.push(entry);
  
  // Trim to max entries
  if (entries.length > MAX_ENTRIES) {
    entries.splice(0, entries.length - MAX_ENTRIES);
  }
  
  saveJson(STORAGE_KEY, entries);
  
  // Also log to console in development
  if (import.meta.env.DEV) {
    console.log(`[AUDIT] ${action} by ${user.name}: ${resourceName}`, details);
  }
  
  return entry;
}

// Get all entries
export function getAllEntries(): AuditEntry[] {
  return loadJson<AuditEntry[]>(STORAGE_KEY, []);
}

// Filter entries
export function filterEntries(filter: AuditFilter): AuditEntry[] {
  let entries = getAllEntries();
  
  if (filter.userId) {
    entries = entries.filter(e => e.userId === filter.userId);
  }
  
  if (filter.action) {
    entries = entries.filter(e => e.action === filter.action);
  }
  
  if (filter.resourceType) {
    entries = entries.filter(e => e.resourceType === filter.resourceType);
  }
  
  if (filter.resourceId) {
    entries = entries.filter(e => e.resourceId === filter.resourceId);
  }
  
  if (filter.severity) {
    entries = entries.filter(e => e.severity === filter.severity);
  }
  
  if (filter.startDate) {
    const start = filter.startDate.getTime();
    entries = entries.filter(e => e.timestamp >= start);
  }
  
  if (filter.endDate) {
    const end = filter.endDate.getTime();
    entries = entries.filter(e => e.timestamp <= end);
  }
  
  if (filter.search) {
    const query = filter.search.toLowerCase();
    entries = entries.filter(e => 
      e.resourceName.toLowerCase().includes(query) ||
      e.userName.toLowerCase().includes(query) ||
      JSON.stringify(e.details).toLowerCase().includes(query)
    );
  }
  
  return entries.sort((a, b) => b.timestamp - a.timestamp);
}

// Get entries for a specific resource
export function getResourceHistory(
  resourceType: string,
  resourceId: string
): AuditEntry[] {
  return filterEntries({ resourceType, resourceId });
}

// Get user activity
export function getUserActivity(userId: string): AuditEntry[] {
  return filterEntries({ userId });
}

// Get recent activity
export function getRecentActivity(limit: number = 50): AuditEntry[] {
  const entries = getAllEntries();
  return entries
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
}

// Get activity stats
export function getActivityStats(): {
  totalEntries: number;
  byAction: Record<string, number>;
  byUser: Record<string, number>;
  bySeverity: Record<string, number>;
  recent24h: number;
  recent7d: number;
  recent30d: number;
} {
  const entries = getAllEntries();
  const now = Date.now();
  
  const byAction: Record<string, number> = {};
  const byUser: Record<string, number> = {};
  const bySeverity: Record<string, number> = {};
  
  let recent24h = 0;
  let recent7d = 0;
  let recent30d = 0;
  
  entries.forEach(entry => {
    byAction[entry.action] = (byAction[entry.action] || 0) + 1;
    byUser[entry.userName] = (byUser[entry.userName] || 0) + 1;
    bySeverity[entry.severity] = (bySeverity[entry.severity] || 0) + 1;
    
    const age = now - entry.timestamp;
    if (age < 24 * 60 * 60 * 1000) recent24h++;
    if (age < 7 * 24 * 60 * 60 * 1000) recent7d++;
    if (age < 30 * 24 * 60 * 60 * 1000) recent30d++;
  });
  
  return {
    totalEntries: entries.length,
    byAction,
    byUser,
    bySeverity,
    recent24h,
    recent7d,
    recent30d,
  };
}

// Export audit log
export function exportAuditLog(format: 'json' | 'csv' | 'txt', filter?: AuditFilter): string {
  const entries = filter ? filterEntries(filter) : getAllEntries();
  
  if (format === 'json') {
    return JSON.stringify(entries, null, 2);
  }
  
  if (format === 'csv') {
    const headers = ['Timestamp', 'User', 'Action', 'Resource Type', 'Resource', 'Severity', 'Details'];
    const rows = entries.map(e => [
      new Date(e.timestamp).toISOString(),
      e.userName,
      e.action,
      e.resourceType,
      e.resourceName,
      e.severity,
      JSON.stringify(e.details),
    ]);
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }
  
  // TXT format
  return entries.map(e => 
    `[${new Date(e.timestamp).toISOString()}] ${e.userName} - ${e.action} - ${e.resourceName} (${e.severity})`
  ).join('\n');
}

// Clear old entries
export function clearOldEntries(daysToKeep: number = 90): number {
  const entries = getAllEntries();
  const cutoff = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);
  
  const filtered = entries.filter(e => e.timestamp > cutoff);
  const removed = entries.length - filtered.length;
  
  saveJson(STORAGE_KEY, filtered);
  
  logAudit(
    'system.maintenance',
    'system',
    'audit-log',
    'Audit Log Cleanup',
    { removed, daysToKeep },
    'info'
  );
  
  return removed;
}

// High-level convenience functions
export const audit = {
  document: {
    create: (id: string, name: string, details?: any) =>
      logAudit('document.create', 'document', id, name, details, 'info'),
    update: (id: string, name: string, before: any, after: any, details?: any) =>
      logAudit('document.update', 'document', id, name, details, 'info', { before, after }),
    delete: (id: string, name: string, details?: any) =>
      logAudit('document.delete', 'document', id, name, details, 'warning'),
    publish: (id: string, name: string, details?: any) =>
      logAudit('document.publish', 'document', id, name, details, 'info'),
    export: (id: string, name: string, format: string) =>
      logAudit('document.export', 'document', id, name, { format }, 'info'),
  },
  
  asset: {
    upload: (id: string, name: string, details?: any) =>
      logAudit('asset.upload', 'asset', id, name, details, 'info'),
    update: (id: string, name: string, details?: any) =>
      logAudit('asset.update', 'asset', id, name, details, 'info'),
    delete: (id: string, name: string, details?: any) =>
      logAudit('asset.delete', 'asset', id, name, details, 'warning'),
    download: (id: string, name: string, details?: any) =>
      logAudit('asset.download', 'asset', id, name, details, 'info'),
  },
  
  user: {
    login: (id: string, name: string, details?: any) =>
      logAudit('user.login', 'user', id, name, details, 'info'),
    logout: (id: string, name: string) =>
      logAudit('user.logout', 'user', id, name, {}, 'info'),
    update: (id: string, name: string, details?: any) =>
      logAudit('user.update', 'user', id, name, details, 'info'),
  },
  
  sync: {
    trigger: (id: string, name: string, details?: any) =>
      logAudit('sync.trigger', 'sync', id, name, details, 'info'),
    complete: (id: string, name: string, details?: any) =>
      logAudit('sync.complete', 'sync', id, name, details, 'info'),
    fail: (id: string, name: string, error: string) =>
      logAudit('sync.fail', 'sync', id, name, { error }, 'error'),
  },
  
  version: {
    commit: (id: string, name: string, details?: any) =>
      logAudit('version.commit', 'version', id, name, details, 'info'),
    revert: (id: string, name: string, details?: any) =>
      logAudit('version.revert', 'version', id, name, details, 'warning'),
  },
  
  export: {
    generate: (id: string, name: string, format: string) =>
      logAudit('export.generate', 'document', id, name, { format }, 'info'),
  },
  
  ai: {
    query: (id: string, prompt: string, model: string) =>
      logAudit('ai.query', 'system', id, 'AI Query', { prompt: prompt.substring(0, 100), model }, 'info'),
  },
};

// Initialize audit system
export function initAuditSystem(): void {
  logAudit(
    'system.startup',
    'system',
    'audit-system',
    'Audit System Initialized',
    { maxEntries: MAX_ENTRIES },
    'info'
  );
}
