import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import BackgroundSparkles from '../components/BackgroundSparkles'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa'
import '../styles/Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitStatus, setSubmitStatus] = useState(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : ''
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email address' : ''
      case 'subject':
        return value.trim().length < 3 ? 'Subject must be at least 3 characters' : ''
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters' : ''
      default:
        return ''
    }
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))

    // Validate on change if field was touched
    if (touched[id]) {
      const error = validateField(id, value)
      setErrors(prev => ({ ...prev, [id]: error }))
    }
  }

  const handleBlur = (e) => {
    const { id, value } = e.target
    setTouched(prev => ({ ...prev, [id]: true }))
    const error = validateField(id, value)
    setErrors(prev => ({ ...prev, [id]: error }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate all fields
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key])
      if (error) newErrors[key] = error
    })

    setErrors(newErrors)
    setTouched({ name: true, email: true, subject: true, message: true })

    if (Object.keys(newErrors).length === 0) {
      // Form is valid - submit
      setSubmitStatus('success')

      // Reset form after success
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTouched({})
        setSubmitStatus(null)
      }, 3000)
    } else {
      setSubmitStatus('error')
    }
  }

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: 0.2 }
      }

  const hoverProps = prefersReducedMotion ? {} : { whileHover: { scale: 1.1 } }
  const buttonProps = prefersReducedMotion ? {} : { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } }

  return (
    <div className="page-container">
      <BackgroundSparkles />
      <PageHeader
        title="Contact Us"
        subtitle="Let's create something magical together"
        backgroundVariant="contact"
      />

      <section className="page-content" aria-label="Contact form and information">
        <div className="container">
          <div className="contact-grid">
            <motion.div className="contact-info" {...motionProps}>
              <div className="card-base">
                <h2 className="card-title">Get in Touch</h2>
                <div className="contact-details" role="list">
                  <div className="contact-item" role="listitem">
                    <FaEnvelope aria-hidden="true" />
                    <a href="mailto:hello@magicunicorn.tech">hello@magicunicorn.tech</a>
                  </div>
                  <div className="contact-item" role="listitem">
                    <FaPhone aria-hidden="true" />
                    <a href="tel:+15551234567">+1 (555) 123-4567</a>
                  </div>
                  <div className="contact-item" role="listitem">
                    <FaMapMarkerAlt aria-hidden="true" />
                    <address style={{ fontStyle: 'normal' }}>
                      123 Innovation Street<br />Tech Valley, CA 94025
                    </address>
                  </div>
                </div>
                <nav className="social-links" aria-label="Social media links">
                  <motion.a
                    href="https://github.com/magicunicorn"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our GitHub profile"
                    {...hoverProps}
                  >
                    <FaGithub aria-hidden="true" />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/company/magicunicorn"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our LinkedIn page"
                    {...hoverProps}
                  >
                    <FaLinkedin aria-hidden="true" />
                  </motion.a>
                  <motion.a
                    href="https://twitter.com/magicunicorntech"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our Twitter profile"
                    {...hoverProps}
                  >
                    <FaTwitter aria-hidden="true" />
                  </motion.a>
                </nav>
              </div>
            </motion.div>

            <motion.div
              className="contact-form-container"
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              transition={prefersReducedMotion ? {} : { delay: 0.3 }}
            >
              <form
                className="contact-form card-base"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
              >
                <div className="form-group">
                  <label htmlFor="name">
                    Name <span className="required-indicator" aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {touched.name && errors.name && (
                    <div className="error-message" id="name-error" role="alert">
                      <FaExclamationCircle aria-hidden="true" />
                      {errors.name}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Email <span className="required-indicator" aria-label="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {touched.email && errors.email && (
                    <div className="error-message" id="email-error" role="alert">
                      <FaExclamationCircle aria-hidden="true" />
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="subject">
                    Subject <span className="required-indicator" aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-invalid={errors.subject ? 'true' : 'false'}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  />
                  {touched.subject && errors.subject && (
                    <div className="error-message" id="subject-error" role="alert">
                      <FaExclamationCircle aria-hidden="true" />
                      {errors.subject}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    Message <span className="required-indicator" aria-label="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {touched.message && errors.message && (
                    <div className="error-message" id="message-error" role="alert">
                      <FaExclamationCircle aria-hidden="true" />
                      {errors.message}
                    </div>
                  )}
                </div>

                {submitStatus === 'success' && (
                  <div className="success-message" role="alert">
                    <FaCheckCircle aria-hidden="true" />
                    Message sent successfully! We'll be in touch soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="error-message" role="alert">
                    <FaExclamationCircle aria-hidden="true" />
                    Please fix the errors above before submitting.
                  </div>
                )}

                <motion.button
                  type="submit"
                  className="btn btn-primary"
                  {...buttonProps}
                  aria-label="Submit contact form"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
