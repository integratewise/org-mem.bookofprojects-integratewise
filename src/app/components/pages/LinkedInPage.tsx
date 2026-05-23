import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion } from 'motion/react';
import {
  Linkedin,
  Download,
  Copy,
  Check,
  Image,
  FileText,
  Share2,
  Sparkles,
  Palette,
  Edit2,
  Save,
  X,
  Plus,
  Trash2,
  RotateCcw,
  RefreshCw
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { copyToClipboard } from '../../utils/clipboard';
import { autoSyncContent, loadConnections } from '../../services/sync';
import { loadJson, saveJson } from '../../lib/storage';

const LIGHT_LINKEDIN_BANNER_BACKGROUND =
  'linear-gradient(135deg, var(--surface-raised) 0%, color-mix(in srgb, var(--primary-soft) 72%, var(--paper)) 56%, var(--accent-soft) 100%)';

const LIGHT_LINKEDIN_PREVIEW_BACKGROUNDS: Record<string, string> = {
  'soft-contrast':
    'linear-gradient(135deg, var(--surface-raised) 0%, var(--surface-subtle) 54%, var(--primary-soft) 100%)',
  'gradient-ocean':
    'linear-gradient(135deg, var(--surface-raised) 0%, color-mix(in srgb, var(--primary-soft) 74%, var(--paper)) 58%, var(--accent-soft) 100%)',
  'gradient-sunset':
    'linear-gradient(135deg, var(--surface-raised) 0%, var(--accent-soft) 58%, color-mix(in srgb, var(--primary-soft) 44%, var(--accent-soft)) 100%)'
};

const legacyBannerTokens = [
  'var(--slate)',
  'var(--slate-mid)',
  'var(--primary-color)',
  'var(--forest-bright)',
  'var(--text-color)',
  'var(--slate-mid)',
  'var(--brand-primary-light)',
  'var(--slate)',
  'var(--forest-mid)',
  'var(--accent-color)'
];

const cardSurfaceStyle: CSSProperties = {
  backgroundColor: 'var(--surface-raised)',
  borderColor: 'var(--border-subtle)',
  boxShadow: 'var(--shadow-sm)'
};

const mutedSurfaceStyle: CSSProperties = {
  backgroundColor: 'var(--surface-subtle)',
  borderColor: 'var(--border-subtle)'
};

const primaryButtonStyle: CSSProperties = {
  backgroundColor: 'var(--primary-color)',
  color: 'var(--text-inverse)',
  boxShadow: 'var(--shadow-sm)'
};

const secondaryButtonStyle: CSSProperties = {
  backgroundColor: 'var(--surface-raised)',
  borderColor: 'var(--border-default)',
  color: 'var(--text-default)'
};

const successButtonStyle: CSSProperties = {
  backgroundColor: 'var(--status-success)',
  color: 'var(--text-inverse)',
  boxShadow: 'var(--shadow-sm)'
};

const previewInputStyle: CSSProperties = {
  background: 'color-mix(in srgb, var(--surface-raised) 92%, transparent)',
  border: '1px solid var(--border-subtle)',
  color: 'var(--text-default)',
  boxShadow: 'var(--shadow-sm)'
};

const avatarStyle: CSSProperties = {
  background:
    'linear-gradient(135deg, var(--primary-soft) 0%, color-mix(in srgb, var(--accent-soft) 78%, var(--surface-raised)) 100%)',
  color: 'var(--primary-hover)',
  border: '1px solid var(--border-subtle)'
};

const noticePanelStyle: CSSProperties = {
  background:
    'linear-gradient(135deg, color-mix(in srgb, var(--primary-soft) 64%, var(--paper)) 0%, var(--surface-raised) 100%)',
  borderColor: 'var(--border-subtle)'
};

const getPreviewBackground = (theme: string) =>
  LIGHT_LINKEDIN_PREVIEW_BACKGROUNDS[theme] ?? LIGHT_LINKEDIN_PREVIEW_BACKGROUNDS['soft-contrast'];

const normalizeBannerBackground = (bg?: string) => {
  if (!bg) return LIGHT_LINKEDIN_BANNER_BACKGROUND;
  return legacyBannerTokens.some((token) => bg.includes(token)) ? LIGHT_LINKEDIN_BANNER_BACKGROUND : bg;
};

const CAROUSEL_TEMPLATES = [
  {
    id: 'carousel-1',
    title: 'The $8M Lesson',
    subtitle: '5-slide story about disconnected tools',
    slides: [
      'The $8M Lesson: When Disconnected Tools Nearly Cost Everything',
      'Signal 1: Support ticket spiked. Signal 2: Product adoption dropped. Signal 3: Executive warning sat in a note.',
      'Three signals. Three systems. Zero connection.',
      "The account was nearly lost. That's the cost of fragmentation.",
      'What if every signal fed into one place — and that place could think?'
    ],
    theme: 'gradient-ocean'
  },
  {
    id: 'carousel-2',
    title: 'Context-Aware AI',
    subtitle: 'How IntegrateWise thinks before acting',
    slides: [
      'AI Without Context is Just Fancy Autocomplete',
      "Most AI tools guess. They don't know your business.",
      'IntegrateWise builds an Entity 360° — every customer, every touchpoint, connected.',
      'AI reasons with full context. Proposes actions. Waits for approval.',
      'Context before Intelligence. Governance before Execution.'
    ],
    theme: 'soft-contrast'
  },
  {
    id: 'carousel-3',
    title: 'The Spine Explained',
    subtitle: 'Your unified intelligence layer',
    slides: [
      'Meet the Spine: Your Single Source of Truth',
      'Every tool you use. Every decision you make. All connected.',
      'The Spine unifies your tech stack into one Adaptive layer.',
      'AI operates on top — with full context, not guesses.',
      'One workspace. One intelligence. One truth.'
    ],
    theme: 'gradient-sunset'
  }
];

const DEFAULT_LINKEDIN_CONTENT = {
  banner: {
    title: 'LinkedIn Company Banner',
    description: '1128×191 px - Professional banner for company page',
    bg: LIGHT_LINKEDIN_BANNER_BACKGROUND,
    content: {
      headline: 'IntegrateWise',
      tagline: 'AI Thinks in Context — and Waits for Approval',
      cta: 'integratewise.ai'
    }
  },
  posts: [
    {
      id: '1',
      title: 'Problem-Solution Post',
      content: `Modern work is fragmented. Tools disconnected. Knowledge scattered. AI without context.

That's why we built IntegrateWise — an adaptive continuity workspace where your entire tech stack connects into one Adaptive Spine.

AI surfaces what matters. Humans approve every action.

Context before Intelligence. Governance before Execution.

#AdaptiveContinuity #AIGovernance #IntegrateWise`,
      image: 'soft-contrast'
    },
    {
      id: '2',
      title: 'Thought Leadership',
      content: `The $8M Lesson:

A support ticket spiked. Product adoption dropped. An executive warning sat in a personal note.

Three signals. Three systems. Zero connection.

The account was nearly lost.

That's the cost of disconnected tools.

What if every signal fed into one place — and that place could think?

That's IntegrateWise.`,
      image: 'gradient-ocean'
    },
    {
      id: '3',
      title: 'Product Announcement',
      content: `Introducing the Spine — your unified intelligence layer.

✓ Connect all your tools
✓ Build Entity 360 views
✓ AI reasons with full context
✓ Every action waits for approval

The Adaptive Continuity Workspace is here.

Ready to see your connected reality?

👉 Book a demo: integratewise.ai/demo`,
      image: 'gradient-sunset'
    }
  ],
  companyInfo: {
    name: 'IntegrateWise',
    tagline: 'Adaptive continuity workspace hydrated by the Spine',
    about: `IntegrateWise is an adaptive continuity workspace powered by the Spine — a unified continuity core that connects tools, context, knowledge, and decisions.

By continuously hydrating the Spine from connectors and operational reality, AI can reason across systems, propose actions, and continuously learn while ensuring that every action waits for human approval.

IntegrateWise projects workspace and knowledge from the current continuity topology — one governed environment where intelligence is grounded in organizational truth.`,
    specialties:
      'Adaptive Continuity Workspace, Organizational Continuity, Context-Aware AI, Enterprise AI, Human-Governed AI, Workflow Intelligence, Data Integration, Decision Intelligence',
    website: 'https://integratewise.ai',
    industry: 'Enterprise Software',
    size: '11-50 employees',
    headquarters: 'Bengaluru, India'
  }
};

type LinkedInContent = typeof DEFAULT_LINKEDIN_CONTENT;
type LinkedInPost = LinkedInContent['posts'][number];
type LinkedInBanner = LinkedInContent['banner'];
type LinkedInCompanyInfo = LinkedInContent['companyInfo'];
type LinkedInCarousel = (typeof CAROUSEL_TEMPLATES)[number];

function loadContent(): LinkedInContent {
  const storedContent = loadJson('linkedin_content', DEFAULT_LINKEDIN_CONTENT);

  return {
    ...storedContent,
    banner: {
      ...DEFAULT_LINKEDIN_CONTENT.banner,
      ...storedContent.banner,
      bg: normalizeBannerBackground(storedContent.banner?.bg ?? DEFAULT_LINKEDIN_CONTENT.banner.bg)
    },
    posts: storedContent.posts ?? DEFAULT_LINKEDIN_CONTENT.posts,
    companyInfo: {
      ...DEFAULT_LINKEDIN_CONTENT.companyInfo,
      ...storedContent.companyInfo
    }
  };
}

function saveContent(content: LinkedInContent) {
  saveJson('linkedin_content', content);
}

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
      className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all"
      style={{
        backgroundColor: copied ? 'var(--status-success)' : 'var(--primary-soft)',
        color: copied ? 'var(--text-inverse)' : 'var(--primary-hover)',
        boxShadow: copied ? 'var(--shadow-sm)' : 'none'
      }}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? 'Copied!' : label}
    </motion.button>
  );
}

