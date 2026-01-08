import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import BackgroundSparkles from '../components/BackgroundSparkles';
import { FaServer, FaBrain, FaLaptop, FaExternalLinkAlt, FaGithub, FaRocket, FaCog, FaDatabase, FaShieldAlt, FaUsers } from 'react-icons/fa';
import '../styles/Platforms.css';

const platforms = [
  {
    id: 'unicorn-commander',
    name: 'Unicorn Commander',
    tagline: 'AI Infrastructure Platform',
    icon: <FaServer />,
    color: '#b66eff',
    url: 'https://unicorncommander.com',
    description: 'A local, modular AI ecosystem optimized for privacy, extensibility, and cost control. The flagship platform for operators who need production-grade AI infrastructure without the vendor lock-in.',
    audience: 'Operators, Enterprises, Power Users',
    features: [
      { icon: <FaCog />, label: 'Headless Orchestration' },
      { icon: <FaShieldAlt />, label: 'Local-First Privacy' },
      { icon: <FaDatabase />, label: 'Agent Systems' },
      { icon: <FaUsers />, label: 'Multi-Tenant Ready' }
    ],
    status: 'Active',
    cta: 'Explore Platform'
  },
  {
    id: 'center-deep',
    name: 'Center Deep',
    tagline: 'Intelligence & Analytics Layer',
    icon: <FaBrain />,
    color: '#00d4ff',
    description: 'The intelligence backbone powering search, analytics, RAG pipelines, and lead intelligence across the Magic Unicorn ecosystem. Where data becomes actionable insight.',
    audience: 'Enterprises, Analysts, Internal Systems',
    features: [
      { icon: <FaDatabase />, label: 'GraphRAG Architecture' },
      { icon: <FaBrain />, label: 'Intelligent Search' },
      { icon: <FaRocket />, label: 'Lead Intelligence' },
      { icon: <FaCog />, label: 'Custom Pipelines' }
    ],
    status: 'In Development',
    cta: 'Learn More'
  },
  {
    id: 'cognitive-companion',
    name: 'Cognitive Companion',
    tagline: 'Personal AI Applications',
    icon: <FaLaptop />,
    color: '#ff6eb6',
    url: 'https://cognitivecompanion.dev',
    description: 'User-facing AI applications for desktop and mobile. Where Unicorn Commander provides the headless infrastructure, Cognitive Companion delivers the human interface.',
    audience: 'Professionals, Creators, Individuals',
    features: [
      { icon: <FaLaptop />, label: 'Desktop & Mobile' },
      { icon: <FaBrain />, label: 'Personal Assistants' },
      { icon: <FaCog />, label: 'Workflow Tools' },
      { icon: <FaShieldAlt />, label: 'Edge Compute' }
    ],
    status: 'Active',
    cta: 'Visit Site'
  }
];

const ecosystemFeatures = [
  {
    icon: <FaShieldAlt />,
    title: 'Sovereignty by Design',
    description: 'Every platform is built for self-hosting. Your data, your infrastructure, your control.'
  },
  {
    icon: <FaCog />,
    title: 'Interoperable Architecture',
    description: 'Shared identity, shared observability, and composable services across all platforms.'
  },
  {
    icon: <FaRocket />,
    title: 'Production-Grade',
    description: 'Built for real workloads with real constraints. Not demos — deployments.'
  }
];

function Platforms() {
  return (
    <div className="page-container">
      <BackgroundSparkles />
      <PageHeader
        title="The Ecosystem"
        subtitle="Platforms built by Magic Unicorn for operators, enterprises, and builders"
        backgroundVariant="platforms"
      />

      <main className="page-content">
        <div className="container">
          {/* Ecosystem Overview */}
          <section className="ecosystem-intro">
            <motion.div
              className="intro-content"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>One Studio. Multiple Platforms. Unified Vision.</h2>
              <p>
                Magic Unicorn builds interconnected platforms that give organizations control over their
                AI infrastructure, data, and workflows. Each platform serves a distinct purpose while
                sharing a common architecture philosophy: open, modular, and operator-first.
              </p>
            </motion.div>

            <div className="ecosystem-features">
              {ecosystemFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="ecosystem-feature"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Platform Cards */}
          <section className="platforms-grid">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.id}
                className="platform-card"
                style={{ '--platform-color': platform.color }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="platform-header">
                  <div className="platform-icon">{platform.icon}</div>
                  <div className="platform-meta">
                    <span className={`status-badge ${platform.status.toLowerCase().replace(' ', '-')}`}>
                      {platform.status}
                    </span>
                  </div>
                </div>

                <h3 className="platform-name">{platform.name}</h3>
                <p className="platform-tagline">{platform.tagline}</p>
                <p className="platform-description">{platform.description}</p>

                <div className="platform-audience">
                  <span className="audience-label">Built for:</span>
                  <span className="audience-value">{platform.audience}</span>
                </div>

                <div className="platform-features">
                  {platform.features.map((feature, fIndex) => (
                    <div key={fIndex} className="platform-feature">
                      <span className="feature-icon">{feature.icon}</span>
                      <span>{feature.label}</span>
                    </div>
                  ))}
                </div>

                <div className="platform-actions">
                  {platform.url ? (
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-platform"
                    >
                      {platform.cta} <FaExternalLinkAlt />
                    </a>
                  ) : (
                    <Link to="/contact" className="btn btn-platform">
                      {platform.cta}
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </section>

          {/* Open Source Section */}
          <section className="open-source-section">
            <motion.div
              className="oss-content"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="oss-icon">
                <FaGithub />
              </div>
              <h3>Open Source Foundation</h3>
              <p>
                Our platforms are built on open-source principles. Ops-Center, our flagship
                infrastructure pattern library, is freely available for operators who want
                to build their own AI command centers.
              </p>
              <a
                href="https://github.com/magicunicorn"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Explore Our Repos <FaExternalLinkAlt />
              </a>
            </motion.div>
          </section>

          {/* CTA Section */}
          <section className="platforms-cta">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Ready to Build on Our Platforms?</h2>
              <p>
                Whether you're deploying Unicorn Commander, integrating Center Deep intelligence,
                or exploring custom solutions, we're here to architect your success.
              </p>
              <div className="cta-buttons">
                <Link to="/book" className="btn btn-primary">
                  Schedule a Consultation
                </Link>
                <Link to="/consulting" className="btn btn-outline">
                  Explore Consulting
                </Link>
              </div>
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Platforms;
