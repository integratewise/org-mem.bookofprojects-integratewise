/**
 * Status Monitor
 * 
 * Monitors health of all services, pipelines, and connections.
 * Provides real-time visibility into system status.
 */

import { MCP_CONFIG, getMCPHeaders, buildMCPRequest } from '@/lib/mcp-config';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface ServiceStatus {
  name: string;
  status: 'healthy' | 'degraded' | 'down' | 'unknown';
  latency: number;
  lastCheck: string;
  uptime: number;
  errorRate: number;
}

export interface PipelineStatus {
  name: string;
  status: 'active' | 'paused' | 'error';
  throughput: number;
  queueDepth: number;
  lastProcessed: string;
}

export interface ConnectionStatus {
  name: string;
  type: 'mcp' | 'database' | 'external';
  status: 'connected' | 'disconnected' | 'error';
  lastPing: string;
  latency: number;
}

export interface SystemStatus {
  services: ServiceStatus[];
  pipelines: PipelineStatus[];
  connections: ConnectionStatus[];
  overall: 'healthy' | 'degraded' | 'down';
  lastUpdated: string;
}

// ─── Status Monitor Client ─────────────────────────────────────────────────

export class StatusMonitorClient {
  private endpoint: string;
  private headers: Record<string, string>;

  constructor() {
    this.endpoint = MCP_CONFIG.endpoint;
    this.headers = getMCPHeaders();
  }

  /**
   * Get system status
   */
  async getSystemStatus(): Promise<SystemStatus> {
    const request = buildMCPRequest('status.get_system', {});

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
   * Get service status
   */
  async getServiceStatus(serviceName: string): Promise<ServiceStatus> {
    const request = buildMCPRequest('status.get_service', { service_name: serviceName });

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
   * Get pipeline status
   */
  async getPipelineStatus(pipelineName: string): Promise<PipelineStatus> {
    const request = buildMCPRequest('status.get_pipeline', { pipeline_name: pipelineName });

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
   * Get connection status
   */
  async getConnectionStatus(connectionName: string): Promise<ConnectionStatus> {
    const request = buildMCPRequest('status.get_connection', { connection_name: connectionName });

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

export const statusMonitor = new StatusMonitorClient();
