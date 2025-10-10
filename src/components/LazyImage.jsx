import React, { useEffect, useState, memo, useRef } from 'react';

const LazyImage = memo(({
  src,
  alt,
  fallback = '/portfolio-assets/placeholder.svg',
  className = '',
  width,
  height
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px' // Start loading 50px before visible
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Load image once in view
  useEffect(() => {
    if (!isInView) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
      setHasError(false);
    };
    img.onerror = () => {
      setImgSrc(fallback);
      setIsLoaded(true);
      setHasError(true);
    };
  }, [src, fallback, isInView]);

  if (!isInView || !isLoaded) {
    return (
      <div
        ref={imgRef}
        className={`loading-placeholder ${className}`}
        style={{
          width: width || '100%',
          height: height || '200px',
          backgroundColor: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isInView && 'Loading...'}
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={hasError ? fallback : imgSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
    />
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;
