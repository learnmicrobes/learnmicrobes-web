/*
 * Pre-renders every public route of the production build into static HTML.
 *
 * Why: GitHub Pages only knows the files in build/. Without this step every
 * route except "/" is answered by 404.html with an HTTP 404, so search engines
 * never index it and non-JavaScript crawlers see a blank redirect page.
 * GitHub Pages serves `learn/gram-stain.html` at `/learn/gram-stain` with a
 * 200, so one file per route fixes indexing without changing hosting.
 *
 * Routes come from sitemap.xml, plus every same-site link found on the rendered
 * pages. A page that fails to render simply keeps the old 404-redirect
 * behaviour, so a partial run never makes the site worse.
 *
 * Usage (after `npm run build`): npm run prerender
 * Browser: set PUPPETEER_EXECUTABLE_PATH, or a local Chrome/Edge is found.
 */
import { existsSync, statSync } from 'node:fs';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BUILD_DIR = path.join(ROOT, 'build');
const SITE_ORIGIN = 'https://learnmicrobes.com';
const CONCURRENCY = 4;
const MAX_ROUTES = 1000;
const NAV_TIMEOUT_MS = 45000;

// Not in the sitemap, but visited directly (auth emails, links shared on social).
const EXTRA_ROUTES = ['/auth', '/login', '/register', '/account', '/join-alpha'];

// Keep analytics out of GA4, and skip assets that never change the markup.
const BLOCKED_REQUEST = /googletagmanager\.com|google-analytics\.com|doubleclick\.net/;
const SKIPPED_RESOURCE_TYPES = new Set(['image', 'media', 'font']);

const BROWSER_CANDIDATES = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  process.env.CHROME_PATH,
  process.env.CHROME_BIN,
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
];

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.map': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2'
};

const isFile = (filePath) => existsSync(filePath) && statSync(filePath).isFile();

const normalizeRoute = (pathname) => pathname.replace(/(.)\/+$/, '$1');

// Serves real build files, and the untouched SPA shell for every app route, so
// each page is rendered from scratch rather than from an earlier pre-render.
const startServer = (shellHtml) => new Promise((resolve) => {
  const server = http.createServer(async (request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const filePath = path.join(BUILD_DIR, pathname);

    if (pathname !== '/' && filePath.startsWith(BUILD_DIR) && isFile(filePath)) {
      response.writeHead(200, { 'Content-Type': CONTENT_TYPES[path.extname(filePath)] ?? 'application/octet-stream' });
      response.end(await fs.readFile(filePath));
      return;
    }

    response.writeHead(200, { 'Content-Type': CONTENT_TYPES['.html'] });
    response.end(shellHtml);
  });

  server.listen(0, '127.0.0.1', () => resolve(server));
});

const renderRoute = async (browser, origin, route, shellScriptSrcs) => {
  const page = await browser.newPage();
  const errors = [];

  try {
    await page.setBypassServiceWorker(true);
    // The app's first render is its desktop layout (isMobile starts false), so
    // matching it keeps the swap from static HTML to React invisible.
    await page.setViewport({ width: 1280, height: 900 });
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (BLOCKED_REQUEST.test(request.url()) || SKIPPED_RESOURCE_TYPES.has(request.resourceType())) {
        request.abort();
      } else {
        request.continue();
      }
    });
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto(`${origin}${route}`, { waitUntil: 'networkidle0', timeout: NAV_TIMEOUT_MS });
    await page.waitForFunction(() => (document.getElementById('root')?.childElementCount ?? 0) > 0, { timeout: 10000 });
    // Title, description and canonical are set in effects; let them flush.
    await new Promise((resolve) => setTimeout(resolve, 250));

    const snapshot = await page.evaluate((keepScriptSrcs) => {
      // webpack adds lazy-chunk <script> tags at runtime. Baked into static HTML
      // they would block parsing, so keep only the scripts the shell shipped with.
      document.querySelectorAll('script[src]').forEach((script) => {
        if (!keepScriptSrcs.includes(script.getAttribute('src'))) {
          script.remove();
        }
      });

      return {
        pathname: window.location.pathname,
        notFound: Boolean(document.querySelector('.not-found-container, .learn-not-found')),
        robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '',
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
        title: document.title,
        links: Array.from(document.querySelectorAll('a[href]'), (anchor) => anchor.href),
        html: `<!DOCTYPE html>\n${document.documentElement.outerHTML}`
      };
    }, shellScriptSrcs);

    return { ...snapshot, errors };
  } finally {
    await page.close();
  }
};

