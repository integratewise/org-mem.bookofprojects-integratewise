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
import { TAGLINES, BRAND, CONTACT } from '../../lib/brand';

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

  const bgClass: Record<string, string> = {
    white: 'bg-white',
    grey: '',
    dark: '',
    checker: '',
  };
  
  const bgStyle: Record<string, React.CSSProperties | undefined> = {
    white: { background: '#ffffff' },
    grey: { background: '#EDF0F5' },
    dark: { background: '#1B2544' },
    checker: {
      backgroundImage:
        'linear-gradient(45deg, #D5DAE5 25%, transparent 25%), linear-gradient(-45deg, #D5DAE5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #D5DAE5 75%), linear-gradient(-45deg, transparent 75%, #D5DAE5 75%)',
      backgroundSize: '20px 20px',
      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
      backgroundColor: '#ffffff'
    },
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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-[90vw] max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #D5DAE5' }}>
          <div>
            <p className="text-base font-semibold" style={{ color: '#1B2544' }}>{label}</p>
            <p className="text-xs" style={{ color: '#9BA8C2' }}>Preview Mode</p>
          </div>
          <div className="flex items-center gap-2">
            {(['white', 'grey', 'dark', 'checker'] as const).map((bg) => (
              <button
                key={bg}
                onClick={() => setPreviewBg(bg)}
                className="w-6 h-6 rounded-md transition-colors"
                style={{
                  border: previewBg === bg ? '2px solid #4154A3' : '2px solid #BCC3D4',
                  background:
                    bg === 'white'
                      ? '#fff'
                      : bg === 'grey'
                      ? '#EDF0F5'
                      : bg === 'dark'
                      ? '#1B2544'
                      : 'repeating-conic-gradient(#D5DAE5 0% 25%, transparent 0% 50%) 50% / 10px 10px',
                }}
                title={bg.charAt(0).toUpperCase() + bg.slice(1)}
              />
            ))}
            <div className="w-px h-6 mx-1" style={{ background: '#D5DAE5' }} />
            <button
              onClick={() => setZoom((z) => Math.max(0.25, z - 0.25))}
              className="p-1.5 rounded-md hover:bg-[#F0F2F7]"
            >
              <ZoomOut className="w-4 h-4" style={{ color: '#5F6E93' }} />
            </button>
            <span className="text-xs font-mono w-10 text-center" style={{ color: '#7B8AAD' }}>{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
              className="p-1.5 rounded-md hover:bg-[#F0F2F7]"
            >
              <ZoomIn className="w-4 h-4" style={{ color: '#5F6E93' }} />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1.5 rounded-md hover:bg-[#F0F2F7]"
              title="Reset zoom"
            >
              <Maximize2 className="w-4 h-4" style={{ color: '#5F6E93' }} />
            </button>
            
            <div className="w-px h-6 mx-1" style={{ background: '#D5DAE5' }} />
            
            <button
              onClick={handleModalDownload}
              disabled={isDownloading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white transition-colors"
              style={{ background: isDownloading ? '#9BA8C2' : '#4154A3' }}
            >
              <Download className="w-3.5 h-3.5" /> 
              {isDownloading ? 'Saving...' : 'Download'}
            </button>

            <div className="w-px h-6 mx-1" style={{ background: '#D5DAE5' }} />
            
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[#F0F2F7]">
              <X className="w-5 h-5" style={{ color: '#5F6E93' }} />
            </button>
          </div>
        </div>
        
        {/* Canvas Area */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-12 min-h-[400px] bg-gray-50/50">
          <div style={{ transform: `scale(${zoom})`, transformOrigin: 'center', transition: 'transform 0.2s ease' }}>
            <div
              id="preview-modal-content"
              className={`flex items-center justify-center ${bgClass[previewBg]}`}
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
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-brand-gray-100 text-brand-gray-700 hover:bg-brand-gray-200 transition-colors"
      >
        <Download className="w-3.5 h-3.5" /> Export <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-20 bg-white rounded-lg border border-brand-gray-200 shadow-lg py-1 w-48">
            {formats.map((fmt) => (
              <button
                key={fmt.id}
                onClick={() => {
                  onExport(fmt.id);
                  setOpen(false);
                }}
                className="flex items-center gap-3 w-full px-3 py-2 text-left hover:bg-brand-gray-50 transition-colors"
              >
                <fmt.icon className="w-4 h-4 text-brand-gray-400" />
                <div>
                  <p className="text-sm font-medium text-brand-gray-700">{fmt.label}</p>
                  <p className="text-[10px] text-brand-gray-400">{fmt.desc}</p>
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
          <h2 className="text-2xl font-bold" style={{ color: '#232D42' }}>Brand Assets</h2>
          <p className="mt-1" style={{ color: '#808CA9' }}>
            Logo system, brand messaging, visual identity guidelines, and brand motifs
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setShowAdvancedEditor(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all shadow-sm hover:shadow"
            style={{ background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-accent))' }}
          >
            <Sparkles className="w-4 h-4" />
            Advanced Editor
          </button>
          <button
            onClick={handleDownloadAll}
            disabled={isDownloadingAll}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow"
            style={{ 
              background: isDownloadingAll ? '#9BA8C2' : '#fff',
              color: isDownloadingAll ? '#fff' : '#1B2544',
              border: isDownloadingAll ? 'none' : '1px solid #D5DAE5'
            }}
          >
            <Download className="w-4 h-4" />
            {isDownloadingAll ? 'Zipping Assets...' : 'Download Full Kit (.zip)'}
          </button>
        </div>
      </div>

      {/* Feature Highlight Card */}
      <div className="relative overflow-hidden rounded-2xl p-6 lg:p-8" style={{ 
        background: 'linear-gradient(135deg, rgba(65,84,163,0.08), rgba(235,67,121,0.08))',
        border: '1px solid rgba(65,84,163,0.15)'
      }}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-accent))' }}>
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1" style={{ color: '#1B2544' }}>Advanced Asset Editor Now Available</h3>
            <p className="text-sm mb-3" style={{ color: '#5F6E93' }}>
              Create custom brand assets with comprehensive editing tools. Adjust colors, dimensions, effects, and export to 12+ social media and print formats in one batch.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Custom Colors', 'Gradients & Effects', 'Batch Export', 'Social Media Presets'].map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(65,84,163,0.1)', color: '#4154A3' }}
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => setShowAdvancedEditor(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all shadow-sm hover:shadow-lg whitespace-nowrap"
            style={{ background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-accent))' }}
          >
            <Settings className="w-4 h-4" />
            Open Editor
          </button>
        </div>
      </div>

      {/* Asset Studio */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 rounded-full" style={{ background: 'var(--brand-primary)' }} />
          <h3 className="text-lg font-semibold" style={{ color: '#1B2544' }}>Interactive Brand Studio</h3>
        </div>
        
        <div className="bg-white rounded-xl overflow-hidden shadow-sm" style={{ border: '1px solid #D5DAE5' }}>
          <div className="flex flex-col lg:flex-row">
            {/* Controls */}
            <div className="w-full lg:w-80 p-6 space-y-6" style={{ borderRight: '1px solid #E8ECF2', background: '#F8FAFC' }}>
              <div className="flex items-center gap-2 mb-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-gray-600" />
                <h4 className="text-sm font-semibold text-brand-gray-900">Customizer</h4>
              </div>
              
              <div className="space-y-3">
                <label className="text-xs font-medium text-brand-gray-700">Logo Layout</label>
                <div className="flex flex-col gap-2">
                  {(['full', 'compact', 'icon-only'] as const).map(variant => (
                    <button
                      key={variant}
                      onClick={() => setStudioVariant(variant)}
                      className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${studioVariant === variant ? 'bg-brand-primary text-white' : 'bg-white text-brand-gray-700 border border-brand-gray-200 hover:bg-brand-gray-50'}`}
                    >
                      {variant === 'full' ? 'Full Layout' : variant === 'compact' ? 'Compact' : 'Icon Only'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-medium text-brand-gray-700">Color Theme</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'default', label: 'Default' },
                    { id: 'white', label: 'White' },
                    { id: 'monochrome-dark', label: 'Mono Dark' },
                    { id: 'monochrome-white', label: 'Mono White' },
                    { id: 'blue-only', label: 'Blue Only' },
                    { id: 'print-safe-black', label: 'Print Black' },
                  ].map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => setStudioColor(theme.id as any)}
                      className={`text-left px-2 py-1.5 rounded-md text-xs transition-colors ${studioColor === theme.id ? 'bg-brand-primary text-white' : 'bg-white text-brand-gray-700 border border-brand-gray-200 hover:bg-brand-gray-50'}`}
                    >
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-medium text-brand-gray-700">Background Canvas</label>
                <div className="flex items-center gap-2">
                  {(['transparent', 'white', 'grey', 'dark', 'checker'] as const).map((bg) => (
                    <button
                      key={bg}
                      onClick={() => setStudioBg(bg)}
                      className="w-8 h-8 rounded-md transition-all shadow-sm"
                      style={{
                        border: studioBg === bg ? '2px solid #4154A3' : '1px solid #D5DAE5',
                        background:
                          bg === 'white' ? '#fff' :
                          bg === 'grey' ? '#EDF0F5' :
                          bg === 'dark' ? '#1B2544' :
                          bg === 'transparent' ? 'transparent' :
                          'repeating-conic-gradient(#D5DAE5 0% 25%, transparent 0% 50%) 50% / 10px 10px',
                        backgroundColor: bg === 'checker' ? '#ffffff' : undefined
                      }}
                      title={bg}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Preview & Export Area */}
            <div className="flex-1 flex flex-col min-h-[400px]">
              <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #E8ECF2' }}>
                <div>
                  <p className="text-sm font-semibold text-brand-gray-900">Live Preview</p>
                  <p className="text-xs text-brand-gray-500">Rendered in high-resolution</p>
                </div>
                <ExportDropdown 
                  label="Custom Logo Export" 
                  onExport={(format) => handleExport(format, 'studio-export-node', `IntegrateWise-Logo-${studioVariant}-${studioColor}`)} 
                />
              </div>
              <div 
                className="flex-1 overflow-hidden flex items-center justify-center p-8 relative"
                style={{ 
                  background: 'repeating-conic-gradient(#f0f2f7 0% 25%, transparent 0% 50%) 50% / 20px 20px',
                  backgroundColor: '#ffffff'
                }}
              >
                {/* The actual exportable node */}
                <div
                  id="studio-export-node"
                  className="flex items-center justify-center p-16 transition-all duration-300"
                  style={{
                    background:
                      studioBg === 'white' ? '#fff' :
                      studioBg === 'grey' ? '#EDF0F5' :
                      studioBg === 'dark' ? '#1B2544' :
                      studioBg === 'transparent' ? 'transparent' :
                      'repeating-conic-gradient(#D5DAE5 0% 25%, transparent 0% 50%) 50% / 20px 20px',
                    backgroundColor: studioBg === 'checker' ? '#ffffff' : undefined,
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
          <div className="h-1 w-12 rounded-full" style={{ background: 'var(--brand-primary)' }} />
          <h3 className="text-lg font-semibold" style={{ color: '#232D42' }}>Brand Messaging System</h3>
        </div>

        <div className="bg-white rounded-xl p-6 lg:p-8 space-y-6" style={{ border: '1px solid #E5E8F4' }}>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-[11px] tracking-wide mb-2" style={{ color: '#A4A9BE' }}>PRIMARY PRODUCT DESCRIPTION</p>
              <p className="text-lg font-semibold" style={{ color: '#232D42' }}>{BRAND.name}</p>
              <p className="text-sm mt-1 italic" style={{ color: '#55608C' }}>
                {TAGLINES.oneParagraph}
              </p>
              <p className="text-sm font-medium mt-2" style={{ color: '#333944' }}>
                {TAGLINES.primary}
              </p>
            </div>
            <div>
              <p className="text-[11px] tracking-wide mb-2" style={{ color: '#A4A9BE' }}>SPINE EXPLANATION (USE CONSISTENTLY)</p>
              <div className="space-y-2">
                {[
                  'The Spine (SSOT)',
                  'The Spine — Unified Intelligence Layer',
                  'The Spine — Single Source of Truth and Unified Intelligence Layer',
                ].map((variant) => (
                  <div key={variant} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: '#F2F3F4' }}>
                    <p className="text-sm flex-1" style={{ color: '#55608C' }}>{variant}</p>
                    <button
                      className="p-1 rounded hover:bg-[#E5E8F4]"
                      onClick={() => {
                        copyToClipboard(variant);
                      }}
                    >
                      <Copy className="w-3.5 h-3.5" style={{ color: '#A4A9BE' }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6" style={{ borderTop: '1px solid #E5E8F4' }}>
            <p className="text-[11px] tracking-wide mb-3" style={{ color: '#A4A9BE' }}>TAGLINE SYSTEM</p>
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

          <div className="pt-6" style={{ borderTop: '1px solid #E5E8F4' }}>
            <p className="text-[11px] tracking-wide mb-3" style={{ color: '#A4A9BE' }}>APPROVED COPY FOR SPECIFIC ASSETS</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { asset: 'Letterhead', line: `${BRAND.legalName} · ${TAGLINES.descriptorFull}` },
                { asset: 'Invoice Footer', line: `${BRAND.name} — ${TAGLINES.primary}` },
                { asset: 'Business Card', line: TAGLINES.descriptorFull },
                { asset: 'Profile Headline', line: `The ${BRAND.category} Where AI Thinks in Context` },
                { asset: 'Brochure Headline', line: 'Bring Work, Knowledge, and Decisions Together Through the Spine' },
                { asset: 'Marketing Headline', line: 'Work Becomes Smarter When AI Understands Context' },
              ].map((item) => (
                <div key={item.asset} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: '#F2F3F4' }}>
                  <Quote className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#A4A9BE' }} />
                  <div>
                    <p className="text-[11px] font-medium" style={{ color: '#808CA9' }}>{item.asset}</p>
                    <p className="text-sm mt-0.5" style={{ color: '#333944' }}>{item.line}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6" style={{ borderTop: '1px solid #E5E8F4' }}>
            <p className="text-[11px] tracking-wide mb-2" style={{ color: '#A4A9BE' }}>PRODUCT ESSENCE (FOR MARKETING, DECKS, COMPANY DOCS)</p>
            <div className="p-4 rounded-lg" style={{ background: 'linear-gradient(135deg, rgba(67,86,169,0.06), rgba(235,79,114,0.06))', border: '1px solid rgba(67,86,169,0.12)' }}>
              <p className="text-sm leading-relaxed" style={{ color: '#333944' }}>
                IntegrateWise is a knowledge workspace where the Spine becomes the single source
                of truth and AI operates on top of that context — thinking, proposing, and
                learning while every action remains under human approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-start gap-3 p-4 rounded-lg" style={{ background: '#FFF9E6', border: '1px solid #F5E6A3' }}>
        <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#C48A00' }} />
        <div>
          <p className="text-sm font-medium" style={{ color: '#6B4D00' }}>Brand Descriptor Update</p>
          <p className="text-sm mt-1" style={{ color: '#7A5C00' }}>
            The original logo subtitle says "Enterprise integrations" — the brand now clearly
            stands for <strong>Adaptive Continuity Workspace</strong>. All stationery and marketing
            materials use the updated descriptor: "IntegrateWise — Adaptive continuity workspace hydrated by the Spine."
          </p>
        </div>
      </div>

      {/* Logo Variants */}
      <section className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 rounded-full" style={{ background: 'var(--brand-primary)' }} />
            <h3 className="text-lg font-semibold" style={{ color: '#1B2544' }}>Logo Variants</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium" style={{ color: '#7B8AAD' }}>Background:</span>
            {(['light', 'grey', 'dark'] as BgMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setBgMode(mode)}
                className="px-2.5 py-1 rounded-md text-xs font-medium transition-colors"
                style={
                  bgMode === mode
                    ? { border: '1px solid #4154A3', background: 'rgba(65,84,163,0.08)', color: '#4154A3' }
                    : { border: '1px solid #D5DAE5', background: 'white', color: '#5F6E93' }
                }
              >
                {mode === 'light' ? 'White' : mode === 'grey' ? 'Grey' : 'Dark'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          {LOGO_VARIANTS.map((v) => (
            <div key={v.variant} className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #D5DAE5' }}>
              <div className="px-6 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #E8ECF2' }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#1B2544' }}>{v.label}</p>
                  <p className="text-xs" style={{ color: '#9BA8C2' }}>{v.desc}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setPreviewItem({
                        label: v.label,
                        content: <IntegrateWiseLogo variant={v.variant} />,
                      })
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-[#F0F2F7] transition-colors"
                    style={{ color: '#5F6E93' }}
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
                  background: bgMode === 'light' ? '#fff' : bgMode === 'grey' ? '#EDF0F5' : '#1B2544'
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
          <div className="h-1 w-12 rounded-full" style={{ background: 'var(--brand-primary)' }} />
          <h3 className="text-lg font-semibold" style={{ color: '#1B2544' }}>SVG Source Files</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SVG_SOURCE_ASSETS.map((asset) => (
            <div key={asset.name} className="bg-white rounded-xl overflow-hidden group" style={{ border: '1px solid #D5DAE5' }}>
              <div
                className="flex items-center justify-center p-6 h-44 transition-colors duration-200"
                style={{
                  background: bgMode === 'light' ? '#fff' : bgMode === 'grey' ? '#EDF0F5' : '#1B2544'
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
              <div className="px-5 py-4 flex items-center justify-between" style={{ borderTop: '1px solid #E8ECF2' }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#2F3D5E' }}>{asset.label}</p>
                  <p className="text-xs font-mono" style={{ color: '#9BA8C2' }}>{asset.name}</p>
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
                    className="p-2 rounded-md hover:bg-[#F0F2F7] transition-colors"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4" style={{ color: '#7B8AAD' }} />
                  </button>
                  <a 
                    href={asset.src} 
                    download={asset.name}
                    className="p-2 rounded-md hover:bg-[#F0F2F7] transition-colors"
                    title="Download SVG"
                  >
                    <Download className="w-4 h-4" style={{ color: '#7B8AAD' }} />
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
          <div className="h-1 w-12 rounded-full" style={{ background: 'var(--brand-primary)' }} />
          <h3 className="text-lg font-semibold" style={{ color: '#1B2544' }}>Brand Motifs</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { name: 'Spine Node Line', desc: 'Connected circles and lines inspired by the logo symbol. Used for backgrounds and decorative elements.' },
            { name: 'Approval Checkpoint', desc: 'Small rounded rectangle or node used as a visual approval stage marker.' },
            { name: 'Context Card', desc: 'Soft-edged box representing structured knowledge/context blocks.' },
            { name: 'Layer Bands', desc: 'Subtle layered strips suggesting workspace, intelligence, and governance layers.' },
          ].map((motif) => (
            <div key={motif.name} className="bg-white rounded-xl p-6" style={{ border: '1px solid #D5DAE5' }}>
              <h4 className="text-sm font-semibold" style={{ color: '#1B2544' }}>{motif.name}</h4>
              <p className="text-xs mt-1" style={{ color: '#7B8AAD' }}>{motif.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-1 w-12 rounded-full" style={{ background: 'var(--brand-primary)' }} />
          <h3 className="text-lg font-semibold" style={{ color: '#1B2544' }}>Usage Guidelines</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #D5DAE5' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#E8F5EE' }}>
                <Check className="w-4 h-4" style={{ color: '#10B981' }} />
              </div>
              <h4 className="text-sm font-semibold" style={{ color: '#1B2544' }}>Do</h4>
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
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#475578' }}>
                  <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#10B981' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #D5DAE5' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#FEE8EC' }}>
                <X className="w-4 h-4" style={{ color: '#EB4379' }} />
              </div>
              <h4 className="text-sm font-semibold" style={{ color: '#1B2544' }}>Don't</h4>
            </div>
            <ul className="space-y-3">
              {[
                'Alter the logo colors outside brand palette',
                'Add effects like drop shadows or outlines',
                'Place the logo on busy or low-contrast backgrounds',
                'Rotate or skew the logo in any direction',
                'Use full-color logo on dark backgrounds',
                'Use coral/pink heavily in formal documents (seal, invoice)',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#475578' }}>
                  <X className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#EB4379' }} />
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
          <div className="h-1 w-12 rounded-full" style={{ background: 'var(--brand-primary)' }} />
          <h3 className="text-lg font-semibold" style={{ color: '#1B2544' }}>Overall Design Style</h3>
        </div>
        <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #D5DAE5' }}>
          <p className="text-sm font-semibold mb-3" style={{ color: '#1B2544' }}>Enterprise Minimal + Intelligent Systems Aesthetic</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { feel: 'Trusted enterprise platform', not: 'Not flashy startup graphics' },
              { feel: 'Modern SaaS product', not: 'Not old-fashioned corporate stationery' },
              { feel: 'Structured intelligence system', not: 'Not crowded marketing layouts' },
              { feel: 'Human-governed AI', not: 'Not generic tech templates' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg" style={{ background: '#F0F2F7' }}>
                <p className="text-sm flex items-center gap-1.5" style={{ color: '#2F3D5E' }}>
                  <Check className="w-3.5 h-3.5" style={{ color: '#10B981' }} />{item.feel}
                </p>
                <p className="text-xs flex items-center gap-1.5 mt-1" style={{ color: '#9BA8C2' }}>
                  <X className="w-3.5 h-3.5" style={{ color: '#EB4379' }} />{item.not}
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
          ? { border: '1px solid rgba(65,84,163,0.2)', background: 'rgba(65,84,163,0.05)' }
          : { border: '1px solid #E8ECF2', background: '#F0F2F7' }
      }
    >
      <p className="text-[11px] font-medium mb-1" style={{ color: '#7B8AAD' }}>{label}</p>
      <p className={`text-sm ${highlight ? 'font-semibold' : ''}`} style={{ color: highlight ? '#1B2544' : '#2F3D5E' }}>{text}</p>
    </div>
  );
}
