import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import BackgroundSparkles from '../components/BackgroundSparkles';
import { FaBrain, FaServer, FaCogs, FaShieldAlt, FaChartLine, FaUserTie, FaArrowRight, FaCheckCircle, FaRocket } from 'react-icons/fa';
import '../styles/Consulting.css';

const services = [
  {
    icon: <FaBrain />,
    title: 'AI & Automation Architecture',
    description: 'Design and implement AI infrastructure that scales. From RAG pipelines to agent orchestration, we architect systems that work in production — not just demos.',
    capabilities: [
      'AI Infrastructure Design',
      'Agent System Architecture',
      'RAG Pipeline Development',
      'ML Ops & Deployment',
      'Model Selection & Optimization'
    ]
  },
  {
    icon: <FaServer />,
    title: 'Platform & Infrastructure Design',
    description: 'Build the foundation for systems that last. Docker-first deployment, multi-tenant architecture, observability, and the operational patterns that turn prototypes into products.',
    capabilities: [
      'System Architecture',
      'Container Orchestration',
      'Microservices Design',
      'Database Architecture',
      'API Design & Integration'
    ]
  },
  {
    icon: <FaCogs />,
    title: 'Custom AI Systems',
    description: 'Tailored AI solutions for specific business challenges. Not off-the-shelf integrations — purpose-built systems designed around your workflow and data.',
    capabilities: [
      'Custom LLM Applications',
      'Workflow Automation',
      'Data Pipeline Engineering',
      'Integration Development',
      'Performance Optimization'
    ]
  },
  {
    icon: <FaShieldAlt />,
    title: 'Technical Due Diligence',
    description: 'Evaluate technical systems with operator expertise. Architecture reviews, security assessments, and infrastructure audits that go beyond surface-level analysis.',
    capabilities: [
      'Architecture Review',
      'Code Quality Assessment',
      'Security Analysis',
      'Scalability Evaluation',
      'Technical Risk Assessment'
    ]
  },
  {
    icon: <FaUserTie />,
    title: 'Fractional CAIO',
    description: 'Strategic AI leadership on your terms. Bring enterprise-grade AI strategy and technical direction without the full-time commitment.',
    capabilities: [
      'AI Strategy Development',
      'Team Technical Leadership',
      'Vendor Evaluation',
      'Roadmap Planning',
      'Board-Level Technical Advisory'
    ]
  }
];

const engagementModels = [
  {
    title: 'Architecture Sprint',
    duration: '1-2 weeks',
    description: 'Intensive design sessions for new systems or major refactors. Deliver architecture documents, technical specifications, and implementation roadmaps.',
    ideal: 'Greenfield projects or major pivots'
  },
  {
    title: 'Embedded Engineering',
    duration: '1-6 months',
    description: 'Join your team as a technical lead or senior engineer. Ship production code while transferring knowledge and establishing patterns.',
    ideal: 'Teams scaling AI capabilities'
  },
  {
    title: 'Strategic Advisory',
    duration: 'Ongoing',
    description: 'Regular strategic sessions, architecture reviews, and technical guidance. The CAIO perspective without the CAIO cost.',
    ideal: 'Organizations building AI strategy'
  }
];

const differentiators = [
  {
    icon: <FaRocket />,
    title: 'Operator Mindset',
    description: 'We design for the 2 AM scenario. Systems that recover gracefully, fail predictably, and don\'t page you at night.'
  },
  {
    icon: <FaShieldAlt />,
    title: 'Sovereignty by Default',
    description: 'Every architecture prioritizes your control. No vendor lock-in, no data hostages, no surprise dependencies.'
  },
  {
    icon: <FaChartLine />,
    title: 'Production Focus',
    description: 'We don\'t build demos. We build deployments. Everything we design is meant to run in production, at scale.'
  }
];

function Consulting() {
  return (
    <div className="page-container">
      <BackgroundSparkles />
      <PageHeader
        title="Consulting"
        subtitle="Architecture, systems design, and AI infrastructure leadership"
        backgroundVariant="consulting"
      />

      <main className="page-content">
        <div className="container">
          {/* Positioning Statement */}
          <section className="consulting-intro">
            <motion.div
              className="intro-content"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Not Freelance. Not IT Services. Architecture.</h2>
              <p>
                Magic Unicorn consulting is for organizations that need more than implementation
                help — they need architectural vision, systems thinking, and the technical
                leadership to make complex AI infrastructure actually work.
              </p>
              <p>
                We don't drop in to write code and leave. We design systems that your team
                can own, operate, and evolve. Every engagement transfers knowledge, establishes
                patterns, and builds lasting capability.
              </p>
            </motion.div>
          </section>

          {/* Differentiators */}
          <section className="differentiators-section">
            <div className="differentiators-grid">
              {differentiators.map((item, index) => (
                <motion.div
                  key={index}
                  className="differentiator-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="diff-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Service Categories */}
          <section className="services-section">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              What We Do
            </motion.h2>
            <div className="services-grid">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="service-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="capabilities-list">
                    {service.capabilities.map((cap, cIndex) => (
                      <li key={cIndex}>
                        <FaCheckCircle className="check-icon" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Engagement Models */}
          <section className="engagement-section">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How We Engage
            </motion.h2>
            <div className="engagement-grid">
              {engagementModels.map((model, index) => (
                <motion.div
                  key={index}
                  className="engagement-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="engagement-header">
                    <h3>{model.title}</h3>
                    <span className="duration-badge">{model.duration}</span>
                  </div>
                  <p>{model.description}</p>
                  <div className="ideal-for">
                    <span className="ideal-label">Ideal for:</span>
                    <span className="ideal-value">{model.ideal}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="consulting-cta">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Ready to Architect Something Real?</h2>
              <p>
                Whether you're designing new AI infrastructure, scaling existing systems,
                or need strategic technical leadership — let's talk about what you're building.
              </p>
              <div className="cta-buttons">
                <Link to="/book" className="btn btn-primary">
                  Schedule a Consultation <FaArrowRight />
                </Link>
                <Link to="/portfolio" className="btn btn-outline">
                  See Our Work
                </Link>
              </div>
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Consulting;
