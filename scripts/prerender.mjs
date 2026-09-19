/**
 * Build-time prerendering.
 *
 * The site is a Vite SPA, so `dist/index.html` ships an empty `<div id="root">`
 * and every word of content is produced by JavaScript after load. Search
 * crawlers that execute JS eventually see the page; the AdSense content
 * reviewer and most social scrapers do not. That is why the site read as
 * "low value content" despite having content.
 *
 * This script serves the built `dist`, visits every route in a real browser,
 * waits for the app (and any Firestore data) to settle, and writes the fully
 * rendered HTML back to `dist/<route>/index.html`.
 *
 * Apache then serves those files directly: `dist/about/index.html` makes
 * `/about` a real directory, so the SPA rewrite in public/.htaccess does not
 * fire. Users still get the normal SPA once React hydrates.
 *
 * Run automatically as part of `npm run build`.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const PORT = 4188;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

/** Static SPA server: real files when they exist, index.html otherwise. */
function createServer() {
  return http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    let filePath = path.join(DIST, urlPath);

    if (!filePath.startsWith(DIST)) {
      res.writeHead(403).end("Forbidden");
      return;
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
    if (!fs.existsSync(filePath)) {
      filePath = path.join(DIST, "index.html");
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
  });
}

/** Routes that must never be prerendered or indexed. */
const EXCLUDED = [/^\/admin/];

/**
 * Read the blog slugs to prerender.
 *
 * Bundled guides come from the repo. Firestore posts are fetched via the REST
 * API, which needs no credentials because the security rules make Published
 * posts publicly readable. A Firestore outage degrades to "static guides only"
 * rather than failing the build.
 */
async function collectBlogSlugs() {
  const slugs = new Set();

  const articlesDir = path.join(ROOT, "src", "content", "articles");
  if (fs.existsSync(articlesDir)) {
    for (const file of fs.readdirSync(articlesDir)) {
      if (file === "index.ts" || !file.endsWith(".ts")) continue;
      const src = fs.readFileSync(path.join(articlesDir, file), "utf8");
      const match = src.match(/slug:\s*"([^"]+)"/);
      if (match) slugs.add(match[1]);
    }
  }
  console.log(`  bundled guides: ${slugs.size}`);

  const projectId = process.env.VITE_FIREBASE_PROJECT_ID || "amoghvanservices-b2a4b";
  const endpoint = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`;

  // A plain collection list is refused (403): the security rules only permit
  // reading documents whose status is "Published", so the query has to carry
  // that filter for the rules engine to accept it.
  const body = {
    structuredQuery: {
      from: [{ collectionId: "blogs" }],
      where: {
        fieldFilter: {
          field: { fieldPath: "status" },
          op: "EQUAL",
          value: { stringValue: "Published" },
        },
      },
    },
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = await res.json();
    let published = 0;
    for (const row of rows) {
      const slug = row?.document?.fields?.slug?.stringValue;
      if (slug) {
        slugs.add(slug);
        published += 1;
      }
    }
    console.log(`  firestore posts: ${published}`);
  } catch (err) {
    console.warn(`  ! could not reach Firestore (${err.message}); bundled guides only`);
  }

  return [...slugs];
}

async function main() {
  if (!fs.existsSync(path.join(DIST, "index.html"))) {
    console.error("dist/index.html not found — run the Vite build first.");
    process.exit(1);
  }

  console.log("\nCollecting routes…");
  const blogSlugs = await collectBlogSlugs();

  const routes = [
    "/",
    "/about",
    "/services",
    "/gallery",
    "/blog",
    "/contact",
    "/register",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
    ...blogSlugs.map((s) => `/blog/${s}`),
  ].filter((r) => !EXCLUDED.some((re) => re.test(r)));

  const server = createServer();
  await new Promise((resolve) => server.listen(PORT, resolve));

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  console.log(`\nPrerendering ${routes.length} routes…\n`);
  let ok = 0;
  const failed = [];

  for (const route of routes) {
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1280, height: 900 });

      // The Firebase SDK holds a connection open, so "networkidle0" never
      // fires on any page that touches Firestore. Wait for the DOM instead,
      // then for the app to finish painting its loading state.
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });

      await page
        .waitForFunction(
          () => {
            const root = document.getElementById("root");
            if (!root || root.children.length === 0) return false;
            const text = root.innerText || "";
            if (/Loading blog posts|Loading…|Loading\.\.\./i.test(text)) return false;
            return text.trim().length > 200;
          },
          { timeout: 30000 }
        )
        .catch(() => {});

      // Let any late render settle before capturing.
      await new Promise((r) => setTimeout(r, 1200));

      const html = await page.content();
      const text = await page.evaluate(
        () => document.getElementById("root")?.innerText || ""
      );
      const words = text.split(/\s+/).filter(Boolean).length;

      if (words < 40) {
        failed.push(`${route} (only ${words} words rendered)`);
        console.log(`  ✗ ${route} — ${words} words`);
      } else {
        const outDir =
          route === "/" ? DIST : path.join(DIST, ...route.split("/").filter(Boolean));
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
        ok += 1;
        console.log(`  ✓ ${route} — ${words} words`);
      }
    } catch (err) {
      failed.push(`${route} (${err.message})`);
      console.log(`  ✗ ${route} — ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log(`\nPrerendered ${ok}/${routes.length} routes.`);
  if (failed.length) {
    console.log("\nFailed:");
    failed.forEach((f) => console.log(`  - ${f}`));
    process.exit(1);
  }

  writeSitemap(routes);
}

/** Regenerate sitemap.xml so it always matches what was actually prerendered. */
function writeSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const priority = (r) => {
    if (r === "/") return "1.0";
    if (r === "/blog" || r === "/register") return "0.9";
    if (r.startsWith("/blog/")) return "0.7";
    if (["/privacy-policy", "/terms", "/disclaimer"].includes(r)) return "0.3";
    return "0.8";
  };
  const changefreq = (r) =>
    r === "/" || r === "/blog" ? "weekly" : r.startsWith("/blog/") ? "monthly" : "monthly";

  const urls = routes
    .map(
      (r) => `  <url>
    <loc>https://amoghvanservices.in${r === "/" ? "/" : r}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq(r)}</changefreq>
    <priority>${priority(r)}</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  fs.writeFileSync(path.join(DIST, "sitemap.xml"), xml, "utf8");
  fs.writeFileSync(path.join(ROOT, "public", "sitemap.xml"), xml, "utf8");
  console.log(`\nSitemap written with ${routes.length} URLs.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
