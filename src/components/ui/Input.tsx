import React, { forwardRef, useId } from 'react';

type InputSize = 'sm' | 'md' | 'lg';
type InputVariant = 'default' | 'dark' | 'transparent';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: InputSize;
  variant?: InputVariant;
  fullWidth?: boolean;
  containerClassName?: string;
}

const sizeClasses: Record<InputSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-4 py-3 text-lg'
};

const variantClasses: Record<InputVariant, string> = {
  default: 'bg-white border-gray-300 text-gray-900 placeholder-gray-500',
  dark: 'bg-gray-800 border-gray-700 text-white placeholder-gray-400',
  transparent: 'bg-white/10 border-white/20 text-white placeholder-gray-300'
};

const focusClasses: Record<InputVariant, string> = {
  default: 'focus:outline-none focus:border-deep-blue focus:ring-1 focus:ring-deep-blue',
  dark: 'focus:outline-none focus:border-gray-500',
  transparent: 'focus:outline-none focus:border-white'
};

const baseClasses = 'border rounded-lg transition-colors';

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  size = 'md',
  variant = 'default',
  fullWidth = false,
  containerClassName = '',
  className = '',
  id,
  ...props
}, ref) => {
  const autoId = useId();
  const inputId = id || autoId;

  const sizeClass = sizeClasses[size];
  const variantClass = variantClasses[variant];
  const focusClass = focusClasses[variant];
  const widthClass = fullWidth ? 'w-full' : '';

  // Adjust padding for icons
  const leftPadding = leftIcon ? (size === 'lg' ? 'pl-10' : 'pl-8') : '';
  const rightPadding = rightIcon ? (size === 'lg' ? 'pr-10' : 'pr-8') : '';
  const paddingOverride = leftPadding || rightPadding ? `${leftPadding} ${rightPadding}` : sizeClass;

  const inputClasses = `${baseClasses} ${paddingOverride || sizeClass} ${variantClass} ${focusClass} ${widthClass} ${className}`.trim().replace(/\s+/g, ' ');

  // Simple input without wrapper when no label, error, hint, or icons
  if (!label && !error && !hint && !leftIcon && !rightIcon) {
    return (
      <input
        ref={ref}
        id={inputId}
        className={inputClasses}
        {...props}
      />
    );
  }

  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;