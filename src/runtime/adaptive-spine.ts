/**
 * Adaptive Spine (Client-Side Simulation)
 *
 * Tracks entity discovery, relationship evolution, and schema adaptation.
 * This is a lightweight client-side simulation of the full Adaptive Spine.
 * Future: replace with CF Spine D1 integration.
 */

export interface Entity {
  id: string;
  type: string; // e.g., "contact", "company", "deal"
  name: string;
  attributes: Record<string, unknown>;
  health: number; // 0-1
  relationships: { to: string; type: string; weight: number }[];
  firstSeen: number;
  lastUpdated: number;
}

export interface SchemaField {
  name: string;
  type: "string" | "number" | "boolean" | "date" | "json";
  required: boolean;
  usageCount: number;
  deprecated: boolean;
}

export interface EntitySchema {
  entityType: string;
  fields: SchemaField[];
  version: number;
  lastEvolvedAt: number;
}

const PREFIX = "iw:spine:";

function key(table: string, id: string): string {
  return `${PREFIX}${table}:${id}`;
}

function getAll<T>(table: string): T[] {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith(`${PREFIX}${table}:`)) keys.push(k);
  }
  return keys
    .map((k) => {
      try {
        return JSON.parse(localStorage.getItem(k) || "null");
      } catch {
        return null;
      }
    })
    .filter(Boolean) as T[];
}

function save<T extends { id: string }>(table: string, item: T): void {
  localStorage.setItem(key(table, item.id), JSON.stringify(item));
}

// --- Entity Graph ---

export const EntityGraph = {
  save: (e: Entity) => save("entities", e),
  get: (id: string): Entity | null => {
    const raw = localStorage.getItem(key("entities", id));
    return raw ? JSON.parse(raw) : null;
  },
  list: (type?: string): Entity[] => {
    let results = getAll<Entity>("entities").sort((a, b) => b.lastUpdated - a.lastUpdated);
    if (type) results = results.filter((e) => e.type === type);
    return results;
  },
  upsert: (partial: Omit<Entity, "id" | "firstSeen" | "lastUpdated"> & { id?: string }): Entity => {
    const now = Date.now();
    const existing = partial.id ? EntityGraph.get(partial.id) : null;
    const entity: Entity = existing
      ? {
          ...existing,
          ...partial,
          id: existing.id,
          firstSeen: existing.firstSeen,
          lastUpdated: now,
          relationships: partial.relationships || existing.relationships,
        }
      : {
          id: partial.id || `ent_${now}_${Math.random().toString(36).slice(2, 7)}`,
          type: partial.type,
          name: partial.name,
          attributes: partial.attributes || {},
          health: partial.health ?? 1.0,
          relationships: partial.relationships || [],
          firstSeen: now,
          lastUpdated: now,
        };
    save("entities", entity);
    return entity;
  },
  related: (id: string, relationType?: string): Entity[] => {
    const entity = EntityGraph.get(id);
    if (!entity) return [];
    return entity.relationships
      .filter((r) => !relationType || r.type === relationType)
      .map((r) => EntityGraph.get(r.to))
      .filter(Boolean) as Entity[];
  },
};

// --- Schema Evolution ---

export const SchemaRegistry = {
  save: (s: EntitySchema) => save("schemas", s),
  get: (entityType: string): EntitySchema | null => {
    const raw = localStorage.getItem(key("schemas", entityType));
    return raw ? JSON.parse(raw) : null;
  },
  discoverField: (entityType: string, fieldName: string, fieldType: SchemaField["type"]): EntitySchema => {
    const now = Date.now();
    let schema = SchemaRegistry.get(entityType);
    if (!schema) {
      schema = {
        entityType,
        fields: [],
        version: 1,
        lastEvolvedAt: now,
      };
    }
    const existing = schema.fields.find((f) => f.name === fieldName);
    if (existing) {
      existing.usageCount++;
      if (existing.type !== fieldType) {
        // Type evolution — mark as json to accommodate both
        existing.type = "json";
      }
    } else {
      schema.fields.push({
        name: fieldName,
        type: fieldType,
        required: false,
        usageCount: 1,
        deprecated: false,
      });
      schema.version++;
      schema.lastEvolvedAt = now;
    }
    SchemaRegistry.save(schema);
    return schema;
  },
  deprecateField: (entityType: string, fieldName: string): EntitySchema | null => {
    const schema = SchemaRegistry.get(entityType);
    if (!schema) return null;
    const field = schema.fields.find((f) => f.name === fieldName);
    if (field) {
      field.deprecated = true;
      schema.version++;
      schema.lastEvolvedAt = Date.now();
      SchemaRegistry.save(schema);
    }
    return schema;
  },
  all: (): EntitySchema[] =>
    getAll<EntitySchema>("schemas").sort((a, b) => b.lastEvolvedAt - a.lastEvolvedAt),
};

// --- Health Monitoring ---

export function computeSystemHealth(): {
  entityCount: number;
  avgEntityHealth: number;
  schemaCount: number;
  relationshipCount: number;
  staleEntities: number; // not updated in 7 days
} {
  const entities = EntityGraph.list();
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const totalHealth = entities.reduce((sum, e) => sum + e.health, 0);
  const relationships = entities.reduce((sum, e) => sum + e.relationships.length, 0);
  return {
    entityCount: entities.length,
    avgEntityHealth: entities.length ? totalHealth / entities.length : 0,
    schemaCount: SchemaRegistry.all().length,
    relationshipCount: relationships,
    staleEntities: entities.filter((e) => e.lastUpdated < sevenDaysAgo).length,
  };
}
