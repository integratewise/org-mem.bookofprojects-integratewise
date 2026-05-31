/**
 * useBookOfProjects — React hook for institutional knowledge
 *
 * Separate from Spine (operational data).
 * Append-only. Versioned. Nothing deleted.
 */

import { useState, useCallback, useEffect } from 'react';
import { bookOfProjects, Episode, Primitive, EpisodeStatus } from '@/lib/book-of-projects';

// ─── Hook Result ───────────────────────────────────────────────────────────

interface UseBookOfProjectsResult {
  episodes: Episode[];
  getEpisodes: (status?: EpisodeStatus) => Promise<Episode[]>;
  getEpisode: (id: string) => Promise<Episode>;
  createEpisode: (episode: Omit<Episode, 'id' | 'created_at' | 'updated_at' | 'version'>) => Promise<Episode>;
  addPrimitive: (episodeId: string, primitive: Omit<Primitive, 'id' | 'created_at'>) => Promise<Primitive>;
  searchByEntity: (entityType: string, entityId: string) => Promise<Episode[]>;
  getDecisions: (entityType: string, entityId: string) => Promise<Primitive[]>;
  getLearnings: (entityType: string, entityId: string) => Promise<Primitive[]>;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

// ─── Hook ──────────────────────────────────────────────────────────────────

export function useBookOfProjects(): UseBookOfProjectsResult {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await bookOfProjects.getEpisodes();
      setEpisodes(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const getEpisodes = useCallback(async (status?: EpisodeStatus): Promise<Episode[]> => {
    setIsLoading(true);
    setError(null);
    try {
      return await bookOfProjects.getEpisodes(status);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getEpisode = useCallback(async (id: string): Promise<Episode> => {
    setIsLoading(true);
    setError(null);
    try {
      return await bookOfProjects.getEpisode(id);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createEpisode = useCallback(async (episode: Omit<Episode, 'id' | 'created_at' | 'updated_at' | 'version'>): Promise<Episode> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await bookOfProjects.createEpisode(episode);
      await refresh();
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  const addPrimitive = useCallback(async (episodeId: string, primitive: Omit<Primitive, 'id' | 'created_at'>): Promise<Primitive> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await bookOfProjects.addPrimitive(episodeId, primitive);
      await refresh();
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [refresh]);

  const searchByEntity = useCallback(async (entityType: string, entityId: string): Promise<Episode[]> => {
    setIsLoading(true);
    setError(null);
    try {
      return await bookOfProjects.searchByEntity(entityType, entityId);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getDecisions = useCallback(async (entityType: string, entityId: string): Promise<Primitive[]> => {
    setIsLoading(true);
    setError(null);
    try {
      return await bookOfProjects.getDecisions(entityType, entityId);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getLearnings = useCallback(async (entityType: string, entityId: string): Promise<Primitive[]> => {
    setIsLoading(true);
    setError(null);
    try {
      return await bookOfProjects.getLearnings(entityType, entityId);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    episodes,
    getEpisodes,
    getEpisode,
    createEpisode,
    addPrimitive,
    searchByEntity,
    getDecisions,
    getLearnings,
    isLoading,
    error,
    refresh,
  };
}
