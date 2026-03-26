/**
 * Backup & Restore System
 * Automated backups, disaster recovery, and data export
 */

import { loadJson, saveJson } from './storage';
import { audit } from './auditLog';

export interface Backup {
  id: string;
  timestamp: number;
  createdBy: string;
  size: number;
  type: 'manual' | 'scheduled' | 'auto';
  description?: string;
  data: BackupData;
  compressed: boolean;
}

export interface BackupData {
  version: string;
  exportedAt: number;
  documents: Record<string, string>;
  assets: any[];
  versions: any[];
  users: any[];
  settings: Record<string, any>;
  auditLog: any[];
  endpoints: any[];
}

export interface BackupSchedule {
  enabled: boolean;
  frequency: 'hourly' | 'daily' | 'weekly';
  time: string; // HH:MM format
  dayOfWeek?: number; // 0-6 for weekly
  keepCount: number; // Number of backups to keep
  lastBackup?: number;
}

// Storage keys
const STORAGE_KEYS = {
  backups: 'backup_list',
  schedule: 'backup_schedule',
};

// Generate ID
function generateId(): string {
  return `backup-${Date.now()}`;
}

// Get all data for backup
function collectBackupData(): BackupData {
  return {
    version: '1.0.0',
    exportedAt: Date.now(),
    documents: collectAllDocuments(),
    assets: loadJson('am_assets', []),
    versions: loadJson('vc_versions', []),
    users: loadJson('auth_users', []),
    settings: collectAllSettings(),
    auditLog: loadJson('audit_log', []),
    endpoints: loadJson('webhook_endpoints', []),
  };
}

function collectAllDocuments(): Record<string, string> {
  // Collect from documentationContent
  const contentMap: Record<string, string> = {};
  
  // Get all localStorage keys that contain document content
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('integratewise-brand-documentations:')) {
      const shortKey = key.replace('integratewise-brand-documentations:', '');
      try {
        contentMap[shortKey] = localStorage.getItem(key) || '';
      } catch (e) {
        // Skip if can't read
      }
    }
  }
  
  return contentMap;
}

function collectAllSettings(): Record<string, any> {
  const settings: Record<string, any> = {};
  
  const settingKeys = [
    'backup_schedule',
    'vc_current_branch',
    'auth_session',
    'auth_preferences',
  ];
  
  settingKeys.forEach(key => {
    settings[key] = loadJson(key, null);
  });
  
  return settings;
}

// Create backup
export async function createBackup(
  type: Backup['type'] = 'manual',
  description?: string,
  createdBy: string = 'system'
): Promise<Backup> {
  const data = collectBackupData();
  const dataString = JSON.stringify(data);
  
  // Compress if large
  const shouldCompress = dataString.length > 100000;
  let finalData: any = data;
  let size = dataString.length;
  
  if (shouldCompress) {
    // Simple compression - in production use a real compression library
    finalData = {
      _compressed: true,
      _data: dataString, // Would be compressed
    };
  }
  
  const backup: Backup = {
    id: generateId(),
    timestamp: Date.now(),
    createdBy,
    size,
    type,
    description,
    data: finalData,
    compressed: shouldCompress,
  };
  
  const backups = getBackups();
  backups.push(backup);
  
  // Save to localStorage (in production, upload to cloud storage)
  saveJson(STORAGE_KEYS.backups, backups);
  
  audit.backup.manage('system', 'Backup Created', { 
    type, 
    size, 
    compressed: shouldCompact 
  });
  
  // Clean old backups
  cleanupOldBackups();
  
  return backup;
}

// Get backups
export function getBackups(): Backup[] {
  return loadJson<Backup[]>(STORAGE_KEYS.backups, []);
}

// Get backup by ID
export function getBackup(id: string): Backup | null {
  const backups = getBackups();
  return backups.find(b => b.id === id) || null;
}

