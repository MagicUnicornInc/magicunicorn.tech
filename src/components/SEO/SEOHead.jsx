import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEOHead Component
 * Dynamically updates page meta tags, Schema.org markup, and social sharing metadata
 * Based on the current route and provided configuration
 */

// Default SEO configuration
const DEFAULT_CONFIG = {
  siteName: 'Magic Unicorn Tech',
  siteUrl: 'https://magicunicorn.tech',
  defaultTitle: 'Magic Unicorn Tech | AI-Powered Innovation & Technology Solutions',
  defaultDescription: 'Transform your ideas into magic with our AI-powered solutions, artistic technology, and open-source innovation. Custom tech solutions for the modern world.',
  defaultImage: '/images/og-image-1200x630.jpg',
  twitterHandle: '@magicunicorntech',
  locale: 'en_US',
  author: 'Magic Unicorn Unconventional Technology & Stuff Inc.'
};

// Page-specific SEO configurations
export const SEO_PAGES = {
  '/': {
    title: 'Magic Unicorn Tech | AI-Powered Innovation & Technology Solutions',
    description: 'Transform your ideas into magic with our AI-powered solutions, artistic technology, and open-source innovation. Custom tech solutions for the modern world.',
    keywords: 'AI solutions, technology consulting, custom development, open source, innovation, machine learning',
    schema: ['Organization', 'WebSite'],
    type: 'website'
  },
  '/about': {
    title: 'About Us | Our Story & Mission | Magic Unicorn Tech',
    description: 'Learn about Magic Unicorn Tech\'s journey, our mission to transform ideas into magic, and the team behind innovative AI-powered solutions.',
    keywords: 'about us, company, mission, team, technology company, innovation',
    schema: ['Organization', 'Breadcrumb'],
    type: 'website'
  },
  '/services': {
    title: 'Our Services | AI Development & Tech Consulting | Magic Unicorn Tech',
    description: 'Explore our comprehensive technology services including custom AI development, web applications, technology consulting, and open-source solutions.',
    keywords: 'AI development, web development, tech consulting, custom software, cloud solutions, machine learning services',
    schema: ['Service', 'Breadcrumb'],
    type: 'website'
  },
  '/portfolio': {
    title: 'Portfolio | Our Projects & Success Stories | Magic Unicorn Tech',
    description: 'Discover our portfolio of innovative projects, successful implementations, and client success stories in AI, web development, and technology consulting.',
    keywords: 'portfolio, projects, case studies, success stories, client work, project showcase',
    schema: ['CreativeWork', 'Breadcrumb'],
    type: 'website'
  },
  '/blog': {
    title: 'Tech Blog | AI Insights & Innovation | Magic Unicorn Tech',
    description: 'Stay updated with the latest insights on AI, technology trends, development best practices, and innovation from the Magic Unicorn Tech team.',
    keywords: 'tech blog, AI insights, development tutorials, technology trends, programming',
    schema: ['Blog', 'Breadcrumb'],
    type: 'website'
  },
  '/contact': {
    title: 'Contact Us | Get in Touch | Magic Unicorn Tech',
    description: 'Ready to transform your ideas into magic? Contact Magic Unicorn Tech for AI solutions, technology consulting, and custom development services.',
    keywords: 'contact, get in touch, inquiries, consultation, hire, request quote',
    schema: ['ContactPage', 'Breadcrumb'],
    type: 'website'
  }
};

/**
 * Generate Schema.org JSON-LD markup based on page configuration
 */
