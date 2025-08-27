'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  interface SearchResult {
    id: string;
    title: string;
    category: string;
    price?: string;
    image: string;
    link: string;
  }

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'motors', label: 'Motors' },
    { value: 'guides', label: 'Guides' },
  ];

  const popularSearches = [
    'Yamaha F425',
    'Mercury Verado',
    'Propellers',
    'Oil change kit',
    'Service schedule',
    'Financing options',
  ];

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsLoading(true);
      // Simulate search API call
      const timer = setTimeout(() => {
        const mockResults = [
          {
            id: '1',
            title: 'Yamaha F425 XTO Offshore',
            category: 'motors',
            price: '$54,999',
            image: '/placeholder-motor.svg',
            link: '/inventory/1',
          },
          {
            id: '2',
            title: 'Mercury Verado 400',
            category: 'motors',
            price: '$49,999',
            image: '/placeholder-motor.svg',
            link: '/inventory/2',
          },
        ];
        
        const filtered = selectedCategory === 'all' 
          ? mockResults 
          : mockResults.filter(item => item.category === selectedCategory);
        
        setSearchResults(filtered);
        setIsLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, selectedCategory]);

  const handleClose = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSelectedCategory('all');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white w-full max-w-4xl mx-auto mt-20 rounded-lg shadow-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for motors, parts, guides..."
                  className="w-full px-4 py-3 pr-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <svg
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close search"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Category Filters */}
          <div className="flex gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {searchQuery.length === 0 ? (
            <div>
              <h3 className="text-lg font-semibold mb-4">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link
                    href="/inventory/new"
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
                    onClick={handleClose}
                  >
                    <div className="text-2xl mb-2">🚤</div>
                    <div className="font-medium">New Motors</div>
                  </Link>
                  <Link
                    href="/service/schedule"
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
                    onClick={handleClose}
                  >
                    <div className="text-2xl mb-2">🔧</div>
                    <div className="font-medium">Service</div>
                  </Link>
                  <Link
                    href="/financing"
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center"
                    onClick={handleClose}
                  >
                    <div className="text-2xl mb-2">💰</div>
                    <div className="font-medium">Financing</div>
                  </Link>
                </div>
              </div>
            </div>
          ) : isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Searching...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Found {searchResults.length} results for &quot;{searchQuery}&quot;
              </p>
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <Link
                    key={result.id}
                    href={result.link}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={handleClose}
                  >
                    <Image
                      src={result.image}
                      alt={result.title}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{result.title}</h4>
                      <p className="text-sm text-gray-600 capitalize">{result.category}</p>
                      {result.price && (
                        <p className="text-lg font-bold text-blue-600 mt-1">{result.price}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  href={`/search?q=${encodeURIComponent(searchQuery)}`}
                  className="inline-block text-blue-600 hover:text-blue-700 font-medium"
                  onClick={handleClose}
                >
                  View all results →
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No results found for &quot;{searchQuery}&quot;</p>
              <p className="text-sm text-gray-500 mt-2">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}