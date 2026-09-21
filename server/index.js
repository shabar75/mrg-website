// import express from 'express';
// import cors from 'cors';
// import nodemailer from 'nodemailer';
// import rateLimit from 'express-rate-limit';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

// dotenv.config();

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const app = express();
// const PORT = process.env.PORT || 3001;
// const NODE_ENV = process.env.NODE_ENV || 'development';

// // ============================================================
// // CORS Configuration - Restricted for Production
// // ============================================================
// const isDevelopment = NODE_ENV === 'development';
// const allowedOrigins = isDevelopment
//   ? '*' // Allow all in development for local testing
//   : (process.env.ALLOWED_ORIGINS || 'https://mrgsolutions.in').split(',');

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//     methods: ['GET', 'POST', 'OPTIONS'],
//     allowedHeaders: ['Content-Type'],
//     optionsSuccessStatus: 200,
//   })
// );

// // ============================================================
// // Middleware
// // ============================================================
// app.use(express.json({ limit: '32kb' }));

// // ============================================================
// // Rate Limiting for Consultation Endpoint
// // ============================================================
// // Protects against spam/abuse by limiting requests per IP
// const consultationLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minute window
//   max: 5, // 5 requests per IP per window
//   message: 'Too many consultation requests. Please try again later.',
//   standardHeaders: true, // Return rate limit info in RateLimit-* headers
//   legacyHeaders: false, // Disable X-RateLimit-* headers
//   skip: (req) => isDevelopment, // Skip rate limiting in development
//   keyGenerator: (req) => {
//     // Use client IP address as the rate limit key
//     return req.ip || req.connection.remoteAddress || '0.0.0.0';
//   },
//   handler: (req, res) => {
//     res.status(429).json({
//       success: false,
//       message: 'Too many consultation requests. Please try again later.',
//     });
//   },
// });

// // ============================================================
// // Validation Function
// // ============================================================
// function validate(body) {
//   const errors = [];
//   const { fullName, email, phone, service, message } = body || {};

//   if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
//     errors.push('Full name is required');
//   }
//   if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
//     errors.push('Valid email is required');
//   }
//   if (!phone || String(phone).replace(/\D/g, '').length < 10) {
//     errors.push('Valid phone number is required');
//   }
//   if (!service || typeof service !== 'string' || !service.trim()) {
//     errors.push('Service is required');
//   }
//   if (!message || typeof message !== 'string' || message.trim().length < 10) {
//     errors.push('Message must be at least 10 characters');
//   }
//   if (message && message.length > 2000) {
//     errors.push('Message is too long');
//   }
//   return errors;
// }

// // ============================================================
// // Nodemailer Transporter Setup
// // ============================================================
// function createTransporter() {
//   const host = process.env.SMTP_HOST;
//   const port = Number(process.env.SMTP_PORT || 587);
//   const user = process.env.SMTP_USER;
//   const pass = process.env.SMTP_PASSWORD;

//   if (!host || !user || !pass) {
//     return null;
//   }

//   return nodemailer.createTransport({
//     host,
//     port,
//     secure: port === 465, // true for 465, false for other ports
//     auth: { user, pass },
//   });
// }

// // ============================================================
// // HTML Escaping Function
// // ============================================================
// function escapeHtml(str) {
//   return String(str)
//     .replace(/&/g, '&amp;')
//     .replace(/</g, '&lt;')
//     .replace(/>/g, '&gt;')
//     .replace(/"/g, '&quot;')
//     .replace(/'/g, '&#039;');
// }

// // ============================================================
// // Routes
// // ============================================================

// /**
//  * Health Check Endpoint
//  * GET /api/health
//  * Used to verify server is running and SMTP is configured
//  */
// app.get('/api/health', (_req, res) => {
//   res.json({
//     ok: true,
//     environment: NODE_ENV,
//     smtpConfigured: Boolean(
//       process.env.SMTP_HOST &&
//         process.env.SMTP_USER &&
//         process.env.SMTP_PASSWORD
//     ),
//     timestamp: new Date().toISOString(),
//   });
// });

// /**
//  * Consultation Request Endpoint
//  * POST /api/consultation
//  *
//  * Rate Limited: 5 requests per IP per 15 minutes
//  *
//  * Request Body:
//  * {
//  *   fullName: string (required, min 2 chars)
//  *   email: string (required, valid email)
//  *   phone: string (required, min 10 digits)
//  *   company: string (optional)
//  *   service: string (required)
//  *   message: string (required, 10-2000 chars)
//  *   preferredContact: string (optional, default: 'Email')
//  * }
//  */
// app.post('/api/consultation', consultationLimiter, async (req, res) => {
//   try {
//     // Step 1: Validate request body
//     const errors = validate(req.body);
//     if (errors.length) {
//       return res.status(400).json({
//         success: false,
//         message: errors.join('. '),
//       });
//     }

//     // Step 2: Destructure and sanitize input
//     const {
//       fullName,
//       email,
//       phone,
//       company = '',
//       service,
//       message,
//       preferredContact = 'Email',
//     } = req.body;

