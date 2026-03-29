#!/usr/bin/env node
/**
 * Dropbox → ImageGallery Sync Bridge
 * Watches Dropbox folder and syncs new images to ImageGallery CMS
 * 
 * Usage:
 *   node scripts/dropbox-sync.mjs --watch        # Watch mode (daily sync)
 *   node scripts/dropbox-sync.mjs --import-all   # One-time import
 *   node scripts/dropbox-sync.mjs --dry-run      # Preview what would sync
 */

import { promises as fs } from 'fs';
import { join, basename, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Configuration
const CONFIG = {
  dropboxBase: '/Users/nirmal/Dropbox/IntegrateWise - Collation March',
  galleryBase: join(ROOT, 'ImageGallery'),
  manifestPath: join(ROOT, 'ImageGallery/manifest.json'),
  
  // Category mappings based on folder structure
  categoryMap: {
    'Marketing Content/Images Gallery': 'marketing',
    'Marketing Content/Images Gallery/Images': 'heroes',
    'Marketing Content/Brand Contents/Logo': 'logos',
    'Marketing Content/Brand Contents/Campaign': 'campaigns',
    'Marketing Content/SVG': 'icons',
    'Marketing Content/Logo': 'logos',
    'Product Presentations/Product Screenshots & Videos': 'screenshots',
    'Product Presentations/Product Images': 'product',
    'Company Documentations/Product Development/Whiteboards': 'whiteboards',
    'Company Documentations/Notes': 'notes',
    'Dropbox/SVG': 'icons',
  },
  
  // File type categories
  typeCategories: {
    '.svg': 'icons',
    '.png': 'images',
    '.jpg': 'images',
    '.jpeg': 'images',
    '.webp': 'images',
    '.gif': 'images',
  },
  
  // Exclude patterns
  exclude: [
    '.DS_Store',
    'node_modules',
    'Archive_',
    '.git',
  ]
};

// Parse args
const args = process.argv.slice(2);
const watchMode = args.includes('--watch');
const importAll = args.includes('--import-all');
const dryRun = args.includes('--dry-run');
const verbose = args.includes('--verbose');

// Stats
let stats = {
  scanned: 0,
  found: 0,
  imported: 0,
  skipped: 0,
  errors: 0
};

function log(msg, force = false) {
  if (verbose || force) console.log(msg);
}

function getCategoryFromPath(filePath) {
  const relativePath = filePath.replace(CONFIG.dropboxBase, '');
  
  // Check explicit mappings first
  for (const [folder, category] of Object.entries(CONFIG.categoryMap)) {
    if (relativePath.includes(folder)) {
      return category;
    }
  }
  
  // Infer from file type
  const ext = extname(filePath).toLowerCase();
  if (ext === '.svg') return 'icons';
  
  // Check filename patterns
  const filename = basename(filePath).toLowerCase();
  if (filename.includes('hero')) return 'heroes';
  if (filename.includes('logo') || filename.includes('brand')) return 'logos';
  if (filename.includes('screenshot') || filename.includes('ui')) return 'screenshots';
  if (filename.includes('icon') || filename.includes('vector')) return 'icons';
  if (filename.includes('diagram') || filename.includes('architecture')) return 'diagrams';
  
  return 'uncategorized';
}

function shouldExclude(filePath) {
  const filename = basename(filePath);
  return CONFIG.exclude.some(pattern => 
    filename.includes(pattern) || filePath.includes(pattern)
  );
}

function generateId(category, existingCount) {
  const prefix = category.substring(0, 4);
  return `${prefix}-${String(existingCount + 1).padStart(3, '0')}`;
}

async function loadManifest() {
  try {
    const data = await fs.readFile(CONFIG.manifestPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { version: '1.0.0', categories: {}, stats: { totalImages: 0 } };
  }
}

async function saveManifest(manifest) {
  if (!dryRun) {
    await fs.writeFile(CONFIG.manifestPath, JSON.stringify(manifest, null, 2));
  }
}

async function ensureDir(dir) {
  if (!dryRun) {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function scanDropbox(dir = CONFIG.dropboxBase) {
  const images = [];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (shouldExclude(fullPath)) continue;
      
      if (entry.isDirectory()) {
        const subImages = await scanDropbox(fullPath);
        images.push(...subImages);
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase();
        if (CONFIG.typeCategories[ext]) {
          images.push({
            path: fullPath,
            filename: entry.name,
            category: getCategoryFromPath(fullPath),
            size: (await fs.stat(fullPath)).size
          });
        }
      }
    }
  } catch (err) {
    console.error(`Error scanning ${dir}:`, err.message);
  }
  
  return images;
}

async function importImage(image, manifest) {
  const category = image.category;
  const categoryDir = join(CONFIG.galleryBase, category);
  const destPath = join(categoryDir, image.filename);
  
  // Check if already exists
  try {
    await fs.access(destPath);
    stats.skipped++;
    log(`  ⏭️  Skipped (exists): ${image.filename}`);
    return false;
  } catch {
    // File doesn't exist, proceed
  }
  
  // Ensure category directory exists
  await ensureDir(categoryDir);
  
  // Copy file
  if (!dryRun) {
    try {
      await fs.copyFile(image.path, destPath);
    } catch (err) {
      console.error(`  ❌ Error copying ${image.filename}:`, err.message);
      stats.errors++;
      return false;
    }
  }
  
  // Update manifest
  if (!manifest.categories[category]) {
    manifest.categories[category] = {
      description: `${category} images`,
      path: `/${category}`,
      count: 0,
      images: []
    };
  }
  
  // Ensure images array exists
  if (!manifest.categories[category].images) {
    manifest.categories[category].images = [];
  }
  
  const id = generateId(category, manifest.categories[category].images.length || 0);
  
  manifest.categories[category].images.push({
    id,
    filename: image.filename,
    name: image.filename.replace(extname(image.filename), '').replace(/[_-]/g, ' '),
    tags: [category, 'auto-imported'],
    usage: ['general'],
    format: extname(image.filename).replace('.', ''),
    source: 'dropbox',
    imported: new Date().toISOString()
  });
  
  manifest.categories[category].count = manifest.categories[category].images.length;
  manifest.stats.totalImages++;
  manifest.lastUpdated = new Date().toISOString().split('T')[0];
  
  stats.imported++;
  log(`  ✅ Imported: ${image.filename} → ${category}/${id}`);
  return true;
}

async function sync() {
  console.log('🔍 Scanning Dropbox...\n');
  
  const manifest = await loadManifest();
  const images = await scanDropbox();
  
  stats.found = images.length;
  console.log(`📊 Found ${images.length} images in Dropbox`);
  console.log(`📁 Breakdown by category:`);
  
  const byCategory = {};
  for (const img of images) {
    byCategory[img.category] = (byCategory[img.category] || 0) + 1;
  }
  
  for (const [cat, count] of Object.entries(byCategory).sort((a, b) => b[1] - a[1])) {
    console.log(`   ${cat}: ${count}`);
  }
  
  console.log(`\n📥 Importing to ImageGallery...`);
  
  if (dryRun) {
    console.log('🔍 DRY RUN - No files will be copied\n');
  }
  
  for (const image of images) {
    await importImage(image, manifest);
  }
  
  await saveManifest(manifest);
  
  console.log(`\n✅ Sync Complete!`);
  console.log(`   Found: ${stats.found}`);
  console.log(`   Imported: ${stats.imported}`);
  console.log(`   Skipped: ${stats.skipped}`);
  console.log(`   Errors: ${stats.errors}`);
  
  // Git commit if changes
  if (!dryRun && stats.imported > 0) {
    console.log(`\n💾 Committing to git...`);
    try {
      await execAsync('git add ImageGallery/', { cwd: ROOT });
      await execAsync(`git commit -m "sync: Import ${stats.imported} images from Dropbox"`, { cwd: ROOT });
      console.log('✅ Committed');
    } catch {
      console.log('⚠️  Nothing to commit or git error');
    }
  }
}

async function watch() {
  console.log('👁️  Watch mode active - Press Ctrl+C to stop');
  console.log('⏱️  Syncing every 24 hours...\n');
  
  // Initial sync
  await sync();
  
  // Schedule daily sync
  setInterval(async () => {
    console.log(`\n🔄 Daily sync triggered at ${new Date().toLocaleString()}`);
    stats = { scanned: 0, found: 0, imported: 0, skipped: 0, errors: 0 };
    await sync();
  }, 24 * 60 * 60 * 1000); // 24 hours
}

// Main
if (importAll || dryRun) {
  sync().catch(console.error);
} else if (watchMode) {
  watch().catch(console.error);
} else {
  console.log(`
🔄 Dropbox → ImageGallery Sync Bridge

Usage:
  node scripts/dropbox-sync.mjs --import-all    # One-time import
  node scripts/dropbox-sync.mjs --watch         # Daily auto-sync
  node scripts/dropbox-sync.mjs --dry-run       # Preview only
  node scripts/dropbox-sync.mjs --verbose       # Detailed output

Categories (auto-detected):
  - heroes: Hero banner images
  - marketing: Marketing content
  - logos: Brand logos
  - icons: SVG icons
  - screenshots: Product screenshots
  - campaigns: Marketing campaigns
  - product: Product images
  - diagrams: Architecture diagrams
  - whiteboards: Development whiteboards
`);
}
