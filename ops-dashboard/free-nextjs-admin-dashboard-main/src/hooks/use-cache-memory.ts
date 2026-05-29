/**
 * useCacheMemory — React hook for 24-hour cache memory
 * 
 * Book of Projects format: Records + Trees + Graphs
 * Abstract/overview of the past 24 hours
 */

import { useState, useCallback, useEffect } from 'react';
import { 
  cacheMemory, 
  CacheAbstract, 
  CacheRecord, 
  CacheTree, 
  CacheGraph, 
  CacheMetrics 
} from '@/lib/cache-memory';

// ─── Hook Result ───────────────────────────────────────────────────────────

interface UseCacheMemoryResult {
  // Abstract
  abstract: CacheAbstract | null;
  getDailyAbstract: (date?: string) => Promise<CacheAbstract>;
  generateAbstract: () => Promise<CacheAbstract>;
  
  // Records
  getRecords: (startTime: string, endTime: string) => Promise<CacheRecord[]>;
  storeRecord: (record: Omit<CacheRecord, 'id' | 'timestamp'>) => Promise<CacheRecord>;
  
  // Trees
  getTrees: (startTime: string, endTime: string) => Promise<CacheTree[]>;
  storeTree: (tree: Omit<CacheTree, 'id' | 'created_at'>) => Promise<CacheTree>;
  
  // Graphs
  getGraphs: (startTime: string, endTime: string) => Promise<CacheGraph[]>;
  storeGraph: (graph: Omit<CacheGraph, 'id' | 'created_at'>) => Promise<CacheGraph>;
  
  // Metrics
  getMetrics: (startTime: string, endTime: string) => Promise<CacheMetrics>;
  
  // State
  isLoading: boolean;
  error: string | null;
  
  // Refresh
  refresh: () => Promise<void>;
}

// ─── Hook ──────────────────────────────────────────────────────────────────

export function useCacheMemory(): UseCacheMemoryResult {
  const [abstract, setAbstract] = useState<CacheAbstract | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await cacheMemory.getDailyAbstract();
      setAbstract(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const getDailyAbstract = useCallback(async (date?: string): Promise<CacheAbstract> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await cacheMemory.getDailyAbstract(date);
      setAbstract(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateAbstract = useCallback(async (): Promise<CacheAbstract> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await cacheMemory.generateAbstract();
      setAbstract(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getRecords = useCallback(async (startTime: string, endTime: string): Promise<CacheRecord[]> => {
    setIsLoading(true);
    setError(null);
    try {
      return await cacheMemory.getRecords(startTime, endTime);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const storeRecord = useCallback(async (record: Omit<CacheRecord, 'id' | 'timestamp'>): Promise<CacheRecord> => {
    setIsLoading(true);
    setError(null);
    try {
      return await cacheMemory.storeRecord(record);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTrees = useCallback(async (startTime: string, endTime: string): Promise<CacheTree[]> => {
    setIsLoading(true);
    setError(null);
    try {
      return await cacheMemory.getTrees(startTime, endTime);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const storeTree = useCallback(async (tree: Omit<CacheTree, 'id' | 'created_at'>): Promise<CacheTree> => {
    setIsLoading(true);
    setError(null);
    try {
      return await cacheMemory.storeTree(tree);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getGraphs = useCallback(async (startTime: string, endTime: string): Promise<CacheGraph[]> => {
    setIsLoading(true);
    setError(null);
    try {
      return await cacheMemory.getGraphs(startTime, endTime);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const storeGraph = useCallback(async (graph: Omit<CacheGraph, 'id' | 'created_at'>): Promise<CacheGraph> => {
    setIsLoading(true);
    setError(null);
    try {
      return await cacheMemory.storeGraph(graph);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getMetrics = useCallback(async (startTime: string, endTime: string): Promise<CacheMetrics> => {
    setIsLoading(true);
    setError(null);
    try {
      return await cacheMemory.getMetrics(startTime, endTime);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    abstract,
    getDailyAbstract,
    generateAbstract,
    getRecords,
    storeRecord,
    getTrees,
    storeTree,
    getGraphs,
    storeGraph,
    getMetrics,
    isLoading,
    error,
    refresh,
  };
}
