import { useEffect, useState, useRef } from "react";
import { Download, Eye, Presentation, FileText, BookOpen, Swords, FileCheck, ChartBar, X, Shield, Sparkles, ArrowUpRight } from "lucide-react";
import { toBlob } from "html-to-image";
import { saveAs } from "file-saver";
import { loadJson, saveJson } from "../../lib/storage";

type Category = "all" | "decks" | "one-pagers" | "case-studies" | "battlecards" | "proposals";

interface Deliverable {
  id: string; title: string; description: string; category: Category;
  format: string; status: "ready" | "draft" | "in-review";
  lastUpdated: string; icon: any; featured?: boolean;
  subtitle: string;
  bullets: string[];
}

interface SalesAssetContent {
  title: string;
  subtitle: string;
  bullets: string[];
  footerTitle: string;
  footerBody: string;
  website: string;
}

// SVG Thumbnail Component for Sales Items
function SalesThumbnail({ title, gradient, Icon }: { title: string; gradient: string; Icon: any }) {
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: gradient }}>
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
      <div className="absolute right-3 bottom-3 h-16 w-16 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm" />
      <div className="flex h-full flex-col justify-between p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="rounded-xl border border-white/15 bg-white/10 p-2 backdrop-blur-sm">
            <Icon className="h-5 w-5" />
          </div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/70">IW</div>
        </div>
        <div>
          <div className="mb-2 flex gap-2">
            <div className="h-2 w-12 rounded-full bg-white/30" />
            <div className="h-2 w-8 rounded-full bg-white/20" />
          </div>
          <div className="text-sm font-semibold opacity-95">{title}</div>
          <div className="mt-2 grid grid-cols-3 gap-1">
            <div className="h-8 rounded-lg bg-white/12" />
            <div className="h-8 rounded-lg bg-white/10" />
            <div className="h-8 rounded-lg bg-white/14" />
          </div>
        </div>
      </div>
    </div>
  );
}

const deliverables: Deliverable[] = [
  { id: "1", title: "Master Sales Deck", description: "Complete pitch deck with all slides", category: "decks", format: "PNG", status: "ready", lastUpdated: "Mar 14", icon: Presentation, featured: true, subtitle: "Adaptive continuity workspace hydrated by the Spine", bullets: ["Unify context across tools", "Govern every AI action", "Show measurable operational lift"] },
  { id: "2", title: "Product One-Pager", description: "Single-page product overview", category: "one-pagers", format: "PNG", status: "ready", lastUpdated: "Mar 12", icon: FileText, subtitle: "One-page snapshot for buyers and champions", bullets: ["Problem: tool sprawl", "Solution: context-aware workspace", "Outcome: controlled execution"] },
  { id: "3", title: "Case Study: Enterprise", description: "Success story template", category: "case-studies", format: "PNG", status: "ready", lastUpdated: "Mar 10", icon: BookOpen, subtitle: "How enterprise teams replace fragmented workflows", bullets: ["30-day pilot launch", "Signals unified into the Spine", "Approval-first rollout adopted by operations"] },
  { id: "4", title: "Battlecard: Competitor X", description: "Competitive intelligence", category: "battlecards", format: "PNG", status: "ready", lastUpdated: "Mar 8", icon: Swords, subtitle: "Competitive framing for active deals", bullets: ["Context-first differentiation", "Approval governance advantage", "Lower risk path to adoption"] },
  { id: "5", title: "Proposal Template", description: "Customizable proposal format", category: "proposals", format: "PNG/HTML", status: "ready", lastUpdated: "Mar 6", icon: FileCheck, subtitle: "Commercial proposal for governed AI programs", bullets: ["Scope and milestones", "Pricing and onboarding", "Acceptance and signatures"] },
  { id: "6", title: "ROI Calculator", description: "Interactive value calculator", category: "decks", format: "PNG/HTML", status: "ready", lastUpdated: "Mar 4", icon: ChartBar, subtitle: "Value model for buyers and executive sponsors", bullets: ["Hours reclaimed", "Incidents avoided", "Cycle-time reduction"] },
];

const gradients = [
  "linear-gradient(135deg, var(--primary-color) 0%, var(--text-color) 100%)",
  "linear-gradient(135deg, var(--accent-color) 0%, var(--primary-color) 100%)",
  "linear-gradient(135deg, var(--text-color) 0%, var(--primary-color) 50%, var(--accent-color) 100%)",
  "linear-gradient(135deg, var(--primary-color) 0%, var(--brand-primary-light) 100%)",
  "linear-gradient(135deg, var(--warning-color) 0%, var(--accent-color) 100%)",
  "linear-gradient(135deg, var(--success-color) 0%, var(--primary-color) 100%)",
];

