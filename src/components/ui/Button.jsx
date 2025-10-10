import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './Button.css';

/**
 * Button Component - 2026 Edition
 * Premium button with micro-interactions, loading states, and accessibility
 *
 * @param {Object} props
 * @param {string} props.variant - Visual style: primary, secondary, ghost, danger, success
 * @param {string} props.size - Size: xs, sm, md, lg, xl
 * @param {boolean} props.loading - Show loading spinner
 * @param {boolean} props.disabled - Disable interaction
 * @param {boolean} props.fullWidth - Take full width of container
 * @param {React.ReactNode} props.leftIcon - Icon before text
 * @param {React.ReactNode} props.rightIcon - Icon after text
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 */
const Button = forwardRef(({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  onClick,
  type = 'button',
  className = '',
  ...rest
}, ref) => {
  const buttonClasses = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full-width',
    (loading || disabled) && 'btn--disabled',
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  // Animation variants
  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={disabled || loading ? undefined : 'hover'}
      whileTap={disabled || loading ? undefined : 'tap'}
      variants={buttonVariants}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      <span className="btn__content">
        {loading ? (
          <>
            <span className="btn__spinner" aria-hidden="true">
              <span className="spinner"></span>
            </span>
            <span className="btn__text btn__text--loading">
              {children}
            </span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span className="btn__icon btn__icon--left" aria-hidden="true">
                {leftIcon}
              </span>
            )}
            <span className="btn__text">{children}</span>
            {rightIcon && (
              <span className="btn__icon btn__icon--right" aria-hidden="true">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </span>

      {/* Shimmer effect overlay */}
      <span className="btn__shimmer" aria-hidden="true"></span>
    </motion.button>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger', 'success']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export default Button;
