import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Presentation, Download, Copy, Check, ChevronLeft, ChevronRight,
  Sparkles, Edit2, Save, X, Plus, Trash2, RotateCcw, Play, Pause,
  FileText, Image as ImageIcon, Type, Layout, Grid
} from 'lucide-react';
import { toPng, toBlob } from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { loadJson, saveJson } from '../../lib/storage';
import { copyToClipboard } from '../../utils/clipboard';

// Default Presentation Slides
const DEFAULT_SLIDES = [
  {
    id: '1',
    type: 'title',
    title: "IntegrateWise",
    subtitle: "Knowledge Workspace Over the Spine",
    tagline: "AI Thinks in Context — and Waits for Approval",
    layout: 'center'
  },
  {
    id: '2',
    type: 'problem',
    title: "The $8M Lesson",
    content: "A support ticket spiked. Product adoption dropped. An executive warning sat in a personal note.\n\nThree signals. Three systems. Zero connection.\n\nThe account was nearly lost.",
    stat: "$8M",
    statLabel: "At Risk",
    layout: 'split'
  },
  {
    id: '3',
    type: 'solution',
    title: "The Knowledge Workspace",
    content: "Where your entire tech stack connects into one Adaptive Spine. AI surfaces what matters. Humans approve every action.",
    features: [
      "Unified Intelligence Layer",
      "Context-Aware AI",
      "Human-Governed Execution",
      "Continuous Learning"
    ],
    layout: 'features'
  },
  {
    id: '4',
    type: 'architecture',
    title: "The Spine (SSOT)",
    content: "Single Source of Truth connecting tools, context, and decisions across the workspace.",
    layers: [
      { name: "Workspace Layer", desc: "Human interface to the Spine" },
      { name: "Cognitive Layer", desc: "AI reasoning & proposals" },
      { name: "Spine Layer", desc: "Canonical truth & memory" }
    ],
    layout: 'layers'
  },
  {
    id: '5',
    type: 'governance',
    title: "Approval-First Execution",
    content: "Every AI-initiated action passes through human-controlled checkpoints. Nothing executes without explicit approval.",
    layout: 'center'
  },
  {
    id: '6',
    type: 'cta',
    title: "Ready to See More?",
    content: "Book a personalized demo and see how IntegrateWise can transform your workspace.",
    cta: "Book Demo",
    ctaLink: "https://integratewise.ai/demo",
    layout: 'center'
  }
];

// Default LinkedIn Carousel Slides
const DEFAULT_CAROUSEL_SLIDES = [
  {
    id: 'c1',
    type: 'cover',
    title: "The $8M Lesson in Disconnected Tools",
    subtitle: "A thread 🧵",
    author: "IntegrateWise"
  },
  {
    id: 'c2',
    type: 'content',
    number: 1,
    title: "The Warning Signs",
    content: "A support ticket spiked. No one noticed it was from their biggest enterprise customer.",
    highlight: "Signal #1"
  },
  {
    id: 'c3',
    type: 'content',
    number: 2,
    title: "Scattered Context",
    content: "Product adoption dropped in the analytics tool. The connection to the support ticket? Invisible.",
    highlight: "Signal #2"
  },
  {
    id: 'c4',
    type: 'content',
    number: 3,
    title: "The Silent Alert",
    content: "An executive had flagged concerns in a private note. It never reached the account team.",
    highlight: "Signal #3"
  },
  {
    id: 'c5',
    type: 'content',
    number: 4,
    title: "The Cost of Silos",
    content: "Three systems. Three signals. Zero connection. The account was nearly lost. $8M at risk.",
    highlight: "The Problem"
  },
  {
    id: 'c6',
    type: 'content',
    number: 5,
    title: "The Solution",
    content: "What if every signal fed into one place — and that place could think? That's IntegrateWise.",
    highlight: "The Answer"
  },
  {
    id: 'c7',
    type: 'cta',
    title: "Stop Losing Accounts to Disconnected Tools",
    content: "See how the Spine unifies your signals →",
    cta: "Learn More"
  }
];

