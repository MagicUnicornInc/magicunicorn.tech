import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogSeries from './pages/BlogSeries';
import BlogArticle from './pages/BlogArticle';
import Contact from './pages/Contact';

// Track page views with Google Analytics
function usePageViews() {
  const location = useLocation();

  useEffect(() => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_path: location.pathname,
      });
    }
  }, [location]);
}

// Wrapper component for page view tracking
function AppWithPageViews() {
  usePageViews();

  return (
    <ErrorBoundary>
      <Navbar />
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
