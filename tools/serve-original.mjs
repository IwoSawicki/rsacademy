/** Statischer Server für den gerenderten Original-Clone (nur lokal, für den Abgleich). */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const ROOT = process.argv[2];
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
};

createServer(async (req, res) => {
  const requested = decodeURIComponent(req.url.split('?')[0]);
  const path = requested === '/' ? '/index.html' : requested;
  try {
    const file = await readFile(join(ROOT, path));
    res.writeHead(200, { 'Content-Type': TYPES[extname(path)] ?? 'application/octet-stream' });
    res.end(file);
  } catch {
    res.writeHead(404).end('not found');
  }
}).listen(8090, '127.0.0.1', () => console.log('original auf :8090'));
