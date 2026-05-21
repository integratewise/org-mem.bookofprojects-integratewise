import { useEffect, useState } from "react";
import {
  Globe, FileText, Table2, Image, Paperclip, Link, Code2, LayoutGrid, Layers,
  Activity, BookOpen, GitBranch, Plus, ArrowLeft, Search, Filter, ExternalLink,
  CheckCircle, AlertCircle, Clock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  APPROVED_DOMAINS, DOMAIN_LABELS, DOMAIN_COLORS, type ApprovedDomain
} from "../../runtime/core/domains";
import { CANONICAL_STATES, STATE_LABELS, type CanonicalState } from "../../runtime/core/paths";
import type { ContentType } from "../../runtime/core/types";
import type { KnowledgeObject } from "../../runtime/domain/knowledge";
import type { Signal } from "../../runtime/domain/triage";
import type { Reference } from "../../runtime/domain/references";
import { KnowledgeStore, TriageStore, SignalStore, ReferenceStore, DomainStore } from "../../runtime/storage/local-store";
import { AFFiNEClient } from "../../runtime/integrations/affine";

const contentIcons: Record<ContentType, React.ElementType> = {
  document: FileText,
  table: Table2,
  image: Image,
  file: Paperclip,
  link: Link,
  embed: Code2,
  view: LayoutGrid,
  canvas: Layers,
};

const contentColors: Record<CanonicalState, string> = {
  triage: "#B8943F",
  "knowledge-persisted": "#3D7A50",
  references: "#2A4A6A",
};

interface DomainCounts {
  triage: number;
  "knowledge-persisted": number;
  references: number;
}

export function DomainExplorerPage() {
  const [selectedDomain, setSelectedDomain] = useState<ApprovedDomain | null>(null);
  const [counts, setCounts] = useState<Record<string, DomainCounts>>({});
  const [affineHealth, setAffineHealth] = useState<boolean | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    refreshCounts();
    AFFiNEClient.health().then(setAffineHealth).catch(() => setAffineHealth(false));
  }, []);

  function refreshCounts() {
    const byDomain = DomainStore.countByDomainAndState();
    const result: Record<string, DomainCounts> = {};
    for (const domain of APPROVED_DOMAINS) {
      result[domain] = byDomain[domain] || { triage: 0, "knowledge-persisted": 0, references: 0 };
    }
    setCounts(result);
  }

  if (selectedDomain) {
    return (
      <DomainDetail
        domain={selectedDomain}
        onBack={() => { setSelectedDomain(null); refreshCounts(); }}
      />
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Domain Explorer</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            Browse canonical continuity by operational domain
          </p>
        </div>
        <div className="flex items-center gap-3">
          {affineHealth !== null && (
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full" style={{
              background: affineHealth ? "rgba(61,122,80,0.12)" : "rgba(139,32,32,0.10)",
              color: affineHealth ? "#3D7A50" : "#8B2020",
            }}>
              {affineHealth ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
              AFFiNE {affineHealth ? "Online" : "Offline"}
            </span>
          )}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
            <input
              type="text"
              placeholder="Filter domains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg border text-sm"
              style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--foreground)" }}
            />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {APPROVED_DOMAINS.filter((d) =>
          DOMAIN_LABELS[d].toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((domain) => {
          const color = DOMAIN_COLORS[domain];
          const count = counts[domain] || { triage: 0, "knowledge-persisted": 0, references: 0 };
          return (
            <motion.button
              key={domain}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedDomain(domain)}
              className="text-left rounded-xl border p-5 transition-shadow hover:shadow-md"
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: color + "15" }}>
                  <Globe className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                    {DOMAIN_LABELS[domain]}
                  </h3>
                  <p className="text-[11px]" style={{ color: "var(--muted-foreground)" }}>{domain}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 rounded-lg" style={{ background: "var(--muted)" }}>
                  <div className="text-lg font-bold" style={{ color: "#B8943F" }}>{count.triage}</div>
                  <div className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>Triage</div>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ background: "var(--muted)" }}>
                  <div className="text-lg font-bold" style={{ color: "#3D7A50" }}>{count["knowledge-persisted"]}</div>
                  <div className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>Knowledge</div>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ background: "var(--muted)" }}>
                  <div className="text-lg font-bold" style={{ color: "#2A4A6A" }}>{count.references}</div>
                  <div className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>Refs</div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Domain Detail View ───

