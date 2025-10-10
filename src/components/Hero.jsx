import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Hero = () => {
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

  // Simplified animations for reduced motion
  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 }
      }

  const buttonMotionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 }
      }

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      aria-label="Hero section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div {...motionProps}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 hero-gradient">
            Transforming Ideas into Magic
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Where AI & Innovation Meet Imagination
          </p>
          <motion.div {...buttonMotionProps}>
            <Link
              to="/services"
              className="bg-primary text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all inline-block"
              aria-label="Explore our services and solutions"
            >
              Explore Our Magic
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated sparkles - hidden if reduced motion preferred */}
      {!prefersReducedMotion && (
        <div aria-hidden="true" role="presentation">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Hero
