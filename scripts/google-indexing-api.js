import fs from 'fs';
import path from 'path';
import https from 'https';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distPDir = path.join(rootDir, 'dist', 'p');
const serviceAccountPath = path.join(rootDir, 'service-account.json');
const stateFilePath = path.join(__dirname, '.indexing-state.json');

const host = 'saheeluxton.in';

let targetUrls = [
  `https://${host}/`,
  `https://www.saheeluxton.in/`
];

if (fs.existsSync(distPDir)) {
  const folders = fs.readdirSync(distPDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => `https://${host}/p/${d.name}`);
  targetUrls = targetUrls.concat(folders);
}

// Load indexing state
function loadState() {
  if (fs.existsSync(stateFilePath)) {
    try {
      return JSON.parse(fs.readFileSync(stateFilePath, 'utf-8'));
    } catch {
      return { lastSubmittedIndex: 0, history: {} };
    }
  }
  return { lastSubmittedIndex: 0, history: {} };
}

function saveState(state) {
  fs.writeFileSync(stateFilePath, JSON.stringify(state, null, 2), 'utf-8');
}

/**
 * Generate Google OAuth2 Access Token using RS256 JWT
 */
async function getGoogleAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const b64Url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const unsignedToken = `${b64Url(header)}.${b64Url(payload)}`;

  const sign = crypto.createSign('RSA-SHA256');
  sign.update(unsignedToken);
  const signature = sign.sign(serviceAccount.private_key, 'base64url');
  const jwt = `${unsignedToken}.${signature}`;

  return new Promise((resolve, reject) => {
    const postData = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;
    const req = https.request({
      hostname: 'oauth2.googleapis.com',
      port: 443,
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.access_token) {
            resolve(json.access_token);
          } else {
            reject(new Error(`Failed to obtain Google access token: ${data}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

/**
 * Publish URL_UPDATED notification to Google Indexing API
 */
async function publishUrlToGoogle(url, accessToken) {
  const body = JSON.stringify({
    url,
    type: 'URL_UPDATED'
  });

  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'indexing.googleapis.com',
      port: 443,
      path: '/v3/urlNotifications:publish',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Content-Length': Buffer.byteLength(body)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✅ [Google Indexing API] ${url} -> Indexed (HTTP 200)`);
          resolve({ success: true, statusCode: 200, url });
        } else if (res.statusCode === 429) {
          console.log(`⏳ [Google Indexing API] Rate Limit / Daily Quota (HTTP 429) reached.`);
          resolve({ success: false, statusCode: 429, quotaExceeded: true, url, error: data });
        } else {
          console.log(`⚠️ [Google Indexing API] ${url} -> HTTP ${res.statusCode}: ${data}`);
          resolve({ success: false, statusCode: res.statusCode, url, error: data });
        }
      });
    });

    req.on('error', (err) => {
      console.error(`❌ [Google Indexing API Error] ${url}: ${err.message}`);
      resolve({ success: false, url, error: err.message });
    });

    req.write(body);
    req.end();
  });
}

async function run() {
  console.log('======================================================');
  console.log('🚀 SAHEEL LUXTON WAKAD — GOOGLE REAL-TIME INDEXING API');
  console.log('======================================================');
  console.log(`Discovered Target URLs: ${targetUrls.length}`);

  if (!fs.existsSync(serviceAccountPath)) {
    console.log('\n📌 [Next Step Required to Execute Direct API Publish]:');
    console.log('1. In Google Search Console, ensure your service account email is added as Owner.');
    console.log('2. In Google Cloud Console, enable "Web Search Indexing API".');
    console.log('3. Download the service account JSON key and save it as "service-account.json" in the project root.');
    return;
  }

  try {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));
    console.log(`Service Account Email: ${serviceAccount.client_email}`);
    console.log('\n🔑 Authenticating with Google OAuth2 using RS256 JWT...');
    const accessToken = await getGoogleAccessToken(serviceAccount);
    console.log('✅ Google OAuth2 Token Obtained successfully!');

    const state = loadState();
    let startIndex = state.lastSubmittedIndex || 0;
    if (startIndex >= targetUrls.length) {
      startIndex = 0; // Reset cycle if all URLs completed
    }

    const batchSize = 200; // Default Google Indexing API daily quota
    const batch = targetUrls.slice(startIndex, startIndex + batchSize);
    console.log(`\n📡 Submitting Batch [${startIndex + 1} to ${startIndex + batch.length} of ${targetUrls.length}] to Google Indexing API...\n`);

    let successfulCount = 0;
    let quotaExceeded = false;

    for (let i = 0; i < batch.length; i++) {
      const u = batch[i];
      const res = await publishUrlToGoogle(u, accessToken);
      
      if (res.success) {
        successfulCount++;
        state.history[u] = { lastPublishedAt: new Date().toISOString(), status: 'SUCCESS' };
        state.lastSubmittedIndex = startIndex + i + 1;
      } else if (res.quotaExceeded) {
        quotaExceeded = true;
        break;
      }

      // 100ms pause between requests
      await new Promise(r => setTimeout(r, 100));
    }

    saveState(state);

    console.log('\n======================================================');
    console.log(`📊 Batch Summary:`);
    console.log(`- Successfully Published Today: ${successfulCount} URLs`);
    console.log(`- Total URLs Indexed in Rotation: ${state.lastSubmittedIndex} / ${targetUrls.length}`);

    if (quotaExceeded) {
      console.log(`\n⏳ Notice: Google's default daily limit of 200 API requests was reached for today.`);
      console.log(`- The script saved its pointer at index ${state.lastSubmittedIndex}.`);
      console.log(`- It will pick up the next 200 URLs automatically on the next run when the daily quota resets (midnight Pacific Time).`);
      console.log(`- To increase quota up to 10,000/day, visit: https://cloud.google.com/docs/quotas/help/request_increase`);
    } else {
      console.log(`\n🎉 [Google Indexing API] Batch submission cycle complete!`);
    }
    console.log('======================================================');

  } catch (err) {
    console.error(`❌ Authentication or Publishing Failed: ${err.message}`);
  }
}

run();
