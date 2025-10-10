import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll position
 * @param {number} threshold - Scroll threshold in pixels
 * @returns {Object} - Scroll state { scrollY, scrollDirection, isScrolled }
 *
 * @example
 * const { scrollY, scrollDirection, isScrolled } = useScrollPosition(100);
 */
export function useScrollPosition(threshold = 0) {
  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    scrollDirection: 'none',
    isScrolled: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY;

      setScrollState({
        scrollY,
        scrollDirection: scrollY > lastScrollY ? 'down' : scrollY < lastScrollY ? 'up' : 'none',
        isScrolled: scrollY > threshold,
      });

      lastScrollY = scrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return scrollState;
}

/**
 * Simple hook to check if scrolled past threshold
 * @param {number} threshold - Scroll threshold in pixels
 * @returns {boolean} - Whether scrolled past threshold
 */
export function useIsScrolled(threshold = 20) {
  const { isScrolled } = useScrollPosition(threshold);
  return isScrolled;
}
