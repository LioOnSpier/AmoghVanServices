import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity configuration
export const client = createClient({
  projectId: 'm1twzp1b', // Your actual Sanity project ID
  dataset: 'production', // or the name of your dataset
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2023-05-03', // use a UTC date string
  token: '', // Add your token when you get it from Sanity dashboard
})

// Helper function for generating image URLs
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Blog post type definition
export interface BlogPost {
  _id: string
  _createdAt: string
  _updatedAt: string
  title: string
  slug: { current: string }
  excerpt?: string
  content: any[] // Rich text content
  mainImage?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
  author?: {
    name: string
    image?: any
  }
  publishedAt: string
  categories?: string[]
  featured?: boolean
}

// API functions for blog posts
export const blogApi = {
  // Get all published blog posts
  async getAllPosts(): Promise<BlogPost[]> {
    return await client.fetch(`
      *[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) {
        _id,
        _createdAt,
        _updatedAt,
        title,
        slug,
        excerpt,
        mainImage,
        author->{name, image},
        publishedAt,
        categories,
        featured
      }
    `)
  },

  // Get featured blog posts
  async getFeaturedPosts(): Promise<BlogPost[]> {
    return await client.fetch(`
      *[_type == "post" && featured == true && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc)[0...3] {
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        author->{name, image},
        publishedAt,
        categories
      }
    `)
  },

  // Get single blog post by slug
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    return await client.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        _createdAt,
        _updatedAt,
        title,
        slug,
        excerpt,
        content,
        mainImage,
        author->{name, image},
        publishedAt,
        categories,
        featured
      }
    `, { slug })
  },

  // Get recent posts for sidebar/related content
  async getRecentPosts(limit: number = 5): Promise<BlogPost[]> {
    return await client.fetch(`
      *[_type == "post" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc)[0...$limit] {
        _id,
        title,
        slug,
        mainImage,
        publishedAt
      }
    `, { limit })
  }
}
