import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import BackgroundSparkles from '../components/BackgroundSparkles';
import { FaGraduationCap, FaRocket, FaCode, FaBrain, FaUsers, FaCogs, FaGithub, FaLightbulb, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import '../styles/Internships.css';

const focusAreas = [
  {
    icon: <FaBrain />,
    title: 'Applied AI Systems',
    description: 'Work on real AI infrastructure, agent systems, and ML pipelines. Not just tutorials — production systems that serve real users.',
    skills: ['LangChain/LangGraph', 'Vector Databases', 'RAG Pipelines', 'Agent Orchestration']
  },
  {
    icon: <FaCogs />,
    title: 'Infrastructure Engineering',
    description: 'Learn deployment patterns, containerization, and operational excellence. The "pain valley" work that makes prototypes into products.',
    skills: ['Docker/Kubernetes', 'CI/CD Pipelines', 'Monitoring', 'Security']
  },
  {
    icon: <FaCode />,
    title: 'Open-Source Platforms',
    description: 'Contribute to real open-source projects. Build your public portfolio while learning from production codebases.',
    skills: ['Git Workflows', 'Code Review', 'Documentation', 'Community']
  },
  {
    icon: <FaRocket />,
    title: 'Product Incubation',
    description: 'Experience the full product lifecycle — from ideation through architecture to launch. See how ideas become companies.',
    skills: ['Product Thinking', 'User Research', 'Technical Writing', 'Go-to-Market']
  }
];

const whatMakesUsDifferent = [
  {
    icon: <FaLightbulb />,
    title: 'Real Work, Not Busywork',
    description: 'You\'ll work on actual platform features, customer projects, and internal tools. No coffee runs or copy machine duty.'
  },
  {
    icon: <FaUsers />,
    title: 'Direct Founder Access',
    description: 'Work directly with Aaron and senior engineers. No bureaucracy, no HR layers — just direct mentorship and collaboration.'
  },
  {
    icon: <FaGithub />,
    title: 'Public Portfolio Building',
    description: 'Your contributions go into real repositories. Leave with GitHub activity that proves your capabilities to future employers.'
  },
  {
    icon: <FaRocket />,
    title: 'Future Founder Pipeline',
    description: 'Top performers get first look at accelerator opportunities. We\'re building our future collaborators, not just filling seats.'
  }
];

const requirements = [
  'Strong foundation in at least one programming language',
  'Genuine curiosity about AI, infrastructure, or both',
  'Bias toward shipping — you prefer building to theorizing',
  'Self-directed learning ability',
  'Comfort with ambiguity and fast-changing priorities',
  'Good written communication skills'
];

const niceToHave = [
  'Experience with Python, TypeScript, or Go',
  'Familiarity with Docker and containerization',
  'Open-source contributions (any size)',
  'Personal projects you can show',
  'Military, non-traditional, or career-change background'
];

function Internships() {
  return (
    <div className="page-container">
      <BackgroundSparkles />
      <PageHeader
        title="Internship Program"
        subtitle="This is not generic internship work."
        backgroundVariant="internships"
      />

      <main className="page-content">
        <div className="container">
          {/* Intro Section */}
          <section className="internship-intro">
            <motion.div
              className="intro-content"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Learn by Building Things That Matter</h2>
              <p>
                The Magic Unicorn internship program is designed for builders who want to learn
                by doing — not by watching. You'll work on real AI infrastructure, real customer
                problems, and real open-source contributions alongside our engineering team.
              </p>
              <p>
                We're not looking for perfect resumes. We're looking for curious, driven people
                who ship. If you've built things on your own, taught yourself technologies, or
                come from a non-traditional background — you might be exactly who we want.
              </p>
            </motion.div>
          </section>

          {/* Focus Areas */}
          <section className="focus-section">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Focus Areas
            </motion.h2>
            <div className="focus-grid">
              {focusAreas.map((area, index) => (
                <motion.div
                  key={index}
                  className="focus-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="focus-icon">{area.icon}</div>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                  <div className="focus-skills">
                    {area.skills.map((skill, sIndex) => (
                      <span key={sIndex} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* What Makes Us Different */}
          <section className="different-section">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              What Makes This Different
            </motion.h2>
            <div className="different-grid">
              {whatMakesUsDifferent.map((item, index) => (
                <motion.div
                  key={index}
                  className="different-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="different-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Requirements */}
          <section className="requirements-section">
            <div className="requirements-grid">
              <motion.div
                className="requirements-box"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3>What We're Looking For</h3>
                <ul>
                  {requirements.map((req, index) => (
                    <li key={index}>
                      <FaCheckCircle className="check-icon" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="requirements-box nice-to-have"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3>Nice to Have</h3>
                <ul>
                  {niceToHave.map((item, index) => (
                    <li key={index}>
                      <FaCheckCircle className="check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          {/* Program Details */}
          <section className="details-section">
            <motion.div
              className="details-content"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Program Structure</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Duration</span>
                  <span className="detail-value">3-6 months (flexible)</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">Remote (US timezone preferred)</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Commitment</span>
                  <span className="detail-value">Part-time or Full-time available</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Compensation</span>
                  <span className="detail-value">Paid positions based on scope</span>
                </div>
              </div>
            </motion.div>
          </section>

          {/* CTA Section */}
          <section className="internship-cta">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <FaGraduationCap className="cta-icon" />
              <h2>Ready to Build Something Real?</h2>
              <p>
                If you're the kind of person who builds things before you're asked to, who
                learns by doing, and who wants to work on challenging problems with real
                impact — we want to hear from you.
              </p>
              <div className="cta-buttons">
                <Link to="/book" className="btn btn-primary">
                  Apply Now <FaArrowRight />
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  Ask Questions
                </Link>
              </div>
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Internships;
