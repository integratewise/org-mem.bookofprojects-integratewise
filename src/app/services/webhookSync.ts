/**
 * Real Backend Sync Service
 * Webhook integrations for external systems with actual API calls
 */

import { loadJson, saveJson } from '../lib/storage';
import { audit } from '../lib/auditLog';

export interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  method: 'POST' | 'PUT' | 'PATCH';
  headers: Record<string, string>;
  authType: 'none' | 'bearer' | 'basic' | 'apiKey';
  authConfig: {
    token?: string;
    username?: string;
    password?: string;
    apiKey?: string;
    apiKeyHeader?: string;
  };
  retryConfig: {
    maxRetries: number;
    retryDelay: number;
    backoffMultiplier: number;
  };
  enabled: boolean;
  lastUsed?: number;
  successRate: number;
}

export interface SyncPayload {
  event: string;
  timestamp: number;
  data: any;
  metadata: {
    source: string;
    version: string;
    userId: string;
  };
}

export interface SyncResult {
  success: boolean;
  endpointId: string;
  timestamp: number;
  responseStatus?: number;
  responseBody?: string;
  error?: string;
  retries: number;
  duration: number;
}

// Storage
const STORAGE_KEYS = {
  endpoints: 'webhook_endpoints',
  history: 'webhook_history',
  queue: 'webhook_queue',
};

// Get endpoints
export function getEndpoints(): WebhookEndpoint[] {
  return loadJson<WebhookEndpoint[]>(STORAGE_KEYS.endpoints, []);
}

// Save endpoint
export function saveEndpoint(endpoint: WebhookEndpoint): void {
  const endpoints = getEndpoints();
  const index = endpoints.findIndex(e => e.id === endpoint.id);
  
  if (index >= 0) {
    endpoints[index] = endpoint;
  } else {
    endpoints.push(endpoint);
  }
  
  saveJson(STORAGE_KEYS.endpoints, endpoints);
}

// Delete endpoint
export function deleteEndpoint(endpointId: string): void {
  const endpoints = getEndpoints().filter(e => e.id !== endpointId);
  saveJson(STORAGE_KEYS.endpoints, endpoints);
}

// Test endpoint
export async function testEndpoint(endpoint: WebhookEndpoint): Promise<SyncResult> {
  const testPayload: SyncPayload = {
    event: 'test',
    timestamp: Date.now(),
    data: { message: 'Test connection from IntegrateWise Brand Hub' },
    metadata: {
      source: 'integratewise-brand-hub',
      version: '1.0.0',
      userId: 'system',
    },
  };
  
  return sendWebhook(endpoint, testPayload);
}

