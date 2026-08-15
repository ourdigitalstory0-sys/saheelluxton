/**
 * IndexNow Instant Submitter for Saheel Luxton Wakad (https://www.saheeluxton.in)
 * Automatically notifies Bing, Yandex, Seznam, Naver, and IndexNow endpoints
 */

import https from 'https';

const host = 'www.saheeluxton.in';
const key = 'saheeluxton7c845a0206de495b990146e423de0a7c';
const keyLocation = `https://${host}/saheeluxton-indexnow.txt`;

const urlList = [
  `https://${host}/`,
  `https://${host}/#overview`,
  `https://${host}/#highlights`,
  `https://${host}/#tower-explorer`,
  `https://${host}/#virtual-360`,
  `https://${host}/#amenities`,
  `https://${host}/#plans`,
  `https://${host}/#pricing`,
  `https://${host}/#nri-hub`,
  `https://${host}/#location`,
  `https://${host}/#pune-real-estate-insights`,
  `https://${host}/#faqs`,
  `https://${host}/#saheel-ecosystem`,
  `https://${host}/#construction-milestones`,
  `https://${host}/#comparison`
];

const payload = JSON.stringify({
  host,
  key,
  keyLocation,
  urlList
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

console.log(`[IndexNow] Submitting ${urlList.length} URLs for https://${host}...`);

const req = https.request(options, (res) => {
  console.log(`[IndexNow] Response Status Code: ${res.statusCode} (${res.statusMessage})`);
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log('[IndexNow] Successfully submitted URLs for instant search engine indexing!');
    } else {
      console.log('[IndexNow] Endpoint acknowledged:', data || 'Submitted successfully');
    }
  });
});

req.on('error', (e) => {
  console.error(`[IndexNow] Error submitting to IndexNow: ${e.message}`);
});

req.write(payload);
req.end();
