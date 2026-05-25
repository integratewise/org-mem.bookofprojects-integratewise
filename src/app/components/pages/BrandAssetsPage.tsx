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
    'linear-gradient(45deg, var(--rule-light) 25%, transparent 25%), linear-gradient(-45deg, var(--rule-light) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--rule-light) 75%), linear-gradient(-45deg, transparent 75%, var(--rule-light) 75%)',
  backgroundSize: '20px 20px',
  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
  backgroundColor: 'var(--paper-warm)',
};

const raisedPanelStyle: React.CSSProperties = {
  background: 'var(--paper-warm)',
  border: '1px solid var(--rule)',
};

const softPanelStyle: React.CSSProperties = {
  background: 'var(--paper-warm)',
  border: '1px solid var(--rule-light)',
};

const heroPanelStyle: React.CSSProperties = {
  background: 'var(--paper-warm)',
  border: '1px solid var(--rule)',
};

const getCanvasStyle = (
  tone: 'white' | 'grey' | 'dark' | 'checker' | 'transparent' | 'light',
): React.CSSProperties => {
  switch (tone) {
    case 'grey':
      return { background: 'var(--paper-deep)' };
    case 'dark':
      return { background: 'var(--surface-inverse)' };
    case 'checker':
      return checkerboardStyle;
    case 'transparent':
      return { background: 'transparent' };
    case 'light':
    case 'white':
    default:
      return { background: 'var(--paper)' };
  }
};

