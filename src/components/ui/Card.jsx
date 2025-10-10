import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './Card.css';

/**
 * Card Component - 2026 Edition
 * Versatile card with multiple variants and interactive states
 *
 * @param {Object} props
 * @param {string} props.variant - Visual style: base, elevated, interactive, gradient, glass
 * @param {string} props.hoverEffect - Hover behavior: none, lift, scale, glow
 * @param {boolean} props.clickable - Make card clickable
 * @param {Function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Card content
 */
const Card = forwardRef(({
  variant = 'base',
  hoverEffect = 'lift',
  clickable = false,
  onClick,
  className = '',
  children,
  ...rest
}, ref) => {
  const cardClasses = [
    'card',
    `card--${variant}`,
    hoverEffect !== 'none' && `card--hover-${hoverEffect}`,
    clickable && 'card--clickable',
    className,
  ].filter(Boolean).join(' ');

  const Component = clickable ? motion.button : motion.div;

  const hoverVariants = {
    lift: {
      y: -4,
      boxShadow: '0 16px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(182, 110, 255, 0.2)',
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    scale: {
      scale: 1.02,
      boxShadow: '0 16px 32px rgba(0, 0, 0, 0.3)',
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    glow: {
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2), 0 0 40px rgba(182, 110, 255, 0.3)',
      transition: { duration: 0.3, ease: 'easeOut' }
    },
  };

  return (
    <Component
      ref={ref}
      className={cardClasses}
      onClick={clickable ? onClick : undefined}
      whileHover={hoverEffect !== 'none' ? hoverVariants[hoverEffect] : undefined}
      whileTap={clickable ? { scale: 0.98 } : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      {...rest}
    >
      {children}
    </Component>
  );
});

Card.displayName = 'Card';

Card.propTypes = {
  variant: PropTypes.oneOf(['base', 'elevated', 'interactive', 'gradient', 'glass']),
  hoverEffect: PropTypes.oneOf(['none', 'lift', 'scale', 'glow']),
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

// Subcomponents for card composition
export const CardHeader = ({ children, className = '', ...rest }) => (
  <div className={`card-header ${className}`} {...rest}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '', ...rest }) => (
  <div className={`card-body ${className}`} {...rest}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', ...rest }) => (
  <div className={`card-footer ${className}`} {...rest}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', as: Component = 'h3', ...rest }) => (
  <Component className={`card-title ${className}`} {...rest}>
    {children}
  </Component>
);

export const CardDescription = ({ children, className = '', ...rest }) => (
  <p className={`card-description ${className}`} {...rest}>
    {children}
  </p>
);

export const CardIcon = ({ children, className = '', ...rest }) => (
  <div className={`card-icon ${className}`} {...rest}>
    {children}
  </div>
);

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.elementType,
};

CardDescription.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardIcon.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
