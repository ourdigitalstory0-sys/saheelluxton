/**
 * ==============================================================================
 * Cloudflare Supreme Edge SEO & HTMLRewriter Engine for Google.com
 * Service: Saheel Luxton Wakad, Pune (MahaRERA: PM1260002502043)
 * Domains: https://saheeluxton.in & https://www.saheeluxton.in
 * ==============================================================================
 */

const TARGET_EMAIL = 'propsmartrealty@gmail.com';
const HOTLINE_PHONE = '+91 7744009295';
const RERA_ID = 'PM1260002502043';

// Currency exchange rates for NRI visitors based on request.cf.country
const CURRENCY_MAP = {
  AE: { code: 'AED', symbol: 'AED', rate: 0.044, label: 'UAE Dirham' },
  US: { code: 'USD', symbol: '$', rate: 0.012, label: 'US Dollar' },
  GB: { code: 'GBP', symbol: '£', rate: 0.0094, label: 'British Pound' },
  SG: { code: 'SGD', symbol: 'S$', rate: 0.016, label: 'Singapore Dollar' },
  SA: { code: 'SAR', symbol: 'SAR', rate: 0.045, label: 'Saudi Riyal' },
  QA: { code: 'QAR', symbol: 'QAR', rate: 0.044, label: 'Qatari Riyal' },
  CA: { code: 'CAD', symbol: 'C$', rate: 0.016, label: 'Canadian Dollar' },
  AU: { code: 'AUD', symbol: 'A$', rate: 0.018, label: 'Australian Dollar' },
  DE: { code: 'EUR', symbol: '€', rate: 0.011, label: 'Euro' }
};

