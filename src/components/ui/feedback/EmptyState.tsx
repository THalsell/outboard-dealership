import React from 'react';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  actionHref?: string;
  actionOnClick?: () => void;
  actionLabel?: string;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  icon,
  showIcon = false,
  action,
  actionHref,
  actionOnClick,
  actionLabel = "Start Shopping",
  className = ''
}: EmptyStateProps) {
  const baseClasses = showIcon ? 'text-center py-12' : 'flex flex-col items-center justify-center py-16 text-center';
  const titleClasses = showIcon
    ? 'text-xl font-semibold text-deep-blue mb-2'
    : `text-lg font-semibold text-deep-blue ${description ? 'mb-2' : 'mb-4'}`;

  return (
    <div className={`${baseClasses} ${className}`}>
      {showIcon && (
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {icon}
        </div>
      )}

      <h3 className={titleClasses}>{title}</h3>

      {description && (
        <p className={`text-gray-600 ${showIcon ? '' : 'mb-4 max-w-md'}`}>
          {description}
        </p>
      )}

      {action && (
        <button
          onClick={action.onClick}
          className="text-deep-blue hover:underline font-medium"
        >
          {action.label}
        </button>
      )}

      {actionHref && (
        <Link
          href={actionHref}
          className="inline-block bg-deep-blue text-white px-6 py-2 rounded-lg hover:bg-[#0a3a6e] transition-colors"
          onClick={actionOnClick}
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}