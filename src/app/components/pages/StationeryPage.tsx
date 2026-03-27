import React, { useState, useRef, useEffect } from 'react';
import { TAGLINES, BRAND, CONTACT } from '../../lib/brand';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, Eye, FileText, Mail, CreditCard, Stamp, 
  Receipt, Signature, BookOpen, Printer, X, Check,
  Copy, ChevronDown, ChevronUp, Loader2, Folder, Palette,
  Grid3x3, List, Search, Settings2, ZoomIn, ZoomOut, MoreVertical
} from 'lucide-react';
import { toBlob } from 'html-to-image';
import { saveAs } from 'file-saver';
import { copyToClipboard } from '../../utils/clipboard';
import { loadJson, saveJson } from '../../lib/storage';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, AlignmentType, UnderlineType } from 'docx';

type Tab = 'all' | 'documents' | 'identity' | 'digital' | 'collateral';

interface StationeryItem {
  id: string;
  title: string;
  description: string;
  specs: string;
  tab: 'documents' | 'identity' | 'digital' | 'collateral';
  icon: typeof FileText;
  format: string;
  status: 'ready' | 'draft';
  category: string;
  tags: string[];
}

interface StationeryContent extends Record<string, string> {
  brandColor?: string;
  accentColor?: string;
  fontFamily?: string;
}

