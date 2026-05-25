import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Presentation,
  Download,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Save,
  X,
  RotateCcw,
  Layout,
  Grid,
} from 'lucide-react';
import { toBlob } from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { loadJson, saveJson } from '../../lib/storage';
import { copyToClipboard } from '../../utils/clipboard';

// Default Presentation Slides
const DEFAULT_SLIDES = [
  {
    id: '1',
    type: 'title',
    title: 'IntegrateWise',
    subtitle: 'Adaptive Continuity Workspace — Hydrated by the Spine',
    tagline: 'AI Thinks in Context — and Waits for Approval',
    layout: 'center',
  },
  {
    id: '2',
    type: 'problem',
    title: 'The $8M Lesson',
    content:
      'A support ticket spiked. Product adoption dropped. An executive warning sat in a personal note.\n\nThree signals. Three systems. Zero connection.\n\nThe account was nearly lost.',
    stat: '$8M',
    statLabel: 'At Risk',
    layout: 'split',
  },
  {
    id: '3',
    type: 'solution',
    title: 'The Adaptive Continuity Workspace',
    content:
      'Where your entire tech stack connects into one Adaptive Spine. Continuity hydrates continuously. AI surfaces what matters. Humans approve every action.',
    features: [
      'Unified Intelligence Layer',
      'Context-Aware AI',
      'Human-Governed Execution',
      'Continuous Learning',
    ],
    layout: 'features',
  },
  {
    id: '4',
    type: 'architecture',
    title: 'The Spine (SSOT)',
    content:
      'Single Source of Truth connecting tools, context, and decisions across the workspace.',
    layers: [
      { name: 'Workspace Layer', desc: 'Human interface to the Spine' },
      { name: 'Cognitive Layer', desc: 'AI reasoning & proposals' },
      { name: 'Spine Layer', desc: 'Canonical truth & memory' },
    ],
    layout: 'layers',
  },
  {
    id: '5',
    type: 'governance',
    title: 'Approval-First Execution',
    content:
      'Every AI-initiated action passes through human-controlled checkpoints. Nothing executes without explicit approval.',
    layout: 'center',
  },
  {
    id: '6',
    type: 'cta',
    title: 'Ready to See More?',
    content:
      'Book a personalized demo and see how IntegrateWise can transform your workspace.',
    cta: 'Book Demo',
    ctaLink: 'https://integratewise.ai/demo',
    layout: 'center',
  },
];

// Default LinkedIn Carousel Slides
const DEFAULT_CAROUSEL_SLIDES = [
  {
    id: 'c1',
    type: 'cover',
    title: 'The $8M Lesson in Disconnected Tools',
    subtitle: 'A thread 🧵',
    author: 'IntegrateWise',
  },
  {
    id: 'c2',
    type: 'content',
    number: 1,
    title: 'The Warning Signs',
    content:
      'A support ticket spiked. No one noticed it was from their biggest enterprise customer.',
    highlight: 'Signal #1',
  },
  {
    id: 'c3',
    type: 'content',
    number: 2,
    title: 'Scattered Context',
    content:
      'Product adoption dropped in the analytics tool. The connection to the support ticket? Invisible.',
    highlight: 'Signal #2',
  },
  {
    id: 'c4',
    type: 'content',
    number: 3,
    title: 'The Silent Alert',
    content:
      'An executive had flagged concerns in a private note. It never reached the account team.',
    highlight: 'Signal #3',
  },
  {
    id: 'c5',
    type: 'content',
    number: 4,
    title: 'The Cost of Silos',
    content:
      'Three systems. Three signals. Zero connection. The account was nearly lost. $8M at risk.',
    highlight: 'The Problem',
  },
  {
    id: 'c6',
    type: 'content',
    number: 5,
    title: 'The Solution',
    content:
      "What if every signal fed into one place — and that place could think? That's IntegrateWise.",
    highlight: 'The Answer',
  },
  {
    id: 'c7',
    type: 'cta',
    title: 'Stop Losing Accounts to Disconnected Tools',
    content: 'See how the Spine unifies your signals →',
    cta: 'Learn More',
  },
];

