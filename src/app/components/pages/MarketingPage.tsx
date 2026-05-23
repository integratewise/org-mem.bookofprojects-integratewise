import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download, Linkedin, MessageCircle,
  FileText, Image, Mail, Presentation,
  Copy, Check, ExternalLink,
  Smartphone, Sparkles, Palette, X
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { copyToClipboard } from '../../utils/clipboard';
import { TAGLINES, BRAND, CONTACT } from '../../lib/brand';

// ─── Content Library ──────────────────────────────────────────────────────────

const CONTENT_LIBRARY = {
  linkedin: {
    banner: {
      title: 'LinkedIn Company Banner',
      description: '1128×191 px — Professional banner for company page',
      bg: 'linear-gradient(135deg, var(--forest) 0%, var(--forest-mid) 55%, var(--gold) 100%)',
      content: {
        headline: BRAND.name,
        tagline: TAGLINES.primary,
        cta: BRAND.website,
      },
    },
    carousels: [
      {
        title: 'The $8M Lesson',
        subtitle: '5-slide story about disconnected tools',
        slides: [
          'The $8M Lesson: When Disconnected Tools Nearly Cost Everything',
          'Signal 1: Support ticket spiked. Signal 2: Product adoption dropped. Signal 3: Executive warning sat in a note.',
          'Three signals. Three systems. Zero connection.',
          'The account was nearly lost. That\'s the cost of fragmentation.',
          'What if every signal fed into one place — and that place could think?',
        ],
        theme: 'forest',
      },
      {
        title: 'Context-Aware AI',
        subtitle: 'How IntegrateWise thinks before acting',
        slides: [
          'AI Without Context is Just Fancy Autocomplete',
          'Most AI tools guess. They don\'t know your business.',
          'IntegrateWise builds an Entity 360° — every customer, every touchpoint, connected.',
          'AI reasons with full context. Proposes actions. Waits for approval.',
          'Context before Intelligence. Governance before Execution.',
        ],
        theme: 'gold',
      },
      {
        title: 'The Spine Explained',
        subtitle: 'Your unified intelligence layer',
        slides: [
          'Meet the Spine: Your Single Source of Truth',
          'Every tool you use. Every decision you make. All connected.',
          'The Spine unifies your tech stack into one Adaptive layer.',
          'AI operates on top — with full context, not guesses.',
          'One workspace. One intelligence. One truth.',
        ],
        theme: 'slate',
      },
    ],
    posts: [
      {
        title: 'Problem-Solution Post',
        content: `Modern work is fragmented. Tools disconnected. Knowledge scattered. AI without context.

That's why we built ${BRAND.name} — a ${BRAND.category} where your entire tech stack connects into one Adaptive Spine.

AI surfaces what matters. Humans approve every action.

Context before Intelligence. Governance before Execution.

#KnowledgeWorkspace #AIGovernance #IntegrateWise`,
        image: 'forest',
      },
      {
        title: 'Thought Leadership',
        content: `The $8M Lesson:

A support ticket spiked. Product adoption dropped. An executive warning sat in a personal note.

Three signals. Three systems. Zero connection.

The account was nearly lost.

That's the cost of disconnected tools.

What if every signal fed into one place — and that place could think?

That's IntegrateWise.`,
        image: 'gold',
      },
      {
        title: 'Product Announcement',
        content: `Introducing the Spine — your unified intelligence layer.

✓ Connect all your tools
✓ Build Entity 360 views
✓ AI reasons with full context
✓ Every action waits for approval

The Memory-Native Operating System is here.

Ready to see your connected reality?

👉 ${BRAND.website}`,
        image: 'slate',
      },
    ],
  },
  whatsapp: {
    catalog: [
      { id: 'platform',  name: `${BRAND.name} Platform`,  price: 'Starting at $499/mo', description: `${BRAND.category} with Adaptive Spine` },
      { id: 'spine',     name: 'Adaptive Spine',           price: 'Included',            description: 'Unified intelligence layer'        },
      { id: 'ai',        name: 'Context-Aware AI',         price: 'Included',            description: 'AI that understands your business'  },
      { id: 'approvals', name: 'Approval Workflows',       price: 'Included',            description: 'Human-governed execution'          },
    ],
    templates: [
      {
        title: 'Welcome Message',
        text: `👋 Welcome to IntegrateWise!

${TAGLINES.descriptorExtended} — connecting your tools, context, and decisions in one place.

How can we help you today?

🔹 Learn about our Platform
🔹 Book a Demo
🔹 Talk to Sales`,
      },
      {
        title: 'Demo Booking',
        text: `📅 Ready to see IntegrateWise in action?

We'd love to show you how the Spine connects your entire workspace and how ${TAGLINES.primary}.

👉 Book your demo: ${CONTACT.demo}

Or reply with your preferred time!`,
      },
    ],
  },
  email: {
    newsletters: [
      {
        subject: 'This week: The $8M lesson in disconnected tools',
        preview: 'How fragmented systems nearly cost one company their biggest account...',
        body: `Hi [First Name],

Here's a story from our founder.

Eight million dollars in ARR. One CSM. Seventeen tools that didn't talk to each other.

Every morning: copy from Salesforce, paste to Jira, update the spreadsheet, ping the Slack channel, wait for the email reply. Two hours gone before the real work started.

Then one day, a customer escalation slipped through the cracks. Not because anyone was careless — but because the context lived in seven different places and nobody had the full picture.

That's when we decided to build the system we wished existed.

IntegrateWise connects every tool to one Spine. AI reads from it, carries memory across sessions, and every action goes through a governance gate first.

The round trip is the product.

→ Try it free: https://integratewise.ai

— The IntegrateWise Team`,
      },
      {
        subject: 'New: Approval-first AI workflows',
        preview: 'Govern AI actions with human checkpoints built-in...',
        body: `Hi [First Name],

We just shipped something we've been building toward since day one.

Approval-first AI workflows.

Here's what that means in practice:
• AI proposes the action — you approve or reject it
• Every decision is logged to the Spine
• Context from previous sessions is always present
• No action executes without a governance checkpoint

This isn't a feature. It's the entire philosophy.

AI that forgets every session isn't useful. AI that acts without your approval isn't safe. We built both: persistent memory and built-in governance.

→ See how it works: https://integratewise.ai/quick-start

— The IntegrateWise Team`,
      },
      {
        subject: 'You are the integration layer. We fix that.',
        preview: "If you're copy-pasting between tools every day, this is for you...",
        body: `Hi [First Name],

Quick question: how much of your day is spent moving information between tools?

Copying from CRM to project tracker. Summarising a meeting into a ticket. Updating a spreadsheet that three other people also maintain.

If the answer is "more than 30 minutes", you're the integration layer. A human doing the job a system should do.

IntegrateWise was built to replace that pattern entirely:

1. Tools connect to the Spine — one persistent knowledge layer
2. AI reads from the Spine — full context, every session
3. You approve the action — governance built in, not bolted on
4. Data flows back — the Spine updates, memory accumulates

The round trip happens automatically. You stop being the middleware.

→ Start for free: https://integratewise.ai

— The IntegrateWise Team`,
      },
    ],
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getSlideGradient(theme: string): string {
  const map: Record<string, string> = {
    forest: 'linear-gradient(135deg, var(--forest) 0%, var(--forest-mid) 60%, var(--gold) 100%)',
    gold:   'linear-gradient(135deg, var(--gold) 0%, var(--forest-mid) 60%, var(--forest) 100%)',
    slate:  'linear-gradient(135deg, var(--slate) 0%, var(--slate-mid) 60%, var(--forest-mid) 100%)',
  };
  return map[theme] ?? map.forest;
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Copy Button ─────────────────────────────────────────────────────────────

function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={() => { copyToClipboard(text); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
      style={{
        background: copied ? 'var(--forest)' : 'var(--paper-deep)',
        color: copied ? 'var(--paper)' : 'var(--forest)',
        border: '1px solid var(--rule-light)',
      }}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied!' : label}
    </motion.button>
  );
}

// ─── LinkedIn Post Card ───────────────────────────────────────────────────────

function LinkedInPostCard({ post, index }: { post: typeof CONTENT_LIBRARY.linkedin.posts[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 }}
        className="overflow-hidden rounded-xl border flex flex-col"
        style={{ background: 'var(--surface-raised)', borderColor: 'var(--rule-light)', boxShadow: 'var(--shadow-sm)' }}
      >
        {/* Theme strip */}
        <div className="h-2 w-full" style={{ background: getSlideGradient(post.image) }} />

        <div className="p-5 flex flex-col flex-1">
          <div className="mb-2 flex items-center gap-2">
            <Linkedin className="h-4 w-4" style={{ color: 'var(--forest)' }} />
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--slate-mid)', fontFamily: 'var(--font-mono)' }}>
              LinkedIn Post
            </span>
          </div>

          <p className="text-xs font-semibold mb-2" style={{ color: 'var(--ink)' }}>{post.title}</p>

          <p className={`text-sm whitespace-pre-line leading-relaxed flex-1 ${expanded ? '' : 'line-clamp-4'}`}
             style={{ color: 'var(--ink)' }}>
            {post.content}
          </p>

          {!expanded && post.content.length > 200 && (
            <button onClick={() => setExpanded(true)} className="mt-1 text-xs hover:underline text-left"
                    style={{ color: 'var(--forest)' }}>
              Read more
            </button>
          )}

          <div className="mt-4 flex gap-2 pt-3 border-t" style={{ borderColor: 'var(--rule-light)' }}>
            <CopyButton text={post.content} label="Copy Post" />
            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:opacity-80"
              style={{ borderColor: 'var(--rule)', color: 'var(--slate-mid)', background: 'transparent' }}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Preview
            </button>
          </div>
        </div>
      </motion.div>

      {/* LinkedIn preview modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
             style={{ background: 'rgba(12,12,12,0.55)' }}
             onClick={() => setShowPreview(false)}>
          <div className="w-full max-w-lg rounded-2xl overflow-hidden"
               style={{ background: 'var(--surface-raised)', border: '1px solid var(--rule)', boxShadow: 'var(--shadow-2xl)' }}
               onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--rule)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                     style={{ background: 'var(--forest)', color: 'var(--paper)', fontFamily: 'var(--font-display)' }}>IW</div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>IntegrateWise</p>
                  <p className="text-xs" style={{ color: 'var(--slate-mid)' }}>Memory-Native Operating System · Just now</p>
                </div>
              </div>
              <button onClick={() => setShowPreview(false)} className="p-1 rounded-lg hover:opacity-60">
                <X className="h-4 w-4" style={{ color: 'var(--slate-mid)' }} />
              </button>
            </div>
            <div className="p-5">
              <p className="text-sm whitespace-pre-line leading-relaxed" style={{ color: 'var(--ink)' }}>
                {post.content}
              </p>
            </div>
            <div className="flex gap-6 px-5 py-3 border-t text-xs font-medium"
                 style={{ borderColor: 'var(--rule-light)', color: 'var(--slate-mid)' }}>
              <span>👍 Like</span>
              <span>💬 Comment</span>
              <span>↗ Repost</span>
              <span>✉ Send</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Carousel Card ────────────────────────────────────────────────────────────

function CarouselCard({ carousel, index }: { carousel: typeof CONTENT_LIBRARY.linkedin.carousels[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const handleDownload = () => {
    const content = carousel.slides
      .map((slide, i) => `Slide ${i + 1}\n${'─'.repeat(40)}\n${slide}`)
      .join('\n\n');
    downloadTextFile(`${carousel.title.replace(/\s+/g, '-')}-carousel.txt`, content);
  };

  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="overflow-hidden rounded-xl border"
      style={{ background: 'var(--surface-raised)', borderColor: 'var(--rule-light)', boxShadow: 'var(--shadow-sm)' }}
    >
      {/* Gradient preview */}
      <div className="h-28 flex items-center justify-center px-6"
           style={{ background: getSlideGradient(carousel.theme) }}>
        <div className="text-center">
          <Presentation className="w-7 h-7 mx-auto mb-1.5 opacity-80" style={{ color: 'var(--paper)' }} />
          <p className="font-bold text-base" style={{ color: 'var(--paper)', fontFamily: 'var(--font-serif)' }}>{carousel.title}</p>
          <p className="text-xs mt-0.5 opacity-70" style={{ color: 'var(--paper)' }}>{carousel.slides.length} slides</p>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center gap-2">
          <Linkedin className="h-4 w-4" style={{ color: 'var(--forest)' }} />
          <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--slate-mid)', fontFamily: 'var(--font-mono)' }}>
            LinkedIn Carousel
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: 'var(--slate-mid)' }}>{carousel.subtitle}</p>

        <div className={`space-y-2 ${expanded ? '' : 'max-h-28 overflow-hidden'}`}>
          {carousel.slides.map((slide, i) => (
            <div key={i} className="flex gap-3 text-sm items-start">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-medium mt-0.5"
                    style={{ background: 'var(--forest)', color: 'var(--paper)' }}>
                {i + 1}
              </span>
              <div className="flex-1 flex items-start justify-between gap-2">
                <p className="text-sm leading-snug" style={{ color: 'var(--ink)' }}>{slide}</p>
                <CopyButton text={slide} label="" />
              </div>
            </div>
          ))}
        </div>

        {!expanded && (
          <button onClick={() => setExpanded(true)} className="mt-2 text-xs hover:underline"
                  style={{ color: 'var(--forest)' }}>
            Show all {carousel.slides.length} slides
          </button>
        )}

        <div className="mt-4 flex gap-2 pt-3 border-t" style={{ borderColor: 'var(--rule-light)' }}>
          <CopyButton text={carousel.slides.join('\n\n---\n\n')} label="Copy All Slides" />
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:opacity-80"
            style={{ borderColor: 'var(--rule)', color: 'var(--slate-mid)', background: 'transparent' }}
          >
            <Download className="h-3.5 w-3.5" />
            Download .txt
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── WhatsApp Catalog Item ────────────────────────────────────────────────────

