/**
 * Email Service Abstraction Layer
 * Allows switching providers seamlessly without refactoring application logic.
 */
class EmailService {
  constructor(provider) {
    if (!provider) {
      throw new Error('EmailService requires a provider implementation');
    }
    this.provider = provider;
  }

  /**
   * Initializes the provider (e.g. validating API keys, checking domain status).
   * @returns {Promise<void>}
   */
  async initialize() {
    if (typeof this.provider.initialize === 'function') {
      await this.provider.initialize();
    }
  }

  /**
   * Sends an email using the configured provider.
   * @param {Object} options
   * @param {string} options.from
   * @param {string[]} options.to
   * @param {string} options.subject
   * @param {string} options.html
   * @param {string} options.text - Plain text fallback
   * @param {string} [options.replyTo]
   * @returns {Promise<Object>}
   */
  async sendEmail(options) {
    if (!options.to || !options.to.length || !options.from || !options.subject || !options.html) {
      throw new Error('Missing required email fields (to, from, subject, html)');
    }

    // Default plain text fallback if not provided
    if (!options.text) {
      options.text = options.html.replace(/<[^>]*>?/gm, ''); // Basic strip
    }

    try {
      return await this.provider.sendEmail(options);
    } catch (error) {
      console.error(`[EmailService Error] Provider failed to send email: ${error.message}`);
      throw error;
    }
  }
}

module.exports = EmailService;
