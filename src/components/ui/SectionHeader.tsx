import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  showDivider?: boolean;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  showDivider = true,
  className = ''
}: SectionHeaderProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <div className={`flex items-center justify-center gap-2 sm:gap-4 ${subtitle ? 'mb-4' : ''}`}>
        {showDivider && <div className="hidden sm:block flex-1 h-px bg-gray-300"></div>}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center px-2 text-deep-blue">
          {title}
        </h2>
        {showDivider && <div className="hidden sm:block flex-1 h-px bg-gray-300"></div>}
      </div>
      {subtitle && (
        <p className="text-lg sm:text-xl text-charcoal opacity-80 px-2">{subtitle}</p>
      )}
    </div>
  );
}