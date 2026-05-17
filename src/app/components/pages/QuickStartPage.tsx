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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-auto"
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
              <p className="text-sm text-gray-500">Editing: {title}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Current Text</label>
            <div className="p-4 bg-gray-50 rounded-xl text-gray-600 text-sm">
              {currentText}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">What would you like to change?</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., make it shorter, more professional, add energy..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={generateSuggestion}
                disabled={loading || !prompt}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                Generate
              </button>
            </div>
          </div>

          {suggestion && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">AI Suggestion</label>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-gray-800">
                {suggestion}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800">
            Cancel
          </button>
          {suggestion && (
            <button 
              onClick={() => { onApply(suggestion); onClose(); }}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl font-medium flex items-center gap-2"
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
      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
            {status === 'draft' && (
              <span className="inline-flex items-center gap-1 mt-1 text-xs text-amber-600">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Draft - needs review
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onExport}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2"
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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Quick Start</h1>
              <p className="text-gray-500">Update once, use everywhere</p>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Save className="w-5 h-5" />
              {saved ? 'Saved!' : 'Save All Changes'}
            </button>
            <div className="px-4 py-3 bg-green-50 text-green-700 rounded-xl flex items-center gap-2">
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
            <Edit3 className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Edit Content</h2>
          </div>

          {/* One Liner */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">One-Liner</label>
              <div className="flex gap-2">
                <button
                  onClick={() => openAIEdit('oneLiner', 'One-Liner')}
                  className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                  title="Edit with AI"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
                <button
                  onClick={() => startEdit('oneLiner')}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
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
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Save</button>
                  <button onClick={() => setIsEditing(null)} className="px-4 py-2 text-gray-600 text-sm">Cancel</button>
                </div>
              </div>
            ) : (
              <p className="text-gray-800">{content.oneLiner}</p>
            )}
            <p className="text-xs text-gray-400 mt-2">Used on: Business cards, email signatures, social bios</p>
          </div>

          {/* Short Description */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">Short Description</label>
              <div className="flex gap-2">
                <button
                  onClick={() => openAIEdit('shortDescription', 'Short Description')}
                  className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
                <button
                  onClick={() => startEdit('shortDescription')}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
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
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Save</button>
                  <button onClick={() => setIsEditing(null)} className="px-4 py-2 text-gray-600 text-sm">Cancel</button>
                </div>
              </div>
            ) : (
              <p className="text-gray-800">{content.shortDescription}</p>
            )}
            <p className="text-xs text-gray-400 mt-2">Used on: LinkedIn About, website hero, pitch deck</p>
          </div>

          {/* Key Benefits */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">Key Benefits</label>
              <div className="flex gap-2">
                <button
                  onClick={() => openAIEdit('keyBenefits', 'Key Benefits')}
                  className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
                <button
                  onClick={() => startEdit('keyBenefits')}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
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
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={6}
                />
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Save</button>
                  <button onClick={() => setIsEditing(null)} className="px-4 py-2 text-gray-600 text-sm">Cancel</button>
                </div>
              </div>
            ) : (
              <ul className="space-y-2">
                {content.keyBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-800">{benefit}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="text-xs text-gray-400 mt-2">Used on: Landing pages, sales decks, social posts</p>
          </div>

          {/* Call to Action */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">Call to Action</label>
              <div className="flex gap-2">
                <button
                  onClick={() => openAIEdit('callToAction', 'Call to Action')}
                  className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
                <button
                  onClick={() => startEdit('callToAction')}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
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
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Save</button>
                  <button onClick={() => setIsEditing(null)} className="px-4 py-2 text-gray-600 text-sm">Cancel</button>
                </div>
              </div>
            ) : (
              <p className="text-gray-800">{content.callToAction}</p>
            )}
            <p className="text-xs text-gray-400 mt-2">Used on: All promotional materials</p>
          </div>
        </div>

        {/* Right: Export for Use */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Download className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Export for Use</h2>
          </div>

          {/* Office Supplies Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Printer className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Office Supplies (Print First)</h3>
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
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Share2 className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Social Media (Promote)</h3>
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
            className="block bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 p-5 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Image className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Browse All Assets</h3>
                <p className="text-sm text-gray-500">Logos, banners, and marketing materials</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </a>

          {/* Quick Copy */}
          <div className="bg-gray-900 rounded-xl p-5 text-white">
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
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className="text-sm truncate max-w-[200px]">{item.value}</p>
                  </div>
                  <Copy className="w-4 h-4 text-gray-400" />
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