// Search Engine Crawlers regex
const BOT_REGEX = /Googlebot|Google-Extended|GoogleOther|Google-InspectionTool|Storebot-Google|bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|Applebot|Facebot|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|TelegramBot|Pinterest|SkypeUriPreview/i;

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const host = url.host;
  const baseUrl = `https://${host}`;

  // 1. Pass static assets directly with immutable edge caching
  if (url.pathname.startsWith('/assets/') || url.pathname.endsWith('.webp') || url.pathname.endsWith('.png') || url.pathname.endsWith('.svg') || url.pathname.endsWith('.css') || url.pathname.endsWith('.js') || url.pathname.endsWith('.ico')) {
    const assetRes = await next();
    const newHeaders = new Headers(assetRes.headers);
    newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');
    newHeaders.set('Access-Control-Allow-Origin', '*');
    newHeaders.set('X-Edge-Asset-Type', 'Immutable-Static');
    return new Response(assetRes.body, { status: assetRes.status, headers: newHeaders });
  }

  // 2. Fetch Response from Static Asset Engine
  const response = await next();

  // 3. Apply Edge HTMLRewriter for Programmatic URLs (/p/:slug) and Main Portal (/)
  const isProgrammatic = url.pathname.startsWith('/p/');
  const isRoot = url.pathname === '/' || url.pathname === '/index.html';
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = BOT_REGEX.test(userAgent);
  const isGooglebot = /Googlebot|Google-Extended|GoogleOther|Google-InspectionTool|Storebot-Google/i.test(userAgent) || request.cf?.asNum === 15169;

  // Googlebot Last-Modified conditional validation for crawl budget preservation
  if (isGooglebot && request.headers.get('if-modified-since')) {
    const lastMod = new Date('2026-08-25T18:30:00Z');
    const ifMod = new Date(request.headers.get('if-modified-since'));
    if (ifMod >= lastMod && !isProgrammatic) {
      return new Response(null, {
        status: 304,
        headers: {
          'X-Edge-SEO-Engine': 'Cloudflare-Supreme-Googlebot-v2',
          'X-Googlebot-Fast-Path': 'HIT-304-NotModified',
          'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800'
        }
      });
    }
  }

  if ((isProgrammatic || isRoot) && response.headers.get('content-type')?.includes('text/html')) {
    const countryCode = request.cf?.country || 'IN';
    const nriCurrency = CURRENCY_MAP[countryCode] || null;

    let rewriter = new HTMLRewriter();

    if (isProgrammatic) {
      const slug = url.pathname.replace(/^\/p\//, '').replace(/\/$/, '');
      const words = slug.split('-');
      const formattedTitle = words
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      const locality = words[0] || 'Wakad';
      const formattedLocality = locality.charAt(0).toUpperCase() + locality.slice(1);
      const canonicalPageUrl = `${baseUrl}/p/${slug}`;

      rewriter = rewriter
        .on('title', {
          element(e) {
            e.setInnerContent(`${formattedTitle} | Saheel Luxton Wakad Pune`);
          }
        })
        .on('meta[name="description"]', {
          element(e) {
            e.setAttribute('content', `Explore ${formattedTitle} at Saheel Luxton in ${formattedLocality}, Wakad, Pune. 30-Storey Landmark featuring 4,000 Sq.Ft Grand Lobby, Rooftop Aqua Theatre & luxury 2, 3 & 4 BHK flats starting ₹97 Lakhs*. MahaRERA ${RERA_ID}. Call +91 7744009295.`);
          }
        })
        .on('meta[property="og:title"]', {
          element(e) {
            e.setAttribute('content', `${formattedTitle} | Saheel Luxton Wakad`);
          }
        })
        .on('meta[property="og:url"]', {
          element(e) {
            e.setAttribute('content', canonicalPageUrl);
          }
        })
        .on('link[rel="canonical"]', {
          element(e) {
            e.setAttribute('href', canonicalPageUrl);
          }
        })
        .on('head', {
          element(e) {
            // High-Density Schema Graph for Googlebot
            const schemaGraph = {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "RealEstateListing",
                  "name": `${formattedTitle} - Saheel Luxton Wakad`,
                  "url": canonicalPageUrl,
                  "datePosted": "2026-01-15",
                  "validThrough": "2030-06-30",
                  "mainEntity": {
                    "@type": "ApartmentComplex",
                    "name": "Luxton By Saheel",
                    "hasMap": "https://www.google.com/maps/place/Luxton+By+Saheel/data=!4m2!3m1!1s0x0:0x4688ad5f9f1e7471?sa=X&ved=1t:2428&ictx=111",
                    "telephone": HOTLINE_PHONE,
                    "email": TARGET_EMAIL,
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
                    },
                    "geoCrosses": {
                      "@type": "GeoShape",
                      "polygon": "18.6041,73.7555 18.6050,73.7565 18.6035,73.7570 18.6030,73.7550 18.6041,73.7555"
                    }
                  }
                },
                {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
                    { "@type": "ListItem", "position": 2, "name": `${formattedLocality} Real Estate`, "item": `${baseUrl}/p/${locality}-luxury-flats` },
                    { "@type": "ListItem", "position": 3, "name": formattedTitle, "item": canonicalPageUrl }
                  ]
                },
                {
                  "@type": "Product",
                  "name": `Saheel Luxton Luxury Residences in ${formattedLocality}`,
                  "sku": `SL-${locality.toUpperCase()}-RES`,
                  "mpn": RERA_ID,
                  "image": "https://backend.saheelproperties.com/uploads/Chembur_Rameshwar_Day_View_Final_1_1_1_5dd5da3a34.png",
                  "brand": { "@type": "Brand", "name": "Saheel Properties" },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5.0",
                    "bestRating": "5",
                    "worstRating": "1",
                    "ratingCount": "146",
                    "reviewCount": "112"
                  },
                  "offers": {
                    "@type": "Offer",
                    "url": canonicalPageUrl,
                    "priceCurrency": "INR",
                    "price": "9700000",
                    "priceValidUntil": "2027-12-31",
                    "availability": "https://schema.org/InStock",
                    "itemCondition": "https://schema.org/NewCondition"
                  }
                }
              ]
            };
            e.append(`<script type="application/ld+json">${JSON.stringify(schemaGraph)}</script>`, { html: true });
          }
        });
    }

    // If NRI visitor detected, inject multi-currency attributes
    if (nriCurrency) {
      rewriter = rewriter.on('body', {
        element(e) {
          e.setAttribute('data-nri-country', countryCode);
          e.setAttribute('data-nri-currency', nriCurrency.code);
          e.setAttribute('data-nri-rate', String(nriCurrency.rate));
        }
      });
    }

    // Execute HTMLRewriter transformation
    const transformedStream = rewriter.transform(response);
    const finalResponse = new Response(transformedStream.body, transformedStream);

    finalResponse.headers.set('X-Edge-SEO-Engine', 'Cloudflare-Supreme-Googlebot-v2');
    finalResponse.headers.set('X-Edge-Colo', request.cf?.colo || 'EDGE');
    finalResponse.headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    if (isGooglebot) {
      finalResponse.headers.set('X-Googlebot-Accelerated', 'true');
      finalResponse.headers.set('X-Googlebot-Fast-Path', 'POP-V8-Edge');
      finalResponse.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800');
    } else {
      finalResponse.headers.set('Cache-Control', isBot ? 'public, max-age=86400, s-maxage=86400' : 'public, max-age=0, must-revalidate');
    }

    return finalResponse;
  }

  return response;
}
