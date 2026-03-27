// Robust Image Generation Service for BrandDocumentations
// Supports multiple providers: GenSpark, OpenRouter, Pollinations, Stability AI
// Inspired by GenSpark's multi-modal generation capabilities

const GENSPARK_API_URL = 'https://api.genspark.ai/v1/images/generations';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/images/generations';
const POLLINATIONS_API_URL = 'https://image.pollinations.ai/prompt';

export type ImageProvider = 'genspark' | 'openrouter' | 'pollinations' | 'stability';

export interface ImageGenerationRequest {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  provider?: ImageProvider;
  model?: string;
  style?: string;
  numImages?: number;
  seed?: number;
}

export interface ImageGenerationResponse {
  images: string[]; // Base64 or URLs
  provider: ImageProvider;
  model: string;
  prompt: string;
  usage?: {
    credits?: number;
    tokens?: number;
  };
}

export interface ImageProviderConfig {
  name: ImageProvider;
  apiKey: string;
  baseUrl: string;
  models: string[];
  defaultModel: string;
  supportsNegativePrompt: boolean;
  supportsStyle: boolean;
  maxImagesPerRequest: number;
}

// Provider configurations
const PROVIDER_CONFIGS: Record<ImageProvider, Partial<ImageProviderConfig>> = {
  genspark: {
    name: 'genspark',
    baseUrl: GENSPARK_API_URL,
    models: [
      'genspark/spark-image-v1',
      'genspark/spark-image-v2',
      'dall-e-3',
      'midjourney-v6'
    ],
    defaultModel: 'genspark/spark-image-v1',
    supportsNegativePrompt: true,
    supportsStyle: true,
    maxImagesPerRequest: 4,
  },
  openrouter: {
    name: 'openrouter',
    baseUrl: OPENROUTER_API_URL,
    models: [
      'google/gemini-2.5-flash-image',
      'stabilityai/stable-diffusion-xl',
      'black-forest-labs/flux-schnell',
      'black-forest-labs/flux-dev',
      'stabilityai/stable-image-ultra',
      'recraft-ai/recraft-v3'
    ],
    defaultModel: 'google/gemini-2.5-flash-image',
    supportsNegativePrompt: true,
    supportsStyle: false,
    maxImagesPerRequest: 1,
  },
  pollinations: {
    name: 'pollinations',
    baseUrl: POLLINATIONS_API_URL,
    models: ['default'],
    defaultModel: 'default',
    supportsNegativePrompt: false,
    supportsStyle: false,
    maxImagesPerRequest: 1,
  },
  stability: {
    name: 'stability',
    baseUrl: 'https://api.stability.ai/v2beta/stable-image/generate',
    models: [
      'stable-image-ultra',
      'stable-image-core',
      'sd3-medium',
      'sd3-large',
      'sd3-large-turbo'
    ],
    defaultModel: 'stable-image-ultra',
    supportsNegativePrompt: true,
    supportsStyle: true,
    maxImagesPerRequest: 4,
  },
};

// Default dimensions for brand assets
export const BRAND_ASPECT_RATIOS = {
  'social-square': { width: 1024, height: 1024, label: 'Social Media Square (1:1)' },
  'social-story': { width: 1080, height: 1920, label: 'Social Media Story (9:16)' },
  'social-landscape': { width: 1200, height: 630, label: 'Social Media Landscape (1.91:1)' },
  'banner-wide': { width: 1920, height: 600, label: 'Website Banner (3.2:1)' },
  'hero-section': { width: 1920, height: 1080, label: 'Hero Section (16:9)' },
  'blog-featured': { width: 1200, height: 800, label: 'Blog Featured (3:2)' },
  'logo-square': { width: 512, height: 512, label: 'Logo Square (1:1)' },
  'presentation': { width: 1920, height: 1080, label: 'Presentation (16:9)' },
};

