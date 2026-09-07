/**
 * Native Cloudflare Pages Edge Function: /api/send-email & /api/lead
 * Runs on Cloudflare's Global V8 Edge Network (330+ POPs)
 * Target Lead Destination: propsmartrealty@gmail.com
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS Headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  try {
    const payload = await request.json();
    const {
      name,
      phone,
      email,
      leadType,
      configuration,
      preferredDate,
      preferredTime,
      requireCabPickup,
      notes
    } = payload || {};

    if (!name || !phone) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Name and phone number are required.'
      }), { status: 400, headers: corsHeaders });
    }

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const targetEmail = env.TARGET_EMAIL || 'propsmartrealty@gmail.com';
    const reraId = 'PM1260002502043';

    // Cloudflare Edge FormSubmit Dispatch Payload
    const formData = new FormData();
    formData.append('_subject', `🔥 New Cloudflare Edge Lead: ${name} (${phone}) - Saheel Luxton Wakad`);
    formData.append('_replyto', email || 'noreply@saheeluxton.in');
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');
    formData.append('Project', `Saheel Luxton Wakad (${reraId})`);
    formData.append('Lead Type', leadType || 'VIP_SITE_VISIT');
    formData.append('Full Name', name);
    formData.append('Phone Number', phone);
    formData.append('Email Address', email || 'Not Provided');
    formData.append('Interested Typology', configuration || 'All Configurations (2/3/4 BHK)');
    formData.append('Preferred Visit Date', preferredDate || 'Earliest Available Slot');
    formData.append('Preferred Time Slot', preferredTime || 'Any Time (10 AM - 8 PM)');
    formData.append('Complimentary AC Cab Pickup', requireCabPickup ? 'Yes, Pickup Requested' : 'No, Self Drive');
    formData.append('Inquiry Notes', notes || 'Interested in Saheel Luxton luxury residences and pricing');
    formData.append('Edge Data Center (Colo)', request.cf?.colo || 'EDGE');
    formData.append('Visitor Country', request.cf?.country || 'IN');
    formData.append('Visitor City', request.cf?.city || 'Pune');
    formData.append('Timestamp (IST)', timestamp);

    const dispatchResponse = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: 'POST',
      body: formData
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Lead successfully dispatched at Cloudflare Edge to propsmartrealty@gmail.com',
      edgeServer: 'Cloudflare Edge POP',
      edgeLocation: request.cf?.colo || 'EDGE',
      timestamp
    }), {
      status: 200,
      headers: corsHeaders
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Cloudflare Edge function error',
      error: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}
