/**
 * Image Gallery Library
 * Helper functions for accessing images from the gallery
 */

import manifest from '../manifest.json';

export interface GalleryImage {
  id: string;
  filename: string;
  name: string;
  tags: string[];
  usage: string[];
  dimensions?: string;
  format: string;
  category: string;
  src: string;
}

export interface CategoryInfo {
  description: string;
  path: string;
  count: number;
  images: GalleryImage[];
}

// Build image map for fast lookup
const imageMap = new Map<string, GalleryImage>();
const categoryMap = new Map<string, CategoryInfo>();

// Initialize maps
for (const [categoryKey, categoryData] of Object.entries(manifest.categories)) {
  const images: GalleryImage[] = [];
  
  // Handle subcategories (like screenshots/onboarding)
  if (categoryData.subcategories) {
    for (const [subKey, subData] of Object.entries(categoryData.subcategories)) {
      for (const img of subData.images || []) {
        const galleryImg: GalleryImage = {
          ...img,
          category: `${categoryKey}/${subKey}`,
          src: `${manifest.baseUrl}/${categoryKey}/${subKey}/${img.filename}`
        };
        images.push(galleryImg);
        imageMap.set(img.id, galleryImg);
      }
    }
  }
  
  // Handle regular images
  for (const img of categoryData.images || []) {
    const galleryImg: GalleryImage = {
      ...img,
      category: categoryKey,
      src: `${manifest.baseUrl}/${categoryKey}/${img.filename}`
    };
    images.push(galleryImg);
    imageMap.set(img.id, galleryImg);
  }
  
  categoryMap.set(categoryKey, {
    description: categoryData.description,
    path: categoryData.path,
    count: images.length,
    images
  });
}

/**
 * Get a single image by ID
 */
export function getImage(id: string): GalleryImage | null {
  return imageMap.get(id) || null;
}

/**
 * Get all images in a category
 */
export function getImagesByCategory(category: string): GalleryImage[] {
  return categoryMap.get(category)?.images || [];
}

/**
 * Find images by tag
 */
export function findImagesByTag(tag: string): GalleryImage[] {
  const results: GalleryImage[] = [];
  for (const img of imageMap.values()) {
    if (img.tags.includes(tag)) {
      results.push(img);
    }
  }
  return results;
}

/**
 * Find images by usage location
 */
export function findImagesByUsage(usage: string): GalleryImage[] {
  const results: GalleryImage[] = [];
  for (const img of imageMap.values()) {
    if (img.usage.includes(usage)) {
      results.push(img);
    }
  }
  return results;
}

/**
 * Search images by name or tag
 */
export function searchImages(query: string): GalleryImage[] {
  const lowerQuery = query.toLowerCase();
  const results: GalleryImage[] = [];
  
  for (const img of imageMap.values()) {
    if (
      img.name.toLowerCase().includes(lowerQuery) ||
      img.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      img.id.toLowerCase().includes(lowerQuery)
    ) {
      results.push(img);
    }
  }
  
  return results;
}

/**
 * Get all categories
 */
export function getCategories(): string[] {
  return Array.from(categoryMap.keys());
}

/**
 * Get category info
 */
export function getCategoryInfo(category: string): CategoryInfo | null {
  return categoryMap.get(category) || null;
}

/**
 * Get all images
 */
export function getAllImages(): GalleryImage[] {
  return Array.from(imageMap.values());
}

/**
 * Get CDN URL if enabled
 */
export function getCdnUrl(localPath: string): string {
  if (manifest.cdn.enabled) {
    return `${manifest.cdn.url}${localPath.replace(manifest.baseUrl, '')}`;
  }
  return localPath;
}

// React Hook (for React projects)
export function useGalleryImage(id: string) {
  return getImage(id);
}

export function useGalleryImagesByCategory(category: string) {
  return getImagesByCategory(category);
}

export function useGallerySearch(query: string) {
  return searchImages(query);
}

// Default export
export default {
  getImage,
  getImagesByCategory,
  findImagesByTag,
  findImagesByUsage,
  searchImages,
  getCategories,
  getCategoryInfo,
  getAllImages,
  getCdnUrl,
  useGalleryImage,
  useGalleryImagesByCategory,
  useGallerySearch
};