const getSelectionButtonStyle = (active: boolean): React.CSSProperties =>
  active
    ? {
        background: 'var(--forest)',
        color: 'var(--paper)',
        border: '1px solid var(--forest)',
      }
    : {
        background: 'transparent',
        color: 'var(--text-muted)',
        border: '1px solid var(--rule-light)',
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
          background: 'var(--paper-warm)',
          border: '1px solid var(--rule)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--rule-light)' }}>
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
                  border: previewBg === bg ? '2px solid var(--forest)' : '1px solid var(--rule-light)',
                }}
                title={bg.charAt(0).toUpperCase() + bg.slice(1)}
              />
            ))}
            <div className="w-px h-6 mx-1" style={{ background: 'var(--rule-light)' }} />
            <button
              onClick={() => setZoom((z) => Math.max(0.25, z - 0.25))}
              className="p-1.5 rounded-md hover:bg-[var(--paper-warm)]"
            >
              <ZoomOut className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            </button>
            <span className="text-xs font-mono w-10 text-center" style={{ color: 'var(--text-faint)' }}>{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
              className="p-1.5 rounded-md hover:bg-[var(--paper-warm)]"
            >
              <ZoomIn className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1.5 rounded-md hover:bg-[var(--paper-warm)]"
              title="Reset zoom"
            >
              <Maximize2 className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            </button>
            
            <div className="w-px h-6 mx-1" style={{ background: 'var(--rule-light)' }} />
            
            <button
              onClick={handleModalDownload}
              disabled={isDownloading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
              style={{
                background: isDownloading ? 'var(--paper-deep)' : 'var(--forest)',
                color: isDownloading ? 'var(--ink-muted)' : 'var(--paper)',
                border: isDownloading ? '1px solid var(--rule-light)' : '1px solid var(--forest)',
              }}
            >
              <Download className="w-3.5 h-3.5" /> 
              {isDownloading ? 'Saving...' : 'Download'}
            </button>

            <div className="w-px h-6 mx-1" style={{ background: 'var(--rule-light)' }} />
            
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[var(--paper-warm)]">
              <X className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
            </button>
          </div>
        </div>
        
        {/* Canvas Area */}
        <div
          className="flex-1 overflow-auto flex items-center justify-center p-12 min-h-[400px]"
          style={{ background: 'var(--paper-warm)' }}
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
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors hover:bg-[var(--paper-warm)]"
        style={{
          background: 'transparent',
          color: 'var(--text-muted)',
          border: '1px solid var(--rule-light)',
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
              background: 'var(--paper-warm)',
              border: '1px solid var(--rule)',
            }}
          >
            {formats.map((fmt) => (
              <button
                key={fmt.id}
                onClick={() => {
                  onExport(fmt.id);
                  setOpen(false);
                }}
                className="flex items-center gap-3 w-full px-3 py-2 text-left transition-colors hover:bg-[var(--paper-warm)]"
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
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-16">
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

      {/* Page header — editorial hero */}
      <div className="pt-6 pb-4">
        <p className="iw-label mb-4 flex items-center gap-3">
          <span style={{ display: 'inline-block', width: 32, height: 1, background: 'var(--gold)' }} />
          IntegrateWise · Brand System
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="font-serif mb-4" style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.05, color: 'var(--ink)', letterSpacing: '0.01em' }}>
              Brand Assets
            </h1>
            <p className="iw-body" style={{ color: 'var(--text-muted)' }}>
              Canonical mark system, lighter brand language, descriptor usage, and runtime-safe brand assets.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => setShowAdvancedEditor(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
              style={{ background: 'var(--forest)', color: 'var(--paper)' }}
            >
              <Sparkles className="w-4 h-4" />
              Advanced Editor
            </button>
            <button
              onClick={handleDownloadAll}
              disabled={isDownloadingAll}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
              style={{ 
                background: isDownloadingAll ? 'var(--slate-mid)' : 'transparent',
                color: isDownloadingAll ? 'var(--paper)' : 'var(--forest)',
                border: isDownloadingAll ? 'none' : '2px solid var(--forest)'
              }}
            >
              <Download className="w-4 h-4" />
              {isDownloadingAll ? 'Zipping Assets...' : 'Download Full Kit'}
            </button>
          </div>
        </div>
      </div>

      {/* Feature Highlight — editorial */}
      <div className="rounded-xl p-6 lg:p-8" style={{ border: '1px solid var(--rule)' }}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: 'var(--forest)' }}>
              <Sparkles className="w-7 h-7" style={{ color: 'var(--paper)' }} />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="iw-s-title" style={{ color: 'var(--ink)' }}>Advanced Asset Editor Now Available</h3>
            <p className="iw-body mt-2 mb-3" style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
              Create canonical lighter-system brand assets with adjustable layouts, governed descriptor usage, and export workflows across social, documentation, and print formats.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Custom Colors', 'Effects & Layouts', 'Batch Export', 'Social Presets'].map((feature) => (
                <span
                  key={feature}
                  className="iw-mono-label px-2.5 py-1"
                  style={{ background: 'color-mix(in srgb, var(--gold) 10%, transparent)', color: 'var(--forest)' }}
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => setShowAdvancedEditor(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
            style={{ background: 'var(--forest)', color: 'var(--paper)' }}
          >
            <Settings className="w-4 h-4" />
            Open Editor
          </button>
        </div>
      </div>

      <div className="rounded-xl p-5" style={{ border: '1px solid var(--rule)' }}>
        <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>Canonical asset rule</p>
        <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Historical SVG source exports may still preserve earlier palette references, but all live-rendered brand assets and runtime-facing surfaces should use the current lighter documentation system and the descriptor "Adaptive continuity workspace hydrated by the Spine."</p>
      </div>

      {/* Asset Studio */}
      <section className="space-y-6 pt-4">
        <p className="iw-label mb-2">Interactive Tools</p>
        <h2 className="iw-doctrine mb-2">Brand Studio</h2>
        <p className="iw-body mb-6" style={{ color: 'var(--text-muted)' }}>Customize, preview, and export logo variants with real-time controls.</p>
        
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--rule)' }}>
          <div className="flex flex-col lg:flex-row">
            {/* Controls */}
            <div className="w-full lg:w-80 p-6 space-y-6" style={{ borderRight: '1px solid var(--paper-deep)', background: 'var(--paper-warm)' }}>
              <div className="flex items-center gap-2 mb-2">
                <SlidersHorizontal className="w-4 h-4 text-[var(--text-muted)]" />
                <h4 className="text-sm font-semibold text-[var(--ink)]">Customizer</h4>
              </div>
              
              <div className="space-y-3">
                <label className="text-xs font-medium text-[var(--ink)]">Logo Layout</label>
                <div className="flex flex-col gap-2">
                  {(['full', 'compact', 'icon-only'] as const).map(variant => (
                    <button
                      key={variant}
                      onClick={() => setStudioVariant(variant)}
                      className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${studioVariant === variant ? 'font-medium' : 'border hover:bg-[var(--paper-deep)]'}`}
                      style={studioVariant === variant ? { background: 'var(--forest)', color: 'var(--paper)' } : { borderColor: 'var(--rule-light)', color: 'var(--ink)' }}
                    >
                      {variant === 'full' ? 'Full Layout' : variant === 'compact' ? 'Compact' : 'Icon Only'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-medium text-[var(--ink)]">Color Theme</label>
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
                      className={`text-left px-2 py-1.5 rounded-md text-xs transition-colors ${studioColor === theme.id ? 'font-medium' : 'border hover:bg-[var(--paper-deep)]'}`}
                      style={studioColor === theme.id ? { background: 'var(--forest)', color: 'var(--paper)' } : { borderColor: 'var(--rule-light)', color: 'var(--ink)' }}
                    >
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-medium text-[var(--ink)]">Background Canvas</label>
                <div className="flex items-center gap-2">
                  {(['transparent', 'white', 'grey', 'dark', 'checker'] as const).map((bg) => (
                    <button
                      key={bg}
                      onClick={() => setStudioBg(bg)}
                      className="w-8 h-8 rounded-md transition-all"
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
                  <p className="text-sm font-semibold text-[var(--ink)]">Live Preview</p>
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
      <section className="space-y-6 pt-4">
        <p className="iw-label mb-2">Messaging</p>
        <h2 className="iw-doctrine mb-2">Brand Messaging System</h2>
        <p className="iw-body mb-6" style={{ color: 'var(--text-muted)' }}>Approved copy, taglines, and descriptors for every surface.</p>

        <div className="rounded-xl p-6 lg:p-8 space-y-6" style={{ border: '1px solid var(--rule)' }}>
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
            <div className="p-4 rounded-lg" style={{ background: 'var(--paper-warm)', border: '1px solid var(--rule)' }}>
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
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="iw-label mb-2">Marks</p>
            <h2 className="iw-doctrine">Logo Variants</h2>
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
                    ? { border: '1px solid var(--forest)', background: 'color-mix(in srgb, var(--forest) 8%, transparent)', color: 'var(--forest)' }
                    : { border: '1px solid var(--rule-light)', background: 'transparent', color: 'var(--ink-muted)' }
                }
              >
                {mode === 'light' ? 'White' : mode === 'grey' ? 'Grey' : 'Dark'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          {LOGO_VARIANTS.map((v) => (
            <div key={v.variant} className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--rule)' }}>
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
      <section className="space-y-6 pt-4">
        <p className="iw-label mb-2">Source Files</p>
        <h2 className="iw-doctrine mb-2">SVG Source Files</h2>
        <p className="iw-body mb-6" style={{ color: 'var(--text-muted)' }}>Original vector exports for design tooling and print production.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SVG_SOURCE_ASSETS.map((asset) => (
            <div key={asset.name} className="rounded-xl overflow-hidden group" style={{ border: '1px solid var(--rule)' }}>
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
      <section className="space-y-6 pt-4">
        <p className="iw-label mb-2">Visual Language</p>
        <h2 className="iw-doctrine mb-2">Brand Motifs</h2>
        <p className="iw-body mb-6" style={{ color: 'var(--text-muted)' }}>Recurring visual elements that carry the brand identity across surfaces.</p>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { name: 'Spine Node Line', desc: 'Connected circles and lines inspired by the logo symbol. Used for backgrounds and decorative elements.' },
            { name: 'Approval Checkpoint', desc: 'Small rounded rectangle or node used as a visual approval stage marker.' },
            { name: 'Context Card', desc: 'Soft-edged box representing structured knowledge/context blocks.' },
            { name: 'Layer Bands', desc: 'Subtle layered strips suggesting workspace, intelligence, and governance layers.' },
          ].map((motif) => (
            <div key={motif.name} className="rounded-xl p-6" style={{ border: '1px solid var(--rule)' }}>
              <h4 className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{motif.name}</h4>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{motif.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="space-y-6 pt-4">
        <p className="iw-label mb-2">Governance</p>
        <h2 className="iw-doctrine mb-2">Usage Guidelines</h2>
        <p className="iw-body mb-6" style={{ color: 'var(--text-muted)' }}>Rules that keep the brand consistent across every touchpoint.</p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-xl p-6" style={{ border: '1px solid var(--rule)' }}>
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
          <div className="rounded-xl p-6" style={{ border: '1px solid var(--rule)' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'var(--red-pale)' }}>
                <X className="w-4 h-4" style={{ color: 'var(--red)' }} />
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
      <section className="space-y-6 pt-4 pb-8">
        <p className="iw-label mb-2">Principles</p>
        <h2 className="iw-doctrine mb-2">Overall Design Style</h2>
        <p className="iw-body mb-6" style={{ color: 'var(--text-muted)' }}>The character of the brand expressed in visual terms.</p>
        <div className="rounded-xl p-6" style={{ border: '1px solid var(--rule)' }}>
          <p className="text-sm font-semibold mb-3" style={{ color: 'var(--ink)' }}>Enterprise Minimal + Intelligent Systems Aesthetic</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { feel: 'Trusted enterprise platform', not: 'Not flashy startup graphics' },
              { feel: 'Modern SaaS product', not: 'Not old-fashioned corporate stationery' },
              { feel: 'Structured intelligence system', not: 'Not crowded marketing layouts' },
              { feel: 'Human-governed AI', not: 'Not generic tech templates' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg" style={{ background: 'var(--paper-warm)', border: '1px solid var(--rule-light)' }}>
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
          ? { border: '1px solid var(--gold)', background: 'var(--gold-pale)' }
          : { border: '1px solid var(--rule-light)', background: 'var(--paper-warm)' }
      }
    >
      <p className="iw-mono-label mb-2">{label}</p>
      <p className={`text-sm ${highlight ? 'font-semibold' : ''}`} style={{ color: 'var(--ink)' }}>{text}</p>
    </div>
  );
}
