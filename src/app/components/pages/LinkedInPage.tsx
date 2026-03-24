import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Linkedin, Download, Copy, Check, ExternalLink, 
  Image, FileText, Share2, Sparkles, Palette,
  Edit2, Save, X, Plus, Trash2, RotateCcw, RefreshCw
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { copyToClipboard } from '../../utils/clipboard';
import { autoSyncContent, loadConnections } from '../../services/sync';

// Default LinkedIn Content
const DEFAULT_LINKEDIN_CONTENT = {
  banner: {
    title: "LinkedIn Company Banner",
    description: "1128×191 px - Professional banner for company page",
    bg: "linear-gradient(135deg, #0d1f33 0%, #1e3a5f 30%, #4154A3 60%, #5a6bc4 100%)",
    content: {
      headline: "IntegrateWise",
      tagline: "AI Thinks in Context — and Waits for Approval",
      cta: "integratewise.ai"
    }
  },
  posts: [
    {
      id: '1',
      title: "Problem-Solution Post",
      content: `Modern work is fragmented. Tools disconnected. Knowledge scattered. AI without context.

That's why we built IntegrateWise — a Knowledge Workspace where your entire tech stack connects into one Adaptive Spine.

AI surfaces what matters. Humans approve every action.

Context before Intelligence. Governance before Execution.

#KnowledgeWorkspace #AIGovernance #IntegrateWise`,
      image: "gradient-dark"
    },
    {
      id: '2',
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
      id: '3',
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
  ],
  companyInfo: {
    name: "IntegrateWise",
    tagline: "Knowledge Workspace Over the Spine and Empowered by AI",
    about: `IntegrateWise is a knowledge workspace powered by the Spine — a unified intelligence layer that connects tools, context, knowledge, and decisions.

By organizing operational truth into the Spine, AI can reason across systems, propose actions, and continuously learn while ensuring that every action waits for human approval.

IntegrateWise brings work, knowledge, and decisions together into one governed environment where intelligence is contextual and execution remains human-controlled.`,
    specialties: "AI Workspace, Knowledge Workspace, Context-Aware AI, Enterprise AI, Human-Governed AI, Workflow Intelligence, Data Integration, Decision Intelligence",
    website: "https://integratewise.ai",
    industry: "Enterprise Software",
    size: "11-50 employees",
    headquarters: "Bengaluru, India"
  }
};

// Load content from localStorage or use default
function loadContent() {
  const saved = localStorage.getItem('linkedin_content');
  return saved ? JSON.parse(saved) : DEFAULT_LINKEDIN_CONTENT;
}

// Save content to localStorage
function saveContent(content: typeof DEFAULT_LINKEDIN_CONTENT) {
  localStorage.setItem('linkedin_content', JSON.stringify(content));
}

// Copy Button Component
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

// Editable Field Component
function EditableField({ 
  value, 
  onChange, 
  isEditing, 
  multiline = false,
  className = ""
}: { 
  value: string; 
  onChange: (value: string) => void; 
  isEditing: boolean;
  multiline?: boolean;
  className?: string;
}) {
  if (!isEditing) {
    return <span className={className}>{value}</span>;
  }
  
  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} w-full px-3 py-2 border border-[#D5DAE5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4154A3] resize-y min-h-[100px]`}
      />
    );
  }
  
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${className} w-full px-3 py-2 border border-[#D5DAE5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4154A3]`}
    />
  );
}

