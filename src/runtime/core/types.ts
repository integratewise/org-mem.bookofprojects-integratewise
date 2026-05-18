/**
 * Unified Runtime Object Model
 *
 * Every item in the canonical storage path /{domain}/{state}/{item}
 * is a RuntimeObject with polymorphic content.
 *
 * Content types:
 *   document  — markdown/text pages
 *   table     — structured databases with columns and rows
 *   image     — visual assets
 *   file      — attachments (PDFs, docs, spreadsheets, etc.)
 *   link      — external references with metadata
 *   embed     — iframe/embeddable content
 *   view      — dynamic query projections over other objects
 *   canvas    — composite pages containing ordered blocks
 */

import type { ApprovedDomain } from "./domains";
import type { CanonicalState } from "./paths";

export type ContentType =
  | "document"
  | "table"
  | "image"
  | "file"
  | "link"
  | "embed"
  | "view"
  | "canvas";

export interface RuntimeObjectMeta {
  id: string;
  domain: ApprovedDomain;
  state: CanonicalState;
  title: string;
  contentType: ContentType;
  tags: string[];
  authorId: string;
  references: string[]; // Reference IDs
  lineage: string[]; // Prior version IDs
  version: number;
  createdAt: number;
  updatedAt: number;
  promotedAt: number | null;
}

// ─── Document ───
export interface DocumentContent {
  body: string; // Markdown
  excerpt?: string;
}

// ─── Table (Database) ───
export interface TableColumn {
  id: string;
  name: string;
  type: "text" | "number" | "date" | "select" | "multi_select" | "checkbox" | "url" | "relation" | "file";
  options?: string[]; // For select / multi_select
  required?: boolean;
}

export interface TableContent {
  columns: TableColumn[];
  rows: Record<string, unknown>[]; // Each row is a map of column.id → value
}

// ─── Image ───
export interface ImageContent {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  thumbnailUrl?: string;
}

// ─── File ───
export interface FileContent {
  url: string;
  name: string;
  mimeType: string;
  size: number; // bytes
}

// ─── Link ───
export interface LinkContent {
  url: string;
  description?: string;
  favicon?: string;
  previewImage?: string;
}

// ─── Embed ───
export interface EmbedContent {
  url: string;
  provider?: "figma" | "loom" | "youtube" | "vimeo" | "miro" | "notion" | "generic";
  title?: string;
}

// ─── View (Dynamic Projection) ───
export interface ViewContent {
  viewType: "list" | "grid" | "board" | "calendar" | "gallery";
  query: {
    domain?: ApprovedDomain;
    state?: CanonicalState;
    tags?: string[];
    contentType?: ContentType;
    search?: string;
  };
  sortBy?: string;
  groupBy?: string;
}

// ─── Canvas (Composite Page) ───
export interface CanvasBlock {
  id: string;
  type: ContentType;
  content: DocumentContent | TableContent | ImageContent | FileContent | LinkContent | EmbedContent | ViewContent;
  position: number;
}

export interface CanvasContent {
  blocks: CanvasBlock[];
}

// ─── Union ───
export type RuntimeContent =
  | DocumentContent
  | TableContent
  | ImageContent
  | FileContent
  | LinkContent
  | EmbedContent
  | ViewContent
  | CanvasContent;

export interface RuntimeObject extends RuntimeObjectMeta {
  content: RuntimeContent;
}

// ─── Factories ───

export function createRuntimeObject(
  partial: Omit<RuntimeObjectMeta, "id" | "version" | "lineage" | "createdAt" | "updatedAt" | "promotedAt"> & {
    content: RuntimeContent;
  }
): RuntimeObject {
  const now = Date.now();
  return {
    ...partial,
    id: `run_${now}_${Math.random().toString(36).slice(2, 7)}`,
    version: 1,
    lineage: [],
    createdAt: now,
    updatedAt: now,
    promotedAt: null,
  };
}

export function evolveRuntimeObject(
  prior: RuntimeObject,
  changes: Partial<Omit<RuntimeObjectMeta, "id" | "lineage" | "createdAt">> & { content?: RuntimeContent }
): RuntimeObject {
  const now = Date.now();
  return {
    ...prior,
    ...changes,
    id: `run_${now}_${Math.random().toString(36).slice(2, 7)}`,
    version: prior.version + 1,
    lineage: [...prior.lineage, prior.id],
    createdAt: prior.createdAt,
    updatedAt: now,
  };
}

// ─── Content Type Helpers ───

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  document: "Document",
  table: "Table",
  image: "Image",
  file: "File",
  link: "Link",
  embed: "Embed",
  view: "View",
  canvas: "Canvas",
};

export const CONTENT_TYPE_ICONS: Record<ContentType, string> = {
  document: "FileText",
  table: "Table2",
  image: "Image",
  file: "Paperclip",
  link: "Link",
  embed: "Code2",
  view: "LayoutGrid",
  canvas: "Layers",
};
