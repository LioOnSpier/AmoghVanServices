#!/bin/bash

# Font Download Script for Self-Hosted Assets
# This script downloads all Google Fonts locally to eliminate CDN dependencies

echo "🚀 Downloading Google Fonts for local hosting..."

# Create fonts directory
mkdir -p public/fonts
cd public/fonts

echo "📦 Downloading Inter fonts..."

# Inter Variable Font (Best option)
curl -L -o "inter-variable.woff2" "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"

# Inter Individual Weights (Fallback)
curl -L -o "inter-regular.woff2" "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2"
curl -L -o "inter-medium.woff2" "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2"
curl -L -o "inter-semibold.woff2" "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLKfAZ9hiA.woff2"
curl -L -o "inter-bold.woff2" "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"

echo "📦 Downloading Manrope fonts..."

# Manrope Variable Font (Best option)
curl -L -o "manrope-variable.woff2" "https://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk59FO_F87jxeN7B.woff2"

# Manrope Individual Weights (Fallback)
curl -L -o "manrope-regular.woff2" "https://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk6jEO_F87jxeN7B.woff2"
curl -L -o "manrope-medium.woff2" "https://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FO_F87jxeN7B.woff2"
curl -L -o "manrope-semibold.woff2" "https://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4dFO_F87jxeN7B.woff2"
curl -L -o "manrope-bold.woff2" "https://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk5dFO_F87jxeN7B.woff2"

# Go back to project root
cd ../..

echo "✅ Font downloads completed!"
echo "📋 Downloaded files:"
ls -la public/fonts/

echo ""
echo "🎉 Your website is now completely self-contained!"
echo "📁 All fonts are stored in: public/fonts/"
echo "🔧 CSS updated to use local fonts"
echo "🚀 Ready for deployment on Hostinger without any external dependencies"
