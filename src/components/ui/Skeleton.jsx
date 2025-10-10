import React from 'react';
import PropTypes from 'prop-types';
import './Skeleton.css';

/**
 * Skeleton Component - Loading placeholder
 * Provides visual feedback during content loading
 *
 * @param {Object} props
 * @param {string} props.variant - Shape: text, circular, rectangular, card
 * @param {string} props.width - Custom width
 * @param {string} props.height - Custom height
 * @param {number} props.count - Number of skeleton elements
 * @param {string} props.animation - Animation type: pulse, wave, none
 */
const Skeleton = ({
  variant = 'text',
  width,
  height,
  count = 1,
  animation = 'pulse',
  className = '',
  ...rest
}) => {
  const skeletonClasses = [
    'skeleton',
    `skeleton--${variant}`,
    animation !== 'none' && `skeleton--${animation}`,
    className,
  ].filter(Boolean).join(' ');

  const style = {
    width,
    height,
  };

  const elements = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={skeletonClasses}
      style={style}
      aria-hidden="true"
      {...rest}
    />
  ));

  return count === 1 ? elements[0] : <>{elements}</>;
};

Skeleton.propTypes = {
  variant: PropTypes.oneOf(['text', 'circular', 'rectangular', 'card']),
  width: PropTypes.string,
  height: PropTypes.string,
  count: PropTypes.number,
  animation: PropTypes.oneOf(['pulse', 'wave', 'none']),
  className: PropTypes.string,
};

// Preset skeleton components for common use cases
export const SkeletonText = ({ lines = 3, ...props }) => (
  <div className="skeleton-text-group">
    <Skeleton variant="text" count={lines} {...props} />
  </div>
);

export const SkeletonCard = () => (
  <div className="skeleton-card" aria-hidden="true">
    <Skeleton variant="rectangular" height="200px" className="skeleton-card__image" />
    <div className="skeleton-card__content">
      <Skeleton variant="text" width="60%" height="24px" />
      <Skeleton variant="text" count={2} />
    </div>
  </div>
);

export const SkeletonAvatar = ({ size = '48px' }) => (
  <Skeleton variant="circular" width={size} height={size} />
);

SkeletonText.propTypes = {
  lines: PropTypes.number,
};

SkeletonAvatar.propTypes = {
  size: PropTypes.string,
};

export default Skeleton;
