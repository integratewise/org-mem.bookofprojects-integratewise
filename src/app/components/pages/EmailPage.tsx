import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, Copy, Check, Send, Sparkles, 
  Inbox, Star, Clock, ChevronDown, ChevronUp,
  Edit2, Save, X, Plus, Trash2, RotateCcw
} from 'lucide-react';
import { copyToClipboard } from '../../utils/clipboard';
import { loadJson, saveJson } from '../../lib/storage';

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

We built IntegrateWise to solve exactly this — an adaptive continuity workspace where your entire tech stack connects into one Adaptive Spine. Continuity hydrates continuously. AI surfaces what matters, humans approve every action.

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
    <td style="padding-right: 16px; border-right: 2px solid var(--primary-color);">
      <p style="margin: 0; font-size: 18px; font-weight: 600; color: var(--primary-color);">IntegrateWise</p>
      <p style="margin: 4px 0 0; font-size: 11px; color: #636A82;">Adaptive Continuity Workspace — Hydrated by the Spine</p>
    </td>
    <td style="padding-left: 16px;">
      <p style="margin: 0; font-weight: 600; color: var(--text-color);">[Your Name]</p>
      <p style="margin: 2px 0; font-size: 12px; color: var(--text-muted);">[Your Title]</p>
      <p style="margin: 8px 0 0; font-size: 11px;">
        <a href="mailto:hello@integratewise.ai" style="color: var(--primary-color); text-decoration: none;">hello@integratewise.ai</a>
      </p>
      <p style="margin: 2px 0; font-size: 11px;">
        <a href="https://integratewise.ai" style="color: var(--primary-color); text-decoration: none;">integratewise.ai</a>
      </p>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding-top: 12px; border-top: 1px solid var(--border-subtle);">
      <p style="margin: 0; font-size: 10px; color: var(--text-faint); font-style: italic;">
        AI Thinks in Context — and Waits for Approval
      </p>
    </td>
  </tr>
</table>`,
    },
    minimal: {
      name: "Minimal",
      html: `<div style="font-family: Arial, sans-serif; font-size: 13px; color: #2F3D5E;">
  <p style="margin: 0; font-weight: 600; color: var(--text-color);">[Your Name]</p>
  <p style="margin: 2px 0; font-size: 12px; color: var(--primary-color);">IntegrateWise — Adaptive Continuity Workspace</p>
  <p style="margin: 4px 0 0; font-size: 11px; color: var(--text-muted);">
    hello@integratewise.ai | integratewise.ai
  </p>