// Default Banner Styles
const DEFAULT_BANNERS = [
  {
    id: 'b1',
    name: 'Classic Blue',
    bg: 'linear-gradient(135deg, #0d1f33 0%, #1e3a5f 30%, #4154A3 60%, #5a6bc4 100%)',
    headline: 'IntegrateWise',
    tagline: 'AI Thinks in Context — and Waits for Approval',
    cta: 'integratewise.ai'
  },
  {
    id: 'b2',
    name: 'Dark Mode',
    bg: 'linear-gradient(135deg, #1B2544 0%, #2d3561 50%, #4154A3 100%)',
    headline: 'The Knowledge Workspace',
    tagline: 'Unified Intelligence. Human-Governed.',
    cta: 'integratewise.ai'
  },
  {
    id: 'b3',
    name: 'Sunset Pink',
    bg: 'linear-gradient(135deg, #1a1f36 0%, #4154A3 30%, #8b2f6b 60%, #EB4379 100%)',
    headline: 'Context-Aware AI',
    tagline: 'Thinks First. Waits for Approval.',
    cta: 'Book a Demo →'
  },
  {
    id: 'b4',
    name: 'Clean White',
    bg: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
    headline: 'IntegrateWise',
    tagline: 'Knowledge Workspace Over the Spine',
    cta: 'integratewise.ai',
    textColor: '#1B2544'
  }
];

// Load from localStorage
function loadData() {
  return {
    slides: loadJson('presentation_slides', DEFAULT_SLIDES),
    carousel: loadJson('carousel_slides', DEFAULT_CAROUSEL_SLIDES),
    banners: loadJson('linkedin_banners', DEFAULT_BANNERS)
  };
}

// Save to localStorage
function saveData(key: string, data: any) {
  saveJson(key, data);
}

// Copy Button
function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
      style={{ background: copied ? '#10B981' : 'rgba(65,84,163,0.08)', color: copied ? '#fff' : '#4154A3' }}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? 'Copied!' : label}
    </motion.button>
  );
}

