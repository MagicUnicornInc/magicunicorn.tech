import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import BackgroundSparkles from '../components/BackgroundSparkles';
import {
  FaServer, FaCode, FaMicrochip, FaUserCog, FaCheckCircle,
  FaArrowRight, FaLinkedin, FaGithub, FaShieldAlt
} from 'react-icons/fa';
import '../styles/About.css';

// Philosophy pillars
const philosophyPillars = [
  {
    icon: <FaServer />,
    title: 'Systems-of-Systems Thinking',
    description: 'Most vendors sell apps. We build ecosystems: interoperable services, shared identity, shared observability, shared deployment patterns, repeatable automation, and coherent UX across a cluster of tools. One control plane, many capabilities.'
  },
  {
    icon: <FaCode />,
    title: 'Open-Source First (But Pragmatic)',
    description: 'Open-source isn\'t ideology. It\'s operational strategy — transparency, modifiability, community leverage, and long-term survivability. If something proprietary is unavoidable, it becomes a swappable layer, not a single point of failure.'
  },
  {
    icon: <FaMicrochip />,
    title: 'Hardware-Aware AI',
    description: 'Unlike typical SaaS AI, we design around real compute: GPUs, NPUs, iGPUs, memory constraints, containerization, and predictable performance. Inference is infrastructure, not magic.'
  },
  {
    icon: <FaUserCog />,
    title: 'Operator Experience as Product',
    description: 'Dashboards, control planes, setup scripts, and automation flows are first-class product features. The goal isn\'t just AI that works — it\'s AI that feels manageable, predictable, and trustworthy.'
  }
];

// Open source principles
const openSourcePrinciples = [
  'Transparency over opacity',
  'Modifiability over permission',
  'Community leverage over vendor dependency',
  'Long-term survivability over quarterly roadmaps'
];

function About() {
  return (
    <div className="page-container">
      <BackgroundSparkles />
      <PageHeader
        title="About the Studio"
        subtitle="A technology studio that builds systems, not products."
        backgroundVariant="about"
      />

      <main className="page-content">
        <div className="container">
          {/* Opening Narrative */}
          <section className="studio-intro">
            <motion.div
              className="intro-content"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="intro-lead">
                Magic Unicorn Unconventional Technology & Stuff Inc. exists because most AI
                infrastructure shouldn't require a subscription, a vendor relationship,
                or surrendering control of your data.
              </p>
              <p>
                We build AI platforms, automation systems, and production infrastructure
                that organizations can actually own. Not rent. Not license. <strong>Own.</strong>
              </p>
              <p>
                The whimsical name is intentional. It's a strategic wrapper around deep
                engineering, operations discipline, and an unusually broad skill range.
                Serious systems can feel approachable without sacrificing capability.
              </p>
            </motion.div>
          </section>

          {/* Philosophy Section */}
          <section className="philosophy-section">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How We Think About Building
            </motion.h2>
            <div className="philosophy-grid">
              {philosophyPillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  className="philosophy-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="philosophy-icon">{pillar.icon}</div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Open Source Stance */}
          <section className="opensource-section">
            <motion.div
              className="opensource-content"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="opensource-header">
                <FaShieldAlt className="opensource-icon" />
                <h2>On Open Source and Sovereignty</h2>
              </div>
              <p>
                Magic Unicorn is strongly aligned with open-source as both ethical position
                and operational advantage.
              </p>
              <div className="principles-list">
                <p>We believe in:</p>
                <ul>
                  {openSourcePrinciples.map((principle, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <FaCheckCircle className="principle-check" />
                      <span>{principle}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <p>
                Our flagship platforms — Ops-Center, portions of Unicorn Commander, and our
                deployment patterns — are open-source by design. The goal is simple:
                <strong> don't get boxed in.</strong>
              </p>
              <p className="opensource-note">
                When we use proprietary components (and sometimes we must), they're
                positioned as swappable layers. Never single points of failure. Never
                leverage someone else holds over you.
              </p>
            </motion.div>
          </section>

          {/* Founder Section */}
          <section className="founder-section">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              The Architect Behind the Studio
            </motion.h2>
            <motion.div
              className="founder-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="founder-content">
                <div className="founder-header">
                  <div className="founder-info">
                    <h3>Aaron Stransky</h3>
                    <p className="founder-title">Founder & Unconventional Technologist</p>
                  </div>
                  <div className="founder-links">
                    <a
                      href="https://www.linkedin.com/in/aaronstransky/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href="https://github.com/magicunicorn"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                    >
                      <FaGithub />
                    </a>
                  </div>
                </div>
                <div className="founder-bio">
                  <p>
                    Aaron Stransky is the founder and driving force behind Magic Unicorn. His
                    defining strength is systems thinking — he doesn't approach AI, software,
                    or infrastructure as isolated tools, but as components of cohesive
                    environments where compute, models, data, identity, orchestration, and
                    user experience function as a unified whole.
                  </p>
                  <p>
                    Aaron leads the architecture of Unicorn Commander, Ops-Center, and the
                    broader platform ecosystem. He brings a background in AI infrastructure,
                    deployment engineering, hardware-aware optimization, and multi-tenant
                    system architecture.
                  </p>
                  <p>
                    A U.S. military veteran, Aaron's emphasis on reliability, preparation,
                    and clear roles is visible throughout Magic Unicorn's platforms. He favors
                    systems that reduce cognitive load rather than adding to it — tools that
                    make operators confident, not confused.
                  </p>
                  <p>
                    He describes his role not as CEO, but as an "Unconventional Technologist"
                    — someone focused on solving hard, interconnected problems that others
                    avoid because they sit between disciplines.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* CTA Section */}
          <section className="about-cta">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Ready to Explore the Ecosystem?</h2>
              <p>
                See what emerges from the studio — platforms, accelerator ventures,
                and infrastructure designed for operators.
              </p>
              <div className="cta-buttons">
                <Link to="/platforms" className="btn btn-primary">
                  Explore Platforms <FaArrowRight />
                </Link>
                <Link to="/book" className="btn btn-outline">
                  Start a Conversation
                </Link>
              </div>
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default About;
