/**
 * ==============================================================================
 * Cloudflare Pages Wildcard SSR & Edge SEO Middleware: functions/[[path]].js
 * Runs natively on Cloudflare Pages across 330+ Global Edge Locations
 * Domain: https://www.saheeluxton.in
 * MahaRERA Registration: PM1260002502043
 * ==============================================================================
 */

const CANONICAL_HOST = 'www.saheeluxton.in';
const APEX_HOST = 'saheeluxton.in';
const TARGET_EMAIL = 'propsmartrealty@gmail.com';
const HOTLINE_PHONE = '+91 7744009295';
const RERA_ID = 'PM1260002502043';

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

const BOT_REGEX = /Googlebot|Google-Extended|GoogleOther|bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|Applebot|Facebot|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|TelegramBot|Pinterest|SkypeUriPreview/i;

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // 1. Pass static assets directly
  if (url.pathname.startsWith('/assets/') || url.pathname.endsWith('.webp') || url.pathname.endsWith('.png') || url.pathname.endsWith('.svg') || url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
    const assetRes = await next();
    const newHeaders = new Headers(assetRes.headers);
    newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');
    newHeaders.set('Access-Control-Allow-Origin', '*');
    return new Response(assetRes.body, { status: assetRes.status, headers: newHeaders });
  }

  // 3. Fetch Response from Pages Static Assets
  const response = await next();

  // 4. Apply Cloudflare HTMLRewriter for Programmatic URLs (/p/:slug) and Master Portal (/)
  const isProgrammatic = url.pathname.startsWith('/p/');
  const isRoot = url.pathname === '/' || url.pathname === '/index.html';
  const isBot = BOT_REGEX.test(request.headers.get('user-agent') || '');

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

      rewriter = rewriter
        .on('title', {
          element(e) {
            e.setInnerContent(`${formattedTitle} | Saheel Luxton Wakad Pune`);
          }
        })
        .on('meta[name="description"]', {
          element(e) {
            e.setAttribute('content', `Explore ${formattedTitle} at Saheel Luxton in ${formattedLocality}, Wakad, Pune. 30-Storey Landmark with 4,000 Sq.Ft Grand Lobby, Rooftop Aqua Theatre & 2, 3 & 4 BHK residences starting ₹97 Lakhs*. MahaRERA ${RERA_ID}. Call +91 7744009295.`);
          }
        })
        .on('meta[property="og:title"]', {
          element(e) {
            e.setAttribute('content', `${formattedTitle} | Saheel Luxton Wakad`);
          }
        })
        .on('meta[property="og:url"]', {
          element(e) {
            e.setAttribute('content', `https://${CANONICAL_HOST}/p/${slug}`);
          }
        })
        .on('link[rel="canonical"]', {
          element(e) {
            e.setAttribute('href', `https://${CANONICAL_HOST}/p/${slug}`);
          }
        })
        .on('head', {
          element(e) {
            const schemaJson = {
              "@context": "https://schema.org",
              "@type": "RealEstateListing",
              "name": `${formattedTitle} - Saheel Luxton Wakad`,
              "url": `https://${CANONICAL_HOST}/p/${slug}`,
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
            };
            e.append(`<script type="application/ld+json">${JSON.stringify(schemaJson)}</script>`, { html: true });
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

    const transformedStream = rewriter.transform(response);
    const finalResponse = new Response(transformedStream.body, transformedStream);

    finalResponse.headers.set('X-Edge-Engine', 'Cloudflare-Pages-HTMLRewriter');
    finalResponse.headers.set('X-Edge-Colo', request.cf?.colo || 'EDGE');
    finalResponse.headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    finalResponse.headers.set('Cache-Control', isBot ? 'public, max-age=86400, s-maxage=86400' : 'public, max-age=0, must-revalidate');

    return finalResponse;
  }

  return response;
}
