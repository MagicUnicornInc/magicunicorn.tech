import React, { useEffect, Suspense, lazy, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleSystem from './components/ParticleNetwork';
import './styles/accessibility.css';

// Critical routes - load immediately
import Home from './pages/Home';

// Lazy load non-critical routes for code splitting
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogSeries = lazy(() => import('./pages/BlogSeries'));
const BlogArticle = lazy(() => import('./pages/BlogArticle'));
const Contact = lazy(() => import('./pages/Contact'));

// Loading fallback component with ARIA
const PageLoader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      fontSize: '1.2rem',
      color: '#a855f7'
    }}
    role="status"
    aria-live="polite"
    aria-label="Loading page content"
  >
    Loading...
  </div>
);

// Track page views with Google Analytics
function usePageViews() {
  const location = useLocation();
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    // Track with Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_path: location.pathname,
      });
    }

    // Announce page changes to screen readers
    const pageTitles = {
      '/': 'Home page',
      '/about': 'About page',
      '/services': 'Services page',
      '/portfolio': 'Portfolio page',
      '/blog': 'Blog page',
      '/contact': 'Contact page',
    };

    const pageTitle = pageTitles[location.pathname] || 'Page';
    setAnnouncement(`Navigated to ${pageTitle}`);

    // Update document title for screen readers
    const siteName = 'Magic Unicorn Tech';
    const baseTitle = pageTitles[location.pathname]?.replace(' page', '') || 'Page';
    document.title = `${baseTitle} - ${siteName}`;
  }, [location]);

  return announcement;
}

// Wrapper component for page view tracking
function AppWithPageViews() {
  const announcement = usePageViews();
  const mainContentRef = useRef(null);

  // Handle skip to content
  const handleSkipToContent = (e) => {
    e.preventDefault();
    if (mainContentRef.current) {
      mainContentRef.current.focus();
      mainContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ErrorBoundary>
      {/* 2026 Neural Network Particle System */}
      <ParticleSystem />

      {/* Skip to Content Link - WCAG 2.4.1 */}
      <a
        href="#main-content"
        className="skip-to-content"
        onClick={handleSkipToContent}
      >
        Skip to main content
      </a>

      {/* ARIA Live Region for Route Changes - WCAG 4.1.3 */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="aria-live-region"
      >
        {announcement}
      </div>

      <Navbar />

      {/* Main Content Landmark - WCAG 1.3.1 */}
      <main
        id="main-content"
        ref={mainContentRef}
        tabIndex="-1"
        style={{ outline: 'none' }}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/series/:seriesId" element={<BlogSeries />} />
            <Route path="/blog/series/:seriesId/:articleSlug" element={<BlogArticle />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </ErrorBoundary>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWithPageViews />
    </BrowserRouter>
  );
}

export default App;
