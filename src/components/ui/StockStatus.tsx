import React from 'react';

interface StockStatusProps {
  inStock: boolean;
  inventory?: number;
  showQuantity?: boolean;
  size?: 'xs' | 'sm';
  variant?: 'card' | 'detail';
  className?: string;
}

export default function StockStatus({
  inStock,
  inventory,
  showQuantity = true,
  size = 'xs',
  variant = 'card',
  className = ''
}: StockStatusProps) {
  const getSizeClasses = () => {
    return size === 'xs' ? 'text-xs' : 'text-sm';
  };

  const getColorClasses = (isPositive: boolean) => {
    if (variant === 'detail') {
      return isPositive ? 'text-green-700' : 'text-red-700';
    } else {
      return isPositive ? 'text-green-600' : 'text-red-600';
    }
  };

  const getElement = () => {
    if (variant === 'detail') {
      return 'p';
    } else {
      return 'span';
    }
  };

  const Element = getElement();
  const sizeClasses = getSizeClasses();
  const colorClasses = getColorClasses(inStock);
  const baseClasses = `${sizeClasses} ${colorClasses} font-medium ${className}`;

  if (inStock) {
    const inventoryText = showQuantity && inventory ? ` (${inventory} available)` : '';
    return (
      <Element className={baseClasses}>
        In Stock{inventoryText}
      </Element>
    );
  } else {
    return (
      <Element className={baseClasses}>
        Out of Stock
      </Element>
    );
  }
}