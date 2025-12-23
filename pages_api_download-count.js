// pages/api/download-count.js
import fs from 'fs';
import path from 'path';

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

export default function handler(req, res) {
  ensureCounterFile();
  try {
    const json = JSON.parse(fs.readFileSync(COUNTER_FILE, 'utf8'));
    res.status(200).json({ count: json.count || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ count: 0 });
  }
}