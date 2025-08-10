# Hostinger Deployment Guide for Amogh Van/Bus Services

This guide will help you deploy your React website and WordPress blog to Hostinger hosting.

## Prerequisites

1. **Hostinger Account** - Premium or Business plan (recommended for WordPress)
2. **Domain Name** - Connected to your Hostinger account
3. **FTP/SFTP Access** - Available in your Hostinger control panel
4. **Node.js** - Installed on your local machine for building

## Part 1: WordPress Setup on Hostinger

### Step 1: Install WordPress

1. **Login to Hostinger Control Panel**
   - Go to https://hpanel.hostinger.com
   - Login with your credentials

2. **Auto-Install WordPress**
   - Navigate to "Websites" section
   - Click "Manage" on your domain
   - Go to "Auto Installer"
   - Select "WordPress" and click "Install"
   - Choose installation directory:
     - For main domain: `/public_html/blog/` (recommended)
     - Or subdomain: `blog.yourdomain.com`

3. **WordPress Configuration**
   - Complete the WordPress setup wizard
   - Create admin account
   - Note down the WordPress URL (e.g., `https://yourdomain.com/blog/`)

### Step 2: Configure WordPress for API Access

1. **Install Required Plugins**
   ```
   - WP REST API (usually built-in)
   - Custom Post Type REST API (if needed)
   ```

2. **Enable REST API**
   - WordPress REST API is enabled by default
   - Test API: `https://yourdomain.com/blog/wp-json/wp/v2/posts`

3. **Configure Permalinks**
   - Go to Settings > Permalinks
   - Select "Post name" structure
   - Save changes

### Step 3: Update CORS Settings (Optional)

If you face CORS issues, add this to your WordPress theme's `functions.php`:

```php
// Add CORS headers for REST API
function add_cors_http_header(){
    header("Access-Control-Allow-Origin: https://yourdomain.com");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}
add_action('init','add_cors_http_header');
```

## Part 2: React App Deployment

### Step 1: Prepare for Production

1. **Update Environment Variables**
   ```bash
   # Create .env.production file
   cp .env.production.example .env.production
   ```

2. **Edit .env.production**
   ```env
   VITE_WORDPRESS_BASE_URL=https://yourdomain.com/blog/wp-json/wp/v2
   VITE_WORDPRESS_SITE_URL=https://yourdomain.com/blog
   VITE_SITE_URL=https://yourdomain.com
   ```

3. **Update Package.json Scripts**
   ```json
   {
     "scripts": {
       "build:prod": "vite build --mode production",
       "preview:prod": "vite preview --mode production"
     }
   }
   ```

### Step 2: Build the Project

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build for Production**
   ```bash
   npm run build:prod
   ```

3. **Test Build Locally**
   ```bash
   npm run preview:prod
   ```

### Step 3: Deploy to Hostinger

#### Option A: FTP/SFTP Upload

1. **Get FTP Credentials**
   - Hostinger Control Panel > File Manager
   - Or use FTP credentials from "FTP Accounts"

2. **Upload Files**
   ```bash
   # Using FileZilla or similar FTP client
   # Upload contents of 'dist' folder to /public_html/
   
   # Or using command line SFTP
   sftp username@yourdomain.com
   put -r dist/* /public_html/
   ```

3. **File Structure on Server**
   ```
   /public_html/
   ├── index.html
   ├── assets/
   ├── .htaccess
   ├── robots.txt
   ├── sitemap.xml
   └── blog/ (WordPress installation)
   ```

#### Option B: Git Deployment (Advanced)

1. **Setup Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial deployment"
   ```

2. **Deploy via SSH** (if available on your Hostinger plan)
   ```bash
   # SSH into your Hostinger server
   ssh username@yourdomain.com
   
   # Clone and build
   git clone your-repo-url /tmp/build
   cd /tmp/build
   npm install
   npm run build:prod
   cp -r dist/* /public_html/
   ```

## Part 3: Configuration Updates

### Step 1: Update Domain References

1. **Update SEO Component URLs**
   - Search for `amoghvanservices.com` in your code
   - Replace with your actual domain

2. **Update Canonical URLs**
   - Update all canonical URL references
   - Update Open Graph URLs
   - Update schema.org URLs

### Step 2: Test WordPress Integration

1. **Test API Endpoints**
   ```bash
   # Test REST API
   curl https://yourdomain.com/blog/wp-json/wp/v2/posts
   
   # Test RSS Feed
   curl https://yourdomain.com/blog/feed/
   ```

2. **Create Test Blog Post**
   - Login to WordPress admin
   - Create a test post
   - Verify it appears on your website

### Step 3: SSL Configuration

1. **Enable SSL in Hostinger**
   - Control Panel > SSL
   - Enable "Force HTTPS redirect"

2. **Update WordPress URLs**
   - WordPress Admin > Settings > General
   - Update site URLs to use HTTPS

## Part 4: Performance Optimization

### Step 1: Hostinger Optimizations

1. **Enable Caching**
   - Control Panel > Speed
   - Enable LiteSpeed Cache

2. **Enable Gzip Compression**
   - Already configured in `.htaccess`

3. **Optimize Images**
   - Use WebP format for images
   - Enable image optimization in Hostinger

### Step 2: WordPress Optimizations

1. **Install Caching Plugin**
   ```
   - LiteSpeed Cache (recommended for Hostinger)
   - W3 Total Cache (alternative)
   ```

2. **Optimize Database**
   - Use WP-Optimize plugin
   - Remove unused plugins/themes

## Part 5: Monitoring and Maintenance

### Step 1: Setup Monitoring

1. **Google Analytics**
   - Add tracking code to index.html
   - Monitor website traffic

2. **Google Search Console**
   - Verify your domain
   - Submit sitemap.xml

### Step 2: Regular Maintenance

1. **WordPress Updates**
   - Keep WordPress core updated
   - Update plugins regularly
   - Backup before updates

2. **Security Monitoring**
   - Use security plugins (Wordfence)
   - Monitor failed login attempts
   - Keep strong passwords

## Troubleshooting

### Common Issues

1. **404 Errors for Routes**
   - Ensure `.htaccess` is uploaded
   - Check Apache mod_rewrite is enabled

2. **WordPress API Not Working**
   - Check permalink structure
   - Verify REST API is enabled
   - Check for plugin conflicts

3. **CORS Errors**
   - Add CORS headers to WordPress
   - Use RSS fallback (already implemented)

4. **Build Errors**
   - Check Node.js version compatibility
   - Clear node_modules and reinstall
   - Check environment variables

### Support Resources

- **Hostinger Documentation**: https://support.hostinger.com
- **WordPress Codex**: https://codex.wordpress.org
- **React Router**: https://reactrouter.com

## Final Checklist

- [ ] WordPress installed and configured
- [ ] REST API working
- [ ] React app built successfully
- [ ] Files uploaded to Hostinger
- [ ] Domain SSL enabled
- [ ] All URLs updated to production domain
- [ ] Blog posts displaying correctly
- [ ] Contact form working (EmailJS)
- [ ] Student registration working
- [ ] SEO meta tags updated
- [ ] Google Analytics configured
- [ ] Sitemap submitted to Google

## Post-Deployment Testing

1. **Test All Pages**
   - Homepage
   - About page
   - Contact page
   - Student registration
   - Blog listing
   - Individual blog posts

2. **Test Functionality**
   - Contact form submission
   - Student registration form
   - Social media sharing
   - Mobile responsiveness

3. **Test Performance**
   - Page load speeds
   - Mobile performance
   - SEO score (Google PageSpeed Insights)

Your Amogh Van/Bus Services website should now be successfully deployed on Hostinger!
