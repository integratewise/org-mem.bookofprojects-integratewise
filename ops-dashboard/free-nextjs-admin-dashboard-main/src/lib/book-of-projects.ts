/**
 * Book of Projects — Institutional Knowledge Store
 *
 * Separate from the Spine (operational data).
 * Append-only. Versioned. Nothing deleted.
 * Written only through Triage Bot → HITL → sole-writer path.
 */

// ─── Types ─────────────────────────────────────────────────────────────────

export type EpisodeStatus = 'active' | 'resolved' | 'superseded';
export type PrimitiveType = 'fact' | 'decision' | 'commitment' | 'learning';

export interface Episode {
  id: string;
  title: string;
  description: string;
  status: EpisodeStatus;
  entity_refs: EntityRef[];
  primitives: Primitive[];
  created_at: string;
  updated_at: string;
  version: number;
}

export interface Primitive {
  id: string;
  type: PrimitiveType;
  content: string;
  source: string;
  confidence: number;
  created_at: string;
  superseded_by?: string;
}

export interface EntityRef {
  entity_type: string;
  entity_id: string;
  relationship: string;
}

export interface BookOfProjects {
  episodes: Episode[];
  decisions: Primitive[];
  learnings: Primitive[];
  commitments: Primitive[];
  facts: Primitive[];
}

// ─── MCP Client ────────────────────────────────────────────────────────────

import { MCP_CONFIG, getMCPHeaders, buildMCPRequest } from './mcp-config';

export class BookOfProjectsClient {
  private endpoint: string;
  private headers: Record<string, string>;

  constructor() {
    this.endpoint = MCP_CONFIG.endpoint;
    this.headers = getMCPHeaders();
  }

  /**
   * Get all episodes
   */
  async getEpisodes(status?: EpisodeStatus): Promise<Episode[]> {
    const request = buildMCPRequest('book.get_episodes', { status });
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(request),
    });
    const data = await response.json();
    if (data.status === 'error') throw new Error(data.error?.message);
    return data.result?.episodes || [];
  }

  /**
   * Get episode by ID
   */
  async getEpisode(id: string): Promise<Episode> {
    const request = buildMCPRequest('book.get_episode', { id });
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
   * Create episode (via Triage Bot)
   */
  async createEpisode(episode: Omit<Episode, 'id' | 'created_at' | 'updated_at' | 'version'>): Promise<Episode> {
    const request = buildMCPRequest('book.create_episode', episode);
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
   * Add primitive to episode
   */
  async addPrimitive(episodeId: string, primitive: Omit<Primitive, 'id' | 'created_at'>): Promise<Primitive> {
    const request = buildMCPRequest('book.add_primitive', {
      episode_id: episodeId,
      ...primitive,
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
   * Search episodes by entity reference
   */
  async searchByEntity(entityType: string, entityId: string): Promise<Episode[]> {
    const request = buildMCPRequest('book.search_by_entity', {
      entity_type: entityType,
      entity_id: entityId,
    });
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(request),
    });
    const data = await response.json();
    if (data.status === 'error') throw new Error(data.error?.message);
    return data.result?.episodes || [];
  }

  /**
   * Get decisions for entity
   */
  async getDecisions(entityType: string, entityId: string): Promise<Primitive[]> {
    const request = buildMCPRequest('book.get_decisions', {
      entity_type: entityType,
      entity_id: entityId,
    });
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(request),
    });
    const data = await response.json();
    if (data.status === 'error') throw new Error(data.error?.message);
    return data.result?.decisions || [];
  }

  /**
   * Get learnings for entity
   */
  async getLearnings(entityType: string, entityId: string): Promise<Primitive[]> {
    const request = buildMCPRequest('book.get_learnings', {
      entity_type: entityType,
      entity_id: entityId,
    });
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(request),
    });
    const data = await response.json();
    if (data.status === 'error') throw new Error(data.error?.message);
    return data.result?.learnings || [];
  }
}

// ─── Singleton ─────────────────────────────────────────────────────────────

export const bookOfProjects = new BookOfProjectsClient();
