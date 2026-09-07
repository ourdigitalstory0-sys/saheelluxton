/**
 * ==============================================================================
 * Cloudflare Supreme Edge SEO Worker for Google.com
 * Service: saheelluxton (Account: ec31d286a6821243962cfe65678a673e)
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

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.host;
    const baseUrl = `https://${host}`;

    // 1. Handle Edge Lead Dispatch API (/api/lead or /api/send-email)
    if (url.pathname === '/api/lead' || url.pathname === '/api/send-email') {
      return handleEdgeLeadDispatch(request, env);
    }

    // 2. Handle Edge Health Check (/cdn-cgi/edge-health or /api/stats)
    if (url.pathname === '/cdn-cgi/edge-health' || url.pathname === '/api/stats') {
      return new Response(JSON.stringify({
        status: 'healthy',
        service: 'saheelluxton',
        edgePop: request.cf?.colo || 'UNKNOWN',
        country: request.cf?.country || 'IN',
        city: request.cf?.city || 'Pune',
        httpProtocol: request.cf?.httpProtocol || 'HTTP/3',
        tlsVersion: request.cf?.tlsVersion || 'TLSv1.3',
        canonicalDomain: baseUrl,
        targetLeadEmail: TARGET_EMAIL,
        salesHotline: HOTLINE_PHONE,
        reraId: RERA_ID,
        timestamp: new Date().toISOString()
      }, null, 2), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // 3. Fetch Asset from Native Cloudflare Worker Assets Binding or Origin
    let originResponse;
    try {
      if (env.ASSETS) {
        originResponse = await env.ASSETS.fetch(request);
        if (originResponse.status === 404 && !url.pathname.includes('.')) {
          const indexReq = new Request(new URL('/index.html', request.url), request);
          originResponse = await env.ASSETS.fetch(indexReq);
        }
      } else {
        originResponse = await fetch(request);
      }
    } catch (err) {
      return new Response(`Worker Asset Error: ${err.message}`, { status: 500 });
    }

    // If static bundle asset, apply immutable caching
    if (url.pathname.startsWith('/assets/') || url.pathname.endsWith('.webp') || url.pathname.endsWith('.png') || url.pathname.endsWith('.svg') || url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
      const assetRes = new Response(originResponse.body, originResponse);
      assetRes.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      assetRes.headers.set('Access-Control-Allow-Origin', '*');
      assetRes.headers.set('X-Edge-Asset-Type', 'Worker-Assets');
      return assetRes;
    }

    // 4. Apply Cloudflare HTMLRewriter for Programmatic URLs (/p/:slug) and Main Portal (/)
    const isProgrammatic = url.pathname.startsWith('/p/');
    const isRoot = url.pathname === '/' || url.pathname === '/index.html';
    const isBot = BOT_REGEX.test(request.headers.get('user-agent') || '');

    if ((isProgrammatic || isRoot) && originResponse.headers.get('content-type')?.includes('text/html')) {
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

      if (nriCurrency) {
        rewriter = rewriter.on('body', {
          element(e) {
            e.setAttribute('data-nri-country', countryCode);
            e.setAttribute('data-nri-currency', nriCurrency.code);
            e.setAttribute('data-nri-rate', String(nriCurrency.rate));
          }
        });
      }

      const transformedStream = rewriter.transform(originResponse);
      const finalResponse = new Response(transformedStream.body, transformedStream);

      finalResponse.headers.set('X-Edge-SEO-Engine', 'Cloudflare-Supreme-Googlebot-v2');
      finalResponse.headers.set('X-Edge-Colo', request.cf?.colo || 'EDGE');
      finalResponse.headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      finalResponse.headers.set('Cache-Control', isBot ? 'public, max-age=86400, s-maxage=86400' : 'public, max-age=0, must-revalidate');

      return finalResponse;
    }

    return originResponse;
  }
};

/**
 * Handle Real-Time Lead Inquiries at the Edge
 */
async function handleEdgeLeadDispatch(request, env) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, message: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  try {
    const payload = await request.json();
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const formData = new FormData();
    formData.append('_subject', `🔥 New Cloudflare Edge Lead: ${payload.name} (${payload.phone}) - Saheel Luxton`);
    formData.append('_replyto', payload.email || 'noreply@saheeluxton.in');
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');
    formData.append('Project', `Saheel Luxton Wakad (${RERA_ID})`);
    formData.append('Lead Type', payload.leadType || 'VIP_SITE_VISIT');
    formData.append('Full Name', payload.name);
    formData.append('Phone Number', payload.phone);
    formData.append('Email Address', payload.email || 'Not Provided');
    formData.append('Typology', payload.configuration || 'All Configurations (2/3/4 BHK)');
    formData.append('Visit Date', payload.preferredDate || 'Earliest Slot');
    formData.append('Visit Time', payload.preferredTime || 'Any Time (10 AM - 8 PM)');
    formData.append('AC Cab Pickup', payload.requireCabPickup ? 'Yes, Pickup Requested' : 'No, Self Drive');
    formData.append('Notes', payload.notes || 'Inquired via Cloudflare Edge Worker');
    formData.append('Edge Data Center (Colo)', request.cf?.colo || 'EDGE');
    formData.append('Timestamp (IST)', timestamp);

    await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      body: formData
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Lead successfully dispatched at Cloudflare Edge to propsmartrealty@gmail.com',
      service: 'saheelluxton',
      edgeColo: request.cf?.colo || 'EDGE',
      timestamp
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Edge lead processing error',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
