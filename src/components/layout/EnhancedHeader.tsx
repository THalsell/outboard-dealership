'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import TopBanner from './TopBanner';

export default function EnhancedHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<string[]>([]);
  const [mobileNestedDropdowns, setMobileNestedDropdowns] = useState<string[]>([]);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigation = [
    {
      name: 'Outboard Motors',
      href: '#',
      dropdown: [
        { name: 'All Motors', href: '/inventory', description: 'Browse all motors' },
        { name: 'New Motors', href: '/inventory?condition=new', description: 'Latest models in stock' },
        { name: 'Used Motors', href: '/inventory?condition=used', description: 'Certified pre-owned' },
        { name: 'On Sale', href: '/inventory?status=sale', description: 'Special offers' },
        { name: 'Overstock', href: '/inventory?status=overstock', description: 'Great deals on overstock items' },
        { 
          name: 'Brands', 
          href: '#', 
          description: 'Browse by brand',
          isNested: true,
          brands: [
            { name: 'Yamaha', href: '/inventory?brand=yamaha', description: 'Browse Yamaha motors' },
            { name: 'Mercury', href: '/inventory?brand=mercury', description: 'Browse Mercury motors' },
            { name: 'Honda', href: '/inventory?brand=honda', description: 'Browse Honda motors' },
            { name: 'Suzuki', href: '/inventory?brand=suzuki', description: 'Browse Suzuki motors' },
            { name: 'Tohatsu', href: '/inventory?brand=tohatsu', description: 'Browse Tohatsu motors' },
            { name: 'Freedom', href: '/inventory?brand=freedom', description: 'Browse Freedom motors' },
          ]
        },
      ]
    },
    {
      name: 'Financing',
      href: '#',
      dropdown: [
        { name: 'Apply Now', href: '/financing/application', description: 'Quick application' },
        { name: 'Check Status', href: '/financing/status', description: 'Application status' },
        { name: 'Special Offers', href: '/financing/offers', description: 'Current promotions' },
      ]
    },
    {
      name: 'Learn',
      href: '#',
      dropdown: [
        { name: 'Buying Guides', href: '/learn/guides', description: 'How to choose the perfect motor' },
        { name: 'FAQs', href: '/learn/faqs', description: 'Common questions answered' },
      ]
    },
    {
      name: 'Parts & Accessories',
      href: '/parts'
    },
    {
      name: 'Compare',
      href: '/inventory/compare'
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

  const toggleMobileDropdown = (name: string) => {
    setMobileDropdowns(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const toggleMobileNestedDropdown = (name: string) => {
    setMobileNestedDropdowns(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
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
        <TopBanner />

        {/* Logo Section with Mobile Menu */}
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Hamburger Menu - Left side on mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-text-blue"
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

          {/* Logo - Center */}
          <Link href="/" className="flex-1 flex justify-center lg:justify-center">
            <Image
              src="/logo.png"
              alt="Outboard Motor Sales Logo"
              width={500}
              height={150}
              className="w-[400px] h-16 sm:w-[600px] lg:w-[700px] sm:h-20 object-contain"
            />
          </Link>

          {/* Spacer for balance on mobile */}
          <div className="lg:hidden w-10"></div>
        </div>

        {/* Main Navigation */}
        <nav className="container mx-auto px-4">
          <div className="flex justify-center items-center py-2">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.href === '#' ? (
                    <span
                      className="text-gray-700 hover:text-gray-900 font-medium transition-colors py-2 flex items-center gap-1 cursor-pointer text-lg"
                    >
                      {item.name}
                      {item.dropdown && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-gray-900 font-medium transition-colors py-2 flex items-center gap-1 text-lg"
                    >
                      {item.name}
                      {item.dropdown && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </Link>
                  )}
                  
                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div className={`absolute top-full left-0 mt-1 ${item.name === 'Outboard Motors' ? 'w-96' : 'w-72'} bg-white rounded-lg shadow-xl border border-gray-200 py-3 z-50`}>
                      {item.name === 'Outboard Motors' ? (
                        // Special layout for Inventory dropdown
                        <div className="grid grid-cols-2 gap-1">
                          {/* Column 1: Condition & Availability */}
                          <div className="border-r border-gray-200 pr-3">
                            <div className="px-3 py-1 text-xs font-semibold text-gray-900 uppercase tracking-wider border-b border-gray-100 mb-2">
                              Browse Motors
                            </div>
                            <Link href="/inventory" className="block px-3 py-2 hover:text-gray-900 transition-colors group">
                              <div className="font-medium text-gray-600 group-hover:text-gray-900 text-sm">All Motors</div>
                            </Link>
                            <div className="px-3 py-1 text-xs font-medium text-gray-900 uppercase tracking-wider mt-3 mb-1">
                              By Condition
                            </div>
                            <Link href="/inventory?condition=new" className="block px-3 py-2 hover:text-gray-900 transition-colors group">
                              <div className="font-medium text-gray-600 group-hover:text-gray-900 text-sm">New Motors</div>
                            </Link>
                            <Link href="/inventory?condition=used" className="block px-3 py-2 hover:text-gray-900 transition-colors group">
                              <div className="font-medium text-gray-600 group-hover:text-gray-900 text-sm">Used Motors</div>
                            </Link>
                            <div className="px-3 py-1 text-xs font-medium text-gray-900 uppercase tracking-wider mt-3 mb-1">
                              Special Deals
                            </div>
                            <Link href="/inventory?status=sale" className="block px-3 py-2 hover:text-gray-900 transition-colors group">
                              <div className="font-medium text-gray-600 group-hover:text-gray-900 text-sm">On Sale</div>
                            </Link>
                            <Link href="/inventory?status=overstock" className="block px-3 py-2 hover:text-gray-900 transition-colors group">
                              <div className="font-medium text-gray-600 group-hover:text-gray-900 text-sm">Overstock</div>
                            </Link>
                            
                          </div>
                          
                          {/* Column 2: Brands */}
                          <div className="pl-3">
                            <div className="px-3 py-1 text-xs font-semibold text-gray-900 uppercase tracking-wider border-b border-gray-100 mb-2">
                              Shop by Brand
                            </div>
                            {item.dropdown.find(subItem => subItem.isNested)?.brands?.map((brand: { name: string; href: string }) => (
                              <Link key={brand.name} href={brand.href} className="block px-3 py-2 hover:text-gray-900 transition-colors group">
                                <div className="font-medium text-gray-600 group-hover:text-gray-900 text-sm">{brand.name}</div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        // Simple list layout for other dropdowns
                        <div className="py-1">
                          {item.dropdown.map((subItem, index) => {
                            if (subItem.description === 'divider') {
                              return <div key={index} className="border-t border-gray-200 my-2" />;
                            }
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-4 py-3 hover:text-gray-900 transition-colors group"
                              >
                                <div className="font-medium text-gray-900 group-hover:text-gray-900">{subItem.name}</div>
                                <div className="text-sm text-gray-500 group-hover:text-gray-700 mt-1">{subItem.description}</div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
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
              <div className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between">
                      {item.href === '#' ? (
                        <span
                          className="flex-1 text-gray-700 hover:text-gray-900 font-medium py-3 px-4 cursor-pointer"
                          onClick={() => {
                            if (item.dropdown) {
                              toggleMobileDropdown(item.name);
                            }
                          }}
                        >
                          {item.name}
                        </span>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex-1 text-gray-700 hover:text-gray-900 font-medium py-3 px-4"
                          onClick={() => {
                            if (!item.dropdown) {
                              setMobileMenuOpen(false);
                            }
                          }}
                        >
                          {item.name}
                        </Link>
                      )}
                      {item.dropdown && item.href !== '#' && (
                        <button
                          onClick={() => toggleMobileDropdown(item.name)}
                          className="p-3 transition-colors"
                          aria-label={`Toggle ${item.name} submenu`}
                        >
                          <svg 
                            className={`w-5 h-5 text-gray-500 transition-transform ${
                              mobileDropdowns.includes(item.name) ? 'rotate-180' : ''
                            }`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                      {item.dropdown && item.href === '#' && (
                        <button
                          onClick={() => toggleMobileDropdown(item.name)}
                          className="p-3 transition-colors"
                          aria-label={`Toggle ${item.name} submenu`}
                        >
                          <svg 
                            className={`w-5 h-5 text-gray-500 transition-transform ${
                              mobileDropdowns.includes(item.name) ? 'rotate-180' : ''
                            }`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {item.dropdown && mobileDropdowns.includes(item.name) && (
                      <div className="ml-4 mt-1 mb-2">
                        {item.dropdown.map((subItem, index) => {
                          // Handle dividers
                          if (subItem.description === 'divider') {
                            return <div key={index} className="border-t border-gray-200 my-2 mx-4" />;
                          }
                          
                          // Handle nested dropdowns (like Brands)
                          if (subItem.isNested && subItem.brands) {
                            return (
                              <div key={subItem.name}>
                                <div className="flex items-center justify-between">
                                  <span
                                    className="flex-1 text-gray-600 hover:text-gray-900 py-2 px-4 text-sm cursor-pointer"
                                    onClick={() => toggleMobileNestedDropdown(subItem.name)}
                                  >
                                    {subItem.name}
                                  </span>
                                  <button
                                    onClick={() => toggleMobileNestedDropdown(subItem.name)}
                                    className="p-2 transition-colors"
                                    aria-label={`Toggle ${subItem.name} submenu`}
                                  >
                                    <svg 
                                      className={`w-4 h-4 text-gray-500 transition-transform ${
                                        mobileNestedDropdowns.includes(subItem.name) ? 'rotate-180' : ''
                                      }`} 
                                      fill="none" 
                                      stroke="currentColor" 
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>
                                </div>
                                {mobileNestedDropdowns.includes(subItem.name) && (
                                  <div className="ml-4 mt-1 mb-2">
                                    {subItem.brands.map((brand: { name: string; href: string }) => (
                                      <Link
                                        key={brand.name}
                                        href={brand.href}
                                        className="block text-gray-500 hover:text-gray-900 py-2 px-4 text-xs"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {brand.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          }
                          
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block text-gray-600 hover:text-gray-900 py-2 px-4 text-sm"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>


      {/* Cart Drawer */}
    </>
  );
}