// Brand-aware prompt enhancer
function enhancePromptForBrand(
  prompt: string,
  contentType: 'social' | 'blog' | 'hero' | 'logo' | 'banner' = 'blog'
): string {
  const brandContext = {
    social: 'Create a visually striking image for IntegrateWise social media. Modern tech aesthetic, professional, clean design.',
    blog: 'Create a professional header image for IntegrateWise blog post. Tech-focused, knowledge workspace theme, sophisticated.',
    hero: 'Create a stunning hero banner for IntegrateWise website. AI and knowledge workspace visualization, futuristic yet professional.',
    logo: 'Create a clean, modern logo concept for IntegrateWise. AI-powered knowledge workspace theme, minimalist, memorable.',
    banner: 'Create a wide banner for IntegrateWise. Professional tech company aesthetic, workspace and AI elements, cohesive branding.',
  };

  const styleGuidance = `
Style guidelines:
- Color palette: Deep navy (#0C1222), Electric blue (#2EE9FF), Warm coral (#FF6B4A), Soft lavender (#A78BFA)
- Aesthetic: Modern, professional, tech-forward but approachable
- Mood: Intelligent, innovative, trustworthy
- Avoid: Generic stock photo look, overly complex designs, cliche AI imagery
`.trim();

  return `${brandContext[contentType]}

Original prompt: ${prompt}

${styleGuidance}`;
}

// GenSpark image generation
async function generateWithGenSpark(
  request: ImageGenerationRequest,
  apiKey: string
): Promise<ImageGenerationResponse> {
  const config = PROVIDER_CONFIGS.genspark;
  
  const response = await fetch(config.baseUrl!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'X-Client': 'IntegrateWise-BrandDocs',
    },
    body: JSON.stringify({
      model: request.model || config.defaultModel,
      prompt: request.prompt,
      negative_prompt: request.negativePrompt,
      width: request.width || 1024,
      height: request.height || 1024,
      n: Math.min(request.numImages || 1, config.maxImagesPerRequest!),
      seed: request.seed,
      style: request.style,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `GenSpark API error: ${response.status}`);
  }

  const data = await response.json();
  
  return {
    images: data.data?.map((img: { url?: string; b64_json?: string }) => 
      img.url || `data:image/png;base64,${img.b64_json}`
    ) || [],
    provider: 'genspark',
    model: request.model || config.defaultModel!,
    prompt: request.prompt,
    usage: {
      credits: data.usage?.credits,
    },
  };
}

// OpenRouter image generation
async function generateWithOpenRouter(
  request: ImageGenerationRequest,
  apiKey: string
): Promise<ImageGenerationResponse> {
  const config = PROVIDER_CONFIGS.openrouter;
  
  const response = await fetch(config.baseUrl!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'IntegrateWise Brand Documentation',
    },
    body: JSON.stringify({
      model: request.model || config.defaultModel,
      prompt: request.prompt,
      negative_prompt: request.negativePrompt,
      width: request.width || 1024,
      height: request.height || 1024,
      n: 1,
      seed: request.seed,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `OpenRouter API error: ${response.status}`);
  }

  const data = await response.json();
  
  return {
    images: data.data?.map((img: { url?: string; b64_json?: string }) => 
      img.url || `data:image/png;base64,${img.b64_json}`
    ) || [],
    provider: 'openrouter',
    model: request.model || config.defaultModel!,
    prompt: request.prompt,
    usage: {
      tokens: data.usage?.total_tokens,
    },
  };
}

// Pollinations image generation (free, no API key required)
async function generateWithPollinations(
  request: ImageGenerationRequest
): Promise<ImageGenerationResponse> {
  const encodedPrompt = encodeURIComponent(request.prompt);
  const width = request.width || 1024;
  const height = request.height || 1024;
  const seed = request.seed || Math.floor(Math.random() * 1000000);
  
  // Pollinations uses URL-based generation
  const imageUrl = `${POLLINATIONS_API_URL}/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true`;
  
  return {
    images: [imageUrl],
    provider: 'pollinations',
    model: 'default',
    prompt: request.prompt,
  };
}

// Stability AI image generation
async function generateWithStability(
  request: ImageGenerationRequest,
  apiKey: string
): Promise<ImageGenerationResponse> {
  const config = PROVIDER_CONFIGS.stability;
  
  const formData = new FormData();
  formData.append('prompt', request.prompt);
  if (request.negativePrompt) {
    formData.append('negative_prompt', request.negativePrompt);
  }
  formData.append('width', String(request.width || 1024));
  formData.append('height', String(request.height || 1024));
  formData.append('seed', String(request.seed || Math.floor(Math.random() * 1000000)));
  formData.append('output_format', 'png');
  
  const response = await fetch(config.baseUrl!, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json',
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `Stability API error: ${response.status}`);
  }

  const data = await response.json();
  
  return {
    images: data.image ? [`data:image/png;base64,${data.image}`] : [],
    provider: 'stability',
    model: request.model || config.defaultModel!,
    prompt: request.prompt,
  };
}

