import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import BackgroundSparkles from '../components/BackgroundSparkles';
import TimeSlotPicker from '../components/TimeSlotPicker';
import { FaCalendarCheck, FaEnvelope, FaPhone, FaUser, FaComment, FaMagic, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import '../styles/Book.css';

const API_BASE = import.meta.env.VITE_API_URL || '';
const TURNSTILE_SITE_KEY = '0x4AAAAAACKgOnyqbbjzMNFA';

const services = [
  { value: 'ai-solutions', label: 'AI Solutions', icon: '🤖' },
  { value: 'automation', label: 'Automation', icon: '⚡' },
  { value: 'development', label: 'Custom Development', icon: '💻' },
  { value: 'analytics', label: 'Data Analytics', icon: '📊' },
  { value: 'creative', label: 'Creative Tech', icon: '🎨' },
  { value: 'innovation', label: 'Innovation Lab', icon: '🚀' },
  { value: 'internship', label: 'Internship', icon: '🎓' },
  { value: 'accelerator', label: 'Technical Accelerator', icon: '🚀' },
  { value: 'other', label: 'Other / Not Sure', icon: '✨' }
];

function Book() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [turnstileToken, setTurnstileToken] = useState(null);
  const turnstileRef = useRef(null);
  const turnstileWidgetId = useRef(null);

  // Load Turnstile script and render widget
  useEffect(() => {
    // Check if script already loaded
    if (window.turnstile) {
      renderTurnstileWidget();
      return;
    }

    // Load Turnstile script
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad';
    script.async = true;
    script.defer = true;

    // Set up callback for when script loads
    window.onTurnstileLoad = () => {
      renderTurnstileWidget();
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup widget on unmount
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
      }
      delete window.onTurnstileLoad;
    };
  }, []);

  const renderTurnstileWidget = () => {
    if (turnstileRef.current && window.turnstile && !turnstileWidgetId.current) {
      turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token) => {
          setTurnstileToken(token);
        },
        'expired-callback': () => {
          setTurnstileToken(null);
        },
        'error-callback': () => {
          setTurnstileToken(null);
        },
        theme: 'dark',
        appearance: 'always'
      });
    }
  };

  // Reset Turnstile after form reset
  const resetTurnstile = () => {
    if (turnstileWidgetId.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId.current);
      setTurnstileToken(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const formatPhone = (value) => {
    // Strip non-numeric
    const numbers = value.replace(/\D/g, '');
    // Format as (XXX) XXX-XXXX
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Check Turnstile token
    if (!turnstileToken) {
      setSubmitResult({
        success: false,
        message: 'Please complete the security check and try again.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Get honeypot value (should be empty for real users)
      const honeypotValue = document.getElementById('website')?.value || '';

      const response = await fetch(`${API_BASE}/api/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          scheduledDatetime: selectedSlot?.datetime || null,
          turnstileToken,
          website: honeypotValue  // Honeypot field
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmitResult({
          success: true,
          message: data.message,
          scheduled: data.scheduled
        });
        // Reset form
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        setSelectedSlot(null);
        resetTurnstile();
      } else {
        setSubmitResult({
          success: false,
          message: data.error || 'Something went wrong. Please try again.'
        });
        // Reset Turnstile on error so user can retry
        resetTurnstile();
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmitResult({
        success: false,
        message: 'Unable to connect to the server. Please try again later.'
      });
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <BackgroundSparkles />
      <PageHeader
        title="Book a Consultation"
        subtitle="Schedule a free consultation to discuss your project"
        backgroundVariant="services"
      />

      <main className="page-content">
        <div className="container">
          <AnimatePresence mode="wait">
            {submitResult?.success ? (
              <motion.div
                className="success-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="success-card card-base">
                  <FaCheckCircle className="success-icon" />
                  <h2>{submitResult.scheduled ? 'Consultation Scheduled!' : 'Request Received!'}</h2>
                  <p>{submitResult.message}</p>
                  {submitResult.scheduled && (
                    <p className="calendar-note">
                      <FaCalendarCheck /> A calendar invite has been sent to your email
                    </p>
                  )}
                  <motion.button
                    className="btn btn-primary"
                    onClick={() => setSubmitResult(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Another
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="booking-layout"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Time Slot Selection */}
                <motion.div
                  className="booking-section"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="section-header">
                    <FaCalendarCheck className="section-icon" />
                    <div>
                      <h3>Select a Time</h3>
                      <p>Choose your preferred consultation time (optional)</p>
                    </div>
                  </div>
                  <TimeSlotPicker
                    onSelect={handleSlotSelect}
                    selectedSlot={selectedSlot}
                  />
                </motion.div>

                {/* Booking Form */}
                <motion.div
                  className="booking-section"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="section-header">
                    <FaMagic className="section-icon" />
                    <div>
                      <h3>Your Details</h3>
                      <p>Tell us about yourself and your project</p>
                    </div>
                  </div>

                  <form className="booking-form card-base" onSubmit={handleSubmit}>
                    {submitResult && !submitResult.success && (
                      <div className="error-banner">
                        {submitResult.message}
                      </div>
                    )}

                    {/* Honeypot field - hidden from real users, bots will fill it */}
                    <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">
                        <FaUser /> Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={errors.name ? 'error' : ''}
                      />
                      {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">
                        <FaEnvelope /> Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={errors.email ? 'error' : ''}
                      />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">
                        <FaPhone /> Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder="(555) 123-4567"
                        maxLength={14}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="service">
                        <FaMagic /> Service Interest
                      </label>
                      <div className="service-selector">
                        {services.map((service) => (
                          <button
                            key={service.value}
                            type="button"
                            className={`service-option ${formData.service === service.value ? 'selected' : ''}`}
                            onClick={() => setFormData(prev => ({ ...prev, service: service.value }))}
                          >
                            <span className="service-icon">{service.icon}</span>
                            <span>{service.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">
                        <FaComment /> Tell us about your project
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="What are you looking to build? Any specific goals or challenges?"
                        rows={4}
                      />
                    </div>

                    {/* Cloudflare Turnstile Widget */}
                    <div className="turnstile-container" ref={turnstileRef}></div>

                    <motion.button
                      type="submit"
                      className="btn btn-primary submit-btn"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="spinner" />
                          Submitting...
                        </>
                      ) : selectedSlot ? (
                        <>
                          <FaCalendarCheck />
                          Schedule Consultation
                        </>
                      ) : (
                        <>
                          <FaEnvelope />
                          Send Inquiry
                        </>
                      )}
                    </motion.button>

                    <p className="form-note">
                      {selectedSlot
                        ? "You'll receive a calendar invite and confirmation email."
                        : "We'll respond within 24 hours to schedule your consultation."}
                    </p>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default Book;
