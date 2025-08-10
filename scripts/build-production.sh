#!/bin/bash

# Production Build Script for Hostinger Deployment
# This script builds the project for production deployment

echo "🚀 Starting production build for Hostinger deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Build for production
echo "🏗️ Building for production..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# Copy additional files
echo "📁 Copying additional files..."
cp public/.htaccess dist/ 2>/dev/null || echo "⚠️ .htaccess not found, skipping..."
cp public/robots.txt dist/ 2>/dev/null || echo "⚠️ robots.txt not found, skipping..."
cp public/sitemap.xml dist/ 2>/dev/null || echo "⚠️ sitemap.xml not found, skipping..."

# Create deployment info
echo "📝 Creating deployment info..."
cat > dist/deployment-info.txt << EOF
Deployment Information
=====================
Build Date: $(date)
Build Environment: Production
Project: Amogh Van/Bus Services
Target: Hostinger Hosting

Files to upload to /public_html/:
- All contents of this dist folder
- Ensure .htaccess is uploaded for React Router support

WordPress Setup:
- Install WordPress in /public_html/blog/
- Update environment variables with your domain
- Test API: https://yourdomain.com/blog/wp-json/wp/v2/posts
EOF

echo "✅ Production build completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Upload contents of 'dist' folder to your Hostinger /public_html/ directory"
echo "2. Install WordPress in /public_html/blog/ directory"
echo "3. Update .env.production with your actual domain"
echo "4. Test the website: https://yourdomain.com"
echo ""
echo "📁 Build output location: ./dist/"
echo "📖 Full deployment guide: ./HOSTINGER_DEPLOYMENT_GUIDE.md"