// Slide Preview Component
function SlidePreview({ slide, isEditing, onChange }: { slide: typeof DEFAULT_SLIDES[0], isEditing: boolean, onChange: (s: typeof DEFAULT_SLIDES[0]) => void }) {
  const slideRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    if (!slideRef.current) return;
    setIsExporting(true);
    try {
      const blob = await toBlob(slideRef.current, { pixelRatio: 2 });
      if (blob) {
        saveAs(blob, `slide-${slide.id}.png`);
      }
    } finally {
      setIsExporting(false);
    }
  };

  const gradients: Record<string, string> = {
    primary: 'linear-gradient(135deg, #4154A3 0%, #1B2544 100%)',
    dark: 'linear-gradient(135deg, #1B2544 0%, #0d1220 100%)',
    accent: 'linear-gradient(135deg, #EB4379 0%, #4154A3 100%)'
  };

  return (
    <div className="space-y-4">
      <div 
        ref={slideRef}
        className="w-full aspect-[16/9] rounded-xl overflow-hidden relative flex items-center justify-center p-12"
        style={{ background: gradients.primary }}
      >
        <div className="text-center text-white max-w-3xl">
          {isEditing ? (
            <>
              <input
                value={slide.title}
                onChange={(e) => onChange({ ...slide, title: e.target.value })}
                className="text-4xl font-bold bg-white/20 text-white text-center w-full px-4 py-2 rounded mb-4"
              />
              {slide.subtitle && (
                <input
                  value={slide.subtitle}
                  onChange={(e) => onChange({ ...slide, subtitle: e.target.value })}
                  className="text-xl bg-white/20 text-white text-center w-full px-4 py-2 rounded mb-4"
                />
              )}
              {slide.content && (
                <textarea
                  value={slide.content}
                  onChange={(e) => onChange({ ...slide, content: e.target.value })}
                  className="text-base bg-white/20 text-white text-center w-full px-4 py-2 rounded min-h-[100px]"
                />
              )}
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
              {slide.subtitle && <p className="text-xl opacity-90 mb-4">{slide.subtitle}</p>}
              {slide.content && <p className="text-base opacity-80 whitespace-pre-wrap">{slide.content}</p>}
              {slide.tagline && <p className="text-lg mt-6 opacity-70">{slide.tagline}</p>}
              {slide.cta && (
                <button className="mt-8 px-8 py-3 bg-white text-[#4154A3] rounded-full font-semibold">
                  {slide.cta}
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleDownload}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 bg-[#4154A3] text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {isExporting ? 'Exporting...' : 'Download PNG'}
        </button>
        {slide.content && <CopyButton text={slide.content} label="Copy Text" />}
      </div>
    </div>
  );
}

// Carousel Slide Component
function CarouselSlide({ slide, isEditing, onChange }: { slide: typeof DEFAULT_CAROUSEL_SLIDES[0], isEditing: boolean, onChange: (s: typeof DEFAULT_CAROUSEL_SLIDES[0]) => void }) {
  const slideRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!slideRef.current) return;
    const blob = await toBlob(slideRef.current, { pixelRatio: 2 });
    if (blob) {
      saveAs(blob, `carousel-${slide.id}.png`);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E8ECF2] overflow-hidden">
      <div 
        ref={slideRef}
        className="w-full aspect-square bg-gradient-to-br from-[#1B2544] to-[#4154A3] p-8 flex flex-col justify-center text-white"
      >
        {slide.type === 'cover' && (
          <div className="text-center">
            {isEditing ? (
              <>
                <input
                  value={slide.title}
                  onChange={(e) => onChange({ ...slide, title: e.target.value })}
                  className="text-3xl font-bold bg-white/20 text-white text-center w-full px-4 py-2 rounded mb-4"
                />
                <input
                  value={slide.subtitle || ''}
                  onChange={(e) => onChange({ ...slide, subtitle: e.target.value })}
                  className="text-lg bg-white/20 text-white text-center w-full px-4 py-2 rounded"
                />
              </>
            ) : (
              <>
                <h3 className="text-3xl font-bold mb-4">{slide.title}</h3>
                <p className="text-lg opacity-80">{slide.subtitle}</p>
              </>
            )}
          </div>
        )}
        
        {slide.type === 'content' && (
          <div>
            {isEditing ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-4xl font-bold text-white/30">{slide.number}</span>
                  <input
                    value={slide.highlight || ''}
                    onChange={(e) => onChange({ ...slide, highlight: e.target.value })}
                    className="text-xs font-semibold uppercase tracking-wider bg-white/20 text-white px-2 py-1 rounded"
                  />
                </div>
                <input
                  value={slide.title}
                  onChange={(e) => onChange({ ...slide, title: e.target.value })}
                  className="text-xl font-bold bg-white/20 text-white w-full px-4 py-2 rounded mb-3"
                />
                <textarea
                  value={slide.content || ''}
                  onChange={(e) => onChange({ ...slide, content: e.target.value })}
                  className="text-base bg-white/20 text-white w-full px-4 py-2 rounded min-h-[100px]"
                />
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-4xl font-bold text-white/30">{slide.number}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/60">{slide.highlight}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{slide.title}</h3>
                <p className="text-base opacity-80">{slide.content}</p>
              </>
            )}
          </div>
        )}
        
        {slide.type === 'cta' && (
          <div className="text-center">
            {isEditing ? (
              <>
                <input
                  value={slide.title}
                  onChange={(e) => onChange({ ...slide, title: e.target.value })}
                  className="text-2xl font-bold bg-white/20 text-white text-center w-full px-4 py-2 rounded mb-4"
                />
                <input
                  value={slide.content || ''}
                  onChange={(e) => onChange({ ...slide, content: e.target.value })}
                  className="text-base bg-white/20 text-white text-center w-full px-4 py-2 rounded mb-4"
                />
                <input
                  value={slide.cta || ''}
                  onChange={(e) => onChange({ ...slide, cta: e.target.value })}
                  className="text-sm font-semibold bg-white/20 text-white text-center w-full px-4 py-2 rounded"
                />
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-4">{slide.title}</h3>
                <p className="text-base opacity-80 mb-4">{slide.content}</p>
                <span className="text-sm font-semibold text-[#EB4379]">{slide.cta}</span>
              </>
            )}
          </div>
        )}
      </div>
      <div className="p-4 border-t border-[#E8ECF2] flex items-center justify-between">
        <span className="text-xs text-[#5F6E93]">Slide {slide.number || 'Cover'}</span>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#4154A3] text-white rounded-lg text-xs font-medium"
        >
          <Download className="w-3 h-3" />
          PNG
        </button>
      </div>
    </div>
  );
}

