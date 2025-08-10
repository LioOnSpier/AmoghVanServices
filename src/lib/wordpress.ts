import { wpRssClient, convertRssToWpPost } from "./wordpress-rss";
import { safeFetch } from "./safe-fetch";

// WordPress REST API Configuration
export const WORDPRESS_CONFIG = {
  // Your actual WordPress.com site URL
  baseUrl: "https://kharwaramog02-swayq.wordpress.com/wp-json/wp/v2",
  // If you need authentication for private posts
  username: "", // Leave empty for public posts only
  password: "", // Leave empty for public posts only
};

// WordPress post interface
export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  slug: string;
  status: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  categories: number[];
  tags: number[];
  meta: any;
  _links: any;
  // Custom fields for better presentation
  author_info?: {
    name: string;
    avatar_urls?: any;
  };
  featured_image_url?: string;
  category_names?: string[];
  reading_time?: number;
}

// WordPress media interface
export interface WordPressMedia {
  id: number;
  source_url: string;
  alt_text: string;
  caption: {
    rendered: string;
  };
  title: {
    rendered: string;
  };
  media_details: {
    width: number;
    height: number;
    sizes: any;
  };
}

// WordPress category interface
export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

// WordPress API client
export class WordPressAPI {
  private baseUrl: string;

  constructor(baseUrl: string = WORDPRESS_CONFIG.baseUrl) {
    this.baseUrl = baseUrl;
  }

  // Get all published posts
  async getPosts(
    params: {
      per_page?: number;
      page?: number;
      search?: string;
      categories?: string;
      orderby?: string;
      order?: "asc" | "desc";
    } = {},
  ): Promise<WordPressPost[]> {
    const searchParams = new URLSearchParams({
      status: "publish",
      _embed: "true", // Include author and media info
      per_page: "10",
      orderby: "date",
      order: "desc",
      ...Object.fromEntries(
        Object.entries(params).map(([key, value]) => [key, String(value)]),
      ),
    });

    // Try the REST API (expected to fail on WordPress.com free accounts)
    const response = await safeFetch(`${this.baseUrl}/posts?${searchParams}`);

    if (response && response.ok) {
      try {
        const posts: WordPressPost[] = await response.json();
        // Enhance posts with additional info
        return posts.map((post) => this.enhancePost(post));
      } catch (jsonError) {
        // JSON parsing failed, fall through to RSS
      }
    }

    // REST API failed or unavailable, try RSS feed as fallback
    try {
      const rssPosts = await wpRssClient.getPosts();
      const convertedPosts = rssPosts.map(convertRssToWpPost);

      // Apply search filter if needed
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        return convertedPosts.filter(
          (post) =>
            post.title.rendered.toLowerCase().includes(searchTerm) ||
            this.stripHtml(post.excerpt.rendered)
              .toLowerCase()
              .includes(searchTerm),
        );
      }

      // Apply limit
      const perPage = parseInt(params.per_page as string) || 10;
      return convertedPosts.slice(0, perPage);
    } catch (rssError) {
      // Return empty array instead of throwing to prevent crashes
      return []; // Return empty array instead of throwing
    }
  }

  // Get single post by slug
  async getPostBySlug(slug: string): Promise<WordPressPost | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        `${this.baseUrl}/posts?slug=${slug}&_embed=true`,
        {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status}`);
      }

      const posts: WordPressPost[] = await response.json();
      if (posts.length === 0) {
        return null;
      }

      return this.enhancePost(posts[0]);
    } catch (error) {
      // Handle network errors gracefully
      if (error instanceof TypeError || error.name === 'AbortError') {
        // Network/timeout error - silently fallback
      } else if (process.env.NODE_ENV === "development") {
        console.warn("WordPress REST API unavailable for post:", slug);
      }

      // Silently fallback to RSS feed (this is expected behavior)
      try {
        // Try RSS feed as fallback
        const rssPost = await wpRssClient.getPostBySlug(slug);
        return rssPost ? convertRssToWpPost(rssPost) : null;
      } catch (rssError) {
        // Silently return null instead of logging in production
        return null;
      }
    }
  }

  // Get featured posts (posts with specific tag or category)
  async getFeaturedPosts(limit: number = 3): Promise<WordPressPost[]> {
    return this.getPosts({
      per_page: limit,
      // You can filter by a specific category or tag for featured posts
      // categories: 'featured-category-id',
      // tags: 'featured-tag-id',
    });
  }

  // Get categories
  async getCategories(): Promise<WordPressCategory[]> {
    try {
      const response = await fetch(`${this.baseUrl}/categories?per_page=100`);
      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching WordPress categories:", error);
      return [];
    }
  }

  // Search posts
  async searchPosts(
    query: string,
    limit: number = 10,
  ): Promise<WordPressPost[]> {
    return this.getPosts({
      search: query,
      per_page: limit,
    });
  }

  // Helper method to enhance post data
  private enhancePost(post: any): WordPressPost {
    // Extract author info from _embedded data
    const authorInfo = post._embedded?.author?.[0];
    if (authorInfo) {
      post.author_info = {
        name: authorInfo.name,
        avatar_urls: authorInfo.avatar_urls,
      };
    }

    // Extract featured image from _embedded data
    const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
    if (featuredMedia) {
      post.featured_image_url = featuredMedia.source_url;
    }

    // Extract category names from _embedded data
    const categories = post._embedded?.["wp:term"]?.[0]; // Categories are usually the first term type
    if (categories) {
      post.category_names = categories.map((cat: any) => cat.name);
    }

    // Calculate reading time (rough estimate)
    const wordCount = this.countWords(post.content.rendered);
    post.reading_time = Math.max(1, Math.ceil(wordCount / 200)); // Average reading speed

    return post;
  }

  // Helper method to count words in HTML content
  private countWords(html: string): number {
    // Remove HTML tags and count words
    const text = html
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return text.split(" ").filter((word) => word.length > 0).length;
  }

  // Helper method to strip HTML tags for excerpts
  stripHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Helper method to format date
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

// Create a default instance
export const wordpressApi = new WordPressAPI();

// Utility functions
export const wpUtils = {
  // Clean excerpt text
  cleanExcerpt: (excerpt: string) => {
    return excerpt
      .replace(/<[^>]*>/g, "")
      .replace(/\[&hellip;\]/, "...")
      .trim();
  },

  // Get responsive image URL
  getResponsiveImageUrl: (
    post: WordPressPost,
    size: "thumbnail" | "medium" | "large" | "full" = "medium",
  ) => {
    if (!post.featured_image_url) return null;

    // For better performance, you might want to use WordPress image sizes
    // This is a basic implementation - WordPress can provide different sizes
    return post.featured_image_url;
  },

  // Create post URL
  createPostUrl: (slug: string) => `/blog/${slug}`,

  // Truncate text
  truncateText: (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  },
};
