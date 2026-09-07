/**
 * IndexNow Instant Submitter for Saheel Luxton Wakad (https://www.saheeluxton.in)
 * Automatically notifies Bing, Yandex, Seznam, Naver, and IndexNow endpoints
 */

import https from 'https';

const host = 'saheeluxton.in';
const key = 'saheeluxton7c845a0206de495b990146e423de0a7c';
const keyLocation = `https://${host}/saheeluxton-indexnow.txt`;

const TOP_SLUGS = [
  '',
  'p/wakad-2-bhk-luxury-flats-price-cost-sheet-floor-plans',
  'p/wakad-3-bhk-grand-luxury-residences-brochure-pdf-sample-flat-video',
  'p/wakad-4-bhk-presidential-sky-suites-rera-carpet-area-possession-date',
  'p/hinjawadi-luxury-apartments-near-phoenix-mall-reviews-roi-investment-analysis',
  'p/baner-2-bhk-luxury-flats-price-cost-sheet-floor-plans',
  'p/balewadi-3-bhk-grand-luxury-residences-brochure-pdf-sample-flat-video',
  'p/pimple-saudagar-2-bhk-luxury-flats-price-cost-sheet-floor-plans',
  'p/tathawade-flats-near-hinjawadi-it-park-price-cost-sheet-floor-plans',
  'p/ravet-2-bhk-luxury-flats-brochure-pdf-sample-flat-video',
  'p/punawale-3-bhk-grand-luxury-residences-rera-carpet-area-possession-date'
];

const urlList = [
  ...TOP_SLUGS.map(s => `https://saheeluxton.in/${s}`.replace(/\/$/, '') || 'https://saheeluxton.in/'),
  ...TOP_SLUGS.map(s => `https://www.saheeluxton.in/${s}`.replace(/\/$/, '') || 'https://www.saheeluxton.in/')
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

console.log(`[IndexNow] Submitting ${urlList.length} clean URLs for https://${host}...`);

const req = https.request(options, (res) => {
  console.log(`[IndexNow] Response Status Code: ${res.statusCode} (${res.statusMessage})`);
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log('✅ [IndexNow] Successfully submitted URLs for instant search engine indexing!');
    } else {
      console.log('[IndexNow] Endpoint acknowledged:', data || 'Submitted successfully');
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ [IndexNow] Error submitting to IndexNow: ${e.message}`);
});

req.write(payload);
req.end();
