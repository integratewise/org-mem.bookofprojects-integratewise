/**
 * Product Gallery Page - All brand assets with download
 * Images, logos, banners, and marketing materials
 */

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, Image, FileImage, ZoomIn, X, 
  Grid, List, Search, Filter, Check, Copy,
  FileText, Package, Palette, Share2
} from 'lucide-react';
import { toPng, toSvg } from 'html-to-image';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { BRAND, TAGLINES } from '../../lib/brand';
import { IntegrateWiseLogo } from '../IntegrateWiseLogo';
import { LiveAssetEditor, AssetType } from '../LiveAssetEditor';

// Asset categories
const CATEGORIES = [
  { id: 'all', label: 'All Assets', icon: Package },
  { id: 'logos', label: 'Logos', icon: Palette },
  { id: 'banners', label: 'Banners', icon: Image },
  { id: 'stationery', label: 'Stationery', icon: FileText },
  { id: 'social', label: 'Social Media', icon: Share2 },
] as const;

type CategoryId = typeof CATEGORIES[number]['id'];

// Gallery items
interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  type: 'svg' | 'component' | 'editable';
  src?: string;
  component?: React.ReactNode;
  editableType?: AssetType;
  formats: string[];
  size: string;
  tags: string[];
}

// Import SVG assets
import logoFrame1 from '../../../imports/Frame_1.svg';
import logoFrame1v2 from '../../../imports/Frame_1-1.svg';
import logoFrame1v3 from '../../../imports/Frame_1-2.svg';
import logoFrame4 from '../../../imports/Frame_4.svg';
import logoIconSvg from '../../../imports/Frame_4-1.svg';

