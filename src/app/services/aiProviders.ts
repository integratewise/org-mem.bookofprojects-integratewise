// Multi-provider AI service for BrandDocumentations
// Providers: OpenRouter · Anthropic · Google Gemini · GitHub Models
// Models are fetched live from each provider — no hardcoded lists.

export type ProviderId = 'openrouter' | 'anthropic' | 'gemini' | 'github';

export interface ProviderConfig {
  id: ProviderId;
  label: string;
  apiKeyLabel: string;
  apiKeyPlaceholder: string;
  apiKeyHint: string;
  apiKeyUrl: string;
}

export const PROVIDERS: ProviderConfig[] = [
  {
    id: 'openrouter',
    label: 'OpenRouter',
    apiKeyLabel: 'OpenRouter API Key',
    apiKeyPlaceholder: 'sk-or-v1-...',
    apiKeyHint: 'Access hundreds of models via one API',
    apiKeyUrl: 'https://openrouter.ai/keys',
  },
  {
    id: 'anthropic',
    label: 'Anthropic',
    apiKeyLabel: 'Anthropic API Key',
    apiKeyPlaceholder: 'sk-ant-...',
    apiKeyHint: 'Direct access to Claude models',
    apiKeyUrl: 'https://console.anthropic.com/keys',
  },
  {
    id: 'gemini',
    label: 'Google Gemini',
    apiKeyLabel: 'Google AI API Key',
    apiKeyPlaceholder: 'AIza...',
    apiKeyHint: 'Direct access to Gemini models',
    apiKeyUrl: 'https://aistudio.google.com/app/apikey',
  },
  {
    id: 'github',
    label: 'GitHub Models',
    apiKeyLabel: 'GitHub Personal Access Token',
    apiKeyPlaceholder: 'ghp_...',
    apiKeyHint: 'Classic PAT — no special scope needed. Free tier-1 models included.',
    apiKeyUrl: 'https://github.com/settings/tokens',
  },
];

export interface ModelInfo {
  id: string;
  label: string;
}

// ─── Fetch models live from each provider ─────────────────────────────────────

export async function fetchModels(provider: ProviderId, apiKey: string): Promise<ModelInfo[]> {
  if (!apiKey) return [];
  try {
    switch (provider) {
      case 'openrouter': return await fetchOpenRouterModels(apiKey);
      case 'anthropic':  return await fetchAnthropicModels(apiKey);
      case 'gemini':     return await fetchGeminiModels(apiKey);
      case 'github':     return await fetchGitHubModels(apiKey);
    }
  } catch {
    return [];
  }
}

async function fetchOpenRouterModels(apiKey: string): Promise<ModelInfo[]> {
  const res = await fetch('https://openrouter.ai/api/v1/models', {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) return [];
  const data = await res.json() as { data?: Array<{ id: string; name?: string }> };
  return (data.data ?? [])
    .map((m) => ({ id: m.id, label: m.name || m.id }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

async function fetchAnthropicModels(apiKey: string): Promise<ModelInfo[]> {
  const res = await fetch('https://api.anthropic.com/v1/models', {
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
  });
  if (!res.ok) return [];
  const data = await res.json() as { data?: Array<{ id: string; display_name?: string }> };
  return (data.data ?? []).map((m) => ({ id: m.id, label: m.display_name || m.id }));
}

async function fetchGeminiModels(apiKey: string): Promise<ModelInfo[]> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
  );
  if (!res.ok) return [];
  const data = await res.json() as { models?: Array<{ name: string; displayName?: string; supportedGenerationMethods?: string[] }> };
  return (data.models ?? [])
    .filter((m) => m.supportedGenerationMethods?.includes('generateContent'))
    .map((m) => ({
      id: m.name.replace('models/', ''),
      label: m.displayName || m.name.replace('models/', ''),
    }));
}

async function fetchGitHubModels(apiKey: string): Promise<ModelInfo[]> {
  // GitHub Models API — OpenAI-compatible, hosted on Azure inference
  const res = await fetch('https://models.inference.ai.azure.com/models', {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) return [];
  const data = await res.json() as Array<{ id?: string; name?: string; display_name?: string; task?: string }> | { data?: Array<{ id?: string; name?: string }> };
  const items = Array.isArray(data) ? data : (data as { data?: Array<{ id?: string; name?: string }> }).data ?? [];
  return items
    .filter((m) => !('task' in m) || (m as { task?: string }).task === 'chat-completion')
    .map((m) => ({ id: m.id || m.name || '', label: (m as { display_name?: string }).display_name || m.name || m.id || '' }))
    .filter((m) => m.id)
    .sort((a, b) => a.id.localeCompare(b.id));
}

// ─── Message types ─────────────────────────────────────────────────────────────

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  content: string;
  model: string;
  provider: ProviderId;
  usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
}

// ─── Provider call implementations ────────────────────────────────────────────

function extractContent(data: unknown): string {
  if (typeof data === 'string') return data;
  if (Array.isArray(data)) {
    return (data as unknown[])
      .map((p) => {
        if (typeof p === 'string') return p;
        if (p && typeof p === 'object' && 'text' in p) return String((p as { text?: unknown }).text ?? '');
        return '';
      })
      .join('\n')
      .trim();
  }
  return '';
}

async function callOpenRouter(messages: AIMessage[], apiKey: string, model: string): Promise<AIResponse> {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'IntegrateWise Brand AI',
    },
    body: JSON.stringify({ model, messages, temperature: 0.7, max_tokens: 4000 }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: { message?: string } };
    throw new Error(err.error?.message || `OpenRouter error ${res.status}`);
  }
  const data = await res.json() as { choices?: Array<{ message?: { content?: unknown } }>; model?: string; usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number } };
  return { content: extractContent(data.choices?.[0]?.message?.content), model: data.model || model, provider: 'openrouter', usage: data.usage };
}

