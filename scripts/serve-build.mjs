/*
 * Serves build/ the way GitHub Pages does, to check a pre-rendered build locally:
 * a real file, else `<path>.html`, else a folder (redirect to a trailing slash,
 * then its index.html), else 404.html with an HTTP 404.
 *
 * Usage: npm run serve:build   (PORT defaults to 4173)
 */
import { existsSync, statSync } from 'node:fs';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BUILD_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'build');
const PORT = Number(process.env.PORT) || 4173;

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8'
};

const isFile = (filePath) => existsSync(filePath) && statSync(filePath).isFile();
const isFolder = (filePath) => existsSync(filePath) && statSync(filePath).isDirectory();

const sendFile = async (response, status, filePath) => {
  response.writeHead(status, { 'Content-Type': CONTENT_TYPES[path.extname(filePath)] ?? 'application/octet-stream' });
  response.end(await fs.readFile(filePath));
};

http.createServer(async (request, response) => {
  const url = new URL(request.url, 'http://localhost');
  const pathname = decodeURIComponent(url.pathname);
  const filePath = path.join(BUILD_DIR, pathname);

  if (!filePath.startsWith(BUILD_DIR)) {
    response.writeHead(400).end();
  } else if (isFile(filePath)) {
    await sendFile(response, 200, filePath);
  } else if (!pathname.endsWith('/') && isFile(`${filePath}.html`)) {
    await sendFile(response, 200, `${filePath}.html`);
  } else if (isFolder(filePath) && !pathname.endsWith('/')) {
    response.writeHead(301, { Location: `${pathname}/${url.search}` }).end();
  } else if (isFile(path.join(filePath, 'index.html'))) {
    await sendFile(response, 200, path.join(filePath, 'index.html'));
  } else {
    await sendFile(response, 404, path.join(BUILD_DIR, '404.html'));
  }

  console.log(`${response.statusCode} ${request.url}`);
}).listen(PORT, () => {
  console.log(`Serving build/ like GitHub Pages at http://localhost:${PORT}`);
});
