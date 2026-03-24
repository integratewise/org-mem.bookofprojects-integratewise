import { useState } from 'react';
import logoIcon from '../../../imports/Frame_4-1.svg';
import {
  Download,
  Eye,
  FileText,
  Mail,
  CreditCard,
  Stamp,
  Receipt,
  Signature,
  BookOpen,
  Printer,
} from 'lucide-react';

type Tab = 'all' | 'documents' | 'identity' | 'digital';

const tabs: { value: Tab; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'documents', label: 'Documents' },
  { value: 'identity', label: 'Identity' },
  { value: 'digital', label: 'Digital' },
];

export function StationeryPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const items = stationeryItems.filter(
    (item) => activeTab === 'all' || item.tab === activeTab
  );

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: '#1B2544' }}>Corporate Stationery</h2>
        <p className="mt-1" style={{ color: '#7B8AAD' }}>
          Official documents, identity materials, and digital assets for IntegrateWise LLP
        </p>
      </div>

      {/* Company header preview */}
      <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #D5DAE5' }}>
        <div className="px-6 py-3" style={{ borderBottom: '1px solid #E8ECF2' }}>
          <p className="text-sm font-semibold" style={{ color: '#1B2544' }}>Brand Header Component (Reusable)</p>
          <p className="text-xs" style={{ color: '#9BA8C2' }}>Used across letterhead, invoice, proposal, and document covers</p>
        </div>
        <div className="p-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start justify-between gap-8">
              <img src={logoIcon} alt="IntegrateWise" className="h-10 w-auto" />
              <div className="text-right">
                <p className="text-[16px] font-medium text-brand-gray-900">IntegrateWise LLP</p>
                <p className="text-[13px] text-brand-gray-600">The Knowledge Workspace empowered by AI and the Spine</p>
                <p className="text-[12px] font-medium text-brand-gray-700 mt-1">AI Thinks in Context — and Waits for Approval</p>
                <div className="mt-2 space-y-0.5">
                  <p className="text-[11px] text-brand-gray-500">connect@integratewise.co</p>
                  <p className="text-[11px] text-brand-gray-500">integratewise.ai</p>
                  <p className="text-[11px] text-brand-gray-500">Bengaluru, India</p>
                </div>
              </div>
            </div>
            <div className="mt-4 h-[1.5px] rounded-full opacity-60" style={{ background: '#4154A3' }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={
              activeTab === tab.value
                ? { background: '#4154A3', color: 'white' }
                : { color: '#5F6E93', background: 'white', border: '1px solid #D5DAE5' }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stationery grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {items.map((item) => (
          <StationeryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

interface StationeryItem {
  id: string;
  title: string;
  description: string;
  specs: string;
  tab: 'documents' | 'identity' | 'digital';
  icon: typeof FileText;
  preview: React.ReactNode;
  format: string;
  status: 'ready' | 'draft';
}

function StationeryCard({ item }: { item: StationeryItem }) {
  const [expanded, setExpanded] = useState(false);

  const handleDownload = () => {
    // Generate a text-based placeholder download for the stationery item
    const content = `IntegrateWise LLP — ${item.title}\n\nDescription: ${item.description}\nSpecs: ${item.specs}\nFormat: ${item.format}\nStatus: ${item.status}\n\n---\nThis is a placeholder export. Replace with production-ready template files.\n`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IntegrateWise-${item.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #D5DAE5' }}>
      <div className="px-6 py-4 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(65,84,163,0.08)' }}>
            <item.icon className="w-5 h-5" style={{ color: '#4154A3' }} />
          </div>
          <div>
            <h4 className="text-sm font-semibold" style={{ color: '#1B2544' }}>{item.title}</h4>
            <p className="text-xs mt-0.5" style={{ color: '#7B8AAD' }}>{item.description}</p>
            <p className="text-[11px] mt-1 font-mono" style={{ color: '#9BA8C2' }}>{item.specs}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={
            item.status === 'ready'
              ? { background: '#E8F5EE', color: '#10B981' }
              : { background: '#F0F2F7', color: '#7B8AAD' }
          }>
            {item.status === 'ready' ? 'Ready' : 'Draft'}
          </span>
        </div>
      </div>

      {/* Preview */}
      <div className="px-6 pb-4">
        <div
          className="rounded-lg overflow-hidden cursor-pointer"
          style={{ border: '1px solid #D5DAE5', background: '#F0F2F7' }}
          onClick={() => setExpanded(!expanded)}
        >
          <div className={`p-6 transition-all ${expanded ? 'max-h-[500px]' : 'max-h-52'} overflow-hidden`}>
            {item.preview}
          </div>
          {!expanded && (
            <div className="h-8 -mt-8 relative z-10" style={{ background: 'linear-gradient(to top, #F0F2F7, transparent)' }} />
          )}
        </div>
      </div>

      <div className="px-6 py-3 flex items-center justify-between" style={{ borderTop: '1px solid #E8ECF2' }}>
        <p className="text-xs" style={{ color: '#7B8AAD' }}>Format: <span className="font-medium" style={{ color: '#475578' }}>{item.format}</span></p>
        <div className="flex gap-1.5">
          <button className="p-2 rounded-md hover:bg-[#F0F2F7] transition-colors" onClick={() => setExpanded(!expanded)}>
            <Eye className="w-4 h-4" style={{ color: '#7B8AAD' }} />
          </button>
          <button className="p-2 rounded-md hover:bg-[#F0F2F7] transition-colors" onClick={handleDownload}>
            <Download className="w-4 h-4" style={{ color: '#7B8AAD' }} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------- Inline Previews -------- */

function LetterheadPreview() {
  return (
    <div className="bg-white rounded shadow-sm p-6 text-[9px] leading-relaxed max-w-xs mx-auto relative" style={{ aspectRatio: '210/297' }}>
      <div className="flex items-start justify-between mb-2">
        <img src={logoIcon} alt="" className="h-5 w-auto" />
        <div className="text-right text-[7px] text-brand-gray-500">
          <p className="font-medium text-brand-gray-900 text-[8px]">IntegrateWise LLP</p>
          <p>The Knowledge Workspace empowered by AI and the Spine</p>
          <p className="mt-0.5">connect@integratewise.co</p>
        </div>
      </div>
      <div className="h-[1px] mb-4 opacity-60" style={{ background: '#4154A3' }} />
      <div className="space-y-2 text-brand-gray-400">
        <div className="h-1.5 bg-brand-gray-200 rounded w-1/3" />
        <div className="h-1.5 bg-brand-gray-200 rounded w-full" />
        <div className="h-1.5 bg-brand-gray-200 rounded w-full" />
        <div className="h-1.5 bg-brand-gray-200 rounded w-4/5" />
        <div className="h-1.5 bg-brand-gray-200 rounded w-full mt-3" />
        <div className="h-1.5 bg-brand-gray-200 rounded w-full" />
        <div className="h-1.5 bg-brand-gray-200 rounded w-3/5" />
      </div>
      <div className="absolute bottom-4 left-0 right-0 text-center text-[6px] text-brand-gray-400">
        IntegrateWise LLP | Bengaluru | integratewise.ai
      </div>
    </div>
  );
}

function InvoicePreview() {
  return (
    <div className="bg-white rounded shadow-sm p-5 text-[8px] max-w-xs mx-auto">
      <div className="flex items-start justify-between mb-3">
        <img src={logoIcon} alt="" className="h-5 w-auto" />
        <div className="text-right">
          <p className="text-[11px] font-semibold" style={{ color: '#4154A3' }}>INVOICE</p>
          <p className="text-brand-gray-500 mt-0.5">Invoice No: INV-2026-001</p>
          <p className="text-brand-gray-500">Date: Mar 15, 2026</p>
          <p className="text-brand-gray-500">Due: Apr 14, 2026</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-3 text-[7px]">
        <div>
          <p className="font-medium text-brand-gray-900">IntegrateWise LLP</p>
          <p className="text-brand-gray-500">Bengaluru, India</p>
          <p className="text-brand-gray-500">connect@integratewise.co</p>
        </div>
        <div>
          <p className="font-medium text-brand-gray-500">BILL TO</p>
          <p className="text-brand-gray-900">Client Name</p>
          <p className="text-brand-gray-500">Company</p>
        </div>
      </div>
      <table className="w-full text-[7px]">
        <thead>
          <tr style={{ background: '#F1F5FF' }}>
            <th className="text-left px-2 py-1.5 font-medium text-brand-gray-700">Description</th>
            <th className="text-right px-2 py-1.5 font-medium text-brand-gray-700">Qty</th>
            <th className="text-right px-2 py-1.5 font-medium text-brand-gray-700">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-brand-gray-100">
            <td className="px-2 py-1.5 text-brand-gray-700">Platform Setup</td>
            <td className="px-2 py-1.5 text-right text-brand-gray-700">1</td>
            <td className="px-2 py-1.5 text-right text-brand-gray-700">$5,000</td>
          </tr>
          <tr className="border-b border-brand-gray-100">
            <td className="px-2 py-1.5 text-brand-gray-700">Monthly License</td>
            <td className="px-2 py-1.5 text-right text-brand-gray-700">3</td>
            <td className="px-2 py-1.5 text-right text-brand-gray-700">$2,400</td>
          </tr>
        </tbody>
      </table>
      <div className="text-right mt-2 text-[7px]">
        <p className="text-brand-gray-500">Subtotal: $7,400</p>
        <p className="text-brand-gray-500">Tax (18%): $1,332</p>
        <p className="font-semibold mt-1" style={{ color: '#4154A3' }}>Total Due: $8,732</p>
      </div>
    </div>
  );
}

function ProposalPreview() {
  return (
    <div className="bg-white rounded shadow-sm p-5 text-[8px] max-w-xs mx-auto">
      <div className="flex items-start justify-between mb-3">
        <img src={logoIcon} alt="" className="h-5 w-auto" />
        <p className="text-[11px] font-semibold" style={{ color: '#4154A3' }}>PROPOSAL</p>
      </div>
      <div className="space-y-2 text-[7px]">
        <div>
          <p className="font-medium text-brand-gray-700">Project Overview</p>
          <div className="h-1 bg-brand-gray-200 rounded w-full mt-1" />
          <div className="h-1 bg-brand-gray-200 rounded w-4/5 mt-0.5" />
        </div>
        <div>
          <p className="font-medium text-brand-gray-700">Scope of Work</p>
          <div className="h-1 bg-brand-gray-200 rounded w-full mt-1" />
          <div className="h-1 bg-brand-gray-200 rounded w-3/5 mt-0.5" />
        </div>
        <div>
          <p className="font-medium text-brand-gray-700">Timeline</p>
          <div className="h-1 bg-brand-gray-200 rounded w-full mt-1" />
        </div>
        <div>
          <p className="font-medium text-brand-gray-700">Commercial Terms</p>
          <div className="h-1 bg-brand-gray-200 rounded w-full mt-1" />
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-brand-gray-200 text-[7px]">
        <p className="font-medium text-brand-gray-700">Authorized Signatory</p>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div className="border-b border-brand-gray-300 pb-4" />
          <div className="border-b border-brand-gray-300 pb-4" />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-0.5 text-brand-gray-400">
          <p>Name / Signature</p>
          <p>Date</p>
        </div>
      </div>
    </div>
  );
}

function SealPreview() {
  return (
    <div className="flex items-center justify-center gap-8 py-4">
      {(['#4154A3', '#111827', '#9CA3AF'] as const).map((color, i) => (
        <div key={i} className="text-center">
          <div className="relative w-24 h-24 mx-auto">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              {/* Outer circle */}
              <circle cx="60" cy="60" r="48" fill="none" stroke={color} strokeWidth="3" />
              <circle cx="60" cy="60" r="42" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
              {/* Top arc text */}
              <defs>
                <path id={`topArc${i}`} d="M 20,60 a 40,40 0 1,1 80,0" />
                <path id={`bottomArc${i}`} d="M 100,60 a 40,40 0 1,1 -80,0" />
              </defs>
              <text fontSize="7" fill={color} fontWeight="600" letterSpacing="2">
                <textPath href={`#topArc${i}`} startOffset="50%" textAnchor="middle">INTEGRATEWISE LLP</textPath>
              </text>
              <text fontSize="6.5" fill={color} fontWeight="500" letterSpacing="1.5">
                <textPath href={`#bottomArc${i}`} startOffset="50%" textAnchor="middle">BENGALURU INDIA</textPath>
              </text>
              {/* Center icon placeholder */}
              <circle cx="60" cy="56" r="12" fill={color} opacity="0.1" />
              <text x="60" y="74" textAnchor="middle" fontSize="5.5" fill={color} fontWeight="600" letterSpacing="1">OFFICIAL SEAL</text>
            </svg>
            <img src={logoIcon} alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] h-6 w-auto" style={{ filter: i === 1 ? 'grayscale(1) brightness(0)' : i === 2 ? 'grayscale(1) opacity(0.5)' : undefined }} />
          </div>
          <p className="text-[10px] text-brand-gray-500 mt-2">
            {i === 0 ? 'Blue' : i === 1 ? 'Black' : 'Emboss'}
          </p>
        </div>
      ))}
    </div>
  );
}

function BusinessCardPreview() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      {/* Front */}
      <div className="bg-white rounded shadow-sm border border-brand-gray-200 p-4 text-center" style={{ width: 200, height: 120 }}>
        <div className="flex flex-col items-center justify-center h-full gap-1.5">
          <img src={logoIcon} alt="" className="h-6 w-auto" />
          <p className="text-[9px] font-semibold text-brand-gray-900">IntegrateWise</p>
          <p className="text-[6px] text-brand-gray-500 leading-tight">The Knowledge Workspace<br />empowered by AI and the Spine</p>
        </div>
      </div>
      {/* Back */}
      <div className="rounded shadow-sm border border-brand-gray-200 p-4" style={{ width: 200, height: 120, background: '#1F2937' }}>
        <div className="flex flex-col justify-center h-full gap-1">
          <p className="text-[9px] font-semibold text-white">Nirmal Prince J</p>
          <p className="text-[7px] text-brand-gray-400">Founder & CEO</p>
          <div className="mt-1.5 space-y-0.5">
            <p className="text-[6px] text-brand-gray-400">IntegrateWise LLP</p>
            <p className="text-[6px] text-brand-gray-400">connect@integratewise.co</p>
            <p className="text-[6px] text-brand-gray-400">integratewise.ai</p>
            <p className="text-[6px] text-brand-gray-400">Bengaluru</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmailSignaturePreview() {
  return (
    <div className="max-w-sm mx-auto bg-white rounded shadow-sm p-4">
      <div className="flex items-start gap-3">
        <img src={logoIcon} alt="" className="h-8 w-auto mt-0.5" />
        <div className="text-[8px]">
          <p className="font-semibold text-brand-gray-900 text-[10px]">Nirmal Prince J</p>
          <p className="text-brand-gray-500">Founder & CEO</p>
          <div className="mt-1.5">
            <p className="font-medium text-brand-gray-700">IntegrateWise LLP</p>
            <p className="text-brand-gray-500">The Knowledge Workspace empowered by AI and the Spine</p>
          </div>
          <div className="mt-1.5 space-y-0.5">
            <p className="text-brand-gray-500">connect@integratewise.co</p>
            <p className="text-brand-gray-500">integratewise.ai</p>
          </div>
        </div>
      </div>
      <div className="h-[1px] my-2" style={{ background: '#4154A3' }} />
      <p className="text-[7px] text-brand-gray-400 italic">AI Thinks in Context — and Waits for Approval</p>
    </div>
  );
}

function DocumentCoverPreview() {
  return (
    <div className="bg-white rounded shadow-sm mx-auto overflow-hidden" style={{ width: 280, aspectRatio: '1920/1080' }}>
      <div className="flex flex-col items-center justify-center h-full relative">
        {/* Faint watermark */}
        <img src={logoIcon} alt="" className="absolute opacity-[0.04] h-32 w-auto" />
        <div className="relative z-10 text-center">
          <img src={logoIcon} alt="" className="h-8 w-auto mx-auto mb-2" />
          <p className="text-[11px] font-semibold text-brand-gray-900">IntegrateWise</p>
          <p className="text-[7px] text-brand-gray-600 mt-0.5">The Knowledge Workspace empowered by AI and the Spine</p>
          <p className="text-[6px] text-brand-gray-400 mt-2 italic">AI Thinks in Context — and Waits for Approval</p>
        </div>
        <p className="absolute bottom-2 text-[6px] text-brand-gray-400">integratewise.ai</p>
      </div>
    </div>
  );
}

function EnvelopePreview() {
  return (
    <div className="bg-white rounded shadow-sm border border-brand-gray-200 mx-auto p-4" style={{ width: 280, height: 140 }}>
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-start gap-2">
          <img src={logoIcon} alt="" className="h-4 w-auto" />
          <div className="text-[6px] text-brand-gray-500">
            <p className="font-medium text-brand-gray-900 text-[7px]">IntegrateWise LLP</p>
            <p>Bengaluru, India</p>
            <p>connect@integratewise.co</p>
          </div>
        </div>
        <div className="self-end text-right text-[7px]">
          <div className="h-1 bg-brand-gray-200 rounded w-20 mb-0.5" />
          <div className="h-1 bg-brand-gray-200 rounded w-24 mb-0.5" />
          <div className="h-1 bg-brand-gray-200 rounded w-16" />
        </div>
      </div>
    </div>
  );
}

const stationeryItems: StationeryItem[] = [
  {
    id: 'letterhead',
    title: 'Letterhead',
    description: 'For legal letters, formal communication, partnership documents, vendor outreach',
    specs: 'A4 (210 x 297 mm) · Margins: 24/22/22/20 mm',
    tab: 'documents',
    icon: FileText,
    preview: <LetterheadPreview />,
    format: 'PDF / DOCX / Figma',
    status: 'ready',
  },
  {
    id: 'invoice',
    title: 'Invoice',
    description: 'Professional billing for subscriptions, services, implementation, consulting',
    specs: 'A4 Portrait · Table: Description, Qty, Unit Price, Tax, Amount',
    tab: 'documents',
    icon: Receipt,
    preview: <InvoicePreview />,
    format: 'PDF / Figma',
    status: 'ready',
  },
  {
    id: 'proposal',
    title: 'Quotation / Proposal',
    description: 'SOW, timeline, commercial terms, and approval signature block',
    specs: 'A4 Portrait · Based on invoice template',
    tab: 'documents',
    icon: Signature,
    preview: <ProposalPreview />,
    format: 'PDF / DOCX / Figma',
    status: 'ready',
  },
  {
    id: 'seal',
    title: 'Company Seal',
    description: 'For contracts, legal letters, vendor forms, invoice verification, certifications',
    specs: '38-40mm diameter · 3px stroke · Circular',
    tab: 'identity',
    icon: Stamp,
    preview: <SealPreview />,
    format: 'SVG / PDF',
    status: 'ready',
  },
  {
    id: 'business-card',
    title: 'Business Card',
    description: 'Front: logo + descriptor. Back: name, role, contact details on dark navy',
    specs: '85 x 55 mm · Front white / Back dark navy',
    tab: 'identity',
    icon: CreditCard,
    preview: <BusinessCardPreview />,
    format: 'PDF / AI / Figma',
    status: 'ready',
  },
  {
    id: 'email-signature',
    title: 'Email Signature',
    description: 'Three variants: Founder/Leadership, Sales, and Support team signatures',
    specs: '600 x 200 · Logo left, text right, blue divider',
    tab: 'digital',
    icon: Mail,
    preview: <EmailSignaturePreview />,
    format: 'HTML / Figma',
    status: 'ready',
  },
  {
    id: 'document-cover',
    title: 'Document Cover',
    description: 'For reports, proposals, architecture docs. Optional node network watermark',
    specs: '1920 x 1080 · White bg, centered text',
    tab: 'documents',
    icon: BookOpen,
    preview: <DocumentCoverPreview />,
    format: 'PDF / PPTX / Figma',
    status: 'ready',
  },
  {
    id: 'envelope',
    title: 'Envelope',
    description: 'Corporate envelope with logo, return address, and faint node pattern on back flap',
    specs: 'Standard DL / C4 · Minimal corporate style',
    tab: 'identity',
    icon: Printer,
    preview: <EnvelopePreview />,
    format: 'PDF / AI',
    status: 'draft',
  },
];