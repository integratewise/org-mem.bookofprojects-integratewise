/**
 * useWorkerRegistry — React hook for worker registry
 * 
 * Tracks all workers, maintains backup/passive workers
 */

import { useState, useCallback, useEffect } from 'react';
import { workerRegistry, WorkerEntry, WorkerHealth, WorkerIncident } from '@/lib/worker-registry';

// ─── Hook Result ───────────────────────────────────────────────────────────

interface UseWorkerRegistryResult {
  // Workers
  workers: WorkerEntry[];
  registerWorker: (worker: Omit<WorkerEntry, 'id' | 'created_at' | 'updated_at'>) => Promise<WorkerEntry>;
  updateStatus: (workerId: string, status: WorkerEntry['status']) => Promise<void>;
  activateBackup: (workerId: string) => Promise<WorkerEntry>;
  
  // Health
  getHealth: (workerId: string) => Promise<WorkerHealth>;
  
  // Incidents
  incidents: WorkerIncident[];
  reportIncident: (incident: Omit<WorkerIncident, 'id' | 'started_at'>) => Promise<WorkerIncident>;
  
  // State
  isLoading: boolean;
  error: string | null;
  
  // Refresh
  refresh: () => Promise<void>;
}

// ─── Hook ──────────────────────────────────────────────────────────────────

export function useWorkerRegistry(): UseWorkerRegistryResult {
  const [workers, setWorkers] = useState<WorkerEntry[]>([]);
  const [incidents, setIncidents] = useState<WorkerIncident[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [allWorkers, allIncidents] = await Promise.all([
        workerRegistry.getWorkers(),
        workerRegistry.getIncidents(),
      ]);
      setWorkers(allWorkers);
      setIncidents(allIncidents);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const registerWorker = useCallback(async (worker: Omit<WorkerEntry, 'id' | 'created_at' | 'updated_at'>): Promise<WorkerEntry> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await workerRegistry.registerWorker(worker);
      await refresh();
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  const updateStatus = useCallback(async (workerId: string, status: WorkerEntry['status']): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await workerRegistry.updateWorkerStatus(workerId, status);
      await refresh();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  const activateBackup = useCallback(async (workerId: string): Promise<WorkerEntry> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await workerRegistry.activateBackup(workerId);
      await refresh();
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  const getHealth = useCallback(async (workerId: string): Promise<WorkerHealth> => {
    setIsLoading(true);
    setError(null);
    try {
      return await workerRegistry.getWorkerHealth(workerId);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reportIncident = useCallback(async (incident: Omit<WorkerIncident, 'id' | 'started_at'>): Promise<WorkerIncident> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await workerRegistry.reportIncident(incident);
      await refresh();
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  return {
    workers,
    registerWorker,
    updateStatus,
    activateBackup,
    getHealth,
    incidents,
    reportIncident,
    isLoading,
    error,
    refresh,
  };
}
