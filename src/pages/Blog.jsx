import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import BackgroundSparkles from '../components/BackgroundSparkles';
import { FaRocket, FaBolt, FaCog, FaBrain, FaBriefcase, FaClock, FaUsers, FaArrowRight, FaCode, FaPlay } from 'react-icons/fa';
import { getAllSeries, getLatestArticles } from '../services/blogService';
import '../styles/Blog.css';

function Blog() {
  const [series, setSeries] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogData() {
      try {
        const [seriesData, articlesData] = await Promise.all([
          getAllSeries(),
          getLatestArticles(3)
        ]);
        setSeries(seriesData);
        setLatestArticles(articlesData);
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadBlogData();
  }, []);

  const getSeriesIcon = (seriesId) => {
    const icons = {
      'unicorn-unleashed': <FaRocket />,
      'forging-silicon': <FaBolt />,
      'engine-to-enterprise': <FaCog />,
      'accelerated-intelligence': <FaBrain />,
      'business-of-ai': <FaBriefcase />
    };
    return icons[seriesId] || <FaCode />;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner to Intermediate': '#10B981',
      'Intermediate': '#8B5CF6',
      'Advanced': '#F59E0B',
      'Strategic': '#06B6D4'
    };
    return colors[difficulty] || '#6B7280';
  };

  if (loading) {
    return (
      <div className="page-container">
        <BackgroundSparkles />
        <div className="loading-container">
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            🦄
          </motion.div>
          <p>Loading magical content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <BackgroundSparkles />

      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container">
          <motion.div
            className="blog-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="glowing-text">The Unicorn Lab</h1>
            <p className="hero-subtitle">
              Where serious technical deep dives meet irresponsibly cool storytelling.
              <br />
              <strong>5 series. 30+ articles. Zero boring content.</strong>
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">30+</span>
                <span className="stat-label">Technical Articles</span>
              </div>
              <div className="stat">
                <span className="stat-number">5</span>
                <span className="stat-label">Expert Series</span>
              </div>
              <div className="stat">
                <span className="stat-number">∞</span>
                <span className="stat-label">Lines of Code</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="latest-articles">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2>🔬 Latest from the Lab</h2>
            <p>Fresh insights from our engineering adventures</p>
          </motion.div>

          <div className="articles-grid">
            {latestArticles.map((article, index) => (
              <motion.div
                key={article.id}
                className="article-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="article-header">
                  <span className="series-badge" style={{ backgroundColor: article.seriesInfo.color }}>
                    {article.seriesInfo.icon} {article.seriesInfo.title}
                  </span>
                  <span className="read-time">
                    <FaClock /> {article.readTime} min read
                  </span>
                </div>
                <h3>{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>
                <Link
                  to={`/blog/series/${article.seriesId}/${article.slug}`}
                  className="article-link"
                >
                  Read Article <FaArrowRight />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Series Showcase */}
      <section className="series-showcase">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2>🎯 Choose Your Adventure</h2>
            <p>Each series is crafted for a specific audience with deep, actionable content</p>
          </motion.div>

          <div className="series-grid">
            {series.map((seriesItem, index) => (
              <motion.div
                key={seriesItem.id}
                className="series-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="series-header">
                  <div className="series-icon" style={{ color: seriesItem.color }}>
                    {getSeriesIcon(seriesItem.id)}
                  </div>
                  <div className="series-meta">
                    <span className="audience-tag">
                      <FaUsers /> {seriesItem.audience}
                    </span>
                    <span
                      className="difficulty-tag"
                      style={{ color: getDifficultyColor(seriesItem.difficulty) }}
                    >
                      {seriesItem.difficulty}
                    </span>
                  </div>
                </div>

                <h3>{seriesItem.title}</h3>
                <p className="series-subtitle">{seriesItem.subtitle}</p>
                <p className="series-description">{seriesItem.description}</p>

                <div className="series-stats">
                  <span className="article-count">
                    📚 {seriesItem.articleCount} articles
                  </span>
                  <span className="estimated-time">
                    <FaClock /> {seriesItem.estimatedTime}
                  </span>
                </div>

                <Link
                  to={`/blog/series/${seriesItem.id}`}
                  className="series-cta"
                  style={{
                    background: `linear-gradient(135deg, ${seriesItem.color}22, ${seriesItem.color}44)`,
                    borderColor: seriesItem.color
                  }}
                >
                  <FaPlay /> Start Series
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="blog-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Level Up Your Technical Game?</h2>
            <p>
              Whether you're a hobbyist hacker or enterprise architect,
              we've got the deep technical content to push your skills forward.
            </p>
            <div className="cta-buttons">
              <Link to="/blog/series/unicorn-unleashed" className="btn btn-primary">
                Start with Open Source
              </Link>
              <Link to="/blog/series/forging-silicon" className="btn btn-secondary">
                Dive into Hardware
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Blog;
