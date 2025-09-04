'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import UserAccountMenu from './UserAccountMenu';
import CartDrawer from './CartDrawer';
import { useCart } from '@/contexts/CartContext';

export default function TopBanner() {
  const { itemCount, setIsOpen: setCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <>
      <div className="bg-gray-900 text-white py-6">
        <div className="w-full px-4 flex justify-between items-center text-sm sm:text-base">
          <div className="flex items-center gap-4 sm:gap-8">
            <a href="tel:9312434555" className="hover:text-blue-400 flex items-center gap-2">
              <Image src="/phone.svg" alt="Phone" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5 filter brightness-0 invert" />
              <span>(931) 243-4555</span>
            </a>
            <span className="text-gray-400">|</span>
            <div className="flex items-center gap-2">
              <Image src="/clock.svg" alt="Hours" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5 filter brightness-0 invert" />
              <span>Mon-Fri: 8AM-5PM, Sat: 8AM-12PM, Sun: Closed</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const query = searchQuery.trim().toLowerCase();
                if (query) {
                  if (query === 'home' || query === 'homepage') {
                    window.location.href = '/';
                  } else if (query.includes('faq') || query.includes('question') || query.includes('help')) {
                    window.location.href = '/learn/faqs';
                  } else if (query.includes('guide') || query.includes('buying') || query.includes('how to') || query.includes('learn')) {
                    window.location.href = '/learn/guides';
                  } else if (query.includes('part') || query.includes('accessory') || query.includes('accessories')) {
                    window.location.href = '/parts';
                  } else {
                    window.location.href = `/inventory?search=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }
              }}
              className="relative"
            >
              <div className="relative">
                <Image 
                  src="/search.svg" 
                  alt="Search" 
                  width={20} 
                  height={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 filter brightness-0 invert" 
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search motors..."
                  className="w-48 pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
                />
              </div>
            </form>
            
            <Link href="/learn/faqs" className="hover:text-blue-400">
              Help
            </Link>
            <UserAccountMenu />
            <button
              onClick={() => setCartOpen(true)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors relative"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <Image src="/shopping.svg" alt="Shopping Cart" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5 filter brightness-0 invert" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <CartDrawer />
    </>
  );
}