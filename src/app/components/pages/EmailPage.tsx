import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, Copy, Check, Send, Sparkles, 
  Inbox, Star, Clock, ChevronDown, ChevronUp,
  Edit2, Save, X, Plus, Trash2, RotateCcw
} from 'lucide-react';
import { copyToClipboard } from '../../utils/clipboard';

// Default Email Content
const DEFAULT_EMAIL_CONTENT = {
  subjectLines: {
    newsletters: [
      { id: '1', subject: "This week: The $8M lesson in disconnected tools", preview: "How fragmented systems nearly cost one company their biggest account..." },
      { id: '2', subject: "New: Approval-first AI workflows", preview: "Govern AI actions with human checkpoints built-in..." },
      { id: '3', subject: "The Spine explained (in 3 minutes)", preview: "Why we built a knowledge workspace over a unified intelligence layer..." },
    ],
    sales: [
      { id: '4', subject: "IntegrateWise + {{Company}}: Quick question", preview: "Wanted to reach out about your tech stack..." },
      { id: '5', subject: "The $8M lesson every CTO should know", preview: "What disconnected tools cost one enterprise..." },
      { id: '6', subject: "Your demo is ready (15 minutes this week?)", preview: "I'd love to show you how the Spine works..." },
    ],
    onboarding: [
      { id: '7', subject: "Welcome to IntegrateWise! Let's get you set up", preview: "Your knowledge workspace is ready..." },
      { id: '8', subject: "Step 1: Connect your first tool", preview: "Start building your unified workspace..." },
      { id: '9', subject: "Your onboarding checklist", preview: "3 simple steps to get the most from IntegrateWise..." },
    ]
  },
  templates: {
    cold: {
      id: 'cold',
      name: "Cold Outreach",
      subject: "Quick question about {{Company}}'s tech stack",
      body: `Hi {{FirstName}},

I noticed {{Company}} is growing fast in the {{Industry}} space — congratulations!

Quick question: How are you currently handling cross-tool visibility? Most teams I talk to struggle with:
• Data living in silos across 5+ tools
• Missing signals because they're in different systems
• AI without proper context

We built IntegrateWise to solve exactly this — a Knowledge Workspace where your entire tech stack connects into one Adaptive Spine. AI surfaces what matters, humans approve every action.

Worth a brief conversation to see if this applies to {{Company}}?

Best,
[Your Name]
IntegrateWise`,
    },
    demoFollowUp: {
      id: 'demoFollowUp',
      name: "Demo Follow-up",
      subject: "Thanks for your time today",
      body: `Hi {{FirstName}},

Thanks for taking the time to see IntegrateWise today. It was great showing you how the Spine can unify {{Company}}'s {{Tools}} data.

As promised, here are the next steps:
1. [Specific next step based on conversation]
2. [Resource or document]
3. [Timeline for follow-up]

Let me know if you have any questions before our next call on {{Date}}.

Best,
[Your Name]
IntegrateWise`,
    },
    proposal: {
      id: 'proposal',
      name: "Proposal Email",
      subject: "IntegrateWise Proposal for {{Company}}",
      body: `Hi {{FirstName}},

Per our conversation, I'm excited to share the IntegrateWise proposal for {{Company}}.

What we're solving:
[Specific pain points discussed]

Our solution:
• The Spine as your unified intelligence layer
• Context-aware AI that reasons across your tools
• Approval-governed execution
• [Custom features for their use case]

Investment: [Pricing]
Timeline: [Implementation timeline]

I've attached the full proposal. Let me know if you have any questions — happy to walk through it on a call.

Best,
[Your Name]
IntegrateWise`,
    }
  },
  signatures: {
    standard: {
      name: "Standard",
      html: `<table cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; font-size: 13px; color: #2F3D5E;">
  <tr>
    <td style="padding-right: 16px; border-right: 2px solid #4154A3;">
      <p style="margin: 0; font-size: 18px; font-weight: 600; color: #4154A3;">IntegrateWise</p>
      <p style="margin: 4px 0 0; font-size: 11px; color: #636A82;">Knowledge Workspace Over the Spine</p>
    </td>
    <td style="padding-left: 16px;">
      <p style="margin: 0; font-weight: 600; color: #1B2544;">[Your Name]</p>
      <p style="margin: 2px 0; font-size: 12px; color: #5F6E93;">[Your Title]</p>
      <p style="margin: 8px 0 0; font-size: 11px;">
        <a href="mailto:hello@integratewise.ai" style="color: #4154A3; text-decoration: none;">hello@integratewise.ai</a>
      </p>
      <p style="margin: 2px 0; font-size: 11px;">
        <a href="https://integratewise.ai" style="color: #4154A3; text-decoration: none;">integratewise.ai</a>
      </p>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding-top: 12px; border-top: 1px solid #E8ECF2;">
      <p style="margin: 0; font-size: 10px; color: #9BA8C2; font-style: italic;">
        AI Thinks in Context — and Waits for Approval
      </p>
    </td>
  </tr>
</table>`,
    },
    minimal: {
      name: "Minimal",
      html: `<div style="font-family: Arial, sans-serif; font-size: 13px; color: #2F3D5E;">
  <p style="margin: 0; font-weight: 600; color: #1B2544;">[Your Name]</p>
  <p style="margin: 2px 0; font-size: 12px; color: #4154A3;">IntegrateWise — Knowledge Workspace Over the Spine</p>
  <p style="margin: 4px 0 0; font-size: 11px; color: #5F6E93;">
    hello@integratewise.ai | integratewise.ai
  </p>
</div>`,
    }
  }
};