function fieldInputStyle(multiline = false): CSSProperties {
  return {
    backgroundColor: 'var(--surface-raised)',
    borderColor: 'var(--border-default)',
    color: 'var(--text-default)',
    minHeight: multiline ? '100px' : undefined
  };
}

function BannerPreview({
  banner,
  isEditing,
  onChange
}: {
  banner: LinkedInBanner;
  isEditing: boolean;
  onChange: (banner: LinkedInBanner) => void;
}) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const background = normalizeBannerBackground(banner.bg);

  const handleDownload = async () => {
    if (!bannerRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(bannerRef.current, { pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'IntegrateWise-LinkedIn-Banner.png';
      link.href = dataUrl;
      link.click();
    } finally {
      setIsExporting(false);
    }
  };

  const updateContent = (key: keyof LinkedInBanner['content'], value: string) => {
    onChange({
      ...banner,
      bg: background,
      content: { ...banner.content, [key]: value }
    });
  };

  return (
    <div className="space-y-4">
      <div
        ref={bannerRef}
        className="relative flex aspect-[1128/191] w-full items-center justify-center overflow-hidden rounded-2xl border"
        style={{
          background,
          borderColor: 'var(--border-subtle)',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at top right, color-mix(in srgb, var(--accent-soft) 84%, transparent) 0%, transparent 44%)'
          }}
        />
        <div
          className="absolute left-6 top-6 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--surface-raised) 92%, transparent)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--primary-hover)'
          }}
        >
          LinkedIn banner
        </div>
        <div className="relative z-10 max-w-3xl px-8 text-center">
          {isEditing ? (
            <>
              <input
                value={banner.content.headline}
                onChange={(e) => updateContent('headline', e.target.value)}
                className="mb-2 w-full rounded-md px-3 py-2 text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                style={previewInputStyle}
              />
              <input
                value={banner.content.tagline}
                onChange={(e) => updateContent('tagline', e.target.value)}
                className="mb-1 w-full rounded-md px-3 py-2 text-center text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                style={previewInputStyle}
              />
              <input
                value={banner.content.cta}
                onChange={(e) => updateContent('cta', e.target.value)}
                className="w-full rounded-md px-3 py-2 text-center text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                style={previewInputStyle}
              />
            </>
          ) : (
            <>
              <h3 className="mb-2 text-3xl font-bold" style={{ color: 'var(--text-default)' }}>
                {banner.content.headline}
              </h3>
              <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
                {banner.content.tagline}
              </p>
              <p className="mt-3 text-sm font-medium" style={{ color: 'var(--primary-hover)' }}>
                {banner.content.cta}
              </p>
            </>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleDownload}
          disabled={isExporting}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:brightness-95 disabled:opacity-50"
          style={primaryButtonStyle}
        >
          <Download className="h-4 w-4" />
          {isExporting ? 'Exporting...' : 'Download PNG'}
        </button>
        <CopyButton text={`${banner.content.headline}\n${banner.content.tagline}`} label="Copy Text" />
      </div>
    </div>
  );
}

