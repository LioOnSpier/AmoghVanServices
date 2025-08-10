// WordPress RSS Feed Client - Works with any WordPress site
import { safeRssFetch } from "./safe-fetch";

export interface RSSPost {
  id: string;
  title: string;
  link: string;
  slug: string;
  content: string;
  excerpt: string;
  pubDate: string;
  author: string;
  categories: string[];
  featured_image?: string;
}

export class WordPressRSSClient {
  private baseUrl: string;

  constructor(wpSiteUrl: string = import.meta.env.VITE_WORDPRESS_SITE_URL || "https://kharwaramog02-swayq.wordpress.com") {
    this.baseUrl = wpSiteUrl;
  }

  // Convert RSS XML to JSON posts
  private parseRSSFeed(xmlText: string): RSSPost[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    const items = xmlDoc.querySelectorAll("item");
    const posts: RSSPost[] = [];

    items.forEach((item, index) => {
      const title = item.querySelector("title")?.textContent || "";
      const link = item.querySelector("link")?.textContent || "";
      const content =
        item.querySelector("content\\:encoded, encoded")?.textContent ||
        item.querySelector("description")?.textContent ||
        "";
      const pubDate = item.querySelector("pubDate")?.textContent || "";
      const author =
        item.querySelector("dc\\:creator, creator")?.textContent ||
        "Amogh Van Services";
      const guid = item.querySelector("guid")?.textContent || link;

      // Extract categories
      const categoryElements = item.querySelectorAll("category");
      const categories: string[] = [];
      categoryElements.forEach((cat) => {
        const catText = cat.textContent;
        if (catText && !catText.includes("http")) {
          // Filter out category URLs
          categories.push(catText);
        }
      });

      // Create slug from title or extract from link
      let slug = link.split("/").filter(Boolean).pop() || "";
      if (!slug) {
        slug = title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim();
      }

      // Clean excerpt from content
      const excerpt = this.createExcerpt(content);

      // Try to extract featured image from content
      const featured_image = this.extractFeaturedImage(content);

      posts.push({
        id: `post-${index + 1}`,
        title: this.cleanText(title),
        link,
        slug,
        content: content,
        excerpt,
        pubDate,
        author,
        categories: categories.length > 0 ? categories : ["General"],
        featured_image,
      });
    });

    return posts;
  }

  // Clean HTML entities and text
  private cleanText(text: string): string {
    return text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#8217;/g, "'")
      .replace(/&#8220;/g, '"')
      .replace(/&#8221;/g, '"')
      .replace(/&#8211;/g, "–")
      .replace(/&#8212;/g, "—")
      .trim();
  }

  // Create excerpt from content
  private createExcerpt(content: string, maxLength: number = 160): string {
    // Remove HTML tags
    const textOnly = content
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (textOnly.length <= maxLength) return textOnly;

    // Cut at word boundary
    const truncated = textOnly.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");

    return (
      (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + "..."
    );
  }

  // Extract first image from content as featured image
  private extractFeaturedImage(content: string): string | undefined {
    const imgMatch = content.match(/<img[^>]+src=['"](https?:\/\/[^'"]+)['"]/i);
    return imgMatch ? imgMatch[1] : undefined;
  }

  // Get all posts from RSS feed
  async getPosts(): Promise<RSSPost[]> {
    // Use a CORS proxy to fetch RSS feed
    const rssUrl = `${this.baseUrl}/feed/`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;

    const response = await safeRssFetch(proxyUrl);

    if (response && response.ok) {
      try {
        const xmlText = await response.text();
        return this.parseRSSFeed(xmlText);
      } catch (error) {
        // XML parsing failed
        return [];
      }
    }

    // RSS fetch failed or unavailable
    return [];
  }

  // Get post by slug
  async getPostBySlug(slug: string): Promise<RSSPost | null> {
    try {
      const posts = await this.getPosts();
      return posts.find((post) => post.slug === slug) || null;
    } catch (error) {
      // Silently fail - error already logged in getPosts
      return null;
    }
  }

  // Get featured posts (first 3)
  async getFeaturedPosts(limit: number = 3): Promise<RSSPost[]> {
    try {
      const posts = await this.getPosts();
      return posts.slice(0, limit);
    } catch (error) {
      // Silently fail - error already logged in getPosts
      return [];
    }
  }

  // Search posts
  async searchPosts(query: string): Promise<RSSPost[]> {
    try {
      const posts = await this.getPosts();
      const searchTerm = query.toLowerCase();

      return posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm),
      );
    } catch (error) {
      // Silently fail - error already logged in getPosts
      return [];
    }
  }

  // Format date
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Strip HTML from content
  stripHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Calculate reading time
  getReadingTime(content: string): number {
    const wordCount = this.stripHtml(content)
      .split(" ")
      .filter((word) => word.length > 0).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  }
}

// Create default instance
export const wpRssClient = new WordPressRSSClient();

// Convert RSS post to WordPress post format for compatibility
export function convertRssToWpPost(rssPost: RSSPost): any {
  return {
    id: parseInt(rssPost.id.replace("post-", "")),
    date: rssPost.pubDate,
    slug: rssPost.slug,
    title: {
      rendered: rssPost.title,
    },
    content: {
      rendered: rssPost.content,
    },
    excerpt: {
      rendered: rssPost.excerpt,
    },
    featured_image_url: rssPost.featured_image,
    author_info: {
      name: rssPost.author,
    },
    category_names: rssPost.categories,
    reading_time: new WordPressRSSClient().getReadingTime(rssPost.content),
  };
}
