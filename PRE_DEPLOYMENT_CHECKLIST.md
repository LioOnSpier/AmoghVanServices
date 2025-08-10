# Pre-Deployment Checklist for Hostinger

Complete this checklist before deploying your Amogh Van/Bus Services website to Hostinger.

## ✅ Domain & Hosting Setup

- [ ] **Hostinger Account Active**
  - Premium or Business hosting plan
  - Domain connected to hosting account
  - SSL certificate enabled

- [ ] **Domain Configuration**
  - Domain pointing to Hostinger nameservers
  - DNS records propagated (24-48 hours)
  - HTTPS/SSL working properly

## ✅ WordPress Setup

- [ ] **WordPress Installation**
  - WordPress installed in `/public_html/blog/` directory
  - Admin account created with strong password
  - Database configured and connected

- [ ] **WordPress Configuration**
  - Permalink structure set to "Post name"
  - REST API accessible: `yourdomain.com/blog/wp-json/wp/v2/posts`
  - RSS feed working: `yourdomain.com/blog/feed/`
  - CORS headers configured (if needed)

- [ ] **WordPress Content**
  - At least 2-3 sample blog posts created
  - Categories created (Safety Tips, Service Updates, News)
  - Featured images added to posts
  - Basic theme configuration completed

- [ ] **WordPress Plugins**
  - LiteSpeed Cache enabled
  - Security plugin installed (Wordfence recommended)
  - SEO plugin installed (Yoast SEO recommended)

## ✅ React App Configuration

- [ ] **Environment Variables**
  - `.env.production` file created
  - WordPress URLs updated to your domain
  - EmailJS credentials verified
  - All placeholder domains replaced

- [ ] **Code Updates**
  - Search and replace all instances of:
    - `amoghvanservices.com` → `yourdomain.com`
    - `kharwaramog02-swayq.wordpress.com` → `yourdomain.com/blog`
  - Router configuration updated
  - API endpoints pointing to your WordPress

- [ ] **SEO Configuration**
  - Meta tags updated with your domain
  - Canonical URLs updated
  - Open Graph URLs updated
  - Schema.org markup updated
  - Sitemap.xml updated

## ✅ Build & Test

- [ ] **Local Testing**
  - All pages load correctly
  - Blog integration working
  - Contact form functional
  - Student registration working
  - Mobile responsiveness verified

- [ ] **Production Build**
  - `npm run build:hostinger` executes successfully
  - No build errors or warnings
  - Dist folder contains all necessary files
  - `.htaccess` file included

- [ ] **Build Verification**
  - Preview build locally: `npm run preview:prod`
  - Test all functionality in preview
  - Verify WordPress API integration

## ✅ Content & Assets

- [ ] **Images & Media**
  - All images optimized for web
  - Placeholder images replaced with actual content
  - Favicon and app icons created
  - Open Graph images prepared

- [ ] **Content Review**
  - All lorem ipsum text replaced
  - Contact information verified
  - Business hours accurate
  - Service descriptions updated
  - Testimonials (if any) are genuine

## ✅ Third-Party Services

- [ ] **EmailJS Configuration**
  - EmailJS account active
  - Service ID correct
  - Template ID correct
  - Public key correct
  - Test email sending working

- [ ] **Analytics Setup**
  - Google Analytics account created
  - Tracking code added (if desired)
  - Google Search Console account prepared

## ✅ Security & Performance

- [ ] **Security Checklist**
  - Strong passwords for all accounts
  - WordPress admin username is not "admin"
  - File permissions set correctly
  - Security headers configured in `.htaccess`

- [ ] **Performance Optimization**
  - Images compressed and optimized
  - Gzip compression enabled
  - Caching configured
  - CSS and JS minified (handled by build)

## ✅ Deployment Preparation

- [ ] **File Transfer Method**
  - FTP/SFTP credentials obtained from Hostinger
  - FileZilla or similar FTP client installed
  - OR Git repository prepared for deployment

- [ ] **Backup Strategy**
  - Current WordPress.com blog content exported (if applicable)
  - Local backup of all project files
  - Hostinger automatic backups enabled

## ✅ Post-Deployment Testing Plan

- [ ] **Functionality Testing**
  - [ ] Homepage loads correctly
  - [ ] About page displays properly
  - [ ] Contact page and form work
  - [ ] Student registration form functions
  - [ ] Blog page shows WordPress posts
  - [ ] Individual blog posts load
  - [ ] Social media sharing works
  - [ ] Mobile responsiveness verified

- [ ] **WordPress Integration**
  - [ ] WordPress admin accessible
  - [ ] New posts appear on website
  - [ ] RSS feed integration working
  - [ ] Image uploads working in WordPress

- [ ] **SEO & Performance**
  - [ ] Google PageSpeed Insights test
  - [ ] Mobile-friendly test
  - [ ] SEO meta tags displaying correctly
  - [ ] Sitemap accessible

## ✅ Go-Live Checklist

- [ ] **DNS & SSL**
  - Domain resolves to Hostinger servers
  - HTTPS certificate active and valid
  - Force HTTPS redirect enabled

- [ ] **Monitoring Setup**
  - Google Analytics configured
  - Google Search Console verified
  - Sitemap submitted to search engines

- [ ] **Documentation**
  - WordPress admin credentials saved securely
  - Hostinger account details documented
  - FTP credentials saved securely
  - EmailJS credentials backed up

## 🚀 Deployment Commands

When ready to deploy:

```bash
# 1. Final build
npm run build:hostinger

# 2. Upload dist folder contents to /public_html/
# 3. Test website at https://yourdomain.com
# 4. Create WordPress content
# 5. Test blog integration
```

## 📞 Emergency Contacts

- **Hostinger Support**: https://support.hostinger.com
- **Domain Provider**: (if different from Hostinger)
- **EmailJS Support**: https://www.emailjs.com/docs/

## 🎯 Success Criteria

Your deployment is successful when:

- [ ] Website loads at https://yourdomain.com
- [ ] All pages are accessible and functional
- [ ] Blog posts display from WordPress
- [ ] Contact form sends emails successfully
- [ ] Student registration form works
- [ ] Mobile experience is smooth
- [ ] Site loads quickly (under 3 seconds)
- [ ] No console errors in browser

---

**Ready for deployment? Run: `npm run build:hostinger`**
