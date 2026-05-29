/**
 * useEventLogger — React hook for event logging
 * 
 * Captures all local happenings and writes to shared memory
 */

import { useState, useCallback } from 'react';
import { eventLogger, OrganizationalEvent } from '@/lib/event-logger';

// ─── Hook Result ───────────────────────────────────────────────────────────

interface UseEventLoggerResult {
  logEvent: (event: Omit<OrganizationalEvent, 'id' | 'timestamp'>) => Promise<void>;
  logFileChange: (fileName: string, action: string, source: string) => Promise<void>;
  logAgentAction: (agentId: string, action: string, target: string) => Promise<void>;
  logUserInteraction: (userId: string, action: string, target: string) => Promise<void>;
  logSystemEvent: (component: string, event: string, details?: Record<string, any>) => Promise<void>;
  logDecision: (decisionMaker: string, decision: string, target: string) => Promise<void>;
  logSignal: (source: string, signal: string, target: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

// ─── Hook ──────────────────────────────────────────────────────────────────

export function useEventLogger(): UseEventLoggerResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logEvent = useCallback(async (event: Omit<OrganizationalEvent, 'id' | 'timestamp'>): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await eventLogger.logEvent(event);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logFileChange = useCallback(async (fileName: string, action: string, source: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await eventLogger.logFileChange(fileName, action, source);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logAgentAction = useCallback(async (agentId: string, action: string, target: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await eventLogger.logAgentAction(agentId, action, target);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logUserInteraction = useCallback(async (userId: string, action: string, target: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await eventLogger.logUserInteraction(userId, action, target);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logSystemEvent = useCallback(async (component: string, event: string, details?: Record<string, any>): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await eventLogger.logSystemEvent(component, event, details);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logDecision = useCallback(async (decisionMaker: string, decision: string, target: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await eventLogger.logDecision(decisionMaker, decision, target);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logSignal = useCallback(async (source: string, signal: string, target: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await eventLogger.logSignal(source, signal, target);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    logEvent,
    logFileChange,
    logAgentAction,
    logUserInteraction,
    logSystemEvent,
    logDecision,
    logSignal,
    isLoading,
    error,
  };
}
