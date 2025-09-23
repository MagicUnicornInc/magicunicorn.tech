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
    <div className="page-container blog-magazine">
      <BackgroundSparkles />

      {/* Latest Articles - Now at top */}
      <section className="latest-articles magazine-hero">
        <div className="container">
          <motion.div
            className="magazine-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="magazine-title">🔬 Latest from the Lab</h1>
            <p className="magazine-subtitle">
              Where serious technical deep dives meet irresponsibly cool storytelling.
              Fresh insights from our engineering adventures.
            </p>
          </motion.div>

          <div className="magazine-grid">
            {latestArticles.length > 0 && (
              <motion.div
                className="featured-article"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="featured-image">
                  <div className="article-overlay"></div>
                  <div className="featured-content">
                    <span className="featured-badge">Featured</span>
                    <span className="series-badge" style={{ backgroundColor: latestArticles[0].seriesInfo.color }}>
                      {latestArticles[0].seriesInfo.icon} {latestArticles[0].seriesInfo.title}
                    </span>
                    <h2>{latestArticles[0].title}</h2>
                    <p className="featured-excerpt">{latestArticles[0].excerpt}</p>
                    <div className="featured-meta">
                      <span className="read-time">
                        <FaClock /> {latestArticles[0].readTime} min read
                      </span>
                      <span className="difficulty" style={{ color: getDifficultyColor(latestArticles[0].seriesInfo.difficulty) }}>
                        {latestArticles[0].seriesInfo.difficulty}
                      </span>
                    </div>
                    <Link
                      to={`/blog/series/${latestArticles[0].seriesId}/${latestArticles[0].slug}`}
                      className="featured-cta"
                    >
                      Start Reading <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="recent-articles">
              {latestArticles.slice(1).map((article, index) => (
                <motion.div
                  key={article.id}
                  className="magazine-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index + 1) * 0.1 }}
                  whileHover={{ x: -5 }}
                >
                  <div className="card-image">
                    <div className="card-overlay"></div>
                    <span className="series-badge-small" style={{ backgroundColor: article.seriesInfo.color }}>
                      {article.seriesInfo.icon}
                    </span>
                  </div>
                  <div className="card-content">
                    <div className="card-meta">
                      <span className="series-name">{article.seriesInfo.title}</span>
                      <span className="read-time">
                        <FaClock /> {article.readTime}min
                      </span>
                    </div>
                    <h3>{article.title}</h3>
                    <p className="card-excerpt">{article.excerpt.substring(0, 120)}...</p>
                    <Link
                      to={`/blog/series/${article.seriesId}/${article.slug}`}
                      className="card-link"
                    >
                      Read More <FaArrowRight />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
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
