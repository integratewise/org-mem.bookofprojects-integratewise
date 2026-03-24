import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Download, Eye, FileText, Mail, CreditCard, Stamp, 
  Receipt, Signature, BookOpen, Printer, X, Check,
  Copy, ChevronDown, ChevronUp, Loader2
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { copyToClipboard } from '../../utils/clipboard';

type Tab = 'all' | 'documents' | 'identity' | 'digital';

interface StationeryItem {
  id: string;
  title: string;
  description: string;
  specs: string;
  tab: 'documents' | 'identity' | 'digital';
  icon: typeof FileText;
  format: string;
  status: 'ready' | 'draft';
}

const items: StationeryItem[] = [
  { id: 'letterhead', title: 'Letterhead', description: 'Official A4 letterhead template', specs: 'A4 (210×297mm)', tab: 'documents', icon: FileText, format: 'HTML/PDF', status: 'ready' },
  { id: 'invoice', title: 'Invoice Template', description: 'Professional billing template', specs: 'A4 (210×297mm)', tab: 'documents', icon: Receipt, format: 'HTML/PDF', status: 'ready' },
  { id: 'proposal', title: 'Proposal Template', description: 'Project proposal with signature blocks', specs: 'A4 (210×297mm)', tab: 'documents', icon: BookOpen, format: 'HTML/PDF', status: 'ready' },
  { id: 'seal', title: 'Company Seal', description: 'Official circular seal design', specs: 'Vector SVG', tab: 'identity', icon: Stamp, format: 'SVG/PNG', status: 'ready' },
  { id: 'business-card', title: 'Business Card', description: 'Front and back design', specs: '85×55mm', tab: 'identity', icon: CreditCard, format: 'HTML/PDF', status: 'ready' },
  { id: 'email-signature', title: 'Email Signature', description: 'HTML email signature template', specs: '600px wide', tab: 'digital', icon: Mail, format: 'HTML', status: 'ready' },
  { id: 'document-cover', title: 'Document Cover', description: 'Presentation cover page', specs: '1920×1080px', tab: 'documents', icon: BookOpen, format: 'HTML/PNG', status: 'ready' },
  { id: 'envelope', title: 'Envelope', description: 'Corporate envelope template', specs: 'DL (220×110mm)', tab: 'documents', icon: Printer, format: 'HTML/PDF', status: 'ready' },
];

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
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
      style={{ background: copied ? '#10B981' : 'rgba(65,84,163,0.08)', color: copied ? '#fff' : '#4154A3' }}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied!' : label}
    </motion.button>
  );
}

