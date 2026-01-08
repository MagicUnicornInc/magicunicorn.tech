import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaServer, FaBrain, FaUser, FaRocket, FaCogs, FaHandshake,
  FaArrowRight, FaCode, FaShieldAlt, FaChartLine, FaGlobe,
  FaLightbulb, FaLayerGroup
} from 'react-icons/fa';
import { UnicornLogo } from '../images';
import BackgroundSparkles from '../components/BackgroundSparkles';
import '../styles/Home.css';

// Studio-focused rotating headlines
const headlinePairs = [
  {
    headline: "The Architecture of What Comes Next",
    tagline: "A systems studio building AI infrastructure for those who refuse to rent their future."
  },
  {
    headline: "We Build the Command Center. You Run the Mission.",
    tagline: "AI infrastructure designed for operators, not spectators."
  },
  {
    headline: "Systems That Scale. Control That Stays Yours.",
    tagline: "Open-source foundations. Enterprise-grade execution."
  },
  {
    headline: "Not Another AI Company. A Technology Studio.",
    tagline: "Platforms, accelerators, and the infrastructure beneath them."
  },
  {
    headline: "Where Platforms Are Forged",
    tagline: "From concept to command center — we build what others assemble."
  },
  {
    headline: "Infrastructure for the Ambitious",
    tagline: "AI ecosystems designed for control, not compromise."
  },
  {
    headline: "Building the Operating Layer for AI",
    tagline: "The stack beneath your stack."
  },
  {
    headline: "The Studio Behind the Systems",
    tagline: "Unicorn Commander. Center Deep. Cognitive Companion. All from here."
  },
  {
    headline: "Unconventional Technology for Unconventional Problems",
    tagline: "If it fits a template, someone else already built it."
  },
  {
    headline: "Serious Systems. Approachable Wrapper.",
    tagline: "Enterprise capability without the enterprise conformity."
  },
  {
    headline: "We Don't Build Apps. We Build Operating Environments.",
    tagline: "Cohesive, modular, and entirely under your control."
  },
  {
    headline: "The AI Infrastructure the Industry Forgot to Build",
    tagline: "Local-first. Open-source. Actually deployable."
  }
];

// What we build - three pillars
const whatWeBuild = [
  {
    icon: <FaServer />,
    title: 'AI Infrastructure Platforms',
    description: 'Production-ready ecosystems for AI operations. Modular architecture, shared identity, clean deployment patterns. From Unicorn Commander to Ops-Center — infrastructure you control.',
    link: '/platforms',
    linkText: 'Explore Platforms'
  },
  {
    icon: <FaLayerGroup />,
    title: 'Vertical Applications',
    description: 'Purpose-built systems for problems that don\'t fit SaaS templates. Meeting intelligence, lead-gen, video processing, knowledge operations — real tools for real workflows.',
    link: '/portfolio',
    linkText: 'See Our Work'
  },
  {
    icon: <FaRocket />,
    title: 'Technical Accelerator',
    description: 'We co-build companies, not slide decks. Deep technical incubation for founders tackling hard infrastructure problems.',
    link: '/accelerator',
    linkText: 'Learn More'
  }
];

// How we engage - three modes
const engagementModes = [
  {
    icon: <FaGlobe />,
    title: 'Explore Our Platforms',
    description: 'Unicorn Commander for AI infrastructure. Center Deep for intelligence operations. Cognitive Companion for personal AI. Open-source foundations you can deploy today.',
    link: '/platforms',
    cta: 'Explore the Ecosystem'
  },
  {
    icon: <FaHandshake />,
    title: 'Accelerate With Us',
    description: 'Cipher Forge Forward. Genesis Flow Labs. We invest architecture, engineering, and infrastructure into serious builders tackling serious problems.',
    link: '/accelerator',
    cta: 'Learn About the Accelerator'
  },
  {
    icon: <FaChartLine />,
    title: 'Architect Together',
    description: 'AI infrastructure leadership, platform design, technical due diligence, and fractional CAIO engagements for organizations ready to build systems that last.',
    link: '/consulting',
    cta: 'Book a Consultation'
  }
];

