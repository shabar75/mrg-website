import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

const resend = new Resend(process.env.RESEND_API_KEY);

// ============================================================
// CORS
// ============================================================
const isDevelopment = NODE_ENV === 'development';

const allowedOrigins = isDevelopment
  ? true // reflect request origin in dev
  : (process.env.ALLOWED_ORIGINS || 'https://mrgsolutions.in')
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200,
  })
);

app.use(express.json({ limit: '32kb' }));

// Behind Render / Railway / nginx proxies
if (!isDevelopment) {
  app.set('trust proxy', 1);
}

// ============================================================
// Rate limit (consultation only)
// ============================================================
const consultationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isDevelopment,
  message: {
    success: false,
    message: 'Too many consultation requests. Please try again later.',
  },
});

// ============================================================
// Helpers
// ============================================================
function validate(body) {
  const errors = [];
  const { fullName, email, phone, service, message } = body || {};

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    errors.push('Full name is required');
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
    errors.push('Valid email is required');
  }
  if (!phone || String(phone).replace(/\D/g, '').length < 10) {
    errors.push('Valid phone number is required');
  }
  if (!service || typeof service !== 'string' || !service.trim()) {
    errors.push('Service is required');
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }
  if (message && message.length > 2000) {
    errors.push('Message is too long');
  }
  return errors;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ============================================================
// API routes (must come BEFORE static + SPA fallback)
// ============================================================
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    environment: NODE_ENV,
    resendConfigured: Boolean(process.env.RESEND_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/consultation', consultationLimiter, async (req, res) => {
  try {
    const errors = validate(req.body);
    if (errors.length) {
      return res.status(400).json({
        success: false,
        message: errors.join('. '),
      });
    }

    const {
      fullName,
      email,
      phone,
      company = '',
      service,
      message,
      preferredContact = 'Email',
    } = req.body;

    if (!process.env.RESEND_API_KEY) {
      console.error('[Resend] Missing RESEND_API_KEY environment variable.');
      return res.status(503).json({
        success: false,
        message:
          'Email service is not configured. Please contact us directly at info@mrgsolutions.in',
      });
    }

    const receiver =
      process.env.CONSULTATION_RECEIVER || 'info@mrgsolutions.in';
    const from =
      process.env.RESEND_FROM || 'MRG Website <info@mrgsolutions.in>';
    const submittedAt = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
    });

    const text = `
New Consultation Request
========================

Name: ${fullName.trim()}
Email: ${email.trim()}
Phone: ${phone.trim()}
Company: ${company.trim() || 'N/A'}
Service: ${service}
Preferred Contact Method: ${preferredContact}
Submitted: ${submittedAt}

Message:
${message.trim()}
`.trim();

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Consultation Request</title></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #1a365d; border-bottom: 2px solid #3182ce; padding-bottom: 10px;">New Consultation Request</h2>
  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
    <tr><td style="padding: 8px 0; font-weight: bold; width: 180px;">Name:</td><td style="padding: 8px 0;">${escapeHtml(fullName.trim())}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email.trim())}">${escapeHtml(email.trim())}</a></td></tr>
    <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${escapeHtml(phone.trim())}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: bold;">Company:</td><td style="padding: 8px 0;">${escapeHtml(company.trim() || 'N/A')}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: bold;">Service:</td><td style="padding: 8px 0;">${escapeHtml(service)}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: bold;">Preferred Contact:</td><td style="padding: 8px 0;">${escapeHtml(preferredContact)}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: bold;">Submitted:</td><td style="padding: 8px 0;">${escapeHtml(submittedAt)}</td></tr>
  </table>
  <h3 style="color: #2d3748; margin-top: 30px;">Message</h3>
  <div style="background: #f7fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #3182ce; white-space: pre-wrap;">${escapeHtml(message.trim())}</div>
  <p style="margin-top: 30px; font-size: 12px; color: #718096;">This email was sent from the MRG Solutions website consultation form.</p>
</body>
</html>
`.trim();

    const { data, error } = await resend.emails.send({
      from,
      to: [receiver],
      replyTo: email.trim(),
      subject: `Consultation Request — ${fullName.trim()} (${service})`,
      text,
      html,
    });

    if (error) {
      console.error('[Resend] Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Unable to send your request. Please try again later.',
      });
    }

    console.log(
      `[Consultation] Email sent for ${email.trim()} at ${submittedAt}. Resend ID: ${data?.id || 'unknown'}`
    );

    return res.status(200).json({
      success: true,
      message:
        'Your consultation request has been submitted successfully. We will contact you shortly.',
    });
  } catch (err) {
    console.error('[Consultation] Unexpected error:', err);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
});

// ============================================================
// Static frontend + SPA fallback (Express 5 safe)
// ============================================================
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Do NOT use app.get('*') on Express 5 — it crashes.
// Named splat is the correct Express 5 pattern:
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ============================================================
// Start
// ============================================================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (${NODE_ENV})`);
});