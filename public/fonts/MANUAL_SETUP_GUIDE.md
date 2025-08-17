# Manual Font Setup Guide

Since you downloaded fonts from Google Fonts, follow these steps:

## **What You Downloaded:**
- Inter font family (ZIP file with .ttf files)
- Manrope font family (ZIP file with .ttf files)

## **Steps to Set Up:**

### **1. Extract Your Downloaded Files**
- Extract the Inter ZIP → You'll get files like `Inter-Regular.ttf`, `Inter-Bold.ttf`, etc.
- Extract the Manrope ZIP → You'll get files like `Manrope-Regular.ttf`, `Manrope-Bold.ttf`, etc.

### **2. Convert TTF to WOFF2 (For Better Web Performance)**

**Option A: Use Online Converter (Easiest)**
1. Go to: https://cloudconvert.com/ttf-to-woff2
2. Upload your .ttf files
3. Convert to .woff2 format
4. Download the converted files

**Option B: Use CloudFlare Font Converter**
1. Go to: https://www.fontsquirrel.com/tools/webfont-generator
2. Upload your TTF files
3. Choose "Optimal" settings
4. Download the web font kit

### **3. Rename and Place Files**
Place these files in this directory (`public/fonts/`):

**Inter Files:**
- `Inter-Regular.woff2` → rename to `inter-regular.woff2`
- `Inter-Medium.woff2` → rename to `inter-medium.woff2`  
- `Inter-SemiBold.woff2` → rename to `inter-semibold.woff2`
- `Inter-Bold.woff2` → rename to `inter-bold.woff2`

**Manrope Files:**
- `Manrope-Regular.woff2` → rename to `manrope-regular.woff2`
- `Manrope-Medium.woff2` → rename to `manrope-medium.woff2`
- `Manrope-SemiBold.woff2` → rename to `manrope-semibold.woff2`
- `Manrope-Bold.woff2` → rename to `manrope-bold.woff2`

### **4. Quick Setup (If You Want to Skip Conversion)**
If you want to use TTF files directly (larger file size but simpler):

1. Copy your TTF files to this directory
2. Rename them to match the naming convention above (but keep .ttf extension)
3. Update the `fonts.css` file to use .ttf instead of .woff2

## **Final File Structure Should Look Like:**
```
public/fonts/
├── fonts.css
├── inter-regular.woff2 (or .ttf)
├── inter-medium.woff2 (or .ttf)
├── inter-semibold.woff2 (or .ttf)
├── inter-bold.woff2 (or .ttf)
├── manrope-regular.woff2 (or .ttf)
├── manrope-medium.woff2 (or .ttf)
├── manrope-semibold.woff2 (or .ttf)
└── manrope-bold.woff2 (or .ttf)
```

## **Test Your Setup:**
1. Run: `npm run dev`
2. Open your website
3. Check browser dev tools → Network tab
4. Look for font files being loaded from `/fonts/` instead of Google CDN
5. Success! 🎉

## **If You Have Issues:**
- Make sure file names match exactly (case-sensitive)
- Check that files are in the correct directory
- Verify the CSS import in `src/index.css` points to `/fonts/fonts.css`
