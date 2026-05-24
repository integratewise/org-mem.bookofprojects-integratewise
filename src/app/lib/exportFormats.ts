/**
 * Export System - Generate documents in multiple formats
 * PDF, DOCX, PPTX, HTML, Markdown, TXT
 */

import { jsPDF } from 'jspdf';

export type ExportFormat = 'pdf' | 'docx' | 'pptx' | 'html' | 'md' | 'txt' | 'json';

export interface ExportOptions {
  format: ExportFormat;
  title: string;
  content: string;
  author?: string;
  date?: Date;
  template?: string;
  includeMetadata?: boolean;
  brandLogo?: boolean;
}

export interface ExportResult {
  blob: Blob;
  filename: string;
  mimeType: string;
}

// Generate filename
function generateFilename(title: string, format: ExportFormat): string {
  const sanitized = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const timestamp = new Date().toISOString().split('T')[0];
  return `${sanitized}_${timestamp}.${format}`;
}

// Export as Markdown
function exportMarkdown(content: string, options: ExportOptions): ExportResult {
  let output = '';
  
  if (options.includeMetadata) {
    output += `---\n`;
    output += `title: ${options.title}\n`;
    output += `author: ${options.author || 'IntegrateWise'}\n`;
    output += `date: ${(options.date || new Date()).toISOString()}\n`;
    output += `---\n\n`;
  }
  
  output += content;
  
  return {
    blob: new Blob([output], { type: 'text/markdown;charset=utf-8' }),
    filename: generateFilename(options.title, 'md'),
    mimeType: 'text/markdown',
  };
}

// Export as Plain Text
function exportText(content: string, options: ExportOptions): ExportResult {
  // Strip markdown formatting
  const plainText = content
    .replace(/#+ /g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/`{3}[\s\S]*?`{3}/g, '[code block]')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n{3,}/g, '\n\n');
  
  let output = '';
  if (options.includeMetadata) {
    output += `${options.title}\n`;
    output += `${'='.repeat(options.title.length)}\n\n`;
    output += `Author: ${options.author || 'IntegrateWise'}\n`;
    output += `Date: ${(options.date || new Date()).toLocaleDateString()}\n\n`;
  }
  
  output += plainText;
  
  return {
    blob: new Blob([output], { type: 'text/plain;charset=utf-8' }),
    filename: generateFilename(options.title, 'txt'),
    mimeType: 'text/plain',
  };
}

// Export as HTML
function exportHTML(content: string, options: ExportOptions): ExportResult {
  const markdownToHtml = (md: string): string => {
    return md
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`{3}(\w+)?\n([\s\S]*?)`{3}/g, '<pre><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.+<\/li>\n)+/g, '<ul>$&</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.+)$/gm, '<p>$1</p>')
      .replace(/<p><\/p>/g, '');
  };
  
  const body = markdownToHtml(content);
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${options.title}</title>
  <style>
    :root {
      --brand-primary: #1A3A2A;
      --brand-navy: #0C0C0C;
      --brand-gray: #5A5550;
      --brand-light: #F4F0E8;
      --brand-accent: #B8943F;
      --brand-paper: #F4F0E8;
    }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      color: var(--brand-navy);
      background: var(--brand-paper);
    }
    h1 { color: var(--brand-primary); border-bottom: 2px solid var(--brand-primary); padding-bottom: 10px; }
    h2 { color: var(--brand-navy); margin-top: 30px; }
    h3 { color: var(--brand-gray); font-weight: 500; }
    code { background: var(--brand-light); padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
    pre { background: var(--brand-light); padding: 16px; border-radius: 8px; overflow-x: auto; }
    pre code { background: none; padding: 0; }
    a { color: var(--brand-primary); }
    ul { padding-left: 20px; }
    li { margin: 5px 0; }
    .metadata { 
      background: var(--brand-light); 
      padding: 20px; 
      border-radius: 8px; 
      margin-bottom: 30px;
      font-size: 0.9em;
    }
    .metadata p { margin: 5px 0; }
  </style>
</head>
<body>
  ${options.includeMetadata ? `
  <div class="metadata">
    <h1>${options.title}</h1>
    <p><strong>Author:</strong> ${options.author || 'IntegrateWise'}</p>
    <p><strong>Date:</strong> ${(options.date || new Date()).toLocaleDateString()}</p>
  </div>
  ` : `<h1>${options.title}</h1>`}
  ${body}
</body>
</html>`;
  
  return {
    blob: new Blob([html], { type: 'text/html;charset=utf-8' }),
    filename: generateFilename(options.title, 'html'),
    mimeType: 'text/html',
  };
}

// Export as PDF
function exportPDF(content: string, options: ExportOptions): ExportResult {
  const doc = new jsPDF();
  
  // Forest + Paper brand colors
  const brandPrimary = [26, 58, 42];   // --forest
  const brandNavy = [12, 12, 12];      // --ink
  const brandMuted = [90, 85, 80];     // --ink-muted
  
  // Title
  doc.setFontSize(24);
  doc.setTextColor(brandPrimary[0], brandPrimary[1], brandPrimary[2]);
  doc.text(options.title, 20, 30);
  
  // Metadata
  doc.setFontSize(11);
  doc.setTextColor(brandMuted[0], brandMuted[1], brandMuted[2]);
  let y = 50;
  
  if (options.includeMetadata) {
    doc.text(`Author: ${options.author || 'IntegrateWise'}`, 20, y);
    y += 10;
    doc.text(`Date: ${(options.date || new Date()).toLocaleDateString()}`, 20, y);
    y += 20;
  }
  
  // Content
  doc.setFontSize(12);
  doc.setTextColor(brandNavy[0], brandNavy[1], brandNavy[2]);
  
  const lines = content.split('\n');
  for (const line of lines) {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    
    if (line.startsWith('# ')) {
      doc.setFontSize(18);
      doc.setTextColor(brandPrimary[0], brandPrimary[1], brandPrimary[2]);
      doc.text(line.replace('# ', ''), 20, y);
      y += 10;
    } else if (line.startsWith('## ')) {
      doc.setFontSize(14);
      doc.setTextColor(brandNavy[0], brandNavy[1], brandNavy[2]);
      doc.text(line.replace('## ', ''), 20, y);
      y += 8;
    } else if (line.startsWith('### ')) {
      doc.setFontSize(12);
      doc.setTextColor(brandMuted[0], brandMuted[1], brandMuted[2]);
      doc.text(line.replace('### ', ''), 20, y);
      y += 6;
    } else if (line.trim()) {
      doc.setFontSize(11);
      doc.setTextColor(brandNavy[0], brandNavy[1], brandNavy[2]);
      const text = line.replace(/\*\*/g, '').replace(/\*/g, '');
      const splitText = doc.splitTextToSize(text, 170);
      doc.text(splitText, 20, y);
      y += splitText.length * 5 + 3;
    } else {
      y += 5;
    }
  }
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text(`IntegrateWise Brand Documentation - Page ${i} of ${pageCount}`, 20, 290);
  }
  
  return {
    blob: doc.output('blob'),
    filename: generateFilename(options.title, 'pdf'),
    mimeType: 'application/pdf',
  };
}

// Export as DOCX (simplified - create HTML that Word can open)
function exportDOCX(content: string, options: ExportOptions): ExportResult {
  const html = exportHTML(content, options);
  const wordHtml = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' 
      xmlns:w='urn:schemas-microsoft-com:office:word' 
      xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>${options.title}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    body { font-family: 'Calibri', sans-serif; }
    h1 { color: #1A3A2A; }
  </style>
</head>
<body>
  ${html.blob}
</body>
</html>`;
  
  return {
    blob: new Blob([wordHtml], { type: 'application/msword' }),
    filename: generateFilename(options.title, 'docx'),
    mimeType: 'application/msword',
  };
}