const RETHEMED_BANNER_PRESETS = {
  b1: {
    name: 'Forest Light',
    bg: 'linear-gradient(135deg, var(--paper-warm) 0%, color-mix(in srgb, color-mix(in srgb, var(--forest) 8%, transparent) 78%, var(--paper-warm)) 52%, color-mix(in srgb, var(--gold-pale) 68%, var(--paper-warm)) 100%)',
    textColor: 'var(--text-strong)',
  },
  b2: {
    name: 'Continuity Glow',
    bg: 'linear-gradient(135deg, color-mix(in srgb, color-mix(in srgb, var(--forest) 8%, transparent) 82%, var(--paper-warm)) 0%, color-mix(in srgb, var(--paper-warm) 60%, var(--gold-pale)) 100%)',
    textColor: 'var(--text-strong)',
  },
  b3: {
    name: 'Warm Accent',
    bg: 'linear-gradient(135deg, color-mix(in srgb, var(--gold-pale) 80%, var(--paper-warm)) 0%, color-mix(in srgb, color-mix(in srgb, var(--forest) 8%, transparent) 46%, var(--paper-warm)) 100%)',
    textColor: 'var(--text-strong)',
  },
  b4: {
    name: 'Clean White',
    bg: 'linear-gradient(135deg, var(--paper-warm) 0%, var(--paper-warm) 58%, color-mix(in srgb, var(--gold-pale) 44%, var(--paper-warm)) 100%)',
    textColor: 'var(--text-strong)',
  },
} as const;

// Default Banner Styles
const DEFAULT_BANNERS = [
  {
    id: 'b1',
    ...RETHEMED_BANNER_PRESETS.b1,
    headline: 'IntegrateWise',
    tagline: 'AI Thinks in Context — and Waits for Approval',
    cta: 'integratewise.ai',
  },
  {
    id: 'b2',
    ...RETHEMED_BANNER_PRESETS.b2,
    headline: 'The Adaptive Continuity Workspace',
    tagline: 'Unified Intelligence. Human-Governed.',
    cta: 'integratewise.ai',
  },
  {
    id: 'b3',
    ...RETHEMED_BANNER_PRESETS.b3,
    headline: 'Context-Aware AI',
    tagline: 'Thinks First. Waits for Approval.',
    cta: 'Book a Demo →',
  },
  {
    id: 'b4',
    ...RETHEMED_BANNER_PRESETS.b4,
    headline: 'IntegrateWise',
    tagline: 'Adaptive Continuity Workspace — Hydrated by the Spine',
    cta: 'integratewise.ai',
  },
];

const LEGACY_BANNER_BACKGROUNDS: Record<string, keyof typeof RETHEMED_BANNER_PRESETS> = {
  'linear-gradient(135deg, var(--slate) 0%, var(--slate-mid) 30%, var(--forest) 60%, var(--forest-bright) 100%)': 'b1',
  'linear-gradient(135deg, var(--ink) 0%, var(--slate-mid) 50%, var(--forest) 100%)': 'b2',
  'linear-gradient(135deg, var(--slate) 0%, var(--forest) 30%, var(--forest-mid) 60%, var(--gold) 100%)': 'b3',
  'linear-gradient(135deg, var(--paper) 0%, var(--paper-warm) 50%, var(--paper-deep) 100%)': 'b4',
};

const LEGACY_BANNER_NAMES: Record<keyof typeof RETHEMED_BANNER_PRESETS, string> = {
  b1: 'Soft Primary',
  b2: 'Soft Contrast',
  b3: 'Warm Accent',
  b4: 'Clean White',
};

function normalizeBanners(banners: typeof DEFAULT_BANNERS) {
  return banners.map((banner) => {
    const presetId = LEGACY_BANNER_BACKGROUNDS[banner.bg];

    if (!presetId) {
      return banner;
    }

    const preset = RETHEMED_BANNER_PRESETS[presetId];

    return {
      ...banner,
      bg: preset.bg,
      textColor: preset.textColor,
      name: banner.name === LEGACY_BANNER_NAMES[presetId] ? preset.name : banner.name,
    };
  });
}