function DomainDetail({ domain, onBack }: { domain: ApprovedDomain; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<CanonicalState>("triage");
  const [knowledge, setKnowledge] = useState<KnowledgeObject[]>([]);
  const [signals, setSignals] = useState<Signal[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    refresh();
  }, [domain, activeTab]);

  function refresh() {
    setKnowledge(DomainStore.knowledgeByDomain(domain));
    setSignals(DomainStore.signalsByDomain(domain));
    setReferences(ReferenceStore.list().filter((r) => r.metadata?.domain === domain));
  }

  const color = DOMAIN_COLORS[domain];
  const items = activeTab === "triage" ? signals : activeTab === "knowledge-persisted" ? knowledge : references;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm mb-4 hover:opacity-80"
          style={{ color: "var(--muted-foreground)" }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to domains
        </button>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: color + "15" }}>
              <Globe className="w-6 h-6" style={{ color }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
                {DOMAIN_LABELS[domain]}
              </h1>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                /{domain} — {items.length} items in {STATE_LABELS[activeTab]}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90 flex items-center gap-2"
            style={{ background: "var(--forest)" }}
          >
            <Plus className="w-4 h-4" />
            New Item
          </button>
        </div>
      </header>

      {/* State Tabs */}
      <div className="flex items-center gap-2 mb-6">
        {CANONICAL_STATES.map((state) => {
          const Icon = state === "triage" ? Activity : state === "knowledge-persisted" ? BookOpen : GitBranch;
          const isActive = activeTab === state;
          return (
            <button
              key={state}
              onClick={() => setActiveTab(state)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                background: isActive ? contentColors[state] + "15" : "var(--muted)",
                color: isActive ? contentColors[state] : "var(--muted-foreground)",
              }}
            >
              <Icon className="w-4 h-4" />
              {STATE_LABELS[state]}
              <span className="text-xs px-1.5 py-0.5 rounded-full" style={{
                background: isActive ? contentColors[state] + "20" : "var(--card)",
                color: isActive ? contentColors[state] : "var(--muted-foreground)",
              }}>
                {state === "triage" ? signals.length : state === "knowledge-persisted" ? knowledge.length : references.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Items List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {items.length === 0 ? (
            <div className="text-center py-16 rounded-xl border" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                No items in {STATE_LABELS[activeTab]} for {DOMAIN_LABELS[domain]}.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl border p-4 flex items-start gap-4"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: contentColors[activeTab] + "12" }}>
                  {activeTab === "triage" ? (
                    <Activity className="w-4 h-4" style={{ color: contentColors[activeTab] }} />
                  ) : activeTab === "knowledge-persisted" ? (
                    <BookOpen className="w-4 h-4" style={{ color: contentColors[activeTab] }} />
                  ) : (
                    <GitBranch className="w-4 h-4" style={{ color: contentColors[activeTab] }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                      {(item as any).title || (item as any).entityType || (item as any).source || "Untitled"}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{
                      background: contentColors[activeTab] + "12",
                      color: contentColors[activeTab],
                    }}>
                      {activeTab}
                    </span>
                  </div>
                  <p className="text-xs line-clamp-2" style={{ color: "var(--muted-foreground)" }}>
                    {(item as any).content?.slice(0, 200) || (item as any).reasoning || (item as any).source || "No preview"}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-[11px]" style={{ color: "var(--muted-foreground)" }}>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date((item as any).updatedAt || (item as any).timestamp || (item as any).capturedAt).toLocaleDateString()}
                    </span>
                    <span>{(item as any).id?.slice(0, 12)}...</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
