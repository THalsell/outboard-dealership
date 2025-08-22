'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { partCategories } from '@/lib/data/parts';
import { useParts } from '@/contexts/PartsContext';

interface PartsCategoryBrowserProps {
  viewMode?: 'grid' | 'list';
  showFeaturedOnly?: boolean;
  compact?: boolean;
}

export default function PartsCategoryBrowser({ 
  viewMode = 'grid', 
  showFeaturedOnly = false,
  compact = false 
}: PartsCategoryBrowserProps) {
  const { updateFilter, filters } = useParts();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const displayCategories = showFeaturedOnly 
    ? partCategories.filter(cat => cat.featured)
    : partCategories;

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleCategorySelect = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];
    updateFilter('categories', newCategories);
  };

  if (compact) {
    return (
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
        {displayCategories.map((category) => (
          <div key={category.id}>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.id)}
                  onChange={() => handleCategorySelect(category.id)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm">{category.name}</span>
                <span className="text-xs text-gray-500">({category.partCount})</span>
              </label>
              {category.subcategories && category.subcategories.length > 0 && (
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      expandedCategories.includes(category.id) ? 'rotate-180' : ''
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
            
            {expandedCategories.includes(category.id) && category.subcategories && (
              <div className="ml-6 mt-2 space-y-1">
                {category.subcategories.map((subcategory) => (
                  <label key={subcategory.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(subcategory.id)}
                      onChange={() => handleCategorySelect(subcategory.id)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">{subcategory.name}</span>
                    <span className="text-xs text-gray-400">({subcategory.partCount})</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {displayCategories.map((category) => (
          <div key={category.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <Link 
                href={`/parts/${category.slug}`}
                className="flex-1"
              >
                <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{category.description}</p>
                <p className="text-blue-600 text-sm mt-1">{category.partCount} parts available</p>
              </Link>
              {category.subcategories && category.subcategories.length > 0 && (
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      expandedCategories.includes(category.id) ? 'rotate-180' : ''
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
            
            {expandedCategories.includes(category.id) && category.subcategories && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3 pt-3 border-t">
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    href={`/parts/${category.slug}/${subcategory.slug}`}
                    className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h4 className="font-medium text-gray-900">{subcategory.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{subcategory.description}</p>
                    <p className="text-xs text-blue-600 mt-1">{subcategory.partCount} parts</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayCategories.map((category) => (
        <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
          <Link href={`/parts/${category.slug}`}>
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <Image
                src={category.image || '/placeholder-part.svg'}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {category.featured && (
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-bold">
                  Featured
                </div>
              )}
            </div>
          </Link>

          <div className="p-4">
            <Link href={`/parts/${category.slug}`}>
              <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors mb-2">
                {category.name}
              </h3>
            </Link>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{category.description}</p>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-blue-600 font-medium">{category.partCount} parts</span>
              {category.subcategories && (
                <span className="text-gray-500 text-sm">
                  {category.subcategories.length} subcategories
                </span>
              )}
            </div>

            {category.subcategories && category.subcategories.length > 0 && (
              <div className="border-t pt-3">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="flex items-center justify-between w-full text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <span>View subcategories</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      expandedCategories.includes(category.id) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedCategories.includes(category.id) && (
                  <div className="mt-3 space-y-2">
                    {category.subcategories.slice(0, 3).map((subcategory) => (
                      <Link
                        key={subcategory.id}
                        href={`/parts/${category.slug}/${subcategory.slug}`}
                        className="block text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        • {subcategory.name} ({subcategory.partCount})
                      </Link>
                    ))}
                    {category.subcategories.length > 3 && (
                      <Link
                        href={`/parts/${category.slug}`}
                        className="block text-sm text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        + {category.subcategories.length - 3} more...
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}