/**
 * Agent Memory Layer
 * 
 * Solves: Agents can't learn, can't track behavior, lack intelligence
 * 
 * Tables:
 * - agent_sessions: tracks what each agent does
 * - agent_memory: stores what agents learn
 * - agent_context: assembled knowledge for current task
 */

import { MCP_CONFIG, getMCPHeaders, buildMCPRequest } from '@/lib/mcp-config';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface AgentSession {
  id: string;
  agent_id: string;           // 'triage-bot', 'twin', 'hermes', 'agent-zero'
  agent_type: 'triage' | 'twin' | 'hermes' | 'external';
  action: string;             // what the agent did
  input: Record<string, any>; // what the agent received
  output: Record<string, any>; // what the agent produced
  status: 'success' | 'failure' | 'pending';
  duration_ms: number;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface AgentMemory {
  id: string;
  agent_id: string;
  memory_type: 'pattern' | 'preference' | 'learning' | 'error';
  key: string;                // what was learned
  value: any;                 // the learned content
  confidence: number;         // 0-1
  usage_count: number;        // how many times used
  last_used_at: string;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface AgentContext {
  agent_id: string;
  task_type: string;
  relevant_sessions: AgentSession[];
  relevant_memories: AgentMemory[];
  assembled_context: string;
  assembled_at: string;
}

// ─── Agent Memory Client ───────────────────────────────────────────────────

export class AgentMemoryClient {
  private endpoint: string;
  private headers: Record<string, string>;

  constructor() {
    this.endpoint = MCP_CONFIG.endpoint;
    this.headers = getMCPHeaders();
  }

  /**
   * Log agent session
   */
  async logSession(session: Omit<AgentSession, 'id' | 'created_at'>): Promise<AgentSession> {
    const request = buildMCPRequest('agent.log_session', {
      agent_id: session.agent_id,
      agent_type: session.agent_type,
      action: session.action,
      input: session.input,
      output: session.output,
      status: session.status,
      duration_ms: session.duration_ms,
      metadata: session.metadata || {},
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
   * Get agent sessions
   */
  async getSessions(agentId: string, limit = 50): Promise<AgentSession[]> {
    const request = buildMCPRequest('agent.get_sessions', {
      agent_id: agentId,
      limit,
    });

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(request),
    });

    const data = await response.json();
    if (data.status === 'error') throw new Error(data.error?.message);
    return data.result?.sessions || [];
  }

  /**
   * Store agent memory
   */
  async storeMemory(memory: Omit<AgentMemory, 'id' | 'usage_count' | 'last_used_at' | 'created_at'>): Promise<AgentMemory> {
    const request = buildMCPRequest('agent.store_memory', {
      agent_id: memory.agent_id,
      memory_type: memory.memory_type,
      key: memory.key,
      value: memory.value,
      confidence: memory.confidence,
      metadata: memory.metadata || {},
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
   * Get agent memories
   */
  async getMemories(agentId: string, memoryType?: string): Promise<AgentMemory[]> {
    const request = buildMCPRequest('agent.get_memories', {
      agent_id: agentId,
      memory_type: memoryType,
    });

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(request),
    });

    const data = await response.json();
    if (data.status === 'error') throw new Error(data.error?.message);
    return data.result?.memories || [];
  }

  /**
   * Assemble context for agent
   */
  async assembleContext(agentId: string, taskType: string, query: string): Promise<AgentContext> {
    const request = buildMCPRequest('agent.assemble_context', {
      agent_id: agentId,
      task_type: taskType,
      query,
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
   * Promote agent memory to shared knowledge
   */
  async promoteMemory(memoryId: string, targetLayer: 'org' | 'personal'): Promise<void> {
    const request = buildMCPRequest('agent.promote_memory', {
      memory_id: memoryId,
      target_layer: targetLayer,
    });

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(request),
    });

    const data = await response.json();
    if (data.status === 'error') throw new Error(data.error?.message);
  }
}

// ─── Singleton ─────────────────────────────────────────────────────────────

export const agentMemory = new AgentMemoryClient();
