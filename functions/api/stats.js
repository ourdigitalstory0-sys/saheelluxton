/**
 * Cloudflare Edge Observability & Stats Endpoint
 * Route: /api/stats
 */

export async function onRequestGet(context) {
  const { request } = context;

  const data = {
    service: 'saheelluxton',
    status: 'operational',
    edgeNetwork: 'Cloudflare Global Anycast (330+ POPs)',
    colo: request.cf?.colo || 'EDGE',
    country: request.cf?.country || 'IN',
    city: request.cf?.city || 'Pune',
    region: request.cf?.region || 'Maharashtra',
    postalCode: request.cf?.postalCode || '411057',
    metroCode: request.cf?.metroCode || 'N/A',
    timezone: request.cf?.timezone || 'Asia/Kolkata',
    httpProtocol: request.cf?.httpProtocol || 'HTTP/3 (QUIC)',
    tlsVersion: request.cf?.tlsVersion || 'TLSv1.3',
    botManagement: request.cf?.botManagement || { score: 99, verifiedBot: false },
    canonicalDomain: 'https://www.saheeluxton.in',
    reraRegistration: 'PM1260002502043',
    leadEmail: 'propsmartrealty@gmail.com',
    salesHotline: '+91 7744009295',
    timestamp: new Date().toISOString()
  };

  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store'
    }
  });
}
