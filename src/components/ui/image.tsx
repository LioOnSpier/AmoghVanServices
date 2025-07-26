import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Alternative text for the image */
  alt: string;
  /** Image source URL */
  src: string;
  /** Optional fallback image to display if the main image fails to load */
  fallbackSrc?: string;
  /** Optional blur hash or placeholder to show while loading */
  placeholder?: string;
  /** Whether to lazy load the image */
  lazy?: boolean;
  /** Optional width for the image */
  width?: number | string;
  /** Optional height for the image */
  height?: number | string;
  /** Optional object-fit style */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Optional object-position style */
  objectPosition?: string;
  /** Optional priority loading (disables lazy loading) */
  priority?: boolean;
  /** Optional callback when image loads successfully */
  onLoad?: () => void;
  /** Optional callback when image fails to load */
  onError?: () => void;
}

/**
 * Optimized Image component with lazy loading, error handling, and responsive features
 */
const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({
    alt,
    src,
    fallbackSrc,
    placeholder,
    lazy = true,
    width,
    height,
    objectFit = 'cover',
    objectPosition = 'center',
    priority = false,
    className,
    onLoad,
    onError,
    ...props
  }, ref) => {
    const [imgSrc, setImgSrc] = useState<string>(placeholder || src);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
      // Reset states when src changes
      if (src) {
        setImgSrc(placeholder || src);
        setIsLoaded(false);
        setError(false);
      }
    }, [src, placeholder]);

    const handleLoad = () => {
      setIsLoaded(true);
      setImgSrc(src);
      onLoad?.();
    };

    const handleError = () => {
      setError(true);
      if (fallbackSrc) {
        setImgSrc(fallbackSrc);
      }
      onError?.();
    };

    return (
      <img
        ref={ref}
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : lazy ? 'lazy' : 'eager'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        style={{
          objectFit,
          objectPosition,
          ...props.style,
        }}
        {...props}
      />
    );
  }
);

Image.displayName = 'Image';

export { Image };