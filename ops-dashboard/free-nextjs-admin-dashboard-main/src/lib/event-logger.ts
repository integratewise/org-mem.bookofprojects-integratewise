/**
 * Event Logger
 * 
 * Captures all local happenings and writes to shared memory (org_memory).
 * This enables all agents and surfaces to access organizational events.
 * 
 * Events captured:
 * - File changes (Folder Monitor)
 * - Agent actions (Triage Bot, Twin, Hermes)
 * - User interactions (Knowledge Workbench, Ops Dashboard)
 * - System events (Pipeline, Normalizer)
 * - Decisions (Governance approvals)
 * - Signals (AI detections)
 */

import { MCP_CONFIG, getMCPHeaders, buildMCPRequest } from '@/lib/mcp-config';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface OrganizationalEvent {
  id: string;
  type: 'file_change' | 'agent_action' | 'user_interaction' | 'system_event' | 'decision' | 'signal';
  source: string;           // agent_id, user_id, or system
  target: string;           // what was affected
  description: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

// ─── Event Logger Client ───────────────────────────────────────────────────

export class EventLoggerClient {
  private endpoint: string;
  private headers: Record<string, string>;

  constructor() {
    this.endpoint = MCP_CONFIG.endpoint;
    this.headers = getMCPHeaders();
  }

  /**
   * Log an organizational event
   */
  async logEvent(event: Omit<OrganizationalEvent, 'id' | 'timestamp'>): Promise<void> {
    const request = buildMCPRequest('memory.upsert_org', {
      category: 'event',
      key: `${event.type}_${Date.now()}`,
      content: JSON.stringify({
        type: event.type,
        source: event.source,
        target: event.target,
        description: event.description,
        metadata: event.metadata || {},
      }),
      source: event.source,
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
        console.error('Failed to log event:', data.error?.message);
      }
    } catch (error) {
      console.error('Failed to log event:', error);
    }
  }

  /**
   * Log file change event
   */
  async logFileChange(fileName: string, action: string, source: string): Promise<void> {
    await this.logEvent({
      type: 'file_change',
      source,
      target: fileName,
      description: `File ${action}: ${fileName}`,
      metadata: { action, fileName },
    });
  }

  /**
   * Log agent action event
   */
  async logAgentAction(agentId: string, action: string, target: string): Promise<void> {
    await this.logEvent({
      type: 'agent_action',
      source: agentId,
      target,
      description: `Agent ${agentId} performed: ${action}`,
      metadata: { action },
    });
  }

  /**
   * Log user interaction event
   */
  async logUserInteraction(userId: string, action: string, target: string): Promise<void> {
    await this.logEvent({
      type: 'user_interaction',
      source: userId,
      target,
      description: `User performed: ${action}`,
      metadata: { action },
    });
  }

  /**
   * Log system event
   */
  async logSystemEvent(component: string, event: string, details?: Record<string, any>): Promise<void> {
    await this.logEvent({
      type: 'system_event',
      source: component,
      target: component,
      description: `System event: ${event}`,
      metadata: details,
    });
  }

  /**
   * Log decision event
   */
  async logDecision(decisionMaker: string, decision: string, target: string): Promise<void> {
    await this.logEvent({
      type: 'decision',
      source: decisionMaker,
      target,
      description: `Decision: ${decision}`,
      metadata: { decision },
    });
  }

  /**
   * Log signal event
   */
  async logSignal(source: string, signal: string, target: string): Promise<void> {
    await this.logEvent({
      type: 'signal',
      source,
      target,
      description: `Signal: ${signal}`,
      metadata: { signal },
    });
  }
}

// ─── Singleton ─────────────────────────────────────────────────────────────

export const eventLogger = new EventLoggerClient();
