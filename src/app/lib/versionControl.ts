/**
 * Version Control System for BrandDocumentations
 * Git-like history tracking for all content changes
 */

import { loadJson, saveJson } from './storage';

export interface Version {
  id: string;
  documentId: string;
  content: string;
  author: string;
  email: string;
  timestamp: number;
  message: string;
  parentId: string | null;
  diff: string;
  tags?: string[];
}

export interface Branch {
  id: string;
  name: string;
  headVersionId: string;
  createdAt: number;
  isDefault: boolean;
}

const STORAGE_KEYS = {
  versions: 'vc_versions',
  branches: 'vc_branches',
  currentBranch: 'vc_current_branch',
  stash: 'vc_stash',
};

// Generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Simple diff generation
function generateDiff(oldContent: string, newContent: string): string {
  const oldLines = oldContent.split('\n');
  const newLines = newContent.split('\n');
  const changes: string[] = [];
  
  let oldIdx = 0;
  let newIdx = 0;
  
  while (oldIdx < oldLines.length || newIdx < newLines.length) {
    const oldLine = oldLines[oldIdx];
    const newLine = newLines[newIdx];
    
    if (oldLine === newLine) {
      changes.push(`  ${oldLine}`);
      oldIdx++;
      newIdx++;
    } else if (oldIdx < oldLines.length && !newLines.slice(newIdx).includes(oldLine)) {
      changes.push(`- ${oldLine}`);
      oldIdx++;
    } else if (newIdx < newLines.length && !oldLines.slice(oldIdx).includes(newLine)) {
      changes.push(`+ ${newLine}`);
      newIdx++;
    } else {
      if (oldIdx < oldLines.length) {
        changes.push(`- ${oldLine}`);
        oldIdx++;
      }
      if (newIdx < newLines.length) {
        changes.push(`+ ${newLine}`);
        newIdx++;
      }
    }
  }
  
  return changes.join('\n');
}

// Get all versions
export function getAllVersions(): Version[] {
  return loadJson<Version[]>(STORAGE_KEYS.versions, []);
}

// Get versions for a specific document
export function getDocumentVersions(documentId: string): Version[] {
  const versions = getAllVersions();
  return versions
    .filter(v => v.documentId === documentId)
    .sort((a, b) => b.timestamp - a.timestamp);
}

// Get latest version for a document
export function getLatestVersion(documentId: string): Version | null {
  const versions = getDocumentVersions(documentId);
  return versions[0] || null;
}

// Commit a new version
export function commit(
  documentId: string,
  content: string,
  message: string,
  author: string,
  email: string,
  tags?: string[]
): Version {
  const versions = getAllVersions();
  const latestVersion = getLatestVersion(documentId);
  
  const version: Version = {
    id: generateId(),
    documentId,
    content,
    author,
    email,
    timestamp: Date.now(),
    message,
    parentId: latestVersion?.id || null,
    diff: latestVersion ? generateDiff(latestVersion.content, content) : '+ (initial commit)',
    tags,
  };
  
  versions.push(version);
  saveJson(STORAGE_KEYS.versions, versions);
  
  return version;
}

// Get version by ID
export function getVersion(versionId: string): Version | null {
  const versions = getAllVersions();
  return versions.find(v => v.id === versionId) || null;
}

// Revert to a specific version
export function revertToVersion(
  documentId: string,
  versionId: string,
  author: string,
  email: string
): Version {
  const targetVersion = getVersion(versionId);
  if (!targetVersion) {
    throw new Error(`Version ${versionId} not found`);
  }
  
  return commit(
    documentId,
    targetVersion.content,
    `Revert to version ${versionId.substr(0, 8)}: ${targetVersion.message}`,
    author,
    email,
    ['revert']
  );
}

// Compare two versions
export function compareVersions(versionId1: string, versionId2: string): string {
  const v1 = getVersion(versionId1);
  const v2 = getVersion(versionId2);
  
  if (!v1 || !v2) {
    throw new Error('One or both versions not found');
  }
  
  return generateDiff(v1.content, v2.content);
}

// Branch operations
export function getBranches(): Branch[] {
  return loadJson<Branch[]>(STORAGE_KEYS.branches, [
    {
      id: 'main',
      name: 'main',
      headVersionId: '',
      createdAt: Date.now(),
      isDefault: true,
    }
  ]);
}

export function createBranch(name: string, fromVersionId: string): Branch {
  const branches = getBranches();
  
  if (branches.some(b => b.name === name)) {
    throw new Error(`Branch ${name} already exists`);
  }
  
  const branch: Branch = {
    id: generateId(),
    name,
    headVersionId: fromVersionId,
    createdAt: Date.now(),
    isDefault: false,
  };
  
  branches.push(branch);
  saveJson(STORAGE_KEYS.branches, branches);
  
  return branch;
}

export function getCurrentBranch(): string {
  return loadJson<string>(STORAGE_KEYS.currentBranch, 'main');
}

export function switchBranch(branchName: string): void {
  const branches = getBranches();
  if (!branches.some(b => b.name === branchName)) {
    throw new Error(`Branch ${branchName} not found`);
  }
  saveJson(STORAGE_KEYS.currentBranch, branchName);
}

// Stash operations
export interface Stash {
  id: string;
  documentId: string;
  content: string;
  message: string;
  timestamp: number;
}

export function stash(documentId: string, content: string, message: string): Stash {
  const stashes = loadJson<Stash[]>(STORAGE_KEYS.stash, []);
  const stash: Stash = {
    id: generateId(),
    documentId,
    content,
    message,
    timestamp: Date.now(),
  };
  
  stashes.push(stash);
  saveJson(STORAGE_KEYS.stash, stashes);
  
  return stash;
}

export function getStashes(documentId?: string): Stash[] {
  const stashes = loadJson<Stash[]>(STORAGE_KEYS.stash, []);
  if (documentId) {
    return stashes.filter(s => s.documentId === documentId);
  }
  return stashes;
}

export function popStash(stashId: string): Stash {
  const stashes = loadJson<Stash[]>(STORAGE_KEYS.stash, []);
  const index = stashes.findIndex(s => s.id === stashId);
  
  if (index === -1) {
    throw new Error(`Stash ${stashId} not found`);
  }
  
  const [stash] = stashes.splice(index, 1);
  saveJson(STORAGE_KEYS.stash, stashes);
  
  return stash;
}

// Get version statistics
export function getVersionStats(): {
  totalVersions: number;
  uniqueDocuments: number;
  topContributors: { name: string; count: number }[];
  recentActivity: Version[];
} {
  const versions = getAllVersions();
  const contributors: Record<string, number> = {};
  
  versions.forEach(v => {
    contributors[v.author] = (contributors[v.author] || 0) + 1;
  });
  
  const topContributors = Object.entries(contributors)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  const uniqueDocuments = new Set(versions.map(v => v.documentId)).size;
  
  const recentActivity = versions
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 10);
  
  return {
    totalVersions: versions.length,
    uniqueDocuments,
    topContributors,
    recentActivity,
  };
}

// Export version history
export function exportVersionHistory(documentId: string): string {
  const versions = getDocumentVersions(documentId);
  
  return versions.map(v => `
# ${v.id.substr(0, 8)} - ${new Date(v.timestamp).toISOString()}
Author: ${v.author} <${v.email}>
Message: ${v.message}
${v.tags ? `Tags: ${v.tags.join(', ')}` : ''}

${v.diff}
---
`).join('\n');
}