// Platform previews
const platforms = [
  {
    id: 'unicorn-commander',
    icon: <FaServer />,
    name: 'Unicorn Commander',
    tagline: 'AI Infrastructure Command Center',
    description: 'The flagship platform for running AI like an operator. Local-first, modular, privacy-respecting — a complete operating environment for AI workloads.',
    color: '#b66eff',
    url: 'https://unicorncommander.com',
    linkText: 'Explore Unicorn Commander'
  },
  {
    id: 'center-deep',
    icon: <FaBrain />,
    name: 'Center Deep',
    tagline: 'Intelligence Layer',
    description: 'Search, RAG, analytics, and lead intelligence as infrastructure. The knowledge operations backbone for platforms and products.',
    color: '#00d4ff',
    url: '/platforms#center-deep',
    linkText: 'Discover Center Deep'
  },
  {
    id: 'cognitive-companion',
    icon: <FaUser />,
    name: 'Cognitive Companion',
    tagline: 'Personal AI Interface',
    description: 'User-facing AI for professionals and creators. Desktop and mobile applications that bring AI capability to the edge.',
    color: '#ff6b9d',
    url: 'https://cognitivecompanion.dev',
    linkText: 'Meet Cognitive Companion'
  }
];

export default function Home() {
  const [currentPairIndex] = useState(() =>
    Math.floor(Math.random() * headlinePairs.length)
  );

  return (
    <div className="home">
      <BackgroundSparkles />

      {/* Hero Section */}
      <section className="hero-section">
        <motion.img
          src={UnicornLogo}
          alt="Magic Unicorn Logo"
          className="hero-logo"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
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
        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Link to="/platforms" className="btn btn-primary">
            Explore the Ecosystem <FaArrowRight />
          </Link>
          <Link to="/book" className="btn btn-outline">
            Start a Conversation
          </Link>
        </motion.div>
      </section>

      {/* What We Build Section */}
      <section className="build-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>What Emerges from the Studio</h2>
            <p>
              Platforms, accelerators, and production-grade AI infrastructure — each project
              designed to give operators control over their stack, data, and outcomes.
            </p>
          </motion.div>

          <div className="build-grid">
            {whatWeBuild.map((item, index) => (
              <motion.div
                key={index}
                className="build-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="build-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link to={item.link} className="build-link">
                  {item.linkText} <FaArrowRight />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Ecosystem Preview */}
      <section className="platforms-preview-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>The Magic Unicorn Ecosystem</h2>
            <p>
              A family of platforms, each serving a distinct purpose, all built on shared principles.
            </p>
          </motion.div>

          <div className="platforms-preview-grid">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.id}
                className="platform-preview-card"
                style={{ '--platform-color': platform.color }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10 }}
              >
                <div className="platform-preview-icon">{platform.icon}</div>
                <h3>{platform.name}</h3>
                <p className="platform-preview-tagline">{platform.tagline}</p>
                <p className="platform-preview-desc">{platform.description}</p>
                <Link
                  to={platform.url}
                  className="platform-preview-link"
                  {...(platform.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {platform.linkText} <FaArrowRight />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Engage Section */}
      <section className="engage-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>How We Work</h2>
            <p>
              Magic Unicorn operates across three lanes: platforms we build, ventures we co-found,
              and strategic engagements where we architect alongside you.
            </p>
          </motion.div>

          <div className="engage-grid">
            {engagementModes.map((mode, index) => (
              <motion.div
                key={index}
                className="engage-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="engage-icon">{mode.icon}</div>
                <h3>{mode.title}</h3>
                <p>{mode.description}</p>
                <Link to={mode.link} className="btn btn-secondary">
                  {mode.cta} <FaArrowRight />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Philosophy Teaser */}
      <section className="philosophy-section">
        <div className="container">
          <motion.div
            className="philosophy-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="philosophy-text">
              <h2>A Technology Studio, Not a Product Company</h2>
              <p>
                Magic Unicorn is not a product company. It's a technology studio.
              </p>
              <p>
                We design cohesive AI ecosystems where compute, models, data, identity, and
                user experience function as a unified whole. Our platforms are built to be
                owned, modified, and deployed — not rented.
              </p>
              <div className="philosophy-principles">
                <div className="principle">
                  <FaCode className="principle-icon" />
                  <span>Open-Source First</span>
                </div>
                <div className="principle">
                  <FaShieldAlt className="principle-icon" />
                  <span>Operator-First Design</span>
                </div>
                <div className="principle">
                  <FaLightbulb className="principle-icon" />
                  <span>Systems-of-Systems Thinking</span>
                </div>
              </div>
              <Link to="/about" className="btn btn-outline">
                About the Studio <FaArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Build Something Real?</h2>
            <p>
              Whether you're exploring our platforms, considering the accelerator, or need
              architectural leadership — let's start a conversation.
            </p>
            <div className="cta-buttons">
              <Link to="/book" className="btn btn-primary">
                Book a Consultation <FaArrowRight />
              </Link>
              <Link to="/platforms" className="btn btn-outline">
                Explore the Ecosystem
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
