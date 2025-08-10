# WordPress Setup Guide for Hostinger

This guide walks you through setting up WordPress on Hostinger to work with your Amogh Van/Bus Services website.

## Step 1: Access Hostinger Control Panel

1. Go to https://hpanel.hostinger.com
2. Login with your Hostinger credentials
3. Select your domain from the websites list

## Step 2: Install WordPress

### Option A: Auto-Installer (Recommended)

1. **Navigate to Auto-Installer**
   - Click "Manage" next to your domain
   - Go to "Website" section
   - Click "Auto Installer"

2. **Select WordPress**
   - Find "WordPress" in the CMS section
   - Click "Select"

3. **Configure Installation**
   ```
   Installation URL: yourdomain.com/blog
   Admin Username: admin (or your preferred username)
   Admin Password: [Create strong password]
   Admin Email: kharwaramog02@gmail.com
   Website Title: Amogh Van/Bus Services Blog
   Website Description: Latest news and updates from Mumbai's trusted school transportation service
   ```

4. **Complete Installation**
   - Click "Install"
   - Wait for installation to complete
   - Note down the admin URL and credentials

### Option B: Manual Installation

1. **Download WordPress**
   - Go to https://wordpress.org/download/
   - Download latest version

2. **Upload via File Manager**
   - Hostinger Control Panel > File Manager
   - Navigate to public_html/
   - Create folder "blog"
   - Upload and extract WordPress files

3. **Create Database**
   - Go to "Databases" > "MySQL Databases"
   - Create new database for WordPress
   - Note database name, username, and password

4. **Run WordPress Installation**
   - Visit yourdomain.com/blog
   - Follow setup wizard

## Step 3: Configure WordPress for API Access

### 3.1 Basic Settings

1. **Login to WordPress Admin**
   - Go to yourdomain.com/blog/wp-admin
   - Login with your credentials

2. **General Settings**
   ```
   Site Title: Amogh Van/Bus Services Blog
   Tagline: Mumbai's Trusted School Transportation News
   WordPress Address (URL): https://yourdomain.com/blog
   Site Address (URL): https://yourdomain.com/blog
   Email Address: kharwaramog02@gmail.com
   Timezone: Asia/Kolkata
   Date Format: F j, Y
   Time Format: g:i a
   ```

### 3.2 Permalink Structure

1. **Go to Settings > Permalinks**
2. **Select "Post name"**
   - This creates SEO-friendly URLs
   - Required for REST API to work properly
3. **Click "Save Changes"**

### 3.3 Enable REST API

WordPress REST API is enabled by default, but verify:

1. **Test API Access**
   - Visit: `https://yourdomain.com/blog/wp-json/wp/v2/posts`
   - Should return JSON data (even if empty)

2. **If API is blocked, add to functions.php:**
   ```php
   // Enable REST API
   add_filter('rest_enabled', '__return_true');
   add_filter('rest_jsonp_enabled', '__return_true');
   ```

## Step 4: Configure CORS (If Needed)

### 4.1 Add CORS Headers

Add this to your active theme's `functions.php` file:

```php
<?php
// Add CORS support for REST API
function add_cors_http_header(){
    // Allow your website domain
    header("Access-Control-Allow-Origin: https://yourdomain.com");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
}
add_action('init','add_cors_http_header');

// Enable CORS for REST API
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: https://yourdomain.com');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
}, 15);
?>
```

### 4.2 Alternative: Plugin Method

Install "REST API CORS" plugin if manual method doesn't work.

## Step 5: Create Sample Content

### 5.1 Create Categories

1. **Go to Posts > Categories**
2. **Create these categories:**
   ```
   - Safety Tips
   - Service Updates
   - News & Events
   - Parent Resources
   - School Transportation
   ```

### 5.2 Create Sample Posts

Create a few sample blog posts to test the integration:

