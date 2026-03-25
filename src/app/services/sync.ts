// Central Sync Service for Control Panel
// Manages connections and syncs to external Sales, GTM, Marketing, and Branding systems
import { loadJson, saveJson } from '../lib/storage';

export interface SyncConnection {
  id: string;
  name: string;
  type: 'sales' | 'gtm' | 'marketing' | 'branding' | 'website' | 'crm';
  endpoint: string;
  apiKey: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: Date;
  autoSync: boolean;
}

export interface SyncJob {
  id: string;
  connectionId: string;
  entityType: 'content' | 'banner' | 'slide' | 'email' | 'template';
  entityId: string;
  action: 'create' | 'update' | 'delete';
  payload: any;
  status: 'pending' | 'syncing' | 'completed' | 'failed';
  error?: string;
  createdAt: Date;
  completedAt?: Date;
}

// Default connections configuration
const DEFAULT_CONNECTIONS: SyncConnection[] = [
  {
    id: 'sales-crm',
    name: 'Sales CRM',
    type: 'sales',
    endpoint: '',
    apiKey: '',
    status: 'disconnected',
    autoSync: false
  },
  {
    id: 'marketing-site',
    name: 'Marketing Website',
    type: 'marketing',
    endpoint: '',
    apiKey: '',
    status: 'disconnected',
    autoSync: false
  },
  {
    id: 'gtm-hub',
    name: 'GTM Command Center',
    type: 'gtm',
    endpoint: '',
    apiKey: '',
    status: 'disconnected',
    autoSync: false
  },
  {
    id: 'branding-portal',
    name: 'Brand Portal',
    type: 'branding',
    endpoint: '',
    apiKey: '',
    status: 'disconnected',
    autoSync: false
  }
];

// Load connections from localStorage
export function loadConnections(): SyncConnection[] {
  return loadJson('sync_connections', DEFAULT_CONNECTIONS);
}

// Save connections
export function saveConnections(connections: SyncConnection[]) {
  saveJson('sync_connections', connections);
}

// Load sync queue
export function loadSyncQueue(): SyncJob[] {
  return loadJson('sync_queue', []);
}

// Save sync queue
export function saveSyncQueue(queue: SyncJob[]) {
  saveJson('sync_queue', queue);
}

// Add job to sync queue
export function queueSync(
  connectionId: string,
  entityType: SyncJob['entityType'],
  entityId: string,
  action: SyncJob['action'],
  payload: any
): SyncJob {
  const job: SyncJob = {
    id: Date.now().toString(),
    connectionId,
    entityType,
    entityId,
    action,
    payload,
    status: 'pending',
    createdAt: new Date()
  };
  
  const queue = loadSyncQueue();
  queue.push(job);
  saveSyncQueue(queue);
  
  return job;
}

// Execute sync job
export async function executeSync(job: SyncJob): Promise<SyncJob> {
  const connections = loadConnections();
  const connection = connections.find(c => c.id === job.connectionId);
  
  if (!connection) {
    return { ...job, status: 'failed', error: 'Connection not found' };
  }
  
  if (connection.status !== 'connected') {
    return { ...job, status: 'pending', error: 'Connection not active' };
  }
  
  try {
    // In production, this would make actual API calls
    // For now, simulate the API call
    const response = await simulateSyncCall(connection, job);
    
    if (response.success) {
      return {
        ...job,
        status: 'completed',
        completedAt: new Date()
      };
    } else {
      return {
        ...job,
        status: 'failed',
        error: response.error || 'Sync failed'
      };
    }
  } catch (error) {
    return {
      ...job,
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Simulate API call (replace with real implementation)
async function simulateSyncCall(
  connection: SyncConnection,
  job: SyncJob
): Promise<{ success: boolean; error?: string }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In production, make actual HTTP request:
  // const response = await fetch(connection.endpoint, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${connection.apiKey}`
  //   },
  //   body: JSON.stringify({
  //     action: job.action,
  //     entityType: job.entityType,
  //     data: job.payload
  //   })
  // });
  
  // For demo, simulate success
  return { success: true };
}

// Test connection
export async function testConnection(connection: SyncConnection): Promise<boolean> {
  try {
    if (!connection.endpoint || !connection.apiKey) {
      return false;
    }
    
    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In production:
    // const response = await fetch(`${connection.endpoint}/health`, {
    //   headers: { 'Authorization': `Bearer ${connection.apiKey}` }
    // });
    // return response.ok;
    
    return true;
  } catch {
    return false;
  }
}

// Process all pending syncs
export async function processSyncQueue(
  onProgress?: (job: SyncJob) => void
): Promise<void> {
  const queue = loadSyncQueue();
  const pending = queue.filter(j => j.status === 'pending');
  
  for (const job of pending) {
    const updated = await executeSync({ ...job, status: 'syncing' });
    
    // Update queue
    const index = queue.findIndex(j => j.id === job.id);
    if (index !== -1) {
      queue[index] = updated;
      saveSyncQueue(queue);
    }
    
    onProgress?.(updated);
  }
}

// Auto-sync content changes
export function autoSyncContent(
  entityType: SyncJob['entityType'],
  entityId: string,
  payload: any
) {
  const connections = loadConnections();
  const autoSyncConnections = connections.filter(c => c.autoSync && c.status === 'connected');
  
  for (const connection of autoSyncConnections) {
    queueSync(connection.id, entityType, entityId, 'update', payload);
  }
  
  // Process queue immediately for auto-sync
  processSyncQueue();
}

// Get sync stats
export function getSyncStats() {
  const queue = loadSyncQueue();
  return {
    total: queue.length,
    pending: queue.filter(j => j.status === 'pending').length,
    completed: queue.filter(j => j.status === 'completed').length,
    failed: queue.filter(j => j.status === 'failed').length,
    syncing: queue.filter(j => j.status === 'syncing').length
  };
}

// Clear completed jobs
export function clearCompletedJobs() {
  const queue = loadSyncQueue();
  const filtered = queue.filter(j => j.status !== 'completed');
  saveSyncQueue(filtered);
}
