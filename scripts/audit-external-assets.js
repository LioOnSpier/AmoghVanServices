#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

function findExternalAssets(directory) {
  const externalAssets = {
    fonts: [],
    images: [],
    apis: [],
    cdn: [],
    other: []
  };

  function scanFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Find all external URLs
      const urlPattern = /(https?:\/\/[^\s'"<>]+)/g;
      const matches = content.match(urlPattern) || [];
      
      matches.forEach(url => {
        // Categorize URLs
        if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
          externalAssets.fonts.push({ url, file: filePath });
        } else if (url.match(/\.(jpg|jpeg|png|gif|svg|webp|ico)(\?|$)/i)) {
          externalAssets.images.push({ url, file: filePath });
        } else if (url.includes('api') || url.includes('.com/v') || url.includes('rest')) {
          externalAssets.apis.push({ url, file: filePath });
        } else if (url.includes('cdn') || url.includes('jsdelivr') || url.includes('unpkg')) {
          externalAssets.cdn.push({ url, file: filePath });
        } else {
          externalAssets.other.push({ url, file: filePath });
        }
      });
    } catch (error) {
      console.log(`Error reading ${filePath}: ${error.message}`);
    }
  }

  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !file.includes('node_modules') && !file.includes('.git')) {
        scanDirectory(fullPath);
      } else if (stat.isFile() && (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css') || file.endsWith('.html'))) {
        scanFile(fullPath);
      }
    });
  }

  scanDirectory(directory);
  return externalAssets;
}

function generateReport(assets) {
  console.log('🔍 EXTERNAL ASSETS AUDIT REPORT');
  console.log('================================\n');
  
  if (assets.fonts.length > 0) {
    console.log('📝 FONTS (CDN Dependencies):');
    assets.fonts.forEach(item => {
      console.log(`  • ${item.url}`);
      console.log(`    └─ Found in: ${item.file}`);
    });
    console.log('');
  }
  
  if (assets.images.length > 0) {
    console.log('🖼️  EXTERNAL IMAGES:');
    assets.images.forEach(item => {
      console.log(`  • ${item.url}`);
      console.log(`    └─ Found in: ${item.file}`);
    });
    console.log('');
  }
  
  if (assets.cdn.length > 0) {
    console.log('📦 CDN RESOURCES:');
    assets.cdn.forEach(item => {
      console.log(`  • ${item.url}`);
      console.log(`    └─ Found in: ${item.file}`);
    });
    console.log('');
  }
  
  if (assets.apis.length > 0) {
    console.log('🌐 API ENDPOINTS:');
    assets.apis.forEach(item => {
      console.log(`  • ${item.url}`);
      console.log(`    └─ Found in: ${item.file}`);
    });
    console.log('');
  }
  
  if (assets.other.length > 0) {
    console.log('🔗 OTHER EXTERNAL URLS:');
    assets.other.forEach(item => {
      console.log(`  • ${item.url}`);
      console.log(`    └─ Found in: ${item.file}`);
    });
    console.log('');
  }
  
  const totalExternal = Object.values(assets).reduce((sum, arr) => sum + arr.length, 0);
  
  if (totalExternal === 0) {
    console.log('✅ NO EXTERNAL ASSETS FOUND! Your website is completely self-contained.');
  } else {
    console.log(`📊 SUMMARY: Found ${totalExternal} external dependencies`);
    console.log('💡 RECOMMENDATION: Download and host these assets locally for complete independence');
  }
}

// Run the audit
const projectRoot = path.join(__dirname, '..');
const assets = findExternalAssets(projectRoot);
generateReport(assets);

// Generate download recommendations
console.log('\n🚀 NEXT STEPS:');
console.log('1. Run: bash scripts/download-fonts.sh (to download Google Fonts)');
console.log('2. Review any remaining external assets above');
console.log('3. Download and host any external images/resources locally');
console.log('4. Test your website works offline');
console.log('5. Deploy to Hostinger with complete independence! 🎉');
