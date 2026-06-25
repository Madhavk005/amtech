const { Resend } = require('resend');

/**
 * Resend Provider Implementation
 */
class ResendProvider {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('ResendProvider requires an API key');
    }
    this.client = new Resend(apiKey);
    this.isVerified = false;
  }

  async initialize() {
    // Optional: Try to verify domain or check API key validity by querying domains
    try {
      // Just check if we can reach the domains endpoint.
      // Note: Getting domains requires an API key with appropriate permissions.
      const response = await this.client.domains.list();
      if (response && response.error) {
         console.warn('\n⚠️  [Resend Warning] API Key may lack permissions or is invalid.');
      } else {
         this.isVerified = true;
         // Check if the actual SENDER_EMAIL domain is in the verified list
         // Assuming SENDER_EMAIL format: no-reply@example.com
         const senderEmail = process.env.SENDER_EMAIL || '';
         const senderDomain = senderEmail.split('@')[1];
         
         const hasVerifiedDomain = response?.data?.data?.some(d => d.name === senderDomain && d.status === 'verified');
         if (!hasVerifiedDomain && senderDomain && senderDomain !== 'resend.dev') {
           console.warn(`\n⚠️  [Resend Warning] The domain '${senderDomain}' does not appear to be fully verified in Resend.`);
           console.warn('   Ensure you have added the required DNS records (TXT/MX) to your domain registrar.');
           console.warn('   Emails sent from an unverified domain will likely be rejected or land in spam.\n');
         }
      }
    } catch (error) {
      console.warn('\n⚠️  [Resend Warning] Could not verify domain status. Your API key might be invalid or a sandbox key.');
      console.warn('   Error details: ' + error.message + '\n');
    }
  }

  async sendEmail(options) {
    const payload = {
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text
    };

    if (options.replyTo) {
      payload.reply_to = options.replyTo;
    }

    const result = await this.client.emails.send(payload);

    if (result.error) {
      // Throw error to trigger retry logic or upstream catch
      throw new Error(result.error.message || 'Unknown Resend API error');
    }

    return result.data;
  }
}

module.exports = ResendProvider;