async function callAnthropic(messages: AIMessage[], apiKey: string, model: string): Promise<AIResponse> {
  const system = messages.find((m) => m.role === 'system')?.content ?? '';
  const convo = messages.filter((m) => m.role !== 'system');
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({ model, system, messages: convo, max_tokens: 4000 }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: { message?: string } };
    throw new Error(err.error?.message || `Anthropic error ${res.status}`);
  }
  const data = await res.json() as { content?: Array<{ text?: string }>; model?: string; usage?: { input_tokens: number; output_tokens: number } };
  return {
    content: data.content?.[0]?.text ?? '',
    model: data.model || model,
    provider: 'anthropic',
    usage: data.usage ? { prompt_tokens: data.usage.input_tokens, completion_tokens: data.usage.output_tokens, total_tokens: data.usage.input_tokens + data.usage.output_tokens } : undefined,
  };
}

async function callGemini(messages: AIMessage[], apiKey: string, model: string): Promise<AIResponse> {
  const systemMsg = messages.find((m) => m.role === 'system')?.content ?? '';
  const convo = messages.filter((m) => m.role !== 'system');
  const contents = convo.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));
  const body: Record<string, unknown> = { contents };
  if (systemMsg) body.systemInstruction = { parts: [{ text: systemMsg }] };
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: { message?: string } };
    throw new Error(err.error?.message || `Gemini error ${res.status}`);
  }
  const data = await res.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>; usageMetadata?: { promptTokenCount: number; candidatesTokenCount: number } };
  return {
    content: data.candidates?.[0]?.content?.parts?.[0]?.text ?? '',
    model,
    provider: 'gemini',
    usage: data.usageMetadata ? { prompt_tokens: data.usageMetadata.promptTokenCount, completion_tokens: data.usageMetadata.candidatesTokenCount, total_tokens: data.usageMetadata.promptTokenCount + data.usageMetadata.candidatesTokenCount } : undefined,
  };
}

async function callGitHub(messages: AIMessage[], apiKey: string, model: string): Promise<AIResponse> {
  // GitHub Models — OpenAI-compatible endpoint on Azure inference
  const res = await fetch('https://models.inference.ai.azure.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, messages, temperature: 0.7, max_tokens: 4000 }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: { message?: string } };
    throw new Error(err.error?.message || `GitHub Models error ${res.status}`);
  }
  const data = await res.json() as { choices?: Array<{ message?: { content?: unknown } }>; model?: string; usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number } };
  return { content: extractContent(data.choices?.[0]?.message?.content), model: data.model || model, provider: 'github', usage: data.usage };
}

// ─── System prompt ─────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are an expert Document Controller and Content Strategist for IntegrateWise.
Company: IntegrateWise LLP · Bengaluru, India
Tagline: "AI Thinks in Context — and Waits for Approval"
Design language: Forest + Paper (warm paper, deep forest green, gold, ink).
Products: Account Success (relationship intelligence) and Business Ops (full company operations).
Be direct, actionable, and brand-aligned. Reference Forest+Paper doctrine when relevant.`;

// ─── Main dispatch ─────────────────────────────────────────────────────────────

export async function sendToProvider(
  userMessage: string,
  provider: ProviderId,
  apiKey: string,
  model: string,
  context?: string
): Promise<AIResponse> {
  if (!apiKey) throw new Error(`No API key set for ${provider}. Open Settings and add your key.`);
  if (!model)  throw new Error(`No model selected for ${provider}. Open Settings and choose a model.`);

  const messages: AIMessage[] = [{ role: 'system', content: SYSTEM_PROMPT }];
  if (context) messages.push({ role: 'system', content: `Current page context:\n${context}` });
  messages.push({ role: 'user', content: userMessage });

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 45000);
  try {
    switch (provider) {
      case 'openrouter': return await callOpenRouter(messages, apiKey, model);
      case 'anthropic':  return await callAnthropic(messages, apiKey, model);
      case 'gemini':     return await callGemini(messages, apiKey, model);
      case 'github':     return await callGitHub(messages, apiKey, model);
      default: throw new Error(`Unknown provider: ${provider}`);
    }
  } finally {
    window.clearTimeout(timeout);
  }
}
