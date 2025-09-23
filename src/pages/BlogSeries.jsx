import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackgroundSparkles from '../components/BackgroundSparkles';
import { FaClock, FaUsers, FaArrowRight, FaCode, FaPlay, FaCheckCircle, FaBook } from 'react-icons/fa';
import { getSeriesArticles, BLOG_SERIES } from '../services/blogService';
import '../styles/BlogSeries.css';

function BlogSeries() {
  const { seriesId } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const seriesInfo = BLOG_SERIES[seriesId];

  useEffect(() => {
    async function loadSeriesArticles() {
      try {
        setLoading(true);
        const articlesData = await getSeriesArticles(seriesId);
        setArticles(articlesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (seriesId && seriesInfo) {
      loadSeriesArticles();
    } else {
      setError('Series not found');
      setLoading(false);
    }
  }, [seriesId, seriesInfo]);

  const getSeriesIcon = () => {
    const icons = {
      'unicorn-unleashed': '🚀',
      'forging-silicon': '⚡',
      'engine-to-enterprise': '🏗️',
      'accelerated-intelligence': '🧠',
      'business-of-ai': '💼'
    };
    return icons[seriesId] || '📚';
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
          <p>Loading series content...</p>
        </div>
      </div>
    );
  }

  if (error || !seriesInfo) {
    return (
      <div className="page-container">
        <BackgroundSparkles />
        <div className="error-container">
          <h2>Series Not Found</h2>
          <p>{error || 'The requested series could not be found.'}</p>
          <Link to="/blog" className="btn btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const totalReadTime = articles.reduce((total, article) => total + article.readTime, 0);

  return (
    <div className="page-container">
      <BackgroundSparkles />

      {/* Series Hero */}
      <section className="series-hero">
        <div className="container">
          <motion.div
            className="series-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="series-breadcrumb">
              <Link to="/blog">The Unicorn Lab</Link>
              <span>→</span>
              <span>{seriesInfo.title}</span>
            </div>

            <div className="series-hero-header">
              <div className="series-icon-large" style={{ color: seriesInfo.color }}>
                {getSeriesIcon()}
              </div>
              <div className="series-hero-text">
                <h1 className="glowing-text">{seriesInfo.title}</h1>
                <p className="series-hero-subtitle">{seriesInfo.subtitle}</p>
              </div>
            </div>

            <div className="series-meta-cards">
              <div className="meta-card">
                <FaUsers />
                <div>
                  <span className="meta-label">Audience</span>
                  <span className="meta-value">{seriesInfo.audience}</span>
                </div>
              </div>
              <div className="meta-card">
                <FaCode />
                <div>
                  <span className="meta-label">Difficulty</span>
                  <span className="meta-value">{seriesInfo.difficulty}</span>
                </div>
              </div>
              <div className="meta-card">
                <FaClock />
                <div>
                  <span className="meta-label">Total Time</span>
                  <span className="meta-value">{totalReadTime} min read</span>
                </div>
              </div>
              <div className="meta-card">
                <FaBook />
                <div>
                  <span className="meta-label">Articles</span>
                  <span className="meta-value">{articles.length} chapters</span>
                </div>
              </div>
            </div>

            <p className="series-description">{seriesInfo.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Article Timeline */}
      <section className="article-timeline">
        <div className="container">
          <motion.div
            className="timeline-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2>📚 Complete Series Timeline</h2>
            <p>Follow the journey from start to finish</p>
          </motion.div>

          <div className="timeline">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                className="timeline-item"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="timeline-connector">
                  <div
                    className="timeline-dot"
                    style={{
                      backgroundColor: seriesInfo.color,
                      boxShadow: `0 0 20px ${seriesInfo.color}40`
                    }}
                  >
                    {index + 1}
                  </div>
                  {index < articles.length - 1 && (
                    <div
                      className="timeline-line"
                      style={{ background: `linear-gradient(to bottom, ${seriesInfo.color}, transparent)` }}
                    />
                  )}
                </div>

                <motion.div
                  className="timeline-content"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="timeline-card">
                    <div className="timeline-header">
                      <span className="chapter-number">Chapter {index + 1}</span>
                      <span className="read-time">
                        <FaClock /> {article.readTime} min
                      </span>
                    </div>

                    <h3>{article.title}</h3>
                    <p className="timeline-excerpt">{article.excerpt}</p>

                    <div className="timeline-footer">
                      <Link
                        to={`/blog/series/${seriesId}/${article.slug}`}
                        className="timeline-cta"
                        style={{ color: seriesInfo.color }}
                      >
                        <FaPlay /> Read Chapter <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Series Completion CTA */}
          <motion.div
            className="series-completion"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="completion-card">
              <FaCheckCircle className="completion-icon" style={{ color: seriesInfo.color }} />
              <h3>Ready to Master {seriesInfo.title}?</h3>
              <p>
                Start from Chapter 1 and follow the complete journey to become proficient
                in {seriesInfo.audience.toLowerCase()} skills.
              </p>
              <Link
                to={`/blog/series/${seriesId}/${articles[0]?.slug}`}
                className="btn btn-primary completion-btn"
                style={{
                  background: `linear-gradient(135deg, ${seriesInfo.color}22, ${seriesInfo.color}44)`,
                  borderColor: seriesInfo.color,
                  color: 'white'
                }}
              >
                <FaPlay /> Begin Journey
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Series */}
      <section className="related-series">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2>🔗 Explore Other Series</h2>
            <p>Continue your learning journey</p>
          </motion.div>

          <div className="related-grid">
            {Object.values(BLOG_SERIES)
              .filter(series => series.id !== seriesId)
              .slice(0, 3)
              .map((series, index) => (
                <motion.div
                  key={series.id}
                  className="related-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="related-icon" style={{ color: series.color }}>
                    {series.icon}
                  </div>
                  <h4>{series.title}</h4>
                  <p>{series.subtitle}</p>
                  <Link
                    to={`/blog/series/${series.id}`}
                    className="related-link"
                    style={{ color: series.color }}
                  >
                    Explore Series <FaArrowRight />
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogSeries;