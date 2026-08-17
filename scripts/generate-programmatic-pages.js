import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://saheeluxton.in';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

// 50 Pune Localities & Micro-Markets
const localities = [
  'wakad', 'shankar-kalat-nagar', 'datta-mandir-road', 'bhumkar-chowk', 'kaspate-vasti',
  'choudhary-park', 'pink-city-road', 'wakad-hinjawadi-link-road', 'hinjawadi-phase-1',
  'hinjawadi-phase-2', 'hinjawadi-phase-3', 'tathawade', 'punawale', 'ravet', 'mahalunge',
  'baner', 'balewadi', 'balewadi-high-street', 'bavdhan', 'aundh', 'pashan', 'sus',
  'marunji', 'maan', 'dange-chowk', 'thergaon', 'chinchwad', 'pimpri', 'nigdi', 'moshi',
  'charholi', 'dighi', 'kiwale', 'mamurdi', 'ravet-pradhikaran', 'punawale-highway-belt',
  'somatane-phata', 'talegaon', 'dehu-road', 'akurdi', 'kasarwadi', 'bhosari', 'sangvi',
  'pimple-saudagar', 'pimple-nilakh', 'pimple-gurav', 'kalewadi', 'rahayani', 'vishal-nagar', 'wakad-bridge'
];

// 15 Typologies & Architectural Features
const typologies = [
  '2-bhk-luxury-flats', '3-bhk-grand-luxury-flats', '4-bhk-presidential-suites',
  'luxury-apartments-with-walk-in-closets', 'apartments-with-4000-sqft-lobby',
  'flats-with-rooftop-aqua-theatre', 'vastu-compliant-east-facing-flats',
  'penthouse-sky-villas', 'flats-near-phoenix-mall-millennium', 'flats-near-pune-metro-line-3',
  'high-rise-sky-residences-30-floors', 'mivan-rcc-shear-wall-apartments',
  'apartments-with-dgu-acoustic-glazing', 'smart-home-automated-flats', '3-side-open-corner-apartments'
];

// 15 Search Intents & Real Estate Persona Angles
const intents = [
  'price-cost-sheet-floor-plans', 'rera-pm1260002502043-approval-review',
  'rental-yield-roi-investment-guide', 'nri-investment-dubai-usa-fema-guide',
  'home-loan-emi-sbi-hdfc-calculator', 'possession-roadmap-construction-status',
  'amenities-rooftop-pool-specifications', 'builder-comparison-vs-godrej-kolte-patil',
  'stamp-duty-registration-tax-benefits', 'it-professionals-housing-guide',
  'vastu-shastra-direction-energy-audit', 'car-parking-podium-amenities-breakdown',
  'resale-capital-appreciation-forecast', 'sample-flat-virtual-video-tour',
  'top-luxury-projects-ranking-pune'
];

// Generate URLs
const generatedUrls = [];

for (const loc of localities) {
  for (const typ of typologies) {
    for (const intent of intents) {
      const slug = `${loc}-${typ}-${intent}`;
      generatedUrls.push({
        loc: `${BASE_URL}/p/${slug}`,
        lastmod: CURRENT_DATE,
        changefreq: 'weekly',
        priority: '0.85'
      });
    }
  }
}

console.log(`🚀 Generated ${generatedUrls.length} Programmatic Real Estate Permutations!`);

// Ensure public/sitemaps exists
const sitemapsDir = path.join(__dirname, '../public/sitemaps');
if (!fs.existsSync(sitemapsDir)) {
  fs.mkdirSync(sitemapsDir, { recursive: true });
}

// Split into batches of 2,000 for ultra-fast Googlebot parsing
const BATCH_SIZE = 2000;
const sitemapFiles = [];

for (let i = 0; i < generatedUrls.length; i += BATCH_SIZE) {
  const batchIndex = Math.floor(i / BATCH_SIZE) + 1;
  const batch = generatedUrls.slice(i, i + BATCH_SIZE);
  const fileName = `sitemap-programmatic-${batchIndex}.xml`;
  const filePath = path.join(sitemapsDir, fileName);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const u of batch) {
    xml += `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>\n`;
  }
  xml += `</urlset>\n`;

  fs.writeFileSync(filePath, xml, 'utf-8');
  sitemapFiles.push(`https://saheeluxton.in/sitemaps/${fileName}`);
  console.log(`✅ Created public/sitemaps/${fileName} (${batch.length} URLs)`);
}

// Master Sitemap Index
let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Add Core Sitemap
indexXml += `  <sitemap>\n    <loc>https://saheeluxton.in/sitemap-core.xml</loc>\n    <lastmod>${CURRENT_DATE}</lastmod>\n  </sitemap>\n`;

for (const sitemapUrl of sitemapFiles) {
  indexXml += `  <sitemap>\n    <loc>${sitemapUrl}</loc>\n    <lastmod>${CURRENT_DATE}</lastmod>\n  </sitemap>\n`;
}
indexXml += `</sitemapindex>\n`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap-index.xml'), indexXml, 'utf-8');
console.log(`✅ Created public/sitemap-index.xml with ${sitemapFiles.length + 1} sub-sitemaps!`);