export function ProductGalleryPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorAssetType, setEditorAssetType] = useState<AssetType>('business-card');
  const [downloading, setDownloading] = useState<string | null>(null);
  
  const previewRef = useRef<HTMLDivElement>(null);

  // Gallery items data
  const galleryItems: GalleryItem[] = [
    // Logos
    {
      id: 'logo-full-color',
      title: 'Full Logo - Color',
      description: 'Primary logo with full color scheme',
      category: 'logos',
      type: 'component',
      component: <IntegrateWiseLogo variant="full" className="w-full h-full" />,
      formats: ['SVG', 'PNG', 'PDF'],
      size: '1200×400px',
      tags: ['logo', 'primary', 'color']
    },
    {
      id: 'logo-compact',
      title: 'Compact Logo',
      description: 'Logo mark + wordmark without descriptor',
      category: 'logos',
      type: 'component',
      component: <IntegrateWiseLogo variant="compact" className="w-full h-full" />,
      formats: ['SVG', 'PNG', 'PDF'],
      size: '800×200px',
      tags: ['logo', 'compact']
    },
    {
      id: 'logo-icon',
      title: 'Icon Only',
      description: 'Logo mark for favicons and avatars',
      category: 'logos',
      type: 'component',
      component: <IntegrateWiseLogo variant="icon-only" className="w-full h-full" />,
      formats: ['SVG', 'PNG', 'ICO'],
      size: '512×512px',
      tags: ['logo', 'icon', 'favicon']
    },
    {
      id: 'logo-frame-1',
      title: 'Logo Frame Original',
      description: 'Original Figma frame export',
      category: 'logos',
      type: 'svg',
      src: logoFrame1,
      formats: ['SVG'],
      size: 'Vector',
      tags: ['logo', 'original', 'figma']
    },
    {
      id: 'logo-frame-4',
      title: 'Icon Mark Original',
      description: 'Original icon mark from Figma',
      category: 'logos',
      type: 'svg',
      src: logoFrame4,
      formats: ['SVG'],
      size: 'Vector',
      tags: ['logo', 'icon', 'figma']
    },
    
    // Banners
    {
      id: 'banner-linkedin',
      title: 'LinkedIn Company Banner',
      description: 'Professional banner for LinkedIn company page',
      category: 'banners',
      type: 'editable',
      editableType: 'linkedin-banner',
      formats: ['PNG', 'JPG'],
      size: '1128×191px',
      tags: ['banner', 'linkedin', 'social']
    },
    {
      id: 'banner-whatsapp',
      title: 'WhatsApp Business Banner',
      description: 'Square banner for WhatsApp Business profile',
      category: 'banners',
      type: 'editable',
      editableType: 'whatsapp-banner',
      formats: ['PNG', 'JPG'],
      size: '1080×1080px',
      tags: ['banner', 'whatsapp', 'social']
    },
    
    // Stationery
    {
      id: 'business-card',
      title: 'Business Card',
      description: 'Professional business card design',
      category: 'stationery',
      type: 'editable',
      editableType: 'business-card',
      formats: ['PDF', 'PNG'],
      size: '85×55mm',
      tags: ['stationery', 'print', 'card']
    },
    {
      id: 'letterhead',
      title: 'Letterhead Template',
      description: 'A4 letterhead for official documents',
      category: 'stationery',
      type: 'editable',
      editableType: 'letterhead',
      formats: ['PDF', 'DOCX'],
      size: 'A4 (210×297mm)',
      tags: ['stationery', 'print', 'document']
    },
    {
      id: 'email-signature',
      title: 'Email Signature',
      description: 'HTML email signature template',
      category: 'stationery',
      type: 'editable',
      editableType: 'email-signature',
      formats: ['HTML', 'TXT'],
      size: '600×200px',
      tags: ['stationery', 'digital', 'email']
    },
    
    // Social Media
    {
      id: 'social-post-linkedin',
      title: 'LinkedIn Post Template',
      description: '1200×627px post template',
      category: 'social',
      type: 'editable',
      editableType: 'linkedin-banner',
      formats: ['PNG', 'JPG'],
      size: '1200×627px',
      tags: ['social', 'linkedin', 'post']
    },
    {
      id: 'social-story',
      title: 'Instagram/WhatsApp Story',
      description: 'Vertical story format template',
      category: 'social',
      type: 'editable',
      editableType: 'whatsapp-banner',
      formats: ['PNG', 'JPG'],
      size: '1080×1920px',
      tags: ['social', 'story', 'instagram', 'whatsapp']
    },
  ];

  // Filter items
  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Download handlers
  const downloadAsPNG = async (item: GalleryItem) => {
    if (item.type === 'svg' && item.src) {
      // Convert SVG to PNG
      const img = new Image();
      img.src = item.src;
      await new Promise(resolve => { img.onload = resolve; });
      
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 400;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, 1200, 400);
      
      canvas.toBlob(blob => {
        if (blob) saveAs(blob, `IntegrateWise-${item.id}.png`);
      });
    } else if (previewRef.current) {
      const dataUrl = await toPng(previewRef.current, { pixelRatio: 3 });
      saveAs(dataUrl, `IntegrateWise-${item.id}.png`);
    }
  };

  const downloadAsSVG = async (item: GalleryItem) => {
    if (item.type === 'svg' && item.src) {
      const response = await fetch(item.src);
      const svgText = await response.text();
      const blob = new Blob([svgText], { type: 'image/svg+xml' });
      saveAs(blob, `IntegrateWise-${item.id}.svg`);
    }
  };

  const downloadAll = async () => {
    setDownloading('all');
    const zip = new JSZip();
    const logosFolder = zip.folder('logos');
    const bannersFolder = zip.folder('banners');
    const stationeryFolder = zip.folder('stationery');
    
    // Add SVG files
    const svgFiles = [
      { name: 'logo-frame.svg', src: logoFrame1 },
      { name: 'logo-icon.svg', src: logoIconSvg },
    ];
    
    for (const file of svgFiles) {
      const response = await fetch(file.src);
      const text = await response.text();
      logosFolder?.file(file.name, text);
    }
    
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `IntegrateWise-Brand-Assets-${Date.now()}.zip`);
    setDownloading(null);
  };

  const openEditor = (item: GalleryItem) => {
    if (item.editableType) {
      setEditorAssetType(item.editableType);
      setEditorOpen(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Product Gallery</h1>
          <p className="text-gray-500 mt-2">
            All brand assets in one place. Preview, customize, and download.
          </p>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        {/* Download All */}
        <button
          onClick={downloadAll}
          disabled={downloading === 'all'}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-800 disabled:opacity-50"
        >
          <Package className="w-4 h-4" />
          {downloading === 'all' ? 'Preparing...' : 'Download All'}
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <cat.icon className="w-4 h-4" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing {filteredItems.length} of {galleryItems.length} assets
      </p>

      {/* Gallery Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              {/* Preview */}
              <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
                {item.type === 'svg' && item.src ? (
                  <img src={item.src} alt={item.title} className="max-w-full max-h-full object-contain" />
                ) : item.type === 'component' && item.component ? (
                  <div className="w-full h-full flex items-center justify-center overflow-hidden scale-75">
                    {item.component}
                  </div>
                ) : (
                  <div className="text-center">
                    <Image className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <span className="text-xs text-gray-400">Click to customize</span>
                  </div>
                )}
              </div>
              
              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-400">{item.size}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {item.formats[0]}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                {item.type === 'svg' && item.src ? (
                  <img src={item.src} alt={item.title} className="max-w-full max-h-full p-2" />
                ) : (
                  <FileImage className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <div className="flex gap-2 mt-1">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-xs text-gray-400">#{tag}</span>
                  ))}
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm text-gray-500">{item.size}</p>
                <p className="text-xs text-gray-400">{item.formats.join(', ')}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20">
          <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No assets found matching your search.</p>
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedItem.title}</h2>
                  <p className="text-sm text-gray-500">{selectedItem.description}</p>
                </div>
                <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preview */}
              <div className="flex-1 overflow-auto p-8 bg-gray-50">
                <div 
                  ref={previewRef}
                  className="bg-white rounded-xl shadow-lg mx-auto"
                  style={{ 
                    width: selectedItem.category === 'logos' ? '400px' : '600px',
                    maxWidth: '100%'
                  }}
                >
                  {selectedItem.type === 'svg' && selectedItem.src ? (
                    <img 
                      src={selectedItem.src} 
                      alt={selectedItem.title} 
                      className="w-full h-auto"
                    />
                  ) : selectedItem.type === 'component' && selectedItem.component ? (
                    <div className="p-8">
                      {selectedItem.component}
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center text-white p-8">
                      <div className="text-center">
                        <IntegrateWiseLogo variant="icon-only" className="h-16 w-auto mx-auto mb-4" />
                        <h3 className="text-2xl font-bold">{BRAND.name}</h3>
                        <p className="mt-2">{TAGLINES.descriptorExtended}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-wrap gap-3">
                  {selectedItem.type === 'editable' ? (
                    <button
                      onClick={() => { setSelectedItem(null); openEditor(selectedItem); }}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-blue-700"
                    >
                      <Palette className="w-5 h-5" />
                      Customize & Export
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => downloadAsPNG(selectedItem)}
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        PNG
                      </button>
                      {selectedItem.formats.includes('SVG') && (
                        <button
                          onClick={() => downloadAsSVG(selectedItem)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2"
                        >
                          <FileImage className="w-4 h-4" />
                          SVG
                        </button>
                      )}
                    </>
                  )}
                  
                  {/* Format tags */}
                  <div className="flex gap-2 ml-auto">
                    {selectedItem.formats.map(format => (
                      <span key={format} className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm text-gray-600">
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Live Editor */}
      <LiveAssetEditor
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        assetType={editorAssetType}
      />
    </div>
  );
}

export default ProductGalleryPage;
