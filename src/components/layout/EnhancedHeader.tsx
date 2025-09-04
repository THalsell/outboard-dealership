'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import TopBanner from './TopBanner';

export default function EnhancedHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigation = [
    {
      name: 'Outboard Motors',
      href: '/inventory',
      dropdown: [
        { name: 'All Motors', href: '/inventory', description: 'Browse all motors' },
        { name: 'New Motors', href: '/inventory?condition=new', description: 'Latest models in stock' },
        { name: 'Used Motors', href: '/inventory?condition=used', description: 'Certified pre-owned' },
        { name: 'On Sale', href: '/inventory?status=sale', description: 'Special offers' },
        { name: 'Overstock', href: '/inventory?status=overstock', description: 'Great deals on overstock items' },
        { name: '', href: '', description: 'divider' }, // Divider
        { name: 'Yamaha', href: '/inventory?brand=yamaha', description: 'Browse Yamaha motors' },
        { name: 'Mercury', href: '/inventory?brand=mercury', description: 'Browse Mercury motors' },
        { name: 'Honda', href: '/inventory?brand=honda', description: 'Browse Honda motors' },
        { name: 'Suzuki', href: '/inventory?brand=suzuki', description: 'Browse Suzuki motors' },
        { name: 'Tohatsu', href: '/inventory?brand=tohatsu', description: 'Browse Tohatsu motors' },
        { name: 'Freedom', href: '/inventory?brand=freedom', description: 'Browse Freedom motors' },
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
    {
      name: 'Financing',
      href: '/financing',
      dropdown: [
        { name: 'Apply Now', href: '/financing/application', description: 'Quick application' },
        { name: 'Check Status', href: '/financing/status', description: 'Application status' },
        { name: 'Special Offers', href: '/financing/offers', description: 'Current promotions' },
      ]
    },
    {
      name: 'Learn',
      href: '/learn',
      dropdown: [
        { name: 'Buying Guides', href: '/learn/guides', description: 'How to choose the perfect motor' },
        { name: 'FAQs', href: '/learn/faqs', description: 'Common questions answered' },
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
        <TopBanner />

        {/* Logo Section */}
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Outboard Motor Sales Logo"
              width={500}
              height={150}
              className=
              "w-96 h-20 sm:w-[48rem] sm:h-24 object-contain"
            />
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="container mx-auto px-4 border-t">
          <div className="flex justify-center items-center py-4">
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
                    <div className={`absolute top-full left-0 mt-1 ${item.name === 'Outboard Motors' ? 'w-96' : 'w-72'} bg-white rounded-lg shadow-xl border border-gray-200 py-3 z-50`}>
                      {item.name === 'Outboard Motors' ? (
                        // Special layout for Inventory dropdown
                        <div className="grid grid-cols-2 gap-1">
                          {/* Column 1: Condition & Status */}
                          <div className="border-r border-gray-200 pr-3">
                            <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 mb-2">
                              Shop by Condition
                            </div>
                            <Link href="/inventory" className="block px-3 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors group">
                              <div className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">All Motors</div>
                            </Link>
                            <Link href="/inventory?condition=new" className="block px-3 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors group">
                              <div className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">New Motors</div>
                            </Link>
                            <Link href="/inventory?condition=used" className="block px-3 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors group">
                              <div className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">Used Motors</div>
                            </Link>
                            <Link href="/inventory?status=sale" className="block px-3 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors group">
                              <div className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">On Sale</div>
                            </Link>
                            <Link href="/inventory?status=overstock" className="block px-3 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors group">
                              <div className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">Overstock</div>
                            </Link>
                            
                          </div>
                          
                          {/* Column 2: Brands */}
                          <div className="pl-3">
                            <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 mb-2">
                              Shop by Brand
                            </div>
                            <Link href="/inventory?brand=yamaha" className="block px-3 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors group">
                              <div className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">Yamaha</div>
                            </Link>
                            <Link href="/inventory?brand=mercury" className="block px-3 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors group">
                              <div className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">Mercury</div>
                            </Link>
                            <Link href="/inventory?brand=honda" className="block px-3 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors group">
                              <div className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">Honda</div>
                            </Link>
                            <Link href="/inventory?brand=suzuki" className="block px-3 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors group">
                              <div className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">Suzuki</div>
                            </Link>
                            <Link href="/inventory?brand=tohatsu" className="block px-3 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors group">
                              <div className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">Tohatsu</div>
                            </Link>
                            <Link href="/inventory?brand=freedom" className="block px-3 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors group">
                              <div className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">Freedom</div>
                            </Link>
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
                                className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                              >
                                <div className="font-medium text-gray-900 group-hover:text-blue-600">{subItem.name}</div>
                                <div className="text-sm text-gray-500 group-hover:text-blue-500 mt-1">{subItem.description}</div>
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

            {/* Mobile Menu Button */}
            <div className="lg:hidden absolute right-4">
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
                        {item.dropdown.map((subItem, index) => {
                          // Handle dividers
                          if (subItem.description === 'divider') {
                            return <div key={index} className="border-t border-gray-200 my-2 mx-4" />;
                          }
                          
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block text-gray-600 hover:text-blue-600 py-2 px-4 text-sm hover:bg-gray-50 rounded"
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
                <Link
                  href="/inventory?condition=new"
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


      {/* Cart Drawer */}
    </>
  );
}