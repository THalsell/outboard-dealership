import React from 'react';

type IconName =
  | 'chevronDown'
  | 'chevronUp'
  | 'chevronRight'
  | 'chevronLeft'
  | 'close'
  | 'menu'
  | 'search'
  | 'check'
  | 'plus'
  | 'minus'
  | 'shoppingCart'
  | 'questionMark'
  | 'logout'
  | 'clipboard'
  | 'package'
  | 'phone'
  | 'email'
  | 'calendar-days'
  | 'calendar'
  | 'dollar-sign'
  | 'check-circle'
  | 'truck'
  | 'wrench'
  | 'users'
  | 'map-pin'
  | 'clock';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: IconSize;
  strokeWidth?: number;
}

const iconPaths: Record<IconName, string> = {
  chevronDown: 'M19 9l-7 7-7-7',
  chevronUp: 'M5 15l7-7 7 7',
  chevronRight: 'M9 5l7 7-7 7',
  chevronLeft: 'M15 19l-7-7 7-7',
  close: 'M6 18L18 6M6 6l12 12',
  menu: 'M4 6h16M4 12h16M4 18h16',
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  check: 'M5 13l4 4L19 7',
  plus: 'M12 4v16m8-8H4',
  minus: 'M20 12H4',
  shoppingCart: 'M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L6 7h-2m1 6v7a1 1 0 001 1h10a1 1 0 001-1v-7m-4 3v4m-4-4v4',
  questionMark: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  logout: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
  clipboard: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  package: 'M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m6-8V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2z',
  phone: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
  email: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
  'calendar-days': 'M8 2v3m8-3v3m-9 8h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2zM16 11h.01M12 11h.01M8 11h.01M16 15h.01M12 15h.01M8 15h.01',
  calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  'dollar-sign': 'M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6',
  'check-circle': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  truck: 'M1 3h15v9H1zm14 1.5v4h3l2-2v-2h-5zM1.5 12.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm11 0a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z',
  wrench: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.77 3.77z',
  users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m22-4a4 4 0 00-4-4h-1.5m-.5-11a4 4 0 110 8 4 4 0 010-8zM9 11a4 4 0 100-8 4 4 0 000 8z',
  'map-pin': 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 7a3 3 0 100 6 3 3 0 000-6z',
  clock: 'M12 6v6l4 2m6-8a9 9 0 11-18 0 9 9 0 0118 0z'
};

const sizeClasses: Record<IconSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8'
};

export default function Icon({
  name,
  size = 'md',
  strokeWidth = 2,
  className = '',
  ...rest
}: IconProps) {
  const sizeClass = sizeClasses[size];
  const path = iconPaths[name];

  if (!path) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <svg
      className={`${sizeClass} ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      {...rest}
    >
      <path d={path} />
    </svg>
  );
}