**Post 1: "Safe School Transportation: Our Commitment to Your Child's Safety"**
```
Category: Safety Tips
Content: Write about safety measures, trained drivers, GPS tracking, etc.
Featured Image: Upload a school bus image
```

**Post 2: "New Routes Added in Prabhadevi Area"**
```
Category: Service Updates
Content: Announce new service areas and route expansions
```

## Step 6: Install Recommended Plugins

### 6.1 Essential Plugins

1. **LiteSpeed Cache**
   - Pre-installed on Hostinger
   - Improves website speed

2. **Yoast SEO**
   - SEO optimization
   - Helps with search rankings

3. **Wordfence Security**
   - Security monitoring
   - Firewall protection

### 6.2 Optional Plugins

1. **Classic Editor** (if you prefer the old editor)
2. **WP Super Cache** (alternative to LiteSpeed)
3. **Contact Form 7** (additional contact forms)

## Step 7: Configure Theme

### 7.1 Choose a Theme

1. **Go to Appearance > Themes**
2. **Recommended themes:**
   - Twenty Twenty-Three (default)
   - Astra (lightweight)
   - GeneratePress (fast loading)

### 7.2 Customize Theme

1. **Go to Appearance > Customize**
2. **Configure:**
   ```
   Site Identity: Add logo and site description
   Colors: Match your website color scheme
   Typography: Choose readable fonts
   Header/Footer: Add contact information
   ```

## Step 8: Test Integration

### 8.1 Test REST API

1. **Check API Response:**
   ```bash
   curl https://yourdomain.com/blog/wp-json/wp/v2/posts
   ```

2. **Expected Response:**
   - JSON array of posts
   - Each post has title, content, excerpt, date, etc.

### 8.2 Test RSS Feed

1. **Check RSS Feed:**
   ```
   https://yourdomain.com/blog/feed/
   ```

2. **Should display XML feed**

### 8.3 Test Website Integration

1. **Build and deploy your React website**
2. **Navigate to Blog page**
3. **Verify posts are loading**
4. **Test individual post pages**

## Step 9: Security & Maintenance

### 9.1 Security Settings

1. **Change default admin username** (not "admin")
2. **Use strong passwords**
3. **Limit login attempts**
4. **Keep WordPress updated**

### 9.2 Backup Setup

1. **Enable automatic backups in Hostinger**
2. **Or install backup plugin**
3. **Test restore process**

### 9.3 Regular Maintenance

1. **Update WordPress core monthly**
2. **Update plugins/themes regularly**
3. **Monitor security logs**
4. **Check website speed**

## Troubleshooting

### Common Issues

1. **REST API Returns 404**
   - Check permalink structure
   - Ensure .htaccess is writable
   - Check for plugin conflicts

2. **CORS Errors**
   - Add CORS headers to functions.php
   - Check domain spelling in headers
   - Use RSS fallback (already implemented)

3. **Posts Not Appearing**
   - Check post status (published vs draft)
   - Verify API endpoint URL
   - Check for caching issues

4. **Slow Loading**
   - Enable caching plugins
   - Optimize images
   - Use CDN (Hostinger provides)

## WordPress Admin URLs

After setup, save these URLs:

```
WordPress Admin: https://yourdomain.com/blog/wp-admin/
REST API Posts: https://yourdomain.com/blog/wp-json/wp/v2/posts
RSS Feed: https://yourdomain.com/blog/feed/
Login URL: https://yourdomain.com/blog/wp-login.php
```

## Content Strategy

### Blog Post Ideas

1. **Safety Topics**
   - School bus safety tips
   - Driver training programs
   - GPS tracking benefits

2. **Service Updates**
   - New routes announcement
   - Schedule changes
   - Service improvements

3. **Parent Resources**
   - Registration process guide
   - Emergency procedures
   - Contact information updates

4. **Company News**
   - Awards and recognition
   - Community involvement
   - Staff introductions

Your WordPress blog is now ready to work with your Amogh Van/Bus Services website!
