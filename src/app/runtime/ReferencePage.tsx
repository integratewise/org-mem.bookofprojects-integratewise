import { useEffect, useState } from "react";
import { GitBranch, Link, FileText, Globe, MessageSquare, Upload, Hash } from "lucide-react";
import { createReference, type Reference, type ReferenceType } from "../../runtime/domain/references";
import { ReferenceStore } from "../../runtime/storage/local-store";

const typeIcons: Record<ReferenceType, React.ElementType> = {
  document: FileText,
  session: MessageSquare,
  webhook: Upload,
  connector: Link,
  commit: Hash,
  url: Globe,
};

export function ReferencePage() {
  const [references, setReferences] = useState<Reference[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<{
    type: ReferenceType;
    title: string;
    source: string;
    sourceUrl: string;
  }>({ type: "document", title: "", source: "", sourceUrl: "" });

  useEffect(() => {
    setReferences(ReferenceStore.list());
  }, []);

  function submitReference() {
    if (!form.title.trim() || !form.source.trim()) return;
    const ref = createReference({
      type: form.type,
      title: form.title,
      source: form.source,
      sourceUrl: form.sourceUrl || undefined,
      metadata: { createdBy: "human:operator" },
    });
    ReferenceStore.save(ref);
    setReferences(ReferenceStore.list());
    setForm({ type: "document", title: "", source: "", sourceUrl: "" });
    setShowForm(false);
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>References</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            Source material, citations, and provenance tracking
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90 flex items-center gap-2"
          style={{ background: "var(--brand-primary)" }}
        >
          <Upload className="w-4 h-4" />
          Add Reference
        </button>
      </header>

      {showForm && (
        <div className="rounded-xl border p-5 mb-6" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>Add Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as ReferenceType })}
              className="px-3 py-2 rounded-lg border text-sm"
              style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
            >
              <option value="document">Document</option>
              <option value="session">Session</option>
              <option value="webhook">Webhook</option>
              <option value="connector">Connector</option>
              <option value="commit">Commit</option>
              <option value="url">URL</option>
            </select>
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="px-3 py-2 rounded-lg border text-sm"
              style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
            />
            <input
              placeholder="Source (filename, ID, URL)"
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
              className="px-3 py-2 rounded-lg border text-sm"
              style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              placeholder="Source URL (optional)"
              value={form.sourceUrl}
              onChange={(e) => setForm({ ...form, sourceUrl: e.target.value })}
              className="flex-1 px-3 py-2 rounded-lg border text-sm"
              style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
            />
            <button
              onClick={submitReference}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white"
              style={{ background: "var(--brand-primary)" }}
            >
              Save
            </button>
          </div>
        </div>
      )}

      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-sm">
          <thead style={{ background: "var(--muted)" }}>
            <tr>
              <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>Type</th>
              <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>Title</th>
              <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>Source</th>
              <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>Checksum</th>
              <th className="text-right px-4 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>Captured</th>
            </tr>
          </thead>
          <tbody>
            {references.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
                  No references captured yet.
                </td>
              </tr>
            ) : (
              references.map((ref) => {
                const Icon = typeIcons[ref.type];
                return (
                  <tr key={ref.id} className="border-t" style={{ borderColor: "var(--border)" }}>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-xs">
                        <Icon className="w-3.5 h-3.5" style={{ color: "var(--brand-primary)" }} />
                        {ref.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>
                      {ref.title}
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>
                      {ref.sourceUrl ? (
                        <a href={ref.sourceUrl} target="_blank" rel="noreferrer" className="hover:underline text-[var(--brand-primary)]">
                          {ref.source}
                        </a>
                      ) : (
                        ref.source
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {ref.checksum}
                    </td>
                    <td className="px-4 py-3 text-right text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {new Date(ref.capturedAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