// Preview Modal
function PreviewModal({ item, onClose }: { item: StationeryItem; onClose: () => void }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'html'>('preview');

  const handleDownload = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(previewRef.current, { pixelRatio: 2 });
      saveAs(dataUrl, `IntegrateWise-${item.title.replace(/\s+/g, '-')}.png`);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadHTML = () => {
    const htmlContent = generateHTML(item.id);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    saveAs(blob, `IntegrateWise-${item.title.replace(/\s+/g, '-')}.html`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E8ECF2]">
          <div>
            <h3 className="font-semibold text-[#1B2544]">{item.title}</h3>
            <p className="text-xs text-[#7B8AAD]">{item.specs} • {item.format}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#F0F2F7] rounded-lg">
            <X className="w-5 h-5 text-[#5F6E93]" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#E8ECF2]">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
              activeTab === 'preview' ? 'border-[#4154A3] text-[#4154A3]' : 'border-transparent text-[#5F6E93]'
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab('html')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
              activeTab === 'html' ? 'border-[#4154A3] text-[#4154A3]' : 'border-transparent text-[#5F6E93]'
            }`}
          >
            HTML Code
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 bg-[#F8FAFC]">
          {activeTab === 'preview' ? (
            <div className="flex justify-center">
              <div ref={previewRef} className="bg-white shadow-lg">
                <PreviewContent id={item.id} />
              </div>
            </div>
          ) : (
            <div className="bg-[#1B2544] rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-white/90 whitespace-pre-wrap">{generateHTML(item.id)}</pre>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-4 border-t border-[#E8ECF2] bg-white">
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-[#4154A3] text-white rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {isExporting ? 'Exporting...' : 'Download PNG'}
            </button>
            <button
              onClick={handleDownloadHTML}
              className="flex items-center gap-2 px-4 py-2 border border-[#D5DAE5] text-[#475578] rounded-lg text-sm font-medium hover:bg-[#F0F2F7]"
            >
              <FileText className="w-4 h-4" />
              Download HTML
            </button>
          </div>
          <CopyButton text={generateHTML(item.id)} label="Copy HTML" />
        </div>
      </motion.div>
    </div>
  );
}

// Preview Content Component
function PreviewContent({ id }: { id: string }) {
  const brandColor = '#4154A3';
  const accentColor = '#EB4379';
  
  switch (id) {
    case 'letterhead':
      return (
        <div className="w-[800px] h-[1131px] p-12 bg-white relative">
          {/* Header */}
          <div className="flex justify-between items-start pb-4 border-b-2" style={{ borderColor: brandColor }}>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: brandColor }}>IntegrateWise</h1>
              <p className="text-sm text-[#636A82] mt-1">Knowledge Workspace Over the Spine and Empowered by AI</p>
            </div>
            <div className="text-right text-xs text-[#636A82]">
              <p>IntegrateWise LLP</p>
              <p>Bengaluru, India</p>
              <p>hello@integratewise.ai</p>
              <p>integratewise.ai</p>
            </div>
          </div>
          {/* Body */}
          <div className="mt-12 text-[#333944]">
            <p className="text-sm mb-2">Date: _______________</p>
            <p className="text-sm mb-2">To:</p>
            <p className="text-sm mb-8 ml-4">[Recipient Name]</p>
            <p className="text-sm mb-4">Subject: _______________</p>
            <div className="h-64 border-2 border-dashed border-[#E8ECF2] rounded-lg flex items-center justify-center">
              <p className="text-[#9BA8C2]">Your content here...</p>
            </div>
          </div>
          {/* Footer */}
          <div className="absolute bottom-12 left-12 right-12 pt-4 border-t border-[#E8ECF2]">
            <p className="text-xs text-[#9BA8C2] text-center">
              AI Thinks in Context — and Waits for Approval
            </p>
          </div>
        </div>
      );
      
    case 'invoice':
      return (
        <div className="w-[800px] h-[1131px] p-12 bg-white">
          {/* Header */}
          <div className="flex justify-between items-start pb-6 border-b-2" style={{ borderColor: brandColor }}>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: brandColor }}>IntegrateWise</h1>
              <p className="text-sm text-[#636A82]">Knowledge Workspace Over the Spine and Empowered by AI</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-[#1B2544]">INVOICE</h2>
              <p className="text-sm text-[#636A82]">#INV-2026-001</p>
            </div>
          </div>
          {/* Invoice Details */}
          <div className="grid grid-cols-2 gap-8 mt-8">
            <div>
              <p className="text-xs font-semibold text-[#9BA8C2] mb-2">BILL TO:</p>
              <p className="text-sm text-[#333944]">[Client Name]</p>
              <p className="text-sm text-[#636A82]">[Client Address]</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-[#9BA8C2] mb-2">INVOICE DETAILS:</p>
              <p className="text-sm text-[#333944]">Date: _______________</p>
              <p className="text-sm text-[#333944]">Due Date: _______________</p>
            </div>
          </div>
          {/* Line Items */}
          <div className="mt-8">
            <table className="w-full">
              <thead>
                <tr className="border-b-2" style={{ borderColor: brandColor }}>
                  <th className="text-left py-2 text-sm font-semibold text-[#1B2544]">Description</th>
                  <th className="text-right py-2 text-sm font-semibold text-[#1B2544]">Qty</th>
                  <th className="text-right py-2 text-sm font-semibold text-[#1B2544]">Rate</th>
                  <th className="text-right py-2 text-sm font-semibold text-[#1B2544]">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#E8ECF2]">
                  <td className="py-4 text-sm text-[#333944]">IntegrateWise Platform - Growth Plan</td>
                  <td className="py-4 text-sm text-[#333944] text-right">1</td>
                  <td className="py-4 text-sm text-[#333944] text-right">$999.00</td>
                  <td className="py-4 text-sm text-[#333944] text-right">$999.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Totals */}
          <div className="mt-8 flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-2">
                <span className="text-sm text-[#636A82]">Subtotal:</span>
                <span className="text-sm text-[#333944]">$999.00</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-[#636A82]">Tax (18%):</span>
                <span className="text-sm text-[#333944]">$179.82</span>
              </div>
              <div className="flex justify-between py-2 border-t-2" style={{ borderColor: brandColor }}>
                <span className="text-sm font-semibold text-[#1B2544]">Total:</span>
                <span className="text-sm font-bold" style={{ color: brandColor }}>$1,178.82</span>
              </div>
            </div>
          </div>
        </div>
      );
      
    case 'business-card':
      return (
        <div className="flex gap-4 p-8">
          {/* Front */}
          <div className="w-[340px] h-[200px] bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between border border-[#E8ECF2]">
            <div>
              <h3 className="text-2xl font-bold" style={{ color: brandColor }}>IntegrateWise</h3>
              <p className="text-xs text-[#636A82] mt-1">Knowledge Workspace Over the Spine and Empowered by AI</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1B2544]">[Your Name]</p>
              <p className="text-xs text-[#636A82]">[Your Title]</p>
            </div>
          </div>
          {/* Back */}
          <div className="w-[340px] h-[200px] rounded-xl shadow-lg p-6 flex flex-col justify-between" style={{ background: brandColor }}>
            <div className="text-white/80 text-xs">
              <p>hello@integratewise.ai</p>
              <p>integratewise.ai</p>
              <p>+91 [Phone]</p>
            </div>
            <div className="text-white text-xs">
              <p>Bengaluru, India</p>
              <p className="mt-2 italic">AI Thinks in Context — and Waits for Approval</p>
            </div>
          </div>
        </div>
      );
      
    case 'seal':
      return (
        <div className="p-8 flex items-center justify-center">
          <div className="relative w-64 h-64">
            {/* Outer ring */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="95" fill="none" stroke="#4154A3" strokeWidth="3" />
              <circle cx="100" cy="100" r="85" fill="none" stroke="#4154A3" strokeWidth="1" />
              {/* Text path */}
              <defs>
                <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
              </defs>
              <text fill="#4154A3" fontSize="10" fontWeight="600" letterSpacing="2">
                <textPath href="#circlePath">
                  INTEGRATEWISE LLP • KNOWLEDGE WORKSPACE •
                </textPath>
              </text>
              {/* Center */}
              <circle cx="100" cy="100" r="50" fill="#4154A3" />
              <text x="100" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">IW</text>
              <text x="100" y="110" textAnchor="middle" fill="white" fontSize="6">EST. 2024</text>
            </svg>
          </div>
        </div>
      );
      
    case 'email-signature':
      return (
        <div className="p-8 bg-white">
          <table cellPadding="0" cellSpacing="0" style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#2F3D5E' }}>
            <tbody>
              <tr>
                <td style={{ paddingRight: '16px', borderRight: '2px solid #4154A3' }}>
                  <p style={{ margin: '0', fontSize: '18px', fontWeight: '600', color: '#4154A3' }}>IntegrateWise</p>
                  <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#636A82' }}>Knowledge Workspace Over the Spine</p>
                </td>
                <td style={{ paddingLeft: '16px' }}>
                  <p style={{ margin: '0', fontWeight: '600', color: '#1B2544' }}>[Your Name]</p>
                  <p style={{ margin: '2px 0', fontSize: '12px', color: '#5F6E93' }}>[Your Title]</p>
                  <p style={{ margin: '8px 0 0', fontSize: '11px' }}>
                    <a href="mailto:hello@integratewise.ai" style={{ color: '#4154A3', textDecoration: 'none' }}>hello@integratewise.ai</a>
                  </p>
                  <p style={{ margin: '2px 0', fontSize: '11px' }}>
                    <a href="https://integratewise.ai" style={{ color: '#4154A3', textDecoration: 'none' }}>integratewise.ai</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ paddingTop: '12px', borderTop: '1px solid #E8ECF2', marginTop: '12px' }}>
                  <p style={{ margin: '0', fontSize: '10px', color: '#9BA8C2', fontStyle: 'italic' }}>
                    AI Thinks in Context — and Waits for Approval
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
      
    default:
      return (
        <div className="p-12 flex items-center justify-center">
          <p className="text-[#9BA8C2]">Preview for {id}</p>
        </div>
      );
  }
}

// Generate HTML for download
function generateHTML(id: string): string {
  const brandColor = '#4154A3';
  
  switch (id) {
    case 'letterhead':
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>IntegrateWise Letterhead</title>
  <style>
    body { margin: 0; font-family: Arial, sans-serif; }
    .page { width: 210mm; height: 297mm; padding: 25mm; box-sizing: border-box; position: relative; }
    .header { display: flex; justify-content: space-between; border-bottom: 2px solid ${brandColor}; padding-bottom: 15px; }
    .logo h1 { color: ${brandColor}; margin: 0; font-size: 28px; }
    .logo p { margin: 5px 0 0; color: #636A82; font-size: 13px; }
    .company-info { text-align: right; font-size: 11px; color: #636A82; }
    .content { margin-top: 50px; color: #333944; }
    .footer { position: absolute; bottom: 25mm; left: 25mm; right: 25mm; text-align: center; font-size: 10px; color: #9BA8C2; border-top: 1px solid #E8ECF2; padding-top: 10px; }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="logo">
        <h1>IntegrateWise</h1>
        <p>Knowledge Workspace Over the Spine and Empowered by AI</p>
      </div>
      <div class="company-info">
        <p>IntegrateWise LLP</p>
        <p>Bengaluru, India</p>
        <p>hello@integratewise.ai</p>
        <p>integratewise.ai</p>
      </div>
    </div>
    <div class="content">
      <p>Date: _______________</p>
      <p style="margin-top: 30px;">To:</p>
      <p style="margin-left: 20px;">[Recipient Name]</p>
      <p style="margin-left: 20px;">[Recipient Address]</p>
      <p style="margin-top: 30px;">Subject: _______________</p>
      <div style="margin-top: 40px; min-height: 300px;">
        <p>[Your content here...]</p>
      </div>
    </div>
    <div class="footer">
      <p>AI Thinks in Context — and Waits for Approval</p>
    </div>
  </div>
</body>
</html>`;

    case 'email-signature':
      return `<table cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; font-size: 13px; color: #2F3D5E;">
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
</table>`;

    default:
      return `<!-- HTML template for ${id} -->`;
  }
}

