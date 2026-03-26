import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, Eye, X, Share2, Linkedin, MessageCircle, 
  FileText, Image, Mail, Presentation, Globe, Filter,
  Search, LayoutGrid, List, Copy, Check, ExternalLink,
  Smartphone, Instagram, Twitter, Facebook, ChevronRight,
  Sparkles, Zap, Palette
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { copyToClipboard } from '../../utils/clipboard';
import { TAGLINES, BRAND, CONTACT } from '../../lib/brand';

// Marketing Content Templates
const CONTENT_LIBRARY = {
  linkedin: {
    banner: {
      title: "LinkedIn Company Banner",
      description: "1128×191 px - Professional banner for company page",
      bg: "linear-gradient(135deg, #0d1f33 0%, #1e3a5f 30%, #4154A3 60%, #5a6bc4 100%)",
      content: {
        headline: BRAND.name,
        tagline: TAGLINES.primary,
        cta: BRAND.website
      }
    },
    carousels: [
      {
        title: "The $8M Lesson",
        subtitle: "5-slide story about disconnected tools",
        slides: [
          "The $8M Lesson: When Disconnected Tools Nearly Cost Everything",
          "Signal 1: Support ticket spiked. Signal 2: Product adoption dropped. Signal 3: Executive warning sat in a note.",
          "Three signals. Three systems. Zero connection.",
          "The account was nearly lost. That's the cost of fragmentation.",
          "What if every signal fed into one place — and that place could think?"
        ],
        theme: "gradient-ocean"
      },
      {
        title: "Context-Aware AI",
        subtitle: "How IntegrateWise thinks before acting",
        slides: [
          "AI Without Context is Just Fancy Autocomplete",
          "Most AI tools guess. They don't know your business.",
          "IntegrateWise builds an Entity 360° — every customer, every touchpoint, connected.",
          "AI reasons with full context. Proposes actions. Waits for approval.",
          "Context before Intelligence. Governance before Execution."
        ],
        theme: "gradient-dark"
      },
      {
        title: "The Spine Explained",
        subtitle: "Your unified intelligence layer",
        slides: [
          "Meet the Spine: Your Single Source of Truth",
          "Every tool you use. Every decision you make. All connected.",
          "The Spine unifies your tech stack into one Adaptive layer.",
          "AI operates on top — with full context, not guesses.",
          "One workspace. One intelligence. One truth."
        ],
        theme: "gradient-sunset"
      }
    ],
    posts: [
      {
        title: "Problem-Solution Post",
        content: `Modern work is fragmented. Tools disconnected. Knowledge scattered. AI without context.

That's why we built ${BRAND.name} — a ${BRAND.category} where your entire tech stack connects into one Adaptive Spine.

AI surfaces what matters. Humans approve every action.

Context before Intelligence. Governance before Execution.

#KnowledgeWorkspace #AIGovernance #IntegrateWise`,
        image: "gradient-dark"
      },
      {
        title: "Thought Leadership",
        content: `The $8M Lesson:

A support ticket spiked. Product adoption dropped. An executive warning sat in a personal note.

Three signals. Three systems. Zero connection.

The account was nearly lost.

That's the cost of disconnected tools.

What if every signal fed into one place — and that place could think?

That's IntegrateWise.`,
        image: "gradient-ocean"
      },
      {
        title: "Product Announcement",
        content: `Introducing the Spine — your unified intelligence layer.

✓ Connect all your tools
✓ Build Entity 360 views
✓ AI reasons with full context
✓ Every action waits for approval

The Knowledge Workspace is here.

Ready to see your connected reality?

👉 Book a demo: integratewise.ai/demo`,
        image: "gradient-sunset"
      }
    ]
  },
  whatsapp: {
    catalog: [
      { id: "platform", name: `${BRAND.name} Platform`, price: "Starting at $499/mo", description: `${BRAND.category} with Adaptive Spine` },
      { id: "spine", name: "Adaptive Spine", price: "Included", description: "Unified intelligence layer" },
      { id: "ai", name: "Context-Aware AI", price: "Included", description: "AI that understands your business" },
      { id: "approvals", name: "Approval Workflows", price: "Included", description: "Human-governed execution" },
    ],
    templates: [
      {
        title: "Welcome Message",
        text: `👋 Welcome to IntegrateWise!

${TAGLINES.descriptorExtended} — connecting your tools, context, and decisions in one place.

How can we help you today?

🔹 Learn about our Platform
🔹 Book a Demo
🔹 Talk to Sales`
      },
      {
        title: "Demo Booking",
        text: `📅 Ready to see IntegrateWise in action?

We'd love to show you how the Spine connects your entire workspace and how ${TAGLINES.primary}.

👉 Book your demo: ${CONTACT.demo}

Or reply with your preferred time!`
      }
    ]
  },
  email: {
    newsletters: [
      {
        subject: "This week: The $8M lesson in disconnected tools",
        preview: "How fragmented systems nearly cost one company their biggest account..."
      },
      {
        subject: "New: Approval-first AI workflows",
        preview: "Govern AI actions with human checkpoints built-in..."
      }
    ]
  }
};

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
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
      style={{ background: copied ? '#10B981' : 'rgba(65,84,163,0.08)', color: copied ? '#fff' : '#4154A3' }}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied!' : label}
    </motion.button>
  );
}