// LinkedIn Banner Preview
function BannerPreview({ 
  banner, 
  isEditing, 
  onChange 
}: { 
  banner: typeof DEFAULT_LINKEDIN_CONTENT.banner; 
  isEditing: boolean;
  onChange: (banner: typeof DEFAULT_LINKEDIN_CONTENT.banner) => void;
}) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

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

  const updateContent = (key: string, value: string) => {
    onChange({
      ...banner,
      content: { ...banner.content, [key]: value }
    });
  };

  return (
    <div className="space-y-4">
      <div 
        ref={bannerRef}
        className="w-full aspect-[1128/191] rounded-lg overflow-hidden flex items-center justify-center relative"
        style={{ background: banner.bg }}
      >
        <div className="text-center text-white px-8">
          {isEditing ? (
            <>
              <input
                value={banner.content.headline}
                onChange={(e) => updateContent('headline', e.target.value)}
                className="text-2xl font-bold bg-white/20 text-white text-center w-full px-2 py-1 rounded mb-2"
              />
              <input
                value={banner.content.tagline}
                onChange={(e) => updateContent('tagline', e.target.value)}
                className="text-base bg-white/20 text-white text-center w-full px-2 py-1 rounded mb-1"
              />
              <input
                value={banner.content.cta}
                onChange={(e) => updateContent('cta', e.target.value)}
                className="text-sm bg-white/20 text-white text-center w-full px-2 py-1 rounded"
              />
            </>
          ) : (
            <>
              <h3 className="text-3xl font-bold mb-2">{banner.content.headline}</h3>
              <p className="text-lg opacity-90">{banner.content.tagline}</p>
              <p className="text-sm mt-2 opacity-70">{banner.content.cta}</p>
            </>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleDownload}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg text-sm font-medium hover:bg-[#0958a8] disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {isExporting ? 'Exporting...' : 'Download PNG'}
        </button>
        <CopyButton text={`${banner.content.headline}\n${banner.content.tagline}`} label="Copy Text" />
      </div>
    </div>
  );
}

// LinkedIn Post Card
function LinkedInPostCard({ 
  post, 
  index, 
  isEditing, 
  onChange,
  onDelete
}: { 
  post: typeof DEFAULT_LINKEDIN_CONTENT.posts[0]; 
  index: number;
  isEditing: boolean;
  onChange: (post: typeof DEFAULT_LINKEDIN_CONTENT.posts[0]) => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl border border-[#E8ECF2] overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4154A3] to-[#1B2544] flex items-center justify-center text-white font-bold">
            IW
          </div>
          <div className="flex-1">
            {isEditing ? (
              <input
                value={post.title}
                onChange={(e) => onChange({ ...post, title: e.target.value })}
                className="font-semibold text-[#1B2544] w-full px-2 py-1 border border-[#D5DAE5] rounded"
              />
            ) : (
              <h4 className="font-semibold text-[#1B2544]">IntegrateWise</h4>
            )}
            <p className="text-xs text-[#5F6E93]">Company • AI Technology</p>
          </div>
          {isEditing && (
            <button
              onClick={onDelete}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              title="Delete post"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {isEditing ? (
          <textarea
            value={post.content}
            onChange={(e) => onChange({ ...post, content: e.target.value })}
            className="w-full text-sm text-[#1B2544] whitespace-pre-wrap p-3 border border-[#D5DAE5] rounded-lg min-h-[200px]"
          />
        ) : (
          <div className="text-[#1B2544] whitespace-pre-wrap text-sm leading-relaxed">
            {expanded ? post.content : post.content.slice(0, 200) + (post.content.length > 200 ? '...' : '')}
          </div>
        )}
        
        {!isEditing && post.content.length > 200 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[#0A66C2] text-sm font-medium mt-2 hover:underline"
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}
        
        <div className="mt-4 p-4 bg-[#F8FAFC] rounded-lg border border-dashed border-[#D5DAE5]">
          <p className="text-xs text-[#5F6E93] mb-2">Suggested image style:</p>
          <div className="w-full h-32 rounded-lg bg-gradient-to-br from-[#4154A3]/20 to-[#1B2544]/20 flex items-center justify-center">
            <Image className="w-8 h-8 text-[#9BA8C2]" />
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-[#E8ECF2] bg-[#F8FAFC] flex items-center justify-between">
        {isEditing ? (
          <input
            value={post.title}
            onChange={(e) => onChange({ ...post, title: e.target.value })}
            className="text-sm font-medium text-[#1B2544] px-2 py-1 border border-[#D5DAE5] rounded"
          />
        ) : (
          <span className="text-xs text-[#5F6E93]">{post.title}</span>
        )}
        <CopyButton text={post.content} label="Copy Post" />
      </div>
    </motion.div>
  );
}

// Company Info Section
function CompanyInfo({ 
  info, 
  isEditing, 
  onChange 
}: { 
  info: typeof DEFAULT_LINKEDIN_CONTENT.companyInfo; 
  isEditing: boolean;
  onChange: (info: typeof DEFAULT_LINKEDIN_CONTENT.companyInfo) => void;
}) {
  const updateField = (key: keyof typeof info, value: string) => {
    onChange({ ...info, [key]: value });
  };

  return (
    <div className="bg-white rounded-xl border border-[#E8ECF2] p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#4154A3] to-[#1B2544] flex items-center justify-center text-white text-2xl font-bold">
          IW
        </div>
        <div className="flex-1">
          {isEditing ? (
            <>
              <input
                value={info.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="text-xl font-bold text-[#1B2544] w-full px-2 py-1 border border-[#D5DAE5] rounded mb-1"
              />
              <input
                value={info.tagline}
                onChange={(e) => updateField('tagline', e.target.value)}
                className="text-sm text-[#5F6E93] w-full px-2 py-1 border border-[#D5DAE5] rounded"
              />
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-[#1B2544]">{info.name}</h3>
              <p className="text-sm text-[#5F6E93]">{info.tagline}</p>
            </>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold text-[#9BA8C2] uppercase tracking-wider mb-2">About</p>
          {isEditing ? (
            <textarea
              value={info.about}
              onChange={(e) => updateField('about', e.target.value)}
              className="w-full text-sm text-[#475578] whitespace-pre-wrap p-3 border border-[#D5DAE5] rounded-lg min-h-[150px]"
            />
          ) : (
            <p className="text-sm text-[#475578] whitespace-pre-wrap">{info.about}</p>
          )}
          <div className="mt-2">
            <CopyButton text={info.about} label="Copy About Text" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E8ECF2]">
          {[
            { key: 'industry', label: 'Industry' },
            { key: 'size', label: 'Company Size' },
            { key: 'headquarters', label: 'Headquarters' },
            { key: 'website', label: 'Website' },
          ].map(({ key, label }) => (
            <div key={key}>
              <p className="text-xs text-[#9BA8C2]">{label}</p>
              {isEditing ? (
                <input
                  value={info[key as keyof typeof info]}
                  onChange={(e) => updateField(key as keyof typeof info, e.target.value)}
                  className="text-sm font-medium text-[#1B2544] w-full px-2 py-1 border border-[#D5DAE5] rounded"
                />
              ) : (
                <p className="text-sm font-medium text-[#1B2544]">{info[key as keyof typeof info]}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t border-[#E8ECF2]">
          <p className="text-xs font-semibold text-[#9BA8C2] uppercase tracking-wider mb-2">Specialties</p>
          {isEditing ? (
            <textarea
              value={info.specialties}
              onChange={(e) => updateField('specialties', e.target.value)}
              className="w-full text-sm text-[#475578] p-3 border border-[#D5DAE5] rounded-lg"
            />
          ) : (
            <p className="text-sm text-[#475578]">{info.specialties}</p>
          )}
          <div className="mt-2">
            <CopyButton text={info.specialties} label="Copy Specialties" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Component
export function LinkedInPage() {
  const [activeTab, setActiveTab] = useState<'banner' | 'posts' | 'company'>('banner');
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(() => loadContent());
  const [connectedChannels, setConnectedChannels] = useState<string[]>([]);

  // Load connected channels on mount
  useEffect(() => {
    const connections = loadConnections();
    const connected = connections
      .filter(c => c.status === 'connected' && (c.type === 'marketing' || c.type === 'branding'))
      .map(c => c.name);
    setConnectedChannels(connected);
  }, []);

  // Save content when it changes
  useEffect(() => {
    saveContent(content);
  }, [content]);

  const handleSave = () => {
    saveContent(content);
    setIsEditing(false);
    // Trigger auto-sync to connected marketing channels
    autoSyncContent('content', 'linkedin', content);
    // Refresh connected channels
    const connections = loadConnections();
    const connected = connections
      .filter(c => c.status === 'connected' && (c.type === 'marketing' || c.type === 'branding'))
      .map(c => c.name);
    setConnectedChannels(connected);
  };

  const handleReset = () => {
    if (confirm('Reset all content to defaults? This cannot be undone.')) {
      setContent(DEFAULT_LINKEDIN_CONTENT);
      saveContent(DEFAULT_LINKEDIN_CONTENT);
    }
  };

  const addNewPost = () => {
    const newPost = {
      id: Date.now().toString(),
      title: "New Post",
      content: "Enter your post content here...",
      image: "gradient-dark"
    };
    setContent({ ...content, posts: [...content.posts, newPost] });
  };

  const updatePost = (index: number, updatedPost: typeof content.posts[0]) => {
    const newPosts = [...content.posts];
    newPosts[index] = updatedPost;
    setContent({ ...content, posts: newPosts });
  };

  const deletePost = (index: number) => {
    if (confirm('Delete this post?')) {
      const newPosts = content.posts.filter((_, i) => i !== index);
      setContent({ ...content, posts: newPosts });
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
            <Linkedin className="w-5 h-5 text-[#0A66C2]" />
            <span className="text-xs font-semibold text-[#0A66C2] uppercase tracking-wider">Social Media</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1B2544] mb-2">LinkedIn Assets</h1>
          <p className="text-[#5F6E93]">Company page content, banners, and post templates for LinkedIn</p>
          
          {/* Sync Status */}
          {connectedChannels.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <RefreshCw className="w-3 h-3" />
                Synced to: {connectedChannels.join(', ')}
              </span>
            </div>
          )}
        </div>
        
        {/* Edit Controls */}
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 border border-[#D5DAE5] text-[#475578] rounded-lg text-sm font-medium hover:bg-[#F8FAFC]"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#4154A3] text-white rounded-lg text-sm font-medium hover:bg-[#364789]"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 border border-[#D5DAE5] text-[#475578] rounded-lg text-sm font-medium hover:bg-[#F8FAFC]"
                title="Reset to defaults"
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
          { key: 'banner', label: 'Company Banner', icon: Image },
          { key: 'posts', label: 'Post Templates', icon: FileText },
          { key: 'company', label: 'Company Info', icon: Share2 },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === tab.key
                ? 'border-[#0A66C2] text-[#0A66C2]'
                : 'border-transparent text-[#5F6E93] hover:text-[#0A66C2]'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'banner' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E8ECF2] p-6">
              <h2 className="text-lg font-semibold text-[#1B2544] mb-4">LinkedIn Company Banner</h2>
              <p className="text-sm text-[#5F6E93] mb-6">
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
            <div className="flex items-center justify-between">
              <div className="bg-gradient-to-r from-[#0A66C2]/10 to-transparent rounded-xl p-4 border border-[#0A66C2]/20 flex-1 mr-4">
                <p className="text-sm text-[#475578]">
                  <Sparkles className="w-4 h-4 inline mr-2 text-[#0A66C2]" />
                  Use these templates as starting points. Customize with your specific context and always add relevant hashtags.
                </p>
              </div>
              {isEditing && (
                <button
                  onClick={addNewPost}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg text-sm font-medium hover:bg-[#0958a8]"
                >
                  <Plus className="w-4 h-4" />
                  Add Post
                </button>
              )}
            </div>
            <div className="grid gap-6">
              {content.posts.map((post, i) => (
                <LinkedInPostCard 
                  key={post.id} 
                  post={post} 
                  index={i}
                  isEditing={isEditing}
                  onChange={(updated) => updatePost(i, updated)}
                  onDelete={() => deletePost(i)}
                />
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