</div>`,
    }
  }
};

// Load content from localStorage
function loadContent() {
  return loadJson('email_content', DEFAULT_EMAIL_CONTENT);
}

// Save content to localStorage
function saveContent(content: typeof DEFAULT_EMAIL_CONTENT) {
  saveJson('email_content', content);
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
      style={{ background: copied ? 'var(--success-color)' : 'color-mix(in srgb, var(--forest) 8%, transparent)', color: copied ? 'var(--paper)' : 'var(--forest-mid)' }}
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
      className="rounded-lg border border-[var(--border-subtle)] p-4 hover:border-[var(--primary-color)]/30 transition-colors" style={{ background: 'var(--surface-raised)' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Mail className="w-4 h-4 text-[var(--text-faint)]" />
            <span className="text-xs text-[var(--text-faint)]">SUBJECT LINE</span>
          </div>
          {isEditing ? (
            <>
              <input
                value={item.subject}
                onChange={(e) => onChange({ ...item, subject: e.target.value })}
                className="font-semibold text-[var(--text-color)] text-sm w-full px-2 py-1 border border-[var(--border-base)] rounded mb-1"
              />
              <input
                value={item.preview}
                onChange={(e) => onChange({ ...item, preview: e.target.value })}
                className="text-xs text-[var(--text-muted)] w-full px-2 py-1 border border-[var(--border-base)] rounded"
              />
            </>
          ) : (
            <>
              <h4 className="font-semibold text-[var(--text-color)] text-sm">{item.subject}</h4>
              <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2">{item.preview}</p>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <CopyButton text={item.subject} label="Copy" />
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
      className="rounded-xl border border-[var(--border-subtle)] overflow-hidden"
      style={{ background: 'var(--surface-raised)' }}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <Send className="w-4 h-4 text-[var(--primary-color)]" />
          {isEditing ? (
            <input
              value={template.name}
              onChange={(e) => onChange({ ...template, name: e.target.value })}
              className="font-semibold text-[var(--text-color)] px-2 py-1 border border-[var(--border-base)] rounded flex-1"
            />
          ) : (
            <span className="font-semibold text-[var(--text-color)]">{template.name}</span>
          )}
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
          {type}
        </span>
      </div>
      
      {/* Preview */}
      <div className="p-5">
        <div className="mb-4">
          <p className="text-xs text-[var(--text-faint)] mb-1">SUBJECT</p>
          {isEditing ? (
            <input
              value={template.subject}
              onChange={(e) => onChange({ ...template, subject: e.target.value })}
              className="text-sm text-[var(--text-color)] font-medium w-full px-2 py-1 border border-[var(--border-base)] rounded"
            />
          ) : (
            <p className="text-sm text-[var(--text-color)] font-medium">{template.subject}</p>
          )}
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-[var(--text-faint)]">BODY</p>
            {!isEditing && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-[var(--primary-color)] flex items-center gap-1"
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
              className={`w-full text-sm text-[var(--text-color)] whitespace-pre-wrap p-3 border border-[var(--border-base)] rounded-lg min-h-[300px]`}
            />
          ) : (
            <div className={`bg-[var(--surface)] rounded-lg p-3 text-sm text-[var(--text-color)] whitespace-pre-wrap ${expanded ? '' : 'line-clamp-4'}`}>
              {template.body}
            </div>
          )}
        </div>
      </div>
      
      {/* Actions */}
      <div className="px-5 py-3 border-t border-[var(--border-subtle)] bg-[var(--surface)] flex gap-2">
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
    <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden" style={{ background: 'var(--surface-raised)' }}>
      <div className="flex border-b border-[var(--border-subtle)]">
        {(['standard', 'minimal'] as const).map((sig) => (
          <button
            key={sig}
            onClick={() => setActiveSig(sig)}
            className={`flex-1 px-4 py-3 text-sm font-medium capitalize transition-colors ${
              activeSig === sig
                ? 'bg-[var(--primary-color)] text-[var(--paper)]'
                : 'text-[var(--text-muted)] hover:bg-[var(--surface)]'
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
            className="w-full h-48 text-xs font-mono p-3 border border-[var(--border-base)] rounded-lg mb-4"
          />
        ) : (
          <div 
            className="mb-4 p-4 border border-[var(--border-subtle)] rounded-lg"
            style={{ background: 'var(--paper)' }}
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
            <Mail className="w-5 h-5 text-[var(--primary-color)]" />
            <span className="text-xs font-semibold text-[var(--primary-color)] uppercase tracking-wider">Communication</span>
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-color)] mb-2">Email Templates</h1>
          <p className="text-[var(--text-muted)]">Subject lines, email templates, and signatures for all communication</p>
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
            className="p-4 rounded-xl border border-[var(--border-subtle)] text-center" style={{ background: 'var(--surface-raised)' }}
          >
            <stat.icon className="w-5 h-5 text-[var(--primary-color)] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[var(--text-color)]">{stat.count}</p>
            <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-10">
        {/* Subject Lines */}
        <section>
          <h2 className="text-xl font-bold text-[var(--text-color)] mb-4 flex items-center gap-2">
            <Inbox className="w-5 h-5 text-[var(--primary-color)]" />
            Subject Lines by Category
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Newsletters</h3>
                {isEditing && (
                  <button
                    onClick={() => addSubjectLine('newsletters')}
                    className="flex items-center gap-1 px-3 py-1 bg-[var(--primary-color)] text-[var(--paper)] rounded text-xs"
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
                <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Sales Outreach</h3>
                {isEditing && (
                  <button
                    onClick={() => addSubjectLine('sales')}
                    className="flex items-center gap-1 px-3 py-1 bg-[var(--primary-color)] text-[var(--paper)] rounded text-xs"
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
                <h3 className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Onboarding</h3>
                {isEditing && (
                  <button
                    onClick={() => addSubjectLine('onboarding')}
                    className="flex items-center gap-1 px-3 py-1 bg-[var(--primary-color)] text-[var(--paper)] rounded text-xs"
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
          <h2 className="text-xl font-bold text-[var(--text-color)] mb-4 flex items-center gap-2">
            <Send className="w-5 h-5 text-[var(--primary-color)]" />
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
          <h2 className="text-xl font-bold text-[var(--text-color)] mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--primary-color)]" />
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
        className="mt-10 p-4 bg-gradient-to-r from-[var(--primary-color)]/10 to-transparent rounded-xl border border-[var(--primary-color)]/20"
      >
        <p className="text-sm text-[var(--text-color)]">
          <strong className="text-[var(--primary-color)]">Email Best Practices:</strong> Keep subject lines under 50 characters, 
          personalize with recipient's name and company, and always include a clear call-to-action.
        </p>
      </motion.div>
    </div>
  );
}

export default EmailPage;
