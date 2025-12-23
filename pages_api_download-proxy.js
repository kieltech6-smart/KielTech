// pages/api/download-proxy.js
// Proxy the GitHub Release asset and stream it to the client.
// This lets you set download headers and increment a download counter.
//
// Note: This uses the public GitHub release URL (no token needed). For private releases
// you'd add an Authorization header with a token stored as an env secret.

import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);

// Replace with your release URL (provided)
const RELEASE_URL = 'https://github.com/kieltech6-smart/KielTech/releases/download/v1.0.0/app-release.apk';
// Optional: filename offered to clients
const OUT_FILENAME = 'kieltech-ai.apk';
const COUNTER_FILE = path.join(process.cwd(), 'data', 'download-count.json');

function ensureCounterFile() {
  try {
    const dir = path.dirname(COUNTER_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(COUNTER_FILE)) fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count: 0 }), 'utf8');
  } catch (err) {
    console.warn('Could not ensure counter file:', err);
  }
}

function incrementCounter() {
  try {
    ensureCounterFile();
    const json = JSON.parse(fs.readFileSync(COUNTER_FILE, 'utf8'));
    json.count = (json.count || 0) + 1;
    fs.writeFileSync(COUNTER_FILE, JSON.stringify(json), 'utf8');
  } catch (err) {
    console.warn('Failed to increment download count', err);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // Fetch remote asset
    const r = await fetch(RELEASE_URL);
    if (!r.ok) {
      console.error('Failed to fetch release asset', r.status, r.statusText);
      return res.status(502).end('Failed to fetch asset');
    }

    // Increment counter (best-effort, non-blocking)
    try { incrementCounter(); } catch (e) { /* ignore */ }

    // Set download headers
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader('Content-Disposition', `attachment; filename="${OUT_FILENAME}"`);
    res.setHeader('Cache-Control', 'public, max-age=3600'); // allow CDN caching for 1 hour

    // Stream the response body to the client
    // In Node 18+ r.body is a readable stream compatible with pipeline
    await streamPipeline(r.body, res);
  } catch (err) {
    console.error('Proxy error', err);
    // If headers are not sent yet, try to return an error
    try { res.status(500).end('Server error'); } catch (_) {}
  }
}