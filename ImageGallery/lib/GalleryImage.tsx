/**
 * Gallery Image Component
 * React component for displaying images from the gallery
 */

import React from 'react';
import { getImage, getCdnUrl, GalleryImage as GalleryImageType } from './index';

interface GalleryImageProps {
  id: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  onClick?: () => void;
  fallback?: React.ReactNode;
}

export const GalleryImage: React.FC<GalleryImageProps> = ({
  id,
  alt,
  className,
  width,
  height,
  style,
  loading = 'lazy',
  onClick,
  fallback = <div style={{ width, height, background: '#f0f0f0' }}>Image not found</div>
}) => {
  const image = getImage(id);
  
  if (!image) {
    console.warn(`Gallery image not found: ${id}`);
    return <>{fallback}</>;
  }
  
  const src = getCdnUrl(image.src);
  
  return (
    <img
      src={src}
      alt={alt || image.name}
      className={className}
      width={width}
      height={height}
      style={style}
      loading={loading}
      onClick={onClick}
    />
  );
};

interface GalleryImageByPathProps {
  category: string;
  filename: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
}

export const GalleryImageByPath: React.FC<GalleryImageByPathProps> = ({
  category,
  filename,
  alt,
  className,
  width,
  height,
  style,
  loading = 'lazy'
}) => {
  const baseUrl = '/ImageGallery';
  const src = `${baseUrl}/${category}/${filename}`;
  
  return (
    <img
      src={src}
      alt={alt || filename}
      className={className}
      width={width}
      height={height}
      style={style}
      loading={loading}
    />
  );
};

interface GalleryBackgroundProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  overlay?: boolean;
  overlayColor?: string;
}

export const GalleryBackground: React.FC<GalleryBackgroundProps> = ({
  id,
  children,
  className,
  style = {},
  overlay = false,
  overlayColor = 'rgba(0,0,0,0.5)'
}) => {
  const image = getImage(id);
  
  if (!image) {
    console.warn(`Gallery background not found: ${id}`);
    return <div className={className} style={style}>{children}</div>;
  }
  
  const src = getCdnUrl(image.src);
  
  const backgroundStyle: React.CSSProperties = {
    ...style,
    backgroundImage: `url(${src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative'
  };
  
  return (
    <div className={className} style={backgroundStyle}>
      {overlay && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: overlayColor,
          zIndex: 1
        }} />
      )}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
};

export default GalleryImage;