function getSalesAssetContent(item: Deliverable): SalesAssetContent {
  return loadJson(`sales-asset-${item.id}`, {
    title: item.title,
    subtitle: item.subtitle,
    bullets: [...item.bullets],
    footerTitle: "AI Thinks in Context",
    footerBody: "Humans stay in control. Every action waits for approval.",
    website: "integratewise.ai",
  });
}

function createSalesSvg(content: SalesAssetContent, gradient: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
      <defs>
        <linearGradient id="salesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${gradient.match(/#[0-9A-Fa-f]{6}/g)?.[0] ?? "var(--primary-color)"}" />
          <stop offset="100%" stop-color="${gradient.match(/#[0-9A-Fa-f]{6}/g)?.slice(-1)[0] ?? "var(--text-color)"}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="675" fill="url(#salesGradient)" rx="32" />
      <text x="80" y="110" font-family="Arial, sans-serif" font-size="44" font-weight="700" fill="white" opacity="0.92">IntegrateWise</text>
      <text x="80" y="170" font-family="Arial, sans-serif" font-size="22" font-weight="500" fill="white" opacity="0.8">${content.subtitle}</text>
      <text x="80" y="310" font-family="Arial, sans-serif" font-size="64" font-weight="700" fill="white">${content.title}</text>
      <text x="80" y="390" font-family="Arial, sans-serif" font-size="24" fill="white" opacity="0.95">${content.bullets[0]}</text>
      <text x="80" y="435" font-family="Arial, sans-serif" font-size="24" fill="white" opacity="0.9">${content.bullets[1]}</text>
      <text x="80" y="480" font-family="Arial, sans-serif" font-size="24" fill="white" opacity="0.85">${content.bullets[2]}</text>
      <rect x="80" y="550" width="260" height="48" rx="24" fill="rgba(255,255,255,0.16)" />
      <text x="110" y="582" font-family="Arial, sans-serif" font-size="20" font-weight="600" fill="white">${content.footerTitle}</text>
    </svg>
  `.trim();
  return svg;
}

function createSalesHtml(content: SalesAssetContent, gradient: string) {
  const colors = gradient.match(/#[0-9A-Fa-f]{6}/g) ?? ["var(--primary-color)", "var(--text-color)"];
  const start = colors[0] ?? "var(--primary-color)";
  const end = colors[colors.length - 1] ?? "var(--text-color)";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${content.title}</title>
  <style>
    body { margin: 0; font-family: Arial, sans-serif; background: #f3f5fb; padding: 24px; }
    .asset {
      width: 1200px;
      min-height: 675px;
      border-radius: 32px;
      overflow: hidden;
      color: white;
      background: linear-gradient(135deg, ${start}, ${end});
    }
    .inner { padding: 56px; display: flex; flex-direction: column; min-height: 563px; }
    .eyebrow { text-transform: uppercase; letter-spacing: 0.35em; font-size: 14px; opacity: 0.7; }
    h1 { font-size: 64px; margin: 24px 0 0; }
    .subtitle { font-size: 24px; line-height: 1.5; max-width: 900px; opacity: 0.86; margin-top: 16px; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 48px; }
    .card { border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.10); border-radius: 24px; padding: 20px; font-size: 18px; line-height: 1.6; }
    .footer { margin-top: auto; padding-top: 48px; display: flex; justify-content: space-between; align-items: end; gap: 24px; }
    .footer-title { font-size: 16px; font-weight: 700; }
    .footer-copy { font-size: 16px; opacity: 0.75; margin-top: 8px; }
    .pill { border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.12); border-radius: 999px; padding: 14px 20px; font-size: 16px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="asset">
    <div class="inner">
      <div class="eyebrow">Sales Enablement</div>
      <h1>${content.title}</h1>
      <div class="subtitle">${content.subtitle}</div>
      <div class="grid">
        ${content.bullets.map((bullet) => `<div class="card">${bullet}</div>`).join("")}
      </div>
      <div class="footer">
        <div>
          <div class="footer-title">${content.footerTitle}</div>
          <div class="footer-copy">${content.footerBody}</div>
        </div>
        <div class="pill">${content.website}</div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function downloadSalesThumbnail(item: Deliverable, gradient: string) {
  const safeTitle = item.title.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
  const svg = createSalesSvg(getSalesAssetContent(item), gradient);
  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `IntegrateWise-${safeTitle || "sales-asset"}.svg`;
  link.click();
  URL.revokeObjectURL(url);
}

function SalesAssetPreview({ content, gradient }: { content: SalesAssetContent; gradient: string }) {
  return (
    <div className="w-full min-h-[520px] rounded-2xl overflow-hidden text-white" style={{ background: gradient }}>
      <div className="p-10 flex flex-col h-full">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 h-full">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm">
                <Sparkles className="h-6 w-6" />
              </div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/70">Sales Enablement</p>
            </div>
            <h2 className="text-4xl font-bold mt-6 leading-tight">{content.title}</h2>
            <p className="text-lg text-white/80 mt-4 max-w-2xl leading-8">{content.subtitle}</p>
            <div className="grid md:grid-cols-3 gap-4 mt-10">
              {content.bullets.map((bullet, index) => (
                <div key={bullet} className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold">0{index + 1}</div>
                    <ArrowUpRight className="h-4 w-4 text-white/70" />
                  </div>
                  <p className="text-sm leading-6">{bullet}</p>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-10 flex items-end justify-between gap-6">
              <div>
                <p className="text-sm font-semibold text-white">{content.footerTitle}</p>
                <p className="text-sm text-white/70 mt-1">{content.footerBody}</p>
              </div>
              <div className="rounded-full bg-white/12 px-5 py-3 text-sm font-medium border border-white/15">
                {content.website}
              </div>
            </div>
          </div>
          <div className="relative flex items-center">
            <div className="absolute inset-0 rounded-[32px] bg-black/10 blur-2xl" />
            <div className="relative w-full rounded-[28px] border border-white/15 bg-white/10 p-5 backdrop-blur-md shadow-2xl">
              <div className="rounded-[22px] bg-[#F7F9FD] p-5 text-[var(--text-color)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-[var(--text-faint)]">Executive Snapshot</p>
                    <h3 className="mt-2 text-2xl font-bold">Board-Ready Asset</h3>
                  </div>
                  <div className="rounded-2xl bg-[var(--primary-color)] p-3 text-white">
                    <Shield className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs text-[var(--text-faint)]">Pipeline Impact</p>
                    <p className="mt-2 text-3xl font-bold">38%</p>
                    <div className="mt-3 h-2 rounded-full bg-[var(--border-subtle)]">
                      <div className="h-2 w-2/3 rounded-full bg-[var(--primary-color)]" />
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs text-[var(--text-faint)]">Approval Coverage</p>
                    <p className="mt-2 text-3xl font-bold">100%</p>
                    <div className="mt-3 flex gap-1">
                      <div className="h-10 flex-1 rounded-xl bg-[#DCE4FB]" />
                      <div className="h-10 flex-1 rounded-xl bg-[#B9C8F4]" />
                      <div className="h-10 flex-1 rounded-xl bg-[var(--primary-color)]" />
                    </div>
                  </div>
                </div>
                <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Narrative Flow</p>
                    <p className="text-xs text-[var(--text-faint)]">Ready to present</p>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-[#F4F6FB] p-3">
                      <p className="text-xs text-[var(--text-faint)]">Problem</p>
                      <p className="mt-2 text-sm font-medium">Fragmented work</p>
                    </div>
                    <div className="rounded-xl bg-[#F4F6FB] p-3">
                      <p className="text-xs text-[var(--text-faint)]">System</p>
                      <p className="mt-2 text-sm font-medium">Spine + AI</p>
                    </div>
                    <div className="rounded-xl bg-[#F4F6FB] p-3">
                      <p className="text-xs text-[var(--text-faint)]">Outcome</p>
                      <p className="mt-2 text-sm font-medium">Governed action</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewModal({ item, gradient, onClose }: { item: Deliverable; gradient: string; onClose: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [content, setContent] = useState<SalesAssetContent>(() => getSalesAssetContent(item));

  useEffect(() => {
    setContent(getSalesAssetContent(item));
  }, [item]);

  useEffect(() => {
    saveJson(`sales-asset-${item.id}`, content);
  }, [item.id, content]);

  const handleDownload = async () => {
    if (!contentRef.current) return;
    setIsExporting(true);
    try {
      const blob = await toBlob(contentRef.current, { pixelRatio: 2, cacheBust: true });
      if (!blob) {
        throw new Error("Could not generate image blob");
      }
      const link = document.createElement("a");
      link.download = `IntegrateWise-${item.title.replace(/\s+/g, "-")}.png`;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    } finally { setIsExporting(false); }
  };

  const handleDownloadHtml = () => {
    const html = createSalesHtml(content, gradient);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    saveAs(blob, `IntegrateWise-${content.title.replace(/[^a-z0-9]+/gi, "-") || "sales-asset"}.html`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col" style={{ background: 'var(--surface-raised)' }}>
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">{item.title}</h3>
          <div className="flex gap-2">
            <button onClick={handleDownload} className="px-4 py-2 bg-[var(--forest)] text-[var(--paper)] rounded-lg">
              {isExporting ? "Exporting..." : "Download PNG"}
            </button>
            {item.format.includes("HTML") ? (
              <button onClick={handleDownloadHtml} className="px-4 py-2 border rounded-lg">
                Download HTML
              </button>
            ) : null}
            <button onClick={onClose} className="p-2"><X size={20} /></button>
          </div>
        </div>
        <div ref={contentRef} className="flex-1 p-6" style={{ background: 'var(--surface)' }}>
          <div className="grid lg:grid-cols-[320px_minmax(0,1fr)] gap-6">
            <div className="rounded-xl border border-[var(--border-subtle)] p-4 space-y-4" style={{ background: 'var(--surface-raised)' }}>
              <div>
                <label className="text-xs font-medium text-[var(--text-muted)]">Title</label>
                <input
                  value={content.title}
                  onChange={(e) => setContent((prev) => ({ ...prev, title: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-[var(--border-base)] px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--text-muted)]">Subtitle</label>
                <textarea
                  value={content.subtitle}
                  onChange={(e) => setContent((prev) => ({ ...prev, subtitle: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-[var(--border-base)] px-3 py-2 text-sm min-h-20"
                />
              </div>
              {content.bullets.map((bullet, index) => (
                <div key={index}>
                  <label className="text-xs font-medium text-[var(--text-muted)]">Bullet {index + 1}</label>
                  <textarea
                    value={bullet}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        bullets: prev.bullets.map((entry, entryIndex) =>
                          entryIndex === index ? e.target.value : entry
                        ),
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-[var(--border-base)] px-3 py-2 text-sm min-h-16"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-[var(--text-muted)]">Footer Title</label>
                <input
                  value={content.footerTitle}
                  onChange={(e) => setContent((prev) => ({ ...prev, footerTitle: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-[var(--border-base)] px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--text-muted)]">Footer Copy</label>
                <textarea
                  value={content.footerBody}
                  onChange={(e) => setContent((prev) => ({ ...prev, footerBody: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-[var(--border-base)] px-3 py-2 text-sm min-h-20"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--text-muted)]">Website / CTA</label>
                <input
                  value={content.website}
                  onChange={(e) => setContent((prev) => ({ ...prev, website: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-[var(--border-base)] px-3 py-2 text-sm"
                />
              </div>
            </div>
            <SalesAssetPreview content={content} gradient={gradient} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SalesPage() {
  const [previewItem, setPreviewItem] = useState<Deliverable | null>(null);

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-color)] mb-2">Sales Enablement</h1>
        <p className="text-[var(--text-muted)]">Pitch decks, battlecards, case studies, and proposal templates</p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Assets', value: deliverables.length },
          { label: 'Ready', value: deliverables.filter(d => d.status === 'ready').length },
          { label: 'Formats', value: 'PNG/SVG/HTML' },
          { label: 'Last Updated', value: 'Mar 14' },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl border border-[var(--border-subtle)] text-center" style={{ background: 'var(--surface-raised)' }}>
            <p className="text-2xl font-bold text-[var(--text-color)]">{stat.value}</p>
            <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
          </div>
        ))}
      </div>
      
      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {deliverables.map((item, index) => (
          <div key={item.id} className="rounded-xl border border-[var(--border-subtle)] overflow-hidden hover:shadow-lg transition-shadow" style={{ background: 'var(--surface-raised)' }}>
            <div className="h-40">
              <SalesThumbnail title={item.title} gradient={gradients[index % gradients.length]} Icon={item.icon} />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <item.icon className="w-4 h-4 text-[var(--primary-color)]" />
                <span className="text-xs text-[var(--text-muted)] uppercase">{item.category}</span>
              </div>
              <h4 className="font-semibold text-[var(--text-color)]">{item.title}</h4>
              <p className="text-sm text-[var(--text-muted)] mt-1">{item.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-[var(--text-faint)]">{item.format}</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setPreviewItem(item)} 
                    className="flex items-center gap-1 px-3 py-1.5 bg-[var(--primary-color)] text-[var(--paper)] rounded-lg text-sm"
                  >
                    <Eye className="w-4 h-4" /> Preview
                  </button>
                  <button
                    onClick={() => downloadSalesThumbnail(item, gradients[index % gradients.length])}
                    className="flex items-center gap-1 px-3 py-1.5 border border-[var(--border-base)] text-[var(--text-color)] rounded-lg text-sm"
                    aria-label={`Download ${item.title}`}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {previewItem && (
        <PreviewModal
          item={previewItem}
          gradient={gradients[deliverables.findIndex((entry) => entry.id === previewItem.id) % gradients.length]}
          onClose={() => setPreviewItem(null)}
        />
      )}
    </div>
  );
}
