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
      description: "Adaptive Continuity Workspace powered by the Spine",
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

The Adaptive Continuity Workspace — hydrated by the Spine and empowered by AI — connecting your tools, context, and decisions in one place.

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
      style={{ background: copied ? 'var(--success-color)' : 'color-mix(in srgb, var(--forest) 8%, transparent)', color: copied ? 'var(--paper)' : 'var(--forest)' }}
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
      className="rounded-xl border border-[var(--border-subtle)] p-5"
      style={{ background: 'var(--surface-raised)' }}
    >
      <div className="flex items-start gap-4">
        {isEditing ? (
          <input
            value={item.emoji}
            onChange={(e) => onChange({ ...item, emoji: e.target.value })}
            className="w-12 h-12 rounded-full bg-[var(--forest-bright)]/10 flex items-center justify-center text-center text-2xl border border-[var(--border-base)]"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-[var(--forest-bright)]/10 flex items-center justify-center text-2xl">
            {item.emoji}
          </div>
        )}
        <div className="flex-1">
          {isEditing ? (
            <>
              <input
                value={item.name}
                onChange={(e) => onChange({ ...item, name: e.target.value })}
                className="font-semibold text-[var(--text-color)] w-full px-2 py-1 border border-[var(--border-base)] rounded mb-1"
              />
              <input
                value={item.description}
                onChange={(e) => onChange({ ...item, description: e.target.value })}
                className="text-sm text-[var(--text-muted)] w-full px-2 py-1 border border-[var(--border-base)] rounded mb-1"
              />
              <input
                value={item.price}
                onChange={(e) => onChange({ ...item, price: e.target.value })}
                className="text-sm font-medium text-[var(--forest)] w-full px-2 py-1 border border-[var(--border-base)] rounded"
              />
            </>
          ) : (
            <>
              <h4 className="font-semibold text-[var(--text-color)]">{item.name}</h4>
              <p className="text-sm text-[var(--text-muted)] mt-1">{item.description}</p>
              <p className="text-sm font-medium text-[var(--forest)] mt-2">{item.price}</p>
            </>
          )}
        </div>
        {isEditing && (
          <button
            onClick={onDelete}
            className="p-2 rounded-lg"
            style={{ color: 'var(--red)' }}
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
      className="rounded-xl border border-[var(--border-subtle)] overflow-hidden"
      style={{ background: 'var(--surface-raised)' }}
    >
      {/* Phone Preview Header */}
      <div className="bg-[var(--forest)] px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--paper) 20%, transparent)' }}>
          <MessageCircle className="w-4 h-4 text-[var(--paper)]" />
        </div>
        {isEditing ? (
          <input
            value={template.title}
            onChange={(e) => onChange({ ...template, title: e.target.value })}
            className="text-sm font-medium px-2 py-1 rounded flex-1"
            style={{ color: 'var(--paper)', background: 'color-mix(in srgb, var(--paper) 20%, transparent)' }}
          />
        ) : (
          <p className="text-sm font-medium text-[var(--paper)]">IntegrateWise</p>
        )}
        {isEditing && (
          <button
            onClick={onDelete}
            className="p-1 rounded"
            style={{ color: 'var(--paper)' }}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {/* Chat Bubble */}
      <div className="p-4 bg-[var(--paper-warm)] min-h-[200px]">
        <div className="flex justify-center mb-4">
          <span className="text-xs text-[var(--text-muted)] px-3 py-1 rounded-full"
                style={{ background: 'color-mix(in srgb, var(--paper) 50%, transparent)' }}>
            Today
          </span>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-[var(--forest-bright)] flex items-center justify-center text-[var(--paper)] text-xs font-bold shrink-0">
            IW
          </div>
          <div className="rounded-lg rounded-tl-none p-3 max-w-[80%] shadow-sm flex-1"
               style={{ background: 'var(--paper)' }}>
            {isEditing ? (
              <textarea
                value={template.text}
                onChange={(e) => onChange({ ...template, text: e.target.value })}
                className="w-full text-sm text-[var(--text-color)] whitespace-pre-wrap border border-[var(--border-base)] rounded p-2 min-h-[150px]"
              />
            ) : (
              <p className="text-sm text-[var(--text-color)] whitespace-pre-wrap">{template.text}</p>
            )}
            <p className="text-xs text-[var(--text-faint)] mt-1 text-right">10:30 AM ✓✓</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-4 py-3 border-t border-[var(--border-subtle)] bg-[var(--surface)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <input
              value={template.emoji}
              onChange={(e) => onChange({ ...template, emoji: e.target.value })}
              className="text-lg w-8 text-center border border-[var(--border-base)] rounded"
            />
          ) : (
            <span className="text-lg">{template.emoji}</span>
          )}
          {isEditing ? (
            <input
              value={template.title}
              onChange={(e) => onChange({ ...template, title: e.target.value })}
              className="text-sm font-medium text-[var(--text-color)] px-2 py-1 border border-[var(--border-base)] rounded"
            />
          ) : (
            <span className="text-sm font-medium text-[var(--text-color)]">{template.title}</span>
          )}
        </div>
        {isEditing ? (
          <select
            value={template.type}
            onChange={(e) => onChange({ ...template, type: e.target.value })}
            className="text-xs px-2 py-1 rounded-full bg-[var(--forest-bright)]/10 text-[var(--forest)] border border-[var(--border-base)]"
          >
            <option value="greeting">Greeting</option>
            <option value="conversion">Conversion</option>
            <option value="follow-up">Follow-up</option>
            <option value="sales">Sales</option>
          </select>
        ) : (
          <span className="text-xs px-2 py-1 rounded-full bg-[var(--forest-bright)]/10 text-[var(--forest)]">
            {template.type}
          </span>
        )}
      </div>
      
      {/* Action */}
      <div className="px-4 py-3 border-t border-[var(--border-subtle)]">
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
    <div className="rounded-xl border border-[var(--border-subtle)] p-6" style={{ background: 'var(--surface-raised)' }}>
      <h3 className="text-lg font-semibold text-[var(--text-color)] mb-4 flex items-center gap-2">
        <Send className="w-5 h-5 text-[var(--forest-bright)]" />
        Quick Reply Buttons
      </h3>
      <p className="text-sm text-[var(--text-muted)] mb-4">
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
                  className="w-8 text-center border border-[var(--border-base)] rounded"
                />
                <input
                  value={reply.label}
                  onChange={(e) => {
                    const newReplies = [...replies];
                    newReplies[i] = { ...reply, label: e.target.value };
                    onChange(newReplies);
                  }}
                  className="px-3 py-2 rounded-lg bg-[var(--forest-bright)]/10 text-[var(--forest)] border border-[var(--border-base)] text-sm"
                />
                <button
                  onClick={() => {
                    const newReplies = replies.filter((_, idx) => idx !== i);
                    onChange(newReplies);
                  }}
                  className="p-1 rounded"
                  style={{ color: 'var(--red)' }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--forest-bright)]/10 text-[var(--forest)]">
                <span>{reply.emoji}</span>
                <span className="text-sm font-medium">{reply.label}</span>
              </div>
            )}
          </div>
        ))}
        {isEditing && (
          <button
            onClick={() => onChange([...replies, { label: "New", emoji: "✨" }])}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-dashed border-[var(--forest-bright)] text-[var(--forest-bright)] hover:bg-[var(--forest-bright)]/5"
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
            <MessageCircle className="w-5 h-5 text-[var(--forest-bright)]" />
            <span className="text-xs font-semibold text-[var(--forest-bright)] uppercase tracking-wider">Messaging</span>
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-color)] mb-2">WhatsApp Business Assets</h1>
          <p className="text-[var(--text-muted)]">Catalog items, message templates, and quick replies for WhatsApp Business</p>
        </div>
        
        {/* Edit Controls */}
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: "var(--forest)", color: "var(--paper)" }}
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 border border-[var(--border-base)] text-[var(--text-color)] rounded-lg text-sm font-medium hover:bg-[var(--surface)]"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)] text-[var(--paper)] rounded-lg text-sm font-medium hover:bg-[var(--primary-hover)]"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 border border-[var(--border-base)] text-[var(--text-color)] rounded-lg text-sm font-medium hover:bg-[var(--surface)]"
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
            className="p-4 rounded-xl border border-[var(--border-subtle)] text-center" style={{ background: 'var(--surface-raised)' }}
          >
            <stat.icon className="w-5 h-5 text-[var(--forest-bright)] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[var(--text-color)]">{stat.count}</p>
            <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-10">
        {/* Catalog Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[var(--forest)]" />
              <h2 className="text-xl font-bold text-[var(--text-color)]">Business Catalog</h2>
            </div>
            {isEditing && (
              <button
                onClick={addNewCatalogItem}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--forest-bright)] text-[var(--paper)] rounded-lg text-sm font-medium hover:bg-[var(--forest-mid)]"
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
              <MessageCircle className="w-5 h-5 text-[var(--forest)]" />
              <h2 className="text-xl font-bold text-[var(--text-color)]">Message Templates</h2>
            </div>
            {isEditing && (
              <button
                onClick={addNewTemplate}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--forest-bright)] text-[var(--paper)] rounded-lg text-sm font-medium hover:bg-[var(--forest-mid)]"
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
        className="mt-10 p-4 bg-gradient-to-r from-[var(--forest-bright)]/10 to-transparent rounded-xl border border-[var(--forest-bright)]/20"
      >
        <p className="text-sm text-[var(--text-color)]">
          <strong className="text-[var(--forest)]">Pro Tip:</strong> Keep messages under 400 characters for better readability. 
          Use emojis sparingly to maintain professionalism while adding warmth.
        </p>
      </motion.div>
    </div>
  );
}

export default WhatsAppPage;
