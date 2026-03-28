#!/usr/bin/env node
/**
 * Validate Image Gallery Manifest
 * Checks for missing files, duplicates, and orphaned entries
 */

import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const GALLERY_DIR = join(ROOT, 'ImageGallery');
const MANIFEST_PATH = join(GALLERY_DIR, 'manifest.json');

async function main() {
  console.log('🔍 Validating Image Gallery Manifest\n');
  
  const manifest = JSON.parse(await fs.readFile(MANIFEST_PATH, 'utf-8'));
  let errors = 0;
  let warnings = 0;
  
  // Check each category
  for (const [catName, catData] of Object.entries(manifest.categories)) {
    const catDir = join(GALLERY_DIR, catName);
    
    // Check directory exists
    const dirExists = await fs.access(catDir).then(() => true).catch(() => false);
    if (!dirExists) {
      console.log(`⚠️  ${catName}: Directory missing`);
      warnings++;
      continue;
    }
    
    // Get actual files
    const actualFiles = await fs.readdir(catDir).catch(() => []);
    const manifestFiles = catData.images?.map(img => img.filename) || [];
    
    // Check for files not in manifest
    for (const file of actualFiles) {
      if (file === 'manifest.json' || file.startsWith('.')) continue;
      if (!manifestFiles.includes(file)) {
        console.log(`⚠️  ${catName}/${file}: File exists but not in manifest`);
        warnings++;
      }
    }
    
    // Check for manifest entries without files
    for (const img of catData.images || []) {
      if (!actualFiles.includes(img.filename)) {
        console.log(`❌ ${catName}/${img.filename}: In manifest but file missing`);
        errors++;
      }
      
      // Check for duplicate IDs
      const duplicates = catData.images.filter(i => i.id === img.id);
      if (duplicates.length > 1) {
        console.log(`❌ ${catName}: Duplicate ID "${img.id}"`);
        errors++;
      }
    }
    
    // Verify count matches
    const actualCount = actualFiles.filter(f => !f.startsWith('.')).length;
    if (catData.count !== actualCount) {
      console.log(`⚠️  ${catName}: Count mismatch (manifest: ${catData.count}, actual: ${actualCount})`);
      warnings++;
    }
    
    console.log(`✅ ${catName}: ${catData.images?.length || 0} images`);
  }
  
  // Summary
  console.log(`\n${'='.repeat(40)}`);
  if (errors === 0 && warnings === 0) {
    console.log('✨ All validations passed!');
  } else {
    console.log(`❌ ${errors} errors, ⚠️ ${warnings} warnings`);
  }
  console.log(`Total images: ${manifest.stats.totalImages}`);
}

main().catch(console.error);
