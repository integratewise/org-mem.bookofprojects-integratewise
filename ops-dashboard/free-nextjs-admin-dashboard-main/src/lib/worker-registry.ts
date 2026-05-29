/**
 * Worker Registry
 * 
 * Tracks all Cloudflare Workers in the ecosystem.
 * Maintains backup/passive workers for failover.
 * 
 * Registry entries:
 * - Active workers (production)
 * - Backup workers (standby)
 * - Passive workers (disabled, ready to activate)
 */

import { MCP_CONFIG, getMCPHeaders, buildMCPRequest } from '@/lib/mcp-config';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface WorkerEntry {
  id: string;
  name: string;
  type: 'active' | 'backup' | 'passive';
  status: 'healthy' | 'degraded' | 'down' | 'unknown';
  url: string;
  service_binding?: string;
  description: string;
  capabilities: string[];
  last_health_check: string;
  health_check_interval_ms: number;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, any>;
}

export interface WorkerHealth {
  worker_id: string;
  status: 'healthy' | 'degraded' | 'down';
  latency_ms: number;
  error_rate: number;
  last_check: string;
  uptime_percentage: number;
  incidents: WorkerIncident[];
}

export interface WorkerIncident {
  id: string;
  worker_id: string;
  type: 'outage' | 'degradation' | 'error';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  started_at: string;
  resolved_at?: string;
  resolution?: string;
}

// ─── Worker Registry Client ────────────────────────────────────────────────

export class WorkerRegistryClient {
  private endpoint: string;
  private headers: Record<string, string>;

  constructor() {
    this.endpoint = MCP_CONFIG.endpoint;
    this.headers = getMCPHeaders();
  }

  /**
   * Register a worker
   */
  async registerWorker(worker: Omit<WorkerEntry, 'id' | 'created_at' | 'updated_at'>): Promise<WorkerEntry> {
    const request = buildMCPRequest('workers.register', {
      name: worker.name,
      type: worker.type,
      status: worker.status,
      url: worker.url,
      service_binding: worker.service_binding,
      description: worker.description,
      capabilities: worker.capabilities,
      health_check_interval_ms: worker.health_check_interval_ms,
      metadata: worker.metadata || {},
    });

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(request),
    });

    const data = await response.json();
    if (data.status === 'error') throw new Error(data.error?.message);
    return data.result;
  }

  /**
   * Get all workers
   */
  async getWorkers(type?: 'active' | 'backup' | 'passive'): Promise<WorkerEntry[]> {
    const request = buildMCPRequest('workers.list', { type });

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(request),
    });

    const data = await response.json();
    if (data.status === 'error') throw new Error(data.error?.message);
    return data.result?.workers || [];
  }

  /**
   * Get worker health
   */
  async getWorkerHealth(workerId: string): Promise<WorkerHealth> {
    const request = buildMCPRequest('workers.health', { worker_id: workerId });

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(request),
    });

    const data = await response.json();
    if (data.status === 'error') throw new Error(data.error?.message);
    return data.result;
  }

  /**
   * Update worker status
   */
  async updateWorkerStatus(workerId: string, status: WorkerEntry['status']): Promise<void> {
    const request = buildMCPRequest('workers.update_status', {
      worker_id: workerId,
      status,
    });

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(request),
    });

    const data = await response.json();
    if (data.status === 'error') throw new Error(data.error?.message);
  }

  /**
   * Activate backup worker
   */
  async activateBackup(workerId: string): Promise<WorkerEntry> {
    const request = buildMCPRequest('workers.activate_backup', {
      worker_id: workerId,
    });

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(request),
    });

    const data = await response.json();
    if (data.status === 'error') throw new Error(data.error?.message);
    return data.result;
  }

  /**
   * Get incidents
   */
  async getIncidents(workerId?: string): Promise<WorkerIncident[]> {
    const request = buildMCPRequest('workers.incidents', { worker_id: workerId });

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(request),
    });

    const data = await response.json();
    if (data.status === 'error') throw new Error(data.error?.message);
    return data.result?.incidents || [];
  }

  /**
   * Report incident
   */
  async reportIncident(incident: Omit<WorkerIncident, 'id' | 'started_at'>): Promise<WorkerIncident> {
    const request = buildMCPRequest('workers.report_incident', {
      worker_id: incident.worker_id,
      type: incident.type,
      severity: incident.severity,
      description: incident.description,
    });

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(request),
    });

    const data = await response.json();
    if (data.status === 'error') throw new Error(data.error?.message);
    return data.result;
  }
}

// ─── Singleton ─────────────────────────────────────────────────────────────

export const workerRegistry = new WorkerRegistryClient();
