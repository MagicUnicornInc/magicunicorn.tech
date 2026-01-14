import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaServer, FaRocket, FaHandshake,
  FaArrowRight, FaCode, FaShieldAlt, FaChartLine, FaGlobe,
  FaLightbulb, FaLayerGroup
} from 'react-icons/fa';
import { UnicornLogo, UnicornCommanderLogo, CenterDeepLogo, CognitiveCompanionLogo } from '../images';
import BackgroundSparkles from '../components/BackgroundSparkles';
import '../styles/Home.css';

// Original rotating catchphrases - keep the personality!
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
    tagline: "Free as in freedom. Cool as in cool."
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
    logo: UnicornCommanderLogo,
    name: 'Unicorn Commander',
    tagline: 'AI Infrastructure Command Center',
    description: 'The flagship platform for running AI like an operator. Local-first, modular, privacy-respecting — a complete operating environment for AI workloads.',
    color: '#b66eff',
    url: 'https://unicorncommander.com',
    linkText: 'Explore Unicorn Commander'
  },
  {
    id: 'center-deep',
    logo: CenterDeepLogo,
    name: 'Center Deep',
    tagline: 'Intelligence Layer',
    description: 'Search, RAG, analytics, and lead intelligence as infrastructure. The knowledge operations backbone for platforms and products.',
    color: '#00d4ff',
    url: '/platforms#center-deep',
    linkText: 'Discover Center Deep'
  },
  {
    id: 'cognitive-companion',
    logo: CognitiveCompanionLogo,
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
                <img src={platform.logo} alt={`${platform.name} logo`} className="platform-preview-logo" />
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
