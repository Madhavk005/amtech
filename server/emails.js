/**
 * Email Template Generator
 */

const COMPANY_NAME = 'Amtech Cranes';
const LOGO_URL = 'https://madhavk005.github.io/amtech/logo.png'; // Placeholder for live logo

const baseTemplate = (title, content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9f9f9; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .header { background: #000000; padding: 24px; text-align: center; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
    .content { padding: 32px; }
    .content h2 { color: #111; margin-top: 0; }
    .data-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    .data-table th, .data-table td { padding: 12px; border-bottom: 1px solid #eee; text-align: left; }
    .data-table th { width: 35%; color: #666; font-weight: 500; }
    .footer { background: #f1f1f1; padding: 20px; text-align: center; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${COMPANY_NAME}</h1>
    </div>
    <div class="content">
      <h2>${title}</h2>
      ${content}
    </div>
    <div class="footer">
      <p>This is an automated message from the ${COMPANY_NAME} system.</p>
      <p>&copy; ${new Date().getFullYear()} ${COMPANY_NAME}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

exports.generateInquiryNotification = (data) => {
  const content = `
    <p>A new inquiry has been submitted via the website.</p>
    <table class="data-table">
      <tr><th>Name</th><td>${data.name}</td></tr>
      <tr><th>Email</th><td>${data.email}</td></tr>
      <tr><th>Phone</th><td>${data.phone || 'N/A'}</td></tr>
      <tr><th>Company</th><td>${data.company || 'N/A'}</td></tr>
      <tr><th>Subject</th><td>${data.subject}</td></tr>
      <tr><th>Source</th><td>${data.source || 'Website Contact Form'}</td></tr>
      <tr><th>Timestamp</th><td>${new Date().toISOString()}</td></tr>
    </table>
    <br>
    <h3>Message:</h3>
    <p style="background: #f5f5f5; padding: 15px; border-left: 4px solid #000;">${data.message.replace(/\\n/g, '<br>')}</p>
  `;
  return baseTemplate('New Website Inquiry', content);
};

exports.generateQuoteNotification = (data) => {
  const content = `
    <p>A new quotation request has been generated via the Engineering Configurator.</p>
    <table class="data-table">
      <tr><th>Name</th><td>${data.name}</td></tr>
      <tr><th>Email</th><td>${data.email}</td></tr>
      <tr><th>Phone</th><td>${data.phone}</td></tr>
      <tr><th>Company</th><td>${data.company}</td></tr>
      <tr><th>Timeline</th><td>${data.timeline}</td></tr>
      <tr><th>Timestamp</th><td>${new Date().toISOString()}</td></tr>
    </table>
    
    <h3>Technical Brief</h3>
    <table class="data-table" style="background: #fdfdfd;">
      <tr><th>Equipment Type</th><td><strong>${data.typeId}</strong></td></tr>
      <tr><th>Load Capacity</th><td>${data.loadCapacity} Tons</td></tr>
      <tr><th>Span Length</th><td>${data.spanLength} m</td></tr>
      <tr><th>Lift Height</th><td>${data.liftHeight} m</td></tr>
      <tr><th>Duty Class</th><td>${data.dutyClass}</td></tr>
      <tr><th>Environment</th><td>${data.environment}</td></tr>
      <tr><th>Target Industry</th><td>${data.industry}</td></tr>
    </table>
  `;
  return baseTemplate('New Quotation Request', content);
};

exports.generateAutoReply = (name, type) => {
  let title = 'Thank you for contacting Amtech Cranes';
  let body = `
    <p>Dear ${name},</p>
    <p>We have successfully received your inquiry. Our team is currently reviewing your request and will get back to you shortly.</p>
    <p>If you have any urgent queries, please do not hesitate to call us directly.</p>
    <p>Best Regards,<br><strong>Amtech Cranes Team</strong></p>
  `;

  if (type === 'quote') {
    title = 'Quotation Request Received';
    body = `
      <p>Dear ${name},</p>
      <p>Thank you for submitting a technical configuration through our system. Our engineering and sales team has received your brief.</p>
      <p>We will prepare a detailed proposal based on your specifications and contact you shortly to discuss further technical requirements.</p>
      <p>Best Regards,<br><strong>Amtech Cranes Engineering Team</strong></p>
    `;
  }

  return baseTemplate(title, body);
};
