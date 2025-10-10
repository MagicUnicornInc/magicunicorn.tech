/**
 * Web Vitals Tracking for Core Web Vitals Monitoring
 * Measures and reports key performance metrics to Google Analytics
 */

export function initWebVitals() {
  if (typeof window === 'undefined') return;

  // Lazy load web-vitals library
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    /**
     * Send metrics to Google Analytics
     * @param {Object} metric - The web vital metric
     */
    function sendToAnalytics(metric) {
      // Check if Google Analytics is available
      if (typeof gtag !== 'undefined') {
        gtag('event', metric.name, {
          event_category: 'Web Vitals',
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_label: metric.id,
          non_interaction: true,
        });
      }

      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Web Vitals] ${metric.name}:`, {
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta,
          id: metric.id
        });
      }
    }

    // Cumulative Layout Shift (CLS)
    // Target: < 0.1
    getCLS(sendToAnalytics);

    // First Input Delay (FID)
    // Target: < 100ms
    getFID(sendToAnalytics);

    // First Contentful Paint (FCP)
    // Target: < 1.8s
    getFCP(sendToAnalytics);

    // Largest Contentful Paint (LCP)
    // Target: < 2.5s
    getLCP(sendToAnalytics);

    // Time to First Byte (TTFB)
    // Target: < 600ms
    getTTFB(sendToAnalytics);
  }).catch(err => {
    console.warn('Failed to load web-vitals:', err);
  });
}

/**
 * Manual performance mark for custom metrics
 * @param {string} name - Name of the performance mark
 */
export function markPerformance(name) {
  if (typeof window !== 'undefined' && window.performance) {
    window.performance.mark(name);
  }
}

/**
 * Measure performance between two marks
 * @param {string} name - Name of the measurement
 * @param {string} startMark - Start mark name
 * @param {string} endMark - End mark name
 */
export function measurePerformance(name, startMark, endMark) {
  if (typeof window !== 'undefined' && window.performance) {
    try {
      window.performance.measure(name, startMark, endMark);
      const measure = window.performance.getEntriesByName(name)[0];

      if (typeof gtag !== 'undefined') {
        gtag('event', 'timing_complete', {
          name: name,
          value: Math.round(measure.duration),
          event_category: 'Performance'
        });
      }

      return measure.duration;
    } catch (err) {
      console.warn('Performance measurement failed:', err);
    }
  }
  return null;
}
