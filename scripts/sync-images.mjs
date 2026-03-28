#!/usr/bin/env node
/**
 * Image Gallery Sync Script
 * Syncs images from ImageGallery/ to FrontEnd sites
 * 
 * Usage:
 *   node scripts/sync-images.mjs              # Sync all to all sites
 *   node scripts/sync-images.mjs --site marketing   # Sync to marketing only
 *   node scripts/sync-images.mjs --category heroes  # Sync heroes only
 */

import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Configuration
const CONFIG = {
  source: join(ROOT, 'ImageGallery'),
  sites: {
    marketing: join(ROOT, 'FrontEnd/sites/marketing/public/images'),
    landing: join(ROOT, 'FrontEnd/sites/landing/public/images'),
    portfolio: join(ROOT, 'FrontEnd/sites/portfolio/public/images'),
    brand: join(ROOT, 'BrandDocumentations/public/images'),
  },
  categories: ['heroes', 'features', 'illustrations', 'infographics', 'screenshots', 'logos', 'icons']
};

// Parse args
const args = process.argv.slice(2);
const targetSite = args.find(arg => arg.startsWith('--site='))?.split('=')[1] 
  || (args.includes('--site') ? args[args.indexOf('--site') + 1] : null);
const targetCategory = args.find(arg => arg.startsWith('--category='))?.split('=')[1]
  || (args.includes('--category') ? args[args.indexOf('--category') + 1] : null);
const dryRun = args.includes('--dry-run');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {
    // Ignore exists error
  }
}

async function copyFile(src, dest) {
  try {
    await fs.copyFile(src, dest);
    return true;
  } catch (e) {
    console.error(`  ❌ Failed to copy: ${e.message}`);
    return false;
  }
}

async function syncCategory(category, sourceDir, destDir) {
  const files = await fs.readdir(sourceDir).catch(() => []);
  let copied = 0;
  
  for (const file of files) {
    if (file.startsWith('.')) continue;
    
    const srcPath = join(sourceDir, file);
    const destPath = join(destDir, file);
    const stat = await fs.stat(srcPath).catch(() => null);
    
    if (stat?.isFile()) {
      if (!dryRun) {
        const success = await copyFile(srcPath, destPath);
        if (success) copied++;
      } else {
        copied++;
      }
    }
  }
  
  return copied;
}

async function syncToSite(siteName, sitePath) {
  console.log(`\n📦 Syncing to ${siteName}...`);
  
  // Ensure site directory exists
  await ensureDir(sitePath);
  
  let totalCopied = 0;
  const categoriesToSync = targetCategory 
    ? [targetCategory] 
    : CONFIG.categories;
  
  for (const category of categoriesToSync) {
    const sourceDir = join(CONFIG.source, category);
    const destDir = join(sitePath, category);
    
    // Check if source exists
    const exists = await fs.access(sourceDir).then(() => true).catch(() => false);
    if (!exists) continue;
    
    // Create category dir
    await ensureDir(destDir);
    
    // Sync files
    const copied = await syncCategory(category, sourceDir, destDir);
    totalCopied += copied;
    
    if (copied > 0) {
      console.log(`  ✅ ${category}: ${copied} images`);
    }
  }
  
  // Copy manifest
  const manifestSrc = join(CONFIG.source, 'manifest.json');
  const manifestDest = join(sitePath, 'manifest.json');
  if (!dryRun) {
    await copyFile(manifestSrc, manifestDest);
  }
  
  console.log(`  📄 manifest.json copied`);
  console.log(`  🎉 Total: ${totalCopied} images synced to ${siteName}`);
  
  return totalCopied;
}

async function main() {
  console.log('🖼️  Image Gallery Sync\n');
  console.log(`Source: ${CONFIG.source}`);
  
  if (dryRun) {
    console.log('🔍 DRY RUN - No files will be copied\n');
  }
  
  const sitesToSync = targetSite 
    ? { [targetSite]: CONFIG.sites[targetSite] }
    : CONFIG.sites;
  
  let grandTotal = 0;
  
  for (const [siteName, sitePath] of Object.entries(sitesToSync)) {
    if (!sitePath) {
      console.log(`\n⚠️  Site not found: ${siteName}`);
      continue;
    }
    const copied = await syncToSite(siteName, sitePath);
    grandTotal += copied;
  }
  
  console.log(`\n✨ Grand Total: ${grandTotal} images synced`);
}

main().catch(console.error);
