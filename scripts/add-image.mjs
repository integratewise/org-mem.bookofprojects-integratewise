#!/usr/bin/env node
/**
 * Add Image to Gallery Manifest
 * 
 * Usage:
 *   node scripts/add-image.mjs --file image.png --category heroes --name "My Hero" --tags "b2b,homepage"
 */

import { promises as fs } from 'fs';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MANIFEST_PATH = join(ROOT, 'ImageGallery/manifest.json');

// Parse args
const args = process.argv.slice(2);
const getArg = (flag) => {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : null;
};

const fileArg = getArg('--file');
const categoryArg = getArg('--category');
const nameArg = getArg('--name');
const tagsArg = getArg('--tags');
const usageArg = getArg('--usage');

function generateId(category, existingImages) {
  const count = existingImages.length + 1;
  const prefix = category.substring(0, 4);
  return `${prefix}-${String(count).padStart(3, '0')}`;
}

async function main() {
  if (!fileArg || !categoryArg) {
    console.log(`
🖼️  Add Image to Gallery

Usage:
  node scripts/add-image.mjs --file path/to/image.png --category heroes

Required:
  --file       Path to image file
  --category   Category folder (heroes, features, illustrations, etc.)

Optional:
  --name       Display name for the image
  --tags       Comma-separated tags (e.g., "b2b,homepage,saas")
  --usage      Comma-separated usage locations (e.g., "landing-page,hero")
    `);
    process.exit(1);
  }
  
  // Load manifest
  const manifest = JSON.parse(await fs.readFile(MANIFEST_PATH, 'utf-8'));
  
  // Check category exists
  if (!manifest.categories[categoryArg]) {
    console.error(`❌ Category "${categoryArg}" not found in manifest`);
    console.log(`Available: ${Object.keys(manifest.categories).join(', ')}`);
    process.exit(1);
  }
  
  // Get file info
  const filename = basename(fileArg);
  const ext = extname(filename).toLowerCase();
  const stats = await fs.stat(fileArg).catch(() => null);
  
  if (!stats) {
    console.error(`❌ File not found: ${fileArg}`);
    process.exit(1);
  }
  
  // Generate ID
  const existingImages = manifest.categories[categoryArg].images || [];
  const id = generateId(categoryArg, existingImages);
  
  // Build image entry
  const imageEntry = {
    id,
    filename,
    name: nameArg || filename.replace(ext, '').replace(/_/g, ' '),
    tags: tagsArg ? tagsArg.split(',').map(t => t.trim()) : ['new'],
    usage: usageArg ? usageArg.split(',').map(u => u.trim()) : ['general'],
    format: ext.replace('.', ''),
    added: new Date().toISOString().split('T')[0]
  };
  
  // Add to manifest
  manifest.categories[categoryArg].images.push(imageEntry);
  manifest.categories[categoryArg].count = manifest.categories[categoryArg].images.length;
  manifest.stats.totalImages++;
  manifest.lastUpdated = new Date().toISOString().split('T')[0];
  
  // Save manifest
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  
  // Copy file to gallery
  const destDir = join(ROOT, 'ImageGallery', categoryArg);
  await fs.mkdir(destDir, { recursive: true });
  await fs.copyFile(fileArg, join(destDir, filename));
  
  console.log(`\n✅ Image added successfully!`);
  console.log(`\n  ID:       ${id}`);
  console.log(`  Name:     ${imageEntry.name}`);
  console.log(`  Category: ${categoryArg}`);
  console.log(`  Tags:     ${imageEntry.tags.join(', ')}`);
  console.log(`  Usage:    ${imageEntry.usage.join(', ')}`);
  console.log(`\nUse in code:`);
  console.log(`  <img src="/ImageGallery/${categoryArg}/${filename}" alt="${imageEntry.name}" />`);
  console.log(`  // Or with ID: getImage('${id}')`);
}

main().catch(console.error);
