import { useState, useRef } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Download, Eye, Presentation, FileText, BookOpen, Swords, FileCheck, ChartBar, Filter, Search, LayoutGrid, List, Star, X } from "lucide-react";
import { toPng } from "html-to-image";

type Category = "all" | "decks" | "one-pagers" | "case-studies" | "battlecards" | "proposals";
type ViewMode = "grid" | "list";

interface Deliverable {
  id: string; title: string; description: string; category: Category;
  format: string; status: "ready" | "draft" | "in-review";
  lastUpdated: string; thumbnail: string; icon: any; featured?: boolean; content?: any;
}

const deliverables: Deliverable[] = [
  { id: "1", title: "Master Sales Deck", description: "Pitch deck", category: "decks", format: "PNG", status: "ready", lastUpdated: "Mar 14", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", icon: Presentation, featured: true },
  { id: "2", title: "Product One-Pager", description: "Overview", category: "one-pagers", format: "PNG", status: "ready", lastUpdated: "Mar 12", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", icon: FileText },
];

function PreviewModal({ item, onClose }: { item: Deliverable; onClose: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    if (!contentRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(contentRef.current, { pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `IntegrateWise-${item.title}.png`;
      link.href = dataUrl;
      link.click();
    } finally { setIsExporting(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">{item.title}</h3>
          <div className="flex gap-2">
            <button onClick={handleDownload} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              {isExporting ? "Exporting..." : "Download PNG"}
            </button>
            <button onClick={onClose} className="p-2"><X size={20} /></button>
          </div>
        </div>
        <div ref={contentRef} className="flex-1 p-6 bg-gray-50">
          <p>Preview content for {item.title}</p>
        </div>
      </div>
    </div>
  );
}

export function SalesPage() {
  const [previewItem, setPreviewItem] = useState<Deliverable | null>(null);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sales Enablement</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deliverables.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border overflow-hidden">
            <div className="h-40 bg-gray-100">
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-5">
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-gray-500">{item.description}</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => setPreviewItem(item)} className="flex-1 py-2 bg-blue-600 text-white rounded-lg">Preview</button>
                <button onClick={() => setPreviewItem(item)} className="flex-1 py-2 border rounded-lg">Download</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {previewItem && <PreviewModal item={previewItem} onClose={() => setPreviewItem(null)} />}
    </div>
  );
}
