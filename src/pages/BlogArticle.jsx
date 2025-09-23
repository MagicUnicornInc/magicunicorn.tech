import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackgroundSparkles from '../components/BackgroundSparkles';
import { FaClock, FaArrowLeft, FaArrowRight, FaCode, FaExternalLinkAlt } from 'react-icons/fa';
import { getArticle, getSeriesArticles, BLOG_SERIES } from '../services/blogService';
import '../styles/BlogArticle.css';

function BlogArticle() {
  const { seriesId, articleSlug } = useParams();
  const [article, setArticle] = useState(null);
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const seriesInfo = BLOG_SERIES[seriesId];

  useEffect(() => {
    async function loadArticle() {
      try {
        setLoading(true);
        const [articleData, articlesData] = await Promise.all([
          getArticle(seriesId, articleSlug),
          getSeriesArticles(seriesId)
        ]);

        setArticle(articleData);
        setAllArticles(articlesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (seriesId && articleSlug && seriesInfo) {
      loadArticle();
    } else {
      setError('Article not found');
      setLoading(false);
    }
  }, [seriesId, articleSlug, seriesInfo]);

  // Find previous and next articles
  const currentIndex = allArticles.findIndex(a => a.slug === articleSlug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

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
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="page-container">
        <BackgroundSparkles />
        <div className="error-container">
          <h2>Article Not Found</h2>
          <p>{error || 'The requested article could not be found.'}</p>
          <Link to={`/blog/series/${seriesId}`} className="btn btn-primary">
            Back to Series
          </Link>
        </div>
      </div>
    );
  }

  // Convert markdown content to JSX (basic implementation)
  const renderMarkdownContent = (content) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="article-h1">{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="article-h2">{line.substring(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="article-h3">{line.substring(4)}</h3>;
      } else if (line.startsWith('```')) {
        return <div key={index} className="code-block-marker" />;
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else {
        return <p key={index} className="article-paragraph">{line}</p>;
      }
    });
  };

  return (
    <div className="page-container">
      <BackgroundSparkles />

      {/* Article Header */}
      <section className="article-header">
        <div className="container">
          <motion.div
            className="article-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to={`/blog/series/${seriesId}`} className="back-link">
              <FaArrowLeft /> Back to {seriesInfo?.title}
            </Link>

            <div className="article-progress">
              {currentIndex + 1} of {allArticles.length}
            </div>
          </motion.div>

          <motion.div
            className="article-hero"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="article-meta">
              <span
                className="series-badge"
                style={{ backgroundColor: seriesInfo?.color }}
              >
                {seriesInfo?.icon} {seriesInfo?.title}
              </span>
              <span className="read-time">
                <FaClock /> {article.readTime} min read
              </span>
            </div>

            <h1 className="article-title">{article.title}</h1>

            {article.series && (
              <p className="article-series">
                <strong>Series:</strong> {article.series}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="article-content">
        <div className="container">
          <motion.div
            className="article-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="markdown-content">
              {renderMarkdownContent(article.content)}
            </div>

            {/* GitHub Link */}
            <div className="article-footer">
              <a
                href={`https://github.com/MagicUnicornInc/MUUT-Strategy-Execution/blob/main/Blog/${seriesInfo?.path}/${article.filename}`}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                <FaCode /> View on GitHub <FaExternalLinkAlt />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="article-navigation">
        <div className="container">
          <div className="nav-grid">
            {prevArticle ? (
              <Link
                to={`/blog/series/${seriesId}/${prevArticle.slug}`}
                className="nav-card prev-card"
              >
                <div className="nav-direction">
                  <FaArrowLeft /> Previous
                </div>
                <h4>{prevArticle.title}</h4>
                <p>{prevArticle.excerpt.substring(0, 100)}...</p>
              </Link>
            ) : (
              <div className="nav-placeholder" />
            )}

            {nextArticle ? (
              <Link
                to={`/blog/series/${seriesId}/${nextArticle.slug}`}
                className="nav-card next-card"
              >
                <div className="nav-direction">
                  Next <FaArrowRight />
                </div>
                <h4>{nextArticle.title}</h4>
                <p>{nextArticle.excerpt.substring(0, 100)}...</p>
              </Link>
            ) : (
              <div className="nav-placeholder" />
            )}
          </div>
        </div>
      </section>

      {/* Series CTA */}
      <section className="series-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3>Enjoying {seriesInfo?.title}?</h3>
            <p>Continue your learning journey with the complete series</p>
            <Link
              to={`/blog/series/${seriesId}`}
              className="btn btn-primary"
              style={{
                background: `linear-gradient(135deg, ${seriesInfo?.color}22, ${seriesInfo?.color}44)`,
                borderColor: seriesInfo?.color
              }}
            >
              View Full Series
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default BlogArticle;