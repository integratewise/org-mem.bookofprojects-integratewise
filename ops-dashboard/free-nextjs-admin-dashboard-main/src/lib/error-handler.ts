/**
 * Error Handler
 * 
 * Centralized error handling, reporting, and correction.
 * Captures errors from all surfaces and writes to shared memory.
 */

import { MCP_CONFIG, getMCPHeaders, buildMCPRequest } from '@/lib/mcp-config';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface ErrorReport {
  id: string;
  type: 'frontend' | 'api' | 'pipeline' | 'worker' | 'unknown';
  source: string;
  message: string;
  stack?: string;
  context?: Record<string, any>;
  timestamp: string;
  resolved: boolean;
  resolution?: string;
}

// ─── Error Handler Client ──────────────────────────────────────────────────

export class ErrorHandlerClient {
  private endpoint: string;
  private headers: Record<string, string>;

  constructor() {
    this.endpoint = MCP_CONFIG.endpoint;
    this.headers = getMCPHeaders();
  }

  /**
   * Report an error
   */
  async reportError(error: Omit<ErrorReport, 'id' | 'timestamp' | 'resolved'>): Promise<void> {
    const request = buildMCPRequest('memory.upsert_org', {
      category: 'error',
      key: `error_${Date.now()}`,
      content: JSON.stringify({
        type: error.type,
        source: error.source,
        message: error.message,
        stack: error.stack,
        context: error.context,
      }),
      source: error.source,
      confidence: 1.0,
      governance_state: 'approved',
    });

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(request),
      });

      const data = await response.json();
      if (data.status === 'error') {
        console.error('Failed to report error:', data.error?.message);
      }
    } catch (err) {
      console.error('Failed to report error:', err);
    }
  }

  /**
   * Capture frontend error
   */
  async captureFrontendError(error: Error, componentStack?: string): Promise<void> {
    await this.reportError({
      type: 'frontend',
      source: 'browser',
      message: error.message,
      stack: error.stack,
      context: { componentStack },
    });
  }

  /**
   * Capture API error
   */
  async captureApiError(endpoint: string, status: number, message: string): Promise<void> {
    await this.reportError({
      type: 'api',
      source: endpoint,
      message: `API error ${status}: ${message}`,
      context: { endpoint, status },
    });
  }

  /**
   * Capture pipeline error
   */
  async capturePipelineError(pipeline: string, stage: string, message: string): Promise<void> {
    await this.reportError({
      type: 'pipeline',
      source: `${pipeline}.${stage}`,
      message,
      context: { pipeline, stage },
    });
  }

  /**
   * Capture worker error
   */
  async captureWorkerError(worker: string, message: string): Promise<void> {
    await this.reportError({
      type: 'worker',
      source: worker,
      message,
      context: { worker },
    });
  }
}

// ─── Singleton ─────────────────────────────────────────────────────────────

export const errorHandler = new ErrorHandlerClient();
