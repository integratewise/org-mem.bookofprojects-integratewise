// OpenRouter AI Service for BrandDocumentations
// Acts as Document Controller and Content Strategist

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

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

// Default system prompt for BrandDocumentations AI
const DEFAULT_SYSTEM_PROMPT = `You are an expert Document Controller and Content Strategist for IntegrateWise Brand Documentation.

YOUR ROLE:
1. **Document Controller**: Review, validate, and suggest improvements to all brand documents
2. **Content Strategist**: Ensure messaging consistency, tone alignment, and strategic positioning

BRAND CONTEXT:
- Company: IntegrateWise LLP
- Tagline: "AI Thinks in Context — and Waits for Approval"
- Descriptor: "Knowledge Workspace Over the Spine and Empowered by AI"
- Core Pillars: The Spine (SSOT), Context-Aware AI, Approval Governance, Workspace Layers
- Tone: Professional, technical but accessible, authoritative yet humble

YOUR CAPABILITIES:
- Review and critique content for brand alignment
- Suggest improvements for clarity and impact
- Generate new content (emails, posts, copy) matching brand voice
- Validate consistency across documents
- Provide strategic content recommendations
- Check for messaging hierarchy: Knowledge Workspace → Spine → AI

When responding:
- Be direct and actionable
- Reference specific brand guidelines when relevant
- Suggest concrete improvements, not just general feedback
- Maintain the "AI Thinks in Context" philosophy in your tone`;

export async function sendMessageToAI(
  userMessage: string,
  context?: string,
  apiKey?: string
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

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'IntegrateWise Brand Documentation AI',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-3.5-sonnet',
      messages,
      temperature: 0.7,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  
  return {
    content: data.choices[0]?.message?.content || '',
    model: data.model,
    usage: data.usage,
  };
}

// Specialized functions for different tasks
export async function reviewContent(content: string, contentType: string, apiKey?: string): Promise<AIResponse> {
  const prompt = `Please review this ${contentType} for brand alignment, clarity, and strategic positioning:

${content}

Provide:
1. Overall assessment (✅ aligned, ⚠️ needs work, ❌ off-brand)
2. Specific issues or improvements needed
3. Suggested revisions
4. Brand consistency score (1-10)`;

  return sendMessageToAI(prompt, undefined, apiKey);
}

export async function generateContent(
  contentType: string,
  purpose: string,
  audience: string,
  tone: string,
  apiKey?: string
): Promise<AIResponse> {
  const prompt = `Generate ${contentType} content:
- Purpose: ${purpose}
- Target audience: ${audience}
- Tone: ${tone}

Create content that aligns with IntegrateWise brand messaging (Knowledge Workspace, Spine, AI governance).`;

  return sendMessageToAI(prompt, undefined, apiKey);
}

export async function strategizeContent(
  goal: string,
  currentAssets: string,
  apiKey?: string
): Promise<AIResponse> {
  const prompt = `As Content Strategist, help me develop a content strategy:

GOAL: ${goal}

CURRENT ASSETS:\n${currentAssets}

Provide:
1. Strategic recommendations
2. Content gaps to fill
3. Priority actions
4. Messaging framework suggestions`;

  return sendMessageToAI(prompt, undefined, apiKey);
}
