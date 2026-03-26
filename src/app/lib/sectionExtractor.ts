/**
 * Extracts a section from a markdown document by its heading text.
 *
 * Matches headings at any level (##, ###, etc.) whose text contains
 * the given heading string, then returns everything up to the next
 * heading at the same or higher level.
 *
 * Example:
 *   extractSection(overviewMd, '5. Vision, Mission, and Belief System')
 *   → "## 5. Vision, Mission, and Belief System\n\n### Vision\n..."
 */
export function extractSection(markdown: string, headingText: string): string {
  const lines = markdown.split('\n');
  let startIdx = -1;
  let headingLevel = 0;

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^(#{1,6})\s+(.+)/);
    if (match && match[2].includes(headingText)) {
      startIdx = i;
      headingLevel = match[1].length;
      break;
    }
  }

  if (startIdx === -1) return '';

  const sectionLines: string[] = [lines[startIdx]];

  for (let i = startIdx + 1; i < lines.length; i++) {
    const match = lines[i].match(/^(#{1,6})\s+/);
    if (match && match[1].length <= headingLevel) break;
    sectionLines.push(lines[i]);
  }

  return sectionLines.join('\n').trim();
}
