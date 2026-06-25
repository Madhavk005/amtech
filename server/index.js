require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { Resend } = require('resend');
const { 
  generateInquiryNotification, 
  generateQuoteNotification, 
  generateAutoReply 
} = require('./emails');

// Initialization
const app = express();
const PORT = process.env.PORT || 5001;

// Make sure to add RESEND_API_KEY in your .env file
// Get it from https://resend.com
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key');

// Routing Configuration
// Use a verified domain in production for sender (e.g. no-reply@amtechcranes.com)
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'onboarding@resend.dev';
const SALES_EMAIL = process.env.SALES_EMAIL || 'sales@amtechcranes.com';
const SERVICE_EMAIL = process.env.SERVICE_EMAIL || 'service@amtechcranes.com';

// Middleware
app.use(helmet()); // Secure HTTP headers
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Restrict this in production
  methods: ['POST', 'OPTIONS'],
}));
app.use(express.json()); // Parse JSON bodies

// Structured Logging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes.' }
});

app.use('/api/', apiLimiter);

// Input Sanitization helper
const sanitizeText = (text) => {
  if (!text) return '';
  return text.replace(/<[^>]*>?/gm, ''); // Basic HTML tag stripping
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
    const isServiceRequest = cleanData.subject.toLowerCase().includes('service') || 
                             cleanData.subject.toLowerCase().includes('maintenance') ||
                             cleanData.subject.toLowerCase().includes('repair');
    
    const targetEmail = isServiceRequest ? SERVICE_EMAIL : SALES_EMAIL;

    // 1. Send Internal Notification
    const internalEmail = await resend.emails.send({
      from: `Amtech System <${SENDER_EMAIL}>`,
      to: [targetEmail],
      subject: `New ${isServiceRequest ? 'Service' : 'Sales'} Inquiry: ${cleanData.subject}`,
      html: generateInquiryNotification(cleanData),
      reply_to: cleanData.email
    });

    if (internalEmail.error) {
      console.error('[Resend Error - Internal]', internalEmail.error);
      throw new Error('Failed to route internal email.');
    }

    // 2. Send Customer Auto-Reply
    await resend.emails.send({
      from: `Amtech Cranes <${SENDER_EMAIL}>`,
      to: [cleanData.email],
      subject: 'Thank you for your inquiry',
      html: generateAutoReply(cleanData.name, 'contact')
    });

    console.log(`[Success] Contact form processed for ${cleanData.email}`);
    
    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully.'
    });

  } catch (error) {
    console.error('[Server Error - /api/contact]', error);
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

    // Sanitization (Sanitize user inputs)
    const cleanData = {
      ...config,
      name: sanitizeText(config.name),
      email: sanitizeText(config.email).toLowerCase(),
      phone: sanitizeText(config.phone),
      company: sanitizeText(config.company),
      timeline: sanitizeText(config.timeline),
    };

    // 1. Send Internal Notification to Sales
    const internalEmail = await resend.emails.send({
      from: `Amtech System <${SENDER_EMAIL}>`,
      to: [SALES_EMAIL],
      subject: `New Quotation Request - ${cleanData.loadCapacity}T ${cleanData.typeId.replace('-', ' ').toUpperCase()}`,
      html: generateQuoteNotification(cleanData),
      reply_to: cleanData.email
    });

    if (internalEmail.error) {
      console.error('[Resend Error - Internal Quote]', internalEmail.error);
      throw new Error('Failed to route internal quote email.');
    }

    // 2. Send Customer Auto-Reply
    await resend.emails.send({
      from: `Amtech Cranes <${SENDER_EMAIL}>`,
      to: [cleanData.email],
      subject: 'Quotation Request Received - Amtech Cranes',
      html: generateAutoReply(cleanData.name, 'quote')
    });

    console.log(`[Success] Quote request processed for ${cleanData.email}`);

    return res.status(200).json({
      success: true,
      message: 'Quotation request successfully transmitted.'
    });

  } catch (error) {
    console.error('[Server Error - /api/quotes]', error);
    return res.status(500).json({ success: false, message: 'An internal server error occurred while submitting your quotation request.' });
  }
});

app.listen(PORT, () => {
  console.log(`[Amtech Backend] API Server running on port ${PORT}`);
  console.log(`[Amtech Backend] Sales Routing: ${SALES_EMAIL}`);
  console.log(`[Amtech Backend] Service Routing: ${SERVICE_EMAIL}`);
});
