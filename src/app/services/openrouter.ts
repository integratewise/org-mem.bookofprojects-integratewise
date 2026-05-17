// OpenRouter AI Service for BrandDocumentations
// Acts as Document Controller and Content Strategist

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_OPENROUTER_MODEL = import.meta.env.VITE_OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet';

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIRequest {
  messages: AIMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

export interface AIResponse {
  content: string;
  model: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

function extractMessageContent(content: unknown): string {
  if (typeof content === 'string') return content;

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === 'string') return part;
        if (part && typeof part === 'object' && 'text' in part) {
          return String((part as { text?: unknown }).text ?? '');
        }
        return '';
      })
      .join('\n')
      .trim();
  }

  return '';
}

// Default system prompt for BrandDocumentations AI
const DEFAULT_SYSTEM_PROMPT = `You are an expert Document Controller and Content Strategist for IntegrateWise Brand Documentation.

YOUR ROLE:
1. **Document Controller**: Review, validate, and suggest improvements to all brand documents
2. **Content Strategist**: Ensure messaging consistency, tone alignment, and strategic positioning

BRAND CONTEXT:
- Company: IntegrateWise LLP
- Tagline: "AI Thinks in Context — and Waits for Approval"
- Descriptor: "Adaptive continuity workspace projected from hydrated organizational reality"
- Core Pillars: Continuity as primitive, Adaptive Spine, Continuity Hydration, Workspace Projection, Adaptive Knowledge, Approval Governance
- Tone: Professional, technical but accessible, authoritative yet humble

YOUR CAPABILITIES:
- Review and critique content for brand alignment
- Suggest improvements for clarity and impact
- Generate new content (emails, posts, copy) matching brand voice
- Validate consistency across documents
- Provide strategic content recommendations
- Check for messaging hierarchy: Continuity → Spine Hydration → Workspace Projection → Governed AI

When responding:
- Be direct and actionable
- Reference specific brand guidelines when relevant
- Suggest concrete improvements, not just general feedback
- Maintain the "AI Thinks in Context" and continuity-first philosophy in your tone`;

export async function sendMessageToAI(
  userMessage: string,
  context?: string,
  apiKey?: string,
  model?: string
): Promise<AIResponse> {
  const key = apiKey || import.meta.env.VITE_OPENROUTER_API_KEY;
  
  if (!key) {
    throw new Error('OpenRouter API key not found. Please set VITE_OPENROUTER_API_KEY in your .env file.');
  }

  const messages: AIMessage[] = [
    { role: 'system', content: DEFAULT_SYSTEM_PROMPT },
  ];

  if (context) {
    messages.push({
      role: 'system',
      content: `Current document context:\n${context}`,
    });
  }

  messages.push({ role: 'user', content: userMessage });

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 45000);

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'IntegrateWise Brand Documentation AI',
    },
    signal: controller.signal,
    body: JSON.stringify({
      model: model || DEFAULT_OPENROUTER_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 4000,
    }),
  }).finally(() => {
    window.clearTimeout(timeout);
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  
  return {
    content: extractMessageContent(data.choices?.[0]?.message?.content),
    model: data.model || model || DEFAULT_OPENROUTER_MODEL,
    usage: data.usage,
  };
}

// Specialized functions for different tasks
export async function reviewContent(content: string, contentType: string, apiKey?: string, model?: string): Promise<AIResponse> {
  const prompt = `Please review this ${contentType} for brand alignment, clarity, and strategic positioning:

${content}

Provide:
1. Overall assessment (✅ aligned, ⚠️ needs work, ❌ off-brand)
2. Specific issues or improvements needed
3. Suggested revisions
4. Brand consistency score (1-10)`;

  return sendMessageToAI(prompt, undefined, apiKey, model);
}

export async function generateContent(
  contentType: string,
  purpose: string,
  audience: string,
  tone: string,
  apiKey?: string,
  model?: string
): Promise<AIResponse> {
  const prompt = `Generate ${contentType} content:
- Purpose: ${purpose}
- Target audience: ${audience}
- Tone: ${tone}

Create content that aligns with IntegrateWise brand messaging (continuity, adaptive Spine, workspace projection, governed AI).`;

  return sendMessageToAI(prompt, undefined, apiKey, model);
}

export async function strategizeContent(
  goal: string,
  currentAssets: string,
  apiKey?: string,
  model?: string
): Promise<AIResponse> {
  const prompt = `As Content Strategist, help me develop a content strategy:

GOAL: ${goal}

CURRENT ASSETS:\n${currentAssets}

Provide:
1. Strategic recommendations
2. Content gaps to fill
3. Priority actions
4. Messaging framework suggestions`;

  return sendMessageToAI(prompt, undefined, apiKey, model);
}
