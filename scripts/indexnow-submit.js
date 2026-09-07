/**
 * IndexNow Instant Submitter for Saheel Luxton Wakad (https://www.saheeluxton.in)
 * Automatically notifies Bing, Yandex, Seznam, Naver, and IndexNow endpoints
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distPDir = path.join(rootDir, 'dist', 'p');

const host = 'saheeluxton.in';
const key = 'saheeluxton7c845a0206de495b990146e423de0a7c';
const keyLocation = `https://${host}/saheeluxton-indexnow.txt`;

let slugs = [''];
if (fs.existsSync(distPDir)) {
  const folders = fs.readdirSync(distPDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => `p/${d.name}`);
  slugs = slugs.concat(folders);
}

const allUrls = slugs.map(s => s ? `https://${host}/${s}` : `https://${host}/`);

console.log(`======================================================`);
console.log(`🚀 [IndexNow Batch Submitter] Total URLs Discovered: ${allUrls.length}`);
console.log(`======================================================`);

// Submit in batches of 500
const CHUNK_SIZE = 500;
for (let i = 0; i < allUrls.length; i += CHUNK_SIZE) {
  const chunk = allUrls.slice(i, i + CHUNK_SIZE);
  const payload = JSON.stringify({
    host,
    key,
    keyLocation,
    urlList: chunk
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/IndexNow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  console.log(`[IndexNow] Submitting Batch ${Math.floor(i / CHUNK_SIZE) + 1} (${chunk.length} URLs)...`);

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunkData) => data += chunkData);
    res.on('end', () => {
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log(`✅ [IndexNow Batch] Batch ${Math.floor(i / CHUNK_SIZE) + 1} Submitted Successfully (HTTP ${res.statusCode})`);
      } else {
        console.log(`[IndexNow Batch] HTTP ${res.statusCode}:`, data || 'Acknowledged');
      }
    });
  });

  req.on('error', (e) => {
    console.error(`❌ [IndexNow Batch] Error: ${e.message}`);
  });

  req.write(payload);
  req.end();
}
