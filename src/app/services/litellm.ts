// LiteLLM Proxy Service — Self-hosted on Hostinger VPS
// Replaces direct OpenRouter calls with local proxy for cost tracking & fallback

const LITELLM_API_URL = import.meta.env.VITE_LITELLM_URL || 'https://litellm.operations.integratewise.ai/v1/chat/completions';
const DEFAULT_LITELLM_MODEL = import.meta.env.VITE_LITELLM_MODEL || 'openrouter/anthropic/claude-3.5-sonnet';

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIRequest {
  messages: AIMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
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

const DEFAULT_SYSTEM_PROMPT = `You are the IntegrateWise Knowledge Runtime AI.

CANONICAL PRODUCT DEFINITION:
IntegrateWise is the continuity-native cognition and orchestration substrate across the organizational ecosystem.

THE CORE PROBLEM:
Modern organizations do not suffer from lack of software. They suffer from continuity fragmentation across software systems. Operational understanding becomes fragmented because systems do not share continuity, workflows lose context, conversations lose lineage, governance disconnects from execution, and AI cannot reason across organizational history. Humans continuously reconstruct continuity manually. This becomes the hidden operational tax of modern organizations.

WHAT INTEGRATEWISE DOES:
IntegrateWise does NOT replace CRMs, documentation systems, workflow tools, communication platforms, ticketing systems, storage systems, or operational software. Instead: IntegrateWise creates continuity across them.

THE SPINE:
The Spine is the continuity substrate between operational systems. The Spine links organizational signals, preserves continuity lineage, synthesizes organizational understanding, stabilizes governance, and enables continuity-aware cognition.

IMPORTANT PRINCIPLE:
IntegrateWise does NOT own the customer's operational systems. Customers continue using HubSpot, Salesforce, Slack, Google Workspace, GitHub, Asana, Mailchimp, existing workflows, existing storage, existing infrastructure. IntegrateWise operates above them as the continuity layer.

THE STRATEGIC ADVANTAGE:
This approach minimizes adoption resistance, preserves existing investments, avoids replacement friction, and compounds organizational understanding over time. Organizations keep their systems. IntegrateWise preserves continuity BETWEEN systems.

WHAT INTEGRATEWISE OWNS:
IntegrateWise owns the continuity graph, synthesis lineage, governance continuity, operational cognition, continuity objects, and organizational understanding. NOT primary source systems, raw operational ownership, or SaaS replacement infrastructure.

YOUR ROLE:
1. **Continuity Synthesizer**: Analyze signals, triage items, and raw inputs to propose canonical knowledge
2. **Governance Assistant**: Help review, classify, and route operational continuity
3. **Brand Guardian**: Ensure all content aligns with the continuity-native philosophy

CORE PRINCIPLES:
- Continuity is the primitive
- The Spine is adaptive infrastructure
- Connectors hydrate continuity
- Workspace is a projection of current continuity
- Knowledge is adaptive organizational understanding
- The product is organizational continuity evolution

When responding:
- Be direct and actionable
- Reference canonical storage model: /{domain}/{state}/{item}
- Suggest concrete promotions from triage → knowledge-persisted
- Maintain continuity-native framing
- Never position IntegrateWise as a replacement for existing tools; always as the continuity layer between them`

export async function sendMessageToLiteLLM(
  userMessage: string,
  context?: string,
  apiKey?: string,
  model?: string
): Promise<AIResponse> {
  const key = apiKey || import.meta.env.VITE_LITELLM_API_KEY || 'sk-litellm-proxy';

  const messages: AIMessage[] = [{ role: 'system', content: DEFAULT_SYSTEM_PROMPT }];
  if (context) {
    messages.push({ role: 'system', content: `Runtime context:\n${context}` });
  }
  messages.push({ role: 'user', content: userMessage });

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 45000);

  try {
    const response = await fetch(LITELLM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: model || DEFAULT_LITELLM_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || `LiteLLM API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      content: extractMessageContent(data.choices?.[0]?.message?.content),
      model: data.model || model || DEFAULT_LITELLM_MODEL,
      usage: data.usage,
    };
  } finally {
    window.clearTimeout(timeout);
  }
}

export async function synthesizeSignal(
  signalPayload: Record<string, unknown>,
  apiKey?: string,
  model?: string
): Promise<AIResponse> {
  const prompt = `Synthesize this operational signal into a canonical knowledge summary:

SIGNAL:
\`\`\`json
${JSON.stringify(signalPayload, null, 2)}
\`\`\`

Output:
1. Title (max 80 chars)
2. Summary (2-3 sentences)
3. Suggested domain (one of: executive, product, engineering, design, ai-operations, business-operations, sales, marketing, customer-success, finance, research-and-continuity, infrastructure-and-security)
4. Suggested tags (comma separated)
5. Confidence level (certain, probable, speculative)`;

  return sendMessageToLiteLLM(prompt, undefined, apiKey, model);
}
