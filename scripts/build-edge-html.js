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

        // Generate high-converting semantic SSR HTML markup for Googlebot and zero-JS crawlers
        const ssrBodyHtml = `
<div id="root">
  <div class="min-h-screen bg-[#FAF8F5] text-slate-900 font-sans antialiased">
    <!-- Edge Pre-Rendered Header -->
    <header class="w-full bg-white/95 border-b border-champagne-500/20 py-4 px-6 sticky top-0 z-30 shadow-sm">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-champagne-400 to-champagne-800 flex items-center justify-center font-cinzel font-bold text-white text-xl">L</div>
          <div>
            <div class="font-cinzel font-bold tracking-widest text-slate-900 text-lg leading-none">LUXTON</div>
            <div class="text-[9px] tracking-widest text-champagne-700 font-bold uppercase mt-0.5">BY SAHEEL • WAKAD</div>
          </div>
        </a>
        <div class="flex items-center gap-3">
          <a href="tel:+917744009295" class="px-4 py-2 rounded-full border border-champagne-600 text-champagne-800 text-xs font-bold uppercase hover:bg-champagne-500 hover:text-white transition">Call: +91 7744009295</a>
          <a href="/" class="px-5 py-2 rounded-full bg-champagne-600 text-white text-xs font-bold uppercase shadow-sm hover:bg-champagne-700 transition">Explore Full Project</a>
        </div>
      </div>
    </header>

    <!-- Edge Semantic Main Container -->
    <main class="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <!-- Breadcrumb Navigation -->
      <nav aria-label="Breadcrumb" class="text-xs text-slate-500 flex items-center gap-2">
        <a href="/" class="hover:underline text-champagne-700 font-semibold">Home</a> &gt;
        <a href="/#overview" class="hover:underline text-champagne-700 font-semibold">Pune Real Estate</a> &gt;
        <a href="/#floor-plans" class="hover:underline text-champagne-700 font-semibold">${locality} Properties</a> &gt;
        <span class="text-slate-800 font-bold">${typology.name}</span>
      </nav>

      <!-- Hero Section -->
      <article class="bg-white rounded-3xl p-8 sm:p-12 border-2 border-champagne-500/30 shadow-xl space-y-6">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne-100/80 border border-champagne-400 text-champagne-900 text-xs font-bold uppercase tracking-wider">
          ⭐ MahaRERA Registered: PM1260002502043
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold font-cinzel text-slate-900 leading-tight">
          ${locality} ${typology.name} <br/>
          <span class="text-champagne-700">Saheel Luxton Wakad, Pune</span>
        </h1>
        <p class="text-slate-600 text-base sm:text-lg leading-relaxed">
          Welcome to <strong class="text-slate-900 font-bold">Saheel Luxton</strong>, Pune's iconic 30-storey ultra-luxury residential landmark in prime Wakad near Phoenix Mall of the Millennium. Offering exclusive <strong class="text-slate-900">${typology.name}</strong> designed with Pune's 1st 4,000 sq.ft Double-Height Italian Marble Grand Lobby, 5-Star Rooftop Aqua Theatre, and private walk-in dressing closets in every master bedroom.
        </p>

        <!-- Key Quick Specifications Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <div class="p-4 rounded-2xl bg-[#FAF8F5] border border-champagne-200">
            <span class="text-[11px] text-slate-500 uppercase font-semibold block">Indicative Price</span>
            <span class="text-xl font-bold font-cinzel text-champagne-800">${typology.price}</span>
          </div>
          <div class="p-4 rounded-2xl bg-[#FAF8F5] border border-champagne-200">
            <span class="text-[11px] text-slate-500 uppercase font-semibold block">Carpet Area</span>
            <span class="text-xl font-bold font-cinzel text-slate-800">${typology.carpet}</span>
          </div>
          <div class="p-4 rounded-2xl bg-[#FAF8F5] border border-champagne-200">
            <span class="text-[11px] text-slate-500 uppercase font-semibold block">Tower Elevation</span>
            <span class="text-xl font-bold font-cinzel text-slate-800">30 Storeys</span>
          </div>
          <div class="p-4 rounded-2xl bg-[#FAF8F5] border border-champagne-200">
            <span class="text-[11px] text-slate-500 uppercase font-semibold block">Location</span>
            <span class="text-xl font-bold font-cinzel text-slate-800">Wakad, Pune</span>
          </div>
        </div>

        <!-- Action Callouts -->
        <div class="flex flex-wrap gap-4 pt-4">
          <a href="tel:+917744009295" class="px-8 py-3.5 rounded-full bg-champagne-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-champagne-700 transition">
            📞 Call Sales Desk: +91 7744009295
          </a>
          <a href="https://wa.me/917744009295?text=Hello%20Saheel%20Properties,%20I%20am%20inquiring%20about%20${encodeURIComponent(locality + ' ' + typology.name + ' at Saheel Luxton Wakad')}" class="px-8 py-3.5 rounded-full bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-emerald-700 transition">
            💬 WhatsApp Price &amp; Brochure
          </a>
        </div>
      </article>

      <!-- Strategic Locality & Transit Matrix -->
      <section class="bg-white rounded-3xl p-8 border border-champagne-500/20 shadow-md space-y-6">
        <h2 class="text-2xl font-bold font-cinzel text-slate-900">
          Unrivalled Connectivity &amp; Proximity for ${locality} Residents
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div class="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200 space-y-2">
            <div class="font-bold text-slate-900">🛍️ Retail &amp; Entertainment</div>
            <p class="text-slate-600 text-xs">5 Mins to Phoenix Mall of the Millennium, Wakad • D-Mart Wakad • Westend Mall Aundh</p>
          </div>
          <div class="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200 space-y-2">
            <div class="font-bold text-slate-900">💼 IT &amp; Business Hubs</div>
            <p class="text-slate-600 text-xs">8-10 Mins to Rajiv Gandhi Infotech Park Phase 1, 2, 3 Hinjawadi • Balewadi High Street</p>
          </div>
          <div class="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200 space-y-2">
            <div class="font-bold text-slate-900">🚇 Metro &amp; Highways</div>
            <p class="text-slate-600 text-xs">4 Mins to PMRDA Metro Line 3 Wakad Chowk • 5 Mins to Mumbai-Pune Expressway</p>
          </div>
        </div>
      </section>

      <!-- Frequent Questions Accordion for Google PAA -->
      <section class="bg-white rounded-3xl p-8 border border-champagne-500/20 shadow-md space-y-6">
        <h2 class="text-2xl font-bold font-cinzel text-slate-900">
          Frequently Asked Questions (${locality} &amp; ${typology.name})
        </h2>
        <div class="space-y-4 text-sm">
          <div class="p-4 rounded-xl bg-[#FAF8F5] border border-slate-200">
            <h3 class="font-bold text-slate-900">What is the price of ${typology.name} at Saheel Luxton?</h3>
            <p class="text-slate-600 text-xs mt-1">Starting from ${typology.price}, with all-inclusive transparent cost sheets, zero hidden charges, and pre-approved home loan offers from SBI, HDFC, ICICI, and Axis Bank.</p>
          </div>
          <div class="p-4 rounded-xl bg-[#FAF8F5] border border-slate-200">
            <h3 class="font-bold text-slate-900">Is Saheel Luxton registered with MahaRERA?</h3>
            <p class="text-slate-600 text-xs mt-1">Yes, Saheel Luxton is registered with MahaRERA under registration number <strong>PM1260002502043</strong>, verified on the official MahaRERA portal.</p>
          </div>
          <div class="p-4 rounded-xl bg-[#FAF8F5] border border-slate-200">
            <h3 class="font-bold text-slate-900">Can I schedule a VIP site visit from ${locality}?</h3>
            <p class="text-slate-600 text-xs mt-1">Yes! Complimentary AC cab pickup and drop service is available for prospective homebuyers across ${locality} and Pune. Call +91 7744009295 to book your slot.</p>
          </div>
        </div>
      </section>

      <!-- Footer & Governance -->
      <footer class="text-center text-xs text-slate-500 pt-6 space-y-2">
        <p>Project Registered under MahaRERA No. <strong>PM1260002502043</strong> | Luxton By Saheel Wakad, Pune</p>
        <p>Site Address: S. No. 111, Near Phoenix Mall of the Millennium, Shankar Kalat Nagar, Wakad, Pune - 411057</p>
        <p>© 2026 Saheel Properties. All Rights Reserved.</p>
      </footer>
    </main>
  </div>
</div>`;

        // Inject customized meta tags & SSR HTML body into HTML template
        let customHtml = templateHtml
          .replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
          .replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${metaDesc}" />`)
          .replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${canonicalUrl}" />`)
          .replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${title}" />`)
          .replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${canonicalUrl}" />`)
          .replace(/<\/head>/i, `<script type="application/ld+json">${JSON.stringify(schemaJson)}</script></head>`)
          .replace(/<div id="root"><\/div>/i, ssrBodyHtml);

        fs.writeFileSync(path.join(outputFolder, 'index.html'), customHtml);
        generatedCount++;
      });
    });
  });

  console.log(`✅ [Cloudflare Edge HTML Generator] Successfully generated ${generatedCount} static pre-rendered edge HTML pages with rich SSR semantic content under dist/p/!`);
}

generateEdgeHtmlPages();
