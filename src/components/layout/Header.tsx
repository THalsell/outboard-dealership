'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Inventory', href: '/inventory' },
    { name: 'Parts', href: '/parts' },
    { name: 'Service', href: '/service' },
    { name: 'Financing', href: '/financing' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="top-bar bg-charcoal text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:9312434555" className="hover:text-teal">
              📞 (931) 243-4555
            </a>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Mon-Fri: 8AM-5PM, Sat: 8AM-12PM</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/account/profile" className="hover:text-teal">
              My Account
            </Link>
            <Link href="/login" className="hover:text-teal">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-deep-blue rounded-full flex items-center justify-center text-white font-bold">
              OM
            </div>
            <div>
              <div className="text-xl font-bold text-charcoal">Outboard Motors</div>
              <div className="text-xs text-charcoal opacity-70">Premium Marine Dealership</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-charcoal hover:text-deep-blue font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/inventory/new"
              className="bg-deep-blue text-white px-6 py-2 rounded-lg hover:bg-teal transition-colors font-medium"
            >
              Shop New Motors
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-charcoal hover:text-deep-blue font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/inventory/new"
                className="bg-deep-blue text-white px-6 py-2 rounded-lg hover:bg-teal transition-colors font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop New Motors
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}