function CatalogItem({ item, index }: { item: typeof CONTENT_LIBRARY.whatsapp.catalog[0]; index: number }) {
  const message = `*${item.name}*\n${item.description}\n💰 ${item.price}\n\nLearn more: https://integratewise.ai`;

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="rounded-xl border p-4"
      style={{ background: 'var(--surface-raised)', borderColor: 'var(--rule-light)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{item.name}</h4>
          <p className="mt-0.5 text-xs" style={{ color: 'var(--slate-mid)' }}>{item.description}</p>
        </div>
        <span className="text-sm font-bold shrink-0" style={{ color: 'var(--forest)' }}>{item.price}</span>
      </div>
      <CopyButton text={message} label="Copy as WhatsApp message" />
    </motion.div>
  );
}

// ─── WhatsApp Template ────────────────────────────────────────────────────────

function WhatsAppTemplate({ template, index }: { template: typeof CONTENT_LIBRARY.whatsapp.templates[0]; index: number }) {
  return (
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="rounded-xl border p-5"
      style={{ background: 'var(--surface-raised)', borderColor: 'var(--rule-light)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="mb-3 flex items-center gap-2">
        <MessageCircle className="h-4 w-4" style={{ color: 'var(--forest)' }} />
        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--slate-mid)', fontFamily: 'var(--font-mono)' }}>
          WhatsApp Template
        </span>
      </div>
      <h4 className="mb-2 font-semibold text-sm" style={{ color: 'var(--ink)' }}>{template.title}</h4>
      <div className="mb-3 rounded-xl p-3"
           style={{ background: 'var(--paper-warm)', border: '1px solid var(--rule-light)' }}>
        <p className="text-sm whitespace-pre-line leading-relaxed" style={{ color: 'var(--ink)' }}>
          {template.text}
        </p>
      </div>
      <CopyButton text={template.text} label="Copy Message" />
    </motion.div>
  );
}

// ─── LinkedIn Banner ──────────────────────────────────────────────────────────

function BannerPreview({ config }: { config: typeof CONTENT_LIBRARY.linkedin.banner }) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    if (!bannerRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(bannerRef.current, {
        pixelRatio: 2,
        width: 1128,
        height: 191,
        style: { transform: 'none' },
      });
      const link = document.createElement('a');
      link.download = 'IntegrateWise-LinkedIn-Banner.png';
      link.href = dataUrl;
      link.click();
    } catch (e) {
      alert('Export failed. Try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'var(--rule-light)' }}>
        <div style={{ transform: 'scale(0.6)', transformOrigin: 'top left', width: '166.67%', height: '115px' }}>
          <div
            ref={bannerRef}
            className="relative flex h-[191px] w-[1128px] items-center justify-between overflow-hidden px-14"
            style={{ background: 'linear-gradient(135deg, var(--forest) 0%, var(--forest-mid) 55%, var(--gold) 100%)' }}
          >
            {/* Subtle radial glow */}
            <div className="absolute inset-0 pointer-events-none"
                 style={{ background: 'radial-gradient(ellipse 40% 80% at 80% 50%, color-mix(in srgb, var(--gold) 18%, transparent) 0%, transparent 70%)' }} />

            {/* Left: text */}
            <div className="relative z-10">
              <h3 className="text-4xl font-black tracking-wide" style={{ color: 'var(--paper)', fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>
                {config.content.headline}
              </h3>
              <p className="mt-1 text-base" style={{ color: 'var(--gold-light)' }}>
                {config.content.tagline}
              </p>
              <p className="mt-2 text-sm font-medium" style={{ color: 'var(--paper-warm)', opacity: 0.8 }}>
                {config.content.cta}
              </p>
            </div>

            {/* Right: IW mark */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="flex h-20 w-20 items-center justify-center rounded-full"
                   style={{ background: 'color-mix(in srgb, var(--paper) 12%, transparent)', border: '1.5px solid color-mix(in srgb, var(--gold) 50%, transparent)' }}>
                <span className="text-3xl font-black" style={{ color: 'var(--paper)', fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}>IW</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        disabled={isExporting}
        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:brightness-95 disabled:opacity-50"
        style={{ background: 'var(--forest)', color: 'var(--paper)' }}
      >
        <Download className="h-4 w-4" />
        {isExporting ? 'Exporting...' : 'Download Banner (1128×191)'}
      </button>
    </div>
  );
}

// ─── Email Card ───────────────────────────────────────────────────────────────

function EmailCard({ email, index }: { email: typeof CONTENT_LIBRARY.email.newsletters[0]; index: number }) {
  const [showBody, setShowBody] = useState(false);

  return (
    <motion.div
      initial={{ x: -16, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="rounded-xl border overflow-hidden"
      style={{ background: 'var(--surface-raised)', borderColor: 'var(--rule-light)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="p-5">
        <div className="mb-2 flex items-center gap-2">
          <Mail className="h-4 w-4" style={{ color: 'var(--forest)' }} />
          <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--slate-mid)', fontFamily: 'var(--font-mono)' }}>
            Email Template
          </span>
        </div>
        <h4 className="font-semibold text-sm mb-0.5" style={{ color: 'var(--ink)' }}>{email.subject}</h4>
        <p className="text-xs" style={{ color: 'var(--slate-mid)' }}>{email.preview}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <CopyButton text={email.subject} label="Copy Subject" />
          <CopyButton text={email.body} label="Copy Full Email" />
          <button
            onClick={() => setShowBody(!showBody)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:opacity-80"
            style={{ borderColor: 'var(--rule)', color: 'var(--slate-mid)', background: 'transparent' }}
          >
            {showBody ? 'Hide body' : 'Preview body'}
          </button>
        </div>
      </div>

      {/* Body preview */}
      <AnimatePresence>
        {showBody && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              <div className="rounded-lg p-4 text-xs whitespace-pre-wrap leading-relaxed"
                   style={{ background: 'var(--paper-warm)', border: '1px solid var(--rule-light)', color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>
                {email.body}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function MarketingPage() {
  const [activeTab, setActiveTab] = useState<'linkedin' | 'whatsapp' | 'email'>('linkedin');

  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-10">
      <motion.div initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <Palette className="h-5 w-5" style={{ color: 'var(--forest)' }} />
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--forest)', fontFamily: 'var(--font-mono)' }}>
            Marketing Hub
          </span>
        </div>
        <h1 className="mb-1 text-2xl font-bold" style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>
          Marketing Deliverables
        </h1>
        <p className="text-sm" style={{ color: 'var(--slate-mid)' }}>
          Ready-to-use content, templates, and assets for all channels
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="mb-8 flex gap-1 border-b" style={{ borderColor: 'var(--rule-light)' }}>
        {([
          { key: 'linkedin', label: 'LinkedIn',  icon: Linkedin       },
          { key: 'whatsapp', label: 'WhatsApp',  icon: MessageCircle  },
          { key: 'email',    label: 'Email',      icon: Mail           },
        ] as const).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-medium transition-all"
            style={
              activeTab === tab.key
                ? { borderColor: 'var(--forest)', color: 'var(--forest)' }
                : { borderColor: 'transparent', color: 'var(--slate-mid)' }
            }
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── LinkedIn ── */}
        {activeTab === 'linkedin' && (
          <motion.div key="linkedin" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-10">
            <section>
              <SectionHeader icon={Image} title="Company Banner" />
              <div className="rounded-xl border p-6" style={{ background: 'var(--surface-raised)', borderColor: 'var(--rule-light)', boxShadow: 'var(--shadow-sm)' }}>
                <BannerPreview config={CONTENT_LIBRARY.linkedin.banner} />
              </div>
            </section>

            <section>
              <SectionHeader icon={FileText} title="Post Templates" />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {CONTENT_LIBRARY.linkedin.posts.map((post, i) => (
                  <LinkedInPostCard key={i} post={post} index={i} />
                ))}
              </div>
            </section>

            <section>
              <SectionHeader icon={Presentation} title="Carousel Templates" />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {CONTENT_LIBRARY.linkedin.carousels.map((carousel, i) => (
                  <CarouselCard key={i} carousel={carousel} index={i} />
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {/* ── WhatsApp ── */}
        {activeTab === 'whatsapp' && (
          <motion.div key="whatsapp" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-10">
            <section>
              <SectionHeader icon={Smartphone} title="Business Catalog" />
              <div className="grid gap-4 sm:grid-cols-2">
                {CONTENT_LIBRARY.whatsapp.catalog.map((item, i) => (
                  <CatalogItem key={item.id} item={item} index={i} />
                ))}
              </div>
            </section>

            <section>
              <SectionHeader icon={MessageCircle} title="Message Templates" />
              <div className="grid gap-4 md:grid-cols-2">
                {CONTENT_LIBRARY.whatsapp.templates.map((template, i) => (
                  <WhatsAppTemplate key={i} template={template} index={i} />
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {/* ── Email ── */}
        {activeTab === 'email' && (
          <motion.div key="email" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} className="space-y-6">
            <section>
              <SectionHeader icon={Mail} title="Email Templates" />
              <div className="space-y-4">
                {CONTENT_LIBRARY.email.newsletters.map((email, i) => (
                  <EmailCard key={i} email={email} index={i} />
                ))}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Icon className="h-5 w-5" style={{ color: 'var(--forest)' }} />
      <h2 className="text-lg font-semibold" style={{ color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>
        {title}
      </h2>
    </div>
  );
}

export default MarketingPage;
