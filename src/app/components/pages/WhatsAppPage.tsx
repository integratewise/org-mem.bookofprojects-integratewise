import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  MessageCircle, Copy, Check, Smartphone, 
  ShoppingBag, Clock, CheckCircle, Send,
  Edit2, Save, X, Plus, Trash2, RotateCcw
} from 'lucide-react';
import { copyToClipboard } from '../../utils/clipboard';
import { loadJson, saveJson } from '../../lib/storage';

// Default WhatsApp Content
const DEFAULT_WHATSAPP_CONTENT = {
  catalog: [
    { 
      id: "platform", 
      name: "IntegrateWise Platform", 
      price: "Starting at $499/mo", 
      description: "Knowledge Workspace with Adaptive Spine",
      emoji: "🚀"
    },
    { 
      id: "spine", 
      name: "Adaptive Spine", 
      price: "Included", 
      description: "Unified intelligence layer",
      emoji: "🧠"
    },
    { 
      id: "ai", 
      name: "Context-Aware AI", 
      price: "Included", 
      description: "AI that understands your business",
      emoji: "🤖"
    },
    { 
      id: "approvals", 
      name: "Approval Workflows", 
      price: "Included", 
      description: "Human-governed execution",
      emoji: "✅"
    },
  ],
  templates: [
    {
      id: '1',
      title: "Welcome Message",
      emoji: "👋",
      text: `👋 Welcome to IntegrateWise!

The Knowledge Workspace Over the Spine and Empowered by AI — connecting your tools, context, and decisions in one place.

How can we help you today?

🔹 Learn about our Platform
🔹 Book a Demo
🔹 Talk to Sales`,
      type: "greeting"
    },
    {
      id: '2',
      title: "Demo Booking",
      emoji: "📅",
      text: `📅 Ready to see IntegrateWise in action?

We'd love to show you how the Spine connects your entire workspace and how AI Thinks in Context — and Waits for Approval.

👉 Book your demo: https://integratewise.ai/demo

Or reply with your preferred time!`,
      type: "conversion"
    },
    {
      id: '3',
      title: "Follow-up",
      emoji: "🤝",
      text: `Hi there! 👋

Just following up on your interest in IntegrateWise.

Have you had a chance to check out our platform? I'd be happy to answer any questions or walk you through a quick demo.

Let me know!`,
      type: "follow-up"
    },
    {
      id: '4',
      title: "Pricing Inquiry",
      emoji: "💼",
      text: `Thanks for your interest in IntegrateWise pricing!

We offer flexible plans based on your team size and needs:
• Starter: $499/mo (up to 10 users)
• Growth: $999/mo (up to 50 users)
• Enterprise: Custom pricing

All plans include the Adaptive Spine, Context-Aware AI, and Approval Workflows.

Would you like to discuss which plan fits your needs?`,
      type: "sales"
    }
  ],
  quickReplies: [
    { label: "Get Started", emoji: "🚀" },
    { label: "Book Demo", emoji: "📅" },
    { label: "Pricing", emoji: "💰" },
    { label: "Support", emoji: "🎧" },
  ]
};

// Load content from localStorage
function loadContent() {
  return loadJson('whatsapp_content', DEFAULT_WHATSAPP_CONTENT);
}

// Save content to localStorage
function saveContent(content: typeof DEFAULT_WHATSAPP_CONTENT) {
  saveJson('whatsapp_content', content);
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
      style={{ background: copied ? '#10B981' : 'rgba(7,94,84,0.08)', color: copied ? '#fff' : '#075E54' }}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? 'Copied!' : label}
    </motion.button>
  );
}

