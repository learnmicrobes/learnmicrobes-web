/*
 * Adds Google image-sitemap entries to public/sitemap.xml for every Visual Atlas
 * card that carries photoReferences.
 *
 * Why: the drawn SVG boards are inline markup and cannot be indexed as images,
 * but the clinical photographs are real files with real alt text. Google Images
 * discovers those far more reliably from an image sitemap than from crawling
 * alone, and Image search is where a student who types "tuberculate
 * macroconidia" actually lands.
 *
 * The script is idempotent: it strips any <image:image> blocks it previously
 * wrote before adding them again, so rerunning it after a new photo batch is
 * safe. Run it by hand after adding photos, then commit public/sitemap.xml -
 * it is deliberately not wired into prebuild, so the committed file stays
 * stable and reviewable instead of churning on every build.
 *
 * The script does not touch <lastmod>. After a new photo batch, bump the
 * lastmod of the cards that gained photos by hand - that is the per-page
 * signal that tells a crawler to come back, and only a human knows the date.
 *
 * Usage: node scripts/build-image-sitemap.cjs
 */
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const ROOT = path.resolve(__dirname, '..');
const SITEMAP = path.join(ROOT, 'public', 'sitemap.xml');
const SITE_ORIGIN = 'https://learnmicrobes.com';
const IMAGE_NS = 'http://www.google.com/schemas/sitemap-image/1.1';

// Same loader the content index uses: these modules are plain data with
// type-only imports, so transpiling on require is enough.
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    fileName: filename,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019, esModuleInterop: true }
  });
  module._compile(outputText, filename);
};

const { atlasPages } = require(path.join(ROOT, 'src', 'data', 'atlasPages.ts'));

const escapeXml = (value) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const photosBySlug = new Map();
for (const page of atlasPages) {
  if (page.photoReferences && page.photoReferences.length > 0) {
    photosBySlug.set(page.slug, { title: page.title, photos: page.photoReferences });
  }
}

const original = fs.readFileSync(SITEMAP, 'utf8');

// Git stores this file with LF. A Windows checkout (core.autocrlf) has CRLF and
// the Linux CI runner has LF, so work in LF and write back whatever ending the
// file arrived with. Matching on '\r\n' alone made --check fail every CI run.
const eol = original.includes('\r\n') ? '\r\n' : '\n';
let xml = original.replace(/\r\n/g, '\n');

// Start from a clean slate so a rerun never duplicates or strands an entry.
xml = xml.replace(/\n {4}<image:image>[\s\S]*?<\/image:image>/g, '');

if (!xml.includes(`xmlns:image="${IMAGE_NS}"`)) {
  xml = xml.replace(
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="${IMAGE_NS}">`
  );
}

let cards = 0;
let images = 0;
const unmatched = [];

for (const [slug, { title, photos }] of photosBySlug) {
  const loc = `<loc>${SITE_ORIGIN}/visuals/${slug}</loc>`;
  const at = xml.indexOf(loc);

  if (at < 0) {
    unmatched.push(slug);
    continue;
  }

  const closeAt = xml.indexOf('\n  </url>', at);

  if (closeAt < 0) {
    unmatched.push(slug);
    continue;
  }

  // Only <image:loc> is read by Google today; <image:title> and <image:caption>
  // are still schema-valid and are used by Bing, which is a real share of the
  // Philippine traffic this is aimed at.
  const block = photos.map((photo) => [
    '',
    '    <image:image>',
    `      <image:loc>${SITE_ORIGIN}${escapeXml(photo.src)}</image:loc>`,
    `      <image:title>${escapeXml(`${title} - ${photo.stageLabel}`)}</image:title>`,
    `      <image:caption>${escapeXml(photo.alt)}</image:caption>`,
    '    </image:image>'
  ].join('\n')).join('');

  xml = xml.slice(0, closeAt) + block + xml.slice(closeAt);
  cards += 1;
  images += photos.length;
}

// --check verifies the committed file instead of rewriting it. sitemap.xml is
// deliberately committed rather than generated at build time (see the header),
// which is what keeps it reviewable - but it also means nothing notices when a
// photo batch lands and the sitemap is never regenerated. Running this in CI
// turns that silent drift into a failed build without taking the file over.
const checkOnly = process.argv.includes('--check');
const output = eol === '\n' ? xml : xml.replace(/\n/g, eol);
const drifted = output !== original;

if (drifted && !checkOnly) {
  fs.writeFileSync(SITEMAP, output);
}

console.log(
  `image sitemap: ${images} images across ${cards} atlas cards` +
    (drifted ? (checkOnly ? ' (OUT OF DATE)' : ' (written)') : ' (unchanged)')
);

if (drifted && checkOnly) {
  console.error('');
  console.error('public/sitemap.xml does not match the atlas photo data.');
  console.error('Run "npm run sitemap:images" and commit the result.');
  process.exitCode = 1;
}

if (unmatched.length > 0) {
  console.log(`\nNOT IN sitemap.xml - add the page URL first:\n  ${unmatched.join('\n  ')}`);
  process.exitCode = 1;
}
