import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Platforms from './pages/Platforms';
import Accelerator from './pages/Accelerator';
import Consulting from './pages/Consulting';
import Portfolio from './pages/Portfolio';
import Internships from './pages/Internships';
import Blog from './pages/Blog';
import BlogSeries from './pages/BlogSeries';
import BlogArticle from './pages/BlogArticle';
import Contact from './pages/Contact';
import Book from './pages/Book';
// Legacy redirect
import Services from './pages/Services';

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ErrorBoundary>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/accelerator" element={<Accelerator />} />
          <Route path="/consulting" element={<Consulting />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/series/:seriesId" element={<BlogSeries />} />
          <Route path="/blog/series/:seriesId/:articleSlug" element={<BlogArticle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<Book />} />
          {/* Legacy redirect for old services URL */}
          <Route path="/services" element={<Consulting />} />
        </Routes>
        <Footer />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
