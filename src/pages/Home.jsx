import React, { lazy, Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ServiceOptions from '../components/ServiceOptions';
import { FaRocket, FaLightbulb, FaMagic } from 'react-icons/fa';
import { UnicornLogo } from '../images';
import '../styles/ServiceOptions.css';

// Lazy load components
const LazyImage = lazy(() => import('../components/LazyImage'));

// Array of cycling headline pairs - 2026 Edition
// 30 new headline/tagline pairs optimized for vision, execution, and impact
const headlinePairs = [
  // Tier 1: Vision + Execution
  { headline: "Where AI Meets Ambition", tagline: "Intelligence, but make it irresponsible." },
  { headline: "The Future's Favorite Tech Partner", tagline: "Tomorrow called. It wants to collaborate." },
  { headline: "Building Tomorrow's Unicorns Today", tagline: "Mythical results. Very real execution." },
  { headline: "Vision Without Execution is Hallucination", tagline: "Good thing we ship." },
  { headline: "Where Founders Come to Execute", tagline: "Ideas welcome. Delivery guaranteed." },
  { headline: "The Gap Between Should and Done? We Close It.", tagline: "Execution as a service. Excellence as standard." },
  { headline: "Your Technical Co-Founder. Only Better.", tagline: "All the talent, none of the equity drama." },
  { headline: "We Turn 'What If' Into 'Watch This'", tagline: "Speculation is boring. Shipping is sexy." },
  { headline: "Impossibly Fast. Impossibly Good.", tagline: "Pick both. We insist." },
  { headline: "The Innovation Engine Your Board Wishes You Had", tagline: "R&D meets ROI. Finally." },

  // Tier 2: Technical Excellence + Swagger
  { headline: "Code Like Your Valuation Depends On It", tagline: "Because it probably does." },
  { headline: "Enterprise Architecture, Startup Velocity", tagline: "Scale without the scars." },
  { headline: "AI That Actually Works", tagline: "Imagine that." },
  { headline: "Technical Debt? We Don't Speak That Language.", tagline: "Clean code. Clear thinking. Consistent wins." },
  { headline: "From Zero to Production-Ready in Record Time", tagline: "MVPs with attitude." },
  { headline: "The Tech Stack That Ships Itself", tagline: "Automation so good it feels like cheating." },
  { headline: "Built for Scale. Optimized for Speed. Designed for Delight.", tagline: "Three things most teams can't do. We do all three." },
  { headline: "Where Performance Metrics Meet Performance Art", tagline: "Fast code that looks good doing it." },
  { headline: "Serious Engineering with a Sense of Humor", tagline: "The code is flawless. The jokes are questionable." },
  { headline: "Technical Excellence Without the Technical Ego", tagline: "Just results. And maybe a little swagger." },

  // Tier 3: Market Position + Differentiation
  { headline: "Not Your Average Dev Shop", tagline: "Thank god." },
  { headline: "The Unicorn Builder's Secret Weapon", tagline: "Ask the ones who made it." },
  { headline: "Charleston's Best-Kept Tech Secret", tagline: "Now going global. You're welcome." },
  { headline: "Where Moonshots Meet Reality", tagline: "And reality wins." },
  { headline: "Innovation That Investors Actually Fund", tagline: "Visionary tech, bankable outcomes." },
  { headline: "The Agency That Acts Like Your In-House Team", tagline: "Except we ship faster." },
  { headline: "Premium Tech Without Premium Bureaucracy", tagline: "All craft, zero committee." },
  { headline: "Built Different. Shipped Better.", tagline: "Charleston made. Globally validated." },
  { headline: "The Technical Partner That Gets It", tagline: "Product sense. Business acumen. Technical chops." },
  { headline: "From Pitch Deck to Production", tagline: "We build what VCs bet on." }
];

export default function Home() {
  const [currentPairIndex] = useState(() =>
    Math.floor(Math.random() * headlinePairs.length)
  );
  return (
    <div className="home">
      <section className="hero-section">
        <Suspense fallback={<div>Loading...</div>}>
          <motion.img 
            src={UnicornLogo}
            alt="Magic Unicorn Logo" 
            className="hero-logo"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </Suspense>
        <motion.h1
          className="glowing-text"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {headlinePairs[currentPairIndex].headline}
        </motion.h1>
        <motion.p
          className="tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {headlinePairs[currentPairIndex].tagline}
        </motion.p>
      </section>

      <section className="services-section">
        <ServiceOptions />
      </section>

      <section className="features-section">
        <div className="container">
          <motion.div 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Why Choose Magic Unicorn Tech?</h2>
            <p>Where Innovation Meets Imagination</p>
          </motion.div>

          <div className="features-grid">
            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <FaRocket className="feature-icon" />
              <h3>Rapid Innovation</h3>
              <p>From concept to deployment in record time with our agile approach</p>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <FaLightbulb className="feature-icon" />
              <h3>Creative Solutions</h3>
              <p>Unique approaches to complex challenges using cutting-edge tech</p>
            </motion.div>

            <motion.div 
              className="feature-card"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <FaMagic className="feature-icon" />
              <h3>Magical Experience</h3>
              <p>Delightful user experiences that captivate and inspire</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Unleash the Magic?</h2>
            <p>Let's create something extraordinary together</p>
            <Link to="/contact" className="btn btn-primary">Begin the Adventure</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
