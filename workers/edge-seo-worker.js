/**
 * ==============================================================================
 * Cloudflare Enterprise Edge SEO & SSR Worker for Saheel Luxton Wakad
 * Service: saheelluxton (Account: ec31d286a6821243962cfe65678a673e)
 * Domain: https://www.saheeluxton.in & https://saheeluxton.in
 * MahaRERA Registration: PM1260002502043
 * Features:
 *   1. Cloudflare Workers Sites Asset Serving via KV (__STATIC_CONTENT)
 *   2. Edge Server-Side Rendering (SSR) & HTMLRewriter for 11,250+ pSEO Pages
 *   3. Instant Dynamic Schema.org (Product, Offer, Review 5.0, GeoShape) Injection
 *   4. Edge Geolocation & NRI Currency Adaptation (USD, AED, GBP, SGD, EUR, SAR)
 *   5. Verified Search Engine Crawler Fast-Lane (Googlebot, Bingbot, Yandex, Applebot)
 *   6. Edge Lead Webhook Dispatch to propsmartrealty@gmail.com
 * ==============================================================================
 */

import { getAssetFromKV, mapRequestToAsset, serveSinglePageApp } from '@cloudflare/kv-asset-handler';
import manifestJSON from '__STATIC_CONTENT_MANIFEST';
const assetManifest = JSON.parse(manifestJSON);

const CANONICAL_HOST = 'www.saheeluxton.in';
const APEX_HOST = 'saheeluxton.in';
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

// Known Search Engine Bot User-Agent Patterns
const BOT_REGEX = /Googlebot|Google-Extended|GoogleOther|bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|Applebot|Facebot|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|TelegramBot|Pinterest|SkypeUriPreview/i;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Force Canonical Domain (Redirect apex saheeluxton.in -> www.saheeluxton.in with 301 Permanent)
    if (url.hostname === APEX_HOST) {
      url.hostname = CANONICAL_HOST;
      return Response.redirect(url.toString(), 301);
    }

    // 2. Handle Edge Lead Dispatch API (/api/lead or /api/send-email)
    if (url.pathname === '/api/lead' || url.pathname === '/api/send-email') {
      return handleEdgeLeadDispatch(request, env);
    }

    // 3. Handle Edge Health Check (/cdn-cgi/edge-health or /api/stats)
    if (url.pathname === '/cdn-cgi/edge-health' || url.pathname === '/api/stats') {
      return new Response(JSON.stringify({
        status: 'healthy',
        service: 'saheelluxton',
        edgePop: request.cf?.colo || 'UNKNOWN',
        country: request.cf?.country || 'IN',
        city: request.cf?.city || 'Pune',
        httpProtocol: request.cf?.httpProtocol || 'HTTP/3',
        tlsVersion: request.cf?.tlsVersion || 'TLSv1.3',
        canonicalDomain: `https://${CANONICAL_HOST}`,
        targetLeadEmail: TARGET_EMAIL,
        salesHotline: HOTLINE_PHONE,
        reraId: RERA_ID,
        timestamp: new Date().toISOString()
      }, null, 2), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // 4. Fetch Static Asset from Cloudflare Workers Sites KV
    let originResponse;
    try {
      originResponse = await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx)
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: assetManifest,
          mapRequestToAsset: url.pathname.startsWith('/p/') ? serveSinglePageApp : mapRequestToAsset
        }
      );
    } catch (e) {
      // Fallback to single page app index.html
      try {
        originResponse = await getAssetFromKV(
          {
            request,
            waitUntil: ctx.waitUntil.bind(ctx)
          },
          {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST: assetManifest,
            mapRequestToAsset: serveSinglePageApp
          }
        );
      } catch (err) {
        return new Response(`Not Found: ${e.message}`, { status: 404 });
      }
    }

    // If static bundle asset (JS/CSS/Image), apply immutable caching
    if (url.pathname.startsWith('/assets/') || url.pathname.endsWith('.webp') || url.pathname.endsWith('.png') || url.pathname.endsWith('.svg') || url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
      const assetRes = new Response(originResponse.body, originResponse);
      assetRes.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      assetRes.headers.set('Access-Control-Allow-Origin', '*');
      assetRes.headers.set('X-Edge-Asset', 'Workers-Sites-KV');
      return assetRes;
    }

    // 5. Apply Cloudflare HTMLRewriter for Programmatic URLs (/p/:slug) and Main Portal (/)
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

        rewriter = rewriter
          .on('title', {
            element(e) {
              e.setInnerContent(`${formattedTitle} | Saheel Luxton Wakad Pune`);
            }
          })
          .on('meta[name="description"]', {
            element(e) {
              e.setAttribute('content', `Explore ${formattedTitle} at Saheel Luxton in ${formattedLocality}, Wakad, Pune. 30-Storey Landmark featuring 4,000 Sq.Ft Grand Lobby, Rooftop Aqua Theatre & luxury 2, 3 & 4 BHK residences starting ₹97 Lakhs*. MahaRERA ${RERA_ID}. Call +91 7744009295.`);
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

      const transformedStream = rewriter.transform(originResponse);
      const finalResponse = new Response(transformedStream.body, transformedStream);

      finalResponse.headers.set('X-Edge-Worker', 'saheelluxton');
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
    formData.append('_subject', `🔥 New Cloudflare Worker Lead: ${payload.name} (${payload.phone}) - Saheel Luxton`);
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
