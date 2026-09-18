export const APPROVED_KNOWLEDGE_DOMAINS = [
  'executive',
  'product',
  'engineering',
  'design',
  'ai-operations',
  'business-operations',
  'sales',
  'marketing',
  'customer-success',
  'finance',
  'research-and-continuity',
  'infrastructure-and-security',
] as const;

export type KnowledgeDomain = (typeof APPROVED_KNOWLEDGE_DOMAINS)[number];

export const KNOWLEDGE_STATES = ['triage', 'knowledge-persisted', 'references'] as const;

export type KnowledgeState = (typeof KNOWLEDGE_STATES)[number];

export const KNOWLEDGE_ITEM_TYPES = [
  'document',
  'image',
  'attachment',
  'table',
  'view',
  'record',
  'generated-output',
  'reference',
] as const;

export type KnowledgeItemType = (typeof KNOWLEDGE_ITEM_TYPES)[number];

export type CanonicalKnowledgePath = `/${KnowledgeDomain}/${KnowledgeState}`;

export interface KnowledgeLineage {
  sourceSystem?: string;
  sourceId?: string;
  sourcePath?: string;
  generatedBy?: string;
  generatedFromItemIds?: string[];
}

export interface KnowledgeReference {
  relation: string;
  targetId?: string;
  targetPath?: CanonicalKnowledgePath;
  href?: string;
}

export interface CanonicalKnowledgeItem {
  id: string;
  domain: KnowledgeDomain;
  state: KnowledgeState;
  type: KnowledgeItemType;
  title: string;
  label?: string;
  createdAt: string;
  updatedAt: string;
  summary?: string;
  status?: string;
  tags: string[];
  references: KnowledgeReference[];
  relatedItemIds: string[];
  lineage?: KnowledgeLineage;
}

export interface DomainStateContainer {
  domain: KnowledgeDomain;
  state: KnowledgeState;
  path: CanonicalKnowledgePath;
  itemIds: string[];
}

export function isKnowledgeDomain(value: string): value is KnowledgeDomain {
  return APPROVED_KNOWLEDGE_DOMAINS.includes(value as KnowledgeDomain);
}

export function isKnowledgeState(value: string): value is KnowledgeState {
  return KNOWLEDGE_STATES.includes(value as KnowledgeState);
}

export function buildKnowledgePath(
  domain: KnowledgeDomain,
  state: KnowledgeState,
): CanonicalKnowledgePath {
  return `/${domain}/${state}`;
}

export function parseKnowledgePath(path: string): {
  domain: KnowledgeDomain;
  state: KnowledgeState;
} | null {
  const [domain, state] = path.replace(/^\/+/, '').split('/');
  if (!domain || !state || !isKnowledgeDomain(domain) || !isKnowledgeState(state)) {
    return null;
  }

  return { domain, state };
}

export function isCanonicalKnowledgePath(path: string): path is CanonicalKnowledgePath {
  return parseKnowledgePath(path) !== null;
}

export function createDomainStateContainers(): DomainStateContainer[] {
  return APPROVED_KNOWLEDGE_DOMAINS.flatMap((domain) =>
    KNOWLEDGE_STATES.map((state) => ({
      domain,
      state,
      path: buildKnowledgePath(domain, state),
      itemIds: [],
    })),
  );
}

export const CANONICAL_DOMAIN_STATE_CONTAINERS = createDomainStateContainers();
