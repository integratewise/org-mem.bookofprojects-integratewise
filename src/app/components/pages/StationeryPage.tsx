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
                <p className="text-[13px] text-brand-gray-600">Knowledge Workspace over the Spine and Empowered by AI</p>
                <p className="text-[12px] font-medium text-brand-gray-700 mt-1">AI Thinks in Context — and Waits for Approval</p>
                <div className="mt-2 space-y-0.5">
                  <p className="text-[11px] text-brand-gray-500">connect@integratewise.ai</p>
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
    // Create HTML content for the stationery item based on type
    let htmlContent = '';
    
    if (item.id === 'letterhead') {
      htmlContent = generateLetterheadHTML();
    } else if (item.id === 'invoice') {
      htmlContent = generateInvoiceHTML();
    } else if (item.id === 'proposal') {
      htmlContent = generateProposalHTML();
    } else if (item.id === 'seal') {
      htmlContent = generateSealSVG();
    } else if (item.id === 'business-card') {
      htmlContent = generateBusinessCardHTML();
    } else if (item.id === 'email-signature') {
      htmlContent = generateEmailSignatureHTML();
    } else if (item.id === 'document-cover') {
      htmlContent = generateDocumentCoverHTML();
    } else if (item.id === 'envelope') {
      htmlContent = generateEnvelopeHTML();
    }

    // Determine file extension and MIME type
    let filename = `IntegrateWise-${item.title.replace(/\s+/g, '-')}.html`;
    let mimeType = 'text/html';
    
    if (item.id === 'seal') {
      filename = `IntegrateWise-Seal.svg`;
      mimeType = 'image/svg+xml';
    }

    // Create download
    const blob = new Blob([htmlContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
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
          <button 
            className="flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors text-xs font-medium text-white" 
            style={{ background: '#4154A3' }}
            onClick={handleDownload}
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------- HTML Generation Functions -------- */

function generateLetterheadHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IntegrateWise Letterhead</title>
    <style>
        @page {
            size: A4;
            margin: 24mm 20mm 22mm 22mm;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 40px;
            color: #1B2544;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 20px;
            padding-bottom: 16px;
            border-bottom: 2px solid #4154A3;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #4154A3;
        }
        .company-info {
            text-align: right;
            font-size: 11px;
            color: #636A82;
            line-height: 1.6;
        }
        .company-name {
            font-size: 14px;
            font-weight: 600;
            color: #1B2544;
            margin-bottom: 4px;
        }
        .tagline {
            font-size: 10px;
            color: #808CA9;
            margin-bottom: 8px;
        }
        .content {
            margin-top: 40px;
            line-height: 1.8;
            font-size: 12px;
        }
        .footer {
            position: fixed;
            bottom: 20mm;
            left: 22mm;
            right: 20mm;
            text-align: center;
            font-size: 9px;
            color: #808CA9;
            padding-top: 12px;
            border-top: 1px solid #E5E8F4;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">IntegrateWise</div>
        <div class="company-info">
            <div class="company-name">IntegrateWise LLP</div>
            <div class="tagline">Knowledge Workspace over the Spine and Empowered by AI</div>
            <div>connect@integratewise.ai</div>
            <div>integratewise.ai</div>
            <div>Bengaluru, India</div>
        </div>
    </div>
    
    <div class="content">
        <p><strong>Date:</strong> March 24, 2026</p>
        <p><strong>To:</strong> [Recipient Name]</p>
        <p><strong>Re:</strong> [Subject]</p>
        
        <p>Dear [Recipient],</p>
        
        <p>[Your letter content goes here. This letterhead template includes the IntegrateWise branding and can be used for formal communication, legal letters, partnership documents, and vendor outreach.]</p>
        
        <p>[Additional paragraphs as needed...]</p>
        
        <p>Sincerely,</p>
        <br>
        <p><strong>Nirmal Prince J</strong><br>
        Founder & CEO<br>
        IntegrateWise LLP</p>
    </div>
    
    <div class="footer">
        IntegrateWise LLP · Bengaluru, India · AI Thinks in Context. Actions Wait for Humans.
    </div>
</body>
</html>`;
}

function generateInvoiceHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IntegrateWise Invoice</title>
    <style>
        @page { size: A4; margin: 20mm; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 40px;
            color: #1B2544;
        }
        .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
        }
        .logo { font-size: 28px; font-weight: bold; color: #4154A3; }
        .invoice-details {
            text-align: right;
        }
        .invoice-title {
            font-size: 24px;
            font-weight: bold;
            color: #4154A3;
            margin-bottom: 10px;
        }
        .invoice-meta { font-size: 12px; color: #636A82; line-height: 1.6; }
        .parties {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 30px;
            font-size: 12px;
        }
        .party-label { font-weight: 600; color: #808CA9; margin-bottom: 8px; }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 12px;
        }
        th {
            background: #F1F5FF;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            color: #1B2544;
        }
        td {
            padding: 12px;
            border-bottom: 1px solid #E5E8F4;
        }
        .text-right { text-align: right; }
        .totals {
            text-align: right;
            margin-top: 20px;
            font-size: 12px;
        }
        .totals .total-row {
            display: flex;
            justify-content: flex-end;
            gap: 40px;
            margin: 8px 0;
        }
        .total-label { color: #636A82; }
        .total-amount { font-weight: 600; color: #1B2544; }
        .grand-total {
            font-size: 16px;
            font-weight: bold;
            color: #4154A3;
            margin-top: 12px;
            padding-top: 12px;
            border-top: 2px solid #4154A3;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">IntegrateWise</div>
        <div class="invoice-details">
            <div class="invoice-title">INVOICE</div>
            <div class="invoice-meta">
                <div>Invoice No: <strong>INV-2026-001</strong></div>
                <div>Date: <strong>March 24, 2026</strong></div>
                <div>Due Date: <strong>April 23, 2026</strong></div>
            </div>
        </div>
    </div>
    
    <div class="parties">
        <div>
            <div class="party-label">FROM</div>
            <div><strong>IntegrateWise LLP</strong></div>
            <div>Bengaluru, India</div>
            <div>connect@integratewise.co</div>
            <div>GSTIN: [GST Number]</div>
        </div>
        <div>
            <div class="party-label">BILL TO</div>
            <div><strong>[Client Name]</strong></div>
            <div>[Company Name]</div>
            <div>[Address]</div>
            <div>[City, State, ZIP]</div>
        </div>
    </div>
    
    <table>
        <thead>
            <tr>
                <th>Description</th>
                <th class="text-right">Quantity</th>
                <th class="text-right">Unit Price</th>
                <th class="text-right">Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Platform Setup & Onboarding</td>
                <td class="text-right">1</td>
                <td class="text-right">$5,000.00</td>
                <td class="text-right">$5,000.00</td>
            </tr>
            <tr>
                <td>Monthly License (Growth Plan)</td>
                <td class="text-right">3</td>
                <td class="text-right">$800.00</td>
                <td class="text-right">$2,400.00</td>
            </tr>
            <tr>
                <td>Premium Support Package</td>
                <td class="text-right">1</td>
                <td class="text-right">$500.00</td>
                <td class="text-right">$500.00</td>
            </tr>
        </tbody>
    </table>
    
    <div class="totals">
        <div class="total-row">
            <span class="total-label">Subtotal:</span>
            <span class="total-amount">$7,900.00</span>
        </div>
        <div class="total-row">
            <span class="total-label">Tax (18% GST):</span>
            <span class="total-amount">$1,422.00</span>
        </div>
        <div class="total-row grand-total">
            <span>Total Due:</span>
            <span>$9,322.00</span>
        </div>
    </div>
    
    <div style="margin-top: 40px; padding: 16px; background: #F8F9FB; border-left: 3px solid #4154A3; font-size: 11px; color: #636A82;">
        <strong>Payment Terms:</strong> Payment is due within 30 days. Please reference invoice number in your payment.
    </div>
</body>
</html>`;
}

function generateProposalHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IntegrateWise Proposal</title>
    <style>
        @page { size: A4; margin: 20mm; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 40px;
            color: #1B2544;
            line-height: 1.6;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 16px;
            border-bottom: 2px solid #4154A3;
        }
        .logo { font-size: 28px; font-weight: bold; color: #4154A3; }
        .proposal-title { font-size: 24px; font-weight: bold; color: #4154A3; }
        .section {
            margin: 30px 0;
        }
        .section-title {
            font-size: 16px;
            font-weight: 600;
            color: #4154A3;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid #E5E8F4;
        }
        .section-content {
            font-size: 12px;
            color: #636A82;
        }
        .signature-block {
            margin-top: 50px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
        }
        .signature-line {
            border-bottom: 2px solid #1B2544;
            height: 60px;
        }
        .signature-label {
            font-size: 11px;
            color: #808CA9;
            margin-top: 8px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">IntegrateWise</div>
        <div class="proposal-title">PROPOSAL</div>
    </div>
    
    <div style="margin-bottom: 30px; font-size: 12px;">
        <div><strong>Date:</strong> March 24, 2026</div>
        <div><strong>Prepared For:</strong> [Client Name]</div>
        <div><strong>Valid Until:</strong> April 24, 2026</div>
    </div>
    
    <div class="section">
        <div class="section-title">Project Overview</div>
        <div class="section-content">
            <p>[Describe the project scope and objectives. IntegrateWise will provide a comprehensive Knowledge Workspace solution that unifies your tools, context, and action in one governed system where AI thinks with full operational context and humans remain in control of execution.]</p>
        </div>
    </div>
    
    <div class="section">
        <div class="section-title">Scope of Work</div>
        <div class="section-content">
            <ul>
                <li>Platform setup and configuration</li>
                <li>Integration with existing tools (CRM, support, email, etc.)</li>
                <li>Department schema activation</li>
                <li>User onboarding and training</li>
                <li>Ongoing support and maintenance</li>
            </ul>
        </div>
    </div>
    
    <div class="section">
        <div class="section-title">Timeline</div>
        <div class="section-content">
            <p><strong>Phase 1 (Weeks 1-2):</strong> Platform setup and initial integrations</p>
            <p><strong>Phase 2 (Weeks 3-4):</strong> User onboarding and training</p>
            <p><strong>Phase 3 (Ongoing):</strong> Support and optimization</p>
        </div>
    </div>
    
    <div class="section">
        <div class="section-title">Commercial Terms</div>
        <div class="section-content">
            <table style="width: 100%; border-collapse: collapse;">
                <tr style="background: #F8F9FB;">
                    <td style="padding: 12px; border: 1px solid #E5E8F4;"><strong>Setup Fee</strong></td>
                    <td style="padding: 12px; border: 1px solid #E5E8F4; text-align: right;">$5,000</td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #E5E8F4;"><strong>Monthly Subscription</strong></td>
                    <td style="padding: 12px; border: 1px solid #E5E8F4; text-align: right;">$800/month</td>
                </tr>
            </table>
        </div>
    </div>
    
    <div class="signature-block">
        <div>
            <div class="signature-line"></div>
            <div class="signature-label">Client Signature / Date</div>
        </div>
        <div>
            <div class="signature-line"></div>
            <div class="signature-label">Authorized Signatory / Date</div>
        </div>
    </div>
    
    <div style="margin-top: 40px; text-align: center; font-size: 10px; color: #808CA9; padding-top: 20px; border-top: 1px solid #E5E8F4;">
        IntegrateWise LLP · Bengaluru, India · AI Thinks in Context. Actions Wait for Humans.
    </div>
</body>
</html>`;
}

function generateSealSVG(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <!-- Outer circles -->
    <circle cx="60" cy="60" r="48" fill="none" stroke="#4154A3" stroke-width="3"/>
    <circle cx="60" cy="60" r="42" fill="none" stroke="#4154A3" stroke-width="1" opacity="0.3"/>
    
    <!-- Text paths -->
    <defs>
        <path id="topArc" d="M 20,60 a 40,40 0 1,1 80,0"/>
        <path id="bottomArc" d="M 100,60 a 40,40 0 1,1 -80,0"/>
    </defs>
    
    <!-- Top text -->
    <text font-size="7" fill="#4154A3" font-weight="600" letter-spacing="2">
        <textPath href="#topArc" startOffset="50%" text-anchor="middle">INTEGRATEWISE LLP</textPath>
    </text>
    
    <!-- Bottom text -->
    <text font-size="6.5" fill="#4154A3" font-weight="500" letter-spacing="1.5">
        <textPath href="#bottomArc" startOffset="50%" text-anchor="middle">BENGALURU INDIA</textPath>
    </text>
    
    <!-- Center -->
    <circle cx="60" cy="56" r="12" fill="#4154A3" opacity="0.1"/>
    <text x="60" y="74" text-anchor="middle" font-size="5.5" fill="#4154A3" font-weight="600" letter-spacing="1">OFFICIAL SEAL</text>
</svg>`;
}

function generateBusinessCardHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IntegrateWise Business Card</title>
    <style>
        @page { size: 85mm 55mm; margin: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
        }
        .card {
            width: 85mm;
            height: 55mm;
            box-sizing: border-box;
            page-break-after: always;
        }
        .card-front {
            background: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            text-align: center;
        }
        .card-back {
            background: #1F2937;
            padding: 20px;
            color: white;
        }
        .front-logo {
            font-size: 24px;
            font-weight: bold;
            color: #4154A3;
            margin-bottom: 8px;
        }
        .front-tagline {
            font-size: 9px;
            color: #636A82;
            line-height: 1.4;
        }
        .back-name {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 4px;
        }
        .back-title {
            font-size: 11px;
            color: #9CA3AF;
            margin-bottom: 12px;
        }
        .back-contact {
            font-size: 9px;
            color: #D1D5DB;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <!-- Front -->
    <div class="card card-front">
        <div class="front-logo">IntegrateWise</div>
        <div class="front-tagline">
            Knowledge Workspace over the Spine<br>
            Intelligence and Empowered by AI
        </div>
    </div>
    
    <!-- Back -->
    <div class="card card-back">
        <div class="back-name">Nirmal Prince J</div>
        <div class="back-title">Founder & CEO</div>
        <div class="back-contact">
            IntegrateWise LLP<br>
            connect@integratewise.co<br>
            integratewise.ai<br>
            Bengaluru, India
        </div>
    </div>
</body>
</html>`;
}

function generateEmailSignatureHTML(): string {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>IntegrateWise Email Signature</title>
</head>
<body style="margin: 0; padding: 0;">
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; max-width: 600px;">
        <tr>
            <td style="padding: 16px 0; border-bottom: 2px solid #4154A3;">
                <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="padding-right: 16px; vertical-align: top;">
                            <div style="width: 50px; height: 50px; background: #4154A3; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; font-weight: bold;">IW</div>
                        </td>
                        <td style="vertical-align: top;">
                            <div style="font-size: 16px; font-weight: 600; color: #1B2544; margin-bottom: 2px;">Nirmal Prince J</div>
                            <div style="font-size: 12px; color: #636A82; margin-bottom: 8px;">Founder & CEO</div>
                            <div style="font-size: 13px; font-weight: 500; color: #1B2544; margin-bottom: 4px;">IntegrateWise LLP</div>
                            <div style="font-size: 11px; color: #636A82; margin-bottom: 8px;">Knowledge Workspace over the Spine Intelligence and Empowered by AI</div>
                            <div style="font-size: 11px; color: #636A82;">
                                <a href="mailto:connect@integratewise.co" style="color: #4154A3; text-decoration: none;">connect@integratewise.co</a><br>
                                <a href="https://integratewise.ai" style="color: #4154A3; text-decoration: none;">integratewise.ai</a>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="padding-top: 8px;">
                <div style="font-size: 10px; color: #808CA9; font-style: italic;">AI Thinks in Context. Actions Wait for Humans.</div>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

function generateDocumentCoverHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IntegrateWise Document Cover</title>
    <style>
        @page { size: 1920px 1080px; margin: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            width: 1920px;
            height: 1080px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: white;
            position: relative;
        }
        .watermark {
            position: absolute;
            font-size: 300px;
            font-weight: bold;
            color: #4154A3;
            opacity: 0.03;
            transform: rotate(-15deg);
        }
        .content {
            position: relative;
            z-index: 10;
            text-align: center;
        }
        .logo {
            font-size: 80px;
            font-weight: bold;
            color: #4154A3;
            margin-bottom: 20px;
        }
        .company-name {
            font-size: 36px;
            font-weight: 600;
            color: #1B2544;
            margin-bottom: 12px;
        }
        .tagline {
            font-size: 24px;
            color: #636A82;
            margin-bottom: 40px;
        }
        .motto {
            font-size: 20px;
            color: #808CA9;
            font-style: italic;
        }
        .footer {
            position: absolute;
            bottom: 40px;
            font-size: 18px;
            color: #808CA9;
        }
    </style>
</head>
<body>
    <div class="watermark">IntegrateWise</div>
    <div class="content">
        <div class="logo">IntegrateWise</div>
        <div class="company-name">IntegrateWise LLP</div>
        <div class="tagline">Knowledge Workspace over the Spine Intelligence and Empowered by AI</div>
        <div class="motto">AI Thinks in Context. Actions Wait for Humans.</div>
    </div>
    <div class="footer">integratewise.ai</div>
</body>
</html>`;
}

function generateEnvelopeHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IntegrateWise Envelope</title>
    <style>
        @page { size: 220mm 110mm; margin: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20mm;
            width: 220mm;
            height: 110mm;
            box-sizing: border-box;
            background: white;
            position: relative;
        }
        .return-address {
            display: flex;
            align-items: start;
            gap: 12px;
        }
        .logo {
            font-size: 18px;
            font-weight: bold;
            color: #4154A3;
        }
        .address-text {
            font-size: 11px;
            color: #636A82;
            line-height: 1.6;
        }
        .company-name {
            font-weight: 600;
            color: #1B2544;
        }
        .recipient {
            position: absolute;
            bottom: 30mm;
            right: 40mm;
            text-align: right;
            font-size: 14px;
            line-height: 1.8;
            color: #1B2544;
        }
        .placeholder-line {
            width: 200px;
            height: 2px;
            background: #E5E8F4;
            margin: 4px 0;
        }
    </style>
</head>
<body>
    <div class="return-address">
        <div class="logo">IntegrateWise</div>
        <div class="address-text">
            <div class="company-name">IntegrateWise LLP</div>
            <div>Bengaluru, India</div>
            <div>connect@integratewise.co</div>
        </div>
    </div>
    
    <div class="recipient">
        <div class="placeholder-line"></div>
        <div class="placeholder-line"></div>
        <div class="placeholder-line"></div>
    </div>
</body>
</html>`;
}

/* -------- Inline Previews -------- */

function LetterheadPreview() {
  return (
    <div className="bg-white rounded shadow-sm p-6 text-[9px] leading-relaxed max-w-xs mx-auto relative" style={{ aspectRatio: '210/297' }}>
      <div className="flex items-start justify-between mb-2">
        <img src={logoIcon} alt="" className="h-5 w-auto" />
        <div className="text-right text-[7px] text-brand-gray-500">
          <p className="font-medium text-brand-gray-900 text-[8px]">IntegrateWise LLP</p>
          <p>Knowledge Workspace over the Spine and Empowered by AI</p>
          <p className="mt-0.5">connect@integratewise.ai</p>
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
          <p className="text-[6px] text-brand-gray-500 leading-tight">Knowledge Workspace over the Spine<br />Intelligence and Empowered by AI</p>
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
            <p className="text-brand-gray-500">Knowledge Workspace over the Spine Intelligence and Empowered by AI</p>
          </div>
          <div className="mt-1.5 space-y-0.5">
            <p className="text-brand-gray-500">connect@integratewise.co</p>
            <p className="text-brand-gray-500">integratewise.ai</p>
          </div>
        </div>
      </div>
      <div className="h-[1px] my-2" style={{ background: '#4154A3' }} />
      <p className="text-[7px] text-brand-gray-400 italic">AI Thinks in Context. Actions Wait for Humans.</p>
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
          <p className="text-[7px] text-brand-gray-600 mt-0.5">Knowledge Workspace over the Spine Intelligence and Empowered by AI</p>
          <p className="text-[6px] text-brand-gray-400 mt-2 italic">AI Thinks in Context. Actions Wait for Humans.</p>
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