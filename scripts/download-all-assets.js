#!/usr/bin/env node

const https = require("https");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

// Create directories
const fontsDir = path.join(__dirname, "../public/fonts");
const assetsDir = path.join(__dirname, "../public/assets");

// Ensure directories exist
[fontsDir, assetsDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Font configurations
const fonts = {
  inter: {
    name: "Inter",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    url: "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap",
  },
  manrope: {
    name: "Manrope",
    weights: [200, 300, 400, 500, 600, 700, 800],
    url: "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap",
  },
};

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading: ${url}`);
    https
      .get(url, (res) => {
        if (res.statusCode === 302 || res.statusCode === 301) {
          // Follow redirect
          return downloadFile(res.headers.location, filepath)
            .then(resolve)
            .catch(reject);
        }

        if (res.statusCode !== 200) {
          reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
          return;
        }

        const fileStream = fs.createWriteStream(filepath);
        res.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          console.log(`✅ Downloaded: ${path.basename(filepath)}`);
          resolve();
        });

        fileStream.on("error", reject);
      })
      .on("error", reject);
  });
}

function fetchGoogleFontsCss(url) {
  return new Promise((resolve, reject) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          },
        },
        (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => resolve(data));
        },
      )
      .on("error", reject);
  });
}

async function downloadGoogleFonts() {
  console.log("📦 Downloading Google Fonts...\n");

  for (const [key, font] of Object.entries(fonts)) {
    console.log(`Processing ${font.name}...`);

    try {
      // Get CSS with font URLs
      const css = await fetchGoogleFontsCss(font.url);

      // Extract font URLs from CSS
      const fontUrls = css.match(/url\(([^)]+)\)/g);

      if (!fontUrls) {
        console.log(`❌ No font URLs found for ${font.name}`);
        continue;
      }

      // Download each font file
      for (let i = 0; i < fontUrls.length; i++) {
        const urlMatch = fontUrls[i].match(/url\(([^)]+)\)/);
        if (urlMatch) {
          const fontUrl = urlMatch[1];
          const urlObj = new URL(fontUrl);
          const filename = `${key}-${i}.woff2`;
          const filepath = path.join(fontsDir, filename);

          try {
            await downloadFile(fontUrl, filepath);
          } catch (error) {
            console.log(`❌ Failed to download ${filename}: ${error.message}`);
          }
        }
      }

      // Create local CSS for this font
      const localCss = generateLocalFontCss(font, key, css);
      fs.writeFileSync(path.join(fontsDir, `${key}.css`), localCss);
      console.log(`✅ Created local CSS for ${font.name}\n`);
    } catch (error) {
      console.log(`❌ Error processing ${font.name}: ${error.message}\n`);
    }
  }
}

function generateLocalFontCss(font, key, originalCss) {
  // Extract font-face declarations and replace URLs with local paths
  let localCss = originalCss;

  // Replace Google Fonts URLs with local paths
  let fileIndex = 0;
  localCss = localCss.replace(/url\([^)]+\)/g, () => {
    return `url('/fonts/${key}-${fileIndex++}.woff2')`;
  });

  return localCss;
}

async function createMainFontsFile() {
  console.log("📝 Creating main fonts.css file...");

  const mainFontsContent = `/* Local Google Fonts */
/* This file replaces the Google Fonts CDN import */

/* Inter Font */
@import url('/fonts/inter.css');

/* Manrope Font */
@import url('/fonts/manrope.css');

/* Font display optimization */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/inter-variable.woff2') format('woff2-variations');
}

@font-face {
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 200 800;
  font-display: swap;
  src: url('/fonts/manrope-variable.woff2') format('woff2-variations');
}`;

  fs.writeFileSync(path.join(fontsDir, "fonts.css"), mainFontsContent);
  console.log("✅ Created main fonts.css file");
}

async function updateIndexCss() {
  console.log("🔄 Updating src/index.css...");

  const indexCssPath = path.join(__dirname, "../src/index.css");
  let content = fs.readFileSync(indexCssPath, "utf8");

  // Replace Google Fonts import with local import
  const googleFontsImport =
    '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Manrope:wght@200..800&display=swap");';
  const localFontsImport = '@import url("/fonts/fonts.css");';

  if (content.includes(googleFontsImport)) {
    content = content.replace(googleFontsImport, localFontsImport);
    fs.writeFileSync(indexCssPath, content);
    console.log("✅ Updated src/index.css to use local fonts");
  } else {
    console.log("⚠️ Google Fonts import not found in src/index.css");
  }
}

async function downloadVariableFonts() {
  console.log("📦 Downloading variable font files...\n");

  // Direct links to variable font files
  const variableFonts = [
    {
      url: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
      filename: "inter-variable.woff2",
    },
    {
      url: "https://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk59FO_F87jxeN7B.woff2",
      filename: "manrope-variable.woff2",
    },
  ];

  for (const font of variableFonts) {
    try {
      await downloadFile(font.url, path.join(fontsDir, font.filename));
    } catch (error) {
      console.log(`❌ Failed to download ${font.filename}: ${error.message}`);
    }
  }
}

async function main() {
  console.log("🚀 Starting asset download process...\n");

  try {
    await downloadGoogleFonts();
    await downloadVariableFonts();
    await createMainFontsFile();
    await updateIndexCss();

    console.log("\n✅ All assets downloaded successfully!");
    console.log("\n📋 Summary:");
    console.log("- Google Fonts downloaded to public/fonts/");
    console.log("- Local fonts.css created");
    console.log("- src/index.css updated to use local fonts");
    console.log("\n🎉 Your website is now completely self-contained!");
  } catch (error) {
    console.error("❌ Error during download process:", error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { downloadGoogleFonts, createMainFontsFile, updateIndexCss };
