import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const templatePath = path.join(distDir, 'index.html');
const publicDir = path.join(rootDir, 'public');
const sitemapsDir = path.join(publicDir, 'sitemaps');

const CURRENT_DATE = new Date().toISOString().split('T')[0];
const BASE_URL = 'https://saheeluxton.in';

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
  { slug: '2-bhk-luxury-flats', name: '2 BHK Luxury Flats', price: '₹97 Lakhs*', carpet: '753 - 809 Sq.Ft.', rooms: 2, baths: 2 },
  { slug: '3-bhk-grand-luxury-residences', name: '3 BHK Grand Luxury Residences', price: '₹1.32 Cr*', carpet: '1,027 - 1,162 Sq.Ft.', rooms: 3, baths: 3 },
  { slug: '4-bhk-presidential-sky-suites', name: '4 BHK Presidential Sky Suites', price: '₹1.86 Cr*', carpet: '1,458 Sq.Ft.', rooms: 4, baths: 4 },
  { slug: 'luxury-apartments-near-phoenix-mall', name: 'Luxury Apartments Near Phoenix Mall', price: '₹97 Lakhs*', carpet: '753 - 1,458 Sq.Ft.', rooms: 3, baths: 3 },
  { slug: 'flats-near-hinjawadi-it-park', name: 'Flats Near Hinjawadi IT Park Phase 1', price: '₹97 Lakhs*', carpet: '753 - 1,458 Sq.Ft.', rooms: 3, baths: 3 }
];

const INTENTS = [
  { slug: 'price-cost-sheet-floor-plans', name: 'Price & Cost Sheet Breakdown', intentDesc: 'Get itemized all-inclusive pricing, floor plan layouts, stamp duty calculations, and bank loan pre-approvals.' },
  { slug: 'brochure-pdf-sample-flat-video', name: 'Brochure PDF & Sample Flat Tour', intentDesc: 'Download official high-resolution brochure PDF, 3D architectural renders, and 360-degree sample flat video walkthrough.' },
  { slug: 'rera-carpet-area-possession-date', name: 'MahaRERA Specs & Possession Roadmap', intentDesc: 'Verify MahaRERA registration PM1260002502043, clear legal land title, usable carpet area, and construction milestone schedule.' },
  { slug: 'reviews-roi-investment-analysis', name: 'Rental Yield & Real Estate ROI Analysis', intentDesc: 'Explore projected 4.8% to 5.6% rental yield, 14.8% YoY capital appreciation forecast, and micro-market growth drivers.' }
];

