/**
 * Quick Start Page - For Solo Founders
 * One place to update everything, then export for printing/promotion
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Edit3, Download, Printer, Share2, 
  Check, Copy, FileText, Image, MessageSquare,
  ChevronRight, Save, RefreshCw, Wand2, CreditCard
} from 'lucide-react';
import { BRAND, TAGLINES, CONTACT } from '../../lib/brand';
import { copyToClipboard } from '../../utils/clipboard';
import { loadJson, saveJson } from '../../lib/storage';
import { LiveAssetEditor, AssetType } from '../LiveAssetEditor';

// Simple content store that can be edited
interface BrandContent {
  oneLiner: string;
  shortDescription: string;
  fullDescription: string;
  keyBenefits: string[];
  problemStatement: string;
  solutionStatement: string;
  callToAction: string;
}

const DEFAULT_CONTENT: BrandContent = {
  oneLiner: TAGLINES.descriptorExtended,
  shortDescription: "IntegrateWise brings continuity, knowledge, and decisions together in an adaptive workspace projected from the Spine.",
  fullDescription: `IntegrateWise is an adaptive continuity workspace where connectors and workflows hydrate the Spine continuously.

Unlike static collaboration tools or standalone AI assistants, IntegrateWise organizes evolving operational reality into continuity structures and lets AI reason, propose, and act on top of that context — while ensuring every action waits for human approval.`,
  keyBenefits: [
    "Hydrate continuity from connectors, workflows, and operational signals",
    "Project workspace from the organization's current continuity state",
    "Keep knowledge adaptive as continuity evolves",
    "Every action waits for human approval",
    "Reduce tool sprawl and knowledge fragmentation"
  ],
  problemStatement: "Modern operations are fragmented. Teams use disconnected systems, continuity breaks, and static workspaces drift away from reality.",
  solutionStatement: "IntegrateWise: Continuity first. Adaptive Spine hydration. Workspace projection. Human approvals.",
  callToAction: "Book your demo at integratewise.ai/demo"
};

function loadContent(): BrandContent {
  return loadJson('quickstart_content', DEFAULT_CONTENT);
}

function saveContent(content: BrandContent) {
  saveJson('quickstart_content', content);
}

// AI Edit Modal Component
function AIEditModal({ 
  isOpen, 
  onClose, 
  currentText, 
  onApply,
  title 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  currentText: string; 
  onApply: (text: string) => void;
  title: string;
}) {
  const [prompt, setPrompt] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const generateSuggestion = async () => {
    setLoading(true);
    // Simulate AI response - in production, this calls OpenRouter
    setTimeout(() => {
      const suggestions: Record<string, string> = {
        'make it shorter': currentText.split('.')[0] + '.',
        'make it professional': currentText.replace(/!/g, '.'),
        'add more energy': currentText + ' Ready to transform your workspace?',
        'focus on AI': currentText.replace(/workspace/gi, 'AI workspace'),
      };
      setSuggestion(suggestions[prompt.toLowerCase()] || currentText + ' [AI would rewrite this based on: ' + prompt + ']');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-auto"
        style={{ background: 'var(--surface-raised)' }}
      >
        <div className="p-6 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--forest-mid), var(--gold))' }}>
              <Sparkles className="w-5 h-5" style={{ color: 'var(--paper)' }} />
            </div>
            <div>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-strong)' }}>AI Assistant</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Editing: {title}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-muted)' }}>Current Text</label>
            <div className="p-4 rounded-xl text-sm" style={{ background: 'var(--surface)', color: 'var(--text-muted)' }}>
              {currentText}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-muted)' }}>What would you like to change?</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., make it shorter, more professional, add energy..."
                className="flex-1 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--forest-bright)]"
                style={{ border: '1px solid var(--border-base)', background: 'var(--surface-raised)', color: 'var(--text-strong)' }}
              />
              <button
                onClick={generateSuggestion}
                disabled={loading || !prompt}
                className="px-6 py-3 text-white rounded-xl font-medium disabled:opacity-50 flex items-center gap-2"
                style={{ background: 'var(--forest-bright)' }}
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                Generate
              </button>
            </div>
          </div>

          {suggestion && (
            <div>
              <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-muted)' }}>AI Suggestion</label>
              <div className="p-4 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-strong)' }}>
                {suggestion}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 flex justify-end gap-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <button onClick={onClose} className="px-4 py-2" style={{ color: 'var(--text-muted)' }}>
            Cancel
          </button>
          {suggestion && (
            <button 
              onClick={() => { onApply(suggestion); onClose(); }}
              className="px-6 py-2 text-white rounded-xl font-medium flex items-center gap-2"
              style={{ background: 'var(--forest-bright)' }}
            >
              <Check className="w-4 h-4" />
              Apply Changes
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Export Item Component
function ExportItem({ 
  title, 
  description, 
  icon: Icon, 
  onExport,
  status = 'ready'
}: { 
  title: string; 
  description: string; 
  icon: any; 
  onExport: () => void;
  status?: 'ready' | 'draft';
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-xl border p-5 hover:shadow-lg transition-all"
      style={{ background: 'var(--surface-raised)', borderColor: 'var(--border-base)' }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--surface-2)' }}>
            <Icon className="w-6 h-6" style={{ color: 'var(--forest-bright)' }} />
          </div>
          <div>
            <h3 className="font-semibold" style={{ color: 'var(--text-strong)' }}>{title}</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{description}</p>
            {status === 'draft' && (
              <span className="inline-flex items-center gap-1 mt-1 text-xs" style={{ color: 'var(--gold)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
                Draft - needs review
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onExport}
          className="px-4 py-2 text-white rounded-lg text-sm font-medium hover:bg-[var(--forest)] flex items-center gap-2"
          style={{ background: 'var(--ink)' }}
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>
    </motion.div>
  );
}

export function QuickStartPage() {
  const [content, setContent] = useState<BrandContent>(loadContent());
  const [isEditing, setIsEditing] = useState<keyof BrandContent | null>(null);
  const [editValue, setEditValue] = useState('');
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiEditTarget, setAiEditTarget] = useState<{ key: keyof BrandContent; title: string } | null>(null);
  const [saved, setSaved] = useState(false);
  
  // Live Editor State
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorAssetType, setEditorAssetType] = useState<AssetType>('business-card');

  useEffect(() => {
    saveContent(content);
  }, [content]);

  const handleSave = () => {
    saveContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const startEdit = (key: keyof BrandContent) => {
    setIsEditing(key);
    const value = content[key];
    setEditValue(Array.isArray(value) ? value.join('\n') : value);
  };

  const saveEdit = () => {
    if (!isEditing) return;
    
    const newContent = { ...content };
    if (isEditing === 'keyBenefits') {
      newContent[isEditing] = editValue.split('\n').filter(Boolean);
    } else {
      newContent[isEditing] = editValue;
    }
    setContent(newContent);
    setIsEditing(null);
    handleSave();
  };

  const openAIEdit = (key: keyof BrandContent, title: string) => {
    setAiEditTarget({ key, title });
    setAiModalOpen(true);
  };

  const applyAIEdit = (text: string) => {
    if (!aiEditTarget) return;
    
    const newContent = { ...content };
    if (aiEditTarget.key === 'keyBenefits') {
      newContent[aiEditTarget.key] = text.split('\n').filter(Boolean);
    } else {
      newContent[aiEditTarget.key] = text;
    }
    setContent(newContent);
    handleSave();
  };

  // Open Live Editor
  const openEditor = (assetType: AssetType) => {
    setEditorAssetType(assetType);
    setEditorOpen(true);
  };

  // Export functions now open the live editor
  const exportForPrint = (type: string) => {
    const typeMap: Record<string, AssetType> = {
      'business-cards': 'business-card',
      'letterhead': 'letterhead',
      'seal': 'business-card', // Use business card editor for seal
      'email-signature': 'email-signature'
    };
    openEditor(typeMap[type] || 'business-card');
  };

  const exportSocialBanner = (platform: string) => {
    const typeMap: Record<string, AssetType> = {
      'linkedin': 'linkedin-banner',
      'whatsapp': 'whatsapp-banner',
      'linkedin-posts': 'linkedin-banner'
    };
    openEditor(typeMap[platform] || 'linkedin-banner');
  };

  return (
    <div className="max-w-5xl mx-auto p-6 lg:p-10">
      {/* Header */}
      <div className="mb-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--forest), var(--gold))' }}>
              <Sparkles className="w-6 h-6" style={{ color: 'var(--paper)' }} />
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--text-strong)' }}>Quick Start</h1>
              <p style={{ color: 'var(--text-muted)' }}>Update once, use everywhere</p>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="px-6 py-3 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-[var(--forest-mid)] transition-colors"
              style={{ background: 'var(--forest-bright)' }}
            >
              <Save className="w-5 h-5" />
              {saved ? 'Saved!' : 'Save All Changes'}
            </button>
            <div className="px-4 py-3 bg-[color-mix(in_srgb_var(--forest-bright)_12%_transparent)] text-[var(--forest-bright)] rounded-xl flex items-center gap-2">
              <Check className="w-5 h-5" />
              All brand content is consistent
            </div>
          </div>
        </motion.div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Edit Content */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Edit3 className="w-5 h-5" style={{ color: 'var(--forest-bright)' }} />
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-strong)' }}>Edit Content</h2>
          </div>

          {/* One Liner */}
          <div className="rounded-xl border p-5" style={{ background: 'var(--surface-raised)', borderColor: 'var(--border-base)' }}>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>One-Liner</label>
              <div className="flex gap-2">
                <button
                  onClick={() => openAIEdit('oneLiner', 'One-Liner')}
                  className="p-2 rounded-lg"
                  style={{ color: 'var(--forest-bright)', background: 'transparent' }}
                  title="Edit with AI"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
                <button
                  onClick={() => startEdit('oneLiner')}
                  className="p-2 rounded-lg hover:bg-[var(--surface-2)]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
            {isEditing === 'oneLiner' ? (
              <div className="space-y-3">
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--forest-bright)]"
                  style={{ border: '1px solid var(--border-base)', background: 'var(--surface-raised)', color: 'var(--text-strong)' }}
                  rows={3}
                />
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="px-4 py-2 text-white rounded-lg text-sm" style={{ background: 'var(--forest-bright)' }}>Save</button>
                  <button onClick={() => setIsEditing(null)} className="px-4 py-2 text-sm" style={{ color: 'var(--text-muted)' }}>Cancel</button>
                </div>
              </div>
            ) : (
              <p style={{ color: 'var(--text-strong)' }}>{content.oneLiner}</p>
            )}
            <p className="text-xs mt-2" style={{ color: 'var(--text-faint)' }}>Used on: Business cards, email signatures, social bios</p>
          </div>

          {/* Short Description */}
          <div className="rounded-xl border p-5" style={{ background: 'var(--surface-raised)', borderColor: 'var(--border-base)' }}>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Short Description</label>
              <div className="flex gap-2">
                <button
                  onClick={() => openAIEdit('shortDescription', 'Short Description')}
                  className="p-2 rounded-lg"
                  style={{ color: 'var(--forest-bright)', background: 'transparent' }}
                >
                  <Sparkles className="w-4 h-4" />
                </button>
                <button
                  onClick={() => startEdit('shortDescription')}
                  className="p-2 rounded-lg hover:bg-[var(--surface-2)]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
            {isEditing === 'shortDescription' ? (
              <div className="space-y-3">
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--forest-bright)]"
                  style={{ border: '1px solid var(--border-base)', background: 'var(--surface-raised)', color: 'var(--text-strong)' }}
                  rows={4}
                />
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="px-4 py-2 text-white rounded-lg text-sm" style={{ background: 'var(--forest-bright)' }}>Save</button>
                  <button onClick={() => setIsEditing(null)} className="px-4 py-2 text-sm" style={{ color: 'var(--text-muted)' }}>Cancel</button>
                </div>
              </div>
            ) : (
              <p style={{ color: 'var(--text-strong)' }}>{content.shortDescription}</p>
            )}
            <p className="text-xs mt-2" style={{ color: 'var(--text-faint)' }}>Used on: LinkedIn About, website hero, pitch deck</p>
          </div>

          {/* Key Benefits */}
          <div className="rounded-xl border p-5" style={{ background: 'var(--surface-raised)', borderColor: 'var(--border-base)' }}>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Key Benefits</label>
              <div className="flex gap-2">
                <button
                  onClick={() => openAIEdit('keyBenefits', 'Key Benefits')}
                  className="p-2 rounded-lg"
                  style={{ color: 'var(--forest-bright)', background: 'transparent' }}
                >
                  <Sparkles className="w-4 h-4" />
                </button>
                <button
                  onClick={() => startEdit('keyBenefits')}
                  className="p-2 rounded-lg hover:bg-[var(--surface-2)]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
            {isEditing === 'keyBenefits' ? (
              <div className="space-y-3">
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="One benefit per line"
                  className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--forest-bright)]"
                  style={{ border: '1px solid var(--border-base)', background: 'var(--surface-raised)', color: 'var(--text-strong)' }}
                  rows={6}
                />
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="px-4 py-2 text-white rounded-lg text-sm" style={{ background: 'var(--forest-bright)' }}>Save</button>
                  <button onClick={() => setIsEditing(null)} className="px-4 py-2 text-sm" style={{ color: 'var(--text-muted)' }}>Cancel</button>
                </div>
              </div>
            ) : (
              <ul className="space-y-2">
                {content.keyBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[var(--forest-bright)] shrink-0 mt-0.5" />
                    <span style={{ color: 'var(--text-strong)' }}>{benefit}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="text-xs mt-2" style={{ color: 'var(--text-faint)' }}>Used on: Landing pages, sales decks, social posts</p>
          </div>

          {/* Call to Action */}
          <div className="rounded-xl border p-5" style={{ background: 'var(--surface-raised)', borderColor: 'var(--border-base)' }}>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Call to Action</label>
              <div className="flex gap-2">
                <button
                  onClick={() => openAIEdit('callToAction', 'Call to Action')}
                  className="p-2 rounded-lg"
                  style={{ color: 'var(--forest-bright)', background: 'transparent' }}
                >
                  <Sparkles className="w-4 h-4" />
                </button>
                <button
                  onClick={() => startEdit('callToAction')}
                  className="p-2 rounded-lg hover:bg-[var(--surface-2)]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
            {isEditing === 'callToAction' ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--forest-bright)]"
                  style={{ border: '1px solid var(--border-base)', background: 'var(--surface-raised)', color: 'var(--text-strong)' }}
                />
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="px-4 py-2 text-white rounded-lg text-sm" style={{ background: 'var(--forest-bright)' }}>Save</button>
                  <button onClick={() => setIsEditing(null)} className="px-4 py-2 text-sm" style={{ color: 'var(--text-muted)' }}>Cancel</button>
                </div>
              </div>
            ) : (
              <p style={{ color: 'var(--text-strong)' }}>{content.callToAction}</p>
            )}
            <p className="text-xs mt-2" style={{ color: 'var(--text-faint)' }}>Used on: All promotional materials</p>
          </div>
        </div>

        {/* Right: Export for Use */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Download className="w-5 h-5" style={{ color: 'var(--forest-bright)' }} />
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-strong)' }}>Export for Use</h2>
          </div>

          {/* Office Supplies Section */}
          <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border-base)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Printer className="w-5 h-5" style={{ color: 'var(--forest-bright)' }} />
              <h3 className="font-semibold" style={{ color: 'var(--text-strong)' }}>Office Supplies (Print First)</h3>
            </div>
            <div className="space-y-3">
              <ExportItem
                title="Business Cards"
                description="85×55mm, print-ready PDF"
                icon={CreditCard}
                onExport={() => exportForPrint('business-cards')}
              />
              <ExportItem
                title="Letterhead"
                description="A4, print-ready PDF"
                icon={FileText}
                onExport={() => exportForPrint('letterhead')}
              />
              <ExportItem
                title="Company Seal"
                description="Vector SVG for embossing"
                icon={Image}
                onExport={() => exportForPrint('seal')}
              />
              <ExportItem
                title="Email Signature"
                description="HTML for Gmail/Outlook"
                icon={MessageSquare}
                onExport={() => exportForPrint('email-signature')}
              />
            </div>
          </div>

          {/* Social Media Section */}
          <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border-base)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Share2 className="w-5 h-5" style={{ color: 'var(--forest-bright)' }} />
              <h3 className="font-semibold" style={{ color: 'var(--text-strong)' }}>Social Media (Promote)</h3>
            </div>
            <div className="space-y-3">
              <ExportItem
                title="LinkedIn Banner"
                description="1128×191px, PNG"
                icon={Image}
                onExport={() => exportSocialBanner('linkedin')}
              />
              <ExportItem
                title="LinkedIn Posts"
                description="3 ready-to-post templates"
                icon={FileText}
                onExport={() => exportSocialBanner('linkedin-posts')}
              />
              <ExportItem
                title="WhatsApp Catalog"
                description="Product catalog + message templates"
                icon={MessageSquare}
                onExport={() => exportSocialBanner('whatsapp')}
              />
            </div>
          </div>

          {/* All Assets Link */}
          <a 
            href="/gallery" 
            className="block rounded-xl border p-5 hover:shadow-lg transition-all"
            style={{ background: 'var(--surface)', borderColor: 'var(--border-base)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--surface-2)' }}>
                <Image className="w-6 h-6" style={{ color: 'var(--forest-bright)' }} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold" style={{ color: 'var(--text-strong)' }}>Browse All Assets</h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Logos, banners, and marketing materials</p>
              </div>
              <ChevronRight className="w-5 h-5" style={{ color: 'var(--text-faint)' }} />
            </div>
          </a>

          {/* Quick Copy */}
          <div className="rounded-xl p-5 text-white" style={{ background: 'var(--ink)' }}>
            <h3 className="font-semibold mb-4">Quick Copy</h3>
            <div className="space-y-3">
              {[
                { label: 'Tagline', value: TAGLINES.primary },
                { label: 'One-liner', value: content.oneLiner },
                { label: 'Website', value: BRAND.website },
                { label: 'Email', value: CONTACT.general },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => copyToClipboard(item.value)}
                  className="w-full flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-left"
                >
                  <div>
                    <p className="text-xs text-white/60">{item.label}</p>
                    <p className="text-sm truncate max-w-[200px]">{item.value}</p>
                  </div>
                  <Copy className="w-4 h-4 text-white/60" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      {aiModalOpen && aiEditTarget && (
        <AIEditModal
          isOpen={aiModalOpen}
          onClose={() => setAiModalOpen(false)}
          currentText={typeof content[aiEditTarget.key] === 'string' 
            ? content[aiEditTarget.key] as string 
            : (content[aiEditTarget.key] as string[]).join('\n')}
          onApply={applyAIEdit}
          title={aiEditTarget.title}
        />
      )}
      
      {/* Live Asset Editor */}
      <LiveAssetEditor
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        assetType={editorAssetType}
        initialContent={{
          headline: content.oneLiner.split('—')[0]?.trim() || BRAND.name,
          tagline: content.oneLiner,
          subtext: TAGLINES.primary,
        }}
      />
    </div>
  );
}

export default QuickStartPage;
