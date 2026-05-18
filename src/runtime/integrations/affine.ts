/**
 * AFFiNE Integration Client
 *
 * Connects to self-hosted AFFiNE instance at:
 *   http://187.127.166.105:32779/
 *
 * Provides:
 * - Workspace listing
 * - Page/Doc creation
 * - Basic read operations
 *
 * Future: full CRUD, sync bridge, push from runtime
 */

const AFFiNE_BASE_URL = import.meta.env.VITE_AFFINE_URL || 'https://affine.operations.integratewise.ai';

export interface AFFiNEWorkspace {
  id: string;
  name: string;
  avatar?: string;
}

export interface AFFiNEPage {
  id: string;
  title: string;
  mode: 'page' | 'edgeless';
  createDate: string;
  updatedDate: string;
}

async function affineFetch(path: string, options?: RequestInit): Promise<Response> {
  const url = `${AFFiNE_BASE_URL}${path}`;
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
}

export const AFFiNEClient = {
  health: async (): Promise<boolean> => {
    try {
      const res = await fetch(`${AFFiNE_BASE_URL}/`, { method: 'HEAD', mode: 'no-cors' });
      return res.ok || res.type === 'opaque';
    } catch {
      return false;
    }
  },

  listWorkspaces: async (): Promise<AFFiNEWorkspace[]> => {
    try {
      const res = await affineFetch('/api/workspaces');
      if (!res.ok) return [];
      const data = await res.json();
      return (data.workspaces || []).map((w: any) => ({
        id: w.id,
        name: w.name || 'Untitled',
        avatar: w.avatar,
      }));
    } catch {
      return [];
    }
  },

  listPages: async (workspaceId: string): Promise<AFFiNEPage[]> => {
    try {
      const res = await affineFetch(`/api/workspaces/${workspaceId}/docs`);
      if (!res.ok) return [];
      const data = await res.json();
      return (data.docs || []).map((d: any) => ({
        id: d.id,
        title: d.title || 'Untitled',
        mode: d.mode || 'page',
        createDate: d.createDate,
        updatedDate: d.updatedDate,
      }));
    } catch {
      return [];
    }
  },

  createPage: async (
    workspaceId: string,
    title: string,
    content?: string
  ): Promise<AFFiNEPage | null> => {
    try {
      const res = await affineFetch(`/api/workspaces/${workspaceId}/docs`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return {
        id: data.id,
        title: data.title || title,
        mode: 'page',
        createDate: data.createDate || new Date().toISOString(),
        updatedDate: data.updatedDate || new Date().toISOString(),
      };
    } catch {
      return null;
    }
  },

  getPageUrl: (workspaceId: string, pageId: string): string => {
    return `${AFFiNE_BASE_URL}/workspace/${workspaceId}/${pageId}`;
  },
};