// Banner Preview Component
function BannerPreview({ banner, isEditing, onChange }: { banner: typeof DEFAULT_BANNERS[0], isEditing: boolean, onChange: (b: typeof DEFAULT_BANNERS[0]) => void }) {
  const bannerRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!bannerRef.current) return;
    const blob = await toBlob(bannerRef.current, { pixelRatio: 2 });
    if (blob) {
      saveAs(blob, `banner-${banner.name}.png`);
    }
  };

  const textColor = banner.textColor || '#ffffff';

  return (
    <div className="bg-white rounded-xl border border-[#E8ECF2] overflow-hidden">
      <div 
        ref={bannerRef}
        className="w-full aspect-[1128/191] flex items-center justify-center p-6"
        style={{ background: banner.bg }}
      >
        <div className="text-center" style={{ color: textColor }}>
          {isEditing ? (
            <>
              <input
                value={banner.headline}
                onChange={(e) => onChange({ ...banner, headline: e.target.value })}
                className="text-2xl font-bold bg-white/20 text-center w-full px-4 py-1 rounded mb-2"
                style={{ color: textColor }}
              />
              <input
                value={banner.tagline}
                onChange={(e) => onChange({ ...banner, tagline: e.target.value })}
                className="text-sm bg-white/20 text-center w-full px-4 py-1 rounded mb-1"
                style={{ color: textColor }}
              />
              <input
                value={banner.cta}
                onChange={(e) => onChange({ ...banner, cta: e.target.value })}
                className="text-xs bg-white/20 text-center w-full px-4 py-1 rounded"
                style={{ color: textColor }}
              />
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold mb-1">{banner.headline}</h3>
              <p className="text-sm opacity-90">{banner.tagline}</p>
              <p className="text-xs mt-1 opacity-70">{banner.cta}</p>
            </>
          )}
        </div>
      </div>
      <div className="p-4 border-t border-[#E8ECF2] flex items-center justify-between">
        {isEditing ? (
          <input
            value={banner.name}
            onChange={(e) => onChange({ ...banner, name: e.target.value })}
            className="text-sm font-medium text-[#1B2544] px-2 py-1 border border-[#D5DAE5] rounded"
          />
        ) : (
          <span className="text-sm font-medium text-[#1B2544]">{banner.name}</span>
        )}
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#0A66C2] text-white rounded-lg text-xs font-medium"
        >
          <Download className="w-3 h-3" />
          PNG
        </button>
      </div>
    </div>
  );
}

