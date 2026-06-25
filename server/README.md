# Amtech Cranes Email Backend

This directory contains the production-ready Node.js/Express backend required to handle form submissions and dispatch emails securely using an abstracted `EmailService`.

## Features
- **Provider Agnostic**: Core application logic uses an `EmailService` interface. Currently configured with `ResendProvider`, but swapping providers (SendGrid, Amazon SES) simply requires writing a new provider class.
- **Dynamic Routing**: Inquiries are automatically routed to `SALES_EMAIL` or `SERVICE_EMAIL` depending on content/subject.
- **Startup Validation**: Halts the application immediately if critical environment variables are missing.
- **Domain Verification Warning**: The application attempts to verify your sender domain configuration on startup.
- **Security & Reliability**: Built-in HTTP security headers (`helmet`), strict rate limiting (`express-rate-limit`), request validation, sanitization, and automated retry mechanisms for email dispatch.
- **Templates**: Professional HTML emails with plain-text fallback capabilities.

## Requirements

You must define an `.env` file at the root of `server/` with the following required variables:

```env
PORT=5001
FRONTEND_URL=http://localhost:5173

# Resend API Configuration
RESEND_API_KEY=re_your_api_key_here

# Amtech Routing Logic
SENDER_EMAIL=no-reply@amtechcranes.com
SALES_EMAIL=sales@amtechcranes.com
SERVICE_EMAIL=service@amtechcranes.com
```

> **Note**: Do **NOT** commit your `.env` file to version control. An `.env.example` has been provided for reference.

## Domain Verification (Resend)

To ensure high deliverability and avoid spam folders, your `SENDER_EMAIL` domain (e.g. `amtechcranes.com`) must be verified in your provider's dashboard.

1. Go to [Resend Domains](https://resend.com/domains).
2. Add `amtechcranes.com`.
3. Copy the provided DNS records (usually TXT and MX records) to your domain registrar (GoDaddy, Cloudflare, etc.).
4. The server will print a warning on startup if the domain is not fully verified.

## Deployment Checklist

- [ ] Obtain a production API key from Resend.
- [ ] Add the API key and correct email routing variables to your production environment variables.
- [ ] Deploy the `/server` folder to a Node.js hosting provider (e.g. Render, Heroku, AWS Elastic Beanstalk).
- [ ] Update your frontend's `VITE_API_URL` environment variable to point to the live server URL (e.g., `https://api.amtechcranes.com`).
- [ ] Add the DNS records provided by Resend to verify your domain.

## Switching Providers

If you ever wish to move away from Resend:
1. Create a new file in `server/services/providers/NewProvider.js`.
2. Implement the `initialize()` and `sendEmail(options)` methods.
3. Update `server/index.js` to instantiate `NewProvider` instead of `ResendProvider` and pass it to `new EmailService(newProvider)`.
