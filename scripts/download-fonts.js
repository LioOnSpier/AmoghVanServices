const https = require("https");
const fs = require("fs");
const path = require("path");

// Google Fonts CSS URLs
const fontUrls = [
  "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap",
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap",
];

async function downloadFont(url, filename) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          fs.writeFileSync(
            path.join(__dirname, "../public/fonts", filename),
            data,
          );
          console.log(`Downloaded: ${filename}`);
          resolve();
        });
      })
      .on("error", reject);
  });
}

async function main() {
  // Create fonts directory
  const fontsDir = path.join(__dirname, "../public/fonts");
  if (!fs.existsSync(fontsDir)) {
    fs.mkdirSync(fontsDir, { recursive: true });
  }

  // Download font CSS files
  await downloadFont(fontUrls[0], "inter.css");
  await downloadFont(fontUrls[1], "manrope.css");

  console.log("Fonts downloaded successfully!");
  console.log("Next steps:");
  console.log("1. Replace the @import in your CSS with local imports");
  console.log("2. Download the actual font files referenced in the CSS");
}

main().catch(console.error);
