import React from 'react';
import Icon from '@/components/ui/Icon';

type BadgeVariant = 'default' | 'sale' | 'discount' | 'new' | 'filter' | 'success' | 'warning';
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-800',
  sale: 'text-red-600 font-bold',
  discount: 'bg-red-100 text-red-800 font-semibold',
  new: 'bg-green-100 text-green-800',
  filter: 'bg-gray-100 text-charcoal',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800'
};

const sizeClasses: Record<BadgeSize, string> = {
  xs: 'text-xs px-2 py-0.5',
  sm: 'text-sm px-3 py-1',
  md: 'text-base px-4 py-1.5',
  lg: 'text-lg px-5 py-2'
};

const baseClasses = 'inline-flex items-center';

export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
  removable = false,
  onRemove,
  className = ''
}: BadgeProps) {
  const variantClass = variantClasses[variant];
  const sizeClass = sizeClasses[size];

  // Different base styling for different variants
  const getBaseClasses = () => {
    if (variant === 'sale') {
      // Sale badges are just text, no background
      return `${baseClasses} ${sizeClass} ${variantClass}`;
    } else if (variant === 'filter') {
      // Filter chips are rounded-full
      return `${baseClasses} ${sizeClass} ${variantClass} rounded-full gap-1`;
    } else {
      // Default styled badges with rounded corners
      return `${baseClasses} ${sizeClass} ${variantClass} rounded-full`;
    }
  };

  const finalClasses = `${getBaseClasses()} ${className}`;

  return (
    <span className={finalClasses}>
      {children}
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="text-current hover:text-gray-600 ml-1"
          aria-label="Remove"
        >
          <Icon name="close" size="xs" />
        </button>
      )}
    </span>
  );
}