// Download backup
export function downloadBackup(backup: Backup): void {
  const blob = new Blob([JSON.stringify(backup.data, null, 2)], {
    type: 'application/json',
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `integratewise-backup-${backup.id}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  audit.backup.manage('system', 'Backup Downloaded', { backupId: backup.id });
}

// Restore from backup
export async function restoreBackup(backupId: string): Promise<void> {
  const backup = getBackup(backupId);
  if (!backup) {
    throw new Error('Backup not found');
  }
  
  // Decompress if needed
  let data: BackupData;
  if (backup.compressed && (backup.data as any)._compressed) {
    data = JSON.parse((backup.data as any)._data);
  } else {
    data = backup.data as BackupData;
  }
  
  // Confirm restore (would show UI in production)
  if (!confirm(`Restore backup from ${new Date(backup.timestamp).toLocaleString()}? This will overwrite current data.`)) {
    return;
  }
  
  // Create restore point before restoring
  await createBackup('auto', 'Auto-backup before restore', 'system');
  
  // Restore documents
  Object.entries(data.documents).forEach(([key, value]) => {
    localStorage.setItem(`integratewise-brand-documentations:${key}`, value);
  });
  
  // Restore other data
  saveJson('am_assets', data.assets);
  saveJson('vc_versions', data.versions);
  saveJson('auth_users', data.users);
  saveJson('audit_log', data.auditLog);
  saveJson('webhook_endpoints', data.endpoints);
  
  // Restore settings
  Object.entries(data.settings).forEach(([key, value]) => {
    if (value !== null) {
      saveJson(key, value);
    }
  });
  
  audit.backup.manage('system', 'Backup Restored', { backupId: backup.id });
}

// Import backup from file
export async function importBackupFile(file: File): Promise<Backup> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        const backup: Backup = {
          id: generateId(),
          timestamp: Date.now(),
          createdBy: 'import',
          size: (e.target?.result as string).length,
          type: 'manual',
          description: `Imported from ${file.name}`,
          data,
          compressed: false,
        };
        
        const backups = getBackups();
        backups.push(backup);
        saveJson(STORAGE_KEYS.backups, backups);
        
        audit.backup.manage('system', 'Backup Imported', { 
          filename: file.name,
          size: backup.size 
        });
        
        resolve(backup);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

// Delete backup
export function deleteBackup(backupId: string): void {
  const backups = getBackups().filter(b => b.id !== backupId);
  saveJson(STORAGE_KEYS.backups, backups);
  
  audit.backup.manage('system', 'Backup Deleted', { backupId });
}

// Schedule configuration
export function getSchedule(): BackupSchedule {
  return loadJson<BackupSchedule>(STORAGE_KEYS.schedule, {
    enabled: true,
    frequency: 'daily',
    time: '02:00',
    keepCount: 7,
  });
}

export function saveSchedule(schedule: BackupSchedule): void {
  saveJson(STORAGE_KEYS.schedule, schedule);
  audit.backup.manage('system', 'Backup Schedule Updated', schedule);
}

// Check and run scheduled backup
export async function checkScheduledBackup(): Promise<Backup | null> {
  const schedule = getSchedule();
  
  if (!schedule.enabled) return null;
  
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const [scheduledHour, scheduledMinute] = schedule.time.split(':').map(Number);
  
  // Check if it's time for backup
  if (currentHour !== scheduledHour || currentMinute !== scheduledMinute) {
    return null;
  }
  
  // Check last backup
  if (schedule.lastBackup) {
    const lastBackup = new Date(schedule.lastBackup);
    const hoursSinceLastBackup = (now.getTime() - lastBackup.getTime()) / (1000 * 60 * 60);
    
    // Don't backup more frequently than scheduled
    switch (schedule.frequency) {
      case 'hourly':
        if (hoursSinceLastBackup < 1) return null;
        break;
      case 'daily':
        if (hoursSinceLastBackup < 24) return null;
        break;
      case 'weekly':
        if (hoursSinceLastBackup < 24 * 7) return null;
        if (schedule.dayOfWeek !== undefined && now.getDay() !== schedule.dayOfWeek) {
          return null;
        }
        break;
    }
  }
  
  // Create backup
  const backup = await createBackup('scheduled', `Scheduled ${schedule.frequency} backup`);
  
  // Update last backup time
  schedule.lastBackup = Date.now();
  saveSchedule(schedule);
  
  return backup;
}

// Cleanup old backups
function cleanupOldBackups(): void {
  const schedule = getSchedule();
  const backups = getBackups();
  
  if (backups.length <= schedule.keepCount) return;
  
  // Sort by timestamp (oldest first)
  const sorted = backups.sort((a, b) => a.timestamp - b.timestamp);
  
  // Keep the most recent ones
  const toKeep = sorted.slice(-schedule.keepCount);
  
  saveJson(STORAGE_KEYS.backups, toKeep);
}

// Export all data (full system export)
export async function exportFullSystem(): Promise<Blob> {
  const data = collectBackupData();
  
  // Create a full export backup
  const backup = await createBackup('manual', 'Full system export');
  
  return new Blob([JSON.stringify(backup.data, null, 2)], {
    type: 'application/json',
  });
}

// Get backup stats
export function getBackupStats(): {
  totalBackups: number;
  totalSize: number;
  oldestBackup?: Date;
  newestBackup?: Date;
  schedule: BackupSchedule;
  nextBackup?: Date;
} {
  const backups = getBackups();
  const schedule = getSchedule();
  
  const sorted = backups.sort((a, b) => a.timestamp - b.timestamp);
  
  // Calculate next backup
  let nextBackup: Date | undefined;
  if (schedule.enabled && schedule.lastBackup) {
    nextBackup = new Date(schedule.lastBackup);
    switch (schedule.frequency) {
      case 'hourly':
        nextBackup.setHours(nextBackup.getHours() + 1);
        break;
      case 'daily':
        nextBackup.setDate(nextBackup.getDate() + 1);
        break;
      case 'weekly':
        nextBackup.setDate(nextBackup.getDate() + 7);
        break;
    }
  }
  
  return {
    totalBackups: backups.length,
    totalSize: backups.reduce((sum, b) => sum + b.size, 0),
    oldestBackup: sorted[0] ? new Date(sorted[0].timestamp) : undefined,
    newestBackup: sorted[sorted.length - 1] ? new Date(sorted[sorted.length - 1].timestamp) : undefined,
    schedule,
    nextBackup,
  };
}

// Initialize backup system
export function initBackupSystem(): void {
  // Run check every minute
  setInterval(() => {
    checkScheduledBackup().catch(console.error);
  }, 60000);
  
  audit.backup.manage('system', 'Backup System Initialized', {});
}