function CarouselCard({ carousel, index }: { carousel: LinkedInCarousel; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const handleCopyAll = () => {
    copyToClipboard(carousel.slides.join('\n\n--- Slide ---\n\n'));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="overflow-hidden rounded-xl border"
      style={cardSurfaceStyle}
    >
      <div
        className="flex h-40 items-center justify-center border-b p-6"
        style={{ background: getPreviewBackground(carousel.theme), borderColor: 'var(--border-subtle)' }}
      >
        <div
          className="rounded-2xl px-6 py-5 text-center"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--surface-raised) 76%, transparent)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div
            className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg"
            style={{
              backgroundColor: 'var(--primary-soft)',
              color: 'var(--primary-hover)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <span className="text-lg font-bold">{carousel.slides.length}</span>
          </div>
          <p className="text-lg font-bold" style={{ color: 'var(--text-default)' }}>
            {carousel.title}
          </p>
          <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
            {carousel.subtitle}
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className={`space-y-3 ${expanded ? '' : 'max-h-40 overflow-hidden'}`}>
          {carousel.slides.map((slide, slideIndex) => (
            <div key={slideIndex} className="flex gap-3">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium"
                style={{ backgroundColor: 'var(--primary-soft)', color: 'var(--primary-hover)' }}
              >
                {slideIndex + 1}
              </span>
              <p className="flex-1 text-sm" style={{ color: 'var(--text-default)' }}>
                {slide}
              </p>
            </div>
          ))}
        </div>

        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="mt-3 text-xs hover:underline"
            style={{ color: 'var(--primary-color)' }}
          >
            Show all {carousel.slides.length} slides
          </button>
        )}

        <div className="mt-4 flex gap-2 border-t pt-4" style={{ borderColor: 'var(--border-subtle)' }}>
          <button
            onClick={handleCopyAll}
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all hover:brightness-95"
            style={primaryButtonStyle}
          >
            <Copy className="h-3.5 w-3.5" />
            Copy All Slides
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function LinkedInPostCard({
  post,
  index,
  isEditing,
  onChange,
  onDelete
}: {
  post: LinkedInPost;
  index: number;
  isEditing: boolean;
  onChange: (post: LinkedInPost) => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="overflow-hidden rounded-xl border"
      style={cardSurfaceStyle}
    >
      <div className="p-6">
        <div className="mb-4 flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full font-bold" style={avatarStyle}>
            IW
          </div>
          <div className="flex-1">
            {isEditing ? (
              <input
                value={post.title}
                onChange={(e) => onChange({ ...post, title: e.target.value })}
                className="w-full rounded border px-2 py-1 font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                style={fieldInputStyle()}
              />
            ) : (
              <h4 className="font-semibold" style={{ color: 'var(--text-default)' }}>
                IntegrateWise
              </h4>
            )}
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Company • AI Technology
            </p>
          </div>
          {isEditing && (
            <button
              onClick={onDelete}
              className="rounded-lg p-2 transition-all hover:brightness-95"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--status-danger) 10%, transparent)',
                color: 'var(--status-danger)'
              }}
              title="Delete post"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>

        {isEditing ? (
          <textarea
            value={post.content}
            onChange={(e) => onChange({ ...post, content: e.target.value })}
            className="min-h-[200px] w-full rounded-lg border p-3 text-sm whitespace-pre-wrap focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            style={fieldInputStyle(true)}
          />
        ) : (
          <div className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-default)' }}>
            {expanded ? post.content : post.content.slice(0, 200) + (post.content.length > 200 ? '...' : '')}
          </div>
        )}

        {!isEditing && post.content.length > 200 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-sm font-medium hover:underline"
            style={{ color: 'var(--primary-color)' }}
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}

        <div className="mt-4 rounded-lg border border-dashed p-4" style={mutedSurfaceStyle}>
          <p className="mb-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            Suggested image style:
          </p>
          <div
            className="flex h-32 w-full items-center justify-center rounded-lg border"
            style={{
              background: getPreviewBackground(post.image),
              borderColor: 'var(--border-subtle)'
            }}
          >
            <div className="text-center">
              <Image className="mx-auto mb-2 h-8 w-8" style={{ color: 'var(--primary-hover)' }} />
              <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                Light preview treatment
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex items-center justify-between border-t px-6 py-4"
        style={{ backgroundColor: 'var(--surface-subtle)', borderColor: 'var(--border-subtle)' }}
      >
        {isEditing ? (
          <input
            value={post.title}
            onChange={(e) => onChange({ ...post, title: e.target.value })}
            className="rounded border px-2 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            style={fieldInputStyle()}
          />
        ) : (
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {post.title}
          </span>
        )}
        <CopyButton text={post.content} label="Copy Post" />
      </div>
    </motion.div>
  );
}

