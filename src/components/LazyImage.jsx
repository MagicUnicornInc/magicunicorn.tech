import React, { useEffect, useState } from 'react';

const LazyImage = ({ src, alt, fallback = '/portfolio-assets/placeholder.svg' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
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
  }, [src, fallback]);

  if (!isLoaded) {
    return <div className="loading-placeholder">Loading...</div>;
  }

  return <img src={hasError ? fallback : imgSrc} alt={alt} />;
};

export default LazyImage;