// Main Component
export function PresentationsPage() {
  const [activeTab, setActiveTab] = useState<'slides' | 'carousel' | 'banners'>('slides');
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(() => loadData());
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    saveData('presentation_slides', data.slides);
    saveData('carousel_slides', data.carousel);
    saveData('linkedin_banners', data.banners);
  }, [data]);

  const handleSave = () => {
    saveData('presentation_slides', data.slides);
    saveData('carousel_slides', data.carousel);
    saveData('linkedin_banners', data.banners);
    setIsEditing(false);
  };

  const handleReset = () => {
    if (confirm('Reset all content to defaults? This cannot be undone.')) {
      setData({ slides: DEFAULT_SLIDES, carousel: DEFAULT_CAROUSEL_SLIDES, banners: DEFAULT_BANNERS });
    }
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    
    if (activeTab === 'carousel') {
      for (const slide of data.carousel) {
        // In real implementation, would capture each slide
      }
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'linkedin-carousel.zip');
    } else if (activeTab === 'banners') {
      // Download all banners
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 flex items-start justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Presentation className="w-5 h-5 text-[#4154A3]" />
            <span className="text-xs font-semibold text-[#4154A3] uppercase tracking-wider">Presentations</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1B2544] mb-2">Slide Decks & Assets</h1>
          <p className="text-[#5F6E93]">Pitch decks, LinkedIn carousels, and banner variations</p>
        </div>
        
        {/* Edit Controls */}
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 border border-[#D5DAE5] text-[#475578] rounded-lg text-sm font-medium"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#4154A3] text-white rounded-lg text-sm font-medium"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 border border-[#D5DAE5] text-[#475578] rounded-lg text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-[#E8ECF2]">
        {[
          { key: 'slides', label: 'Pitch Deck', icon: Presentation },
          { key: 'carousel', label: 'LinkedIn Carousel', icon: Grid },
          { key: 'banners', label: 'LinkedIn Banners', icon: Layout },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === tab.key
                ? 'border-[#4154A3] text-[#4154A3]'
                : 'border-transparent text-[#5F6E93] hover:text-[#4154A3]'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'slides' && (
          <motion.div
            key="slides"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Slide Navigator */}
            <div className="flex items-center justify-between bg-white rounded-xl border border-[#E8ECF2] p-4">
              <button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="p-2 hover:bg-[#F8FAFC] rounded-lg disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-medium text-[#1B2544]">
                Slide {currentSlide + 1} of {data.slides.length}
              </span>
              <button
                onClick={() => setCurrentSlide(Math.min(data.slides.length - 1, currentSlide + 1))}
                disabled={currentSlide === data.slides.length - 1}
                className="p-2 hover:bg-[#F8FAFC] rounded-lg disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Current Slide */}
            <SlidePreview 
              slide={data.slides[currentSlide]} 
              isEditing={isEditing}
              onChange={(updated) => {
                const newSlides = [...data.slides];
                newSlides[currentSlide] = updated;
                setData({ ...data, slides: newSlides });
              }}
            />

            {/* Slide Thumbnails */}
            <div className="grid grid-cols-6 gap-2">
              {data.slides.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(i)}
                  className={`aspect-video rounded-lg border-2 overflow-hidden ${
                    currentSlide === i ? 'border-[#4154A3]' : 'border-[#E8ECF2]'
                  }`}
                  style={{ background: 'linear-gradient(135deg, #4154A3 0%, #1B2544 100%)' }}
                >
                  <span className="text-white text-xs font-bold">{i + 1}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'carousel' && (
          <motion.div
            key="carousel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#5F6E93]">
                LinkedIn carousel posts. Download each slide individually or all as a ZIP.
              </p>
              <button
                onClick={downloadAll}
                className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Download All
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.carousel.map((slide, i) => (
                <CarouselSlide
                  key={slide.id}
                  slide={slide}
                  isEditing={isEditing}
                  onChange={(updated) => {
                    const newCarousel = [...data.carousel];
                    newCarousel[i] = updated;
                    setData({ ...data, carousel: newCarousel });
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'banners' && (
          <motion.div
            key="banners"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <p className="text-sm text-[#5F6E93]">
              LinkedIn company page banners (1128×191 px). Multiple styles for different campaigns.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {data.banners.map((banner, i) => (
                <BannerPreview
                  key={banner.id}
                  banner={banner}
                  isEditing={isEditing}
                  onChange={(updated) => {
                    const newBanners = [...data.banners];
                    newBanners[i] = updated;
                    setData({ ...data, banners: newBanners });
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PresentationsPage;
