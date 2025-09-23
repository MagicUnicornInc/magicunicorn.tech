import React, { lazy, Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ServiceOptions from '../components/ServiceOptions';
import { FaRocket, FaLightbulb, FaMagic } from 'react-icons/fa';
import { UnicornLogo } from '../images';
import '../styles/ServiceOptions.css';

// Lazy load components
const LazyImage = lazy(() => import('../components/LazyImage'));

// Array of cycling headline pairs
const headlinePairs = [
  {
    headline: "Where Tech Meets Magic",
    tagline: "Transforming Ideas into Digital Enchantment"
  },
  {
    headline: "Like Skunkworks — But With Pizzazz",
    tagline: "R&D, but make it sparkle."
  },
  {
    headline: "Serious Tech in an Irresponsibly Cool Wrapper",
    tagline: "Enterprise on the outside, party in the code."
  },
  {
    headline: "Built for Builders. Loved by Rebels.",
    tagline: "We don't just ship; we shift paradigms."
  },
  {
    headline: "Unconventional Tools for the Exceptionally Driven",
    tagline: "You bring the ambition. We bring the unicorns."
  },
  {
    headline: "Where Engineering Gets Its Groove Back",
    tagline: "Code meets creativity in every commit."
  },
  {
    headline: "Open Source, With Swagger",
    tagline: "Free as in freedom. Cool as in 😎."
  },
  {
    headline: "Tech That Gets Sh*t Done — and Looks Good Doing It",
    tagline: "Form. Function. Flex."
  },
  {
    headline: "Commanding the Future, One AI at a Time",
    tagline: "Take Command. Conquer. Win."
  },
  {
    headline: "The Only Stack That Comes with Personality",
    tagline: "And maybe a beret."
  },
  {
    headline: "Innovation That Doesn't Apologize",
    tagline: "Neither should you."
  },
  {
    headline: "Bold Enough to Build It. Sharp Enough to Ship It.",
    tagline: "And weird enough to enjoy it."
  },
  {
    headline: "Your Back Office Just Grew a Brain",
    tagline: "A fabulous one."
  },
  {
    headline: "From Back-of-the-Napkin to Battle-Tested",
    tagline: "We build what others brainstorm."
  },
  {
    headline: "Make Your Competitors Look Like They're on Dial-Up",
    tagline: "Even if they aren't."
  },
  {
    headline: "The Infrastructure of Imagination",
    tagline: "Fantasy? Nah. Just really good engineering."
  },
  {
    headline: "Tools So Good, You'll Think They're Cheating",
    tagline: "They're not. Probably."
  },
  {
    headline: "Because Boring Software is a Crime",
    tagline: "We've alerted the authorities."
  },
  {
    headline: "Digital Power Suits for Creative Assassins",
    tagline: "Look sharp. Move fast."
  },
  {
    headline: "Enterprise-Grade. Street-Tested. Unicorn-Approved.",
    tagline: "Charleston built. Global bound."
  },
  {
    headline: "Crafted with Precision. Deployed with Panache.",
    tagline: "The devil's in the Dockerfile."
  },
  {
    headline: "Helping You Outwork the Competition Without Breaking a Sweat",
    tagline: "Your AI hustle, with ergonomic flair."
  },
  {
    headline: "Where Mission Control Meets Unicorn Magic",
    tagline: "Houston, we have liftoff… and glitter."
  },
  {
    headline: "Don't Just Scale — Swagger While You Do It",
    tagline: "Elastic. Electric. Elegant."
  },
  {
    headline: "Work Smarter. Launch Faster. Command Everything.",
    tagline: "Unicorn Commander at your service."
  }
];

export default function Home() {
  const [currentPairIndex] = useState(() =>
    Math.floor(Math.random() * headlinePairs.length)
  );
  return (
    <div className="home">
      <section className="hero-section">
        <div className="sparkles">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="sparkle"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
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
