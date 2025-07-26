import { useEffect } from 'react';

interface HeadProps {
  /** Page title */
  title: string;
  /** Page description for SEO */
  description?: string;
  /** Optional canonical URL */
  canonical?: string;
  /** Optional array of OG image URLs */
  ogImages?: string[];
  /** Optional Twitter card type */
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  /** Optional structured data for rich results */
  structuredData?: object;
}

/**
 * Head component for managing document head metadata
 * This helps with SEO optimization
 */
export function Head({
  title,
  description,
  canonical,
  ogImages = [],
  twitterCard = 'summary_large_image',
  structuredData,
}: HeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description || '');

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    } else if (canonicalLink) {
      canonicalLink.remove();
    }

    // Update Open Graph meta tags
    const updateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    updateMetaTag('og:title', title);
    if (description) updateMetaTag('og:description', description);
    updateMetaTag('og:type', 'website');
    if (canonical) updateMetaTag('og:url', canonical);

    // Remove old OG image tags
    document.querySelectorAll('meta[property="og:image"]').forEach(tag => tag.remove());

    // Add new OG image tags
    ogImages.forEach(imageUrl => {
      const ogImageTag = document.createElement('meta');
      ogImageTag.setAttribute('property', 'og:image');
      ogImageTag.setAttribute('content', imageUrl);
      document.head.appendChild(ogImageTag);
    });

    // Update Twitter card meta tags
    const updateTwitterTag = (name: string, content: string) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', name);
        document.head.appendChild(twitterTag);
      }
      twitterTag.setAttribute('content', content);
    };

    updateTwitterTag('twitter:card', twitterCard);
    updateTwitterTag('twitter:title', title);
    if (description) updateTwitterTag('twitter:description', description);
    if (ogImages.length > 0) updateTwitterTag('twitter:image', ogImages[0]);

    // Add structured data if provided
    if (structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function
    return () => {
      // Optional: Remove tags when component unmounts
      // In most cases, you'll want to keep them for the next page
    };
  }, [title, description, canonical, ogImages, twitterCard, structuredData]);

  // This component doesn't render anything visible
  return null;
}