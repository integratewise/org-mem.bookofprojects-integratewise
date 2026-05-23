import { useState, useRef, useCallback } from 'react';
import { toPng, toSvg } from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { AdvancedAssetEditor } from '../AdvancedAssetEditor';
import { copyToClipboard } from '../../utils/clipboard';
import { 
  Download, 
  Eye, 
  X, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  ChevronDown, 
  Check, 
  Copy, 
  Quote, 
  Lightbulb, 
  FileCode, 
  FileImage, 
  Settings, 
  Sparkles, 
  SlidersHorizontal 
} from 'lucide-react';
import { IntegrateWiseLogo } from '../IntegrateWiseLogo';
import { TAGLINES, BRAND } from '../../lib/brand';

// Import SVG files as URLs for preview display
import logoFrame1 from '../../../imports/Frame_1.svg';
import logoFrame1v2 from '../../../imports/Frame_1-1.svg';
import logoFrame1v3 from '../../../imports/Frame_1-2.svg';
import logoFrame4 from '../../../imports/Frame_4.svg';
import logoIconSvg from '../../../imports/Frame_4-1.svg';

type BgMode = 'light' | 'dark' | 'grey';

const SVG_SOURCE_ASSETS = [
  { src: logoFrame1, name: 'Frame_1.svg', label: 'Logo Frame Original' },
  { src: logoFrame1v2, name: 'Frame_1-1.svg', label: 'Logo Frame v2' },
  { src: logoFrame1v3, name: 'Frame_1-2.svg', label: 'Logo Frame v3' },
  { src: logoFrame4, name: 'Frame_4.svg', label: 'Icon Mark Original' },
  { src: logoIconSvg, name: 'Frame_4-1.svg', label: 'Icon Mark v2' },
] as const;

const LOGO_VARIANTS = [
  { label: 'Full Logo', variant: 'full' as const, desc: 'Logo mark + wordmark + descriptor' },
  { label: 'Compact Logo', variant: 'compact' as const, desc: 'Logo mark + wordmark' },
  { label: 'Icon Only', variant: 'icon-only' as const, desc: 'Logo mark for favicons & avatars' },
] as const;

const checkerboardStyle: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(45deg, var(--border-subtle) 25%, transparent 25%), linear-gradient(-45deg, var(--border-subtle) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--border-subtle) 75%), linear-gradient(-45deg, transparent 75%, var(--border-subtle) 75%)',
  backgroundSize: '20px 20px',
  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
  backgroundColor: 'var(--surface-raised)',
};

const raisedPanelStyle: React.CSSProperties = {
  background: 'var(--surface-raised)',
  border: '1px solid var(--border-subtle)',
  boxShadow: 'var(--shadow-sm)',
};

const softPanelStyle: React.CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--border-subtle)',
};

const heroPanelStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, var(--surface) 0%, var(--primary-soft) 58%, var(--accent-soft) 100%)',
  border: '1px solid var(--border-subtle)',
  boxShadow: 'var(--shadow-md)',
};

const getCanvasStyle = (
  tone: 'white' | 'grey' | 'dark' | 'checker' | 'transparent' | 'light',
): React.CSSProperties => {
  switch (tone) {
    case 'grey':
      return { background: 'var(--surface-2)' };
    case 'dark':
      return { background: 'var(--surface-inverse)' };
    case 'checker':
      return checkerboardStyle;
    case 'transparent':
      return { background: 'transparent' };
    case 'light':
    case 'white':
    default:
      return { background: 'var(--surface-raised)' };
  }
};

const getSelectionButtonStyle = (active: boolean): React.CSSProperties =>
  active
    ? {
        background: 'var(--primary-soft)',
        color: 'var(--primary-hover)',
        border: '1px solid color-mix(in srgb, var(--primary-color) 18%, var(--paper))',
        boxShadow: 'var(--shadow-sm)',
      }
    : {
        background: 'var(--surface-raised)',
        color: 'var(--text-muted)',
        border: '1px solid var(--border-subtle)',
      };

