import React from 'react';

type CardAs = 'div' | 'section' | 'article' | 'aside';
type CardPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type CardShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type CardRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface CardProps {
  children: React.ReactNode;
  as?: CardAs;
  padding?: CardPadding;
  shadow?: CardShadow;
  border?: boolean;
  rounded?: CardRounded;
  hover?: boolean;
  onClick?: () => void;
  className?: string;
}

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  xs: 'p-2',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10'
};

const shadowClasses: Record<CardShadow, string> = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl'
};

const roundedClasses: Record<CardRounded, string> = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full'
};

const baseClasses = 'bg-white';

export default function Card({
  children,
  as = 'div',
  padding = 'md',
  shadow = 'none',
  border = true,
  rounded = 'lg',
  hover = false,
  onClick,
  className = ''
}: CardProps) {
  const Component = as;

  const paddingClass = paddingClasses[padding];
  const shadowClass = shadowClasses[shadow];
  const roundedClass = roundedClasses[rounded];
  const borderClass = border ? 'border border-gray-200' : '';
  const hoverClass = hover ? 'hover:shadow-xl transition-shadow cursor-pointer' : '';

  const finalClasses = `${baseClasses} ${roundedClass} ${paddingClass} ${shadowClass} ${borderClass} ${hoverClass} ${className}`.trim().replace(/\s+/g, ' ');

  if (onClick) {
    return (
      <Component
        className={finalClasses}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component className={finalClasses}>
      {children}
    </Component>
  );
}