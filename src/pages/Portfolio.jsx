import React, { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import BackgroundSparkles from '../components/BackgroundSparkles';
import Lightbox from '../components/Lightbox';
import { FaGithub, FaExternalLinkAlt, FaGlobe, FaRocket, FaMobile, FaExpand } from 'react-icons/fa';
import '../styles/Portfolio.css';

// Correct import path
const LazyImage = lazy(() => import('../components/LazyImage'));

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('websites');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const websites = [
    {
      title: "ERK Consulting",
      description: "Professional consulting website with modern design and responsive layout. Built with cutting-edge web technologies for optimal performance and user experience.",
      tags: ["React", "Tailwind CSS", "Responsive", "Professional"],
      image: "/portfolio-assets/erk-consulting.jpg", // We'll add screenshots
      links: {
        demo: "https://erkconsulting.com",
        github: "https://github.com/MagicUnicornInc/erkconsulting.com"
      },
      featured: true
    },
    {
      title: "Carolina Mobile Tire",
      description: "Mobile tire service website showcasing services, scheduling, and customer testimonials. Clean, professional design optimized for mobile conversions.",
      tags: ["HTML5", "CSS3", "JavaScript", "Mobile-First"],
      image: "/portfolio-assets/carolina-mobile-tire.jpg",
      links: {
        demo: null, // Not live
        github: "https://github.com/MagicUnicornInc/Carolina-Mobile-Tire"
      }
    },
    {
      title: "Adorna Design",
      description: "Elegant interior design portfolio with stunning visual galleries and smooth animations. Features a custom Star Theme for enhanced user experience.",
      tags: ["WordPress", "Custom Theme", "E-commerce", "Design"],
      image: "/portfolio-assets/adorna-design.jpg",
      links: {
        demo: "https://adornadesign.com", // Assuming it's live
        github: "https://github.com/SkyBehind/Adorna-Design"
      },
      featured: true
    },
    {
      title: "Adorna Design Star Theme",
      description: "Custom WordPress theme built specifically for interior design professionals. Features advanced gallery systems and seamless e-commerce integration.",
      tags: ["WordPress Theme", "PHP", "Custom Design", "WooCommerce"],
      image: "/portfolio-assets/adorna-star-theme.jpg",
      links: {
        demo: "https://adornadesign.com",
        github: "https://github.com/SkyBehind/Adorna-Design-Star-Theme"
      }
    },
    {
      title: "Unicorn Commander",
      description: "Command center dashboard for AI operations and system management. Features real-time monitoring, analytics, and control interfaces.",
      tags: ["React", "Dashboard", "Real-time", "AI Integration"],
      image: "/portfolio-assets/unicorn-commander.jpg",
      links: {
        demo: "https://unicorncommander.com/",
        github: null // Repo location unknown
      },
      featured: true
    }
  ];

  const apps = [
    // Placeholder for future apps section
    {
      title: "Coming Soon",
      description: "Our downloadable applications and tools will be showcased here. Stay tuned for innovative solutions!",
      tags: ["Apps", "Tools", "Downloads"],
      image: "/portfolio-assets/apps-coming-soon.jpg",
      links: {
        demo: "#",
        github: "#"
      }
    }
  ];

  const currentProjects = activeCategory === 'websites' ? websites : apps;

  const openLightbox = (project, index = 0) => {
    // Create array of images for the project
    // For now, we'll use just the main image, but this can be expanded
    const images = [
      {
        src: project.image,
        alt: project.title,
        title: project.title,
        description: project.description
      }
      // Add more images here if the project has multiple screenshots
    ];

    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <div className="page-container">
      <BackgroundSparkles />

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
      <PageHeader
        title="Our Portfolio"
        subtitle="Explore our magical creations"
      />

      <main className="page-content">
        <div className="container">
          {/* Category Tabs */}
          <div className="portfolio-tabs">
            <motion.button
              className={`tab-btn ${activeCategory === 'websites' ? 'active' : ''}`}
              onClick={() => setActiveCategory('websites')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGlobe /> Websites
            </motion.button>
            <motion.button
              className={`tab-btn ${activeCategory === 'apps' ? 'active' : ''}`}
              onClick={() => setActiveCategory('apps')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaMobile /> Apps
            </motion.button>
          </div>

          {/* Category Description */}
          <motion.div
            className="category-description"
            key={activeCategory}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeCategory === 'websites' ? (
              <p>Professional websites crafted with modern technologies and stunning design</p>
            ) : (
              <p>Innovative applications and tools available for download and use</p>
            )}
          </motion.div>

          {/* Projects Grid */}
          <div className="portfolio-grid">
            {currentProjects.map((project, index) => (
              <motion.div
                key={`${activeCategory}-${index}`}
                className={`portfolio-card card ${project.featured ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {project.featured && (
                  <div className="featured-badge">
                    <FaRocket /> Featured
                  </div>
                )}
                <div
                  className="portfolio-image"
                  onClick={() => openLightbox(project)}
                  style={{ cursor: 'pointer' }}
                >
                  <Suspense fallback={
                    <div className="image-placeholder">
                      <div className="loading-shimmer"></div>
                    </div>
                  }>
                    <LazyImage
                      src={project.image}
                      alt={project.title}
                      fallback="/portfolio-assets/placeholder.svg"
                    />
                  </Suspense>
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <FaExpand className="expand-icon" />
                      <h4>Click to Enlarge</h4>
                    </div>
                  </div>
                </div>
                <div className="portfolio-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="portfolio-links">
                    {project.links.demo && (
                      <motion.a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        whileHover={{ scale: 1.05 }}
                      >
                        <FaExternalLinkAlt /> Live Site
                      </motion.a>
                    )}
                    {project.links.github && (
                      <motion.a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                        whileHover={{ scale: 1.05 }}
                      >
                        <FaGithub /> View Code
                      </motion.a>
                    )}
                    {!project.links.demo && !project.links.github && (
                      <span className="coming-soon-text">Details Coming Soon</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Portfolio;
