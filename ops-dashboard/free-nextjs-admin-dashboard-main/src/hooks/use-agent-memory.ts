/**
 * useAgentMemory — React hook for agent memory layer
 * 
 * Solves: Agents can't learn, can't track behavior, lack intelligence
 */

import { useState, useCallback, useEffect } from 'react';
import { agentMemory, AgentSession, AgentMemory, AgentContext } from '@/lib/agent-memory';

// ─── Hook Result ───────────────────────────────────────────────────────────

interface UseAgentMemoryResult {
  // Sessions
  logSession: (session: Omit<AgentSession, 'id' | 'created_at'>) => Promise<AgentSession>;
  getSessions: (agentId: string, limit?: number) => Promise<AgentSession[]>;
  
  // Memory
  storeMemory: (memory: Omit<AgentMemory, 'id' | 'usage_count' | 'last_used_at' | 'created_at'>) => Promise<AgentMemory>;
  getMemories: (agentId: string, memoryType?: string) => Promise<AgentMemory[]>;
  
  // Context
  assembleContext: (agentId: string, taskType: string, query: string) => Promise<AgentContext>;
  
  // Promotion
  promoteMemory: (memoryId: string, targetLayer: 'org' | 'personal') => Promise<void>;
  
  // State
  isLoading: boolean;
  error: string | null;
}

// ─── Hook ──────────────────────────────────────────────────────────────────

export function useAgentMemory(): UseAgentMemoryResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logSession = useCallback(async (session: Omit<AgentSession, 'id' | 'created_at'>): Promise<AgentSession> => {
    setIsLoading(true);
    setError(null);
    try {
      return await agentMemory.logSession(session);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getSessions = useCallback(async (agentId: string, limit = 50): Promise<AgentSession[]> => {
    setIsLoading(true);
    setError(null);
    try {
      return await agentMemory.getSessions(agentId, limit);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const storeMemory = useCallback(async (memory: Omit<AgentMemory, 'id' | 'usage_count' | 'last_used_at' | 'created_at'>): Promise<AgentMemory> => {
    setIsLoading(true);
    setError(null);
    try {
      return await agentMemory.storeMemory(memory);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getMemories = useCallback(async (agentId: string, memoryType?: string): Promise<AgentMemory[]> => {
    setIsLoading(true);
    setError(null);
    try {
      return await agentMemory.getMemories(agentId, memoryType);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const assembleContext = useCallback(async (agentId: string, taskType: string, query: string): Promise<AgentContext> => {
    setIsLoading(true);
    setError(null);
    try {
      return await agentMemory.assembleContext(agentId, taskType, query);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const promoteMemory = useCallback(async (memoryId: string, targetLayer: 'org' | 'personal'): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await agentMemory.promoteMemory(memoryId, targetLayer);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    logSession,
    getSessions,
    storeMemory,
    getMemories,
    assembleContext,
    promoteMemory,
    isLoading,
    error,
  };
}