// Catalog Item Card
function CatalogItem({ 
  item, 
  index, 
  isEditing, 
  onChange,
  onDelete
}: { 
  item: typeof DEFAULT_WHATSAPP_CONTENT.catalog[0]; 
  index: number;
  isEditing: boolean;
  onChange: (item: typeof DEFAULT_WHATSAPP_CONTENT.catalog[0]) => void;
  onDelete: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl border border-[#E8ECF2] p-5"
    >
      <div className="flex items-start gap-4">
        {isEditing ? (
          <input
            value={item.emoji}
            onChange={(e) => onChange({ ...item, emoji: e.target.value })}
            className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-center text-2xl border border-[#D5DAE5]"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-2xl">
            {item.emoji}
          </div>
        )}
        <div className="flex-1">
          {isEditing ? (
            <>
              <input
                value={item.name}
                onChange={(e) => onChange({ ...item, name: e.target.value })}
                className="font-semibold text-[#1B2544] w-full px-2 py-1 border border-[#D5DAE5] rounded mb-1"
              />
              <input
                value={item.description}
                onChange={(e) => onChange({ ...item, description: e.target.value })}
                className="text-sm text-[#5F6E93] w-full px-2 py-1 border border-[#D5DAE5] rounded mb-1"
              />
              <input
                value={item.price}
                onChange={(e) => onChange({ ...item, price: e.target.value })}
                className="text-sm font-medium text-[#075E54] w-full px-2 py-1 border border-[#D5DAE5] rounded"
              />
            </>
          ) : (
            <>
              <h4 className="font-semibold text-[#1B2544]">{item.name}</h4>
              <p className="text-sm text-[#5F6E93] mt-1">{item.description}</p>
              <p className="text-sm font-medium text-[#075E54] mt-2">{item.price}</p>
            </>
          )}
        </div>
        {isEditing && (
          <button
            onClick={onDelete}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

// Message Template Card
function MessageTemplate({ 
  template, 
  index, 
  isEditing, 
  onChange,
  onDelete
}: { 
  template: typeof DEFAULT_WHATSAPP_CONTENT.templates[0]; 
  index: number;
  isEditing: boolean;
  onChange: (template: typeof DEFAULT_WHATSAPP_CONTENT.templates[0]) => void;
  onDelete: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl border border-[#E8ECF2] overflow-hidden"
    >
      {/* Phone Preview Header */}
      <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <MessageCircle className="w-4 h-4 text-white" />
        </div>
        {isEditing ? (
          <input
            value={template.title}
            onChange={(e) => onChange({ ...template, title: e.target.value })}
            className="text-sm font-medium text-white bg-white/20 px-2 py-1 rounded flex-1"
          />
        ) : (
          <p className="text-sm font-medium text-white">IntegrateWise</p>
        )}
        {isEditing && (
          <button
            onClick={onDelete}
            className="p-1 text-white hover:bg-white/20 rounded"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {/* Chat Bubble */}
      <div className="p-4 bg-[#E5DDD5] min-h-[200px]">
        <div className="flex justify-center mb-4">
          <span className="text-xs text-[#5F6E93] bg-white/50 px-3 py-1 rounded-full">
            Today
          </span>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white text-xs font-bold shrink-0">
            IW
          </div>
          <div className="bg-white rounded-lg rounded-tl-none p-3 max-w-[80%] shadow-sm flex-1">
            {isEditing ? (
              <textarea
                value={template.text}
                onChange={(e) => onChange({ ...template, text: e.target.value })}
                className="w-full text-sm text-[#1B2544] whitespace-pre-wrap border border-[#D5DAE5] rounded p-2 min-h-[150px]"
              />
            ) : (
              <p className="text-sm text-[#1B2544] whitespace-pre-wrap">{template.text}</p>
            )}
            <p className="text-[10px] text-[#9BA8C2] mt-1 text-right">10:30 AM ✓✓</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-4 py-3 border-t border-[#E8ECF2] bg-[#F8FAFC] flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <input
              value={template.emoji}
              onChange={(e) => onChange({ ...template, emoji: e.target.value })}
              className="text-lg w-8 text-center border border-[#D5DAE5] rounded"
            />
          ) : (
            <span className="text-lg">{template.emoji}</span>
          )}
          {isEditing ? (
            <input
              value={template.title}
              onChange={(e) => onChange({ ...template, title: e.target.value })}
              className="text-sm font-medium text-[#1B2544] px-2 py-1 border border-[#D5DAE5] rounded"
            />
          ) : (
            <span className="text-sm font-medium text-[#1B2544]">{template.title}</span>
          )}
        </div>
        {isEditing ? (
          <select
            value={template.type}
            onChange={(e) => onChange({ ...template, type: e.target.value })}
            className="text-xs px-2 py-1 rounded-full bg-[#25D366]/10 text-[#075E54] border border-[#D5DAE5]"
          >
            <option value="greeting">Greeting</option>
            <option value="conversion">Conversion</option>
            <option value="follow-up">Follow-up</option>
            <option value="sales">Sales</option>
          </select>
        ) : (
          <span className="text-xs px-2 py-1 rounded-full bg-[#25D366]/10 text-[#075E54]">
            {template.type}
          </span>
        )}
      </div>
      
      {/* Action */}
      <div className="px-4 py-3 border-t border-[#E8ECF2]">
        <CopyButton text={template.text} label="Copy Message" />
      </div>
    </motion.div>
  );
}

// Quick Replies Section
function QuickReplies({ 
  replies, 
  isEditing, 
  onChange 
}: { 
  replies: typeof DEFAULT_WHATSAPP_CONTENT.quickReplies; 
  isEditing: boolean;
  onChange: (replies: typeof DEFAULT_WHATSAPP_CONTENT.quickReplies) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#E8ECF2] p-6">
      <h3 className="text-lg font-semibold text-[#1B2544] mb-4 flex items-center gap-2">
        <Send className="w-5 h-5 text-[#25D366]" />
        Quick Reply Buttons
      </h3>
      <p className="text-sm text-[#5F6E93] mb-4">
        Set these up as quick reply buttons in your WhatsApp Business catalog for faster customer responses.
      </p>
      <div className="flex flex-wrap gap-2">
        {replies.map((reply, i) => (
          <div key={i} className="flex items-center gap-2">
            {isEditing ? (
              <>
                <input
                  value={reply.emoji}
                  onChange={(e) => {
                    const newReplies = [...replies];
                    newReplies[i] = { ...reply, emoji: e.target.value };
                    onChange(newReplies);
                  }}
                  className="w-8 text-center border border-[#D5DAE5] rounded"
                />
                <input
                  value={reply.label}
                  onChange={(e) => {
                    const newReplies = [...replies];
                    newReplies[i] = { ...reply, label: e.target.value };
                    onChange(newReplies);
                  }}
                  className="px-3 py-2 rounded-lg bg-[#25D366]/10 text-[#075E54] border border-[#D5DAE5] text-sm"
                />
                <button
                  onClick={() => {
                    const newReplies = replies.filter((_, idx) => idx !== i);
                    onChange(newReplies);
                  }}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 text-[#075E54]">
                <span>{reply.emoji}</span>
                <span className="text-sm font-medium">{reply.label}</span>
              </div>
            )}
          </div>
        ))}
        {isEditing && (
          <button
            onClick={() => onChange([...replies, { label: "New", emoji: "✨" }])}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-dashed border-[#25D366] text-[#25D366] hover:bg-[#25D366]/5"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        )}
      </div>
    </div>
  );
}

// Main Component
export function WhatsAppPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(() => loadContent());

  useEffect(() => {
    saveContent(content);
  }, [content]);

  const handleSave = () => {
    saveContent(content);
    setIsEditing(false);
  };

  const handleReset = () => {
    if (confirm('Reset all content to defaults? This cannot be undone.')) {
      setContent(DEFAULT_WHATSAPP_CONTENT);
      saveContent(DEFAULT_WHATSAPP_CONTENT);
    }
  };

  const addNewTemplate = () => {
    const newTemplate = {
      id: Date.now().toString(),
      title: "New Template",
      emoji: "✨",
      text: "Enter your message here...",
      type: "greeting"
    };
    setContent({ ...content, templates: [...content.templates, newTemplate] });
  };

  const addNewCatalogItem = () => {
    const newItem = {
      id: Date.now().toString(),
      name: "New Item",
      price: "$0",
      description: "Description here",
      emoji: "🆕"
    };
    setContent({ ...content, catalog: [...content.catalog, newItem] });
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
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <span className="text-xs font-semibold text-[#25D366] uppercase tracking-wider">Messaging</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1B2544] mb-2">WhatsApp Business Assets</h1>
          <p className="text-[#5F6E93]">Catalog items, message templates, and quick replies for WhatsApp Business</p>
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
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Catalog Items', count: content.catalog.length, icon: ShoppingBag },
          { label: 'Templates', count: content.templates.length, icon: MessageCircle },
          { label: 'Quick Replies', count: content.quickReplies.length, icon: Send },
          { label: 'Response Time', count: '<5m', icon: Clock },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 bg-white rounded-xl border border-[#E8ECF2] text-center"
          >
            <stat.icon className="w-5 h-5 text-[#25D366] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#1B2544]">{stat.count}</p>
            <p className="text-xs text-[#5F6E93]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-10">
        {/* Catalog Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#075E54]" />
              <h2 className="text-xl font-bold text-[#1B2544]">Business Catalog</h2>
            </div>
            {isEditing && (
              <button
                onClick={addNewCatalogItem}
                className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:bg-[#128C7E]"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            )}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {content.catalog.map((item, i) => (
              <CatalogItem 
                key={item.id} 
                item={item} 
                index={i}
                isEditing={isEditing}
                onChange={(updated) => {
                  const newCatalog = [...content.catalog];
                  newCatalog[i] = updated;
                  setContent({ ...content, catalog: newCatalog });
                }}
                onDelete={() => {
                  const newCatalog = content.catalog.filter((_, idx) => idx !== i);
                  setContent({ ...content, catalog: newCatalog });
                }}
              />
            ))}
          </div>
        </section>

        {/* Templates Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#075E54]" />
              <h2 className="text-xl font-bold text-[#1B2544]">Message Templates</h2>
            </div>
            {isEditing && (
              <button
                onClick={addNewTemplate}
                className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:bg-[#128C7E]"
              >
                <Plus className="w-4 h-4" />
                Add Template
              </button>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {content.templates.map((template, i) => (
              <MessageTemplate 
                key={template.id} 
                template={template} 
                index={i}
                isEditing={isEditing}
                onChange={(updated) => {
                  const newTemplates = [...content.templates];
                  newTemplates[i] = updated;
                  setContent({ ...content, templates: newTemplates });
                }}
                onDelete={() => {
                  const newTemplates = content.templates.filter((_, idx) => idx !== i);
                  setContent({ ...content, templates: newTemplates });
                }}
              />
            ))}
          </div>
        </section>

        {/* Quick Replies */}
        <QuickReplies 
          replies={content.quickReplies} 
          isEditing={isEditing}
          onChange={(replies) => setContent({ ...content, quickReplies: replies })}
        />
      </div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 p-4 bg-gradient-to-r from-[#25D366]/10 to-transparent rounded-xl border border-[#25D366]/20"
      >
        <p className="text-sm text-[#475578]">
          <strong className="text-[#075E54]">Pro Tip:</strong> Keep messages under 400 characters for better readability. 
          Use emojis sparingly to maintain professionalism while adding warmth.
        </p>
      </motion.div>
    </div>
  );
}

export default WhatsAppPage;