// Stationery Card Component
function StationeryCard({ item }: { item: StationeryItem }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const Icon = item.icon;

  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}
        className="bg-white rounded-xl border border-[#D5DAE5] overflow-hidden shadow-sm"
      >
        {/* Preview Area */}
        <div className="h-40 bg-[#F8FAFC] flex items-center justify-center p-4">
          <div className="scale-50 origin-center">
            <PreviewContent id={item.id} />
          </div>
        </div>
        
        {/* Info */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[rgba(65,84,163,0.08)] flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#4154A3]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1B2544]">{item.title}</h3>
                <p className="text-xs text-[#5F6E93]">{item.specs}</p>
              </div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              item.status === 'ready' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
            }`}>
              {item.status}
            </span>
          </div>
          
          <p className="text-sm text-[#5F6E93] mb-4">{item.description}</p>
          
          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#4154A3] text-white rounded-lg text-sm font-medium hover:bg-[#364789]"
            >
              <Eye className="w-4 h-4" />
              Preview & Download
            </button>
          </div>
        </div>
      </motion.div>
      
      {isPreviewOpen && <PreviewModal item={item} onClose={() => setIsPreviewOpen(false)} />}
    </>
  );
}

// Main Component
export function StationeryPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  
  const filteredItems = items.filter(item => activeTab === 'all' || item.tab === activeTab);

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-2">
          <Stamp className="w-5 h-5 text-[#4154A3]" />
          <span className="text-xs font-semibold text-[#4154A3] uppercase tracking-wider">Brand Assets</span>
        </div>
        <h1 className="text-3xl font-bold text-[#1B2544] mb-2">Corporate Stationery</h1>
        <p className="text-[#5F6E93]">Official documents, identity materials, and digital assets for IntegrateWise LLP</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Documents', count: items.filter(i => i.tab === 'documents').length, icon: FileText },
          { label: 'Identity', count: items.filter(i => i.tab === 'identity').length, icon: CreditCard },
          { label: 'Digital', count: items.filter(i => i.tab === 'digital').length, icon: Mail },
          { label: 'Total', count: items.length, icon: Stamp },
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

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-[#E8ECF2]">
        {[
          { value: 'all', label: 'All Items' },
          { value: 'documents', label: 'Documents' },
          { value: 'identity', label: 'Identity' },
          { value: 'digital', label: 'Digital' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value as Tab)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === tab.value
                ? 'border-[#4154A3] text-[#4154A3]'
                : 'border-transparent text-[#5F6E93] hover:text-[#4154A3]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <StationeryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