// Export as JSON (structured data)
function exportJSON(content: string, options: ExportOptions): ExportResult {
  const data = {
    title: options.title,
    author: options.author || 'IntegrateWise',
    date: (options.date || new Date()).toISOString(),
    content,
    metadata: {
      wordCount: content.split(/\s+/).length,
      lineCount: content.split('\n').length,
      format: 'markdown',
    },
  };
  
  return {
    blob: new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }),
    filename: generateFilename(options.title, 'json'),
    mimeType: 'application/json',
  };
}

// Main export function
export function exportDocument(options: ExportOptions): ExportResult {
  switch (options.format) {
    case 'md':
      return exportMarkdown(options.content, options);
    case 'txt':
      return exportText(options.content, options);
    case 'html':
      return exportHTML(options.content, options);
    case 'pdf':
      return exportPDF(options.content, options);
    case 'docx':
      return exportDOCX(options.content, options);
    case 'json':
      return exportJSON(options.content, options);
    default:
      throw new Error(`Unsupported format: ${options.format}`);
  }
}

// Download helper
export function downloadExport(result: ExportResult): void {
  const url = URL.createObjectURL(result.blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = result.filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Batch export
export async function batchExport(
  documents: { title: string; content: string }[],
  format: ExportFormat,
  options: Omit<ExportOptions, 'title' | 'content' | 'format'>
): Promise<Blob> {
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();
  
  for (const doc of documents) {
    const result = exportDocument({
      ...options,
      format,
      title: doc.title,
      content: doc.content,
    });
    
    const arrayBuffer = await result.blob.arrayBuffer();
    zip.file(result.filename, arrayBuffer);
  }
  
  return zip.generateAsync({ type: 'blob' });
}

// Get export preview
export function getExportPreview(content: string, maxLength: number = 500): string {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength) + '\n\n... (truncated)';
}
