import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import './Input.css';

/**
 * Input Component - 2026 Edition
 * Modern input with floating labels, validation states, and icons
 *
 * @param {Object} props
 * @param {string} props.type - Input type (text, email, password, etc.)
 * @param {string} props.label - Input label
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.error - Error message
 * @param {string} props.success - Success message
 * @param {React.ReactNode} props.leftIcon - Icon on the left
 * @param {React.ReactNode} props.rightIcon - Icon on the right
 * @param {boolean} props.disabled - Disable input
 * @param {boolean} props.required - Mark as required
 * @param {string} props.helperText - Helper text below input
 * @param {string} props.size - Size: sm, md, lg
 */
const Input = forwardRef(({
  type = 'text',
  label,
  placeholder,
  error,
  success,
  leftIcon,
  rightIcon,
  disabled = false,
  required = false,
  helperText,
  size = 'md',
  className = '',
  value,
  onChange,
  onBlur,
  onFocus,
  id,
  name,
  ...rest
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`;

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
    onBlur?.(e);
  };

  const handleChange = (e) => {
    setHasValue(!!e.target.value);
    onChange?.(e);
  };

  const containerClasses = [
    'input-container',
    `input-container--${size}`,
    isFocused && 'input-container--focused',
    error && 'input-container--error',
    success && 'input-container--success',
    disabled && 'input-container--disabled',
    (hasValue || isFocused) && 'input-container--has-value',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-label__required" aria-label="required">*</span>}
        </label>
      )}

      {/* Input wrapper */}
      <div className="input-wrapper">
        {/* Left icon */}
        {leftIcon && (
          <span className="input-icon input-icon--left" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Input field */}
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          className="input-field"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...rest}
        />

        {/* Right icon */}
        {rightIcon && (
          <span className="input-icon input-icon--right" aria-hidden="true">
            {rightIcon}
          </span>
        )}

        {/* Focus ring animation */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              className="input-focus-ring"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Helper text, error, or success message */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            id={`${inputId}-error`}
            className="input-message input-message--error"
            role="alert"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
        {!error && success && (
          <motion.p
            className="input-message input-message--success"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {success}
          </motion.p>
        )}
        {!error && !success && helperText && (
          <p id={`${inputId}-helper`} className="input-message input-message--helper">
            {helperText}
          </p>
        )}
      </AnimatePresence>
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  success: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  helperText: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default Input;
