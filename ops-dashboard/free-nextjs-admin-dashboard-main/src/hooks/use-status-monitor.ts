/**
 * useStatusMonitor — React hook for system status monitoring
 * 
 * Provides real-time visibility into service health, pipeline status,
 * and connection status.
 */

import { useState, useCallback, useEffect } from 'react';
import { statusMonitor, SystemStatus, ServiceStatus, PipelineStatus, ConnectionStatus } from '@/lib/status-monitor';

// ─── Hook Result ───────────────────────────────────────────────────────────

interface UseStatusMonitorResult {
  systemStatus: SystemStatus | null;
  getServiceStatus: (serviceName: string) => Promise<ServiceStatus>;
  getPipelineStatus: (pipelineName: string) => Promise<PipelineStatus>;
  getConnectionStatus: (connectionName: string) => Promise<ConnectionStatus>;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

// ─── Hook ──────────────────────────────────────────────────────────────────

export function useStatusMonitor(): UseStatusMonitorResult {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const status = await statusMonitor.getSystemStatus();
      setSystemStatus(status);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    // Refresh every 30 seconds
    const interval = setInterval(refresh, 30000);
    return () => clearInterval(interval);
  }, [refresh]);

  const getServiceStatus = useCallback(async (serviceName: string): Promise<ServiceStatus> => {
    setIsLoading(true);
    setError(null);
    try {
      return await statusMonitor.getServiceStatus(serviceName);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPipelineStatus = useCallback(async (pipelineName: string): Promise<PipelineStatus> => {
    setIsLoading(true);
    setError(null);
    try {
      return await statusMonitor.getPipelineStatus(pipelineName);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getConnectionStatus = useCallback(async (connectionName: string): Promise<ConnectionStatus> => {
    setIsLoading(true);
    setError(null);
    try {
      return await statusMonitor.getConnectionStatus(connectionName);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    systemStatus,
    getServiceStatus,
    getPipelineStatus,
    getConnectionStatus,
    isLoading,
    error,
    refresh,
  };
}
