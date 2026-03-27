// React Hook for Image Generation
// Provides a GenSpark-like interface for generating brand assets

import { useState, useCallback } from 'react';
import {
  generateImage,
  generateImages,
  generateCampaignAssets,
  ImageGenerationRequest,
  ImageGenerationResponse,
  ImageProvider,
  BRAND_ASPECT_RATIOS,
} from '../services/imageGeneration';

export interface ImageGenerationState {
  isGenerating: boolean;
  progress: number;
  currentProvider?: ImageProvider;
  error?: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  provider: ImageProvider;
  model: string;
  createdAt: Date;
  metadata?: {
    width?: number;
    height?: number;
    seed?: number;
  };
}

export function useImageGeneration() {
  const [state, setState] = useState<ImageGenerationState>({
    isGenerating: false,
    progress: 0,
  });
  
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  
  // Generate a single image
  const generateSingleImage = useCallback(async (
    request: ImageGenerationRequest & { contentType?: 'social' | 'blog' | 'hero' | 'logo' | 'banner' }
  ): Promise<GeneratedImage | null> => {
    setState({ isGenerating: true, progress: 0, currentProvider: request.provider });
    
    try {
      setState(prev => ({ ...prev, progress: 25 }));
      
      const response = await generateImage(request);
      
      setState(prev => ({ ...prev, progress: 75 }));
      
      const image: GeneratedImage = {
        id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        url: response.images[0],
        prompt: request.prompt,
        provider: response.provider,
        model: response.model,
        createdAt: new Date(),
        metadata: {
          width: request.width,
          height: request.height,
          seed: request.seed,
        },
      };
      
      setGeneratedImages(prev => [image, ...prev]);
      setState({ isGenerating: false, progress: 100 });
      
      return image;
    } catch (error) {
      setState({
        isGenerating: false,
        progress: 0,
        error: error instanceof Error ? error.message : 'Generation failed',
      });
      return null;
    }
  }, []);
  
  // Generate multiple images
  const generateMultipleImages = useCallback(async (
    requests: ImageGenerationRequest[]
  ): Promise<GeneratedImage[]> => {
    setState({ isGenerating: true, progress: 0 });
    
    try {
      const responses = await generateImages(requests, { concurrent: true });
      
      const images: GeneratedImage[] = responses.flatMap((response, index) =>
        response.images.map((url, imgIndex) => ({
          id: `img-${Date.now()}-${index}-${imgIndex}`,
          url,
          prompt: response.prompt,
          provider: response.provider,
          model: response.model,
          createdAt: new Date(),
        }))
      );
      
      setGeneratedImages(prev => [...images, ...prev]);
      setState({ isGenerating: false, progress: 100 });
      
      return images;
    } catch (error) {
      setState({
        isGenerating: false,
        progress: 0,
        error: error instanceof Error ? error.message : 'Batch generation failed',
      });
      return [];
    }
  }, []);
  
  // Generate campaign assets
  const generateCampaign = useCallback(async (
    campaignTheme: string,
    variations: number = 3
  ): Promise<Record<string, GeneratedImage[]>> => {
    setState({ isGenerating: true, progress: 0 });
    
    try {
      const assets = await generateCampaignAssets(campaignTheme, variations);
      
      const result: Record<string, GeneratedImage[]> = {};
      
      for (const [key, response] of Object.entries(assets)) {
        result[key] = response.images.map((url, index) => ({
          id: `campaign-${key}-${Date.now()}-${index}`,
          url,
          prompt: response.prompt,
          provider: response.provider,
          model: response.model,
          createdAt: new Date(),
        }));
      }
      
      // Flatten all images for the main list
      const allImages = Object.values(result).flat();
      setGeneratedImages(prev => [...allImages, ...prev]);
      
      setState({ isGenerating: false, progress: 100 });
      return result;
    } catch (error) {
      setState({
        isGenerating: false,
        progress: 0,
        error: error instanceof Error ? error.message : 'Campaign generation failed',
      });
      return {};
    }
  }, []);
  
  // Clear generated images
  const clearImages = useCallback(() => {
    setGeneratedImages([]);
    setState({ isGenerating: false, progress: 0 });
  }, []);
  
  // Remove a specific image
  const removeImage = useCallback((id: string) => {
    setGeneratedImages(prev => prev.filter(img => img.id !== id));
  }, []);
  
  // Retry failed generation
  const retry = useCallback(async (
    request: ImageGenerationRequest & { contentType?: 'social' | 'blog' | 'hero' | 'logo' | 'banner' }
  ) => {
    setState(prev => ({ ...prev, error: undefined }));
    return generateSingleImage(request);
  }, [generateSingleImage]);
  
  return {
    // State
    isGenerating: state.isGenerating,
    progress: state.progress,
    currentProvider: state.currentProvider,
    error: state.error,
    generatedImages,
    aspectRatios: BRAND_ASPECT_RATIOS,
    
    // Actions
    generateSingleImage,
    generateMultipleImages,
    generateCampaign,
    clearImages,
    removeImage,
    retry,
  };
}

export default useImageGeneration;
