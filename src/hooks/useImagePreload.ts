import { useState, useEffect } from 'react';

/**
 * Custom hook for preloading images
 * @param src - Image source URL or array of URLs to preload
 * @returns Object containing loading status and any error
 */
export function useImagePreload(src: string | string[]) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const sources = Array.isArray(src) ? src : [src];
    if (sources.length === 0) {
      setLoaded(true);
      return;
    }

    let unmounted = false;
    let loadedCount = 0;
    const totalImages = sources.length;

    const preloadImage = (imageSrc: string) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
          if (!unmounted) {
            loadedCount++;
            if (loadedCount === totalImages) {
              setLoaded(true);
            }
          }
          resolve();
        };
        
        img.onerror = (e) => {
          if (!unmounted) {
            setError(new Error(`Failed to load image: ${imageSrc}`));
          }
          reject(e);
        };
        
        img.src = imageSrc;
      });
    };

    // Reset states
    setLoaded(false);
    setError(null);
    
    // Preload all images in parallel
    Promise.all(sources.map(preloadImage))
      .catch((err) => {
        if (!unmounted) {
          console.error('Error preloading images:', err);
        }
      });

    return () => {
      unmounted = true;
    };
  }, [src]);

  return { loaded, error };
}