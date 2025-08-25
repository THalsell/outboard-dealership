'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function UserAccountMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would normally come from auth context
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const accountLinks = isLoggedIn ? [
    { name: 'My Profile', href: '/account/profile', icon: '👤' },
    { name: 'Orders', href: '/account/orders', icon: '📦' },
    { name: 'Service History', href: '/service/history', icon: '🔧' },
    { name: 'Loyalty Points', href: '/account/loyalty', icon: '⭐' },
    { name: 'Settings', href: '/account/settings', icon: '⚙️' },
  ] : [];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1"
        aria-label="User account"
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {isLoggedIn ? (
            <>
              {/* User Info */}
              <div className="px-4 py-3 border-b">
                <p className="font-semibold text-gray-900">John Doe</p>
                <p className="text-sm text-gray-600">john.doe@example.com</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-gold-100 text-gold-800 px-2 py-1 rounded-full">
                    Gold Member
                  </span>
                  <span className="text-xs text-gray-600">1,250 points</span>
                </div>
              </div>

              {/* Account Links */}
              <div className="py-2">
                {accountLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="text-gray-700">{link.name}</span>
                  </Link>
                ))}
              </div>

              {/* Sign Out */}
              <div className="border-t pt-2">
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2 w-full hover:bg-gray-50 transition-colors text-left text-red-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Guest User */}
              <div className="px-4 py-3">
                <p className="text-gray-700 mb-3">Welcome! Sign in to access your account</p>
                <Link
                  href="/login"
                  className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium mb-2"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Create Account
                </Link>
              </div>

              {/* Quick Links for Guests */}
              <div className="border-t py-2">
                <Link
                  href="/account/orders"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="text-gray-700">Track Order</span>
                </Link>
                <Link
                  href="/service/status"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Service Status</span>
                </Link>
                <Link
                  href="/learn/faqs"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Help & FAQs</span>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}