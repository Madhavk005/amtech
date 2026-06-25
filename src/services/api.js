/**
 * API Service
 * Communicates with the backend server to submit forms and handle external requests.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

/**
 * Submits a standard contact or inquiry form.
 * @param {Object} data - The form fields
 */
export async function submitContactForm(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to submit contact form');
    }
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.message || 'Network error: Failed to connect to server.');
  }
}

/**
 * Submits a quotation request from the Configurator.
 * @param {Object} config - The generated crane configuration
 */
export async function submitQuoteRequest(config) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to submit quote request');
    }
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.message || 'Network error: Failed to connect to server.');
  }
}
