/**
 * Cloudflare Turnstile verification
 * Invisible CAPTCHA to block automated bots
 */

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * Verify a Turnstile token from the frontend
 * @param {string} token - The cf-turnstile-response token from the form
 * @param {string} ip - The user's IP address (optional, for additional validation)
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function verifyTurnstile(token, ip = null) {
  if (!token) {
    return { success: false, error: 'Missing Turnstile token' };
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY not configured');
    // Fail open in development, fail closed in production
    if (process.env.NODE_ENV === 'development') {
      console.warn('Turnstile verification skipped (development mode)');
      return { success: true };
    }
    return { success: false, error: 'Server configuration error' };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (ip) {
      formData.append('remoteip', ip);
    }

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      return { success: true };
    } else {
      console.warn('Turnstile verification failed:', data['error-codes']);
      return {
        success: false,
        error: 'Security verification failed. Please try again.'
      };
    }
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return { success: false, error: 'Security verification unavailable' };
  }
}