//     // Step 3: Create email transporter
//     const transporter = createTransporter();
//     if (!transporter) {
//       console.error(
//         '[SMTP] Missing SMTP configuration. Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD.'
//       );
//       return res.status(503).json({
//         success: false,
//         message:
//           'Email service is not configured. Please contact us directly at info@mrgsolutions.in',
//       });
//     }

//     // Step 4: Prepare email configuration
//     const receiver =
//       process.env.CONSULTATION_RECEIVER ||
//       process.env.SMTP_FROM ||
//       process.env.SMTP_USER;
//     const from = process.env.SMTP_FROM || process.env.SMTP_USER;
//     const submittedAt = new Date().toLocaleString('en-IN', {
//       timeZone: 'Asia/Kolkata',
//     });

//     // Step 5: Prepare plain text email
//     const text = `
// New Consultation Request
// ========================

// Name: ${fullName.trim()}
// Email: ${email.trim()}
// Phone: ${phone.trim()}
// Company: ${company.trim() || 'N/A'}
// Service: ${service}
// Preferred Contact Method: ${preferredContact}
// Submitted: ${submittedAt}

// Message:
// ${message.trim()}
// `.trim();

//     // Step 6: Prepare HTML email (with proper escaping)
//     const html = `
//       <h2 style="color:#062B49;">New Consultation Request</h2>
//       <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;width:100%;">
//         <tr style="background-color:#f7f6f2;">
//           <td style="padding:8px 12px;font-weight:bold;color:#062B49;">Name</td>
//           <td style="padding:8px 12px;">${escapeHtml(fullName.trim())}</td>
//         </tr>
//         <tr>
//           <td style="padding:8px 12px;font-weight:bold;color:#062B49;">Email</td>
//           <td style="padding:8px 12px;"><a href="mailto:${escapeHtml(email.trim())}">${escapeHtml(email.trim())}</a></td>
//         </tr>
//         <tr style="background-color:#f7f6f2;">
//           <td style="padding:8px 12px;font-weight:bold;color:#062B49;">Phone</td>
//           <td style="padding:8px 12px;"><a href="tel:${escapeHtml(phone.trim())}">${escapeHtml(phone.trim())}</a></td>
//         </tr>
//         <tr>
//           <td style="padding:8px 12px;font-weight:bold;color:#062B49;">Company</td>
//           <td style="padding:8px 12px;">${escapeHtml(company.trim() || 'N/A')}</td>
//         </tr>
//         <tr style="background-color:#f7f6f2;">
//           <td style="padding:8px 12px;font-weight:bold;color:#062B49;">Service</td>
//           <td style="padding:8px 12px;">${escapeHtml(service)}</td>
//         </tr>
//         <tr>
//           <td style="padding:8px 12px;font-weight:bold;color:#062B49;">Preferred Contact</td>
//           <td style="padding:8px 12px;">${escapeHtml(preferredContact)}</td>
//         </tr>
//         <tr style="background-color:#f7f6f2;">
//           <td style="padding:8px 12px;font-weight:bold;color:#062B49;">Submitted</td>
//           <td style="padding:8px 12px;">${escapeHtml(submittedAt)}</td>
//         </tr>
//       </table>
//       <h3 style="margin-top:20px;color:#062B49;">Message</h3>
//       <p style="white-space:pre-wrap;font-family:sans-serif;font-size:14px;line-height:1.6;">${escapeHtml(
//         message.trim()
//       )}</p>
//       <hr style="margin:20px 0;border:none;border-top:1px solid #e8e6e1;">
//       <p style="font-size:12px;color:#5a6a7a;">This is an automated email from the MRG Website. Please do not reply to this address. Reply using the customer email above.</p>
//     `;

//     // Step 7: Send email
//     await transporter.sendMail({
//       from: `"MRG Website" <${from}>`,
//       to: receiver,
//       replyTo: email.trim(),
//       subject: `Consultation Request — ${fullName.trim()} (${service})`,
//       text,
//       html,
//     });

//     // Step 8: Log successful submission
//     console.log(`[Consultation] Email sent for ${email.trim()} at ${submittedAt}`);

//     return res.json({
//       success: true,
//       message:
//         'Consultation request submitted successfully. We will contact you soon.',
//     });
//   } catch (err) {
//     console.error('[Consultation] Error:', err?.message || err);
//     return res.status(500).json({
//       success: false,
//       message: 'Unable to process your request. Please try again later.',
//     });
//   }
// });

// // ============================================================
// // 404 Handler
// // ============================================================
// app.use((_req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Endpoint not found',
//   });
// });

// // ============================================================
// // Global Error Handler
// // ============================================================
// app.use((err, _req, res, _next) => {
//   console.error('[Global Error]', err);
//   res.status(500).json({
//     success: false,
//     message: 'Internal server error',
//   });
// });