async function generateEdgeHtmlPages() {
  console.log('⚡ [Cloudflare Edge HTML Generator] Starting supreme programmatic edge pre-rendering...');

  if (!fs.existsSync(templatePath)) {
    console.error('❌ dist/index.html not found! Run npm run build first.');
    return;
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf-8');
  let generatedCount = 0;
  const sitemapUrls = [];

  if (!fs.existsSync(sitemapsDir)) {
    fs.mkdirSync(sitemapsDir, { recursive: true });
  }

  LOCALITIES.forEach(locality => {
    const localitySlug = locality.toLowerCase().replace(/\s+/g, '-');

    TYPOLOGIES.forEach(typology => {
      INTENTS.forEach(intentObj => {
        const slug = `${localitySlug}-${typology.slug}-${intentObj.slug}`;
        const outputFolder = path.join(distDir, 'p', slug);
        fs.mkdirSync(outputFolder, { recursive: true });

        const title = `${locality} ${typology.name} | Saheel Luxton Wakad Official`;
        const metaDesc = `Explore ${typology.name} at Saheel Luxton in ${locality}, Wakad Pune. 30-Storey landmark featuring 4,000 sq ft grand lobby, rooftop aqua theatre & luxury residences starting ${typology.price}. MahaRERA PM1260002502043.`;
        const canonicalUrl = `${BASE_URL}/p/${slug}`;

        sitemapUrls.push({
          loc: canonicalUrl,
          lastmod: CURRENT_DATE,
          changefreq: 'weekly',
          priority: '0.85'
        });

        const schemaGraph = {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "RealEstateListing",
              "@id": `${canonicalUrl}#listing`,
              "name": `${locality} ${typology.name} - Saheel Luxton Wakad`,
              "url": canonicalUrl,
              "datePosted": "2026-01-15",
              "validThrough": "2030-06-30",
              "mainEntity": {
                "@type": "ApartmentComplex",
                "@id": `${BASE_URL}/#apartmentComplex`,
                "name": "Luxton By Saheel",
                "hasMap": "https://www.google.com/maps/place/Luxton+By+Saheel/@18.6081733,73.746433,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2b90054256fc7:0x4688ad5f9f1e7471!8m2!3d18.6081733!4d73.7490079!16s%2Fg%2F11ywcyn9g5",
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
                  "latitude": 18.6081733,
                  "longitude": 73.7490079
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "184",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              }
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${canonicalUrl}#breadcrumbs`,
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
                { "@type": "ListItem", "position": 2, "name": `${locality} Real Estate`, "item": `${BASE_URL}/#overview` },
                { "@type": "ListItem", "position": 3, "name": typology.name, "item": `${BASE_URL}/#plans` },
                { "@type": "ListItem", "position": 4, "name": intentObj.name, "item": canonicalUrl }
              ]
            },
            {
              "@type": "FloorPlan",
              "@id": `${canonicalUrl}#floorplan`,
              "name": `${locality} ${typology.name}`,
              "numberOfBedrooms": typology.rooms,
              "numberOfBathroomsTotal": typology.baths,
              "floorSize": {
                "@type": "QuantitativeValue",
                "value": typology.carpet.split(' ')[0],
                "unitCode": "FTK"
              }
            },
            {
              "@type": "WebPage",
              "@id": `${canonicalUrl}#webpage`,
              "url": canonicalUrl,
              "name": title,
              "description": metaDesc,
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", "article p", ".faq-answer"]
              },
              "about": {
                "@id": `${BASE_URL}/#apartmentComplex`
              }
            },
            {
              "@type": "FAQPage",
              "@id": `${canonicalUrl}#faq`,
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": `What is the price of ${typology.name} for homebuyers in ${locality}?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${typology.name} at Saheel Luxton starts from ${typology.price} with transparent cost sheets, zero hidden charges, and pre-approved home loan offers from SBI, HDFC, ICICI, and Axis Bank.`
                  }
                },
                {
                  "@type": "Question",
                  "name": `How far is Saheel Luxton Wakad from ${locality}?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Saheel Luxton is situated in prime Wakad near Phoenix Mall of the Millennium, just 8-10 minutes from Hinjawadi IT Park Phase 1 and seamlessly accessible from ${locality} via the Mumbai-Pune Expressway and PMRDA Metro Line 3.`
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is Saheel Luxton registered with MahaRERA?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Saheel Luxton is registered with Maharashtra Real Estate Regulatory Authority under MahaRERA registration number PM1260002502043."
                  }
                }
              ]
            }
          ]
        };

        // High-converting semantic SSR HTML markup with unified brand logos and direct actions
        const ssrBodyHtml = `
<div id="root">
  <div class="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans antialiased">
    <!-- Edge Pre-Rendered Header with Unified Enlarged Dual Logos -->
    <header class="w-full bg-white/95 border-b border-champagne-500/20 py-3.5 px-4 sm:px-6 sticky top-0 z-30 shadow-sm backdrop-blur-md">
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <a href="/" class="flex items-center gap-3 sm:gap-4 shrink-0" title="Luxton by Saheel Properties Wakad Pune">
          <img src="/logos/luxton-logo.jpg" alt="Luxton By Saheel Logo" class="h-11 sm:h-13 w-auto max-w-[150px] sm:max-w-[190px] object-contain rounded-lg shadow-sm" />
          <div class="h-8 sm:h-10 w-px bg-slate-300"></div>
          <img src="/logos/saheel-developer-logo.webp" alt="Saheel Properties Developer Logo" class="h-8 sm:h-10 w-auto max-w-[120px] sm:max-w-[150px] object-contain" />
        </a>
        <div class="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <a href="tel:+917744009295" class="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-champagne-500/40 text-slate-900 text-xs font-bold uppercase hover:bg-champagne-50 transition">
            📞 +91 7744009295
          </a>
          <a href="/" class="px-5 py-2.5 rounded-full bg-gradient-to-r from-champagne-500 via-champagne-600 to-amber-600 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md hover:brightness-105 transition">
            Explore Full Project
          </a>
        </div>
      </div>
    </header>

    <!-- Edge Semantic Main Container -->
    <main class="max-w-5xl mx-auto px-4 py-10 sm:py-14 space-y-10 sm:space-y-12">
      <!-- Breadcrumb Navigation -->
      <nav aria-label="Breadcrumb" class="text-xs text-slate-500 flex items-center gap-2 flex-wrap">
        <a href="/" class="hover:underline text-champagne-700 font-semibold">Home</a> &gt;
        <a href="/#overview" class="hover:underline text-champagne-700 font-semibold">Pune Real Estate</a> &gt;
        <a href="/#floor-plans" class="hover:underline text-champagne-700 font-semibold">${locality} Properties</a> &gt;
        <span class="text-slate-900 font-bold">${typology.name}</span>
      </nav>

      <!-- Hero Section -->
      <article class="bg-white rounded-3xl p-6 sm:p-10 border-2 border-champagne-500/30 shadow-xl space-y-6">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne-100 border border-champagne-400 text-champagne-900 text-xs font-bold uppercase tracking-wider">
          🛡️ MahaRERA Registered: <span class="font-mono font-black text-champagne-800">PM1260002502043</span>
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-slate-900 leading-tight">
          ${locality} ${typology.name} <br/>
          <span class="text-champagne-700">Saheel Luxton Wakad, Pune</span>
        </h1>
        <p class="text-slate-600 text-base sm:text-lg leading-relaxed">
          Welcome to <strong class="text-slate-900 font-bold">Saheel Luxton</strong>, Pune's iconic 30-storey luxury residential landmark in prime Wakad near Phoenix Mall of the Millennium. Offering exclusive <strong class="text-slate-900">${typology.name}</strong> designed with Pune's 1st 4,000 sq.ft Double-Height Grand Lobby, 5-Star Rooftop Aqua Theatre, and private walk-in dressing closets in every master bedroom.
        </p>

        <!-- Key Quick Specifications Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
          <div class="p-4 rounded-2xl bg-[#FAF8F5] border border-champagne-300 shadow-sm">
            <span class="text-[10px] sm:text-[11px] text-slate-500 uppercase font-bold block">Indicative Price</span>
            <span class="text-lg sm:text-xl font-black font-cinzel text-champagne-800">${typology.price}</span>
          </div>
          <div class="p-4 rounded-2xl bg-[#FAF8F5] border border-champagne-300 shadow-sm">
            <span class="text-[10px] sm:text-[11px] text-slate-500 uppercase font-bold block">Carpet Area</span>
            <span class="text-lg sm:text-xl font-bold font-cinzel text-slate-900">${typology.carpet}</span>
          </div>
          <div class="p-4 rounded-2xl bg-[#FAF8F5] border border-champagne-300 shadow-sm">
            <span class="text-[10px] sm:text-[11px] text-slate-500 uppercase font-bold block">Tower Elevation</span>
            <span class="text-lg sm:text-xl font-bold font-cinzel text-slate-900">30 Storeys</span>
          </div>
          <div class="p-4 rounded-2xl bg-[#FAF8F5] border border-champagne-300 shadow-sm">
            <span class="text-[10px] sm:text-[11px] text-slate-500 uppercase font-bold block">Location Hub</span>
            <span class="text-lg sm:text-xl font-bold font-cinzel text-slate-900">Wakad, Pune</span>
          </div>
        </div>

        <!-- Action Callouts -->
        <div class="flex flex-wrap items-center gap-3 sm:gap-4 pt-4">
          <a href="tel:+917744009295" class="px-6 sm:px-8 py-3.5 rounded-full bg-slate-900 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-slate-800 transition flex items-center gap-2">
            📞 Call Sales Desk: +91 7744009295
          </a>
          <a href="https://wa.me/917744009295?text=Hello%20Saheel%20Properties,%20I%20am%20inquiring%20about%20${encodeURIComponent(locality + ' ' + typology.name + ' at Saheel Luxton Wakad')}" class="px-6 sm:px-8 py-3.5 rounded-full bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-emerald-700 transition flex items-center gap-2">
            💬 WhatsApp Cost Sheet
          </a>
        </div>
      </article>

      <!-- Strategic Locality & Transit Matrix -->
      <section class="bg-white rounded-3xl p-6 sm:p-8 border border-champagne-500/20 shadow-md space-y-6">
        <h2 class="text-2xl font-bold font-cinzel text-slate-900">
          Unrivalled Connectivity &amp; Proximity for ${locality} Residents
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-sm">
          <div class="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200 space-y-2">
            <div class="font-bold text-slate-900">🛍️ Retail &amp; Entertainment</div>
            <p class="text-slate-600 text-xs leading-relaxed">5 Mins to Phoenix Mall of the Millennium, Wakad • D-Mart Wakad • Westend Mall Aundh</p>
          </div>
          <div class="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200 space-y-2">
            <div class="font-bold text-slate-900">💼 IT &amp; Business Hubs</div>
            <p class="text-slate-600 text-xs leading-relaxed">8-10 Mins to Rajiv Gandhi Infotech Park Phase 1, 2, 3 Hinjawadi • Balewadi High Street</p>
          </div>
          <div class="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200 space-y-2">
            <div class="font-bold text-slate-900">🚇 Metro &amp; Highways</div>
            <p class="text-slate-600 text-xs leading-relaxed">4 Mins to PMRDA Metro Line 3 Wakad Chowk • 5 Mins to Mumbai-Pune Expressway</p>
          </div>
        </div>
      </section>

      <!-- Frequent Questions Accordion for Google PAA -->
      <section class="bg-white rounded-3xl p-6 sm:p-8 border border-champagne-500/20 shadow-md space-y-6">
        <h2 class="text-2xl font-bold font-cinzel text-slate-900">
          Frequently Asked Questions (${locality} &amp; ${typology.name})
        </h2>
        <div class="space-y-3.5 text-sm">
          <div class="p-4 rounded-xl bg-[#FAF8F5] border border-slate-200 space-y-1">
            <h3 class="font-bold text-slate-900">What is the price of ${typology.name} at Saheel Luxton?</h3>
            <p class="text-slate-600 text-xs leading-relaxed">Starting from ${typology.price}, with all-inclusive transparent cost sheets, zero hidden charges, and pre-approved home loan offers from SBI, HDFC, ICICI, and Axis Bank.</p>
          </div>
          <div class="p-4 rounded-xl bg-[#FAF8F5] border border-slate-200 space-y-1">
            <h3 class="font-bold text-slate-900">Is Saheel Luxton registered with MahaRERA?</h3>
            <p class="text-slate-600 text-xs leading-relaxed">Yes, Saheel Luxton is registered with MahaRERA under registration number <strong>PM1260002502043</strong>, verified on the official MahaRERA portal.</p>
          </div>
          <div class="p-4 rounded-xl bg-[#FAF8F5] border border-slate-200 space-y-1">
            <h3 class="font-bold text-slate-900">Can I schedule a VIP site visit from ${locality}?</h3>
            <p class="text-slate-600 text-xs leading-relaxed">Yes! Complimentary AC cab pickup and drop service is available for prospective homebuyers across ${locality} and Pune. Call +91 7744009295 to book your slot.</p>
          </div>
        </div>
      </section>

      <!-- Footer & Governance -->
      <footer class="text-center text-xs text-slate-500 pt-6 space-y-2 border-t border-slate-200">
        <p>Project Registered under MahaRERA No. <strong>PM1260002502043</strong> | Luxton By Saheel Wakad, Pune</p>
        <p>Site Address: S. No. 111, Near Phoenix Mall of the Millennium, Shankar Kalat Nagar, Wakad, Pune - 411057</p>
        <p>© 2026 Saheel Properties. All Rights Reserved.</p>
      </footer>
    </main>
  </div>
</div>`;

        // Inject customized meta tags & SSR HTML body into HTML template
        const aiMetaTags = `
    <meta name="llms:txt" content="${BASE_URL}/llms.txt" />
    <meta name="llms:full" content="${BASE_URL}/llms-full.txt" />
    <meta name="llms:json" content="${BASE_URL}/llms.json" />
    <meta name="citation_title" content="${title}" />
    <meta name="citation_publisher" content="Saheel Properties" />
    <meta name="citation_online_date" content="${CURRENT_DATE}" />
    <script type="application/ld+json">${JSON.stringify(schemaGraph)}</script>
  </head>`;

        let customHtml = templateHtml
          .replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
          .replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${metaDesc}" />`)
          .replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${canonicalUrl}" />`)
          .replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${title}" />`)
          .replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${canonicalUrl}" />`)
          .replace(/<\/head>/i, aiMetaTags)
          .replace(/<div id="root"><\/div>/i, ssrBodyHtml);

        fs.writeFileSync(path.join(outputFolder, 'index.html'), customHtml);
        generatedCount++;
      });
    });
  });

  // Generate Synced Sitemaps (Batched in 500 URLs per file for fast search engine indexing)
  const SITEMAP_BATCH_SIZE = 500;
  const sitemapIndexFiles = [];

  for (let i = 0; i < sitemapUrls.length; i += SITEMAP_BATCH_SIZE) {
    const batchIndex = Math.floor(i / SITEMAP_BATCH_SIZE) + 1;
    const batch = sitemapUrls.slice(i, i + SITEMAP_BATCH_SIZE);
    const fileName = `sitemap-programmatic-${batchIndex}.xml`;
    const filePath = path.join(sitemapsDir, fileName);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    for (const u of batch) {
      xml += `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>\n`;
    }
    xml += `</urlset>\n`;

    fs.writeFileSync(filePath, xml, 'utf-8');
    sitemapIndexFiles.push(`${BASE_URL}/sitemaps/${fileName}`);
  }

  // Generate Master sitemap.xml
  let masterSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  masterSitemapXml += `  <sitemap>\n    <loc>${BASE_URL}/sitemap-core.xml</loc>\n    <lastmod>${CURRENT_DATE}</lastmod>\n  </sitemap>\n`;
  for (const sitemapFileUrl of sitemapIndexFiles) {
    masterSitemapXml += `  <sitemap>\n    <loc>${sitemapFileUrl}</loc>\n    <lastmod>${CURRENT_DATE}</lastmod>\n  </sitemap>\n`;
  }
  masterSitemapXml += `</sitemapindex>\n`;

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), masterSitemapXml, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), masterSitemapXml, 'utf-8');

  console.log(`✅ [Cloudflare Edge HTML Generator] Successfully generated ${generatedCount} static pre-rendered edge HTML pages with rich SSR semantic content & synchronized sitemaps!`);
}

generateEdgeHtmlPages();
