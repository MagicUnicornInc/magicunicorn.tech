import React, { memo } from 'react';

/**
 * OptimizedImage component with responsive srcset and WebP support
 * Provides automatic fallback for browsers that don't support WebP
 */
const OptimizedImage = memo(({
  src,
  alt,
  className = '',
  width,
  height,
  sizes = '100vw',
  priority = false
}) => {
  // Generate srcset for different sizes (assuming WebP conversion)
  const generateSrcSet = (imagePath) => {
    const ext = imagePath.split('.').pop();
    const basePath = imagePath.replace(`.${ext}`, '');

    // For portfolio images, generate multiple sizes
    return `
      ${basePath}.webp 1x,
      ${basePath}@2x.webp 2x
    `;
  };

  return (
    <picture>
      {/* WebP format for modern browsers */}
      <source
        type="image/webp"
        srcSet={generateSrcSet(src)}
        sizes={sizes}
      />

      {/* Fallback to original format */}
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{
          maxWidth: '100%',
          height: 'auto'
        }}
      />
    </picture>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
