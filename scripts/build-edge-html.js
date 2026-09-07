import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const templatePath = path.join(distDir, 'index.html');

const LOCALITIES = [
  'Wakad', 'Hinjawadi', 'Tathawade', 'Punawale', 'Ravet', 'Baner', 'Balewadi',
  'Mahalunge', 'Pimple Saudagar', 'Pimple Nilakh', 'Rahatani', 'Thergaon',
  'Aundh', 'Pashan', 'Bavdhan', 'Kothrud', 'Maan', 'Marunji', 'Gahunje',
  'Kiwale', 'Mamurdi', 'Chinchwad', 'Akurdi', 'Nigdi', 'Bhosari', 'Moshi',
  'Dighi', 'Charholi', 'Dhanori', 'Viman Nagar', 'Kalyani Nagar', 'Koregaon Park',
  'Kharadi', 'Wagholi', 'Hadapsar', 'Magarpatta', 'Keshav Nagar', 'Mundhwa',
  'Kondhwa', 'Undri', 'Pisoli', 'NIBM Road', 'Wanowrie', 'Fatima Nagar',
  'Camp', 'Shivajinagar', 'Model Colony', 'Senapati Bapat Road', 'Prabhat Road',
  'Law College Road', 'Deccan Gymkhana', 'Karve Nagar', 'Warje', 'Sinhagad Road'
];

const TYPOLOGIES = [
  { slug: '2-bhk-luxury-flats', name: '2 BHK Luxury Flats', price: '₹97 Lakhs*', carpet: '753 - 809 Sq.Ft.' },
  { slug: '3-bhk-grand-luxury-residences', name: '3 BHK Grand Luxury Residences', price: '₹1.32 Cr*', carpet: '1,027 - 1,162 Sq.Ft.' },
  { slug: '4-bhk-presidential-sky-suites', name: '4 BHK Presidential Sky Suites', price: '₹1.86 Cr*', carpet: '1,458 Sq.Ft.' },
  { slug: 'luxury-apartments-near-phoenix-mall', name: 'Luxury Apartments Near Phoenix Mall', price: '₹97 Lakhs*', carpet: '753 - 1,458 Sq.Ft.' },
  { slug: 'flats-near-hinjawadi-it-park', name: 'Flats Near Hinjawadi IT Park Phase 1', price: '₹97 Lakhs*', carpet: '753 - 1,458 Sq.Ft.' }
];

const INTENTS = [
  'price-cost-sheet-floor-plans',
  'brochure-pdf-sample-flat-video',
  'rera-carpet-area-possession-date',
  'reviews-roi-investment-analysis'
];

async function generateEdgeHtmlPages() {
  console.log('⚡ [Cloudflare Edge HTML Generator] Starting static edge HTML pre-rendering...');

  if (!fs.existsSync(templatePath)) {
    console.error('❌ dist/index.html not found! Run npm run build first.');
    return;
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf-8');
  let generatedCount = 0;

  LOCALITIES.forEach(locality => {
    const localitySlug = locality.toLowerCase().replace(/\s+/g, '-');

    TYPOLOGIES.forEach(typology => {
      INTENTS.forEach(intent => {
        const slug = `${localitySlug}-${typology.slug}-${intent}`;
        const outputFolder = path.join(distDir, 'p', slug);
        fs.mkdirSync(outputFolder, { recursive: true });

        const title = `${locality} ${typology.name} | Saheel Luxton Wakad Official`;
        const metaDesc = `Explore ${typology.name} at Saheel Luxton in ${locality}, Wakad Pune. 30-Storey landmark featuring 4,000 sq ft grand lobby, rooftop aqua theatre & luxury residences starting ${typology.price}. MahaRERA PM1260002502043.`;
        const canonicalUrl = `https://saheeluxton.in/p/${slug}`;

        const schemaJson = {
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          "name": `${locality} ${typology.name} - Saheel Luxton Wakad`,
          "url": canonicalUrl,
          "datePosted": "2026-01-15",
          "validThrough": "2030-06-30",
          "mainEntity": {
            "@type": "ApartmentComplex",
            "name": "Luxton By Saheel",
            "hasMap": "https://www.google.com/maps/place/Luxton+By+Saheel/data=!4m2!3m1!1s0x0:0x4688ad5f9f1e7471?sa=X&ved=1t:2428&ictx=111",
            "telephone": "+91 7744009295",
            "email": "propsmartrealty@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "S. No. 111, Near Phoenix Mall of the Millennium",
              "addressLocality": "Wakad",
              "addressRegion": "Maharashtra",
              "postalCode": "411057",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 18.6041,
              "longitude": 73.7555
            }
          }
        };

        // Inject customized meta tags into HTML template
        let customHtml = templateHtml
          .replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
          .replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${metaDesc}" />`)
          .replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${canonicalUrl}" />`)
          .replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${title}" />`)
          .replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${canonicalUrl}" />`)
          .replace(/<\/head>/i, `<script type="application/ld+json">${JSON.stringify(schemaJson)}</script></head>`);

        fs.writeFileSync(path.join(outputFolder, 'index.html'), customHtml);
        generatedCount++;
      });
    });
  });

  console.log(`✅ [Cloudflare Edge HTML Generator] Successfully generated ${generatedCount} static pre-rendered edge HTML pages under dist/p/!`);
}

generateEdgeHtmlPages();
