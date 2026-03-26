/**
 * Asset Management System
 * Image upload, organization, tagging, and cloud storage integration
 */

import { loadJson, saveJson } from './storage';

export interface Asset {
  id: string;
  name: string;
  type: 'image' | 'svg' | 'video' | 'document' | 'font' | 'other';
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  tags: string[];
  folder: string;
  uploadedBy: string;
  uploadedAt: number;
  updatedAt: number;
  metadata?: {
    alt?: string;
    description?: string;
    source?: string;
    license?: string;
    colors?: string[];
  };
  versions?: AssetVersion[];
}

export interface AssetVersion {
  id: string;
  url: string;
  size: number;
  createdAt: number;
  changes: string;
}

export interface AssetFolder {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: number;
}

// Storage keys
const STORAGE_KEYS = {
  assets: 'am_assets',
  folders: 'am_folders',
  uploadQueue: 'am_upload_queue',
};

// Generate ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Get file type from mime type
function getFileType(mimeType: string): Asset['type'] {
  if (mimeType.startsWith('image/')) {
    return mimeType === 'image/svg+xml' ? 'svg' : 'image';
  }
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.includes('font')) return 'font';
  if (mimeType.includes('pdf') || mimeType.includes('doc') || mimeType.includes('ppt')) {
    return 'document';
  }
  return 'other';
}

// Asset CRUD Operations
export function getAllAssets(): Asset[] {
  return loadJson<Asset[]>(STORAGE_KEYS.assets, []);
}

export function getAsset(id: string): Asset | null {
  const assets = getAllAssets();
  return assets.find(a => a.id === id) || null;
}

export function getAssetsByFolder(folderId: string): Asset[] {
  const assets = getAllAssets();
  return assets.filter(a => a.folder === folderId);
}

export function searchAssets(query: string, tags?: string[]): Asset[] {
  const assets = getAllAssets();
  const lowerQuery = query.toLowerCase();
  
  return assets.filter(asset => {
    const matchesQuery = 
      asset.name.toLowerCase().includes(lowerQuery) ||
      asset.metadata?.description?.toLowerCase().includes(lowerQuery) ||
      asset.metadata?.alt?.toLowerCase().includes(lowerQuery);
    
    const matchesTags = !tags || tags.every(tag => asset.tags.includes(tag));
    
    return matchesQuery && matchesTags;
  });
}

export function getAssetsByTag(tag: string): Asset[] {
  const assets = getAllAssets();
  return assets.filter(a => a.tags.includes(tag));
}

// Create asset from file
export async function createAsset(
  file: File,
  folder: string = 'root',
  uploadedBy: string = 'Anonymous',
  metadata?: Partial<Asset['metadata']>
): Promise<Asset> {
  // Convert file to data URL
  const dataUrl = await fileToDataUrl(file);
  
  // Get image dimensions if it's an image
  let width, height;
  if (file.type.startsWith('image/')) {
    const dimensions = await getImageDimensions(dataUrl);
    width = dimensions.width;
    height = dimensions.height;
  }
  
  const asset: Asset = {
    id: generateId(),
    name: file.name,
    type: getFileType(file.type),
    mimeType: file.type,
    size: file.size,
    url: dataUrl,
    width,
    height,
    tags: extractTagsFromFilename(file.name),
    folder,
    uploadedBy,
    uploadedAt: Date.now(),
    updatedAt: Date.now(),
    metadata: metadata || {},
    versions: [],
  };
  
  // Generate thumbnail for images
  if (asset.type === 'image') {
    asset.thumbnailUrl = await generateThumbnail(dataUrl, 200);
  }
  
  const assets = getAllAssets();
  assets.push(asset);
  saveJson(STORAGE_KEYS.assets, assets);
  
  return asset;
}

// Update asset
export function updateAsset(
  id: string,
  updates: Partial<Pick<Asset, 'name' | 'tags' | 'folder' | 'metadata'>>
): Asset {
  const assets = getAllAssets();
  const index = assets.findIndex(a => a.id === id);
  
  if (index === -1) {
    throw new Error(`Asset ${id} not found`);
  }
  
  assets[index] = {
    ...assets[index],
    ...updates,
    updatedAt: Date.now(),
  };
  
  saveJson(STORAGE_KEYS.assets, assets);
  return assets[index];
}

// Delete asset
export function deleteAsset(id: string): void {
  const assets = getAllAssets();
  const filtered = assets.filter(a => a.id !== id);
  saveJson(STORAGE_KEYS.assets, filtered);
}

// Add version to asset
export async function addAssetVersion(
  assetId: string,
  file: File,
  changes: string
): Promise<Asset> {
  const asset = getAsset(assetId);
  if (!asset) {
    throw new Error(`Asset ${assetId} not found`);
  }
  
  const dataUrl = await fileToDataUrl(file);
  
  const version: AssetVersion = {
    id: generateId(),
    url: dataUrl,
    size: file.size,
    createdAt: Date.now(),
    changes,
  };
  
  if (!asset.versions) {
    asset.versions = [];
  }
  asset.versions.push(version);
  asset.updatedAt = Date.now();
  
  const assets = getAllAssets();
  const index = assets.findIndex(a => a.id === assetId);
  assets[index] = asset;
  saveJson(STORAGE_KEYS.assets, assets);
  
  return asset;
}

