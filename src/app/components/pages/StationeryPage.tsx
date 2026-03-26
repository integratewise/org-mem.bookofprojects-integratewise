import { useEffect, useState, useRef } from 'react';
import { TAGLINES, BRAND, CONTACT } from '../../lib/brand';
import { motion } from 'motion/react';
import { 
  Download, Eye, FileText, Mail, CreditCard, Stamp, 
  Receipt, Signature, BookOpen, Printer, X, Check,
  Copy, ChevronDown, ChevronUp, Loader2
} from 'lucide-react';
import { toBlob } from 'html-to-image';
import { saveAs } from 'file-saver';
import { copyToClipboard } from '../../utils/clipboard';
import { loadJson, saveJson } from '../../lib/storage';

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

type StationeryContent = Record<string, string>;

const items: StationeryItem[] = [
  { id: 'letterhead', title: 'Letterhead', description: 'Official A4 letterhead template', specs: 'A4 (210×297mm)', tab: 'documents', icon: FileText, format: 'PNG/HTML', status: 'ready' },
  { id: 'invoice', title: 'Invoice Template', description: 'Professional billing template', specs: 'A4 (210×297mm)', tab: 'documents', icon: Receipt, format: 'PNG/HTML', status: 'ready' },
  { id: 'proposal', title: 'Proposal Template', description: 'Project proposal with signature blocks', specs: 'A4 (210×297mm)', tab: 'documents', icon: BookOpen, format: 'PNG/HTML', status: 'ready' },
  { id: 'seal', title: 'Company Seal', description: 'Official circular seal design', specs: 'Vector SVG', tab: 'identity', icon: Stamp, format: 'SVG/PNG', status: 'ready' },
  { id: 'business-card', title: 'Business Card', description: 'Front and back design', specs: '85×55mm', tab: 'identity', icon: CreditCard, format: 'PNG/HTML', status: 'ready' },
  { id: 'email-signature', title: 'Email Signature', description: 'HTML email signature template', specs: '600px wide', tab: 'digital', icon: Mail, format: 'HTML', status: 'ready' },
  { id: 'document-cover', title: 'Document Cover', description: 'Presentation cover page', specs: '1920×1080px', tab: 'documents', icon: BookOpen, format: 'HTML/PNG', status: 'ready' },
  { id: 'envelope', title: 'Envelope', description: 'Corporate envelope template', specs: 'DL (220×110mm)', tab: 'documents', icon: Printer, format: 'PNG/HTML', status: 'ready' },
];

function createSafeFilename(title: string) {
  return `IntegrateWise-${title.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'stationery'}`;
}

function generateSealSVG() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
  <defs>
    <linearGradient id="sealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4154A3" />
      <stop offset="100%" stop-color="#1B2544" />
    </linearGradient>
  </defs>
  <rect width="1200" height="1200" fill="#ffffff" />
  <circle cx="600" cy="600" r="420" fill="none" stroke="url(#sealGradient)" stroke-width="28" />
  <circle cx="600" cy="600" r="350" fill="none" stroke="#EB4379" stroke-width="10" stroke-dasharray="12 18" />
  <text x="600" y="360" text-anchor="middle" font-family="Arial, sans-serif" font-size="44" font-weight="700" letter-spacing="8" fill="#4154A3">INTEGRATEWISE LLP</text>
  <text x="600" y="870" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" font-weight="600" letter-spacing="6" fill="#4154A3">OFFICIAL SEAL</text>
  <circle cx="600" cy="600" r="180" fill="url(#sealGradient)" opacity="0.1" />
  <text x="600" y="560" text-anchor="middle" font-family="Arial, sans-serif" font-size="70" font-weight="700" fill="#1B2544">IW</text>
  <text x="600" y="635" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" font-weight="600" fill="#636A82">${TAGLINES.split.top}</text>
  <text x="600" y="675" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" font-weight="600" fill="#636A82">${TAGLINES.split.bottom}</text>