// Send webhook with retries
export async function sendWebhook(
  endpoint: WebhookEndpoint,
  payload: SyncPayload
): Promise<SyncResult> {
  const startTime = Date.now();
  let retries = 0;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...endpoint.headers,
  };
  
  // Add authentication
  switch (endpoint.authType) {
    case 'bearer':
      headers['Authorization'] = `Bearer ${endpoint.authConfig.token}`;
      break;
    case 'basic':
      headers['Authorization'] = `Basic ${btoa(
        `${endpoint.authConfig.username}:${endpoint.authConfig.password}`
      )}`;
      break;
    case 'apiKey':
      headers[endpoint.authConfig.apiKeyHeader || 'X-API-Key'] = endpoint.authConfig.apiKey || '';
      break;
  }
  
  const fetchWithRetry = async (): Promise<Response> => {
    try {
      const response = await fetch(endpoint.url, {
        method: endpoint.method,
        headers,
        body: JSON.stringify(payload),
      });
      
      if (!response.ok && retries < endpoint.retryConfig.maxRetries) {
        retries++;
        const delay = endpoint.retryConfig.retryDelay * 
          Math.pow(endpoint.retryConfig.backoffMultiplier, retries - 1);
        await new Promise(r => setTimeout(r, delay));
        return fetchWithRetry();
      }
      
      return response;
    } catch (error) {
      if (retries < endpoint.retryConfig.maxRetries) {
        retries++;
        const delay = endpoint.retryConfig.retryDelay * 
          Math.pow(endpoint.retryConfig.backoffMultiplier, retries - 1);
        await new Promise(r => setTimeout(r, delay));
        return fetchWithRetry();
      }
      throw error;
    }
  };
  
  try {
    const response = await fetchWithRetry();
    const responseBody = await response.text();
    const duration = Date.now() - startTime;
    
    const result: SyncResult = {
      success: response.ok,
      endpointId: endpoint.id,
      timestamp: Date.now(),
      responseStatus: response.status,
      responseBody: responseBody.substring(0, 1000), // Limit stored size
      retries,
      duration,
    };
    
    // Update endpoint stats
    endpoint.lastUsed = Date.now();
    const history = getSyncHistory().filter(h => h.endpointId === endpoint.id);
    const recentSuccess = history.slice(-10).filter(h => h.success).length;
    endpoint.successRate = history.length > 0 ? recentSuccess / Math.min(history.length, 10) : 1;
    saveEndpoint(endpoint);
    
    // Log to history
    logSyncResult(result);
    
    // Audit log
    if (result.success) {
      audit.sync.complete(endpoint.id, endpoint.name, { 
        event: payload.event,
        duration,
        retries 
      });
    } else {
      audit.sync.fail(endpoint.id, endpoint.name, `HTTP ${response.status}: ${responseBody}`);
    }
    
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    const result: SyncResult = {
      success: false,
      endpointId: endpoint.id,
      timestamp: Date.now(),
      error: error instanceof Error ? error.message : 'Unknown error',
      retries,
      duration,
    };
    
    logSyncResult(result);
    audit.sync.fail(endpoint.id, endpoint.name, result.error || 'Unknown error');
    
    // Add to retry queue
    addToRetryQueue(endpoint, payload);
    
    return result;
  }
}

// Sync history
export function getSyncHistory(limit: number = 100): SyncResult[] {
  const history = loadJson<SyncResult[]>(STORAGE_KEYS.history, []);
  return history
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
}

function logSyncResult(result: SyncResult): void {
  const history = loadJson<SyncResult[]>(STORAGE_KEYS.history, []);
  history.push(result);
  
  // Keep last 1000 entries
  if (history.length > 1000) {
    history.splice(0, history.length - 1000);
  }
  
  saveJson(STORAGE_KEYS.history, history);
}

// Retry queue
interface QueuedSync {
  id: string;
  endpointId: string;
  payload: SyncPayload;
  attempts: number;
  lastAttempt: number;
  nextAttempt: number;
}

function addToRetryQueue(endpoint: WebhookEndpoint, payload: SyncPayload): void {
  const queue = loadJson<QueuedSync[]>(STORAGE_KEYS.queue, []);
  
  queue.push({
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    endpointId: endpoint.id,
    payload,
    attempts: 1,
    lastAttempt: Date.now(),
    nextAttempt: Date.now() + 60000, // Retry in 1 minute
  });
  
  saveJson(STORAGE_KEYS.queue, queue);
}

export function getRetryQueue(): QueuedSync[] {
  return loadJson<QueuedSync[]>(STORAGE_KEYS.queue, []);
}

export async function processRetryQueue(): Promise<void> {
  const queue = getRetryQueue();
  const now = Date.now();
  const endpoints = getEndpoints();
  
  const toProcess = queue.filter(q => q.nextAttempt <= now);
  const remaining = queue.filter(q => q.nextAttempt > now);
  
  for (const item of toProcess) {
    const endpoint = endpoints.find(e => e.id === item.endpointId);
    if (!endpoint || !endpoint.enabled) {
      continue; // Skip disabled endpoints
    }
    
    const result = await sendWebhook(endpoint, item.payload);
    
    if (!result.success && item.attempts < 5) {
      // Re-queue with exponential backoff
      remaining.push({
        ...item,
        attempts: item.attempts + 1,
        lastAttempt: now,
        nextAttempt: now + (60000 * Math.pow(2, item.attempts)),
      });
    }
  }
  
  saveJson(STORAGE_KEYS.queue, remaining);
}

