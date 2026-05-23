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

  // Marketing & Social
  { id: 'sales-deck', title: 'Sales & Marketing Deck', description: 'Professional presentation slides for sales pitches', specs: '16:9 (1920×1080px)', tab: 'digital', icon: BookOpen, format: 'PNG/HTML/PDF', status: 'ready', category: 'Marketing & Social', tags: ['sales', 'presentation', 'marketing', 'deck', 'slides'] },
  { id: 'presentation-bg', title: 'Presentation Background', description: 'Custom branded presentation background', specs: '1920×1080px', tab: 'digital', icon: Palette, format: 'PNG/HTML', status: 'ready', category: 'Marketing & Social', tags: ['background', 'presentation', 'design', 'digital'] },
  { id: 'whatsapp-banner', title: 'WhatsApp Banner', description: 'Branded banner for WhatsApp profile and groups', specs: '2048×1024px', tab: 'digital', icon: Mail, format: 'PNG/HTML', status: 'ready', category: 'Marketing & Social', tags: ['whatsapp', 'social', 'banner', 'messaging'] },
  { id: 'linkedin-banner', title: 'LinkedIn Banner', description: 'Professional LinkedIn profile and post banner', specs: '1200×627px', tab: 'digital', icon: Mail, format: 'PNG/HTML', status: 'ready', category: 'Marketing & Social', tags: ['linkedin', 'social', 'banner', 'professional'] },
  { id: 'poster', title: 'Promotional Poster', description: 'Eye-catching promotional poster design', specs: 'A2 (420×594mm)', tab: 'collateral', icon: BookOpen, format: 'PNG/HTML/PDF', status: 'ready', category: 'Marketing & Social', tags: ['poster', 'promotional', 'marketing', 'announcement'] },
];

function createSafeFilename(title: string) {
  return `IntegrateWise-${title.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'stationery'}`;
}

