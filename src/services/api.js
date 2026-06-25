/**
 * Mock API Service
 * Intercepts frontend requests and routes them to standard Fetch APIs.
 * Since a backend server is not currently deployed, this simulates network latency,
 * response validation, and data formatting. It is architected to be a drop-in replacement 
 * for a real backend (e.g. Node.js/Express or Firebase Functions).
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Simulates a delay for mock network requests
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Submits a standard contact or inquiry form.
 * @param {Object} data - The form fields
 */
export async function submitContactForm(data) {
  // If a real API URL exists, we would use fetch:
  if (API_BASE_URL) {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to submit contact form');
    }
    return response.json();
  }

  // Simulated backend processing (Data Validation & Storage mock)
  await delay(1200);

  if (!data.email || !data.message) {
    throw new Error('Backend Validation Failed: Email and Message are required.');
  }

  // Success mock
  return {
    success: true,
    message: 'Contact form successfully processed.',
    timestamp: new Date().toISOString()
  };
}

/**
 * Submits a quotation request from the Configurator.
 * @param {Object} config - The generated crane configuration
 */
export async function submitQuoteRequest(config) {
  if (API_BASE_URL) {
    const response = await fetch(`${API_BASE_URL}/api/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to submit quote request');
    }
    return response.json();
  }

  // Simulated backend processing (Quote Generation & Email Routing mock)
  await delay(1500);

  if (!config.email || !config.name || !config.typeId) {
    throw new Error('Backend Validation Failed: Incomplete configuration payload.');
  }

  // Success mock
  return {
    success: true,
    message: 'Quotation request logged and routed to sales team.',
    quoteId: `QT-${Math.floor(Math.random() * 100000)}`,
    timestamp: new Date().toISOString()
  };
}
