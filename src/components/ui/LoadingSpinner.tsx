import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
  centered?: boolean;
}

export default function LoadingSpinner({
  size = 'md',
  message,
  className = '',
  centered = true
}: LoadingSpinnerProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-8 w-8';
      case 'lg':
        return 'h-16 w-16';
      default: // 'md'
        return 'h-12 w-12';
    }
  };

  const spinner = (
    <div className="text-center">
      <div className={`animate-spin rounded-full border-b-2 border-deep-blue mx-auto ${getSizeClasses()} ${message ? 'mb-4' : ''}`}></div>
      {message && (
        <p className="text-gray-600">{message}</p>
      )}
    </div>
  );

  if (!centered) {
    return <div className={className}>{spinner}</div>;
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {spinner}
    </div>
  );
}