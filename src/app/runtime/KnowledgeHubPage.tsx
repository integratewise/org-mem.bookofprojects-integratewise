import { useEffect, useState } from "react";
import { BookOpen, Search, Plus, Tag, Layers, FileText, GitCommit, AlertCircle } from "lucide-react";
import { createKnowledgeObject, type KnowledgeObject, type KnowledgeType, type KnowledgeConfidence } from "../../runtime/domain/knowledge";
import { KnowledgeStore } from "../../runtime/storage/local-store";

const typeIcons: Record<KnowledgeType, React.ElementType> = {
  entity: Layers,
  relationship: GitCommit,
  summary: FileText,
  decision: AlertCircle,
  workflow: Layers,
  doctrine: BookOpen,
};

const confidenceColors: Record<KnowledgeConfidence, string> = {
  certain: "#10B981",
  probable: "#3B82F6",
  speculative: "#F59E0B",
  deprecated: "#9CA3AF",
};

export function KnowledgeHubPage() {
  const [knowledge, setKnowledge] = useState<KnowledgeObject[]>([]);
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState<KnowledgeType | "all">("all");
  const [filterDomain, setFilterDomain] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", type: "summary" as KnowledgeType, domain: "", tags: "" });

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    setKnowledge(
      KnowledgeStore.query({
        search: query || undefined,
        type: filterType === "all" ? undefined : filterType,
        domain: filterDomain || undefined,
        limit: 100,
      })
    );
  }

  useEffect(() => {
    refresh();
  }, [query, filterType, filterDomain]);

  function submitKnowledge() {
    if (!form.title.trim()) return;
    const k = createKnowledgeObject({
      type: form.type,
      domain: form.domain || "general",
      title: form.title,
      content: form.content,
      confidence: "probable",
      references: [],
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      authorId: "human:operator",
      entityIds: [],
    });
    KnowledgeStore.save(k);
    setForm({ title: "", content: "", type: "summary", domain: "", tags: "" });
    setShowForm(false);
    refresh();
  }

  const domains = Array.from(new Set(KnowledgeStore.list().map((k) => k.domain)));

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Knowledge Hub</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            Canonical knowledge objects — synthesized, linked, versioned
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90 flex items-center gap-2"
          style={{ background: "var(--brand-primary)" }}
        >
          <Plus className="w-4 h-4" />
          New Knowledge
        </button>
      </header>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
          <input
            type="text"
            placeholder="Search knowledge..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border text-sm"
            style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--foreground)" }}
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as KnowledgeType | "all")}
          className="px-3 py-2 rounded-lg border text-sm"
          style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--foreground)" }}
        >
          <option value="all">All Types</option>
          <option value="entity">Entity</option>
          <option value="relationship">Relationship</option>
          <option value="summary">Summary</option>
          <option value="decision">Decision</option>
          <option value="workflow">Workflow</option>
          <option value="doctrine">Doctrine</option>
        </select>
        <select
          value={filterDomain}
          onChange={(e) => setFilterDomain(e.target.value)}
          className="px-3 py-2 rounded-lg border text-sm"
          style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--foreground)" }}
        >
          <option value="">All Domains</option>
          {domains.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="rounded-xl border p-5 mb-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>Create Knowledge Object</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="px-3 py-2 rounded-lg border text-sm"
              style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
            />
            <input
              placeholder="Domain (e.g., sales, engineering)"
              value={form.domain}
              onChange={(e) => setForm({ ...form, domain: e.target.value })}
              className="px-3 py-2 rounded-lg border text-sm"
              style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
            />
          </div>
          <textarea
            placeholder="Content (markdown supported)"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 rounded-lg border text-sm mb-3"
            style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
          />
          <div className="flex items-center gap-3">
            <input
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="flex-1 px-3 py-2 rounded-lg border text-sm"
              style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
            />
            <button
              onClick={submitKnowledge}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white"
              style={{ background: "var(--brand-primary)" }}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Knowledge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {knowledge.map((k) => {
          const Icon = typeIcons[k.type];
          return (
            <div
              key={k.id}
              className="rounded-xl border p-5 transition-shadow hover:shadow-md"
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" style={{ color: "var(--brand-primary)" }} />
                  <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>
                    {k.type}
                  </span>
                </div>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ background: confidenceColors[k.confidence] + "15", color: confidenceColors[k.confidence] }}
                >
                  {k.confidence}
                </span>
              </div>
              <h3 className="text-base font-semibold mb-1" style={{ color: "var(--foreground)" }}>{k.title}</h3>
              <p className="text-sm line-clamp-3 mb-3" style={{ color: "var(--muted-foreground)" }}>
                {k.content}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                  {k.domain}
                </span>
                {k.tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                    <Tag className="w-3 h-3" />
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-3 text-xs flex items-center justify-between" style={{ color: "var(--muted-foreground)" }}>
                <span>v{k.version}</span>
                <span>{new Date(k.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          );
        })}
      </div>

      {knowledge.length === 0 && (
        <div className="text-center py-16 text-sm" style={{ color: "var(--muted-foreground)" }}>
          No knowledge objects found. Create one or seed demo data.
        </div>
      )}
    </div>
  );
}