function CompanyInfo({
  info,
  isEditing,
  onChange
}: {
  info: LinkedInCompanyInfo;
  isEditing: boolean;
  onChange: (info: LinkedInCompanyInfo) => void;
}) {
  const updateField = (key: keyof LinkedInCompanyInfo, value: string) => {
    onChange({ ...info, [key]: value });
  };

  return (
    <div className="rounded-xl border p-6" style={cardSurfaceStyle}>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl text-2xl font-bold" style={avatarStyle}>
          IW
        </div>
        <div className="flex-1">
          {isEditing ? (
            <>
              <input
                value={info.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="mb-1 w-full rounded border px-2 py-1 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                style={fieldInputStyle()}
              />
              <input
                value={info.tagline}
                onChange={(e) => updateField('tagline', e.target.value)}
                className="w-full rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                style={{ ...fieldInputStyle(), color: 'var(--text-muted)' }}
              />
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold" style={{ color: 'var(--text-default)' }}>
                {info.name}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {info.tagline}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-faint)' }}>
            About
          </p>
          {isEditing ? (
            <textarea
              value={info.about}
              onChange={(e) => updateField('about', e.target.value)}
              className="min-h-[150px] w-full rounded-lg border p-3 text-sm whitespace-pre-wrap focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              style={fieldInputStyle(true)}
            />
          ) : (
            <p className="text-sm whitespace-pre-wrap" style={{ color: 'var(--text-default)' }}>
              {info.about}
            </p>
          )}
          <div className="mt-2">
            <CopyButton text={info.about} label="Copy About Text" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t pt-4" style={{ borderColor: 'var(--border-subtle)' }}>
          {[
            { key: 'industry', label: 'Industry' },
            { key: 'size', label: 'Company Size' },
            { key: 'headquarters', label: 'Headquarters' },
            { key: 'website', label: 'Website' }
          ].map(({ key, label }) => (
            <div key={key}>
              <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
                {label}
              </p>
              {isEditing ? (
                <input
                  value={info[key as keyof LinkedInCompanyInfo]}
                  onChange={(e) => updateField(key as keyof LinkedInCompanyInfo, e.target.value)}
                  className="w-full rounded border px-2 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                  style={fieldInputStyle()}
                />
              ) : (
                <p className="text-sm font-medium" style={{ color: 'var(--text-default)' }}>
                  {info[key as keyof LinkedInCompanyInfo]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="border-t pt-4" style={{ borderColor: 'var(--border-subtle)' }}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-faint)' }}>
            Specialties
          </p>
          {isEditing ? (
            <textarea
              value={info.specialties}
              onChange={(e) => updateField('specialties', e.target.value)}
              className="w-full rounded-lg border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              style={fieldInputStyle()}
            />
          ) : (
            <p className="text-sm" style={{ color: 'var(--text-default)' }}>
              {info.specialties}
            </p>
          )}
          <div className="mt-2">
            <CopyButton text={info.specialties} label="Copy Specialties" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LinkedInPage() {
  const [activeTab, setActiveTab] = useState<'banner' | 'posts' | 'carousels' | 'company'>('banner');
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState<LinkedInContent>(() => loadContent());
  const [connectedChannels, setConnectedChannels] = useState<string[]>([]);

  useEffect(() => {
    const connections = loadConnections();
    const connected = connections
      .filter((connection) => connection.status === 'connected' && (connection.type === 'marketing' || connection.type === 'branding'))
      .map((connection) => connection.name);
    setConnectedChannels(connected);
  }, []);

  useEffect(() => {
    saveContent(content);
  }, [content]);

  const handleSave = () => {
    saveContent(content);
    setIsEditing(false);
    autoSyncContent('content', 'linkedin', content);

    const connections = loadConnections();
    const connected = connections
      .filter((connection) => connection.status === 'connected' && (connection.type === 'marketing' || connection.type === 'branding'))
      .map((connection) => connection.name);
    setConnectedChannels(connected);
  };

  const handleReset = () => {
    if (confirm('Reset all content to defaults? This cannot be undone.')) {
      setContent(DEFAULT_LINKEDIN_CONTENT);
      saveContent(DEFAULT_LINKEDIN_CONTENT);
    }
  };

  const addNewPost = () => {
    const newPost: LinkedInPost = {
      id: Date.now().toString(),
      title: 'New Post',
      content: 'Enter your post content here...',
      image: 'soft-contrast'
    };

    setContent({ ...content, posts: [...content.posts, newPost] });
  };

  const updatePost = (index: number, updatedPost: LinkedInPost) => {
    const newPosts = [...content.posts];
    newPosts[index] = updatedPost;
    setContent({ ...content, posts: newPosts });
  };

  const deletePost = (index: number) => {
    if (confirm('Delete this post?')) {
      setContent({ ...content, posts: content.posts.filter((_, postIndex) => postIndex !== index) });
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-10" style={{ color: 'var(--text-default)' }}>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 flex items-start justify-between"
      >
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Linkedin className="h-5 w-5" style={{ color: 'var(--primary-color)' }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--primary-color)' }}>
              Social Media
            </span>
          </div>
          <h1 className="mb-2 text-3xl font-bold" style={{ color: 'var(--text-default)' }}>
            LinkedIn Assets
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Company page content, banners, and post templates for LinkedIn
          </p>

          {connectedChannels.length > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <span
                className="flex items-center gap-1 rounded-full px-2 py-1 text-xs"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--status-success) 14%, var(--surface-raised))',
                  border: '1px solid color-mix(in srgb, var(--status-success) 22%, var(--surface-raised))',
                  color: 'var(--status-success)'
                }}
              >
                <RefreshCw className="h-3 w-3" />
                Synced to: {connectedChannels.join(', ')}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:brightness-95"
                style={successButtonStyle}
              >
                <Save className="h-4 w-4" />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all hover:opacity-85"
                style={secondaryButtonStyle}
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:brightness-95"
                style={primaryButtonStyle}
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all hover:opacity-85"
                style={secondaryButtonStyle}
                title="Reset to defaults"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </motion.div>

      <div className="mb-8 flex gap-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        {[
          { key: 'banner', label: 'Company Banner', icon: Image },
          { key: 'posts', label: 'Post Templates', icon: FileText },
          { key: 'carousels', label: 'Carousels', icon: Palette },
          { key: 'company', label: 'Company Info', icon: Share2 }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className="flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-all hover:opacity-85"
            style={
              activeTab === tab.key
                ? { borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }
                : { borderColor: 'transparent', color: 'var(--text-muted)' }
            }
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'banner' && (
          <div className="space-y-6">
            <div className="rounded-xl border p-6" style={cardSurfaceStyle}>
              <h2 className="mb-4 text-lg font-semibold" style={{ color: 'var(--text-default)' }}>
                LinkedIn Company Banner
              </h2>
              <p className="mb-6 text-sm" style={{ color: 'var(--text-muted)' }}>
                Recommended size: 1128×191 pixels. This banner appears at the top of your company page.
              </p>
              <BannerPreview
                banner={content.banner}
                isEditing={isEditing}
                onChange={(banner) => setContent({ ...content, banner })}
              />
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="mr-0 flex-1 rounded-xl border p-4 md:mr-4" style={noticePanelStyle}>
                <p className="text-sm" style={{ color: 'var(--text-default)' }}>
                  <Sparkles className="mr-2 inline h-4 w-4" style={{ color: 'var(--primary-color)' }} />
                  Use these templates as starting points. Customize with your specific context and always add relevant hashtags.
                </p>
              </div>
              {isEditing && (
                <button
                  onClick={addNewPost}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:brightness-95"
                  style={primaryButtonStyle}
                >
                  <Plus className="h-4 w-4" />
                  Add Post
                </button>
              )}
            </div>
            <div className="grid gap-6">
              {content.posts.map((post, index) => (
                <LinkedInPostCard
                  key={post.id}
                  post={post}
                  index={index}
                  isEditing={isEditing}
                  onChange={(updatedPost) => updatePost(index, updatedPost)}
                  onDelete={() => deletePost(index)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'carousels' && (
          <div className="space-y-6">
            <div className="rounded-xl border p-4" style={noticePanelStyle}>
              <p className="text-sm" style={{ color: 'var(--text-default)' }}>
                <Sparkles className="mr-2 inline h-4 w-4" style={{ color: 'var(--primary-color)' }} />
                LinkedIn carousels get 2x more engagement than single-image posts. Use these 5-slide templates.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {CAROUSEL_TEMPLATES.map((carousel, index) => (
                <CarouselCard key={carousel.id} carousel={carousel} index={index} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'company' && (
          <div className="max-w-2xl">
            <CompanyInfo
              info={content.companyInfo}
              isEditing={isEditing}
              onChange={(companyInfo) => setContent({ ...content, companyInfo })}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default LinkedInPage;