// Bulk sync
export async function bulkSync(
  endpointIds: string[],
  payload: SyncPayload
): Promise<SyncResult[]> {
  const endpoints = getEndpoints().filter(e => endpointIds.includes(e.id) && e.enabled);
  
  const results = await Promise.all(
    endpoints.map(endpoint => sendWebhook(endpoint, payload))
  );
  
  return results;
}

// Pre-configured integrations
export const presetIntegrations = {
  slack: (webhookUrl: string): WebhookEndpoint => ({
    id: `slack-${Date.now()}`,
    name: 'Slack',
    url: webhookUrl,
    method: 'POST',
    headers: {},
    authType: 'none',
    authConfig: {},
    retryConfig: { maxRetries: 3, retryDelay: 1000, backoffMultiplier: 2 },
    enabled: true,
    successRate: 1,
  }),
  
  notion: (token: string): WebhookEndpoint => ({
    id: `notion-${Date.now()}`,
    name: 'Notion',
    url: 'https://api.notion.com/v1/pages',
    method: 'POST',
    headers: {
      'Notion-Version': '2022-06-28',
    },
    authType: 'bearer',
    authConfig: { token },
    retryConfig: { maxRetries: 3, retryDelay: 1000, backoffMultiplier: 2 },
    enabled: true,
    successRate: 1,
  }),
  
  github: (token: string, repo: string): WebhookEndpoint => ({
    id: `github-${Date.now()}`,
    name: 'GitHub',
    url: `https://api.github.com/repos/${repo}/dispatches`,
    method: 'POST',
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    },
    authType: 'bearer',
    authConfig: { token },
    retryConfig: { maxRetries: 3, retryDelay: 1000, backoffMultiplier: 2 },
    enabled: true,
    successRate: 1,
  }),
  
  zapier: (webhookUrl: string): WebhookEndpoint => ({
    id: `zapier-${Date.now()}`,
    name: 'Zapier',
    url: webhookUrl,
    method: 'POST',
    headers: {},
    authType: 'none',
    authConfig: {},
    retryConfig: { maxRetries: 5, retryDelay: 2000, backoffMultiplier: 2 },
    enabled: true,
    successRate: 1,
  }),
  
  make: (webhookUrl: string): WebhookEndpoint => ({
    id: `make-${Date.now()}`,
    name: 'Make (Integromat)',
    url: webhookUrl,
    method: 'POST',
    headers: {},
    authType: 'none',
    authConfig: {},
    retryConfig: { maxRetries: 5, retryDelay: 2000, backoffMultiplier: 2 },
    enabled: true,
    successRate: 1,
  }),
};

// Sync stats
export function getWebhookStats(): {
  totalEndpoints: number;
  activeEndpoints: number;
  totalSyncs: number;
  successRate: number;
  averageDuration: number;
  queuedItems: number;
  recentErrors: SyncResult[];
} {
  const endpoints = getEndpoints();
  const history = getSyncHistory(100);
  const queue = getRetryQueue();
  
  const successful = history.filter(h => h.success).length;
  const avgDuration = history.length > 0 
    ? history.reduce((sum, h) => sum + h.duration, 0) / history.length 
    : 0;
  
  return {
    totalEndpoints: endpoints.length,
    activeEndpoints: endpoints.filter(e => e.enabled).length,
    totalSyncs: history.length,
    successRate: history.length > 0 ? successful / history.length : 0,
    averageDuration: avgDuration,
    queuedItems: queue.length,
    recentErrors: history.filter(h => !h.success).slice(0, 5),
  };
}