// LinkedIn Post Preview Card
function LinkedInPostCard({ post, index }: { post: any; index: number }) {
  const [expanded, setExpanded] = useState(false);
  
  const gradients: Record<string, string> = {
    "gradient-dark": "linear-gradient(135deg, #1B2544 0%, #2d3561 50%, #4154A3 100%)",
    "gradient-ocean": "linear-gradient(135deg, #0d1f33 0%, #1e3a5f 30%, #4154A3 60%, #6B7DC4 100%)",
    "gradient-sunset": "linear-gradient(135deg, #1a1f36 0%, #4154A3 30%, #8b2f6b 60%, #EB4379 100%)"
  };

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl border border-[#D5DAE5] overflow-hidden shadow-sm"
    >
      {/* Image Preview */}
      <div 
        className="h-48 flex items-center justify-center p-6"
        style={{ background: gradients[post.image] || gradients["gradient-dark"] }}
      >
        <div className="text-center text-white">
          <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-80" />
          <p className="font-bold text-lg">{post.title}</p>
          <p className="text-xs opacity-70 mt-1">LinkedIn Post Template</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Linkedin className="w-4 h-4 text-[#0A66C2]" />
          <span className="text-xs font-medium text-[#9BA8C2]">LINKEDIN POST</span>
        </div>
        
        <p className={`text-sm text-[#475578] whitespace-pre-line ${expanded ? '' : 'line-clamp-3'}`}>
          {post.content}
        </p>
        
        {!expanded && post.content.length > 150 && (
          <button 
            onClick={() => setExpanded(true)}
            className="text-xs text-[#4154A3] mt-2 hover:underline"
          >
            Read more
          </button>
        )}
        
        <div className="flex gap-2 mt-4 pt-4 border-t border-[#E8ECF2]">
          <CopyButton text={post.content} label="Copy Post" />
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-[#5F6E93] hover:bg-[#F0F2F7]">
            <ExternalLink className="w-3.5 h-3.5" />
            Preview
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// WhatsApp Catalog Item
function CatalogItem({ item, index }: { item: any; index: number }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E8ECF2]"
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-[#1B2544]">{item.name}</h4>
          <p className="text-sm text-[#5F6E93] mt-1">{item.description}</p>
        </div>
        <span className="text-sm font-bold text-[#075E54]">{item.price}</span>
      </div>
    </motion.div>
  );
}

// WhatsApp Template Card
function WhatsAppTemplate({ template, index }: { template: any; index: number }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl border border-[#D5DAE5] p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <MessageCircle className="w-4 h-4 text-[#075E54]" />
        <span className="text-xs font-medium text-[#9BA8C2]">WHATSAPP TEMPLATE</span>
      </div>
      
      <h4 className="font-semibold text-[#1B2544] mb-2">{template.title}</h4>
      
      <div className="bg-[#DCF8C6] rounded-lg p-3 mb-3">
        <p className="text-sm text-[#1B2544] whitespace-pre-line">{template.text}</p>
      </div>
      
      <CopyButton text={template.text} label="Copy Message" />
    </motion.div>
  );
}

// Banner Preview Component
function BannerPreview({ config }: { config: any }) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    if (!bannerRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(bannerRef.current, { pixelRatio: 2, width: 1128, height: 191 });
      const link = document.createElement('a');
      link.download = 'IntegrateWise-LinkedIn-Banner.png';
      link.href = dataUrl;
      link.click();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Preview */}
      <div className="overflow-hidden rounded-xl border border-[#D5DAE5]">
        <div style={{ transform: 'scale(0.6)', transformOrigin: 'top left', width: '166.67%' }}>
          <div 
            ref={bannerRef}
            className="w-[1128px] h-[191px] flex items-center justify-between px-12"
            style={{ background: config.bg }}
          >
            <div>
              <h3 className="text-3xl font-bold text-white">{config.content.headline}</h3>
              <p className="text-lg text-white/80 mt-1">{config.content.tagline}</p>
              <p className="text-sm text-white/60 mt-3">{config.content.cta}</p>
            </div>
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white/60" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex gap-2">
        <button 
          onClick={handleDownload}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 bg-[#4154A3] text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {isExporting ? 'Exporting...' : 'Download Banner (1128×191)'}
        </button>
      </div>
    </div>
  );
}

// Main Component
export function MarketingPage() {
  const [activeTab, setActiveTab] = useState<'linkedin' | 'whatsapp' | 'email'>('linkedin');

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <Palette className="w-5 h-5 text-[#4154A3]" />
          <span className="text-xs font-semibold text-[#4154A3] uppercase tracking-wider">Marketing Hub</span>
        </div>
        <h1 className="text-3xl font-bold text-[#1B2544] mb-2">Marketing Deliverables</h1>
        <p className="text-[#5F6E93]">Ready-to-use content, templates, and assets for all channels</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-[#E8ECF2]">
        {[
          { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
          { key: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
          { key: 'email', label: 'Email', icon: Mail },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
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
        {activeTab === 'linkedin' && (
          <motion.div
            key="linkedin"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Banner Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Image className="w-5 h-5 text-[#4154A3]" />
                <h2 className="text-xl font-bold text-[#1B2544]">LinkedIn Company Banner</h2>
              </div>
              <div className="bg-white rounded-xl border border-[#D5DAE5] p-6">
                <BannerPreview config={CONTENT_LIBRARY.linkedin.banner} />
              </div>
            </section>

            {/* Post Templates */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-[#4154A3]" />
                <h2 className="text-xl font-bold text-[#1B2544]">Post Templates</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CONTENT_LIBRARY.linkedin.posts.map((post, i) => (
                  <LinkedInPostCard key={i} post={post} index={i} />
                ))}
              </div>
            </section>

            {/* LinkedIn Carousel */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Presentation className="w-5 h-5 text-[#4154A3]" />
                <h2 className="text-xl font-bold text-[#1B2544]">LinkedIn Carousel Templates</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {CONTENT_LIBRARY.linkedin.carousels.map((carousel, i) => (
                  <CarouselCard key={i} carousel={carousel} index={i} />
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'whatsapp' && (
          <motion.div
            key="whatsapp"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Catalog Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Smartphone className="w-5 h-5 text-[#075E54]" />
                <h2 className="text-xl font-bold text-[#1B2544]">Business Catalog</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {CONTENT_LIBRARY.whatsapp.catalog.map((item, i) => (
                  <CatalogItem key={item.id} item={item} index={i} />
                ))}
              </div>
            </section>

            {/* Message Templates */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-[#075E54]" />
                <h2 className="text-xl font-bold text-[#1B2544]">Message Templates</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {CONTENT_LIBRARY.whatsapp.templates.map((template, i) => (
                  <WhatsAppTemplate key={i} template={template} index={i} />
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'email' && (
          <motion.div
            key="email"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-[#4154A3]" />
                <h2 className="text-xl font-bold text-[#1B2544]">Newsletter Templates</h2>
              </div>
              
              <div className="space-y-4">
                {CONTENT_LIBRARY.email.newsletters.map((email, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-xl border border-[#D5DAE5] p-5"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-[#9BA8C2]" />
                      <span className="text-xs text-[#9BA8C2]">NEWSLETTER SUBJECT LINE</span>
                    </div>
                    <h4 className="font-semibold text-[#1B2544] mb-1">{email.subject}</h4>
                    <p className="text-sm text-[#5F6E93]">{email.preview}</p>
                    <div className="mt-3">
                      <CopyButton text={email.subject} label="Copy Subject" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