const generateSchemaMarkup = (schemas, pageConfig, location) => {
  const schemaObjects = [];
  const fullUrl = `${DEFAULT_CONFIG.siteUrl}${location.pathname}`;

  schemas.forEach(type => {
    switch (type) {
      case 'Organization':
        schemaObjects.push({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          'name': 'Magic Unicorn Unconventional Technology & Stuff Inc.',
          'alternateName': 'Magic Unicorn Tech',
          'url': DEFAULT_CONFIG.siteUrl,
          'logo': {
            '@type': 'ImageObject',
            'url': `${DEFAULT_CONFIG.siteUrl}/images/logo-512x512.png`,
            'width': 512,
            'height': 512
          },
          'image': `${DEFAULT_CONFIG.siteUrl}${DEFAULT_CONFIG.defaultImage}`,
          'description': DEFAULT_CONFIG.defaultDescription,
          'foundingDate': '2024',
          'contactPoint': {
            '@type': 'ContactPoint',
            'contactType': 'Customer Service',
            'email': 'contact@magicunicorn.tech',
            'availableLanguage': ['English']
          },
          'sameAs': [
            'https://twitter.com/magicunicorntech',
            'https://linkedin.com/company/magicunicorntech',
            'https://github.com/magicunicorntech'
          ],
          'areaServed': 'Worldwide',
          'knowsAbout': [
            'Artificial Intelligence',
            'Machine Learning',
            'Web Development',
            'Open Source Software',
            'Technology Consulting'
          ]
        });
        break;

      case 'WebSite':
        schemaObjects.push({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'name': DEFAULT_CONFIG.siteName,
          'url': DEFAULT_CONFIG.siteUrl,
          'potentialAction': {
            '@type': 'SearchAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': `${DEFAULT_CONFIG.siteUrl}/search?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
          }
        });
        break;

      case 'Breadcrumb':
        const pathParts = location.pathname.split('/').filter(Boolean);
        const breadcrumbItems = [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': DEFAULT_CONFIG.siteUrl
          }
        ];

        pathParts.forEach((part, index) => {
          const path = '/' + pathParts.slice(0, index + 1).join('/');
          breadcrumbItems.push({
            '@type': 'ListItem',
            'position': index + 2,
            'name': part.charAt(0).toUpperCase() + part.slice(1),
            'item': `${DEFAULT_CONFIG.siteUrl}${path}`
          });
        });

        schemaObjects.push({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': breadcrumbItems
        });
        break;

      case 'Service':
        schemaObjects.push({
          '@context': 'https://schema.org',
          '@type': 'Service',
          'serviceType': 'AI & Technology Solutions',
          'provider': {
            '@type': 'Organization',
            'name': DEFAULT_CONFIG.siteName
          },
          'offers': [
            {
              '@type': 'Offer',
              'name': 'Custom AI Development',
              'description': 'Tailored artificial intelligence solutions for your unique needs'
            },
            {
              '@type': 'Offer',
              'name': 'Technology Consulting',
              'description': 'Expert guidance on technology strategy and implementation'
            },
            {
              '@type': 'Offer',
              'name': 'Web Development',
              'description': 'Modern, scalable web applications and solutions'
            }
          ]
        });
        break;

      case 'Blog':
        schemaObjects.push({
          '@context': 'https://schema.org',
          '@type': 'Blog',
          'name': `${DEFAULT_CONFIG.siteName} Blog`,
          'description': pageConfig.description,
          'url': fullUrl,
          'publisher': {
            '@type': 'Organization',
            'name': DEFAULT_CONFIG.siteName,
            'logo': {
              '@type': 'ImageObject',
              'url': `${DEFAULT_CONFIG.siteUrl}/images/logo-512x512.png`
            }
          }
        });
        break;

      case 'CreativeWork':
        schemaObjects.push({
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          'name': pageConfig.title,
          'description': pageConfig.description,
          'url': fullUrl,
          'creator': {
            '@type': 'Organization',
            'name': DEFAULT_CONFIG.siteName
          }
        });
        break;

      case 'ContactPage':
        schemaObjects.push({
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          'name': pageConfig.title,
          'description': pageConfig.description,
          'url': fullUrl
        });
        break;
    }
  });

  return schemaObjects;
};

/**
 * Update document head with meta tags
 */
const updateMetaTags = (pageConfig, location) => {
  const fullUrl = `${DEFAULT_CONFIG.siteUrl}${location.pathname}`;
  const imageUrl = pageConfig.image
    ? `${DEFAULT_CONFIG.siteUrl}${pageConfig.image}`
    : `${DEFAULT_CONFIG.siteUrl}${DEFAULT_CONFIG.defaultImage}`;

  // Update title
  document.title = pageConfig.title || DEFAULT_CONFIG.defaultTitle;

  // Helper to update or create meta tag
  const setMetaTag = (property, content, isProperty = false) => {
    const attribute = isProperty ? 'property' : 'name';
    let element = document.querySelector(`meta[${attribute}="${property}"]`);

    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, property);
      document.head.appendChild(element);
    }

    element.setAttribute('content', content);
  };

  // Basic meta tags
  setMetaTag('description', pageConfig.description || DEFAULT_CONFIG.defaultDescription);
  setMetaTag('keywords', pageConfig.keywords || '');
  setMetaTag('author', DEFAULT_CONFIG.author);
  setMetaTag('robots', 'index, follow, max-image-preview:large');

  // Canonical link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', fullUrl);

  // OpenGraph tags
  setMetaTag('og:title', pageConfig.title || DEFAULT_CONFIG.defaultTitle, true);
  setMetaTag('og:description', pageConfig.description || DEFAULT_CONFIG.defaultDescription, true);
  setMetaTag('og:type', pageConfig.type || 'website', true);
  setMetaTag('og:url', fullUrl, true);
  setMetaTag('og:image', imageUrl, true);
  setMetaTag('og:image:width', '1200', true);
  setMetaTag('og:image:height', '630', true);
  setMetaTag('og:image:alt', `${DEFAULT_CONFIG.siteName} - ${pageConfig.title}`, true);
  setMetaTag('og:site_name', DEFAULT_CONFIG.siteName, true);
  setMetaTag('og:locale', DEFAULT_CONFIG.locale, true);

  // Twitter Card tags
  setMetaTag('twitter:card', 'summary_large_image');
  setMetaTag('twitter:site', DEFAULT_CONFIG.twitterHandle);
  setMetaTag('twitter:creator', DEFAULT_CONFIG.twitterHandle);
  setMetaTag('twitter:title', pageConfig.title || DEFAULT_CONFIG.defaultTitle);
  setMetaTag('twitter:description', pageConfig.description || DEFAULT_CONFIG.defaultDescription);
  setMetaTag('twitter:image', imageUrl);
  setMetaTag('twitter:image:alt', `${DEFAULT_CONFIG.siteName}`);

  // Update Schema.org JSON-LD
  let schemaScript = document.querySelector('script[type="application/ld+json"]');
  if (schemaScript) {
    const schemas = generateSchemaMarkup(
      pageConfig.schema || ['Organization'],
      pageConfig,
      location
    );
    schemaScript.textContent = JSON.stringify(schemas);
  }
};

/**
 * SEOHead Hook Component
 * Use this in pages that need custom SEO
 */
export const useSEO = (customConfig = {}) => {
  const location = useLocation();

  useEffect(() => {
    const pageConfig = SEO_PAGES[location.pathname] || {};
    const finalConfig = { ...pageConfig, ...customConfig };

    updateMetaTags(finalConfig, location);

    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location, customConfig]);
};

/**
 * SEOHead Component for use in individual pages
 */
const SEOHead = ({
  title,
  description,
  keywords,
  image,
  schema = [],
  type = 'website'
}) => {
  const customConfig = {
    title,
    description,
    keywords,
    image,
    schema,
    type
  };

  useSEO(customConfig);

  return null; // This component doesn't render anything
};

export default SEOHead;