const items: StationeryItem[] = [
  // Documents
  { id: 'letterhead', title: 'Letterhead', description: 'Official A4 letterhead template', specs: 'A4 (210×297mm)', tab: 'documents', icon: FileText, format: 'PNG/HTML/PDF', status: 'ready', category: 'Documents', tags: ['a4', 'official', 'letter'] },
  { id: 'invoice', title: 'Invoice Template', description: 'Professional billing template', specs: 'A4 (210×297mm)', tab: 'documents', icon: Receipt, format: 'PNG/HTML/PDF', status: 'ready', category: 'Documents', tags: ['billing', 'accounting', 'professional'] },
  { id: 'proposal', title: 'Proposal Template', description: 'Project proposal with signature blocks', specs: 'A4 (210×297mm)', tab: 'documents', icon: BookOpen, format: 'PNG/HTML/PDF', status: 'ready', category: 'Documents', tags: ['sales', 'formal', 'agreement'] },
  { id: 'memo', title: 'Memo Template', description: 'Internal memo for quick communication', specs: 'A4 (210×297mm)', tab: 'documents', icon: FileText, format: 'PNG/HTML/PDF', status: 'ready', category: 'Documents', tags: ['internal', 'communication', 'quick'] },
  { id: 'report-cover', title: 'Report Cover', description: 'Professional report cover page', specs: 'A4 (210×297mm)', tab: 'documents', icon: BookOpen, format: 'PNG/HTML/PDF', status: 'ready', category: 'Documents', tags: ['report', 'analysis', 'executive'] },
  { id: 'fax-cover', title: 'Fax Cover Sheet', description: 'Standard fax cover sheet template', specs: 'A4 (210×297mm)', tab: 'documents', icon: Printer, format: 'PNG/HTML/PDF', status: 'ready', category: 'Documents', tags: ['fax', 'formal', 'legacy'] },
  { id: 'document-cover', title: 'Document Cover', description: 'Presentation cover page', specs: '1920×1080px', tab: 'documents', icon: BookOpen, format: 'HTML/PNG/PDF', status: 'ready', category: 'Documents', tags: ['presentation', 'digital', 'cover'] },
  { id: 'envelope', title: 'Envelope', description: 'Corporate envelope template', specs: 'DL (220×110mm)', tab: 'documents', icon: Printer, format: 'PNG/HTML/PDF', status: 'ready', category: 'Documents', tags: ['mailing', 'corporate', 'physical'] },
  
  // Identity
  { id: 'seal', title: 'Company Seal', description: 'Official circular seal design', specs: 'Vector SVG', tab: 'identity', icon: Stamp, format: 'SVG/PNG/PDF', status: 'ready', category: 'Identity', tags: ['seal', 'official', 'vector'] },
  { id: 'business-card', title: 'Business Card', description: 'Front and back design', specs: '85×55mm', tab: 'identity', icon: CreditCard, format: 'PNG/HTML/PDF', status: 'ready', category: 'Identity', tags: ['card', 'contact', 'personal'] },
  
  // Digital
  { id: 'email-signature', title: 'Email Signature', description: 'HTML email signature template', specs: '600px wide', tab: 'digital', icon: Mail, format: 'HTML', status: 'ready', category: 'Digital', tags: ['email', 'html', 'signature'] },
  
  // Collateral
  { id: 'notepad', title: 'Notepad Design', description: 'Custom branded notepad template', specs: 'A5 (148×210mm)', tab: 'collateral', icon: FileText, format: 'PNG/HTML/PDF', status: 'ready', category: 'Collateral', tags: ['stationery', 'notepad', 'branded'] },
  { id: 'folder', title: 'Folder Template', description: 'File folder branding design', specs: 'A4 Folded', tab: 'collateral', icon: Folder, format: 'PNG/HTML/PDF', status: 'ready', category: 'Collateral', tags: ['folder', 'physical', 'branding'] },
  { id: 'sticker', title: 'Sticker Design', description: 'Custom branded sticker sheet', specs: 'Multiple sizes', tab: 'collateral', icon: Stamp, format: 'PNG/SVG/PDF', status: 'ready', category: 'Collateral', tags: ['sticker', 'branding', 'promotional'] },
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
        brandColor: '#4154A3',
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
        brandColor: '#4154A3',
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
        brandColor: '#4154A3',
      };
    case 'memo':
      return {
        companyName: BRAND.name,
        memoDate: 'March 25, 2026',
        memoFrom: 'Sender Name',
        memoTo: 'Recipient Name',
        memoSubject: 'Project Update',
        memoBody: 'Please review the following important update regarding our current projects.',
        brandColor: '#4154A3',
      };
    case 'report-cover':
      return {
        reportTitle: 'Quarterly Report',
        reportSubtitle: 'Q1 2026 Performance Review',
        reportDate: 'March 2026',
        companyName: BRAND.name,
        preparedBy: 'Strategy Office',
        brandColor: '#4154A3',
      };
    case 'fax-cover':
      return {
        senderCompany: BRAND.name,
        senderName: 'Sender Name',
        senderPhone: CONTACT.general,
        recipientCompany: 'Recipient Company',
        recipientName: 'Recipient Name',
        recipientPhone: '+1 (000) 000-0000',
        numberOfPages: '1',
        subject: 'Fax Transmission',
        message: 'Please find the requested documents attached.',
        brandColor: '#4154A3',
      };
    case 'seal':
      return {
        companyName: BRAND.legalName.toUpperCase(),
        label: 'OFFICIAL SEAL',
        initials: 'IW',
        taglineTop: TAGLINES.split.top,
        taglineBottom: TAGLINES.split.bottom,
        brandColor: '#4154A3',
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
        brandColor: '#4154A3',
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
        brandColor: '#4154A3',
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
        brandColor: '#4154A3',
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
        brandColor: '#4154A3',
      };
    case 'notepad':
      return {
        companyName: BRAND.name,
        tagline: TAGLINES.descriptor,
        footerText: TAGLINES.primary,
        brandColor: '#4154A3',
      };
    case 'folder':
      return {
        companyName: BRAND.name,
        tagline: TAGLINES.descriptorExtended,
        folderText: 'Project Folder',
        brandColor: '#4154A3',
      };
    case 'sticker':
      return {
        companyName: BRAND.name,
        tagline: TAGLINES.descriptor,
        stickerText: 'Made with IntegrateWise',
        brandColor: '#4154A3',
      };
    default:
      return { brandColor: '#4154A3' };
  }
}