// // ============================================================
// // Start Server
// // ============================================================
// app.listen(PORT, () => {
//   console.log(`
// ╔════════════════════════════════════════╗
// ║      MRG API Server Started            ║
// ╚════════════════════════════════════════╝
// Environment:  ${NODE_ENV}
// Port:         ${PORT}
// SMTP:         ${
//     process.env.SMTP_HOST
//       ? '✓ Configured'
//       : '✗ Not configured (emails will fail)'
//   }
// Health Check: http://localhost:${PORT}/api/health
//   `);
// });

// export default app;





import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ============================================================
// CORS Configuration - Restricted for Production
// ============================================================
const isDevelopment = NODE_ENV === 'development';
const allowedOrigins = isDevelopment
  ? '*'
  : (process.env.ALLOWED_ORIGINS || 'https://mrgsolutions.in').split(',');

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200,
  })
);

// ============================================================
// Middleware
// ============================================================
app.use(express.json({ limit: '32kb' }));

// ============================================================
// Rate Limiting for Consultation Endpoint
// ============================================================
const consultationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many consultation requests. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => isDevelopment,
  keyGenerator: (req) => {
    return req.ip || req.connection.remoteAddress || '0.0.0.0';
  },
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many consultation requests. Please try again later.',
    });
  },
});

// ============================================================
// Validation Function
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

// ============================================================
// Nodemailer Transporter Setup
// ============================================================
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

// ============================================================
// HTML Escaping Function
// ============================================================
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ============================================================
// Routes
// ============================================================

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    environment: NODE_ENV,
    smtpConfigured: Boolean(
      process.env.SMTP_HOST &&
        process.env.SMTP_USER &&
        process.env.SMTP_PASSWORD
    ),
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

    const transporter = createTransporter();
    if (!transporter) {
      console.error(
        '[SMTP] Missing SMTP configuration. Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD.'
      );
      return res.status(503).json({
        success: false,
        message:
          'Email service is not configured. Please contact us directly at info@mrgsolutions.in',
      });
    }

    const receiver =
      process.env.CONSULTATION_RECEIVER ||
      process.env.SMTP_FROM ||
      process.env.SMTP_USER;
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;
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
      <h2 style="color:#062B49;">New Consultation Request</h2>
      <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;width:100%;">
        <tr style="background-color:#f7f6f2;">
          <td style="padding:8px 12px;font-weight:bold;color:#062B49;">Name</td>
          <td style="padding:8px 12px;">${escapeHtml(fullName.trim())}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:bold;color:#062B49;">Email</td>
          <td style="padding:8px 12px;"><a href="mailto:${escapeHtml(email.trim())}">${escapeHtml(email.trim())}</a></td>
        </tr>
        <tr style="background-color:#f7f6f2;">
          <td style="padding:8px 12px;font-weight:bold;color:#062B49;">Phone</td>
          <td style="padding:8px 12px;"><a href="tel:${escapeHtml(phone.trim())}">${escapeHtml(phone.trim())}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:bold;color:#062B49;">Company</td>
          <td style="padding:8px 12px;">${escapeHtml(company.trim() || 'N/A')}</td>
        </tr>
        <tr style="background-color:#f7f6f2;">
          <td style="padding:8px 12px;font-weight:bold;color:#062B49;">Service</td>
          <td style="padding:8px 12px;">${escapeHtml(service)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:bold;color:#062B49;">Preferred Contact</td>
          <td style="padding:8px 12px;">${escapeHtml(preferredContact)}</td>
        </tr>
        <tr style="background-color:#f7f6f2;">
          <td style="padding:8px 12px;font-weight:bold;color:#062B49;">Submitted</td>
          <td style="padding:8px 12px;">${escapeHtml(submittedAt)}</td>
        </tr>
      </table>
      <h3 style="margin-top:20px;color:#062B49;">Message</h3>
      <p style="white-space:pre-wrap;font-family:sans-serif;font-size:14px;line-height:1.6;">${escapeHtml(
        message.trim()
      )}</p>
      <hr style="margin:20px 0;border:none;border-top:1px solid #e8e6e1;">
      <p style="font-size:12px;color:#5a6a7a;">This is an automated email from the MRG Website. Please do not reply to this address. Reply using the customer email above.</p>
    `;

    await transporter.sendMail({
      from: `"MRG Website" <${from}>`,
      to: receiver,
      replyTo: email.trim(),
      subject: `Consultation Request — ${fullName.trim()} (${service})`,
      text,
      html,
    });

    console.log(`[Consultation] Email sent for ${email.trim()} at ${submittedAt}`);

    return res.json({
      success: true,
      message:
        'Consultation request submitted successfully. We will contact you soon.',
    });
  } catch (err) {
    console.error('[Consultation] Error:', err?.message || err);
    return res.status(500).json({
      success: false,
      message: 'Unable to process your request. Please try again later.',
    });
  }
});

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

app.use((err, _req, res, _next) => {
  console.error('[Global Error]', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║      MRG API Server Started            ║
╚════════════════════════════════════════╝
Environment:  ${NODE_ENV}
Port:         ${PORT}
SMTP:         ${
    process.env.SMTP_HOST
      ? '✓ Configured'
      : '✗ Not configured (emails will fail)'
  }
Health Check: http://localhost:${PORT}/api/health
  `);
});

export default app;