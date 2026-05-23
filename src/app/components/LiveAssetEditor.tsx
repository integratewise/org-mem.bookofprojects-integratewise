/**
 * Live Asset Editor - Visual editing before export
 * Based on original Figma Make implementation
 */

import { useState, useRef, useCallback } from 'react';
import {
  Download, X, Settings, Palette, Type, Grid3x3, 
  Layers, Sparkles, Save, RefreshCw, ChevronDown,
  FileImage, Printer, Smartphone, Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toPng, toSvg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { BRAND, TAGLINES, CONTACT } from '../lib/brand';
import { IntegrateWiseLogo } from './IntegrateWiseLogo';

export type AssetType = 'business-card' | 'letterhead' | 'linkedin-banner' | 'whatsapp-banner' | 'email-signature';

interface LiveAssetEditorProps {
  isOpen: boolean;
  onClose: () => void;
  assetType: AssetType;
  initialContent?: Record<string, string>;
}

interface EditorSettings {
  // Content
  headline: string;
  tagline: string;
  subtext: string;
  cta: string;
  contactInfo: string;
  
  // Style
  primaryColor: string;
  secondaryColor: string;
  backgroundType: 'solid' | 'gradient' | 'image';
  backgroundColor: string;
  gradientStart: string;
  gradientEnd: string;
  gradientAngle: number;
  
  // Layout
  logoScale: number;
  textAlign: 'left' | 'center' | 'right';
  padding: number;
  showLogo: boolean;
  showTagline: boolean;
  showContact: boolean;
}

const ASSET_CONFIGS: Record<AssetType, {
  name: string;
  width: number;
  height: number;
  unit: 'px' | 'mm';
  presets: string[];
}> = {
  'business-card': {
    name: 'Business Card',
    width: 85,
    height: 55,
    unit: 'mm',
    presets: ['Standard (85×55mm)', 'US Standard (89×51mm)', 'Square (65×65mm)']
  },
  'letterhead': {
    name: 'Letterhead',
    width: 210,
    height: 297,
    unit: 'mm',
    presets: ['A4 (210×297mm)', 'US Letter (216×279mm)']
  },
  'linkedin-banner': {
    name: 'LinkedIn Banner',
    width: 1128,
    height: 191,
    unit: 'px',
    presets: ['Company Page (1128×191)', 'Personal (1584×396)']
  },
  'whatsapp-banner': {
    name: 'WhatsApp Banner',
    width: 1080,
    height: 1080,
    unit: 'px',
    presets: ['Square (1080×1080)', 'Story (1080×1920)']
  },
  'email-signature': {
    name: 'Email Signature',
    width: 600,
    height: 200,
    unit: 'px',
    presets: ['Standard (600×200)', 'Compact (600×120)']
  }
};

const DEFAULT_SETTINGS: EditorSettings = {
  headline: BRAND.name,
  tagline: TAGLINES.descriptorExtended,
  subtext: TAGLINES.primary,
  cta: CONTACT.demo,
  contactInfo: `${CONTACT.general}\n${BRAND.website}`,
  
  primaryColor: 'var(--primary-color)',
  secondaryColor: 'var(--text-color)',
  backgroundType: 'gradient',
  backgroundColor: 'var(--paper)',
  gradientStart: 'var(--slate)',
  gradientEnd: 'var(--primary-color)',
  gradientAngle: 135,
  
  logoScale: 100,
  textAlign: 'left',
  padding: 40,
  showLogo: true,
  showTagline: true,
  showContact: true,
};

export function LiveAssetEditor({ isOpen, onClose, assetType, initialContent }: LiveAssetEditorProps) {
  const [settings, setSettings] = useState<EditorSettings>({
    ...DEFAULT_SETTINGS,
    ...initialContent,
  });
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'layout'>('content');
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  
  const config = ASSET_CONFIGS[assetType];
  
  const updateSetting = <K extends keyof EditorSettings>(key: K, value: EditorSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };
  
  const getBackgroundStyle = (): React.CSSProperties => {
    if (settings.backgroundType === 'gradient') {
      return {
        background: `linear-gradient(${settings.gradientAngle}deg, ${settings.gradientStart}, ${settings.gradientEnd})`
      };
    }
    return { background: settings.backgroundColor };
  };
  
  const exportAsPNG = async () => {
    if (!previewRef.current) return;
    
    setIsExporting(true);
    try {
      const dataUrl = await toPng(previewRef.current, { 
        pixelRatio: 3,
        cacheBust: true 
      });
      
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `IntegrateWise-${config.name.replace(/\s+/g, '-')}-${Date.now()}.png`;
      a.click();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };
  
  const exportAsPDF = async () => {
    if (!previewRef.current) return;
    
    setIsExporting(true);
    try {
      const dataUrl = await toPng(previewRef.current, { pixelRatio: 2 });
      
      const doc = new jsPDF({
        unit: config.unit === 'mm' ? 'mm' : 'px',
        format: config.unit === 'mm' ? [config.width, config.height] : undefined
      });
      
      const imgWidth = config.unit === 'mm' ? config.width : config.width / 3;
      const imgHeight = config.unit === 'mm' ? config.height : config.height / 3;
      
      doc.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save(`IntegrateWise-${config.name.replace(/\s+/g, '-')}-${Date.now()}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };
  
  const exportAsHTML = () => {
    const html = generateHTML(assetType, settings);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IntegrateWise-${config.name.replace(/\s+/g, '-')}-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const renderPreview = () => {
    const isDark = settings.backgroundType === 'gradient' || settings.backgroundColor === 'var(--slate)';
    const textColor = isDark ? 'var(--paper)' : 'var(--text-color)';
    const secondaryTextColor = isDark ? 'rgba(244,240,232,0.8)' : 'var(--text-muted)';
    
    switch (assetType) {
      case 'business-card':
        return (
          <div className="w-full h-full flex flex-col justify-between p-6" style={getBackgroundStyle()}>
            <div>
              {settings.showLogo && (
                <IntegrateWiseLogo variant="icon-only" className="h-8 w-auto mb-3" />
              )}
              <h3 className="text-lg font-bold" style={{ color: textColor }}>{settings.headline}</h3>
              {settings.showTagline && (
                <p className="text-xs mt-1" style={{ color: secondaryTextColor }}>{settings.tagline}</p>
              )}
            </div>
            <div style={{ color: secondaryTextColor }}>
              <p className="text-xs font-medium" style={{ color: textColor }}>{settings.subtext}</p>
              {settings.showContact && (
                <div className="mt-2 text-[10px] space-y-0.5">
                  {settings.contactInfo.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
        
      case 'letterhead':
        return (
          <div className="w-full h-full flex flex-col" style={getBackgroundStyle()}>
            <div className="p-8 border-b-2" style={{ borderColor: settings.primaryColor }}>
              <div className="flex justify-between items-start">
                {settings.showLogo && (
                  <IntegrateWiseLogo variant="full" className="h-10 w-auto" />
                )}
                <div className="text-right" style={{ color: textColor }}>
                  <p className="text-sm font-semibold">{BRAND.legalName}</p>
                  {settings.showTagline && (
                    <p className="text-xs mt-1" style={{ color: secondaryTextColor }}>{settings.tagline}</p>
                  )}
                  <p className="text-xs font-medium mt-2">{settings.subtext}</p>
                </div>
              </div>
            </div>
            <div className="flex-1 p-8">
              <p className="text-sm" style={{ color: secondaryTextColor }}>Date: ___________</p>
              <p className="text-sm mt-4" style={{ color: secondaryTextColor }}>Recipient:</p>
              <div className="mt-8 text-sm" style={{ color: textColor }}>
                <p>Dear ___________,</p>
                <p className="mt-4">[Your message here]</p>
              </div>
            </div>
            <div className="p-6 text-center text-[10px]" style={{ color: secondaryTextColor }}>
              {BRAND.legalName} · {BRAND.location} · {CONTACT.general}
            </div>
          </div>
        );
        
      case 'linkedin-banner':
        return (
          <div className="w-full h-full flex items-center justify-between px-12" style={getBackgroundStyle()}>
            <div style={{ color: textColor }}>
              <h2 className="text-3xl font-bold">{settings.headline}</h2>
              {settings.showTagline && (
                <p className="text-lg mt-2" style={{ color: secondaryTextColor }}>{settings.tagline}</p>
              )}
              <p className="text-sm font-medium mt-4">{settings.subtext}</p>
            </div>
            {settings.showLogo && (
              <IntegrateWiseLogo variant="icon-only" className="h-16 w-auto opacity-80" />
            )}
          </div>
        );
        
      case 'whatsapp-banner':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-8" style={getBackgroundStyle()}>
            {settings.showLogo && (
              <IntegrateWiseLogo variant="icon-only" className="h-12 w-auto mb-4" />
            )}
            <h2 className="text-2xl font-bold" style={{ color: textColor }}>{settings.headline}</h2>
            {settings.showTagline && (
              <p className="text-base mt-2" style={{ color: secondaryTextColor }}>{settings.tagline}</p>
            )}
            <p className="text-sm font-medium mt-4 px-4" style={{ color: textColor }}>{settings.subtext}</p>
            <div className="mt-6 px-6 py-2 rounded-full text-sm font-semibold" 
                 style={{ background: settings.primaryColor, color: 'var(--paper)' }}>
              {settings.cta}
            </div>
          </div>
        );
        
      case 'email-signature':
        return (
          <div className="w-full h-full flex items-center p-6" style={getBackgroundStyle()}>
            {settings.showLogo && (
              <IntegrateWiseLogo variant="icon-only" className="h-10 w-auto mr-4" />
            )}
            <div className="border-l-2 pl-4" style={{ borderColor: settings.primaryColor, color: textColor }}>
              <p className="font-bold">{settings.headline}</p>
              {settings.showTagline && (
                <p className="text-xs" style={{ color: secondaryTextColor }}>{settings.tagline}</p>
              )}
              <p className="text-xs font-medium mt-1">{settings.subtext}</p>
              {settings.showContact && (
                <div className="mt-2 text-xs space-y-0.5" style={{ color: secondaryTextColor }}>
                  {settings.contactInfo.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex overflow-hidden"
        style={{ background: 'var(--surface-raised)' }}
      >
        {/* Sidebar - Controls */}
        <div className="w-80 flex flex-col" style={{ background: 'var(--surface-default)', borderRight: '1px solid var(--border-default)' }}>
          <div className="p-4" style={{ borderBottom: '1px solid var(--border-default)' }}>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold" style={{ color: 'var(--text-strong)' }}>{config.name} Editor</h2>
              <button onClick={onClose} className="p-1 rounded" style={{ color: 'var(--text-muted)' }}>
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex" style={{ borderBottom: '1px solid var(--border-default)' }}>
            {(['content', 'style', 'layout'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-medium capitalize ${
                  activeTab === tab 
                    ? 'border-b-2' 
                    : ''
                }`}
                style={activeTab === tab ? { color: 'var(--forest)', borderColor: 'var(--forest)' } : { color: 'var(--text-muted)' }}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {activeTab === 'content' && (
              <>
                <div>
                  <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Headline</label>
                  <input
                    type="text"
                    value={settings.headline}
                    onChange={e => updateSetting('headline', e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg text-sm"
                    style={{ border: '1px solid var(--border-default)', color: 'var(--text-color)', background: 'var(--surface-raised)' }}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Tagline</label>
                  <textarea
                    value={settings.tagline}
                    onChange={e => updateSetting('tagline', e.target.value)}
                    rows={2}
                    className="w-full mt-1 px-3 py-2 rounded-lg text-sm"
                    style={{ border: '1px solid var(--border-default)', color: 'var(--text-color)', background: 'var(--surface-raised)' }}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Subtext/CTA</label>
                  <input
                    type="text"
                    value={settings.subtext}
                    onChange={e => updateSetting('subtext', e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg text-sm"
                    style={{ border: '1px solid var(--border-default)', color: 'var(--text-color)', background: 'var(--surface-raised)' }}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Website/CTA Link</label>
                  <input
                    type="text"
                    value={settings.cta}
                    onChange={e => updateSetting('cta', e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg text-sm"
                    style={{ border: '1px solid var(--border-default)', color: 'var(--text-color)', background: 'var(--surface-raised)' }}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Contact Info (one per line)</label>
                  <textarea
                    value={settings.contactInfo}
                    onChange={e => updateSetting('contactInfo', e.target.value)}
                    rows={3}
                    className="w-full mt-1 px-3 py-2 rounded-lg text-sm"
                    style={{ border: '1px solid var(--border-default)', color: 'var(--text-color)', background: 'var(--surface-raised)' }}
                  />
                </div>
              </>
            )}
            
            {activeTab === 'style' && (
              <>
                <div>
                  <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Background Type</label>
                  <select
                    value={settings.backgroundType}
                    onChange={e => updateSetting('backgroundType', e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 rounded-lg text-sm"
                    style={{ border: '1px solid var(--border-default)', color: 'var(--text-color)', background: 'var(--surface-raised)' }}
                  >
                    <option value="solid">Solid Color</option>
                    <option value="gradient">Gradient</option>
                  </select>
                </div>
                
                {settings.backgroundType === 'solid' ? (
                  <div>
                    <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Background Color</label>
                    <input
                      type="color"
                      value={settings.backgroundColor}
                      onChange={e => updateSetting('backgroundColor', e.target.value)}
                      className="w-full mt-1 h-10 rounded-lg"
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Gradient Start</label>
                      <input
                        type="color"
                        value={settings.gradientStart}
                        onChange={e => updateSetting('gradientStart', e.target.value)}
                        className="w-full mt-1 h-10 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Gradient End</label>
                      <input
                        type="color"
                        value={settings.gradientEnd}
                        onChange={e => updateSetting('gradientEnd', e.target.value)}
                        className="w-full mt-1 h-10 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Angle: {settings.gradientAngle}°</label>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={settings.gradientAngle}
                        onChange={e => updateSetting('gradientAngle', parseInt(e.target.value))}
                        className="w-full mt-1"
                      />
                    </div>
                  </>
                )}
                
                <div>
                  <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Primary Color</label>
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={e => updateSetting('primaryColor', e.target.value)}
                    className="w-full mt-1 h-10 rounded-lg"
                  />
                </div>
              </>
            )}
            
            {activeTab === 'layout' && (
              <>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.showLogo}
                      onChange={e => updateSetting('showLogo', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Show Logo</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.showTagline}
                      onChange={e => updateSetting('showTagline', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Show Tagline</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.showContact}
                      onChange={e => updateSetting('showContact', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Show Contact Info</span>
                  </label>
                </div>
                
                <div>
                  <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Text Align</label>
                  <select
                    value={settings.textAlign}
                    onChange={e => updateSetting('textAlign', e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 rounded-lg text-sm"
                    style={{ border: '1px solid var(--border-default)', color: 'var(--text-color)', background: 'var(--surface-raised)' }}
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Padding: {settings.padding}px</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.padding}
                    onChange={e => updateSetting('padding', parseInt(e.target.value))}
                    className="w-full mt-1"
                  />
                </div>
              </>
            )}
          </div>
          
          {/* Export Buttons */}
          <div className="p-4 space-y-2" style={{ borderTop: '1px solid var(--border-default)' }}>
            <button
              onClick={exportAsPNG}
              disabled={isExporting}
              className="w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ background: 'var(--forest)', color: 'var(--paper)' }}
            >
              <FileImage className="w-4 h-4" />
              {isExporting ? 'Exporting...' : 'Export as PNG'}
            </button>
            <div className="flex gap-2">
              <button
                onClick={exportAsPDF}
                className="flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                style={{ background: 'var(--surface-2)', color: 'var(--text-color)' }}
              >
                <Printer className="w-4 h-4" />
                PDF
              </button>
              {assetType === 'email-signature' && (
                <button
                  onClick={exportAsHTML}
                  className="flex-1 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                style={{ background: 'var(--surface-2)', color: 'var(--text-color)' }}
                >
                  <Share2 className="w-4 h-4" />
                  HTML
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Preview Area */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-auto" style={{ background: 'var(--surface-subtle)' }}>
          <div className="rounded-lg shadow-xl overflow-hidden" style={{ background: 'var(--paper)',
            width: config.unit === 'mm' ? `${config.width * 3}px` : `${config.width / 2}px`,
            height: config.unit === 'mm' ? `${config.height * 3}px` : `${config.height / 2}px`,
            maxWidth: '100%',
            maxHeight: '100%'
          }}>
            <div 
              ref={previewRef}
              className="w-full h-full"
              style={{
                width: config.width + (config.unit === 'mm' ? 'mm' : 'px'),
                height: config.height + (config.unit === 'mm' ? 'mm' : 'px'),
                transform: `scale(${config.unit === 'mm' ? 3 : 0.5})`,
                transformOrigin: 'top left'
              }}
            >
              {renderPreview()}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function generateHTML(assetType: AssetType, settings: EditorSettings): string {
  // Generate email signature HTML
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; color: ${settings.backgroundType === 'gradient' ? 'var(--paper)' : 'var(--text-color)'};">
    <tr>
      <td style="padding: 10px;">
        <strong>${settings.headline}</strong><br>
        <span style="color: var(--text-muted); font-size: 12px;">${settings.tagline}</span><br>
        <span style="font-size: 12px; color: ${settings.primaryColor};">${settings.subtext}</span>
      </td>
    </tr>
    <tr>
      <td style="padding: 5px 10px; font-size: 11px; color: var(--text-muted);">
        ${settings.contactInfo.replace(/\n/g, '<br>')}
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export default LiveAssetEditor;