</svg>`.trim();
}

function getDefaultStationeryContent(id: string): StationeryContent {
  switch (id) {
    case 'letterhead':
      return {
        companyName: BRAND.name,
        tagline: TAGLINES.descriptorExtended,
        companyDetails: `${BRAND.legalName}\n${BRAND.location}\n${CONTACT.general}\n${BRAND.website}`,
        date: 'March 25, 2026',
        recipient: 'Recipient Name',
        subject: 'Strategic rollout proposal',
        body: `Thank you for exploring ${BRAND.name}.\n\nWe are sharing a governed AI rollout proposal for your team.\n\nPlease review the enclosed scope, timeline, and approval checkpoints.`,
        footer: TAGLINES.primary,
      };
    case 'invoice':
      return {
        companyName: BRAND.name,
        tagline: TAGLINES.descriptorExtended,
        invoiceNumber: '#INV-2026-001',
        clientName: 'Client Name',
        clientAddress: 'Client Address',
        invoiceDate: 'March 25, 2026',
        dueDate: 'April 10, 2026',
        lineItem: `${BRAND.name} Platform - Growth Plan`,
        total: '$1,178.82',
      };
    case 'proposal':
      return {
        companyName: BRAND.name,
        tagline: TAGLINES.descriptorExtended,
        proposalTitle: 'Context-Aware AI Rollout',
        preparedFor: 'Client Name',
        proposalDate: 'March 2026',
        validUntil: '30 Days',
        summary: `Unify fragmented tools into one governed workspace where AI reasons in context and every action waits for approval.`,
        scope: 'Spine setup, workflow design, approval checkpoints, rollout onboarding, and stakeholder enablement.',
        timeline: '4-week setup, 2-week pilot, 30-day success review with measurable adoption milestones.',
        preparedBy: BRAND.legalName,
        acceptedBy: 'Client Representative',
      };
    case 'seal':
      return {
        companyName: BRAND.legalName.toUpperCase(),
        label: 'OFFICIAL SEAL',
        initials: 'IW',
        taglineTop: TAGLINES.split.top,
        taglineBottom: TAGLINES.split.bottom,
      };
    case 'business-card':
      return {
        companyName: BRAND.name,
        tagline: TAGLINES.descriptorExtended,
        personName: 'Your Name',
        personTitle: 'Your Title',
        email: CONTACT.general,
        website: BRAND.website,
        phone: '+91 [Phone]',
        location: BRAND.location,
        footer: TAGLINES.primary,
      };
    case 'email-signature':
      return {
        companyName: BRAND.name,
        tagline: TAGLINES.descriptor,
        personName: 'Your Name',
        personTitle: 'Your Title',
        email: CONTACT.general,
        website: BRAND.website,
        footer: TAGLINES.primary,
      };
    case 'document-cover':
      return {
        companyName: BRAND.name,
        tagline: TAGLINES.descriptorExtended,
        documentType: 'Board Brief',
        documentTitle: 'Governed Intelligence Rollout Plan',
        documentSubtitle: 'Execution roadmap for adopting context-aware AI across work, knowledge, and decisions.',
        preparedBy: 'Strategy Office',
        documentDate: 'March 2026',
        version: 'v1.0',
      };
    case 'envelope':
      return {
        companyName: BRAND.legalName,
        returnAddress: BRAND.location,
        email: CONTACT.general,
        website: BRAND.website,
        recipientName: 'Recipient Name',
        recipientCompany: 'Company Name',
        recipientStreet: 'Street Address',
        recipientCity: 'City, State, ZIP',
        recipientCountry: 'Country',
        footer: TAGLINES.primary,
      };
    default:
      return {};
  }
}

function getStationeryFields(id: string): Array<{ key: string; label: string; multiline?: boolean }> {
  switch (id) {
    case 'letterhead':
      return [
        { key: 'companyName', label: 'Company Name' },
        { key: 'tagline', label: 'Tagline' },
        { key: 'companyDetails', label: 'Company Details', multiline: true },
        { key: 'date', label: 'Date' },
        { key: 'recipient', label: 'Recipient' },
        { key: 'subject', label: 'Subject' },
        { key: 'body', label: 'Body Copy', multiline: true },
        { key: 'footer', label: 'Footer' },
      ];
    case 'invoice':
      return [
        { key: 'companyName', label: 'Company Name' },
        { key: 'tagline', label: 'Tagline' },
        { key: 'invoiceNumber', label: 'Invoice Number' },
        { key: 'clientName', label: 'Client Name' },
        { key: 'clientAddress', label: 'Client Address', multiline: true },
        { key: 'invoiceDate', label: 'Invoice Date' },
        { key: 'dueDate', label: 'Due Date' },
        { key: 'lineItem', label: 'Primary Line Item' },
        { key: 'total', label: 'Total' },
      ];
    case 'proposal':
      return [
        { key: 'proposalTitle', label: 'Proposal Title' },
        { key: 'preparedFor', label: 'Prepared For' },
        { key: 'proposalDate', label: 'Date' },
        { key: 'validUntil', label: 'Valid Until' },
        { key: 'summary', label: 'Executive Summary', multiline: true },
        { key: 'scope', label: 'Scope', multiline: true },
        { key: 'timeline', label: 'Timeline', multiline: true },
        { key: 'preparedBy', label: 'Prepared By' },
        { key: 'acceptedBy', label: 'Accepted By' },
      ];
    case 'seal':
      return [
        { key: 'companyName', label: 'Company Ring Text' },
        { key: 'label', label: 'Seal Label' },
        { key: 'initials', label: 'Initials' },
        { key: 'taglineTop', label: 'Top Tagline' },
        { key: 'taglineBottom', label: 'Bottom Tagline' },
      ];
    case 'business-card':
      return [
        { key: 'companyName', label: 'Company Name' },
        { key: 'tagline', label: 'Tagline' },
        { key: 'personName', label: 'Person Name' },
        { key: 'personTitle', label: 'Person Title' },
        { key: 'email', label: 'Email' },
        { key: 'website', label: 'Website' },
        { key: 'phone', label: 'Phone' },
        { key: 'location', label: 'Location' },
        { key: 'footer', label: 'Footer' },
      ];
    case 'email-signature':
      return [
        { key: 'companyName', label: 'Company Name' },
        { key: 'tagline', label: 'Tagline' },
        { key: 'personName', label: 'Person Name' },
        { key: 'personTitle', label: 'Person Title' },
        { key: 'email', label: 'Email' },
        { key: 'website', label: 'Website' },
        { key: 'footer', label: 'Footer' },
      ];
    case 'document-cover':
      return [
        { key: 'documentType', label: 'Document Type' },
        { key: 'documentTitle', label: 'Document Title' },
        { key: 'documentSubtitle', label: 'Subtitle', multiline: true },
        { key: 'preparedBy', label: 'Prepared By' },
        { key: 'documentDate', label: 'Date' },
        { key: 'version', label: 'Version' },
      ];
    case 'envelope':
      return [
        { key: 'companyName', label: 'Company Name' },
        { key: 'returnAddress', label: 'Return Address', multiline: true },
        { key: 'email', label: 'Email' },
        { key: 'website', label: 'Website' },
        { key: 'recipientName', label: 'Recipient Name' },
        { key: 'recipientCompany', label: 'Recipient Company' },
        { key: 'recipientStreet', label: 'Street' },
        { key: 'recipientCity', label: 'City / State / ZIP' },
        { key: 'recipientCountry', label: 'Country' },
        { key: 'footer', label: 'Footer' },
      ];
    default:
      return [];
  }
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
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
      style={{ background: copied ? '#10B981' : 'rgba(65,84,163,0.08)', color: copied ? '#fff' : '#4154A3' }}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied!' : label}
    </motion.button>
  );
}

// Ready-Made Business Card Component
function ReadyMadeBusinessCard({ name, title, email, phone }: { name: string; title: string; email: string; phone: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const brandColor = '#4154A3';

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const blob = await toBlob(cardRef.current, { pixelRatio: 3, cacheBust: true });
      if (!blob) throw new Error('Could not generate image');
      saveAs(blob, `IntegrateWise-BusinessCard-${name.replace(/\s+/g, '')}.png`);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-xl border border-[#E8ECF2] p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-[#1B2544]">{name}</h3>
          <p className="text-xs text-[#5F6E93]">{title}</p>
        </div>
        <div className="flex gap-2">
          <CopyButton text={`${name}\n${title}\n${email}\n${phone}\n${BRAND.website}`} label="Copy Info" />
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#4154A3] text-white rounded-lg text-xs font-medium disabled:opacity-50"
          >
            {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            {isExporting ? '...' : 'Download'}
          </button>
        </div>
      </div>
      
      {/* Business Card Preview */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {/* Front */}
        <div ref={cardRef} className="shrink-0">
          <div className="w-[340px] h-[200px] bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between border border-[#E8ECF2]">
            <div>
              <h3 className="text-2xl font-bold" style={{ color: brandColor }}>IntegrateWise</h3>
              <p className="text-xs text-[#636A82] mt-1">{TAGLINES.descriptorExtended}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1B2544]">{name}</p>
              <p className="text-xs text-[#636A82]">{title}</p>
            </div>
          </div>
        </div>
        {/* Back */}
        <div className="shrink-0">
          <div className="w-[340px] h-[200px] rounded-xl shadow-lg p-6 flex flex-col justify-between" style={{ background: brandColor }}>
            <div className="text-white/80 text-xs space-y-1">
              <p>{email}</p>
              <p>{BRAND.website}</p>
              <p>{phone}</p>
            </div>
            <div className="text-white text-xs">
              <p>{BRAND.location}</p>
              <p className="mt-2 italic">{TAGLINES.primary}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Ready-Made Email Signature Component
function ReadyMadeEmailSignature({ name, title, email }: { name: string; title: string; email: string }) {
  const signatureHTML = `<table cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; font-size: 13px; color: #2F3D5E; margin-top: 20px;">
  <tr>
    <td style="padding-right: 16px; border-right: 2px solid #4154A3;">
      <p style="margin: 0; font-size: 16px; font-weight: 600; color: #4154A3;">IntegrateWise</p>
      <p style="margin: 4px 0 0; font-size: 11px; color: #636A82;">${TAGLINES.descriptor}</p>
    </td>
    <td style="padding-left: 16px;">
      <p style="margin: 0; font-weight: 600; color: #1B2544;">${name}</p>
      <p style="margin: 2px 0; font-size: 12px; color: #5F6E93;">${title}</p>
      <p style="margin: 8px 0 0; font-size: 11px;">
        <a href="mailto:${email}" style="color: #4154A3; text-decoration: none;">${email}</a>
      </p>
      <p style="margin: 2px 0; font-size: 11px;">
        <a href="https://${BRAND.website}" style="color: #4154A3; text-decoration: none;">${BRAND.website}</a>
      </p>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding-top: 12px; border-top: 1px solid #E8ECF2; margin-top: 12px;">
      <p style="margin: 0; font-size: 10px; color: #9BA8C2; font-style: italic;">
        ${TAGLINES.primary}
      </p>
    </td>
  </tr>
