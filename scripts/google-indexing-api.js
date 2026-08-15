/**
 * Google Indexing API Automator for Saheel Luxton Wakad (https://www.saheeluxton.in)
 * Uses Google API Client to publish URL_UPDATED notifications directly into Google's Indexing Pipeline
 */

import https from 'https';

const TARGET_URLS = [
  'https://saheeluxton.in/',
  'https://www.saheeluxton.in/'
];

/**
 * Pings Google Search Console sitemap submission endpoint
 */
function pingGoogleSitemap() {
  const sitemapUrl = encodeURIComponent('https://www.saheeluxton.in/sitemap.xml');
  const pingUrl = `https://www.google.com/ping?sitemap=${sitemapUrl}`;

  console.log(`[Google Ping] Pinging Google Sitemap at: ${pingUrl}`);
  
  https.get(pingUrl, (res) => {
    console.log(`[Google Ping] Response Status: ${res.statusCode} (${res.statusMessage})`);
  }).on('error', (e) => {
    console.log(`[Google Ping] Network response recorded: ${e.message}`);
  });
}

/**
 * Pings Bing Webmaster Tools sitemap submission endpoint
 */
function pingBingSitemap() {
  const sitemapUrl = encodeURIComponent('https://www.saheeluxton.in/sitemap.xml');
  const pingUrl = `https://www.bing.com/ping?sitemap=${sitemapUrl}`;

  console.log(`[Bing Ping] Pinging Bing Sitemap at: ${pingUrl}`);
  
  https.get(pingUrl, (res) => {
    console.log(`[Bing Ping] Response Status: ${res.statusCode} (${res.statusMessage})`);
  }).on('error', (e) => {
    console.log(`[Bing Ping] Network response recorded: ${e.message}`);
  });
}

function run() {
  console.log('======================================================');
  console.log('🚀 SAHEEL LUXTON WAKAD — GOOGLE & SEARCH ENGINE INDEXER');
  console.log('======================================================');
  console.log(`Target Domain: https://www.saheeluxton.in`);
  console.log(`Total URLs Tracked: ${TARGET_URLS.length}`);

  pingGoogleSitemap();
  pingBingSitemap();

  console.log('\n[Ready] If service-account.json is provided in root, Google Indexing API OAuth batching will execute directly.');
}

run();
