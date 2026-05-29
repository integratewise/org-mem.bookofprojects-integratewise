/**
 * Cache Memory — 24-Hour Abstract
 * 
 * Book of Projects format: Records + Trees + Graphs
 * Abstract/overview of the past 24 hours
 * Stored in Google Cloud Storage for fast access
 */

import { MCP_CONFIG, getMCPHeaders, buildMCPRequest } from '@/lib/mcp-config';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface CacheRecord {
  id: string;
  type: 'action' | 'decision' | 'insight' | 'error' | 'promotion' | 'triage';
  source: string;           // agent_id or user_id
  target: string;           // what was affected
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface CacheTree {
  id: string;
  root: string;             // root entity
  nodes: CacheTreeNode[];
  edges: CacheTreeEdge[];
  created_at: string;
}

export interface CacheTreeNode {
  id: string;
  label: string;
  type: 'entity' | 'action' | 'decision' | 'outcome';
  data?: Record<string, any>;
}

export interface CacheTreeEdge {
  from: string;
  to: string;
  relationship: string;     // 'caused', 'led_to', 'related_to', 'depends_on'
}

export interface CacheGraph {
  id: string;
  nodes: CacheGraphNode[];
  edges: CacheGraphEdge[];
  metrics: CacheMetrics;
  created_at: string;
}

export interface CacheGraphNode {
  id: string;
  label: string;
  type: 'agent' | 'tool' | 'memory' | 'entity';
  activity_count: number;
  last_active: string;
}

export interface CacheGraphEdge {
  from: string;
  to: string;
  weight: number;           // interaction frequency
  type: 'used' | 'created' | 'modified' | 'promoted';
}

export interface CacheMetrics {
  total_records: number;
  total_trees: number;
  total_graphs: number;
  agents_active: number;
  tools_used: number;
  memory_promotions: number;
  errors: number;
  time_range: {
    start: string;
    end: string;
  };
}

export interface CacheAbstract {
  id: string;
  date: string;
  records: CacheRecord[];
  trees: CacheTree[];
  graphs: CacheGraph[];
  metrics: CacheMetrics;
  summary: string;
  created_at: string;
}

// ─── Cache Memory Client ───────────────────────────────────────────────────

export class CacheMemoryClient {
  private endpoint: string;
  private headers: Record<string, string>;

  constructor() {
    this.endpoint = MCP_CONFIG.endpoint;
    this.headers = getMCPHeaders();
  }

  /**
   * Get 24-hour abstract
   */
  async getDailyAbstract(date?: string): Promise<CacheAbstract> {
    const request = buildMCPRequest('cache.get_daily_abstract', {
      date: date || new Date().toISOString().split('T')[0],
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
   * Get records for time range
   */
  async getRecords(startTime: string, endTime: string): Promise<CacheRecord[]> {
    const request = buildMCPRequest('cache.get_records', {
      start_time: startTime,
      end_time: endTime,
    });

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(request),
    });

    const data = await response.json();
    if (data.status === 'error') throw new Error(data.error?.message);
    return data.result?.records || [];
  }

  /**
   * Get trees for time range
   */
  async getTrees(startTime: string, endTime: string): Promise<CacheTree[]> {
    const request = buildMCPRequest('cache.get_trees', {
      start_time: startTime,
      end_time: endTime,
    });

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(request),
    });

    const data = await response.json();
    if (data.status === 'error') throw new Error(data.error?.message);
    return data.result?.trees || [];
  }

  /**
   * Get graphs for time range
   */
  async getGraphs(startTime: string, endTime: string): Promise<CacheGraph[]> {
    const request = buildMCPRequest('cache.get_graphs', {
      start_time: startTime,
      end_time: endTime,
    });

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(request),
    });

    const data = await response.json();
    if (data.status === 'error') throw new Error(data.error?.message);
    return data.result?.graphs || [];
  }

  /**
   * Get metrics for time range
   */
  async getMetrics(startTime: string, endTime: string): Promise<CacheMetrics> {
    const request = buildMCPRequest('cache.get_metrics', {
      start_time: startTime,
      end_time: endTime,
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
   * Store record
   */
  async storeRecord(record: Omit<CacheRecord, 'id' | 'timestamp'>): Promise<CacheRecord> {
    const request = buildMCPRequest('cache.store_record', record);

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
   * Store tree
   */
  async storeTree(tree: Omit<CacheTree, 'id' | 'created_at'>): Promise<CacheTree> {
    const request = buildMCPRequest('cache.store_tree', tree);

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
   * Store graph
   */
  async storeGraph(graph: Omit<CacheGraph, 'id' | 'created_at'>): Promise<CacheGraph> {
    const request = buildMCPRequest('cache.store_graph', graph);

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
   * Generate abstract from last 24 hours
   */
  async generateAbstract(): Promise<CacheAbstract> {
    const request = buildMCPRequest('cache.generate_abstract', {});

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

export const cacheMemory = new CacheMemoryClient();
