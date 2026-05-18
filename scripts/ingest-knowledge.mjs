/**
 * Knowledge Ingestion Script
 * 
 * Reads external canonical documents and converts them into
 * KnowledgeObjects + References for the runtime storage layer.
 * 
 * Usage: node scripts/ingest-knowledge.mjs
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DOCS = [
  {
    path: '/Users/nirmal/Downloads/Memory Governance in AI.md',
    title: 'Memory Governance in AI',
    type: 'doctrine',
    domain: 'governance',
    tags: ['memory', 'governance', 'triage', 'continuity', 'doctrine'],
  },
  {
    path: '/Users/nirmal/Downloads/IntegrateWise_Company_OS.md',
    title: 'IntegrateWise Operating System',
    type: 'doctrine',
    domain: 'governance',
    tags: ['company-os', 'doctrine', 'continuity', 'operations'],
  },
  {
    path: '/Users/nirmal/Downloads/BHIVE Premium HSR Sector 6  this is near silk board new bus stand right.md',
    title: 'Office Space Research: BHIVE HSR Layout',
    type: 'summary',
    domain: 'operations',
    tags: ['office', 'bangalore', 'workspace', 'operations'],
  },
];

function hashContent(content) {
  return crypto.createHash('sha256').update(content).digest('hex').slice(0, 16);
}

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function createReference(doc) {
  const content = fs.readFileSync(doc.path, 'utf-8');
  return {
    id: `ref-${slugify(doc.title)}`,
    type: 'document',
    title: doc.title,
    source: path.basename(doc.path),
    checksum: hashContent(content),
    capturedAt: Date.now(),
    metadata: { size: content.length, path: doc.path },
  };
}

function createKnowledgeObject(doc, referenceId) {
  const content = fs.readFileSync(doc.path, 'utf-8');
  // Truncate content to first 5000 chars for storage (localStorage limit)
  const truncated = content.slice(0, 5000) + (content.length > 5000 
    ? '\n\n...[truncated: ' + (content.length - 5000) + ' chars remaining. See reference for full text.]'
    : '');
  
  return {
    id: `know-${slugify(doc.title)}`,
    type: doc.type,
    domain: doc.domain,
    title: doc.title,
    content: truncated,
    confidence: 'certain',
    version: 1,
    lineage: [],
    references: [referenceId],
    tags: doc.tags,
    authorId: 'human:founder',
    entityIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    promotedAt: Date.now(),
  };
}

// Build seed data
const seedData = {
  references: [],
  knowledge: [],
};

for (const doc of DOCS) {
  if (!fs.existsSync(doc.path)) {
    console.warn(`SKIP: ${doc.path} not found`);
    continue;
  }
  
  const ref = createReference(doc);
  const know = createKnowledgeObject(doc, ref.id);
  
  seedData.references.push(ref);
  seedData.knowledge.push(know);
  
  console.log(`INGESTED: ${doc.title}`);
  console.log(`  Ref: ${ref.id} | Checksum: ${ref.checksum}`);
  console.log(`  Know: ${know.id} | Content: ${know.content.length} chars`);
}

// Write seed file
const outPath = path.join(process.cwd(), 'src', 'runtime', 'storage', 'seed-knowledge.json');
fs.writeFileSync(outPath, JSON.stringify(seedData, null, 2));
console.log(`\nSeed written to: ${outPath}`);
console.log(`Total: ${seedData.knowledge.length} knowledge objects, ${seedData.references.length} references`);
