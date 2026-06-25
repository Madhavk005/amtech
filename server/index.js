require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const EmailService = require('./services/EmailService');
const ResendProvider = require('./services/providers/ResendProvider');

const { 
  generateInquiryNotification, 
  generateQuoteNotification, 
  generateAutoReply 
} = require('./emails');

// ==========================================
// ENVIRONMENT VALIDATION
// ==========================================
const requiredEnvVars = [
  'RESEND_API_KEY',
  'SENDER_EMAIL',
  'SALES_EMAIL',
  'SERVICE_EMAIL'
];

const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingVars.length > 0) {
  console.error('\n❌ [FATAL ERROR] Server startup failed.');
  console.error('Missing the following required environment variables:');
  missingVars.forEach(v => console.error(`  - ${v}`));
  console.error('\nPlease verify your .env file is correctly configured before starting the server.\n');
  process.exit(1);
}

// Initialization
const app = express();
const PORT = process.env.PORT || 5001;

// Provider Setup
const resendProvider = new ResendProvider(process.env.RESEND_API_KEY);
const emailService = new EmailService(resendProvider);

// Routing Configuration
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SALES_EMAIL = process.env.SALES_EMAIL;
const SERVICE_EMAIL = process.env.SERVICE_EMAIL;

// Middleware
app.use(helmet()); // Secure HTTP headers
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', 
  methods: ['POST', 'OPTIONS'],
}));
app.use(express.json()); // Parse JSON bodies

// Structured Logging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
  next();
});

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);

// Input Sanitization helper
const sanitizeText = (text) => {
  if (!text) return '';
  return text.replace(/<[^>]*>?/gm, ''); // Basic HTML tag stripping
};

// Retry Helper
const withRetry = async (fn, retries = 2, delayMs = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    console.warn(`[Retry] Operation failed, retrying in ${delayMs}ms...`);
    await new Promise(resolve => setTimeout(resolve, delayMs));
    return withRetry(fn, retries - 1, delayMs * 2);
  }
};

// ==========================================
// ROUTES
// ==========================================

// Health Check
app.get('/health', (req, res) => res.status(200).json({ status: 'ok', timestamp: new Date() }));

/**
 * General Contact & Inquiry Form
 */
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, company, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required fields.' });
    }

    // Sanitization
    const cleanData = {
      name: sanitizeText(name),
      email: sanitizeText(email).toLowerCase(),
      phone: sanitizeText(phone),
      company: sanitizeText(company),
      subject: sanitizeText(subject),
      message: sanitizeText(message),
      source: 'Contact Form'
    };

    // Determine routing based on subject
    const subjectLower = cleanData.subject.toLowerCase();
    const isServiceRequest = subjectLower.includes('service') || 
                             subjectLower.includes('maintenance') ||
                             subjectLower.includes('repair');
    
    const targetEmail = isServiceRequest ? SERVICE_EMAIL : SALES_EMAIL;

    // 1. Send Internal Notification
    await withRetry(async () => {
      await emailService.sendEmail({
        from: `Amtech System <${SENDER_EMAIL}>`,
        to: [targetEmail],
        subject: `New ${isServiceRequest ? 'Service' : 'Sales'} Inquiry: ${cleanData.subject}`,
        html: generateInquiryNotification(cleanData),
        replyTo: cleanData.email
      });
    });

    // 2. Send Customer Auto-Reply
    await withRetry(async () => {
      await emailService.sendEmail({
        from: `Amtech Cranes <${SENDER_EMAIL}>`,
        to: [cleanData.email],
        subject: 'Thank you for your inquiry',
        html: generateAutoReply(cleanData.name, 'contact')
      });
    });

    console.log(`[Success] Contact form processed for ${cleanData.email}`);
    
    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully.'
    });

  } catch (error) {
    console.error('[Server Error - /api/contact]', error.message);
    return res.status(500).json({ success: false, message: 'An internal server error occurred while sending your message.' });
  }
});

/**
 * Engineering Configurator / Quote Request
 */
app.post('/api/quotes', async (req, res) => {
  try {
    const config = req.body;

    // Validation
    if (!config.name || !config.email || !config.typeId || !config.loadCapacity) {
      return res.status(400).json({ success: false, message: 'Incomplete quotation data. Name, email, and technical specs are required.' });
    }

    // Sanitization
    const cleanData = {
      ...config,
      name: sanitizeText(config.name),
      email: sanitizeText(config.email).toLowerCase(),
      phone: sanitizeText(config.phone),
      company: sanitizeText(config.company),
      timeline: sanitizeText(config.timeline),
    };

    // 1. Send Internal Notification to Sales
    await withRetry(async () => {
      await emailService.sendEmail({
        from: `Amtech System <${SENDER_EMAIL}>`,
        to: [SALES_EMAIL],
        subject: `New Quotation Request - ${cleanData.loadCapacity}T ${cleanData.typeId.replace('-', ' ').toUpperCase()}`,
        html: generateQuoteNotification(cleanData),
        replyTo: cleanData.email
      });
    });

    // 2. Send Customer Auto-Reply
    await withRetry(async () => {
      await emailService.sendEmail({
        from: `Amtech Cranes <${SENDER_EMAIL}>`,
        to: [cleanData.email],
        subject: 'Quotation Request Received - Amtech Cranes',
        html: generateAutoReply(cleanData.name, 'quote')
      });
    });

    console.log(`[Success] Quote request processed for ${cleanData.email}`);

    return res.status(200).json({
      success: true,
      message: 'Quotation request successfully transmitted.'
    });

  } catch (error) {
    console.error('[Server Error - /api/quotes]', error.message);
    return res.status(500).json({ success: false, message: 'An internal server error occurred while submitting your quotation request.' });
  }
});

// Boot Sequence
(async () => {
  try {
    // Check provider health / domain verification
    await emailService.initialize();

    app.listen(PORT, () => {
      console.log(`\n🚀 [Amtech Backend] API Server running on port ${PORT}`);
      console.log(`📧 [Routing] Sales     -> ${SALES_EMAIL}`);
      console.log(`📧 [Routing] Service   -> ${SERVICE_EMAIL}`);
      console.log(`📧 [Provider] Sender   -> ${SENDER_EMAIL}`);
      console.log('🛡️  [Security] Helmet & Rate Limiting Enabled\n');
    });
  } catch (error) {
    console.error('❌ [FATAL ERROR] Failed to initialize Email Service:', error.message);
    process.exit(1);
  }
})();
