import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const {
      name,
      phone,
      email,
      leadType,
      configuration,
      preferredDate,
      preferredTime,
      requireCabPickup,
      notes,
      sourceUrl
    } = req.body || {};

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and Phone are required.' });
    }

    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Gmail SMTP credentials
    const gmailUser = process.env.GMAIL_USER || 'propsmartrealty@gmail.com';
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD || process.env.GOOGLE_APP_PASSWORD;

    if (!gmailAppPassword) {
      console.warn('⚠️ GMAIL_APP_PASSWORD is not set in Vercel environment variables.');
      return res.status(500).json({
        success: false,
        message: 'Email service configuration incomplete on server. GMAIL_APP_PASSWORD required.'
      });
    }

    // Configure hardened Nodemailer transport with Google App Passwords
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword.replace(/\s+/g, '') // Strip spaces from Google App Password
      },
      tls: {
        rejectUnauthorized: true
      },
      connectionTimeout: 10000
    });

    const leadTypeLabels: Record<string, string> = {
      VIP_VISIT: '🌟 VIP Site Visit & Preview Booking',
      BROCHURE_DOWNLOAD: '📥 Official E-Brochure PDF Download',
      COST_SHEET_DOWNLOAD: '📊 Itemized Cost Sheet Calculation',
      AI_CONCIERGE: '🤖 24/7 AI Concierge Chat Lead',
      CALLBACK_REQUEST: '📞 Instant Callback Request'
    };

    const leadHeadline = leadTypeLabels[leadType] || '🔥 New High-Intent Property Inquiry';

    // Luxury HTML Email Template
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #FAF8F5; margin: 0; padding: 20px; color: #1E293B; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E2D9C8; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
        .header { background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); padding: 30px 24px; text-align: center; color: #FAF8F5; border-bottom: 3px solid #D4A017; }
        .brand { font-size: 24px; font-weight: 800; letter-spacing: 4px; color: #FAF8F5; margin: 0; font-family: Georgia, serif; }
        .subbrand { font-size: 11px; letter-spacing: 2px; color: #D4A017; text-transform: uppercase; margin-top: 4px; font-weight: 700; }
        .badge { display: inline-block; padding: 6px 14px; border-radius: 20px; background: #D4A017; color: #0F172A; font-size: 12px; font-weight: 800; text-transform: uppercase; margin-top: 15px; }
        .content { padding: 28px 24px; }
        .table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        .table td { padding: 12px 14px; border-bottom: 1px solid #F1ECE1; font-size: 13px; }
        .table td.label { font-weight: 700; color: #64748B; width: 38%; background-color: #FAF8F5; }
        .table td.value { font-weight: 700; color: #0F172A; }
        .cta-btn { display: inline-block; background: #1E293B; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 25px; font-weight: bold; font-size: 13px; margin-top: 20px; }
        .footer { background: #FAF8F5; padding: 18px 24px; text-align: center; font-size: 11px; color: #94A3B8; border-top: 1px solid #E2D9C8; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1 class="brand">SAHEEL LUXTON</h1>
          <div class="subbrand">Wakad, Pune • MahaRERA PM1260002502043</div>
          <div class="badge">${leadHeadline}</div>
        </div>
        <div class="content">
          <p style="font-size: 14px; margin-top: 0; color: #334155;">A prospective luxury homebuyer has submitted an inquiry on the official portal:</p>
          <table class="table">
            <tr>
              <td class="label">Full Name</td>
              <td class="value">${name}</td>
            </tr>
            <tr>
              <td class="label">Phone Number</td>
              <td class="value" style="color: #047857; font-size: 15px;">
                <a href="tel:${phone}" style="color: #047857; text-decoration: none;">📞 ${phone}</a> | 
                <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #047857; text-decoration: none;">💬 WhatsApp</a>
              </td>
            </tr>
            <tr>
              <td class="label">Email Address</td>
              <td class="value">${email ? `<a href="mailto:${email}">${email}</a>` : 'Not Provided'}</td>
            </tr>
            <tr>
              <td class="label">Interested Typology</td>
              <td class="value">${configuration || 'All Variants (2 / 3 / 4 BHK)'}</td>
            </tr>
            ${preferredDate ? `<tr><td class="label">Preferred Visit Date</td><td class="value">${preferredDate}</td></tr>` : ''}
            ${preferredTime ? `<tr><td class="label">Preferred Time Slot</td><td class="value">${preferredTime}</td></tr>` : ''}
            ${requireCabPickup !== undefined ? `<tr><td class="label">AC Cab Pickup</td><td class="value">${requireCabPickup ? '✅ Yes, Pickup Requested' : '❌ No, Self Drive'}</td></tr>` : ''}
            ${notes ? `<tr><td class="label">Inquiry Notes</td><td class="value">${notes}</td></tr>` : ''}
            <tr>
              <td class="label">Captured URL</td>
              <td class="value" style="font-size: 11px; word-break: break-all;">${sourceUrl || 'https://www.saheeluxton.in/'}</td>
            </tr>
            <tr>
              <td class="label">Timestamp (IST)</td>
              <td class="value">${timestamp}</td>
            </tr>
          </table>

          <div style="text-align: center; margin-top: 25px;">
            <a href="tel:${phone}" class="cta-btn">📞 Call Prospect Now</a>
            &nbsp;
            <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" class="cta-btn" style="background: #059669;">💬 Chat on WhatsApp</a>
          </div>
        </div>
        <div class="footer">
          Saheel Luxton Lead Dispatch Engine • Dedicated Destination: <strong>propsmartrealty@gmail.com</strong><br>
          S. No. 111, Shankar Kalat Nagar, Near Phoenix Mall of the Millennium, Wakad, Pune - 411057
        </div>
      </div>
    </body>
    </html>
    `;

    // Send email via Gmail SMTP
    const info = await transporter.sendMail({
      from: `"Saheel Luxton Leads" <${gmailUser}>`,
      to: 'propsmartrealty@gmail.com',
      replyTo: email || 'propsmartrealty@gmail.com',
      subject: `🔥 New Lead: ${name} (${phone}) - ${configuration || 'Saheel Luxton Wakad'}`,
      text: `New Lead from Saheel Luxton Wakad:\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'N/A'}\nTypology: ${configuration || 'N/A'}\nDate: ${preferredDate || 'N/A'}\nTime: ${preferredTime || 'N/A'}\nNotes: ${notes || 'N/A'}\nTimestamp: ${timestamp}`,
      html: htmlContent
    });

    console.log('✅ Email successfully dispatched via Nodemailer Gmail SMTP:', info.messageId);

    return res.status(200).json({
      success: true,
      message: 'Lead successfully dispatched to propsmartrealty@gmail.com via Nodemailer SMTP.',
      messageId: info.messageId
    });
  } catch (error: any) {
    console.error('❌ Nodemailer Gmail SMTP Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to dispatch email via Nodemailer SMTP.',
      error: error.message
    });
  }
}
