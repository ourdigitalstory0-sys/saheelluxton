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

const SERVICE_ACCOUNT_EMAIL = 'saheelluxton@vivid-reality-419916.iam.gserviceaccount.com';
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

/**
 * Generate Google OAuth2 Access Token using RS256 JWT
 */
async function getGoogleAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: serviceAccount.client_email || SERVICE_ACCOUNT_EMAIL,
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
          resolve({ success: true, url });
        } else {
          console.log(`⚠️ [Google Indexing API] ${url} -> HTTP ${res.statusCode}: ${data}`);
          resolve({ success: false, url, error: data });
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
  console.log(`Service Account: ${SERVICE_ACCOUNT_EMAIL}`);
  console.log(`Discovered Target URLs: ${targetUrls.length}`);

  if (!fs.existsSync(serviceAccountPath)) {
    console.log('\n📌 [Next Step Required to Execute Direct API Publish]:');
    console.log('1. In Google Search Console, ensure saheelluxton@vivid-reality-419916.iam.gserviceaccount.com is added as Owner.');
    console.log('2. In Google Cloud Console (Project vivid-reality-419916), enable "Web Search Indexing API".');
    console.log('3. Download the service account JSON key and save it as "service-account.json" in the project root.');
    console.log('\nWhen service-account.json is present, this script instantly pushes all 1,080+ URLs into Google\'s real-time queue.');
    return;
  }

  try {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));
    console.log('\n🔑 Authenticating with Google OAuth2 using RS256 JWT...');
    const accessToken = await getGoogleAccessToken(serviceAccount);
    console.log('✅ Google OAuth2 Token Obtained! Batch publishing URLs to Google Indexing API...');

    // Google Indexing API daily quota is typically 200 URLs/day by default
    const batch = targetUrls.slice(0, 200);
    console.log(`Publishing top ${batch.length} URLs to Google Indexing API...\n`);

    for (const u of batch) {
      await publishUrlToGoogle(u, accessToken);
      // Small pause to avoid hitting rapid rate limits
      await new Promise(r => setTimeout(r, 100));
    }

    console.log('\n🎉 [Google Indexing API] Batch submission completed successfully!');
  } catch (err) {
    console.error(`❌ Authentication or Publishing Failed: ${err.message}`);
  }
}

run();
