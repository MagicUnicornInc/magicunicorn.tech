import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import BackgroundSparkles from '../components/BackgroundSparkles';
import { FaRocket, FaCode, FaCogs, FaShieldAlt, FaLightbulb, FaHandshake, FaChartLine, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import '../styles/Accelerator.css';

const portfolioCompanies = [
  {
    id: 'cipher-forge-forward',
    name: 'Cipher Forge Forward',
    tagline: 'Secure Systems & Applied AI',
    icon: <FaShieldAlt />,
    color: '#b66eff',
    founder: 'Ryan Cabading',
    description: 'Founded by Ryan Cabading, Cipher Forge Forward is a deep technical incubation focused on infrastructure-first product building. Specializing in secure systems, applied AI, and complex automation that operates at the intersection of security and intelligence.',
    focus: ['Secure Infrastructure', 'Applied AI', 'Complex Automation', 'Enterprise Systems'],
    status: 'Active Portfolio'
  },
  {
    id: 'genesis-flow-labs',
    name: 'Genesis Flow Labs',
    tagline: 'Automation & Workflow Intelligence',
    icon: <FaCogs />,
    color: '#00d4ff',
    founder: 'Shafen Khan',
    description: 'Founded by Shafen Khan after completing the Magic Unicorn Technical Accelerator program, Genesis Flow Labs builds the next generation of business automation and workflow systems. A key partner in our ecosystem, focused on dashboards, workflow intelligence, and applied business AI.',
    focus: ['Business Automation', 'Dashboard Systems', 'Workflow AI', 'Operational Intelligence'],
    status: 'Partner Company'
  }
];

const acceleratorProcess = [
  {
    step: '01',
    title: 'Deep Technical Assessment',
    description: 'We evaluate the technical viability, market fit, and architectural foundations. Not pitch decks — working prototypes and real problems.',
    icon: <FaLightbulb />
  },
  {
    step: '02',
    title: 'Architecture & Foundation',
    description: 'Co-design the system architecture, deployment patterns, and technical stack. Built for scale from day one.',
    icon: <FaCode />
  },
  {
    step: '03',
    title: 'Accelerated Development',
    description: 'Access to Magic Unicorn engineering resources, infrastructure, and operational expertise to ship faster.',
    icon: <FaRocket />
  },
  {
    step: '04',
    title: 'Launch & Scale',
    description: 'Productization support, go-to-market strategy, and ongoing technical partnership as you scale.',
    icon: <FaChartLine />
  }
];

const whatWeLookFor = [
  {
    icon: <FaLightbulb />,
    title: 'Hard Problems',
    description: 'Challenges that sit between disciplines. Problems others avoid because they require deep technical and domain expertise.'
  },
  {
    icon: <FaCode />,
    title: 'Serious Builders',
    description: 'Technical founders who ship. People who prefer working systems over theory. Builders, not just visionaries.'
  },
  {
    icon: <FaHandshake />,
    title: 'Real-World Impact',
    description: 'Solutions that solve tangible problems for real users. Not science projects — products that matter.'
  }
];

const whatWeProvide = [
  'System Architecture & Design',
  'Infrastructure Engineering',
  'AI/ML Pipeline Development',
  'DevOps & Deployment',
  'Security & Compliance',
  'Productization Strategy',
  'Technical Due Diligence',
  'Operational Mentorship'
];

function Accelerator() {
  return (
    <div className="page-container">
      <BackgroundSparkles />
      <PageHeader
        title="Technical Accelerator"
        subtitle="We don't just consult. We co-build companies."
        backgroundVariant="accelerator"
      />

      <main className="page-content">
        <div className="container">
          {/* Value Proposition */}
          <section className="accelerator-intro">
            <motion.div
              className="intro-content"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Where Deep Engineering Meets Venture Building</h2>
              <p>
                The Magic Unicorn Technical Accelerator isn't a bootcamp or an incubator in the traditional sense.
                It's a technical partnership for builders who need architecture, engineering muscle, and operational
                expertise to transform ambitious ideas into production systems.
              </p>
              <p>
                We co-build with founders who have hard problems, real technical depth, and the drive to ship.
                No pitch competitions. No demo days. Just serious engineering and products that work.
              </p>
            </motion.div>
          </section>

          {/* What We Look For */}
          <section className="look-for-section">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              What We Look For
            </motion.h2>
            <div className="look-for-grid">
              {whatWeLookFor.map((item, index) => (
                <motion.div
                  key={index}
                  className="look-for-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="card-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Process Section */}
          <section className="process-section">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How the Accelerator Works
            </motion.h2>
            <div className="process-timeline">
              {acceleratorProcess.map((step, index) => (
                <motion.div
                  key={index}
                  className="process-step"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className="step-number">{step.step}</div>
                  <div className="step-content">
                    <div className="step-icon">{step.icon}</div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* What We Provide */}
          <section className="provide-section">
            <motion.div
              className="provide-content"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>What We Bring to the Table</h2>
              <div className="provide-grid">
                {whatWeProvide.map((item, index) => (
                  <motion.div
                    key={index}
                    className="provide-item"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <FaCheckCircle className="check-icon" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Portfolio Companies */}
          <section className="portfolio-section">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Portfolio Companies
            </motion.h2>
            <div className="portfolio-grid">
              {portfolioCompanies.map((company, index) => (
                <motion.div
                  key={company.id}
                  className="portfolio-card"
                  style={{ '--company-color': company.color }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className="company-header">
                    <div className="company-icon">{company.icon}</div>
                    <span className="company-status">{company.status}</span>
                  </div>
                  <h3>{company.name}</h3>
                  <p className="company-tagline">{company.tagline}</p>
                  {company.founder && <p className="company-founder">Founded by {company.founder}</p>}
                  <p className="company-description">{company.description}</p>
                  <div className="company-focus">
                    {company.focus.map((item, fIndex) => (
                      <span key={fIndex} className="focus-tag">{item}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="accelerator-cta">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Building Something That Matters?</h2>
              <p>
                If you're tackling a hard technical problem and need architecture, engineering,
                or infrastructure expertise to make it real — let's talk.
              </p>
              <div className="cta-buttons">
                <Link to="/book" className="btn btn-primary">
                  Start the Conversation <FaArrowRight />
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

export default Accelerator;