// Load from localStorage
function loadData() {
  return {
    slides: loadJson('presentation_slides', DEFAULT_SLIDES),
    carousel: loadJson('carousel_slides', DEFAULT_CAROUSEL_SLIDES),
    banners: normalizeBanners(loadJson('linkedin_banners', DEFAULT_BANNERS)),
  };
}

// Save to localStorage
function saveData(key: string, data: any) {
  saveJson(key, data);
}

const tintSurface = (tone: string, strength = 14, base = 'var(--paper-warm)') =>
  `color-mix(in srgb, ${tone} ${strength}%, ${base})`;

const slideBackgrounds: Record<string, string> = {
  title: `linear-gradient(135deg, ${tintSurface('var(--forest)', 14, 'var(--paper-warm)')} 0%, ${tintSurface('var(--gold)', 18)} 100%)`,
  problem: `linear-gradient(135deg, ${tintSurface('var(--gold)', 14)} 0%, var(--paper-warm) 100%)`,
  solution: `linear-gradient(135deg, ${tintSurface('var(--forest)', 16)} 0%, ${tintSurface('var(--gold)', 14, 'var(--paper-warm)')} 100%)`,
  architecture: `linear-gradient(135deg, var(--paper-warm) 0%, ${tintSurface('var(--forest)', 10)} 100%)`,
  governance: `linear-gradient(135deg, var(--paper-warm) 0%, ${tintSurface('var(--gold)', 10)} 100%)`,
  cta: `linear-gradient(135deg, ${tintSurface('var(--gold)', 18)} 0%, ${tintSurface('var(--forest)', 12)} 100%)`,
};

const carouselBackgrounds: Record<string, string> = {
  cover: `linear-gradient(145deg, ${tintSurface('var(--forest)', 16)} 0%, ${tintSurface('var(--gold)', 14)} 100%)`,
  content: `linear-gradient(145deg, var(--paper-warm) 0%, ${tintSurface('var(--forest)', 10)} 100%)`,
  cta: `linear-gradient(145deg, ${tintSurface('var(--gold)', 18)} 0%, ${tintSurface('var(--forest)', 12)} 100%)`,
};

const previewFieldStyle = {
  background: 'transparent',
  color: 'var(--text-strong)',
  border: '1px solid var(--rule-light)',
  boxShadow: 'var(--shadow-sm)',
};

const shellCardStyle = {
  background: 'transparent',
  border: '1px solid var(--rule-light)',
  boxShadow: 'var(--shadow-sm)',
};

// Copy Button
function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
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
      style={{
        background: copied ? 'var(--forest-bright)' : 'color-mix(in srgb, var(--forest) 8%, transparent)',
        color: copied ? 'var(--text-inverse)' : 'var(--forest)',
        border: copied ? '1px solid transparent' : '1px solid var(--rule-light)',
        boxShadow: copied ? 'var(--shadow-sm)' : 'none',
      }}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? 'Copied!' : label}
    </motion.button>
  );
}