// Load content from localStorage
function loadContent() {
  const saved = localStorage.getItem('email_content');
  return saved ? JSON.parse(saved) : DEFAULT_EMAIL_CONTENT;
}

// Save content to localStorage
function saveContent(content: typeof DEFAULT_EMAIL_CONTENT) {
  localStorage.setItem('email_content', JSON.stringify(content));
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

// Subject Line Card
function SubjectLineCard({ 
  item, 
  index, 
  isEditing, 
  onChange,
  onDelete
}: { 
  item: { id: string; subject: string; preview: string }; 
  index: number;
  isEditing: boolean;
  onChange: (item: { id: string; subject: string; preview: string }) => void;
  onDelete: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg border border-[#E8ECF2] p-4 hover:border-[#4154A3]/30 transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Mail className="w-4 h-4 text-[#9BA8C2]" />
            <span className="text-xs text-[#9BA8C2]">SUBJECT LINE</span>
          </div>
          {isEditing ? (
            <>
              <input
                value={item.subject}
                onChange={(e) => onChange({ ...item, subject: e.target.value })}
                className="font-semibold text-[#1B2544] text-sm w-full px-2 py-1 border border-[#D5DAE5] rounded mb-1"
              />
              <input
                value={item.preview}
                onChange={(e) => onChange({ ...item, preview: e.target.value })}
                className="text-xs text-[#5F6E93] w-full px-2 py-1 border border-[#D5DAE5] rounded"
              />
            </>
          ) : (
            <>
              <h4 className="font-semibold text-[#1B2544] text-sm">{item.subject}</h4>
              <p className="text-xs text-[#5F6E93] mt-1 line-clamp-2">{item.preview}</p>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <CopyButton text={item.subject} label="Copy" />
          {isEditing && (
            <button
              onClick={onDelete}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Email Template Card
function EmailTemplateCard({ 
  template, 
  type,
  isEditing, 
  onChange 
}: { 
  template: { id: string; name: string; subject: string; body: string }; 
  type: string;
  isEditing: boolean;
  onChange: (template: { id: string; name: string; subject: string; body: string }) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-[#E8ECF2] overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#E8ECF2] flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <Send className="w-4 h-4 text-[#4154A3]" />
          {isEditing ? (
            <input
              value={template.name}
              onChange={(e) => onChange({ ...template, name: e.target.value })}
              className="font-semibold text-[#1B2544] px-2 py-1 border border-[#D5DAE5] rounded flex-1"
            />
          ) : (
            <span className="font-semibold text-[#1B2544]">{template.name}</span>
          )}
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-[#4154A3]/10 text-[#4154A3]">
          {type}
        </span>
      </div>
      
      {/* Preview */}
      <div className="p-5">
        <div className="mb-4">
          <p className="text-xs text-[#9BA8C2] mb-1">SUBJECT</p>
          {isEditing ? (
            <input
              value={template.subject}
              onChange={(e) => onChange({ ...template, subject: e.target.value })}
              className="text-sm text-[#1B2544] font-medium w-full px-2 py-1 border border-[#D5DAE5] rounded"
            />
          ) : (
            <p className="text-sm text-[#1B2544] font-medium">{template.subject}</p>
          )}
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-[#9BA8C2]">BODY</p>
            {!isEditing && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-[#4154A3] flex items-center gap-1"
              >
                {expanded ? (
                  <><ChevronUp className="w-3 h-3" /> Show less</>
                ) : (
                  <><ChevronDown className="w-3 h-3" /> Show more</>
                )}
              </button>
            )}
          </div>
          {isEditing ? (
            <textarea
              value={template.body}
              onChange={(e) => onChange({ ...template, body: e.target.value })}
              className={`w-full text-sm text-[#475578] whitespace-pre-wrap p-3 border border-[#D5DAE5] rounded-lg min-h-[300px]`}
            />
          ) : (
            <div className={`bg-[#F8FAFC] rounded-lg p-3 text-sm text-[#475578] whitespace-pre-wrap ${expanded ? '' : 'line-clamp-4'}`}>
              {template.body}
            </div>
          )}
        </div>
      </div>
      
      {/* Actions */}
      <div className="px-5 py-3 border-t border-[#E8ECF2] bg-[#F8FAFC] flex gap-2">
        <CopyButton text={`Subject: ${template.subject}\n\n${template.body}`} label="Copy Full Email" />
        <CopyButton text={template.subject} label="Copy Subject" />
      </div>
    </motion.div>
  );
}

// Signature Preview
function SignaturePreview({ 
  signatures, 
  isEditing, 
  onChange 
}: { 
  signatures: typeof DEFAULT_EMAIL_CONTENT.signatures;
  isEditing: boolean;
  onChange: (signatures: typeof DEFAULT_EMAIL_CONTENT.signatures) => void;
}) {
  const [activeSig, setActiveSig] = useState<'standard' | 'minimal'>('standard');
  
  return (
    <div className="bg-white rounded-xl border border-[#E8ECF2] overflow-hidden">
      <div className="flex border-b border-[#E8ECF2]">
        {(['standard', 'minimal'] as const).map((sig) => (
          <button
            key={sig}
            onClick={() => setActiveSig(sig)}
            className={`flex-1 px-4 py-3 text-sm font-medium capitalize transition-colors ${
              activeSig === sig
                ? 'bg-[#4154A3] text-white'
                : 'text-[#5F6E93] hover:bg-[#F8FAFC]'
            }`}
          >
            {sig}
          </button>
        ))}
      </div>
      
      <div className="p-6">
        {isEditing ? (
          <textarea
            value={signatures[activeSig].html}
            onChange={(e) => {
              const newSigs = { ...signatures };
              newSigs[activeSig] = { ...newSigs[activeSig], html: e.target.value };
              onChange(newSigs);
            }}
            className="w-full h-48 text-xs font-mono p-3 border border-[#D5DAE5] rounded-lg mb-4"
          />
        ) : (
          <div 
            className="mb-4 p-4 border border-[#E8ECF2] rounded-lg bg-white"
            dangerouslySetInnerHTML={{ __html: signatures[activeSig].html }}
          />
        )}
        <CopyButton text={signatures[activeSig].html} label="Copy HTML" />
      </div>
    </div>
  );
}

// Main Component
export function EmailPage() {
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
      setContent(DEFAULT_EMAIL_CONTENT);
      saveContent(DEFAULT_EMAIL_CONTENT);
    }
  };

  const addSubjectLine = (category: 'newsletters' | 'sales' | 'onboarding') => {
    const newSubject = { id: Date.now().toString(), subject: "New Subject Line", preview: "Preview text..." };
    const newSubjectLines = { ...content.subjectLines };
    newSubjectLines[category] = [...newSubjectLines[category], newSubject];
    setContent({ ...content, subjectLines: newSubjectLines });
  };

  const updateSubjectLine = (category: 'newsletters' | 'sales' | 'onboarding', index: number, updated: any) => {
    const newSubjectLines = { ...content.subjectLines };
    newSubjectLines[category][index] = updated;
    setContent({ ...content, subjectLines: newSubjectLines });
  };

  const deleteSubjectLine = (category: 'newsletters' | 'sales' | 'onboarding', index: number) => {
    const newSubjectLines = { ...content.subjectLines };
    newSubjectLines[category] = newSubjectLines[category].filter((_: any, i: number) => i !== index);
    setContent({ ...content, subjectLines: newSubjectLines });
  };

  const updateTemplate = (key: string, updated: any) => {
    setContent({ 
      ...content, 
      templates: { ...content.templates, [key]: updated } 
    });
  };

  const totalSubjects = content.subjectLines.newsletters.length + 
                        content.subjectLines.sales.length + 
                        content.subjectLines.onboarding.length;

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
            <Mail className="w-5 h-5 text-[#4154A3]" />
            <span className="text-xs font-semibold text-[#4154A3] uppercase tracking-wider">Communication</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1B2544] mb-2">Email Templates</h1>
          <p className="text-[#5F6E93]">Subject lines, email templates, and signatures for all communication</p>
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
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Subject Lines', count: totalSubjects, icon: Inbox },
          { label: 'Templates', count: Object.keys(content.templates).length, icon: Send },
          { label: 'Signatures', count: Object.keys(content.signatures).length, icon: Sparkles },
          { label: 'Avg Open Rate', count: '35%', icon: Star },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 bg-white rounded-xl border border-[#E8ECF2] text-center"
          >
            <stat.icon className="w-5 h-5 text-[#4154A3] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#1B2544]">{stat.count}</p>
            <p className="text-xs text-[#5F6E93]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-10">
        {/* Subject Lines */}
        <section>
          <h2 className="text-xl font-bold text-[#1B2544] mb-4 flex items-center gap-2">
            <Inbox className="w-5 h-5 text-[#4154A3]" />
            Subject Lines by Category
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#5F6E93] uppercase tracking-wider">Newsletters</h3>
                {isEditing && (
                  <button
                    onClick={() => addSubjectLine('newsletters')}
                    className="flex items-center gap-1 px-3 py-1 bg-[#4154A3] text-white rounded text-xs"
                  >
                    <Plus className="w-3 h-3" />
                    Add
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {content.subjectLines.newsletters.map((item: any, i: number) => (
                  <SubjectLineCard 
                    key={item.id} 
                    item={item} 
                    index={i}
                    isEditing={isEditing}
                    onChange={(updated) => updateSubjectLine('newsletters', i, updated)}
                    onDelete={() => deleteSubjectLine('newsletters', i)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#5F6E93] uppercase tracking-wider">Sales Outreach</h3>
                {isEditing && (
                  <button
                    onClick={() => addSubjectLine('sales')}
                    className="flex items-center gap-1 px-3 py-1 bg-[#4154A3] text-white rounded text-xs"
                  >
                    <Plus className="w-3 h-3" />
                    Add
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {content.subjectLines.sales.map((item: any, i: number) => (
                  <SubjectLineCard 
                    key={item.id} 
                    item={item} 
                    index={i}
                    isEditing={isEditing}
                    onChange={(updated) => updateSubjectLine('sales', i, updated)}
                    onDelete={() => deleteSubjectLine('sales', i)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#5F6E93] uppercase tracking-wider">Onboarding</h3>
                {isEditing && (
                  <button
                    onClick={() => addSubjectLine('onboarding')}
                    className="flex items-center gap-1 px-3 py-1 bg-[#4154A3] text-white rounded text-xs"
                  >
                    <Plus className="w-3 h-3" />
                    Add
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {content.subjectLines.onboarding.map((item: any, i: number) => (
                  <SubjectLineCard 
                    key={item.id} 
                    item={item} 
                    index={i}
                    isEditing={isEditing}
                    onChange={(updated) => updateSubjectLine('onboarding', i, updated)}
                    onDelete={() => deleteSubjectLine('onboarding', i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Email Templates */}
        <section>
          <h2 className="text-xl font-bold text-[#1B2544] mb-4 flex items-center gap-2">
            <Send className="w-5 h-5 text-[#4154A3]" />
            Email Templates
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(content.templates).map(([key, template]: [string, any]) => (
              <EmailTemplateCard 
                key={key} 
                template={template} 
                type={key === 'cold' ? 'Sales' : key === 'demoFollowUp' ? 'Follow-up' : 'Proposal'}
                isEditing={isEditing}
                onChange={(updated) => updateTemplate(key, updated)}
              />
            ))}
          </div>
        </section>

        {/* Email Signatures */}
        <section>
          <h2 className="text-xl font-bold text-[#1B2544] mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#4154A3]" />
            Email Signatures
          </h2>
          <div className="max-w-2xl">
            <SignaturePreview 
              signatures={content.signatures}
              isEditing={isEditing}
              onChange={(signatures) => setContent({ ...content, signatures })}
            />
          </div>
        </section>
      </div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 p-4 bg-gradient-to-r from-[#4154A3]/10 to-transparent rounded-xl border border-[#4154A3]/20"
      >
        <p className="text-sm text-[#475578]">
          <strong className="text-[#4154A3]">Email Best Practices:</strong> Keep subject lines under 50 characters, 
          personalize with recipient's name and company, and always include a clear call-to-action.
        </p>
      </motion.div>
    </div>
  );
}

export default EmailPage;
