import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { getAvailableSlots, createAppointmentEvent, isSlotStillAvailable } from './calendar.js';
import { sendBookingEmails } from './email.js';
import { verifyTurnstile } from './lib/turnstile.js';
import { validateSubmission } from './lib/spam-protection.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Trust proxy for accurate IP (behind nginx/traefik)
app.set('trust proxy', true);

// Helper to get client IP
const getClientIP = (req) => {
  return req.ip ||
         req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
         req.headers['x-real-ip'] ||
         req.connection?.remoteAddress ||
         'unknown';
};

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get available appointment slots
app.get('/api/available-slots', async (req, res) => {
  try {
    const daysAhead = parseInt(req.query.days) || 14;
    const availability = await getAvailableSlots(Math.min(daysAhead, 30));

    res.set('Cache-Control', 'public, max-age=300'); // 5 minute cache
    res.json({
      success: true,
      availability
    });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch available slots'
    });
  }
});

// Submit booking
app.post('/api/booking', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      service,
      message,
      scheduledDatetime,
      turnstileToken,
      website  // Honeypot field
    } = req.body;

    const clientIP = getClientIP(req);

    // ============================================
    // SPAM PROTECTION LAYER 1: Honeypot + Rate Limit + Email Validation
    // ============================================
    const spamCheck = validateSubmission({
      email,
      ip: clientIP,
      honeypot: website
    });

    if (!spamCheck.passed) {
      if (spamCheck.silent) {
        // Bot detected - return fake success to confuse it
        console.log(`[SPAM] Bot detected from IP ${clientIP} - honeypot triggered`);
        return res.json({
          success: true,
          scheduled: false,
          message: 'Thank you for your inquiry! We\'ll be in touch within 24 hours.'
        });
      }
      // Real user hit rate limit or used disposable email
      console.log(`[SPAM] Blocked: ${spamCheck.reason} - IP: ${clientIP}, Email: ${email}`);
      return res.status(400).json({
        success: false,
        error: spamCheck.reason
      });
    }

    // ============================================
    // SPAM PROTECTION LAYER 2: Turnstile Verification
    // ============================================
    const turnstileResult = await verifyTurnstile(turnstileToken, clientIP);
    if (!turnstileResult.success) {
      console.log(`[SPAM] Turnstile failed for IP ${clientIP}: ${turnstileResult.error}`);
      return res.status(400).json({
        success: false,
        error: turnstileResult.error || 'Security verification failed. Please refresh and try again.'
      });
    }

    // ============================================
    // STANDARD VALIDATION
    // ============================================
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    let calendarEventId = null;
    let scheduled = false;

    // If a specific datetime was selected, create calendar event
    if (scheduledDatetime) {
      // Double-check slot is still available
      const stillAvailable = await isSlotStillAvailable(scheduledDatetime);
      if (!stillAvailable) {
        return res.status(409).json({
          success: false,
          error: 'This time slot is no longer available. Please select another time.'
        });
      }

      // Create calendar event
      calendarEventId = await createAppointmentEvent({
        name,
        email,
        phone,
        service,
        message,
        datetime: scheduledDatetime
      });
      scheduled = true;
    }

    // Send email notifications
    try {
      await sendBookingEmails({
        name,
        email,
        phone,
        service,
        message,
        scheduledDatetime,
        calendarEventId
      });
    } catch (emailError) {
      console.error('Email send failed (booking still created):', emailError);
    }

    console.log(`[BOOKING] Success - Name: ${name}, Email: ${email}, Scheduled: ${scheduled}, IP: ${clientIP}`);

    res.json({
      success: true,
      scheduled,
      calendarEventId,
      message: scheduled
        ? `Your consultation is confirmed for ${new Date(scheduledDatetime).toLocaleString()}. Check your email for details!`
        : 'Thank you for your inquiry! We\'ll be in touch within 24 hours.'
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process booking. Please try again.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Booking server running on port ${PORT}`);
  console.log(`Turnstile protection: ${process.env.TURNSTILE_SECRET_KEY ? 'ENABLED' : 'DISABLED'}`);
});