// Slide Preview Component
function SlidePreview({
  slide,
  isEditing,
  onChange,
}: {
  slide: typeof DEFAULT_SLIDES[0];
  isEditing: boolean;
  onChange: (s: typeof DEFAULT_SLIDES[0]) => void;
}) {
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

  const background = slideBackgrounds[slide.type] || slideBackgrounds.title;

  return (
    <div className="space-y-4">
      <div
        ref={slideRef}
        className="w-full aspect-[16/9] rounded-2xl overflow-hidden relative flex items-center justify-center p-12"
        style={{
          background,
          border: '1px solid var(--rule-light)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--paper-warm) 22%, transparent) 100%)',
          }}
        />
        <div className="relative text-center max-w-3xl" style={{ color: 'var(--text-strong)' }}>
          {isEditing ? (
            <>
              <input
                value={slide.title}
                onChange={(e) => onChange({ ...slide, title: e.target.value })}
                className="text-4xl font-bold text-center w-full px-4 py-2 rounded-xl mb-4"
                style={previewFieldStyle}
              />
              {slide.subtitle && (
                <input
                  value={slide.subtitle}
                  onChange={(e) => onChange({ ...slide, subtitle: e.target.value })}
                  className="text-xl text-center w-full px-4 py-2 rounded-xl mb-4"
                  style={previewFieldStyle}
                />
              )}
              {slide.content && (
                <textarea
                  value={slide.content}
                  onChange={(e) => onChange({ ...slide, content: e.target.value })}
                  className="text-base text-center w-full px-4 py-2 rounded-xl min-h-[100px]"
                  style={previewFieldStyle}
                />
              )}
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
              {slide.subtitle && (
                <p className="text-xl mb-4" style={{ color: 'var(--text-muted)' }}>
                  {slide.subtitle}
                </p>
              )}
              {slide.content && (
                <p className="text-base whitespace-pre-wrap leading-relaxed" style={{ color: 'var(--slate)' }}>
                  {slide.content}
                </p>
              )}
              {slide.tagline && (
                <p className="text-lg mt-6" style={{ color: 'var(--forest)' }}>
                  {slide.tagline}
                </p>
              )}
              {slide.cta && (
                <button
                  className="mt-8 px-8 py-3 rounded-full font-semibold"
                  style={{
                    background: 'var(--forest)',
                    color: 'var(--text-inverse)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
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
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
          style={{
            background: 'var(--forest)',
            color: 'var(--text-inverse)',
            boxShadow: 'var(--shadow-sm)',
          }}
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
function CarouselSlide({
  slide,
  isEditing,
  onChange,
}: {
  slide: typeof DEFAULT_CAROUSEL_SLIDES[0];
  isEditing: boolean;
  onChange: (s: typeof DEFAULT_CAROUSEL_SLIDES[0]) => void;
}) {
  const slideRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!slideRef.current) return;
    const blob = await toBlob(slideRef.current, { pixelRatio: 2 });
    if (blob) {
      saveAs(blob, `carousel-${slide.id}.png`);
    }
  };

  const background = carouselBackgrounds[slide.type] || carouselBackgrounds.content;

  return (
    <div className="rounded-xl overflow-hidden" style={shellCardStyle}>
      <div
        ref={slideRef}
        className="w-full aspect-square p-8 flex flex-col justify-center"
        style={{ background, color: 'var(--text-strong)' }}
      >
        {slide.type === 'cover' && (
          <div className="text-center">
            {isEditing ? (
              <>
                <input
                  value={slide.title}
                  onChange={(e) => onChange({ ...slide, title: e.target.value })}
                  className="text-3xl font-bold text-center w-full px-4 py-2 rounded-xl mb-4"
                  style={previewFieldStyle}
                />
                <input
                  value={slide.subtitle || ''}
                  onChange={(e) => onChange({ ...slide, subtitle: e.target.value })}
                  className="text-lg text-center w-full px-4 py-2 rounded-xl"
                  style={previewFieldStyle}
                />
              </>
            ) : (
              <>
                <h3 className="text-3xl font-bold mb-4">{slide.title}</h3>
                <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
                  {slide.subtitle}
                </p>
              </>
            )}
          </div>
        )}

        {slide.type === 'content' && (
          <div>
            {isEditing ? (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-4xl font-bold" style={{ color: 'var(--text-faint)' }}>
                    {slide.number}
                  </span>
                  <input
                    value={slide.highlight || ''}
                    onChange={(e) => onChange({ ...slide, highlight: e.target.value })}
                    className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-lg"
                    style={{
                      ...previewFieldStyle,
                      background: tintSurface('var(--forest)', 10),
                      color: 'var(--forest)',
                    }}
                  />
                </div>
                <input
                  value={slide.title}
                  onChange={(e) => onChange({ ...slide, title: e.target.value })}
                  className="text-xl font-bold w-full px-4 py-2 rounded-xl mb-3"
                  style={previewFieldStyle}
                />
                <textarea
                  value={slide.content || ''}
                  onChange={(e) => onChange({ ...slide, content: e.target.value })}
                  className="text-base w-full px-4 py-2 rounded-xl min-h-[100px]"
                  style={previewFieldStyle}
                />
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-4xl font-bold" style={{ color: 'var(--text-faint)' }}>
                    {slide.number}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--forest)' }}>
                    {slide.highlight}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{slide.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {slide.content}
                </p>
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
                  className="text-2xl font-bold text-center w-full px-4 py-2 rounded-xl mb-4"
                  style={previewFieldStyle}
                />
                <input
                  value={slide.content || ''}
                  onChange={(e) => onChange({ ...slide, content: e.target.value })}
                  className="text-base text-center w-full px-4 py-2 rounded-xl mb-4"
                  style={previewFieldStyle}
                />
                <input
                  value={slide.cta || ''}
                  onChange={(e) => onChange({ ...slide, cta: e.target.value })}
                  className="text-sm font-semibold text-center w-full px-4 py-2 rounded-xl"
                  style={{
                    ...previewFieldStyle,
                    background: tintSurface('var(--gold)', 12),
                    color: 'var(--gold)',
                  }}
                />
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-4">{slide.title}</h3>
                <p className="text-base mb-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {slide.content}
                </p>
                <span className="text-sm font-semibold" style={{ color: 'var(--gold)' }}>
                  {slide.cta}
                </span>
              </>
            )}
          </div>
        )}
      </div>
      <div
        className="p-4 flex items-center justify-between"
        style={{ borderTop: '1px solid var(--rule-light)', background: 'var(--paper-warm)' }}
      >
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Slide {slide.number || 'Cover'}
        </span>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
          style={{ background: 'var(--forest)', color: 'var(--text-inverse)' }}
        >
          <Download className="w-3 h-3" />
          PNG
        </button>
      </div>
    </div>
  );
}

// Banner Preview Component
function BannerPreview({
  banner,
  isEditing,
  onChange,
}: {
  banner: typeof DEFAULT_BANNERS[0];
  isEditing: boolean;
  onChange: (b: typeof DEFAULT_BANNERS[0]) => void;
}) {
  const bannerRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!bannerRef.current) return;
    const blob = await toBlob(bannerRef.current, { pixelRatio: 2 });
    if (blob) {
      saveAs(blob, `banner-${banner.name}.png`);
    }
  };

  const textColor = banner.textColor || 'var(--text-strong)';
  const bannerInputStyle = {
    background: 'color-mix(in srgb, var(--paper-warm) 82%, transparent)',
    color: textColor,
    border: '1px solid var(--rule-light)',
    boxShadow: 'var(--shadow-sm)',
  };

  return (
    <div className="rounded-xl overflow-hidden" style={shellCardStyle}>
      <div
        ref={bannerRef}
        className="w-full aspect-[1128/191] flex items-center justify-center p-6"
        style={{ background: banner.bg }}
      >
        <div className="text-center max-w-2xl" style={{ color: textColor }}>
          {isEditing ? (
            <>
              <input
                value={banner.headline}
                onChange={(e) => onChange({ ...banner, headline: e.target.value })}
                className="text-2xl font-bold text-center w-full px-4 py-1 rounded-xl mb-2"
                style={bannerInputStyle}
              />
              <input
                value={banner.tagline}
                onChange={(e) => onChange({ ...banner, tagline: e.target.value })}
                className="text-sm text-center w-full px-4 py-1 rounded-xl mb-1"
                style={bannerInputStyle}
              />
              <input
                value={banner.cta}
                onChange={(e) => onChange({ ...banner, cta: e.target.value })}
                className="text-xs text-center w-full px-4 py-1 rounded-xl"
                style={bannerInputStyle}
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
      <div
        className="p-4 flex items-center justify-between"
        style={{ borderTop: '1px solid var(--rule-light)', background: 'var(--paper-warm)' }}
      >
        {isEditing ? (
          <input
            value={banner.name}
            onChange={(e) => onChange({ ...banner, name: e.target.value })}
            className="text-sm font-medium px-2 py-1 rounded-lg"
            style={previewFieldStyle}
          />
        ) : (
          <span className="text-sm font-medium" style={{ color: 'var(--text-strong)' }}>
            {banner.name}
          </span>
        )}
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
          style={{ background: 'var(--forest)', color: 'var(--text-inverse)' }}
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
      setData({
        slides: DEFAULT_SLIDES,
        carousel: DEFAULT_CAROUSEL_SLIDES,
        banners: DEFAULT_BANNERS,
      });
    }
  };

  const downloadAll = async () => {
    const zip = new JSZip();

    if (activeTab === 'carousel') {
      for (const slide of data.carousel) {
        void slide;
        // In real implementation, would capture each slide
      }
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'linkedin-carousel.zip');
    } else if (activeTab === 'banners') {
      // Download all banners
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="rounded-2xl p-6 lg:p-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"
        style={{
          background:
            'linear-gradient(135deg, var(--paper-warm) 0%, color-mix(in srgb, var(--forest) 8%, transparent) 58%, color-mix(in srgb, var(--gold-pale) 70%, var(--paper-warm)) 100%)',
          border: '1px solid var(--rule-light)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: 'transparent', border: '1px solid var(--rule-light)' }}
            >
              <Presentation className="w-5 h-5" style={{ color: 'var(--forest)' }} />
            </div>
            <span
              className="text-xs font-semibold uppercase"
              style={{ color: 'var(--forest)', letterSpacing: '0.18em' }}
            >
              Presentations
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-strong)' }}>
            Slide Decks & Assets
          </h1>
          <p className="max-w-2xl" style={{ color: 'var(--text-muted)' }}>
            Pitch decks, LinkedIn carousels, and banner variations rethemed to the brighter documentation surface.
          </p>
        </div>

        {/* Edit Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  background: 'var(--forest-bright)',
                  color: 'var(--text-inverse)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--rule-light)',
                }}
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  background: 'var(--forest)',
                  color: 'var(--text-inverse)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--rule-light)',
                }}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
      <div
        className="flex flex-wrap gap-2 p-2 rounded-2xl"
        style={{ background: 'var(--paper-warm)', border: '1px solid var(--rule-light)' }}
      >
        {[
          { key: 'slides', label: 'Pitch Deck', icon: Presentation },
          { key: 'carousel', label: 'LinkedIn Carousel', icon: Grid },
          { key: 'banners', label: 'LinkedIn Banners', icon: Layout },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl transition-all"
            style={
              activeTab === tab.key
                ? {
                    background: 'transparent',
                    color: 'var(--forest)',
                    border: '1px solid var(--rule-light)',
                    boxShadow: 'var(--shadow-sm)',
                  }
                : {
                    color: 'var(--text-muted)',
                    border: '1px solid transparent',
                  }
            }
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
            <div className="flex items-center justify-between rounded-xl p-4" style={shellCardStyle}>
              <button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="p-2 rounded-lg disabled:opacity-50"
                style={{ color: 'var(--text-muted)' }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-medium" style={{ color: 'var(--text-strong)' }}>
                Slide {currentSlide + 1} of {data.slides.length}
              </span>
              <button
                onClick={() => setCurrentSlide(Math.min(data.slides.length - 1, currentSlide + 1))}
                disabled={currentSlide === data.slides.length - 1}
                className="p-2 rounded-lg disabled:opacity-50"
                style={{ color: 'var(--text-muted)' }}
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
                  className="aspect-video rounded-lg border-2 overflow-hidden"
                  style={{
                    background: slideBackgrounds[slide.type] || slideBackgrounds.title,
                    borderColor: currentSlide === i ? 'var(--forest)' : 'var(--rule-light)',
                    boxShadow: currentSlide === i ? 'var(--shadow-sm)' : 'none',
                  }}
                >
                  <span className="text-xs font-bold" style={{ color: 'var(--text-strong)' }}>
                    {i + 1}
                  </span>
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
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                LinkedIn carousel posts. Download each slide individually or all as a ZIP.
              </p>
              <button
                onClick={downloadAll}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: 'var(--forest)', color: 'var(--text-inverse)' }}
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
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
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
