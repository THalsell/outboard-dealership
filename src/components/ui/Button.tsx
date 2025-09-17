import React from 'react';
import Icon from '@/components/ui/Icon';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'toggle';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  active?: boolean; // For toggle buttons
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-deep-blue text-white hover:bg-[#0a3a6e] focus:ring-deep-blue',
  secondary: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500',
  ghost: 'text-deep-blue hover:underline font-medium',
  danger: 'text-red-600 hover:text-red-700',
  toggle: 'text-sm font-medium rounded' // Base for toggle buttons, styling varies by active state
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl'
};

const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  active = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const variantClass = variantClasses[variant];
  const sizeClass = sizeClasses[size];

  // Special handling for toggle buttons
  const getToggleClasses = () => {
    if (variant === 'toggle') {
      return active
        ? 'bg-gray-300 text-charcoal'
        : 'bg-gray-100 text-professional-gray hover:bg-gray-200';
    }
    return '';
  };

  // Special handling for ghost buttons (no padding/background)
  const getClasses = () => {
    if (variant === 'ghost' || variant === 'danger') {
      return `${baseClasses} ${variantClass} ${className}`;
    } else if (variant === 'toggle') {
      return `${baseClasses} ${sizeClass} ${variantClass} ${getToggleClasses()} ${className}`;
    } else {
      return `${baseClasses} ${sizeClass} ${variantClass} rounded-lg shadow-sm ${fullWidth ? 'w-full' : ''} ${className}`;
    }
  };

  const finalClasses = getClasses();

  return (
    <button
      className={finalClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Icon name="minus" size="sm" className="animate-spin mr-2" />
      )}
      {leftIcon && !loading && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}