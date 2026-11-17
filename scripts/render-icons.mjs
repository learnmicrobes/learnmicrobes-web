/**
 * Renders the site icons from public/favicon.svg with headless Chrome, the same
 * browser the prerender step already uses. No new dependency.
 *
 *   apple-touch-icon.png  180  full bleed (iOS rounds the corners itself)
 *   icon-192.png          192  full bleed
 *   icon-512.png          512  full bleed
 *   icon-maskable-512.png 512  artwork inset to the maskable safe zone
 */
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const BROWSER_CANDIDATES = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe'
];

const ROOT = process.cwd();
const svg = await readFile(path.join(ROOT, 'public/favicon.svg'), 'utf8');

// The tile in favicon.svg is rounded, because a browser draws that file
// unmasked in a tab. Every rasterised app icon below strips the rounding:
// iOS masks a web clip with a superellipse ~22.4% of the tile, the baked
// corner was 17.2%, and the difference showed as a wedge of flat tile colour
// in each corner - lightest exactly where the gradient should be darkest.
const squareTile = (markup) => markup.replace(/ rx="14"/g, '');

// For the maskable icon the artwork shrinks but the tile must not, or the
// inset leaves a flat border around a gradient square. Dropping the tile
// rects and letting the page paint the gradient full bleed keeps one
// continuous background behind the smaller mark.
const artworkOnly = (markup) => markup.replace(/<rect width="64" height="64"[^>]*\/>\s*/g, '');

// Same geometry as the SVG gradient: corner to corner, teal-600 -> teal-900.
const TILE = 'linear-gradient(135deg, #245c69, #1a3d3a)';

const targets = [
  { file: 'apple-touch-icon.png', size: 180, scale: 1 },
  { file: 'icon-192.png', size: 192, scale: 1 },
  { file: 'icon-512.png', size: 512, scale: 1 },
  // Android may crop up to 10% off each edge of a maskable icon, so the artwork
  // shrinks to 80% and the tile colour fills the rest.
  { file: 'icon-maskable-512.png', size: 512, scale: 0.8 }
];

const executablePath = BROWSER_CANDIDATES.find((c) => c && existsSync(c));
if (!executablePath) throw new Error('No Chrome or Edge found. Set PUPPETEER_EXECUTABLE_PATH.');

const browser = await puppeteer.launch({ executablePath, headless: true });

for (const target of targets) {
  const page = await browser.newPage();
  await page.setViewport({ width: target.size, height: target.size, deviceScaleFactor: 1 });

  const source = target.scale === 1 ? squareTile(svg) : artworkOnly(svg);
  const inner = target.scale === 1
    ? source.replace('<svg ', `<svg width="${target.size}" height="${target.size}" `)
    : `<div class="pad">${source.replace('<svg ', `<svg width="${Math.round(target.size * target.scale)}" height="${Math.round(target.size * target.scale)}" `)}</div>`;

  await page.setContent(`<!doctype html><html><head><style>
    html,body{margin:0;padding:0;width:${target.size}px;height:${target.size}px;overflow:hidden;background:${TILE}}
    svg{display:block}
    .pad{width:${target.size}px;height:${target.size}px;display:flex;align-items:center;justify-content:center}
  </style></head><body>${inner}</body></html>`, { waitUntil: 'load' });

  const buffer = await page.screenshot({ type: 'png', omitBackground: false });
  await writeFile(path.join(ROOT, 'public', target.file), buffer);
  await page.close();
  console.log('wrote', target.file, target.size + 'px', target.scale === 1 ? 'full bleed' : 'safe-zone inset');
}

// favicon.ico carries 16, 32 and 48 as PNG payloads. The .ico container allows
// PNG entries and every browser that reads .ico at all supports them.
const icoSizes = [16, 32, 48];
const icoParts = [];

for (const size of icoSizes) {
  const page = await browser.newPage();
  await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  const sized = svg.replace('<svg ', '<svg width="' + size + '" height="' + size + '" ');
  await page.setContent(
    '<!doctype html><html><head><style>html,body{margin:0;padding:0;width:' + size +
    'px;height:' + size + 'px;overflow:hidden;background:' + TILE + '}svg{display:block}</style></head><body>' +
    sized + '</body></html>',
    { waitUntil: 'load' }
  );
  icoParts.push({ size, data: await page.screenshot({ type: 'png' }) });
  await page.close();
}

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(icoParts.length, 4);

let offset = 6 + icoParts.length * 16;
const entries = [];

for (const part of icoParts) {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(part.size, 0); // width
  entry.writeUInt8(part.size, 1); // height
  entry.writeUInt8(0, 2); // palette colours
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(part.data.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += part.data.length;
  entries.push(entry);
}

await writeFile(
  path.join(ROOT, 'public/favicon.ico'),
  Buffer.concat([header, ...entries, ...icoParts.map((part) => part.data)])
);
console.log('wrote favicon.ico', icoSizes.join('/'));

await browser.close();
