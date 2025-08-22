'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import SearchModal from './SearchModal';
import CartDrawer from './CartDrawer';
import UserAccountMenu from './UserAccountMenu';

export default function EnhancedHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, setIsOpen: setCartOpen } = useCart();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigation = [
    {
      name: 'Inventory',
      href: '/inventory',
      dropdown: [
        { name: 'New Motors', href: '/inventory/new', description: 'Latest models in stock' },
        { name: 'Used Motors', href: '/inventory/used', description: 'Certified pre-owned' },
        { name: 'On Sale', href: '/inventory/sale', description: 'Special offers' },
        { name: 'Compare Models', href: '/inventory/compare', description: 'Side-by-side comparison' },
        { name: 'Trade-In', href: '/inventory/trade-in', description: 'Get a quote for your motor' },
      ]
    },
    {
      name: 'Parts',
      href: '/parts',
      dropdown: [
        { name: 'Browse Categories', href: '/parts/categories', description: 'All parts categories' },
        { name: 'Part Finder', href: '/parts/finder', description: 'Find parts by model' },
        { name: 'Propellers', href: '/parts/propellers', description: 'Props for all brands' },
        { name: 'Oil & Lubricants', href: '/parts/oil', description: 'Marine grade oils' },
        { name: 'Accessories', href: '/parts/accessories', description: 'Boat accessories' },
        { name: 'Electronics', href: '/parts/electronics', description: 'Marine electronics' },
      ]
    },
    {
      name: 'Service',
      href: '/service',
      dropdown: [
        { name: 'Schedule Service', href: '/service/schedule', description: 'Book appointment' },
        { name: 'Service Status', href: '/service/status', description: 'Track your service' },
        { name: 'Service History', href: '/service/history', description: 'View past services' },
        { name: 'Maintenance Plans', href: '/service/plans', description: 'Service packages' },
        { name: 'Warranty Info', href: '/service/warranty', description: 'Coverage details' },
      ]
    },
    {
      name: 'Financing',
      href: '/financing',
      dropdown: [
        { name: 'Apply Now', href: '/financing/application', description: 'Quick application' },
        { name: 'Calculator', href: '/financing/calculator', description: 'Estimate payments' },
        { name: 'Check Status', href: '/financing/status', description: 'Application status' },
        { name: 'Special Offers', href: '/financing/offers', description: 'Current promotions' },
      ]
    },
    {
      name: 'Learn',
      href: '/learn',
      dropdown: [
        { name: 'Buying Guides', href: '/learn/guides', description: 'How to choose' },
        { name: 'FAQs', href: '/learn/faqs', description: 'Common questions' },
        { name: 'Videos', href: '/learn/videos', description: 'Tutorials & reviews' },
        { name: 'Glossary', href: '/learn/glossary', description: 'Marine terms' },
        { name: 'Blog', href: '/learn/blog', description: 'Tips & news' },
      ]
    },
  ];

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-gray-900 text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center text-xs sm:text-sm">
            <div className="flex items-center gap-2 sm:gap-4">
              <a href="tel:9312434555" className="hover:text-blue-400 flex items-center gap-1">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden xs:inline">(931) 243-4555</span>
                <span className="xs:hidden">Call</span>
              </a>
              <span className="hidden sm:inline">|</span>
              <span className="hidden md:inline flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Mon-Fri: 8AM-5PM, Sat: 8AM-12PM, Sun: Closed
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/commercial/wholesale" className="hover:text-blue-400 hidden lg:inline">
                Commercial Sales
              </Link>
              <Link href="/learn/faqs" className="hover:text-blue-400 hidden sm:inline">
                Help
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                OM
              </div>
              <div className="hidden sm:block">
                <div className="text-lg sm:text-xl font-bold text-gray-900">Outboard Motors</div>
                <div className="text-xs text-gray-600">Premium Marine Dealership</div>
              </div>
              <div className="sm:hidden">
                <div className="text-base font-bold text-gray-900">OM Dealership</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2 flex items-center gap-1"
                  >
                    {item.name}
                    {item.dropdown && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <div className="font-medium text-gray-900">{subItem.name}</div>
                          <div className="text-sm text-gray-600">{subItem.description}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Open search modal"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* User Account */}
              <UserAccountMenu />

              {/* Cart Button */}
              <button
                onClick={() => setCartOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Shopping cart with ${itemCount} items`}
                aria-describedby="cart-count"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {itemCount > 0 && (
                  <span 
                    id="cart-count"
                    className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    aria-hidden="true"
                  >
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div 
              id="mobile-menu" 
              className="lg:hidden py-4 border-t"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="block text-gray-700 hover:text-blue-600 font-medium py-2 px-4 hover:bg-gray-50 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-4 mt-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-gray-600 hover:text-blue-600 py-2 px-4 text-sm"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link
                  href="/inventory/new"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center mt-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shop New Motors
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}