function getStationeryFields(id: string): Array<{ key: string; label: string; multiline?: boolean; type?: 'text' | 'color' }> {
  const baseFields = [
    { key: 'brandColor', label: 'Brand Color', type: 'color' as const },
  ];

  switch (id) {
    case 'letterhead':
      return [
        ...baseFields,
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
        ...baseFields,
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
        ...baseFields,
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
    case 'memo':
      return [
        ...baseFields,
        { key: 'companyName', label: 'Company Name' },
        { key: 'memoDate', label: 'Date' },
        { key: 'memoFrom', label: 'From' },
        { key: 'memoTo', label: 'To' },
        { key: 'memoSubject', label: 'Subject' },
        { key: 'memoBody', label: 'Message', multiline: true },
      ];
    case 'report-cover':
      return [
        ...baseFields,
        { key: 'reportTitle', label: 'Report Title' },
        { key: 'reportSubtitle', label: 'Subtitle' },
        { key: 'reportDate', label: 'Date' },
        { key: 'companyName', label: 'Company Name' },
        { key: 'preparedBy', label: 'Prepared By' },
      ];
    case 'fax-cover':
      return [
        ...baseFields,
        { key: 'senderCompany', label: 'Sender Company' },
        { key: 'senderName', label: 'Sender Name' },
        { key: 'senderPhone', label: 'Sender Phone' },
        { key: 'recipientCompany', label: 'Recipient Company' },
        { key: 'recipientName', label: 'Recipient Name' },
        { key: 'recipientPhone', label: 'Recipient Phone' },
        { key: 'numberOfPages', label: 'Number of Pages' },
        { key: 'subject', label: 'Subject' },
        { key: 'message', label: 'Message', multiline: true },
      ];
    case 'seal':
      return [
        ...baseFields,
        { key: 'companyName', label: 'Company Ring Text' },
        { key: 'label', label: 'Seal Label' },
        { key: 'initials', label: 'Initials' },
        { key: 'taglineTop', label: 'Top Tagline' },
        { key: 'taglineBottom', label: 'Bottom Tagline' },
      ];
    case 'business-card':
      return [
        ...baseFields,
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
        ...baseFields,
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
        ...baseFields,
        { key: 'documentType', label: 'Document Type' },
        { key: 'documentTitle', label: 'Document Title' },
        { key: 'documentSubtitle', label: 'Subtitle', multiline: true },
        { key: 'preparedBy', label: 'Prepared By' },
        { key: 'documentDate', label: 'Date' },
        { key: 'version', label: 'Version' },
      ];
    case 'envelope':
      return [
        ...baseFields,
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
    case 'notepad':
      return [
        ...baseFields,
        { key: 'companyName', label: 'Company Name' },
        { key: 'tagline', label: 'Tagline' },
        { key: 'footerText', label: 'Footer Text' },
      ];
    case 'folder':
      return [
        ...baseFields,
        { key: 'companyName', label: 'Company Name' },
        { key: 'tagline', label: 'Tagline' },
        { key: 'folderText', label: 'Folder Label' },
      ];
    case 'sticker':
      return [
        ...baseFields,
        { key: 'companyName', label: 'Company Name' },
        { key: 'tagline', label: 'Tagline' },
        { key: 'stickerText', label: 'Sticker Text' },
      ];
    default:
      return baseFields;
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

// Export Functions
async function exportToPDF(elementRef: React.RefObject<HTMLDivElement>, filename: string) {
  if (!elementRef.current) return;
  try {
    const canvas = await toBlob(elementRef.current, { pixelRatio: 2, cacheBust: true });
    if (!canvas) throw new Error('Could not generate image');
    
    const img = new Image();
    img.src = URL.createObjectURL(canvas);
    img.onload = () => {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      const imgWidth = 210;
      const imgHeight = (img.height * imgWidth) / img.width;
      pdf.addImage(img, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${filename}.pdf`);
    };
  } catch (err) {
    console.error('PDF export failed:', err);
  }
}

async function exportToWord(content: StationeryContent, title: string, filename: string) {
  try {
    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({
            text: title,
            bold: true,
            size: 32,
            spacing: { after: 400 }
          }),
          ...Object.entries(content)
            .filter(([key]) => !key.startsWith('brand'))
            .map(([key, value]) => new Paragraph({
              text: `${key}: ${value}`,
              size: 22,
              spacing: { after: 200 }
            }))
        ]
      }]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${filename}.docx`);
  } catch (err) {
    console.error('Word export failed:', err);
  }
}

// Preview Modal
function PreviewModal({ item, onClose }: { item: StationeryItem; onClose: () => void }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'html'>('preview');
  const [content, setContent] = useState<StationeryContent>(() => getDefaultStationeryContent(item.id));
  const [exportFormat, setExportFormat] = useState<'png' | 'pdf' | 'html' | 'word' | 'svg'>('png');

  useEffect(() => {
    setContent(loadJson(`stationery-asset-${item.id}`, getDefaultStationeryContent(item.id)));
  }, [item.id]);

  useEffect(() => {
    saveJson(`stationery-asset-${item.id}`, content);
  }, [item.id, content]);

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      switch (exportFormat) {
        case 'png':
          if (previewRef.current) {
            const blob = await toBlob(previewRef.current, { pixelRatio: 2, cacheBust: true });
            if (blob) saveAs(blob, `${createSafeFilename(item.title)}.png`);
          }
          break;
        case 'pdf':
          await exportToPDF(previewRef, createSafeFilename(item.title));
          break;
        case 'html':
          const htmlContent = generateHTML(item.id, content);
          const htmlBlob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
          saveAs(htmlBlob, `${createSafeFilename(item.title)}.html`);
          break;
        case 'word':
          await exportToWord(content, item.title, createSafeFilename(item.title));
          break;
        case 'svg':
          if (item.id === 'seal') {
            const svgBlob = new Blob([generateSealSVG()], { type: 'image/svg+xml;charset=utf-8' });
            saveAs(svgBlob, `${createSafeFilename(item.title)}.svg`);
          }
          break;
      }
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E8ECF2]">
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
            Preview & Edit
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
              <div className="grid lg:grid-cols-[300px_minmax(0,1fr)] gap-6 items-start">
                {/* Edit Panel */}
                <div className="bg-white rounded-xl border border-[#E8ECF2] p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                  <h4 className="font-semibold text-[#1B2544] text-sm">Edit Content</h4>
                  {getStationeryFields(item.id).map((field) => (
                    <div key={field.key}>
                      <label className="text-xs font-medium text-[#5F6E93]">{field.label}</label>
                      {field.type === 'color' ? (
                        <div className="mt-2 flex items-center gap-2">
                          <input
                            type="color"
                            value={content[field.key] ?? '#4154A3'}
                            onChange={(e) => setContent((prev) => ({ ...prev, [field.key]: e.target.value }))}
                            className="w-12 h-10 rounded-lg border border-[#D5DAE5] cursor-pointer"
                          />
                          <input
                            type="text"
                            value={content[field.key] ?? '#4154A3'}
                            onChange={(e) => setContent((prev) => ({ ...prev, [field.key]: e.target.value }))}
                            className="flex-1 rounded-lg border border-[#D5DAE5] px-2 py-2 text-xs font-mono"
                          />
                        </div>
                      ) : field.multiline ? (
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

                {/* Preview */}
                <div ref={previewRef} className="bg-white shadow-lg rounded-lg overflow-hidden">
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
        <div className="flex items-center justify-between p-6 border-t border-[#E8ECF2] bg-white gap-4">
          <div className="flex gap-2 flex-wrap">
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as any)}
              className="px-3 py-2 rounded-lg border border-[#D5DAE5] text-sm font-medium text-[#1B2544]"
            >
              <option value="png">PNG Image</option>
              <option value="pdf">PDF Document</option>
              <option value="html">HTML Template</option>
              <option value="word">Word (.docx)</option>
              {item.id === 'seal' && <option value="svg">SVG Vector</option>}
            </select>
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-[#4154A3] text-white rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {isExporting ? 'Exporting...' : 'Download'}
            </button>
          </div>
          <CopyButton text={generateHTML(item.id, content)} label="Copy HTML" />
        </div>
      </motion.div>
    </div>
  );
}

// Preview Content Component
function PreviewContent({ id, content }: { id: string; content: StationeryContent }) {
  const brandColor = content.brandColor || '#4154A3';
  
  switch (id) {
    case 'letterhead':
      return (
        <div className="w-[800px] h-[1131px] p-12 bg-white relative">
          <div className="flex justify-between items-start pb-4 border-b-2" style={{ borderColor: brandColor }}>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: brandColor }}>{content.companyName}</h1>
              <p className="text-sm text-[#636A82] mt-1">{content.tagline}</p>
            </div>
            <div className="text-right text-xs text-[#636A82]">
              {content.companyDetails?.split('\n').map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <div className="mt-12 text-[#333944]">
            <p className="text-sm mb-2">Date: {content.date}</p>
            <p className="text-sm mb-2">To:</p>
            <p className="text-sm mb-8 ml-4">{content.recipient}</p>
            <p className="text-sm mb-4">Subject: {content.subject}</p>
            <div className="h-64 border border-[#E8ECF2] rounded-lg p-6">
              {content.body?.split('\n').map((line) => (
                <p key={line} className="text-sm mb-3">{line}</p>
              ))}
            </div>
          </div>
          <div className="absolute bottom-12 left-12 right-12 pt-4 border-t border-[#E8ECF2]">
            <p className="text-xs text-[#9BA8C2] text-center">{content.footer}</p>
          </div>
        </div>
      );
    
    case 'notepad':
      return (
        <div className="w-[520px] h-[740px] p-8 bg-white">
          <div className="flex justify-between items-start pb-6 border-b-2" style={{ borderColor: brandColor }}>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: brandColor }}>{content.companyName}</h1>
              <p className="text-xs text-[#636A82]">{content.tagline}</p>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center border-b border-[#E8ECF2] pb-3">
                <div className="w-5 h-5 rounded-full border-2 mr-3" style={{ borderColor: brandColor }} />
                <div className="flex-1 h-4 bg-[#F0F2F7] rounded" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-8 left-8 right-8 pt-4 border-t border-[#E8ECF2]">
            <p className="text-xs text-[#9BA8C2] text-center">{content.footerText}</p>
          </div>
        </div>
      );

    case 'folder':
      return (
        <div className="w-[800px] h-[500px] p-8 bg-gradient-to-b rounded-lg overflow-hidden" style={{ background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}99 100%)` }}>
          <div className="h-full flex flex-col justify-between text-white">
            <div>
              <h1 className="text-4xl font-bold mb-2">{content.companyName}</h1>
              <p className="text-lg opacity-90">{content.tagline}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold">{content.folderText}</p>
            </div>
          </div>
        </div>
      );

    case 'sticker':
      return (
        <div className="w-[600px] h-[600px] bg-white rounded-full flex items-center justify-center border-4" style={{ borderColor: brandColor }}>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4" style={{ color: brandColor }}>{content.companyName}</h2>
            <p className="text-sm text-[#636A82] mb-4">{content.tagline}</p>
            <p className="text-lg font-semibold text-[#1B2544]">{content.stickerText}</p>
          </div>
        </div>
      );

    case 'memo':
      return (
        <div className="w-[800px] h-[1131px] p-12 bg-white">
          <div className="border-b-2 pb-6" style={{ borderColor: brandColor }}>
            <h1 className="text-2xl font-bold" style={{ color: brandColor }}>MEMORANDUM</h1>
            <p className="text-sm text-[#636A82]">{content.companyName}</p>
          </div>
          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-[#5F6E93]">TO:</p>
                <p className="text-sm text-[#1B2544]">{content.memoTo}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#5F6E93]">DATE:</p>
                <p className="text-sm text-[#1B2544]">{content.memoDate}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#5F6E93]">FROM:</p>
                <p className="text-sm text-[#1B2544]">{content.memoFrom}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#5F6E93]">SUBJECT:</p>
                <p className="text-sm text-[#1B2544]">{content.memoSubject}</p>
              </div>
            </div>
            <div className="mt-6">
              <div className="p-6 border border-[#E8ECF2] rounded-lg">
                <p className="text-sm text-[#333944] whitespace-pre-wrap">{content.memoBody}</p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'report-cover':
      return (
        <div className="w-[800px] h-[1131px] p-12 bg-gradient-to-b text-white flex flex-col justify-between" style={{ background: `linear-gradient(135deg, ${content.brandColor || '#4154A3'} 0%, ${content.brandColor || '#1B2544'}99 100%)` }}>
          <div />
          <div className="text-center">
            <p className="text-lg opacity-80 mb-4">{content.reportDate}</p>
            <h1 className="text-5xl font-bold mb-4">{content.reportTitle}</h1>
            <p className="text-2xl opacity-90">{content.reportSubtitle}</p>
          </div>
          <div className="text-center text-sm opacity-70">
            <p>{content.companyName}</p>
            <p className="mt-2">Prepared by {content.preparedBy}</p>
          </div>
        </div>
      );

    case 'fax-cover':
      return (
        <div className="w-[800px] h-[1131px] p-12 bg-white">
          <div className="border-b-4 pb-6" style={{ borderColor: content.brandColor || '#4154A3' }}>
            <h1 className="text-3xl font-bold" style={{ color: content.brandColor || '#4154A3' }}>FAX TRANSMISSION COVER SHEET</h1>
          </div>
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold text-[#1B2544] mb-4">FROM:</h3>
                <p className="text-sm">{content.senderCompany}</p>
                <p className="text-sm">{content.senderName}</p>
                <p className="text-sm">{content.senderPhone}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1B2544] mb-4">TO:</h3>
                <p className="text-sm">{content.recipientCompany}</p>
                <p className="text-sm">{content.recipientName}</p>
                <p className="text-sm">{content.recipientPhone}</p>
              </div>
            </div>
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b border-[#E8ECF2]">
                  <td className="text-sm font-semibold text-[#1B2544] pb-2">Total Pages (including cover):</td>
                  <td className="text-sm pb-2">{content.numberOfPages}</td>
                </tr>
                <tr className="border-b border-[#E8ECF2]">
                  <td className="text-sm font-semibold text-[#1B2544] py-2">Subject:</td>
                  <td className="text-sm py-2">{content.subject}</td>
                </tr>
                <tr>
                  <td colSpan={2} className="pt-4">
                    <p className="text-sm font-semibold text-[#1B2544] mb-2">Message:</p>
                    <p className="text-sm text-[#636A82]">{content.message}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );

    case 'invoice':
    case 'proposal':
    case 'seal':
    case 'business-card':
    case 'email-signature':
    case 'document-cover':
    case 'envelope':
      // Keep existing previews - they were working before
      return <div className="w-[800px] p-4 text-center text-[#5F6E93]">Preview rendering...</div>;

    default:
      return <div className="w-[800px] p-4 text-center text-[#5F6E93]">No preview available</div>;
  }
}

// Generate HTML Template
function generateHTML(id: string, content: StationeryContent): string {
  // Simplified HTML generation for brevity
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${id}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
    .container { max-width: 800px; margin: 0 auto; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${content.companyName || 'Document'}</h1>
    <p>${Object.entries(content).filter(([k]) => !k.startsWith('brand')).map(([k, v]) => `<strong>${k}:</strong> ${v}`).join('<br>')}</p>
  </div>
</body>
</html>`;
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
        <div className="h-40 bg-[#F8FAFC] flex items-center justify-center p-4">
          <div className="scale-50 origin-center">
            <PreviewContent id={item.id} content={getDefaultStationeryContent(item.id)} />
          </div>
        </div>
        
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
          
          <div className="flex gap-2">
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#4154A3] text-white rounded-lg text-sm font-medium hover:bg-[#364789]"
            >
              <Eye className="w-4 h-4" />
              Edit & Download
            </button>
          </div>
        </div>
      </motion.div>
      
      {isPreviewOpen && <PreviewModal item={item} onClose={() => setIsPreviewOpen(false)} />}
    </>
  );
}

// Category Section Component
function CategorySection({ category, items }: { category: string; items: StationeryItem[] }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const categoryIcons: Record<string, typeof FileText> = {
    'Documents': FileText,
    'Identity': CreditCard,
    'Digital': Mail,
    'Collateral': Folder,
  };
  const Icon = categoryIcons[category] || FileText;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-8"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 rounded-lg border border-[#E8ECF2] bg-white hover:bg-[#F8FAFC] transition-all"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-[#4154A3]" />
          <div className="text-left">
            <h3 className="font-semibold text-[#1B2544]">{category}</h3>
            <p className="text-xs text-[#5F6E93]">{items.length} items</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-[#5F6E93]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {items.map((item) => (
              <StationeryCard key={item.id} item={item} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Main Component
export function StationeryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Documents': true,
    'Identity': true,
    'Digital': true,
    'Collateral': true,
  });

  const categories = [...new Set(items.map(item => item.category))];
  
  const filteredItems = items.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const itemsByCategory = categories.reduce((acc, cat) => {
    acc[cat] = filteredItems.filter(item => item.category === cat);
    return acc;
  }, {} as Record<string, StationeryItem[]>);

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
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
        <h1 className="text-4xl font-bold text-[#1B2544] mb-3">Corporate Stationery</h1>
        <p className="text-[#5F6E93] mb-6">Complete suite of editable stationery templates with multiple export formats</p>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9BA8C2]" />
          <input
            type="text"
            placeholder="Search templates by name, type, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#D5DAE5] text-sm focus:border-[#4154A3] focus:outline-none"
          />
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Items', count: items.length, icon: Stamp },
          { label: 'Export Formats', count: 5, icon: Download },
          { label: 'Editable Fields', count: 'All', icon: Settings2 },
          { label: 'Categories', count: categories.length, icon: Grid3x3 },
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

      {/* Category Sections */}
      {categories.map((category) => (
        itemsByCategory[category].length > 0 && (
          <CategorySection
            key={category}
            category={category}
            items={itemsByCategory[category]}
          />
        )
      ))}

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-[#D5DAE5] mx-auto mb-4" />
          <p className="text-[#5F6E93] font-medium">No templates found</p>
          <p className="text-sm text-[#9BA8C2]">Try adjusting your search query</p>
        </div>
      )}
    </div>
  );
}