// Folder operations
export function getFolders(): AssetFolder[] {
  return loadJson<AssetFolder[]>(STORAGE_KEYS.folders, [
    { id: 'root', name: 'All Assets', parentId: null, createdAt: Date.now() },
    { id: 'logos', name: 'Logos', parentId: 'root', createdAt: Date.now() },
    { id: 'icons', name: 'Icons', parentId: 'root', createdAt: Date.now() },
    { id: 'banners', name: 'Banners', parentId: 'root', createdAt: Date.now() },
    { id: 'presentations', name: 'Presentations', parentId: 'root', createdAt: Date.now() },
    { id: 'social', name: 'Social Media', parentId: 'root', createdAt: Date.now() },
  ]);
}

export function createFolder(name: string, parentId: string = 'root'): AssetFolder {
  const folders = getFolders();
  
  const folder: AssetFolder = {
    id: generateId(),
    name,
    parentId,
    createdAt: Date.now(),
  };
  
  folders.push(folder);
  saveJson(STORAGE_KEYS.folders, folders);
  
  return folder;
}

export function deleteFolder(folderId: string): void {
  const folders = getFolders();
  const filtered = folders.filter(f => f.id !== folderId);
  saveJson(STORAGE_KEYS.folders, filtered);
  
  // Move assets to root
  const assets = getAllAssets();
  assets.forEach(a => {
    if (a.folder === folderId) {
      a.folder = 'root';
    }
  });
  saveJson(STORAGE_KEYS.assets, assets);
}

// Helper functions
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getImageDimensions(dataUrl: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = dataUrl;
  });
}

async function generateThumbnail(dataUrl: string, maxSize: number): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
    img.src = dataUrl;
  });
}

function extractTagsFromFilename(filename: string): string[] {
  const tags: string[] = [];
  const parts = filename.toLowerCase().split(/[-_.]/);
  
  const tagKeywords: Record<string, string> = {
    'logo': 'logo',
    'icon': 'icon',
    'banner': 'banner',
    'header': 'header',
    'social': 'social',
    'linkedin': 'linkedin',
    'twitter': 'twitter',
    'facebook': 'facebook',
    'instagram': 'instagram',
    'slide': 'presentation',
    'deck': 'presentation',
    'cover': 'cover',
    'hero': 'hero',
    'thumb': 'thumbnail',
  };
  
  parts.forEach(part => {
    if (tagKeywords[part]) {
      tags.push(tagKeywords[part]);
    }
  });
  
  return [...new Set(tags)];
}

// Export assets
export function exportAssetsList(format: 'json' | 'csv'): string {
  const assets = getAllAssets();
  
  if (format === 'json') {
    return JSON.stringify(assets, null, 2);
  }
  
  // CSV format
  const headers = ['ID', 'Name', 'Type', 'Size', 'Tags', 'Folder', 'Uploaded By', 'Date'];
  const rows = assets.map(a => [
    a.id,
    a.name,
    a.type,
    a.size,
    a.tags.join(', '),
    a.folder,
    a.uploadedBy,
    new Date(a.uploadedAt).toISOString(),
  ]);
  
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

// Get asset statistics
export function getAssetStats(): {
  totalAssets: number;
  totalSize: number;
  byType: Record<string, number>;
  byFolder: Record<string, number>;
  recentUploads: Asset[];
  topTags: { tag: string; count: number }[];
} {
  const assets = getAllAssets();
  
  const byType: Record<string, number> = {};
  const byFolder: Record<string, number> = {};
  const tagCounts: Record<string, number> = {};
  
  assets.forEach(asset => {
    byType[asset.type] = (byType[asset.type] || 0) + 1;
    byFolder[asset.folder] = (byFolder[asset.folder] || 0) + 1;
    
    asset.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  const topTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  return {
    totalAssets: assets.length,
    totalSize: assets.reduce((sum, a) => sum + a.size, 0),
    byType,
    byFolder,
    recentUploads: assets
      .sort((a, b) => b.uploadedAt - a.uploadedAt)
      .slice(0, 10),
    topTags,
  };
}

// Cloud storage integration (placeholder for real cloud services)
export interface CloudProvider {
  name: string;
  upload: (asset: Asset) => Promise<string>;
  download: (assetId: string) => Promise<Blob>;
  delete: (assetId: string) => Promise<void>;
}

// Mock cloud providers - replace with actual integrations
export const cloudProviders: Record<string, CloudProvider> = {
  local: {
    name: 'Local Storage',
    upload: async (asset) => asset.url,
    download: async (assetId) => {
      const asset = getAsset(assetId);
      if (!asset) throw new Error('Asset not found');
      
      const response = await fetch(asset.url);
      return response.blob();
    },
    delete: async (assetId) => {
      deleteAsset(assetId);
    },
  },
};