// Main image generation function with fallback
export async function generateImage(
  request: ImageGenerationRequest & { contentType?: 'social' | 'blog' | 'hero' | 'logo' | 'banner' }
): Promise<ImageGenerationResponse> {
  // Enhance prompt with brand context
  const enhancedPrompt = enhancePromptForBrand(
    request.prompt,
    request.contentType || 'blog'
  );
  
  const enhancedRequest = { ...request, prompt: enhancedPrompt };
  
  // Determine provider priority
  const preferredProvider = request.provider || 'openrouter';
  const providers: ImageProvider[] = [preferredProvider, 'genspark', 'pollinations', 'stability'];
  
  const errors: string[] = [];
  
  // Try each provider in order
  for (const provider of providers) {
    try {
      const apiKey = getApiKeyForProvider(provider);
      
      // Skip if API key not available (except for pollinations which is free)
      if (!apiKey && provider !== 'pollinations') {
        errors.push(`${provider}: No API key available`);
        continue;
      }
      
      switch (provider) {
        case 'genspark':
          return await generateWithGenSpark(enhancedRequest, apiKey!);
        case 'openrouter':
          return await generateWithOpenRouter(enhancedRequest, apiKey!);
        case 'pollinations':
          return await generateWithPollinations(enhancedRequest);
        case 'stability':
          return await generateWithStability(enhancedRequest, apiKey!);
      }
    } catch (error) {
      errors.push(`${provider}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.warn(`Image generation failed with ${provider}:`, error);
      continue;
    }
  }
  
  throw new Error(`All image providers failed:\n${errors.join('\n')}`);
}

// Get API key for provider
function getApiKeyForProvider(provider: ImageProvider): string | undefined {
  switch (provider) {
    case 'genspark':
      return import.meta.env.VITE_GENSPARK_API_KEY;
    case 'openrouter':
      return import.meta.env.VITE_OPENROUTER_API_KEY;
    case 'stability':
      return import.meta.env.VITE_STABILITY_API_KEY;
    case 'pollinations':
      return undefined; // Free, no API key needed
  }
}

// Batch image generation
export async function generateImages(
  requests: ImageGenerationRequest[],
  options?: { concurrent?: boolean }
): Promise<ImageGenerationResponse[]> {
  if (options?.concurrent !== false) {
    // Generate concurrently
    return Promise.all(requests.map(req => generateImage(req)));
  } else {
    // Generate sequentially
    const results: ImageGenerationResponse[] = [];
    for (const request of requests) {
      results.push(await generateImage(request));
    }
    return results;
  }
}

// Utility: Generate social media assets for a campaign
export async function generateCampaignAssets(
  campaignTheme: string,
  variations: number = 3
): Promise<Record<string, ImageGenerationResponse>> {
  const assets: Record<string, ImageGenerationRequest> = {
    'social-square': {
      prompt: `Social media post: ${campaignTheme}`,
      contentType: 'social',
      width: 1024,
      height: 1024,
      numImages: variations,
    },
    'social-story': {
      prompt: `Instagram story: ${campaignTheme}`,
      contentType: 'social',
      width: 1080,
      height: 1920,
      numImages: variations,
    },
    'hero-banner': {
      prompt: `Website hero: ${campaignTheme}`,
      contentType: 'hero',
      width: 1920,
      height: 1080,
      numImages: variations,
    },
  };
  
  const results: Record<string, ImageGenerationResponse> = {};
  
  for (const [key, request] of Object.entries(assets)) {
    try {
      results[key] = await generateImage(request);
    } catch (error) {
      console.error(`Failed to generate ${key}:`, error);
    }
  }
  
  return results;
}

// Export utility functions
export { enhancePromptForBrand, getApiKeyForProvider, PROVIDER_CONFIGS };