</table>`;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-xl border border-[#E8ECF2] p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-[#1B2544]">{name} - Email Signature</h3>
          <p className="text-xs text-[#5F6E93]">Ready to use in Gmail/Outlook</p>
        </div>
        <div className="flex gap-2">
          <CopyButton text={signatureHTML} label="Copy HTML" />
        </div>
      </div>
      
      {/* Preview */}
      <div className="bg-[#F8FAFC] rounded-lg p-4 overflow-x-auto">
        <div dangerouslySetInnerHTML={{ __html: signatureHTML }} />
      </div>
    </motion.div>
  );
}

// Preview Modal
function PreviewModal({ item, onClose }: { item: StationeryItem; onClose: () => void }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'html'>('preview');
  const [content, setContent] = useState<StationeryContent>(() => getDefaultStationeryContent(item.id));

  useEffect(() => {
    setContent(loadJson(`stationery-asset-${item.id}`, getDefaultStationeryContent(item.id)));
  }, [item.id]);

  useEffect(() => {
    saveJson(`stationery-asset-${item.id}`, content);
  }, [item.id, content]);

  const handleDownload = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    try {
      const blob = await toBlob(previewRef.current, { pixelRatio: 2, cacheBust: true });
      if (!blob) {
        throw new Error('Could not generate image blob');
      }
      saveAs(blob, `${createSafeFilename(item.title)}.png`);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadHTML = () => {
    const htmlContent = generateHTML(item.id, content);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    saveAs(blob, `${createSafeFilename(item.title)}.html`);
  };

  const handleDownloadSVG = () => {
      const blob = new Blob([generateSealSVG()], { type: 'image/svg+xml;charset=utf-8' });
      saveAs(blob, `${createSafeFilename(item.title)}.svg`);
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
              <div className="grid lg:grid-cols-[320px_minmax(0,1fr)] gap-6 items-start">
                <div className="bg-white rounded-xl border border-[#E8ECF2] p-4 space-y-4">
                  {getStationeryFields(item.id).map((field) => (
                    <div key={field.key}>
                      <label className="text-xs font-medium text-[#5F6E93]">{field.label}</label>
                      {field.multiline ? (
                        <textarea
                          value={content[field.key] ?? ''}
                          onChange={(e) => setContent((prev) => ({ ...prev, [field.key]: e.target.value }))}
                          className="mt-1 w-full rounded-lg border border-[#D5DAE5] px-3 py-2 text-sm min-h-20"
                        />
                      ) : (
                        <input
                          value={content[field.key] ?? ''}
                          onChange={(e) => setContent((prev) => ({ ...prev, [field.key]: e.target.value }))}
                          className="mt-1 w-full rounded-lg border border-[#D5DAE5] px-3 py-2 text-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div ref={previewRef} className="bg-white shadow-lg">
                  <PreviewContent id={item.id} content={content} />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#1B2544] rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-white/90 whitespace-pre-wrap">{generateHTML(item.id, content)}</pre>
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
            {item.id === 'seal' ? (
              <button
                onClick={handleDownloadSVG}
                className="flex items-center gap-2 px-4 py-2 border border-[#D5DAE5] text-[#475578] rounded-lg text-sm font-medium hover:bg-[#F0F2F7]"
              >
                <FileText className="w-4 h-4" />
                Download SVG
              </button>
            ) : item.format.includes('HTML') ? (
              <button
                onClick={handleDownloadHTML}
                className="flex items-center gap-2 px-4 py-2 border border-[#D5DAE5] text-[#475578] rounded-lg text-sm font-medium hover:bg-[#F0F2F7]"
              >
                <FileText className="w-4 h-4" />
                Download HTML Template
              </button>
            ) : null}
          </div>
          <CopyButton text={generateHTML(item.id, content)} label="Copy HTML" />
        </div>
      </motion.div>
    </div>
  );
}

// Preview Content Component
function PreviewContent({ id, content }: { id: string; content: StationeryContent }) {
  const brandColor = '#4154A3';
  
  switch (id) {
    case 'letterhead':
      return (
        <div className="w-[800px] h-[1131px] p-12 bg-white relative">
          {/* Header */}
          <div className="flex justify-between items-start pb-4 border-b-2" style={{ borderColor: brandColor }}>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: brandColor }}>{content.companyName}</h1>
              <p className="text-sm text-[#636A82] mt-1">{content.tagline}</p>
            </div>
            <div className="text-right text-xs text-[#636A82]">
              {content.companyDetails.split('\n').map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          {/* Body */}
          <div className="mt-12 text-[#333944]">
            <p className="text-sm mb-2">Date: {content.date}</p>
            <p className="text-sm mb-2">To:</p>
            <p className="text-sm mb-8 ml-4">{content.recipient}</p>
            <p className="text-sm mb-4">Subject: {content.subject}</p>
            <div className="h-64 border border-[#E8ECF2] rounded-lg p-6">
              {content.body.split('\n').map((line) => (
                <p key={line} className="text-sm mb-3">{line}</p>
              ))}
            </div>
          </div>
          {/* Footer */}
          <div className="absolute bottom-12 left-12 right-12 pt-4 border-t border-[#E8ECF2]">
            <p className="text-xs text-[#9BA8C2] text-center">
              {content.footer}
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
              <h1 className="text-3xl font-bold" style={{ color: brandColor }}>{content.companyName}</h1>
              <p className="text-sm text-[#636A82]">{content.tagline}</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-[#1B2544]">INVOICE</h2>
              <p className="text-sm text-[#636A82]">{content.invoiceNumber}</p>
            </div>
          </div>
          {/* Invoice Details */}
          <div className="grid grid-cols-2 gap-8 mt-8">
            <div>
              <p className="text-xs font-semibold text-[#9BA8C2] mb-2">BILL TO:</p>
              <p className="text-sm text-[#333944]">{content.clientName}</p>
              {content.clientAddress.split('\n').map((line) => (
                <p key={line} className="text-sm text-[#636A82]">{line}</p>
              ))}
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-[#9BA8C2] mb-2">INVOICE DETAILS:</p>
              <p className="text-sm text-[#333944]">Date: {content.invoiceDate}</p>
              <p className="text-sm text-[#333944]">Due Date: {content.dueDate}</p>
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
                  <td className="py-4 text-sm text-[#333944]">{content.lineItem}</td>
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
                <span className="text-sm font-bold" style={{ color: brandColor }}>{content.total}</span>
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
              <p className="text-xs text-[#636A82] mt-1">{TAGLINES.descriptorExtended}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1B2544]">[Your Name]</p>
              <p className="text-xs text-[#636A82]">[Your Title]</p>
            </div>
          </div>
          {/* Back */}
          <div className="w-[340px] h-[200px] rounded-xl shadow-lg p-6 flex flex-col justify-between" style={{ background: brandColor }}>
            <div className="text-white/80 text-xs">
              <p>{CONTACT.general}</p>
              <p>{BRAND.website}</p>
              <p>+91 [Phone]</p>
            </div>
            <div className="text-white text-xs">
              <p>{BRAND.location}</p>
              <p className="mt-2 italic">{TAGLINES.primary}</p>
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
                  {content.companyName} • KNOWLEDGE WORKSPACE •
                </textPath>
              </text>
              {/* Center */}
              <circle cx="100" cy="100" r="50" fill="#4154A3" />
              <text x="100" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{content.initials}</text>
              <text x="100" y="110" textAnchor="middle" fill="white" fontSize="6">{content.label}</text>
            </svg>
          </div>
        </div>
      );

    case 'proposal':
      return (
        <div className="w-[800px] h-[1131px] p-12 bg-white relative">
          <div className="text-center border-b-2 pb-5" style={{ borderColor: brandColor }}>
            <h1 className="text-3xl font-bold" style={{ color: brandColor }}>{content.companyName}</h1>
            <p className="text-sm text-[#636A82] mt-2">{content.tagline}</p>
          </div>
          <div className="text-center mt-10">
            <p className="text-xs tracking-[0.3em] text-[#9BA8C2]">PROJECT PROPOSAL</p>
            <h2 className="text-3xl font-bold text-[#1B2544] mt-3">{content.proposalTitle}</h2>
            <p className="text-sm text-[#636A82] mt-2">Prepared for enterprise buyers evaluating governed execution</p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-8 text-center">
            {[
              ['Prepared For', content.preparedFor],
              ['Date', content.proposalDate],
              ['Valid Until', content.validUntil],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-[#E8ECF2] p-4">
                <p className="text-[11px] uppercase text-[#9BA8C2]">{label}</p>
                <p className="text-sm font-medium text-[#1B2544] mt-2">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 space-y-6">
            {[
              ['Executive Summary', content.summary],
              ['Scope of Work', content.scope],
              ['Timeline', content.timeline],
            ].map(([heading, copy]) => (
              <div key={heading}>
                <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: brandColor }}>{heading}</h3>
                <p className="text-sm text-[#475578] mt-2 leading-6">{copy}</p>
              </div>
            ))}
          </div>
          <div className="absolute bottom-12 left-12 right-12 grid grid-cols-2 gap-8">
            <div className="border-t pt-3">
              <p className="text-xs font-semibold text-[#1B2544]">Prepared By</p>
              <p className="text-sm text-[#636A82] mt-1">{content.preparedBy}</p>
            </div>
            <div className="border-t pt-3">
              <p className="text-xs font-semibold text-[#1B2544]">Accepted By</p>
              <p className="text-sm text-[#636A82] mt-1">{content.acceptedBy}</p>
            </div>
          </div>
        </div>
      );

    case 'document-cover':
      return (
        <div className="w-[960px] h-[540px] bg-white relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-20" style={{ background: brandColor }} />
          <div className="absolute top-16 left-28">
            <h1 className="text-4xl font-bold" style={{ color: brandColor }}>{content.companyName}</h1>
            <p className="text-sm text-[#636A82] mt-2">{content.tagline}</p>
          </div>
          <div className="absolute left-28 right-24 top-1/2 -translate-y-1/2">
            <p className="text-xs tracking-[0.35em] text-[#9BA8C2] uppercase">{content.documentType}</p>
            <h2 className="text-5xl font-bold text-[#1B2544] mt-4 leading-tight">{content.documentTitle}</h2>
            <p className="text-lg text-[#636A82] mt-4 max-w-2xl">{content.documentSubtitle}</p>
          </div>
          <div className="absolute left-28 bottom-16 flex gap-10">
            {[
              ['Prepared By', content.preparedBy],
              ['Date', content.documentDate],
              ['Version', content.version],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-[11px] uppercase text-[#9BA8C2]">{label}</p>
                <p className="text-sm font-medium text-[#1B2544] mt-1">{value}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'envelope':
      return (
        <div className="w-[831px] h-[416px] bg-white relative overflow-hidden border border-[#E8ECF2]">
          <div className="absolute inset-y-0 left-0 w-8" style={{ background: brandColor }} />
          <div className="absolute left-14 top-10 text-[#636A82] text-xs leading-5">
            <p className="font-semibold text-[#4154A3]">{content.companyName}</p>
            {content.returnAddress.split('\n').map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>{content.email}</p>
            <p>{content.website}</p>
          </div>
          <div className="absolute left-[300px] top-[130px] text-[#1B2544] text-sm leading-6">
            <p className="font-semibold">{content.recipientName}</p>
            <p>{content.recipientCompany}</p>
            <p>{content.recipientStreet}</p>
            <p>{content.recipientCity}</p>
            <p>{content.recipientCountry}</p>
          </div>
          <div className="absolute right-12 top-8 w-24 h-28 border border-dashed border-[#D5DAE5] flex items-center justify-center text-[10px] text-[#9BA8C2]">
            STAMP
          </div>
          <p className="absolute left-14 bottom-8 text-[11px] italic text-[#9BA8C2]">{content.footer}</p>
        </div>
      );
      
    case 'email-signature':
      return (
        <div className="p-8 bg-white">
          <table cellPadding="0" cellSpacing="0" style={{ fontFamily: 'Arial, sans-serif', fontSize: '13px', color: '#2F3D5E' }}>
            <tbody>
              <tr>
                <td style={{ paddingRight: '16px', borderRight: '2px solid #4154A3' }}>
                  <p style={{ margin: '0', fontSize: '18px', fontWeight: '600', color: '#4154A3' }}>{content.companyName}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#636A82' }}>{content.tagline}</p>
                </td>
                <td style={{ paddingLeft: '16px' }}>
                  <p style={{ margin: '0', fontWeight: '600', color: '#1B2544' }}>{content.personName}</p>
                  <p style={{ margin: '2px 0', fontSize: '12px', color: '#5F6E93' }}>{content.personTitle}</p>
                  <p style={{ margin: '8px 0 0', fontSize: '11px' }}>
                    <a href={`mailto:${content.email}`} style={{ color: '#4154A3', textDecoration: 'none' }}>{content.email}</a>
                  </p>
                  <p style={{ margin: '2px 0', fontSize: '11px' }}>
                    <a href={`https://${content.website}`} style={{ color: '#4154A3', textDecoration: 'none' }}>{content.website}</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ paddingTop: '12px', borderTop: '1px solid #E8ECF2', marginTop: '12px' }}>
                  <p style={{ margin: '0', fontSize: '10px', color: '#9BA8C2', fontStyle: 'italic' }}>
                    {content.footer}
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
function generateHTML(id: string, content: StationeryContent): string {
  const brandColor = '#4154A3';
  
  switch (id) {
    case 'letterhead':
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>IntegrateWise Letterhead</title>
  <style>
    @media print { @page { margin: 0; } body { margin: 0; } }
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
        <h1>${content.companyName}</h1>
        <p>${content.tagline}</p>
      </div>
      <div class="company-info">
        ${content.companyDetails.split('\n').map((line) => `<p>${line}</p>`).join('')}
      </div>
    </div>
    <div class="content">
      <p>Date: ${content.date}</p>
      <p style="margin-top: 30px;">To:</p>
      <p style="margin-left: 20px;">${content.recipient}</p>
      <p style="margin-top: 30px;">Subject: ${content.subject}</p>
      <div style="margin-top: 40px; min-height: 300px;">
        ${content.body.split('\n').map((line) => `<p>${line}</p>`).join('')}
      </div>
    </div>
    <div class="footer">
      <p>${content.footer}</p>
    </div>
  </div>
</body>
</html>`;

    case 'invoice':
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>IntegrateWise Invoice</title>
  <style>
    @media print { @page { margin: 0; } body { margin: 0; } }
    body { margin: 0; font-family: Arial, sans-serif; background: #fff; }
    .page { width: 210mm; height: 297mm; padding: 25mm; box-sizing: border-box; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid ${brandColor}; padding-bottom: 20px; }
    .logo h1 { color: ${brandColor}; margin: 0; font-size: 28px; }
    .logo p { margin: 5px 0 0; color: #636A82; font-size: 13px; }
    .invoice-title { text-align: right; }
    .invoice-title h2 { margin: 0; font-size: 24px; color: #1B2544; }
    .invoice-title p { margin: 5px 0 0; color: #636A82; font-size: 13px; }
    .details { display: flex; justify-content: space-between; margin-top: 30px; }
    .bill-to h3, .invoice-details h3 { margin: 0 0 10px; font-size: 11px; color: #9BA8C2; text-transform: uppercase; }
    .bill-to p, .invoice-details p { margin: 3px 0; font-size: 13px; color: #333944; }
    .invoice-details { text-align: right; }
    table { width: 100%; border-collapse: collapse; margin-top: 30px; }
    th { text-align: left; padding: 12px 8px; border-bottom: 2px solid ${brandColor}; font-size: 13px; color: #1B2544; }
    td { padding: 12px 8px; border-bottom: 1px solid #E8ECF2; font-size: 13px; color: #333944; }
    .text-right { text-align: right; }
    .totals { margin-top: 30px; display: flex; justify-content: flex-end; }
    .totals-table { width: 250px; }
    .totals-table td { border: none; padding: 6px 0; }
    .totals-table tr:last-child td { border-top: 2px solid ${brandColor}; padding-top: 10px; font-weight: bold; }
    .totals-table tr:last-child td:last-child { color: ${brandColor}; }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="logo">
        <h1>${content.companyName}</h1>
        <p>${content.tagline}</p>
      </div>
      <div class="invoice-title">
        <h2>INVOICE</h2>
        <p>${content.invoiceNumber}</p>
      </div>
    </div>
    <div class="details">
      <div class="bill-to">
        <h3>Bill To:</h3>
        <p><strong>${content.clientName}</strong></p>
        ${content.clientAddress.split('\n').map((line) => `<p>${line}</p>`).join('')}
      </div>
      <div class="invoice-details">
        <h3>Invoice Details:</h3>
        <p><strong>Date:</strong> ${content.invoiceDate}</p>
        <p><strong>Due Date:</strong> ${content.dueDate}</p>
        <p><strong>Terms:</strong> Net 30</p>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th class="text-right">Qty</th>
          <th class="text-right">Rate</th>
          <th class="text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${content.lineItem}</td>
          <td class="text-right">1</td>
          <td class="text-right">$999.00</td>
          <td class="text-right">$999.00</td>
        </tr>
        <tr>
          <td>Implementation Services</td>
          <td class="text-right">40</td>
          <td class="text-right">$150.00</td>
          <td class="text-right">$6,000.00</td>
        </tr>
        <tr>
          <td>Training & Onboarding</td>
          <td class="text-right">1</td>
          <td class="text-right">$500.00</td>
          <td class="text-right">$500.00</td>
        </tr>
      </tbody>
    </table>
    <div class="totals">
      <table class="totals-table">
        <tr>
          <td>Subtotal:</td>
          <td class="text-right">$7,499.00</td>
        </tr>
        <tr>
          <td>Tax (18% GST):</td>
          <td class="text-right">$1,349.82</td>
        </tr>
        <tr>
          <td>Total:</td>
          <td class="text-right">${content.total}</td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>`;

    case 'proposal':
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>IntegrateWise Proposal</title>
  <style>
    @media print { @page { margin: 0; } body { margin: 0; } }
    body { margin: 0; font-family: Arial, sans-serif; background: #fff; }
    .page { width: 210mm; height: 297mm; padding: 25mm; box-sizing: border-box; position: relative; }
    .header { text-align: center; border-bottom: 2px solid ${brandColor}; padding-bottom: 20px; }
    .header h1 { color: ${brandColor}; margin: 0; font-size: 32px; }
    .header p { margin: 10px 0 0; color: #636A82; font-size: 14px; }
    .proposal-title { text-align: center; margin: 40px 0; }
    .proposal-title h2 { margin: 0; font-size: 24px; color: #1B2544; }
    .proposal-title p { margin: 10px 0 0; color: #636A82; }
    .meta { display: flex; justify-content: center; gap: 60px; margin: 30px 0; }
    .meta-item { text-align: center; }
    .meta-item .label { font-size: 11px; color: #9BA8C2; text-transform: uppercase; margin-bottom: 5px; }
    .meta-item .value { font-size: 14px; color: #333944; }
    .content { margin-top: 40px; }
    .section { margin-bottom: 30px; }
    .section h3 { color: ${brandColor}; font-size: 16px; margin: 0 0 15px; border-bottom: 1px solid #E8ECF2; padding-bottom: 8px; }
    .section p { color: #333944; font-size: 13px; line-height: 1.6; margin: 0 0 10px; }
    .signatures { display: flex; justify-content: space-between; margin-top: 60px; padding-top: 30px; border-top: 1px solid #E8ECF2; }
    .signature-block { width: 45%; }
    .signature-line { border-top: 1px solid #333; margin-top: 40px; padding-top: 8px; font-size: 12px; color: #636A82; }
    .footer { position: absolute; bottom: 25mm; left: 25mm; right: 25mm; text-align: center; font-size: 10px; color: #9BA8C2; }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <h1>${content.companyName}</h1>
      <p>${content.tagline}</p>
    </div>
    <div class="proposal-title">
      <h2>PROJECT PROPOSAL</h2>
      <p>${content.proposalTitle}</p>
    </div>
    <div class="meta">
      <div class="meta-item">
        <div class="label">Prepared For</div>
        <div class="value">${content.preparedFor}</div>
      </div>
      <div class="meta-item">
        <div class="label">Date</div>
        <div class="value">${content.proposalDate}</div>
      </div>
      <div class="meta-item">
        <div class="label">Valid Until</div>
        <div class="value">${content.validUntil}</div>
      </div>
    </div>
    <div class="content">
      <div class="section">
        <h3>Executive Summary</h3>
        <p>${content.summary}</p>
      </div>
      <div class="section">
        <h3>Scope of Work</h3>
        <p>${content.scope}</p>
      </div>
      <div class="section">
        <h3>Timeline</h3>
        <p>${content.timeline}</p>
      </div>
    </div>
    <div class="signatures">
      <div class="signature-block">
        <div class="signature-line">
          <strong>Prepared By</strong><br>
          ${content.preparedBy}
        </div>
      </div>
      <div class="signature-block">
        <div class="signature-line">
          <strong>Accepted By</strong><br>
          ${content.acceptedBy}
        </div>
      </div>
    </div>
    <div class="footer">
      <p>IntegrateWise LLP • Bengaluru, India • hello@integratewise.ai • integratewise.ai</p>
    </div>
  </div>
</body>
</html>`;

    case 'seal':
      return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer rings -->
  <circle cx="100" cy="100" r="95" fill="none" stroke="#4154A3" stroke-width="3"/>
  <circle cx="100" cy="100" r="85" fill="none" stroke="#4154A3" stroke-width="1"/>
  
  <!-- Text path definition -->
  <defs>
    <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"/>
  </defs>
  
  <!-- Circular text -->
  <text fill="#4154A3" font-size="10" font-weight="600" letter-spacing="2" font-family="Arial, sans-serif">
    <textPath href="#circlePath">
      INTEGRATEWISE LLP • KNOWLEDGE WORKSPACE •
    </textPath>
  </text>
  
  <!-- Center circle -->
  <circle cx="100" cy="100" r="50" fill="#4154A3"/>
  
  <!-- Initials -->
  <text x="100" y="95" text-anchor="middle" fill="white" font-size="12" font-weight="bold" font-family="Arial, sans-serif">IW</text>
  
  <!-- Established text -->
  <text x="100" y="110" text-anchor="middle" fill="white" font-size="6" font-family="Arial, sans-serif">EST. 2024</text>
</svg>`;

    case 'business-card':
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>IntegrateWise Business Card</title>
  <style>
    @media print { @page { margin: 0; size: auto; } body { margin: 0; } }
    body { margin: 0; font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
    .wrapper { display: flex; gap: 20px; flex-wrap: wrap; }
    .card { width: 85mm; height: 55mm; box-sizing: border-box; border-radius: 4mm; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .front { background: #fff; padding: 6mm; display: flex; flex-direction: column; justify-content: space-between; border: 0.5pt solid #E8ECF2; }
    .back { background: ${brandColor}; padding: 6mm; display: flex; flex-direction: column; justify-content: space-between; color: #fff; }
    .front .logo h2 { margin: 0; color: ${brandColor}; font-size: 18px; }
    .front .logo p { margin: 2mm 0 0; color: #636A82; font-size: 8px; }
    .front .person { margin-top: auto; }
    .front .person .name { margin: 0; font-size: 13px; font-weight: bold; color: #1B2544; }
    .front .person .title { margin: 1mm 0 0; font-size: 9px; color: #636A82; }
    .back .contact { font-size: 8px; line-height: 1.6; color: rgba(255,255,255,0.85); }
    .back .contact a { color: #fff; text-decoration: none; }
    .back .tagline { font-size: 7px; font-style: italic; color: rgba(255,255,255,0.7); margin-top: auto; }
    @media print { .wrapper { gap: 0; } .card { box-shadow: none; page-break-inside: avoid; margin-bottom: 10mm; } }
  </style>
</head>
<body>
  <div class="wrapper">
    <!-- Front -->
    <div class="card front">
      <div class="logo">
        <h2>${content.companyName}</h2>
        <p>${content.tagline}</p>
      </div>
      <div class="person">
        <p class="name">${content.personName}</p>
        <p class="title">${content.personTitle}</p>
      </div>
    </div>
    <!-- Back -->
    <div class="card back">
      <div class="contact">
        <p><a href="mailto:${content.email}">${content.email}</a></p>
        <p><a href="https://${content.website}">${content.website}</a></p>
        <p>${content.phone}</p>
      </div>
      <div class="tagline">
        ${content.footer}<br>
        ${content.location}
      </div>
    </div>
  </div>
</body>
</html>`;

    case 'email-signature':
      return `<table cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; font-size: 13px; color: #2F3D5E;">
  <tr>
    <td style="padding-right: 16px; border-right: 2px solid #4154A3;">
      <p style="margin: 0; font-size: 18px; font-weight: 600; color: #4154A3;">${content.companyName}</p>
      <p style="margin: 4px 0 0; font-size: 11px; color: #636A82;">${content.tagline}</p>
    </td>
    <td style="padding-left: 16px;">
      <p style="margin: 0; font-weight: 600; color: #1B2544;">${content.personName}</p>
      <p style="margin: 2px 0; font-size: 12px; color: #5F6E93;">${content.personTitle}</p>
      <p style="margin: 8px 0 0; font-size: 11px;">
        <a href="mailto:${content.email}" style="color: #4154A3; text-decoration: none;">${content.email}</a>
      </p>
      <p style="margin: 2px 0; font-size: 11px;">
        <a href="https://${content.website}" style="color: #4154A3; text-decoration: none;">${content.website}</a>
      </p>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding-top: 12px; border-top: 1px solid #E8ECF2;">
      <p style="margin: 0; font-size: 10px; color: #9BA8C2; font-style: italic;">
        ${content.footer}
      </p>
    </td>
  </tr>
</table>`;

    case 'document-cover':
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>IntegrateWise Document Cover</title>
  <style>
    @media print { @page { margin: 0; } body { margin: 0; } }
    body { margin: 0; font-family: Arial, sans-serif; }
    .page { width: 1920px; height: 1080px; position: relative; overflow: hidden; background: #fff; }
    .accent-bar { position: absolute; left: 0; top: 0; bottom: 0; width: 120px; background: ${brandColor}; }
    .logo-area { position: absolute; left: 160px; top: 80px; }
    .logo-area h1 { margin: 0; color: ${brandColor}; font-size: 48px; }
    .logo-area p { margin: 10px 0 0; color: #636A82; font-size: 18px; }
    .content { position: absolute; left: 160px; right: 160px; top: 50%; transform: translateY(-50%); }
    .doc-type { font-size: 16px; color: ${brandColor}; text-transform: uppercase; letter-spacing: 3px; margin: 0 0 20px; }
    .title { font-size: 72px; color: #1B2544; margin: 0; font-weight: bold; line-height: 1.1; }
    .subtitle { font-size: 24px; color: #636A82; margin: 30px 0 0; }
    .meta { position: absolute; left: 160px; bottom: 100px; display: flex; gap: 80px; }
    .meta-item .label { font-size: 12px; color: #9BA8C2; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px; }
    .meta-item .value { font-size: 16px; color: #333944; margin: 0; }
    .footer { position: absolute; right: 160px; bottom: 100px; text-align: right; }
    .footer p { margin: 0; font-size: 14px; color: #9BA8C2; }
    .tagline { margin-top: 10px; font-style: italic; }
  </style>
</head>
<body>
  <div class="page">
    <div class="accent-bar"></div>
    <div class="logo-area">
      <h1>${content.companyName}</h1>
      <p>${content.tagline}</p>
    </div>
    <div class="content">
      <p class="doc-type">${content.documentType}</p>
      <h2 class="title">${content.documentTitle}</h2>
      <p class="subtitle">${content.documentSubtitle}</p>
    </div>
    <div class="meta">
      <div class="meta-item">
        <p class="label">Prepared By</p>
        <p class="value">${content.preparedBy}</p>
      </div>
      <div class="meta-item">
        <p class="label">Date</p>
        <p class="value">${content.documentDate}</p>
      </div>
      <div class="meta-item">
        <p class="label">Version</p>
        <p class="value">${content.version}</p>
      </div>
    </div>
    <div class="footer">
      <p>IntegrateWise LLP • Bengaluru, India</p>
      <p class="tagline">AI Thinks in Context — and Waits for Approval</p>
    </div>
  </div>
</body>
</html>`;

    case 'envelope':
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>IntegrateWise Envelope</title>
  <style>
    @media print { @page { margin: 0; } body { margin: 0; } }
    body { margin: 0; font-family: Arial, sans-serif; background: #f5f5f5; }
    .envelope { width: 220mm; height: 110mm; background: #fff; position: relative; box-sizing: border-box; overflow: hidden; }
    .brand-bar { position: absolute; left: 0; top: 0; bottom: 0; width: 8mm; background: ${brandColor}; }
    .return-address { position: absolute; left: 15mm; top: 10mm; font-size: 9px; color: #636A82; line-height: 1.4; }
    .return-address strong { color: ${brandColor}; font-size: 11px; }
    .recipient-address { position: absolute; left: 80mm; top: 35mm; font-size: 12px; color: #1B2544; line-height: 1.6; }
    .recipient-address strong { font-size: 13px; }
    .stamp-area { position: absolute; right: 15mm; top: 10mm; width: 25mm; height: 30mm; border: 1px dashed #ccc; display: flex; align-items: center; justify-content: center; }
    .stamp-area span { font-size: 8px; color: #ccc; }
    .tagline { position: absolute; left: 15mm; bottom: 10mm; font-size: 8px; color: #9BA8C2; font-style: italic; }
    @media print { .envelope { box-shadow: none; } }
  </style>
</head>
<body>
  <div class="envelope">
    <div class="brand-bar"></div>
    <div class="return-address">
      <strong>${content.companyName}</strong><br>
      ${content.returnAddress.replace(/\n/g, '<br>')}<br>
      ${content.email}<br>
      ${content.website}
    </div>
    <div class="recipient-address">
      <strong>${content.recipientName}</strong><br>
      ${content.recipientCompany}<br>
      ${content.recipientStreet}<br>
      ${content.recipientCity}<br>
      ${content.recipientCountry}
    </div>
    <div class="stamp-area">
      <span>STAMP</span>
    </div>
    <div class="tagline">
      ${content.footer}
    </div>
  </div>
</body>
</html>`;

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
            <PreviewContent id={item.id} content={getDefaultStationeryContent(item.id)} />
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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

      {/* Ready-Made Team Templates */}
      {activeTab === 'all' || activeTab === 'identity' || activeTab === 'digital' ? (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Signature className="w-5 h-5 text-[#4154A3]" />
            <h2 className="text-xl font-bold text-[#1B2544]">Ready-Made Team Templates</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <ReadyMadeBusinessCard 
              name="Arun K."
              title="Co-Founder & CEO"
              email="arun@integratewise.ai"
              phone="+91 98765 43210"
            />
            <ReadyMadeBusinessCard 
              name="Nirmal K."
              title="Co-Founder & CTO"
              email="nirmal@integratewise.ai"
              phone="+91 98765 43211"
            />
            <ReadyMadeEmailSignature
              name="Arun K."
              title="Co-Founder & CEO"
              email="arun@integratewise.ai"
            />
            <ReadyMadeEmailSignature
              name="Nirmal K."
              title="Co-Founder & CTO"
              email="nirmal@integratewise.ai"
            />
          </div>
        </section>
      ) : null}

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <StationeryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