const main = async () => {
  const startedAt = Date.now();
  const shellHtml = await fs.readFile(path.join(BUILD_DIR, 'index.html'), 'utf8');
  const shellScriptSrcs = Array.from(shellHtml.matchAll(/<script[^>]*\ssrc="([^"]+)"/g), (match) => match[1]);
  const sitemapXml = await fs.readFile(path.join(BUILD_DIR, 'sitemap.xml'), 'utf8');
  const sitemapRoutes = Array.from(sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => normalizeRoute(new URL(match[1]).pathname));
  const sitemapSet = new Set(sitemapRoutes);

  const executablePath = BROWSER_CANDIDATES.find((candidate) => candidate && existsSync(candidate));
  if (!executablePath) {
    throw new Error('No Chrome or Edge found. Set PUPPETEER_EXECUTABLE_PATH.');
  }

  const server = await startServer(shellHtml);
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    // GitHub's Ubuntu runners block Chrome's user-namespace sandbox. Only our own
    // local build is loaded, so running without it there is safe.
    args: process.env.CI ? ['--no-sandbox', '--disable-setuid-sandbox'] : []
  });

  const queue = [...new Set(['/', ...sitemapRoutes, ...EXTRA_ROUTES])];
  const seen = new Set(queue);
  const results = new Map();
  let cursor = 0;

  const worker = async () => {
    while (cursor < queue.length) {
      const route = queue[cursor];
      cursor += 1;

      try {
        const rendered = await renderRoute(browser, origin, route, shellScriptSrcs);
        results.set(route, rendered);

        rendered.links.forEach((href) => {
          const url = new URL(href);
          const linkedRoute = normalizeRoute(url.pathname);

          if (url.origin === origin && !path.extname(linkedRoute) && !seen.has(linkedRoute) && seen.size < MAX_ROUTES) {
            seen.add(linkedRoute);
            queue.push(linkedRoute);
          }
        });
      } catch (error) {
        results.set(route, { failed: error.message });
      }
    }
  };

  try {
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  } finally {
    await browser.close();
    server.close();
  }

  const pages = [];
  const skipped = [];
  const failed = [];
  const withErrors = [];

  results.forEach((result, route) => {
    if (result.failed) {
      failed.push(`${route}: ${result.failed}`);
    } else if (result.notFound) {
      skipped.push(`${route} (renders the not-found page)`);
    } else if (normalizeRoute(result.pathname) !== route) {
      skipped.push(`${route} (redirects to ${result.pathname})`);
    } else {
      pages.push({ route, ...result });
    }

    if (result.errors?.length) {
      withErrors.push(`${route}: ${result.errors[0]}`);
    }
  });

  // /learn is both a page and the folder holding /learn/gram-stain. Writing
  // learn.html and learn/index.html serves it whichever way GitHub Pages resolves it.
  const folders = new Set();
  pages.forEach(({ route }) => {
    const segments = route.split('/').filter(Boolean);
    for (let depth = 1; depth < segments.length; depth += 1) {
      folders.add(`/${segments.slice(0, depth).join('/')}`);
    }
  });

  await Promise.all(pages.flatMap(({ route, html }) => {
    const files = route === '/'
      ? ['index.html']
      : [`${route.slice(1)}.html`, ...(folders.has(route) ? [`${route.slice(1)}/index.html`] : [])];

    return files.map(async (file) => {
      const target = path.join(BUILD_DIR, file);
      await fs.mkdir(path.dirname(target), { recursive: true });
      await fs.writeFile(target, html);
    });
  }));

  // A page that points its canonical elsewhere is a duplicate, not a page to list.
  const indexable = pages.filter((page) => (
    !page.robots.includes('noindex') && normalizeRoute(new URL(page.canonical, SITE_ORIGIN).pathname) === page.route
  ));
  const titleCounts = new Map();
  indexable.forEach(({ route, title }) => titleCounts.set(title, [...(titleCounts.get(title) ?? []), route]));
  const duplicateTitles = [...titleCounts].filter(([, routes]) => routes.length > 1);
  const missingFromSitemap = indexable.map(({ route }) => route).filter((route) => !sitemapSet.has(route)).sort();
  const brokenSitemapEntries = sitemapRoutes.filter((route) => !indexable.some((page) => page.route === route));

  // Atlas cards and Learn topics are added in code far more often than
  // public/sitemap.xml is edited, so the deployed copy lists every indexable page.
  if (missingFromSitemap.length) {
    const entries = missingFromSitemap.map((route) => `  <url>\n    <loc>${SITE_ORIGIN}${route}</loc>\n  </url>\n`).join('');
    await fs.writeFile(path.join(BUILD_DIR, 'sitemap.xml'), sitemapXml.replace('</urlset>', `${entries}</urlset>`));
  }

  const printList = (heading, items) => {
    if (items.length) {
      console.log(`\n${heading} (${items.length}):`);
      items.forEach((item) => console.log(`  ${item}`));
    }
  };

  console.log(`Pre-rendered ${pages.length} pages (${indexable.length} indexable) in ${Math.round((Date.now() - startedAt) / 1000)}s.`);
  printList('Failed to render, left on the 404 redirect', failed);
  printList('Skipped', skipped);
  printList('Sitemap entries that are not indexable pages', brokenSitemapEntries);
  printList('Added to the deployed sitemap.xml (not in public/sitemap.xml)', missingFromSitemap);
  printList('Titles shared by more than one page', duplicateTitles.map(([title, routes]) => `"${title}": ${routes.join(', ')}`));
  printList('Pages with runtime errors', withErrors);

  if (!pages.some(({ route }) => route === '/')) {
    throw new Error('The homepage did not pre-render; refusing to ship a partial build.');
  }
};

main().catch((error) => {
  console.error(`\nPre-render failed: ${error.message}`);
  process.exit(1);
});
