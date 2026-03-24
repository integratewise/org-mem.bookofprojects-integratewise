import { useState, useCallback, useRef } from 'react';
import {
  Download,
  Settings,
  Palette,
  Grid3x3,
  Type,
  Layers,
  Sparkles,
  Save,
  RefreshCw,
  X,
  Check,
  ChevronDown,
  FileImage,
  FileCode,
} from 'lucide-react';
import { IntegrateWiseLogo } from './IntegrateWiseLogo';
import { toPng, toSvg } from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface AdvancedAssetEditorProps {
  open: boolean;
  onClose: () => void;
}

type ExportPreset = {
  id: string;
  name: string;
  width: number;
  height: number;
  description: string;
};

const EXPORT_PRESETS: ExportPreset[] = [
  { id: 'twitter-post', name: 'Twitter Post', width: 1200, height: 675, description: '1200 x 675 px' },
  { id: 'twitter-header', name: 'Twitter Header', width: 1500, height: 500, description: '1500 x 500 px' },
  { id: 'linkedin-post', name: 'LinkedIn Post', width: 1200, height: 627, description: '1200 x 627 px' },
  { id: 'linkedin-banner', name: 'LinkedIn Banner', width: 1584, height: 396, description: '1584 x 396 px' },
  { id: 'facebook-post', name: 'Facebook Post', width: 1200, height: 630, description: '1200 x 630 px' },
  { id: 'instagram-post', name: 'Instagram Post', width: 1080, height: 1080, description: '1080 x 1080 px' },
  { id: 'instagram-story', name: 'Instagram Story', width: 1080, height: 1920, description: '1080 x 1920 px' },
  { id: 'og-image', name: 'Open Graph Image', width: 1200, height: 630, description: '1200 x 630 px' },
  { id: 'favicon-512', name: 'Favicon 512px', width: 512, height: 512, description: '512 x 512 px' },
  { id: 'favicon-192', name: 'Favicon 192px', width: 192, height: 192, description: '192 x 192 px' },
  { id: 'print-a4', name: 'Print A4', width: 2480, height: 3508, description: 'A4 at 300dpi' },
  { id: 'print-letter', name: 'Print Letter', width: 2550, height: 3300, description: 'Letter at 300dpi' },
];