function generateSealSVG() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
  <defs>
    <linearGradient id="sealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="var(--primary-color)" />
      <stop offset="100%" stop-color="var(--text-color)" />
    </linearGradient>
  </defs>
  <rect width="1200" height="1200" fill="#ffffff" />
  <circle cx="600" cy="600" r="420" fill="none" stroke="url(#sealGradient)" stroke-width="28" />
  <circle cx="600" cy="600" r="350" fill="none" stroke="var(--accent-color)" stroke-width="10" stroke-dasharray="12 18" />
  <text x="600" y="360" text-anchor="middle" font-family="Arial, sans-serif" font-size="44" font-weight="700" letter-spacing="8" fill="var(--primary-color)">INTEGRATEWISE LLP</text>
  <text x="600" y="870" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" font-weight="600" letter-spacing="6" fill="var(--primary-color)">OFFICIAL SEAL</text>
  <circle cx="600" cy="600" r="180" fill="url(#sealGradient)" opacity="0.1" />
  <text x="600" y="560" text-anchor="middle" font-family="Arial, sans-serif" font-size="70" font-weight="700" fill="var(--text-color)">IW</text>
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
        brandColor: 'var(--primary-color)',
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
        brandColor: 'var(--primary-color)',
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
        brandColor: 'var(--primary-color)',
      };
    case 'memo':
      return {
        companyName: BRAND.name,
        memoDate: 'March 25, 2026',
        memoFrom: 'Sender Name',
        memoTo: 'Recipient Name',
        memoSubject: 'Project Update',
        memoBody: 'Please review the following important update regarding our current projects.',
        brandColor: 'var(--primary-color)',
      };
    case 'report-cover':
      return {
        reportTitle: 'Quarterly Report',
        reportSubtitle: 'Q1 2026 Performance Review',
        reportDate: 'March 2026',
        companyName: BRAND.name,
        preparedBy: 'Strategy Office',
        brandColor: 'var(--primary-color)',
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
        brandColor: 'var(--primary-color)',
      };
    case 'seal':
      return {
        companyName: BRAND.legalName.toUpperCase(),
        label: 'OFFICIAL SEAL',
        initials: 'IW',
        taglineTop: TAGLINES.split.top,
        taglineBottom: TAGLINES.split.bottom,
        brandColor: 'var(--primary-color)',
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
        brandColor: 'var(--primary-color)',
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
        brandColor: 'var(--primary-color)',
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
        brandColor: 'var(--primary-color)',
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
        brandColor: 'var(--primary-color)',
      };
    case 'notepad':
      return {
        companyName: BRAND.name,
        tagline: TAGLINES.descriptor,
        footerText: TAGLINES.primary,
        brandColor: 'var(--primary-color)',
      };
    case 'folder':
      return {
        companyName: BRAND.name,
        tagline: TAGLINES.descriptorExtended,
        folderText: 'Project Folder',
        brandColor: 'var(--primary-color)',
      };
    case 'sticker':
      return {
        companyName: BRAND.name,
        tagline: TAGLINES.descriptor,
        stickerText: 'Made with IntegrateWise',
        brandColor: 'var(--primary-color)',
      };
    case 'sales-deck':
      return {
        slideTitle: 'Sales Presentation',
        slideSubtitle: 'Context-Aware AI Solutions',
        companyName: BRAND.name,
        tagline: TAGLINES.descriptorExtended,
        mainMessage: 'Unify tools. Govern AI. Scale impact.',
        ctaText: 'Get Started Today',
        brandColor: 'var(--primary-color)',
      };
    case 'presentation-bg':
      return {
        companyName: BRAND.name,
        tagline: TAGLINES.descriptorExtended,
        backgroundText: 'Presentation',
        brandColor: 'var(--primary-color)',
      };
    case 'whatsapp-banner':
      return {
        companyName: BRAND.name,
        tagline: TAGLINES.descriptor,
        bannerMessage: 'Connect with us on WhatsApp',
        ctaText: 'Chat Now',
        brandColor: 'var(--primary-color)',
      };
    case 'linkedin-banner':
      return {
        companyName: BRAND.name,
        tagline: TAGLINES.descriptorExtended,
        bannerHeading: 'Governed Intelligence Platform',
        bannerText: TAGLINES.primary,
        brandColor: 'var(--primary-color)',
      };
    case 'poster':
      return {
        companyName: BRAND.name,
        posterTitle: 'Introducing IntegrateWise',
        posterSubtitle: 'The Governed AI Platform',
        posterMessage: TAGLINES.descriptorExtended,
        posterCTA: 'Learn More',
        brandColor: 'var(--primary-color)',
      };
    default:
      return { brandColor: 'var(--primary-color)' };
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
    case 'sales-deck':
      return [
        ...baseFields,
        { key: 'slideTitle', label: 'Slide Title' },
        { key: 'slideSubtitle', label: 'Slide Subtitle' },
        { key: 'companyName', label: 'Company Name' },
        { key: 'tagline', label: 'Tagline' },
        { key: 'mainMessage', label: 'Main Message', multiline: true },
        { key: 'ctaText', label: 'Call to Action' },
      ];
    case 'presentation-bg':
      return [
        ...baseFields,
        { key: 'companyName', label: 'Company Name' },
        { key: 'tagline', label: 'Tagline' },
        { key: 'backgroundText', label: 'Background Text' },
      ];
    case 'whatsapp-banner':
      return [
        ...baseFields,
        { key: 'companyName', label: 'Company Name' },
        { key: 'tagline', label: 'Tagline' },
        { key: 'bannerMessage', label: 'Banner Message' },
        { key: 'ctaText', label: 'Call to Action' },
      ];
    case 'linkedin-banner':
      return [
        ...baseFields,
        { key: 'companyName', label: 'Company Name' },
        { key: 'tagline', label: 'Tagline' },
        { key: 'bannerHeading', label: 'Banner Heading' },
        { key: 'bannerText', label: 'Banner Text', multiline: true },
      ];
    case 'poster':
      return [
        ...baseFields,
        { key: 'companyName', label: 'Company Name' },
        { key: 'posterTitle', label: 'Poster Title' },
        { key: 'posterSubtitle', label: 'Subtitle' },
        { key: 'posterMessage', label: 'Message', multiline: true },
        { key: 'posterCTA', label: 'Call to Action' },
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
      style={{ background: copied ? 'var(--success-color)' : 'color-mix(in srgb, var(--forest) 8%, transparent)', color: copied ? 'var(--paper)' : 'var(--forest-mid)' }}
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
        className="rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col" style={{ background: 'var(--paper)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-subtle)]">
          <div>
            <h3 className="font-semibold text-[var(--text-color)]">{item.title}</h3>
            <p className="text-xs text-[var(--text-faint)]">{item.specs} • {item.format}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[var(--surface-2)] rounded-lg">
            <X className="w-5 h-5 text-[var(--text-muted)]" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--border-subtle)]">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
              activeTab === 'preview' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-[var(--text-muted)]'
            }`}
          >
            Preview & Edit
          </button>
          <button
            onClick={() => setActiveTab('html')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
              activeTab === 'html' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-[var(--text-muted)]'
            }`}
          >
            HTML Code
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 bg-[var(--surface)]">
          {activeTab === 'preview' ? (
            <div className="flex justify-center">
              <div className="grid lg:grid-cols-[300px_minmax(0,1fr)] gap-6 items-start">
                {/* Edit Panel */}
                <div className="rounded-xl border border-[var(--border-subtle)] p-5 space-y-4 max-h-[70vh] overflow-y-auto" style={{ background: 'var(--paper)' }}>
                  <h4 className="font-semibold text-[var(--text-color)] text-sm">Edit Content</h4>
                  {getStationeryFields(item.id).map((field) => (
                    <div key={field.key}>
                      <label className="text-xs font-medium text-[var(--text-muted)]">{field.label}</label>
                      {field.type === 'color' ? (
                        <div className="mt-2 flex items-center gap-2">
                          <input
                            type="color"
                            value={content[field.key]?.startsWith('var(') ? '#1A3A2A' : (content[field.key] ?? '#1A3A2A')}
                            onChange={(e) => setContent((prev) => ({ ...prev, [field.key]: e.target.value }))}
                            className="w-12 h-10 rounded-lg border border-[var(--border-base)] cursor-pointer"
                          />
                          <input
                            type="text"
                            value={content[field.key]?.startsWith('var(') ? '#1A3A2A' : (content[field.key] ?? '#1A3A2A')}
                            onChange={(e) => setContent((prev) => ({ ...prev, [field.key]: e.target.value }))}
                            className="flex-1 rounded-lg border border-[var(--border-base)] px-2 py-2 text-xs font-mono"
                          />
                        </div>
                      ) : field.multiline ? (
                        <textarea
                          value={content[field.key] ?? ''}
                          onChange={(e) => setContent((prev) => ({ ...prev, [field.key]: e.target.value }))}
                          className="mt-1 w-full rounded-lg border border-[var(--border-base)] px-3 py-2 text-sm min-h-20"
                        />
                      ) : (
                        <input
                          value={content[field.key] ?? ''}
                          onChange={(e) => setContent((prev) => ({ ...prev, [field.key]: e.target.value }))}
                          className="mt-1 w-full rounded-lg border border-[var(--border-base)] px-3 py-2 text-sm"
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
            <div className="bg-[var(--text-color)] rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-white/90 whitespace-pre-wrap">{generateHTML(item.id, content)}</pre>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t border-[var(--border-subtle)] gap-4" style={{ background: 'var(--paper)' }}>
          <div className="flex gap-2 flex-wrap">
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as any)}
              className="px-3 py-2 rounded-lg border border-[var(--border-base)] text-sm font-medium text-[var(--text-color)]"
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
              className="flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)] text-[var(--paper)] rounded-lg text-sm font-medium disabled:opacity-50"
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
  const brandColor = content.brandColor || 'var(--primary-color)';
  
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
            <div className="h-64 border border-[var(--border-subtle)] rounded-lg p-6">
              {content.body?.split('\n').map((line) => (
                <p key={line} className="text-sm mb-3">{line}</p>
              ))}
            </div>
          </div>
          <div className="absolute bottom-12 left-12 right-12 pt-4 border-t border-[var(--border-subtle)]">
            <p className="text-xs text-[var(--text-faint)] text-center">{content.footer}</p>
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
              <div key={i} className="flex items-center border-b border-[var(--border-subtle)] pb-3">
                <div className="w-5 h-5 rounded-full border-2 mr-3" style={{ borderColor: brandColor }} />
                <div className="flex-1 h-4 bg-[var(--surface-2)] rounded" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-8 left-8 right-8 pt-4 border-t border-[var(--border-subtle)]">
            <p className="text-xs text-[var(--text-faint)] text-center">{content.footerText}</p>
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
            <p className="text-lg font-semibold text-[var(--text-color)]">{content.stickerText}</p>
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
                <p className="text-xs font-semibold text-[var(--text-muted)]">TO:</p>
                <p className="text-sm text-[var(--text-color)]">{content.memoTo}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--text-muted)]">DATE:</p>
                <p className="text-sm text-[var(--text-color)]">{content.memoDate}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--text-muted)]">FROM:</p>
                <p className="text-sm text-[var(--text-color)]">{content.memoFrom}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--text-muted)]">SUBJECT:</p>
                <p className="text-sm text-[var(--text-color)]">{content.memoSubject}</p>
              </div>
            </div>
            <div className="mt-6">
              <div className="p-6 border border-[var(--border-subtle)] rounded-lg">
                <p className="text-sm text-[#333944] whitespace-pre-wrap">{content.memoBody}</p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'report-cover':
      return (
        <div className="w-[800px] h-[1131px] p-12 bg-gradient-to-b text-white flex flex-col justify-between" style={{ background: `linear-gradient(135deg, ${content.brandColor || 'var(--primary-color)'} 0%, ${content.brandColor || 'var(--text-color)'}99 100%)` }}>
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
          <div className="border-b-4 pb-6" style={{ borderColor: content.brandColor || 'var(--primary-color)' }}>
            <h1 className="text-3xl font-bold" style={{ color: content.brandColor || 'var(--primary-color)' }}>FAX TRANSMISSION COVER SHEET</h1>
          </div>
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold text-[var(--text-color)] mb-4">FROM:</h3>
                <p className="text-sm">{content.senderCompany}</p>
                <p className="text-sm">{content.senderName}</p>
                <p className="text-sm">{content.senderPhone}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-color)] mb-4">TO:</h3>
                <p className="text-sm">{content.recipientCompany}</p>
                <p className="text-sm">{content.recipientName}</p>
                <p className="text-sm">{content.recipientPhone}</p>
              </div>
            </div>
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b border-[var(--border-subtle)]">
                  <td className="text-sm font-semibold text-[var(--text-color)] pb-2">Total Pages (including cover):</td>
                  <td className="text-sm pb-2">{content.numberOfPages}</td>
                </tr>
                <tr className="border-b border-[var(--border-subtle)]">
                  <td className="text-sm font-semibold text-[var(--text-color)] py-2">Subject:</td>
                  <td className="text-sm py-2">{content.subject}</td>
                </tr>
                <tr>
                  <td colSpan={2} className="pt-4">
                    <p className="text-sm font-semibold text-[var(--text-color)] mb-2">Message:</p>
                    <p className="text-sm text-[#636A82]">{content.message}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );

    case 'sales-deck':
      return (
        <div className="w-[1280px] h-[720px] p-12 flex flex-col justify-between" style={{ background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}dd 100%)` }}>
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">{content.slideTitle}</h1>
            <p className="text-2xl opacity-90">{content.slideSubtitle}</p>
          </div>
          <div className="text-white">
            <p className="text-xl mb-4 opacity-90">{content.mainMessage}</p>
            <button className="px-8 py-3 rounded-lg font-semibold text-lg" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>{content.ctaText}</button>
          </div>
          <p className="text-white/60 text-sm">{content.companyName}</p>
        </div>
      );

    case 'presentation-bg':
      return (
        <div className="w-[1920px] h-[1080px] p-20 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}88 100%)` }}>
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-6">{content.companyName}</h1>
            <p className="text-2xl mb-12 opacity-90">{content.backgroundText}</p>
            <p className="text-lg opacity-80">{content.tagline}</p>
          </div>
        </div>
      );

    case 'whatsapp-banner':
      return (
        <div className="w-[1024px] h-[512px] p-12 flex items-center justify-between rounded-lg" style={{ background: `linear-gradient(to right, ${brandColor}, ${brandColor}bb)` }}>
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-4">{content.bannerMessage}</h2>
            <p className="text-lg opacity-90">{content.companyName}</p>
            <button className="mt-6 px-6 py-2 rounded-lg font-semibold" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>{content.ctaText}</button>
          </div>
          <div className="text-white text-6xl opacity-20">💬</div>
        </div>
      );

    case 'linkedin-banner':
      return (
        <div className="w-[1200px] h-[627px] p-12 bg-gradient-to-r flex flex-col justify-center" style={{ background: `linear-gradient(to right, ${brandColor}, ${brandColor}99)` }}>
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">{content.bannerHeading}</h1>
            <p className="text-xl opacity-90 max-w-2xl">{content.bannerText}</p>
            <p className="mt-8 text-lg font-semibold">{content.companyName}</p>
          </div>
        </div>
      );

    case 'poster':
      return (
        <div className="w-[600px] h-[846px] p-12 bg-gradient-to-b flex flex-col justify-between text-white" style={{ background: `linear-gradient(135deg, ${brandColor} 0%, ${brandColor}88 100%)` }}>
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">{content.posterTitle}</h1>
            <p className="text-2xl opacity-90">{content.posterSubtitle}</p>
          </div>
          <div className="text-center">
            <p className="text-lg mb-8 opacity-80">{content.posterMessage}</p>
            <button className="px-8 py-3 rounded-lg font-bold text-lg" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>{content.posterCTA}</button>
          </div>
          <p className="text-center text-sm opacity-70">{content.companyName}</p>
        </div>
      );

    case 'invoice':
      return (
        <div className="w-[600px] bg-white p-10" style={{ fontFamily: 'Arial, sans-serif' }}>
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#1A3A2A' }}>{content.companyName}</h1>
              <p className="text-xs mt-1" style={{ color: '#2A4A6A' }}>{content.tagline}</p>
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-bold tracking-wide" style={{ color: '#1A3A2A' }}>INVOICE</h2>
              <p className="text-sm mt-1" style={{ color: '#0C0C0C' }}>{content.invoiceNumber}</p>
            </div>
          </div>
          {/* From / To */}
          <div className="flex gap-12 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#1A3A2A' }}>From</p>
              <p className="text-sm font-semibold" style={{ color: '#0C0C0C' }}>{content.companyName}</p>
              <p className="text-xs mt-1" style={{ color: '#2A4A6A' }}>Issued: {content.invoiceDate}</p>
              <p className="text-xs" style={{ color: '#2A4A6A' }}>Due: {content.dueDate}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#1A3A2A' }}>Bill To</p>
              <p className="text-sm font-semibold" style={{ color: '#0C0C0C' }}>{content.clientName}</p>
              <p className="text-xs mt-1 whitespace-pre-wrap" style={{ color: '#2A4A6A' }}>{content.clientAddress}</p>
            </div>
          </div>
          {/* Line Items Table */}
          <table className="w-full border-collapse mb-4" style={{ fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#1A3A2A', color: '#F4F0E8' }}>
                <th className="text-left p-3 font-semibold">Description</th>
                <th className="text-right p-3 font-semibold">Qty</th>
                <th className="text-right p-3 font-semibold">Rate</th>
                <th className="text-right p-3 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td className="p-3" style={{ color: '#0C0C0C' }}>{content.lineItem}</td>
                <td className="p-3 text-right" style={{ color: '#2A4A6A' }}>1</td>
                <td className="p-3 text-right" style={{ color: '#2A4A6A' }}>{content.total}</td>
                <td className="p-3 text-right font-medium" style={{ color: '#0C0C0C' }}>{content.total}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td className="p-3" style={{ color: '#0C0C0C' }}>Onboarding & Setup Fee</td>
                <td className="p-3 text-right" style={{ color: '#2A4A6A' }}>1</td>
                <td className="p-3 text-right" style={{ color: '#2A4A6A' }}>$200.00</td>
                <td className="p-3 text-right font-medium" style={{ color: '#0C0C0C' }}>$200.00</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td className="p-3" style={{ color: '#0C0C0C' }}>Priority Support (Monthly)</td>
                <td className="p-3 text-right" style={{ color: '#2A4A6A' }}>1</td>
                <td className="p-3 text-right" style={{ color: '#2A4A6A' }}>$49.00</td>
                <td className="p-3 text-right font-medium" style={{ color: '#0C0C0C' }}>$49.00</td>
              </tr>
            </tbody>
            <tfoot>
              <tr style={{ background: '#B8943F22' }}>
                <td colSpan={3} className="p-3 text-right font-bold" style={{ color: '#1A3A2A' }}>Total</td>
                <td className="p-3 text-right font-bold text-lg" style={{ color: '#B8943F' }}>{content.total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      );

    case 'proposal':
      return (
        <div className="w-[800px] h-[1131px] p-12 bg-white relative">
          <div className="flex justify-between items-start pb-4 border-b-2" style={{ borderColor: brandColor }}>
            <h1 className="text-3xl font-bold" style={{ color: brandColor }}>{content.companyName}</h1>
            <p className="text-xs text-[#636A82] mt-1">{content.tagline}</p>
          </div>
          <div className="mt-10 space-y-6 text-[#333944]">
            <h2 className="text-2xl font-semibold">{content.proposalTitle}</h2>
            <p className="text-sm">Prepared for: <strong>{content.preparedFor}</strong></p>
            <p className="text-sm">Date: {content.proposalDate} | Valid: {content.validUntil}</p>
            <div><p className="text-xs font-bold uppercase text-[#636A82] mb-1">Summary</p><p className="text-sm">{content.summary}</p></div>
            <div><p className="text-xs font-bold uppercase text-[#636A82] mb-1">Scope</p><p className="text-sm">{content.scope}</p></div>
            <div><p className="text-xs font-bold uppercase text-[#636A82] mb-1">Timeline</p><p className="text-sm">{content.timeline}</p></div>
          </div>
        </div>
      );

    case 'seal':
      return (
        <div className="w-[400px] h-[400px] bg-white flex items-center justify-center">
          <svg viewBox="0 0 400 400" className="w-[360px] h-[360px]">
            <circle cx="200" cy="200" r="170" fill="none" stroke="#1A3A2A" strokeWidth="10"/>
            <circle cx="200" cy="200" r="140" fill="none" stroke="#B8943F" strokeWidth="4" strokeDasharray="8 12"/>
            <text x="200" y="118" textAnchor="middle" fontFamily="Arial" fontSize="15" fontWeight="700" letterSpacing="4" fill="#1A3A2A">{content.companyName}</text>
            <text x="200" y="290" textAnchor="middle" fontFamily="Arial" fontSize="13" fontWeight="600" letterSpacing="3" fill="#1A3A2A">{content.label}</text>
            <circle cx="200" cy="200" r="70" fill="#1A3A2A" opacity="0.08"/>
            <text x="200" y="187" textAnchor="middle" fontFamily="Arial" fontSize="36" fontWeight="700" fill="#0C0C0C">{content.initials}</text>
            <text x="200" y="214" textAnchor="middle" fontFamily="Arial" fontSize="10" fill="#636A82">{content.taglineTop}</text>
            <text x="200" y="228" textAnchor="middle" fontFamily="Arial" fontSize="10" fill="#636A82">{content.taglineBottom}</text>
          </svg>
        </div>
      );

    case 'business-card':
      return (
        <div className="w-[340px] h-[212px] p-5 flex flex-col justify-between" style={{ background: '#F4F0E8', fontFamily: 'Arial, sans-serif' }}>
          <div>
            <p className="text-xl font-black tracking-widest" style={{ color: '#1A3A2A', fontFamily: '"Bebas Neue", "Arial Black", sans-serif' }}>{content.companyName}</p>
            <p className="text-xs mt-1 font-medium" style={{ color: '#0C0C0C' }}>{content.personName}</p>
            <p className="text-xs" style={{ color: '#2A4A6A' }}>{content.personTitle}</p>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #B8943F' }} />
          <div className="flex justify-between items-end">
            <p className="text-[10px] font-mono" style={{ color: '#0C0C0C' }}>{content.email}</p>
            <p className="text-[10px] font-mono" style={{ color: '#0C0C0C' }}>{content.phone}</p>
            <p className="text-[10px] font-mono" style={{ color: '#0C0C0C' }}>{content.website}</p>
          </div>
        </div>
      );

    case 'email-signature':
      return (
        <div className="w-[600px] bg-white p-4">
          <div style={{ borderLeft: '4px solid #B8943F', paddingLeft: '16px', fontFamily: 'Arial, sans-serif' }}>
            <p className="text-sm font-bold" style={{ color: '#1A3A2A' }}>{content.personName}</p>
            <p className="text-xs" style={{ color: '#2A4A6A' }}>{content.personTitle}</p>
            <p className="text-xs" style={{ color: '#0C0C0C' }}>{content.companyName}</p>
            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '8px 0' }} />
            <p className="text-xs font-mono" style={{ color: '#0C0C0C' }}>
              {content.email}&nbsp;|&nbsp;{content.website}
            </p>
            <p className="text-xs italic mt-2" style={{ color: '#2A4A6A' }}>{content.tagline}</p>
          </div>
        </div>
      );

    case 'document-cover':
      return (
        <div className="w-[400px] h-[565px] flex flex-col overflow-hidden" style={{ fontFamily: 'Arial, sans-serif' }}>
          {/* Top third — forest */}
          <div className="flex-shrink-0 flex flex-col justify-center px-10 py-8" style={{ background: '#1A3A2A', height: '188px' }}>
            <p className="text-2xl font-black tracking-widest" style={{ color: '#F4F0E8', fontFamily: '"Bebas Neue", "Arial Black", sans-serif' }}>{content.companyName}</p>
            <p className="text-xs mt-2" style={{ color: '#B8943F' }}>{content.tagline}</p>
          </div>
          {/* Lower two thirds — white */}
          <div className="flex-1 bg-white px-10 py-8 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#2A4A6A' }}>{content.documentType}</p>
              <h2 className="text-xl font-bold leading-snug mb-3" style={{ color: '#0C0C0C', fontFamily: '"DM Serif Display", Georgia, serif' }}>{content.documentTitle}</h2>
              <p className="text-sm" style={{ color: '#2A4A6A' }}>{content.documentSubtitle}</p>
            </div>
            <p className="text-xs font-mono text-right" style={{ color: '#2A4A6A' }}>{content.documentDate} · {content.version}</p>
          </div>
        </div>
      );

    case 'envelope':
      return (
        <div className="w-[560px] h-[400px] relative flex flex-col justify-between overflow-hidden" style={{ background: '#F4F0E8', fontFamily: 'Arial, sans-serif' }}>
          {/* Return address top-left */}
          <div className="p-8">
            <p className="text-xs font-bold" style={{ color: '#1A3A2A' }}>{content.companyName}</p>
            {content.returnAddress?.split('\n').map((line, i) => (
              <p key={i} className="text-xs" style={{ color: '#0C0C0C' }}>{line}</p>
            ))}
          </div>
          {/* Delivery address centered */}
          <div className="flex-1 flex items-center justify-center text-center px-16">
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: '#0C0C0C' }}>{content.recipientName}</p>
              <p className="text-sm" style={{ color: '#0C0C0C' }}>{content.recipientCompany}</p>
              <p className="text-sm" style={{ color: '#0C0C0C' }}>{content.recipientStreet}</p>
              <p className="text-sm" style={{ color: '#0C0C0C' }}>{content.recipientCity}</p>
              <p className="text-sm" style={{ color: '#0C0C0C' }}>{content.recipientCountry}</p>
            </div>
          </div>
          {/* Forest bar at bottom */}
          <div className="flex items-center justify-center py-3" style={{ background: '#1A3A2A' }}>
            <p className="text-sm font-black tracking-widest" style={{ color: '#B8943F', fontFamily: '"Bebas Neue", "Arial Black", sans-serif' }}>{content.companyName}</p>
          </div>
        </div>
      );

    case 'memo':
      return (
        <div className="w-[600px] p-10" style={{ background: '#F4F0E8', fontFamily: 'Arial, sans-serif' }}>
          <div className="flex justify-between items-start pb-4 mb-6" style={{ borderBottom: '2px solid #1A3A2A' }}>
            <p className="text-lg font-black tracking-widest" style={{ color: '#1A3A2A', fontFamily: '"Bebas Neue", Arial, sans-serif' }}>{content.companyName}</p>
            <p className="text-xs uppercase tracking-widest font-bold" style={{ color: '#B8943F' }}>MEMORANDUM</p>
          </div>
          <table className="w-full mb-6" style={{ fontSize: '13px' }}>
            <tbody>
              {[['Date', content.memoDate], ['From', content.memoFrom], ['To', content.memoTo], ['Subject', content.memoSubject]].map(([label, val]) => (
                <tr key={label} style={{ borderBottom: '1px solid #C4BAA8' }}>
                  <td className="py-2 pr-4 font-bold uppercase text-xs tracking-widest" style={{ color: '#1A3A2A', width: '80px' }}>{label}</td>
                  <td className="py-2 text-sm" style={{ color: '#0C0C0C' }}>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-sm leading-relaxed" style={{ color: '#0C0C0C' }}>{content.memoBody}</div>
        </div>
      );

    case 'report-cover':
      return (
        <div className="w-[400px] h-[565px] flex flex-col" style={{ fontFamily: 'Arial, sans-serif', background: '#F4F0E8' }}>
          <div className="flex-1 flex flex-col justify-end px-10 pb-10 pt-16" style={{ background: '#1A3A2A' }}>
            <p className="text-3xl font-black tracking-widest mb-3" style={{ color: '#F4F0E8', fontFamily: '"Bebas Neue", Arial, sans-serif' }}>{content.reportTitle}</p>
            <p className="text-sm" style={{ color: '#B8943F' }}>{content.reportSubtitle}</p>
          </div>
          <div className="px-10 py-8" style={{ background: '#F4F0E8' }}>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#2A4A6A' }}>{content.companyName}</p>
            <p className="text-xs font-mono" style={{ color: '#0C0C0C' }}>{content.reportDate} · {content.preparedBy}</p>
          </div>
        </div>
      );

    case 'fax-cover':
      return (
        <div className="w-[600px] p-10" style={{ background: '#F4F0E8', fontFamily: 'Arial, sans-serif' }}>
          <div className="flex justify-between items-start pb-4 mb-6" style={{ borderBottom: '2px solid #1A3A2A' }}>
            <p className="text-lg font-black tracking-widest" style={{ color: '#1A3A2A', fontFamily: '"Bebas Neue", Arial, sans-serif' }}>{content.senderCompany}</p>
            <p className="text-xs uppercase tracking-widest font-bold" style={{ color: '#B8943F' }}>FAX COVER SHEET</p>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6">
            {[['To', content.recipientName], ['From', content.senderName], ['Company', content.recipientCompany], ['Phone', content.senderPhone], ['Phone', content.recipientPhone], ['Pages', content.numberOfPages]].map(([label, val], i) => (
              <div key={i}>
                <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: '#1A3A2A' }}>{label}</p>
                <p className="text-sm" style={{ color: '#0C0C0C' }}>{val}</p>
              </div>
            ))}
          </div>
          <div className="p-4 rounded" style={{ background: '#EBE5D8' }}>
            <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: '#1A3A2A' }}>Message</p>
            <p className="text-sm" style={{ color: '#0C0C0C' }}>{content.message}</p>
          </div>
        </div>
      );

    case 'notepad':
      return (
        <div className="w-[400px] h-[565px] flex flex-col" style={{ background: '#F4F0E8', fontFamily: 'Arial, sans-serif' }}>
          <div className="px-8 py-5 flex items-center justify-between" style={{ borderBottom: '2px solid #1A3A2A' }}>
            <p className="text-base font-black tracking-widest" style={{ color: '#1A3A2A', fontFamily: '"Bebas Neue", Arial, sans-serif' }}>{content.companyName}</p>
            <p className="text-xs font-mono" style={{ color: '#B8943F' }}>{content.tagline}</p>
          </div>
          <div className="flex-1 px-8 py-4">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="w-full" style={{ borderBottom: '1px solid #C4BAA8', height: '32px' }} />
            ))}
          </div>
          <div className="px-8 py-3 text-center" style={{ borderTop: '1px solid #C4BAA8' }}>
            <p className="text-xs font-mono" style={{ color: '#2A4A6A' }}>{content.footerText}</p>
          </div>
        </div>
      );

    case 'folder':
      return (
        <div className="w-[560px] h-[420px] relative" style={{ fontFamily: 'Arial, sans-serif' }}>
          <div className="absolute inset-0 rounded-br-xl rounded-bl-xl rounded-tr-xl" style={{ background: '#1A3A2A' }} />
          <div className="absolute top-0 left-0 w-32 h-8 rounded-tl-xl rounded-tr-xl" style={{ background: '#2D5A3D' }} />
          <div className="absolute inset-0 flex flex-col justify-end p-10">
            <p className="text-4xl font-black tracking-widest mb-2" style={{ color: '#F4F0E8', fontFamily: '"Bebas Neue", Arial, sans-serif' }}>{content.companyName}</p>
            <p className="text-sm mb-1" style={{ color: '#B8943F' }}>{content.folderText}</p>
            <p className="text-xs" style={{ color: '#F4F0E8', opacity: 0.6 }}>{content.tagline}</p>
          </div>
        </div>
      );

    case 'sticker':
      return (
        <div className="flex gap-6 flex-wrap p-8" style={{ background: '#F4F0E8', fontFamily: 'Arial, sans-serif' }}>
          {[{ w: 120, h: 120, round: '50%', label: 'Round' }, { w: 160, h: 60, round: '8px', label: 'Banner' }, { w: 100, h: 100, round: '12px', label: 'Square' }].map(({ w, h, round, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center" style={{ width: w, height: h, borderRadius: round, background: '#1A3A2A' }}>
                <div className="text-center">
                  <p className="text-xs font-black tracking-widest" style={{ color: '#F4F0E8', fontFamily: '"Bebas Neue", Arial, sans-serif', fontSize: h > 80 ? '14px' : '10px' }}>IW</p>
                  {h > 80 && <p className="text-xs" style={{ color: '#B8943F', fontSize: '8px' }}>{content.stickerText}</p>}
                </div>
              </div>
              <p className="text-xs font-mono" style={{ color: '#2A4A6A' }}>{label}</p>
            </div>
          ))}
        </div>
      );

    default:
      return <div className="w-[800px] p-4 text-center text-[var(--text-muted)]">No preview available</div>;
  }
}

