# Sanity CMS Setup Guide for Amogh Van/Bus Services

## 🚀 Complete CMS Integration Guide

This guide will help you set up a professional blog management system using Sanity.io CMS for your Amogh Van/Bus Services website.

## 📋 What's Been Added

✅ **Blog Listing Page** (`/blog`) - Displays all published blog posts
✅ **Individual Post Pages** (`/blog/[slug]`) - Shows full blog post content
✅ **Protected Admin Login** (`/admin`) - Secure access to CMS
✅ **Sanity Client Configuration** - Ready for CMS integration
✅ **Rich Text Support** - Professional content formatting
✅ **Image Handling** - Optimized image display
✅ **Search Functionality** - Users can search blog posts
✅ **Featured Posts** - Highlight important articles
✅ **Responsive Design** - Works on all devices

## 🛠️ Step 1: Create Sanity Account & Project

### 1.1 Sign Up for Sanity
1. Go to [Sanity.io](https://www.sanity.io/)
2. Click "Get Started" and create a free account
3. Verify your email address

### 1.2 Create New Project
1. In your Sanity dashboard, click "Create new project"
2. Choose a project name (e.g., "Amogh Blog CMS")
3. Select "Blog" template or start blank
4. Choose a dataset name (use "production")
5. Note your **Project ID** (e.g., `abc123def`)

## 🏗️ Step 2: Set Up Sanity Studio

### 2.1 Install Sanity CLI
```bash
npm install -g @sanity/cli
```

### 2.2 Initialize Sanity Studio
```bash
# In a new folder for your CMS
mkdir amogh-blog-cms
cd amogh-blog-cms
sanity init

# Choose:
# - Select your existing project
# - Use TypeScript? Yes
# - Output path: ./
```

### 2.3 Configure Schema
Create this schema file at `schemas/post.ts`:

```typescript
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'}
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Brief description of the post'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }
          ]
        }
      ]
    },
    {
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Mark this post as featured'
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection: any) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}
```

### 2.4 Author Schema
Create `schemas/author.ts`:

```typescript
export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
}
```

### 2.5 Update Schema Index
Update `schemas/index.ts`:

```typescript
import author from './author'
import post from './post'

export const schemaTypes = [post, author]
```

### 2.6 Deploy Studio
```bash
sanity deploy
```

This creates your admin panel at: `https://your-project-id.sanity.studio/`

## 🔧 Step 3: Configure Your Website

### 3.1 Update Sanity Configuration
In your website project, update `src/lib/sanity.ts`:

```typescript
export const client = createClient({
  projectId: 'your-actual-project-id', // Replace with your project ID
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
  token: 'your-write-token', // Only needed for write operations
})
```

### 3.2 Get Your Project Credentials

1. **Project ID**: Found in your Sanity dashboard
2. **Write Token** (for admin operations):
   - Go to sanity.io/manage
   - Select your project
   - Go to Settings → API → Tokens
   - Create new token with "Editor" permissions

### 3.3 Update Admin Login
In `src/pages/AdminLogin.tsx`, update line 38:

```typescript
window.location.href = "https://your-project-id.sanity.studio/";
```

## 🎯 Step 4: Add Blog Navigation

Update your main navigation to include the blog:

### 4.1 Update Homepage Navigation
In `src/pages/Index.tsx`, add blog link to navigation:

```typescript
<a href="/blog" className="text-gray-600 hover:text-school-blue-600 transition-colors">
  Blog
</a>
```

### 4.2 Update App Routing
In `src/App.tsx`, add blog routes:

```typescript
<Route path="/blog" element={<Blog />} />
<Route path="/blog/:slug" element={<BlogPost />} />
<Route path="/admin" element={<AdminLogin />} />
```

## 📝 Step 5: Content Management

### 5.1 Create Your First Author
1. Go to your Sanity Studio
2. Click "Author" → "Create new"
3. Add author details (name, bio, photo)
4. Publish

### 5.2 Create Your First Blog Post
1. Click "Blog Post" → "Create new"
2. Fill in all required fields:
   - Title
   - Slug (auto-generated)
   - Author (select from list)
   - Published date
   - Content
   - Featured image
3. Mark as "Featured" if desired
4. Publish

### 5.3 Admin Access
- **Admin URL**: `/admin`
- **Default Credentials**:
  - Username: `admin`
  - Password: `amogh@2025`
- **Change these** in `src/pages/AdminLogin.tsx`

## 🔒 Security Setup

### 5.1 Change Admin Credentials
In `src/pages/AdminLogin.tsx`, update:

```typescript
const ADMIN_CREDENTIALS = {
  username: "your-secure-username",
  password: "your-secure-password",
};
```

### 5.2 Sanity CORS Settings
1. Go to sanity.io/manage
2. Select your project
3. Settings → API → CORS Origins
4. Add your website domains:
   - `http://localhost:8080`
   - `https://yourdomain.com`

## 📊 Features Overview

### Public Features
- **Blog Listing** (`/blog`) - All published posts
- **Individual Posts** (`/blog/post-slug`) - Full post content
- **Search** - Real-time post search
- **Categories** - Post categorization
- **Featured Posts** - Highlighted articles
- **Responsive Design** - Mobile-friendly

### Admin Features
- **Secure Login** (`/admin`) - Password protected
- **Rich Text Editor** - Professional content creation
- **Image Management** - Upload and optimize images
- **Post Scheduling** - Publish posts at specific times
- **Author Management** - Multiple authors support
- **Draft System** - Save drafts before publishing

## 🚀 Going Live

### 5.1 Content Strategy
1. Create author profiles for your team
2. Plan blog categories:
   - Safety Tips
   - Transportation News
   - School Updates
   - Community Stories
3. Create 3-5 initial posts
4. Set up a content calendar

### 5.2 SEO Optimization
- Use descriptive titles
- Add meta descriptions (excerpts)
- Include relevant keywords
- Add alt text to images
- Use proper heading structure

## 💡 Usage Tips

### For Content Creation
1. **Write engaging titles** - Clear and descriptive
2. **Use featured images** - High-quality, relevant photos
3. **Add excerpts** - Brief, compelling summaries
4. **Categorize posts** - Help users find content
5. **Mark featured posts** - Highlight important articles

### For SEO
1. **Use keywords naturally** - Don't stuff keywords
2. **Write meta descriptions** - Use the excerpt field
3. **Optimize images** - Compress and add alt text
4. **Internal linking** - Link between related posts
5. **Regular updates** - Fresh content improves rankings

## 🆘 Troubleshooting

### Common Issues
1. **"Project ID not found"** - Check your project ID in sanity.ts
2. **"CORS error"** - Add your domain to Sanity CORS settings
3. **"Images not loading"** - Verify image URLs and CDN settings
4. **"Posts not appearing"** - Check published dates are in the past

### Support Resources
- **Sanity Documentation**: [sanity.io/docs](https://sanity.io/docs)
- **Community**: [sanity.io/community](https://sanity.io/community)
- **Stack Overflow**: Search "sanity cms"

## ✅ Checklist

- [ ] Sanity account created
- [ ] Project set up with correct schema
- [ ] Studio deployed and accessible
- [ ] Website configured with project ID
- [ ] Admin credentials updated
- [ ] CORS settings configured
- [ ] First author created
- [ ] First blog post published
- [ ] Navigation updated
- [ ] Routes working correctly

Your blog CMS is now ready! 🎉

## 📈 Next Steps

1. **Create content** - Write and publish your first posts
2. **Customize design** - Adjust colors and styling to match your brand
3. **Add analytics** - Track blog performance
4. **Social sharing** - Add share buttons
5. **Email newsletter** - Collect subscriber emails
6. **Comments system** - Consider adding Disqus or similar

The blog system is now fully integrated into your Amogh Van/Bus Services website with professional CMS capabilities!
