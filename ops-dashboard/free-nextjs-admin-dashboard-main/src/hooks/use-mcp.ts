/**
 * useMCP — Frontend MCP Client
 * 
 * All tools speak via MCP and Spine only.
 * No direct database access. No direct Supabase calls.
 * 
 * Pattern: Frontend → API Proxy → MCP → Worker → Spine
 */

import { useState, useCallback } from 'react';
import { MCP_CONFIG, getMCPHeaders, buildMCPRequest } from '@/lib/mcp-config';

// ─── Types ─────────────────────────────────────────────────────────────────

interface MCPResponse {
  request_id: string;
  status: 'ok' | 'error';
  tool: { name: string };
  result?: any;
  error?: {
    code: string;
    message: string;
  };
}

interface UseMCPResult {
  invoke: (toolName: string, args: Record<string, any>) => Promise<any>;
  isLoading: boolean;
  error: string | null;
}

// ─── Hook ──────────────────────────────────────────────────────────────────

export function useMCP(): UseMCPResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const invoke = useCallback(async (toolName: string, args: Record<string, any>): Promise<any> => {
    setIsLoading(true);
    setError(null);

    try {
      const request = buildMCPRequest(toolName, args);

      // Call server-side API proxy (keeps API key server-side)
      const response = await fetch('/api/mcp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data: MCPResponse = await response.json();

      if (data.status === 'error') {
        throw new Error(data.error?.message || 'MCP invocation failed');
      }

      return data.result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { invoke, isLoading, error };
}

// ─── Convenience Hooks ─────────────────────────────────────────────────────

/**
 * useOrgMemory — Read org memory via MCP
 */
export function useOrgMemory() {
  const { invoke, isLoading, error } = useMCP();

  const search = useCallback(async (params: {
    category?: string;
    governance_state?: string;
    limit?: number;
    offset?: number;
  }) => {
    return invoke('memory.search_org', {
      tenant_id: localStorage.getItem('tenant_id'),
      ...params,
    });
  }, [invoke]);

  const upsert = useCallback(async (params: {
    category: string;
    key: string;
    content: string;
    governance_state?: string;
    metadata?: Record<string, any>;
  }) => {
    return invoke('memory.upsert_org', {
      tenant_id: localStorage.getItem('tenant_id'),
      ...params,
    });
  }, [invoke]);

  return { search, upsert, isLoading, error };
}

/**
 * useProposals — Manage proposals via MCP
 */
export function useProposals() {
  const { invoke, isLoading, error } = useMCP();

  const list = useCallback(async (params?: {
    status?: string;
    limit?: number;
  }) => {
    return invoke('proposal.list', {
      tenant_id: localStorage.getItem('tenant_id'),
      ...params,
    });
  }, [invoke]);

  const approve = useCallback(async (proposalId: string, notes?: string) => {
    return invoke('proposal.approve', {
      tenant_id: localStorage.getItem('tenant_id'),
      proposal_id: proposalId,
      review_notes: notes,
    });
  }, [invoke]);

  const reject = useCallback(async (proposalId: string, reason: string) => {
    return invoke('proposal.reject', {
      tenant_id: localStorage.getItem('tenant_id'),
      proposal_id: proposalId,
      review_notes: reason,
    });
  }, [invoke]);

  return { list, approve, reject, isLoading, error };
}

/**
 * useSignals — Read signals via MCP
 */
export function useSignals() {
  const { invoke, isLoading, error } = useMCP();

  const list = useCallback(async (params?: {
    status?: string;
    limit?: number;
  }) => {
    return invoke('signal.list', {
      tenant_id: localStorage.getItem('tenant_id'),
      ...params,
    });
  }, [invoke]);

  return { list, isLoading, error };
}

/**
 * useEntities — Read/write entities via MCP
 */
export function useEntities() {
  const { invoke, isLoading, error } = useMCP();

  const get = useCallback(async (entityType: string, entityId: string) => {
    return invoke('spine.entity.get', {
      tenant_id: localStorage.getItem('tenant_id'),
      entity_type: entityType,
      entity_id: entityId,
    });
  }, [invoke]);

  const list = useCallback(async (entityType: string, params?: {
    limit?: number;
    offset?: number;
  }) => {
    return invoke('spine.entity.list', {
      tenant_id: localStorage.getItem('tenant_id'),
      entity_type: entityType,
      ...params,
    });
  }, [invoke]);

  const search = useCallback(async (query: string, params?: {
    entity_type?: string;
    limit?: number;
  }) => {
    return invoke('spine.entity.search', {
      tenant_id: localStorage.getItem('tenant_id'),
      q: query,
      ...params,
    });
  }, [invoke]);

  return { get, list, search, isLoading, error };
}

/**
 * useConversationalMemory — Read/write conversational memory via MCP
 */
export function useConversationalMemory() {
  const { invoke, isLoading, error } = useMCP();

  const read = useCallback(async (params?: {
    session_id?: string;
    limit?: number;
  }) => {
    return invoke('memory.read_conversational', {
      tenant_id: localStorage.getItem('tenant_id'),
      ...params,
    });
  }, [invoke]);

  const write = useCallback(async (params: {
    session_id: string;
    user_id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    model?: string;
  }) => {
    return invoke('memory.write_conversational', {
      tenant_id: localStorage.getItem('tenant_id'),
      ...params,
    });
  }, [invoke]);

  return { read, write, isLoading, error };
}