/* ── Preview Modal ── */
function PreviewModal({
  open,
  onClose,
  label,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: React.ReactNode;
}) {
  const [zoom, setZoom] = useState(1);
  const [previewBg, setPreviewBg] = useState<'white' | 'grey' | 'dark' | 'checker'>('white');
  const [isDownloading, setIsDownloading] = useState(false);

  if (!open) return null;

  const bgStyle: Record<string, React.CSSProperties | undefined> = {
    white: getCanvasStyle('white'),
    grey: getCanvasStyle('grey'),
    dark: getCanvasStyle('dark'),
    checker: getCanvasStyle('checker'),
  };

  const handleModalDownload = async () => {
    const node = document.getElementById('preview-modal-content');
    if (!node) return;
    
    try {
      setIsDownloading(true);
      const oldTransform = node.style.transform;
      node.style.transform = 'scale(1)';
      
      const dataUrl = await toPng(node, { pixelRatio: 3, cacheBust: true });
      
      node.style.transform = oldTransform;
      
      const a = document.createElement('a');
      a.href = dataUrl;
      const cleanLabel = label.replace(/\s+/g, '-').toLowerCase();
      a.download = `integratewise-${cleanLabel}-preview.png`;
      a.click();
    } catch(err) {
      console.error("Download failed", err);
      alert("Failed to download the preview.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: 'var(--overlay-medium)' }}
        onClick={onClose}
      />
      <div
        className="relative w-[90vw] max-w-4xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl"
        style={{
          background: 'var(--surface-raised)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-2xl)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <div>
            <p className="text-base font-semibold" style={{ color: 'var(--text-strong)' }}>{label}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Preview Mode</p>
          </div>
          <div className="flex items-center gap-2">
            {(['white', 'grey', 'dark', 'checker'] as const).map((bg) => (
              <button
                key={bg}
                onClick={() => setPreviewBg(bg)}
                className="w-6 h-6 rounded-md transition-colors"
                style={{
                  ...getCanvasStyle(bg),
                  border: previewBg === bg ? '2px solid var(--primary-color)' : '1px solid var(--border-subtle)',
                  boxShadow: previewBg === bg ? 'var(--shadow-sm)' : 'none',
                }}
                title={bg.charAt(0).toUpperCase() + bg.slice(1)}
              />
            ))}
            <div className="w-px h-6 mx-1" style={{ background: 'var(--border-subtle)' }} />
            <button
              onClick={() => setZoom((z) => Math.max(0.25, z - 0.25))}
              className="p-1.5 rounded-md hover:bg-[var(--surface)]"
            >
              <ZoomOut className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            </button>
            <span className="text-xs font-mono w-10 text-center" style={{ color: 'var(--text-faint)' }}>{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
              className="p-1.5 rounded-md hover:bg-[var(--surface)]"
            >
              <ZoomIn className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1.5 rounded-md hover:bg-[var(--surface)]"
              title="Reset zoom"
            >
              <Maximize2 className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            </button>
            
            <div className="w-px h-6 mx-1" style={{ background: 'var(--border-subtle)' }} />
            
            <button
              onClick={handleModalDownload}
              disabled={isDownloading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
              style={{
                background: isDownloading ? 'var(--surface-2)' : 'var(--primary-color)',
                color: isDownloading ? 'var(--text-muted)' : 'var(--text-inverse)',
                border: isDownloading ? '1px solid var(--border-subtle)' : '1px solid var(--primary-color)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <Download className="w-3.5 h-3.5" /> 
              {isDownloading ? 'Saving...' : 'Download'}
            </button>

            <div className="w-px h-6 mx-1" style={{ background: 'var(--border-subtle)' }} />
            
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[var(--surface)]">
              <X className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
            </button>
          </div>
        </div>
        
        {/* Canvas Area */}
        <div
          className="flex-1 overflow-auto flex items-center justify-center p-12 min-h-[400px]"
          style={{ background: 'linear-gradient(180deg, var(--surface) 0%, var(--surface-2) 100%)' }}
        >
          <div style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.2s ease' }}>
            <div
              id="preview-modal-content"
              className="flex items-center justify-center"
              style={{
                ...bgStyle[previewBg],
                padding: '64px',
                minWidth: '300px',
                minHeight: '200px'
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Export Dropdown ── */
function ExportDropdown({ label, onExport }: { label: string; onExport: (format: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const formats = [
    { id: 'svg', label: 'SVG', desc: 'Vector format', icon: FileCode },
    { id: 'png-1x', label: 'PNG @1x', desc: '72dpi', icon: FileImage },
    { id: 'png-2x', label: 'PNG @2x', desc: '144dpi', icon: FileImage },
    { id: 'png-4x', label: 'PNG @4x', desc: '288dpi', icon: FileImage },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors hover:bg-[var(--surface)]"
        style={{
          background: 'var(--surface)',
          color: 'var(--text-muted)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <Download className="w-3.5 h-3.5" /> Export <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-full mt-1 z-20 rounded-lg py-1 w-48"
            style={{
              background: 'var(--surface-raised)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            {formats.map((fmt) => (
              <button
                key={fmt.id}
                onClick={() => {
                  onExport(fmt.id);
                  setOpen(false);
                }}
                className="flex items-center gap-3 w-full px-3 py-2 text-left transition-colors hover:bg-[var(--surface)]"
              >
                <fmt.icon className="w-4 h-4 text-[var(--text-faint)]" />
                <div>
                  <p className="text-sm font-medium text-[var(--text-strong)]">{fmt.label}</p>
                  <p className="text-xs text-[var(--text-faint)]">{fmt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ── Main Page ── */
export function BrandAssetsPage() {
  const [bgMode, setBgMode] = useState<BgMode>('light');
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [previewItem, setPreviewItem] = useState<{
    label: string;
    content: React.ReactNode;
  } | null>(null);
  const [showAdvancedEditor, setShowAdvancedEditor] = useState(false);

  // Asset Studio States
  const [studioVariant, setStudioVariant] = useState<'full' | 'compact' | 'icon-only'>('full');
  const [studioColor, setStudioColor] = useState<'default' | 'white' | 'monochrome-dark' | 'monochrome-white' | 'blue-only' | 'print-safe-black'>('default');
  const [studioBg, setStudioBg] = useState<'transparent' | 'white' | 'dark' | 'grey' | 'checker'>('checker');

  const handleDownloadAll = async () => {
    setIsDownloadingAll(true);
    try {
      const zip = new JSZip();
      const sourceFolder = zip.folder('svg-sources');
      const exportsFolder = zip.folder('generated-exports');
      const copyFolder = zip.folder('brand-copy');

      for (const asset of SVG_SOURCE_ASSETS) {
        const response = await fetch(asset.src);
        const blob = await response.blob();
        sourceFolder?.file(asset.name, blob);
      }

      for (const variant of LOGO_VARIANTS) {
        const node = document.getElementById(`logo-${variant.variant}`);
        if (!node) continue;

        const pngDataUrl = await toPng(node, { pixelRatio: 3, cacheBust: true });
        const svgDataUrl = await toSvg(node, { cacheBust: true });

        const pngBlob = await (await fetch(pngDataUrl)).blob();
        const svgBlob = await (await fetch(svgDataUrl)).blob();
        const cleanName = variant.label.replace(/\s+/g, '-').toLowerCase();

        exportsFolder?.file(`integratewise-${cleanName}.png`, pngBlob);
        exportsFolder?.file(`integratewise-${cleanName}.svg`, svgBlob);
      }

      const studioNode = document.getElementById('studio-export-node');
      if (studioNode) {
        const studioPng = await toPng(studioNode, { pixelRatio: 3, cacheBust: true });
        const studioBlob = await (await fetch(studioPng)).blob();
        exportsFolder?.file(
          `integratewise-studio-${studioVariant}-${studioColor}.png`,
          studioBlob,
        );
      }

      copyFolder?.file(
        'approved-messaging.txt',
        [
          BRAND.name,
          TAGLINES.descriptorFull,
          '',
          'Primary tagline:',
          TAGLINES.primary,
          '',
          'Extended marketing tagline:',
          TAGLINES.valueProp,
        ].join('\n'),
      );

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'IntegrateWise-Brand-Kit.zip');
    } catch (err) {
      console.error("Failed to download zip", err);
      alert("Failed to download complete brand kit.");
    } finally {
      setIsDownloadingAll(false);
    }
  };

  const handleExport = useCallback(async (format: string, elementId: string, filename: string) => {
    try {
      const cleanName = filename.replace(/\s+/g, '-').toLowerCase();
      const node = document.getElementById(elementId);
      if (!node) {
        alert("Could not find the element to export.");
        return;
      }

      let dataUrl = '';
      if (format === 'svg') {
        dataUrl = await toSvg(node, { cacheBust: true });
      } else if (format.startsWith('png')) {
        let pixelRatio = 1;
        if (format === 'png-2x') pixelRatio = 2;
        if (format === 'png-4x') pixelRatio = 4;
        dataUrl = await toPng(node, { pixelRatio, cacheBust: true });
      }

      const blob = await (await fetch(dataUrl)).blob();
      saveAs(blob, `integratewise-${cleanName}.${format.split('-')[0]}`);
    } catch (err) {
      console.error('Export failed', err);
      alert('Failed to export image.');
    }
  }, []);

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
      {/* Advanced Asset Editor Modal */}
      <AdvancedAssetEditor open={showAdvancedEditor} onClose={() => setShowAdvancedEditor(false)} />
      
      {/* Preview Modal */}
      <PreviewModal
        open={!!previewItem}
        onClose={() => setPreviewItem(null)}
        label={previewItem?.label || ''}
      >
        {previewItem?.content}
      </PreviewModal>

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif" style={{ color: 'var(--ink)' }}>Brand Assets</h2>
          <p className="mt-1" style={{ color: 'var(--text-muted)' }}>
            Canonical mark system, lighter brand language, descriptor usage, and runtime-safe brand assets
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setShowAdvancedEditor(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[var(--paper)] transition-all shadow-sm hover:shadow"
            style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))' }}
          >
            <Sparkles className="w-4 h-4" />
            Advanced Editor
          </button>
          <button
            onClick={handleDownloadAll}
            disabled={isDownloadingAll}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow"
            style={{ 
              background: isDownloadingAll ? 'var(--slate-mid)' : 'var(--surface-raised)',
              color: isDownloadingAll ? 'var(--text-inverse)' : 'var(--ink)',
              border: isDownloadingAll ? 'none' : '1px solid var(--rule-light)'
            }}
          >
            <Download className="w-4 h-4" />
            {isDownloadingAll ? 'Zipping Assets...' : 'Download Full Kit (.zip)'}
          </button>
        </div>
      </div>

      {/* Feature Highlight Card */}
      <div className="relative overflow-hidden rounded-2xl p-6 lg:p-8" style={{ 
        background: 'linear-gradient(135deg, var(--surface) 0%, var(--primary-soft) 55%, var(--accent-soft) 100%)',
        border: '1px solid var(--border-subtle)' 
      }}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--forest), var(--gold))' }}>
              <Sparkles className="w-8 h-8 text-[var(--paper)]" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-serif" style={{ color: 'var(--ink)' }}>Advanced Asset Editor Now Available</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
              Create canonical lighter-system brand assets with adjustable layouts, governed descriptor usage, and export workflows across social, documentation, and print formats.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Custom Colors', 'Gradients & Effects', 'Batch Export', 'Social Media Presets'].map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'color-mix(in srgb, var(--gold) 12%, transparent)', color: 'var(--forest)' }}
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => setShowAdvancedEditor(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-[var(--paper)] transition-all shadow-sm hover:shadow-lg whitespace-nowrap"
            style={{ background: 'linear-gradient(135deg, var(--forest), var(--gold))' }}
          >
            <Settings className="w-4 h-4" />
            Open Editor
          </button>
        </div>
      </div>

      <div className="rounded-xl p-5" style={{ background: 'var(--surface-raised)', border: '1px solid var(--rule-light)' }}>
        <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>Canonical asset rule</p>
        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Historical SVG source exports may still preserve earlier palette references, but all live-rendered brand assets and runtime-facing surfaces should use the current lighter documentation system and the descriptor "Adaptive continuity workspace hydrated by the Spine."</p>
      </div>

      {/* Asset Studio */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 rounded-full" style={{ background: 'var(--forest)' }} />
          <h3 className="text-lg font-serif" style={{ color: 'var(--ink)' }}>Interactive Brand Studio</h3>
        </div>
        
        <div className="rounded-xl overflow-hidden shadow-sm" style={{ background: 'var(--surface-raised)', border: '1px solid var(--rule-light)' }}>
          <div className="flex flex-col lg:flex-row">
            {/* Controls */}
            <div className="w-full lg:w-80 p-6 space-y-6" style={{ borderRight: '1px solid var(--paper-deep)', background: 'var(--paper-warm)' }}>
              <div className="flex items-center gap-2 mb-2">
                <SlidersHorizontal className="w-4 h-4 text-[var(--text-muted)]" />
                <h4 className="text-sm font-semibold text-[var(--text-color)]">Customizer</h4>
              </div>
              
              <div className="space-y-3">
                <label className="text-xs font-medium text-[var(--text-color)]">Logo Layout</label>
                <div className="flex flex-col gap-2">
                  {(['full', 'compact', 'icon-only'] as const).map(variant => (
                    <button
                      key={variant}
                      onClick={() => setStudioVariant(variant)}
                      className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${studioVariant === variant ? 'bg-[var(--primary-color)] text-[var(--paper)]' : 'bg-[var(--surface-raised)] text-[var(--text-color)] border border-[var(--border-subtle)] hover:bg-[var(--surface)]'}`}
                    >
                      {variant === 'full' ? 'Full Layout' : variant === 'compact' ? 'Compact' : 'Icon Only'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-medium text-[var(--text-color)]">Color Theme</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'default', label: 'Default' },
                    { id: 'white', label: 'White' },
                    { id: 'monochrome-dark', label: 'Mono Dark' },
                    { id: 'monochrome-white', label: 'Mono White' },
                    { id: 'blue-only', label: 'Primary Only' },
                    { id: 'print-safe-black', label: 'Print Black' },
                  ].map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => setStudioColor(theme.id as any)}
                      className={`text-left px-2 py-1.5 rounded-md text-xs transition-colors ${studioColor === theme.id ? 'bg-[var(--primary-color)] text-[var(--paper)]' : 'bg-[var(--surface-raised)] text-[var(--text-color)] border border-[var(--border-subtle)] hover:bg-[var(--surface)]'}`}
                    >
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-medium text-[var(--text-color)]">Background Canvas</label>
                <div className="flex items-center gap-2">
                  {(['transparent', 'white', 'grey', 'dark', 'checker'] as const).map((bg) => (
                    <button
                      key={bg}
                      onClick={() => setStudioBg(bg)}
                      className="w-8 h-8 rounded-md transition-all shadow-sm"
                      style={{
                        border: studioBg === bg ? '2px solid var(--forest)' : '1px solid var(--rule-light)',
                        background:
                          bg === 'white' ? 'var(--paper)' :
                          bg === 'grey' ? 'var(--paper-warm)' :
                          bg === 'dark' ? 'var(--forest)' :
                          bg === 'transparent' ? 'transparent' :
                          'repeating-conic-gradient(var(--rule-light) 0% 25%, transparent 0% 50%) 50% / 10px 10px',
                        backgroundColor: bg === 'checker' ? 'var(--paper)' : undefined
                      }}
                      title={bg}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Preview & Export Area */}
            <div className="flex-1 flex flex-col min-h-[400px]">
              <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--paper-deep)' }}>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-color)]">Live Preview</p>
                  <p className="text-xs text-[var(--text-faint)]">Rendered in high-resolution</p>
                </div>
                <ExportDropdown 
                  label="Custom Logo Export" 
                  onExport={(format) => handleExport(format, 'studio-export-node', `IntegrateWise-Logo-${studioVariant}-${studioColor}`)} 
                />
              </div>
              <div 
                className="flex-1 overflow-hidden flex items-center justify-center p-8 relative"
                style={{ 
                  background: 'repeating-conic-gradient(var(--rule-light) 0% 25%, transparent 0% 50%) 50% / 20px 20px',
                  backgroundColor: 'var(--paper)'
                }}
              >
                {/* The actual exportable node */}
                <div
                  id="studio-export-node"
                  className="flex items-center justify-center p-16 transition-all duration-300"
                  style={{
                    background:
                      studioBg === 'white' ? 'var(--paper)' :
                      studioBg === 'grey' ? 'var(--paper-warm)' :
                      studioBg === 'dark' ? 'var(--forest)' :
                      studioBg === 'transparent' ? 'transparent' :
                      'repeating-conic-gradient(var(--rule-light) 0% 25%, transparent 0% 50%) 50% / 20px 20px',
                    backgroundColor: studioBg === 'checker' ? 'var(--paper)' : undefined,
                    minWidth: '400px',
                    minHeight: '200px'
                  }}
                >
                  <IntegrateWiseLogo 
                    variant={studioVariant} 
                    colorVariant={studioColor} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Messaging System */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 rounded-full" style={{ background: 'var(--forest)' }} />
          <h3 className="text-lg font-serif" style={{ color: 'var(--ink)' }}>Brand Messaging System</h3>
        </div>

        <div className="rounded-xl p-6 lg:p-8 space-y-6" style={{ background: 'var(--surface-raised)', border: '1px solid var(--rule-light)' }}>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-xs tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>PRIMARY PRODUCT DESCRIPTION</p>
              <p className="text-lg font-serif" style={{ color: 'var(--ink)' }}>{BRAND.name}</p>
              <p className="text-sm mt-1 italic" style={{ color: 'var(--text-muted)' }}>
                {TAGLINES.oneParagraph}
              </p>
              <p className="text-sm font-medium mt-2" style={{ color: 'var(--ink)' }}>
                {TAGLINES.primary}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>SPINE EXPLANATION (USE CONSISTENTLY)</p>
              <div className="space-y-2">
                {[
                  'The Spine (SSOT)',
                  'The Spine — Unified Intelligence Layer',
                  'The Spine — Single Source of Truth and Unified Intelligence Layer',
                ].map((variant) => (
                  <div key={variant} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'var(--paper-warm)' }}>
                    <p className="text-sm flex-1" style={{ color: 'var(--text-muted)' }}>{variant}</p>
                    <button
                      className="p-1 rounded hover:bg-[var(--paper-deep)]"
                      onClick={() => {
                        copyToClipboard(variant);
                      }}
                    >
                      <Copy className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6" style={{ borderTop: '1px solid var(--rule-light)' }}>
            <p className="text-xs tracking-wide mb-3" style={{ color: 'var(--text-muted)' }}>TAGLINE SYSTEM</p>
            <div className="grid sm:grid-cols-3 gap-4">
              <MessagingCard
                label="Primary Tagline"
                text={TAGLINES.primary}
                highlight
              />
              <MessagingCard
                label="Short Version"
                text="Context-Aware AI. Approval-Controlled Work."
              />
              <MessagingCard
                label="Extended (Marketing)"
                text={TAGLINES.valueProp}
              />
            </div>
          </div>

          <div className="pt-6" style={{ borderTop: '1px solid var(--rule-light)' }}>
            <p className="text-xs tracking-wide mb-3" style={{ color: 'var(--text-muted)' }}>APPROVED COPY FOR SPECIFIC ASSETS</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { asset: 'Letterhead', line: `${BRAND.legalName} · ${TAGLINES.descriptorFull}` },
                { asset: 'Invoice Footer', line: `${BRAND.name} — ${TAGLINES.primary}` },
                { asset: 'Business Card', line: TAGLINES.descriptorFull },
                { asset: 'Profile Headline', line: `The ${BRAND.category} Where AI Thinks in Context` },
                { asset: 'Brochure Headline', line: 'Bring Work, Knowledge, and Decisions Together Through the Spine' },
                { asset: 'Marketing Headline', line: 'Work Becomes Smarter When AI Understands Context' },
              ].map((item) => (
                <div key={item.asset} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'var(--paper-warm)' }}>
                  <Quote className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--text-muted)' }} />
                  <div>
                    <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{item.asset}</p>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--ink)' }}>{item.line}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6" style={{ borderTop: '1px solid var(--rule-light)' }}>
            <p className="text-xs tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>PRODUCT ESSENCE (FOR MARKETING, DECKS, COMPANY DOCS)</p>
            <div className="p-4 rounded-lg" style={{ background: 'linear-gradient(135deg, var(--surface) 0%, var(--accent-soft) 100%)', border: '1px solid var(--border-subtle)' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
                IntegrateWise is a knowledge workspace where the Spine becomes the single source
                of truth and AI operates on top of that context — thinking, proposing, and
                learning while every action remains under human approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-start gap-3 p-4 rounded-lg" style={{ background: 'var(--gold-pale)', border: '1px solid var(--gold-light)' }}>
        <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--gold)' }} />
        <div>
          <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>Brand Descriptor Update</p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            The original logo subtitle says "Enterprise integrations" — the brand now clearly
            now uses the canonical descriptor <strong>Adaptive continuity workspace hydrated by the Spine</strong>. All stationery and marketing
            materials should use the updated descriptor: "IntegrateWise — Adaptive continuity workspace hydrated by the Spine."
          </p>
        </div>
      </div>

      {/* Logo Variants */}
      <section className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 rounded-full" style={{ background: 'var(--forest)' }} />
            <h3 className="text-lg font-serif" style={{ color: 'var(--ink)' }}>Logo Variants</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Background:</span>
            {(['light', 'grey', 'dark'] as BgMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setBgMode(mode)}
                className="px-2.5 py-1 rounded-md text-xs font-medium transition-colors"
                style={
                  bgMode === mode
                    ? { border: '1px solid var(--primary-color)', background: 'var(--primary-soft)', color: 'var(--primary-color)' }
                    : { border: '1px solid var(--rule-light)', background: 'var(--surface-raised)', color: 'var(--slate)' }
                }
              >
                {mode === 'light' ? 'White' : mode === 'grey' ? 'Grey' : 'Dark'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          {LOGO_VARIANTS.map((v) => (
            <div key={v.variant} className="rounded-xl overflow-hidden" style={{ background: 'var(--surface-raised)', border: '1px solid var(--rule-light)' }}>
              <div className="px-6 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--paper-deep)' }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{v.label}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{v.desc}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setPreviewItem({
                        label: v.label,
                        content: <IntegrateWiseLogo variant={v.variant} />,
                      })
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-[var(--paper-warm)] transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>
                  <ExportDropdown 
                    label={v.label} 
                    onExport={(format) => handleExport(format, `logo-${v.variant}`, v.label)} 
                  />
                </div>
              </div>
              <div
                id={`logo-${v.variant}`}
                className="flex items-center justify-center p-12 transition-colors duration-200"
                style={{
                  background: bgMode === 'light' ? 'var(--paper)' : bgMode === 'grey' ? 'var(--paper-warm)' : 'var(--forest)'
                }}
              >
                <IntegrateWiseLogo variant={v.variant} colorVariant={bgMode === 'dark' ? 'white' : 'default'} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SVG Source Files */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 rounded-full" style={{ background: 'var(--forest)' }} />
          <h3 className="text-lg font-serif" style={{ color: 'var(--ink)' }}>SVG Source Files</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SVG_SOURCE_ASSETS.map((asset) => (
            <div key={asset.name} className="rounded-xl overflow-hidden group" style={{ background: 'var(--surface-raised)', border: '1px solid var(--rule-light)' }}>
              <div
                className="flex items-center justify-center p-6 h-44 transition-colors duration-200"
                style={{
                  background: bgMode === 'light' ? 'var(--paper)' : bgMode === 'grey' ? 'var(--paper-warm)' : 'var(--forest)'
                }}
              >
                <img
                  src={asset.src}
                  alt={asset.label}
                  className="max-h-full object-contain"
                  style={{
                    width: '80%',
                    filter: bgMode === 'dark' ? 'brightness(0) invert(1)' : 'none',
                  }}
                />
              </div>
              <div className="px-5 py-4 flex items-center justify-between" style={{ borderTop: '1px solid var(--paper-deep)' }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{asset.label}</p>
                  <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{asset.name}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      setPreviewItem({
                        label: asset.label,
                        content: (
                          <img src={asset.src} alt={asset.label} className="max-w-md w-full" />
                        ),
                      })
                    }
                    className="p-2 rounded-md hover:bg-[var(--paper-warm)] transition-colors"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  </button>
                  <a 
                    href={asset.src} 
                    download={asset.name}
                    className="p-2 rounded-md hover:bg-[var(--paper-warm)] transition-colors"
                    title="Download SVG"
                  >
                    <Download className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Motifs */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 rounded-full" style={{ background: 'var(--forest)' }} />
          <h3 className="text-lg font-serif" style={{ color: 'var(--ink)' }}>Brand Motifs</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { name: 'Spine Node Line', desc: 'Connected circles and lines inspired by the logo symbol. Used for backgrounds and decorative elements.' },
            { name: 'Approval Checkpoint', desc: 'Small rounded rectangle or node used as a visual approval stage marker.' },
            { name: 'Context Card', desc: 'Soft-edged box representing structured knowledge/context blocks.' },
            { name: 'Layer Bands', desc: 'Subtle layered strips suggesting workspace, intelligence, and governance layers.' },
          ].map((motif) => (
            <div key={motif.name} className="rounded-xl p-6" style={{ background: 'var(--surface-raised)', border: '1px solid var(--rule-light)' }}>
              <h4 className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{motif.name}</h4>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{motif.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 rounded-full" style={{ background: 'var(--forest)' }} />
          <h3 className="text-lg font-serif" style={{ color: 'var(--ink)' }}>Usage Guidelines</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-xl p-6" style={{ background: 'var(--surface-raised)', border: '1px solid var(--rule-light)' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--forest-bright) 12%, transparent)' }}>
                <Check className="w-4 h-4" style={{ color: 'var(--forest-bright)' }} />
              </div>
              <h4 className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>Do</h4>
            </div>
            <ul className="space-y-3">
              {[
                'Use the full logo on light backgrounds',
                'Maintain minimum clear space (height of one icon node)',
                'Use icon-only variant for small spaces (< 32px)',
                'Use monochrome white version on dark backgrounds',
                'Print: minimum 25mm width. Digital: minimum 120px width',
                'Scale proportionally — never stretch',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--forest-bright)' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl p-6" style={{ background: 'var(--surface-raised)', border: '1px solid var(--rule-light)' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--red) 10%, transparent)' }}>
                <X className="w-4 h-4" style={{ color: 'var(--gold)' }} />
              </div>
              <h4 className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>Don't</h4>
            </div>
            <ul className="space-y-3">
              {[
                'Alter the logo colors outside brand palette',
                'Add effects like drop shadows or outlines',
                'Place the logo on busy or low-contrast backgrounds',
                'Rotate or skew the logo in any direction',
                'Use full-color logo on dark backgrounds',
                'Use deck-only or legacy accent palettes in canonical product/runtime surfaces',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <X className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--gold)' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Design Style */}
      <section className="space-y-6 pb-8">
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 rounded-full" style={{ background: 'var(--forest)' }} />
          <h3 className="text-lg font-serif" style={{ color: 'var(--ink)' }}>Overall Design Style</h3>
        </div>
        <div className="rounded-xl p-6" style={{ background: 'var(--surface-raised)', border: '1px solid var(--rule-light)' }}>
          <p className="text-sm font-semibold mb-3" style={{ color: 'var(--ink)' }}>Enterprise Minimal + Intelligent Systems Aesthetic</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { feel: 'Trusted enterprise platform', not: 'Not flashy startup graphics' },
              { feel: 'Modern SaaS product', not: 'Not old-fashioned corporate stationery' },
              { feel: 'Structured intelligence system', not: 'Not crowded marketing layouts' },
              { feel: 'Human-governed AI', not: 'Not generic tech templates' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg" style={{ background: 'var(--paper-warm)' }}>
                <p className="text-sm flex items-center gap-1.5" style={{ color: 'var(--ink)' }}>
                  <Check className="w-3.5 h-3.5" style={{ color: 'var(--forest-bright)' }} />{item.feel}
                </p>
                <p className="text-xs flex items-center gap-1.5 mt-1" style={{ color: 'var(--text-muted)' }}>
                  <X className="w-3.5 h-3.5" style={{ color: 'var(--gold)' }} />{item.not}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function MessagingCard({ label, text, highlight }: { label: string; text: string; highlight?: boolean }) {
  return (
    <div
      className="p-4 rounded-lg"
      style={
        highlight
          ? { border: '1px solid color-mix(in srgb, var(--gold) 35%, transparent)', background: 'color-mix(in srgb, var(--gold) 10%, transparent)' }
          : { border: '1px solid var(--paper-deep)', background: 'var(--surface-raised)' }
      }
    >
      <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
      <p className={`text-sm ${highlight ? 'font-semibold' : ''}`} style={{ color: 'var(--ink)' }}>{text}</p>
    </div>
  );
}