export function AdvancedAssetEditor({ open, onClose }: AdvancedAssetEditorProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'colors' | 'dimensions' | 'effects' | 'export'>('basic');
  
  // Basic controls
  const [logoVariant, setLogoVariant] = useState<'full' | 'compact' | 'icon-only'>('full');
  const [colorVariant, setColorVariant] = useState<'default' | 'white' | 'monochrome-dark' | 'monochrome-white' | 'blue-only' | 'print-safe-black'>('default');
  
  // Custom colors
  const [customPrimaryColor, setCustomPrimaryColor] = useState('#4154A3');
  const [customAccentColor, setCustomAccentColor] = useState('#EB4379');
  const [useCustomColors, setUseCustomColors] = useState(false);
  
  // Background settings
  const [bgType, setBgType] = useState<'solid' | 'gradient' | 'transparent'>('solid');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [bgGradientStart, setBgGradientStart] = useState('#EDF0F5');
  const [bgGradientEnd, setBgGradientEnd] = useState('#ffffff');
  const [bgGradientAngle, setBgGradientAngle] = useState(135);
  
  // Dimensions
  const [scale, setScale] = useState(100);
  const [paddingX, setPaddingX] = useState(64);
  const [paddingY, setPaddingY] = useState(64);
  const [customWidth, setCustomWidth] = useState(800);
  const [customHeight, setCustomHeight] = useState(400);
  
  // Effects
  const [opacity, setOpacity] = useState(100);
  const [shadowEnabled, setShadowEnabled] = useState(false);
  const [shadowBlur, setShadowBlur] = useState(20);
  const [shadowColor, setShadowColor] = useState('rgba(0,0,0,0.1)');
  
  // Export settings
  const [selectedPresets, setSelectedPresets] = useState<string[]>([]);
  const [exportQuality, setExportQuality] = useState(95);
  const [includeTransparent, setIncludeTransparent] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);

  const resetToDefaults = useCallback(() => {
    setLogoVariant('full');
    setColorVariant('default');
    setUseCustomColors(false);
    setBgType('solid');
    setBgColor('#ffffff');
    setScale(100);
    setPaddingX(64);
    setPaddingY(64);
    setOpacity(100);
    setShadowEnabled(false);
  }, []);

  const getBackgroundStyle = (): React.CSSProperties => {
    if (bgType === 'transparent') {
      return {
        background: 'repeating-conic-gradient(#D5DAE5 0% 25%, transparent 0% 50%) 50% / 20px 20px',
        backgroundColor: '#ffffff'
      };
    }
    if (bgType === 'gradient') {
      return {
        background: `linear-gradient(${bgGradientAngle}deg, ${bgGradientStart}, ${bgGradientEnd})`
      };
    }
    return { background: bgColor };
  };

  const handleBatchExport = async () => {
    if (selectedPresets.length === 0) {
      alert('Please select at least one export preset');
      return;
    }

    setIsExporting(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder('IntegrateWise_Assets');

      for (const presetId of selectedPresets) {
        const preset = EXPORT_PRESETS.find(p => p.id === presetId);
        if (!preset) continue;

        // Create a temporary container with the preset dimensions
        const tempContainer = document.createElement('div');
        tempContainer.style.width = `${preset.width}px`;
        tempContainer.style.height = `${preset.height}px`;
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.display = 'flex';
        tempContainer.style.alignItems = 'center';
        tempContainer.style.justifyContent = 'center';
        tempContainer.style.padding = `${paddingY}px ${paddingX}px`;
        Object.assign(tempContainer.style, getBackgroundStyle());
        
        // Clone the logo
        const logoClone = editorRef.current?.querySelector('#editor-logo')?.cloneNode(true) as HTMLElement;
        if (logoClone) {
          tempContainer.appendChild(logoClone);
          document.body.appendChild(tempContainer);

          // Export as PNG
          const dataUrl = await toPng(tempContainer, { 
            pixelRatio: 2,
            quality: exportQuality / 100,
            cacheBust: true 
          });
          
          const blob = await (await fetch(dataUrl)).blob();
          folder?.file(`${preset.id}.png`, blob);

          // Also export transparent version if enabled
          if (includeTransparent && bgType !== 'transparent') {
            tempContainer.style.background = 'transparent';
            const transparentDataUrl = await toPng(tempContainer, { 
              pixelRatio: 2,
              quality: exportQuality / 100,
              cacheBust: true 
            });
            const transparentBlob = await (await fetch(transparentDataUrl)).blob();
            folder?.file(`${preset.id}_transparent.png`, transparentBlob);
          }

          document.body.removeChild(tempContainer);
        }
      }

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `IntegrateWise_Batch_Export_${Date.now()}.zip`);
    } catch (err) {
      console.error('Batch export failed', err);
      alert('Failed to export assets. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleQuickExport = async (format: 'png' | 'svg') => {
    const node = editorRef.current?.querySelector('#editor-canvas') as HTMLElement;
    if (!node) return;

    try {
      let dataUrl = '';
      if (format === 'svg') {
        dataUrl = await toSvg(node, { cacheBust: true });
      } else {
        dataUrl = await toPng(node, { pixelRatio: 3, cacheBust: true });
      }

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `integratewise-logo-${Date.now()}.${format}`;
      a.click();
    } catch (err) {
      console.error('Export failed', err);
      alert('Failed to export. Please try again.');
    }
  };

  const togglePreset = (presetId: string) => {
    setSelectedPresets(prev =>
      prev.includes(presetId)
        ? prev.filter(id => id !== presetId)
        : [...prev, presetId]
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-[95vw] max-w-7xl max-h-[95vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #D5DAE5' }}>
          <div>
            <h2 className="text-lg font-bold" style={{ color: '#1B2544' }}>Advanced Asset Editor</h2>
            <p className="text-xs" style={{ color: '#9BA8C2' }}>Comprehensive brand asset customization & batch export</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetToDefaults}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
              style={{ border: '1px solid #D5DAE5', color: '#5F6E93' }}
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[#F0F2F7]">
              <X className="w-5 h-5" style={{ color: '#5F6E93' }} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Controls */}
          <div className="w-80 overflow-y-auto" style={{ borderRight: '1px solid #E8ECF2', background: '#F8FAFC' }}>
            {/* Tabs */}
            <div className="flex flex-wrap gap-1 p-3" style={{ borderBottom: '1px solid #E8ECF2' }}>
              {[
                { id: 'basic', label: 'Basic', icon: Settings },
                { id: 'colors', label: 'Colors', icon: Palette },
                { id: 'dimensions', label: 'Size', icon: Grid3x3 },
                { id: 'effects', label: 'Effects', icon: Sparkles },
                { id: 'export', label: 'Export', icon: Download },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                  style={
                    activeTab === tab.id
                      ? { background: '#4154A3', color: 'white' }
                      : { background: 'white', color: '#5F6E93', border: '1px solid #D5DAE5' }
                  }
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-4 space-y-4">
              {activeTab === 'basic' && (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-brand-gray-700">Logo Variant</label>
                    {(['full', 'compact', 'icon-only'] as const).map(variant => (
                      <button
                        key={variant}
                        onClick={() => setLogoVariant(variant)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          logoVariant === variant
                            ? 'bg-brand-primary text-white'
                            : 'bg-white text-brand-gray-700 border border-brand-gray-200'
                        }`}
                      >
                        {variant === 'full' ? 'Full Logo' : variant === 'compact' ? 'Compact' : 'Icon Only'}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2">
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
                          onClick={() => setColorVariant(theme.id as any)}
                          className={`text-left px-2 py-1.5 rounded-md text-xs transition-colors ${
                            colorVariant === theme.id
                              ? 'bg-brand-primary text-white'
                              : 'bg-white text-brand-gray-700 border border-brand-gray-200'
                          }`}
                        >
                          {theme.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'colors' && (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="use-custom"
                        checked={useCustomColors}
                        onChange={(e) => setUseCustomColors(e.target.checked)}
                        className="w-4 h-4 rounded"
                      />
                      <label htmlFor="use-custom" className="text-sm font-medium text-brand-gray-700">
                        Use Custom Colors
                      </label>
                    </div>
                    {useCustomColors && (
                      <div className="space-y-3 p-3 rounded-lg" style={{ background: '#F0F2F7' }}>
                        <div>
                          <label className="text-xs font-medium text-brand-gray-700">Primary Color</label>
                          <div className="flex items-center gap-2 mt-1">
                            <input
                              type="color"
                              value={customPrimaryColor}
                              onChange={(e) => setCustomPrimaryColor(e.target.value)}
                              className="w-12 h-8 rounded border border-brand-gray-300"
                            />
                            <input
                              type="text"
                              value={customPrimaryColor}
                              onChange={(e) => setCustomPrimaryColor(e.target.value)}
                              className="flex-1 px-2 py-1 text-xs rounded border border-brand-gray-300"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-brand-gray-700">Accent Color</label>
                          <div className="flex items-center gap-2 mt-1">
                            <input
                              type="color"
                              value={customAccentColor}
                              onChange={(e) => setCustomAccentColor(e.target.value)}
                              className="w-12 h-8 rounded border border-brand-gray-300"
                            />
                            <input
                              type="text"
                              value={customAccentColor}
                              onChange={(e) => setCustomAccentColor(e.target.value)}
                              className="flex-1 px-2 py-1 text-xs rounded border border-brand-gray-300"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-medium text-brand-gray-700">Background Type</label>
                    <div className="flex gap-2">
                      {(['solid', 'gradient', 'transparent'] as const).map(type => (
                        <button
                          key={type}
                          onClick={() => setBgType(type)}
                          className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                            bgType === type
                              ? 'bg-brand-primary text-white'
                              : 'bg-white text-brand-gray-700 border border-brand-gray-200'
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>

                    {bgType === 'solid' && (
                      <div>
                        <label className="text-xs font-medium text-brand-gray-700">Background Color</label>
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="w-12 h-8 rounded border border-brand-gray-300"
                          />
                          <input
                            type="text"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="flex-1 px-2 py-1 text-xs rounded border border-brand-gray-300"
                          />
                        </div>
                      </div>
                    )}

                    {bgType === 'gradient' && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-medium text-brand-gray-700">Start Color</label>
                          <div className="flex items-center gap-2 mt-1">
                            <input
                              type="color"
                              value={bgGradientStart}
                              onChange={(e) => setBgGradientStart(e.target.value)}
                              className="w-12 h-8 rounded border border-brand-gray-300"
                            />
                            <input
                              type="text"
                              value={bgGradientStart}
                              onChange={(e) => setBgGradientStart(e.target.value)}
                              className="flex-1 px-2 py-1 text-xs rounded border border-brand-gray-300"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-brand-gray-700">End Color</label>
                          <div className="flex items-center gap-2 mt-1">
                            <input
                              type="color"
                              value={bgGradientEnd}
                              onChange={(e) => setBgGradientEnd(e.target.value)}
                              className="w-12 h-8 rounded border border-brand-gray-300"
                            />
                            <input
                              type="text"
                              value={bgGradientEnd}
                              onChange={(e) => setBgGradientEnd(e.target.value)}
                              className="flex-1 px-2 py-1 text-xs rounded border border-brand-gray-300"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-brand-gray-700">
                            Angle: {bgGradientAngle}°
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="360"
                            value={bgGradientAngle}
                            onChange={(e) => setBgGradientAngle(Number(e.target.value))}
                            className="w-full mt-1"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {activeTab === 'dimensions' && (
                <>
                  <div>
                    <label className="text-xs font-medium text-brand-gray-700">
                      Scale: {scale}%
                    </label>
                    <input
                      type="range"
                      min="25"
                      max="200"
                      value={scale}
                      onChange={(e) => setScale(Number(e.target.value))}
                      className="w-full mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-brand-gray-700">
                      Padding X: {paddingX}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={paddingX}
                      onChange={(e) => setPaddingX(Number(e.target.value))}
                      className="w-full mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-brand-gray-700">
                      Padding Y: {paddingY}px
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={paddingY}
                      onChange={(e) => setPaddingY(Number(e.target.value))}
                      className="w-full mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-brand-gray-700">Width (px)</label>
                      <input
                        type="number"
                        value={customWidth}
                        onChange={(e) => setCustomWidth(Number(e.target.value))}
                        className="w-full px-2 py-1.5 text-sm rounded border border-brand-gray-300 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-brand-gray-700">Height (px)</label>
                      <input
                        type="number"
                        value={customHeight}
                        onChange={(e) => setCustomHeight(Number(e.target.value))}
                        className="w-full px-2 py-1.5 text-sm rounded border border-brand-gray-300 mt-1"
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'effects' && (
                <>
                  <div>
                    <label className="text-xs font-medium text-brand-gray-700">
                      Opacity: {opacity}%
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={opacity}
                      onChange={(e) => setOpacity(Number(e.target.value))}
                      className="w-full mt-1"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="shadow-enabled"
                        checked={shadowEnabled}
                        onChange={(e) => setShadowEnabled(e.target.checked)}
                        className="w-4 h-4 rounded"
                      />
                      <label htmlFor="shadow-enabled" className="text-sm font-medium text-brand-gray-700">
                        Enable Shadow
                      </label>
                    </div>

                    {shadowEnabled && (
                      <div className="space-y-3 p-3 rounded-lg" style={{ background: '#F0F2F7' }}>
                        <div>
                          <label className="text-xs font-medium text-brand-gray-700">
                            Blur: {shadowBlur}px
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={shadowBlur}
                            onChange={(e) => setShadowBlur(Number(e.target.value))}
                            className="w-full mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-brand-gray-700">Shadow Color</label>
                          <input
                            type="text"
                            value={shadowColor}
                            onChange={(e) => setShadowColor(e.target.value)}
                            className="w-full px-2 py-1.5 text-xs rounded border border-brand-gray-300 mt-1"
                            placeholder="rgba(0,0,0,0.1)"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {activeTab === 'export' && (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-brand-gray-700">Quick Export</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleQuickExport('png')}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium bg-brand-primary text-white hover:opacity-90"
                      >
                        <FileImage className="w-3.5 h-3.5" /> PNG
                      </button>
                      <button
                        onClick={() => handleQuickExport('svg')}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium bg-brand-primary text-white hover:opacity-90"
                      >
                        <FileCode className="w-3.5 h-3.5" /> SVG
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-brand-gray-700">
                      Export Quality: {exportQuality}%
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={exportQuality}
                      onChange={(e) => setExportQuality(Number(e.target.value))}
                      className="w-full mt-1"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="include-transparent"
                      checked={includeTransparent}
                      onChange={(e) => setIncludeTransparent(e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <label htmlFor="include-transparent" className="text-xs text-brand-gray-700">
                      Include transparent versions
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-brand-gray-700">
                      Batch Export Presets ({selectedPresets.length} selected)
                    </label>
                    <div className="space-y-1.5 max-h-64 overflow-y-auto p-2 rounded-lg" style={{ background: '#F0F2F7' }}>
                      {EXPORT_PRESETS.map(preset => (
                        <button
                          key={preset.id}
                          onClick={() => togglePreset(preset.id)}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-md text-xs transition-colors"
                          style={
                            selectedPresets.includes(preset.id)
                              ? { background: '#4154A3', color: 'white' }
                              : { background: 'white', color: '#5F6E93' }
                          }
                        >
                          <span className="font-medium">{preset.name}</span>
                          <span className="text-xs opacity-75">{preset.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleBatchExport}
                    disabled={isExporting || selectedPresets.length === 0}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: '#EB4379', color: 'white' }}
                  >
                    {isExporting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Exporting...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Export {selectedPresets.length} Preset{selectedPresets.length !== 1 ? 's' : ''}
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="flex-1 overflow-auto" ref={editorRef}>
            <div className="min-h-full flex items-center justify-center p-8">
              <div
                id="editor-canvas"
                className="transition-all duration-300"
                style={{
                  width: `${customWidth}px`,
                  height: `${customHeight}px`,
                  ...getBackgroundStyle(),
                  padding: `${paddingY}px ${paddingX}px`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: shadowEnabled ? `0 0 ${shadowBlur}px ${shadowColor}` : 'none',
                  opacity: opacity / 100,
                }}
              >
                <div id="editor-logo" style={{ transform: `scale(${scale / 100})` }}>
                  <IntegrateWiseLogo
                    variant={logoVariant}
                    colorVariant={colorVariant}
                    primaryColor={useCustomColors ? customPrimaryColor : undefined}
                    accentColor={useCustomColors ? customAccentColor : undefined}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