// Generate HTML Template
function generateHTML(id: string, content: StationeryContent): string {
  const forest = '#1A3A2A';
  const gold = '#B8943F';
  const paper = '#F4F0E8';
  const ink = '#0C0C0C';
  const slateMid = '#2A4A6A';

  const wrap = (title: string, body: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f9f9f9;">
${body}
</body>
</html>`;

  switch (id) {
    case 'letterhead':
      return wrap('Letterhead — ' + (content.companyName || ''), `
<div style="width:794px;min-height:1123px;margin:0 auto;background:#fff;padding:60px 64px;box-sizing:border-box;position:relative;">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:16px;border-bottom:2px solid ${forest};">
    <div>
      <h1 style="margin:0;font-size:28px;font-weight:700;color:${forest};">${content.companyName}</h1>
      <p style="margin:4px 0 0;font-size:12px;color:#636A82;">${content.tagline}</p>
    </div>
    <div style="text-align:right;font-size:11px;color:#636A82;line-height:1.6;">
      ${(content.companyDetails || '').split('\n').map(l => `<span style="display:block;">${l}</span>`).join('')}
    </div>
  </div>
  <div style="margin-top:48px;color:#333944;">
    <p style="font-size:13px;margin-bottom:8px;">Date: ${content.date}</p>
    <p style="font-size:13px;margin-bottom:4px;">To:</p>
    <p style="font-size:13px;margin-bottom:32px;margin-left:16px;">${content.recipient}</p>
    <p style="font-size:13px;margin-bottom:16px;"><strong>Subject:</strong> ${content.subject}</p>
    <div style="border:1px solid #e5e7eb;border-radius:6px;padding:24px;min-height:200px;">
      ${(content.body || '').split('\n').map(l => `<p style="font-size:13px;margin:0 0 12px;">${l}</p>`).join('')}
    </div>
  </div>
  <div style="position:absolute;bottom:48px;left:64px;right:64px;padding-top:16px;border-top:1px solid #e5e7eb;text-align:center;">
    <p style="font-size:11px;color:#9ca3af;margin:0;">${content.footer}</p>
  </div>
</div>`);

    case 'business-card':
      return wrap('Business Card — ' + (content.companyName || ''), `
<div style="width:340px;height:212px;background:${paper};padding:20px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;font-family:Arial,sans-serif;">
  <div>
    <p style="margin:0;font-size:20px;font-weight:900;letter-spacing:0.15em;color:${forest};">${content.companyName}</p>
    <p style="margin:6px 0 0;font-size:12px;font-weight:600;color:${ink};">${content.personName}</p>
    <p style="margin:2px 0 0;font-size:12px;color:${slateMid};">${content.personTitle}</p>
  </div>
  <hr style="border:none;border-top:1px solid ${gold};margin:0;">
  <div style="display:flex;justify-content:space-between;">
    <span style="font-size:10px;font-family:monospace;color:${ink};">${content.email}</span>
    <span style="font-size:10px;font-family:monospace;color:${ink};">${content.phone}</span>
    <span style="font-size:10px;font-family:monospace;color:${ink};">${content.website}</span>
  </div>
</div>`);

    case 'email-signature':
      return wrap('Email Signature — ' + (content.companyName || ''), `
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:600px;">
  <tr>
    <td style="border-left:4px solid ${gold};padding-left:16px;">
      <p style="margin:0 0 2px;font-size:15px;font-weight:700;color:${forest};">${content.personName}</p>
      <p style="margin:0 0 2px;font-size:12px;color:${slateMid};">${content.personTitle}</p>
      <p style="margin:0 0 8px;font-size:12px;color:${ink};">${content.companyName}</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:8px 0;">
      <p style="margin:0 0 6px;font-size:11px;font-family:monospace;color:${ink};">${content.email} | ${content.website}</p>
      <p style="margin:0;font-size:11px;font-style:italic;color:${slateMid};">${content.tagline}</p>
    </td>
  </tr>
</table>`);

    case 'invoice':
      return wrap('Invoice — ' + (content.invoiceNumber || ''), `
<div style="width:700px;margin:0 auto;background:#fff;padding:60px;box-sizing:border-box;font-family:Arial,sans-serif;">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:40px;">
    <div>
      <h1 style="margin:0;font-size:22px;font-weight:700;color:${forest};">${content.companyName}</h1>
      <p style="margin:4px 0 0;font-size:11px;color:${slateMid};">${content.tagline}</p>
    </div>
    <div style="text-align:right;">
      <h2 style="margin:0;font-size:30px;font-weight:700;color:${forest};letter-spacing:2px;">INVOICE</h2>
      <p style="margin:4px 0 0;font-size:13px;color:${ink};">${content.invoiceNumber}</p>
    </div>
  </div>
  <div style="display:flex;gap:60px;margin-bottom:40px;">
    <div>
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${forest};">From</p>
      <p style="margin:0;font-size:13px;font-weight:600;color:${ink};">${content.companyName}</p>
      <p style="margin:4px 0 0;font-size:12px;color:${slateMid};">Issued: ${content.invoiceDate}</p>
      <p style="margin:2px 0 0;font-size:12px;color:${slateMid};">Due: ${content.dueDate}</p>
    </div>
    <div>
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${forest};">Bill To</p>
      <p style="margin:0;font-size:13px;font-weight:600;color:${ink};">${content.clientName}</p>
      <p style="margin:4px 0 0;font-size:12px;color:${slateMid};">${(content.clientAddress || '').replace(/\n/g, '<br>')}</p>
    </div>
  </div>
  <table style="width:100%;border-collapse:collapse;font-size:13px;">
    <thead>
      <tr style="background:${forest};color:${paper};">
        <th style="text-align:left;padding:10px 12px;font-weight:600;">Description</th>
        <th style="text-align:right;padding:10px 12px;font-weight:600;">Qty</th>
        <th style="text-align:right;padding:10px 12px;font-weight:600;">Rate</th>
        <th style="text-align:right;padding:10px 12px;font-weight:600;">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid #e5e7eb;">
        <td style="padding:10px 12px;color:${ink};">${content.lineItem}</td>
        <td style="padding:10px 12px;text-align:right;color:${slateMid};">1</td>
        <td style="padding:10px 12px;text-align:right;color:${slateMid};">${content.total}</td>
        <td style="padding:10px 12px;text-align:right;font-weight:500;color:${ink};">${content.total}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr style="background:${gold}22;">
        <td colspan="3" style="padding:10px 12px;text-align:right;font-weight:700;color:${forest};">Total</td>
        <td style="padding:10px 12px;text-align:right;font-weight:700;font-size:16px;color:${gold};">${content.total}</td>
      </tr>
    </tfoot>
  </table>
</div>`);

    case 'envelope':
      return wrap('Envelope — ' + (content.companyName || ''), `
<div style="width:560px;height:400px;background:${paper};display:flex;flex-direction:column;justify-content:space-between;font-family:Arial,sans-serif;overflow:hidden;">
  <div style="padding:32px;">
    <p style="margin:0;font-size:12px;font-weight:700;color:${forest};">${content.companyName}</p>
    ${(content.returnAddress || '').split('\n').map(l => `<p style="margin:2px 0;font-size:11px;color:${ink};">${l}</p>`).join('')}
  </div>
  <div style="flex:1;display:flex;align-items:center;justify-content:center;text-align:center;padding:0 60px;">
    <div>
      <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:${ink};">${content.recipientName}</p>
      <p style="margin:0 0 2px;font-size:13px;color:${ink};">${content.recipientCompany}</p>
      <p style="margin:0 0 2px;font-size:13px;color:${ink};">${content.recipientStreet}</p>
      <p style="margin:0 0 2px;font-size:13px;color:${ink};">${content.recipientCity}</p>
      <p style="margin:0;font-size:13px;color:${ink};">${content.recipientCountry}</p>
    </div>
  </div>
  <div style="background:${forest};padding:12px;text-align:center;">
    <p style="margin:0;font-size:14px;font-weight:900;letter-spacing:0.15em;color:${gold};">${content.companyName}</p>
  </div>
</div>`);

    case 'document-cover':
      return wrap('Document Cover — ' + (content.documentTitle || ''), `
<div style="width:595px;height:842px;display:flex;flex-direction:column;font-family:Arial,sans-serif;overflow:hidden;">
  <div style="height:280px;background:${forest};display:flex;flex-direction:column;justify-content:center;padding:40px;box-sizing:border-box;">
    <p style="margin:0;font-size:26px;font-weight:900;letter-spacing:0.15em;color:${paper};">${content.companyName}</p>
    <p style="margin:8px 0 0;font-size:12px;color:${gold};">${content.tagline}</p>
  </div>
  <div style="flex:1;background:#fff;padding:40px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;">
    <div>
      <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:${slateMid};">${content.documentType}</p>
      <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;line-height:1.3;color:${ink};">${content.documentTitle}</h1>
      <p style="margin:0;font-size:13px;color:${slateMid};">${content.documentSubtitle}</p>
    </div>
    <p style="margin:0;font-size:11px;font-family:monospace;color:${slateMid};text-align:right;">${content.documentDate} · ${content.version}</p>
  </div>
</div>`);

    case 'proposal':
      return wrap('Proposal — ' + (content.proposalTitle || ''), `
<div style="width:700px;margin:0 auto;background:#fff;padding:60px;box-sizing:border-box;font-family:Arial,sans-serif;">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:16px;border-bottom:2px solid ${forest};margin-bottom:40px;">
    <h1 style="margin:0;font-size:22px;font-weight:700;color:${forest};">${content.companyName}</h1>
    <p style="margin:0;font-size:11px;color:${slateMid};">${content.tagline}</p>
  </div>
  <h2 style="margin:0 0 8px;font-size:20px;font-weight:600;color:${ink};">${content.proposalTitle}</h2>
  <p style="margin:0 0 4px;font-size:13px;color:${slateMid};">Prepared for: <strong style="color:${ink};">${content.preparedFor}</strong></p>
  <p style="margin:0 0 32px;font-size:13px;color:${slateMid};">Date: ${content.proposalDate} &nbsp;|&nbsp; Valid: ${content.validUntil}</p>
  <div style="margin-bottom:24px;"><p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${slateMid};">Executive Summary</p><p style="margin:0;font-size:13px;color:${ink};">${content.summary}</p></div>
  <div style="margin-bottom:24px;"><p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${slateMid};">Scope</p><p style="margin:0;font-size:13px;color:${ink};">${content.scope}</p></div>
  <div style="margin-bottom:40px;"><p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${slateMid};">Timeline</p><p style="margin:0;font-size:13px;color:${ink};">${content.timeline}</p></div>
  <div style="display:flex;gap:40px;padding-top:32px;border-top:1px solid #e5e7eb;">
    <div><p style="margin:0 0 24px;font-size:11px;color:${slateMid};">Prepared by</p><p style="margin:0;font-size:13px;font-weight:600;color:${forest};">${content.preparedBy}</p></div>
    <div><p style="margin:0 0 24px;font-size:11px;color:${slateMid};">Accepted by</p><p style="margin:0;font-size:13px;font-weight:600;color:${forest};">${content.acceptedBy}</p></div>
  </div>
</div>`);

    case 'memo':
      return wrap('Memo — ' + (content.companyName || ''), `
<div style="width:700px;margin:0 auto;background:${paper};padding:60px;box-sizing:border-box;font-family:Arial,sans-serif;">
  <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:16px;border-bottom:2px solid ${forest};margin-bottom:32px;">
    <p style="margin:0;font-size:22px;font-weight:900;letter-spacing:0.15em;color:${forest};">${content.companyName}</p>
    <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${gold};">MEMORANDUM</p>
  </div>
  <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">
    ${[['Date', content.memoDate], ['From', content.memoFrom], ['To', content.memoTo], ['Subject', content.memoSubject]].map(([l, v]) => `<tr style="border-bottom:1px solid ${gold}22;"><td style="padding:10px 16px 10px 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${forest};width:80px;">${l}</td><td style="padding:10px 0;font-size:13px;color:${ink};">${v}</td></tr>`).join('')}
  </table>
  <p style="font-size:13px;line-height:1.7;color:${ink};">${(content.memoBody || '').replace(/\n/g, '<br>')}</p>
</div>`);

    case 'report-cover':
      return wrap('Report — ' + (content.reportTitle || ''), `
<div style="width:595px;height:842px;display:flex;flex-direction:column;font-family:Arial,sans-serif;overflow:hidden;">
  <div style="flex:1;background:${forest};display:flex;flex-direction:column;justify-content:flex-end;padding:40px;box-sizing:border-box;">
    <p style="margin:0 0 12px;font-size:32px;font-weight:900;letter-spacing:0.15em;color:${paper};">${content.reportTitle}</p>
    <p style="margin:0;font-size:14px;color:${gold};">${content.reportSubtitle}</p>
  </div>
  <div style="background:${paper};padding:32px 40px;box-sizing:border-box;">
    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:${slateMid};">${content.companyName}</p>
    <p style="margin:0;font-size:11px;font-family:monospace;color:${ink};">${content.reportDate} &nbsp;·&nbsp; ${content.preparedBy}</p>
  </div>
</div>`);

    case 'fax-cover':
      return wrap('Fax Cover — ' + (content.senderCompany || ''), `
<div style="width:700px;margin:0 auto;background:${paper};padding:60px;box-sizing:border-box;font-family:Arial,sans-serif;">
  <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:16px;border-bottom:2px solid ${forest};margin-bottom:32px;">
    <p style="margin:0;font-size:22px;font-weight:900;letter-spacing:0.15em;color:${forest};">${content.senderCompany}</p>
    <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${gold};">FAX COVER SHEET</p>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:32px;">
    ${[['To', content.recipientName], ['From', content.senderName], ['Company', content.recipientCompany], ['Phone', content.senderPhone], ['Recipient Phone', content.recipientPhone], ['Total Pages', content.numberOfPages]].map(([l, v]) => `<div><p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${forest};">${l}</p><p style="margin:0;font-size:13px;color:${ink};">${v}</p></div>`).join('')}
  </div>
  <div style="background:#EBE5D8;padding:20px;border-radius:6px;">
    <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${forest};">Message</p>
    <p style="margin:0;font-size:13px;color:${ink};">${content.message}</p>
  </div>
</div>`);

    case 'notepad':
      return wrap('Notepad — ' + (content.companyName || ''), `
<div style="width:420px;min-height:595px;background:${paper};padding:0;font-family:Arial,sans-serif;box-sizing:border-box;">
  <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 32px;border-bottom:2px solid ${forest};">
    <p style="margin:0;font-size:16px;font-weight:900;letter-spacing:0.15em;color:${forest};">${content.companyName}</p>
    <p style="margin:0;font-size:10px;font-family:monospace;color:${gold};">${content.tagline}</p>
  </div>
  <div style="padding:8px 32px 16px;">
    ${Array.from({ length: 18 }).map(() => `<div style="height:32px;border-bottom:1px solid ${gold}44;"></div>`).join('')}
  </div>
  <div style="padding:12px 32px;border-top:1px solid #C4BAA8;text-align:center;">
    <p style="margin:0;font-size:10px;font-family:monospace;color:${slateMid};">${content.footerText}</p>
  </div>
</div>`);

    case 'folder':
      return wrap('Folder — ' + (content.companyName || ''), `
<div style="width:560px;height:420px;position:relative;font-family:Arial,sans-serif;">
  <div style="position:absolute;top:0;left:0;width:120px;height:32px;background:#2D5A3D;border-radius:8px 8px 0 0;"></div>
  <div style="position:absolute;top:32px;left:0;right:0;bottom:0;background:${forest};border-radius:0 8px 8px 8px;display:flex;flex-direction:column;justify-content:flex-end;padding:40px;box-sizing:border-box;">
    <p style="margin:0 0 8px;font-size:36px;font-weight:900;letter-spacing:0.15em;color:${paper};">${content.companyName}</p>
    <p style="margin:0 0 4px;font-size:13px;color:${gold};">${content.folderText}</p>
    <p style="margin:0;font-size:11px;color:${paper};opacity:0.6;">${content.tagline}</p>
  </div>
</div>`);

    case 'sticker':
      return wrap('Stickers — ' + (content.companyName || ''), `
<div style="background:${paper};padding:40px;display:flex;gap:32px;align-items:center;font-family:Arial,sans-serif;">
  <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
    <div style="width:120px;height:120px;border-radius:50%;background:${forest};display:flex;flex-direction:column;align-items:center;justify-content:center;">
      <p style="margin:0;font-size:18px;font-weight:900;letter-spacing:0.1em;color:${paper};">IW</p>
      <p style="margin:0;font-size:8px;color:${gold};">${content.stickerText}</p>
    </div>
    <p style="margin:0;font-size:10px;font-family:monospace;color:${slateMid};">Round</p>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
    <div style="width:180px;height:60px;border-radius:8px;background:${forest};display:flex;align-items:center;justify-content:center;">
      <p style="margin:0;font-size:14px;font-weight:900;letter-spacing:0.15em;color:${paper};">INTEGRATEWISE</p>
    </div>
    <p style="margin:0;font-size:10px;font-family:monospace;color:${slateMid};">Banner</p>
  </div>
  <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
    <div style="width:100px;height:100px;border-radius:12px;background:${forest};display:flex;flex-direction:column;align-items:center;justify-content:center;">
      <p style="margin:0;font-size:16px;font-weight:900;letter-spacing:0.1em;color:${paper};">IW</p>
      <p style="margin:0;font-size:8px;color:${gold};">${content.stickerText}</p>
    </div>
    <p style="margin:0;font-size:10px;font-family:monospace;color:${slateMid};">Square</p>
  </div>
</div>`);

    case 'sales-deck':
      return wrap('Sales Deck — ' + (content.companyName || ''), `
<div style="width:1280px;height:720px;background:linear-gradient(135deg,${forest} 0%,#2D5A3D 100%);padding:80px;box-sizing:border-box;font-family:Arial,sans-serif;display:flex;flex-direction:column;justify-content:space-between;">
  <div><h1 style="margin:0 0 16px;font-size:52px;font-weight:900;color:${paper};">${content.slideTitle}</h1><p style="margin:0;font-size:24px;color:${paper};opacity:0.85;">${content.slideSubtitle}</p></div>
  <div><p style="margin:0 0 24px;font-size:20px;color:${paper};opacity:0.9;">${content.mainMessage}</p><div style="display:inline-block;padding:14px 32px;background:${gold};border-radius:8px;font-size:16px;font-weight:700;color:${forest};">${content.ctaText}</div></div>
  <p style="margin:0;font-size:13px;color:${paper};opacity:0.5;">${content.companyName}</p>
</div>`);

    case 'presentation-bg':
      return wrap('Presentation Background — ' + (content.companyName || ''), `
<div style="width:1920px;height:1080px;background:linear-gradient(135deg,${forest} 0%,#2D5A3D 60%,#B8943F 100%);display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;">
  <div style="text-align:center;">
    <p style="margin:0 0 16px;font-size:80px;font-weight:900;letter-spacing:0.15em;color:${paper};">${content.companyName}</p>
    <p style="margin:0 0 32px;font-size:24px;color:${gold};">${content.backgroundText}</p>
    <p style="margin:0;font-size:16px;color:${paper};opacity:0.7;">${content.tagline}</p>
  </div>
</div>`);

    case 'whatsapp-banner':
      return wrap('WhatsApp Banner — ' + (content.companyName || ''), `
<div style="width:2048px;height:1024px;background:linear-gradient(to right,${forest},#2D5A3D);display:flex;align-items:center;justify-content:space-between;padding:80px;box-sizing:border-box;font-family:Arial,sans-serif;">
  <div><h2 style="margin:0 0 16px;font-size:56px;font-weight:900;color:${paper};">${content.bannerMessage}</h2><p style="margin:0 0 32px;font-size:22px;color:${paper};opacity:0.85;">${content.companyName}</p><div style="display:inline-block;padding:16px 40px;background:${gold};border-radius:8px;font-size:18px;font-weight:700;color:${forest};">${content.ctaText}</div></div>
  <div style="font-size:120px;opacity:0.15;">💬</div>
</div>`);

    case 'linkedin-banner':
      return wrap('LinkedIn Banner — ' + (content.companyName || ''), `
<div style="width:1200px;height:627px;background:linear-gradient(to right,${forest},#2D5A3D);display:flex;flex-direction:column;justify-content:center;padding:60px;box-sizing:border-box;font-family:Arial,sans-serif;">
  <h1 style="margin:0 0 16px;font-size:48px;font-weight:900;color:${paper};">${content.bannerHeading}</h1>
  <p style="margin:0 0 32px;font-size:20px;color:${paper};opacity:0.85;max-width:600px;">${content.bannerText}</p>
  <p style="margin:0;font-size:16px;font-weight:700;color:${gold};">${content.companyName}</p>
</div>`);

    case 'poster':
      return wrap('Poster — ' + (content.companyName || ''), `
<div style="width:420px;height:594px;background:linear-gradient(135deg,${forest} 0%,#2D5A3D 100%);display:flex;flex-direction:column;justify-content:space-between;padding:48px;box-sizing:border-box;font-family:Arial,sans-serif;">
  <div style="text-align:center;"><h1 style="margin:0 0 12px;font-size:42px;font-weight:900;color:${paper};">${content.posterTitle}</h1><p style="margin:0;font-size:20px;color:${gold};">${content.posterSubtitle}</p></div>
  <div style="text-align:center;"><p style="margin:0 0 24px;font-size:14px;color:${paper};opacity:0.85;">${content.posterMessage}</p><div style="display:inline-block;padding:14px 32px;background:${gold};border-radius:8px;font-size:16px;font-weight:700;color:${forest};">${content.posterCTA}</div></div>
  <p style="margin:0;text-align:center;font-size:12px;color:${paper};opacity:0.6;">${content.companyName}</p>
</div>`);

    default: {
      const rows = Object.entries(content)
        .filter(([k]) => !k.startsWith('brand') && !k.startsWith('accent') && !k.startsWith('font'))
        .map(([k, v]) => `<tr><td style="padding:8px 12px;font-weight:600;color:${forest};border-bottom:1px solid #eee;white-space:nowrap;">${k}</td><td style="padding:8px 12px;color:${ink};border-bottom:1px solid #eee;">${(v || '').replace(/\n/g, '<br>')}</td></tr>`)
        .join('');
      return wrap((content.companyName || id), `
<div style="width:700px;margin:0 auto;padding:40px;font-family:Arial,sans-serif;">
  <h1 style="font-size:22px;font-weight:700;color:${forest};margin-bottom:24px;">${content.companyName || id}</h1>
  <table style="width:100%;border-collapse:collapse;">${rows}</table>
</div>`);
    }
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
        className="rounded-xl border border-[var(--border-base)] overflow-hidden"
        style={{ background: 'var(--surface-raised)', boxShadow: '0 1px 4px rgba(12,12,12,0.06)' }}
      >
        <div className="h-40 bg-[var(--surface)] flex items-center justify-center p-4">
          <div className="scale-50 origin-center">
            <PreviewContent id={item.id} content={getDefaultStationeryContent(item.id)} />
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'color-mix(in srgb, var(--forest) 10%, transparent)' }}>
                <Icon className="w-5 h-5" style={{ color: 'var(--forest-mid)' }} />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--text-color)]">{item.title}</h3>
                <p className="text-xs text-[var(--text-muted)]">{item.specs}</p>
              </div>
            </div>
            <span className="px-2 py-1 rounded-full text-xs font-medium"
              style={item.status === 'ready'
                ? { background: 'color-mix(in srgb, var(--forest-bright) 12%, transparent)', color: 'var(--forest-bright)' }
                : { background: 'var(--paper-deep)', color: 'var(--slate-mid)' }
              }>
              {item.status}
            </span>
          </div>
          
          <p className="text-sm text-[var(--text-muted)] mb-4">{item.description}</p>
          
          <div className="flex gap-2">
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: 'var(--forest)', color: 'var(--paper)' }}
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
        className="w-full flex items-center justify-between p-4 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--paper-warm)] transition-all"
        style={{ background: 'var(--surface-raised)' }}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-[var(--primary-color)]" />
          <div className="text-left">
            <h3 className="font-semibold text-[var(--text-color)]">{category}</h3>
            <p className="text-xs text-[var(--text-muted)]">{items.length} items</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-[var(--text-muted)]" />
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
          <Stamp className="w-5 h-5 text-[var(--primary-color)]" />
          <span className="text-xs font-semibold text-[var(--primary-color)] uppercase tracking-wider">Brand Assets</span>
        </div>
        <h1 className="text-4xl font-bold text-[var(--text-color)] mb-3">Corporate Stationery</h1>
        <p className="text-[var(--text-muted)] mb-6">Complete suite of editable stationery templates with multiple export formats</p>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-faint)]" />
          <input
            type="text"
            placeholder="Search templates by name, type, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-[var(--border-base)] text-sm focus:border-[var(--primary-color)] focus:outline-none"
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
            className="p-4 rounded-xl border border-[var(--border-subtle)] text-center"
            style={{ background: 'var(--surface-raised)' }}
          >
            <stat.icon className="w-5 h-5 text-[var(--primary-color)] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[var(--text-color)]">{stat.count}</p>
            <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
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
          <Search className="w-12 h-12 text-[var(--border-base)] mx-auto mb-4" />
          <p className="text-[var(--text-muted)] font-medium">No templates found</p>
          <p className="text-sm text-[var(--text-faint)]">Try adjusting your search query</p>
        </div>
      )}
    </div>
  );
}
